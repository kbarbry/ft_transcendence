import React from 'react'
import Blocked from './components/Blocked'
import { UserInformations } from '../store/slices/user-informations.slice'

interface BlockedsProps {
  userId: string
  blockeds: UserInformations[]
}

const Blockeds: React.FC<BlockedsProps> = React.memo(({ userId, blockeds }) => {
  return (
    <div>
      <h2>Blocked Component</h2>
      {blockeds.length > 0 ? (
        <ul>
          {blockeds.map((blocked) => (
            <Blocked key={blocked.id} blocked={blocked} userId={userId} />
          ))}
          <ul />
        </ul>
      ) : (
        <p>No one blocked yet</p>
      )}
    </div>
  )
})

export default Blockeds
