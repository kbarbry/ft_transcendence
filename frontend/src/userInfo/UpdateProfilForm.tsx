import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setUserInformations } from '../store/slices/user-informations.slice'
import { ELanguage, EStatus } from '../gql/graphql'
import { queryIsUserUsernameUsed, mutationUpdateUser } from './graphql'
import { useQuery, useMutation } from '@apollo/client'
import { ExceptionUsernameAlreadyUsed } from '../../../backend/src/user/exceptions/update.user.exception'

const useIsUsernameUsed = (username: string) => {
  const { loading, data } = useQuery(queryIsUserUsernameUsed, {
    variables: { username },
    skip: username === '' // No works if this field is empty
  })
  return { loading, data }
}
export const UpdateProfil: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.userInformations.user)

  const [formData, setFormData] = useState({
    username: '',
    languages: ELanguage,
    status: EStatus,
    doubleA: Boolean
  })

  const { loading: isUsedLoading, data: isUsedData } = useIsUsernameUsed(
    formData.username
  )

  // useEffect(() => {
  //   if (formData.username !== '' && !isUsedLoading && isUsedData) {
  //     dispatch(setUserInformations())
  //   }
  // }, [isUsedLoading, isUsedData, formData.username])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const [updateUserMutation] = useMutation(mutationUpdateUser, {
    variables: {
      id: user?.id,
      data: {
        // avatarUrl: user?.avatarUrl,
        username: formData.username,
        status: formData.status,
        languages: formData.languages
        // level: user?.level
      }
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (!isUsedData?.isUserUsernameUsed) {
        const { data: updateData } = await updateUserMutation()
        if (updateData && updateData.update) {
          dispatch(setUserInformations())
          setFormData({
            username: '',
            languages: ELanguage,
            status: EStatus,
            doubleA: Boolean
          })
        } else {
          throw new ExceptionUsernameAlreadyUsed(
            'The new username chosen is already in use. Choose another.'
          )
        }
        return
      }
    } catch (error) {
      if (error instanceof Error && error.message) {
        console.error('An error has occurred:', error.message)
      } else {
        console.error(
          'An error has occurred, but no error information is available.'
        )
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h2> Change username</h2>
        Username:
        <input
          placeholder='New username'
          type='text'
          name='username'
          value={formData.username}
          onChange={handleInputChange}
        />
      </label>
      <h2>Change status</h2>
      <label>
        Online:
        <input
          type='radio'
          name='status'
          value={EStatus.Online}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Invisible:
        <input
          type='radio'
          name='status'
          value={EStatus.Invisble}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Unavailable:
        <input
          type='radio'
          name='status'
          value={EStatus.Idle}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Do not Disturb:
        <input
          type='radio'
          name='status'
          value={EStatus.DoNotDisturb}
          onChange={handleInputChange}
        />
      </label>
      <h2> Change language: </h2>
      <label>
        English:
        <input
          type='radio'
          name='languages'
          value={ELanguage.English}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Français:
        <input
          type='radio'
          name='languages'
          value={ELanguage.French}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Español:
        <input
          type='radio'
          name='languages'
          value={ELanguage.Spanish}
          onChange={handleInputChange}
        />
      </label>
      <br></br>
      <br></br>
      <button type='submit'>Save</button>
    </form>
  )
}
