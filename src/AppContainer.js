import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigators/RootNavigator'
import LeadsNavigator from './navigators/LeadsNavigator'

import { useToast } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import { doGet } from './services/http-client'
import { setUser } from './store/action/setUser'
import { isServiceProvider } from './utils/helper'
import { setAgentProfile } from './components/EditProfile/store'
import { HToast } from './components/Shared'
import { TOAST_LENGTH_SHORT } from './config'

const AppContainer = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)

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