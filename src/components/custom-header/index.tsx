import React from 'react'
import {View, Text, TouchableOpacity, Platform, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import {scale} from '../../styles/scaling'
import {Colors} from '../../resources'

const CustomHeader = ({title}: any) => {
  const navigation = useNavigation()

  return (
    <View
      style={[
        styles.headerContainer,
        Platform.OS === 'android' && styles.androidHeader,
        {height: scale(84)},
      ]}>
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer()
        }}>
        <Ionicons name="menu" size={scale(26)} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightSpace} />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: scale(12),
    paddingBottom: scale(10),
    ...Platform.select({
      android: {
        backgroundColor: Colors.green,
      },
      ios: {
        backgroundColor: Colors.green,
      },
    }),
  },
  androidHeader: {
    // Android-specific styles
  },
  title: {
    fontSize: scale(16),
    fontWeight: '500',
  },
  rightSpace: {
    width: scale(24),
  },
})

export default CustomHeader
