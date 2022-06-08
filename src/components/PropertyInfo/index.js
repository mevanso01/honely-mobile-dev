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
              <HStack backgroundColor={colors.lightGray} p='3' alignItems={'center'}>
                <HText style={styles.infoName}># of Beds</HText>
                <HText style={styles.infoValue}>{property?.structure?.beds_count}</HText>
              </HStack>
              <HStack p='3' alignItems={'center'}>
                <HText style={styles.infoName}># of Full Baths</HText>
                <HText style={styles.infoValue}>{property?.structure?.baths}</HText>
              </HStack>
              <HStack backgroundColor={colors.lightGray} p='3' alignItems={'center'}>
                <HText style={styles.infoName}># of Partial Baths</HText>
                <HText style={styles.infoValue}>{property?.structure?.partial_baths_count}</HText>
              </HStack>
              <HStack p='3' alignItems={'center'}>
                <HText style={styles.infoName}>Stories</HText>
                <HText style={styles.infoValue}>{property?.structure?.stories}</HText>
              </HStack>
              <HStack backgroundColor={colors.lightGray} p='3' alignItems={'center'}>
                <HText style={styles.infoName}>Lot Size</HText>
                <HText style={styles.infoValue}>{property?.structure?.total_area_sq_ft}</HText>
              </HStack>
              <HStack p='3' alignItems={'center'}>
                <HText style={styles.infoName}>Parking Type</HText>
                <HText style={styles.infoValue}>{property?.structure?.parking_type}</HText>
              </HStack>
              <HStack backgroundColor={colors.lightGray} p='3' alignItems={'center'}>
                <HText style={styles.infoName}>Parking Spaces Count</HText>
                <HText style={styles.infoValue}>{property?.structure?.parking_spaces_count}</HText>
              </HStack>
              <HStack p='3' alignItems={'center'}>
                <HText style={styles.infoName}>Pool</HText>
                <HText style={styles.infoValue}>{property?.structure?.pool_type}</HText>
              </HStack>
              <HStack backgroundColor={colors.lightGray} p='3' alignItems={'center'}>
                <HText style={styles.infoName}>Heating</HText>
                <HText style={styles.infoValue}>{property?.structure?.heating_type}</HText>
              </HStack>
              <HStack p='3' alignItems={'center'}>
                <HText style={styles.infoName}>Cooling</HText>
                <HText style={styles.infoValue}>{property?.structure?.air_conditioning_type}</HText>
              </HStack>
              <HStack backgroundColor={colors.lightGray} p='3' alignItems={'center'}>
                <HText style={styles.infoName}>Year Built</HText>
                <HText style={styles.infoValue}>{property?.structure?.year_built}</HText>
              </HStack>
              <HStack p='3' alignItems={'center'}>
                <HText style={styles.infoName}>Units Count</HText>
                <HText style={styles.infoValue}>{property?.structure?.units_count}</HText>
              </HStack>
              <HStack backgroundColor={colors.lightGray} p='3' alignItems={'center'}>
                <HText style={styles.infoName}>Architecture Type</HText>
                <HText style={styles.infoValue}>{property?.structure?.architecture_type}</HText>
              </HStack>
              <HStack p='3' alignItems={'center'}>
                <HText style={styles.infoName}>Contruction</HText>
                <HText style={styles.infoValue}>{property?.structure?.construction_type}</HText>
              </HStack>
              <HStack backgroundColor={colors.lightGray} p='3' alignItems={'center'}>
                <HText style={styles.infoName}>Exterior Walls</HText>
                <HText style={styles.infoValue}>{property?.structure?.exterior_wall_type}</HText>
              </HStack>
              <HStack p='3' alignItems={'center'}>
                <HText style={styles.infoName}>Interior Walls</HText>
                <HText style={styles.infoValue}>{property?.structure?.interior_wall_type}</HText>
              </HStack>
              <HStack backgroundColor={colors.lightGray} p='3' alignItems={'center'}>
                <HText style={styles.infoName}>Flooring</HText>
                <HText style={styles.infoValue}>{property?.structure?.flooring_types}</HText>
              </HStack>
              <HStack p='3' alignItems={'center'}>
                <HText style={styles.infoName}>Water Type</HText>
                <HText style={styles.infoValue}>{property?.structure?.water_type}</HText>
              </HStack>
              <HStack backgroundColor={colors.lightGray} p='3' alignItems={'center'}>
                <HText style={styles.infoName}>Sewer Type</HText>
                <HText style={styles.infoValue}>{property?.structure?.sewer_type}</HText>
              </HStack>
            </VStack>
          </View>
        </ScrollView>
      )}
    </View>
  )
}
