import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {scale, verticalScale} from '../../../../styles/scaling';
import {Colors} from '../../../../resources/colors';
import {getCapitalize} from '../../../../util';
import {navigate} from '../../../../navigation/rootNavigation';

import Ionicons from 'react-native-vector-icons/Ionicons';

const BusDetailsScreen = () => {
  const route = useRoute();
  const {bus_data} = route.params;
  console.log(bus_data);
  return (
    <View style={styles.container}>
      <View style={styles.routeContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.routeTitle}>
            {getCapitalize(bus_data?.busNumber)}
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigate('BusCreate', {
                fromSettings: true,
                bus_data,
              })
            }>
            <Ionicons
              name="settings-outline"
              size={scale(26)}
              color={Colors.textMain}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.routeText}>Model : {bus_data.model}</Text>
        <Text style={styles.routeText}>
          Capacity : {bus_data.seatingCapacity}
        </Text>
        <View style={styles.hr} />
        {
          bus_data.schedules && bus_data.schedules.length ? (
            <Text>Seat layout available</Text>
          ) : null
          // <View
          //   style={{
          //     flexDirection: 'row',
          //     justifyContent: 'space-between',
          //     alignItems: 'center',
          //   }}>
          //   <Text style={{fontSize: scale(14), fontWeight: '600'}}>
          //     Seat layout not available
          //   </Text>
          //   <TouchableOpacity
          //     style={{
          //       backgroundColor: Colors.green,
          //       padding: scale(6),
          //       borderRadius: scale(6),
          //     }}
          //     onPress={() => navigate('CreateSchedule', {bus_data})}>
          //     <Text style={{fontSize: scale(14), fontWeight: '600'}}>
          //       Add New
          //     </Text>
          //   </TouchableOpacity>
          // </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  hr: {
    alignItems: 'stretch',
    height: scale(1),
    backgroundColor: Colors.border,
    marginVertical: scale(16),
  },
});

export default BusDetailsScreen;
