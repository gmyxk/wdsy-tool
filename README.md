# 某道手游数据库管理工具

## 项目介绍

预览地址

https://wdt.oneddd.com/

本人已停止该项目的开发，原因是这圈子过于封闭，人人皆为钱而来，句句都是生意，实在是无法理解，也无法融入。现已将代码开源，希望有需要的人可以善加使用。诸位再见~

## 开发环境配置

Node.js 版本要求：18.17.0+

pnpm 版本要求：7.0.0+

项目启动

```bash
pnpm dev
```

## 环境变量配置

环境变量讲解

- `CRYPTO_KEY` 十六位的十六进制字符
- `CRYPTO_IV` 十六位的十六进制字符

`.env.local` 文件示例

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=123456
```

## Docker 部署

镜像地址 https://hub.docker.com/repository/docker/xiyouhehua/wdsy-tool

## 功能介绍
