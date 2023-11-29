import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ownerActions, selectBuses} from '../../../store/reducer/owner-slice';

interface IUseBusHook {
  buses: any;
}

export const useBusHook = (): IUseBusHook => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const buses = useSelector(selectBuses);

  React.useEffect(() => {
    const fetchData = () => {
      dispatch(ownerActions.getAllBuses());
    };

    fetchData();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return () => unsubscribe();
  }, [dispatch, navigation]);

  return {buses};
};
