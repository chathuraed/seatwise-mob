import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {Text, View} from 'react-native';
import OwnerDrawer, {DrawerParamList} from './owner';
import {selectCurrentAccount} from '../store/reducer/auth-slice';

// Define a type for your stack navigator params
export type StackParamList = {
  OwnerHome: undefined;
  DriverHome: undefined;
  AssistantHome: undefined;
  PassengerHome: undefined;
};

// Home Screens
const DriverHomeScreen: React.FC = () => (
  <View>
    <Text>Driver Home</Text>
  </View>
);

const AssistantHomeScreen: React.FC = () => (
  <View>
    <Text>Assistant Home</Text>
  </View>
);

const PassengerHomeScreen: React.FC = () => (
  <View>
    <Text>Passenger Home</Text>
  </View>
);

const createNavigator = (
  initialRouteName: keyof StackParamList,
  component: React.FC,
) => {
  const Stack = createNativeStackNavigator<StackParamList>();

  const Navigator: React.FC = () => (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={initialRouteName}>
      <Stack.Screen name={initialRouteName} component={component} />
    </Stack.Navigator>
  );

  return Navigator;
};

const OwnerNavigator = createNavigator('OwnerHome', OwnerDrawer);
const DriverNavigator = createNavigator('DriverHome', DriverHomeScreen);
const AssistantNavigator = createNavigator(
  'AssistantHome',
  AssistantHomeScreen,
);
const PassengerNavigator = createNavigator(
  'PassengerHome',
  PassengerHomeScreen,
);

// Main App Navigator
export type AppStackParamList = {
  OwnerDashboard: DrawerParamList;
  DriverDashboard: undefined;
  AssistantDashboard: undefined;
  PassengerDashboard: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => {
  const account = useSelector(selectCurrentAccount);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="OwnerDashboard" component={OwnerNavigator} />
      <Stack.Screen name="DriverDashboard" component={DriverNavigator} />
      {/* {account?.role === 'owner' && (
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
      )} */}
    </Stack.Navigator>
  );
};

export default AppNavigator;
