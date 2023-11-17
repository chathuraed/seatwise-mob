import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Colors} from '../../resources';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from '../../features/owner/dashboard';
import SchedulesScreen from '../../features/owner/schedules';
import RoutesScreen from '../../features/owner/routes';
import DriverScreen from '../../features/owner/drivers';
import AssistantScreen from '../../features/owner/assistants';
import CreateRouteScreen from '../../features/owner/routes/screens/create-route';

export type DrawerParamList = {
  Dashboard: undefined;
  Bookings: undefined;
  Buses: undefined;
  Routes: undefined;
  Schedules: undefined;
  Drivers: undefined;
  Assistants: undefined;
};

const RoutesStackNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator();

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
      {/* Add more screens for the RoutesStackNavigator if needed */}
    </Stack.Navigator>
  );
};

const OwnerDrawer: React.FC = () => {
  const Drawer = createDrawerNavigator<DrawerParamList>();

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Bookings" component={SchedulesScreen} />
      <Drawer.Screen name="Buses" component={RoutesScreen} />
      <Drawer.Screen name="Routes" component={RoutesStackNavigator} />
      <Drawer.Screen name="Schedules" component={SchedulesScreen} />
      <Drawer.Screen name="Drivers" component={DriverScreen} />
      <Drawer.Screen name="Assistants" component={AssistantScreen} />
    </Drawer.Navigator>
  );
};

export default OwnerDrawer;
