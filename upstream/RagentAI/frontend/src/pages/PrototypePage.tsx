import { useRef, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  BookOpen,
  Check,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileText,
  FolderOpen,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import "@/styles/prototype.css";

type View = "chat" | "knowledge";

const knowledgeBases = [
  { name: "产品与服务手册", docs: 28, chunks: 364, updated: "今天 10:42", color: "blue", status: "运行正常" },
  { name: "员工制度与流程", docs: 16, chunks: 192, updated: "昨天 16:18", color: "violet", status: "运行正常" },
  { name: "项目技术文档", docs: 9, chunks: 108, updated: "10月16日", color: "amber", status: "处理中" },
];

const initialMessages = [
  { role: "user", text: "新员工申请年假需要走什么流程？" },
  {
    role: "assistant",
    text: "新员工可以通过 OA 系统提交年假申请，流程如下：\n\n1. 在「考勤与休假」中选择「年假申请」\n2. 填写休假日期和工作交接安排\n3. 提交给直属主管审批\n\n建议至少提前 3 个工作日提交。入职未满一年的年假额度，请以人事系统显示为准。",
    sources: ["员工考勤管理制度.pdf · 第 12 页", "休假申请操作指南.md · 年假申请"],
  },
];

export function PrototypePage() {
  const [view, setView] = useState<View>("chat");
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const uploadRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    const value = query.trim();
    if (!value || busy) return;
    setMessages((items) => [...items, { role: "user", text: value }]);
    setQuery("");
    setBusy(true);
    window.setTimeout(() => {
      setMessages((items) => [
        ...items,
        {
          role: "assistant",
          text: "我会根据当前选择的知识库检索相关资料，再整理成可追溯的回答。这个页面目前是界面预览，接入后端后会在这里显示真实检索结果。",
          sources: ["产品与服务手册.pdf · 相关章节"],
        },
      ]);
      setBusy(false);
    }, 700);
  };

  const showNotice = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  return (
    <div className="rag-preview">
      <aside className="preview-sidebar">
        <a className="preview-brand" href="/ui-preview" aria-label="知屿首页">
          <span className="brand-mark"><Sparkles size={19} /></span>
          <span><strong>知屿</strong><small>KNOWLEDGE STUDIO</small></span>
        </a>

        <div className="workspace-picker">
          <span className="workspace-avatar">R</span>
          <span className="workspace-copy"><b>研发知识空间</b><small>个人工作区</small></span>
          <ChevronDown size={15} />
        </div>

        <div className="nav-caption">工作台</div>
        <button className={`nav-item ${view === "chat" ? "active" : ""}`} onClick={() => setView("chat")}>
          <MessageSquareText size={17} /> 智能问答 <span className="nav-count">⌘ K</span>
        </button>
        <button className={`nav-item ${view === "knowledge" ? "active" : ""}`} onClick={() => setView("knowledge")}>
          <BookOpen size={17} /> 知识库管理
        </button>
        <button className="nav-item" onClick={() => showNotice("会话记录页面正在规划中")}>
          <Clock3 size={17} /> 最近会话
        </button>

        {view === "chat" ? (
          <div className="sidebar-section">
            <div className="sidebar-section-title"><span>最近对话</span><button onClick={() => setMessages([])} aria-label="新建对话"><Plus size={16} /></button></div>
            <button className="history-item selected"><span className="history-dot" /> 年假申请流程说明</button>
            <button className="history-item"><span className="history-dot" /> 产品的保修期限</button>
            <button className="history-item"><span className="history-dot" /> 项目部署环境要求</button>
          </div>
        ) : (
          <div className="sidebar-section kb-sidebar">
            <div className="sidebar-section-title"><span>知识库</span><span className="tiny-count">03</span></div>
            {knowledgeBases.map((kb) => <div className="kb-side-item" key={kb.name}><span className={`kb-dot ${kb.color}`} />{kb.name}</div>)}
          </div>
        )}

        <div className="sidebar-bottom">
          <button className="nav-item" onClick={() => showNotice("帮助中心正在规划中")}><CircleHelp size={17} /> 帮助与反馈</button>
          <div className="profile-card"><div className="profile-avatar">李</div><div className="profile-copy"><b>李先生</b><small>管理员</small></div><MoreHorizontal size={18} /></div>
        </div>
      </aside>

      <main className="preview-main">
        <header className="preview-topbar">
          <div className="breadcrumb"><span>工作台</span><span className="crumb-sep">/</span><b>{view === "chat" ? "智能问答" : "知识库管理"}</b></div>
          <div className="topbar-right"><span className="preview-badge"><span /> 界面预览</span><button className="icon-button" onClick={() => showNotice("设置页面正在规划中")} aria-label="设置"><Settings2 size={18} /></button><div className="mini-avatar">李</div></div>
        </header>

        {view === "chat" ? (
          <section className="chat-view">
            <div className="chat-toolbar"><div className="kb-select"><FolderOpen size={16} /><span>员工制度与流程</span><ChevronDown size={14} /></div><button className="icon-button" onClick={() => showNotice("对话已分享（预览）")} aria-label="更多"><MoreHorizontal size={19} /></button></div>
            <div className="chat-scroll">
              <div className="chat-date">今天 · 10:42</div>
              {messages.length === 0 ? (
                <div className="welcome-block"><div className="welcome-orb"><Sparkles size={24} /></div><p className="eyebrow">你的知识助手已就绪</p><h1>你好，李先生<span>。</span><br />今天想了解什么？</h1><p className="welcome-sub">我会从所选知识库中查找依据，并附上来源，帮助你快速找到可靠答案。</p><div className="suggestion-grid">{["新员工如何申请年假？", "产品支持哪些售后服务？", "项目上线前需要检查什么？"].map((q) => <button key={q} onClick={() => setQuery(q)}><Sparkles size={15} />{q}<ArrowUp size={14} /></button>)}</div></div>
              ) : (
                <div className="message-stack">
                  {messages.map((message, index) => message.role === "user" ? (
                    <div className="user-message" key={`${index}-${message.text}`}><span>{message.text}</span></div>
                  ) : (
                    <article className="assistant-message" key={`${index}-${message.text}`}>
                      <div className="assistant-avatar"><Sparkles size={15} /></div>
                      <div className="assistant-content"><div className="assistant-label">知屿 <span>· DeepSeek</span></div><p>{message.text.split("\n").map((line, i) => <span key={i}>{line || <br />}</span>)}</p>
                        {"sources" in message && message.sources && <div className="source-panel"><div className="source-heading"><span><BookOpen size={14} />参考资料</span><span>2 个来源</span></div><div className="source-list">{message.sources.map((source) => <button key={source} onClick={() => showNotice(`打开来源：${source}`)}><FileText size={14} />{source}<ArrowUp size={13} /></button>)}</div></div>}
                        <div className="answer-actions"><button onClick={() => showNotice("已复制回答")}><FileText size={14} />复制</button><span>回答由知识库内容生成</span><button aria-label="有帮助" onClick={() => showNotice("感谢反馈")}><Check size={14} /></button><button aria-label="无帮助" onClick={() => showNotice("感谢反馈")}><ArrowDown size={14} /></button></div>
                      </div>
                    </article>
                  ))}
                  {busy && <div className="thinking-row"><span className="thinking-dots"><i /><i /><i /></span>正在检索知识库…</div>}
                </div>
              )}
            </div>
            <div className="composer-area"><div className="composer"><textarea value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); sendMessage(); } }} placeholder="向知识库提问…" rows={2} /><div className="composer-footer"><span><ShieldCheck size={14} />回答基于当前知识库</span><div><kbd>Enter</kbd> 发送 <button className="send-button" onClick={sendMessage} disabled={!query.trim() || busy} aria-label="发送"><Send size={16} /></button></div></div></div><p className="composer-note">AI 生成内容仅供参考，请结合原文核对重要信息。</p></div>
          </section>
        ) : (
          <section className="admin-view">
            <div className="admin-heading"><div><div className="eyebrow">内容资产</div><h1>知识库管理</h1><p>整理和维护你的知识内容，让每一次回答都有据可查。</p></div><button className="primary-button" onClick={() => showNotice("新建知识库表单已准备接入")}><Plus size={17} />新建知识库</button></div>
            <div className="stat-row"><div className="stat-card"><span className="stat-icon blue"><BookOpen size={18} /></span><div><small>知识库总数</small><b>03</b></div><span className="stat-trend"><Activity size={13} /> 持续增长</span></div><div className="stat-card"><span className="stat-icon purple"><FileText size={18} /></span><div><small>已收录文档</small><b>53</b></div><span className="stat-sub">共 664 个内容片段</span></div><div className="stat-card"><span className="stat-icon green"><Check size={18} /></span><div><small>索引状态</small><b>正常</b></div><span className="stat-sub">Milvus 已连接</span></div></div>
            <div className="list-toolbar"><div><h2>全部知识库 <span>3</span></h2><p>上传文档后，系统会自动解析并建立索引。</p></div><div className="list-actions"><label className="search-box"><Search size={16} /><input placeholder="搜索知识库" /></label><button className="filter-button" onClick={() => showNotice("筛选选项")}><Activity size={15} />筛选</button></div></div>
            <div className="knowledge-table-wrap"><table className="knowledge-table"><thead><tr><th>知识库名称</th><th>文档 / 片段</th><th>最近更新</th><th>状态</th><th>操作</th></tr></thead><tbody>{knowledgeBases.map((kb) => <tr key={kb.name}><td><div className="knowledge-name"><span className={`knowledge-icon ${kb.color}`}><BookOpen size={18} /></span><span><b>{kb.name}</b><small>可用于智能问答</small></span></div></td><td><b>{kb.docs}</b><small> 篇文档 <span className="muted-dot">·</span> {kb.chunks} 个片段</small></td><td className="muted-cell">{kb.updated}</td><td><span className={`status-pill ${kb.status === "处理中" ? "processing" : "ready"}`}><i />{kb.status}</span></td><td><div className="row-actions"><button onClick={() => showNotice(`上传到「${kb.name}」`)}><Upload size={14} />上传文档</button><button className="more-action" onClick={() => showNotice("更多管理操作")} aria-label="更多操作"><MoreHorizontal size={17} /></button></div></td></tr>)}</tbody></table></div>
            <div className="upload-hint" onClick={() => uploadRef.current?.click()} role="button" tabIndex={0}><div className="upload-hint-icon"><Upload size={18} /></div><div><b>快速导入文档</b><p>支持 PDF、Word、Markdown、TXT，单个文件最大 50 MB</p></div><button>选择文件 <ArrowUp size={14} /></button><input ref={uploadRef} type="file" hidden multiple accept=".pdf,.doc,.docx,.md,.txt" onChange={(event) => { if (event.target.files?.length) showNotice(`已选择 ${event.target.files.length} 个文件，等待接入上传接口`); }} /></div>
          </section>
        )}
      </main>
      {notice && <div className="preview-toast"><Check size={16} />{notice}</div>}
    </div>
  );
}
