import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {KeyboardAvoidingView, Platform} from 'react-native';
import {navigationRef} from './rootNavigation';
import OnboardingScreen from '../features/onboarding';
import ProductTourScreen from '../features/product-tour';
import LandingScreen from '../features/landing';
import LoginScreen from '../features/login';
import {authActions, selectAuthenticated} from '../store/reducer/auth-slice';
import {useDispatch, useSelector} from 'react-redux';
import AppNavigator from './AppNavigator';

export type RootStackParamList = {
  Onboarding: undefined;
  ProductTour: undefined;
  Landing: undefined;
  Login: undefined;
  App: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const dispatch = useDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authenticated = useSelector(selectAuthenticated);

  useEffect(() => {
    const checkAuthToken = async () => {
      // if (!isAuthenticated) {
      dispatch(authActions.checkAuthToken());
      // }
    };

    checkAuthToken();
  }, []);

  useEffect(() => {
    setIsAuthenticated(authenticated);
  }, [authenticated]);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Onboarding">
            {/* {!isAuthenticated ? (
              <> */}
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="ProductTour" component={ProductTourScreen} />
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            {/* </>
            ) : (
              <> */}
            <Stack.Screen name="App" component={AppNavigator} />
            {/* </>
            )} */}
          </Stack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </>
  );
};

export default MainNavigator;
