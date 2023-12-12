import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setUserInformations } from '../store/slices/user-informations.slice'
import { ELanguage, EStatus } from '../gql/graphql'
import { queryIsUserUsernameUsed, mutationUpdateUser } from './graphql'
import { useQuery, useMutation } from '@apollo/client'

const useIsUsernameUsed = (username: string) => {
  const { loading, data } = useQuery(queryIsUserUsernameUsed, {
    variables: { username },
    skip: username === '' // Ne pas exécuter la requête si le champ est vide
  })

  return { loading, data }
}

const UpdateProfil = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.userInformations.user)

  const [formData, setFormData] = useState({
    username: '',
    languages: ELanguage,
    status: EStatus
  })

  const { loading: isUsedLoading, data: isUsedData } = useIsUsernameUsed(
    formData.username
  )

  useEffect(() => {
    if (formData.username !== '' && !isUsedLoading && isUsedData) {
      // Faire quelque chose avec les données reçues, par exemple, mettre à jour l'état local
      // ou afficher un message d'erreur si le nom d'utilisateur est déjà utilisé.
      console.log('IN USE EFFECT')
      console.log('formData ==>', formData)
      console.log('formData ==>', formData.username)
      console.log('formData ==>', formData.languages)
      console.log('formData ==>', formData.status)
    }
  }, [isUsedLoading, isUsedData, formData.username])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
    console.log('formData.username:', formData.username, 'STOP')
    console.log('formData.status:', formData.status, 'STOP')
    console.log('formData.languages:', formData.languages, 'STOP')
  }

  const [updateUserMutation] = useMutation(mutationUpdateUser, {
    variables: {
      id: user?.id,
      data: {
        avatarUrl: user?.avatarUrl,
        username: formData.username,
        status: formData.status,
        languages: formData.languages,
        level: user?.level
      }
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (!isUsedData?.isUserUsernameUsed) {
        const { data: updateData } = await updateUserMutation()
        console.log(
          '!isUsedData?.isUserUsernameUsed==>',
          isUsedData?.isUserUsernameUsed,
          'STOP'
        )
        if (updateData && updateData.update) {
          dispatch(setUserInformations())
          setFormData({
            username: '',
            languages: ELanguage,
            status: EStatus
          })
        }
        console.log('updateData ==>', updateData, 'STOP')
        console.log('updateData.update ==>', updateData.update, 'STOP')
      } else {
        console.log('ELSE')
        return
      }
    } catch (error) {
      if (error instanceof Error && error.message) {
        console.error("Une erreur s'est produite:", error.message)
      } else {
        console.error(
          "Une erreur s'est produite, mais aucune information sur l'erreur n'est disponible."
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
          value='Online'
          onChange={handleInputChange}
        />
      </label>
      <label>
        Invisible:
        <input
          type='radio'
          name='status'
          value='Invisible'
          onChange={handleInputChange}
        />
      </label>
      <label>
        Unavailable:
        <input
          type='radio'
          name='status'
          value='Idle'
          onChange={handleInputChange}
        />
      </label>
      <label>
        Do not Disturb:
        <input
          type='radio'
          name='status'
          value='DoNotDisturb'
          onChange={handleInputChange}
        />
      </label>
      <h2> Change language: </h2>
      <label>
        English:
        <input
          type='radio'
          name='languages'
          value='English'
          onChange={handleInputChange}
        />
      </label>
      <label>
        Français:
        <input
          type='radio'
          name='languages'
          value='French'
          onChange={handleInputChange}
        />
      </label>
      <label>
        Español:
        <input
          type='radio'
          name='languages'
          value='Spanish'
          onChange={handleInputChange}
        />
      </label>
      <br></br>
      <br></br>
      <button type='submit'>Save</button>
    </form>
  )
}

export default UpdateProfil
