import React from 'react'
import { EGameType } from '../../gql/graphql'

type Props = {
  username: string
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
    <>
      <p>Hello {props.username}, select your game type :</p>
      <button onClick={gameClassic}>Classic Game</button>
      <button onClick={gameExtra}>Extra Game</button>
    </>
  )
}
