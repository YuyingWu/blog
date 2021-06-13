---
title: git学习笔记
date: 2017-01-23 18:35:51
categories: [tech]
tags: [note]
---
最近想要做博客的云端编码，在哪都能发日志，于是入了coding.net的坑，从svn转到git下~

以前工作中，因为没有什么使用git的需要，说要学吧，总有各种理由没时间。为了小博客真是操碎了心，看了廖老师的教程，发现其实git跟svn cli还是有很多的相同之处，也没有特别陌生，相信不用多久就能上手了 :)

本文是自己学习和记录用的，如果大家想看教程，还是推荐廖雪峰老师的[《Git教程》](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
<!-- more -->
## 关于版本库、工作区和暂存区
* 版本库/Repository：Git版本库，会自动创建分支master，以及指向master的HEAD指针；
* 工作区/Working Directory：你在本地写代码的目录；
* 暂存区/Stage：
	* 当你使用`git add`时，是把本地代码提交到暂存区；
	* 而使用`git commit`时，则把暂存区的代码提交到当前的分支；

![](https://cdn.sinacloud.net/woodysblog/git/git.jpg)

## 常用命令

```
git clone git@github.com:YuyingWu/blog.git // 从远程库克隆
git status // 查看状态

// 文件处理
git add <file> // 添加文件到暂存区
git rm <file> // 从版本库删除文件
git checkout -- <file> // 撤销更改
git reset HEAD <file> // 撤销更改
git diff HEAD -- <file> // 比较diff

git commit // 把暂存区的所有内容提交到当前分支

// 分支管理
git branch // 查看分支列表及当前分支，带参数-d代表删除某分支
git checkout branch-n // 切换到xx分支，带参数-b代表创建并切换
git checkout -b branch-n origin/branch-n // 创建与远程库对应的本地分支
git merge branch-n // 合并branch-n的代码到当前分支

// 分支推送
git push origin master // origin为远程库，master为当前分支

// 分支抓取
git pull // pull = fetch + merge

// 本地分支push到远程仓库
git init
git remote add origin git@github.com:YuyingWu/blog.git
git add .
git commit -m "init"
git push origin preact:preact

// 删除分支
git push origin :Branch1 // 删除远程分支 :代表delete
git branch -d branchName // 删除本地分支
```

## Git小贴士

`问`：怎么生成SSH key（SSH密钥）？
`答`：命令行执行以下代码。Mac系统下，生成的id_rsa.pub和id_rsa在/Users/xxx/.ssh目录。
```
ssh-keygen -t rsa -C “your email address”
```

![](https://cdn.sinacloud.net/woodysblog/git/ssh.png)

`问`：想把一份代码同步到多个git源，咋整？
`答`：打开本地工作区的.git/config文件，给remote "origin"多添加几个url即可

![](https://cdn.sinacloud.net/woodysblog/git/remote.png)

`问`：RPC failed
`答`：默认Git设置`http post`的缓存为1MB，改为500MB后成功提交

```
// Question
error: RPC failed; HTTP 411 curl 22 The requested URL returned error: 411 Length Required
fatal: The remote end hung up unexpectedly

// Solution
git config http.postBuffer  524288000
```

`问`：不同的SSH key给不同的站点使用
`答`：在`.ssh`目录下，添加`config`文件，给对应的站点指定读对应的rsa文件

```
Host github.com
HostName github.com
User git
IdentityFile ~/.ssh/github_rsa

Host git.coding.net
User wuyuying1128@163.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/coding_rsa
```
