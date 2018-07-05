---
title: 如何更愉快地使用em和rem —— 别说你懂CSS相对单位
date: 2018-07-05 13:28:00
tags:
- front-end
- css
---

前段时间试译了Keith J.Grant的CSS好书《CSS in Depth》，其中的第二章《Working with relative units》，书中对relative units的讲解和举例可以说相当全面，看完之后发现自己并不太懂CSS相对单位，也希望分享给大家，所以有了这个译文系列。（若有勘误或翻译建议，欢迎 [Github PR](https://github.com/YuyingWu/blog/tree/dev/source/_posts) ^_^）

《别说你懂CSS相对单位》系列译文：

* [如何更愉快地使用em和rem](/blog/archives/css-in-depth-relative-units/) [本文]
* [停止使用像素思维去思考](/blog/archives/css-in-depth-stop-thinking-in-px/)
* [视口相关单位的应用](/blog/archives/css-in-depth-viewport-relative-units/)
* [无单位数字和行高](/blog/archives/css-in-depth-unitless-number/)
* [CSS自定义属性](/blog/archives/css-in-depth-css-variables/)

本文对应的章节目录：

* 2.1 相对单位值的魔力
  * 2.1.1 完美像素设计（pixel-perfect design）的挣扎
  * 2.1.2 完美像素网页的终结
  * 像素（pixel）、点（point）和pc（pica）
* 2.2 em和rem
  * 2.2.1 对font-size使用em
    * 当我们在一个元素内用em同时声明font-size和其他属性
    * 字号收缩问题
  * 2.2.2 对font-size使用rem
    * 可用性：对font-size使用相对长度单位

***

CSS提供了很多种方式去定义一个值。大家最熟悉的可能也是最容易使用的就是像素（pixel），这被称做“绝对单位”。也就是说，5px在不同的场景下是一样的值。而其他的单位，如em和rem，不是绝对的而是相对的。相对单位的值会根据外部影响因素的变化而变化。例如，2em的值取决于你在哪个元素使用它（有时甚至是哪个属性）。很自然，相对单位使用起来会比较困难。

开发人员，甚至有经验的CSS开发人员，往往不喜欢跟相对单位打交道，其中包括臭名昭著的em。em的值可以被改变的方式似乎难以预测，没有px那么清晰。在本章中，我将揭开相对单位的神秘面纱。首先，我会解释它们为CSS带来的独特价值，然后我会帮助你更好地理解它们。我会解释它们的工作原理，也会告诉你怎么征服它们那看似不可预测的特性。你可以让相对单位为你所用，正确地运行，它们将让你的代码变得更加简单、灵活和容易使用。

## 2.1 相对单位值的魔力

CSS是通过迟邦定（late-binding）的方式把样式渲染到web页面上的：内容和它的样式会在各自的渲染完成之后再合并到一起。比起其他类型的图形设计，这给设计过程添加了它们没有的复杂程度，同时也赋予CSS更强大的能力 —— 一个样式表可供成百上千个页面使用。此外，用户可以直接改变页面的最终呈现方式。举个例子，用户可以更改默认字号大小或者调整浏览器窗口的大小。

在早期的计算机应用程序开发以及传统出版行业中，开发人员或出版商清楚知道所在的媒介存在哪些限制。对于一个特定的应用程序，窗口可能是400px宽，300px高，或者一个版面可能是4英寸宽，6½英寸高。因此，当开发人员布局应用程序的按钮和文本时，他们很清楚这些元素可以做成什么尺寸，以及在屏幕上还有多少空间可以留给他们用来处理其他元素。然而在网页上，情况却不是这样的。

### 2.1.1 完美像素设计（pixel-perfect design）的挣扎

在web环境下，用户可以将浏览器窗口设置为任意大小，且CSS需要去适应它。另外，用户可以在一个页面打开后，再调整它的大小，CSS也需要去适应这些新的约束条件。这说明了在你创建页面时样式还没有被调用，而是当页面在屏幕上渲染时，浏览器才会去计算样式的规则。

这给CSS增加了一层抽象的概念。我们不应该根据理想的情境来设计元素，而是应该声明一些样式规则，可以让该元素在任何场景下都能跑通。对于现在的互联网，你的页面可能要在一个4英寸的手机屏幕上展示，也可能在一个30英寸的大屏幕上。

长久以来，设计师大量使用“完美像素”设计，缓解了这个问题带来的复杂性。他们会创建一个有着严格定义的容器，通常是一个大约800px宽的居中的纵向列。然后在这些限制下他们再进行设计，这跟他们的前辈在原生应用程序或印刷出版物中做的设计或多或少有点类似。

### 2.1.2 完美像素网页的终结

随着技术的进步和制造商推出更高分辨率的显示器，像素完美的设计方式慢慢开始崩溃。在21世纪初期，把页面设计成1024px宽还是800px宽，哪个是更保险的展示策略？开发者针对这个问题讨论得很多。然后，我们又针对能否改成1280px宽有类似的讨论。是时候做个决定了。把我们网站的内容宽度做得宽一点（相对于落伍的小电脑屏幕），还是做得窄一点（相对于新出的大屏幕），哪个选择更好呢？

当智能手机出现的时候，开发人员终于要（被迫）要停止假装每个人都可以在他们的网站上获得相同的体验了。不管我们喜不喜欢，我们都得放弃已知的多栏定宽（px）布局，并开始考虑响应式设计。我们再也不能逃避CSS所带来的抽象概念（abstraction），相反，我们要去拥抱这项特性。

> 响应式 —— 在CSS中，这指的针对不同大小的浏览器窗口，用不同的方式响应更新页面的样式。我们要对不同尺寸的手机、平板电脑或桌面显示器多花心思了。我们将在[第8章](https://livebook.manning.com/#!/book/css-in-depth/chapter-8/ch08)中详细介绍响应式设计，但在本章中，我会先给大家介绍一些重要的基础概念。

增加的抽象概念意味着额外的复杂性。如果我设定一个宽度为800px的元素，那么它在一个更小的窗口中会怎么显示呢？如果一个横向菜单不能全部在一行展示完，它又会怎么展示？在编写CSS时，你需要能够同时考虑具体情况以及普适性的问题。如果针对一个特定的问题，你有多种方式可以解决，那么你应该选那个在多种不同场景下更通用的解决方案。

在抽象概念这个问题上，相对单位是CSS提供的工具之一。与其把字号大小设置为14px，你可以把它设置为与窗口大小成比例缩放。或者，你可以设置页面上所有元素是依赖基础字号大小的变化而变化的，然后用一行代码就可以达到调整整个页面的目的。接下来，我们来看看CSS提供了哪些方式来实现以上的效果。

> ### 像素（pixel）、点（point）和pc（pica）
> CSS支持一些绝对长度单位，其中最常见也最基本的是像素（px）。较不常见的绝对单位有毫米（mm，millimeter）、厘米（cm，centimeter）、英寸（in.，inch）、点（pt，point，印刷术语，长度为1/72 inch）以及pc（pica，印刷术语，长度为12 points）。如果你想了解其中的计算方式，以上的长度单位都可以直接转换成另一个单位：1 inch = 25.4 mm = 2.54 cm = 6 pc = 72 pt = 96 px。因此，16px与12pt（16/96×72）是等价的。设计师通常更熟悉点（point）的使用，而开发人员更习惯于像素，因此在和设计师沟通时，你可能需要在两者之间做一些计算工作。  
> 
> 像素这个名字有点误导性 —— 1 CSS像素并不严格等同于显示器的1像素，在高分辨率显示器（如“Retina显示屏”）上尤其明显。尽管根据浏览器、操作系统和硬件的不同，CSS的测量值可能会有细微的差别，但96px总是会大致等于屏幕上的物理1英寸。（尽管有可能会因某些设备或用户设置而异。）

## 2.2 em和rem

em是最常见的相对长度单位，这是排版中使用的一种度量方式，基准值是当前元素的字号大小。 在CSS中，1em表示当前元素的字号大小，实际值取决于在哪个元素上应用。图2.1展示了一个padding为1em的`div`。

[ 图 2.1：padding为1em的元素（添加虚线是为了让padding更明显）]

!["图 2.1"](http://sinacloud.net/woodysblog/css-in-depth/02fig01_alt.jpg)

模板代码片段如下。这套样式规则定义字号为16px，也就是元素本身1em代表的值，然后再使用em来声明元素的padding。 把这段代码添加到一个新的样式表里，在`<div class ="padded">`下随手写些文字，然后到浏览器看看效果吧。

代码片段 2.1：在padding上使用em

```
.padded {
  font-size: 16px;
  padding: 1em;          1
}
```

* 1 把各个方向的padding的值设置为字号大小

把`padding`赋值为1em，乘以字号，得到一个值为16px的`padding`渲染值。重点来了，使用相对单位声明的值会由浏览器转化为一个绝对值，我们称之为计算值。

在这个例子里，将`padding`改为2em会生成一个32px的计算值。如果同一个元素的另一个选择器，用一个不一样的字号值去覆盖它，这会改变em在这个域下的基准值，那么`padding`的计算值也会相应变化。

在设置`padding、height、width或border-radius`等属性时，使用em可能会很方便，因为如果它们继承了不同的字号大小，或者用户更改了字体设置，这些属性会均匀地缩放。

图2.2展示了两个不同大小的盒子。盒子内的`font-size`、`padding`和`border-radius`各不相同。

[ 图 2.2：有相对大小的padding和border-radius的元素 ]

!["图 2.2"](http://sinacloud.net/woodysblog/css-in-depth/02fig02.jpg)

你可以通过用em声明`padding`和`border-radius`来给这些盒子声明样式规则。首先给每个元素设定`padding`和`border-radius`为1em，然后给每个盒子指定不同的字号，那么其他属性会跟着字号缩放。

在你的HTML代码里，创建如下的两个盒子，类名分别是`box-small`和`box-large`，代表两个字号修饰符。

[ 代码片段 2.2：在不同元素上使用em（HTML）]

```
<span class="box box-small">Small</span>
<span class="box box-large">Large</span>
```

现在，添加下面的样式到你的样式表。这里使用了em声明了一个盒子。还定义了小字号和大字号的修饰符，指定不同的字号大小。

[ 代码片段 2.3：在不同元素上使用em（CSS）]

```
.box {
  padding: 1em;
  border-radius: 1em;
  background-color: lightgray;
}

.box-small {
  font-size: 12px;              1
}

.box-large {
  font-size: 18px;              1
}
```

* 1 不同的字号大小，这会改变元素的em实际值的大小。

这是em一个强大的功能。你可以定义一个元素的字号大小，然后使用一句简单的声明，就可以通过改变字号大小从而控制整个元素大小缩放。你后面将会创建另外一个这样的例子，不过首先，我们来讨论一下em和字号大小。

### 2.2.1 对font-size使用em

当`font-size`使用em作为单位时，它的表现会有点不一样。我之前说过，em是以当前元素的字号大小作为基准值的。但是，如果你把一个元素的字号设为1.2em的时候，这是什么意思呢？一个元素的字号大小是不能等于它自己的1.2倍的。相反，在`font-size`上的em会先从继承到的字号大小衍生出来。

举个简单的例子，见图2.3。以下展示了一些不同字号大小的文字。在代码片段2.4，你会用到em来实现。

[ 图 2.3 以em为单位的两种不同的字号大小 ]

!["图 2.3"](http://sinacloud.net/woodysblog/css-in-depth/02fig03.jpg)

在你的页面添加以下代码片段。第一行文字，在`<body>`标签里面，它会按body的字号大小渲染。第二部分，口号（slogan），继承父元素的字号大小。

[ 代码片段 2.4 相对`font-size`的模板 ]

```
<body>
  We love coffee
  <p class="slogan">We love coffee</p>          1
</body>
```

* 1 slogan从<body>继承了字号大小。

代码片段中，CSS代码片段声明了`body`的字号大小。为了更加清晰，在这里我用了px来声明。下一步，你可以用em来放大slogan的字号大小。

[ 代码片段 2.5：在font-size上使用em ]

```
body {
  font-size: 16px;
}

.slogan {                  1
  font-size: 1.2em;        1
}                          1
```

* 1 计算：这个元素继承到字号，乘以1.2

slogan声明的字号大小是1.2em，为了计算转换成像素值，你需要引用继承的字号16px，16 * 1.2 = 19.2，所以计算字号值是19.2px。

> 提示 
>  
> 如果你已经知道以px为单位的基础字号大小，但希望把它改用em声明，下面有个简单的计算公式：目标em值 = 目标像素值 / 父元素（被继承元素）像素值。举个例子，如果你想要一个10px的字号大小，父元素的字号是12px，10 / 12 = 0.8333em。如果你想要16px的字号大小，父元素字号是12px，那么 16 / 12 = 1.3333em。我们会在这章里多次用到这个计算公式。

有一点对你很有帮助，对于大多数浏览器，默认字号大小是16px。技术上，关键字medium会被计算转换为16px。

#### 当我们在一个元素内用em同时声明font-size和其他属性

你已经使用过em声明`font-size`了（基于一个继承的字号大小值）。以及，你也曾经使用em声明其他属性，如`padding`和`border-radius`（基于当前元素的字号大小值）。当你针对同一个元素使用em声明`font-size`和其他属性的时候，em会变得很神奇。此时浏览器必须先计算`font-size`，然后基于这个值再去计算其他值。这些属性声明的时候使用的是相同的em值，但很可能它们会有不同的计算值。

在之前的例子里，我们计算到字号大小是19.2px（继承的16px乘以1.2em）。图2.4是相同的slogan元素，但有额外的1.2em `padding`以及为了让`padding`大小更加明显的灰色背景。可以看出，`padding`比`font-size`稍微大一些，尽管它俩声明的时候em值是一样的。

[ 图2.4 一个font-size为1.2em以及padding为1.2em的元素 ]

!["图 2.4"](http://sinacloud.net/woodysblog/css-in-depth/02fig04_alt.jpg)

现在的情况是，这个段落从`body`继承了16px的字号大小，通过计算得到值为19.2px的字号计算值。这意味着，19.2px是1em在当前域的基础值，而这个值会被用作计算`padding`的值。对应的CSS代码在下面，更新你的样式表并查看你的测试页面吧。

[ 代码片段 2.6 在font-size和padding上使用em ]

```
body {
  font-size: 16px;
}

.slogan {
  font-size: 1.2em;             1
  padding: 1.2em;               2
  background-color: #ccc;
}
```

* 1 赋值为 19.2 px
* 2 赋值为 23.04 px

在这个例子里，`padding`的声明值为1.2em，乘以19.2px（当前元素的字号大小），计算出23.04px。我们可以看到，尽管`font-size`和`padding`声明时em值是一样的，但它们的计算值是不一样的。

#### 字号收缩问题

当你使用em声明多层嵌套的元素字号时，会产生意想不到的效果。要弄清楚每个元素的实际值，首先你需要知道它继承的父元素的字号大小，如果父元素的字号也是用em声明的，那么你需要知道它的父元素的字号大小，在dom树往上查，以此类推。

当你使用em声明列表的字号大小，列表嵌套了好几层，效果就更明显了。大多数web开发者会发现在他们的职业生涯里面，图2.5的列表嵌套形式有点眼熟。文字在逐步缩小！正是因为em带来的这一类烦人的问题，开发者才对em避而远之。

[ 图 2.5 嵌套列表中的字号缩小现象 ]

!["图 2.5"](http://sinacloud.net/woodysblog/css-in-depth/02fig05.jpg)

当你多层嵌套列表，而每一层声明的字号大小以em为单位，字号收缩现象就会发生。在代码片段2.7和2.8的例子里，无序列表的字号是0.8em。这个选择器对页面上所有的ul有效，所以当一个列表从另外一个列表继承到字号大小的时候，em就产生复合效果。

[ 代码片段 2.7 在列表上使用em ]

```
body {
  font-size: 16px;
}

ul {
  font-size: .8em;
}
```

[ 代码片段 2.8 多层嵌套的列表 ]

```
<ul>
  <li>Top level
    <ul>                                    1
      <li>Second level                      1
        <ul>                                2
          <li>Third level                   2
            <ul>                            3
              <li>Fourth level              3
                <ul>
                  <li>Fifth level</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

* 1 这个列表嵌套在第一个列表里，继承了它的字号大小
* 2 然后这个列表又嵌套在另一个列表里，继承了第二个列表的字号大小
* 3 ……以此类推

每一个列表的字号大小是0.8乘以父元素的字号大小。这代表第一个列表的字号大小是12.8px，嵌套的子列表字号大小是10.24px（12.8px * 0.8），第三层列表的是8.192px，如此类推。同样地，如果你给字号大小的赋值大于1em，相反，文字的字号会一层层变大。我们想要的效果是像图2.6一样，在顶层声明字号的大小，但下面嵌套层级的列表字号保持不变。

[ 图 2.6 字号正常的多层嵌套列表 ]

!["图 2.6"](http://sinacloud.net/woodysblog/css-in-depth/02fig06.jpg)

其中一种实现的方式可以看看代码片段2.9。第一个列表的字号大小还是0.8 em（见示例2.7），第二个选择器对嵌套在无序列表的无序列表有效 —— 也就是除了第一个无序列表以外的所有无序列表。现在嵌套的列表设定了跟父元素一致的字号大小，正如图2.6一样。

代码片段 2.9 字号收缩现象的纠正

```
ul {
  font-size: .8em;
}

ul ul {                1
  font-size: 1em;      1
}  
```

* 1 嵌套在列表里面的列表，应该把字号大小设定为跟父元素一样

这可以解决问题，但不是最优方案。因为你设置了一个字号值，马上用另一个选择器重写了这个规则。如果你可以使用针对嵌套的列表声明一个特定的选择器，避免互相覆盖，会是一个更好的方案。

到现在我们清楚了，如果你不是一个比较小心的人，你应该远离em。使用em作为`padding`、`margin`和元素缩放效果的单位挺好的，但当em遇上`font-size`时，事情可以变得很复杂。感谢上天，我们有个更好的选择 —— rem。

### 2.2.2 对font-size使用rem

当浏览器解析HTML文档时，创建了一个用来代表页面元素的集合，叫做DOM（文档对象模型，Document Object Model）。树状结构，每一个节点代表一个元素。`<html>`就是顶层节点（根节点），在下面的是它的子节点`<head>`和`<body>`，再往下就是它们的子节点，还有后代节点，如此类推。

根节点是文档里所有其他元素的祖先。它有一个特别的伪类（pseudo-class）选择器（:root），在样式表里可以用这个选择器表示。使用带类名的类型选择器html，或者直接用标签选择器，效果是一样的。

rem是根em（root em）的缩写。rem是和根元素关联的，不依赖当前元素。不管你在文档中的什么地方使用这个单位，1.2rem的计算值是相等的，等于1.2倍的根元素的字号大小。下面的示例代码中，声明了根元素的字号大小，并在嵌套的无序列表中使用rem声明字号大小。

[ 代码片段 2.10 使用rem声明字号大小 ]

```
:root {                    1
  font-size: 1em;          2
}

ul {
  font-size: .8rem;
}
```

* 1 伪类 :root 等价于 html 选择器
* 2 使用浏览器的默认字号大小（16px）

在这个示例里，根字号大小是浏览器的默认大小16px（根元素的1em等于浏览器的默认字号大小）。无序列表的字号大小为0.8rem，计算结果是12.8px。因为这只跟根元素相关，尽管你在列表里嵌套了列表，嵌套子列表的字号仍然保持不变。

> #### 可用性：对font-size使用相对长度单位  
> 
> 一些浏览器会提供给用户2种方式定制文字的大小：缩放和设置一个默认的字号大小。通过按Ctrl+或者Ctrl-，用户可以对页面进行缩放。这在视觉上会把整个页面的文字或图片（其实是所有元素）都放大或缩小了。在一些浏览器，这个改变只针对当前的标签页且是临时的，不会影响到新开的标签页。 
>  
> 设置默认字号大小，会有点不一样。不仅仅是设置的入口比较难找（一般在浏览器的设置页），而且这个设置是永久的，直到用户把默认值还原。值得注意的是，这个设置对使用px或其他绝对单位定义的字号大小无效。因为默认字号大小对一些用户是必要的，尤其是弱视的群体，你应该用相对单位或百分比来定义字号的大小。

rem简化了很多em带来的复杂度。事实上，rem提供了一个在px和em间的相对单位折中解决方案，而且更易于使用。那么，是不是意味着你应该在对所有元素都使用rem，去掉其他长度单位呢？当然不是。

在CSS的世界里，这个答案通常是，看情况。rem只是你的工具箱中的其中一个。掌握CSS很重要的一点，就是学会分辨在什么场景下该使用什么工具。我的选择是，对`font-size`使用rem，对border使用px，对其他的度量方式如`padding`、`margin`、`border-radius`等使用em。然而在必要时，需要声明容器的宽度的话，我更喜欢使用百分比。

这样，字号大小就变得可预测，而当其他因素影响到元素的字号大小时，你也可以借助em去缩放元素的padding和margin。在border上使用像素是很合适的，尤其当你想要一根漂亮的线的时候。以上就是我对不同属性使用不同单位的理想方案，不过我要再次声明，这些都是工具，在某些特定场景下，利用不同的工具可能取到更好的效果。

> 提示  
> 
> 当你不确定的时候，对`font-size`使用rem，对`border`使用px，以及对其他大多数属性使用em。

***

《别说你懂CSS相对单位》系列译文：

* [如何更愉快地使用em和rem](/blog/archives/css-in-depth-relative-units/) [本文]
* [停止使用像素思维去思考](/blog/archives/css-in-depth-stop-thinking-in-px/)
* [视口相关单位的应用](/blog/archives/css-in-depth-viewport-relative-units/)
* [无单位数字和行高](/blog/archives/css-in-depth-unitless-number/)
* [CSS自定义属性](/blog/archives/css-in-depth-css-variables/)

章节：

* 2.1 相对单位值的魔力
  * 2.1.1 完美像素设计（pixel-perfect design）的挣扎
  * 2.1.2 完美像素网页的终结
  * 像素（pixel）、点（point）和pc（pica）
* 2.2 em和rem
  * 2.2.1 对font-size使用em
    * 当我们在一个元素内用em同时声明font-size和其他属性
    * 字号收缩问题
  * 2.2.2 对font-size使用rem
    * 可用性：对font-size使用相对长度单位
* 2.3 停止使用像素思维去思考
  * 2.3.1 设置一个合理的字号默认值
  * 2.3.3 让这个面板变得“响应式”
  * 2.3.3 调整单个组件的大小
* 2.4 视口相关单位（viewport-relative units）
  * CSS3
  * 2.4.1 在font-size上使用vw
  * 2.4.2 在font-size上使用calc()
* 2.5 不带单位的数字（unitless number）和行高（line-height）
* 2.6 自定义属性（也叫“CSS变量”）
  * 2.6.1 动态改变自定义属性的值
  * 2.6.2 通过JavaScript改变自定义属性的值
  * 2.6.3 初探自定义属性
* 总结

***

原著版权信息：

作者：Keith J.Grant  
书籍：CSS in Depth  
章节：[Working with relative units](https://livebook.manning.com/#!/book/css-in-depth/chapter-2)  

*** 

笔者 @Yuying Wu，前端爱好者 / 鼓励师 / 新西兰打工度假 / 铲屎官。目前就职于某大型电商的B2B前端团队。

感谢你读到这里，对上文若有任何疑问或建议，欢迎留言。

如果你和我一样喜欢前端，喜欢捣腾独立博客或者前沿技术，或者有什么职业疑问，欢迎关注我以及各种交流哈。

独立博客：[wuyuying.com](http://wuyuying.com/)  
知乎ID：[@Yuying Wu](https://www.zhihu.com/people/yuying_wu/posts)  
Github：[Yuying Wu](https://github.com/YuyingWu)