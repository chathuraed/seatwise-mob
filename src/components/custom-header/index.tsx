import {View, Button, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../../resources';
import {scale} from '../../styles/scaling';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  title?: string;
  navigation: any;
};

const CustomHeader = (props: Props) => {
  const {navigation, title} = props;
  return (
    <View
      style={{
        backgroundColor: Colors.green,
        height: scale(80),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: scale(14),
      }}>
      {/* <Button
        title="Hello"
        onPress={() => {
          navigation.openDrawer();
        }}
      /> */}
      <TouchableOpacity
        style={{width: 30, height: 30}}
        onPress={() => {
          navigation.openDrawer();
        }}>
        <Ionicons name="menu" size={scale(20)} />
      </TouchableOpacity>
      {title && <Text>{title}</Text>}

      <View style={{width: 30, height: 30}}></View>
    </View>
  );
};

export default CustomHeader;
