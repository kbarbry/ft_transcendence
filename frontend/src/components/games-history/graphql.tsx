import { gql } from '@apollo/client'

export const findGameStatClassic = gql`
  query FindGameStatClassic($findGameStatClassicId: String!) {
    findGameStatClassic(id: $findGameStatClassicId) {
      createdAt
      id
      loserId
      scoreLoser
      scoreWinner
      timePlayed
      type
      winnerId
    }
  }
`

export const findGameStatSpecial = gql`
  query FindGameStatSpecial($findGameStatSpecialId: String!) {
    findGameStatSpecial(id: $findGameStatSpecialId) {
      createdAt
      id
      loserId
      scoreLoser
      scoreWinner
      timePlayed
      type
      winnerId
    }
  }
`
