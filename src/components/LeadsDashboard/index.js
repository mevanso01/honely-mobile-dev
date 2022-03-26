import React, { useState } from 'react'
import { ScrollView, Image, View } from 'react-native'
import { HText, HSliderButton, HButton } from '../Shared'
import { images } from '../../utils/styleGuide'
import { HStack } from 'native-base'
import styles from './style'

export const LeadsDashboard = (props) => {
  const [isInbound, setIsInBound] = useState(true)
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <HText style={styles.title}>Leads Dashboard</HText>
      <HStack justifyContent='center' mt='8'>
        <HSliderButton
          firstText='Inbound'
          secondText='Claimed'
          onFirstPress={() => setIsInBound(true)}
          onSecondPress={() => setIsInBound(false)}
        />
      </HStack>
      <View style={styles.bottomContainer}>
        <View style={[styles.imageWrapper, { aspectRatio: 255 / 265 }]}>
          <Image
            source={images.leadsBg}
            style={styles.image}
          />
        </View>
        <HText style={styles.title}>
          {isInbound ? 'No Leads' : 'No Claimed Leads'}
        </HText>
        <HText style={styles.description}>
          {isInbound ? 'Buy leads to see what your consumers are looking for.' : 'Claim any leads from the dashboard to see claimed leads over here.'}
        </HText>
        <HButton
          text='Buy Leads'
          onPress={() => {}}
        />
      </View>
     </ScrollView>
  )
}