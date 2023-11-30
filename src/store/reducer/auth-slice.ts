import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'

interface AuthState {
  loading: boolean
  authenticated: boolean
  accessToken: string | null
  refreshToken: string | null
  currentAccount: Account | null
}

export interface Account {
  userId: string
  email: string
  role: string
  iat: number
  exp: number
}

const initialState: AuthState = {
  loading: false,
  authenticated: false,
  accessToken: null,
  refreshToken: null,
  currentAccount: null,
}

export const authSlice = createSlice({
  name: 'feature/auth',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true
    },
    removeLoading: state => {
      state.loading = false
    },
    checkAuthToken: _state => {},
    refreshAuthToken: _state => {},
    loginUser: _state => {},
    loginUserSuccess: (state, _action: PayloadAction<void>) => {
      state.authenticated = true
    },
    loginUserFail: state => {
      state.authenticated = false
    },
    setCurrentAccount: (state, action: PayloadAction<Account>) => {
      state.currentAccount = action.payload
    },
    logoutUser: state => {
      state.authenticated = false
      state.currentAccount = null
      state.accessToken = null
      state.refreshToken = null
    },
    submitSignUpForm: _state => {},
    verifyOTP: _state => {},
    resendCode: _state => {},
    submitForgotPassword: _state => {},
    submitResetPassword: _state => {},
    submitChangePassword: _state => {},
  },
})

export const {actions: authActions} = authSlice

const selectDomain = (state: any) => state['feature/auth'] || initialState

export const selectAuthenticated = createSelector(
  [selectDomain],
  auth => auth.authenticated,
)

export const selectCurrentAccount = createSelector(
  [selectDomain],
  auth => auth.currentAccount,
)
