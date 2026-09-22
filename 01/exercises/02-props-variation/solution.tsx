import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";

const TitleCard = ({title, accent}: {title: string; accent: string}) => {
  const frame = useCurrentFrame();
  return <div style={{border: `2px solid ${accent}`, padding: 40, borderRadius: 24, opacity: interpolate(frame, [0, 30], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}}>{title}</div>;
};
export const Exercise = () => <AbsoluteFill style={{justifyContent: "center", alignItems: "center", fontSize: 64}}><TitleCard title="Frame Function" accent="#5eead4" /></AbsoluteFill>;
