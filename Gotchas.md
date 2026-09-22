# Remotion Course Gotchas

## 1. 使用 CSS animation / transition

Studio 播放看似正常，逐帧渲染可能不对应时间轴。所有运动由 `frame` 计算。

## 2. 用 `position += speed` 累积状态

跳到任意帧或并行渲染会失去前序状态。改为 `position = start + speed * frame / fps`。

## 3. 把 frame 当成 second

同一代码换 FPS 后速度改变。语义时长先用秒描述，在明确边界乘以 fps。

## 4. 插值没有 clamp

超出输入区间后属性继续增长，元素越过终点。进入和离开动画通常都应声明左右 clamp。

## 5. 使用 `Math.random()` 或当前时间

相同帧产生不同画面。使用固定输入和 Remotion 的确定性随机方法，种子应包含业务 ID 或 frame。

## 6. 将 Composition、Scene、Layer 混为一层

结果是时长、局部时间与布局责任纠缠。Composition 管规格，Scene 管段落，Layer 管同一时刻的叠放。

## 7. 素材路径写成普通相对路径

开发环境可见，渲染环境失败。`public/` 资源通过 `staticFile()` 引用。

## 8. 只播放，不检查边界帧

一帧闪烁很难用肉眼发现。固定检查 0、开始前一帧、开始帧、结束前一帧和结束帧。

## 9. 为了复用过早封装

初学阶段隐藏了 frame 到属性的因果关系。先让代码可见，出现稳定重复后再抽组件。

## 10. 只检查 Studio，不检查输出

最终交付还受编码器、字体、资源和尺寸影响。成品阶段至少做一次实际渲染抽查。
