import { useMutation } from '@apollo/client'
import { updatePlayerInputs } from './graphql'
import { ControlsInput } from '../../gql/graphql'

type Props = {
  gameId: string
  playerId: string
  getControls: () => ControlsInput
}

export const ControlsUpdate: React.FC<Props> = (props: Props) => {
  const [updateInputs] = useMutation(updatePlayerInputs)

  function update() {
    const controls = props.getControls()
    updateInputs({
      variables: {
        controls: controls,
        gameId: props.gameId,
        playerId: props.playerId
      }
    })
  }

  setTimeout(update, 40)
  return null
}
