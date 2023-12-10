import React from 'react'

type Props = {
  username: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
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
      <form>
        <label>
          Username:
          <input value={props.username} onChange={props.handleChange} />
        </label>
      </form>
      <button onClick={gameClassic}>Classic Game</button>
      <button onClick={gameExtra}>Extra Game</button>
    </>
  )
}
