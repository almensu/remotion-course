import {Composition, Folder} from "remotion";
import {CourseMap} from "./CourseMap";
import {CompositionDemo, DeterminismDemo, FrameFunctionDemo, LayoutCoordinatesDemo, ReactCanvasDemo, TimeFpsDemo} from "./demos";

const VIDEO = {width: 1920, height: 1080, fps: 30};

export const RemotionRoot = () => <>
  <Composition id="Course-Map" component={CourseMap} durationInFrames={210} {...VIDEO} />
  <Folder name="00-05 Foundations">
    <Composition id="00-FrameFunction" component={FrameFunctionDemo} durationInFrames={150} {...VIDEO} />
    <Composition id="01-ReactCanvas" component={ReactCanvasDemo} durationInFrames={150} {...VIDEO} />
    <Composition id="02-Composition" component={CompositionDemo} durationInFrames={150} {...VIDEO} />
    <Composition id="03-TimeFps" component={TimeFpsDemo} durationInFrames={150} {...VIDEO} />
    <Composition id="04-Determinism" component={DeterminismDemo} durationInFrames={150} {...VIDEO} />
    <Composition id="05-LayoutCoordinates" component={LayoutCoordinatesDemo} durationInFrames={150} {...VIDEO} />
  </Folder>
</>;
