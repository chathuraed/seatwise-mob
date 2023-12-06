// BlankScreen.js
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import {scale} from '../../../styles/scaling'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {navigate} from '../../../navigation/rootNavigation'

const SearchScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <View style={styles.topic_container}>
          <Text style={styles.title_main}>Hi </Text>
          <Text style={styles.title_secondary}>Chathura</Text>
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
