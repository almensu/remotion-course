# 01｜React / JSX：用组件描述一帧画面

第00轮建立了Remotion最底层的时间模型：

    FrameImage = f(frame, fps, props, assets)

这一轮只解决其中的“画面由什么来描述”：

> React组件和JSX怎样把一帧画面组织成可理解、可复用、可检查的结构？

Remotion不会替你决定画面里有哪些对象。它把当前frame交给React，React负责返回这一帧的结构。组件结构混乱，后面的动画、镜头、素材和参数化都会一起混乱。

---

## 一、本轮学习目标

完成本轮后，你需要能够：

1. 用白话解释React组件、JSX、Props在Remotion中的职责。
2. 读懂JSX树，并画出对应的父子层级。
3. 用语义名称拆分画面，而不是使用 `Box1`、`Div2` 之类名字。
4. 使用Props把内容和样式参数传给组件。
5. 区分“画面结构”“画面数据”和“时间计算”。
6. 判断何时应该拆组件，何时拆分只会增加理解成本。
7. 让父组件计算时间状态，再把清楚的结果交给展示组件。

本轮不会深入Composition规格、插值、弹簧或Sequence。我们先把“一帧是什么”组织清楚。

---

## 二、费曼类比：组件是一张舞台布置单

假设你要拍一张产品广告照片。现场需要：

- 背景板；
- 产品主体；
- 主标题；
- 三个卖点；
- 品牌标志；
- 页脚说明。

React组件像不同工种的布置单：

    ProductScene
    ├── Background
    ├── ProductHero
    ├── BenefitList
    │   ├── BenefitCard
    │   ├── BenefitCard
    │   └── BenefitCard
    └── FooterBrand

JSX把这些布置单组合成一棵树。Props告诉每个组件具体内容，例如产品名称、数据、颜色。Remotion的frame决定这一时刻传入什么状态。

所以可以扩展第00轮公式：

    frame / fps / props / assets
    ↓
    React component tree
    ↓
    JSX elements + styles
    ↓
    one frame image

---

## 三、React组件到底是什么

先看最小组件：

```tsx
export const Title = () => {
  return <div>Hello Remotion</div>;
};
```

它是一个函数。调用这个函数，会返回一段React元素描述。

加入Props：

```tsx
type TitleProps = {
  text: string;
  color: string;
};

export const Title = ({text, color}: TitleProps) => {
  return <div style={{color}}>{text}</div>;
};
```

现在 `Title` 表达稳定的视觉规则：显示一段标题；`text` 和 `color` 表达每次使用时可以变化的输入。

```tsx
<Title text="Frame Function" color="#5eead4" />
<Title text="Deterministic Video" color="#a78bfa" />
```

同一规则接收不同数据，得到不同画面。

---

## 四、JSX不是HTML文件，而是画面结构表达式

```tsx
const card = (
  <div>
    <span>Revenue</span>
    <strong>¥128,000</strong>
  </div>
);
```

可以把它读成：

    Card container
    ├── Label: Revenue
    └── Value: ¥128,000

JSX最终会形成一棵树。父节点建立布局和视觉上下文，子节点在父节点中存在。

在视频里，这棵树还决定：

- 哪些元素一起移动；
- 哪些元素共享背景和裁剪区域；
- 哪些元素使用同一个局部坐标；
- 哪些元素应当一起出现或消失；
- 哪些视觉规则可以复用。

因此，JSX层级不是代码排版问题，而是画面关系模型。

---

## 五、组件名称要保存语义

下面的结构可以运行，但很难审计：

```tsx
<Box1>
  <ThingA />
  <ThingB />
</Box1>
```

学习者无法判断：

- Box1为什么存在；
- ThingA与ThingB是什么关系；
- 哪一层应该控制布局；
- 后续动画应该作用在哪一层。

更清晰的表达：

```tsx
<ProductScene>
  <ProductImage />
  <ProductCopy />
</ProductScene>
```

命名应回答“它在画面中的职责”，而不是“它是第几个div”。

推荐：

