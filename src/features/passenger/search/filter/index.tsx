import React from 'react'
import {View, Image, StyleSheet} from 'react-native'
import {BlurView} from '@react-native-community/blur'
import {Colors, Images} from '../../../../resources'
import {Controller, useForm} from 'react-hook-form'
import {VALIDATION_MESSAGES, cities} from '../../../../resources/constants'
import UserDatePickerField from '../../../../components/user-date-picker'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux'
import {
  searchActions,
  selectFilters,
  selectLoading,
} from '../../../../store/reducer/search-slice'
import {scale} from '../../../../styles/scaling'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {goBack} from '../../../../navigation/rootNavigation'
import Ionicon from 'react-native-vector-icons/Ionicons'
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown'
import UserDropdownPickerField from '../../../../components/user-dropdown-picker'
import CustomButton from '../../../../components/custom-button'

const generateDropdownItems = items => {
  return items.map(item => ({
    id: item,
    title: item,
  }))
}

const FilterScreen = () => {
  const dispatch = useDispatch()
  const loading = useSelector(selectLoading)
  const filters = useSelector(selectFilters)
  const cityList = generateDropdownItems(cities)

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    mode: 'all',
    defaultValues: {
      from: '',
      to: '',
      date: moment(new Date()).format('DD-MM-YYYY').toString(),
    },
  })

  React.useEffect(() => {
    if (filters) {
      setValue('from', filters.from) // Use an empty string as a default value if bus.busNumber is null or undefined
      setValue('to', filters.to) // Use an empty string as a default value if bus.model is null or undefined
      setValue('date', filters.date)
    }
  }, [filters, setValue])

  const search = fields => {
    dispatch(searchActions.setFilter(fields))
    dispatch(searchActions.getSchedules(fields))
  }

  return (
    <AutocompleteDropdownContextProvider>
      <View style={styles.container}>
        <Image
          key={'blurryImage'}
          source={Images.tour_1}
          style={styles.absolute}
          resizeMode="contain"
        />

        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />

        <View
          style={{flex: 1, marginTop: scale(60), marginHorizontal: scale(24)}}>
          <TouchableOpacity style={styles.addButton} onPress={() => goBack()}>
            <Ionicon
              name="arrow-back"
              size={scale(24)}
              color={Colors.textLinkBlue}
            />
          </TouchableOpacity>

          <View
            style={{
              marginTop: scale(50),
              alignItems: 'center',
            }}>
            <Controller
              control={control}
              rules={{
                required: VALIDATION_MESSAGES.REQUIRED,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <UserDatePickerField
                  label={'Date'}
                  value={value}
                  onChange={time => onChange(time)}
                  onBlur={onBlur}
                  errorMessage={errors?.date?.message}
                />
              )}
              name="date"
            />
            <View style={{height: scale(16)}} />

            <Controller
              control={control}
              rules={{
                required: VALIDATION_MESSAGES.REQUIRED,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <UserDropdownPickerField
                  label={'Origin'}
                  containerStyle={{width: '100%'}}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  errorMessage={errors?.from?.message}
                  items={cityList}
                />
              )}
              name="from"
            />

            <View style={{height: scale(16)}} />
            <Controller
              control={control}
              rules={{
                required: VALIDATION_MESSAGES.REQUIRED,
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <UserDropdownPickerField
                  label={'Destination'}
                  containerStyle={{width: '100%'}}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  errorMessage={errors?.to?.message}
                  items={cityList}
                />
              )}
              name="to"
            />

            <View style={{height: scale(16)}} />
            <CustomButton
              disabled={loading}
              style={{width: '100%'}}
              title="SEARCH"
              onPress={handleSubmit(search)}
              tintColor={Colors.green}
            />
          </View>
        </View>
      </View>
    </AutocompleteDropdownContextProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  absolute: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(50),
    height: scale(50),
    backgroundColor: Colors.white,
    borderRadius: scale(100),
  },
})

export default FilterScreen
