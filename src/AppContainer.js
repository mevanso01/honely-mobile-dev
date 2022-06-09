import React, { useState, useEffect } from 'react'
import { Platform, Alert, Linking, AppState } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigators/RootNavigator'
import LeadsNavigator from './navigators/LeadsNavigator'

import { useToast } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import { doGet } from './services/http-client'
import { setUser } from './store/action/setUser'
import { isServiceProvider, compareVersion } from './utils/helper'
import { setAgentProfile } from './components/EditProfile/store'
import { HToast } from './components/Shared'
import { TOAST_LENGTH_SHORT } from './config'
import { ANDROID_VERSION, IOS_VERSION, URL_APP_STORE, URL_GOOGLE_PLAY } from './utils/constants'
import { signoutUser } from './store/action/setUser'
import { resetProfileInfo } from './components/EditProfile/store'

const AppContainer = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const [appState, setAppState] = useState(AppState.currentState)

  const handleLogout = () => {
    dispatch(resetProfileInfo())
    dispatch(signoutUser())
  }

  const versionValidation = (currentVersion, newVerion, appURL) => {
    const valid = compareVersion(currentVersion, newVerion)
    if (!valid) {
      Alert.alert(
        "Alert",
        "New version of the app is available. Please upgrade to the latest version.",
        [
          {
            text: "Cancel",
            onPress: () => handleLogout(),
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => {
              Linking.openURL(appURL)
              handleLogout()
            }
          }
        ]
      )
    }
  }

  const handleGetAppVersion = async () => {
    try {
      const response = await doGet('dev/mobile/version')
      if (response.result === 'Error.') {
        throw response;
      }
      if (Platform.OS === 'ios') {
        versionValidation(IOS_VERSION, response.data.app_store, URL_APP_STORE)
      } else {
        versionValidation(ANDROID_VERSION, response.data.google_play, URL_GOOGLE_PLAY)
      }
    } catch (error) {
      toast.show({
        render: () => <HToast status='error' message={error.message} />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
    }
  }

  const handleGetUserCart = async () => {
    try {
      const response = await doGet('lookup-test/cart', { 'user-id': currentUser?.user_id })
      if (response.result !== 'Success') throw response
      dispatch(setUser({ cart: response.data }))
    } catch (error) {
      toast.show({
        render: () => <HToast status='error' message={error.message} />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
    }
  }

  const fetchAgentProfile = async () => {
    try {
      const response = await doGet('lookup-test/agent_profile', { agent_email: currentUser.email })
      if (response?.message) {
        throw response
      }
      dispatch(setAgentProfile({ ...response }))
    } catch (error) {
      toast.show({
        render: () => <HToast status='error' message={error.message} />,
        placement: 'top',
        duration: TOAST_LENGTH_SHORT
      })
    }
  }

  useEffect(() => {
    if (appState === 'active' && currentUser.isLoggedIn) {
      handleGetAppVersion()
    }
  }, [appState, currentUser.isLoggedIn])

  useEffect(() => {
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => { setAppState(nextAppState) },
    );
    return () => {
      appStateListener?.remove();
    };
  }, [])

  useEffect(() => {
    if (!currentUser.isLoggedIn || !currentUser?.user_type) return
    if (isServiceProvider(currentUser?.user_type)) {
      fetchAgentProfile()
    }
  }, [currentUser?.user_type, currentUser.isLoggedIn])

  useEffect(() => {
    if (currentUser.isLoggedIn) {
      handleGetUserCart()
    }
  }, [currentUser.isLoggedIn])

  return (
    <NavigationContainer>
      {
        currentUser && currentUser.isLoggedIn ?
        <LeadsNavigator /> : <RootNavigator />
      }
    </NavigationContainer>
  )
}

export default AppContainer