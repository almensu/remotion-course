# 02｜Composition：画布、时长与渲染入口

## 费曼类比

Composition 像一个正式的影片交付单：作品叫什么、画面多大、每秒多少帧、总共有多少帧，以及用哪个组件生成。

## 四个基本规格

    width × height
    fps
    durationInFrames
    component

Composition 是 Studio 和渲染器能够识别的入口。同一个 React 组件可以用不同 Props 注册为多件作品；多个 Composition 也可以按课程或业务分组。

## 边界

Composition 管整个可渲染作品的规格。Scene 管作品里的叙事段落。Layer 管某个时刻叠在一起的画面。把全部责任放进 Root 会让课程无法阅读。

## 参数实验

把 1920×1080 改为 1080×1920，记录哪些布局假设失效；把 duration 从 150 改为 90，检查尾部动画是否被截断。

## 本轮结论

> Composition 是“这件视频产品是什么”的明确契约。


## 本轮练习

1. [02-01｜视频规格契约](exercises/01-video-contract/)
2. [02-02｜竖版变体](exercises/02-portrait-variant/)

每道题固定保留 `task.md`、`prompt.md`、`params.json`、`solution.tsx` 与 `audit.md`，形成可追溯学习证据。
