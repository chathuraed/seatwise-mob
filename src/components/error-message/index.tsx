import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectError} from '../../store/reducer/app-slice';

const ErrorMessage = props => {
  const {containerStyle, message} = props;

  const [errorTitle, setErrorTitle] = useState(true);
  const [errorMessage, setErrorMessage] = useState(true);

  const error = useSelector(selectError);

  useEffect(() => {
    setErrorTitle(error?.title);
    setErrorMessage(error?.message);
  });

  return (
    <>
      {errorMessage ? (
        <View
          style={[
            {
              backgroundColor: 'red',
              padding: 10,
              flexDirection: 'row',
            },
            containerStyle,
          ]}>
          <View style={{flex: 1, marginLeft: 10}}>
            {errorTitle && errorTitle.length > 0 ? (
              <View
                style={{
                  backgroundColor: 'yellow',
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  {errorTitle}
                </Text>
              </View>
            ) : null}

            <View>
              <Text style={{color: 'white'}}>
                {errorMessage ? errorMessage : message}
              </Text>
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default ErrorMessage;
