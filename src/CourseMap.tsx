import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import {fontFamily, theme} from "./theme";

const phases = [
  ["00—05", "时间与画面"], ["06—11", "运动系统"], ["12—17", "镜头组织"],
  ["18—23", "完整作品"], ["24—29", "视频系统"],
];

export const CourseMap = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{background: theme.canvas, color: theme.ink, fontFamily, padding: 80}}>
    <div style={{fontSize: 24, color: theme.cyan, letterSpacing: 3}}>REMOTION WORLDVIEW COURSE</div>
    <div style={{fontSize: 76, fontWeight: 800, marginTop: 18}}>30 轮程序化动效世界观</div>
    <div style={{fontSize: 30, color: theme.muted, marginTop: 20}}>FrameImage = f(frame, fps, props, assets)</div>
    <div style={{display: "flex", gap: 20, marginTop: 90}}>
      {phases.map(([range, label], index) => <div key={range} style={{flex: 1, minHeight: 260, padding: 28, borderRadius: 28, border: `1px solid ${theme.blue}55`, background: theme.panel, opacity: interpolate(frame, [index * 12, index * 12 + 18], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"}), translate: `0 ${interpolate(frame, [index * 12, index * 12 + 18], [40, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}px`}}>
        <div style={{fontSize: 24, color: theme.cyan}}>{range}</div>
        <div style={{fontSize: 34, fontWeight: 700, marginTop: 60}}>{label}</div>
      </div>)}
    </div>
  </AbsoluteFill>;
};
