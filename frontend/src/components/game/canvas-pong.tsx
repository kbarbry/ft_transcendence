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
  let pongGameData: PongGame | null = props.getPongData()

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
  }

  function keyUpHandler(e: KeyboardEvent) {
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
  }

  function drawPlayersUsername(
    ctx: CanvasRenderingContext2D,
    p1nick: string,
    p2nick: string
  ) {
    ctx.fillStyle = 'grey'
    ctx.font = '30px sans-serif'
    ctx.fillText(p1nick, 100, 100)
    ctx.fillText(p2nick, 700, 100)
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
    drawPlayersUsername(
      ctx,
      pongGameData.player1!.nickname,
      pongGameData.player2!.nickname
    )
    drawTime(ctx, pongGameData.elapsedTime)
    if (pongGameData.player1 && pongGameData.player2) {
      drawScores(ctx, pongGameData.player1.score, pongGameData.player2.score)
    }
    ctx.fillStyle = 'ghostwhite'
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

    drawWinner(ctx, winner)
    if (pongGameData.message) {
      drawMessage(ctx, pongGameData.message)
    }
  }

  function drawWaitScreen(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, 800, 600)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 800, 600)
    ctx.fillStyle = 'ghostwhite'
    ctx.font = '50px sans-serif'
    ctx.fillText('Waiting for both player to be ready', 400, 300)
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

        if (pongGameData === null) {
          drawWaitScreen(ctx!)
        }
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
