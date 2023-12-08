import React, {useState, useEffect, useCallback} from 'react'
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import Iconions from 'react-native-vector-icons/Ionicons'
import {Colors} from '../../resources'
import {scale} from '../../styles/scaling'

const UserDatePickerField = props => {
  const {
    label,
    containerStyle,
    onChange,
    onBlur,
    errorMessage,
    value,
    labelStyle = {},
  } = props

  const [dateLabel, setDateLabel] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  useEffect(() => {
    setDateLabel(getDisplayValue(value))
  }, [value])

  const getDisplayValue = useCallback(dateValueToCheck => {
    if (!dateValueToCheck) {
      return ''
    }
    const parsedDate = moment(dateValueToCheck, 'DD-MM-YYYY')
    return moment(parsedDate).format('DD MMM YYYY')
  }, [])

  const handleBlur = () => {
    setDatePickerVisibility(false)
    if (onBlur) {
      onBlur()
    }
  }

  const handleConfirm = date => {
    setDatePickerVisibility(false)
    setDateLabel(getDisplayValue(date))
    if (onChange) {
      onChange(moment(date).format('DD-MM-YYYY'))
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => setDatePickerVisibility(true)}
      onBlur={handleBlur}>
      <View style={containerStyle}>
        {label ? (
          <View
            style={{
              marginBottom: label ? 5 : 0,
            }}>
            <Text
              style={{
                fontSize: scale(14),
                fontFamily: 'Lato-Regular',
                fontWeight: 'bold',
                letterSpacing: 0.36,
              }}>
              {label}
            </Text>
          </View>
        ) : null}
        <View style={styles.container}>
          {dateLabel ? (
            <Text
              style={{
                flexGrow: 1,
                color: '#53587A',
                fontSize: scale(14),
                fontFamily: 'Lato-Regular',
                fontWeight: 'bold',
                lineHeight: scale(20),
                letterSpacing: 0.36,
              }}>
              {dateLabel}
            </Text>
          ) : (
            <Text>Select Date</Text>
          )}
          <Iconions
            name="calendar-outline"
            size={22}
            color={Colors.textMain}
            style={{marginLeft: 10}}
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            display="inline"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
            date={new Date(value || new Date())}
            minimumDate={new Date()}
          />
        </View>

        {errorMessage ? (
          <View>
            <Text style={{color: Colors.error}}>{errorMessage}</Text>
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    justifyContent: 'center',
    borderRadius: scale(5),
    backgroundColor: 'white',
    height: scale(60),
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
})

export default UserDatePickerField
