import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from './MainNavigator';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export async function navigate(name, params) {
  if (navigationRef.isReady()) {
    await navigationRef.navigate(name, params);
  }
}

export async function goBack() {
  if (navigationRef.isReady()) {
    await navigationRef.goBack();
  }
}
