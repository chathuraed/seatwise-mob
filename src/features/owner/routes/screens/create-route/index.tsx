import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const CreateRouteScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} title="Back" />
      <Text style={styles.centeredText}>Add New Route</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredText: {
    fontSize: 20,
  },
});

export default CreateRouteScreen;
