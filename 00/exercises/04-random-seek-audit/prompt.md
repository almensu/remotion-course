# Semantic Prompt｜Random Seek Audit：验证任意跳帧

请使用Remotion与React完成以下练习：

制作一个恒速移动方块，直接访问任意frame都得到可预测位置，并记录5个审计帧。

约束：

- 使用 `useCurrentFrame()` 读取当前帧。
- 需要视频规格时使用 `useVideoConfig()`。
- 所有随时间变化的属性都必须由frame直接计算。
- 不使用CSS animation、CSS transition、`Date.now()`、定时器或跨帧累积状态。
- 明确frame、second、pixel的单位。
- 参数来自 `params.json`，变量名表达真实含义。
- 代码保持小而直接，不能用额外动画库隐藏因果关系。
- 给出第0帧、中间帧、最后一帧的预期结果。
