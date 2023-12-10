import React from 'react'
import RequestSent from './components/RequestSent'
import { User } from '../gql/graphql'

interface RequestsSentProps {
  userId: string
  requestsSent: User[]
}

const RequestsSent: React.FC<RequestsSentProps> = React.memo(
  ({ userId, requestsSent }) => {
    return (
      <div>
        <h2>Requests Sent Component</h2>
        {requestsSent.length > 0 ? (
          <ul>
            {requestsSent.map((requestSent) => (
              <RequestSent
                key={requestSent.id}
                requestSent={requestSent}
                userId={userId}
              />
            ))}
            <ul />
          </ul>
        ) : (
          <p>No request sent yet</p>
        )}
      </div>
    )
  }
)

export default RequestsSent
