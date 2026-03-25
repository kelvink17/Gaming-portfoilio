"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface FootballAnimationProps {
  onGoal?: () => void;
}

// Player type
interface Player {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  team: "attack" | "defense";
  number: number;
  hasBall: boolean;
  // for celebration
  celebrating: boolean;
  celebrationTimer?: number;
}

const FootballAnimation: React.FC<FootballAnimationProps> = ({ onGoal }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasScored, setHasScored] = useState(false);
  const [score, setScore] = useState({ attack: 0, defense: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>();

  // Game state
  const playersRef = useRef<Player[]>([]);
  const ballRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    radius: 10,
    holderId: null as number | null,
  });

  // Particle effects for goal explosion
  const particlesRef = useRef<
    {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
    }[]
  >([]);

  // Initialize game when dimensions change
  useEffect(() => {
    if (dimensions.width === 0) return;

    // Set up players with realistic positions
    const attack: Player[] = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: 150 + i * 70,
      y: dimensions.height / 2 - 30 + (i % 2 === 0 ? -20 : 20),
      vx: 0,
      vy: 0,
      team: "attack",
      number: i + 1,
      hasBall: i === 0,
      celebrating: false,
    }));

    const defense: Player[] = Array.from({ length: 3 }, (_, i) => ({
      id: i + 10,
      x: dimensions.width - 250 + i * 70,
      y: dimensions.height / 2 - 30 + i * 30,
      vx: 0,
      vy: 0,
      team: "defense",
      number: i + 1,
      hasBall: false,
      celebrating: false,
    }));

    playersRef.current = [...attack, ...defense];

    // Set ball position to first attacker
    const firstAttacker = attack[0];
    ballRef.current = {
      x: firstAttacker.x,
      y: firstAttacker.y - 20,
      vx: 0,
      vy: 0,
      radius: 10,
      holderId: firstAttacker.id,
    };
  }, [dimensions]);

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Main animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const goal = {
      x: dimensions.width - 60,
      y: dimensions.height / 2 - 70,
      width: 10,
      height: 140,
    };

    const updateGame = () => {
      const players = playersRef.current;
      const ball = ballRef.current;

      // Decrease celebration timers
      players.forEach((p) => {
        if (p.celebrating && p.celebrationTimer) {
          p.celebrationTimer -= 1;
          if (p.celebrationTimer <= 0) {
            p.celebrating = false;
          }
        }
      });

      // AI movement
      players.forEach((p) => {
        if (p.celebrating) return; // celebrating players don't move

        if (p.team === "attack") {
          if (p.id === ball.holderId) {
            // Attacker with ball dribbles forward with occasional weave
            p.vx = 1.2 + Math.sin(Date.now() * 0.01 + p.id) * 0.3;
            p.vy = Math.sin(Date.now() * 0.02 + p.id) * 0.8;
          } else {
            // Other attackers make runs
            p.vx = 0.8 + Math.sin(Date.now() * 0.005 + p.id) * 0.2;
            p.vy = Math.cos(Date.now() * 0.006 + p.id) * 0.8;
          }
        } else {
          // Defenders
          if (
            ball.holderId &&
            players.find((pl) => pl.id === ball.holderId)?.team === "attack"
          ) {
            // Move toward ball holder
            const holder = players.find((pl) => pl.id === ball.holderId)!;
            p.vx = -1.0;
            p.vy = (holder.y - p.y) * 0.03;
          } else {
            p.vx = -0.4;
            p.vy = Math.sin(Date.now() * 0.004 + p.id) * 0.5;
          }
        }

        // Apply velocity
        p.x += p.vx;
        p.y += p.vy;

        // Keep within field bounds
        p.x = Math.max(40, Math.min(dimensions.width - 80, p.x));
        p.y = Math.max(40, Math.min(dimensions.height - 40, p.y));
      });

      // Update ball position if held
      if (ball.holderId !== null) {
        const holder = players.find((p) => p.id === ball.holderId);
        if (holder && !holder.celebrating) {
          ball.x = holder.x;
          ball.y = holder.y - 20;
        } else {
          // If holder is celebrating, release ball
          ball.holderId = null;
          if (holder) holder.hasBall = false;
        }
      } else {
        // Ball free movement
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vy += 0.1; // gravity
        // Bounce and friction
        if (ball.y + ball.radius > dimensions.height - 20) {
          ball.y = dimensions.height - 20 - ball.radius;
          ball.vy *= -0.6;
          ball.vx *= 0.9;
        }
        if (ball.x - ball.radius < 0) {
          ball.x = ball.radius;
          ball.vx *= -0.5;
        }
        if (ball.x + ball.radius > dimensions.width) {
          ball.x = dimensions.width - ball.radius;
          ball.vx *= -0.5;
        }

        // Check if defender can pick up ball
        players.forEach((p) => {
          if (p.team === "defense" && !p.celebrating) {
            const dx = p.x - ball.x;
            const dy = p.y - ball.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 25) {
              ball.holderId = p.id;
              p.hasBall = true;
              ball.vx = 0;
              ball.vy = 0;
            }
          }
        });
      }

      // Passing logic
      const holder = players.find((p) => p.id === ball.holderId);
      if (
        holder &&
        holder.team === "attack" &&
        !hasScored &&
        !holder.celebrating
      ) {
        const defendersNear = players.filter(
          (p) =>
            p.team === "defense" &&
            Math.hypot(p.x - holder.x, p.y - holder.y) < 60,
        );
        if (defendersNear.length > 1) {
          // Find another attacker to pass to
          const teammates = players.filter(
            (p) => p.team === "attack" && p.id !== holder.id && !p.celebrating,
          );
          if (teammates.length > 0) {
            const target =
              teammates[Math.floor(Math.random() * teammates.length)];
            ball.holderId = target.id;
            holder.hasBall = false;
            target.hasBall = true;
          }
        }
      }

      // Shooting
      if (
        holder &&
        holder.team === "attack" &&
        !hasScored &&
        !holder.celebrating
      ) {
        if (holder.x > dimensions.width - 250) {
          // Shoot!
          ball.holderId = null;
          holder.hasBall = false;
          ball.vx = 9 + Math.random() * 3;
          ball.vy = (Math.random() - 0.5) * 6;
        }
      }

      // Goal detection
      if (
        !hasScored &&
        ball.x + ball.radius > goal.x &&
        ball.y > goal.y &&
        ball.y < goal.y + goal.height
      ) {
        setHasScored(true);
        setScore((prev) => ({ ...prev, attack: prev.attack + 1 }));
        onGoal?.();

        // Find who scored (last holder)
        const scorer = players.find((p) => p.id === ball.holderId) || holder;
        if (scorer) {
          scorer.celebrating = true;
          scorer.celebrationTimer = 60; // celebrate for ~1 second (60 frames at 60fps)
          // Also make nearby teammates celebrate
          players.forEach((p) => {
            if (p.team === "attack" && Math.abs(p.x - scorer.x) < 100) {
              p.celebrating = true;
              p.celebrationTimer = 50;
            }
          });
        }

        // Explosion particles
        for (let i = 0; i < 50; i++) {
          particlesRef.current.push({
            x: ball.x,
            y: ball.y,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 0.5) * 12 - 4,
            life: 1,
            color: ["#00d4ff", "#b026ff", "#ff006e", "#39ff14"][
              Math.floor(Math.random() * 4)
            ],
          });
        }

        // Reset after 3 seconds
        setTimeout(() => {
          setHasScored(false);
          particlesRef.current = [];
          // Reset players and ball to starting positions
          const attack = players.filter((p) => p.team === "attack");
          const defense = players.filter((p) => p.team === "defense");
          attack.forEach((p, i) => {
            p.x = 150 + i * 70;
            p.y = dimensions.height / 2 - 30 + (i % 2 === 0 ? -20 : 20);
            p.vx = 0;
            p.vy = 0;
            p.hasBall = i === 0;
            p.celebrating = false;
          });
          defense.forEach((p, i) => {
            p.x = dimensions.width - 250 + i * 70;
            p.y = dimensions.height / 2 - 30 + i * 30;
            p.vx = 0;
            p.vy = 0;
            p.hasBall = false;
            p.celebrating = false;
          });
          ball.holderId = attack[0].id;
          ball.x = attack[0].x;
          ball.y = attack[0].y - 20;
          ball.vx = 0;
          ball.vy = 0;
        }, 3000);
      }
    };

    // Drawing functions
    const drawField = () => {
      // Grass gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, dimensions.height);
      gradient.addColorStop(0, "#1a4d1a");
      gradient.addColorStop(1, "#0f3a0f");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Field lines
      ctx.strokeStyle = "#00d4ff";
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.4;

      // Halfway line
      ctx.beginPath();
      ctx.moveTo(dimensions.width / 2, 0);
      ctx.lineTo(dimensions.width / 2, dimensions.height);
      ctx.stroke();

      // Center circle
      ctx.beginPath();
      ctx.arc(dimensions.width / 2, dimensions.height / 2, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Center spot
      ctx.beginPath();
      ctx.arc(dimensions.width / 2, dimensions.height / 2, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#00d4ff";
      ctx.fill();

      // Penalty area
      ctx.strokeRect(
        dimensions.width - 200,
        dimensions.height / 2 - 100,
        150,
        200,
      );

      // Goal
      ctx.shadowColor = "#b026ff";
      ctx.shadowBlur = 15;
      ctx.lineWidth = 8;
      ctx.strokeStyle = "#b026ff";
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.moveTo(goal.x, goal.y);
      ctx.lineTo(goal.x, goal.y + goal.height);
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const drawPlayer = (p: Player) => {
      const isCelebrating = p.celebrating;
      const headRadius = 12;
      const bodyLength = 25;
      const armLength = 18;
      const legLength = 20;

      ctx.save();
      ctx.translate(p.x, p.y);

      // Determine if player is running or celebrating
      let legPhase = 0;
      if (!isCelebrating) {
        legPhase = Math.sin(Date.now() * 0.02 + p.id) * 0.5; // running cycle
      }

      // Shadow
      ctx.shadowColor = p.team === "attack" ? "#ff006e" : "#00d4ff";
      ctx.shadowBlur = 15;

      // Draw body (torso)
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, bodyLength);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 4;
      ctx.stroke();

      // Head
      ctx.beginPath();
      ctx.arc(0, -headRadius, headRadius, 0, Math.PI * 2);
      ctx.fillStyle = p.team === "attack" ? "#ff006e" : "#00d4ff";
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Eyes
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(-4, -headRadius - 2, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(4, -headRadius - 2, 2, 0, Math.PI * 2);
      ctx.fill();

      // Arms
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(-armLength, isCelebrating ? -10 : 15 + legPhase * 5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, 10);
      ctx.lineTo(armLength, isCelebrating ? -10 : 15 - legPhase * 5);
      ctx.stroke();

      // Legs
      ctx.beginPath();
      ctx.moveTo(0, bodyLength);
      ctx.lineTo(
        -legLength,
        bodyLength + 15 + (isCelebrating ? 0 : legPhase * 8),
      );
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, bodyLength);
      ctx.lineTo(
        legLength,
        bodyLength + 15 - (isCelebrating ? 0 : legPhase * 8),
      );
      ctx.stroke();

      // If celebrating, draw a slide line
      if (isCelebrating) {
        ctx.strokeStyle = "#39ff14";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-15, bodyLength + 20);
        ctx.lineTo(15, bodyLength + 20);
        ctx.stroke();
      }

      // Jersey number
      ctx.shadowBlur = 0;
      ctx.fillStyle = "white";
      ctx.font = "bold 10px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(p.number.toString(), 0, -headRadius - 5);

      // Ball indicator (if has ball)
      if (p.hasBall) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#39ff14";
        ctx.beginPath();
        ctx.arc(0, -headRadius - 15, 6, 0, Math.PI * 2);
        ctx.fillStyle = "#39ff14";
        ctx.fill();
      }

      ctx.restore();
    };

    const drawBall = () => {
      const b = ballRef.current;
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#00d4ff";

      // Draw classic football pattern
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = "#f5f5f5";
      ctx.fill();

      // Black pentagons
      ctx.fillStyle = "#222";
      for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2 + Date.now() * 0.01;
        const px = b.x + Math.cos(angle) * b.radius * 0.6;
        const py = b.y + Math.sin(angle) * b.radius * 0.6;
        ctx.beginPath();
        ctx.arc(px, py, b.radius * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };

    const drawParticles = () => {
      particlesRef.current = particlesRef.current.filter((p) => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life -= 0.01;
        return p.life > 0;
      });
    };

    const animate = () => {
      updateGame();
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      drawField();
      playersRef.current.forEach(drawPlayer);
      drawBall();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationRef.current!);
  }, [dimensions, hasScored, onGoal]);

  const handleCanvasClick = () => {
    // User can trigger a shot if attacker has ball
    const holder = playersRef.current.find(
      (p) => p.id === ballRef.current.holderId,
    );
    if (holder && holder.team === "attack" && !hasScored) {
      ballRef.current.holderId = null;
      holder.hasBall = false;
      ballRef.current.vx = 11;
      ballRef.current.vy = (Math.random() - 0.5) * 7;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-96 rounded-lg overflow-hidden border-2 border-neon-cyan/30 cursor-pointer group"
      onClick={handleCanvasClick}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Score display */}
      <div className="absolute top-2 left-2 text-neon-cyan font-mono text-sm bg-black/50 px-2 py-1 rounded">
        {score.attack} - {score.defense}
      </div>

      {/* Goal celebration text */}
      {hasScored && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.h3
            className="text-5xl font-black font-mono text-neon-green"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            GOAL!!!
          </motion.h3>
        </motion.div>
      )}

      {/* Hover hint */}
      <div className="absolute bottom-2 right-2 text-white/50 font-mono text-xs bg-black/30 px-2 py-1 rounded">
        Click to shoot
      </div>
    </div>
  );
};

export default FootballAnimation;
