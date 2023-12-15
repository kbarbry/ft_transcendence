import React, { useState } from 'react'
import RequestsReceived from './RequestsReceived'
import RequestsSent from './RequestsSent'
import Blockeds from './Blockeds'
import Friends from './Friends'
import { useLazyQuery, useMutation } from '@apollo/client'
import { createRelationRequest, findOneUserByUsername } from './graphql'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setRequestSentInformations } from '../store/slices/request-sent-informations.slice'
import { setRequestReceivedInformations } from '../store/slices/request-received-informations.slice'
import { setFriendInformations } from '../store/slices/friend-informations.slice'
import PopUpError from '../ErrorPages/PopUpError'

const Relations: React.FC = () => {
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.userInformations.user)
  const friends = useAppSelector((state) => state.friendInformations.friends)
  const blockeds = useAppSelector((state) => state.blockedInformations.blockeds)
  const requestsSent = useAppSelector(
    (state) => state.requestSentInformations.requestSent
  )
  const requestsReceived = useAppSelector(
    (state) => state.requestReceivedInformations.requestReceived
  )

  if (!user || !friends || !blockeds || !requestsSent || !requestsReceived)
    throw new Error()

  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [usernameInput, setUsernameInput] = useState<string>('')

  const [createRequest] = useMutation(createRelationRequest)
  const [findUserByUsername] = useLazyQuery(findOneUserByUsername)

  const handleItemClick = (item: string) => {
    setSelectedItem(item)
  }

  const handleUsernameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsernameInput(event.target.value)
  }

  const handleAddFriendClick = async () => {
    try {
      if (usernameInput.trim() === '') {
        throw new Error('Empty username') as Error
      }
      if (usernameInput.trim().length > 29) {
        throw new Error('Too long username') as Error
      }
      const {error, data: userByUsername} = await findUserByUsername({
        variables: { username: 'usernameInput' }
      })
      if (error) {
        throw new Error('Cannot find this user (Or maybe its your own username ???)') as Error
      }
      const foundUserData = userByUsername.data?.findOneUserByUsername || null
      if (foundUserData.error) {
        throw new Error('Failed to add friend') as Error
      }
      if (foundUserData) {
        await createRequest({
          variables: {
            data: { userSenderId: user.id, userReceiverId: foundUserData.id }
          }
        })

        await dispatch(setFriendInformations(user.id))
        await dispatch(setRequestSentInformations(user.id))
        await dispatch(setRequestReceivedInformations(user.id))
        setUsernameInput('')
      }
    } catch (Error) {
      const error_message = (Error as Error).message
      setIsError(true)
      setErrorMessage(error_message)
    }
  }

  return (
    <>
      {isError && <PopUpError message={errorMessage} />}

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '200px', marginRight: '20px' }}>
          <h2>Relations</h2>
          <ul>
            <li>
              <button onClick={() => handleItemClick('Friends')}>
                Friends
              </button>
            </li>
            <li>
              <button onClick={() => handleItemClick('RequestsReceived')}>
                Requests Received
              </button>
            </li>
            <li>
              <button onClick={() => handleItemClick('RequestsSent')}>
                Requests Sent
              </button>
            </li>
            <li>
              <button onClick={() => handleItemClick('Blockeds')}>
                Blocked
              </button>
            </li>
          </ul>
        </div>
        <div>
          <input
            type='text'
            value={usernameInput}
            onChange={handleUsernameInputChange}
            placeholder='Enter username'
          />
          <button onClick={handleAddFriendClick}>Add Friend</button>
        </div>
        <div>
          {selectedItem === 'Friends' && (
            <Friends key='friends' friends={friends} userId={user.id} />
          )}
          {selectedItem === 'RequestsReceived' && (
            <RequestsReceived
              key='requestsReceived'
              requestsReceived={requestsReceived}
              userId={user.id}
            />
          )}
          {selectedItem === 'RequestsSent' && (
            <RequestsSent
              key='requestsSent'
              requestsSent={requestsSent}
              userId={user.id}
            />
          )}
          {selectedItem === 'Blockeds' && (
            <Blockeds key='blockeds' blockeds={blockeds} userId={user.id} />
          )}
        </div>
      </div>
    </>
  )
}

export default Relations
