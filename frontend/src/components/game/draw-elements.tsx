import { Ball, Racket } from '../../gql/graphql'

function drawTime(ctx: CanvasRenderingContext2D, time: number) {
  ctx.fillStyle = 'grey'
  ctx.font = '80px sans-serif'
  let second: number = time / 1000
  ctx.fillText(second.toFixed(0), 400, 100)
}

function drawScores(
  ctx: CanvasRenderingContext2D,
  p1Score: number,
  p2Score: number
) {
  ctx.fillStyle = 'grey'
  ctx.font = '70px sans-serif'
  ctx.fillText(p1Score.toString(), 300, 200)
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

function drawWinner(ctx: CanvasRenderingContext2D, winner: String) {
  ctx.fillStyle = 'ghostwhite'
  ctx.font = '60px sans-serif'
  let text: string = 'Winner is : ' + winner
  ctx.fillText(text, 400, 300)
}

function drawMessage(ctx: CanvasRenderingContext2D, message: string) {
  ctx.fillStyle = 'ghostwhite'
  ctx.font = '40px sans-serif'
  ctx.fillText(message, 400, 400)
}

export { drawTime, drawScores, drawRackets, drawBall, drawWinner, drawMessage }
