import React, {useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import {useIsFocused, useRoute} from '@react-navigation/native'
import {scale, verticalScale} from '../../../../styles/scaling'
import {Colors} from '../../../../resources/colors'
import {getCapitalize} from '../../../../util'
import {navigate, navigationRef} from '../../../../navigation/rootNavigation'
import {useDispatch, useSelector} from 'react-redux'
import {ownerActions, selectRoute} from '../../../../store/reducer/owner-slice'
import Layout from '../../../../components/layout'

import Ionicons from 'react-native-vector-icons/Ionicons'

const RouteAvailableSchedulesScreen = () => {
  const isFocused = useIsFocused()
  const dispatch = useDispatch()
  const selectedRoute = useSelector(selectRoute)

  React.useEffect(() => {
    const fetchData = () => {
      const params = {
        id: selectedRoute._id,
      }
      dispatch(ownerActions.getRoute(params))
    }

    if (isFocused) {
      fetchData()
    }
  }, [dispatch, selectedRoute._id, isFocused])

  return (
    <View style={styles.container}>
      <View style={styles.routeContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.busTitle}>
            {getCapitalize(selectedRoute.bus.busNumber)}
          </Text>

          <Text style={styles.routeTitle}>
            #{getCapitalize(selectedRoute.permit_id)}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: scale(16),
          }}>
          <Text style={styles.cities}>
            {getCapitalize(selectedRoute.origin)}
          </Text>
          <View
            style={{
              flexGrow: 1,
              height: scale(1),
              backgroundColor: Colors.border,
              marginHorizontal: scale(8),
            }}
          />
          <Text style={styles.cities}>
            {getCapitalize(selectedRoute.destination)}
          </Text>
        </View>

        <View style={styles.hr} />
        <Text style={{fontSize: scale(14), fontWeight: '600'}}>
          Bus Details
        </Text>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {fontWeight: '500'}]}>Model : </Text>
            <Text style={styles.text}>{selectedRoute.bus.model}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {fontWeight: '500'}]}>
              Seating Capacity :{' '}
            </Text>
            <Text style={styles.text}>{selectedRoute.bus.seatingCapacity}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.text, {fontWeight: '500'}]}>
              Seating Arrangement :{' '}
            </Text>
            <Text style={styles.text}>{selectedRoute.bus.arrangement}</Text>
          </View>
        </View>
        <View style={styles.hr} />
        {selectedRoute.schedules && selectedRoute.schedules.length ? (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: scale(14), fontWeight: '600'}}>
                Schedules
              </Text>
              <TouchableOpacity
                style={{
                  borderRadius: scale(5),
                  backgroundColor: Colors.green,
                  padding: scale(8),
                }}
                onPress={() => navigate('CreateSchedule', {selectedRoute})}>
                <Text style={{fontSize: scale(14), fontWeight: '600'}}>
                  Add
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              showsVerticalScrollIndicator={false}>
              {selectedRoute.schedules.map((schedule, i) => (
                <View
                  key={i.toString()}
                  style={{
                    borderRadius: scale(10),
                    backgroundColor: Colors.textSecondary,
                    paddingHorizontal: scale(16),
                    paddingVertical: verticalScale(12),
                    marginVertical: verticalScale(8),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        fontSize: scale(16),
                        color: Colors.textGray,
                      }}>{`#${i + 1}`}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigate('CreateSchedule', {
                          selectedRoute,
                          fromSettings: true,
                          schedule,
                        })
                      }>
                      <Ionicons
                        name="settings-outline"
                        size={scale(26)}
                        color={'white'}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={[styles.text, {color: 'white', fontWeight: '500'}]}>
                    Departs from {schedule.origin} at {schedule.start_time}
                  </Text>

                  <Text
                    style={[styles.text, {color: 'white', fontWeight: '500'}]}>
                    Arrives in {schedule.destination} at {schedule.end_time}
                  </Text>

                  <View
                    style={{
                      flexGrow: 1,
                      height: scale(1),
                      backgroundColor: 'white',
                      marginVertical: scale(8),
                    }}
                  />
                  <View style={{flexDirection: 'row'}}>
                    {schedule.available_at.map((day, index) => {
                      const abbreviatedDay = day.slice(0, 3).toUpperCase()

                      return (
                        <View
                          key={day}
                          style={{
                            backgroundColor: 'white',
                            borderRadius: scale(5),
                            paddingVertical: scale(4),
                            width: 35,
                            marginLeft: index !== 0 ? 10 : 0,
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: scale(10),
                            }}>
                            {abbreviatedDay}
                          </Text>
                        </View>
                      )
                    })}
                  </View>
                </View>
              ))}
            </ScrollView>
          </>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: scale(14), fontWeight: '600'}}>
              No Schedule Available
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.green,
                padding: scale(6),
                borderRadius: scale(6),
              }}
              onPress={() => navigate('CreateSchedule', {selectedRoute})}>
              <Text style={{fontSize: scale(14), fontWeight: '600'}}>
                Add New
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  routeContainer: {
    flex: 1,
    marginHorizontal: scale(16),
    marginVertical: verticalScale(8),
    backgroundColor: Colors.white,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    borderRadius: scale(20),
  },
  busTitle: {
    color: '#53587A',
    fontSize: scale(18),
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    lineHeight: scale(20),
    letterSpacing: 0.36,
  },
  routeTitle: {
    color: '#53587A',
    fontSize: scale(12),
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    lineHeight: scale(20),
    letterSpacing: 0.36,
  },
  routeText: {
    fontSize: scale(14),
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: scale(20),
    letterSpacing: 0.36,
    color: '#252B5C',
    marginTop: scale(8),
  },
  cities: {
    fontSize: scale(14),
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: scale(20),
    letterSpacing: 0.36,
    color: '#252B5C',
  },
  text: {
    fontSize: scale(13),
    fontStyle: 'normal',
    lineHeight: scale(20),
    letterSpacing: 0.36,
    marginTop: scale(8),
  },
  hr: {
    alignItems: 'stretch',
    height: scale(1),
    backgroundColor: Colors.border,
    marginVertical: scale(16),
  },
})

export default RouteAvailableSchedulesScreen
