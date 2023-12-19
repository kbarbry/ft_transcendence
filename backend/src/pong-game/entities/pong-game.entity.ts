import { ObjectType, Field, Int } from '@nestjs/graphql'
import { EGameType } from '@prisma/client'

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

  velocity = 8
}

@ObjectType()
class ball {
  @Field(() => Int)
  radius = 10

  @Field(() => Number)
  hPos = 395

  @Field(() => Number)
  vPos = 295

  dir: { x: number; y: number } = { x: 180, y: 210 }
}

export class Controls {
  Z_Key = false
  S_Key = false
  Up_Key = false
  Down_Key = false
}

@ObjectType()
export class PongPlayer {
  constructor(nickname: string, id: string, presence: boolean) {
    this.nickname = nickname
    this.id = id
    this.presence = presence
  }

  id: string

  @Field(() => String)
  nickname: string

  @Field(() => Int)
  score = 0

  @Field(() => Boolean)
  presence: boolean

  controls = new Controls()
}

@ObjectType()
export class PongGame {
  constructor(
    type: EGameType,
    gameId: string,
    p1nick: string,
    p1id: string,
    p2nick: string,
    p2id: string
  ) {
    this.type = type
    this.gameId = gameId
    this.player1 = new PongPlayer(p1nick, p1id, false)
    this.player2 = new PongPlayer(p2nick, p2id, false)

    if (type === EGameType.Special) {
      this.update = this.updateSpecial
      this.ball.dir.x = 300
      this.ball.dir.y = 320
    } else {
      this.update = this.updateClassic
    }
  }

  gameId: string

  @Field(() => EGameType)
  type: EGameType

  @Field(() => String, { nullable: true })
  winner?: string | null = null

  @Field(() => String, { nullable: true })
  message?: string = undefined

  isRunning = false

  precedentTime = 0

  @Field(() => Number)
  elapsedTime = 0

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

  getLastTime: () => number = this.getStartTime

  getPrecedentTime() {
    return this.precedentTime
  }

  getStartTime() {
    this.precedentTime = performance.now()
    this.getLastTime = this.getPrecedentTime
    return this.precedentTime
  }

  update: () => void

