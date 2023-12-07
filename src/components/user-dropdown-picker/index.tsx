import React, {useRef, useState} from 'react'
import {Text, View} from 'react-native'
import {scale} from '../../styles/scaling'
import {
  AutocompleteDropdown,
  AutocompleteDropdownRef,
} from 'react-native-autocomplete-dropdown'
import {Colors} from '../../resources'

const UserDropdownPickerField = props => {
  const dropdownController = useRef<AutocompleteDropdownRef>()

  const searchRef = useRef(null)
  const {label, containerStyle, errorMessage, onChange, items, value} = props

  const [suggestionsList, setSuggestionsList] = useState(null)

  const filterItems = React.useCallback(
    inputQuery => {
      const filterToken = inputQuery.toLowerCase()

      if (typeof inputQuery !== 'string') {
        setSuggestionsList(null)
        return
      }

      const suggestions = items
        .filter(item => item.title.toLowerCase().includes(filterToken))
        .map(item => ({
          id: item.id,
          title: item.title,
        }))

      setSuggestionsList(suggestions)
    },
    [items],
  )

  const clearSuggestions = React.useCallback(() => {
    setSuggestionsList(null)
  }, [])

  const showAllItems = () => {
    setSuggestionsList(items.map(item => ({id: item.id, title: item.title})))
  }

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
        ref={searchRef}
        controller={controller => {
          dropdownController.current = controller
        }}
        onBlur={() => {
          dropdownController.current.setItem(value)
        }}
        initialValue={value}
        dataSet={suggestionsList}
        onChangeText={filterItems}
        onSelectItem={item => {
          item && onChange(item)
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
        closeOnSubmit={true}
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
        onClear={clearSuggestions}
        useFilter={false}
        onChevronPress={showAllItems}
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
