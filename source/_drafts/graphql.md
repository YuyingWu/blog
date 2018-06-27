---
title: GraphQL
date: 2018-06-26 21:32:09
tags:
- front-end
- graphql
---

定义Book的Schema

```
// schema.js

const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString } = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    genre: { type: GraphQLString },
    name: { type: GraphQLString },
  })
});
```

定义RootQuery

* book的类型是一个Graphql对象类型`BookType`；
* args是发起这个query时，需要传入什么参数，这里是`id`；
* resolve是根据参数从数据库查询数据的逻辑。

```
// schema.js

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        // code to get data from db / other source
        // args.id
      }
    }
  }
});
```

打开服务器的GraphiQL的面板

```
// server.js
// 访问 http://127.0.0.1:5000/graphql

const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(5000, () => {
  console.log('now listening for requests on port 5000, http://127.0.0.1:5000/');
});
```

然后在GraphiQL面板，查询对应book的内容。

```
# Graphiql的查询语句
{
  book(id: "1") {
    name
  }
}

# {
#   "data": {
#    "book": {
#      "name": "Name of the Wind"
#     }
#   }
# }
```

GraphQLID，接受query中的字符串或数字类型的参数，转成JavaScript的string类型。
GraphQLInt，number类型。

关联类型（relative type）

把AuthorType作为BookType的关联类型（实现功能，每本书有个作者）

* 声明一个字段`author`，类型为`AuthorType`
* 在`resolve`中，参数`parent`带有当前query的返回结果，从数据库中查询`id`等于当前book的`authorId`的作者信息，作为`author`的返回值

```
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    genre: { type: GraphQLString },
    name: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // code to get data from db / other source
        // args.id
        return _.find(authors, {
          id: parent.authorId
        });
      }
    }
  })
});
```

当关联类型需要返回一个数组

字段`books`返回`BookType`的数组，借助`GraphQLList`。

```
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // code to get data from db / other source
        // args.id
        return _.filter(books, {
          authorId: parent.id
        });
      }
    }
  })
});
```

Tips

`问` 为什么fields不直接使用对象，而使用了函数？
`答` 因为js的执行时机，直接使用对象的话，代码从上往下执行，fields中引用别的类型，如BookType和AuthorType有互相引用，会报错BookType或者AuthorType undefined。而使用函数的话，执行到函数内部逻辑时，外部的声明已经完成了。