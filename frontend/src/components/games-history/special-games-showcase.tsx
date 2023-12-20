import React from 'react'
import { useQuery } from '@apollo/client'
import {
  FindGameStatSpecialQuery,
  FindGameStatSpecialQueryVariables
} from '../../gql/graphql'
import { findGameStatSpecial } from './graphql'
import { Divider, Flex } from 'antd'

type Props = {
  playerId: string
}

export const SpecialGamesShowcase: React.FC<Props> = (props: Props) => {
  const { data, loading, error } = useQuery<
    FindGameStatSpecialQuery,
    FindGameStatSpecialQueryVariables
  >(findGameStatSpecial, {
    variables: { findGameStatSpecialId: props.playerId },
    fetchPolicy: 'cache-and-network'
  })

  if (loading === true) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>An error occured while loading special game history.</p>
  }
  if (data === undefined) {
    return <p>No games yet.</p>
  }

  const gameElements: React.JSX.Element[] = data.findGameStatSpecial.map(
    (game) => (
      <li className='showcase-element' key={game.id}>
        <p>Date: {new Date(game.createdAt).toLocaleDateString('en-US')}</p>
        <p>Type: {game.type}</p>
        <p>Result: {game.winnerId === props.playerId ? 'Win' : 'Lose'}</p>
        <p>
          Score:{' '}
          {game.winnerId === props.playerId
            ? game.scoreWinner
            : game.scoreLoser}
        </p>
        <Divider />
      </li>
    )
  )

  return (
    <Flex vertical={true} gap={0} align='center'>
      <h1>Special</h1>
      <ul className='showcase'>{gameElements}</ul>
    </Flex>
  )
}
