import {createNavigationContainerRef} from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef()

export async function navigate(name, params) {
  if (navigationRef.isReady()) {
    console.log('Navigating to ', name)
    await navigationRef.navigate(name, params)
  }
}

export async function goBack() {
  if (navigationRef.isReady()) {
    await navigationRef.goBack()
  }
}
