import React from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';

import {scale, verticalScale} from '../../../../styles/scaling';
import {Controller, useForm} from 'react-hook-form';
import TextField from '../../../../components/input';
import {VALIDATION_MESSAGES, cities} from '../../../../resources/constants';
import {Colors} from '../../../../resources';
import CustomPicker from '../../../../components/custom-picker';
import CustomButton from '../../../../components/custom-button';
import {useDispatch, useSelector} from 'react-redux';
import {ownerActions, selectBuses} from '../../../../store/reducer/owner-slice';
import ErrorMessage from '../../../../components/error-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  goBack,
  navigate,
  navigationRef,
} from '../../../../navigation/rootNavigation';
import Toast from 'react-native-toast-message';
import DropdownPicker from '../../../../components/dropdown-picker';

const generateDropdownItems = items => {
  return items.map(item => ({
    label: item,
    value: item,
  }));
};

const generateBusItems = items => {
  return items.map(item => ({
    label: item.busNumber,
    value: item._id,
  }));
};

const CreateRouteScreen = () => {
  const dispatch = useDispatch();

  const cityList = generateDropdownItems(cities);
  const busList = useSelector(selectBuses);
  const buses = generateBusItems(busList);

  React.useEffect(() => {
    const fetchData = () => {
      dispatch(ownerActions.getAllBuses());
    };

    fetchData();

    const unsubscribe = navigationRef.addListener('focus', () => {
      fetchData();
    });

    return () => unsubscribe();
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
    defaultValues: {
      permit_id: '',
      busId: '',
      origin: '',
      destination: '',
    },
  });

  const create = data => {
    Keyboard.dismiss();
    console.log(JSON.stringify(data));
    dispatch(ownerActions.createRoute(data));
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'bottom']}>
      <View style={{flex: 1}}>
        <View
          style={{
            marginHorizontal: scale(16),
            marginTop: verticalScale(16),
            flex: 1,
          }}>
          <Controller
            control={control}
            rules={{
              required: VALIDATION_MESSAGES.REQUIRED,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextField
                label={'Permit ID'}
                containerStyle={{marginBottom: 15}}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                errorMessage={errors?.permit_id?.message}
              />
            )}
            name="permit_id"
          />

          <Controller
            control={control}
            rules={{
              required: VALIDATION_MESSAGES.REQUIRED,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <DropdownPicker
                placeholder="Select a Bus"
                containerStyle={{marginBottom: 15}}
                label={'Bus'}
                value={value}
                setValue={onChange}
                setSelectedItem={onChange}
                items={buses}
                errorMessage={errors?.busId?.message}
                onClose={onBlur}
              />
            )}
            name="busId"
          />

          <Controller
            control={control}
            rules={{
              required: VALIDATION_MESSAGES.REQUIRED,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <CustomPicker
                placeholder="Select a City"
                searchPlaceholder="Search..."
                containerStyle={{marginBottom: 15}}
                label={'Origin'}
                searchable
                value={value}
                setValue={onChange}
                setSelectedItem={onChange}
                items={cityList}
                errorMessage={errors?.origin?.message}
                onClose={onBlur}
              />
            )}
            name="origin"
          />

          <Controller
            control={control}
            rules={{
              required: VALIDATION_MESSAGES.REQUIRED,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <CustomPicker
                placeholder="Select a City"
                searchPlaceholder="Search..."
                containerStyle={{marginBottom: 15}}
                label={'Destination'}
                searchable
                value={value}
                setValue={onChange}
                setSelectedItem={onChange}
                items={cityList}
                errorMessage={errors?.destination?.message}
                onClose={onBlur}
              />
            )}
            name="destination"
          />
        </View>
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 16,
            flexDirection: 'row',
          }}>
          <View style={{flex: 2}}>
            <CustomButton
              type="secondary"
              title="BACK"
              onPress={() => goBack()}
            />
          </View>
          <View style={{width: 10}} />
          <View style={{flex: 3}}>
            <CustomButton
              title="SAVE"
              onPress={handleSubmit(create)}
              tintColor={Colors.green}
            />
          </View>
        </View>
        <ErrorMessage />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centeredText: {
    fontSize: 20,
  },
});

export default CreateRouteScreen;
