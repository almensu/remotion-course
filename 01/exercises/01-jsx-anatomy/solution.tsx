import {AbsoluteFill} from "remotion";

const badges = ["JSX", "Props", "Tree"];

export const JxsAnatomy = () => (
  <AbsoluteFill style={{backgroundColor: "#070b14", color: "#e8ecf6", padding: 96, justifyContent: "center"}}>
    <section style={{maxWidth: 1400}}>
      <div style={{fontSize: 24, color: "#5eead4"}}>REMOTION WORLDVIEW</div>
      <h1 style={{fontSize: 88, lineHeight: 1.05, margin: "20px 0"}}>A frame is a computed image</h1>
      <p style={{fontSize: 34, color: "#8e99b3"}}>React describes what exists in this frame.</p>
      <div style={{display: "flex", gap: 16, marginTop: 36}}>
        {badges.map((badge) => <span key={badge} style={{padding: "10px 18px", border: "1px solid #5eead4", borderRadius: 999}}>{badge}</span>)}
      </div>
    </section>
  </AbsoluteFill>
);
