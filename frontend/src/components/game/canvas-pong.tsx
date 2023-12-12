import { useEffect, useRef } from 'react'
import {
  drawBall,
  drawMessage,
  drawRackets,
  drawScores,
  drawTime,
  drawWinner
} from './draw-elements'
import { ControlsInput, PongGame } from '../../gql/graphql'
import { ControlsUpdate } from './controls-update'

type Props = {
  gameId: string
  playerId: string
  getPongData: () => PongGame | null
}

export const CanvasPong: React.FC<Props> = (props: Props) => {
  console.log('CanvasPong:')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null)
  let pongGameData: PongGame | null = null
  let up = false
  let down = false

  const controls: ControlsInput = {
    Down_Key: false,
    S_Key: false,
    Up_Key: false,
    Z_Key: false
  }

  function getControls() {
    return controls
  }

  function keyDownHandler(e: KeyboardEvent) {
    up = false
    if (down === false) {
      if (e.key == 'z') {
        controls.Z_Key = true
      }
      if (e.key == 's') {
        controls.S_Key = true
      }
      if (e.key == 'ArrowUp') {
        e.preventDefault()
        controls.Up_Key = true
      }
      if (e.key == 'ArrowDown') {
        e.preventDefault()
        controls.Down_Key = true
      }
      down = true
    }
  }

  function keyUpHandler(e: KeyboardEvent) {
    down = false
    if (up === false) {
      if (e.key == 'z') {
        controls.Z_Key = false
      }
      if (e.key == 's') {
        controls.S_Key = false
      }
      if (e.key == 'ArrowUp') {
        controls.Up_Key = false
      }
      if (e.key == 'ArrowDown') {
        controls.Down_Key = false
      }
      up = true
    }
  }

  function drawElements(ctx: CanvasRenderingContext2D) {
    if (pongGameData === null) {
      return
    }
    ctx.clearRect(
      0,
      0,
      pongGameData.playfield.width,
      pongGameData.playfield.height
    )
    ctx.fillStyle = 'black'
    ctx.fillRect(
      0,
      0,
      pongGameData.playfield.width,
      pongGameData.playfield.height
    )
    ctx.fillStyle = 'ghostwhite'
    drawTime(ctx, pongGameData.elapsedTime)
    if (pongGameData.player1 && pongGameData.player2) {
      drawScores(ctx, pongGameData.player1.score, pongGameData.player2.score)
    }
    drawBall(ctx, pongGameData.ball)
    drawRackets(ctx, pongGameData.p1racket)
    drawRackets(ctx, pongGameData.p2racket)
  }

  function drawWinScreen(ctx: CanvasRenderingContext2D, winner: String) {
    if (pongGameData === null) {
      return
    }
    ctx.clearRect(
      0,
      0,
      pongGameData.playfield.width,
      pongGameData.playfield.height
    )
    ctx.fillStyle = 'black'
    ctx.fillRect(
      0,
      0,
      pongGameData.playfield.width,
      pongGameData.playfield.height
    )
    ctx.fillStyle = 'ghostwhite'
    ctx!.font = '50px sans-serif'
    drawWinner(ctx, winner)
    if (pongGameData.message) {
      ctx!.font = '30px sans-serif'
      drawMessage(ctx, pongGameData.message)
    }
  }

  useEffect(() => {
    function frameStep() {
      pongGameData = props.getPongData()

      if (canvasRef.current) {
        canvasCtxRef.current = canvasRef.current.getContext('2d')
        let ctx = canvasCtxRef.current
        ctx!.fillStyle = 'ghostwhite'
        ctx!.font = '100px sans-serif'
        ctx!.textAlign = 'center'

        if (pongGameData?.winner) {
          drawWinScreen(ctx!, pongGameData.winner)
        } else {
          drawElements(ctx!)
        }
      }
      window.requestAnimationFrame(frameStep)
    }

    document.addEventListener('keydown', keyDownHandler, false)
    document.addEventListener('keyup', keyUpHandler, false)
    frameStep()
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
      document.removeEventListener('keyup', keyUpHandler)
    }
  }, [keyDownHandler, keyUpHandler])

  return (
    <>
      <ControlsUpdate
        getControls={getControls}
        gameId={props.gameId}
        playerId={props.playerId}
      />
      <canvas ref={canvasRef} width={800} height={600}></canvas>
    </>
  )
}
