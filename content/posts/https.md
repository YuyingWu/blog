---
title: wuyuying.com的https时代
categories: [tech]
tags: [blog]
date: 2019-12-06 23:30:18
---

晚上顺手去阿里云申请了SSL证书，把 `wuyuying.com` 从 `http` 到 `https`。

## SSL模块 for Nginx

环境：
* CentOS
* Nginx

安装依赖：

```
yum install mod_ssl openssl
```

查询是否生效：

```
rpm -qa| grep mod_ssl
rpm -qa| grep openssl
```

安装完成后会生成一个`/etc/httpd/conf.d/ssl.conf`文件。

创建证书目录，并上传证书文件。

```
mkdir /etc/httpd/conf/ssl/

scp -r wuyuying.com.* root@${your_ip}:/etc/nginx/conf.d
```

## Nginx 配置

443端口

```
server {
  listen 443;
  ssl on;
  server_name wuyuying.com www.wuyuying.com;
  ssl_certificate         /etc/httpd/conf/ssl/wuyuying.com.pem;
  ssl_certificate_key     /etc/httpd/conf/ssl/wuyuying.com.key;
  ssl_session_timeout  5m;

  ssl_protocols TLSv1 TLSv1.1 TLSv1.2 SSLv2 SSLv3;     #指定SSL服务器端支持的协议版本
  ssl_ciphers  ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;    #指定加密算法
  ssl_prefer_server_ciphers   on;    #在使用SSLv3和TLS协议时指定服务器的加密算法要优先于客户端的加密算法

  location / {
    proxy_pass http://localhost:5000;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Forwarded-Proto https;
    proxy_redirect off;
    proxy_connect_timeout      240;
    proxy_send_timeout         240;
    proxy_read_timeout         240;
  }
}
```

80端口rewrite到https

```
server {
  listen 80;
  server_name wuyuying.com www.wuyuying.com;
  rewrite ^(.*)$ https://${server_name}$1 permanent;
}
```

## 重启Nginx

```
# nginx线程
ps -ef | grep nginx

# 重启
kill -HUP ${pid}
```

## 附录

* [Centos7配置https，及多个https配置](https://www.cnblogs.com/sxshaolong/p/10186334.html)