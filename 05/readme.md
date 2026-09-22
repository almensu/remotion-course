# 05｜Layer / Layout / Coordinate：组织二维画面

## 费曼类比

画布像舞台，Scene 像一段布景，Layer 像透明胶片。父层先建立自己的坐标空间，子层的位置要读成“相对于父层在哪里”。

## 层级模型

    Composition canvas
    └── Scene
        ├── Background layer
        ├── Content group
        │   ├── Title
        │   └── Subtitle
        └── Foreground layer

`AbsoluteFill` 适合建立铺满父容器的层。Flex 和 Grid 处理关系布局；absolute 处理明确的舞台位置。不要把所有对象都用随机坐标钉死。

## 轴心与裁剪

缩放和旋转总是围绕某个 origin。父容器的 `overflow` 决定子层越界后是否可见。视觉不正确时，应依次检查父层尺寸、定位上下文、轴心和裁剪。

## 参数实验

把移动方块从画布坐标改成卡片内部坐标；改变父卡片位置，验证子元素的局部运动规则是否仍成立。

## 本轮结论

> 每个位置都必须回答“相对于谁”，每个图层都应承担清楚的视觉责任。


## 本轮练习

1. [05-01｜局部坐标运动](exercises/01-local-coordinate/)
2. [05-02｜三层舞台](exercises/02-layer-stack/)

每道题固定保留 `task.md`、`prompt.md`、`params.json`、`solution.tsx` 与 `audit.md`，形成可追溯学习证据。
