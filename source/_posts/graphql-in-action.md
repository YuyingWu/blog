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

## GraphQL服务器作为代理层

### 当数据库在自己的服务器

![](http://sinacloud.net/woodysblog/img/graphql-as-proxy-1.png)

### 当我们使用第三方数据源

![](http://sinacloud.net/woodysblog/img/graphql-as-proxy-2.png)

### 中间层：Express/GraphQL Server

当我们的服务需要结合本地数据源和第三方数据源时，可以通过Express/GraphQL服务器统一处理数据源的聚合和结构抹平，再把api提供给前端应用使用。

## 什么情况下，我们需要Resolver

![](http://sinacloud.net/woodysblog/img/what-resolver-does.png)

如上图，当数据库的model设计的字段`companyId`，和GraphQL的query需要获取的字段`companyName`不一致时，需要在GraphQLType定义字段`companyName`中添加对应的resolver，以入参`companyId`查询数据库中对应的项，再return对应`companyName`。

也就是说，当数据库model和GraphQL对象的字段对应不上，返回数据和入参需要特别处理时，`resolver`来完成这样的工作。

```
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: new GraphQLList(CompanyType),
      resolve(parent, args) {
        // code to get data from db / other source
        // args.id
        return CompanyDBModel.find({
          companyId: parent.companyId
        });
      }
    }
  })
});
```

## DB model和GraphQL的设计差异

![](http://sinacloud.net/woodysblog/img/model-in-reality.png)

数据库中的表结构：  
`User`的属性`companyId`，关联着`Company`的`id`属性。

![](http://sinacloud.net/woodysblog/img/query-in-graphql.png)

Graph（图）结构：  

* 0级：RootQueryType，属性`user`类型为`UserType`
* 1级：`UserType`通过数据库中的`companyId`查询到`company`的数据，再返回到`UserType.company`