import React, {createContext, useEffect, useState, ReactNode} from 'react'
import {Keyboard} from 'react-native'

type KeyboardStatus = 'open' | 'closed'

interface KeyboardStatusContextValue {
  keyboardStatus: KeyboardStatus
}

export const keyboardStatusContext = createContext<
  KeyboardStatusContextValue | undefined
>(undefined)

interface KeyboardStatusProviderProps {
  children: ReactNode
}

const KeyboardStatusProvider: React.FC<KeyboardStatusProviderProps> = ({
  children,
}) => {
  const [keyboardStatus, setKeyboardStatus] = useState<KeyboardStatus>('closed')

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('open')
    })

    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('closed')
    })

    return () => {
      showListener.remove()
      hideListener.remove()
    }
  }, [])

  const contextValue: KeyboardStatusContextValue = {
    keyboardStatus,
  }

  return (
    <keyboardStatusContext.Provider value={contextValue}>
      {children}
    </keyboardStatusContext.Provider>
  )
}

export default KeyboardStatusProvider
