---
title: GraphQL in Action
categories: [tech]
tags: [note]
date: 2018-08-15 23:11:24
updateDate: 2018-09-24 18:20:13
---
## GraphQL解决什么问题

### REST-ful Routing

Given a collection of records on a server, there should be a uniform URL and HTTP request method to utilize that collection of records.

![](http://sinacloud.net/woodysblog/img/restful-api.png)

### GraphQL是如何解决问题的

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

## Query语法

### 别名

```
{
  apple: company(id: "1") {
    id
  }
  google: compnay(id: "2") {
    id
  }
}
```

请求了两次company，入参id分别为1和2，返回结果是：

```
{
  data: {
    apple: {
      id: "1"
    },
    google: {
      id: "2"
    }
  }
}
```

### query fragment 查询片段

有时候多个query会共享一些查询属性，如：

```
{
  apple: company(id: "1") {
    id
    name
    description
  }
  google: compnay(id: "2") {
    id
    name
    description
  }
}
```

两个query查询一致的字段（`id`、`name`、`desciption`），加入需要修改，需要多处修改。这个时候，我们可以声明一段query fragment，维护这份公用的query字段。

```
{
  apple: company(id: "1") {
    ...companyFields
  }
  google: compnay(id: "2") {
    ...companyFields
  }
}

fragment companyFields on Company {
  id
  name
  description
}
```

划重点：

1. 用关键字`fragment`声明查询片段`companyFields`；
2. 关键字`on`后是GraphQLType`Company`，表明以下字段属于类型`Company`，GraphQL也会对这些字段作类型和是否存在的检查；
3. 在query语句中，使用`...companyFields`。

## 当GraphQL遇到前端

![](http://sinacloud.net/woodysblog/img/graph-come-across-frontend.png)

> DB -> Express/GraphQL Server -> GraphQL Client -> ReactJS

其中，GraphQL Client担当了类似GraphiQL的角色，把query转化为HTTP请求。

以下是几个GraphQL Client框架的介绍和对比。

![](http://sinacloud.net/woodysblog/img/graphql-client.png)

下面的demo以Apollo为例。

### React应用接入Apollo

1. 创建一个`Apollo Client`对象（与server端相关GraphQL配置关联）；
2. 引入`react-apollo`，类似Redux，把从服务器端获取的GraphQL相关请求的返回数据打进react组件的props中。

```js
import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import App from './compenents/App';

const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
```

### 在React组件中利用GraphQL查询数据

> #### [graphql-tag](https://www.npmjs.com/package/graphql-tag)
> 把GraphQL的query字符串转化成GraphQL的AST。  
> #### [React Apollo](https://s3.amazonaws.com/apollo-docs-1.x/index.html)
> 基于Apollo Client，在react应用中管理服务器端GraphQL的数据。

#### 数据请求

* 步骤一、引入了`graphql-tag`和`react-apollo`的`graphql`
* 步骤二、查询songList数据的GraphQL query，在GraphiQL面板中调试query
* 步骤三、给组件打入基于这段query的数据管理，`graphql(query)(SongList)`

#### 数据返回（query）

Apollo帮我们做了请求和返回数据的事情，通过以上的连接，组件在加载时会基于那段query发一个请求，组件props的变化会有以下2个阶段。

* 阶段一、请求发送开始。此时`this.props`的`data`就是Apollo更新的状态，其中有个`loading`字段，值为`true`，用于标记请求在发送中，但返回数据还没有回来。
* 阶段二、接收到请求数据。此时`loading`的值是`false`，且多了`songs`字段（我们在query中定义的结构），我们就可以根据返回值做我们想做的事情。

```js
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {
  render() {
    const { data = {} } = this.props;
    const { loading, songs } = data;

    return (
      <div>
        <h1>song List</h1>

        <ul className="collection">
          { !loading && songs.length ? songs.map(song => (
            <li className="collection-item" key={`song-${song.id}`}>{ song.title }</li>
          )) : <li>Loading...</li> }
        </ul>
      </div>
    );
  }
}

const query = gql`
  query {
    songs {
      title
      id
    }
  }
`;

export default graphql(query)(SongList);
```

若query需要接收动态传入的参数，Apollo Clien支持对`query`传入`options`参数。

```js
export default graphql(query, {
  options: props => {
    return {
      variables: {
        songId: props.params.songId,
      }
    }
  }
})(Song);
```

### 当React遇上GraphQL mutation

query可以跟着组件的生命周期走，但是mutation很多时候是在用户跟页面有交互时才触发的，应该怎么在事件的回调函数中加入GraphQL mutation呢？

```js
// 组件中的click提交函数
onSubmit() {
  const value = this.element.value;
  const { mutate } = this.props;

  mutate({
    variables: { // 传给mutation的参数
      title: value
    }
  }).then(() => {
    // blah blah
  });
}

const mutation = gql`
  mutation addSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;
```

同样的，Apollo会在组件初始化时，把mutation函数传入this.props，以供后续的调用。

值得注意的是，mutation一般是需要传入参数的，我们可以在声明mutation的字符串语句中，支持传入一个String类型的$

> Warm Cache in Apollo
> 列表页中，query执行一次后，返回了当前的数据（共3条）到Apollo Store存储在`List`中。
> 操作页中，当在别的component中对数据进行mutation后，服务器端的list数据多了一条（共4条）；
> 回到列表页，Apollo不会re-fetch，在Apollo Store的`List`绑定的是前3条数据（已经请求过了），并不会重新发请求把服务器中新增的第4条更新到列表中。
> 解决方式：在mutation后，refetch希望更新到最新数据的query。

```js
mutate({
  variables: {
    title: value
  },
  refetchQueries: [{
    query: fetchSongQuery, // refetch指定的query
  }]
}).then(() => {
  // callback
});
```