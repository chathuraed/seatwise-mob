import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import MainNavigator from './MainNavigator';
import {useSelector} from 'react-redux';
import {BlurView} from '@react-native-community/blur';
import {selectLoading, selectLoadingText} from '../store/reducer/app-slice';
import {scale} from '../styles/scaling';

const InitialPoint = () => {
  const isLoading = useSelector(selectLoading);
  const loadingText = useSelector(selectLoadingText);

  return (
    <View style={styles.container}>
      <MainNavigator />
      {isLoading && (
        <View style={styles.overlay}>
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={Platform.OS === 'ios' ? 6 : 4}
          />
          <ActivityIndicator size="large" color="#252B5C" />
          {loadingText && <Text style={styles.loadingText}>{loadingText}</Text>}
        </View>
      )}
    </View>
  );
};

InitialPoint.propTypes = {
  blurViewActive: PropTypes.bool,
  storeRef: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingText: {
    color: '#252B5C',
    fontSize: scale(16),
    fontFamily: 'Lato',
    fontWeight: '500',
    lineHeight: scale(40),
    letterSpacing: 0.75,
  },
});

export default InitialPoint;
