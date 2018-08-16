---
title: GraphQL in Action
tags:
  - GraphQL
date: 2018-08-15 23:11:24
---

## REST-ful Routing

Given a collection of records on a server, there should be a uniform URL and HTTP request method to utilize that collection of records.

![](http://sinacloud.net/woodysblog/img/restful-api.png)

## GraphQL解决什么问题？

![](http://sinacloud.net/woodysblog/img/what-problem-GraphQL-solve.png)

在REST-ful API中，我们会一层一层地定义路由，但假如出现上图的多层结构，我们希望：

* 查询“当前用户的所有朋友的公司名” 
  * 利用当前用户查询朋友的userId，再用每个人的userId查询company `users/currentUserID/friends` -> `users/friendUserID/company`
  * `users/currentUserID/friends/companies` 
* 获取”当前用户的所有朋友的公司名+位置“
  * `users/currentUserID/friends_with_position_and_company`

有可能需要提供3个或更多不同的路由。

若是层级嵌套或组合更多，REST-ful的路由规则会越来越多和复杂，GraphQL就是解决这类问题的利器。

![](http://sinacloud.net/woodysblog/img/graph.png)

Graph（图）表达了节点和节点间的Edges（路径）。

同样地要实现”获取当前用户的所有朋友的公司名+位置“，我们会这样告诉GraphQL：

1. 查询`userID`为`N`的当前用户`WYY`
2. 查询所有朋友为`WYY`的用户数组`X`
3. 查询每个`X`下的`company`和`position`

```
query{
  user(id: "N") {
    friends {
      company {
        name
      }
      position {
        address
      }
    }
  }
}
```
