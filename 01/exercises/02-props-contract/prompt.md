# Semantic Prompt｜Props Contract：同一规则生成不同卡片

请使用Remotion与React完成：

定义MetricCard的Props契约，用同一组件渲染Views、Likes和Shares三张数据卡。

要求：

- 组件名表达画面职责。
- Props字段使用有语义的名称和明确TypeScript类型。
- JSX父子关系必须对应真实画面关系。
- 重复内容由数据数组生成，并使用稳定业务id作为key。
- 样式可以简单，但结构必须直接可读。
- 时间状态只能由frame计算，不能使用CSS animation、定时器或跨帧累积。
- 不为只使用一次、没有独立语义的div创建额外组件。
- 输出组件树，并解释每一层的职责。
