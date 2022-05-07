import React, { useState, useEffect } from 'react'
import { ScrollView, Image, View, TouchableWithoutFeedback } from 'react-native'
import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import { HText, HButton, HCartButton, HUserFilterBy } from '../Shared'
import { colors, images, icons } from '../../utils/styleGuide'
import { HStack, Box, Skeleton, useToast, Pressable } from 'native-base'
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
  const [openFilter, setOpenFilter] = useState(false)

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
    <TouchableWithoutFeedback
      onPress={() => setOpenFilter(false)}
    >
      <View style={styles.screenContainer}>
        <View style={[styles.innerContainer, styles.headerContainer]}>
          <HText style={styles.title}>Leads Dashboard</HText>
          <View style={styles.cartIconWrapper}>
            <HCartButton
              onPress={() => onNavigationRedirect('LeadsCheckout')}
              countWrapperStyle={{ backgroundColor: colors.primary, borderWidth: 0 }}
              countTextStyle={{ color: colors.white }}
            />
          </View>
        </View>
        {(isLoading || totalLeads !== 0) && (
          <View style={styles.leadsContent}>
            <View style={[styles.innerContainer, { zIndex: 100 }]}>
              <HStack mb='8' justifyContent='flex-end'>
                <View style={styles.filterContainer}>
                  {!totalLeads ? (
                    <Skeleton h='3' w='16' rounded='sm' ml='7' />
                  ) : (
                    <Pressable
                      _pressed={{ opacity: 0.6 }}
                      onPress={() => setOpenFilter(!openFilter)}
                    >
                      <HStack>
                        <HText style={styles.filterText}>{filteredLeads} of {totalLeads} leads</HText>
                        <Image source={icons.arrowDown} style={[styles.arrowDownIcon, { transform: [{ rotate: !openFilter ? '0deg': '180deg' }] }]} />
                      </HStack>
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
                    <HText style={styles.notFoundText}>No leads found, please adjust filtering</HText>
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
    </TouchableWithoutFeedback>
  )
}

const renderPagination = (index, total, context) => {
  return (
    <Box alignItems='center'>
      <HText style={styles.paginationText}>{index + 1}/{total}</HText>
    </Box>
  )
}