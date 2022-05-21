import React, { useState, useEffect } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { HText, HButton, HToast } from '../Shared'
import { Pressable, HStack, Box, useToast, Divider, Radio, Skeleton, Checkbox, VStack } from 'native-base'
import { colors, icons } from '../../utils/styleGuide'
import styles from './style'

import { StripeProvider, useStripe } from '@stripe/stripe-react-native'
import { useSelector, useDispatch } from 'react-redux'
import { doGet, doPost } from '../../services/http-client'
import { getIconCard, parsePrice } from '../../utils/helper'
import { TOAST_LENGTH_SHORT } from '../../config'
import { setUser } from '../../store/action/setUser'

export const BillingInfo = (props) => {
  const {
    totalPrice,
    navigation,
    onNavigationRedirect
  } = props

  const toast = useToast()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const [paymethodsLoading, setPaymethodsLoading] = useState(true)
  const [paymentSheetLoaded, setPaymentSheetLoaded] = useState(false)
  const [stripePublishableKey, setStripePublishableKey] = useState(null)
  const [paymethodsList, setPaymethodsList] = useState([])
  const [selectedPaymethodId, setSelectedPaymethodId] = useState(null)
  const [defaultPaymethodId, setDefaultPaymethodId] = useState(null)
  const { initPaymentSheet, presentPaymentSheet } = useStripe()
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [isDefault, setIsDefault] = useState(false)
  const [noCards, setNoCards] = useState(false)

  const fetchPaymentSheetParams = async () => {
    try {
      const response = await doPost(`lookup-test/lead/payment-sheet?user-id=${currentUser?.user_id}`)
      if (response.result === 'Error') throw response
      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }

  const initializePaymentSheet = async () => {
    try {
      const {
        setupIntent,
        ephemeralKey,
        customer,
        publishableKey
      } = await fetchPaymentSheetParams()
    
      setStripePublishableKey(publishableKey)
    
      const { error } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        setupIntentClientSecret: setupIntent,
        merchantDisplayName: 'Honely'
      })
      if (!error) {
        setPaymentSheetLoaded(true)
      }
    } catch (error) {
      toast.show({
        render: () => <HToast status='error' message={error.message} />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
    }
  }

  const openPaymentSheet = async () => {
    try {
      const { error } = await presentPaymentSheet()
      // if (error) throw error
      handleGetUserPaymethods()
    } catch (error) {
      toast.show({
        render: () => <HToast status='error' message={error.message} />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
    }
  }

  const handleGetUserPaymethods = async () => {
    try {
      setPaymethodsLoading(true)
      const response = await doGet(`lookup-test/user/payment-methods?user-id=${currentUser?.user_id}`)
      if (response.result === 'Error') throw response
      setPaymethodsList(response?.data || [])
      const defaultId = response?.data.find(paymethod => paymethod.default)?.id
      if (defaultId) {
        setDefaultPaymethodId(defaultId)
        setSelectedPaymethodId(defaultId)
      }
      setPaymethodsLoading(false)
    } catch (error) {
      setPaymethodsLoading(false)
      toast.show({
        render: () => <HToast status='error' message={error.message} />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
    }
  }

  const handleConfirmPay = async () => {
    try {
      setPaymentProcessing(true)
      const fetchUrl = isDefault
        ? `lookup-test/lead/payment-intent?user-id=${currentUser?.user_id}&amount=${totalPrice * 100}&pm-id=${selectedPaymethodId}&default-pm=true`
        : `lookup-test/lead/payment-intent?user-id=${currentUser?.user_id}&amount=${totalPrice * 100}&pm-id=${selectedPaymethodId}`
      const response = await doPost(fetchUrl)
      if (response.result === 'Error') throw response
      setTimeout(() => {
        toast.show({
          render: () => <HToast status='success' message='Payment success!' />,
          placement: 'top',
          duration: TOAST_LENGTH_SHORT
        })
        dispatch(setUser({ cart: {} }))
        setPaymentProcessing(false)
        onNavigationRedirect('Leads')
      }, 2000)
    } catch (error) {
      let toastMessage = ''
      if (typeof error.message === 'string') {
        toastMessage = error.message
      } else {
        toastMessage = error.message?.message
      }
      setPaymentProcessing(false)
      toast.show({
        render: () => <HToast status='error' message={toastMessage} />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
    }
  }

  useEffect(() => {
    if (!paymentSheetLoaded || paymethodsLoading || paymethodsList.length) return
    openPaymentSheet()
    setNoCards(true)
  }, [paymethodsLoading, paymethodsList, paymentSheetLoaded])

  useEffect(() => {
    handleGetUserPaymethods()
    initializePaymentSheet()
  }, [])

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => navigation.goBack()}
          _pressed={{ opacity: 0.7 }}
        >
          <HStack alignItems='center'>
            <Image source={icons.arrowLeft} style={styles.backIcon} />
            <HText style={styles.backText}>Back</HText>
          </HStack>
        </Pressable>
      </View>
      <HText style={styles.headerTitle}>Billing Info</HText>
      <HText style={styles.paymentText}>Payment</HText>
      <Divider backgroundColor={colors.primary} opacity={0.7} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <VStack py='10'>
          {paymethodsLoading ? (
            [...Array(3).keys()].map(i => (
              <HStack key={i} justifyContent='space-between' my='3'>
                <Skeleton size='5' rounded='full' />
                <Skeleton w='12' h='6' />
                <Skeleton h='6' w='48' />
              </HStack>
            ))
          ) : (
            <Radio.Group
              defaultValue={selectedPaymethodId}
              onChange={value => setSelectedPaymethodId(value || '')}
            >
              {paymethodsList.filter(paymethod => paymethod.default).map(paymethod => (
                <HStack key={paymethod.id} my='3' alignItems='center' width='full' justifyContent='space-between'>
                  <Radio
                    value={paymethod.id}
                    size='md'
                    borderColor={colors.primary}
                    _checked={{
                      borderColor: colors.primary,
                      backgroundColor: colors.white
                    }}
                    _icon={{ color: colors.primary }}
                  />
                  <View style={styles.cardWrapper}>
                    {getIconCard(paymethod.brand)}
                  </View>
                  <HText style={styles.cardLastText}>●●●● ●●●● ●●●● {paymethod.last4}</HText>
                </HStack>
              ))}
              {selectedPaymethodId && paymethodsList.find(paymethod => !paymethod.default) && (
                <HText style={styles.orPayWithText}>or pay using</HText>
              )}
              {paymethodsList.filter(paymethod => !paymethod.default).map(paymethod => (
                <HStack key={paymethod.id} my='3' alignItems='center' width='full' justifyContent='space-between'>
                  <Radio
                    value={paymethod.id}
                    size='md'
                    borderColor={colors.primary}
                    _checked={{
                      borderColor: colors.primary,
                      backgroundColor: colors.white
                    }}
                    _icon={{ color: colors.primary }}
                  />
                  <View style={styles.cardWrapper}>
                    {getIconCard(paymethod.brand)}
                  </View>
                  <HText style={styles.cardLastText}>●●●● ●●●● ●●●● {paymethod.last4}</HText>
                </HStack>
              ))}
            </Radio.Group>
          )}
        </VStack>
        {!noCards && (
          <StripeProvider
            publishableKey={stripePublishableKey}
            merchantIdentifier='merchant.com.'
          >
            <Pressable
              onPress={openPaymentSheet}
              disabled={!paymentSheetLoaded}
              _disabled={{ opacity: 0.6 }}
              _pressed={{ opacity: 0.6 }}
            >
              <HText style={styles.addCardText}>ADD ANOTHER CARD</HText>
            </Pressable>
          </StripeProvider>
        )}
      </ScrollView>
      {defaultPaymethodId !== selectedPaymethodId && (
        <View style={styles.saveCheckBoxContainer}>
          <Checkbox
            size='md'
            borderColor={colors.text01}
            _checked={{
              backgroundColor: colors.primary,
              borderColor: colors.primary
            }}
            _interactionBox={{ opacity: 0 }}
            isChecked={isDefault}
            onChange={checked => setIsDefault(checked)}
          />
          <HText style={styles.saveCardText}>Save this card as default.</HText>
        </View>
      )}
      <Divider backgroundColor={colors.primary} opacity={0.6} />
      <Box pt='5' pb='8' alignItems='center'>
        <HButton
          text={`Pay ${parsePrice(totalPrice, true)}`}
          isDisabled={!selectedPaymethodId}
          disabledOpacity={0.6}
          onPress={handleConfirmPay}
          isLoading={paymentProcessing}
        />
      </Box>
    </View>
  )
}
