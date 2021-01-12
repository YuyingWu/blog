[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/YuyingWu/blog)

# Yuying Wu's Blog

## 主题开发

> node >= 10.13.0

文件目录：  

- workspace
  - blog (current repo)
  - gatsby-theme-chaton
  - package.json

```
# workspace/package.json

{
  "name": "gatsby-starter-theme-workspace",
  "private": true,
  "version": "0.0.1",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "dev": "yarn workspace wyy-blog develop",
    "build": "yarn workspace wyy-blog build",
    "serve": "yarn workspace wyy-blog serve"
  },
  "workspaces": [
    "wyy-blog",
    "gatsby-theme-chaton"
  ]
}
```

其中，在blog中的 `package.json` 对 `gatsby-theme-chaton` 依赖的版本为 `*`。

```
# blog/package.json

"dependencies": {
  "gatsby-theme-chaton": "*"
}
```

运行：

```shell
yarn dev
```
