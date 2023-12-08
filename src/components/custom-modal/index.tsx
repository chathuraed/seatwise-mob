import React from 'react'
import {Modal, View, Text, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {scale} from '../../styles/scaling'
import {Colors} from '../../resources'

const CustomModal = ({visible, config, hide}) => {
  const {type, title, message, onApprove} = config

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={hide}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '80%',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons
              name={type === 'ERROR' ? 'close-circle' : 'checkmark-circle'}
              size={scale(30)}
              color={type === 'ERROR' ? Colors.error : Colors.green}
            />
            <Text
              style={{fontSize: 18, fontWeight: 'bold', marginLeft: scale(8)}}>
              {title}
            </Text>
          </View>

          <Text style={{fontSize: 16, marginVertical: 20}}>{message}</Text>
          <Button title="OK" onPress={() => hide()} />
        </View>
      </View>
    </Modal>
  )
}

export default CustomModal