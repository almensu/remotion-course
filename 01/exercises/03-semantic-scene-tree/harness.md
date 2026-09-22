# Harness｜本题边界

只拆分具有独立画面职责的组件。组件名必须表达语义。场景组件负责整体Grid，子组件负责各自内部布局。

## 允许

- React函数组件与TypeScript Props
- Remotion核心组件
- Flex、Grid、absolute等静态布局
- 父组件计算后传入的视觉状态

## 禁止

- Box1、Thing2、ComponentA等无语义名称
- 复制多份相同JSX代替数据驱动
- `Math.random()` 生成key
- `useState`、定时器或CSS动画模拟视频时间
