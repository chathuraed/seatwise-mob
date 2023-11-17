import React from 'react';
import {View, StyleSheet, Keyboard} from 'react-native';

import {scale, verticalScale} from '../../../../../styles/scaling';
import {Controller, useForm} from 'react-hook-form';
import TextField from '../../../../../components/input';
import {VALIDATION_MESSAGES, cities} from '../../../../../resources/constants';
import {Colors} from '../../../../../resources';
import CustomPicker from '../../../../../components/custom-picker';
import CustomButton from '../../../../../components/custom-button';
import {useDispatch} from 'react-redux';
import {ownerActions} from '../../../../../store/reducer/owner-slice';
import ErrorMessage from '../../../../../components/error-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import {goBack, navigate} from '../../../../../navigation/rootNavigation';

const generateDropdownItems = items => {
  return items.map(item => ({
    label: item,
    value: item,
  }));
};

// const generateDropdownItems = items => {
//   return items.map(item => ({
//     label: item,
//     value: item.toLowerCase().replace(/\s+/g, '_'),
//   }));
// };

const CreateRouteScreen = () => {
  const dispatch = useDispatch();

  const dropdownItems = generateDropdownItems(cities);

  const [items, setItems] = React.useState(dropdownItems);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'all',
    defaultValues: {
      permit_id: '',
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
    // <View style={styles.container}>
    // <Layout scrollEnabled={true}>
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
              <CustomPicker
                placeholder="Select a City"
                searchPlaceholder="Search..."
                containerStyle={{marginBottom: 15}}
                label={'Origin'}
                searchable
                value={value}
                setValue={onChange}
                setSelectedItem={onChange}
                items={items}
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
                items={items}
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
    // </Layout>
    // </View>
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
