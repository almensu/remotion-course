# Harness｜允许与禁止

本练习暂不使用interpolate。progress必须由frame和durationInFrames直接计算，并处理只有1帧时的除零问题。

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
