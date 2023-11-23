import { useSubscription } from '@apollo/client'
import React, { useState } from 'react'
import { privateMessageCreation } from './graphql'

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
}

export default PrivateMessage
