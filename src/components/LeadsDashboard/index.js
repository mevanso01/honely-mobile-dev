import React, { useState, useEffect } from 'react'
import { ScrollView, Image, View } from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import { HText, HButton } from '../Shared'
import { colors, images, icons } from '../../utils/styleGuide'
import { HStack, VStack, Box, Checkbox, Icon, Skeleton, useToast } from 'native-base'
import SplashScreen from 'react-native-splash-screen'
import Swiper from 'react-native-swiper'
import styles from './style'
import { doGet } from '../../services/http-client'
import { useSelector, useDispatch } from 'react-redux'
import { TOAST_LENGTH_SHORT } from '../../config'
import { LeadCard } from './LeadCard'
import { setUser } from '../../store/action/setUser'

export const LeadsDashboard = (props) => {
  const {
    onNavigationRedirect
  } = props

  const toast = useToast()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const [isLoading, setIsLoading] = useState(true)
  const [leadsList, setLeadsList] = useState({})

  const [isBuyers, setIsBuyers] = useState(true)
  const [isSellers, setIsSellers] = useState(true)
  const [isProspective, setIsProspective] = useState(true)
  const [totalLeads, setTotalLeads] = useState(null)
  const [filteredLeads, setFilteredLeads] = useState(null)

  const onSelectFilterBy = (selected, type) => {
    const options = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true
    }
    ReactNativeHapticFeedback.trigger('impactLight', options)
    switch (type) {
      case 'buyers':
        setIsBuyers(selected)
        break
      case 'sellers':
        setIsSellers(selected)
        break
      case 'prospective':
        setIsProspective(selected)
        break
    }
  }

  const handleLeadsFilter = (response) => {
    let _leadsList = {}
    if (response?.buyers?.leads) {
      const buyerLeads = response.buyers?.leads.filter(lead => lead.agent_status === 'NEW')
      if (buyerLeads.length) {
        _leadsList.buyers = {
          total: buyerLeads.length,
          leads: buyerLeads
        }
      }
    }
    if (response?.sellers?.leads) {
      const sellerLeads = response.sellers?.leads.filter(lead => lead.agent_status === 'NEW')
      if (sellerLeads.length) {
        _leadsList.sellers = {
          total: sellerLeads.length,
          leads: sellerLeads
        }
      }
    }
    if (response?.prospective?.leads) {
      const prospectiveLeads = response.prospective?.leads.filter(lead => lead.agent_status === 'NEW')
      if (prospectiveLeads.length) {
        _leadsList.prospective = {
          total: prospectiveLeads.length,
          leads: prospectiveLeads
        }
      }
    }
    return _leadsList
  }

  const handleGetUserLeads = async () => {
    try {
      setIsLoading(true)
      const response = await doGet('searches/lead-dashboard', { 'user-id': currentUser?.user_id })
      // The endpoint supports filter by statues.
      if (response.result !== 'Success') throw response
      dispatch(setUser({ leads: response.data }))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.show({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    }
  }

  useEffect(() => {
    if (isLoading) return
    const totalBuyers = leadsList?.buyers?.total || 0
    const totalSellers = leadsList?.sellers?.total || 0
    const totalProspective = leadsList?.prospective?.total || 0
    let _total = totalBuyers + totalSellers + totalProspective
    setTotalLeads(_total || 0)
    let _filtered = 0
    if (isBuyers) _filtered += totalBuyers
    if (isSellers) _filtered += totalSellers
    if (isProspective) _filtered += totalProspective
    setFilteredLeads(_filtered)
  }, [isBuyers, isSellers, isProspective, leadsList, isLoading])

  useEffect(() => {
    if (!currentUser?.leads) return
    const _leadsList = handleLeadsFilter(currentUser?.leads)
    setLeadsList(_leadsList)
  }, [JSON.stringify(currentUser?.leads)])

  useEffect(() => {
    handleGetUserLeads()
  }, [])

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <View style={styles.screenContainer}>
      <View style={styles.innerContainer}>
        <HText style={styles.title}>Leads Dashboard</HText>
      </View>
      {(isLoading || totalLeads !== 0) && (
        <View style={styles.leadsContent}>
          <View style={styles.innerContainer}>
            <VStack mb='12'>
              <HStack mb='4' justifyContent='space-between'>
                <HText style={styles.filterText}>Filter by:</HText>
                {!totalLeads ? (
                  <Skeleton h='3' w='16' rounded='sm' ml='7' />
                ) : (
                  <HText style={styles.filterText}>{filteredLeads}/{totalLeads} leads</HText>
                )}
              </HStack>
              <HStack>
                <Checkbox
                  size='md'
                  mr='8'
                  borderRadius={15}
                  borderColor={colors.primary}
                  _checked={{
                    backgroundColor: colors.white,
                    borderColor: colors.primary,
                  }}
                  _interactionBox={{
                    opacity: 0
                  }}
                  icon={
                    <Icon as={<Image source={icons.cirlceCheckOn} />} />
                  }
                  isDisabled={!isSellers && !isProspective}
                  isChecked={isBuyers}
                  onChange={selected => onSelectFilterBy(selected, 'buyers')}
                >
                  <HText style={styles.radioLabel}>Buyers</HText>
                </Checkbox>
                <Checkbox
                  size='md'
                  mr='8'
                  borderRadius={15}
                  borderColor={colors.primary}
                  _checked={{
                    backgroundColor: colors.white,
                    borderColor: colors.primary,
                  }}
                  _interactionBox={{
                    opacity: 0
                  }}
                  icon={
                    <Icon as={<Image source={icons.cirlceCheckOn} />} />
                  }
                  isDisabled={!isBuyers && !isProspective}
                  isChecked={isSellers}
                  onChange={selected => onSelectFilterBy(selected, 'sellers')}
                >
                  <HText style={styles.radioLabel}>Sellers</HText>
                </Checkbox>
                <Checkbox
                  size='md'
                  borderRadius={15}
                  borderColor={colors.primary}
                  _checked={{
                    backgroundColor: colors.white,
                    borderColor: colors.primary,
                  }}
                  _interactionBox={{
                    opacity: 0
                  }}
                  icon={
                    <Icon as={<Image source={icons.cirlceCheckOn} />} />
                  }
                  isDisabled={!isSellers && !isBuyers}
                  isChecked={isProspective}
                  onChange={selected => onSelectFilterBy(selected, 'prospective')}
                >
                  <HText style={styles.radioLabel}>Prospective</HText>
                </Checkbox>
              </HStack>
            </VStack>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
          >
            {isLoading ? (
              <LeadCard
                isLoading={isLoading}
                onNavigationRedirect={onNavigationRedirect}
              />
            ) : (
              <>
                {filteredLeads === 0 ? (
                  <HText style={styles.notFoundText}>No Leads, please change filter</HText>
                ) : (
                  <Swiper
                    showsButtons={false}
                    loop={true}
                    renderPagination={renderPagination}
                    height={420}
                  >
                    {isBuyers && leadsList?.buyers?.leads && leadsList.buyers.leads.map(lead => (
                      <LeadCard
                        key={lead?.lead_id}
                        lead={lead}
                        type='Buyer'
                        level='buyers'
                        onNavigationRedirect={onNavigationRedirect}
                      />
                    ))}
                    {isSellers && leadsList?.sellers?.leads && leadsList.sellers.leads.map(lead => (
                      <LeadCard
                        key={lead?.lead_id}
                        lead={lead}
                        type='Seller'
                        level='sellers'
                        onNavigationRedirect={onNavigationRedirect}
                      />
                    ))}
                    {isProspective && leadsList?.prospective?.leads && leadsList.prospective.leads.map(lead => (
                      <LeadCard
                        key={lead?.lead_id}
                        lead={lead}
                        type='Prospective'
                        level='prospective'
                        onNavigationRedirect={onNavigationRedirect}
                      />
                    ))}
                  </Swiper>
                )}
              </>
            )}
          </ScrollView>
        </View>
      )}

      {(totalLeads === 0 && !isLoading) && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
        >
          <View style={styles.bottomContainer}>
            <View style={[styles.imageWrapper, { aspectRatio: 221 / 240 }]}>
              <Image
                source={images.leadsBg}
                style={styles.image}
              />
            </View>
            <HText style={styles.subtitle}>No Leads</HText>
            <HText style={styles.description}>Buy leads to see what your consumers are looking for.</HText>
            <HButton
              text='Find Leads'
              borderColor={colors.primary}
              backgroundColor={colors.primary}
              onPress={() => onNavigationRedirect('FindLeads')}
            />
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const renderPagination = (index, total, context) => {
  return (
    <Box alignItems='center'>
      <HText style={styles.paginationText}>{index + 1}/{total}</HText>
    </Box>
  )
}