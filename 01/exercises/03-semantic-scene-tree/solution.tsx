import {AbsoluteFill} from "remotion";

const SceneBackground = () => <div style={{position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 45%, #183153 0%, #070b14 55%)"}} />;
const TitleBlock = () => <section><div style={{color: "#5eead4", fontSize: 24}}>FRAME / 01</div><h1 style={{fontSize: 92, lineHeight: 1, margin: "22px 0"}}>Motion Engine</h1><p style={{fontSize: 34, color: "#8e99b3"}}>Every frame is explainable.</p></section>;
const ProductHero = () => <div style={{width: 520, height: 520, borderRadius: 120, background: "linear-gradient(135deg, #5eead4, #60a5fa)", boxShadow: "0 50px 140px #2563eb55"}} />;
const BrandFooter = () => <footer style={{position: "absolute", left: 96, bottom: 64, fontSize: 22, letterSpacing: 4}}>REMOTION LAB</footer>;

export const SemanticSceneTree = () => <AbsoluteFill style={{backgroundColor: "#070b14", color: "#e8ecf6", padding: 96}}><SceneBackground /><main style={{zIndex: 1, flex: 1, display: "grid", gridTemplateColumns: "1.2fr 1fr", alignItems: "center"}}><TitleBlock /><ProductHero /></main><BrandFooter /></AbsoluteFill>;
