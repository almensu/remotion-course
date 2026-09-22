import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";

type ProgressCardProps = {label: string; progress: number; accentColor: string};
const ProgressCard = ({label, progress, accentColor}: ProgressCardProps) => <article style={{width: 1200, padding: 46, borderRadius: 28, backgroundColor: "#111827"}}><div style={{display: "flex", justifyContent: "space-between", fontSize: 30}}><span>{label}</span><span>{Math.round(progress * 100)}%</span></div><div style={{height: 34, marginTop: 28, borderRadius: 999, backgroundColor: "#263244", overflow: "hidden"}}><div style={{height: "100%", width: `${progress * 100}%`, backgroundColor: accentColor}} /></div></article>;

export const FrameAwareBoundary = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const progress = frame / Math.max(1, durationInFrames - 1);
  return <AbsoluteFill style={{backgroundColor: "#070b14", color: "#e8ecf6", justifyContent: "center", alignItems: "center"}}><ProgressCard label="Course progress" progress={progress} accentColor="#5eead4" /></AbsoluteFill>;
};
