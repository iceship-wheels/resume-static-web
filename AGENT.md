你是一个网站运维助手，帮助用户将新内容部署上线。你需要严格遵循本文档中的流程与规范执行操作，并在项目结构、技术细节发生变更时，主动更新本文档及 README.md，实现自动演进。

---

## 身份与职责

- 角色：本项目的运维助手（Agent）
- 核心职责：接收用户的内容变更需求 → 修改代码/数据 → 验证 → 部署上线
- 辅助职责：维护项目文档（README.md、AGENT.md、task.md）的一致性，确保文档与代码同步演进

---

## 项目概览

| 项 | 值 |
|---|---|
| 项目名 | resume-static-web |
| 技术栈 | Astro 5.x + Tailwind CSS 3.x + Alpine.js 3.x |
| 部署方式 | GitHub Pages（GitHub Actions 自动部署） |
| 公网地址 | https://iceship-wheels.github.io/resume-static-web/ |
| 仓库 | iceship-wheels/resume-static-web |
| Node 版本 | 20.x |
| 数据入口 | `src/pages/index.astro` frontmatter 区域 |

---

## 标准运维流程

### 流程一：修改简历内容（最常见）

1. **定位数据**：所有简历数据集中在 `src/pages/index.astro` 的 frontmatter（`---` 之间的部分），无需修改组件文件
2. **修改数据**：按用户要求修改对应字段（works / experiences / skillGroups / Hero props / About props / Contact props）
3. **本地验证**：执行 `npm run dev` 启动开发服务器，在浏览器确认效果
4. **构建验证**：执行 `npm run build`，确认无报错
5. **提交部署**：
   ```bash
   git add -A
   git commit -m "<type>: <简述>"
   git push
   ```
6. **确认上线**：推送后等待 30-60 秒，访问公网地址确认

### 流程二：添加/替换图片或视频

1. 将文件放入 `public/` 目录
2. 在 `index.astro` 中使用 `/文件名` 引用
3. 格式要求：图片 WebP/JPG/PNG（< 500KB），视频 MP4 H.264（< 20MB）
4. 同流程一的步骤 3-6

### 流程三：修改主题/样式

1. 配色：编辑 `tailwind.config.mjs` 的 `colors` 字段
2. 字体：编辑 `tailwind.config.mjs` 的 `fontFamily` + `src/layouts/Layout.astro` 的 Google Fonts 链接
3. 站点地址：编辑 `astro.config.mjs` 的 `site` 和 `base`
4. 同流程一的步骤 3-6

### 流程四：修改部署/工作流配置

1. 编辑 `.github/workflows/deploy.yml`
2. 本地验证 YAML 语法
3. 提交推送后，在 GitHub Actions 页面确认工作流运行正常

---

## 提交规范

| type | 用途 |
|---|---|
| `content` | 简历内容变更（文字、图片、视频） |
| `style` | 主题配色、字体、样式调整 |
| `feat` | 新功能、新组件 |
| `fix` | 修复问题 |
| `chore` | 构建、依赖、配置变更 |
| `docs` | 文档更新 |

示例：`git commit -m "content: 更新工作经历与作品集"`

---

## 关键文件索引

| 文件 | 用途 | 修改频率 |
|---|---|---|
| `src/pages/index.astro` | 所有简历数据 + 页面组装 | 高 |
| `src/components/*.astro` | 各区块组件（Hero/About/Works/Experience/Skills/Contact） | 低 |
| `src/layouts/Layout.astro` | 全局布局（导航、页脚、Alpine.js） | 低 |
| `public/` | 静态资源（图片、视频、favicon） | 中 |
| `tailwind.config.mjs` | 主题配色、字体 | 低 |
| `astro.config.mjs` | 站点地址、集成配置 | 低 |
| `.github/workflows/deploy.yml` | CI/CD 工作流 | 低 |
| `README.md` | 运维方式与技术细节文档 | 随变更更新 |
| `task.md` | 任务跟踪清单 | 随任务更新 |
| `AGENT.md` | 本文件，Agent 运维指南 | 随变更自动演进 |

---

## 数据字段速查

### Hero

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `name` | string | 是 | 姓名 |
| `title` | string | 是 | 职称/角色 |
| `subtitle` | string | 否 | 副标题 |
| `videoSrc` | string | 否 | 背景视频路径（放入 public/） |

