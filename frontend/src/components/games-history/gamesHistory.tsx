import { Col, Flex, Row } from 'antd'
import { ClassicGamesShowcase } from './classic-games-showcase'
import { SpecialGamesShowcase } from './special-games-showcase'

type Props = {
  playerId: string
}

export const GamesHistory: React.FC<Props> = (props: Props) => {
  return (
    <>
      <Flex vertical={true} align='center'>
        <h1>Match History</h1>
      </Flex>
      <Row justify='space-evenly'>
        <Col flex='10em'>
          <ClassicGamesShowcase playerId={props.playerId} />
        </Col>
        <Col flex='10em'>
          <SpecialGamesShowcase playerId={props.playerId} />
        </Col>
      </Row>
    </>
  )
}
