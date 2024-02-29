import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {useIsFocused, useRoute} from '@react-navigation/native'
import {scale} from '../../../styles/scaling'
import moment from 'moment'
import {Colors} from '../../../resources'
import {lightenColor} from '../../../util'
import CustomButton from '../../../components/custom-button'
import {useSelector} from 'react-redux'
import {selectCurrentAccount} from '../../../store/reducer/auth-slice'
import {navigate} from '../../../navigation/rootNavigation'

function getReadableDate(dateInput: string) {
  const parsedDate = moment(dateInput, 'DD-MM-YYYY')

  // Format the date in a human-readable format
  return parsedDate.format('dddd, MMM Do YYYY')
}

const BookSeatScreen = () => {
  const isFocused = useIsFocused()
  const client = useRef<WebSocket | null>(null)
  const account = useSelector(selectCurrentAccount)
  const {params} = useRoute()
  const {filters, schedule} = params
  const {route} = schedule
  const {bus} = route
  const {seats} = bus

  const [layout, setLayout] = useState<any[]>()
  const [userSelectedSeats, setUserSelectedSeats] = useState<
    {number: string; rowIndex: number; seatIndex: number}[]
  >([])

  useEffect(() => {
    const connectWebSocket = async () => {
      try {
        // Create a new WebSocket instance
        const socket = new WebSocket('ws://13.51.178.234:8000')

        // Set the ref to the WebSocket instance
        client.current = socket

        // Handle onConnect event
        client.current.onopen = () => {
          console.log('WebSocket connected!')

          const data = {
            type: 'initial_data',
            data: {
              booking_date: filters.date,
              schedule_id: schedule._id,
              bus_id: bus._id,
            },
          }
          client.current.send(JSON.stringify(data))
        }

        client.current.onmessage = event => {
          console.log('Message received:', event.data)

          try {
            const data = JSON.parse(event.data)

            // Check the type of the message
            switch (data.type) {
              case 'booked_seats':
                const bookedSeats = data.data

                setLayout(prevLayout => {
                  return prevLayout.map(row => {
                    return row.map(seat => {
                      const matchingBookedSeat = bookedSeats.find(
                        bookedSeat => bookedSeat.number === seat.number,
                      )

                      if (matchingBookedSeat) {
                        return {...seat, state: 'booked'}
                      }
                      return seat
                    })
                  })
                })
                setUserSelectedSeats(prevSelectedSeats =>
                  prevSelectedSeats.filter(selectedSeat => {
                    return !bookedSeats.some(
                      bookedSeat => bookedSeat.number === selectedSeat.number,
                    )
                  }),
                )
                break

              // Handle other message types if needed

              default:
                console.log('Unknown message type:', data.type)
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error.message)
          }
        }

        // Handle onDisconnect event
        client.current.onclose = event => {
          console.log('WebSocket disconnected!', event)
        }
      } catch (error) {
        console.error('WebSocket connection error:', error)
      }
    }

    if (isFocused) {
      connectWebSocket()
    }

    return () => {
      if (
        client.current.readyState === WebSocket.OPEN ||
        client.current.readyState === WebSocket.CONNECTING
      ) {
        // Send an unsubscribe message or handle disconnect logic if needed
        client.current.close()
      }
    }
  }, [bus._id, filters.date, isFocused, schedule._id])

  useEffect(() => {
    if (seats.length && !userSelectedSeats.length) {
      setLayout(seats)
    }
  }, [seats, userSelectedSeats.length])

  useEffect(() => {
    if (userSelectedSeats.length) {
      console.log('user selected', userSelectedSeats)
      //   update the seat layout
    }
  }, [userSelectedSeats])

  const onPressSeat = useCallback(
    (rowIndex, seatIndex) => {
      return () => {
        setLayout(prevLayout => {
          return prevLayout.map((row, currentRowIndex) => {
            if (currentRowIndex === rowIndex) {
              // Update only the selected row
              return row.map((currentSeat, currentSeatIndex) => {
                if (currentSeatIndex === seatIndex) {
                  // Update only the selected seat
                  if (currentSeat.state === 'user-selected') {
                    // If the seat is 'user-selected', change it back to 'available'
                    setUserSelectedSeats(prevSeats =>
                      prevSeats.filter(
                        seat => seat.number !== currentSeat.number,
                      ),
                    )
                    return {...currentSeat, state: 'available'}
                  } else if (
                    currentSeat.state === 'available' ||
                    currentSeat.state === 'no-seat'
                  ) {
                    // If the seat is 'available' or 'no-seat', check if user can select more seats
                    if (userSelectedSeats.length < 5) {
                      setUserSelectedSeats(prevSeats => [
                        ...prevSeats,
                        {number: currentSeat.number, rowIndex, seatIndex},
                      ])
                      return {...currentSeat, state: 'user-selected'}
                    }
                  }
                }
                return currentSeat
              })
            }
            return row
          })
        })
      }
    },
    [userSelectedSeats],
  )

  const renderSeat = (seat, rowIndex, seatIndex) => {
    const {number, state} = seat
    const seatStyle = [
      styles.seat,
      state === 'available' && styles.availableSeat,
      state === 'booked' && styles.bookedSeat,
      state === 'no-seat' && styles.noSeat,
      state === 'user-selected' && styles.userSelectedSeat,
      state === 'disabled' && styles.disabledSeat,
    ]

    const isDisabled =
      state === 'no-seat' || state === 'booked' || state === 'disabled'

    return (
      <TouchableOpacity
        key={number}
        style={seatStyle}
        onPress={onPressSeat(rowIndex, seatIndex)}
        disabled={isDisabled}>
        <Text>{number}</Text>
      </TouchableOpacity>
    )
  }

  const navigateToPayment = () => {
    if (client.current) {
      client.current.close()
    }

    const data = {
      booking_date: filters.date,
      schedule_id: schedule._id,
      bus_id: bus._id,
      price_per_seat: route.price,
      passenger_id: account.userId,
      selected_seats: userSelectedSeats,
    }
    console.log(data)
    navigate('MakePayment', {data})
  }

  return (
    <SafeAreaView style={{flexGrow: 1, backgroundColor: 'white'}}>
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
          Scheduled on {getReadableDate(filters.date)}
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
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingHorizontal: scale(16),
        }}>
        <View
          style={{
            marginVertical: scale(8),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: scale(18),
              marginBottom: scale(4),
              color: '#252B5C',
              fontFamily: 'Lato-Regular',
              fontWeight: '700',
            }}>
            Select Your Preferred Seats
          </Text>
          <Text
            style={{
              fontSize: scale(18),
              marginBottom: scale(4),
              color: '#252B5C',
              fontFamily: 'Lato-Regular',
              fontWeight: '700',
            }}>
            {userSelectedSeats.length}/5
          </Text>
        </View>
        <ScrollView style={{flex: 1}}>
          {layout && layout.length
            ? layout.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.row}>
                  {row.map((seat, seatIndex) =>
                    renderSeat(seat, rowIndex, seatIndex),
                  )}
                </View>
              ))
            : null}
        </ScrollView>
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          margin: scale(16),
        }}>
        <CustomButton
          disabled={!userSelectedSeats.length}
          style={{backgroundColor: Colors.green, borderColor: 'transparent'}}
          onPress={() => navigateToPayment()}
          title="BOOK SEATS"
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  seat: {
    padding: 10,
    margin: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 40,
  },
  availableSeat: {
    backgroundColor: '#E5E4E2',
  },
  bookedSeat: {
    backgroundColor: '#ADED5E',
  },
  noSeat: {
    backgroundColor: 'transparent',
  },
  userSelectedSeat: {
    backgroundColor: '#007bff',
  },
  disabledSeat: {
    backgroundColor: '#DB4220', // Light gray color for disabled seats
  },
})

export default BookSeatScreen
