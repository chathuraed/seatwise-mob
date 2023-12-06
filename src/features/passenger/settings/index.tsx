// SettingsScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import {useDispatch} from 'react-redux'
import {authActions} from '../../../store/reducer/auth-slice'
import {navigate} from '../../../navigation/rootNavigation'

const SettingsScreen = () => {
  const dispatch = useDispatch()

  const logout = async () => {
    await AsyncStorage.clear()
    dispatch(authActions.logoutUser())
    navigate('Login')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.centeredText}>Settings</Text>
      <Button onPress={() => logout()} title="Sign Out" />
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

export default SettingsScreen
