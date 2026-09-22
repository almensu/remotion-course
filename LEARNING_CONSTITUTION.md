# Remotion AI Learning Constitution

> Status: Supreme learning contract  
> Scope: every lesson, exercise, AI-generated implementation, preview and render in this repository.

## 0. Canonical learning loop

    Learning goal
    → Motion intent
    → Semantic prompt
    → AI writes Remotion code
    → Learner reads visible code
    → Learner scrubs the timeline
    → Learner changes named parameters
    → Learner predicts and observes the result
    → Frame / motion / render audit
    → Transferable understanding

## Article I — Time model before API

每道题必须先回答：什么在变化、从何时开始、持续多久、由哪个参数控制、某一帧应该出现什么。不要从“调用哪个函数”开始。

## Article II — Video is a deterministic frame function

课程默认模型是 `FrameImage = f(frame, fps, props, assets)`。相同输入必须得到相同画面。不得使用 CSS animation、CSS transition、`Date.now()`、未固定种子的 `Math.random()` 或依赖上一帧累积的隐藏状态驱动画面。

## Article III — AI writes; the learner audits

AI 可以写样板代码。学习者必须检查时间含义、参数含义、边界帧、视觉结果与导出结果，并能预测改动前后的差异。

## Article IV — Code stays visible

实验必须暴露决定画面的关键代码。抽象只有在缩短反馈路径时才允许出现。当前概念不能被工具函数、动画库或组件封装遮住。

## Article V — Semantic parameters are first-class

使用 `introDurationSec`、`titleStartFrame`、`cardGapPx`、`springDamping` 等名字。禁止让有学习意义的值散落成无解释数字。

## Article VI — Frames, seconds and pixels carry units

每个时间值必须说明是 frame 还是 second；每个画布和布局值必须说明是 pixel、percentage 或其他单位。换算集中在清晰边界：`seconds * fps`。

## Article VII — Composition, scene and layer are different responsibilities

Composition 定义可渲染作品与视频规格；Scene 表达一个叙事段落；Layer 表达同一时刻的画面叠加。实验不得混淆三者。

## Article VIII — One exercise, one dominant causal idea

练习可以复用旧知识，每次只引入一个主要未知量。不要让初学者在同一道题里同时发现 spring、字幕、音频、转场、远程渲染与 Three.js。

## Article IX — Scrubbing is an audit tool

学习者必须检查起始帧、中间帧、结束前一帧和片段边界。播放顺畅不能替代逐帧检查。

## Article X — Separate motion meaning from visual styling

先定义出现、停留、离开及其节奏，再处理颜色、阴影和装饰。视觉样式不得掩盖错误的时间结构。

## Article XI — Assets are explicit dependencies

字体、图片、音频、视频与数据必须有稳定引用和加载边界。渲染开始前需要的资源必须就绪，不依赖偶然网络状态。

## Article XII — Prompt is curriculum

提示词需要表达画布规格、时长、对象层级、时间区间、运动意图、可编辑参数、边界行为和审计点。提示词质量属于学习结果。

## Article XIII — Default AI coding harness

AI 生成代码默认必须：使用 `useCurrentFrame()` 与 `useVideoConfig()`；把有意义的数值参数化；为 `interpolate()` 明确 clamp；用 frame 推导画面；保持组件命名清晰；不使用 CSS 时间动画；不依赖浏览器实时钟；素材经 `staticFile()` 或明确输入传入。

## Article XIV — Three audits

Prompt audit 检查意图、单位、区间和边界是否清楚。Code audit 检查时间是否确定、参数是否有语义、层级是否可读。Runtime audit 检查关键帧、任意跳转、不同 FPS 及渲染结果是否符合预测。

## Article XV — Reflection must be causal

反思问题必须解释因果，例如“为什么第 60 帧仍然稳定停在终点”，而不是仅问“学到了什么”。

## Article XVI — Progressive disclosure

前期只使用 React、frame、fps、Composition 和基础布局。随后才进入 spring、Sequence、媒体、参数化、Player、云端或批量渲染。

## Article XVII — Studio is replaceable; course assets are durable

长期资产是学习目标、语义提示词、参数契约、可见代码、关键帧证据和审计规则。工具界面可以替换。

## Article XVIII — Complexity must pay rent

新增依赖、抽象或编辑器功能必须缩短“意图到可观察结果”的路径，否则省略。

## Article XIX — Inspectable failure is useful

允许学习者看到越界插值、闪帧、素材未加载、片段错位与非确定性结果，并要求定位造成失败的输入或代码。

## Article XX — Completion means transfer

完成一课意味着学习者可以用白话解释概念、写出有语义的提示词、指出关键代码、预测参数修改结果，并在新作品中复用模型。
