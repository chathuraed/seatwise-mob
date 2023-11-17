import React from 'react';
import {Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Colors} from '../../resources';

const CustomPicker = props => {
  const [open, setOpen] = React.useState(false);
  const {
    containerStyle,
    label,
    setSelectedItem,
    errorMessage,
    items,
    setItems,
    labelStyle = {},
    onBlur,
  } = props;

  const [value, setValue] = React.useState(null);

  return (
    <View style={containerStyle}>
      {label ? (
        <View style={{marginBottom: label ? 5 : 0}}>
          <Text style={labelStyle}>{label}</Text>
        </View>
      ) : null}

      <View style={{marginBottom: -15}}>
        <DropDownPicker
          style={{
            borderRadius: 0,
            borderColor: Colors.border,
            minHeight: 40,
          }}
          searchTextInputStyle={{
            borderRadius: 0,
            minHeight: 40,
            borderColor: Colors.border,
          }}
          listItemContainer={{
            height: 40,
          }}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          onChangeValue={setSelectedItem}
          setItems={setItems}
          listMode="MODAL"
          onClose={onBlur}
          {...props}
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

export default CustomPicker;
