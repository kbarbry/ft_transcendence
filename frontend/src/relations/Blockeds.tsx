import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import Blocked from './components/Blocked'

const Blockeds: React.FC = () => {
  const blockeds = useSelector(
    (state: RootState) => state.blockedInformations.blockeds
  )
  return (
    <div>
      <h2>Blocked Component</h2>
      {blockeds && blockeds.length > 0 ? (
        <ul>
          {blockeds.map((blocked) => (
            <Blocked key={blocked.id} />
          ))}
          <ul />
        </ul>
      ) : (
        <p>No one blocked yet</p>
      )}
    </div>
  )
}

export default Blockeds
