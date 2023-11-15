import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from './MainNavigator';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export async function navigate(name: any, params: any) {
  if (navigationRef.isReady()) {
    navigationRef?.navigate(name, params);
  }
}
