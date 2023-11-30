import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const BookingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.centeredText}>Booking Screen</Text>
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

export default BookingScreen
