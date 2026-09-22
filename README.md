# Remotion Worldview Course｜费曼式 30 轮程序化动效课程

这不是 Remotion API 速查表，而是一套从第一性原理理解时间、画面、运动、镜头、素材、声音、渲染和参数化视频生产的课程。

课程方法：一轮只解决一个主要因果概念；先建立可解释的模型，再接触 API；AI 可以写大部分代码，学习者必须能阅读、预测、修改并审计代码造成的画面结果。

## 核心闭环

    Motion Intent
    ↓
    Semantic Parameters
    ↓
    Frame Function
    ↓
    Visible React Code
    ↓
    Studio Preview
    ↓
    Parameter Experiment
    ↓
    Frame Audit
    ↓
    Rendered Video

核心公式：

    FrameImage = f(frame, fps, props, assets)

任何时刻都应该能够从输入重新计算画面。时间轴可以跳转，渲染可以并行，结果必须可复现。

## 当前实现

- 00—05：完整讲义、参数实验、参考实现与三层审计。
- 06—29：课程目标、核心模型、实验方向与完成标准。
- `src/`：可直接在 Remotion Studio 运行的 00—05 演示 Composition。

## 运行

```bash
npm install
npm run dev
```

Studio 中可以预览 `00-FrameFunction` 至 `05-LayoutCoordinates` 六个实验，以及 `Course-Map` 课程地图。

## 学习规则

所有讲义、实验、AI 生成代码与审计遵守 [LEARNING_CONSTITUTION.md](LEARNING_CONSTITUTION.md)。常见踩坑见 [Gotchas.md](Gotchas.md)。

## 课程目录

- [00｜Remotion Worldview：视频是时间的可计算画面](00/readme.md)
- [01｜React / JSX：用组件描述一帧画面](01/readme.md)
- [02｜Composition：画布、时长与渲染入口](02/readme.md)
- [03｜Frame / Second / FPS：建立统一时间坐标](03/readme.md)
- [04｜Determinism：任意一帧都能独立重建](04/readme.md)
- [05｜Layer / Layout / Coordinate：组织二维画面](05/readme.md)
- [06｜Interpolation：把时间映射成属性](06/readme.md)
- [07｜Easing：速度曲线决定运动感](07/readme.md)
- [08｜Spring：质量、刚度、阻尼与自然运动](08/readme.md)
- [09｜Transform / Origin：位移、缩放、旋转与轴心](09/readme.md)
- [10｜Motion System：让多个属性围绕同一意图运动](10/readme.md)
- [11｜Stagger / Repeat / Rhythm：时间编排与节奏](11/readme.md)
- [12｜Sequence：局部时间与片段边界](12/readme.md)
- [13｜Scene：镜头、段落与总时长](13/readme.md)
- [14｜Transition：两个场景怎样交接](14/readme.md)
- [15｜Typography Motion：文字排版与可读性](15/readme.md)
- [16｜SVG / Path / Mask：矢量图形动效](16/readme.md)
- [17｜Storyboard / Attention：用运动引导视线](17/readme.md)
- [18｜Asset / Font / Image：确定性加载视觉素材](18/readme.md)
- [19｜Video：嵌入、裁剪与同步视频](19/readme.md)
- [20｜Audio：声音、音量与节拍同步](20/readme.md)
- [21｜Captions：字幕数据与时间戳](21/readme.md)
- [22｜Render：编码、导出与结果检查](22/readme.md)
- [23｜Project：完成一支 30—60 秒动效短片](23/readme.md)
- [24｜Reusable Components：可复用动效组件](24/readme.md)
- [25｜Parameterized Video：Props、Schema 与模板](25/readme.md)
- [26｜Data-driven Video：数据驱动与批量生成](26/readme.md)
- [27｜Player：把视频带进应用](27/readme.md)
- [28｜Three.js in Remotion：三维世界的逐帧渲染](28/readme.md)
- [29｜Remotion Final：从创意简报到可复现视频系统](29/readme.md)

## 最终目标

学习者最终应能把一份创意简报转成：

    Storyboard
    → Semantic Props
    → Deterministic Timeline
    → Reusable Components
    → Auditable Composition
    → Reproducible Render

Remotion 的核心价值，是让视频成为可以编程、验证、参数化和批量生成的软件产物。
