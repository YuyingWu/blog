---
title: State Management
categories:
  - tech
tags:
 - flux
 - redux
 - react
date: 2018-11-06 13:42:00
---

## Flux

单向数据流始祖 —— Flux。

### 传统MVC

把一个应用划分成多个组件，分而治之。

* Model负责管理数据，大部分业务逻辑也应该放在Model里
* View负责渲染用户界面，应该避免在View中涉及业务逻辑
* Controller负责接受用户输入，根据用户输入调用对应的Model部分逻辑，把产生的数据结果交给View部分，让View渲染出必要的输出。