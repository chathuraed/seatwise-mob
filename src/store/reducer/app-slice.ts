import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit';

interface AppState {
  loading: boolean;
  loadingText?: string;
  errors?: Record<string, any>;
  error?: any;
}

const initialState: AppState = {
  loading: false,
  loadingText: '',
  errors: {},
  error: {},
};

export const appSlice = createSlice({
  name: 'feature/app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.loadingText = action.payload;
    },
    removeLoading: state => {
      state.loading = false;
    },
    setError: (state, action: PayloadAction<{type: string; error: any}>) => {
      state.errors[action.payload.type] = action.payload.error;
      state.error = action.payload.error;
    },
    removeErrors: state => {
      state.errors = {};
      state.error = {};
    },
    navigateToLocation: (_state, _action: PayloadAction<string>) => {},
  },
});

// Export the actions
export const {actions: appActions} = appSlice;

const selectDomain = state => state['feature/app'] || initialState;

export const selectLoading = createSelector([selectDomain], app => app.loading);

export const selectLoadingText = createSelector(
  [selectDomain],
  app => app.loadingText,
);

export const selectError = createSelector([selectDomain], app => app.error);
