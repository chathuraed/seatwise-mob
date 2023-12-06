import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {useNavigation} from '@react-navigation/native'
import {Images} from '../../resources'
import {scale, verticalScale} from '../../styles/scaling'

const OnboardingScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <View style={styles.app_logo} />
        <Text style={styles.logo_text}>SeatWise</Text>
      </View>

      <TouchableOpacity
        style={styles.start_button}
        onPress={() => navigation.navigate('ProductTour')}>
        <Text style={styles.start_button_text}>let’s start</Text>
      </TouchableOpacity>

      <View style={styles.version_container}>
        <Text style={styles.version_text}>v.1.0.0</Text>
      </View>

      <Image style={styles.image} source={Images.onboarding_background_new} />
      <LinearGradient
        style={styles.gradient}
        colors={['rgba(33, 98, 138, 0)', '#1F4C6B']}
        locations={[0.05, 0.7]}
      />
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    bottom: 0,
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: verticalScale(563),
  },
  logo_container: {
    position: 'absolute',
    zIndex: 5,
    marginTop: verticalScale(260),
    justifyContent: 'center',
    alignItems: 'center',
  },
  app_logo: {
    width: scale(150),
    height: verticalScale(150),
    backgroundColor: '#234F68',
  },
  logo_text: {
    fontSize: scale(30),
    fontWeight: '700',
    color: 'white',
    fontFamily: 'Lato-Regular',
  },
  start_button: {
    zIndex: 5,
    position: 'absolute',
    backgroundColor: '#8BC83F',
    bottom: verticalScale(75),
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
  version_container: {
    position: 'absolute',
    bottom: verticalScale(23),
    zIndex: 5,
  },
  version_text: {
    color: 'white',
    fontSize: scale(10),
    fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
})
