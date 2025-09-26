import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";

const sweep = keyframes`
  0% { background-position: 0 0, 0 0; }
  100% { background-position: 200% 200%, 200% 200%; }
`;

const drift = keyframes`
  0%   { transform: translate3d(var(--xStart), var(--yStart), 0) rotate(0deg); opacity: .18; }
  50%  { transform: translate3d(calc(var(--xStart) + var(--xDelta)), calc(var(--yStart) + var(--yDelta)), 0) rotate(10deg); opacity: .30; }
  100% { transform: translate3d(calc(var(--xStart) + var(--xDelta) * 2), calc(var(--yStart) + var(--yDelta) * 2), 0) rotate(0deg); opacity: .18; }
`;

type Piece = {
  size: number;
  xStart: string;
  yStart: string;
  xDelta: string;
  yDelta: string;
  duration: number;
  delay: number;
  blur: number;
  hue: number;
};

function makePieces(count = 16): Piece[] {
  const rnd = (a: number, b: number) => Math.random() * (b - a) + a;
  return Array.from({ length: count }).map(() => ({
    size: rnd(22, 42),
    xStart: `${rnd(-10, 95).toFixed(2)}vw`,
    yStart: `${rnd(-8, 85).toFixed(2)}vh`,
    xDelta: `${rnd(-8, 8).toFixed(2)}vw`,
    yDelta: `${rnd(-5, 6).toFixed(2)}vh`,
    duration: rnd(22, 36),
    delay: rnd(-24, 0),
    blur: rnd(0, 1.8),
    hue: rnd(35, 70),
  }));
}
const PIECES = makePieces();

export default function FuturaBackground() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",

        background:
          "radial-gradient(1200px 600px at 50% 120%, rgba(247,191,41,0.08), transparent 60%), linear-gradient(180deg, #0B0F17 0%, #080B12 100%)",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(transparent 97%, rgba(90,255,200,.25) 98%),
            linear-gradient(90deg, transparent 97%, rgba(90,255,200,.25) 98%)
          `,
          backgroundSize: "32px 32px, 32px 32px",
          mixBlendMode: "screen",
          animation: `${sweep} 26s linear infinite`,
          opacity: 0.25,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          boxShadow: "inset 0 -140px 180px rgba(0,0,0,.55)",
        },
      }}
    >
      {PIECES.map((p, i) => (
        <Box
          key={i}
          sx={
            {
              position: "absolute",
              filter: `blur(${p.blur}px) drop-shadow(0 0 6px hsla(${p.hue},90%,60%,.25))`,
              fontSize: `${p.size}px`,
              lineHeight: 1,
              color: "transparent",
              textShadow: `0 0 0 hsla(${p.hue},95%,65%,.9)`,
              "--xStart": p.xStart,
              "--yStart": p.yStart,
              "--xDelta": p.xDelta,
              "--yDelta": p.yDelta,
              animation: `${drift} ${p.duration}s ${p.delay}s linear infinite`,
              userSelect: "none",
            } as any
          }
        >
          🌽
        </Box>
      ))}
    </Box>
  );
}
