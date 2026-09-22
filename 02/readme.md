# 02｜Composition：画布、时长与渲染入口

第00轮建立了时间模型：视频是可按frame计算的图像序列。第01轮建立了结构模型：React组件树描述一帧中有什么、什么属于什么。

现在还缺一个关键契约：

> 哪个React组件是一件可以预览、选择和渲染的视频作品？它有多大、多久、每秒多少帧？

Remotion用 `Composition` 回答这个问题。

---

## 一、本轮学习目标

完成本轮后，你应当建立以下理解：

1. React组件只是画面生成规则，Composition才是一件被Remotion登记的可渲染作品。
2. `id`、`component`、`width`、`height`、`fps`、`durationInFrames` 共同组成视频规格契约。
3. `registerRoot()`、Root组件与 `<Composition>` 分别承担什么职责。
4. `useVideoConfig()` 怎样让画面读取当前作品的规格。
5. 同一个React组件怎样注册成横版、竖版等多个视频产品。
6. `defaultProps` 为什么属于Composition输入，而不是写死在画面组件里。
7. Composition、Scene、Layer与最终视频文件之间的边界。

这一轮只讲作品登记和规格边界。动态元数据、参数Schema和批量视频会在后续单独展开。

---

## 二、费曼类比：Component是演员，Composition是正式拍摄工单

假设你有一个演员，他会按照导演给出的内容表演。只有演员，还不能确定最终交付什么影片。

制片部门还需要一张拍摄工单：

- 项目名称；
- 横屏还是竖屏；
- 画面分辨率；
- 每秒拍多少张；
- 总共拍多久；
- 由哪位演员完成；
- 默认台词和颜色是什么。

在Remotion里：

| 现实制片 | Remotion |
|---|---|
| 演员与表演规则 | React component |
| 拍摄工单 | Composition |
| 工单编号 | id |
| 画幅 | width × height |
| 拍摄频率 | fps |
| 总镜头长度 | durationInFrames |
| 默认台词与配置 | defaultProps |
| 制片目录 | Root + Folder |

所以：

    React Component
    = 怎样生成一帧画面

    Composition
    = 把这个生成规则登记成哪一件视频产品

同一位演员可以拍横版广告、竖版短视频和方形封面；同一个React组件也可以登记成多个Composition。

---

## 三、为什么只有React组件还不够

下面的组件能够返回画面：

```tsx
export const ProductTitle = () => {
  return <div>Motion Engine</div>;
};
```

但Remotion此时并不知道：

- 它是不是一件需要显示在Studio侧边栏里的作品；
- 画布是1920×1080还是1080×1920；
- 每秒是24、30还是60帧；
- 总时长是3秒还是30秒；
- 渲染命令应该用什么ID选择它。

注册Composition以后，这些信息才成为明确契约：

```tsx
<Composition
  id="ProductTitle-Landscape"
  component={ProductTitle}
  width={1920}
  height={1080}
  fps={30}
  durationInFrames={150}
/>
```

现在Remotion知道这是一件：

- ID为 `ProductTitle-Landscape`；
- 1920×1080像素；
- 30 FPS；
- 150帧，也就是5秒；
- 由 `ProductTitle` 生成画面的作品。

---

## 四、Composition的六个核心字段

### 1. id：作品的稳定身份

```tsx
id="ProductTitle-Landscape"
```

`id` 会出现在Remotion Studio侧边栏中，也用于命令行选择渲染目标。

它不是给观众看的影片标题，而是工程内部的稳定标识。适合包含业务含义和格式含义：

- `CourseIntro-Landscape`
- `CourseIntro-Portrait`
- `MonthlyReport-1080p`

当前Remotion要求Composition ID只使用字母、数字和连字符。ID应保持稳定，避免将日期或随机数随意塞进去。

### 2. component：画面生成规则

```tsx
component={ProductTitle}
```

它指向真正生成画面的React组件。Composition自身不负责绘制标题、颜色和图形，它负责把作品规格与画面组件连接起来。

大型项目还可以使用 `lazyComponent` 延迟加载，但早期课程优先使用直接的 `component`，让依赖关系保持可见。

### 3. width：画布宽度

```tsx
width={1920}
```

单位是像素。它定义最终帧图像的宽度，也定义组件内部可用的画布宽度。

### 4. height：画布高度

```tsx
height={1080}
```

同样以像素为单位。`width` 与 `height` 一起决定画幅比例：

| 常见画幅 | 尺寸示例 | 比例 |
|---|---:|---:|
| 横版视频 | 1920×1080 | 16:9 |
| 竖版视频 | 1080×1920 | 9:16 |
| 方形内容 | 1080×1080 | 1:1 |

Composition尺寸是作品事实。布局代码应读取它，而不是假设所有视频永远是横屏。

### 5. fps：时间采样频率

```tsx
fps={30}
```

30 FPS表示一秒包含30个帧采样点。FPS不是“动画快慢按钮”。现实中的动作时长应先用秒表达，再通过FPS换算成帧。

