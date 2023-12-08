import React, { useState } from 'react'
import RequestsReceived from './RequestsReceived'
import RequestsSent from './RequestsSent'
import Blockeds from './Blockeds'
import Friends from './Friends'
import { useLazyQuery, useMutation } from '@apollo/client'
import { createRelationRequest, findOneUserByUsername } from './graphql'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setRequestSentInformations } from '../store/slices/request-sent-informations.slice'

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
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [usernameInput, setUsernameInput] = useState<string>('')
  const [foundUser, setFoundUser] = useState<boolean>(true)

  const [createRequest] = useMutation(createRelationRequest)
  const [findUserByUsername] = useLazyQuery(findOneUserByUsername)

  if (!user || !friends || !blockeds || !requestsSent || !requestsReceived)
    throw new Error()

  const handleItemClick = (item: string) => {
    setSelectedItem(item)
  }

  const handleUsernameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFoundUser(true)
    setUsernameInput(event.target.value)
  }

  const handleAddFriendClick = async () => {
    if (!usernameInput || usernameInput.trim() === '') {
      setFoundUser(true)
      return
    }
    try {
      const userByUsername = await findUserByUsername({
        variables: { username: usernameInput }
      })
      const foundUserData = userByUsername.data?.findOneUserByUsername || null
      if (foundUserData) {
        await createRequest({
          variables: {
            data: { userSenderId: user.id, userReceiverId: foundUserData.id }
          }
        })

        await dispatch(setRequestSentInformations(user.id))
        setFoundUser(true)
        setUsernameInput('')
      } else {
        setFoundUser(false)
      }
    } catch (error) {
      setUsernameInput('')
      setFoundUser(true)
      console.error('Error adding friend: ', error)
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
          {foundUser && (
            <div>
              <p>User Found: {foundUser}</p>
            </div>
          )}
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