- `SceneBackground`
- `TitleBlock`
- `MetricCard`
- `ProductHero`
- `BrandFooter`

避免：

- `Box1`
- `LeftThing`
- `Wrapper2`
- `ComponentA`
- `BluePart`

如果颜色或位置改变，`BluePart`、`LeftThing` 的名字立刻失真；语义职责通常更稳定。

---

## 六、Props是组件的输入契约

假设要做一张数据卡：

```tsx
type MetricCardProps = {
  label: string;
  value: string;
  accentColor: string;
};
```

这三个字段不是随便抽出来的变量，而是卡片对外声明的输入契约：

- `label`：数据的含义；
- `value`：当前数据；
- `accentColor`：视觉强调色。

一个好的Props接口应具备三个特点：

1. 名字表达真实含义；
2. 类型限制错误输入；
3. 不暴露组件内部无关细节。

不理想：

```tsx
type CardProps = {
  a: string;
  b: string;
  size1: number;
  x: number;
  y: number;
};
```

调用者必须知道组件内部怎样摆放，接口已经泄漏了实现细节。

---

## 七、内容、结构、样式与时间要分清

一帧画面中有四类不同责任：

| 责任 | 示例 | 适合放在哪里 |
|---|---|---|
| 内容数据 | 标题、价格、姓名 | Props或数据对象 |
| 结构关系 | 标题属于卡片 | JSX父子层级 |
| 视觉样式 | 字号、颜色、间距 | style或样式系统 |
| 时间状态 | 当前进度、是否出现 | 由frame计算后传入 |

例如：

```tsx
const frame = useCurrentFrame();
const progress = frame / 149;

return (
  <ProgressCard
    label="Course progress"
    progress={progress}
    accentColor="#5eead4"
  />
);
```

父组件读取frame并计算 `progress`。`ProgressCard` 只负责把0—1的进度画出来。

因果链清楚：

    frame
    ↓
    progress
    ↓
    ProgressCard props
    ↓
    bar width

如果子组件内部同时读取frame、计算业务状态、选择内容、加载数据和绘制布局，它会变得难以复用和审计。

---

## 八、什么时候应该拆组件

出现以下情况时，拆分通常有价值：

### 1. 它有独立语义

`TitleBlock`、`MetricCard`、`BrandFooter` 都能用一句话说明职责。

### 2. 它会重复出现

三个卖点卡片共享相同结构，只是Props不同。

### 3. 它有清晰输入与输出

输入标题、数值、强调色；输出一张数据卡。

### 4. 它需要作为整体参与布局或运动

标题与副标题应整体移动，可以放进 `TitleBlock`。

下面的拆分通常没有帮助：

```tsx
const PaddingWrapper = ({children}) => <div style={{padding: 24}}>{children}</div>;
```

如果它只使用一次、没有独立语义，也没有减少认知成本，组件数量反而增加。

判断问题：

> 拆分之后，我是否更容易解释这棵画面树？

---

## 九、列表渲染与key

重复卡片通常来自数据：

```tsx
const metrics = [
  {id: "views", label: "Views", value: "2.4M"},
  {id: "likes", label: "Likes", value: "186K"},
  {id: "shares", label: "Shares", value: "32K"},
];

return metrics.map((metric) => (
  <MetricCard
    key={metric.id}
    label={metric.label}
    value={metric.value}
  />
));
```

`key` 是React识别列表成员的稳定身份。优先使用业务ID。不要在可能重排的列表中依赖数组下标，也不要用 `Math.random()` 生成key。

在Remotion里，稳定身份能减少难以解释的节点重建，也符合确定性原则。

---

## 十、不要用React状态模拟时间轴

危险做法：

```tsx
const [x, setX] = useState(0);

useEffect(() => {
  const timer = setInterval(() => setX((value) => value + 5), 16);
  return () => clearInterval(timer);
}, []);
```

这段代码依赖真实时间和执行历史。直接跳到第90帧时，`x` 并不知道自己应该是多少。

Remotion时间状态应来自frame：

```tsx
const frame = useCurrentFrame();
const {fps} = useVideoConfig();
const x = speedPxPerSecond * frame / fps;
```

