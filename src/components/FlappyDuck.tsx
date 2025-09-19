"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface GameState {
  duckY: number;
  duckVelocity: number;
  pipes: Array<{ x: number; gapY: number }>;
  score: number;
  gameStarted: boolean;
  gameOver: boolean;
}

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
const DUCK_SIZE = 30;
const PIPE_WIDTH = 60;
const PIPE_GAP = 150;
const GRAVITY = 0.5;
const JUMP_FORCE = -8;
const PIPE_SPEED = 2;

export default function FlappyDuck() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  
  const [gameState, setGameState] = useState<GameState>({
    duckY: CANVAS_HEIGHT / 2,
    duckVelocity: 0,
    pipes: [],
    score: 0,
    gameStarted: false,
    gameOver: false,
  });

  const resetGame = useCallback(() => {
    setGameState({
      duckY: CANVAS_HEIGHT / 2,
      duckVelocity: 0,
      pipes: [],
      score: 0,
      gameStarted: false,
      gameOver: false,
    });
  }, []);

  const jump = useCallback(() => {
    if (!gameState.gameStarted) {
      setGameState(prev => ({ ...prev, gameStarted: true }));
    }
    if (!gameState.gameOver) {
      setGameState(prev => ({ ...prev, duckVelocity: JUMP_FORCE }));
    } else {
      resetGame();
    }
  }, [gameState.gameStarted, gameState.gameOver, resetGame]);

  const checkCollision = useCallback((duckY: number, pipes: Array<{ x: number; gapY: number }>) => {
    if (duckY > CANVAS_HEIGHT - DUCK_SIZE || duckY < 0) {
      return true;
    }
    const duckX = 50;
    for (const pipe of pipes) {
      if (
        duckX + DUCK_SIZE > pipe.x &&
        duckX < pipe.x + PIPE_WIDTH &&
        (duckY < pipe.gapY || duckY + DUCK_SIZE > pipe.gapY + PIPE_GAP)
      ) {
        return true;
      }
    }
    return false;
  }, []);

  const gameLoop = useCallback(() => {
    setGameState(prev => {
      if (!prev.gameStarted || prev.gameOver) return prev;

      const newDuckY = prev.duckY + prev.duckVelocity;
      const newVelocity = prev.duckVelocity + GRAVITY;
      
      let newPipes = prev.pipes.map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }));
      newPipes = newPipes.filter(pipe => pipe.x > -PIPE_WIDTH);

      if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < CANVAS_WIDTH - 200) {
        newPipes.push({
          x: CANVAS_WIDTH,
          gapY: Math.random() * (CANVAS_HEIGHT - PIPE_GAP - 100) + 50,
        });
      }

      let newScore = prev.score;
      for (const pipe of newPipes) {
        if (pipe.x + PIPE_WIDTH < 50 && pipe.x + PIPE_WIDTH > 50 - PIPE_SPEED) {
          newScore += 1;
        }
      }

      const collision = checkCollision(newDuckY, newPipes);

      return {
        ...prev,
        duckY: newDuckY,
        duckVelocity: newVelocity,
        pipes: newPipes,
        score: newScore,
        gameOver: collision,
      };
    });
  }, [checkCollision]);

  useEffect(() => {
    if (gameState.gameStarted && !gameState.gameOver) {
      const loop = () => {
        gameLoop();
        gameLoopRef.current = requestAnimationFrame(loop);
      };
      gameLoopRef.current = requestAnimationFrame(loop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState.gameStarted, gameState.gameOver, gameLoop]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = "#228B22";
    for (const pipe of gameState.pipes) {
      ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.gapY);
      ctx.fillRect(pipe.x, pipe.gapY + PIPE_GAP, PIPE_WIDTH, CANVAS_HEIGHT - pipe.gapY - PIPE_GAP);
    }

    ctx.fillStyle = "#8B4513";
    ctx.fillRect(0, CANVAS_HEIGHT - 20, CANVAS_WIDTH, 20);

    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(50 + DUCK_SIZE/2, gameState.duckY + DUCK_SIZE/2, DUCK_SIZE/2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#FFA500";
    ctx.fillRect(50 + DUCK_SIZE, gameState.duckY + DUCK_SIZE/2 - 3, 8, 6);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "24px Arial";
    ctx.fillText(`Score: ${gameState.score}`, 10, 30);

    if (gameState.gameOver) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "32px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Game Over!", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 50);
      ctx.fillText(`Score: ${gameState.score}`, CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
      ctx.fillText("Click to Restart", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 50);
    }

    if (!gameState.gameStarted) {
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "32px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Flappy Duck", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 50);
      ctx.fillText("Click to Start!", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 50);
    }
  }, [gameState]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200 p-4">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">Flappy Duck</h1>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={jump}
        className="border-4 border-blue-800 rounded-lg cursor-pointer bg-sky-200"
        style={{ imageRendering: "pixelated" }}
      />
      <p className="mt-4 text-gray-600 text-center max-w-md">
        Click anywhere on the game canvas to make the duck jump and avoid the pipes!
      </p>
    </div>
  );
}