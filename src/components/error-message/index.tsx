import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectError} from '../../store/reducer/app-slice';
import {Colors} from '../../resources';

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

    // Auto-hide after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    // Clear the timer on component unmount or when the error changes
    return () => clearTimeout(timer);
  }, [error]);

  const handlePress = () => {
    // Hide the error message when touched
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
    padding: 16,
    flexDirection: 'row',
  },
  innerContainer: {
    flex: 1,
    marginLeft: 10,
  },
  titleContainer: {
    backgroundColor: 'yellow',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageText: {
    color: 'white',
  },
});

export default ErrorMessage;
