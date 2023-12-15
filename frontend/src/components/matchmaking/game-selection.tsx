import React from 'react'
import { EGameType } from '../../gql/graphql'
import { GameInvitationPanel } from '../game-invitation-panel/game-invitations-panel'

type Props = {
  username: string
  playerId: string
  setGameType: React.Dispatch<React.SetStateAction<EGameType | null>>
}

export const GameSelection: React.FC<Props> = (props) => {
  console.log('GameSelection')

  function gameClassic() {
    console.log('gameClassic')
    props.setGameType(EGameType.Classic)
  }

  function gameExtra() {
    console.log('gameSpecial')
    props.setGameType(EGameType.Special)
  }

  return (
    <div className='game-selection'>
      <h2>Hello {props.username}, select your game type :</h2>
      <button onClick={gameClassic}>Classic Game</button>
      <button onClick={gameExtra}>Extra Game</button>
      <GameInvitationPanel playerId={props.playerId} />
    </div>
  )
}
