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
import ErrorNotification from '../notifications/ErrorNotificartion'


const Relations: React.FC = () => {

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
  const friendInformations = useAppSelector(
    (state) => state.friendInformations.friends
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
      const userByUsername = await findUserByUsername({
        variables: { username: usernameInput }
      })
      if (userByUsername.error) {
        throw new Error(
          `${usernameInput} : Cannot find this user (Or maybe it's your own username ???)`
        ) as Error
      }

      const foundUserData = userByUsername?.data.findOneUserByUsername
      const userReceiverId = foundUserData?.id

      const isUserInputInRequests = requestsSent.some(
        (user) => user.username === usernameInput
      )
      if (isUserInputInRequests) {
        throw new Error(
          `${usernameInput} : You already sent a friend request to this user, wait a little bit !`
        )
      }

      const isFriend = friendInformations?.some(
        (user) => user.username === usernameInput
      )
      if (isFriend) {
        throw new Error(
          `"${usernameInput} : "You are already friend with this user, try to get some newones !`
        )
      }

      if (foundUserData == null) {
        throw new Error(`${usernameInput} : Failed to add friend`) as Error
      }
      if (foundUserData) {
        await createRequest({
          variables: {
            data: { userSenderId: user.id, userReceiverId: userReceiverId }
          }
        })

        await dispatch(setFriendInformations(user.id))
        await dispatch(setRequestSentInformations(user.id))
        await dispatch(setRequestReceivedInformations(user.id))
        setUsernameInput('')
      }
    } catch (Error) {
      let error_message = (Error as Error).message
      if (
        error_message ===
        'Your data contains some conflict with our application'
      ) {
        error_message = 'Cannot add this friend'
      }
      ErrorNotification('Error', error_message)

    }
  }

  return (
    <>

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
