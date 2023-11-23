import { useSubscription } from '@apollo/client'
import React, { useState } from 'react'
import { gql } from '@apollo/client'

const privateMessageCreation = gql`
  subscription privateMessageCreation {
    privateMessageCreation {
      content
      createdAt
      senderId
      id
    }
  }
`
const PrivateMessage: React.FC = () => {
  const [chat, addMessageToChat] = useState<any[]>([])

  const { data, loading, error } = useSubscription(privateMessageCreation, {
    onSubscriptionData: (data) => {
      const message = data.subscriptionData.data.privateMessageCreation
      console.log(message)
      addMessageToChat((messages) => [...messages, message])
    }
  })

  const listItems = chat.map((comment, index) => (
    <li key={index}>
      <div>
        <strong>{comment.senderId}:</strong> {comment.content}
      </div>
    </li>
  ))

  if (loading) {
    return <div>loading ...</div>
  }
  if (data) {
    return <ul>{listItems}</ul>
  }
  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }

  return null
  // if (error) return <div>Error: {error?.message}</div>
  // const message = data?.privateMessageCreation
  // if (!message) return <div>No new message ...</div>
  // return (
  //   <>
  //     <div>{JSON.stringify(data)}</div>
  //   </>
  // )
}

export default PrivateMessage
