import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useRoutesHook} from './hook';
import {scale, verticalScale} from '../../../styles/scaling';
import {getCapitalize} from '../../../util';

const RoutesScreen = () => {
  const {routes} = useRoutesHook();
  return (
    <View style={styles.container}>
      <View style={{height: 8}} />
      {routes.map((route, i) => {
        return (
          <TouchableOpacity
            onPress={() => {}}
            style={{
              marginHorizontal: scale(16),
              marginVertical: verticalScale(8),
              backgroundColor: '#F5F4F8',
              paddingHorizontal: scale(16),
              paddingVertical: verticalScale(12),
              borderRadius: scale(20),
            }}
            key={i.toString()}>
            <Text
              style={{
                color: '#53587A',
                fontSize: scale(16),
                fontFamily: 'Lato',
                fontWeight: 'bold',
                lineHeight: scale(20),
                letterSpacing: 0.36,
              }}>
              {getCapitalize(route.permit_id)}
            </Text>
            <Text
              style={{
                fontSize: scale(14),
                fontWeight: '700',
                fontStyle: 'normal',
                lineHeight: scale(20),
                letterSpacing: 0.36,
                color: '#252B5C',
                marginTop: scale(8),
              }}>
              From : {route.origin}
            </Text>
            <Text
              style={{
                fontSize: scale(14),
                fontWeight: '700',
                fontStyle: 'normal',
                lineHeight: scale(20),
                letterSpacing: 0.36,
                color: '#252B5C',
                marginTop: scale(8),
              }}>
              Destination : {route.destination}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: scale(15),
          right: scale(15),
          height: 70,
          backgroundColor: '#fff',
          borderRadius: 100,
        }}>
        {/* <Icon name="plus" size={30} color="#01a699" /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  centeredText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default RoutesScreen;