  updateClassic() {
    const delta = 0.016
    //ball update
    //  ball playfield left and right collision
    if (this.ball.hPos > this.playfield.width - this.ball.radius) {
      this.ball.dir.x = -this.ball.dir.x
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
    // winner handle
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
      if (
        this.ball.vPos >
        this.p1racket.vPos + this.p1racket.height - this.p1racket.height / 3
      ) {
        this.ball.dir.y = 210
        this.ball.dir.x > 0 ? 180 : -180
      } else if (
        this.ball.vPos <
        this.p1racket.vPos + this.p1racket.height / 3
      ) {
        this.ball.dir.y = -210
        this.ball.dir.x > 0 ? 180 : -180
      } else {
        this.ball.dir.y = 0
        this.ball.dir.x = this.ball.dir.x > 0 ? 300 : -300
      }
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
      if (
        this.ball.vPos >
        this.p2racket.vPos + this.p2racket.height - this.p2racket.height / 3
      ) {
        this.ball.dir.y = 210
        this.ball.dir.x > 0 ? 180 : -180
      } else if (
        this.ball.vPos <
        this.p2racket.vPos + this.p2racket.height / 3
      ) {
        this.ball.dir.y = -210
        this.ball.dir.x > 0 ? 180 : -180
      } else {
        this.ball.dir.y = 0
        this.ball.dir.x = this.ball.dir.x > 0 ? 300 : -300
      }
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
    if (
      this.p1racket.vPos > 0 &&
      (this.player1.controls.Z_Key || this.player1.controls.Up_Key)
    ) {
      this.p1racket.vPos -= this.p1racket.velocity
    }
    if (this.p1racket.vPos < 0) {
      this.p1racket.vPos = 0
    }
    if (
      this.p1racket.vPos < this.playfield.height - this.p1racket.height &&
      (this.player1.controls.S_Key || this.player1.controls.Down_Key)
    ) {
      this.p1racket.vPos += this.p1racket.velocity
    }
    if (this.p1racket.vPos > this.playfield.height - this.p1racket.height) {
      this.p1racket.vPos = this.playfield.height - this.p1racket.height
    }

    //this.p2racket update
    if (
      this.p2racket.vPos > 0 &&
      (this.player2.controls.Z_Key || this.player2.controls.Up_Key)
    ) {
      this.p2racket.vPos -= this.p2racket.velocity
    }
    if (this.p2racket.vPos < 0) {
      this.p2racket.vPos = 0
    }
    if (
      this.p2racket.vPos < this.playfield.height - this.p2racket.height &&
      (this.player2.controls.S_Key || this.player2.controls.Down_Key)
    ) {
      this.p2racket.vPos += this.p2racket.velocity
    }
    if (this.p2racket.vPos > this.playfield.height - this.p2racket.height) {
      this.p2racket.vPos = this.playfield.height - this.p2racket.height
    }
    this.elapsedTime += performance.now() - this.getLastTime()
    this.precedentTime = performance.now()
  }

  updateSpecial() {
    const delta = 0.016
    //ball update
    //  ball playfield left and right collision
    if (this.ball.hPos > this.playfield.width - this.ball.radius) {
      this.ball.dir.x = -this.ball.dir.x
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
    // winner handle
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
      if (
        this.ball.vPos >
        this.p1racket.vPos + this.p1racket.height - this.p1racket.height / 3
      ) {
        this.ball.dir.y = 320
        this.ball.dir.x > 0 ? 300 : -300
      } else if (
        this.ball.vPos <
        this.p1racket.vPos + this.p1racket.height / 3
      ) {
        this.ball.dir.y = -320
        this.ball.dir.x > 0 ? 300 : -300
      } else {
        this.ball.dir.y = 0
        this.ball.dir.x = this.ball.dir.x > 0 ? 600 : -600
      }
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
      if (
        this.ball.vPos >
        this.p2racket.vPos + this.p2racket.height - this.p2racket.height / 3
      ) {
        this.ball.dir.y = 320
        this.ball.dir.x > 0 ? 300 : -300
      } else if (
        this.ball.vPos <
        this.p2racket.vPos + this.p2racket.height / 3
      ) {
        this.ball.dir.y = -320
        this.ball.dir.x > 0 ? 300 : -300
      } else {
        this.ball.dir.y = 0
        this.ball.dir.x = this.ball.dir.x > 0 ? 600 : -600
      }
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
    if (
      this.p1racket.vPos > 0 &&
      (this.player1.controls.S_Key || this.player1.controls.Down_Key)
    ) {
      this.p1racket.vPos -= this.p1racket.velocity
    }
    if (this.p1racket.vPos < 0) {
      this.p1racket.vPos = 0
    }
    if (
      this.p1racket.vPos < this.playfield.height - this.p1racket.height &&
      (this.player1.controls.Z_Key || this.player1.controls.Up_Key)
    ) {
      this.p1racket.vPos += this.p1racket.velocity
    }
    if (this.p1racket.vPos > this.playfield.height - this.p1racket.height) {
      this.p1racket.vPos = this.playfield.height - this.p1racket.height
    }

    //this.p2racket update
    if (
      this.p2racket.vPos > 0 &&
      (this.player2.controls.S_Key || this.player2.controls.Down_Key)
    ) {
      this.p2racket.vPos -= this.p2racket.velocity
    }
    if (this.p2racket.vPos < 0) {
      this.p2racket.vPos = 0
    }
    if (
      this.p2racket.vPos < this.playfield.height - this.p2racket.height &&
      (this.player2.controls.Z_Key || this.player2.controls.Down_Key)
    ) {
      this.p2racket.vPos += this.p2racket.velocity
    }
    if (this.p2racket.vPos > this.playfield.height - this.p2racket.height) {
      this.p2racket.vPos = this.playfield.height - this.p2racket.height
    }
    this.elapsedTime += performance.now() - this.getLastTime()
    this.precedentTime = performance.now()
  }
}
