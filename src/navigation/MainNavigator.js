import React, {useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import {navigationRef} from './rootNavigation'
import {useDispatch} from 'react-redux'
import AppNavigator from './AppNavigator'
import {authActions} from '../store/reducer/auth-slice'
import OnboardingScreen from '../features/onboarding'
import ProductTourScreen from '../features/product-tour'
import LandingScreen from '../features/landing'
import LoginScreen from '../features/login'
import RegistrationScreen from '../features/registration'

const Stack = createStackNavigator()

const MainNavigator = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const checkAuthToken = async () => {
      // if (!isAuthenticated) {
      dispatch(authActions.checkAuthToken())
      // }
    }

    checkAuthToken()
  }, [dispatch])

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="ProductTour" component={ProductTourScreen} />
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegistrationScreen} />
        <Stack.Screen name="App" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainNavigator
