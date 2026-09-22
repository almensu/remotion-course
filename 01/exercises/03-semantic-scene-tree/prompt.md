# Semantic Prompt｜Semantic Scene Tree：按画面职责拆组件

请使用Remotion与React完成：

创建产品英雄场景，由SceneBackground、TitleBlock、ProductHero和BrandFooter组成，并写出对应树状结构。

要求：

- 组件名表达画面职责。
- Props字段使用有语义的名称和明确TypeScript类型。
- JSX父子关系必须对应真实画面关系。
- 重复内容由数据数组生成，并使用稳定业务id作为key。
- 样式可以简单，但结构必须直接可读。
- 时间状态只能由frame计算，不能使用CSS animation、定时器或跨帧累积。
- 不为只使用一次、没有独立语义的div创建额外组件。
- 输出组件树，并解释每一层的职责。
