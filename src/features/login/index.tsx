import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import {Icons} from '../../resources'
import {scale, verticalScale} from '../../styles/scaling'
import Layout from '../../components/layout'
import {RootStackParamList} from '../../navigation/MainNavigator'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useLoginHook} from './hooks'
import ErrorMessage from '../../components/error-message'
import {SafeAreaView} from 'react-native-safe-area-context'

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const {loginData, handleChange, login} = useLoginHook()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Layout scrollEnabled={true}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              marginTop: verticalScale(12),
              marginLeft: verticalScale(24),
              backgroundColor: '#F5F4F8',
              borderRadius: scale(30),
              width: scale(50),
              height: scale(50),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              resizeMode="contain"
              style={{width: scale(16), height: scale(16)}}
              source={Icons.back}
            />
          </TouchableOpacity>
          <View style={styles.topic_container}>
            <Text style={styles.title_main}>Let's </Text>
            <Text style={styles.title_secondary}>Sign in</Text>
          </View>
          <Text style={styles.subtitle}>
            quis nostrud exercitation ullamco laboris nisi ut
          </Text>
          <View
            style={{marginHorizontal: scale(24), marginTop: verticalScale(34)}}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#F5F4F8',
                height: verticalScale(70),
                borderRadius: scale(10),
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: scale(25),
                  height: scale(25),
                  marginHorizontal: scale(16),
                }}
                source={Icons.envelop}
                resizeMode="contain"
              />
              <TextInput
                style={{
                  paddingVertical: scale(16),
                  flexGrow: 1,
                  color: '#A1A5C1',
                  fontSize: scale(12),
                  fontFamily: 'Raleway',
                  fontWeight: '400',
                  letterSpacing: 0.36,
                }}
                placeholder="Email"
                textContentType="emailAddress"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChange={e => handleChange('email', e)}
              />
            </View>
            <View style={{height: verticalScale(17)}} />
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#F5F4F8',
                height: verticalScale(70),
                borderRadius: scale(10),
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: scale(25),
                  height: scale(25),
                  marginHorizontal: scale(16),
                }}
                source={Icons.lock}
                resizeMode="contain"
              />
              <TextInput
                style={{
                  paddingVertical: scale(16),
                  flexGrow: 1,
                  color: '#A1A5C1',
                  fontSize: scale(12),
                  fontFamily: 'Raleway',
                  fontWeight: '400',
                  letterSpacing: 0.36,
                }}
                placeholder="Password"
                secureTextEntry
                textContentType="password"
                autoCapitalize="none"
                autoCorrect={false}
                onChange={e => handleChange('password', e)}
              />
            </View>
            <View
              style={{
                marginTop: verticalScale(10),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.option_text}>Forgot password?</Text>
              <Text style={styles.option_text}>Show password</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.start_button_text}>Login</Text>
          </TouchableOpacity>

          {/* Bottom */}
          <View style={{justifyContent: 'flex-end'}}>
            <View style={styles.orContainer}>
              <View style={styles.hr} />
              <Text style={styles.or}>OR</Text>
              <View style={styles.hr} />
            </View>
            <View style={styles.button_container}>
              <TouchableOpacity
                onPress={() => {}}
                style={styles.touch_container}>
                <View style={styles.touch_button}>
                  <Image
                    style={{width: scale(25), height: scale(25)}}
                    source={Icons.google_mini}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={styles.touch_container}>
                <View style={styles.touch_button}>
                  <Image
                    style={{width: scale(25), height: scale(25)}}
                    source={Icons.facebook_mini}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{marginTop: verticalScale(35), alignSelf: 'center'}}
              onPress={() => {}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.have_account}>Don’t have an account? </Text>
                <Text style={styles.register}>Register</Text>
              </View>
            </TouchableOpacity>
          </View>
          <ErrorMessage />
        </Layout>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  topic_container: {
    flexDirection: 'row',
    marginLeft: scale(24),
    marginTop: scale(50),
  },
  title_main: {
    color: '#252B5C',
    fontSize: scale(25),
    fontFamily: 'Lato',
    fontWeight: '500',
    lineHeight: scale(40),
    letterSpacing: 0.75,
  },
  title_secondary: {
    color: '#1F4C6B',
    fontSize: scale(25),
    fontFamily: 'Lato',
    fontWeight: '800',
    lineHeight: scale(40),
  },
  subtitle: {
    marginLeft: scale(24),
    marginTop: verticalScale(20),
    color: '#53587A',
    fontSize: scale(12),
    fontFamily: 'Lato',
    fontWeight: '400',
    lineHeight: scale(20),
    letterSpacing: 0.36,
  },
  option_text: {
    color: '#1F4C6B',
    fontSize: scale(12),
    fontFamily: 'Raleway',
    fontWeight: '600',
    lineHeight: scale(20),
    letterSpacing: 0.36,
  },
  button: {
    marginTop: verticalScale(50),
    marginHorizontal: scale(48),
    backgroundColor: '#8BC83F',
    borderRadius: scale(10),
  },
  start_button_text: {
    alignSelf: 'center',
    color: 'white',
    fontSize: scale(16),
    fontFamily: 'Lato',
    fontWeight: '700',
    paddingVertical: verticalScale(17),
    paddingHorizontal: scale(60),
  },
  orContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scale(24),
    marginTop: verticalScale(40),
    marginBottom: verticalScale(20),
  },
  hr: {
    flexGrow: 1,
    backgroundColor: '#ECEDF3',
    height: verticalScale(2),
  },
  or: {
    marginHorizontal: scale(10),
    color: '#A1A5C1',
    fontSize: scale(10),
    fontFamily: 'Raleway',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  button_container: {
    flexDirection: 'row',
    marginHorizontal: scale(24),
    justifyContent: 'space-between',
  },
  touch_container: {backgroundColor: '#F5F4F8', borderRadius: scale(25)},
  touch_button: {
    paddingVertical: verticalScale(22),
    paddingHorizontal: scale(66),
  },
  have_account: {
    color: '#53587A',
    fontSize: scale(12),
    fontFamily: 'Lato',
    fontWeight: '400',
    letterSpacing: 0.36,
  },
  register: {
    color: '#1F4C6B',
    fontSize: scale(12),
    fontFamily: 'Lato',
    fontWeight: '700',
    letterSpacing: 0.36,
  },
})
