import { useMutation } from '@apollo/client'
import { updatePlayerInputs } from './graphql'
import {
  ControlsInput,
  UpdatePlayerInputsMutation,
  UpdatePlayerInputsMutationVariables
} from '../../gql/graphql'
import { useEffect } from 'react'

type Props = {
  gameId: string
  playerId: string
  getControls: () => ControlsInput
  isEnd: () => boolean
}

export const ControlsUpdate: React.FC<Props> = (props: Props) => {
  let timeoutid: NodeJS.Timeout | undefined = undefined

  const [updateInputs] = useMutation<
    UpdatePlayerInputsMutation,
    UpdatePlayerInputsMutationVariables
  >(updatePlayerInputs)

  function update() {
    const controls = props.getControls()
    updateInputs({
      variables: {
        controls: controls,
        gameId: props.gameId,
        playerId: props.playerId
      },
      onError: () => {
        if (timeoutid !== undefined) {
          clearTimeout(timeoutid)
          timeoutid = undefined
        }
      }
    })
  }

  useEffect(() => {
    return () => clearTimeout(timeoutid)
  }, [])

  if (props.isEnd()) {
    return null
  }
  timeoutid = setTimeout(update, 40)
  return null
}
