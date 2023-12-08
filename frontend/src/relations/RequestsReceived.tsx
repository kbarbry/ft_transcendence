import React from 'react'
import RequestReceived from './components/RequestReceived'
import { UserInformations } from '../store/slices/user-informations.slice'

interface RequestsReceivedProps {
  userId: string
  requestsReceived: UserInformations[]
}

const RequestsReceived: React.FC<RequestsReceivedProps> = React.memo(
  ({ userId, requestsReceived }) => {
    return (
      <div>
        <h2>Requests Received Component</h2>
        {requestsReceived.length > 0 ? (
          <ul>
            {requestsReceived.map((requestReceived) => (
              <RequestReceived
                key={requestReceived.id}
                requestReceived={requestReceived}
                userId={userId}
              />
            ))}
            <ul />
          </ul>
        ) : (
          <p>No request received yet</p>
        )}
      </div>
    )
  }
)

export default RequestsReceived
