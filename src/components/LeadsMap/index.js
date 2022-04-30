import React, { useState, useRef, useEffect } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { Pressable, Box, HStack, VStack, Slider, Divider, useToast, Skeleton } from 'native-base'
import { HText, HButton } from '../Shared'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import styles from './style'
import { colors, icons } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'
import FeatherIcons from 'react-native-vector-icons/Feather'
import { doGet } from '../../services/http-client'
import { TOAST_LENGTH_SHORT } from '../../config'
import { useSelector } from 'react-redux'

const DEFAULT_PADDING = { top: 20, right: 20, bottom: 20, left: 20 }
const location = {
  lat: 37.78825,
  lng: -122.4324,
}

export const LeadsMap = (props) => {
  const {
    level,
    address,
    navigation,
    onNavigationRedirect
  } = props

  const currentUser = useSelector(state => state.currentUser)
  const toast = useToast()
  const [maxDistance, setMaxDistance] = useState(0)
  const mapRef = useRef(null)
  const [region, setRegion] = useState({
    latitude: location.lat,
    longitude: location.lng,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5 * deviceWidth / 200,
  })
  const [markers, setMarkers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [leadsListing, setLeadsListing] = useState({})
  const [isCentered, setIsCentered] = useState(false)

  const fitAllMarkers = () => {
    if (markers.length === 0) {
      !isCentered && handleSetMapCenter()
    } else if (markers.length === 1) {
      setRegion({
        ...region,
        latitude: markers[0].latitude,
        longitude: markers[0].longitude,
      })
    } else {
      mapRef.current.fitToCoordinates(markers, {
        edgePadding: DEFAULT_PADDING,
        animated: true,
      });
    }
  }

  const handleGoToBuyLeads = (filterBy) => {
    onNavigationRedirect('BuyLeads', { leads: leadsListing, filterBy: filterBy, fullAddres: getFullAddress() })
  }

  const getFullAddress = () => {
    if (level === 'state') return address.state_short
    else {
      let fulllAddress = ''
      if (address?.zip_code) {
        fulllAddress += address?.zip_code + ' '
      }
      if (address?.city) {
        fulllAddress += address?.city + ', '
      }
      fulllAddress += address?.state
      return fulllAddress
    }
  }

  const handleGetLeads = async (level, address, mile) => {
    try {
      setIsLoading(true)
      let params = {}
      if (level === 'zipcode' || level === 'zip_code') {
        params = {
          level: 'zip_code',
          zip_code: address.zip_code,
          city: address?.city,
          state: address.state,
          user_id: currentUser.user_id
        }
        if (mile) {
          params.mile = mile
        }
      }
      if (level === 'city') {
        if (address.city) {
          params = {
            level: 'city',
            city: address.city,
            state: address.state,
            user_id: currentUser.user_id
          }
        } else {
          params = {
            level: 'state',
            state: address.state,
            user_id: currentUser.user_id
          }
        }
      }
      if (level === 'state') {
        params = {
          level: 'state',
          state: address.state_short,
          user_id: currentUser.user_id
        }
      }
      const response = await doGet('searches/leads', params)
      if (response.result === 'Error') throw response
      setLeadsListing(response.data)
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
    if (mapRef.current) {
      fitAllMarkers()
    }
  }, [markers, mapRef, isCentered])

  useEffect(() => {
    handleGetLeads(level, address)
  }, [level, address])

  useEffect(() => {
    if (!Object.keys(leadsListing).length) return
    let allLeads = []
    if (leadsListing?.sellers?.leads) allLeads = [...allLeads, ...leadsListing?.sellers?.leads]
    if (leadsListing?.buyers?.leads) allLeads = [...allLeads, ...leadsListing?.buyers?.leads]
    if (leadsListing?.prospective?.leads) allLeads = [...allLeads, ...leadsListing?.prospective?.leads]
    const _markers = allLeads.reduce((locations, lead) => [...locations, { latitude: lead.latitude, longitude: lead.longitude }], [])
    setMarkers(_markers)
  }, [leadsListing])

  const handleSetMapCenter = () => {
    const address = getFullAddress()
    const API_KEY = 'AIzaSyClIFG-ONBwyXrn4_kaA4yMYHGpZD5EEko'
    fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+address+'&key='+API_KEY)
      .then(response => response.json())
      .then(data => {
        const latitude = data.results[0].geometry.location.lat;
        const longitude = data.results[0].geometry.location.lng;
        setRegion({
          ...region,
          latitude: latitude,
          longitude: longitude,
        })
        setIsCentered(true)
      })
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        ref={mapRef}
      >
        {markers.map((marker, i) => (
          <Marker
            key={i}
            coordinate={marker}
          >
            <Image source={icons.leadsMarker} style={styles.markerIcon} />
          </Marker>
        ))}
      </MapView>
      <View style={styles.backBtnWrapper}>
        <Pressable
          backgroundColor={colors.primary}
          borderRadius={30}
          width='7'
          height='7'
          alignItems='center'
          justifyContent='center'
          onPress={() => navigation.goBack()}
          _pressed={{
            backgroundColor: colors.lightPrimary
          }}
        >
          <Image source={icons.arrowLeft} style={styles.backIcon} />
        </Pressable>
      </View>
      <View style={styles.addressContainer}>
        <Image source={icons.location} style={styles.addressIcon} />
        <HText style={styles.addressText}>{getFullAddress()}</HText>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <VStack alignItems='center'>
          {(level === 'zipcode' || level === 'zip_code') && (
            <>
              <View style={styles.maxDistanceLabelWrapper}>
                <HText style={styles.labelText}>Maximum distance</HText>
              </View>
              <View style={styles.sliderWrapper}>
                <Image source={icons.location} style={styles.maxDistanceIcon} />
                <Slider
                  defaultValue={maxDistance}
                  maxValue={50}
                  size="lg"
                  onChange={val => setMaxDistance(Math.floor(val))}
                  onChangeEnd={val => handleGetLeads(level, address, Math.floor(val))}
                >
                  <Slider.Track bg={colors.lightGray}>
                    <Slider.FilledTrack bg={colors.primary_100} />
                  </Slider.Track>
                  <Slider.Thumb borderWidth={0} bg={colors.white}>
                    <View style={styles.thumbWrapper}>
                      <Image source={icons.sliderThumb} style={styles.thumbIcon} />
                      <HText numberOfLines={1} style={styles.labelText}>{maxDistance} mi</HText>
                    </View>
                  </Slider.Thumb>
                </Slider>
              </View>
            </>
          )}
          <View style={styles.leadsQtyContainer}>
            <HStack>
              <Box width='70%'>
                <HText style={styles.labelText}>Leads</HText>
              </Box>
              <Box width='30%'>
                <HText style={styles.labelText} mLeft={28}>Qty.</HText>
              </Box>
            </HStack>
          </View>
        </VStack>
        <Divider backgroundColor={colors.primary} opacity={0.6} />
        <Pressable
          _pressed={{
            backgroundColor: colors.text05
          }}
          isDisabled={isLoading}
          onPress={() => handleGoToBuyLeads('sellers')}
        >
          <View style={styles.sectionContainer}>
            <VStack width='70%'>
              <HText style={styles.userTypeText}>Sellers</HText>
              <HText style={styles.descriptionText}>Verified sellers from Honely.com</HText>
            </VStack>
            <HStack width='30%' justifyContent='space-between'>
              <Box>
                {isLoading ? (
                  <Skeleton h='6' w='10' rounded='sm' ml='7' />
                ) : (
                  <HText style={styles.qtyText}>{leadsListing?.sellers?.total || 0}</HText>
                )}
              </Box>
              <FeatherIcons name='arrow-right' size={24} color={colors.primary_100} />
            </HStack>
          </View>
        </Pressable>
        <Divider backgroundColor={colors.primary} opacity={0.6} />
        <Pressable
          _pressed={{
            backgroundColor: colors.text05
          }}
          isDisabled={isLoading}
          onPress={() => handleGoToBuyLeads('buyers')}
        >
          <View style={styles.sectionContainer}>
            <VStack width='70%'>
              <HText style={styles.userTypeText}>Buyers</HText>
              <HText style={styles.descriptionText}>Verified sellers from Honely.com</HText>
            </VStack>
            <HStack width='30%' justifyContent='space-between'>
              <Box>
                {isLoading ? (
                  <Skeleton h='6' w='10' rounded='sm' ml='7' />
                ) : (
                  <HText style={styles.qtyText}>{leadsListing?.buyers?.total || 0}</HText>
                )}
              </Box>
              <FeatherIcons name='arrow-right' size={24} color={colors.primary_100} />
            </HStack>
          </View>
        </Pressable>
        <Divider backgroundColor={colors.primary} opacity={0.6} />
        <Pressable
          _pressed={{
            backgroundColor: colors.text05
          }}
          isDisabled={isLoading}
          onPress={() => handleGoToBuyLeads('prospective')}
        >
          <View style={styles.sectionContainer}>
            <VStack width='70%'>
              <HText style={styles.userTypeText}>Prospective Sellers</HText>
              <HText style={styles.descriptionText}>Potential seller contacts based on our AI and advanced search reuslts.</HText>
            </VStack>
            <HStack width='30%' justifyContent='space-between'>
              <Box>
                {isLoading ? (
                  <Skeleton h='6' w='10' rounded='sm' ml='7' />
                ) : (
                  <HText style={styles.qtyText}>{leadsListing?.prospective?.total || 0}</HText>
                )}
              </Box>
              <FeatherIcons name='arrow-right' size={24} color={colors.primary_100} />
            </HStack>
          </View>
        </Pressable>
      </ScrollView>
      <Box alignItems='center' mt='4' mb='4'>
        <HButton
          text='View All Leads'
          borderColor={colors.darkPrimary}
          backgroundColor={colors.darkPrimary}
          widt={(deviceWidth - 36) * 0.9}
          height={60}
          isDisabled={isLoading}
          disabledOpacity={0.6}
          onPress={() => handleGoToBuyLeads(null)}
        />
      </Box>
    </View>
  )
}
