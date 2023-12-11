import { gql } from '@apollo/client'

export const getAllClassicGamesHistory = gql`
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

export const getAllSpecialGamesHistory = gql`
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

export const findBestUsers = gql`
  query FindBestUsers {
    findBestUsers {
      avatarUrl
      username
      level
    }
  }
`
