import React from 'react'
import { Leaderboard } from '../components/leaderboard/leaderboard'
import { GamesHistory } from '../components/games-history/gamesHistory'
import { useAppSelector } from '../store/hooks'
import { NotFound } from '../ErrorPages/404'
import { Col, Flex, Row } from 'antd'

export const Home: React.FC = () => {
  const userId: string | undefined = useAppSelector(
    (state) => state.userInformations.user?.id
  )

  if (userId === undefined) {
    return <NotFound />
  }

  return (
    <>
      <Flex vertical={true} align='center'>
        <h1>Welcome on Transcendence !</h1>
        <p>
          Immerse yourself in the thrill of real-time multiplayer Pong battles !
        </p>
      </Flex>
      <Row justify='space-evenly'>
        <Col flex='20em'>
          <Leaderboard />
        </Col>
        <Col flex='30em'>
          <GamesHistory playerId={userId} />
        </Col>
      </Row>
    </>
  )
}
