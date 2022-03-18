import React, { useEffect } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { useTheme } from 'styled-components/native'
import { HText, HButton } from '../Shared'
import Swiper from 'react-native-swiper'
import SplashScreen from 'react-native-splash-screen'

export const Home = (props) => {
  const {
    onNavigationRedirect
  } = props

  const theme = useTheme()

  const data = [
    {
      image: theme.images.intros.slider1,
      title: 'What do we offer?',
      text: 'Honely uses AI and machine learning to forecast home prices, neighborhood trends and so much more!'
    },
    {
      image: theme.images.intros.slider2,
      title: 'Property Value Forecasts',
      text: 'View the future value of over 100 million properties nationwide from 3 months to 3 years into the future!'
    },
    {
      image: theme.images.intros.slider3,
      title: 'Neighborhood At A Glance',
      text: 'Get equipped with all the predictive informaiton needed to analyze an area like a pro. '
    },
    {
      image: theme.images.intros.slider4,
      title: 'Buyer’s Score',
      text: 'Compare deals using our Buyer’s Score to always make sure you get the best bang for your buck!'
    },
  ]

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 30,
      paddingBottom: 50
    },
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 30
    },
    title: {
      textAlign: 'center',
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 8
    },
    description: {
      textAlign: 'center',
      color: theme.colors.text02,
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 21
    },
    logoWrapper: {
      resizeMode: 'contain',
      width: 100
    },
    slideImage: {
      width: '100%',
      height: '70%',
      resizeMode: 'cover',
    },
    button: {
      width: 180,
      height: 50,
      marginVertical: 16,
      backgroundColor: theme.colors.primary,
      borderRadius: 30,
      alignSelf: 'center'
    },
    buttonText:{
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '500',
      color: '#FFF',
      alignSelf: 'center',
    }
  })

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <View style={styles.wrapper}>
      <Image source={theme.images.logo} style={styles.logoWrapper} />
      <Swiper
        showsButtons={false}
        loop={true}
        dotColor={theme.colors.borderColor}
        activeDotColor={theme.colors.primary}
      >
        {data.map(item => (
          <View
            key={item.title}
            style={styles.slide}
          >
            <Image source={item.image} style={styles.slideImage} />
            <View style={{ padding: 18 }}>
              <HText style={styles.title}>{item.title}</HText>
              <HText style={styles.description}>{item.text}</HText>
            </View>
          </View>
        ))}
      </Swiper>

      <HButton
        text='Log in'
        onPress={() => onNavigationRedirect('Login')}
        marginVertical={16}
      />

      <HText
        style={{ fontSize: 16 }}
        color={theme.colors.primary}
        weight='700'
      >
        New to Honely? Sign Up
      </HText>
    </View>
  )
}
