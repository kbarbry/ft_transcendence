import { useEffect, useRef } from "react";

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
  document.addEventListener("keydown", keyDownHandler, false)
  document.addEventListener("keyup", keyUpHandler, false)
  let elapsed: DOMHighResTimeStamp

  const playfield =
  {
    width: CANVAS_WIDTH,
    height: CANVAS_WIDTH - (CANVAS_WIDTH / 4)
  }
  const racket =
  {
    width: 10,
    height: 60,
    hPos: 50,
    vPos: (playfield.height / 2) - 30,
    velocity: 5
  }
  const ball = 
  {
    radius: playfield.height * 0.02,
    hPos: playfield.width / 2,
    vPos: playfield.height / 2 - playfield.height * 0.01,
    dir: {x: 200, y:200}
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

  function updateElements()
  {
    //ball actualisation
    //  ball up and down  collision
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
    //  ball racket collision
    if (true)
    {}
    //  ball left and right playfield collision
    if ((ball.vPos < ball.radius) || (ball.vPos > playfield.height - ball.radius))
    {
      ball.dir.y = -ball.dir.y;
    }
    ball.hPos += (ball.dir.x * previousFrameTime);
    ball.vPos += (ball.dir.y * previousFrameTime);

    //racket actualisation
    if (racket.vPos > 0 && (controls.Z_Key || controls.Up_Key))
    {
      racket.vPos -= racket.velocity;
    }
    if (racket.vPos < (playfield.height - (racket.height)) && (controls.S_Key || controls.Down_Key))
    {
      racket.vPos += racket.velocity;
    }
  }

  function drawRackets(ctx: CanvasRenderingContext2D)
  {
    ctx.fillRect(racket.hPos, racket.vPos, racket.width, racket.height)
  }

  function drawBall(ctx: CanvasRenderingContext2D)
  {
    ctx.beginPath();
    ctx.arc(ball.hPos, ball.vPos, ball.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  function drawScores(ctx: CanvasRenderingContext2D)
  {
    ctx.fillText(player1Score.toString(), 300, 200);
    ctx.fillText(player2Score.toString(), 500, 200);
  }

  function drawTime(ctx: CanvasRenderingContext2D)
  {
    let second: number = (elapsed / 1000)
    ctx.fillText(second.toFixed(0), 400, 100)
  }

  function drawElements(ctx: CanvasRenderingContext2D)
  {
    ctx.clearRect(0, 0, playfield.width, playfield.width);
    drawTime(ctx);
    drawScores(ctx);
    drawBall(ctx);
    drawRackets(ctx);
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

        //read input
        updateElements()
        drawElements(ctx!)
      }

      previousTimeStamp = timeStamp;
      window.requestAnimationFrame(frameStep);
    }
    
    //init game
    previousTimeStamp = performance.now();
    start = previousTimeStamp;
    window.requestAnimationFrame(frameStep); //TODO maybe call frameStep here as: function frameStep(performance.now())
  }, []);

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
