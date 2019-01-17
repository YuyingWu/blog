---
title: JavaScript网页动画设计：velocity.js
tags:
  - tech
  - reading
  - javascript animation
  - animate
  - velocity.js
date: 2016-04-22 16:46:19
---

最近读了一本讲js动画的书[《JavaScript网页动画设计》](https://book.douban.com/subject/26694195/)，看了开头就知道是本[velocity.js](http://www.julian.com/research/velocity/)的大型广告书，但不得不说，这个动画库可以给日常的动画开发带来许多的便利，在书中我也get到了一些动画开发的新思路，推荐一下~

<!-- more -->

## 一、动画代码优化
* 单独把动画逻辑的js抽离成独立的文件
* 定义一个对象（以动画目标命名），根据我们所需动画的设定，抽离出需要维护的参数，如动画的属性和选项

```
var fadeIn = {
    // p -> properties
    p: {
        opacity: 1,
        top: "50px"
    },
    // o -> options
    o: {
        duration: 1000,
        easing: "linear"
    }
};

$element.velocity(fadeIn.p, fadeIn.o);
```


## 二、动画工作流

### 1. 传统方式：按照动画顺序，完成一个元素的动画后，callback里嵌套另一个元素的动画

```
// 设置element1的动画,紧接着设置element2的动画,紧接着设置element3的动画 $element1.velocity({ translateX: 100, opacity: 1 }, 1000, function() {
$element2.velocity({ translateX: 200, opacity: 1 }, 1000, function() { $element3.velocity({ translateX: 300, opacity: 1 }, 1000);
  }); 3 });
```

缺点：

* 因为每一级都有嵌套,因此代码在横向上会迅速变长,这使得在IDE中编辑代码越来越 困难。
* 在整个序列中,都无法轻易重新调整调用的顺序。(如果要调整的话,需要非常小心地复 制粘贴。)
* 无法轻易指明哪些调用应该是并行运行的。比如在整个序列运行到一半的时候,想让两 幅图片从不同的起始点滑入视图。把这段代码写进去以后,怎么样嵌套并行的小序列之 后发生的动画,同时又不让原本已经难以维护的代码变得难上加难,就不是那么轻易能 办得到了。

### 2. velocity序列触发（UI pack）

```
// 创建 Velocity 调用的数组 
var loadingSequence = [
{ e: $element1, p: { translateX: 100, opacity: 1 }, o: { duration: 1000 } }, { e: $element2, p: { translateX: 200, opacity: 1 }, o: { duration: 1000,  sequenceQueue: false } }, { e: $element3, p: { translateX: 300, opacity: 1 }, o: { duration: 1000 } }
];

// 将数组传入 $.Velocity.RunSequence 函数中以启动序列 
$.Velocity.RunSequence(loadingSequence);
```
优点：

* 可以很容易地对整个序列重新排序,不需要担心破坏了嵌套结构。
* 可以迅速看出各个调用的属性和选项的不同之处。
* 你的代码对别人来说也非常易读,其意图也一目了然。
* $element2的option中，设置了sequenceQueue:false，使得$element1和$element2会并行触发

### 3. 设计技巧

#### 3.1 定义全局定时乘数

在每个动画调用中，将这个乘数与duration和delay选项值相乘

```
var M = 1;

$element1.animate({ opacity: 1 }, { duration: 1000 * M }); $element2.velocity({ opacity: 1 }, { delay: 250 * M });
```

好处：

* 慢速可以更容易分析单个元素如何跟其他元素互动
* 执行重复性UI测试，方便加快动画播放速度

Tips:  
Velocity中的方法能实现类似的功能：

```
$.Velocity.mock = 5;
```


#### 3.2 VMD 动效设计器
[VMD](http://julian.com/research/velocity/#vmd)

## 三、文本动画
字符串切割的js插件：[blast](Julian.com/research/blast)  
以sentence、word、character切割文本，添加blast或者自定义classname

* 用blast切割文本
* 把文本元素隐藏
* 逐个元素动画相继延迟出现

```
// 选择之前已拆分的文本 
$("div .blast").velocity(
    // 使用适当的UI pack效果让现有文本以动画方式离开视图     "transition.fadeOut",
    {
        // 像错开进入动画一样错开离开动画
        stagger: 50,
        backwards: true,
        // 当文本离开视图的动画完成以后,开始文本进入视图的动画 
        complete: function() {
            // 继续进行文本进入视图的动画 
            $("div")
                .html(message)
                .blast({ delimiter: "word"})
                .css("opacity": 0)
                .velocity({opacity: 1}, {stagger: 50});
        }
    }
);
```

## 四、最佳实践

* 减少dom元素重复查询，尽量复用变量
* 监听scroll或者resize时，对事件句柄进行反跳（[debounce](davidwalsh.name/javascript-debounce-function )）
* 当检测到用户使用性能较弱的浏览器，使所有动画立即完成

```
    $.Velocity.mock = true;
```
 

## Reference

* [webflow](https://webflow.com/)
* [SVG口袋指南](https://github.com/jonitrythall/svgpocketguide)
