import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigators/RootNavigator'
import LeadsNavigator from './navigators/LeadsNavigator'
import { useSelector } from 'react-redux'

const AppContainer = () => {
  const currentUser = useSelector(state => state.currentUser)
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