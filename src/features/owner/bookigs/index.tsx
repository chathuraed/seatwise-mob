import React, {useState} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import CustomHeader from '../../../components/custom-header'
import UserDatePickerField from '../../../components/user-date-picker'
import {scale, verticalScale} from '../../../styles/scaling'
import {useDispatch, useSelector} from 'react-redux'
import {ownerActions, selectBookings} from '../../../store/reducer/owner-slice'
import moment from 'moment'
import {Colors} from '../../../resources'

const BookingScreen = () => {
  const dispatch = useDispatch()
  const [date, setDate] = useState(new Date())
  const bookings = useSelector(selectBookings)

  React.useEffect(() => {
    if (date) {
      console.log(date)
      const data = {
        date: moment(date).format('DD-MM-YYYY').toString(),
      }
      dispatch(ownerActions.getBookingsByDate(data))
    }
  }, [date, dispatch])
  return (
    <View style={styles.container}>
      <CustomHeader title="Bookings" />

      <View style={{margin: scale(16)}}>
        <UserDatePickerField value={date} onChange={time => setDate(time)} />
      </View>

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        {bookings.map((booking, i) => (
          <View
            key={i.toString()}
            style={{
              borderRadius: scale(10),
              backgroundColor: Colors.textSecondary,
              paddingHorizontal: scale(16),
              paddingVertical: verticalScale(12),
              marginVertical: verticalScale(8),
              marginHorizontal: scale(16),
            }}>
            <Text style={[styles.text, {color: 'white', fontWeight: '500'}]}>
              Booking ID {booking._id}
            </Text>

            <Text style={[styles.text, {color: 'white', fontWeight: '500'}]}>
              Total Price : LKR {booking.total_price}
            </Text>

            <Text style={[styles.text, {color: 'white', fontWeight: '500'}]}>
              Status : {booking.status}
            </Text>
          </View>
        ))}
      </ScrollView>
      {/* <View style={styles.card_grid}>
        {DATA.map((item, i) => (
          <View key={i.toString()} style={styles.card}>
            <View style={{padding: 16}}>
              <Text style={{fontSize: scale(16)}}>
                {getCapitalize(item.key)}
              </Text>
              <Text
                style={{
                  fontSize: scale(18),
                  fontWeight: 'bold',
                  textAlign: 'right',
                }}>
                {item.value}
              </Text>
            </View>
          </View>
        ))}
      </View> */}
    </View>
    // <View style={styles.container}>
    //   <Text style={styles.centeredText}>Booking Screen</Text>
    // </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredText: {
    fontSize: 20,
    textAlign: 'center',
  },
})

export default BookingScreen
