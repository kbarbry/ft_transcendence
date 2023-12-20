import React from 'react'
import { GameSelection } from './game-selection'
import { Col, Divider, Flex, Row, Space } from 'antd'
import { GameInvitationPanel } from '../game-invitation-panel/game-invitations-panel'

type Props = {
  username: string
  playerId: string
}

export const Matchmaking: React.FC<Props> = (props) => {
  return (
    <Row justify='space-evenly'>
      <Col flex='18em'>
        <Flex vertical={true}>
          <h1>Matchmaking</h1>
          <Space direction='vertical' size={50} style={{ display: 'flex' }}>
            <GameSelection
              username={props.username}
              playerId={props.playerId}
            />
            <GameInvitationPanel playerId={props.playerId} />
          </Space>
        </Flex>
      </Col>
      <Col flex='25em'>
        <Flex vertical={true}>
          <Divider orientation='left'>Pong rules</Divider>
          <p>
            Pong is a two-dimensional sports game that simulates table tennis.
            <br />
            The player controls an in-game paddle by moving it vertically across
            the top or bottom side of the screen. They can compete against
            another player controlling a second paddle on the opposing side.
            Players use the paddles to hit a ball back and forth. The goal is
            for each player to reach eleven points before the opponent. Points
            are earned when one fails to return the ball to the other.
          </p>
        </Flex>
      </Col>
    </Row>
  )
}
