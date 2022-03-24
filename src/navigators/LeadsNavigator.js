import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Leads from '../screens/Leads'

const Stack = createStackNavigator()

const LeadsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Leads'
        component={Leads}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default LeadsNavigator