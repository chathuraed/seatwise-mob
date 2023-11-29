import React from 'react';
import {Text, View} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group'; // Import the radio button component
import {Colors} from '../../resources';

const CustomRadio = props => {
  const {
    containerStyle,
    label,
    errorMessage,
    items,
    labelStyle = {},
    onChange,
    value,
  } = props;

  return (
    <View style={containerStyle}>
      {label ? (
        <View style={{marginBottom: label ? 5 : 0}}>
          <Text style={labelStyle}>{label}</Text>
        </View>
      ) : null}

      <View style={{marginBottom: -15}}>
        <RadioGroup
          radioButtons={items}
          onPress={onChange}
          selectedId={value}
        />
      </View>

      {errorMessage && errorMessage !== undefined ? (
        <View>
          <Text style={{color: Colors.error}}>{errorMessage}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default CustomRadio;
