import React, {useEffect} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {useSelector, useDispatch} from 'react-redux'
import {Text, View} from 'react-native'
import OwnerDrawer from './owner'
import PassengerStackNavigator from './passenger'
import {navigate} from './rootNavigation'
import {authActions, selectCurrentAccount} from '../store/reducer/auth-slice'

const MakePaymentScreen = () => (
  <View>
    <Text>Book Seat Screen</Text>
  </View>
)

export default MakePaymentScreen
