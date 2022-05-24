import React, { useState, useEffect } from 'react'
import { ScrollView, Image, View } from 'react-native'
import { HText, HButton, HCartButton, HUserFilterBy, HToast } from '../Shared'
import { colors, images } from '../../utils/styleGuide'
import { HStack, Box, Skeleton, useToast } from 'native-base'
import SplashScreen from 'react-native-splash-screen'
import Swiper from 'react-native-swiper'
import styles from './style'
import { doGet } from '../../services/http-client'
import { useSelector, useDispatch } from 'react-redux'
import { TOAST_LENGTH_SHORT } from '../../config'
import { LeadCard } from './LeadCard'
import { setUser } from '../../store/action/setUser'
import { useIsFocused } from '@react-navigation/native'

export const LeadsDashboard = (props) => {
  const {
    onNavigationRedirect
  } = props

  const isFocused = useIsFocused()
  const toast = useToast()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const { agentProfile } = useSelector(({ screens }) => screens.editprofile)
  const [isLoading, setIsLoading] = useState(true)
  const [leadsList, setLeadsList] = useState([])
  const [filteredLeadsList, setFilteredLeadsList] = useState([])

  const [isBuyers, setIsBuyers] = useState(true)
  const [isSellers, setIsSellers] = useState(true)
  const [isProspective, setIsProspective] = useState(true)
  const [isLoadedData, setIsLoadedData] = useState(false)
  const [leadsSwiperKey, setLeadsSwiperKey] = useState(0)

  const handleLeadsFilter = (response) => {
    let _leadsList = []
    if (response?.buyers?.leads) {
      const buyerLeads = response.buyers?.leads.filter(lead => lead.agent_status === 'NEW').reduce((leads, lead) => [...leads, { ...lead, level: 'buyers' } ], [])
      _leadsList = [..._leadsList, ...buyerLeads]
    }
    if (response?.sellers?.leads) {
      const sellerLeads = response.sellers?.leads.filter(lead => lead.agent_status === 'NEW').reduce((leads, lead) => [...leads, { ...lead, level: 'sellers' } ], [])
      _leadsList = [..._leadsList, ...sellerLeads]
    }
    if (response?.prospective?.leads) {
      const prospectiveLeads = response.prospective?.leads.filter(lead => lead.agent_status === 'NEW').reduce((leads, lead) => [...leads, { ...lead, level: 'prospective' } ], [])
      _leadsList = [..._leadsList, ...prospectiveLeads]
    }
    return _leadsList
  }

  const handleGetUserLeads = async () => {
    try {
      const response = await doGet('v1/lead', { 'agent-id': agentProfile?.agent_id })
      if (response.result === 'Error') throw response
      dispatch(setUser({ leads: response.data }))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.show({
        render: () => <HToast status='error' message={error.message} />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
    }
  }

  useEffect(() => {
    if (isLoading) return
    let _leadsList = [...leadsList]
    if (!isBuyers) _leadsList = _leadsList.filter(lead => lead.level !== 'buyers')
    if (!isSellers) _leadsList = _leadsList.filter(lead => lead.level !== 'sellers')
    if (!isProspective) _leadsList = _leadsList.filter(lead => lead.level !== 'prospective')
    setFilteredLeadsList(_leadsList)
    setLeadsSwiperKey(leadsSwiperKey + 1)
    setIsLoadedData(true)
  }, [isBuyers, isSellers, isProspective, leadsList, isLoading])

  useEffect(() => {
    if (!currentUser?.leads) return
    const _leadsList = handleLeadsFilter(currentUser?.leads)
    setLeadsList(_leadsList)
  }, [JSON.stringify(currentUser?.leads)])

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  useEffect(() => {
    if (!agentProfile?.agent_id) return
    handleGetUserLeads()
  }, [isFocused, agentProfile?.agent_id])

  return (
    <View style={styles.screenContainer}>
      <View style={[styles.innerContainer, styles.headerContainer]}>
        <HText style={styles.title}>Leads Dashboard</HText>
        <View style={styles.cartIconWrapper}>
          <HCartButton
            onPress={() => onNavigationRedirect('LeadsCheckout')}
          />
        </View>
      </View>
      {(isLoading || leadsList.length !== 0) && (
        <View style={styles.leadsContent}>
          <View style={[styles.innerContainer, { zIndex: 100 }]}>
            <HStack mb='8' justifyContent='flex-end'>
              {isLoading ? (
                <Skeleton h='4' w='20' rounded='sm' ml='7' />
              ) : (
                <HUserFilterBy
                  headerTitle={`${filteredLeadsList.length} of ${leadsList.length} leads`}
                  isBuyers={isBuyers}
                  setIsBuyers={setIsBuyers}
                  isSellers={isSellers}
                  setIsSellers={setIsSellers}
                  isProspective={isProspective}
                  setIsProspective={setIsProspective}
                />
              )}
            </HStack>
          </View>
          <ScrollView
            key={leadsSwiperKey}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
          >
            {(isLoading || !isLoadedData) ? (
              <LeadCard
                isLoading
                onNavigationRedirect={onNavigationRedirect}
              />
            ) : (
              <>
                {filteredLeadsList.length === 0 ? (
                  <HText style={styles.notFoundText}>No leads found, please adjust filtering</HText>
                ) : (
                  <Swiper
                    showsButtons={false}
                    loop={true}
                    renderPagination={renderPagination}
                    height={400}
                  >
                    {filteredLeadsList.map(lead => (
                      <LeadCard
                        key={lead?.lead_id}
                        lead={lead}
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

      {(leadsList.length === 0 && !isLoading) && (
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
            <HText style={styles.subtitle}>No New Leads</HText>
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
    <Box alignItems='center' flex='1'>
      <HText style={styles.paginationText}>{index + 1}/{total}</HText>
    </Box>
  )
}