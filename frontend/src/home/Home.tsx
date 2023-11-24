import React, { useEffect } from 'react'
import { setUserInformations } from '../store/slices/user-informations.slice'
import { ELanguage, EStatus } from '../gql/graphql'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export const Home: React.FC = () => {
  // This is to Read the informations
  const user = useAppSelector((state) => state.userInformations.user)
  // This is to Update the informations
  const dispatch = useAppDispatch()

  // useEffect is called when the Home component is mounted
  // This function will be executed once and only once before the Home page is rendered
  useEffect(() => {
    // You have to use dispatch to call a reducer or nothing will happen
    dispatch(
      setUserInformations({
        avatarUrl: 'lala',
        id: 'lala',
        languages: ELanguage.English,
        level: 0,
        mail: 'lala@gmail.com',
        status: EStatus.DoNotDisturb,
        username: 'lala2'
      })
    )
  }, [dispatch])
  return <p>{user?.languages}</p>
}
