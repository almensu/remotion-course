# Harness｜本题边界

MetricCard只接收label、value和accentColor。列表key必须使用稳定id。不得复制三份卡片JSX。

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
