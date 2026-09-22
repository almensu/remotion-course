import type {ReactNode} from "react";
import {AbsoluteFill} from "remotion";
import {fontFamily, theme} from "./theme";

export const Stage = ({lesson, title, children}: {lesson: string; title: string; children: ReactNode}) => (
  <AbsoluteFill style={{backgroundColor: theme.canvas, color: theme.ink, fontFamily, padding: 72}}>
    <div style={{fontSize: 22, color: theme.cyan, letterSpacing: 2}}>REMOTION WORLDVIEW · {lesson}</div>
    <div style={{fontSize: 58, fontWeight: 750, marginTop: 12, maxWidth: 1450, lineHeight: 1.08}}>{title}</div>
    <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>{children}</div>
  </AbsoluteFill>
);

export const Pill = ({children, color = theme.blue}: {children: ReactNode; color?: string}) => (
  <div style={{padding: "12px 18px", borderRadius: 999, border: `1px solid ${color}88`, color, background: `${color}14`, fontSize: 22}}>{children}</div>
);
