---
title: Notes for Docker
categories: [tech]
tags: [docker]
date: 2019-10-10 23:09:18
---

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

```

### PORT mapping

![Alt text](http://static.wuyuying.com/docker-port-mapping.png)

### Volumn mapping

![Alt text](http://static.wuyuying.com/docker-volumn-mapping.png)

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
