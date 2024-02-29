import * as React from 'react'
import {NativeSyntheticEvent, TextInputChangeEventData} from 'react-native'
import {useDispatch} from 'react-redux'
import {authActions} from '../../store/reducer/auth-slice'

interface IUseRegistrationHook {
  loginData: {
    first_name: string
    last_name: string
    email: string
    password: string
    role: string
  }
  handleChange: (
    name: string,
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => void
  login: () => void
}

export const useRegistrationHook = (): IUseRegistrationHook => {
  const dispatch = useDispatch()

  const [loginData, setLoginData] = React.useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'passenger',
  })

  const handleChange = (
    name: string,
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    const {text} = e.nativeEvent
    setLoginData((prev: any) => ({
      ...prev,
      [name]: text,
    }))
  }

  const login = React.useCallback(() => {
    dispatch(authActions.registerUser(loginData))
  }, [dispatch, loginData])

  return {loginData, handleChange, login}
}
