// SettingsScreen.js
import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {
  authActions,
  selectCurrentAccount,
} from '../../../store/reducer/auth-slice'
import {navigate} from '../../../navigation/rootNavigation'
import {scale} from '../../../styles/scaling'
import {Colors, Images} from '../../../resources'

import Ionicon from 'react-native-vector-icons/Ionicons'
import CustomButton from '../../../components/custom-button'

const SettingsScreen = () => {
  const dispatch = useDispatch()
  const account = useSelector(selectCurrentAccount)

  const logout = async () => {
    await AsyncStorage.clear()
    dispatch(authActions.logoutUser())
    navigate('Login')
  }
  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <View style={styles.container}>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.green,
              padding: scale(8),
              borderRadius: scale(4),
            }}
            onPress={() => navigate('UpdateProfile')}>
            <Ionicon
              name="settings-outline"
              size={scale(24)}
              color={Colors.white}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: scale(56),
          }}>
          <Text
            style={{
              color: '#252B5C',
              fontSize: scale(18),
              fontFamily: 'Lato',
              fontWeight: '700',
              letterSpacing: 0.42,
            }}>
            {account && account.first_name}
          </Text>
          <Text
            style={{
              fontSize: scale(12),
              fontFamily: 'Raleway',
              fontWeight: '600',
              letterSpacing: 0.3,
              marginVertical: scale(8),
            }}>
            {account && account.email}
          </Text>
          <Image
            style={{
              marginTop: scale(16),
              width: scale(142),
              height: scale(142),
              borderRadius: scale(99),
            }}
            source={Images.tour_4}
          />
        </View>

        {/* <View
          style={{
            marginTop: scale(32),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              padding: 16,
              borderWidth: scale(2),
              borderColor: Colors.border,
              borderRadius: scale(12),
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#252B5C',
                fontSize: scale(14),
                fontFamily: 'Montserrat',
                fontWeight: '700',
                letterSpacing: 0.42,
              }}>
              1
            </Text>
            <Text
              style={{
                marginTop: scale(8),
                color: '#53587A',
                fontSize: scale(12),
                fontFamily: 'Montserrat',
                fontWeight: '500',
                letterSpacing: 0.3,
              }}>
              Bookings
            </Text>
          </View>
        </View> */}

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          {/* <CustomButton
            style={{
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              marginBottom: scale(16),
            }}
            textStyle={{color: Colors.textMain}}
            onPress={() => logout()}
            title="Reset Password"
          /> */}
          <CustomButton
            style={{backgroundColor: Colors.green, borderColor: 'transparent'}}
            onPress={() => logout()}
            title="Sign Out"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: scale(18),
  },
  centeredText: {
    fontSize: 20,
    textAlign: 'center',
  },
})

export default SettingsScreen
