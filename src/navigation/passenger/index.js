import * as React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import SearchScreen from '../../features/passenger/search'
import BookingsScreen from '../../features/passenger/bookings'
import SettingsScreen from '../../features/passenger/settings'
import FilterScreen from '../../features/passenger/search/filter'
import ResultScreen from '../../features/passenger/search/results'
import ProfileScreen from '../../features/passenger/profile'
import BookSeatScreen from '../../features/passenger/book-seat'
import MakePaymentScreen from '../../features/passenger/make-payment'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Colors} from '../../resources'

const Stack = createStackNavigator()

const SearchTab = () => {
  return (
    <Tab.Navigator initialRouteName="Search" screenOptions={{}}>
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Search',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="bookmarks" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Settings',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const Tab = createBottomTabNavigator()

function PassengerStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="SearchTab">
      <Stack.Screen
        name="SearchTab"
        component={SearchTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Filters"
        component={FilterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Results"
        component={ResultScreen}
        options={{
          headerBackTitle: null,
          headerBackTitleVisible: false,
          title: 'Available Buses',
        }}
      />
      <Stack.Screen
        name="BookSeat"
        component={BookSeatScreen}
        options={{
          headerBackTitle: null,
          headerBackTitleVisible: false,
          title: 'Select the seats',
        }}
      />
      <Stack.Screen
        name="MakePayment"
        component={MakePaymentScreen}
        options={{headerBackTitle: null, headerBackTitleVisible: false}}
      />
      {/* <Stack.Screen
        name="PaymentCompleted"
        component={ResultScreen}
        options={{headerBackTitle: null, headerBackTitleVisible: false}}
      /> */}
      <Stack.Screen
        name="UpdateProfile"
        component={ProfileScreen}
        options={{headerBackTitle: null, headerBackTitleVisible: false}}
      />
    </Stack.Navigator>
  )
}

export default PassengerStackNavigator
