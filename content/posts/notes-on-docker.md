---
title: Notes for Docker
categories: [tech]
tags: [docker]
date: 2020-03-11 22:56:18
createDate: 2019-10-10 23:09:18
---

记录前端同学学习Docker的笔记。

## 2020.03

## command

```
# verified cli can talk to engine
docker verison

# most config values of engine
docker info

# docker command line structure
# docker <command> <sub-command> (options)
```

## start a Nginx Web Server

```
# --publish 80:80 -> <host port>:<container port> 
docker container run --publish 80:80 nginx

# --detach, run the container background
# you'll get a container id, which is unique
docker container run --publish 80:80 --detach nginx

# list containers that are active
docker container ls -a

# --name, name your container
docker container run --publish 80:80 --detach  --name webhost nginx

# top command to see the process inside the container
docker container top webhost

# logs
docker container logs webhost

# stop a container
docker container stop <container id>

# remove a container
docker container rm <container id>
```

1. downloaded image nginx from Docker Hub
2. started a new container from that image
3. opened port 80 on the host IP
4. routes that traffic to the container IP, port 80

### what happens when we run a container

1. looks for that image locally in image cache, doesn't find anything
2. then looks in remote image repo (defaults to Docker Hub)
3. downloads the latest version by default
4. creates new container based on that image and prepares to start
5. gives it a virtual IP on a private network inside docker engine
6. opens up port 80 on host and forwards to port 80 in container
7. starts container by using the CMD in the image Dockerfile

### container vs VM

Container is just a process, you can find the process with a process tool.

```
# if the container is running, you can find it.
ps aux | grep <pid or process name>
```

### what's going on in containers

```
# process list in one container
docker container top

# details of one container config
docker container inspect

# performance stats for all containers, CPU/memory/IO/...
docker container stats
```

### Assignment

1. run a `nginx` , a `mysql` , and a `httpd` server
1. run all of them `--detach` , name them with `--name` 
1. nginx should listen on 80:80, httpd on 8080:80, mysql on 3306:3306
1. when running mysql, use the `--env` or `-e` to pass in `MYSQL_RANDOM_ROOT_PASSWORD=yes` 
1. use `docker container logs` on mysql to find the password it created on startup
1. clean it all up with `docker container stop`  and `docker container rm` 
1. use `docker container ls` to ensure everything is correct before and after cleanup

## 2019.10

## 核心概念

1. Docker镜像（Docker Image）

> Docker镜像类似虚拟机镜像，可以理解为一个只读的模版。  
> 镜像是创建Docker容器的基础。

2. Docker容器（Docker Container）

> Docker容器类似一个轻量级的沙箱，利用容器来运行和隔离应用。  
> 容器是从镜像创建的应用运行实例，可以启动、开发、停止、删除。容器间是彼此隔离、互不可见的。  
> 可以把容器看作一个简易版的Linux系统环境（包括root用户权限、进程空间、用户空间和网络空间等），以及运行在其中的应用程序打包而成的盒子。

3. Docker公开服务（Docker Registry）

> Docker公开服务，是一个集中的存储、分发镜像的服务。开放给用户使用、允许用户管理镜像的 Registry 服务。一般这类公开服务允许用户免费上传、下载公开的镜像，并可能提供收费服务供用户管理私有镜像。
> 一个 Docker Registry 中可以包含多个仓库（Repository）；每个仓库可以包含多个 标签（Tag）；每个标签对应一个镜像。

注意：
* 镜像自身是只读的
* 容器从镜像启动时，会在镜像的最上层创建一个可写层

## 创建镜像

### 1. 基于已有容器创建

```
docker [container] commit [options] "Docker Newee" [REPOSITORY[:TAG]]
```

* -a, --author="", 作者信息
* -c, --change=[], 提交时执行Dockerfile指令
* -m，--message="", 提交消息
* -p，--pause=true，提交时暂停容器运行

### 2. 基于本地模版导入

```
cat unbuntu.tar.gz | docker import - ubuntu:18.04
```

### 3. 基于Dockerfile创建

先准备Dockerfile，在路径中执行：

```
docker [image] build -t myImage:1.0
```

### 4. 存出和载入镜像

1. 存出 save

把镜像导出到本地文件

```
docker save -o xxx.tar TARGET_IMAGE:TAG_ID
```

2. 载入 load

从本地文件中载入本地镜像列表

```
docker load > dockerImageFile.tar
```

### 5. 上传镜像

```
docker tag nginx:lastest wyy/nginx:1.0
docker push wyy/nginx:1.0
```

## command

```bash
# start a container
docker run nginx

# list all containers
docker ps

# list containers that are active
docker ps -a

# stop a container
docker stop nginx

# remove a container
docker rm nginx

# list images
# docker image ls
# info: Repository | Tag | Image Id | Created | Size
docker images

# remove images
docker rmi nginx

# execute a command inside the container
docker exec name_of_a_container cat /etc/hosts

# run a container attach(frontend mode, which you can exec no commands)
docker run nginx

# run a container detach(backend mode, which you can exec commands while the container is active)
# output is the id of the process ${pid}
# when you want to stop in, exec ` docker attach ${pid}`
docker run -d nginx

# run tag `:4.0` specify the version of the image
# look up information about the image on docker hub
docker run redis:4.0

# run - STDIN, input for the container
docker run -i docker_image

# run - STDIN, input in a terminal for the container, interactive mode
docker run -it docker_image

# inspect container
docker inspect container_name

# container log
docker logs container_name

# 为本地镜像添加新的标签，image id一致，指向同一个镜像源（本地 ubuntu:latest），只是别名 
docker tag ubuntu:latest myubuntu:latest

# search from docker hub (order by stars)
docker search [option] nginx

# 清理临时镜像
docker image prune -f

```

### PORT mapping

![Alt text](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/docker-port-mapping.png)

### Volumn mapping

![Alt text](//wyy-static.oss-cn-guangzhou.aliyuncs.com/xx/docker-volumn-mapping.png)

### docker lab

[docker quiz from kodekloud.com](https://kodekloud.com/p/docker-labs)

### ENV Variables in Docker

```bash
docker run -e APP_COLOR=blue docker_image
```

How to inspect the ENV Variables in a docker container?

```bash
docker inspect container_name
```

ENV Variables will be in the object `Config.Env`

## How to create my own image

1. OS - ubuntu
2. update apt repo
3. install dependencies using apt
4. install python dependencies using pip
5. copy source code to /opt folder
6. run the web server using `flask` command

```bash
FROM Ubuntu
# start from a base OS

RUN apt-get update
RUN apt-get install python

RUN pip install flask
RUN pip install flask-mysql

COPY . /opt/source-code

ENTRYPOINT FLASK_APP=/opt/source-code/app.py flask run
# specify ENTRYPOINT, run the image as a container
```

## 附录

- [Docker for the Virtualization Admin](https://github.com/mikegcoleman/docker101/blob/master/Docker_eBook_Jan_2017.pdf)
- [Cgroups, namespaces, and beyond: what are containers made from?](https://www.youtube.com/watch?v=sK5i-N34im8&feature=youtu.be&list=PLBmVKD7o3L8v7Kl_XXh3KaJl9Qw2lyuFl)
- [Docker Documentation](https://docs.docker.com/)
- Docker —— 从入门到实践 [实体书](https://book.douban.com/subject/27178710/) [在线版](https://yeasy.gitbooks.io/docker_practice/content/)