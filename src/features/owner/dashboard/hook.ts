import * as React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ownerActions} from '../../../store/reducer/owner-slice';

interface IUseDashboardHook {
  data: any;
}

export const useDashboardHook = (): IUseDashboardHook => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [data, setData] = React.useState<any>('');

  React.useEffect(() => {
    const fetchData = () => {
      dispatch(ownerActions.getAllRoutes());
    };

    fetchData();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return () => unsubscribe();
  }, [dispatch, navigation]);

  return {data};
};
