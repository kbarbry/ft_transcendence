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

  @Field(() => Int)
  hPos: number

  @Field(() => Int)
  vPos = 570

  @Field(() => Int)
  velocity = 6
}

@ObjectType()
class ball {
  @Field(() => Int)
  radius = 16

  @Field(() => Int)
  hPos = 792

  @Field(() => Int)
  vPos = 592
  dir: { x: number; y: number } = { x: 1, y: 1 }
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
  constructor(nickname: string, presence: boolean) {
    this.nickname = nickname
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
  constructor(gameId: string, p1nick: string, p2nick: string) {
    this.gameId = gameId
    this.player1 = new PongPlayer(p1nick, false)
    this.player2 = new PongPlayer(p2nick, false)
  }

  @Field(() => String)
  gameId: string

  @Field(() => Date)
  creationTimestamp = new Date()

  @Field(() => String, { nullable: true })
  winner?: string | null = null

  @Field(() => Boolean)
  isRunning = false

  @Field(() => Int)
  time = 0

  @Field(() => Int, { nullable: true })
  player1: PongPlayer

  @Field(() => Int, { nullable: true })
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
    console.log('game update : ' + this.gameId)
  }
}
