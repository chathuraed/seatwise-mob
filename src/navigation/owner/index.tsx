import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Colors} from '../../resources';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DashboardScreen from '../../features/owner/dashboard';
import SchedulesScreen from '../../features/owner/schedules';
import RoutesScreen from '../../features/owner/routes';
import DriverScreen from '../../features/owner/drivers';
import AssistantScreen from '../../features/owner/assistants';
import CreateRouteScreen from '../../features/owner/routes/create-route';
import RouteAvailableSchedulesScreen from '../../features/owner/schedules/route-available-schedules';
import CreateScheduleScreen from '../../features/owner/schedules/create-schedule';
import BusesScreen from '../../features/owner/bus';
import CreateBusScreen from '../../features/owner/bus/create-bus';
import BusDetailsScreen from '../../features/owner/bus/bus-details';

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
  );
};

const BusStackNavigator: React.FC = () => {
  const Stack = createNativeStackNavigator();

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
      <Drawer.Screen name="Buses" component={BusStackNavigator} />
      <Drawer.Screen name="Routes" component={RoutesStackNavigator} />
      <Drawer.Screen name="Schedules" component={SchedulesScreen} />
      <Drawer.Screen name="Drivers" component={DriverScreen} />
      <Drawer.Screen name="Assistants" component={AssistantScreen} />
    </Drawer.Navigator>
  );
};

export default OwnerDrawer;
