---
title: GraphQL小记
date: 2018-06-26 21:32:09
categories: [tech]
tags: [note]
---

!["structure"](http://sinacloud.net/woodysblog/graphql/structure.png)

基于GraphQL、express、MongoDB、Apollo、React.js的小应用。
->> 项目源码[github传送门](https://github.com/YuyingWu/playground/tree/master/graphql-playlist)

内容包括：

* 如何搭建基于GraphQL、express、MongoDB的后台服务器
* 如何定义数据模型
* 如何通过GraphiQL测试query和获取的数据结构，包括query（查询）和mutation（更新）
* 如何搭建可以跟graphql query通信的Apollo-React前端应用

<!-- more -->

## Server

### 环境

* express
  * express-graphql
* graphql
* mongoose，连接server和数据库（mLab）
* [mLab](https://mlab.com/)，云端mongoDB

### 定义Book的Schema

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

### 定义RootQuery

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

### 打开服务器的GraphiQL的面板

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

### Graphql提供的类型/方法

**GraphQLID**，接受query中的字符串或数字类型的参数，转成JavaScript的string类型。
**GraphQLInt**，number类型。
**GraphQLNonNull**，使用方式`type: new GraphQLNonNull(GraphQLInt)`，说明该字段的数据类型为int且必填。

### 关联类型（relative type）

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

### Mutation

数据库model的声明。

```
// models/author.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const authorSchema = new Schema({
  name: String,
  age: Number
});

module.exports = mongoose.model('Author', authorSchema);
```

在GraphQL schema中声明mutation`addAuthor`方法，把model`Author`的实例保存到数据库，且`return`相应数据。

```
// schema.js
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
      },
      resolve(parent, args) {
        // 创建mongoose model `Author` 实例
        let author = new Author({
          name: args.name,
          age: args.age
        });

        // mongoose model 实例的方法
        return author.save();
      }
    }
  }
});
```

在GraphiQL中调用该mutation，执行添加author的操作，且获取添加后的数据结果。

```
// GraphiQL
mutation {
  addAuthor(name: "wyy", age: 28) {
    name
    age
  }
}
// 返回结果
{
  "data": {
    "addAuthor": {
      "name": "wyy",
      "age": 28
    }
  }
}
```

## Client

### 环境

* React.js
  * create-react-app
* Apollo系
  * apollo-boost
  * graphql
  * react-apollo

### Step 1：连接React component和Apollo Provider

在整个React应用中，通过ApolloClient，打通graphql和react组件的连接。

```
// App.js
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <h1>hello, world</h1>
          <BookList />
        </div>
      </ApolloProvider>
    );
  }
}
```

### Step 2：graphql query和React组件的数据交互

#### 1.声明graphql query

```
// components/BookList.js
import { gql } from 'apollo-boost';
const getBooksQuery = gql`
{
  books {
    id
    name
  }
}
`;
```

#### 2.利用Apollo连接`gq query`和react component

结合`react-apollo`的`graphql`，以及刚才声明的query，把请求数据打进`BookList`的`props`。

```
import { graphql } from 'react-apollo';

class BookList extends Component {
  // 具体组件实现 blah blah
}

export default graphql(getBooksQuery)(BookList);
```

假如，在一个组件内，需要注入多个query，可以利用`react-apollo`提供的`compose`方法。

```
import { graphql, compose } from 'react-apollo';

class BookList extends Component {
  // 具体组件实现 blah blah
}

export default compose(
  graphql(gqlQuery1, { name: 'gqlQuery1' }),
  graphql(gqlQuery2, { name: 'gqlQuery2' }),
)(BookList);
```

!["graphql compose"](http://sinacloud.net/woodysblog/graphql/gql-compose.png)

#### 3.通过this.props.data获取请求数据

在server的graphiQL查询的数据结构如下。

```
{
  "data": {
    "books": [
      {
        "id": "5b374cdd5806e47eefce3734",
        "name": "test"
      }
    ]
  }
}
```

在render输出client的this.props.data，可以发现props更新了两次。区别在于`loading`这个字段，这也可以作为一个判断的flag，当`loading`为`true`时，再进一步分析接口返回的数据结构。

第一次，`loading`为`true`，没有`books`这个字段。

!["loading"](http://sinacloud.net/woodysblog/graphql/apollo-loading.png)

第二次，`loading`为`false`，而`books`返回了一个数组。

!["loaded"](http://sinacloud.net/woodysblog/graphql/apollo-loaded.png)

#### 4. Mutation

i. query的声明

值得注意的是，当调用mutation时，我们可能需要传入参数，如何获取从react组件传入的参数？可以利用query variables（query变量）实现。

```
// query.js
const addBookMutation = gql`
mutation($name: String!, $genre: String!, $authorId: ID!) {
  addBook(name: $name, genre: $genre, authorId: $authorId) {
    name
    id
  }
}
`
```

ii. react component的数据交互

利用`react-apollo`的`compose`，把`addBookMutation`注入到`this.props`，通过`varibales`传入query变量。

而当我们希望在mutation之后重新获取某个query的数据时，可以在mutation操作中添加`refetchQueries`的回调。

```
// addBook.js
addBook() {
  // formData为点击表单提交后，获取各项input/select的数据对象
  this.props.addBookMutation({
    variables: {
      name: formData.name,
      genre: formData.genre,
      authorId: formData.authorId,
    },
    refetchQueries: [{
      query: anotherQueryWantedToBeRefetched
    }]
  })
}
```

#### 5. Query

需要从组件传入参数，进行参数查询的gql query（引入query变量）。

```
// query.js
const getBooksQuery = gql`
query ($id: ID!) {
  book(id: $id) {
    id
    name
  }
}
`;

// getBook.js
// 在绑定组件和graphql数据前，把props.id注入到query的variables里
export default graphql(getBookQuery, {
  options: props => ({
    variables: {
      id: props.id
    }
  })
})(getBookComponentName);
```

## Tips

`问` 为什么在声明GraphQLObjectType实例时，fields不直接使用对象，而使用了函数？
`答` 因为js的执行时机，直接使用对象的话，代码从上往下执行，fields中引用别的类型，如BookType和AuthorType有互相引用，会报错BookType或者AuthorType undefined。而使用函数的话，执行到函数内部逻辑时，外部的声明已经完成了。