# 00｜Remotion Worldview：视频是时间的可计算画面

这一轮只解决一个问题：

> Remotion 到底怎样把 React 代码变成视频？

如果这个问题没有真正理解，后面学习 `interpolate()`、`spring()`、`Sequence`、字幕、音频与渲染时，容易退化成背 API。第00轮的目标，是建立后续29轮都会反复使用的时间模型。

---

## 一、本轮学习目标

完成本轮后，你需要能够：

1. 用白话解释 Remotion 和普通网页动画的根本区别。
2. 解释 `frame`、`fps`、`durationInFrames` 分别表示什么。
3. 解释为什么视频可以写成 `FrameImage = f(frame, fps, props, assets)`。
4. 使用 `useCurrentFrame()` 让画面由当前帧决定。
5. 在运行前预测第0、30、60、149帧的画面。
6. 直接跳到任意一帧时，仍能得到正确、可复现的结果。

本轮暂时不深入 React 组件设计、插值、弹簧和 Sequence。它们会在后续课程单独处理。

---

## 二、先用最简单的话解释 Remotion

假设你要制作一本150页的翻页动画书。

普通动画的思路像这样：

    先看第1页
    → 再翻到第2页
    → 再翻到第3页
    → 一直播放到第150页

Remotion 更像一台可以直接打印任意页的机器。渲染器会问：

> 请告诉我第87页应该长什么样。

React 组件收到 `frame = 87`，计算第87帧的文字、位置、颜色和透明度，然后返回这一帧画面。它不需要先播放前86帧。

所以 Remotion 的核心不是“播放一个会动的网页”，而是：

    输入帧编号
    ↓
    计算这一帧的React画面
    ↓
    截取这一帧图像
    ↓
    把所有图像编码成视频

---

## 三、视频是什么

视频可以先粗略理解为按固定速度连续显示的一组图片。

如果视频是30 FPS：

- 1秒包含30帧；
- 第0帧是第一张图；
- 第29帧是第一秒中的最后一张图；
- 第30帧对应时间轴上的1秒；
- 150帧的时长是5秒；
- 最后一帧编号是149，而不是150。

公式：

    timeInSeconds = frame / fps

反过来：

    frame = timeInSeconds × fps

例如30 FPS时：

| frame | 时间位置 |
|---:|---:|
| 0 | 0秒 |
| 15 | 0.5秒 |
| 30 | 1秒 |
| 60 | 2秒 |
| 149 | 4.966…秒 |

这里要注意：5秒视频的时间区间从第0帧开始，最后采样点在第149帧。第150帧已经超出 Composition。

---

## 四、Remotion的核心公式

本课程统一使用：

    FrameImage = f(frame, fps, props, assets)

逐项解释：

- `frame`：现在要求哪一帧。
- `fps`：一秒采样多少帧。
- `props`：标题、颜色、数字、尺寸等业务输入。
- `assets`：字体、图片、视频、音频等素材。
- `FrameImage`：这些输入共同计算出的当前帧画面。

如果输入相同，输出画面也应该相同。这使 Remotion 能够：

- 在 Studio 中拖动时间轴；
- 直接渲染中间一帧；
- 将不同帧交给不同进程计算；
- 渲染失败后重试某些帧；
- 对关键帧进行截图与自动审计。

---

## 五、最小可运行作品

### 1. 注册 Composition

```tsx
import {Composition} from "remotion";
import {FrameCounter} from "./FrameCounter";

export const RemotionRoot = () => {
  return (
    <Composition
      id="00-01-FrameCounter"
      component={FrameCounter}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={150}
    />
  );
};
```

这段代码定义了一件可以被Remotion识别和渲染的视频作品：

- 画布宽1920px；
- 画布高1080px；
- 每秒30帧；
- 总计150帧，也就是5秒；
- 每一帧由 `FrameCounter` 组件计算。

### 2. 读取当前帧

```tsx
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from "remotion";

export const FrameCounter = () => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const seconds = frame / fps;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#070b14",
        color: "#e8ecf6",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 80,
      }}
    >
      <div>Frame {frame}</div>
      <div>{seconds.toFixed(2)} seconds</div>
      <div>{durationInFrames} total frames</div>
    </AbsoluteFill>
  );
};
```

`useCurrentFrame()` 没有启动动画。它只告诉组件：Remotion当前正在请求哪一帧。

`useVideoConfig()` 读取当前Composition的规格。秒数通过 `frame / fps` 计算，不依赖电脑时钟。

