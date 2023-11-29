import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import InlineCheckbox from '../inline-checkbox';
import {Colors} from '../../resources';

const MultipleSelect = props => {
  const {
    containerStyle,
    label,
    options,
    value,
    onChange,
    showNumber,
    errorMessage,
    itemsPerRow,
  } = props;

  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    setSelectedKeys(value ? value : []);
  }, [value]);

  const renderCheckboxes = () => {
    if (!itemsPerRow) {
      return (
        <View>
          {options.map((option, index) => {
            return (
              <InlineCheckbox
                key={index}
                label={option.value}
                checkSize={20}
                number={option.key}
                showNumber={showNumber}
                value={selectedKeys.includes(option.key)}
                onChange={value => {
                  const tempKeys = [...selectedKeys];

                  if (tempKeys.includes(option.key)) {
                    const keyIndex = tempKeys.indexOf(option.key);
                    tempKeys.splice(keyIndex, 1);
                  } else {
                    tempKeys.push(option.key);
                  }
                  setSelectedKeys(tempKeys);
                  onChange(tempKeys);
                }}
                containerStyle={{
                  backgroundColor: 'white',
                  height: 40,
                  marginTop: 10,
                  borderColor: '#D4D4D4',
                  borderWidth: 1,
                }}
              />
            );
          })}
        </View>
      );
    } else {
      return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {options.map((option, index) => (
            <InlineCheckbox
              key={index}
              label={option.value}
              checkSize={20}
              number={option.key}
              showNumber={showNumber}
              value={selectedKeys.includes(option.key)}
              onChange={value => {
                const tempKeys = [...selectedKeys];

                if (tempKeys.includes(option.key)) {
                  const keyIndex = tempKeys.indexOf(option.key);
                  tempKeys.splice(keyIndex, 1);
                } else {
                  tempKeys.push(option.key);
                }
                setSelectedKeys(tempKeys);
                onChange(tempKeys);
              }}
              containerStyle={{
                backgroundColor: 'white',
                height: 40,
                marginTop: 10,
                borderColor: '#D4D4D4',
                borderWidth: 1,
                flexBasis: `${100 / itemsPerRow}%`,
              }}
            />
          ))}
        </View>
      );
    }
  };

  return (
    <View style={containerStyle}>
      {label ? (
        <View>
          <Text>{label}</Text>
        </View>
      ) : null}

      {renderCheckboxes()}

      {errorMessage ? (
        <View>
          <Text
            style={{
              color: Colors.error,
              marginTop: 5,
            }}>
            {errorMessage}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default MultipleSelect;
