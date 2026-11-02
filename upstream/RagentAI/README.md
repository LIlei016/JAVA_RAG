# 企业知识库问答系统

面向企业知识的 RAG 应用，包含用户问答端和管理员知识库后台。管理员导入资料后，系统解析并切分文本、生成向量并写入 Milvus；用户提问时，系统检索相关内容并调用聊天模型生成带来源的回答。

## 功能

- 用户登录、知识库选择、多轮对话、流式回答和会话历史。
- 管理员知识库、文档和文本分块管理，以及导入状态查看。
- 管理设置页查看模型配置状态；API Key 不返回浏览器。
- 文档解析、切片、Embedding、向量检索和引用来源展示。
- `/ui-preview` 为独立交互预览，使用演示数据，不连接后端。

## 技术组成

| 部分 | 技术 |
|---|---|
| 前端 | React、TypeScript、Vite、Ant Design |
| 后端 | Java 17、Spring Boot 3.5、Maven 多模块 |
| 应用数据 | MySQL、Redis |
| 向量检索 | Milvus 2.6 |
| 文件存储 | RustFS（S3 兼容） |
| 文档解析 | Apache Tika、MarkItDown（Python） |
| 模型 | DeepSeek 聊天；百炼 Embedding 默认配置 |

## 本地运行

完整架构、配置和发布说明见 [`docs/项目说明.md`](docs/项目说明.md)。快速概览：

1. 安装 JDK 17、Node.js/npm、Python（MarkItDown 解析需要）和 Docker Desktop。
2. 配置 MySQL、Redis、Milvus、RustFS；可用 `resources/docker/milvus-stack-2.6.6.compose.yaml` 启动本地依赖。
3. 在当前 PowerShell 会话或本地未跟踪的环境文件中设置 `DEEPSEEK_API_KEY`、`BAILIAN_API_KEY`，并按实际连接信息设置数据库变量。
4. 在本目录执行 `./mvnw.cmd -pl bootstrap -am -DskipTests install`，随后执行 `./mvnw.cmd -pl bootstrap spring-boot:run`。
5. 在 `frontend` 目录执行 `npm install` 和 `npm run dev`，访问 `http://localhost:5173`。

后端 API 默认地址为 `http://localhost:9090/api/ragent`。本地管理员初始账号由数据库初始化脚本提供；公开部署前必须更改默认凭据并启用适当的访问控制。

## 主要配置

配置模板为 `.env.example`；应用配置在 `bootstrap/src/main/resources/application.yaml`。常用环境变量：

| 变量 | 用途 |
|---|---|
| `DEEPSEEK_API_KEY` | DeepSeek 聊天模型 |
| `BAILIAN_API_KEY` | 百炼 Embedding（默认模型 `text-embedding-v3`，1024 维） |
| `MYSQL_HOST`、`MYSQL_PORT`、`MYSQL_USERNAME`、`MYSQL_PASSWORD` | MySQL 连接 |
| `REDIS_HOST`、`REDIS_PORT`、`REDIS_PASSWORD` | Redis 连接 |
| `MILVUS_URI` | Milvus 地址 |
| `RUSTFS_URL`、`RUSTFS_ACCESS_KEY`、`RUSTFS_SECRET_KEY` | S3 兼容存储 |

密钥只放在本机环境变量或部署平台的 Secret 中，不要写入源码、文档、截图或提交记录。`.env` 只用于本地且不得提交。此前在对话中发送过的密钥应撤销并轮换。

## 目录导航

- `bootstrap/`：Spring Boot 启动模块、控制器和配置。
- `framework/`、`infra-ai/`：通用框架和模型适配/调用能力。
- `frontend/`：React 前端。
- `resources/`：数据库初始化、Compose、格式及静态资源。
- `mcp-server/`：可选 MCP 服务。
- `docs/`：架构及功能设计文档。

## 测试与已知边界

单元测试位于 `bootstrap/src/test`。端到端问答和文档入库需要 MySQL、Redis、Milvus、对象存储及有效模型凭据。没有这些依赖时，构建或单元测试不能代表模型和向量检索链路已验证。`/ui-preview` 的按钮和数据仅用于界面预览。

## 发布检查

- 不提交 `.env`、真实 Key、账号密码、日志、`node_modules`、构建产物或本机配置。
- 提交前检查 `git status --short`、`git diff --check` 和待提交内容；密钥曾公开时先撤销轮换。
- 保留 `LICENSE`、版权声明和适用的第三方许可证文件。

本项目按仓库中的 Apache-2.0 `LICENSE` 发布；第三方依赖仍受各自许可证约束。
