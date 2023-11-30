/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react'
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollViewProps,
  KeyboardAvoidingViewProps,
} from 'react-native'

interface LayoutContainerProps {
  scrollEnabled?: boolean
  children: ReactNode
}

const LayoutContainerComponent: React.FC<
  LayoutContainerProps & ScrollViewProps
> = ({scrollEnabled, children, ...scrollViewProps}) => {
  if (scrollEnabled) {
    return (
      <ScrollView
        bounces={false}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps={'handled'}
        {...scrollViewProps}>
        <View style={{flex: 1}}>{children}</View>
      </ScrollView>
    )
  } else {
    return <View style={{flex: 1}}>{children}</View>
  }
}

interface LayoutProps extends KeyboardAvoidingViewProps {
  scrollEnabled?: boolean
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({...layoutProps}) => {
  return (
    <KeyboardAvoidingView
      style={{
        flexGrow: 1,
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled={true}
      {...layoutProps}>
      <LayoutContainerComponent {...layoutProps} />
    </KeyboardAvoidingView>
  )
}

export default Layout
