import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNavigator from './BottomNavigator'

const Stack = createStackNavigator()
import ContactLead from '../screens/ContactLead'
import ContactLeadPreset from '../screens/ContactLeadPreset'
import LeadsMap from '../screens/LeadsMap'
import BuyLeads from '../screens/BuyLeads'
import LeadsCheckout from '../screens/LeadsCheckout'
import BillingInfo from '../screens/BillingInfo'
import PropertyInfo from '../screens/PropertyInfo'

const LeadsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='BottomNavigator'
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ContactLead'
        component={ContactLead}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='ContactLeadPreset'
        component={ContactLeadPreset}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='LeadsMap'
        component={LeadsMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='BuyLeads'
        component={BuyLeads}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='LeadsCheckout'
        component={LeadsCheckout}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='BillingInfo'
        component={BillingInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='PropertyInfo'
        component={PropertyInfo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default LeadsNavigator
