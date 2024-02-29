import {call, put, takeLatest} from 'redux-saga/effects'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthService from '../../services/auth/auth-service'
import AppService from '../../services/generic/app-service'
import {appActions} from '../reducer/app-slice'
import {Account, authActions} from '../reducer/auth-slice'
import jwt_decode from 'jwt-decode'
import {showModal} from '../reducer/modal-slice'
import {ModalType} from '../../contexts/modal-provider'

export function* loginUserGenerator({
  payload,
}: {
  payload: any
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Logging in...'))
    yield put(appActions.removeErrors())

    const response = yield call(AuthService.loginUser, {
      email: payload.email,
      password: payload.password,
    })
    console.log('response', response.status)

    if (response.status === 200) {
      const {data} = response
      // let data = yield call([response, 'json']);

      AppService.accessToken = data.token
      AppService.refreshToken = data.refreshToken

      yield call(AsyncStorage.setItem, 'authToken', data.token)
      yield call(AsyncStorage.setItem, 'refreshToken', data.refreshToken)

      console.log('refresh', data.refreshToken)

      const account: Account = jwt_decode(data.token)

      yield put(authActions.setCurrentAccount(account))
      yield put(authActions.loginUserSuccess())
      yield put(
        appActions.navigateToLocation({
          screen: 'App',
        }),
      )
    } else if (response.status === 400) {
      let data = yield call([response, 'json'])
      console.log('test', data)

      yield put(
        appActions.setError({
          error: {
            title: '',
            message: data.message,
          },
          type: '',
        }),
      )
    }
  } catch (error) {
    console.log(error)
    yield put(
      appActions.setError({
        error: {
          title: '',
          message: error.data.error,
        },
        type: '',
      }),
    )
  } finally {
    yield put(appActions.removeLoading())
  }
}

export function* checkAuthTokenGenerator({
  payload,
}: {
  payload: any
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Loading...'))

    const authToken = yield call(AsyncStorage.getItem, 'authToken')
    console.log('Auth Token', authToken)

    AppService.accessToken = authToken

    if (!authToken) {
      yield put(
        appActions.navigateToLocation({
          screen: 'Onboarding',
        }),
      )
      yield put(appActions.removeLoading())
    } else {
      console.log('token Available')
      // then call api to get the user
      const account: Account = jwt_decode(authToken)

      const isExpired = account.exp < Date.now() / 1000

      if (isExpired) {
        console.log('expired')
        const response = yield call(AuthService.refreshToken)

        console.log('test', response)

        if (response.status === 200) {
          let {data} = response
          console.log(data)

          AppService.accessToken = data.token
          AppService.refreshToken = data.refreshToken

          yield call(AsyncStorage.setItem, 'authToken', data.token)
          yield call(AsyncStorage.setItem, 'refreshToken', data.refreshToken)

          const new_account: Account = jwt_decode(data.token)

          yield put(authActions.setCurrentAccount(new_account))
          yield put(authActions.loginUserSuccess())
          yield put(
            appActions.navigateToLocation({
              screen: 'App',
            }),
          )
        } else {
          yield put(appActions.navigateToLocation({screen: 'Onboarding'}))
        }
      } else {
        console.log('valid')
      }

      yield put(authActions.setCurrentAccount(account))
      yield put(appActions.navigateToLocation({screen: 'App', params: {}}))
      yield put(appActions.removeLoading())
    }
  } catch (error) {
    yield put(
      appActions.navigateToLocation({
        screen: 'Onboarding',
      }),
    )
  }
}

export function* refreshAuthTokenGenerator({
  payload,
}: {
  payload: any
}): Generator<any, void, any> {
  console.log('refreshAuthTokenGenerator')
  try {
    const authToken = yield call(AsyncStorage.getItem, 'authToken')
    const refreshToken = yield call(AsyncStorage.getItem, 'refreshToken')
    const rememberMe = yield call(AsyncStorage.getItem, 'rememberMe')

    console.log('rememberMe', rememberMe)
    console.log('token', authToken)
    console.log('refreshToken', refreshToken)

    const response = yield call(AuthService.refreshToken)

    if (response.status === 200) {
      let data = yield call([response, 'json'])

      AppService.accessToken = data.token
      AppService.refreshToken = data.refreshToken
      if (rememberMe) {
        yield call(AsyncStorage.setItem, 'authToken', data.token)
        yield call(AsyncStorage.setItem, 'refreshToken', data.refreshToken)
      }

      yield put(authActions.loginUserSuccess())
      yield put(
        appActions.navigateToLocation({
          screen: 'App',
        }),
      )
    }
  } catch (error) {
    yield put(
      appActions.navigateToLocation({
        screen: 'Onboarding',
      }),
    )
  } finally {
    yield put(appActions.removeLoading())
  }
}

export function* submitSignUpFormGenerator({
  payload,
}: {
  payload: any
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Logging in...'))
    yield put(appActions.removeErrors())

    const response = yield call(AuthService.registerUser, {
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      password: payload.password,
      role: payload.role,
    })
    console.log('response', response.status)

    if (response.status === 201) {
      yield put(
        showModal({
          type: ModalType.SUCCESS,
          title: 'User registered.',
          message: 'You will be navigate to Login screen',
        }),
      )
      // const {data} = response
      // // let data = yield call([response, 'json']);

      // AppService.accessToken = data.token
      // AppService.refreshToken = data.refreshToken

      // yield call(AsyncStorage.setItem, 'authToken', data.token)
      // yield call(AsyncStorage.setItem, 'refreshToken', data.refreshToken)

      // console.log('refresh', data.refreshToken)

      // const account: Account = jwt_decode(data.token)

      // yield put(authActions.setCurrentAccount(account))
      // yield put(authActions.loginUserSuccess())

      yield put(
        appActions.navigateToLocation({
          screen: 'Login',
        }),
      )
    } else if (response.status === 400) {
      let data = yield call([response, 'json'])
      console.log('test', data)

      yield put(
        appActions.setError({
          error: {
            title: '',
            message: data.message,
          },
          type: '',
        }),
      )
    }
  } catch (error) {
    console.log(error)
    yield put(
      appActions.setError({
        error: {
          title: '',
          message: error.data.error,
        },
        type: '',
      }),
    )
  } finally {
    yield put(appActions.removeLoading())
  }
}

export function* authSaga() {
  yield takeLatest(authActions.registerUser, submitSignUpFormGenerator)
  yield takeLatest(authActions.loginUser, loginUserGenerator)
  yield takeLatest(authActions.checkAuthToken, checkAuthTokenGenerator)
  yield takeLatest(authActions.refreshAuthToken, refreshAuthTokenGenerator)
}

export default authSaga
