// BookingsScreen.js
import {useIsFocused} from '@react-navigation/native'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {selectCurrentAccount} from '../../../store/reducer/auth-slice'
import {
  passengerActions,
  selectBookings,
} from '../../../store/reducer/passenger-slice'
import {scale} from '../../../styles/scaling'
import {Colors} from '../../../resources'
import {getCapitalize} from '../../../util'

import Ionicons from 'react-native-vector-icons/Ionicons'

function getColorByStatus(status: string) {
  switch (status) {
    case 'pending':
      return Colors.warning
    case 'completed':
      return Colors.green
    case 'cancelled':
      return Colors.error
  }
}

const BookingsScreen = () => {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()
  const account = useSelector(selectCurrentAccount)
  const bookings = useSelector(selectBookings)

  console.log(bookings)

  React.useEffect(() => {
    const getBookingData = () => {
      dispatch(passengerActions.getBookings())
    }

    if (isFocused) {
      getBookingData()
    }
  }, [dispatch, account.userId, isFocused])
  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        {bookings && bookings.length !== 0 ? (
          bookings.map((row, i) => (
            <View
              key={i.toString()}
              style={{
                marginHorizontal: scale(16),
                marginTop: scale(8),
                paddingVertical: scale(8),
                paddingHorizontal: scale(8),
                backgroundColor: '#F5F4F8',
                borderRadius: scale(8),
              }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{flexGrow: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#252B5C',
                        fontSize: scale(18),
                        fontFamily: 'Lato-Regular',
                        fontWeight: '700',
                        letterSpacing: 0.36,
                        textAlign: 'right',
                      }}>
                      #{i + 1}
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text
                        style={{
                          color: '#252B5C',
                          fontSize: scale(14),
                          fontFamily: 'Lato-Regular',
                          fontWeight: '400',
                          letterSpacing: 0.36,
                        }}>
                        {row.booking_date}
                      </Text>
                      <View
                        style={{
                          marginLeft: scale(8),
                          backgroundColor: getColorByStatus(row.status),
                          borderRadius: scale(4),
                        }}>
                        <Text
                          style={{
                            padding: scale(4),
                            color: '#252B5C',
                            fontSize: scale(14),
                            fontFamily: 'Lato-Regular',
                            fontWeight: '700',
                            letterSpacing: 0.36,
                          }}>
                          {getCapitalize(row.status)}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: scale(8),
                    }}>
                    <Text
                      style={{
                        color: '#252B5C',
                        fontSize: scale(14),
                        fontFamily: 'Lato-Regular',
                        fontWeight: '400',
                        letterSpacing: 0.36,
                      }}>
                      From {row.schedule.origin}
                    </Text>
                    <View
                      style={{
                        flexGrow: 1,
                        height: 1,
                        backgroundColor: 'red',
                        marginHorizontal: scale(4),
                      }}
                    />
                    <Text
                      style={{
                        color: '#252B5C',
                        fontSize: scale(14),
                        fontFamily: 'Lato-Regular',
                        fontWeight: '700',
                        letterSpacing: 0.36,
                      }}>
                      {row.schedule.start_time}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: scale(8),
                    }}>
                    <Text
                      style={{
                        color: '#252B5C',
                        fontSize: scale(14),
                        fontFamily: 'Lato-Regular',
                        fontWeight: '400',
                        letterSpacing: 0.36,
                      }}>
                      To {row.schedule.destination}
                    </Text>
                    <View
                      style={{
                        flexGrow: 1,
                        height: 1,
                        backgroundColor: 'red',
                        marginHorizontal: scale(4),
                      }}
                    />
                    <Text
                      style={{
                        color: '#252B5C',
                        fontSize: scale(14),
                        fontFamily: 'Lato-Regular',
                        fontWeight: '700',
                        letterSpacing: 0.36,
                      }}>
                      {row.schedule.end_time}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: scale(8),
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      {row.selected_seats.map((seat, i) => (
                        <View
                          key={i.toString()}
                          style={{
                            backgroundColor: Colors.textMain,
                            borderRadius: scale(5),
                            paddingVertical: scale(4),
                            width: 35,
                            marginLeft: i !== 0 ? 10 : 0,
                          }}>
                          <Text
                            style={{
                              color: 'white',
                              textAlign: 'center',
                              fontSize: scale(10),
                              fontWeight: 'bold',
                            }}>
                            {seat.number}
                          </Text>
                        </View>
                      ))}
                    </View>
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
                        LKR {row.total_price}
                      </Text>
                    </View>
                  </View>

                  {row.status === 'pending' ? (
                    <TouchableOpacity
                      style={{
                        marginTop: scale(16),
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Ionicons name="qr-code-outline" size={scale(40)} />
                      <Text
                        style={{
                          color: '#252B5C',
                          fontSize: scale(14),
                          fontFamily: 'Lato-Regular',
                          fontWeight: '400',
                          letterSpacing: 0.36,
                          marginLeft: scale(8),
                        }}>
                        Scan Barcode
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        marginTop: scale(16),
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Ionicons name="file-tray-outline" size={scale(40)} />
                      <Text
                        style={{
                          color: '#252B5C',
                          fontSize: scale(14),
                          fontFamily: 'Lato-Regular',
                          fontWeight: '400',
                          letterSpacing: 0.36,
                          marginLeft: scale(8),
                        }}>
                        Details
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.centeredText}>No Bookings</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centeredText: {
    fontSize: 20,
    textAlign: 'center',
  },
})

export default BookingsScreen
