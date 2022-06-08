import React, { useState, useEffect } from 'react'
import { View, ScrollView, Image } from 'react-native'
import { Pressable, HStack, Toast, VStack, Skeleton, Box } from 'native-base'
import { HText } from '../Shared'
import { colors, icons } from '../../utils/styleGuide'
import { doGet } from '../../services/http-client'
import { TOAST_LENGTH_SHORT } from '../../config'
import { parsePrice } from '../../utils/helper'
import SpinnerOverlay from 'react-native-loading-spinner-overlay'
import Swiper from 'react-native-swiper'
import FitImage from 'react-native-fit-image'
import styles from './style'

export const PropertyInfo = (props) => {
  const {
    propertyId,
    navigation
  } = props

  const [isLoading, setIsLoading] = useState(true)
  const [property, setProperty] = useState({})
  const [forecastPropertyState, setForeCastPropertyState] = useState({ loading: true, property: {} })
  const [mapsImageState, setMapsImageState] = useState({ valid: false, url: null })
  const [propertyStructure, setPropertyStructure] = useState([])

  const formatNumber = (num) => {
    const number = Number(num)
    if (number) {
      return Math.round(number / 100) * 100
    } else {
      return '--'
    }
  }

  const getPhotosCount = () => {
    let count = 0
    if (property?.address?.photos_count) {
      if (parseInt(property.address.photos_count) > 5) {
        count = 5
      } else {
        count = parseInt(property.address.photos_count)
      }
    }
    return count
  }

  const getPhotoURL = (index) => {
    let url = ''
    if (property?.listing_key && getListhubPhotoCount > 0) {
      url = 'https://listhub-property-images.s3.amazonaws.com/' + property?.listing_key + '_' + index + '.jpg'
    }
    return url
  }

  const handleGetMapsImage = () => {
    const API_KEY = 'AIzaSyClIFG-ONBwyXrn4_kaA4yMYHGpZD5EEko'
    const url = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + property.address.latitude + ',' + property.address.longitude + '&radius=100&return_error_code=true&source=outdoor&key=' + API_KEY
      fetch(url, { method: 'GET' })
        .then(response => {
          if (!response.ok) {
            throw { message: response.status }
          }
          return response.blob
        })
        .then(blob => {
          setMapsImageState({ valid: true, url: url })
        }).catch(error => {
          setMapsImageState({ valid: true, url: 'https://www.honely.com/site_images/listing_default_image.png' })
        })
  }

  const handleGetProperty = async () => {
    try {
      const response = await doGet('searches/listing', { search_id: propertyId })
      if (response.error) throw { message: response.error }
      setProperty(response)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      Toast.show({
        render: () => <HToast status='error' message={error.message} />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
    }
  }

  const handleGetForeCastProperty = async () => {
    try {
      const response = await doGet('searches/forecast', { property_id: propertyId })
      if (response.error) throw { message: response.error }
      setForeCastPropertyState({
        loading: false,
        property: response
      })
    } catch (error) {
      setForeCastPropertyState({
        ...forecastPropertyState,
        loading: false
      })
      Toast.show({
        render: () => <HToast status='error' message={error.message} />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
    }
  }

  useEffect(() => {
    if (isLoading) return
    let _propertyStructure = []
    if (property?.structure?.beds_count) {
      _propertyStructure.push({ name: '# of Beds', value: property?.structure?.beds_count })
    }
    if (property?.structure?.baths) {
      _propertyStructure.push({ name: '# of Full Baths', value: property?.structure?.baths })
    }
    if (property?.structure?.partial_baths_count) {
      _propertyStructure.push({ name: '# of Partial Baths', value: property?.structure?.partial_baths_count })
    }
    if (property?.structure?.stories) {
      _propertyStructure.push({ name: 'Stories', value: property?.structure?.stories })
    }
    if (property?.structure?.total_area_sq_ft) {
      _propertyStructure.push({ name: 'Lot Size', value: property?.structure?.total_area_sq_ft })
    }
    if (property?.structure?.parking_type) {
      _propertyStructure.push({ name: 'Parking Type', value: property?.structure?.parking_type })
    }
    if (property?.structure?.parking_spaces_count) {
      _propertyStructure.push({ name: 'Parking Spaces Count', value: property?.structure?.parking_spaces_count })
    }
    if (property?.structure?.pool_type) {
      _propertyStructure.push({ name: 'Pool', value: property?.structure?.pool_type })
    }
    if (property?.structure?.heating_type) {
      _propertyStructure.push({ name: 'Heating', value: property?.structure?.heating_type })
    }
    if (property?.structure?.air_conditioning_type) {
      _propertyStructure.push({ name: 'Cooling', value: property?.structure?.air_conditioning_type })
    }
    if (property?.structure?.year_built) {
      _propertyStructure.push({ name: 'Year Built', value: property?.structure?.year_built })
    }
    if (property?.structure?.units_count) {
      _propertyStructure.push({ name: 'Units Count', value: property?.structure?.units_count })
    }
    if (property?.structure?.architecture_type) {
      _propertyStructure.push({ name: 'Architecture Type', value: property?.structure?.architecture_type })
    }
    if (property?.structure?.construction_type) {
      _propertyStructure.push({ name: 'Contruction', value: property?.structure?.construction_type })
    }
    if (property?.structure?.exterior_wall_type) {
      _propertyStructure.push({ name: 'Exterior Walls', value: property?.structure?.exterior_wall_type })
    }
    if (property?.structure?.interior_wall_type) {
      _propertyStructure.push({ name: 'Interior Walls', value: property?.structure?.interior_wall_type })
    }
    if (property?.structure?.flooring_types) {
      _propertyStructure.push({ name: 'Flooring', value: property?.structure?.flooring_types })
    }
    if (property?.structure?.water_type) {
      _propertyStructure.push({ name: 'Water Type', value: property?.structure?.water_type })
    }
    if (property?.structure?.sewer_type) {
      _propertyStructure.push({ name: 'Sewer Type', value: property?.structure?.sewer_type })
    }
    setPropertyStructure(_propertyStructure)
  }, [isLoading, property])

  useEffect(() => {
    if (property?.address?.latitude && property?.address?.longitude) {
      handleGetMapsImage()
    }
  }, [property?.address])

  useEffect(() => {
    handleGetForeCastProperty()
    handleGetProperty()
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
      <HText style={styles.headerTitle}>Property Info</HText>
      <SpinnerOverlay
        visible={isLoading}
      />
      {!isLoading && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.innerContainer}>
            <HStack>
              <Image source={icons.location} style={styles.addressIcon} />
              <VStack flex='1'>
                <HText style={styles.basicInfoText}>{property?.address?.full_address}</HText>
                <HText style={styles.basicInfoText}>{property.structure.beds_count} bds | {property.structure.baths} ba | {property.structure.total_area_sq_ft} sqft</HText>
              </VStack>
            </HStack>
            <VStack mt='4' alignItems='center'>
              <HText style={styles.estimateText}>Honely Estimate Value:</HText>
              <HText style={styles.estimateValue}>{parsePrice(property?.valuation?.appraisal)}</HText>
              {forecastPropertyState.loading ? (
                <Skeleton w='12' h='5' />
              ) : (
                <HText style={styles.estimateRange}>Estimated range ({parsePrice(formatNumber(forecastPropertyState.property?.property_forecast?.appraisal_low))} - {parsePrice(formatNumber(forecastPropertyState.property?.property_forecast?.appraisal_high))})</HText>
              )}
            </VStack>
          </View>
          <Box mt='6'>
            {getPhotosCount() > 0 ? (
              <Swiper
                showsButtons={false}
                loop={true}
                dotColor={colors.borderColor}
                activeDotColor={colors.primary}
                paginationStyle={{ bottom: 8 }}
                height={230}
              >
                {[...Array(getPhotosCount()).keys()].map(index => (
                  <FitImage
                    key={index}
                    source={{ uri: getPhotoURL(index + 1) }}
                    indicatorSize='large'
                    indicatorColor={colors.primary}
                    resizeMode='cover'
                    style={styles.photo}
                  />
                ))}
              </Swiper>
            ) : (
              <>
                {!mapsImageState.valid ? (
                  <View style={styles.photoSkeletonWrapper}>
                    <Skeleton h='56' />
                  </View>
                ) : (
                  <FitImage
                    source={{ uri: mapsImageState.url }}
                    indicatorSize='large'
                    indicatorColor={colors.primary}
                    resizeMode='cover'
                    style={styles.photo}
                  />
                )}
              </>
            )}
          </Box>
          <View style={styles.innerContainer}>
            <VStack my='8'>
              {propertyStructure.map((structure, index) => (
                <HStack
                  key={index}
                  backgroundColor={index % 2 === 0 ? colors.lightGray : colors.white}
                  p='3' alignItems={'center'}
                >
                  <HText style={styles.infoName}>{structure.name}</HText>
                  <HText style={styles.infoValue}>{structure.value}</HText>
                </HStack>
              ))}
            </VStack>
          </View>
        </ScrollView>
      )}
    </View>
  )
}
