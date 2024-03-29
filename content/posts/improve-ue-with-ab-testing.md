---
title: AB Testing是如何提升用户体验的
date: 2018-09-16 17:06:07
updateDate: 2018-10-22 18:45:00
categories: [tech,reading]
tags: []
type: photo
cover: https://sinacloud.net/blog-image/data-driven-types.png
---

## 三种基于数据的决策模式

* data driven
* data informed
* data aware（本书提出）

!["三种数据决策模式"](https://sinacloud.net/blog-image/data-driven-types.png)

### Data-driven Design

**数据驱动**（data-driven）意味着收集到的数据决定（驱动）了设计的决策。在某些场景下，这是非常对的方式。而有些时候，团队提出的问题可以被通过实验得到的数据回答，这些数据集可以得出一个清晰的设计的最佳实践。

如果你清楚知道你要解决什么问题，目标是什么，确切知道自己想了解的问题是什么，那么数据驱动是合适的方式。还有另外一个前提，你的方法论和衡量方式是正确的，而你想要解决的问题是对应的数据能驱动做出决策的。这要求你对数据有可能带来的隐患有清晰的认知，然后采取相应的对策去解决它们。

> 对于data driven模式，比较恰当的比喻是一辆在轨道上的火车。你知道自己离目的地越来越近，这段旅程是可靠的，你想要追寻的东西是明确的、直接的、可预判的以及可复制的。

!["data driven"](https://sinacloud.net/blog-image/data-driven.jpg)

### Data-informed Design

然而，在一些情况下，你的设计觉有可能有各种各样的细微差异，以及数据带来的答案，有可能不能覆盖所有的情况（not cut-and-dried）。这就是**数据启示**（data-informed）设计模式，团队只把数据作为决策过程的其中一项输入源。在这种设计模式下，输出也许不是一个明确的决策，但这也许会影响到下一个迭代和投入的立项。这样的方式适用的场景包括，需要做很多的资料搜集、需要结合不同类型的数据来源，以及在做一次跳跃性的项目创新。

> 对于data-informed模式，比较恰当的比喻是一个火车站。你知道有各种各样的火车，它们是去不同的地方的。你知道自己可以有很多的选择，有一些途径可以帮助你找到想上哪一辆车。在最后你有可能去到不同的目的地，有着更少的确定性和更多探索的可能性。

!["data informed"](https://sinacloud.net/blog-image/data-informed.jpg)

### Data-aware Design

数据洞察（data-aware）设计模式，是一种创新的设计模式，设计的决策不仅仅来源于数据，而是回到数据收集方式的实践（系统是怎么产生的？数据类型是怎么捕获？数据是怎么合成的？），这才是设计本身要关注的问题。

在数据洞察设计模式的观念中，你要了解一些现实，不同类型的数据可以是很多不同的问题的答案。如果你意识到，多种类型的解决方案可以回答你的大目标，那么你也会意识到所有不同类型的数据可以为你所用。你在持续地提问怎么样你才能最好的实现目标。这是一种更有策略的思考方式，数据可以怎么样启发你想要解决的问题。再次说明，在你没有做好数据洞察之前，你是没法直接到达“数据启示”阶段的。

> 地图（mapping）、运输系统（transportation）、导航（navigation）可能会更接近data-aware模式。火车只是在大陆上跑的一种方式，而你拥有整个世界去探索。

!["data aware"](https://sinacloud.net/blog-image/data-aware.jpg)

## 书摘

### 1.数据可以帮助设计与商业对焦

> 设计与商业目标间的碰撞，如果可以建立基准对齐两者的目标，那是个非常棒的主意，聚焦在各类商业模型的核心部分：给你的客户提供最优质的服务，了解他们的目标和关注点，帮助解决他们的难题。

### 2. 关于数据的质量

什么样的数据才可以指导我们的决策？

* 问题关联性（我们在问对的问题吗？）
* 数据的合适度（它们可以回答我们的问题吗？）
* 数据的质量（数据可靠吗？我们在数据收集时有漏掉什么吗？我们对数据的认知有偏差吗？）

做到上述的点，还需要我们回答下面的问题：

* 另外不同的数据集或者不同的分析方法会更合适吗？
* 我们在做最方便的事情，还是在做对的事情？

### 3. 做数据收集/分析时，我们需要谁的帮助

在数据收集/分析的过程中，有两个关键的角色。

* 第一，捕获、管理和分析数据，让它变得“可解释”（interpretable）；
* 第二，通过多种方式分析和使用数据，展现你的洞察力，找到其中与商业相关的信息。

前者负责收集数据的，我们称之为“生产者”（producer）。后者依赖数据启发他们的思考的，我们称之为“消费者”(consumer)。

**谁是数据的生产者？**

数据分析师（data analysts）和数据科学家（data scientists），从产品中捕获大量的数据，对数据进行清洗、加工、转换、建模和验证。而数据科学家还会负责商业或用户的模型和计量方式。另外，他们也会做A/B测试的结果分析，你会惊讶于他们对历史做过的实践了如指掌，可以在如何建立A/B测试给你提供很有帮助的建议。

用户研究员（user researcher），专注于了解你的用户是谁以及他们需要什么。

设计师（Designer），设计师会在设计时，把自己代入到用户的角色，收集尽量多的信息去完成他们的设计。

市场营销人员（Marketer）。如果你想得到用户画像和目标人群的专业意见，可以问问做市场营销的同学，他们是离用户最近的人。

**谁是数据的消费者？**

数据的消费者包括商业经理、产品经理，、设计师等等。

商业经理（business manager）和产品经理（product manager），通过数据了解商业是如何运作的，得到更强的商业洞察力。

### 4. 数据的多样性

最好的数据，就是对你想问的问题或者话题，提供最有用和最相关的信息。

#### 为什么你在收集数据？

只观察用户的行为并不能告诉你用户做过些什么或者他们有怎样的感受。

你也应该关注用户的态度和期望。

#### 什么时候收集数据？

如果纵向的数据像一段影片，那么快照数据就像一张照片。

独立地收集数据可以帮助控制中间可能影响到用户和网站交互的因子。而场景化的数据则可以知道你的设计是如何“野蛮生长”的，你的设计有可能感受到来自这个世界的混乱、困难的挑战以及不符合常规的交互路径。

#### 数据是怎么收集的？

在设计过程中，定性的数据帮助建立用户的同理心，能让你知道用户的态度、信仰、价值观和需求。相对地，定量的数据通过数字和度量来表现你的观察。

#### 收集多少数据？

超过85%的可用性问题只需要5位候选人。

而从很多候选人收集到的数据（通常叫“大样本采集”）可以给你更精确的数量和频率信息：有多少人的行为模式类似，多少百分比的用户会做这个操作，等等。

### 5. 为什么要做实验

做实验可以帮助我们了解因果关系（causality），以一种有数据支撑的而不是道听途说的，这具有“统计意义”。

A/B测试和实验的力量，在于这提供了一种可以控制环境的方式，让我们知道为什么某些事情会发生。换言之，它给我们提供了证明因果关系的能力。

这也让我们自信和清楚地知道，我们的决策是如何影响到用户的行为的。

更重要的是，我们可以以此保护自己，不要被人的天性，以一定的模式分析数据和行为，验证我们之前的猜想。（心理学家称之为“确认偏误”（confirmation bias）[确认偏误或称肯证偏误、验证性偏见，是个人无论合乎事实与否，偏好支持自己的成见、猜想的倾向。]）。在一个未被证明的假设上，还可以降低投入大量的时间和公司资源的风险。

我们鼓励大家思考那些道听途说的消息的限制，去问一些问题可以帮助你对听到的消息进行一些思想碰撞（反例）。

A/B测试是一项基于观察和行为科学的方法，需要大量收集用户的上下文数据。这意味着，只要我们把测试设计得很棒，我们就可以非常有自信地认为，A/B测试的验证结果会大流量的现实结果形成镜面效应，在A/B测试中更好的效果，假如我们把产品推向更多的用户，结果也是一致的。

这样的能力对于data aware决策/预测“什么会发生”是非常有价值的。你的公司会节省更多的时间和资源，放到效果好的项目上，同时会把那些效果不好或者没有引出目标用户行为的项目重新设计、重新思考甚至干掉。

### 实验基础

实验，就是一种通过收集信息对想法和现实进行对比的手段。

实验组一般是一个对照组（可控组）加上一些变化。

在设计一个实验时，你会对这个改变可能会造成什么效果做一个假设或者一个可测试的预测。基于你的观察结果，你会决定这证实了还是推翻了原先的假设。

跟一般我们使用数据的目标是类似的，每个实验的目标是从中学到些什么（得到些什么经验）。

> 变量（variable）  
> 自变量（independent variable）指的是你直接造成的改变，为了观察因变量（dependent variable）的变化。

> 混淆（confounds）  
> 之所以实验中会有混淆，是我们在设计实验时没有考虑到某些因子会造成实验组和对照组的差异。

### A/B测试：线上实验

#### 用户划分

一个cohort（cohort analysis，阵列分析，又称“世代分析”）指一群有相似经验的用户。这里的经验一般是基于时间的（如他们都是同一时间注册你的产品或者服务），或者他们有另外一个因素可以让他们有一样的经历（如学生是从2015年毕业的）。

另外一种方式，用户区隔（segment），基于更稳定的特性如人口统计因子（性别、年龄、国籍等）或者也可以通过他们的行为（新用户、核心用户等）。

#### 新用户 VS 老用户

当你给用户介绍一些新的产品或服务时，老用户已有的习惯和行为会影响他们的思考方式和期望值。当我们对老用户测试一项新的设计方案时，以上是需要重点考虑的。

而新用户则没有各种各样的老习惯，他们也许会绕过各种既定的流程，希望直接去到他们想去的地方。

除了用户习惯，你也需要考虑老用户和未来会成为用户的那些人的用户画像有何异同。

> 小结，在这一节里，介绍了在A/B取样时需要考虑的3个点。
> 1. 如何划分用户群，世代（cohorts）还是区隔（segment）
> 2. 哪些用户信息是相关的
> 3. 更偏向研究老用户还是新用户

### 指标：A/B Testing中的因变量

**测量（measure）**，指的是你观察、捕获和计算的所有东西。  
**指标（metrics）**，指的是事先设定的、可评估的基准，同时这些指标会有一定的商业价值。

在A/B测试的设计中，认真思考选择测量什么指标是非常重要的一个环节 —— 追踪什么数据、测试什么时候结束。

测量计划的设定是主观的。有人决定了测试什么指标，怎么样去测试以及如何建立模型。因此，所有数据是受人们主观的认知偏误影响的。

A/B测试设计的另外一个环节是确定你对测试结果的容错程度。假如你的测试结果5%会出错？10%呢？20%又如何？只有你和你的同事能决定多大的风险你们愿意承担。

### 你的假设和为什么它很重要

假设，指的是你对实验结果的想象的预测，而它是可测试的。

设定一个假设，决定了你会从测试中学到什么。

你永远不能证明一个假设是正确的，你只能证明（什么情况下）它是错误的。

> No matter how numerous; for any conclusion drawn in this way may always turn out to be false: no matter how many instances of white swans we may have observed, this does not justify the conclusion that all swans are white... but it can be shown false by a single authentic sighting of a black swan. - Karl Popper

你的假设应该是一个声明，在一个特定的环境下，你相信什么会发生。它往往是这样的，`如果我们做X，因为Z，用户会做Y，这会影响到指标A。`

为了强调学习是我们做A/B实验的重点，我们鼓励你想清楚自己会从每一个测试中学习到什么。

在起草一个假设前，你应该明确两点：

* 一个假设，在这个假设中本质上的改变是什么，你认为效果是怎样的？
* 一个明确的认知和计划，说明你会在测试这个假设时学到了什么。

#### 知道你想学习什么

* 如果你失败了，对于未来的设计，你会学习到什么？
* 如果你成功了，对于未来的设计，你会学习到什么？
* 你愿意付出多少努力，去学习到这些东西？

### 创造性的A/B测试跑起来

#### 资料三角测定（data triangulation）：混合方法的力量

我们坚信，做A/B实验最好的方式，就是同时做A/B实验以外的事情。多种混合的方法，是获取更全面的用户画像以及知道你的设计是如何影响他们的唯一途径。况且，使用不同种类的数据可以启发出更多新的实现或者A/B测试的假设。使用其他形式的数据，换句话说，是一种能启发出更具创造性A/B实验的方式。

资料三角测定，可以使用多种方法去形成针对你的用户和数据更全面的大图。解释说明为什么你从很多用户中的A/B测试结果发现假设是正确的，从一个小样本的发现的重要性，中等量级的调研行为更像是可用性测试，这些都可以帮助你提升对用户行为的理解。

#### 探索和评估你的创意

A/B实验不仅仅为了那些很小的优化问题，它也能帮助你在从来没有涉足过的领域有全新的理解。

在探索阶段，A/B实验的结果不能决定最终谁是最好的设计，继续往前走。此外，你应该从实验中学习到什么，并应用到未来的设计中，继续迭代，做更多的A/B实验。

在评估阶段，你应该离一个“希望推送给用户的完成的作品”越来越近，在这个时候，你和你的团队应该对焦过，针对你的产品做一些细调（tweaks）和打磨（polishing）。

## Reference

* [《Designing with Data》](https://book.douban.com/subject/26588592/)
* 业内A/B Test的产品：Skycanner的Dr Jekyll、LinkedIn的XCLNT、Esty的Catapult
