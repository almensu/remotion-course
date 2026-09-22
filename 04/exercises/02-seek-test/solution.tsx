import {AbsoluteFill, random, useCurrentFrame} from "remotion";

export const Exercise = () => {
  const frame = useCurrentFrame();
  const particles = Array.from({length: 18}, (_, particleId) => ({x: random(`x-${frame}-${particleId}`) * 1800, y: random(`y-${frame}-${particleId}`) * 960}));
  return <AbsoluteFill>{particles.map((p, id) => <div key={id} style={{position: "absolute", left: p.x, top: p.y, width: 18, height: 18, borderRadius: "50%", background: "#a78bfa"}} />)}</AbsoluteFill>;
};
