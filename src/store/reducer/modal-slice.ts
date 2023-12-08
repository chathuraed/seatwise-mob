import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'

interface ModalState {
  isVisible: boolean
  config: {
    type?: string
    title?: string
    message: string
  }
}

const initialState: ModalState = {
  isVisible: false,
  config: {
    type: '',
    title: '',
    message: '',
  },
}

export const modalSlice = createSlice({
  name: 'feature/modal',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalState['config']>) => {
      state.isVisible = true
      state.config = action.payload
    },
    hideModal: state => {
      state.isVisible = false
      state.config = initialState.config
    },
  },
})

export const {showModal, hideModal} = modalSlice.actions

const selectDomain = (state: any) => state['feature/modal'] || initialState

export const selectModal = createSelector([selectDomain], modal => modal)