### 6. durationInFrames：作品总帧数

```tsx
durationInFrames={150}
```

时长关系：

    durationInSeconds = durationInFrames / fps

30 FPS、150帧得到5秒。合法帧范围是：

    0 ... durationInFrames - 1

也就是0—149帧。第150帧已经在作品范围之外。

---

## 五、Root、registerRoot与Composition的三层关系

一个最小Remotion入口通常分成两步。

### 1. 注册Root

```tsx
// src/index.ts
import {registerRoot} from "remotion";
import {RemotionRoot} from "./Root";

registerRoot(RemotionRoot);
```

`registerRoot()` 告诉Remotion：从哪个React根组件开始寻找可渲染作品。它通常只调用一次。

### 2. 在Root中登记Composition

```tsx
// src/Root.tsx
import {Composition} from "remotion";
import {ProductTitle} from "./ProductTitle";

export const RemotionRoot = () => {
  return (
    <Composition
      id="ProductTitle-Landscape"
      component={ProductTitle}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={150}
    />
  );
};
```

完整路径：

    src/index.ts
    ↓ registerRoot
    RemotionRoot
    ↓ register
    Composition
    ↓ component
    React frame component

`registerRoot()` 登记作品目录入口，`<Composition>` 登记具体作品，`component` 生成具体画面。

---

## 六、Composition不是Scene

这几个概念容易混淆：

| 概念 | 负责什么 |
|---|---|
| Composition | 一整件可单独选择和渲染的视频产品 |
| Scene | 产品内部的一段叙事内容 |
| Layer | 同一时间叠加在画面中的一个视觉层 |
| Component | 生成画面结构或局部视觉规则 |
| Rendered file | Composition经过渲染编码后的MP4、WebM或其他文件 |

一个60秒品牌片通常是一个Composition，内部有多个Scene；每个Scene又有背景、人物、文字等多个Layer。

不要因为影片有五个镜头，就注册五个Composition。只有当它们需要被独立选择、独立输入或独立导出时，才更像五件独立作品。

---

## 七、在画面内部读取Composition规格

组件可以使用 `useVideoConfig()` 读取当前作品的规格：

```tsx
import {useVideoConfig} from "remotion";

export const ContractInspector = () => {
  const {width, height, fps, durationInFrames} = useVideoConfig();

  return (
    <div>
      {width} × {height}
      {fps} FPS
      {durationInFrames} frames
    </div>
  );
};
```

这形成一条清楚的数据路径：

    <Composition width height fps durationInFrames>
    ↓
    useVideoConfig()
    ↓
    component layout / time calculation

Composition是规格来源，组件是规格消费者。

如果组件通过 `window.innerWidth` 猜测画布尺寸，它会把浏览器窗口和视频画布混在一起。Remotion画面的事实来源应是 `useVideoConfig()`。

---

## 八、同一个组件注册多个Composition

下面的组件会根据画布比例调整布局：

```tsx
type FormatAwareTitleProps = {
  title: string;
  accentColor: string;
};

export const FormatAwareTitle = ({title, accentColor}: FormatAwareTitleProps) => {
  const {width, height} = useVideoConfig();
  const isPortrait = height > width;

  return (
    <AbsoluteFill
      style={{
        padding: isPortrait ? 80 : 120,
        justifyContent: "center",
        alignItems: isPortrait ? "flex-start" : "center",
      }}
    >
      <div style={{color: accentColor}}>
        {isPortrait ? "PORTRAIT" : "LANDSCAPE"}
      </div>
      <h1>{title}</h1>
    </AbsoluteFill>
  );
};
```

在Root中登记两个版本：

```tsx
<Composition
  id="FormatTitle-Landscape"
  component={FormatAwareTitle}
  width={1920}
  height={1080}
  fps={30}
  durationInFrames={150}
  defaultProps={{
    title: "One component, two products",
    accentColor: "#5eead4",
  }}
/>

<Composition
  id="FormatTitle-Portrait"
  component={FormatAwareTitle}
  width={1080}
  height={1920}
  fps={30}
  durationInFrames={150}
  defaultProps={{
    title: "One component, two products",
    accentColor: "#a78bfa",
  }}
/>
```

这里没有复制两套业务画面代码。稳定的视觉规则保存在组件中，产品规格与默认输入保存在Composition中。

---

## 九、defaultProps是作品的默认输入

`defaultProps` 将数据传给Composition绑定的组件：

```tsx
defaultProps={{
  title: "September Report",
  accentColor: "#5eead4",
}}
```

它适合表达：

- 默认标题；
- 默认主题色；
- 默认数据对象；
- 默认素材引用；
- 当前作品版本的业务输入。

当前Remotion要求传入Composition的Props能够被序列化。函数、类实例或依赖运行时闭包的数据，不适合作为渲染输入。

参数Schema、Studio属性编辑器和外部输入会在第25轮详细处理。这一轮只需要记住：

> Component定义可接受什么输入，Composition决定这件作品默认带什么输入。

---

## 十、Folder只整理目录，不改变视频

