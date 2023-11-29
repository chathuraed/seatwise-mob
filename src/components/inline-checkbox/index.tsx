import React from 'react';
import {Text, TouchableWithoutFeedback, View} from 'react-native';
import Iconions from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../resources';

const InlineCheckbox = props => {
  const {
    containerStyle,
    checkSize,
    label,
    number,
    value,
    onChange,
    showNumber,
  } = props;

  const selected = !!value;

  const checkIconSize = checkSize ? checkSize : 15;

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (onChange) {
          onChange(!selected);
        }
      }}>
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
          },
          containerStyle,
        ]}>
        {number && showNumber ? (
          <View style={{marginRight: 10}}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              {number}
            </Text>
          </View>
        ) : null}

        <View
          style={[
            {
              borderWidth: 1,
              borderColor: '#A3A3A3',
              width: checkIconSize,
              height: checkIconSize,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 10,
            },
            selected
              ? {
                  backgroundColor: Colors.green,
                }
              : {
                  backgroundColor: 'white',
                },
          ]}>
          {selected ? (
            <View>
              <Iconions
                name={'checkmark'}
                size={checkSize * 0.75}
                color={'white'}
              />
            </View>
          ) : null}
        </View>

        <View style={{marginLeft: 10, flex: 1}}>
          <Text>{label}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InlineCheckbox;
