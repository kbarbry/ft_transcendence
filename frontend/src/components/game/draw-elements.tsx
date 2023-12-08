import { Ball, Racket } from '../../gql/graphql'

function drawTime(ctx: CanvasRenderingContext2D, time: number) {
  let second: number = time / 1000
  ctx.fillText(second.toFixed(0), 400, 100)
}

function drawScores(
  ctx: CanvasRenderingContext2D,
  piScore: number,
  p2Score: number
) {
  ctx.fillText(piScore.toString(), 300, 200)
  ctx.fillText(p2Score.toString(), 500, 200)
}

function drawRackets(ctx: CanvasRenderingContext2D, racket: Racket) {
  ctx.fillRect(racket.hPos, racket.vPos, racket.width, racket.height)
}

function drawBall(ctx: CanvasRenderingContext2D, ball: Ball) {
  ctx.beginPath()
  ctx.arc(ball.hPos, ball.vPos, ball.radius, 0, 2 * Math.PI)
  ctx.fill()
  ctx.closePath()
}

export { drawTime, drawScores, drawRackets, drawBall }
