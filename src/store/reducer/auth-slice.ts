import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the state type
interface AuthState {
  loading: boolean;
  authenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  currentAccount: Account | null;
}

// Define the Account type if not already defined
interface Account {
  // Define the properties of your account
  // For example: id: string;
}

// Define the initial state
const initialState: AuthState = {
  loading: false,
  authenticated: false,
  accessToken: null,
  refreshToken: null,
  currentAccount: null,
};

// Create the slice
export const authSlice = createSlice({
  name: 'feature/auth',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true;
    },
    removeLoading: state => {
      state.loading = false;
    },
    checkAuthToken: _state => {
      // Implement your logic here
    },
    refreshAuthToken: _state => {
      // Implement your logic here
    },
    loginUser: _state => {
      // Implement your logic here
    },
    loginUserSuccess: (state, _action: PayloadAction<void>) => {
      state.authenticated = true;
    },
    loginUserFail: state => {
      state.authenticated = false;
    },
    setCurrentAccount: (state, action: PayloadAction<Account>) => {
      state.currentAccount = action.payload;
    },
    logoutUser: state => {
      state.authenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
    submitSignUpForm: _state => {
      // Implement your logic here
    },
    verifyOTP: _state => {
      // Implement your logic here
    },
    resendCode: _state => {
      // Implement your logic here
    },
    submitForgotPassword: _state => {
      // Implement your logic here
    },
    submitResetPassword: _state => {
      // Implement your logic here
    },
    submitChangePassword: _state => {
      // Implement your logic here
    },
  },
});

// Export the actions
export const {actions: authActions} = authSlice;
