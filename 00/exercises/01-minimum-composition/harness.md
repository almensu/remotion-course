# Harness｜允许与禁止

只允许修改Composition的id、component、width、height、fps和durationInFrames。先不要添加动画。

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
