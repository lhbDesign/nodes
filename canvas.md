# Canvas

> Canvas 的默认大小为 300 像素 ×150 像素（宽 × 高，像素的单位是 px）。但是，可以使用 HTML 的高度和宽度属性来自定义 Canvas 的尺寸。为了在 Canvas 上绘制图形，我们使用一个 JavaScript 上下文对象，它能动态创建图像
>
> 引用链接： https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes

## 基本用法

```javascript
<canvas id="tutorial" width="150" height="150">当前浏览器不支持</canvas>
// ie9 及之前的版本 不支持 canvas 所以使用标签内容进行替换， 支持 canvas 的浏览器将会跳过标签内容， 此标签内容也可以放图片<img> 等 其他标签
```

canvas 元素只有两种属性 width 和 height ， id 属性是 html 元素通用属性， 宽高不指定的时候， 会使用默认的宽高 300 *150

canvas 元素的闭合标签不可被省略

### 渲染上下文

[`canvas`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas) 元素创造了一个固定大小的画布，它公开了一个或多个**渲染上下文**，其可以用来绘制和处理要展示的内容。我们将会将注意力放在 2D 渲染上下文中。其他种类的上下文也许提供了不同种类的渲染方式；比如， [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API) 使用了基于[OpenGL ES](https://www.khronos.org/opengles/)的 3D 上下文 ("experimental-webgl") ；

```javascript
// 兼容不支持canvas 的浏览器
var canvas = document.getElementById('tutorial'); // tutorial canvas dom

if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

## 图形

> 画布栅格（canvas grid）以及坐标空间  canvas 元素默认被网格所覆盖。通常来说网格中的一个单元相当于 canvas 元素中的一像素。栅格的起点为左上角（坐标为（0,0））。所有元素的位置都相对于原点定位。[`canvas`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas) 只支持两种形式的图形绘制：矩形和路径（由一系列点连成的线段）。

### 绘制矩形

1. 绘制一个填充的矩形

   [`fillRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillRect)

2. 绘制一个矩形的边框

   [`strokeRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/strokeRect)

3. 清除指定矩形区域，让清除部分完全透明。

   [`clearRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clearRect)

### 绘制路径

> 图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至一个子路径，都是闭合的。使用路径绘制图形需要一些额外的步骤。

- 绘制步骤

1. 首先，你需要创建路径起始点。
2. 然后你使用[画图命令](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D#paths)去画出路径。
3. 之后你把路径封闭。
4. 一旦路径生成，你就能通过描边或填充路径区域来渲染图形。

- 绘制API

1. beginPath（）

   新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。

2. closePath（）

   闭合路径之后图形绘制命令又重新指向到上下文中。

3. stroke（）

   通过线条来绘制图形轮廓。

4. fill（）

   通过填充路径的内容区域生成实心的图形。

   <font color=red>注意：</font>`当你调用 fill() 函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用 closePath() 函数。但是调用 stroke() 时不会自动闭合。`

### 移动笔触

> 这个函数实际上并不能画出任何东西，也是上面所描述的路径列表的一部分，这个函数就是`moveTo()`。

- `moveTo(x,y)`将笔触移动到指定的坐标 x 以及 y 上。

```javascript
// 绘制一个笑脸
function draw() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext){
    var ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // 绘制
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);   // 口 (顺时针)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // 左眼
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // 右眼
    ctx.stroke();
  }
}
```

### 线

- lineTo（x，y）

  绘制一条从当前位置到指定 x 以及 y 位置的直线。

### 圆弧

- [`arc(x, y, radius, startAngle, endAngle, anticlockwise)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/arc)

  画一个以（x,y）为圆心的以 radius 为半径的圆弧（圆），从 startAngle 开始到 endAngle 结束，按照 anticlockwise 给定的方向（默认为顺时针）来生成。

- [`arcTo(x1, y1, x2, y2, radius)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/arcTo)

  根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。

<font color=red>注意：</font> `arc()` 函数中表示角的单位是弧度，不是角度。角度与弧度的 js 表达式：

**弧度=(Math.PI/180)\*角度。**



