import {Composition, Folder} from "remotion";
import {FrameCounter, FrameToProperty, MinimumComposition, RandomSeekAudit} from "./Lesson00";
import {FrameAwareBoundary, JSXAnatomy, PropsContract, SemanticSceneTree} from "./Lesson01";
import {ContractInspector, DurationBoundary, FormatAwareTitle, RegistrationFlow} from "./Lesson02";

const video = {width: 1920, height: 1080, fps: 30, durationInFrames: 150};

export const RemotionRoot = () => <>
<Folder name="00 Remotion Worldview">
  <Composition id="00-01-MinimumComposition" component={MinimumComposition} {...video} />
  <Composition id="00-02-FrameCounter" component={FrameCounter} {...video} />
  <Composition id="00-03-FrameToProperty" component={FrameToProperty} {...video} />
  <Composition id="00-04-RandomSeekAudit" component={RandomSeekAudit} {...video} />
</Folder>
<Folder name="01 React JSX">
  <Composition id="01-01-JSXAnatomy" component={JSXAnatomy} {...video} />
  <Composition id="01-02-PropsContract" component={PropsContract} {...video} />
  <Composition id="01-03-SemanticSceneTree" component={SemanticSceneTree} {...video} />
  <Composition id="01-04-FrameAwareBoundary" component={FrameAwareBoundary} {...video} />
</Folder>
<Folder name="02 Composition">
  <Composition id="02-01-RegistrationFlow" component={RegistrationFlow} width={1920} height={1080} fps={30} durationInFrames={150} />
  <Composition id="02-02-ContractInspector" component={ContractInspector} width={1920} height={1080} fps={30} durationInFrames={150} />
  <Composition id="02-03-LandscapeVariant" component={FormatAwareTitle} width={1920} height={1080} fps={30} durationInFrames={150} defaultProps={{title: "One component, two products", accentColor: "#5eead4"}} />
  <Composition id="02-04-PortraitVariant" component={FormatAwareTitle} width={1080} height={1920} fps={30} durationInFrames={150} defaultProps={{title: "One component, two products", accentColor: "#a78bfa"}} />
  <Composition id="02-05-DurationBoundary" component={DurationBoundary} width={1920} height={1080} fps={24} durationInFrames={96} />
</Folder>
</>;
