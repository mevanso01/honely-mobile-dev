import React from 'react'
import { View, ScrollView, Image } from 'react-native'
import { Box, VStack } from 'native-base'
import { HText, HButton } from '../Shared'
import { colors, images } from '../../utils/styleGuide'
import styles from './style'

export const Profile = (props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View>
        <HText style={styles.title}>My Profile</HText>
        <HText style={styles.subTitle}>What you look like to consumer</HText>
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={images.userAvatar}
          style={styles.image}
        />
        <View style={styles.userName}>
          <HText style={styles.title}>Jeff Jefferies</HText>
          <HText style={styles.nameDetail}>Keller Willaims Realty</HText>
        </View>
      </View>
      <VStack mt='4' mb='3'>
        <Box alignItems='center'>
          <HButton
            text='Edit Profile'
            onPress={() => {}}
          />
        </Box>
        <Box alignItems='center' mt='2'>
          <HButton
            text='Settings'
            backgroundColor={colors.white}
            borderColor={colors.white}
            textStyle={{
              color: colors.primary
            }}
            shadow={null}
            onPress={() => {}}
          />
        </Box>
      </VStack>
    </ScrollView>
  )
}