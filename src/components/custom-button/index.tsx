/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomButton = (props: any) => {
  const {
    type = 'primary',
    tintColor,
    textStyle,
    title,
    onPress,
    style,
    disabled,
  } = props;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: tintColor ? tintColor : 'black',
          backgroundColor: disabled
            ? 'gray'
            : type === 'primary'
            ? tintColor || 'black'
            : 'transparent',
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      onPress={disabled ? null : onPress}
      disabled={disabled}>
      <Text
        style={[
          styles.text,
          {
            color:
              type === 'primary' ? 'white' : tintColor ? tintColor : 'black',
          },
          textStyle,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    minHeight: 50,
  },
  text: {
    fontWeight: 'bold',
  },
});

export default CustomButton;
