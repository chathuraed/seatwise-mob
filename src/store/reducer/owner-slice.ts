import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the state type
interface OwnerState {
  routes: any;
}

// Define the Account type if not already defined
export interface Account {
  userId: string;
  email: string;
  role: string;
}

// Define the initial state
const initialState: OwnerState = {
  routes: [],
};

// Create the slice
export const ownerSlice = createSlice({
  name: 'feature/owner',
  initialState,
  reducers: {
    getAllRoutes: state => {},
    setRoutes: (state, action: PayloadAction<any[]>) => {
      state.routes = action.payload;
    },
  },
});

// Export the actions
export const {actions: ownerActions} = ownerSlice;

const selectDomain = state => state['feature/owner'] || initialState;

export const selectRoutes = createSelector(
  [selectDomain],
  owner => owner.routes,
);

// export const selectCurrentAccount = createSelector(
//   [selectDomain],
//   auth => auth.currentAccount,
// );
