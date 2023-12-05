import React from 'react'
import RequestReceived from './components/RequestReceived'
import { useAppSelector } from '../store/hooks'

const RequestsReceived: React.FC = () => {
  const requestsReceived = useAppSelector(
    (state) => state.requestReceivedInformations.requestReceived
  )

  return (
    <div>
      <h2>Requests Received Component</h2>
      {requestsReceived && requestsReceived.length > 0 ? (
        <ul>
          {requestsReceived.map((requestReceived) => (
            <RequestReceived
              key={requestReceived.id}
              requestReceived={requestReceived}
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

export default RequestsReceived
