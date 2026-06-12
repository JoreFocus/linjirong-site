# linjirong.com — 个人站

## 项目概述
林哥的多页个人站（作品集/名片性质），GitHub Pages + Cloudflare 部署。设计参考 juanmora.co，纯静态多页结构。

## 技术栈
- 纯 HTML/CSS/JS（无框架）
- GSAP + ScrollTrigger + Lenis（CDN 引入，锁版本号）
- GitHub Pages 托管，Cloudflare DNS（proxy 必须关，否则证书失败）

## 目录结构
- `/` — 首页（hero + works + about teaser + contact）
- `/about/` — 简介页
- `/work/` — 作品集卡片墙
- `/pitch/` — 数字遗产路演展示 HTML
- `/kit/` — 数字遗产知识包 HTML

## 设计原则
- 整体基调：干净专业（juanmora 向），Puffie 梦核气质只在 `/work/puffie/` 释放
- 视觉原则：**乍看正常，细看有意思**——焦点元素 hover 才触发特殊效果，非焦点保持自然
- 动效：尊重 `prefers-reduced-motion`，移动端与键盘可访问性达标

## 已知坑
- Cloudflare 有缓存，部署后用无痕验证，或手动清缓存
- JS 独立 script 放 `</body>` 前，主逻辑在 `/assets/js/site.js`

## 规划文档
完整 4 阶段执行计划见 `D:\MyCC\02_My_Projects\Personnal Webside\个人网站重构与路演托管规划.md`

## 自动模式（重要）

**本项目使用 Conductor 框架。每次对话开始，立即自动执行 `.claude/commands/conductor.md` 中定义的 Session 开始流程，无需任何指令触发。**

- 需求真相源：`docs/backlog.csv`
- 运行态入口：`docs/progress.md`
