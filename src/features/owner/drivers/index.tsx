import {useNavigation} from '@react-navigation/native'
import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'

const DriverScreen = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text style={styles.centeredText}>Driver Screen</Text>
      <Button onPress={() => navigation.navigate('About')} title="Back" />
    </View>
  )
}

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
})

export default DriverScreen
