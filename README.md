# 企业知识库问答系统

本项目提供面向用户的知识库问答界面和面向管理员的知识库管理界面。应用源码、Git 仓库和完整运行说明位于 [`upstream/RagentAI`](upstream/RagentAI/README.md)。

## 项目能力

- 用户登录、选择知识库并进行多轮流式问答，答案可带知识来源。
- 管理员维护知识库、上传和管理文档，查看解析、切片和索引状态。
- Spring Boot 后端提供 API，React 前端提供用户端及管理端。
- MySQL 保存应用数据，Redis 提供缓存/协调能力，Milvus 保存向量；RustFS 提供 S3 兼容对象存储。
- 聊天默认使用 DeepSeek；当前默认 Embedding 配置为百炼 `text-embedding-v3`（1024 维）。模型密钥通过环境变量配置。

## 目录

- [`upstream/RagentAI/`](upstream/RagentAI/)：当前可运行应用及其独立 Git 仓库。
- [`docs/架构说明.md`](docs/架构说明.md)：当前应用架构和主要数据流。
- [`docs/联调启动指南.md`](docs/联调启动指南.md)：本地依赖、配置和启动步骤。
- [`docs/环境依赖清单.md`](docs/环境依赖清单.md)：运行依赖与部署准备事项。
- `docs/需求文档.md`：产品范围和首期需求。

## 开发和运行

请按 [`upstream/RagentAI/README.md`](upstream/RagentAI/README.md) 和 [`docs/联调启动指南.md`](docs/联调启动指南.md) 操作。实际页面为 `/chat`、`/admin/knowledge` 和 `/admin/settings`；`/ui-preview` 是使用演示数据的静态预览页。

## 发布与密钥

本仓库根目录就是 `JAVA_RAG`；应用源码位于 `upstream/RagentAI` 子目录。上传时应提交整个项目目录，不要只提交 README。不要提交 `.env`、真实 API Key、个人配置或运行日志；先检查 `git status` 和待提交 diff。曾在对话或其他位置公开过的 API Key 应在服务商控制台撤销并重新生成。

项目保留其适用的 Apache-2.0 许可证及版权声明。发布前请一并检查 `LICENSE` 和源码中的版权头。
