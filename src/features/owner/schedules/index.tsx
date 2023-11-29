import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useRoute} from '@react-navigation/native';

const SchedulesScreen = () => {
  const route = useRoute();
  return (
    <View style={styles.container}>
      <Text style={styles.centeredText}>Schedules Screen</Text>
      <Text style={styles.centeredText}>{JSON.stringify(route)}</Text>
      <Text style={styles.centeredText}>Schedules Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredText: {
    fontSize: 20,
    textAlign: 'center',
  },
});

export default SchedulesScreen;
