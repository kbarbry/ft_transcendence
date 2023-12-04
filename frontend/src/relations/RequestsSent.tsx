import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const RequestsSent: React.FC = () => {
  const requestsSent = useSelector(
    (state: RootState) => state.requestSentInformations.requestSent
  )
  return (
    <div>
      <h2>Requests Sent Component</h2>
      {requestsSent && requestsSent.length > 0 ? (
        <ul>
          {requestsSent.map((requestSent) => (
            <RequestsSent key={requestSent.id} />
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
