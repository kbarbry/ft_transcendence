interface playfield {
  width: number
  height: number
}

interface racket {
  width: number
  height: number
  hPos: number
  vPos: number
  velocity: number
}

interface ball {
  radius: number
  hPos: number
  vPos: number
  dir: { x: number; y: number }
}

interface controls {
  Z_Key: boolean
  S_Key: boolean
  O_Key: boolean
  L_Key: boolean
  Up_Key: boolean
  Down_Key: boolean
}

interface gameInfo {
  controls: controls
  time: number
  p1score: number
  p2score: number
  playfiel: playfield
  ball: ball
  p1racket: racket
  p2racket: racket
}

export type { playfield, racket, ball, controls, gameInfo }
