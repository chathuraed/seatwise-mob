// BookingsScreen.js
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const BookingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.centeredText}>Bookings</Text>
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

export default BookingsScreen
