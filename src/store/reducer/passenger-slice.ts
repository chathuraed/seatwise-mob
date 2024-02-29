import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit'

interface PassengerState {
  loading: boolean
  bookings?: any
}

const initialState: PassengerState = {
  loading: false,
  bookings: [],
}

export const passengerSlice = createSlice({
  name: 'feature/passenger',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true
    },
    removeLoading: state => {
      state.loading = false
    },
    createBooking: (state) => {},
    getBookings: (state) => {},
    setBookings: (state, action: PayloadAction<any>) => {
      state.bookings = action.payload
    },
  },
})

// Export the actions
export const {actions: passengerActions} = passengerSlice

const selectDomain = (state: any) => state['feature/passenger'] || initialState

export const selectLoading = createSelector(
  [selectDomain],
  passenger => passenger.loading,
)

export const selectBookings = createSelector(
  [selectDomain],
  passenger => passenger.bookings,
)
