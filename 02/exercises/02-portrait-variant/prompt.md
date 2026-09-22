# Semantic Prompt

请用 Remotion + React 完成“竖版变体”。

要求：使用有语义的变量名；所有运动由 `useCurrentFrame()` 和 `useVideoConfig()` 推导；明确 frame、second、pixel 的单位；不使用 CSS animation、CSS transition、当前时间、未固定种子的随机数或跨帧累积状态；关键参数来自 `params.json`；代码保持可见、直接可改；说明需要检查的边界帧。

任务语义：复用组件创建 1080×1920 的 Composition，并修正布局。
