import React, { useEffect } from 'react'
import {
  setUserAvatar,
  setUserInformations
} from '../store/slices/user-informations.slice'
import { FindOneUserByContextQuery } from '../gql/graphql'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useQuery } from '@apollo/client'
import { findUserByContext } from './graphql'
import { useLocation } from 'wouter'

export const Home: React.FC = () => {
  // This is to Read the informations
  const user = useAppSelector((state) => state.userInformations.user)
  // This is to Update the informations
  const dispatch = useAppDispatch()

  // UseLocation from wouter for redirection
  const [location, setLocation] = useLocation()

  const { loading, error, data } =
    useQuery<FindOneUserByContextQuery>(findUserByContext)

  // useEffect is called when the Home component is mounted
  // This function will be executed once and only once before the Home page is rendered
  useEffect(() => {
    if (!loading && !error && data) {
      const user = data.findOneUserByContext

      if (!user.avatarUrl) user.avatarUrl = undefined

      dispatch(
        setUserInformations({
          id: user.id,
          mail: user.mail,
          username: user.username,
          languages: user.languages,
          status: user.status,
          level: user.level
        })
      )
      dispatch(setUserAvatar(user.avatarUrl))
    }
    if (error) {
      // Redirect to the login page if there is an error
      setLocation('/login', { replace: true })
    }
    // You have to use dispatch to call a reducer or nothing will happen
  }, [dispatch, loading, error, data, location, setLocation])

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      <a href={user?.avatarUrl} target='_blank'>
        <img
          src={user?.avatarUrl}
          className='avatar'
          alt='Avatar'
          style={{ width: '100px', height: '100px' }}
        />
      </a>
      <div>AvatarUrl: {user?.avatarUrl}</div>
      <div>Id: {user?.id}</div>
      <div>Mail: {user?.mail}</div>
      <div>Username: {user?.username}</div>
      <div>Status: {user?.status}</div>
      <div>Language: {user?.languages}</div>
      <div>Level: {user?.level}</div>
    </>
  )
}
