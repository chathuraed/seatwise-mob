import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, Keyboard, Text, ScrollView} from 'react-native';

import {scale, verticalScale} from '../../../../styles/scaling';
import {Controller, useForm} from 'react-hook-form';
import TextField from '../../../../components/input';
import {VALIDATION_MESSAGES} from '../../../../resources/constants';
import {Colors} from '../../../../resources';
import CustomButton from '../../../../components/custom-button';
import {useDispatch} from 'react-redux';
import {ownerActions} from '../../../../store/reducer/owner-slice';
import ErrorMessage from '../../../../components/error-message';
import {SafeAreaView} from 'react-native-safe-area-context';
import {goBack} from '../../../../navigation/rootNavigation';
import CustomRadio from '../../../../components/custom-radio';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRoute} from '@react-navigation/native';

const twoThreeLayout = [
  {number: 'A1', state: 'available'},
  {number: 'A2', state: 'available'},
  {number: null, state: 'no-seat'},
  {number: 'A3', state: 'available'},
  {number: 'A4', state: 'available'},
  {number: 'A5', state: 'available'},
];

const twoTwoLayout = [
  {number: 'A1', state: 'available'},
  {number: 'A2', state: 'available'},
  {number: null, state: 'no-seat'},
  {number: 'A3', state: 'available'},
  {number: 'A4', state: 'available'},
];

const CreateBusScreen = () => {
  const route = useRoute();
  const {bus_data, fromSettings} = route.params;
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
    watch,
    setValue,
  } = useForm({
    mode: 'all',
    defaultValues: {
      busNumber: '',
      model: '',
      seatingCapacity: '',
      arrangement: '2x3',
      seats: [],
    },
  });

  useEffect(() => {
    if (fromSettings && bus_data) {
      console.log('TEST', bus_data);
      setValue('busNumber', bus_data.busNumber);
      setValue('model', bus_data.model);
      setValue('seatingCapacity', bus_data.seatingCapacity.toString());
      setValue('arrangement', bus_data.arrangement);
      setValue('seats', bus_data.seats);
    }
  }, [fromSettings, bus_data, setValue]);

  const seatingCapacity = parseInt(watch('seatingCapacity'), 10);
  const selectedArrangement = watch('arrangement');

  const generateSeatData = (capacity, layout) => {
    if (capacity <= 4) {
      return [];
    }
    const seatsPerRow = layout.filter(seat => seat.number !== null).length;
    const rows = Math.ceil(capacity / seatsPerRow);
    const newSeatData = [];

    let seatNumberCounter = 1;

    for (let i = 0; i < rows; i++) {
      const row = [];

      layout.forEach(seat => {
        const seatNumber = seat.number
          ? `${seat.number[0]}${
              seat.number[1] !== null ? seatNumberCounter++ : ''
            }`
          : null;
        const newSeat = seat.number ? {...seat, number: seatNumber} : seat; // Keep 'no-seat' as is
        row.push(newSeat);
      });

      newSeatData.push(row);
    }

    return newSeatData;
  };

  const [seatData, setSeatData] = useState([]);

  const mergeSeatsWithoutModifying = (existingSeats, layout, newCapacity) => {
    const newSeatData = [];

    for (let i = 0; i < Math.ceil(newCapacity / layout.length); i++) {
      const existingRow = existingSeats[i] || [];
      const newRow = [];

      let seatNumberCounter = 1;

      layout.forEach(seat => {
        const existingSeat = existingRow.find(
          existing => existing.number === seat.number,
        );
        const seatNumber = seat.number
          ? `${seat.number[0]}${
              seat.number[1] !== null ? seatNumberCounter++ : ''
            }`
          : null;
        const newSeat = seat.number
          ? {
              ...seat,
              number: seatNumber,
              state: existingSeat ? existingSeat.state : seat.state,
            }
          : seat;

        newRow.push(newSeat);
      });

      newSeatData.push(newRow);
    }

    return newSeatData;
  };

  useEffect(() => {
    if (seatingCapacity) {
      let layout = twoTwoLayout;
      if (selectedArrangement === '2x3') {
        layout = twoThreeLayout;
      }

      if (!fromSettings) {
        const temp_seats = generateSeatData(seatingCapacity, layout);
        setSeatData(temp_seats);
        setValue('seats', temp_seats);
      } else {
        // Merge the generated seat data with the existing seat data without modifying the state
        const mergedSeats = mergeSeatsWithoutModifying(
          bus_data.seats,
          layout,
          seatingCapacity,
        );
        setSeatData(mergedSeats);
        setValue('seats', mergedSeats);
      }
    }
  }, [
    bus_data.seats,
    fromSettings,
    seatingCapacity,
    selectedArrangement,
    setValue,
  ]);

  const handleSeatPress = (rowIndex, seatIndex) => {
    setSeatData(prevSeatData => {
      const newSeatData = [...prevSeatData];
      const seat = newSeatData[rowIndex][seatIndex];

      if (seat.state === 'available') {
        seat.state = 'disabled';
      } else if (seat.state === 'disabled') {
        seat.state = 'available';
      }

      // Convert seatData to JSON string and set it in the form
      setValue('seats', newSeatData);

      return newSeatData;
    });
  };

  const renderSeat = (seat, rowIndex, seatIndex) => {
    const {number, state} = seat;
    const seatStyle = [
      styles.seat,
      state === 'available' && styles.availableSeat,
      state === 'booked' && styles.bookedSeat,
      state === 'no-seat' && styles.noSeat,
      state === 'user-selected' && styles.userSelectedSeat,
      state === 'disabled' && styles.disabledSeat,
    ];

    return (
      <TouchableOpacity
        key={number}
        style={seatStyle}
        onPress={() => handleSeatPress(rowIndex, seatIndex)}
        disabled={state === 'no-seat'}>
        <Text>{number}</Text>
      </TouchableOpacity>
    );
  };

  const create = data => {
    Keyboard.dismiss();
    const formattedData = {
      ...data,

      ...(fromSettings && bus_data
        ? {busId: bus_data._id, userId: bus_data.user_id}
        : {}),
    };
    dispatch(ownerActions.createBus(formattedData));
  };

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'bottom']}>
      <View
        style={{
          marginHorizontal: scale(16),
          marginVertical: verticalScale(16),
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

      <ScrollView style={{flex: 1, marginHorizontal: scale(16)}}>
        {seatData.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((seat, seatIndex) =>
              renderSeat(seat, rowIndex, seatIndex),
            )}
          </View>
        ))}
      </ScrollView>

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
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    padding: scale(8),
  },
  spacing: {
    marginRight: 16, // Adjust spacing as needed
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  seat: {
    padding: 10,
    margin: 6,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 40,
  },
  availableSeat: {
    backgroundColor: '#E5E4E2',
  },
  bookedSeat: {
    backgroundColor: '#ADED5E',
  },
  noSeat: {
    backgroundColor: 'transparent',
  },
  userSelectedSeat: {
    backgroundColor: '#007bff',
  },
  disabledSeat: {
    backgroundColor: '#DB4220', // Light gray color for disabled seats
  },
});

export default CreateBusScreen;
