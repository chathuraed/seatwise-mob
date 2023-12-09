import React from 'react'
import {Image, SafeAreaView, Text, View} from 'react-native'
import {useRoute} from '@react-navigation/native'
import {scale} from '../../../styles/scaling'
import moment from 'moment'
import {Images} from '../../../resources'

function getReadableDate(dateInput: string) {
  const parsedDate = moment(dateInput, 'DD-MM-YYYY')

  // Format the date in a human-readable format
  return parsedDate.format('dddd, MMM Do YYYY')
}

const BookSeatScreen = () => {
  const {params} = useRoute()
  const {filters, schedule} = params
  console.log(filters, schedule)

  return (
    <SafeAreaView style={{flexGrow: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: scale(16),
        }}>
        <View style={{marginTop: scale(16)}}>
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
                LKR {schedule.route.price}
              </Text>
            </View>
          </View>
        </View>
        {/* <Text>{JSON.stringify(params)}</Text> */}
      </View>
    </SafeAreaView>
  )
}

export default BookSeatScreen
