import React, { useState, useRef, useEffect } from 'react'
import { View, Image, ScrollView } from 'react-native'
import { Pressable, Box, HStack, VStack, Slider, Divider } from 'native-base'
import { HText, HButton } from '../Shared'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import styles from './style'
import { colors, icons } from '../../utils/styleGuide'
import { deviceWidth } from '../../utils/stylesheet'
import FeatherIcons from 'react-native-vector-icons/Feather'

const DEFAULT_PADDING = { top: 20, right: 20, bottom: 20, left: 20 }
const location = {
  lat: 37.78825,
  lng: -122.4324,
}
const markers = [
  {
    latitude: 37.78825,
    longitude: -122.7324,
  },
  {
    latitude: 37.68825,
    longitude: -122.2324,
  },
  {
    latitude: 37.58825,
    longitude: -122.1324,
  },
  {
    latitude: 37.62825,
    longitude: -122.2324,
  },
  {
    latitude: 37.6825,
    longitude: -122.0024,
  },
]

export const LeadsMap = (props) => {
  const {
    navigation,
    onNavigationRedirect
  } = props

  const [maxDistance, setMaxDistance] = useState(14)
  const mapRef = useRef(null)
  const [region, setRegion] = useState({
    latitude: location.lat,
    longitude: location.lng,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5 * deviceWidth / 200,
  })

  const fitAllMarkers = () => {
    mapRef.current.fitToCoordinates(markers, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }

  useEffect(() => {
    if (mapRef.current) {
      fitAllMarkers()
    }
  }, [markers, mapRef])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
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
        <HText style={styles.addressText}>Miami, Fl</HText>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <VStack alignItems='center'>
          <View style={styles.maxDistanceLabelWrapper}>
            <HText style={styles.labelText}>Maximum distance</HText>
          </View>
          <View style={styles.sliderWrapper}>
            <Image source={icons.location} style={styles.maxDistanceIcon} />
            <Slider
              defaultValue={maxDistance}
              size="lg"
              onChange={val => setMaxDistance(val)}
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
          onPress={() => onNavigationRedirect('BuyLeads')}
        >
          <View style={styles.sectionContainer}>
            <VStack width='70%'>
              <HText style={styles.userTypeText}>Sellers</HText>
              <HText style={styles.descriptionText}>Verified sellers from Honely.com</HText>
            </VStack>
            <HStack width='30%' justifyContent='space-between'>
              <Box>
                <HText style={styles.qtyText}>3</HText>
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
          onPress={() => onNavigationRedirect('BuyLeads')}
        >
          <View style={styles.sectionContainer}>
            <VStack width='70%'>
              <HText style={styles.userTypeText}>Buyers</HText>
              <HText style={styles.descriptionText}>Verified sellers from Honely.com</HText>
            </VStack>
            <HStack width='30%' justifyContent='space-between'>
              <Box>
                <HText style={styles.qtyText}>28</HText>
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
          onPress={() => onNavigationRedirect('BuyLeads')}
        >
          <View style={styles.sectionContainer}>
            <VStack width='70%'>
              <HText style={styles.userTypeText}>Prospective Sellers</HText>
              <HText style={styles.descriptionText}>Potential seller contacts based on our AI and advanced search reuslts.</HText>
            </VStack>
            <HStack width='30%' justifyContent='space-between'>
              <Box>
                <HText style={styles.qtyText}>34</HText>
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
          onPress={() => onNavigationRedirect('BuyLeads')}
        />
      </Box>
    </View>
  )
}
