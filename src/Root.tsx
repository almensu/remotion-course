import {Composition, Folder} from "remotion";
import {FrameCounter, FrameToProperty, MinimumComposition, RandomSeekAudit} from "./Lesson00";

const video = {width: 1920, height: 1080, fps: 30, durationInFrames: 150};

export const RemotionRoot = () => <Folder name="00 Remotion Worldview">
  <Composition id="00-01-MinimumComposition" component={MinimumComposition} {...video} />
  <Composition id="00-02-FrameCounter" component={FrameCounter} {...video} />
  <Composition id="00-03-FrameToProperty" component={FrameToProperty} {...video} />
  <Composition id="00-04-RandomSeekAudit" component={RandomSeekAudit} {...video} />
</Folder>;
