# AI 剧本生成平台前端

这是一个基于 Next.js + ShadCN + Tailwind CSS 的 AI 剧本生成平台前端项目，帮助用户通过分步操作生成适合中短视频的完整剧本。

## 🌐 项目定位
- 纯前端 Web 应用（无服务端逻辑）
- 支持静态托管（如 Vercel）
- 无需注册登录，专注交互节奏和输出体验

## 🧩 五步 API 串联
1. 剧本梗概（logline）
2. 角色设定（character）
3. 三幕剧结构（3acts）
4. 场景生成（scene）
5. 剧本整合输出（write）

## 🏗️ 推荐目录结构
- `app/`：页面与路由（Next.js App Router）
- `components/`：通用 UI 组件（ShadCN）
- `domain/`：领域模型与类型
- `application/`：用例服务、状态管理
- `infrastructure/`：API 客户端
- `interface/`：适配层
- `tests/`：测试
- `public/`：静态资源
- `styles/`：全局样式

## 📐 开发原则
- DDD 分层，结构清晰
- TDD 验收驱动开发
- 组件全部基于 ShadCN
- 每步输出基于上一步结果，用户体验流畅

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
