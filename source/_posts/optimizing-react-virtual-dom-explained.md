---
title: "[译] React性能优化-虚拟Dom原理浅析"
date: 2018-05-13 19:15:19
tags:
  - front-end
  - performance
  - reactjs
  - translation
type: photo
cover: http://sinacloud.net/woodysblog/img/bkg.jpg
---

本文译自[《Optimizing React: Virtual DOM explained》](https://evilmartians.com/chronicles/optimizing-react-virtual-dom-explained)，作者是[Alexey Ivanov](https://github.com/iAdramelk)和[Andy Barnov](https://github.com/progapandist)，来自[Evil Martians’ team](https://evilmartians.com/chronicles)团队。

译者说：通过一些实际场景和demo，给大家描述React的Virtual Dom Diff一些核心的原理和规则，以及基于这些我们可以做些什么提高应用的性能，很棒的文章。

***

**通过学习React的Virtual DOM的知识，去加速你们的应用吧。对框架内部实现的介绍，比较全面且适合初学者，我们会让JSX更加简单易懂，给你展示React是如何判断要不要重新render，解释如何找到应用的性能瓶颈，以及给大家一些小贴士，如何避免常见错误。**

React在前端圈内保持领先的原因之一，因为它的学习曲线非常平易近人：把你的模板包在`JSX`，了解一下`props`和`state`的概念之后，你就可以轻松写出React代码了。

如果你已经熟悉React的工作方式，可以直接跳至“优化我的代码”篇。

但要真正掌握React，你需要像React一样思考（think in React）。本文也会试图在这个方面帮助你。

下面看看我们其中一个项目中的React table：

!["eBay上的一个巨大的React表格  用于业务。"](http://sinacloud.net/woodysblog/img/ebay_table.png)

这个表里有数百个动态（表格内容变化）和可过滤的选项，理解这个框架更精细的点，对于保证顺畅的用户体验至关重要。

***

**当事情出错时，你一定能感觉到。输入字段变得迟缓，复选框需要检查一秒钟，弹窗一个世纪后才出现，等等。**

***

为了能够解决这些问题，我们需要完成一个React组件的整个生命旅程，从一开始的声明定义到在页面上渲染（再然后可能会更新）。系好安全带，我们要发车了！

## JSX的背后

这个过程一般在前端会称为“转译”，但其实“汇编”将是一个更精确的术语。

React开发人员敦促你在编写组件时使用一种称为JSX的语法，混合了HTML和JavaScript。但浏览器对JSX及其语法毫无头绪，浏览器只能理解纯碎的JavaScript，所以JSX必须转换成JavaScript。这里是一个div的JSX代码，它有一个class name和一些内容：


```jsx
<div className='cn'>
  Content!
</div>
```

以上的代码，被转换成“正经”的JavaScript代码，其实是一个带有一些参数的函数调用：

```javascript
React.createElement(
  'div',
  { className: 'cn' },
  'Content!'
);
```

让我们仔细看看这些参数。

* 第一个是元素的`type`。对于HTML标签，它将是一个带有`标签名称`的字符串。
* 第二个参数是一个包含所有元素属性（`attributes`）的对象。如果没有，它也可以是空的对象。
* 剩下的参数都可以认为是元素的子元素（`children`）。元素中的文本也算作一个child，是个字符串'Content！' 作为函数调用的第三个参数放置。

你应该可以想象，当我们有更多的children时会发生什么：

```jsx
<div className='cn'>
  Content 1!
  <br />
  Content 2!
</div>
```

```javascript
React.createElement(
  'div',
  { className: 'cn' },
  'Content 1!',              // 1st child
  React.createElement('br'), // 2nd child
  'Content 2!'               // 3rd child
)
```

我们的函数现在有五个参数：

* 一个元素的类型
* 一个属性对象
* 三个子元素。

因为其中一个child是一个React已知的HTML标签（`<br/>`），所以它也会被描述为一个函数调用（`React.createElement('br')`）。

到目前为止，我们已经涵盖了两种类型的children：

* 简单的`String`
* 另一种会调用`React.createElement`。

然而，还有其他值可以作为参数：

* 基本类型 `false, null, undefined, true`
* 数组
* React Components

可以使用数组是因为可以将children分组并作为一个参数传递：

```javascript
React.createElement(
  'div',
  { className: 'cn' },
  ['Content 1!', React.createElement('br'), 'Content 2!']
)
```

当然了，React的厉害之处，不仅仅因为我们可以把HTML标签直接放在JSX中使用，而是我们可以自定义自己的组件，例如：

```javascript
function Table({ rows }) {
  return (
    <table>
      {rows.map(row => (
        <tr key={row.id}>
          <td>{row.title}</td>
        </tr>
      ))}
    </table>
  );
}
```

组件可以让我们把模板分解为多个可重用的块。在上面的“函数式”（functional）组件的例子里，我们接收一个包含表格行数据的对象数组，最后返回一个调用`React.createElement`方法的`<table>`元素，`rows`则作为children传进table。

无论什么时候，我们这样去声明一个组件时：

```jsx
<Table rows={rows} />
```

从浏览器的角度来看，我们是这么写的：

```javascript
React.createElement(Table, { rows: rows });
```

注意，这次我们的第一个参数不是`String`描述的`HTML标签`，而是一个引用，指向我们编写组件时编写的函数。组件的`attributes`现在是接收的`props`参数了。

## 把组件（components）组合成页面（a page）

所以，我们已经将所有JSX组件转换为纯JavaScript，现在我们有一大堆函数调用，它的参数会被其他函数调用的，或者还有更多的其他函数调用这些参数......这些带参数的函数调用，是怎么转化成组成这个页面的实体DOM的呢？

为此，我们有一个`ReactDOM`库及其它的`render`方法：

```javascript
function Table({ rows }) { /* ... */ } // defining a component

// rendering a component
ReactDOM.render(
  React.createElement(Table, { rows: rows }), // "creating" a component
  document.getElementById('#root') // inserting it on a page
);
```

当`ReactDOM.render`被调用时，`React.createElement`最终也会被调用，返回以下对象：

```javascript
// There are more fields, but these are most important to us
{
  type: Table,
  props: {
    rows: rows
  },
  // ...
}
```

***

**这些对象，在React的角度上，构成了虚拟DOM。**

***

他们将在所有进一步的渲染中相互比较，并最终转化为  真正的`DOM`（virtual VS real, 虚拟DOM VS 真实DOM）。

下面是另一个例子：这次div有一个class属性和几个children：

```javascript
React.createElement(
  'div',
  { className: 'cn' },
  'Content 1!',
  'Content 2!',
);
```

变成：

```javascript
{
  type: 'div',
  props: {
    className: 'cn',
    children: [
      'Content 1!',
      'Content 2!'
    ]
  }
}
```

需要注意的是，那些除了`type`和`attribute`以外的属性，原本是单独传进来的，转换之后，会作为在`props.children`以一个数组的形式打包存在。也就是说，无论children是作为数组还是参数列表传递都没关系 —— 在生成的虚拟DOM对象的时候，它们最后都会被打包在一起的。

进一步说，我们可以直接在组件中把children作为一项属性传进去，结果还是一样的：

```jsx
<div className='cn' children={['Content 1!', 'Content 2!']} />
```

在构建虚拟DOM对象完成之后，`ReactDOM.render`将会按下面的原则，尝试将其转换为浏览器可以识别和展示的DOM节点：

* 如果`type`包含一个带有`String`类型的标签名称（`tag name`）—— 创建一个标签，附带上`props`下所有`attributes`。

* 如果`type`是一个函数（`function`）或者类（`class`），调用它，并对结果递归地重复这个过程。

* 如果`props`下有`children`属性 —— 在父节点下，针对每个child重复以上过程。

最后，得到以下HTML（对于我们的表格示例）：

```html
<table>
  <tr>
    <td>Title</td>
  </tr>
  ...
</table>
```

## 重新构建DOM（Rebuilding the DOM）

在实际应用场景，`render`通常在根节点调用一次，后续的更新会有`state`来控制和触发调用。

请注意，标题中的“重新”！当我们想更新一个页面而不是全部替换时，React中的魔法就开始了。我们有一些实现它的方式。我们先从最简单的开始 —— 在同一个node节点再次执行`ReactDOM.render`。

```javascript
// Second call
ReactDOM.render(
  React.createElement(Table, { rows: rows }),
  document.getElementById('#root')
);
```

这一次，上面的代码的表现，跟我们已经看到的有所不同。React将从头开始创建所有DOM节点并将其放在页面上，而不是从头开始创建所有DOM节点，React将启动其`diff`算法，来确定节点树的哪些部分必须更新，哪些可以保持不变。

那么，它是怎样工作的呢？其实只有少数几个简单的场景，理解它们将对我们的优化帮助很大。请记住，现在我们在看的，是在`React Virtual DOM`里面用来代表节点的`对象`。

### 场景1：`type`是一个字符串，`type`在通话中保持不变，`props`也没有改变。

```javascript
// before update
{ type: 'div', props: { className: 'cn' } }

// after update
{ type: 'div', props: { className: 'cn' } }
```

这是最简单的情况：DOM保持不变。

### 场景2：`type`仍然是相同的字符串，`props`是不同的。

```javascript
// before update:
{ type: 'div', props: { className: 'cn' } }

// after update:
{ type: 'div', props: { className: 'cnn' } }
```

`type`仍然代表HTML元素，React知道如何通过标准DOM API调用来更改元素的属性，而无需从DOM树中删除一个节点。

### 场景3：`type`已更改为不同的`String`或从`String`组件。

```javascript
// before update:
{ type: 'div', props: { className: 'cn' } }

// after update:
{ type: 'span', props: { className: 'cn' } }
```

React看到的`type`是不同的，它甚至不会尝试更新我们的节点：old元素将和它的所有子节点一起被删除（unmounted卸载）。因此，将元素替换为完全不同于DOM树的东西代价会非常昂贵。幸运的是，这在现实世界中很少发生。

划重点，记住React使用`===`（triple equals）来比较`type`的值，所以这两个值需要是相同类或相同函数的相同实例。

下一个场景更加有趣，通常我们会这么使用React。

### 场景4：`type`是一个`component`。

```
// before update:
{ type: Table, props: { rows: rows } }

// after update:
{ type: Table, props: { rows: rows } }
```

***

**你可能会说，“咦，但没有任何变化啊！”，但是你错了。**

***

如果`type`是对函数或类的引用（即常规的React组件），并且我们启动了tree diff的过程，则React会持续地去检查组件的内部逻辑，以确保`render`返回的值不会改变（类似对副作用的预防措施）。对树中的每个组件进行遍历和扫描 —— 是的，在复杂的渲染场景下，成本可能会非常昂贵！

值得注意的是，一个`component`的`render`（只有类组件在声明时有这个函数）跟`ReactDom.render`不是同一个函数。

## 关注子组件（children）的情况

除了上述四种常见场景之外，当一个元素有多个子元素时，我们还需要考虑React的行为。现在假设我们有这么一个元素：

```javascript
// ...
props: {
  children: [
      { type: 'div' },
      { type: 'span' },
      { type: 'br' }
  ]
},
// ...
```

我们想要交换一下这些children的顺序：

```javascript
// ...
props: {
  children: [
    { type: 'span' },
    { type: 'div' },
    { type: 'br' }
  ]
},
// ...
```

之后会发生什么呢？

当`diffing`的时候，如果React在检查`props.children`下的数组时，按顺序去对比数组内元素的话：index 0将与index 0进行比较，index 1和index 1，等等。对于每一次对比，React会使用之前提过的diff规则。在我们的例子里，它认为`div`成为一个`span`，那么就会运用到情景3。这样不是很有效率的：想象一下，我们已经从1000行中删除了第一行。React将不得不“更新”剩余的999个子项，因为按index去对比的话，内容从第一条开始就不相同了。

幸运的是，React有一个`内置的方法（built-in）`来解决这个问题。如果一个元素有一个`key`属性，那么元素将按`key`而不是`index`来比较。只要`key`是唯一的，React就会移动元素，而不是将它们从DOM树中移除然后再将它们放回（这个过程在React里叫mounting和unmounting）。

```javascript
// ...
props: {
  children: [ // Now React will look on key, not index
    { type: 'div', key: 'div' },
    { type: 'span', key: 'span' },
    { type: 'br', key: 'bt' }
  ]
},
// ...
```

## 当state发生了改变

到目前为止，我们只聊了下React哲学里面的`props`部分，却忽视了另外很重要的一部分`state`。下面是一个简单的`stateful`组件：

```javascript
class App extends Component {
  state = { counter: 0 }

  increment = () => this.setState({
    counter: this.state.counter + 1,
  })

  render = () => (<button onClick={this.increment}>
    {'Counter: ' + this.state.counter}
  </button>)
}
```

在`state`对象里，我们有一个key`counter`。点击按钮时，这个值会增加，然后按钮的文本也会发生相应的改变。但是，当我们这样做时，DOM中发生了什么？哪部分将被重新计算和更新？

调用`this.setState`会导致`re-render`（重新渲染），但不会影响到整个页面，而只会影响组件本身及其children组件。父母和兄弟姐妹都不会受到影响。当我们有一个层级很深的组件链时，这会让状态更新变得非常方便，因为我们只需要重绘(`redraw`)它的一部分。

## 把问题说清楚

我们准备了一个[小demo](https://iadramelk.github.io/optimizing-react-demo/dist/before.html)，以便你可以在看到在“野蛮生长”的React编码方式下最常见的问题，后续我也告诉大家怎么去解决这些问题。你可以在[这里看看它的源代码](https://github.com/iAdramelk/optimizing-react-demo)。你还需要[React Developer Tools](https://github.com/facebook/react-devtools)，请确保浏览器安装了它们。

我们首先要看看的是，哪些元素以及什么时候导致Virtual DOM的更新。在浏览器的开发工具中，打开React面板并选择“Highlight Updates”复选框：

!["在Chrome中使用“突出显示更新”复选框选中DevTools"](http://sinacloud.net/woodysblog/img/react_dev_tools.png)

现在尝试在表格中添加一行。如你所见，页面上的每个元素周围都会显示一个边框。这意味着每次添加一行时，React都在计算和比较整个虚拟DOM树。现在尝试点击一行内的counter按钮。你将看到`state`更新后虚拟DOM如何更新 —— 只有引用了`state key`的元素及其children受到影响。

React DevTools会提示问题出在哪里，但不会告诉我们有关细节的信息：特别是所涉及的更新，是由`diffing`元素引起的？还是被挂载（`mounting`）或者被卸载（`unmounting`）了？要了解更多信息，我们需要使用React的内置[分析器](https://reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-chrome-performance-tab)（注意它不适用于生产模式）。

添加`?react_perf`到应用的URL，然后转到Chrome DevTools中的“Performance”标签。点击“录制”（Record）并在表格上点击。添加一些row，更改一下counter，然后点击“停止”（Stop）。

!["React DevTools的“Performance”选项卡"](http://sinacloud.net/woodysblog/img/react_perf_tools.png)

在输出的结果中，我们关注“User timing”这项指标。放大时间轴直到看到“React Tree Reconciliation”这个组及其子项。这些就是我们组件的名称，它们旁边都写着[update]或[mount]。

***

**我们的大部分性能问题都属于这两类问题之一。**

***

无论是组件（还是从它分支的其他组件）出于某种原因都会在每次更新时re-mounted（慢），又或者我们在大型应用上执行对每个分支做diff，尽管这些组件并没有发生改变，我们不希望这些情况的发生。

## 优化我们的代码：Mounting / Unmounting

现在，我们已经了解到当需要update Virtual Dom时，React是依据哪些规则去判断要不要更新，以及也知道了我们可以通过什么方式去追踪这些diff场景的背后发生了什么，我们终于准备好优化我们的代码了！首先，我们来看看mounts/unmounts。

如果你能够注意到当一个元素包含的多个children，他们是由array组成的话，你可以实现十分显著的速度优化。

我们来看看这个case：

```jsx
<div>
  <Message />
  <Table />
  <Footer />
</div>
```

在我们的Virtual DOM里这么表示：

```javascript
// ...
props: {
  children: [
    { type: Message },
    { type: Table },
    { type: Footer }
  ]
}
// ...
```

这里有一个简单的`Message`例子，就是一个`div`写着一些简单的文本，和以及一个巨大的`Table`，比方说，超过1000行。它们（`Message`和`Table`）都是顶级`div`的子组件，所以它们被放置在父节点的`props.children`下，并且它们`key`都不会有。React甚至不会通过控制台警告我们要给每个`child`分配`key`，因为children正在`React.createElement`作为参数列表传递给父元素，而不是直接遍历一个数组。

现在我们的用户已读了一个通知，`Message`（譬如新通知按钮）从DOM上移除。`Table`和`Footer`是剩下的全部。

```javascript
// ...
props: {
  children: [
    { type: Table },
    { type: Footer }
  ]
}
// ...
```

React会怎么处理呢？它会看作是一个array类型的children，现在少了第一项，从前第一项是`Message`现在是`Table`了，也没有`key`作为索引，比较`type`的时候又发现它们俩不是同一个function或者class的同一个实例，于是会把整个`Table`unmount，然后在mount回去，渲染它的1000+行子数据。

因此，你可以给每个component添加唯一的`key`（但在目特殊的case下，使用key并不是最佳选择），或者采用更聪明的小技巧：使用[短路求值](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators)（又名“最小化求值”），这是JavaScript和许多其他现代语言的特性。看：

```jsx
// Using a boolean trick
<div>
  {isShown && <Message />}
  <Table />
  <Footer />
</div>
```

虽然`Message`会离开屏幕，父元素`div`的`props.children`仍然会拥有三个元素，`children[0]`具有一个值`false`（一个布尔值）。请记住`true, false, null, undefined`是虚拟DOM对象`type`属性的允许值，我们最终得到了类似的结果：

```javascript
// ...
props: {
  children: [
    false, //  isShown && <Message /> evaluates to false
    { type: Table },
    { type: Footer }
  ]
}
// ...
```

因此，有没有`Message`组件，我们的索引值都不会改变，`Table`当然仍然会跟`Table`比较（当`type`是一个函数或类的引用时，diff比较的成本还是会有的），但仅仅比较虚拟DOM的成本，通常比“删除DOM节点”并“从0开始创建”它们要来得快。

现在我们来看看更多的东西。大家都挺喜欢用HOC的，高阶组件是一个将组件作为参数，执行某些操作，最后返回另外一个不同功能的组件：

```javascript
function withName(SomeComponent) {
  // Computing name, possibly expensive...
  return function(props) {
    return <SomeComponent {...props} name={name} />;
  }
}
```

这是一种常见的模式，但你需要小心。如果我们这么写：

```javascript
class App extends React.Component() {
  render() {
    // Creates a new instance on each render
    const ComponentWithName = withName(SomeComponent);
    return <SomeComponentWithName />;
  }
}
```

我们在父节点的`render`方法内部创建一个HOC。当我们重新渲染（`re-render`）树时，虚拟DOM是这样子的：

```javascript
// On first render:
{
  type: ComponentWithName,
  props: {},
}

// On second render:
{
  type: ComponentWithName, // Same name, but different instance
  props: {},
}
```

现在，React会对`ComponentWithName`这个实例做diff，但由于此时同名引用了不同的实例，因此全等比较（triple equal）失败，一个完整的re-mount会发生（整个节点换掉），而不是调整属性值或顺序。注意它也会导致状态丢失，[如此处所述](https://github.com/facebook/react/blob/044015760883d03f060301a15beef17909abbf71/docs/docs/higher-order-components.md#dont-use-hocs-inside-the-render-method)。幸运的是，这很容易解决，你需要始终在`render`外面创建一个HOC：

```javascript
// Creates a new instance just once
const ComponentWithName = withName(Component);

class App extends React.Component() {
  render() {
    return <ComponentWithName />;
  }
}
```

## 优化我的代码：Updating

现在我们可以确保在非必要的时候，不做re-mount的事情了。然而，对位于DOM树根部附近（层级越上面的元素）的组件所做的任何更改都会导致其所有children的diffing和调整（`reconciliation`）。在层级很多、结构复杂的应用里，这些成本很昂贵，但经常是可以避免的。

***

**如果有一种方法可以告诉React你不用来检查这个分支了，因为我们可以肯定那个分支不会有更新，那就太棒了！**

***

这种方式是真的有的哈，它涉及一个built-in方法叫`shouldComponentUpdate`，它也是[组件生命周期](https://reactjs.org/docs/react-component.html#the-component-lifecycle)的一部分。这个方法的调用时机：组件的`render`和组件接收到state或props的值的更新时。然后我们可以自由地将它们与我们当前的值进行比较，并决定是否更新我们的组件（返回`true`或`false`）。如果我们返回`false`，React将不会重新渲染组件，也不会检查它的所有子组件。

通常来说，比较两个集合（set）`props`和`state`一个简单的浅层比较（shallow comparison）就足够了：如果顶层的值不同，我们不必接着比较了。浅比较不是JavaScript的一个特性，但有很多[小而美的库](https://github.com/dashed/shallowequal)（`utilities`）可以让我们用上那么棒的功能。

现在可以像这样编写我们的代码：

```javascript
class TableRow extends React.Component {

  // will return true if new props/state are different from old ones
  shouldComponentUpdate(nextProps, nextState) {
    const { props, state } = this;
    return !shallowequal(props, nextProps)
           && !shallowequal(state, nextState);
  }

  render() { /* ... */ }
}
```

但是你甚至都不需要自己写代码，因为React把这个特性内置在一个类`React.PureComponent`里面。它类似于  `React.Component`，只是`shouldComponentUpdate`已经为你实施了一个浅的`props`/`state`比较。

这听起来很“不动脑”，在声明class继承（`extends`）的时候，把`Component`换成`PureComponent`就可以享受高效率。事实上，并不是这么“傻瓜”，看看这些例子：

```jsx
<Table
    // map returns a new instance of array so shallow comparison will fail
    rows={rows.map(/* ... */)}
    // object literal is always "different" from predecessor
    style={ { color: 'red' } }
    // arrow function is a new unnamed thing in the scope, so there will always be a full diffing
    onUpdate={() => { /* ... */ }}
/>
```

上面的代码片段演示了三种最常见的反模式。尽量避免它们！

***

**如果你能注意点，在render定义之外创建所有对象、数组和函数，并确保它们在各种调用间，不发生更改 —— 你是安全的。**

***

你在[updated demo](https://iadramelk.github.io/optimizing-react-demo/dist/after.html)，所有table的rows都被“净化”（`purified`）过，你可以看到`PureComponent`的表现了。如果你在React DevTools中打开“Highlight Updates”，你会注意到只有表格本身和新行在插入时会触发`render`，其他的行保持不变。

[译者说：为了便于大家理解`purified`，译者在下面插入了原文demo的一段代码]

```javascript
class TableRow extends React.PureComponent {
  render() {
    return React.createElement('tr', { className: 'row' },
      React.createElement('td', { className: 'cell' }, this.props.title),
      React.createElement('td', { className: 'cell' }, React.createElement(Button)),
    );
  }
};
```

不过，如果你迫不及待地all in PureComponent，在应用里到处都用的话 —— 控制住你自己！

shallow比较两组`props`和`state`不是免费的，对于大多数基本组件来说，甚至都不值得：`shallowCompare`比`diffing`算法需要耗费更多的时间。

使用这个经验法则：pure component适用于复杂的表单和表格，但它们通常会减慢简单元素（按钮、图标）的效率。

***

感谢你的阅读！现在你已准备好将这些见解应用到你的应用程序中。可以使用我们的小demo（[用了](https://iadramelk.github.io/optimizing-react-demo/dist/after.html)或[没有用](https://iadramelk.github.io/optimizing-react-demo/dist/before.html)PureComponent）的[仓库](https://github.com/iAdramelk/optimizing-react-demo)作为你的实验的起点。此外，请继续关注本系列的下一部分，我们计划涵盖Redux并优化你的数据，目标是提高整个应用的总体性能。

## 译者说

正如原文末所说，Alex和Andy后续会继续写一个关于整体性能的系列，包括核心React和Redux等，我也会继续跟踪这个系列的文章，到时po到我的[个人博客](http://wuyuying.com/blog/)和知乎专栏[《集异璧》](https://zhuanlan.zhihu.com/front-end-thinking)，感兴趣的同学们可以关注一下哈 ：）

欢迎对本文的翻译质量、内容的各种讨论。若有表述不当，欢迎斧正。

2018.05.13，晴，杭州滨江
Yuying Wu