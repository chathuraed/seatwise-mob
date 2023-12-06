import React from 'react'
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer'
import {Colors} from '../../resources'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import DashboardScreen from '../../features/owner/dashboard'
import SchedulesScreen from '../../features/owner/schedules'
import RoutesScreen from '../../features/owner/routes'
import DriverScreen from '../../features/owner/drivers'
import AssistantScreen from '../../features/owner/assistants'
import CreateRouteScreen from '../../features/owner/routes/create-route'
import RouteAvailableSchedulesScreen from '../../features/owner/schedules/route-available-schedules'
import CreateScheduleScreen from '../../features/owner/schedules/create-schedule'
import BusesScreen from '../../features/owner/bus'
import CreateBusScreen from '../../features/owner/bus/create-bus'
import BusDetailsScreen from '../../features/owner/bus/bus-details'
import {Button} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useDispatch} from 'react-redux'
import {authActions} from '../../store/reducer/auth-slice'
import {useNavigation} from '@react-navigation/native'
import {navigate} from '../rootNavigation'

const Stack = createNativeStackNavigator()
const RoutesStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="RouteList">
      <Stack.Screen
        name="RouteList"
        component={RoutesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RouteCreate"
        component={CreateRouteScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.green,
          },
          headerTintColor: '#000',
          headerTitle: 'Create Route',
        }}
      />
      <Stack.Screen
        name="RouteAvailableSchedules"
        component={RouteAvailableSchedulesScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.green,
          },
          headerTintColor: '#000',
          headerTitle: 'Available Schedules',
        }}
      />
      <Stack.Screen
        name="CreateSchedule"
        component={CreateScheduleScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.green,
          },
          headerTintColor: '#000',
          headerTitle: 'Create Schedule',
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="BusCreate"
        component={CreateBusScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.green,
          },
          headerTintColor: '#000',
          headerTitle: 'Create Bus',
        }}
      />
      {/* Add more screens for the RoutesStackNavigator if needed */}
    </Stack.Navigator>
  )
}
const BusStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BusList">
      <Stack.Screen
        name="BusList"
        component={BusesScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="BusCreate"
        component={CreateBusScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.green,
          },
          headerTintColor: '#000',
          headerTitle: 'Create Bus',
        }}
      />
      <Stack.Screen
        name="BusDetails"
        component={BusDetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: Colors.green,
          },
          headerTintColor: '#000',
          headerTitle: 'Bus Details',
        }}
      />
      {/* Add more screens for the RoutesStackNavigator if needed */}
    </Stack.Navigator>
  )
}

const CustomDrawerContent = props => {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    // Implement your logout logic here
    // For example, navigate to the login screen
    await AsyncStorage.clear()
    dispatch(authActions.logoutUser())
    navigate('Login')
  }

  return (
    <DrawerContentScrollView {...props}>
      {/* Original drawer items */}
      <DrawerItemList {...props} />

      {/* Logout button */}
      <Button title="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  )
}

const Drawer = createDrawerNavigator()
const OwnerDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Bookings" component={SchedulesScreen} />
      <Drawer.Screen name="Buses" component={BusStackNavigator} />
      <Drawer.Screen name="Routes" component={RoutesStackNavigator} />
      <Drawer.Screen name="Schedules" component={SchedulesScreen} />
      <Drawer.Screen name="Drivers" component={DriverScreen} />
      <Drawer.Screen name="Assistants" component={AssistantScreen} />
    </Drawer.Navigator>
  )
}

export default OwnerDrawer
