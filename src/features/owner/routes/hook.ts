import * as React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigation} from '@react-navigation/native'
import {ownerActions, selectRoutes} from '../../../store/reducer/owner-slice'

interface IUseRoutesHook {
  routes: any
  setRoute: (v: any) => void
}

export const useRoutesHook = (): IUseRoutesHook => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const routes = useSelector(selectRoutes)

  React.useEffect(() => {
    const fetchData = () => {
      dispatch(ownerActions.getAllRoutes())
    }

    fetchData()

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData()
    })

    return () => unsubscribe()
  }, [dispatch, navigation])

  const setRoute = React.useCallback(
    (route: any[]) => {
      dispatch(ownerActions.setSelectedRoute(route))
    },
    [dispatch],
  )

  return {routes, setRoute}
}
