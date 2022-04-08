import React from 'react';
import { StyleSheet, View, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FindLeads as FindLeadsScreen } from '../components/FindLeads'
import { colors } from '../utils/styleGuide'
import { HFocusAwareStatusBar } from '../components/Shared'
import styled from 'styled-components/native'

const KeyboardView = styled.KeyboardAvoidingView`
  flex: 1;
`;

const FindLeads = (props) => {
  const insets = useSafeAreaInsets()
  const findLeadsProps = {
    ...props,
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
    <View style={styles.wrapper}>
      <HFocusAwareStatusBar
        backgroundColor={colors.primary}
        barStyle='dark-content'
      />
      <KeyboardView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FindLeadsScreen {...findLeadsProps} />
      </KeyboardView>
    </View>
  )
}

export default FindLeads
