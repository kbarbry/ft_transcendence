import { Flex } from 'antd'
import { ClassicGamesShowcase } from './classic-games-showcase'
import { SpecialGamesShowcase } from './special-games-showcase'

type Props = {
  playerId: string
}

export const GamesHistory: React.FC<Props> = (props: Props) => {
  return (
    <Flex vertical={true} justify='center'>
      <h1>Match History</h1>
      <Flex vertical={false} justify='space-between'>
        <ClassicGamesShowcase playerId={props.playerId} />
        <SpecialGamesShowcase playerId={props.playerId} />
      </Flex>
    </Flex>
  )
}
