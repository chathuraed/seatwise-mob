import React, {useEffect} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {useSelector, useDispatch} from 'react-redux'
import {Text, View} from 'react-native'
import OwnerDrawer from './owner'
import PassengerStackNavigator from './passenger'
import {navigate} from './rootNavigation'
import {authActions, selectCurrentAccount} from '../store/reducer/auth-slice'
import {useRoute} from '@react-navigation/native'
import CustomButton from '../../../components/custom-button'
import {passengerActions} from '../../../store/reducer/passenger-slice'
import {scale} from '../../../styles/scaling'
import {lightenColor} from '../../../util'
import {Colors} from '../../../resources'

const MakePaymentScreen = () => {
  const dispatch = useDispatch()
  const {params} = useRoute()
  const {data} = params

  const sendData = () => {
    dispatch(passengerActions.createBooking(data))
  }
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          padding: scale(16),
          backgroundColor: lightenColor(Colors.green, 20),
        }}>
        <Text
          style={{
            fontSize: scale(18),
            marginBottom: scale(4),
            color: '#252B5C',
            fontFamily: 'Lato-Regular',
            fontWeight: '700',
          }}>
          {/* Scheduled on {getReadableDate(filters.date)} */}
          Total Price: LKR {data.price_per_seat * data.selected_seats.length}
        </Text>

        {/* <Text
          style={{
            color: '#252B5C',
            fontSize: scale(16),
            fontFamily: 'Lato-Regular',
            fontWeight: '400',
            letterSpacing: 0.36,
            marginBottom: scale(4),
          }}>
          Departs from {schedule.origin} at {schedule.start_time}
        </Text>

        <Text
          style={{
            color: '#252B5C',
            fontSize: scale(16),
            fontFamily: 'Lato-Regular',
            fontWeight: '400',
            letterSpacing: 0.36,
            marginBottom: scale(4),
          }}>
          Arrives in {schedule.destination} at {schedule.end_time}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: scale(8),
          }}>
          <Text
            style={{
              color: '#252B5C',
              fontSize: scale(16),
              fontFamily: 'Lato-Regular',
              fontWeight: '400',
              letterSpacing: 0.36,
            }}>
            Seat Price :{' '}
          </Text>
          <View
            style={{
              backgroundColor: '#252B5C',
              padding: scale(4),
              borderRadius: scale(2),
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: scale(14),
                fontFamily: 'Lato-Regular',
                fontWeight: '700',
                letterSpacing: 0.36,
              }}>
              LKR {route.price}
            </Text>
          </View>
        </View> */}
      </View>
      <CustomButton onPress={sendData} title="Confirm" />
    </View>
  )
}

export default MakePaymentScreen
