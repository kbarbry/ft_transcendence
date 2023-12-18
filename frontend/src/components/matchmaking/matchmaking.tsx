import React from 'react'
import { GameSelection } from './game-selection'
import { Divider, Flex } from 'antd'

type Props = {
  username: string
  playerId: string
}

export const Matchmaking: React.FC<Props> = (props) => {
  return (
    <div id='matchmaking'>
      <Flex vertical={false} gap={80}>
        <Flex vertical={true}>
          <h1>Matchmaking</h1>
          <GameSelection username={props.username} playerId={props.playerId} />
        </Flex>
        <Flex vertical={true}>
          <Divider orientation='left'>Left Text</Divider>
          <p>
            Pong is a two-dimensional sports game that simulates table tennis.
            <br />
            The player controls an in-game paddle by moving it vertically across
            the left or right side of the screen. They can compete against
            another player controlling a second paddle on the opposing side.
            Players use the paddles to hit a ball back and forth. The goal is
            for each player to reach eleven points before the opponent; points
            are earned when one fails to return the ball to the other.
          </p>
        </Flex>
      </Flex>
    </div>
  )
}