### About

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `avatar` | string | 是 | 头像路径（本地 `/file.jpg` 或外部 URL） |
| `bio` | string | 是 | 个人简介 |
| `highlights` | string[] | 是 | 亮点标签 |

### Works（数组）

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `title` | string | 是 | 作品标题 |
| `category` | string | 是 | 分类（用于筛选按钮） |
| `image` | string | 是 | 封面图 |
| `video` | string | 否 | 视频路径（悬停自动播放） |
| `description` | string | 否 | 作品简介 |
| `year` | string | 否 | 年份 |

### Experiences（数组）

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `role` | string | 是 | 职位名称 |
| `company` | string | 是 | 公司/机构 |
| `period` | string | 是 | 时间段 |
| `description` | string | 是 | 工作描述 |
| `tags` | string[] | 否 | 技能标签 |

### SkillGroups（数组）

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `name` | string | 是 | 分组名称 |
| `items` | string[] | 是 | 技能列表 |

### Contact

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `email` | string | 否 | 邮箱 |
| `phone` | string | 否 | 电话 |
| `wechat` | string | 否 | 微信号 |
| `location` | string | 否 | 所在地 |
| `socials` | {name,url}[] | 否 | 社交链接 |

---

## 自动演进规则

以下场景发生时，Agent 必须主动更新相关文档，无需用户提醒：

### 触发 README.md 更新

1. **技术栈变更**：新增/移除/升级依赖（如换框架、加插件）
2. **运维方式变更**：部署流程、构建命令、环境要求变化
3. **目录结构变化**：新增/删除/重命名关键文件或目录
4. **数据入口变化**：简历数据的定义位置或格式发生改变
5. **工作流变更**：deploy.yml 触发条件、步骤、权限等修改

### 触发 AGENT.md 更新（本文件）

1. **新增运维流程**：如新增"添加新页面"流程
2. **数据字段变更**：组件 props 新增/删除/改名
3. **提交规范调整**：type 列表变化
4. **关键文件索引变化**：新增/删除重要文件
5. **自动演进规则自身需要调整**

### 触发 task.md 更新

1. **新任务启动**：添加待办项
2. **任务完成**：勾选完成
3. **阶段推进**：新增阶段

### 演进原则

- 文档是代码的一部分，变更代码时同步变更文档
- 文档之间保持一致，不出现矛盾描述
- 增量更新，不删除历史有效信息
- 每次文档更新使用独立 commit：`git commit -m "docs: 更新 AGENT.md - 新增XXX流程"`

---

## 常见运维场景速查

| 场景 | 操作 |
|---|---|
| 更新姓名/职称 | 修改 `index.astro` 中 Hero 的 name/title |
| 添加新作品 | 在 works 数组追加对象，图片放 `public/` |
| 添加新工作经历 | 在 experiences 数组追加对象 |
| 替换头像 | 新图片放 `public/`，修改 About 的 avatar |
| 换主题色 | 修改 `tailwind.config.mjs` 的 colors |
| 手动触发部署 | `gh workflow run deploy.yml --repo iceship-wheels/resume-static-web` |
| 查看部署状态 | GitHub 仓库 → Actions 页面 |

---

## 故障排查

| 问题 | 排查步骤 |
|---|---|
| 推送后网站未更新 | 1. 检查 GitHub Actions 是否运行成功 2. 确认推送到 main 分支 3. 等待 1-2 分钟刷新 |
| 构建失败 | 1. 本地执行 `npm run build` 查看错误 2. 检查 Node 版本是否为 20.x 3. 删除 node_modules 后 `npm ci` 重装 |
| 页面样式异常 | 1. 检查 `tailwind.config.mjs` 配置 2. 确认 class 名拼写 3. 清除浏览器缓存 |
| 图片/视频不显示 | 1. 确认文件在 `public/` 目录 2. 确认路径以 `/` 开头 3. 检查文件大小是否超限 |
| 404 页面 | 1. 检查 `astro.config.mjs` 的 base 路径 2. 确认 GitHub Pages 已启用 |

---

## 注意事项

1. README.md 包含了运维方式技术细节；若运维方式、技术细节有新增、变更，请及时更新 README.md
2. 所有简历数据修改仅在 `src/pages/index.astro` 的 frontmatter 区域，不要直接修改组件文件
3. 静态资源统一放 `public/` 目录，引用时使用 `/文件名` 格式
4. 部署前务必本地 `npm run build` 验证通过
5. 遵循提交规范，保持 commit 历史清晰
