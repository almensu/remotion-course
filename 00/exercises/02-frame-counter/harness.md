# Harness｜允许与禁止

必须通过useCurrentFrame读取frame，通过useVideoConfig读取fps和durationInFrames；seconds只能由frame/fps得到。

## 统一允许

- React函数组件
- Remotion核心API
- 行内样式或静态CSS
- 由frame直接得到的纯计算

## 统一禁止

- CSS animation / transition
- 浏览器实时钟
- 需要先播放前一帧才能成立的状态
- 没有单位、没有名字的关键数字
