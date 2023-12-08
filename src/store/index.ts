import {configureStore} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import {createLogger} from 'redux-logger'
import {appSlice} from './reducer/app-slice'
import {authSlice} from './reducer/auth-slice'
import {ownerSlice} from './reducer/owner-slice'
import {searchSlice} from './reducer/search-slice'
import {modalSlice} from './reducer/modal-slice'

const sagaMiddleware = createSagaMiddleware()

const loggerMiddleware = createLogger({
  collapsed: true,
})

const store = configureStore({
  reducer: {
    'feature/modal': modalSlice.reducer,
    'feature/app': appSlice.reducer,
    'feature/auth': authSlice.reducer,
    'feature/owner': ownerSlice.reducer,
    'feature/search': searchSlice.reducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({thunk: false})
      .concat(sagaMiddleware)
      .concat(loggerMiddleware)
  },
})

sagaMiddleware.run(rootSaga)

export default store
