// BlankScreen.js
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {scale} from '../../../../styles/scaling'
import Layout from '../../../../components/layout'
import {Images} from '../../../../resources'
import {useSelector} from 'react-redux'
import {selectSchedules} from '../../../../store/reducer/search-slice'

const ResultScreen = () => {
  const schedules = useSelector(selectSchedules)
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <Layout scrollEnabled>
          {schedules.map((schedule, i) => (
            <View
              key={i.toString()}
              style={{
                marginHorizontal: scale(16),
                marginTop: scale(20),
                paddingVertical: scale(8),
                paddingHorizontal: scale(8),
                backgroundColor: '#F5F4F8',
                borderRadius: scale(8),
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={Images.tour_1}
                  style={{
                    width: scale(150),
                    height: scale(130),
                    borderRadius: scale(8),
                  }}
                  resizeMode="cover"
                />
                <View style={{flexGrow: 1, marginLeft: scale(16)}}>
                  <Text
                    style={{
                      color: '#252B5C',
                      fontSize: scale(18),
                      fontFamily: 'Raleway',
                      fontWeight: '700',
                      letterSpacing: 0.36,
                      textAlign: 'right',
                    }}>
                    {schedule.route.bus.busNumber}
                  </Text>
                  <View style={{marginTop: scale(8), flexDirection: 'row'}}>
                    <Text
                      style={{
                        color: '#252B5C',
                        fontSize: scale(14),
                        fontFamily: 'Raleway',
                        fontWeight: '400',
                        letterSpacing: 0.36,
                      }}>
                      Capacity:{' '}
                    </Text>
                    <Text
                      style={{
                        color: '#252B5C',
                        fontSize: scale(14),
                        fontFamily: 'Raleway',
                        fontWeight: '700',
                        letterSpacing: 0.36,
                      }}>
                      {schedule.route.bus.seatingCapacity}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: scale(8),
                    }}>
                    <Text
                      style={{
                        color: '#252B5C',
                        fontSize: scale(14),
                        fontFamily: 'Raleway',
                        fontWeight: '400',
                        letterSpacing: 0.36,
                      }}>
                      {schedule.origin}
                    </Text>
                    <View
                      style={{
                        flexGrow: 1,
                        height: 1,
                        backgroundColor: 'red',
                        marginHorizontal: scale(4),
                      }}
                    />
                    <Text
                      style={{
                        color: '#252B5C',
                        fontSize: scale(14),
                        fontFamily: 'Raleway',
                        fontWeight: '700',
                        letterSpacing: 0.36,
                      }}>
                      {schedule.start_time}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: scale(8),
                    }}>
                    <Text
                      style={{
                        color: '#252B5C',
                        fontSize: scale(14),
                        fontFamily: 'Raleway',
                        fontWeight: '400',
                        letterSpacing: 0.36,
                      }}>
                      {schedule.destination}
                    </Text>
                    <View
                      style={{
                        flexGrow: 1,
                        height: 1,
                        backgroundColor: 'red',
                        marginHorizontal: scale(4),
                      }}
                    />
                    <Text
                      style={{
                        color: '#252B5C',
                        fontSize: scale(14),
                        fontFamily: 'Raleway',
                        fontWeight: '700',
                        letterSpacing: 0.36,
                      }}>
                      {schedule.end_time}
                    </Text>
                  </View>
                </View>
              </View>
              {/* <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            navigate('Filters')
          }}>
          <Ionicons name="search-outline" size={scale(25)} />
          <Text>Search</Text>
        </TouchableOpacity> */}
            </View>
          ))}
        </Layout>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centeredText: {
    fontSize: 20,
  },
  topic_container: {
    flexDirection: 'row',
    marginLeft: scale(24),
    marginTop: scale(50),
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
})

export default ResultScreen
