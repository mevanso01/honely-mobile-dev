import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { PropertyInfo as PropertyInfoScreen } from '../components/PropertyInfo'
import { colors } from '../utils/styleGuide'
import { HFocusAwareStatusBar } from '../components/Shared'

const PropertyInfo = (props) => {
  const insets = useSafeAreaInsets()
  const propertyProps = {
    ...props,
    propertyId: props.route.params?.propertyId,
    onNavigationRedirect: (page, params) => {
      if (!page) return
      props.navigation.navigate(page, params);
    },
  }

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      paddingBottom: insets.bottom,
    }
  })

  return (
    <SafeAreaView style={styles.wrapper}>
      <HFocusAwareStatusBar
        backgroundColor={colors.white}
        barStyle='dark-content'
      />
      <PropertyInfoScreen {...propertyProps} />
    </SafeAreaView>
  )
}

export default PropertyInfo
