import React, {useEffect} from 'react'
import {View, StyleSheet, Keyboard} from 'react-native'

import {scale, verticalScale} from '../../../../styles/scaling'
import {Controller, useForm} from 'react-hook-form'
import TextField from '../../../../components/input'
import {VALIDATION_MESSAGES} from '../../../../resources/constants'
import {Colors} from '../../../../resources'
import CustomButton from '../../../../components/custom-button'
import {useDispatch} from 'react-redux'
import ErrorMessage from '../../../../components/error-message'
import {SafeAreaView} from 'react-native-safe-area-context'
import {goBack} from '../../../../navigation/rootNavigation'
import DateTimeField from '../../../../components/date-time-picker'
import moment from 'moment'
import MultipleSelect from '../../../../components/multiple-select'
import Layout from '../../../../components/layout'
import {useRoute} from '@react-navigation/native'
import DropdownPicker from '../../../../components/dropdown-picker'
import {ownerActions} from '../../../../store/reducer/owner-slice'

const days = [
  {key: 'monday', value: 'Monday'},
  {key: 'tuesday', value: 'Tuesday'},
  {key: 'wednesday', value: 'Wednesday'},
  {key: 'thursday', value: 'Thursday'},
  {key: 'friday', value: 'Friday'},
  {key: 'saturday', value: 'Saturday'},
  {key: 'sunday', value: 'Sunday'},
]

const generateDropdownItems = items => {
  return items.map(item => ({
    label: item,
    value: item,
  }))
}

const CreateScheduleScreen = () => {
  const dispatch = useDispatch()

  const route = useRoute()

  const {selectedRoute, fromSettings, schedule} = route.params

  const {origin, destination} = selectedRoute

  const dropdownItems = generateDropdownItems([origin, destination])

  const [items, setItems] = React.useState(dropdownItems)

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
    setValue,
  } = useForm({
    mode: 'all',
    defaultValues: {
      routeId: selectedRoute.permit_id,
      origin: '',
      destination: '',
      start_time: moment(),
      end_time: moment(),
      available_at: [],
    },
  })

  useEffect(() => {
    if (fromSettings && selectedRoute && schedule) {
      setValue('routeId', selectedRoute.permit_id)
      setValue('origin', schedule.origin)
      setValue('destination', schedule.destination)
      setValue('start_time', moment(schedule.start_time, 'h:mm A'))
      setValue('end_time', moment(schedule.end_time, 'h:mm A'))
      setValue('available_at', schedule.available_at)
    }
  }, [fromSettings, schedule, selectedRoute, setValue])

  const watchOrigin = watch('origin')

  useEffect(() => {
    if (watchOrigin && items.length > 0) {
      // Added a check for items.length
      const selectedOrigin = items.find(item => item.value !== watchOrigin)
      if (selectedOrigin) {
        setValue('destination', selectedOrigin.value)
      }
    }
  }, [watchOrigin, setValue, items]) // Added items as a dependency

  const create = data => {
    Keyboard.dismiss()
    const formattedData = {
      ...data,
      routeId: selectedRoute._id,
      start_time: data.start_time.format('h:mm A'),
      end_time: data.end_time.format('h:mm A'),
      ...(fromSettings && schedule ? {scheduleId: schedule._id} : {}),
    }

    dispatch(ownerActions.createSchedule(formattedData))
  }

  return (
    <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'bottom']}>
      <Layout scrollEnabled>
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
                  disabled
                  label={'Route ID'}
                  containerStyle={{marginBottom: 15}}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  errorMessage={errors?.routeId?.message}
                />
              )}
              name="routeId"
            />

            <Controller
              control={control}
              rules={{
                required: VALIDATION_MESSAGES.REQUIRED,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <DateTimeField
                  containerStyle={{marginBottom: 15}}
                  label={'Start Time'}
                  mode={'time'}
                  value={moment(value)}
                  onChange={time => onChange(moment(time))}
                  onBlur={onBlur}
                  errorMessage={errors?.start_time?.message}
                />
              )}
              name="start_time"
            />

            <Controller
              control={control}
              rules={{
                required: VALIDATION_MESSAGES.REQUIRED,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <DropdownPicker
                  placeholder="Select a City"
                  containerStyle={{marginBottom: 15}}
                  label={'Origin'}
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
                <DateTimeField
                  containerStyle={{marginBottom: 15}}
                  label={'End Time'}
                  mode={'time'}
                  value={moment(value)}
                  onBlur={onBlur}
                  onChange={time => onChange(moment(time))}
                  errorMessage={errors?.start_time?.message}
                />
              )}
              name="end_time"
            />

            <Controller
              control={control}
              rules={{
                required: VALIDATION_MESSAGES.REQUIRED,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <DropdownPicker
                  disabled
                  placeholder="Please set origin"
                  containerStyle={{marginBottom: 15}}
                  label={'Destination'}
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

            <Controller
              control={control}
              rules={{
                required: VALIDATION_MESSAGES.REQUIRED,
              }}
              render={({field: {onChange, value}}) => (
                <MultipleSelect
                  itemsPerRow={2}
                  containerStyle={{marginBottom: 15}}
                  label={'Available Days'}
                  options={days}
                  value={value}
                  showNumber={false}
                  onChange={newValue => {
                    onChange(newValue)
                  }}
                  errorMessage={errors?.available_at?.message}
                />
              )}
              name="available_at"
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
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  centeredText: {
    fontSize: 20,
  },
})

export default CreateScheduleScreen
