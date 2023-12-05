import React from 'react'
import { useAppSelector } from '../store/hooks'
import RequestSent from './components/RequestSent'

const RequestsSent: React.FC = () => {
  const requestsSent = useAppSelector(
    (state) => state.requestSentInformations.requestSent
  )

  return (
    <div>
      <h2>Requests Sent Component</h2>
      {requestsSent && requestsSent.length > 0 ? (
        <ul>
          {requestsSent.map((requestSent) => (
            <RequestSent key={requestSent.id} requestSent={requestSent} />
          ))}
          <ul />
        </ul>
      ) : (
        <p>No request sent yet</p>
      )}
    </div>
  )
}

export default RequestsSent
