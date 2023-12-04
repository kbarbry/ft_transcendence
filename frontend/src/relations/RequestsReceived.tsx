import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import RequestReceived from './components/RequestReceived'

const RequestsReceived: React.FC = () => {
  const requestsReceived = useSelector(
    (state: RootState) => state.requestReceivedInformations.requestReceived
  )
  return (
    <div>
      <h2>Requests Received Component</h2>
      {requestsReceived && requestsReceived.length > 0 ? (
        <ul>
          {requestsReceived.map((requestReceived) => (
            <RequestReceived key={requestReceived.id} />
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
