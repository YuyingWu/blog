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