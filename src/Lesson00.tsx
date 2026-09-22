import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";
import {fontFamily, theme} from "./theme";

const Base = ({children, label}: {children: React.ReactNode; label: string}) => <AbsoluteFill style={{backgroundColor: theme.canvas, color: theme.ink, fontFamily, padding: 72}}><div style={{fontSize: 22, color: theme.cyan, letterSpacing: 2}}>00 · REMOTION WORLDVIEW</div><div style={{fontSize: 32, color: theme.muted, marginTop: 10}}>{label}</div><div style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>{children}</div></AbsoluteFill>;

export const MinimumComposition = () => <Base label="一件可渲染的视频作品"><div style={{fontSize: 80, fontWeight: 750}}>1920 × 1080 · 30 FPS · 150 frames</div></Base>;

export const FrameCounter = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  return <Base label="时间轴变得可见"><div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, width: 1200}}>{[["frame", frame], ["seconds", (frame / fps).toFixed(2)], ["fps", fps], ["total frames", durationInFrames]].map(([key, value]) => <div key={key} style={{padding: 34, borderRadius: 26, background: theme.panel}}><div style={{fontSize: 24, color: theme.muted}}>{key}</div><div style={{fontSize: 72, marginTop: 14, fontWeight: 750}}>{value}</div></div>)}</div></Base>;
};

export const FrameToProperty = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const progress = frame / Math.max(1, durationInFrames - 1);
  return <Base label="属性是frame的函数"><div style={{width: 1400}}><div style={{fontSize: 54, fontWeight: 700, marginBottom: 40}}>progress = {progress.toFixed(3)}</div><div style={{height: 44, borderRadius: 999, background: theme.panel, overflow: "hidden"}}><div style={{width: `${progress * 100}%`, height: "100%", background: theme.cyan}} /></div></div></Base>;
};

export const RandomSeekAudit = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const positionXPx = 120 + 240 * frame / fps;
  return <Base label="给定任意frame，直接算出正确位置"><div style={{position: "relative", width: 1600, height: 420, background: theme.panel, borderRadius: 28, overflow: "hidden"}}><div style={{position: "absolute", left: positionXPx, top: 150, width: 96, height: 96, borderRadius: 22, background: theme.orange}} /><div style={{position: "absolute", left: 30, bottom: 25, fontSize: 28}}>x = 120 + 240 × {frame} / {fps} = {positionXPx.toFixed(0)}px</div></div></Base>;
};
