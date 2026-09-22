# 01｜React / JSX：用组件描述一帧画面

## 费曼类比

React 组件像一张镜头布置单：这一帧有哪些文字、图形和层级。Props 是导演交给镜头的内容，frame 是时间位置，返回的 JSX 是最终布置。

## 核心模型

    Component(props, frame) → JSX tree → pixels

JSX 描述结构，style 描述视觉属性。组件拆分应跟画面语义一致，例如 `TitleCard`、`MetricRow`、`LogoMark`，而不是 `Box1`、`Thing2`。

## 为什么要组件化

组件让相同视觉规则接收不同数据，并使层级可读。但过早封装会隐藏 frame 到属性的因果链。第一次学习淡入时，`interpolate()` 应直接出现在学习者能看到的位置。

## 参数实验

改变标题、主题色和出现时长，检查结构是否保持稳定；再给组件增加 `startFrame`，明确它是全局帧还是局部帧。

## 本轮结论

> React 决定这一帧“有什么”，Remotion 提供这一帧“在什么时候”。


## 本轮练习

1. [01-01｜语义卡片组件](exercises/01-semantic-card/)
2. [01-02｜同构多内容](exercises/02-props-variation/)

每道题固定保留 `task.md`、`prompt.md`、`params.json`、`solution.tsx` 与 `audit.md`，形成可追溯学习证据。
