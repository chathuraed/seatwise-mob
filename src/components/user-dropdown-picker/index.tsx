import React, {useRef, useState} from 'react'
import {Text, View} from 'react-native'
import {scale} from '../../styles/scaling'
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown'
import {Colors} from '../../resources'

const UserDropdownPickerField = props => {
  const dropdownController = useRef(null)
  const {label, containerStyle, errorMessage, onChange, items, value} = props

  return (
    <View style={containerStyle}>
      {label && (
        <View style={{marginBottom: label ? 5 : 0}}>
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
      )}
      <AutocompleteDropdown
        controller={controller => {
          dropdownController.current = controller
        }}
        inputContainerStyle={{
          paddingVertical: scale(8),
          paddingHorizontal: scale(8),
          width: '100%',
          backgroundColor: 'white',
          borderRadius: scale(5),
        }}
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        useFilter={false}
        textInputProps={{
          placeholder: `Select ${label}`,
          autoCorrect: false,
          autoCapitalize: 'none',
          placeholderTextColor: '#53587A',
          style: {
            color: '#53587A',
            fontSize: scale(14),
            fontFamily: 'Lato-Regular',
            fontWeight: 'bold',
            letterSpacing: 0.36,
          },
        }}
        containerStyle={{flexGrow: 1, flexShrink: 1}}
        onSelectItem={onChange}
        initialValue={value}
        dataSet={items}
      />

      {errorMessage ? (
        <View>
          <Text style={{color: Colors.error}}>{errorMessage}</Text>
        </View>
      ) : null}
    </View>
  )
}

export default UserDropdownPickerField
