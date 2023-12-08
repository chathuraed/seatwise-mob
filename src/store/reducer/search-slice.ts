import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit'
import moment, {Moment} from 'moment'

interface IFilter {
  from: string
  to: string
  date: any
}

interface SearchState {
  loading: boolean
  filters?: IFilter
  schedules?: any
  bookings?: any
}

const initialState: SearchState = {
  loading: false,
  filters: {
    from: '',
    to: '',
    date: moment(new Date()).format('DD-MM-YYYY').toString(),
  },
  schedules: [],
  bookings: [],
}

export const searchSlice = createSlice({
  name: 'feature/search',
  initialState,
  reducers: {
    setLoading: state => {
      state.loading = true
    },
    removeLoading: state => {
      state.loading = false
    },
    setFilter: (state, action: PayloadAction<IFilter>) => {
      state.filters = action.payload
    },
    removeFilter: state => {
      state.filters = initialState.filters
    },
    getSchedules: () => {},
    setSchedules: (state, action: PayloadAction<any>) => {
      state.schedules = action.payload
    },
  },
})

// Export the actions
export const {actions: searchActions} = searchSlice

const selectDomain = (state: any) => state['feature/search'] || initialState

export const selectLoading = createSelector(
  [selectDomain],
  search => search.loading,
)

export const selectFilters = createSelector(
  [selectDomain],
  search => search.filters,
)

export const selectSchedules = createSelector(
  [selectDomain],
  search => search.schedules,
)