---

## 六、第一条运动：让属性成为frame的函数

先不用 `interpolate()`，直接观察因果：

```tsx
const progress = frame / (durationInFrames - 1);
const width = `${progress * 100}%`;
```

于是：

    frame = 0
    → progress = 0
    → width = 0%

    frame = 149
    → progress = 1
    → width = 100%

画面看起来在运动，本质是每一帧重新得到一个不同的宽度。

完整因果链：

    frame变化
    ↓
    progress重新计算
    ↓
    width重新计算
    ↓
    React返回新的样式
    ↓
    当前帧图像发生变化

这就是整个Remotion动画体系最底层的模型。后面的插值、缓动和弹簧，只是帮助我们更好地定义 `frame → property` 的映射。

---

## 七、为什么不能写“每帧增加一点”

下面是危险思路：

```ts
positionX += 5;
```

这要求第60帧必须知道第59帧的位置。如果直接跳到第60帧、刷新页面或并行渲染，结果可能不同。

应当写成：

```ts
const speedPxPerSecond = 240;
const positionX = speedPxPerSecond * frame / fps;
```

现在第60帧的位置可以直接计算：

    240 × 60 / 30 = 480px

无论怎样到达第60帧，结果都是480px。

---

## 八、参数实验

实验不能只看结果，要先写预测。

### 实验A：修改FPS

将FPS从30改为60，`durationInFrames`仍为150。

先回答：

- 视频总时长变成多少秒？
- 第60帧显示多少秒？
- 进度条在第60帧的长度是否改变？

### 实验B：保持5秒时长

把FPS改为60，同时把总帧数改为300。

先回答：

- 第2秒对应哪一帧？
- 最后一帧编号是多少？
- 以 `frame / (durationInFrames - 1)` 计算的进度是否仍在末帧到达1？

### 实验C：直接跳帧

不要从头播放，直接点击第90帧。

预测：

- 秒数；
- 进度百分比；
- 进度条宽度。

### 实验D：制造错误

把进度公式改为：

```ts
const progress = frame / durationInFrames;
```

检查最后一帧能否真正到达100%，并解释原因。

---

## 九、四个正式练习

1. [00-01｜最小Composition：定义一件视频作品](exercises/01-minimum-composition/)
2. [00-02｜Frame Counter：让时间轴变得可见](exercises/02-frame-counter/)
3. [00-03｜Frame to Property：让进度条随帧变化](exercises/03-frame-to-property/)
4. [00-04｜Random Seek Audit：验证任意跳帧](exercises/04-random-seek-audit/)

每道练习都保留：

    task
    prompt
    harness
    params
    solution
    audit

---

## 十、常见误解

### “useCurrentFrame会让组件不断播放”

不会。它只是读取当前请求的帧。Studio播放时帧编号不断变化，所以画面看起来在播放。

### “30 FPS就是动画速度”

FPS是采样频率。运动速度要由每秒移动多少、持续多少秒等语义参数定义。

### “五秒视频的最后一帧是150”

错误。帧从0编号，150帧的最后一帧是149。

### “只要Studio里播放流畅，代码就是正确的”

错误。还要直接跳帧、刷新同一帧、检查边界帧，确认结果不依赖播放历史。

---

## 十一、本轮审计

### Prompt audit

- 是否说明画布、FPS、总帧数与时间单位？
- 是否说明哪些属性随frame变化？
- 是否给出需要检查的关键帧？

### Code audit

- 当前画面是否能由输入直接计算？
- 是否存在跨帧累积、浏览器时钟或CSS animation？
- 语义数字是否被命名？

### Runtime audit

- 第0帧是否正确？
- 直接跳到中间帧是否正确？
- 最后一帧是否达到预期终点？
- 刷新同一帧时结果是否一致？

---

## 十二、费曼式复述

如果要向完全不会编程的人解释：

> Remotion像一台按编号生成动画书页面的机器。你告诉它现在要第几页，它用React计算这一页该画什么。把所有页面按每秒30张之类的速度排起来，就成为视频。

如果要向程序员解释：

> Remotion把视频建模为关于frame、fps、props和assets的确定性React渲染函数。动画是属性关于frame的函数，渲染器对目标帧求值，再将图像序列编码为视频。

## 本轮唯一必须记住的话

> Remotion动画不是“上一帧改一点，再进入下一帧”，而是“给定任意frame，直接算出这一帧应该是什么”。
