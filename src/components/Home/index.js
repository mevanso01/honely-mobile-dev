import React, { useEffect } from 'react'
import { View, Image } from 'react-native'
import { HText, HButton, HPressableText } from '../Shared'
import Swiper from 'react-native-swiper'
import SplashScreen from 'react-native-splash-screen'
import { colors, images } from '../../utils/styleGuide'
import styles from './style'
import Logo from '../../assets/images/logo.svg'

export const Home = (props) => {
  const {
    onNavigationRedirect
  } = props

  const data = [
    {
      image: images.slider1,
      title: 'What do we offer?',
      text: 'Honely uses AI and machine learning to forecast home prices, neighborhood trends and so much more!'
    },
    {
      image: images.slider2,
      title: 'Property Value Forecasts',
      text: 'View the future value of over 100 million properties nationwide from 3 months to 3 years into the future!'
    },
    {
      image: images.slider3,
      title: 'Neighborhood At A Glance',
      text: 'Get equipped with all the predictive informaiton needed to analyze an area like a pro. '
    },
    {
      image: images.slider4,
      title: 'Buyer’s Score',
      text: 'Compare deals using our Buyer’s Score to always make sure you get the best bang for your buck!'
    },
  ]

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <View style={styles.wrapper}>
      <Logo width="100" height="36" />
      <Swiper
        showsButtons={false}
        loop={true}
        dotColor={colors.borderColor}
        activeDotColor={colors.primary}
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

      <HPressableText
        text='New to Honely? Sign Up'
        onPress={() => onNavigationRedirect('Login', { isSignUp: true })}
        fontWeight='600'
      />
    </View>
  )
}
