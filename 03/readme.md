# 03｜Frame / Second / FPS：建立统一时间坐标

## 费曼类比

FPS 像沿时间轴拍照的密度。30 FPS 表示一秒取 30 个样本，60 FPS 表示一秒取 60 个样本。相同的五秒运动，在两种规格下帧数不同，现实时间相同。

## 核心换算

    seconds = frame / fps
    frames = seconds × fps

业务意图优先用秒表达，例如“标题在 0.6 秒内出现”；渲染边界再换算成 frame。需要精确踩点时可以直接使用帧，但必须标明单位。

## 常见错误

写 `x = frame * 5` 会让运动速度随 FPS 改变。写 `x = speedPxPerSec * frame / fps` 才表达每秒移动多少像素。

## 参数实验

分别以 24、30、60 FPS 运行同一个 `speedPxPerSec` 运动，检查在 2 秒位置是否到达同一坐标。

## 本轮结论

> 秒表达现实时间与叙事意图，帧表达视频采样位置，FPS 是两者的换算桥梁。


## 本轮练习

1. [03-01｜按秒恒速移动](exercises/01-speed-per-second/)
2. [03-02｜时间边界换算](exercises/02-time-boundaries/)

每道题固定保留 `task.md`、`prompt.md`、`params.json`、`solution.tsx` 与 `audit.md`，形成可追溯学习证据。
