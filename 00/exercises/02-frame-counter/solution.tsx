import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";

export const FrameCounter = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const seconds = frame / fps;
  return <AbsoluteFill style={{backgroundColor: "#070b14", color: "#e8ecf6", justifyContent: "center", alignItems: "center", fontSize: 64, gap: 18}}>
    <div>frame = {frame}</div>
    <div>seconds = {seconds.toFixed(2)}</div>
    <div>fps = {fps}</div>
    <div>duration = {durationInFrames} frames</div>
  </AbsoluteFill>;
};
