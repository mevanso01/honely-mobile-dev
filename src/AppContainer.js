import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigators/RootNavigator'
import LeadsNavigator from './navigators/LeadsNavigator'

import { useToast } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'
import { doGet } from './services/http-client'
import { setUser } from './store/action/setUser'

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
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: TOAST_LENGTH_SHORT,
        marginRight: 4,
        marginLeft: 4,
      })
    }
  }

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