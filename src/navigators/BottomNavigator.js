import React from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors, icons } from '../utils/styleGuide'
import { useSelector } from 'react-redux'

import Leads from '../screens/Leads'
import FindLeads from '../screens/FindLeads'
import ContactedLeads from '../screens/ContactedLeads'
import ProfileNavigator from './ProfileNavigator'

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const currentUser = useSelector(state => state.currentUser)

  return (
    <Tab.Navigator
      initialRouteName='Leads'
      screenOptions={{
        headerShown: false
      }}
      tabBar={props => <MyTabBar {...props} contactedLeadCount={currentUser?.contactedLeadCount || 0} />}
    >
      <Tab.Screen
        name="Leads"
        component={Leads}
      />
      <Tab.Screen
        name="FindLeads"
        component={FindLeads}
      />
      <Tab.Screen
        name="ContactedLeads"
        component={ContactedLeads}
      />
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
      />
    </Tab.Navigator>
  )
}

function MyTabBar({ state, descriptors, navigation, contactedLeadCount }) {
  const insets = useSafeAreaInsets()
  const styles = StyleSheet.create({
    barStyle: {
      flexDirection: 'row',
      backgroundColor: colors.tint02,
      height: 80 + insets.bottom,
      paddingBottom: insets.bottom
    },
    tabButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    },
    iconStyle: {
      width: 24,
      height: 24
    },
    bageIcon: {
      position: 'absolute',
      top: -10,
      right: -10,
      backgroundColor: colors.primary,
      borderRadius: 10,
      width: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      borderWidth: 1,
      borderColor: colors.tint02
    },
    bageText: {
      fontSize: 10,
      color: colors.white
    }
  })
  const getActiveIcon = (name) => {
    switch (name) {
      case 'Leads':
        return icons.category
      case 'FindLeads':
        return icons.search
      case 'ContactedLeads':
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
      case 'FindLeads':
        return icons.search
      case 'ContactedLeads':
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
            <View>
              {contactedLeadCount > 0 && route.name === 'ContactedLeads' && (
                <View style={styles.bageIcon}>
                  <Text style={styles.bageText}>{contactedLeadCount}</Text>
                </View>
              )}
              <Image
                source={isFocused ? getActiveIcon(route.name) : getInactiveIcon(route.name)}
                style={[styles.iconStyle, { tintColor: isFocused ? colors.primary : colors.text03 }]}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default BottomNavigator