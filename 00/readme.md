# 00｜Remotion Worldview：视频是时间的可计算画面

## 费曼类比

把 Remotion 看成一台可以瞬间跳到任意时刻的摄影机。普通播放器先经过前面的时间才到达后面的时间；Remotion 在渲染第 87 帧时，会直接问组件：“输入 frame=87，此刻画面长什么样？”

## 核心模型

    frame + fps + props + assets
    ↓
    React component
    ↓
    one image

视频只是把这些图像按 FPS 排列起来。`useCurrentFrame()` 给出当前帧，第一帧为 0。代码不应该依靠“上一帧做了什么”才能得到下一帧。

## 关键区分

- Frame 是离散编号。
- Time 是连续概念，常用 `frame / fps` 换算为秒。
- Playback 是观看过程。
- Render 是对每个目标帧独立求值并编码。

## 参数实验

把总时长从 150 帧改为 300 帧，观察进度条如何变化；再把 FPS 从 30 改为 60，预测第 90 帧对应的秒数。必须先预测，再运行。

## 本轮结论

> Remotion 不是让浏览器自己播放动画，而是用 React 函数计算每一帧应该出现的画面。


## 本轮练习

1. [00-01｜逐帧计数器](exercises/01-frame-counter/)
2. [00-02｜关键帧快照](exercises/02-frame-snapshot/)

每道题固定保留 `task.md`、`prompt.md`、`params.json`、`solution.tsx` 与 `audit.md`，形成可追溯学习证据。