当作品越来越多时，可以使用Folder整理Studio侧边栏：

```tsx
<Folder name="02 Composition">
  <Composition ... />
  <Composition ... />
</Folder>
```

Folder的职责是工程导航。它不会：

- 改变画布尺寸；
- 改变时间轴；
- 成为视频中的一层；
- 自动把多个Composition连接成一条影片。

可以把它理解为制片目录里的文件夹，而不是剪辑时间轴上的片段。

---

## 十一、将规格集中成可读常量

多个Composition共享规格时，可以写成：

```tsx
const LANDSCAPE_VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
  durationInFrames: 150,
};

<Composition
  id="CourseIntro"
  component={CourseIntro}
  {...LANDSCAPE_VIDEO}
/>
```

常量名称应表达产品规格，而不是只叫 `config1`。如果两个Composition未来可能独立变化，就不要为了少写几行而强行共享一个巨大配置对象。

推荐将秒级意图写清楚：

```tsx
const FPS = 30;
const DURATION_SECONDS = 5;
const DURATION_IN_FRAMES = FPS * DURATION_SECONDS;
```

这样能直接看到“5秒”如何转成“150帧”。

---

## 十二、Composition如何进入渲染链

当你在Studio选择或在命令行指定一个Composition ID时，Remotion获得：

    composition id
    ↓
    width / height / fps / durationInFrames
    ↓
    defaultProps or inputProps
    ↓
    target React component
    ↓
    render frame 0 ... lastFrame
    ↓
    encode output file

Composition是渲染系统找到作品规格和画面入口的索引。

因此，Composition ID不只是侧边栏标签；它也是自动化渲染、批量生产和外部系统调用时的稳定边界。

---

## 十三、规格变化会造成什么

### 改width与height

画布比例和像素空间变化。使用固定坐标的布局可能超出画面；使用 `useVideoConfig()` 的布局可以根据比例切换策略。

### 改fps，不改durationInFrames

总秒数变化。例如150帧从30 FPS改为60 FPS，视频从5秒变成2.5秒。

### 改durationInFrames，不改fps

总时长变化。画面组件可以访问更多或更少的frame。

### 改component

作品规格保持，画面生成规则整体改变。

### 改defaultProps

画面规则保持，默认内容或主题输入改变。

这五种变化分别作用于画幅、时间、结构与内容。Composition让这些责任在Root中集中可见。

---

## 十四、常见误解

### “一个React组件就是一条视频”

组件只是生成规则。注册为Composition以后，它才成为Studio和渲染器可以选择的作品。

### “Composition就是一个镜头”

Composition通常代表完整可交付作品。镜头是作品内部的Scene或Sequence，由后续课程处理。

### “修改FPS可以让运动保持不变，只是更流畅”

只有运动逻辑以秒为语义并通过FPS换算时才成立。固定总帧数的情况下，修改FPS也会修改总秒数。

### “竖版只要把横版视频裁一下”

Composition尺寸改变了真实画布。好的组件会读取width与height并采用对应布局，而不是只依赖裁切。

### “Folder会把几个Composition串成一个视频”

Folder只整理Studio目录。影片内部的串联属于时间轴结构。

### “defaultProps可以放任意JavaScript对象”

渲染输入需要稳定传递和序列化。默认值应保持为明确、可传输的业务数据。

---

## 十五、配套Studio演示

第02轮提供五个讲解用Composition：

1. `02-01-RegistrationFlow`：显示registerRoot、Root、Composition、Component之间的登记链。
2. `02-02-ContractInspector`：直接读取width、height、fps和durationInFrames。
3. `02-03-LandscapeVariant`：同一组件注册成1920×1080横版作品。
4. `02-04-PortraitVariant`：同一组件注册成1080×1920竖版作品。
5. `02-05-DurationBoundary`：显示24 FPS、96帧作品的当前frame、秒数与合法帧范围。

这些Composition只用于配合讲义观察代码和运行结果，不包含练习、测试或审计问答。

---

## 十六、费曼式复述

向完全不会编程的人解释：

> React组件像演员的表演规则，Composition像正式拍摄工单。工单写清这条视频叫什么、画面多大、每秒拍多少张、总共拍多久，以及由哪个演员来演。没有工单，演员会表演，但制片系统不知道要交付哪一条影片。

向程序员解释：

> Composition是Remotion的可渲染作品注册单元，它将稳定ID、React component、像素尺寸、FPS、总帧数和默认Props绑定为一个render target。Root公开作品目录，组件通过useVideoConfig消费规格，同一组件可以被注册为多个不同格式的产品。

## 本轮唯一必须记住的话

> Component负责“这一帧怎样生成”，Composition负责“把它登记成一件什么规格的视频产品”。

---

## 官方参考

- [Composition API](https://www.remotion.dev/docs/composition)
- [The fundamentals](https://www.remotion.dev/docs/the-fundamentals)
- [useVideoConfig()](https://www.remotion.dev/docs/use-video-config)
- [Folder](https://www.remotion.dev/docs/folder)
