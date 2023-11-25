import { useEffect, useRef } from "react";
import { drawBall, drawRackets, drawScores, drawTime } from "./draw-elements";

export const Pong: React.FC = () => {

  return (
    <>
    <h1>Pong</h1>
    <CanvasPong/>
    </>
  )
}

const CANVAS_WIDTH = 800;
let start: DOMHighResTimeStamp;
let previousTimeStamp: DOMHighResTimeStamp;
let previousFrameTime: DOMHighResTimeStamp = 0.006961;
let player1Score: number = 0;
let player2Score: number = 0;

const CanvasPong: React.FC<{}> = () =>
{
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null)
  let elapsed: DOMHighResTimeStamp

  const playfield =
  {
    width: CANVAS_WIDTH,
    height: CANVAS_WIDTH - (CANVAS_WIDTH / 4)
  }
  const racket1 =
  {
    width: 10,
    height: 60,
    hPos: 50,
    vPos: (playfield.height / 2) - 30,
    velocity: 3
  }
  const racket2 =
  {
    width: 10,
    height: 60,
    hPos: playfield.width - 50,
    vPos: (playfield.height / 2) - 30,
    velocity: 3
  }
  const ball = 
  {
    radius: playfield.height * 0.02,
    hPos: playfield.width / 2,
    vPos: playfield.height / 2 - playfield.height * 0.01,
    dir: {x: 100, y:100}
  }
  const controls =
  {
    Z_Key: false,
    S_Key: false,
    O_Key: false,
    L_Key: false,
    Up_Key: false,
    Down_Key: false
  }

  function keyDownHandler(e: KeyboardEvent) {
    if (e.key == "z"){controls.Z_Key = true}
    if (e.key == "s"){controls.S_Key = true}
    if (e.key == "o"){controls.O_Key = true}
    if (e.key == "l"){controls.L_Key = true}
    if (e.key == "ArrowUp"){controls.Up_Key = true}
    if (e.key == "ArrowDown"){controls.Down_Key = true}
  }

  function keyUpHandler(e: KeyboardEvent) {
    if (e.key == "z"){controls.Z_Key = false}
    if (e.key == "s"){controls.S_Key = false}
    if (e.key == "o"){controls.O_Key = false}
    if (e.key == "l"){controls.L_Key = false}
    if (e.key == "ArrowUp"){controls.Up_Key = false}
    if (e.key == "ArrowDown"){controls.Down_Key = false}
  }

  function updateElements(delta: number)
  {
    //ball update
    //  ball playfield top and bottom collision
    if ((ball.hPos < ball.radius))
    {
      ball.dir.x = -ball.dir.x;
      ball.hPos = playfield.width / 2;
      ball.vPos = playfield.height / 2 - ball.radius;
      player2Score += 1;
    }
    if (ball.hPos > playfield.width - ball.radius)
    {
      ball.dir.x = -ball.dir.x;
      ball.hPos = playfield.width / 2;
      ball.vPos = playfield.height / 2 - ball.radius;
      player1Score += 1;
    }
    //  ball racket1 collision
    if ((ball.vPos >= racket1.vPos && ball.vPos <= (racket1.vPos + racket1.height))
      && (ball.hPos > (racket1.hPos + racket1.width) && ball.hPos < (racket1.hPos + racket1.width + ball.radius)))
    {
      ball.hPos = racket1.hPos + racket1.width + ball.radius
      ball.dir.x = -ball.dir.x
    }
    //  ball racket2 collision
    if ((ball.vPos >= racket2.vPos && ball.vPos <= (racket2.vPos + racket2.height))
    && (ball.hPos < racket2.hPos && ball.hPos > racket2.hPos - ball.radius))
    {
      ball.hPos = racket2.hPos - ball.radius
      ball.dir.x = -ball.dir.x
    }

    //  ball playfield left and right collision
    if ((ball.vPos < ball.radius) || (ball.vPos > playfield.height - ball.radius))
    {
      ball.dir.y = -ball.dir.y;
    }
    ball.hPos += (ball.dir.x * delta);
    ball.vPos += (ball.dir.y * delta);

    //racket1 update
    if (racket1.vPos > 0 && (controls.Z_Key || controls.Up_Key))
    {
      racket1.vPos -= racket1.velocity;
      if (racket1.vPos < 0)
      {
        racket1.vPos = 0
      }
    }
    if (racket1.vPos < (playfield.height - racket1.height) && (controls.S_Key || controls.Down_Key))
    {
      racket1.vPos += racket1.velocity;
      if (racket1.vPos > (playfield.height - racket1.height))
      {
        racket1.vPos = playfield.height - racket1.height
      }
    }

    //racket2 update
    if (racket2.vPos > 0 && (controls.O_Key))
    {
      racket2.vPos -= racket2.velocity;
    }
    if (racket2.vPos < (playfield.height - (racket2.height)) && (controls.L_Key))
    {
      racket2.vPos += racket2.velocity;
    }
  }

  function drawElements(ctx: CanvasRenderingContext2D)
  {
    ctx.clearRect(0, 0, playfield.width, playfield.width);
    drawTime(ctx, elapsed);
    drawScores(ctx, player1Score, player2Score);
    drawBall(ctx, ball);
    drawRackets(ctx, racket1);
    drawRackets(ctx, racket2);
  }

  useEffect(() =>
  {
    function frameStep(timeStamp: DOMHighResTimeStamp) {
      elapsed = timeStamp - start;
      //previousFrameTime = timeStamp - previousTimeStamp;
      //console.log("previous timestamp = " + (timeStamp - previousTimeStamp));

      //code here
      if (canvasRef.current)
      {
        canvasCtxRef.current = canvasRef.current.getContext('2d');
        let ctx = canvasCtxRef.current;
        ctx!.fillStyle = "ghostwhite";
        ctx!.font = "100px sans-serif"
        ctx!.textAlign = "center";

        updateElements(previousFrameTime)
        drawElements(ctx!)
      }

      previousTimeStamp = timeStamp;
      window.requestAnimationFrame(frameStep);
    }

    //init game
    previousTimeStamp = performance.now();
    start = previousTimeStamp;
    frameStep(performance.now()); //TODO maybe call frameStep here as: function frameStep(performance.now())
  }, []);

  document.addEventListener("keydown", keyDownHandler, false)
  document.addEventListener("keyup", keyUpHandler, false)
  return (
    <>
      <div id='pong-players'>
        <p>Player 1</p>
        <p>Player 2</p>
      </div>
      <canvas ref={canvasRef} width={playfield.width} height={playfield.height}></canvas>
    </>
  );
};
