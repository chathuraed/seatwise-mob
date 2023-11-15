import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useSelector} from 'react-redux';
import {selectCurrentAccount} from '../store/reducer/auth-slice';
import {Text, TouchableOpacity, View} from 'react-native';
import BlankScreen from '../features/blank';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Colors} from '../resources';
import DashboardScreen from '../features/owner/dashboard';
import SchedulesScreen from '../features/owner/schedules';
import BookingScreen from '../features/owner/bookigs';
import RoutesScreen from '../features/owner/routes';
import DriverScreen from '../features/owner/drivers';
import AssistantScreen from '../features/owner/assistants';

const OwnerHomeScreen = () => {
  return (
    <View>
      <Text>Owner Home</Text>
    </View>
  );
};

const DriverHomeScreen = () => {
  return (
    <View>
      <Text>Driver Home</Text>
    </View>
  );
};

const AssistantHomeScreen = () => {
  return (
    <View>
      <Text>Assistant Home</Text>
    </View>
  );
};

const PassengerHomeScreen = () => {
  return (
    <View>
      <Text>Passenger Home</Text>
    </View>
  );
};

const OwnerNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="OwnerHome">
      <Stack.Screen name="OwnerHome" component={MyDrawer} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.green, // Set your header background color
        },
        headerTintColor: '#fff', // Set your header text color
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <TouchableOpacity onPress={() => console.log('Header Right Pressed')}>
            <Text style={{color: '#fff', marginRight: 15}}>Options</Text>
          </TouchableOpacity>
        ),
      }}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Bookings" component={BookingScreen} />
      <Drawer.Screen name="Buses" component={RoutesScreen} />
      <Drawer.Screen name="Routes" component={RoutesScreen} />
      <Drawer.Screen name="Schedules" component={SchedulesScreen} />
      <Drawer.Screen name="Drivers" component={DriverScreen} />
      <Drawer.Screen name="Assistants" component={AssistantScreen} />
    </Drawer.Navigator>
  );
}

const DriverNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="DriverHome">
      <Stack.Screen name="DriverHome" component={DriverHomeScreen} />
    </Stack.Navigator>
  );
};

const AssistantNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="AssistantHome">
      <Stack.Screen name="AssistantHome" component={AssistantHomeScreen} />
    </Stack.Navigator>
  );
};

const PassengerNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="PassengerHome">
      <Stack.Screen name="PassengerHome" component={PassengerHomeScreen} />
    </Stack.Navigator>
  );
};

export type AppStackParamList = {
  OwnerDashboard: undefined;
  DriverDashboard: undefined;
  AssistantDashboard: undefined;
  PassengerDashboard: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const account = useSelector(selectCurrentAccount);
  console.log('account', account);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {account.role === 'owner' && (
        <Stack.Screen name="OwnerDashboard" component={OwnerNavigator} />
      )}
      {account.role === 'driver' && (
        <Stack.Screen name="DriverDashboard" component={DriverNavigator} />
      )}
      {account.role === 'assistant' && (
        <Stack.Screen
          name="AssistantDashboard"
          component={AssistantNavigator}
        />
      )}
      {account.role === 'passenger' && (
        <Stack.Screen
          name="PassengerDashboard"
          component={PassengerNavigator}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
