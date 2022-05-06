import React, { useState, useEffect } from 'react'
import { View, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Pressable, HStack, VStack, Box, Divider, Skeleton, Spinner } from 'native-base'
import { HButton, HText, HUserFilterBy, HCartButton } from '../Shared'
import { colors, icons } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'
import styles from './style'
import { Card } from './Card'
import { useSelector } from 'react-redux'
import { groupBy } from '../../utils/helper'

export const BuyLeads = (props) => {
  const {
    fullAddres,
    leads,
    defaultFilterBy,
    navigation,
    onNavigationRedirect
  } = props
  
  const currentUser = useSelector(state => state.currentUser)

  const [isBuyers, setIsBuyers] = useState(false)
  const [isSellers, setIsSellers] = useState(false)
  const [isProspective, setIsProspective] = useState(false)
  const [totalLeads, setTotalLeads] = useState(null)
  const [filteredLeads, setFilteredLeads] = useState(null)
  const [totalCart, setTotalCart] = useState([])
  const [buyersLeads, setBuyersLeads] = useState({})
  const [sellersLeads, setSellersLeads] = useState({})
  const [prospectiveLeads, setProspectiveLeads] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [openFilter, setOpenFilter] = useState(false)

  useEffect(() => {
    const totalBuyers = leads?.buyers?.total || 0
    const totalSellers = leads?.sellers?.total || 0
    const totalProspective = leads?.prospective?.total || 0
    let _total = totalBuyers + totalSellers + totalProspective
    setTotalLeads(_total)
    let _filtered = 0
    if (isBuyers) _filtered += totalBuyers
    if (isSellers) _filtered += totalSellers
    if (isProspective) _filtered += totalProspective
    setFilteredLeads(_filtered)
  }, [isBuyers, isSellers, isProspective, leads])

  useEffect(() => {
    if (defaultFilterBy) {
      switch (defaultFilterBy) {
        case 'buyers':
          setIsBuyers(true)
          break
        case 'sellers':
          setIsSellers(true)
          break
        case 'prospective':
          setIsProspective(true)
          break
      }
    } else {
      setIsBuyers(true)
      setIsSellers(true)
      setIsProspective(true)
    }
  }, [defaultFilterBy])

  useEffect(() => {
    if (!currentUser?.cart) return
    const totalBuyers = currentUser?.cart?.buyer_leads || []
    const totalSellers = currentUser?.cart?.seller_leads || []
    const totalProspective = currentUser?.cart?.prospective_leads || []
    let _total = [...totalBuyers, ...totalSellers, ...totalProspective]
    setTotalCart(_total)
  }, [JSON.stringify(currentUser?.cart)])

  useEffect(() => {
    setBuyersLeads(groupBy(leads?.buyers?.leads, 'zip_code'))
    setSellersLeads(groupBy(leads?.sellers?.leads, 'zip_code'))
    setProspectiveLeads(groupBy(leads?.prospective?.leads, 'zip_code'))
    setIsLoading(false)
  }, [leads])

  return (
    <TouchableWithoutFeedback onPress={() => setOpenFilter(false)}>
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
        <View style={styles.titleContainer}>
          <HText style={styles.headerTitle}>Buy leads</HText>
          <View style={styles.cartIconContainer}>
            <HCartButton
              onPress={() => onNavigationRedirect('LeadsCheckout')}
            />
          </View>
        </View>

        <View style={styles.innerContainer}>
          <HStack mb='4' alignItems='center'>
            <Image source={icons.location} style={styles.addressIcon} />
            <HText style={styles.addressText}>{fullAddres}</HText>
          </HStack>
          <VStack mb='5'>
            <HStack justifyContent='space-between'>
              <HText style={styles.filterText}>Filter by:</HText>
              <View style={styles.filterContainer}>
                {!totalLeads ? (
                  <Skeleton h='3' w='16' rounded='sm' ml='7' />
                ) : (
                  <Pressable
                    _pressed={{ opacity: 0.6 }}
                    onPress={() => setOpenFilter(!openFilter)}
                  >
                    <HText style={styles.filterText}>
                      {isBuyers && isSellers && isProspective ? totalLeads: `${filteredLeads}/${totalLeads}`} leads
                    </HText>
                  </Pressable>
                )}
                {openFilter && (
                  <View style={styles.filterWrapper}>
                    <HUserFilterBy
                      isBuyers={isBuyers}
                      setIsBuyers={setIsBuyers}
                      isSellers={isSellers}
                      setIsSellers={setIsSellers}
                      isProspective={isProspective}
                      setIsProspective={setIsProspective}
                    />
                  </View>
                )}
              </View>
            </HStack>
          </VStack>
        </View>
        <Divider backgroundColor={colors.primary} opacity={0.7} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
        >
          {isLoading ? (
            <HStack alignItems='center' justifyContent='center' flex='1'>
              <HStack alignItems='center'>
                <Spinner color={colors.primary} size='lg' mr='1' />
                <HText style={styles.radioLabel}>Loading...</HText>
              </HStack>
            </HStack>
          ) : (
            <View style={styles.innerContainer}>
              {isBuyers && buyersLeads && (
                Object.keys(buyersLeads).map(key => (
                  <Card
                    key={key}
                    userTypeValue={1}
                    leadsGroup={buyersLeads[key]}
                    zipCode={key}
                    totalCart={totalCart}
                  />
                ))
              )}
              {isSellers && sellersLeads && (
                Object.keys(sellersLeads).map(key => (
                  <Card
                    key={key}
                    userTypeValue={2}
                    leadsGroup={sellersLeads[key]}
                    zipCode={key}
                    totalCart={totalCart}
                  />
                ))
              )}
              {isProspective && prospectiveLeads && (
                Object.keys(prospectiveLeads).map(key => (
                  <Card
                    key={key}
                    userTypeValue={3}
                    leadsGroup={prospectiveLeads[key]}
                    zipCode={key}
                    totalCart={totalCart}
                  />
                ))
              )}
              {filteredLeads === 0 && (
                <Box alignItems='center' my='4'>
                  <HText style={styles.radioLabel}>No Leads</HText>
                </Box>
              )}
            </View>
          )}
        </ScrollView>
        <Divider backgroundColor={colors.primary} opacity={0.7} />
        <Box alignItems='center' mt='4' mb='4'>
          <HButton
            text={`(${totalCart.length}) Proceed to Checkout`}
            width={deviceWidth - 48}
            borderColor={colors.primary}
            backgroundColor={colors.white}
            borderWidth={1}
            textStyle={{
              color: colors.primary
            }}
            onPress={() => onNavigationRedirect('LeadsCheckout')}
          />
        </Box>
      </View>
    </TouchableWithoutFeedback>
  )
}
