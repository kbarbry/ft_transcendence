import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
class playfield {
  @Field(() => Int)
  width = 800

  @Field(() => Int)
  height = 600
}

@ObjectType()
class racket {
  constructor(hPos: number) {
    this.hPos = hPos
  }

  @Field(() => Int)
  width = 10

  @Field(() => Int)
  height = 60

  @Field(() => Number)
  hPos: number

  @Field(() => Number)
  vPos = 270

  @Field(() => Int)
  velocity = 6
}

@ObjectType()
class ball {
  @Field(() => Int)
  radius = 16

  @Field(() => Number)
  hPos = 392

  @Field(() => Number)
  vPos = 292

  dir: { x: number; y: number } = { x: 100, y: 100 }
}

@ObjectType()
export class Controls {
  @Field(() => Boolean)
  Z_Key = false

  @Field(() => Boolean)
  S_Key = false

  @Field(() => Boolean)
  Up_Key = false

  @Field(() => Boolean)
  Down_Key = false
}

@ObjectType()
export class PongPlayer {
  constructor(nickname: string, id: string, presence: boolean) {
    this.nickname = nickname
    this.id = id
    this.presence = presence
  }

  @Field(() => String)
  id: string

  @Field(() => String)
  nickname: string

  @Field(() => Int)
  score = 0

  @Field(() => Boolean)
  presence: boolean

  @Field(() => Controls)
  controls = new Controls()
}

@ObjectType()
export class PongGame {
  constructor(
    gameId: string,
    p1nick: string,
    p1id: string,
    p2nick: string,
    p2id: string
  ) {
    this.gameId = gameId
    this.player1 = new PongPlayer(p1nick, p1id, false)
    this.player2 = new PongPlayer(p2nick, p2id, false)
  }

  @Field(() => String)
  gameId: string

  @Field(() => Date)
  creationTimestamp = new Date()

  @Field(() => String, { nullable: true })
  winner?: string | null = null

  @Field(() => Boolean)
  isRunning = false

  @Field(() => Number)
  time = 0

  @Field(() => PongPlayer, { nullable: true })
  player1: PongPlayer

  @Field(() => PongPlayer, { nullable: true })
  player2: PongPlayer

  @Field(() => playfield)
  playfield: playfield = new playfield()

  @Field(() => ball)
  ball: ball = new ball()

  @Field(() => racket)
  p1racket: racket = new racket(50)

  @Field(() => racket)
  p2racket: racket = new racket(750)

  update() {
    //console.log('PongGame: update(): gameId = ' + this.gameId)
    const delta = 0.016
    //ball update
    //  ball playfield left and right collision
    if (this.ball.hPos > this.playfield.width - this.ball.radius) {
      this.ball.dir.x = -this.ball.dir.x //Add random angle up and down
      this.ball.hPos = this.playfield.width / 2
      this.ball.vPos = this.playfield.height / 2 - this.ball.radius
      this.player1.score += 1
    }
    if (this.ball.hPos < this.ball.radius) {
      this.ball.dir.x = -this.ball.dir.x
      this.ball.hPos = this.playfield.width / 2
      this.ball.vPos = this.playfield.height / 2 - this.ball.radius
      this.player2.score += 1
    }
    //TODO set winner and handle vicotry at 12 points
    if (this.player1.score === 12) {
      this.winner = this.player1.nickname
      this.isRunning = false
      return
    } else if (this.player2.score === 12) {
      this.winner = this.player2.nickname
      this.isRunning = false
      return
    }
    //  ball racket1 collision
    if (
      this.ball.vPos >= this.p1racket.vPos &&
      this.ball.vPos <= this.p1racket.vPos + this.p1racket.height &&
      this.ball.hPos > this.p1racket.hPos + this.p1racket.width &&
      this.ball.hPos <
        this.p1racket.hPos + this.p1racket.width + this.ball.radius
    ) {
      this.ball.hPos =
        this.p1racket.hPos + this.p1racket.width + this.ball.radius
      this.ball.dir.x = -this.ball.dir.x
    }
    //  ball racket2 collision
    if (
      this.ball.vPos >= this.p2racket.vPos &&
      this.ball.vPos <= this.p2racket.vPos + this.p2racket.height &&
      this.ball.hPos < this.p2racket.hPos &&
      this.ball.hPos > this.p2racket.hPos - this.ball.radius
    ) {
      this.ball.hPos = this.p2racket.hPos - this.ball.radius
      this.ball.dir.x = -this.ball.dir.x
    }

    //  ball playfield up and bottom collision
    if (
      this.ball.vPos < this.ball.radius ||
      this.ball.vPos > this.playfield.height - this.ball.radius
    ) {
      this.ball.dir.y = -this.ball.dir.y
    }
    this.ball.hPos += this.ball.dir.x * delta
    this.ball.vPos += this.ball.dir.y * delta

    //this.p1racket update
    if (this.p1racket.vPos > 0 && this.player1.controls.Z_Key) {
      this.p1racket.vPos -= this.p1racket.velocity
    }
    if (this.p1racket.vPos < 0) {
      this.p1racket.vPos = 0
    }
    if (
      this.p1racket.vPos < this.playfield.height - this.p1racket.height &&
      this.player1.controls.S_Key
    ) {
      this.p1racket.vPos += this.p1racket.velocity
    }
    if (this.p1racket.vPos > this.playfield.height - this.p1racket.height) {
      this.p1racket.vPos = this.playfield.height - this.p1racket.height
    }

    //this.p2racket update
    if (this.p2racket.vPos > 0 && this.player2.controls.Z_Key) {
      this.p2racket.vPos -= this.p2racket.velocity
    }
    if (this.p2racket.vPos < 0) {
      this.p2racket.vPos = 0
    }
    if (
      this.p2racket.vPos < this.playfield.height - this.p2racket.height &&
      this.player2.controls.S_Key
    ) {
      this.p2racket.vPos += this.p2racket.velocity
    }
    if (this.p2racket.vPos > this.playfield.height - this.p2racket.height) {
      this.p2racket.vPos = this.playfield.height - this.p2racket.height
    }
  }
}
