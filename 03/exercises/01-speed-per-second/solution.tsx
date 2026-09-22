import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";

export const Exercise = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const speedPxPerSec = 240;
  const xPx = speedPxPerSec * frame / fps;
  return <AbsoluteFill><div style={{position: "absolute", left: xPx, top: 480, width: 80, height: 80, background: "#fb923c"}} /></AbsoluteFill>;
};
