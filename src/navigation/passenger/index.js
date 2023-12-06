import * as React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import SearchScreen from '../../features/passenger/search'
import BookingsScreen from '../../features/passenger/bookings'
import SettingsScreen from '../../features/passenger/settings'
import FilterScreen from '../../features/passenger/search/filter'

const Stack = createStackNavigator()

const SearchTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}

const Tab = createBottomTabNavigator()

function PassengerStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SearchTab"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SearchTab" component={SearchTab} />
      <Stack.Screen name="Filters" component={FilterScreen} />
    </Stack.Navigator>
  )
}

export default PassengerStackNavigator
