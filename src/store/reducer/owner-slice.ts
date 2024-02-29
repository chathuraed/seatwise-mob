import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'

// Define the state type
interface OwnerState {
  dashboard: any
  routes: any
  buses: any
  route: object | undefined
  bus: object | undefined
  bookings: any[]
}

// Define the Account type if not already defined
export interface Account {
  userId: string
  email: string
  role: string
}

// Define the initial state
const initialState: OwnerState = {
  dashboard: null,
  routes: [],
  buses: [],
  route: undefined,
  bus: undefined,
  bookings: [],
}

// Create the slice
export const ownerSlice = createSlice({
  name: 'feature/owner',
  initialState,
  reducers: {
    getAllRoutes: () => {},
    getAllBuses: () => {},
    createRoute: () => {},
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
    createSchedule: () => {},
    createBus: () => {},
    getRoute: () => {},
    getBus: () => {},
    getDashboardData: () => {},
    setDashboardData: (state, action: PayloadAction<any>) => {
      state.dashboard = action.payload
    },
    getBookingsByDate: () => {},
    setBookings: (state, action: PayloadAction<any[]>) => {
      state.bookings = action.payload
    },
  },
})

// Export the actions
export const {actions: ownerActions} = ownerSlice

const selectDomain = (state: any) => state['feature/owner'] || initialState

export const selectRoutes = createSelector(
  [selectDomain],
  owner => owner.routes,
)

export const selectRoute = createSelector([selectDomain], owner => owner.route)

export const selectBuses = createSelector([selectDomain], owner => owner.buses)

export const selectBus = createSelector([selectDomain], owner => owner.bus)

export const selectDashboard = createSelector(
  [selectDomain],
  owner => owner.dashboard,
)

export const selectBookings = createSelector(
  [selectDomain],
  owner => owner.bookings,
)
