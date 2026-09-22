import {AbsoluteFill, Easing, interpolate, random, useCurrentFrame, useVideoConfig} from "remotion";
import {Pill, Stage} from "./shared";
import {theme} from "./theme";

export const FrameFunctionDemo = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const progress = frame / (durationInFrames - 1);
  return <Stage lesson="00" title="视频是一系列可以独立计算的画面">
    <div style={{width: "100%"}}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "end"}}>
        <div style={{fontSize: 160, fontWeight: 800, color: theme.cyan}}>{frame}</div>
        <div style={{fontSize: 42, color: theme.muted}}>{(frame / fps).toFixed(2)} sec</div>
      </div>
      <div style={{height: 24, background: theme.panel, borderRadius: 999, overflow: "hidden", marginTop: 36}}><div style={{height: "100%", width: `${progress * 100}%`, background: theme.cyan}} /></div>
      <div style={{fontSize: 32, marginTop: 34}}>FrameImage = f(frame, fps, props, assets)</div>
    </div>
  </Stage>;
};

export const ReactCanvasDemo = () => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, 45], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1)});
  return <Stage lesson="01" title="React 组件描述这一帧有什么">
    <div style={{display: "flex", gap: 28, alignItems: "center", opacity: reveal, scale: 0.92 + reveal * 0.08}}>
      <Pill color={theme.violet}>Component</Pill><div style={{fontSize: 42}}>+</div><Pill color={theme.blue}>Props</Pill><div style={{fontSize: 42}}>+</div><Pill color={theme.orange}>Frame</Pill><div style={{fontSize: 42}}>=</div><Pill color={theme.cyan}>Image</Pill>
    </div>
  </Stage>;
};

export const CompositionDemo = () => {
  const {width, height, fps, durationInFrames} = useVideoConfig();
  const values = [["width", `${width}px`], ["height", `${height}px`], ["fps", `${fps}`], ["duration", `${durationInFrames}f`]];
  return <Stage lesson="02" title="Composition 定义一件可渲染作品">
    <div style={{display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22, width: "100%"}}>{values.map(([key, value]) => <div key={key} style={{background: theme.panel, borderRadius: 26, padding: 34, border: `1px solid ${theme.blue}44`}}><div style={{color: theme.muted, fontSize: 22}}>{key}</div><div style={{fontSize: 52, fontWeight: 750, marginTop: 18}}>{value}</div></div>)}</div>
  </Stage>;
};

export const TimeFpsDemo = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;
  const x = Math.min(seconds / 5, 1) * 1320;
  return <Stage lesson="03" title="秒表达意图，帧表达采样位置">
    <div style={{width: 1450}}>
      <div style={{display: "flex", justifyContent: "space-between", fontSize: 28, color: theme.muted}}><span>0 sec</span><span>{seconds.toFixed(2)} sec</span><span>5 sec</span></div>
      <div style={{height: 10, background: theme.panel, marginTop: 34, position: "relative"}}><div style={{position: "absolute", left: x, top: -25, width: 60, height: 60, borderRadius: "50%", background: theme.orange}} /></div>
      <div style={{fontSize: 34, marginTop: 90}}>position = speed × frame / fps</div>
    </div>
  </Stage>;
};

export const DeterminismDemo = () => {
  const frame = useCurrentFrame();
  const dots = Array.from({length: 18}, (_, i) => ({x: random(`x-${frame}-${i}`) * 1400, y: random(`y-${frame}-${i}`) * 450, size: 12 + random(`s-${frame}-${i}`) * 24}));
  return <Stage lesson="04" title="相同输入，必须得到相同画面">
    <div style={{position: "relative", width: 1500, height: 500, background: theme.panel, borderRadius: 28, overflow: "hidden"}}>{dots.map((dot, i) => <div key={i} style={{position: "absolute", left: dot.x, top: dot.y, width: dot.size, height: dot.size, borderRadius: "50%", background: theme.violet}} />)}<div style={{position: "absolute", left: 28, bottom: 24, fontSize: 26, color: theme.muted}}>seed = frame + objectId · frame {frame}</div></div>
  </Stage>;
};

export const LayoutCoordinatesDemo = () => {
  const frame = useCurrentFrame();
  const localX = interpolate(frame, [0, 120], [0, 520], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.ease)});
  return <Stage lesson="05" title="父层建立局部坐标，子层只关心自己的位置">
    <div style={{display: "flex", gap: 42, width: "100%", alignItems: "center"}}>
      <div style={{position: "relative", width: 700, height: 380, borderRadius: 28, background: theme.panel, border: `1px solid ${theme.blue}55`}}><div style={{position: "absolute", left: 65 + localX, top: 145, width: 90, height: 90, borderRadius: 22, background: theme.cyan}} /><div style={{position: "absolute", left: 22, top: 18, color: theme.muted, fontSize: 22}}>parent coordinate space</div></div>
      <div style={{fontSize: 34, lineHeight: 1.7}}><div>Canvas → Scene → Layer</div><div style={{color: theme.muted}}>位置总要回答：相对于谁？</div></div>
    </div>
  </Stage>;
};
