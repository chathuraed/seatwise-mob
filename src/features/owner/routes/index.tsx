import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {scale, verticalScale} from '../../../styles/scaling'
import {getCapitalize} from '../../../util'
import Ionicon from 'react-native-vector-icons/Ionicons'
import {Colors} from '../../../resources'
import Layout from '../../../components/layout'
import {useRoutesHook} from './hook'
import CustomHeader from '../../../components/custom-header'
import {navigate} from '../../../navigation/rootNavigation'

const RoutesScreen = ({}) => {
  // const navigation = useNavigation();
  const {routes, setRoute} = useRoutesHook()
  return (
    <View style={styles.container}>
      <CustomHeader title="Routes" />
      <View style={styles.spacing} />

      <Layout scrollEnabled={true}>
        {routes.length > 0 ? (
          routes.map((route, i) => (
            <TouchableOpacity
              onPress={async () => {
                setRoute(route)
                navigate('RouteAvailableSchedules')
              }}
              style={styles.routeContainer}
              key={i.toString()}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.busTitle}>
                  {getCapitalize(route.bus.busNumber)}
                </Text>

                <Text style={styles.routeTitle}>
                  #{getCapitalize(route.permit_id)}
                </Text>
              </View>
              <Text style={styles.routeText}>From : {route.origin}</Text>
              <Text style={styles.routeText}>
                Destination : {route.destination}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.centerTextContainer}>
            <Text style={styles.centerText}>No routes available</Text>
          </View>
        )}
      </Layout>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigate('RouteCreate')}>
        <Ionicon name="add" size={scale(30)} color="#ffffff" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spacing: {
    height: 8,
  },
  routeContainer: {
    marginHorizontal: scale(16),
    marginVertical: verticalScale(8),
    backgroundColor: Colors.white,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    borderRadius: scale(20),
  },
  busTitle: {
    color: '#53587A',
    fontSize: scale(18),
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    lineHeight: scale(20),
    letterSpacing: 0.36,
  },
  routeTitle: {
    color: '#53587A',
    fontSize: scale(12),
    fontFamily: 'Lato-Regular',
    fontWeight: 'bold',
    lineHeight: scale(20),
    letterSpacing: 0.36,
  },
  routeText: {
    fontSize: scale(14),
    fontWeight: '700',
    fontStyle: 'normal',
    lineHeight: scale(20),
    letterSpacing: 0.36,
    color: '#252B5C',
    marginTop: scale(8),
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(60),
    position: 'absolute',
    bottom: scale(20),
    right: scale(16),
    height: scale(60),
    backgroundColor: Colors.green,
    borderRadius: scale(100),
  },
  centerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: scale(16),
    color: '#53587A',
    fontWeight: 'bold',
  },
})

export default RoutesScreen
