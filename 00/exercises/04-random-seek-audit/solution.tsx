import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";

export const RandomSeekAudit = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const startXPx = 120;
  const speedPxPerSecond = 240;
  const positionXPx = startXPx + speedPxPerSecond * frame / fps;
  return <AbsoluteFill style={{backgroundColor: "#070b14"}}>
    <div style={{position: "absolute", left: positionXPx, top: 500, width: 80, height: 80, borderRadius: 18, backgroundColor: "#fb923c"}} />
  </AbsoluteFill>;
};
