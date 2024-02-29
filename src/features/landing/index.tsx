import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native'
import {scale, verticalScale} from '../../styles/scaling'
import {Icons, Images} from '../../resources'

const IMAGES = [
  {
    id: 1,
    uri: Images.login_6,
  },
  {
    id: 2,
    uri: Images.login_2,
  },
  {
    id: 3,
    uri: Images.login_3,
  },
  {
    id: 4,
    uri: Images.login_4,
  },
]

const LandingScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.image_grid}>
        {IMAGES.map(image => (
          <Image
            style={styles.image}
            key={image.id.toString()}
            source={image.uri}
          />
        ))}
      </View>
      <View style={styles.topic_container}>
        <Text style={styles.title_main}>Ready to </Text>
        <Text style={styles.title_secondary}>book?</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.start_button_text}>Continue with Email</Text>
      </TouchableOpacity>
      <View style={styles.orContainer}>
        <View style={styles.hr} />
        <Text style={styles.or}>OR</Text>
        <View style={styles.hr} />
      </View>
      <View style={styles.button_container}>
        <TouchableOpacity onPress={() => {}} style={styles.touch_container}>
          <View style={styles.touch_button}>
            <Image
              style={{width: scale(25), height: scale(25)}}
              source={Icons.google_mini}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.touch_container}>
          <View style={styles.touch_button}>
            <Image
              style={{width: scale(25), height: scale(25)}}
              source={Icons.facebook_mini}
            />
          </View>
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity
        style={{marginTop: verticalScale(35), alignSelf: 'center'}}
        onPress={() => {}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.have_account}>Don’t have an account? </Text>
          <Text style={styles.register}>Register</Text>
        </View>
      </TouchableOpacity> */}
    </View>
  )
}

export default LandingScreen

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  image_grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: scale(8),
    marginVertical: verticalScale(40),
  },
  image: {
    width: scale(171),
    height: verticalScale(171),
    marginHorizontal: scale(4),
    marginVertical: verticalScale(4),
    borderRadius: scale(20),
  },
  topic_container: {
    flexDirection: 'row',
    marginLeft: scale(24),
    marginTop: scale(13),
  },
  title_main: {
    color: '#252B5C',
    fontSize: scale(25),
    fontFamily: 'Lato-Regular',
    fontWeight: '500',
    lineHeight: scale(40),
    letterSpacing: 0.75,
  },
  title_secondary: {
    color: '#1F4C6B',
    fontSize: scale(25),
    fontFamily: 'Lato-Regular',
    fontWeight: '800',
    lineHeight: scale(40),
  },
  button: {
    marginTop: verticalScale(50),
    marginHorizontal: scale(48),
    backgroundColor: '#8BC83F',
    borderRadius: scale(10),
  },
  start_button_text: {
    color: 'white',
    fontSize: scale(16),
    fontFamily: 'Lato-Regular',
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
    fontFamily: 'Lato-Regular',
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
    fontFamily: 'Lato-Regular',
    fontWeight: '400',
    letterSpacing: 0.36,
  },
  register: {
    color: '#1F4C6B',
    fontSize: scale(12),
    fontFamily: 'Lato-Regular',
    fontWeight: '700',
    letterSpacing: 0.36,
  },
})
