import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import {useIsFocused} from '@react-navigation/native'
import {scale, verticalScale} from '../../../../styles/scaling'
import {Colors} from '../../../../resources/colors'
import {getCapitalize} from '../../../../util'
import {navigate} from '../../../../navigation/rootNavigation'

import Ionicons from 'react-native-vector-icons/Ionicons'
import {useDispatch, useSelector} from 'react-redux'
import {ownerActions, selectBus} from '../../../../store/reducer/owner-slice'

const BusDetailsScreen = () => {
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const bus = useSelector(selectBus)

  React.useEffect(() => {
    const fetchData = () => {
      const params = {
        id: bus._id,
      }
      dispatch(ownerActions.getBus(params))
    }

    if (isFocused) {
      fetchData()
    }
  }, [dispatch, bus._id, isFocused])

  const renderSeat = seat => {
    const {number, state} = seat
    const seatStyle = [
      styles.seat,
      state === 'available' && styles.availableSeat,
      state === 'no-seat' && styles.noSeat,
      state === 'disabled' && styles.disabledSeat,
    ]

    return (
      <TouchableOpacity
        key={number}
        style={seatStyle}
        onPress={() => {}}
        disabled={state === 'no-seat'}>
        <Text>{number}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.routeContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.routeTitle}>{getCapitalize(bus?.busNumber)}</Text>

          <TouchableOpacity
            onPress={() =>
              navigate('BusCreate', {
                fromSettings: true,
                bus,
              })
            }>
            <Ionicons
              name="settings-outline"
              size={scale(26)}
              color={Colors.textMain}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.routeText}>Model : {bus.model}</Text>
        <Text style={styles.routeText}>Capacity : {bus.seatingCapacity}</Text>
        <View style={styles.hr} />
        {bus.seats && bus.seats.length ? (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-end',
                marginBottom: scale(8),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: scale(80),
                }}>
                <View
                  style={{
                    width: scale(12),
                    height: scale(12),
                    backgroundColor: '#DB4220',
                    marginRight: scale(4),
                    borderWidth: scale(1),
                  }}
                />
                <Text>Disabled</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: scale(80),
                }}>
                <View
                  style={{
                    width: scale(12),
                    height: scale(12),
                    backgroundColor: '#E5E4E2',
                    marginRight: scale(4),
                    borderWidth: scale(1),
                  }}
                />
                <Text>Available</Text>
              </View>
            </View>
            <ScrollView>
              {bus.seats.map((row, rowIndex) => (
                <View key={rowIndex} style={{flex: 1, flexDirection: 'row'}}>
                  {row.map((seat, seatIndex) =>
                    renderSeat(seat, rowIndex, seatIndex),
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  routeContainer: {
    marginHorizontal: scale(16),
    marginVertical: verticalScale(8),
    backgroundColor: Colors.white,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    borderRadius: scale(20),
  },
  routeTitle: {
    color: '#53587A',
    fontSize: scale(16),
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
  hr: {
    alignItems: 'stretch',
    height: scale(1),
    backgroundColor: Colors.border,
    marginVertical: scale(16),
  },
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
    width: 45,
    height: 35,
  },
  availableSeat: {
    backgroundColor: '#E5E4E2',
  },
  noSeat: {
    backgroundColor: 'transparent',
  },
  disabledSeat: {
    backgroundColor: '#DB4220',
  },
})

export default BusDetailsScreen