React state可以处理Studio中的编辑交互或应用状态，但不能作为最终视频运动的时间来源。

---

## 十一、从提示词到组件树

模糊提示词：

> 做一个好看的产品页面，有标题和几个数据。

AI可能生成大量无语义div、魔法数字与混乱层级。

更好的语义提示词：

> 创建一个1920×1080的产品数据场景。场景包含背景层、左侧TitleBlock、右侧ProductHero、底部由三个MetricCard组成的MetricRow，以及BrandFooter。MetricCard接收label、value、accentColor。组件名称反映画面职责，重复卡片由带稳定id的数据数组生成。时间计算保留在场景组件，展示组件只接收计算后的Props。

好提示词已经包含：

- 画面对象；
- 父子关系；
- 重复关系；
- Props契约；
- 时间责任边界；
- 命名要求。

Prompt本身就是你对画面结构是否理解的证据。

---

## 十二、参数实验

### 实验A：内容与结构

只修改 `MetricCard` 的label和value。

预测：JSX树是否改变？卡片布局是否改变？哪些像素会改变？

### 实验B：整体与局部

把TitleBlock外层的字号改小，再只修改副标题字号。

观察父层样式与子层样式分别影响什么。

### 实验C：数据驱动列表

向metrics数组增加第四项。

预测：需要复制新的JSX吗？Grid或Flex布局怎样响应？

### 实验D：时间责任

先让每张卡片自己读取frame，再改成父组件只计算一次progress并传入。

比较两种结构的可读性：哪一处能直接看到 `frame → progress → visual property`？

---

## 十三、配套Studio演示

第01轮在Remotion Studio中提供四个讲解用Composition：

1. `01-01-JSXAnatomy`：观察JSX父子结构怎样形成一张标题卡。
2. `01-02-PropsContract`：观察同一个MetricCard怎样通过不同Props生成三张卡片。
3. `01-03-SemanticSceneTree`：观察SceneBackground、TitleBlock、ProductHero和BrandFooter组成的语义树。
4. `01-04-FrameAwareBoundary`：观察父组件计算progress、展示组件只负责绘制的责任边界。

这些Composition是课程代码资源，用于理解讲义中的结构和数据流，暂不配置测试题。

## 十四、常见误解

### “组件拆得越多越专业”

错误。组件拆分要减少认知成本。没有独立语义、不会复用、没有清晰契约的拆分可能让代码更难读。

### “Props就是把所有可变值都传进去”

错误。Props应表达调用者真正需要控制的语义，不应暴露组件内部每个边距和临时坐标。

### “JSX只影响代码组织，不影响动画”

错误。父子层级决定布局上下文、裁剪、整体运动与后续局部时间边界。

### “React useState可以拿来做动画”

在普通网页交互中可以，但Remotion最终画面的时间状态必须能够由frame直接重建。

### “把所有内容写进一个组件最直接”

小例子可以。画面拥有多个清晰对象、重复结构或独立运动单元时，单个大组件会掩盖语义关系。

---

## 十五、观察重点

阅读四个示例时，重点观察：

- JSX父子结构是否对应真实画面关系；
- Props改变时，组件规则是否保持稳定；
- 重复卡片是否来自数据而非复制代码；
- frame到progress的计算是否集中在清楚的父层；
- 展示组件是否只负责把输入画出来。

## 十六、费曼式复述

向完全不会编程的人解释：

> React组件像舞台上不同区域的布置说明。JSX把这些区域按父子关系装起来，Props告诉每块区域这次显示什么。Remotion每到一帧，就让React根据当前输入重新摆出这一帧的舞台。

向程序员解释：

> React组件树是FrameImage函数的结构层。JSX保存画面层级，Props保存显式输入，父组件负责把frame转换成语义状态，展示组件把状态映射成元素与样式。稳定语义边界使画面可复用、可审计并适合后续时间编排。

## 本轮唯一必须记住的话

> JSX树不是一堆div，而是这一帧画面中“什么属于什么、什么可以一起变化”的结构模型。
