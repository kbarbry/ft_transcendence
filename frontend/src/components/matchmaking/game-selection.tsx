import React from 'react'

type Props = {
  username: string
  setGameType: React.Dispatch<React.SetStateAction<String | null>>
}

export const GameSelection: React.FC<Props> = (props) => {
  console.log('GameSelection')

  function gameClassic() {
    console.log('gameClassic')
    props.setGameType('Classic')
  }

  function gameExtra() {
    console.log('gameClassic')
    props.setGameType('Extra')
  }

  return (
    <>
      <p>Hello {props.username}, select your game type :</p>
      <button onClick={gameClassic}>Classic Game</button>
      <button onClick={gameExtra}>Extra Game</button>
    </>
  )
}
