import { Flex } from 'antd'
import { LeaderboardShowcase } from './leaderboard-showcase'
import './leaderboard.css'

export const Leaderboard: React.FC = () => {
  return (
    <div id='leaderboard'>
      <Flex vertical={true} gap='large' align='center'>
        <h1>Leaderboard</h1>
        <LeaderboardShowcase />
      </Flex>
    </div>
  )
}
