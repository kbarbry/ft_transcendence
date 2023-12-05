import React from 'react'
import Blocked from './components/Blocked'
import { useAppSelector } from '../store/hooks'

const Blockeds: React.FC = () => {
  const blockeds = useAppSelector((state) => state.blockedInformations.blockeds)

  return (
    <div>
      <h2>Blocked Component</h2>
      {blockeds && blockeds.length > 0 ? (
        <ul>
          {blockeds.map((blocked) => (
            <Blocked key={blocked.id} blocked={blocked} />
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
