import type {ReactNode} from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";
import {fontFamily, theme} from "./theme";

const Stage = ({label, children}: {label: string; children: ReactNode}) => (
  <AbsoluteFill style={{backgroundColor: theme.canvas, color: theme.ink, fontFamily, padding: 72}}>
    <div style={{fontSize: 22, color: theme.cyan, letterSpacing: 2}}>02 · COMPOSITION</div>
    <div style={{fontSize: 32, color: theme.muted, marginTop: 10}}>{label}</div>
    <div style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>{children}</div>
  </AbsoluteFill>
);

const FlowNode = ({eyebrow, title, detail}: {eyebrow: string; title: string; detail: string}) => (
  <div style={{flex: 1, minHeight: 220, padding: 28, borderRadius: 26, backgroundColor: theme.panel, border: "1px solid #263244"}}>
    <div style={{fontSize: 20, color: theme.cyan}}>{eyebrow}</div>
    <div style={{fontSize: 34, fontWeight: 750, marginTop: 28}}>{title}</div>
    <div style={{fontSize: 22, color: theme.muted, marginTop: 18, lineHeight: 1.4}}>{detail}</div>
  </div>
);

export const RegistrationFlow = () => (
  <Stage label="从工程入口到当前帧画面">
    <div style={{display: "flex", alignItems: "center", gap: 18, width: 1550}}>
      <FlowNode eyebrow="ENTRY" title="registerRoot" detail="登记作品目录入口" />
      <div style={{fontSize: 42, color: theme.muted}}>→</div>
      <FlowNode eyebrow="CATALOG" title="RemotionRoot" detail="组织可渲染作品" />
      <div style={{fontSize: 42, color: theme.muted}}>→</div>
      <FlowNode eyebrow="CONTRACT" title="Composition" detail="绑定ID与视频规格" />
      <div style={{fontSize: 42, color: theme.muted}}>→</div>
      <FlowNode eyebrow="FRAME" title="Component" detail="生成当前帧画面" />
    </div>
  </Stage>
);

export const ContractInspector = () => {
  const {width, height, fps, durationInFrames} = useVideoConfig();
  const values = [
    ["width", `${width}px`],
    ["height", `${height}px`],
    ["fps", `${fps}`],
    ["duration", `${durationInFrames}f`],
    ["seconds", `${durationInFrames / fps}s`],
    ["last frame", `${durationInFrames - 1}`],
  ];
  return <Stage label="Composition规格是画面可读取的事实"><div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, width: 1450}}>{values.map(([key, value]) => <div key={key} style={{padding: 32, borderRadius: 24, backgroundColor: theme.panel}}><div style={{fontSize: 22, color: theme.muted}}>{key}</div><div style={{fontSize: 54, fontWeight: 750, marginTop: 14}}>{value}</div></div>)}</div></Stage>;
};

export type FormatAwareTitleProps = {
  title: string;
  accentColor: string;
};

export const FormatAwareTitle = ({title, accentColor}: FormatAwareTitleProps) => {
  const {width, height} = useVideoConfig();
  const isPortrait = height > width;
  return <AbsoluteFill style={{background: `radial-gradient(circle at ${isPortrait ? "50% 22%" : "75% 50%"}, ${accentColor}44 0%, ${theme.canvas} 52%)`, color: theme.ink, fontFamily, padding: isPortrait ? 80 : 110, justifyContent: "center", alignItems: isPortrait ? "flex-start" : "center"}}>
    <div style={{maxWidth: isPortrait ? 820 : 1450}}>
      <div style={{fontSize: isPortrait ? 28 : 24, color: accentColor, letterSpacing: 3}}>{isPortrait ? "PORTRAIT · 9:16" : "LANDSCAPE · 16:9"}</div>
      <div style={{fontSize: isPortrait ? 112 : 92, fontWeight: 780, lineHeight: 1.02, marginTop: 28}}>{title}</div>
      <div style={{fontSize: isPortrait ? 34 : 30, color: theme.muted, marginTop: 32}}>{width} × {height} pixels</div>
    </div>
  </AbsoluteFill>;
};

export const DurationBoundary = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const lastFrame = durationInFrames - 1;
  const progress = frame / Math.max(1, lastFrame);
  return <Stage label="总帧数决定合法时间区间"><div style={{width: 1450}}>
    <div style={{display: "flex", justifyContent: "space-between", alignItems: "end"}}>
      <div><div style={{fontSize: 24, color: theme.muted}}>CURRENT FRAME</div><div style={{fontSize: 140, color: theme.cyan, fontWeight: 800}}>{frame}</div></div>
      <div style={{fontSize: 32, lineHeight: 1.7, textAlign: "right"}}><div>{(frame / fps).toFixed(2)} seconds</div><div style={{color: theme.muted}}>valid range: 0 — {lastFrame}</div><div style={{color: theme.muted}}>{fps} FPS · {durationInFrames} frames</div></div>
    </div>
    <div style={{height: 34, marginTop: 42, backgroundColor: theme.panel, borderRadius: 999, overflow: "hidden"}}><div style={{height: "100%", width: `${progress * 100}%`, backgroundColor: theme.cyan}} /></div>
  </div></Stage>;
};
