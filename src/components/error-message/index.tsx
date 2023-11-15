import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectError} from '../../store/reducer/app-slice';
import {Colors} from '../../resources';
import {scale} from '../../styles/scaling';

const ErrorMessage = props => {
  const {message} = props;

  const [errorTitle, setErrorTitle] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [visible, setVisible] = useState(false);

  const error = useSelector(selectError);

  useEffect(() => {
    setErrorTitle(error?.title);
    setErrorMessage(error?.message);
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const handlePress = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && errorMessage ? (
        <TouchableOpacity onPress={handlePress}>
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              {errorTitle && errorTitle.length > 0 ? (
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText}>{errorTitle}</Text>
                </View>
              ) : null}

              <View>
                <Text style={styles.messageText}>
                  {errorMessage ? errorMessage : message}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.error,
    padding: scale(14),
    flexDirection: 'row',
  },
  innerContainer: {
    flex: 1,
    marginLeft: scale(10),
  },
  titleContainer: {
    backgroundColor: 'yellow',
  },
  titleText: {
    fontSize: scale(12),
    color: 'white',
    fontWeight: 'bold',
  },
  messageText: {
    color: 'white',
    fontSize: scale(12),
    fontWeight: '500',
  },
});

export default ErrorMessage;
