import {AbsoluteFill, useVideoConfig} from "remotion";

export const Exercise = () => {
  const {width, height, fps, durationInFrames} = useVideoConfig();
  return <AbsoluteFill style={{justifyContent: "center", alignItems: "center", fontSize: 56}}>
    {width}×{height} · {fps} FPS · {durationInFrames / fps} sec
  </AbsoluteFill>;
};
// 在 Root.tsx 用 <Composition> 注册 width、height、fps、durationInFrames 与 component。
