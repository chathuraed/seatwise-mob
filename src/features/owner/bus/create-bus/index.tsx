import React, {useMemo} from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';

import {scale, verticalScale} from '../../../../styles/scaling';
import {Controller, useForm} from 'react-hook-form';
import TextField from '../../../../components/input';
import {VALIDATION_MESSAGES, cities} from '../../../../resources/constants';
import {Colors} from '../../../../resources';
import CustomPicker from '../../../../components/custom-picker';
import CustomButton from '../../../../components/custom-button';
import {useDispatch} from 'react-redux';
import {ownerActions} from '../../../../store/reducer/owner-slice';
import ErrorMessage from '../../../../components/error-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import {goBack, navigate} from '../../../../navigation/rootNavigation';
import Toast from 'react-native-toast-message';
import CustomRadio from '../../../../components/custom-radio';

const generateDropdownItems = items => {
  return items.map(item => ({
    label: item,
    value: item,
  }));
};

const CreateBusScreen = () => {
  const dispatch = useDispatch();

  const seatArrangements = useMemo(
    () => [
      {
        id: '2x2',
        label: '2 X 2',
        value: '2x2',
      },
      {
        id: '2x3',
        label: '2 X 3',
        value: '2x3',
      },
    ],
    [],
  );

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
    defaultValues: {
      busNumber: '',
      model: '',
      seatingCapacity: '',
      arrangement: '',
    },
  });

  const create = data => {
    Keyboard.dismiss();
    console.log(JSON.stringify(data));
    dispatch(ownerActions.createBus(data));
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
      position: 'bottom',
    });
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
                label={'Bus Number'}
                containerStyle={{marginBottom: 15}}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                errorMessage={errors?.busNumber?.message}
              />
            )}
            name="busNumber"
          />

          <Controller
            control={control}
            rules={{
              required: VALIDATION_MESSAGES.REQUIRED,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextField
                label={'Bus Model'}
                containerStyle={{marginBottom: 15}}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                errorMessage={errors?.model?.message}
              />
            )}
            name="model"
          />

          <Controller
            control={control}
            rules={{
              required: VALIDATION_MESSAGES.REQUIRED,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextField
                keyboardType="number-pad"
                label={'Seating Capacity'}
                containerStyle={{marginBottom: 15}}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                errorMessage={errors?.seatingCapacity?.message}
              />
            )}
            name="seatingCapacity"
          />

          <Controller
            control={control}
            rules={{
              required: VALIDATION_MESSAGES.REQUIRED,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <CustomRadio
                label={'Seating Arrangement'}
                containerStyle={{marginBottom: 15}}
                items={seatArrangements}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                errorMessage={errors?.arrangement?.message}
              />
            )}
            name="arrangement"
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

export default CreateBusScreen;
