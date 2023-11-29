import React from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';
import {Colors} from '../../resources';

const TextField = (props: any) => {
  const {
    containerStyle,
    label,
    value,
    onChange,
    errorMessage,
    inputStyle = {},
    labelStyle = {},
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            value={value}
            onChangeText={onChange}
            style={[styles.input, inputStyle]}
            placeholderTextColor="#a3a3a3"
            {...props}
            editable={!props.disabled}
            selectTextOnFocus={!props.disabled}
          />
        </View>
      </View>

      {errorMessage && (
        <View>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
    marginBottom: 5,
  },
  label: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 15,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: 'white',
    height: 40,
  },
  input: {
    flexGrow: 1,
  },
  errorText: {
    color: Colors.error,
  },
});

export default TextField;
