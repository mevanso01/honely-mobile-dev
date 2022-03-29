import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Profile from '../screens/Profile'
import EditProfile from '../screens/EditProfile'

const Stack = createStackNavigator()

const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  )
}

export default ProfileNavigator