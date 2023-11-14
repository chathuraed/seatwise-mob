import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {KeyboardAvoidingView, Platform} from 'react-native';
import {navigationRef} from './rootNavigation';
import OnboardingScreen from '../features/onboarding';
import ProductTourScreen from '../features/product-tour';
import LandingScreen from '../features/landing';
import LoginScreen from '../features/login';

export type RootStackParamList = {
  Onboarding: undefined;
  ProductTour: undefined;
  Landing: undefined;
  Login: undefined;
};

const MainNavigator = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="ProductTour" component={ProductTourScreen} />
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </>
  );
};

export default MainNavigator;
