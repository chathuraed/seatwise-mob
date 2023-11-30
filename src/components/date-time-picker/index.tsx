/* eslint-disable react-native/no-inline-styles */
import RNDateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import React, {useEffect, useState, useCallback} from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Iconions from 'react-native-vector-icons/Ionicons'
import {Colors} from '../../resources'

const DateTimeField = props => {
  const {
    label,
    containerStyle,
    mode,
    onChange,
    onBlur,
    errorMessage,
    value,
    disableFuture = false,
  } = props

  const [dateLabel, setDateLabel] = useState('')
  const [dateValue, setDateValue] = useState(
    value ? new Date(value).getTime() : new Date().getTime(),
  )
  const [showPicker, setShowPicker] = useState(false)

  useEffect(() => {
    setDateLabel(getDisplayValue(value))
  }, [value])

  const getDisplayValue = useCallback(
    dateValueToCheck => {
      if (!dateValueToCheck) {
        return ''
      }
      if (mode === 'date') {
        return moment(dateValueToCheck).format('DD MMM YYYY')
      } else {
        return moment(dateValueToCheck).format('hh:mm A')
      }
    },
    [mode],
  )

  const handleBlur = () => {
    setShowPicker(false)
    if (onBlur) {
      onBlur()
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setShowPicker(true)
      }}
      onBlur={handleBlur}>
      <View style={containerStyle}>
        {label ? (
          <View
            style={{
              marginBottom: label ? 5 : 0,
            }}>
            <Text>{label}</Text>
          </View>
        ) : null}

        <View style={styles.container}>
          <View style={{flex: 1}}>
            {dateLabel ? (
              <Text
                style={{
                  color: 'black',
                }}>
                {dateLabel}
              </Text>
            ) : (
              <Text>Select Date</Text>
            )}
          </View>
          <View>
            <Iconions
              name={mode === 'date' ? 'calendar-outline' : 'watch-outline'}
              size={22}
              color={Colors.textMain}
            />
          </View>

          {showPicker ? (
            <SafeAreaView>
              <RNDateTimePicker
                is24Hour={false}
                display={'default'}
                mode={mode}
                value={new Date(dateValue)}
                onChange={event => {
                  setShowPicker(false)
                  if (event.type === 'set') {
                    if (event.nativeEvent.timestamp === 0) {
                      event.nativeEvent.timestamp = new Date().getTime()
                    }
                    setDateValue(event.nativeEvent.timestamp)
                    setDateLabel(getDisplayValue(event.nativeEvent.timestamp))
                    if (onChange) {
                      onChange(event.nativeEvent.timestamp)
                    }
                  }
                }}
                onError={() => {
                  setShowPicker(false)
                }}
                maximumDate={disableFuture ? new Date() : undefined}
              />
            </SafeAreaView>
          ) : null}
        </View>

        {errorMessage ? (
          <View>
            <Text
              style={{
                color: Colors.error,
              }}>
              {errorMessage}
            </Text>
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingLeft: 15,
    paddingRight: 10,
    justifyContent: 'center',
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: 'white',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default DateTimeField
