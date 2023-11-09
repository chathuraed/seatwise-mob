import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export async function navigate(name: any, params: any) {
  if (navigationRef.isReady()) {
    await navigationRef.navigate(name, params);
  }
}
