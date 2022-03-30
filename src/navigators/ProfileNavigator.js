import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../screens/Profile'
import EditProfile from '../screens/EditProfile'
import Settings from '../screens/Settings'

const Stack = createStackNavigator()

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Profile'
    >
      <Stack.Screen
        name='Profile'
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='EditProfile'
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Settings'
        component={Settings}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default ProfileNavigator