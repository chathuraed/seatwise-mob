import {takeLatest} from 'redux-saga/effects'
import * as RootNavigation from '../../navigation/rootNavigation'
import {appActions} from '../reducer/app-slice'
import Toast from 'react-native-toast-message'

export function* navigateToLocationGenerator({payload}) {
  RootNavigation.navigate(payload.screen, payload.params)
}

export function* toastGenerator({payload}) {
  Toast.show({
    type: payload.type ? payload.type : 'error',
    text1: payload.title,
    text2: payload.message,
  })
}

export function* appSaga() {
  yield takeLatest(appActions.navigateToLocation, navigateToLocationGenerator)
  yield takeLatest(appActions.showToast, toastGenerator)
}

export default appSaga
