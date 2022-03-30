import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, icons } from '../utils/styleGuide'

import Leads from '../screens/Leads'
import BuyLeads from '../screens/BuyLeads'
import MyZipcodes from '../screens/MyZipcodes'
import Inbox from '../screens/Inbox'
import ProfileNavigator from './ProfileNavigator'

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Leads'
      screenOptions={{
        headerShown: false
      }}
      tabBar={props => <MyTabBar {...props} />}
    >
      <Tab.Screen
        name="Leads"
        component={Leads}
      />
      <Tab.Screen
        name="BuyLeads"
        component={BuyLeads}
      />
      <Tab.Screen
        name="MyZipcodes"
        component={MyZipcodes}
      />
      <Tab.Screen
        name="Inbox"
        component={Inbox}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  )
}

function MyTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets()
  const styles = StyleSheet.create({
    barStyle: {
      flexDirection: 'row',
      backgroundColor: colors.tint02,
      height: 80,
      marginBottom: insets.bottom
    },
    tabButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    iconStyle: {
      width: 24,
      height: 24
    }
  })
  const getActiveIcon = (name) => {
    switch (name) {
      case 'Leads':
        return icons.category
      case 'BuyLeads':
        return icons.buy
      case 'MyZipcodes':
        return icons.location
      case 'Inbox':
        return icons.email
      case 'ProfileNavigator':
        return icons.user
      default:
        return icons.category
    }
  }
  const getInactiveIcon = (name) => {
    switch (name) {
      case 'Leads':
        return icons.categoryOutline
      case 'BuyLeads':
        return icons.buyOutline
      case 'MyZipcodes':
        return icons.locationOutline
      case 'Inbox':
        return icons.emailOutline
      case 'ProfileNavigator':
        return icons.userOutline
      default:
        return icons.categoryOutline
    }
  }
  return (
    <View style={styles.barStyle}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <Image
              source={isFocused ? getActiveIcon(route.name) : getInactiveIcon(route.name)}
              style={[styles.iconStyle, { tintColor: isFocused ? colors.primary : colors.text03 }]}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default BottomNavigator