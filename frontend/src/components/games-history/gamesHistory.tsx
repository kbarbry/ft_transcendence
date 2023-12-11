import { ClassicGamesShowcase } from './classic-games-showcase'
import { SpecialGamesShowcase } from './special-games-showcase'

type Props = {
  playerId: string
}

export const GamesHistory: React.FC<Props> = (props: Props) => {
  return (
    <div id='user-history'>
      <h1>Match History</h1>
      <ClassicGamesShowcase playerId={props.playerId} />
      <SpecialGamesShowcase playerId={props.playerId} />
    </div>
  )
}
