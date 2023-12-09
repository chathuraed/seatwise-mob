import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native'
import {scale} from '../../../../styles/scaling'
import Layout from '../../../../components/layout'
import {Images} from '../../../../resources'
import {useSelector} from 'react-redux'
import {
  selectFilters,
  selectSchedules,
} from '../../../../store/reducer/search-slice'

const ResultScreen = () => {
  const filters = useSelector(selectFilters)
  const schedules = useSelector(selectSchedules)
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={{marginHorizontal: scale(16), marginTop: scale(16)}}>
          <Text style={{fontSize: scale(16), marginBottom: scale(4)}}>
            Date: {filters.date}
          </Text>
          <Text style={{fontSize: scale(14), marginBottom: scale(4)}}>
            From: {filters.from.title}
          </Text>
          <Text style={{fontSize: scale(14)}}>To: {filters.to.title}</Text>
        </View>
        <Layout scrollEnabled>
          {schedules.map((schedule, i) => (
            <TouchableOpacity
              key={i.toString()}
              onPress={() => {}}
              style={{
                marginHorizontal: scale(16),
                marginTop: scale(8),
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
                      fontFamily: 'Lato-Regular',
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
                        fontFamily: 'Lato-Regular',
                        fontWeight: '400',
                        letterSpacing: 0.36,
                      }}>
                      Capacity:{' '}
                    </Text>
                    <Text
                      style={{
                        color: '#252B5C',
                        fontSize: scale(14),
                        fontFamily: 'Lato-Regular',
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
                        fontFamily: 'Lato-Regular',
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
                        fontFamily: 'Lato-Regular',
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
                        fontFamily: 'Lato-Regular',
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
                        fontFamily: 'Lato-Regular',
                        fontWeight: '700',
                        letterSpacing: 0.36,
                      }}>
                      {schedule.end_time}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: scale(8),
                    }}>
                    <View
                      style={{
                        flexGrow: 1,
                        height: 1,
                      }}
                    />
                    <View
                      style={{
                        backgroundColor: '#252B5C',
                        padding: scale(4),
                        borderRadius: scale(2),
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: scale(14),
                          fontFamily: 'Lato-Regular',
                          fontWeight: '700',
                          letterSpacing: 0.36,
                        }}>
                        LKR {schedule.route.price}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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
