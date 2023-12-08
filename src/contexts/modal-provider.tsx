// ModalProvider.tsx
import React, {createContext, useContext, useState, ReactNode} from 'react'
import CustomModal from '../components/custom-modal'

export enum ModalType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  // Add more types if needed
}

interface ModalConfig {
  type?: ModalType
  title?: string
  message: string
  onApprove?: () => void
}

interface ModalProviderProps {
  children: ReactNode
}

const ModalContext = createContext<(config: ModalConfig) => void>(() => {})

const defaultConfigs = {
  type: ModalType.SUCCESS,
  title: 'Success',
  message: '',
  onApprove: () => {},
}

const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalConfig, setModalConfig] = useState<ModalConfig>(defaultConfigs)

  const notify = (config: ModalConfig) => {
    setModalConfig(() => ({
      ...defaultConfigs,
      title: config.type === ModalType.SUCCESS ? 'Success' : 'Failed',
      ...config,
    }))
    setModalVisible(true)
  }

  const hideModal = () => {
    setModalVisible(false)
    if (modalConfig.onApprove) {
      modalConfig.onApprove()
    }
  }

  return (
    <ModalContext.Provider value={notify}>
      {children}
      <CustomModal
        visible={modalVisible}
        config={modalConfig}
        hide={hideModal}
      />
    </ModalContext.Provider>
  )
}

const useModalProvider = () => {
  const notify = useContext(ModalContext)
  return {notify}
}

export {ModalProvider, useModalProvider}
