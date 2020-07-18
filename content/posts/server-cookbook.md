---
title: Server's Cookbook
categories: [tech]
tags: [linux]
date: 2020-07-18 10:37:18
---

最近总是发现，blog commit之后的CI，有的时候会提示空间不足，导致一些文件拷不过去。

这块也不是很熟悉，查了下如何快速定位服务器磁盘在哪些文件夹的占的空间比较大。

```
# 到根目录
cd /

# 查看每个目录的size
du -sh *

# 定位后，重复以上，把不需要的、临时的干掉
```

我发现在 `/var/log/jenkins` 居然占了9G，看名字，有可能是Travis CI注进来的，我忘记看detail直接清空了…… 第二次CI，博客的文件能正常进来啦，后面再观察观察。
