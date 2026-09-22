import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";

export const Exercise = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const seconds = frame / fps;
  const progress = frame / Math.max(1, durationInFrames - 1);
  return <AbsoluteFill style={{justifyContent: "center", alignItems: "center", fontSize: 72}}>
    <div>frame {frame}</div><div>{seconds.toFixed(2)} sec</div><div>{Math.round(progress * 100)}%</div>
  </AbsoluteFill>;
};
