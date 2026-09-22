import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";

export const FrameToProperty = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const lastFrame = Math.max(1, durationInFrames - 1);
  const progress = frame / lastFrame;
  return <AbsoluteFill style={{backgroundColor: "#070b14", justifyContent: "center", alignItems: "center"}}>
    <div style={{width: 1200, height: 40, borderRadius: 999, backgroundColor: "#1f2937", overflow: "hidden"}}>
      <div style={{width: `${progress * 100}%`, height: "100%", backgroundColor: "#5eead4"}} />
    </div>
  </AbsoluteFill>;
};
