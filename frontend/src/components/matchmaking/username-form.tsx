import React from 'react'
//enter a username
//click on button
//it listen to the matchmakingSubscription
//once subscription is received it send mutation to join matchmaking

type Props = {
  username: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  gameClassic: () => void
  gameExtra: () => void
}

export const GameSelection: React.FC<Props> = (props) => {
  console.log('GameSelection')
  return (
    <>
      <form>
        <label>
          Username:
          <input value={props.username} onChange={props.handleChange} />
        </label>
      </form>
      <button onClick={props.gameClassic}>Classic Game</button>
      <button onClick={props.gameExtra}>Extra Game</button>
    </>
  )
}
