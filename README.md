# Resume Static Web

面向艺术/策划从业者的个人简历与作品集静态网站。

- 技术栈：Astro + Tailwind CSS + Alpine.js
- 部署：GitHub Pages（Actions 自动部署）
- 公网地址：https://iceship-wheels.github.io/resume-static-web/

---

## 目录结构

```
resume-static-web/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署工作流
├── public/
│   └── favicon.svg             # 站点图标（可替换为自己的头像/Logo）
├── src/
│   ├── components/
│   │   ├── Hero.astro          # 首屏大图区（姓名、职称、背景视频/图片）
│   │   ├── About.astro         # 关于我（头像、简介、亮点标签）
│   │   ├── Works.astro         # 作品集（图片画廊 + 视频播放 + 分类筛选）
│   │   ├── Experience.astro    # 工作经历（时间线式）
│   │   ├── Skills.astro        # 技能与工具（分组卡片）
│   │   └── Contact.astro       # 联系方式（邮箱/电话/微信/地址/社交链接）
│   ├── layouts/
│   │   └── Layout.astro        # 全局布局（导航栏、页脚、Alpine.js 引入）
│   └── pages/
│       └── index.astro         # 主页面（组装所有组件 + 数据定义）
├── astro.config.mjs            # Astro 配置（站点地址、base 路径、集成）
├── tailwind.config.mjs         # Tailwind 配置（主题色、字体）
├── tsconfig.json               # TypeScript 配置
├── package.json                # 依赖与脚本
└── task.md                     # 任务跟踪清单
```

---

## 运维文档

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:4321）
npm run dev

# 构建生产版本
npm run build

# 本地预览构建结果
npm run preview
```

### 修改简历内容

所有简历数据集中在 `src/pages/index.astro` 的 frontmatter 区域（`---` 之间的部分），无需修改组件文件。

#### 1. 修改个人信息（Hero 区域）

```js
<Hero
  name="你的姓名"                          // 修改姓名
  title="你的职称 / 角色描述"               // 修改职称
  subtitle="YOUR SUBTITLE"                 // 修改副标题
/>
```

如需添加首屏背景视频，将视频文件放入 `public/` 目录，然后在 `index.astro` 中为 Hero 传入 `videoSrc`：

```js
<Hero
  name="你的姓名"
  title="你的职称"
  videoSrc="/your-video.mp4"              // 背景视频（自动循环静音播放）
/>
```

#### 2. 修改关于我

```js
<About
  avatar="/your-avatar.jpg"               // 头像图片（放入 public/ 目录）
  bio="你的个人简介文字..."                 // 个人简介
  highlights={['标签1', '标签2', '标签3']}   // 亮点标签
/>
```

> `avatar` 支持本地路径（`/filename.jpg`，文件放 `public/`）或外部 URL。

#### 3. 修改作品集

```js
const works = [
  {
    title: '作品名称',
    category: '视觉设计',                    // 分类名（用于筛选按钮）
    image: '/your-work.jpg',               // 封面图（放入 public/ 目录）
    video: '/your-demo.mp4',               // 可选：视频文件（悬停自动播放）
    description: '作品描述文字...',
    year: '2024',
  },
  // 继续添加更多作品...
];
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 作品标题 |
| `category` | 是 | 分类（用于筛选，如"视觉设计"、"策展项目"） |
| `image` | 是 | 封面图 URL 或本地路径 |
| `video` | 否 | 视频文件路径，设置后鼠标悬停自动播放 |
| `description` | 否 | 作品简介 |
| `year` | 否 | 年份 |

#### 4. 修改工作经历

```js
const experiences = [
  {
    role: '职位名称',
    company: '公司/机构名称',
    period: '2020 - 至今',
    description: '工作内容描述...',
    tags: ['标签1', '标签2'],              // 可选：技能标签
  },
];
```

#### 5. 修改技能

```js
const skillGroups = [
  {
    name: '分组名称',
    items: ['技能1', '技能2', '技能3'],
  },
];
```

#### 6. 修改联系方式

```js
<Contact
  email="your@email.com"
  phone="+86 138-xxxx-xxxx"
  wechat="your_wechat_id"
  location="城市, 国家"
  socials={[
    { name: 'Behance', url: 'https://behance.net/yourname' },
    { name: 'IG', url: 'https://instagram.com/yourname' },
  ]}
/>
```

### 图片与视频管理

1. 将图片/视频文件放入 `public/` 目录
2. 在 `index.astro` 中使用 `/文件名` 引用（如 `/avatar.jpg`、`/demo-reel.mp4`）
3. 推荐格式：
   - 图片：WebP / JPG / PNG（建议单张 < 500KB）
   - 视频：MP4（H.264 编码，建议 < 20MB）

### 部署上线

**方式一：自动部署（推荐）**

```bash
git add -A
git commit -m "update: 修改简历内容"
git push
```

推送后 GitHub Actions 自动构建并部署，约 30-60 秒生效。

**方式二：手动触发部署**

在 GitHub 仓库页面 → Actions → Deploy to GitHub Pages → Run workflow

**方式三：通过 GitHub CLI**

```bash
gh workflow run deploy.yml --repo iceship-wheels/resume-static-web
```

---

## 工作流说明

### deploy.yml

```
触发条件：push 到 main 分支 / 手动触发
        │
        ▼
   ┌─────────┐
   │  build   │  Checkout → Setup Node 20 → npm ci → npm run build → 上传 dist 产物
   └────┬────┘
        │
        ▼
   ┌─────────┐
   │  deploy  │  下载产物 → 部署到 GitHub Pages
   └─────────┘
```

- **并发控制**：同一时间只运行一个部署，新推送不会取消正在进行的部署
- **权限**：`contents: read`（读取代码）、`pages: write` + `id-token: write`（部署 Pages）
- **Node 版本**：20.x
- **构建命令**：`npm ci`（严格按 lock 文件安装）+ `npm run build`（Astro 静态构建）

---

## 主题定制

### 修改配色

编辑 `tailwind.config.mjs`：

```js
colors: {
  primary: '#1a1a2e',    // 主背景色
  accent: '#e94560',     // 强调色（按钮、链接、高亮）
  surface: '#16213e',    // 卡片/区块背景色
  muted: '#0f3460',      // 辅助色（标签、次要元素）
},
```

### 修改字体

编辑 `tailwind.config.mjs` 的 `fontFamily`，同时更新 `src/layouts/Layout.astro` 中的 Google Fonts 链接。

### 修改站点地址

编辑 `astro.config.mjs`：

```js
export default defineConfig({
  site: 'https://your-username.github.io',   // 你的 GitHub Pages 域名
  base: '/resume-static-web',                // 仓库名（子路径）
});
```

---

## 技术栈概览

| 层级 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 框架 | [Astro](https://astro.build) | 5.x | 静态站点生成，零 JS 默认输出 |
| 样式 | [Tailwind CSS](https://tailwindcss.com) | 3.x | 原子化 CSS，构建时裁剪 |
| 交互 | [Alpine.js](https://alpinejs.dev) | 3.x | 移动端导航、作品筛选等轻交互 |
| 部署 | GitHub Pages + Actions | - | 推送即部署，零成本托管 |
