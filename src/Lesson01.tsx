import type {ReactNode} from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";
import {fontFamily, theme} from "./theme";

const Stage = ({label, children}: {label: string; children: ReactNode}) => <AbsoluteFill style={{backgroundColor: theme.canvas, color: theme.ink, fontFamily, padding: 72}}><div style={{fontSize: 22, color: theme.cyan, letterSpacing: 2}}>01 · REACT / JSX</div><div style={{fontSize: 32, color: theme.muted, marginTop: 10}}>{label}</div><div style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>{children}</div></AbsoluteFill>;

export const JSXAnatomy = () => <Stage label="JSX是一棵有意义的画面树"><section style={{width: 1450}}><div style={{fontSize: 24, color: theme.cyan}}>REMOTION WORLDVIEW</div><h1 style={{fontSize: 92, lineHeight: 1.05, margin: "20px 0"}}>A frame is a computed image</h1><p style={{fontSize: 34, color: theme.muted}}>React describes what exists in this frame.</p><div style={{display: "flex", gap: 16, marginTop: 36}}>{["JSX", "Props", "Tree"].map((badge) => <span key={badge} style={{padding: "10px 18px", border: `1px solid ${theme.cyan}`, borderRadius: 999, fontSize: 24}}>{badge}</span>)}</div></section></Stage>;

type MetricCardProps = {label: string; value: string; accentColor: string};
const MetricCard = ({label, value, accentColor}: MetricCardProps) => <article style={{flex: 1, padding: 36, borderRadius: 28, backgroundColor: theme.panel, borderTop: `5px solid ${accentColor}`}}><div style={{fontSize: 26, color: theme.muted}}>{label}</div><div style={{fontSize: 70, fontWeight: 750, marginTop: 18}}>{value}</div></article>;
const metrics = [{id: "views", label: "Views", value: "2.4M", accentColor: theme.cyan}, {id: "likes", label: "Likes", value: "186K", accentColor: "#a78bfa"}, {id: "shares", label: "Shares", value: "32K", accentColor: theme.orange}];
export const PropsContract = () => <Stage label="同一视觉规则，接收不同Props"><div style={{display: "flex", gap: 24, width: 1500}}>{metrics.map(({id, ...metric}) => <MetricCard key={id} {...metric} />)}</div></Stage>;

const SceneBackground = () => <div style={{position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 45%, #183153 0%, #070b14 55%)"}} />;
const TitleBlock = () => <section><div style={{color: theme.cyan, fontSize: 24}}>FRAME / 01</div><h1 style={{fontSize: 92, lineHeight: 1, margin: "22px 0"}}>Motion Engine</h1><p style={{fontSize: 34, color: theme.muted}}>Every frame is explainable.</p></section>;
const ProductHero = () => <div style={{width: 520, height: 520, borderRadius: 120, background: `linear-gradient(135deg, ${theme.cyan}, #60a5fa)`, boxShadow: "0 50px 140px #2563eb55"}} />;
const BrandFooter = () => <footer style={{position: "absolute", left: 96, bottom: 64, fontSize: 22, letterSpacing: 4}}>REMOTION LAB</footer>;
export const SemanticSceneTree = () => <AbsoluteFill style={{backgroundColor: theme.canvas, color: theme.ink, fontFamily, padding: 96}}><SceneBackground /><main style={{zIndex: 1, flex: 1, display: "grid", gridTemplateColumns: "1.2fr 1fr", alignItems: "center"}}><TitleBlock /><ProductHero /></main><BrandFooter /></AbsoluteFill>;

type ProgressCardProps = {label: string; progress: number};
const ProgressCard = ({label, progress}: ProgressCardProps) => <article style={{width: 1200, padding: 46, borderRadius: 28, backgroundColor: theme.panel}}><div style={{display: "flex", justifyContent: "space-between", fontSize: 30}}><span>{label}</span><span>{Math.round(progress * 100)}%</span></div><div style={{height: 34, marginTop: 28, borderRadius: 999, backgroundColor: "#263244", overflow: "hidden"}}><div style={{height: "100%", width: `${progress * 100}%`, backgroundColor: theme.cyan}} /></div></article>;
export const FrameAwareBoundary = () => {const frame = useCurrentFrame(); const {durationInFrames} = useVideoConfig(); const progress = frame / Math.max(1, durationInFrames - 1); return <Stage label="父层计算时间，子层绘制结果"><ProgressCard label="Course progress" progress={progress} /></Stage>;};
