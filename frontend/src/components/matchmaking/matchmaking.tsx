import React from 'react'
import { GameSelection } from './game-selection'
import { Col, Divider, Flex, Row } from 'antd'

type Props = {
  username: string
  playerId: string
}

export const Matchmaking: React.FC<Props> = (props) => {
  return (
    <Row>
      <Col flex='29em' offset={6}>
        <Flex vertical={true}>
          <h1>Matchmaking</h1>
          <GameSelection username={props.username} playerId={props.playerId} />
        </Flex>
      </Col>
      <Col flex='25em' offset={1}>
        <Flex vertical={true}>
          <Divider orientation='left'>Pong rules</Divider>
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
      </Col>
    </Row>
  )
}
