import React, {useEffect} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {useSelector, useDispatch} from 'react-redux'
import {Text, View} from 'react-native'
import OwnerDrawer from './owner'
import PassengerStackNavigator from './passenger'
import {navigate} from './rootNavigation'
import {authActions, selectCurrentAccount} from '../store/reducer/auth-slice'

const DriverHomeScreen = () => (
  <View>
    <Text>Driver Home</Text>
  </View>
)

const BlankScreen = () => (
  <View>
    <Text>Blank</Text>
  </View>
)

const AssistantHomeScreen = () => (
  <View>
    <Text>Assistant Home</Text>
  </View>
)

const PassengerHomeScreen = () => (
  <View>
    <Text>Passenger Home</Text>
  </View>
)

const Stack = createStackNavigator()

const createNavigator = (initialRouteName, component) => {
  const Navigator = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRouteName}>
      <Stack.Screen name={initialRouteName} component={component} />
    </Stack.Navigator>
  )

  return Navigator
}

const OwnerNavigator = createNavigator('OwnerHome', OwnerDrawer)
const DriverNavigator = createNavigator('DriverHome', DriverHomeScreen)
const AssistantNavigator = createNavigator('AssistantHome', AssistantHomeScreen)
const PassengerNavigator = createNavigator('PassengerHome', PassengerStackNavigator)

const AppNavigator = () => {
  const account = useSelector(selectCurrentAccount)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!account) {
      // If no account, navigate to 'Login'
      navigate('Login')
    }
  }, [account])

  useEffect(() => {
    // Listen for changes in authentication status
    if (!account) {
      // Dispatch an action to reset the authentication state
      dispatch(authActions.logoutUser())
    }
  }, [account, dispatch])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {account?.role === 'owner' && (
        <Stack.Screen name="OwnerDashboard" component={OwnerNavigator} />
      )}
      {account?.role === 'driver' && (
        <Stack.Screen name="DriverDashboard" component={DriverNavigator} />
      )}
      {account?.role === 'assistant' && (
        <Stack.Screen
          name="AssistantDashboard"
          component={AssistantNavigator}
        />
      )}
      {account?.role === 'passenger' && (
        <Stack.Screen
          name="PassengerDashboard"
          component={PassengerNavigator}
        />
      )}
      {!account && <Stack.Screen name="Blank" component={BlankScreen} />}
    </Stack.Navigator>
  )
}

export default AppNavigator
