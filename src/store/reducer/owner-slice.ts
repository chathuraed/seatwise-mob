import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'

// Define the state type
interface OwnerState {
  routes: any
  buses: any
  route: object | undefined
  bus: object | undefined
}

// Define the Account type if not already defined
export interface Account {
  userId: string
  email: string
  role: string
}

// Define the initial state
const initialState: OwnerState = {
  routes: [],
  buses: [],
  route: undefined,
  bus: undefined,
}

// Create the slice
export const ownerSlice = createSlice({
  name: 'feature/owner',
  initialState,
  reducers: {
    getAllRoutes: state => {},
    getAllBuses: state => {},
    createRoute: state => {},
    setRoutes: (state, action: PayloadAction<any[]>) => {
      state.routes = action.payload
    },
    setSelectedRoute: (state, action: PayloadAction<any[]>) => {
      state.route = action.payload
    },
    setBuses: (state, action: PayloadAction<any[]>) => {
      state.buses = action.payload
    },
    setBus: (state, action: PayloadAction<any[]>) => {
      state.bus = action.payload
    },
    createSchedule: state => {},
    createBus: state => {},
    getRoute: state => {},
    getBus: state => {},
  },
})

// Export the actions
export const {actions: ownerActions} = ownerSlice

const selectDomain = state => state['feature/owner'] || initialState

export const selectRoutes = createSelector(
  [selectDomain],
  owner => owner.routes,
)

export const selectRoute = createSelector([selectDomain], owner => owner.route)

export const selectBuses = createSelector([selectDomain], owner => owner.buses)

export const selectBus = createSelector([selectDomain], owner => owner.bus)

// export const selectCurrentAccount = createSelector(
//   [selectDomain],
//   auth => auth.currentAccount,
// );
