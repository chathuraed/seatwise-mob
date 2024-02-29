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
import {scale} from '../../../styles/scaling'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {navigate} from '../../../navigation/rootNavigation'
import {ScrollView} from 'react-native-gesture-handler'
import {useIsFocused} from '@react-navigation/native'
import {
  searchActions,
  selectSchedules,
} from '../../../store/reducer/search-slice'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import {Images, features} from '../../../resources'
import {selectCurrentAccount} from '../../../store/reducer/auth-slice'

const SearchScreen = () => {
  const account = useSelector(selectCurrentAccount)
  const isFocused = useIsFocused()
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (isFocused) {
      const fields = {
        from: {id: 'Kurunegala', title: 'Kurunegala'},
        to: {id: 'Colombo', title: 'Colombo'},
        date: '11-12-2023',
      }
      // dispatch(searchActions.getSchedules(fields))
    }
  }, [dispatch, isFocused])
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.topic_container}>
          <Text style={styles.title_main}>Hi </Text>
          <Text style={styles.title_secondary}>
            {account && account.first_name}
          </Text>
        </View>
        <Text style={[styles.title_main, {marginLeft: scale(24)}]}>
          Let's start exploring
        </Text>
        <View
          style={{
            marginHorizontal: scale(24),
            marginVertical: scale(20),
            paddingVertical: scale(25),
            paddingHorizontal: scale(16),
            backgroundColor: '#F5F4F8',
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              navigate('Filters')
            }}>
            <Ionicons name="search-outline" size={scale(25)} />
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: scale(16)}}>
          <Text
            style={{
              color: '#252B5C',
              fontSize: scale(18),
              fontFamily: 'Lato-Regular',
              fontWeight: '500',
              lineHeight: scale(40),
              letterSpacing: 0.75,
              marginLeft: scale(24),
            }}>
            Featured
          </Text>
        </View>
        <View>
          <ScrollView style={{marginLeft: scale(16)}} horizontal>
            {features.map((feature, i) => (
              <TouchableOpacity
                key={i.toString()}
                style={{
                  marginHorizontal: scale(4),
                  marginTop: scale(8),
                  paddingVertical: scale(8),
                  paddingHorizontal: scale(8),
                  backgroundColor: '#F5F4F8',
                  borderRadius: scale(8),
                }}
                onPress={() => {
                  // navigate('BookSeat', {schedule, filters})
                }}>
                <View style={{flexDirection: 'column'}}>
                  <Image
                    source={Images.tour_1}
                    style={{
                      width: scale(150),
                      height: scale(130),
                      borderRadius: scale(8),
                    }}
                    resizeMode="cover"
                  />
                  <View style={{}}>
                    <Text
                      style={{
                        color: '#252B5C',
                        fontSize: scale(18),
                        fontFamily: 'Lato-Regular',
                        fontWeight: '700',
                        letterSpacing: 0.36,
                        textAlign: 'right',
                      }}>
                      {feature.route.bus.busNumber}
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
                        {feature.route.bus.seatingCapacity}
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
                        {feature.origin}
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
                        {feature.start_time}
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
                        {feature.destination}
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
                        {feature.end_time}
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
                          LKR {feature.route.price}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
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

export default SearchScreen
