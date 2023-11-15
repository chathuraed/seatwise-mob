// BlankScreen.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {scale, verticalScale} from '../../../styles/scaling';
import {useDashboardHook} from './hook';
import {useDispatch} from 'react-redux';
import {ownerActions} from '../../../store/reducer/owner-slice';

const ITEMS = [
  {
    id: 1,
    name: 'buses',
    label: 'Buses',
    value: 3,
  },
  {
    id: 2,
    name: 'routes',
    label: 'Routes',
    value: 3,
  },
  {
    id: 3,
    name: 'schedules',
    label: 'Schedules',
    value: 6,
  },
  {
    id: 4,
    name: 'drivers',
    label: 'Drivers',
    value: 4,
  },
  {
    id: 5,
    name: 'assistants',
    label: 'Assistants',
    value: 7,
  },
];

const DashboardScreen = () => {
  const {data} = useDashboardHook();

  return (
    <View style={styles.container}>
      <View style={styles.card_grid}>
        {ITEMS.map((item, i) => (
          <View key={i.toString()} style={styles.card}>
            <View style={{padding: 16}}>
              <Text>{item.label}</Text>
              <Text>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredText: {
    fontSize: 20,
    textAlign: 'center',
  },
  card_grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: scale(8),
    marginVertical: verticalScale(16),
  },
  card: {
    width: scale(171),
    height: verticalScale(80),
    marginHorizontal: scale(4),
    marginVertical: verticalScale(4),
    borderRadius: scale(20),
    backgroundColor: 'pink',
  },
});

export default DashboardScreen;
