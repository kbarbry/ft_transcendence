import { useEffect, useRef } from 'react'
import { drawBall, drawRackets, drawScores, drawTime } from './draw-elements'
import { Controls, PongGame } from '../../gql/graphql'
import { SubPong } from './subPong'
import { useMutation } from '@apollo/client'

let start: DOMHighResTimeStamp
let previousTimeStamp: DOMHighResTimeStamp

type Props = {
  gameId: string
}

export const CanvasPong: React.FC<Props> = (props: Props) => {
  console.log('CanvasPong:')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null)
  let elapsed: DOMHighResTimeStamp
  let pongGameData: PongGame | null = null
  let up: boolean = false
  let down: boolean = false

  //TODO useMutation(sendInput)

  function setPongGameData(pongData: PongGame) {
    pongGameData = pongData
  }

  const controls: Controls = {
    Z_Key: false,
    S_Key: false,
    Up_Key: false,
    Down_Key: false
  }

  function keyDownHandler(e: KeyboardEvent) {
    up = false
    console.log('keyDownHandler')
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
    if (down === false) {
      //send controls mutation
    }
    down = true
  }

  function keyUpHandler(e: KeyboardEvent) {
    down = false
    console.log('keyUpHandler')
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
    if (up == false) {
      //send controls mutation
    }
    up = true
  }

  function drawElements(ctx: CanvasRenderingContext2D) {
    if (pongGameData === null) {
      return
    }
    ctx.clearRect(
      0,
      0,
      pongGameData.playfield.width,
      pongGameData.playfield.width
    )
    drawTime(ctx, elapsed)
    if (pongGameData.player1 && pongGameData.player2) {
      drawScores(ctx, pongGameData.player1.score, pongGameData.player2.score)
    }
    drawBall(ctx, pongGameData.ball)
    drawRackets(ctx, pongGameData.p1racket)
    drawRackets(ctx, pongGameData.p2racket)
  }

  useEffect(() => {
    function frameStep(timeStamp: DOMHighResTimeStamp) {
      elapsed = timeStamp - start

      //code here
      if (canvasRef.current) {
        canvasCtxRef.current = canvasRef.current.getContext('2d')
        let ctx = canvasCtxRef.current
        ctx!.fillStyle = 'ghostwhite'
        ctx!.font = '100px sans-serif'
        ctx!.textAlign = 'center'

        drawElements(ctx!)
      }

      previousTimeStamp = timeStamp
      window.requestAnimationFrame(frameStep)
    }

    previousTimeStamp = performance.now()
    start = previousTimeStamp
    frameStep(performance.now())
  })

  document.addEventListener('keydown', keyDownHandler, false)
  document.addEventListener('keyup', keyUpHandler, false)
  return (
    <>
      <SubPong gameId={props.gameId} updateGameElement={setPongGameData} />
      <canvas ref={canvasRef} width={800} height={600}></canvas>
    </>
  )
}
