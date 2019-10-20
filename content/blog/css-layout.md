---
title: 读书笔记 - CSS网站布局实录
date: 2017-02-07 12:42:07
categories: [tech,reading]
tags: [css]
---

有些书籍，就算内容赶不上潮流，经典始终是经典，无论什么时候看，总会觉得有些新的感受新的收获。

[《CSS网站布局实录》](https://book.douban.com/subject/2175995/)，这本书不厚，关于布局、文件流、盒模型等等的基础知识，却讲得非常清晰明白。
<!-- more -->
## 一、那些CSS布局的事儿

### 一列固定宽度

```
.box-1{
    width: 300px;
}
```

### 一列宽度自适应

宽度随着视窗宽度而改变

```
.box-1{
    width: 80%;
}
```

### 一列固定宽度居中

```
.box-1{
    width: 300px;
    margin: 0 auto;
}
```

### 两列固定宽度

使用浮动，使文件流下两个块级元素流到同一行

> 文件流：body下的任意元素，根据其前后顺序和元素类型（块级、行内），组成一个个上下关系

```
.box-1{
    width: 100px;
    float: left;
}
.box-2{
    width: 100px;
    float: left;
}
```

###  两列宽度自适应

```
.box-1{
    width: 30%;
    float: left;
}
.box-2{
    width: 60%;
    float: left;
}
```

注意不要打满100%，会有两列之间的margin、padding、border等宽度影响

### 两列右列宽度自适应

左列宽度自适应同理。

```
.box-1{
    width: 100px;
    float: left;
}
.box-2{
    // 自适应：不设宽度，不设定浮动属性
}
```

### 两列固定宽度居中

```HTML
<section class="layout">
    <div class="box-1"></div>
    <div class="box-2"></div>
</section>
```

```
.layout{
    width: width1 + width2 (+ margin/borderWidth)
    margin: 0 auto;
    &:after{
        clear: both; // 清除浮动，不影响后面的文件流
    }
}
.box-1{
    width: width1;
    float: left;
}
.box-2{
    width: width2;
    float: left;
}
```

### 三列中间列宽度自适应

**左右列**使用绝对定位，脱离文件流；
**中间列**默认宽度100%，使用左右的margin来缩进左列和右列的宽度，达到自适应的效果。

如果定位不是针对整个视窗，父容器也用绝对定位，保证左右列绝对定位的参照元素是父元素。

```
.box-left{
    position: absolute;
    top: 0;
    left: 0; // 左对齐
    width: width1;
}
.box-right{
    position: absolute;
    top: 0;
    right: 0; // 右对齐
    width: width2;
}
.box-middle{
    margin: 0 width2 0 width1; // margin: 上 右 下 左
}
```

### 高度自适应

单独设置某个元素的`height: 100%;`有时候会无效。原来，根据浏览器解析规则，**子元素的高度是否能按百分比显示，取决于父元素的高度**。

假设我们要实现一个自适应视窗高度的效果：

```
// IE下，html元素默认高100%，但body不是
// Firefox下，html没有默认高100%
html, body{
    height: 100%;
}
.target{
    height: 100%;
}
```

## 二、一些经典问题

### 1. 上下margin叠加问题
**表现**
当上下对象均有`margin`属性时，外边距会出现叠加问题，取较大值。

**原因**
CSS原始设计问题。作者考虑到段落的样式控制，假如多个`p`之间形成段落，每个p都具有margin属性，为解决排版距离不一致问题，设计出外边距叠加规则。

例外情况，margin叠加只针对**块级元素**，对`inline`、`浮动`、`绝对定位`的元素无效。

### 2. IE6下，float元素margin加倍
可通过设定目标元素的`display: inline;`解决。

### 3. CSS效果：首字下沉
```
.first-character{
    line-height: 1.5;
    vertical-align: top;
    &:first-letter{
        font-size: 2em;
        float: left;
    }
}
```
### 4. 图像裁剪问题

1. CSS的clip属性（对象需使用绝对定位）
2. 父元素定宽高，使用`overflow:hidden`，局部展示子元素的图片内容
3. computed，通过计算，使图片自动水平、垂直居中
4. flex布局
