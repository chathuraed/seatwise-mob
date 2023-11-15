import * as React from 'react';
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native';
import {useDispatch} from 'react-redux';
import {authActions} from '../../store/reducer/auth-slice';

interface IUseLoginHook {
  loginData: {email: string; password: string};
  handleChange: (
    name: string,
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => void;
  login: () => void;
}

export const useLoginHook = (): IUseLoginHook => {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = React.useState({email: '', password: ''});

  const handleChange = (
    name: string,
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const {text} = e.nativeEvent;
    setLoginData((prev: any) => ({
      ...prev,
      [name]: text,
    }));
  };

  const login = React.useCallback(() => {
    dispatch(authActions.loginUser(loginData));
  }, [dispatch, loginData]);

  return {loginData, handleChange, login};
};
