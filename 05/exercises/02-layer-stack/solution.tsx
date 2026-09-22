import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";

export const Exercise = () => {
  const frame = useCurrentFrame();
  const localX = interpolate(frame, [0, 120], [0, 520], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
  return <AbsoluteFill style={{justifyContent: "center", alignItems: "center"}}><div style={{position: "relative", width: 700, height: 380, background: "#111827", overflow: "hidden"}}><div style={{position: "absolute", left: localX, top: 145, width: 90, height: 90, background: "#5eead4"}} /></div></AbsoluteFill>;
};
