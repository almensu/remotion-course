import {AbsoluteFill, Composition} from "remotion";

export const MinimumComposition = () => (
  <AbsoluteFill style={{backgroundColor: "#070b14", color: "white", justifyContent: "center", alignItems: "center", fontSize: 72}}>
    My first renderable video
  </AbsoluteFill>
);

export const ExampleRoot = () => (
  <Composition id="00-01-MinimumComposition" component={MinimumComposition} width={1920} height={1080} fps={30} durationInFrames={150} />
);
