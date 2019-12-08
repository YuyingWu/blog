---
title: 浅谈 React Error Boundaries
categories: [tech]
tags: [react]
date: 2019-11-18 18:19:18
---

前几天面试候选人的时候，有提到用`React 16.x`重构了一个电商首页，对各个业务模块做更细颗粒拆解和代码组织，提升开发效率和降低维护成本，在这里要给小同学点个赞，有想法也有落地成果。后来问及“一个模块报错，搞挂了整个页面”的问题，大家都知道，如果页面的entry是index.js，在里面引入各个components的话，运行时只要有一行代码挂了，整个js都会挂掉。针对这个问题，除了前端同学的自测、QA同学的测试或者人肉的code review，有没有代码层面或者机制，做好模块间的错误隔离/处理/上报？比较遗憾的是，在生产环境下，候选人没有针对这个线上大流量页面做相关的处理，靠人肉规范，没能给出比较好的错误隔离的设计思路和实践方案。

其实相关的思路可以有很多种，模块/页面级的异常处理、commit前跑test case、提交后或者发布前headless检查页面报错，等等。

在代码异常处理上，一般我们会用try-catch来做：

```js
try {
  ReactDOM.render(<App />, document.getElementById('root'));
}
catch(error) {
  console.error('Unknown error intercepted. error: ', error);
}
```

但可以发现，异常信息是捕获到了，但是代码运行就结束了，并没有从异常中“恢复”。

## Why Error Boundaries?

> 过去，组件内的 JavaScript 错误会导致 React 的内部状态被破坏，并且在下一次渲染时 产生 可能无法追踪的 错误。这些错误基本上是由较早的其他代码（非 React 组件代码）错误引起的，但 React 并没有提供一种在组件中优雅处理这些错误的方式，也无法从错误中恢复。
>   
> 部分 UI 的 JavaScript 错误不应该导致整个应用崩溃，为了解决这个问题，React 16 引入了一个新的概念 —— 错误边界。  
>   
> 错误边界是一种 React 组件，这种组件可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI，而不是渲染那些崩溃了的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。

[React 16官方文档 —— 错误边界 >>](https://zh-hans.reactjs.org/docs/error-boundaries.html)

笔者之前写过一篇[《这！就是1688 PC首页》](http://www.wuyuying.com/1688-pc-home/)，里面有提到我们团队基于React 16.x的页面实践，一个 index.jsx 中引入子目录下的各种 components ，初期开发阶段，整个应用处于“裸奔”的状态，一个组件抛错误，整个页面都会挂掉。日常抛JS error的情况包括但不限于代码逻辑没注意写错了、数据接口挂了或者返回结构不如预期、多层数据获取的容错等。首页有19个组件和一些公用的函数，如果其中一处报错，会把整个页面搞挂，风险太大。最后选用了React 16的Error Boundaries（错误边界）API去做components之间的容错隔离/错误上报的。

## React Error Boundaries in Action

### 异常捕获/处理 HOC

在里面主要做几件事：

1. 异常捕获后的UI控制标记。通过react life cycle里的 `getDerivedStateFromError`，捕获运行时的异常，用一个state `hasError` 来标记当前组件是否报异常了，后续可以用这个state来控制展示传入还是降级的UI；
2. 异常捕获后的回调action `componentDidCatch`，可以在里面放异常日志上传到服务器的逻辑，同时也支持自定义错误处理回调 `this.props.errorHandler`；
3. 异常捕获后的自定义降级UI。有个 `placeholder` 从 `this.props` 传进来，支持自定义降级UI。由于异常发生后，我们对该组件可以是默认处理不展示，或者展示为开发者自定义的展示，所以这里开放了`placeholder`支持自定义UI。

```jsx
import React from 'react';
import wpo from '@ali/retcodelog';

class ErrorBoundary extends React.Component {
  static defaultProps = {
    placeholder: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 自定义错误处理回调
    const { errorHandler } = this.props;
    errorHandler && errorHandler({ error, info });

    // 错误日志上报到服务器
    wpo.error('Error Handler', info && 
    info.componentStack ? 
    info.componentStack : 
    'Unexpect error from Error Handler');    
  }

  render() {
    const { placeholder } = this.props;
    const { hasError } = this.state;

    // 异常发生后的自定义降级（恢复）UI
    if (hasError) {
      return placeholder;
    }

    let tpl = this.props.children;

    return tpl;
  }
}

export default ErrorBoundary;
```

### 在应用中使用错误边界

一个应用中，可能会存在多个错误边界，如对整个应用App的全局错误边界，以及对每个模块使用的模块错误边界。

```jsx
{/* global error boundary  */}
<ErrorBoundary errorHandler={() => { window.location.href = 'https://1688.com' }}>
  <App>
    {/* category error boundary  */}
    <ErrorBoundary placeholder={<StaticCategory />}>
      <Category />
    </ErrorBoundary>
  </App>
</ErrorBoundary>
```

全局或模块级错误边界可能看下图会更直观一些。

!["multi-error-boundaries"](//static.wuyuying.com/multi-error-boundaries.png)

## Wrapping It Up

回到文章的一开头，很多时候，我们在日常开发中，会不断地往前冲，开发很多酷炫的交互或者功能，有时可能忘记停下来，把更多的目光在质量保障上，本文提到的React Error Boundaries只是其中一个小的点。不同的设备环境、网络环境、用户操作路径，会不会在你不知道的情况下，我们的页面“坏”了，还是需要把这些信息收集起来，让我们看到“想当然”以外更多的东西。

共勉～

## 附录

值得注意的是，错误边界有一些无法捕获错误的场景：

> 事件处理  
> 异步代码（如 `setTimeout` 和 `requestAnimationFrame` 回调函数）  
> 服务端渲染  
> ErrorBoundary自身抛出的异常（并非来自子组件）

* [React Error Boundaries官方文档](https://reactjs.org/docs/error-boundaries.html)
* [社区自建的react-error-boundary](https://github.com/bvaughn/react-error-boundary)
* [Why are Error Boundaries not triggered for event handlers?](https://github.com/facebook/react/issues/11409)
* [componentDidCatch is not getting called when there is an error in promise](https://github.com/facebook/react/issues/11334)