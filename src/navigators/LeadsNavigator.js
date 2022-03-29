import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNavigator from './BottomNavigator'

const Stack = createStackNavigator()

const LeadsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='BottomNavigator'
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default LeadsNavigator