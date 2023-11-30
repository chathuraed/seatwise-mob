import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {scale, verticalScale} from '../../../styles/scaling';
import {getCapitalize} from '../../../util';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../../resources';
import Layout from '../../../components/layout';

import CustomHeader from '../../../components/custom-header';
import {navigate} from '../../../navigation/rootNavigation';
import {useBusHook} from './hook';
import {useDispatch} from 'react-redux';
import {ownerActions} from '../../../store/reducer/owner-slice';

const BusesScreen = ({}) => {
  const dispatch = useDispatch();
  const {buses} = useBusHook();

  return (
    <View style={styles.container}>
      <CustomHeader title="Buses" />
      <View style={styles.spacing} />
      <Layout scrollEnabled={true}>
        {buses.length > 0 ? (
          buses.map((bus, i) => (
            <TouchableOpacity
              onPress={() => {
                dispatch(ownerActions.setBus(bus));
                navigate('BusDetails');
              }}
              style={styles.routeContainer}
              key={i.toString()}>
              <Text style={styles.routeTitle}>
                {getCapitalize(bus.busNumber)}
              </Text>
              <Text style={styles.routeText}>Model: {bus.model}</Text>
              <Text style={styles.routeText}>
                Capacity: {bus.seatingCapacity}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.centerTextContainer}>
            <Text style={styles.centerText}>No buses available</Text>
          </View>
        )}
      </Layout>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('BusCreate')}>
        <Ionicon name="add" size={scale(30)} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacing: {
    height: 8,
  },
  routeContainer: {
    marginHorizontal: scale(16),
    marginVertical: verticalScale(8),
    backgroundColor: Colors.white,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    borderRadius: scale(20),
  },
  routeTitle: {
    color: '#53587A',
    fontSize: scale(16),
    fontFamily: 'Lato',
    fontWeight: 'bold',
    lineHeight: scale(20),
    letterSpacing: 0.36,
  },
  routeText: {
    fontSize: scale(14),
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: scale(20),
    letterSpacing: 0.36,
    color: '#252B5C',
    marginTop: scale(8),
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(60),
    position: 'absolute',
    bottom: scale(20),
    right: scale(16),
    height: scale(60),
    backgroundColor: Colors.green,
    borderRadius: scale(100),
  },
  centerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: scale(16),
    color: '#53587A',
    fontWeight: 'bold',
  },
});

export default BusesScreen;
