import React, { useEffect, useState, useRef, useMemo } from 'react';
import emailjs from '@emailjs/browser';

function getLangColor(lang) {
  const colors = { JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219', C: '#555555', 'C++': '#f34b7d', Shell: '#89e051', Dockerfile: '#384d54' };
  return colors[lang] || '#6b7280';
}

const KNOWLEDGE = {
  skill: "I work across the full stack: languages like Python, JavaScript/TypeScript, C++, Java, SQL, Bash; frameworks like React, FastAPI, Node.js, PyTorch, Pandas; infrastructure tools like Docker, Kubernetes, Red Hat OpenShift, Podman, GitHub Actions; databases including MongoDB, MySQL, Supabase, MinIO; and an AI/ML stack spanning LLMs (Llama 3, Gemini, Groq), FAISS, Sentence Transformers, Ollama, MuRIL, and GDELT/ACLED pipelines.",
  experience: "My experience includes a content writing internship and participation in the Study Australia Industry Experience Program, where I honed cross-functional collaboration skills.",
  project: "I've built projects like an AI Ethics Advisor with Llama 3, DeepFake Detection microservices, InsightX Analytics, a Dynamic Societal Friction Simulator for conflict forecasting, SkillRoute for talent routing, and Crest Automotive for a real client.",
  certifications: "I am a Red Hat Certified Specialist in Linux Diagnostics & Troubleshooting. I'm also certified in DSA in C, DBMS, and Operating Systems.",
  hire: "I'm actively looking for SDE Internships! You can reach me at harshitshyamsukha@gmail.com.",
  education: "I'm currently pursuing my B.Tech in Computer Science at SRM Institute of Science & Technology, Chennai (Batch of Aug 2023 - May 2027).",
  default: "I'm a B.Tech CSE student at SRM Chennai passionate about software development, systems programming, and Linux. Ask me about my skills, certifications, or how to reach me!"
};

const GitHubStats = ({ username }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => setData(null));
  }, [username]);
  if (!data) return null;
  return (
    <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
      {[
        { label: 'Public Repos', value: data.public_repos },
        { label: 'Followers', value: data.followers },
        { label: 'Following', value: data.following },
        { label: 'Gists', value: data.public_gists }
      ].map(s => (
        <div key={s.label} style={{ flex: '1 0 80px', background: 'var(--c-surface-3)', border: '1px solid var(--c-border)', borderRadius: 'var(--r-md)', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '18px', color: 'var(--c-text-1)' }}>{s.value}</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'var(--c-text-3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</span>
        </div>
      ))}
    </div>
  );
};

const GitHubActivityFeed = ({ username }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/events?per_page=20`)
      .then(r => r.json())
      .then(d => { setEvents(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => { setEvents([]); setLoading(false); });
  }, [username]);
  if (loading) return <div className="activity-feed"><div className="feed-loading">Loading activity...</div></div>;
  if (!events.length) return <div className="activity-feed"><div className="feed-empty">No recent activity</div></div>;
  const formatTime = (iso) => { const d = new Date(iso); const n = new Date(); const diff = Math.floor((n - d) / 60000); if (diff < 60) return `${diff}m ago`; if (diff < 1440) return `${Math.floor(diff / 60)}h ago`; return `${Math.floor(diff / 1440)}d ago`; };
  const eventIcon = (type) => { if (type === 'PushEvent') return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>; if (type === 'PullRequestEvent') return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>; if (type === 'IssuesEvent') return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>; if (type === 'WatchEvent' || type === 'StarEvent') return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>; if (type === 'ForkEvent') return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><line x1="6" y1="9" x2="6" y2="21"/></svg>; if (type === 'CreateEvent') return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14"/><path d="M5 12h14"/></svg>; return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>; };
  const eventText = (e) => {
    const repo = e.repo.name.replace('Harshitshyamsukha/', '');
    if (e.type === 'PushEvent') return `pushed ${e.payload.commits?.length || 0} commit(s) to <strong>${repo}</strong>`;
    if (e.type === 'PullRequestEvent') return `${e.payload.action} PR in <strong>${repo}</strong>`;
    if (e.type === 'IssuesEvent') return `${e.payload.action} issue in <strong>${repo}</strong>`;
    if (e.type === 'WatchEvent' || e.type === 'StarEvent') return `starred <strong>${repo}</strong>`;
    if (e.type === 'ForkEvent') return `forked <strong>${repo}</strong>`;
    if (e.type === 'CreateEvent') return `created ${e.payload.ref_type} in <strong>${repo}</strong>`;
    return `${e.type} in <strong>${repo}</strong>`;
  };
  return (
    <div className="activity-feed">
      {events.slice(0, 12).map((e, i) => (
        <a key={e.id || i} href={`https://github.com/${e.repo.name}`} target="_blank" rel="noopener noreferrer" className="feed-item">
          <span className="feed-icon">{eventIcon(e.type)}</span>
          <span className="feed-text" dangerouslySetInnerHTML={{ __html: eventText(e) }} />
          <span className="feed-time">{formatTime(e.created_at)}</span>
        </a>
      ))}
    </div>
  );
};

const GitHubChart = () => {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <svg viewBox="0 0 400 180" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
        <rect width="400" height="180" fill="var(--c-surface-3)" />
        <rect x="60" y="50" width="280" height="80" rx="6" fill="var(--c-surface-2)" stroke="var(--c-border)" strokeWidth="1" />
        <text x="200" y="75" fill="var(--c-text-3)" fontFamily="'JetBrains Mono', monospace" fontSize="10" textAnchor="middle">Contribution data unavailable</text>
          <text x="200" y="95" fill="var(--c-text-3)" fontFamily="Hanken Grotesk, sans-serif" fontSize="9" textAnchor="middle">Visit my GitHub for live activity</text>
          <text x="200" y="115" fill="var(--c-accent-dim)" fontFamily="Hanken Grotesk, sans-serif" fontSize="14" textAnchor="middle" fontWeight="600">↗</text>
      </svg>
    );
  }
  return (
    <img src="https://ghchart.rshah.org/ff0000/harshitshyamsukha" style={{ opacity: 0.85, display: 'block', position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" alt="GitHub contribution graph"
      onError={() => setFailed(true)} />
  );
};

const PROJECTS_DETAILED = [
  {
    id: 'dsfs', title: "Dynamic Societal Friction Simulator (DSFS)", date: "Ongoing",
    stack: ["GDELT", "ACLED", "MuRIL", "Python", "PyTorch"], badge: "Research",
    desc: "Conflict forecasting model that fuses GDELT event data with ACLED conflict records and MuRIL multilingual embeddings to predict societal friction.",
    problem: "Traditional conflict forecasting relies on sparse survey data and lags behind real-time events. Automated early-warning systems need to ingest global news and conflict reports continuously.",
    architecture: ["GDELT 2.0 event stream captures real-time global news coverage", "ACLED provides validated conflict event records for supervised training", "MuRIL multilingual embeddings enable cross-lingual signal extraction from Indian regional languages", "Transformer-based temporal fusion model forecasts friction scores at weekly horizons"],
    decisions: ["MuRIL over multilingual BERT for superior performance on 16 Indian languages", "Hawkes process baseline for rigorous comparison — not just naive baselines", "h=4 weeks forecasting horizon balances lead time against accuracy decay"],
    metrics: "LTROC 0.73 at h=4 weeks, 12.3% improvement over Hawkes baseline",
    github: "https://github.com/vivek797029/Dynamic-Societal-Friction-Simulator", demo: null, image: null, category: "ai", status: "wip",
    files: [{ name: "friction_model.py", path: "dsfs/models/friction_model.py", url: "https://github.com/vivek797029/Dynamic-Societal-Friction-Simulator", type: "py" },{ name: "README.md", path: "dsfs/README.md", url: "https://github.com/vivek797029/Dynamic-Societal-Friction-Simulator", type: "md" },{ name: "IEEE_Paper.pdf", path: "docs/DSFS_IEEE_Paper.pdf", url: "/papers/dsfs.pdf", type: "pdf" },{ name: "requirements.txt", path: "dsfs/requirements.txt", url: "https://github.com/vivek797029/Dynamic-Societal-Friction-Simulator", type: "txt" }]
  },
  {
    id: 'skillroute', title: "SkillRoute", date: "Ongoing",
    stack: ["FAISS", "Sentence Transformers", "React 19", "MapLibre GL JS", "FastAPI"], badge: null,
    desc: "Intelligent talent routing system that matches candidates to opportunities using vector similarity search and geospatial dispatch visualization.",
    problem: "Talent matching platforms use keyword filtering that misses nuanced skill adjacencies. Organizations need semantic understanding of candidate profiles plus geographic dispatch optimization.",
    architecture: ["Candidate profiles embedded via sentence-transformers into a FAISS vector index", "Synergy Score computed from cosine similarity + weighted experience factors", "MapLibre GL JS renders dispatch map showing candidate-to-opportunity routing", "FastAPI backend handles indexing, querying, and scoring orchestration"],
    decisions: ["FAISS enables sub-50ms similarity search across thousands of candidate profiles", "MapLibre GL JS avoids paid map SDKs while delivering full-featured geospatial viz", "Synergy Score combines semantic match, location proximity, and availability windows"],
    metrics: null, github: "https://github.com/Harshitshyamsukha/skillroute", demo: null, image: null, category: "ai", status: "wip",
    files: [{ name: "skill_router.py", path: "skillroute/core/skill_router.py", url: "https://github.com/Harshitshyamsukha/skillroute", type: "py" },{ name: "App.jsx", path: "skillroute/frontend/src/App.jsx", url: "https://github.com/Harshitshyamsukha/skillroute", type: "jsx" },{ name: "README.md", path: "skillroute/README.md", url: "https://github.com/Harshitshyamsukha/skillroute", type: "md" }]
  },
  {
    id: 'ai-ethics', title: "AI Ethics Advisor", date: "Jan 2026 – Ongoing",
    stack: ["Llama 3 (8B)", "FastAPI", "React", "JSON Streaming", "Ollama"], badge: null,
    desc: "Full-stack web application powered by a locally hosted Llama 3 8B model that analyzes real-world business dilemmas through an ethical lens.",
    problem: "Businesses need ethical guidance when making tough decisions, but sending sensitive internal data to third-party APIs like ChatGPT poses privacy and compliance risks.",
    architecture: ["React frontend with real-time JSON streaming for token-by-token responses", "FastAPI backend orchestrating prompt engineering and response validation", "Ollama runtime serving Llama 3 8B entirely on-premises", "No data ever leaves the local network — fully air-gapped inference"],
    decisions: ["Chose Ollama over cloud APIs to guarantee data privacy", "JSON streaming avoids UI blocking and enables partial result rendering", "Prompt chaining decomposes complex ethical dilemmas into sub-questions"],
    metrics: null, github: "https://github.com/Harshitshyamsukha/ai-ethics-advisor", demo: null, image: null, category: "ai", status: "live",
    files: [{ name: "main.py", path: "ai-ethics/backend/main.py", url: "https://github.com/Harshitshyamsukha/ai-ethics-advisor", type: "py" },{ name: "App.jsx", path: "ai-ethics/frontend/src/App.jsx", url: "https://github.com/Harshitshyamsukha/ai-ethics-advisor", type: "jsx" },{ name: "ollama_client.py", path: "ai-ethics/backend/ollama_client.py", url: "https://github.com/Harshitshyamsukha/ai-ethics-advisor", type: "py" }]
  },
  {
    id: 'deepfake', title: "DeepFake Detection", date: "Oct 2025",
    stack: ["FastAPI", "Docker Compose", "MinIO", "Python"], badge: null,
    desc: "Microservices-based MVP for evaluating image authenticity at scale, with structured persistence and containerized deployment.",
    problem: "Image authenticity verification is computationally expensive and needs a scalable, reproducible pipeline that can handle batches of uploads.",
    architecture: ["Upload service accepts images via REST API and queues them for processing", "Processing pipeline runs detection models in isolated containers", "MinIO (S3-compatible) stores raw uploads and results with metadata", "Docker Compose orchestrates all services for one-command deployment"],
    decisions: ["MinIO over cloud S3 for full local control and zero egress costs", "Docker Compose enables reproducible dev/test/prod environments", "Async task queue prevents upload endpoint from blocking on inference"],
    metrics: null, github: "https://github.com/Harshitshyamsukha/deepfake-detection", demo: null, image: null, category: "fullstack", status: "live",
    files: [{ name: "docker-compose.yml", path: "deepfake/docker-compose.yml", url: "https://github.com/Harshitshyamsukha/deepfake-detection", type: "yml" },{ name: "detector.py", path: "deepfake/services/detector.py", url: "https://github.com/Harshitshyamsukha/deepfake-detection", type: "py" },{ name: "README.md", path: "deepfake/README.md", url: "https://github.com/Harshitshyamsukha/deepfake-detection", type: "md" }]
  },
  {
    id: 'insightx', title: "InsightX Analytics", date: "Aug 2025",
    stack: ["Gemini 1.5", "React", "FastAPI", "NL-to-SQL"], badge: null,
    desc: "Enterprise-grade analytics engine that translates natural language questions into executing SQL queries against relational databases.",
    problem: "Non-technical stakeholders rely on data-driven decisions but lack SQL proficiency, creating a bottleneck around engineering teams for every ad-hoc query.",
    architecture: ["React frontend with a chat-like interface for asking data questions", "FastAPI backend pipes natural language through Gemini 1.5 API", "NL-to-SQL engine generates, validates, and executes SQL against the target database", "Results returned as formatted tables with optional chart renderings"],
    decisions: ["Gemini 1.5 chosen for its 1M-token context window — can ingest full schema definitions", "SQL validation step prevents hallucinated or destructive queries", "Stateless design keeps the backend simple and horizontally scalable"],
    metrics: null, github: "https://github.com/srijan-ghosh420/InsightX-proj", demo: null, image: null, category: "fullstack", status: "live",
    files: [{ name: "nl_to_sql.py", path: "insightx/backend/nl_to_sql.py", url: "https://github.com/srijan-ghosh420/InsightX-proj", type: "py" },{ name: "schema.sql", path: "insightx/db/schema.sql", url: "https://github.com/srijan-ghosh420/InsightX-proj", type: "sql" },{ name: "App.jsx", path: "insightx/frontend/src/App.jsx", url: "https://github.com/srijan-ghosh420/InsightX-proj", type: "jsx" }]
  },
  {
    id: 'cosmic-calendar', title: "Cosmic Calendar", date: "2025 (Hackathon)",
    stack: ["React", "Vite", "Tailwind CSS", "NASA APOD API", "HuggingFace Spaces"], badge: "Hackathon",
    desc: "Interactive space exploration web app built for AstralWeb Innovate Hackathon 2025 — NASA APOD daily imagery, space quiz, AI astronomy chatbot, bookmarks, and countdown timers.",
    problem: "Building a polished, demoworthy full-stack space app in a single hackathon weekend required ruthless feature prioritization.",
    architecture: ["React + Vite frontend consuming NASA APOD API for daily astronomy pictures", "HuggingFace Spaces Gradio chatbot (FLAN-T5 Large) for AI astronomy Q&A", "localStorage for bookmarking, theme persistence, and API caching", "Light/dark theme toggle with system preference detection"],
    decisions: ["FLAN-T5 Large over cloud LLMs for zero-cost inference on HuggingFace free tier", "localStorage API caching with TTL to stay under NASA's 1000 req/day limit", "Prioritized 4 core features over 8 planned ones to ship on time"],
    metrics: null, github: "https://github.com/Harshitshyamsukha/cosmic-calendar", demo: null, image: null, category: "fullstack", status: "live",
    files: []
  },
  {
    id: 'finance-tracker', title: "Finance Tracker", date: "2025",
    stack: ["React", "Chart.js", "Node.js", "Express", "PostgreSQL"], badge: null,
    desc: "Personal finance tracking app with expense categorization, income/expense tracking, and spending visualizations using Chart.js.",
    problem: "Manual budgeting spreadsheets are tedious — needed an automated way to categorize, track, and visualize spending patterns over time.",
    architecture: ["React frontend with Chart.js for spending visualizations and summaries", "Node.js/Express backend with RESTful CRUD APIs", "PostgreSQL database for transaction and category persistence", "Monthly spending summaries with category breakdowns"],
    decisions: ["Chart.js over heavier viz libraries for lightweight bundle size", "PostgreSQL for reliable relational data with category uniqueness constraints", "Vercel deployment for CI/CD simplicity"],
    metrics: null, github: "https://github.com/Harshitshyamsukha/finance-tracker", demo: null, image: null, category: "fullstack", status: "live",
    files: []
  },
  {
    id: 'saas-vm', title: "SaaS Vending Machine", date: "2025",
    stack: ["Terraform", "Kubernetes", "Ansible", "AWS", "Shell"], badge: null,
    desc: "Infrastructure-as-Code platform that provisions multi-tenant SaaS environments — Terraform, Kind/EKS, Ansible, 70+ tests, 3 tenant tiers.",
    problem: "Manually provisioning SaaS tenant environments is slow and error-prone. Needed a fully automated, reproducible IaC pipeline with isolated tenant resources.",
    architecture: ["Terraform provisions cloud infrastructure (VPC, S3, IAM, RDS, ElastiCache, K8s namespaces)", "Kind (local) or EKS (AWS) for Kubernetes tenant isolation", "Ansible playbooks for configuration management with OS detection", "4-format architecture visualization (ASCII/HTML/Markdown/Mermaid)", "70+ automated tests across provisioning, networking, and security"],
    decisions: ["Dual deployment mode (local Kind + AWS EKS) for dev/prod parity", "Windows batch menu for interactive multi-mode deployment", "AWS Secrets Manager over hardcoded secrets for security hardening", "3-tier tenant resource allocation (Basic/Standard/Premium)"],
    metrics: null, github: "https://github.com/Harshitshyamsukha/Saas-Vending-Machine", demo: null, image: null, category: "fullstack", status: "live",
    files: []
  },
  {
    id: 'crest', title: "Crest Automotive Solutions", date: "2025 – Ongoing",
    stack: ["React", "FastAPI", "Supabase", "TailwindCSS"], badge: null,
    desc: "Premium car detailing studio web platform with owner, customer, and worker portals.",
    problem: "A local premium auto detailing business needed a multi-portal web presence with booking, job tracking, and customer management — built from scratch.",
    architecture: ["React frontend with separate routing for owner / customer / worker roles", "FastAPI backend handling appointments, worker assignment, and job status", "Supabase for auth, database, and real-time job status updates", "Deployed on GitHub Pages (frontend) with a cloud backend"],
    decisions: ["Supabase chosen for real-time subscriptions without a custom WebSocket server", "Role-based routing via React context — single codebase, three portal views", "TailwindCSS for rapid consistent UI across all three portals"],
    metrics: null, github: "https://github.com/Harshitshyamsukha/crest-automotive", demo: "https://crestautomotive.in", image: null, category: "client", status: "live",
    files: [{ name: "App.jsx", path: "crest/frontend/src/App.jsx", url: "https://github.com/Harshitshyamsukha/crest-automotive", type: "jsx" },{ name: "api.py", path: "crest/backend/api.py", url: "https://github.com/Harshitshyamsukha/crest-automotive", type: "py" },{ name: "supabase_schema.sql", path: "crest/db/supabase_schema.sql", url: "https://github.com/Harshitshyamsukha/crest-automotive", type: "sql" }]
  }
];

const CERTIFICATIONS = [
  {
    id: 'redhat', title: "Certified Specialist in Linux Diagnostics and Troubleshooting", issuer: "Red Hat", date: "November 14, 2025", category: "certification",
    desc: "The EX342 exam is a hands-on, performance-based Linux diagnostic certification. I passed it by diagnosing live broken systems under time pressure — no multiple choice, just root cause analysis on real machines. It underpins all my containerization and DevOps work.",
    skills: ["Linux kernel diagnostics and log analysis", "Performance profiling with perf, strace, ltrace", "System crash analysis with kdump / crash utility", "Network troubleshooting: tcpdump, ss, ip", "Storage and filesystem fault isolation"],
    usedIn: ["deepfake", "skillroute"], files: []
  },
  {
    id: 'practera', title: "Study Australia Industry Experience Program", issuer: "Practera / Study Australia", date: "Jan – Feb 2024", category: "certification",
    desc: "A virtual industry program run jointly with Australian universities and industry partners. Built cross-timezone collaboration skills and delivered a group project under real client constraints.",
    skills: ["Cross-functional remote collaboration", "Stakeholder communication under ambiguity", "Agile sprint delivery with international teams"],
    usedIn: ["crest"], files: []
  },
  {
    id: 'dsa-c', title: "DSA in C", issuer: "Udemy", date: "2024", category: "certification",
    desc: "Completed alongside my first year at SRMIST to solidify fundamentals in data structures and algorithm analysis using C — the language that makes complexity impossible to ignore.",
    skills: ["Arrays, linked lists, trees, graphs in C", "Sorting and searching algorithm complexity", "Dynamic memory management (malloc / free)", "Recursive and iterative problem decomposition"],
    usedIn: ["skillroute", "dsfs"], files: []
  },
  {
    id: 'dbms', title: "DBMS", issuer: "Scaler Topics", date: "2024", category: "certification",
    desc: "Covers relational theory, normalization, transactions, and query optimization. Most useful when architecting Supabase schemas and writing performant SQL for InsightX.",
    skills: ["Relational schema design and normalization (1NF–3NF)", "SQL: joins, subqueries, window functions", "Transaction management: ACID, isolation levels", "Index design and query plan analysis"],
    usedIn: ["insightx", "crest"], files: []
  },
  {
    id: 'os', title: "Operating Systems", issuer: "Udemy", date: "2024", category: "certification",
    desc: "Real-time OS concepts including scheduling, memory management, and interrupt handling. Context for understanding container isolation, process management, and Kubernetes internals.",
    skills: ["Process scheduling algorithms (FCFS, SJF, Round Robin)", "Memory paging and segmentation", "Semaphores, mutexes, deadlock handling", "Real-time constraints and interrupt-driven I/O"],
    usedIn: ["deepfake", "ai-ethics"], files: []
  }
];

const ACADEMIC = [
  {
    id: 'btech-cse', title: "B.Tech Computer Science Engineering", institution: "SRMIST, Kattankulathur", date: "Aug 2023 – May 2027", category: "academic",
    desc: "Pursuing CSE Core in the Computing Technologies department.",
    highlights: ["Computing Technologies department — CSE Core branch", "Courses: Compiler Design, Software Engineering, Data Science, DevOps, Advanced Calculus", "Active in hackathon participation and peer research collaboration"],
    usedIn: [], files: [], visual: "degree"
  },
  {
    id: 'compiler-design', title: "Compiler Design", institution: "SRMIST · 18CSC304J", date: "Semester 4", category: "academic",
    desc: "Lexical analysis, parsing (LL/LR), shift-reduce parsing, LR(0) items, intermediate code generation. Lab experiments in C.",
    highlights: ["Implemented shift-reduce parser from scratch in C", "Built LR(0) item set construction and goto tables", "Intermediate code generation: three-address code", "Wrote complete lab experiment reports for all 8 experiments"],
    usedIn: ["dsfs", "insightx"], files: [{ name: "shift_reduce.c", path: "compiler-lab/exp3/shift_reduce.c", url: "https://github.com/Harshitshyamsukha/Harshitshyamsukha.github.io/blob/main/compiler-lab/exp3/shift_reduce.c", type: "c" },{ name: "lr0_items.c", path: "compiler-lab/exp5/lr0_items.c", url: "https://github.com/Harshitshyamsukha/Harshitshyamsukha.github.io/blob/main/compiler-lab/exp5/lr0_items.c", type: "c" },{ name: "lab_report.pdf", path: "docs/compiler_design_lab.pdf", url: "https://github.com/Harshitshyamsukha/Harshitshyamsukha.github.io/blob/main/docs/compiler_design_lab.pdf", type: "pdf" }], visual: "compiler"
  },
  {
    id: 'data-science', title: "Data Science", institution: "SRMIST · 21CSS303T", date: "Semester 4", category: "academic",
    desc: "Statistical foundations, data wrangling, EDA, regression, classification, and model evaluation in Python.",
    highlights: ["Applied Pandas and NumPy for data cleaning pipelines", "Built regression and classification models using scikit-learn", "Exploratory data analysis with matplotlib and seaborn", "Direct foundation for DSFS data pipeline design"],
    usedIn: ["dsfs", "insightx"], files: [{ name: "eda_notebook.ipynb", path: "data-science/eda_notebook.ipynb", url: "https://github.com/Harshitshyamsukha/Harshitshyamsukha.github.io/blob/main/data-science/eda_notebook.ipynb", type: "py" },{ name: "study_guide.html", path: "docs/data_science_notes.html", url: "https://github.com/Harshitshyamsukha/Harshitshyamsukha.github.io/blob/main/docs/data_science_notes.html", type: "md" }], visual: "data-science"
  },
  {
    id: 'devops', title: "DevOps", institution: "SRMIST", date: "Semester 5", category: "academic",
    desc: "CI/CD pipelines, containerization, Kubernetes orchestration, monitoring. Units 3–4 covered Helm, GitOps, and observability.",
    highlights: ["Configured GitHub Actions CI/CD pipelines for automated testing", "Kubernetes deployment manifests, services, and ingress rules", "Docker multi-stage builds for production image optimization", "Helm chart templating for reproducible deployments"],
    usedIn: ["deepfake", "skillroute"], files: [{ name: "ci_pipeline.yml", path: "devops-lab/github-actions/ci.yml", url: "https://github.com/Harshitshyamsukha/Harshitshyamsukha.github.io/blob/main/devops-lab/github-actions/ci.yml", type: "yml" },{ name: "k8s_deploy.yaml", path: "devops-lab/k8s/deployment.yaml", url: "https://github.com/Harshitshyamsukha/Harshitshyamsukha.github.io/blob/main/devops-lab/k8s/deployment.yaml", type: "yml" }], visual: "devops"
  },
  {
    id: 'software-engineering', title: "Software Engineering & Project Management", institution: "SRMIST · 21CSC303J", date: "Semester 4", category: "academic",
    desc: "SDLC models, requirements engineering, UML, agile sprints, risk management, and project estimation techniques.",
    highlights: ["Applied agile sprint planning across SkillRoute development", "UML class and sequence diagrams for InsightX architecture", "Risk matrix analysis for DSFS conflict data pipeline", "IEEE-format project documentation for all major projects"],
    usedIn: ["skillroute", "insightx", "dsfs"], files: [], visual: "se"
  },
  {
    id: 'research-papers', title: "Research & Academic Publications", institution: "SRMIST", date: "2024 – Ongoing", category: "academic",
    desc: "IEEE-format research papers and SRM project reports across AI/ML systems. Focus on reproducible experiments and formal evaluation.",
    highlights: ["DSFS: IEEE research paper with LTROC 0.73 benchmark", "SkillRoute: IEEE-format paper on semantic talent routing with FAISS", "LLM-IoT Bridge: B.Tech project report", "Kissan AI: multimodal crop disease detection academic report"],
    usedIn: [], files: [{ name: "DSFS_IEEE.pdf", path: "papers/dsfs_ieee.pdf", url: "/papers/dsfs.pdf", type: "pdf" },{ name: "SkillRoute_IEEE.pdf", path: "papers/skillroute_ieee.pdf", url: "https://github.com/Harshitshyamsukha/Harshitshyamsukha.github.io/blob/main/papers/skillroute_ieee.pdf", type: "pdf" },{ name: "LLM_IoT_Report.pdf", path: "papers/llm_iot_report.pdf", url: "https://github.com/Harshitshyamsukha/Harshitshyamsukha.github.io/blob/main/papers/llm_iot_report.pdf", type: "pdf" },{ name: "Kissan_AI.pdf", path: "papers/kissan_ai_report.pdf", url: "https://github.com/Harshitshyamsukha/Harshitshyamsukha.github.io/blob/main/papers/kissan_ai_report.pdf", type: "pdf" }], visual: "research"
  }
];

const GITHUB_ACTIVITY = {
  id: 'github-activity', title: "GitHub Activity", category: "activity",
  desc: "Live commit graph and recent repository activity pulled from the GitHub API.",
  date: "Updated live via GitHub API",
  stats: "github-stats"
};

function Typewriter({ text, speed = 50 }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let i = 0;
        const interval = setInterval(() => {
          i++;
          setDisplayed(text.slice(0, i));
          if (i >= text.length) {
            clearInterval(interval);
            setDone(true);
          }
        }, speed);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [text, speed]);

  return <span ref={ref}>{displayed}{!done && <span className="typewriter-cursor">|</span>}</span>;
}

const ALL_PINS = [...PROJECTS_DETAILED, ...CERTIFICATIONS, ...ACADEMIC, GITHUB_ACTIVITY];

const CORE_PROJECTS = [
  { id: 'dsfs', title: 'Dynamic Societal Friction Simulator', repo: 'Dynamic-Societal-Friction-Simulator', category: 'ai', githubUrl: 'https://github.com/vivek797029/Dynamic-Societal-Friction-Simulator' },
  { id: 'skillroute', title: 'SkillRoute', repo: 'Skill-Route', category: 'ai' },
  { id: 'ai-ethics', title: 'AI Ethics Advisor', repo: 'ai-ethics-advisor', category: 'ai' },
  { id: 'deepfake', title: 'DeepFake Detection', repo: 'deepfake_detection', category: 'fullstack' },
  { id: 'insightx', title: 'InsightX Analytics', repo: 'InsightX-proj', category: 'fullstack', githubUrl: 'https://github.com/srijan-ghosh420/InsightX-proj' },
  { id: 'carboutiqueato', title: 'CarBoutique (Crest Automotive)', repo: 'carboutiqueato', category: 'client' },
  { id: 'cosmic-calendar', title: 'Cosmic Calendar', repo: 'cosmic-calendar', category: 'fullstack' },
  { id: 'finance-tracker', title: 'Finance Tracker', repo: 'finance-tracker', category: 'fullstack' },
  { id: 'saas-vm', title: 'SaaS Vending Machine', repo: 'Saas-Vending-Machine', category: 'fullstack' }
];

const PROCESS_DATA = {
  dsfs: {
    thinking: "Research system that ingests GDELT 2.0 events + GKG + multilingual news articles for India and produces a trust-weighted multi-signal estimate of societal friction across Indian states (2015-2025). The core innovation is learning a per-source trust weight τ_s endogenously via cross-source factual-agreement contrastive learning on MuRIL — no misinformation labels needed. Produces a cleavage-decomposed friction field F(state, week, cleavage) using trust-weighted discourse + Goldstein-weighted event intensity, and forecasts short-horizon (1/2/4-week) protest & fatality counts validated against ACLED. Runs end-to-end on Google Colab (A100/L4 for Stage A, CPU for Stage B). The 9-module pipeline handles ingest, geolocation, event clustering, factual signal extraction, trust learning, cleavage/hostility analysis (LoRA), friction aggregation, escalation forecasting, and evaluation/viz.",
    errors: [
      "First run downloads ~4 GB of GDELT + 20k-article sample — took 30 min on standard Colab runtime. Had to add caching + incremental download logic.",
      "MuRIL model on A100 was memory-intensive for contrastive learning over all source pairs. Had to implement gradient checkpointing and reduce batch size from 32 to 16.",
      "ACLED validation alignment required careful temporal bucketing — GDELT publish-time vs ACLED event-time mismatch caused initial forecast metrics to look worse than reality. Built a 2-week tolerance window alignment.",
      "LoRA fine-tuning for cleavage + hostility module initially overfit to regional language patterns. Added dropout and data augmentation via back-translation."
    ],
    skillsLearned: ["GDELT 2.0 + GKG data ingestion and parsing", "Cross-source factual-agreement contrastive learning on MuRIL", "Per-source trust weight estimation without labeled data", "LoRA fine-tuning for multilingual hostility analysis", "Goldstein-scale event intensity weighting", "ACLED event-time vs GDELT publish-time temporal alignment", "9-module research pipeline orchestration on Colab"]
  },
  skillroute: {
    thinking: "Built a Proactive Capacity Engine that detects project bottlenecks and routes internal experts using AI. The core idea was a three-component Synergy Score: semantic skill fit (60%), availability (25%), and past success (15%) — weighted to prioritize relevant, available, and proven experts. I used FAISS with all-MiniLM-L6-v2 for embedding-based skill matching, and Gemini 2.5 Flash for natural-language bottleneck descriptions. The glassmorphism UI includes an ROI Calculator showing cost-of-delay, cost-to-hire, and break-even projections. The bottleneck detection rules check for overloaded team members, approaching deadlines, and skill gaps.",
    errors: [
      "FAISS index returned stale results — wasn't rebuilding after new candidates. Added incremental indexing queue.",
      "Synergy Score initially over-weighted geospatial proximity (0.5). Adjusted to 0.25 after testing showed it unfairly penalized remote experts.",
      "Bottleneck detection had false positives during planned PTO. Added a calendar-exclusion filter."
    ],
    skillsLearned: ["FAISS (all-MiniLM-L6-v2) embedding and incremental indexing", "Three-component weighted scoring system design", "Gemini 2.5 Flash API for NL description generation", "Glassmorphism UI with ROI calculator math"]
  },
  'ai-ethics': {
    thinking: "Multi-framework ethical analysis platform using local Ollama models (phi-3-mini) so user data never touches a third-party server. Analyzes dilemmas through Utilitarian (greatest good), Deontological (duty/rules), and Virtue Ethics (character) frameworks simultaneously. Built with React 19 + Vite + Tailwind CSS + Framer Motion + Recharts frontend, and Node.js/Express + SQLite + bcrypt + JWT backend. Features risk meters, radar charts for framework comparison, activity heatmaps, three UI themes (Dark/Light/Sepia), and follow-up conversation capability. The challenge was generating genuinely distinct ethical analyses per framework rather than the model defaulting to generic advice.",
    errors: [
      "Ollama phi-3-mini defaulted to generic responses. Had to design framework-specific prompts with ground-truth philosophical principles to produce distinct analyses.",
      "Recharts radar chart data normalization was off — one framework dominated the visualization. Fixed with min-max scaling per axis.",
      "JWT token expiry was set too short (15m) causing users to lose analysis history. Extended to 24h with refresh token rotation."
    ],
    skillsLearned: ["Local Ollama serving with phi-3-mini", "Multi-framework ethical reasoning prompt engineering", "Recharts radar charts and risk meter visualization", "Node.js/Express JWT auth with refresh rotation", "Three-theme system (Dark/Light/Sepia)"]
  },
  deepfake: {
    thinking: "Multimodal deepfake detection MVP skeleton with microservice architecture. Four services: ingestion_service (file upload + validation), text_detector (BM25 + NLI for textual artifacts), image_detector (face-crop + heuristic mask analysis), and fusion_service (weighted aggregator for final verdict). Uses FastAPI per service, MinIO for S3-compatible storage, and Docker Compose for orchestration. This is a proof-of-concept scaffold — the README explicitly notes that placeholder heuristics should be replaced with real models (HuggingFace Transformers for text, EfficientNet/Xception for images, ResNet/RawNet for audio, 3D CNNs for video).",
    errors: [
      "Docker Compose health checks raced — API started before MinIO was ready. Added depends_on with condition: service_healthy.",
      "Threading-based async queue didn't scale. Switched to proper worker process queue.",
      "MinIO bucket policies were too permissive initially. Locked to per-service accounts."
    ],
    skillsLearned: ["Microservice architecture (4 FastAPI services)", "MinIO S3-compatible storage in Docker", "Multi-modal detection pipeline design (text + image + fusion)", "Docker Compose multi-service orchestration"]
  },
  insightx: {
    thinking: "AI-powered Text-to-SQL engine built with Python + Streamlit. Users ask natural language questions about transaction data, and the app generates + executes the correct SQL query using Google Gemini API, then produces a structured 4-point factual insight report (Direct Response, Statistics, Context, Recommendations) based strictly on returned data to prevent hallucination. Displays the exact generated SQL for transparency. Automatically formats monetary values to Indian Rupees (₹). Supports dark/light mode via Streamlit theming. Uses SQLite database for storage. The key design decision was the 4-point structured report format — by constraining the AI to only reason from actual query results, I eliminated the hallucination problem common in NL-to-SQL tools.",
    errors: [
      "Gemini API occasionally generated INSERT/UPDATE/DELETE queries despite the safety prompt. Added a secondary validation layer that rejects any non-SELECT query before execution.",
      "Streamlit reruns the entire script on every interaction — caused the Gemini API to be called multiple times per query. Cached the NL-to-SQL response with st.cache_data and invalidated only on new questions.",
      "Indian Rupee formatting wasn't consistent across all UI components — some tables showed raw floats while AI insights showed formatted values. Standardized with a central format_currency() function.",
      "The initial prompt didn't instruct Gemini to handle date-range questions (e.g. 'last month'). Added few-shot examples covering common temporal patterns."
    ],
    skillsLearned: ["Streamlit app development and state management", "Google Gemini API for NL-to-SQL generation", "4-point structured insight report design", "SQL safety validation and execution guardrails", "Indian Rupee formatting across UI layers"]
  },
  carboutiqueato: {
    thinking: "Full-stack premium automotive services platform for a luxury car detailing studio in Gurgaon. Built with React 18 + TypeScript + Vite + Tailwind CSS v4 + R3F (3D PPF animation) + Framer Motion frontend, and FastAPI + SQLAlchemy async + asyncpg + PostgreSQL 15 backend. Three role-aware portals (Customer/Owner/Worker) from a single codebase. Features JWT + Google OAuth + phone OTP auth, Razorpay payments, Twilio WhatsApp notifications, Redis-backed token blacklist, Groq AI chatbot (llama-3.3-70b-versatile), multi-studio booking, inventory management, staff assignment lifecycle, and full OWASP API Security Top 10 hardening. The scope was massive — learned to prioritize ruthlessly.",
    errors: [
      "Razorpay webhook verification initially failed in staging — IP whitelist was missing the test server. Added conditional webhook verification per environment.",
      "PostgreSQL connection pooling under async SQLAlchemy leaked connections under load. Switched from create_async_engine to async with async_sessionmaker + connection pool limits.",
      "Twilio WhatsApp templates required Meta approval — each template took 48h. Learned to batch template submissions and maintain fallback SMS.",
      "Three portal routing via React context caused unnecessary re-renders. Memoized role context with useMemo + useCallback.",
      "PPF 3D animation (R3F) lagged on mid-range phones. Reduced polygon count and added lazy loading for the 3D scene."
    ],
    skillsLearned: ["FastAPI + SQLAlchemy async + asyncpg + PostgreSQL 15", "Razorpay payment gateway integration", "Twilio WhatsApp + SMS notification system", "Redis token blacklist and caching", "Groq AI chatbot integration (llama-3.3-70b)", "React Three Fiber 3D product visualization", "OWASP API Security Top 10 hardening", "Three-role portal architecture from single codebase"]
  },
  'cosmic-calendar': {
    thinking: "Interactive space exploration web app built for AstralWeb Innovate Hackathon 2025. React + Vite + Tailwind CSS frontend consuming NASA APOD API for daily astronomy pictures. Features a 20-question space quiz, AI astronomy chatbot powered by HuggingFace Spaces (FLAN-T5 Large via Gradio), bookmarking with localStorage, countdown timers, random cosmic facts, light/dark theme toggle, and social sharing. Deployed on Vercel. The hackathon time constraint taught me to prioritize features that demo well over perfection.",
    errors: [
      "NASA APOD API rate limit (1000 requests/day) hit during testing. Added client-side caching with localStorage TTL.",
      "Gradio chatbot endpoint had 5-second cold starts on HuggingFace free tier. Added a loading skeleton and optimistic responses for common questions.",
      "Theme toggle caused layout shift — forgot to persist preference. Fixed with localStorage + media query listener for system preference."
    ],
    skillsLearned: ["NASA APOD API consumption and caching", "HuggingFace Spaces Gradio chatbot integration", "Hackathon project scoping and demo prioritization", "localStorage-based bookmarking and preference persistence", "Vercel deployment"]
  },
  'finance-tracker': {
    thinking: "Personal finance tracking app with expense categorization, income/expense tracking, and spending visualizations. Stack: React frontend with Chart.js, Node.js/Express backend, PostgreSQL database. Features CRUD operations for transactions, category management, and monthly spending summaries. No README available — built from exploration of repo structure (database, backend, frontend directories). Deployed on Vercel.",
    errors: [
      "Chart.js re-rendered on every state change causing jank. Memoized chart data with useMemo.",
      "Category CRUD had no uniqueness constraint — duplicate categories created. Added unique constraint at DB + validation layer."
    ],
    skillsLearned: ["Chart.js integration for spending visualizations", "Express + PostgreSQL CRUD API design", "Vercel deployment for full-stack apps"]
  },
  'saas-vm': {
    thinking: "Infrastructure-as-Code platform for automated multi-tenant SaaS provisioning — NOT a vending machine management app. Uses Terraform + Kubernetes (Kind local or EKS AWS) + Ansible + shell scripts. Features: dual deployment modes (local Kind or AWS cloud), interactive Windows batch menu, isolated tenant resources (VPC, S3, IAM, RDS, ElastiCache, K8s namespaces), 4-format architecture visualization (ASCII/HTML/Markdown/Mermaid), 70+ automated tests, 3 tenant tiers (Basic/Standard/Premium), and security hardening (no hardcoded passwords, AWS Secrets Manager, pg_dump backups, auto-rollback). The name is misleading — it provisions SaaS environments, it's not itself a SaaS.",
    errors: [
      "Terraform state locking with DynamoDB failed on first apply in AWS — lacked DynamoDB create-table permissions. Added explicit IAM policy for state lock table management.",
      "Ansible playbooks assumed Ubuntu 22.04 but some AWS AMIs were 24.04 with different package names. Added OS detection and conditional package installs.",
      "Kind cluster on Windows had persistent volume mount issues — WSL2 path translation broke container volumes. Switched to hostPath mounts with WSL2-aware path rewriting.",
      "Batch menu `choice` command failed on non-English Windows locales. Replaced with set /p input parsing."
    ],
    skillsLearned: ["Terraform multi-environment infrastructure provisioning", "Kubernetes (Kind + EKS) tenant isolation with namespaces", "Ansible playbook design with OS detection", "70+ automated tests for infra-as-code", "Windows batch scripting for DevOps tooling", "3-tier SaaS resource allocation (Basic/Standard/Premium)"]
  }
};

const getPinCategory = (cat) => {
  if (cat === 'ai') return 'AI / Research';
  if (cat === 'fullstack') return 'Full-Stack';
  if (cat === 'client') return 'Client Work';
  if (cat === 'certification') return 'Certification';
  if (cat === 'academic') return 'Academic';
  if (cat === 'activity') return 'Activity';
  return cat;
};

const getBadgeStyle = (cat) => {
  if (cat === 'certification') return { bg: '#000000', text: '#ffff00' };
  if (cat === 'academic') return { bg: '#000000', text: '#ff00ff' };
  if (cat === 'activity') return { bg: '#000000', text: '#00ffff' };
  if (cat === 'ai' || cat === 'fullstack' || cat === 'client') return { bg: 'var(--c-accent-dim)', text: 'var(--c-accent-text)' };
  return { bg: 'var(--c-surface-3)', text: 'var(--c-text-3)' };
};

const getPinIcon = (pin) => {
  const cat = pin.category;
  if (cat === 'ai') return <svg className="gear-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.7086 1.53214C10.9786 1.05676 10.078 0.917375 9.27255 1.04467C8.46803 1.17183 7.62325 1.5904 7.12591 2.39445C6.9332 2.70601 6.81024 3.04646 6.7559 3.40767C5.97312 3.35525 5.18086 3.59264 4.58547 4.08919C3.98255 4.59201 3.59741 5.34432 3.59741 6.25684C3.59741 6.55614 3.63851 6.86315 3.72008 7.17654C3.42298 7.23942 3.13697 7.34918 2.86932 7.50027C1.98542 7.99927 1.36438 8.90663 1.11913 9.88841C0.869371 10.8882 0.989124 12.0467 1.70052 13.0391C2.0609 13.5419 2.54903 13.9691 3.1623 14.305C3.01053 14.5081 2.88229 14.7271 2.77811 14.9565C2.35249 15.8935 2.32044 17.0038 2.64559 17.98C2.97535 18.9701 3.69756 19.8871 4.83624 20.3254C5.57833 20.6111 6.42615 20.6665 7.35551 20.4749C7.39798 20.9494 7.52745 21.3806 7.74983 21.7577C8.22598 22.5651 9.0236 22.9458 9.80541 22.9947C10.5523 23.0414 11.3758 22.778 12 22.2458C12.6242 22.778 13.4477 23.0414 14.1946 22.9947C14.9764 22.9458 15.774 22.5651 16.2502 21.7577C16.4725 21.3806 16.602 20.9494 16.6445 20.4749C17.5738 20.6665 18.4217 20.6111 19.1638 20.3254C20.3024 19.8871 21.0246 18.9701 21.3544 17.98C21.6796 17.0038 21.6475 15.8935 21.2219 14.9565C21.1177 14.7271 20.9895 14.5081 20.8377 14.305C21.451 13.9691 21.9391 13.5419 22.2995 13.0391C23.0109 12.0467 23.1306 10.8882 22.8809 9.88841C22.6356 8.90663 22.0146 7.99927 21.1307 7.50027C20.863 7.34918 20.577 7.23942 20.2799 7.17654C20.3615 6.86315 20.4026 6.55614 20.4026 6.25684C20.4026 5.34432 20.0175 4.59201 19.4145 4.08919C18.8191 3.59264 18.0269 3.35525 17.2441 3.40767C17.1898 3.04646 17.0668 2.70601 16.8741 2.39445C16.3767 1.5904 15.532 1.17183 14.7274 1.04467C13.922 0.917375 13.0214 1.05676 12.2914 1.53214C11.9861 1.73097 12.0139 1.73097 11.7086 1.53214ZM13.0033 20.0518L13.0033 17.5288C13.0045 17.0494 13.1133 16.3457 13.3939 15.7998C13.6573 15.2872 13.9946 15.0268 14.5082 15.0268C15.0623 15.0268 15.5115 14.5773 15.5115 14.0227C15.5115 13.4682 15.0623 13.0186 14.5082 13.0186C13.9202 13.0186 13.4216 13.16 13.0033 13.3894V12.5084C13.0045 12.029 13.1133 11.3254 13.3939 10.7794C13.6573 10.2668 13.9946 10.0064 14.5082 10.0064C15.0623 10.0064 15.5115 9.55688 15.5115 9.00234C15.5115 8.4478 15.0623 7.99826 14.5082 7.99826C13.9202 7.99826 13.4216 8.13957 13.0033 8.36902L13.0033 3.97532C13.005 3.57853 13.1671 3.35779 13.3859 3.21528C13.6436 3.04746 14.0284 2.96723 14.4144 3.02824C14.8013 3.08939 15.0539 3.26704 15.1679 3.45142C15.2603 3.60078 15.3726 3.9329 15.091 4.59054C14.9015 5.03294 15.0524 5.54766 15.4507 5.8175C15.849 6.08734 16.3825 6.03639 16.7226 5.69604C17.0903 5.32811 17.7563 5.32032 18.1299 5.63189C18.2795 5.75662 18.396 5.94564 18.396 6.25684C18.396 6.59422 18.2548 7.14633 17.705 7.91672C17.4235 8.31116 17.4637 8.85055 17.8006 9.19878C18.1375 9.54701 18.6749 9.60465 19.0779 9.33577C19.5101 9.04741 19.8566 9.08664 20.1448 9.24934C20.4837 9.44063 20.8032 9.85112 20.9342 10.3755C21.0607 10.8818 20.9923 11.4176 20.669 11.8686C20.3466 12.3184 19.6765 12.8121 18.3565 13.0323C17.8683 13.1137 17.5124 13.5392 17.5182 14.0344C17.5239 14.5296 17.8896 14.9467 18.3795 15.0167C18.8812 15.0884 19.207 15.3732 19.3952 15.7874C19.5966 16.231 19.6273 16.8151 19.4508 17.345C19.2789 17.861 18.9351 18.2619 18.4434 18.4511C17.9498 18.6411 17.1399 18.6809 15.9267 18.129C15.5761 17.9695 15.1653 18.025 14.8694 18.2716C14.5735 18.5183 14.4448 18.9127 14.5382 19.2866C14.6621 19.7827 14.8668 20.9406 14.0694 20.9905C13.5184 21.0249 13.0062 20.6055 13.0033 20.0518ZM10.9967 3.97532C10.995 3.57853 10.8329 3.35779 10.6141 3.21528C10.3564 3.04746 9.97157 2.96723 9.58558 3.02824C9.19869 3.08939 8.94611 3.26704 8.83207 3.45142C8.73968 3.60078 8.62739 3.9329 8.90901 4.59054C9.09846 5.03294 8.94757 5.54766 8.54931 5.8175C8.15105 6.08734 7.61747 6.03639 7.27739 5.69604C6.90975 5.32811 6.24365 5.32032 5.87006 5.63189C5.72051 5.75662 5.604 5.94564 5.604 6.25684C5.604 6.59422 5.74515 7.14633 6.29501 7.91672C6.57653 8.31116 6.53629 8.85055 6.19937 9.19878C5.86246 9.54701 5.32505 9.60465 4.92206 9.33577C4.48987 9.04741 4.1434 9.08664 3.8552 9.24934C3.51634 9.44063 3.19679 9.85112 3.06581 10.3755C2.93933 10.8818 3.0077 11.4176 3.33095 11.8686C3.65342 12.3184 4.32349 12.8121 5.64353 13.0323C6.13166 13.1137 6.48757 13.5392 6.48182 14.0344C6.47607 14.5296 6.11037 14.9467 5.62048 15.0167C5.1188 15.0884 4.793 15.3732 4.60484 15.7874C4.40339 16.231 4.37273 16.8151 4.54922 17.345C4.7211 17.861 5.06489 18.2619 5.55656 18.4511C6.05021 18.6411 6.86015 18.6809 8.0733 18.129C8.42388 17.9695 8.83474 18.025 9.13063 18.2716C9.42652 18.5183 9.5552 18.9127 9.4618 19.2866C9.33788 19.7827 9.13324 20.9406 9.93058 20.9905C10.4816 21.0249 10.9938 20.6055 10.9967 20.0518L10.9967 20.0472V17.5292C10.9955 17.0498 10.8868 16.3459 10.6061 15.7998C10.3427 15.2872 10.0054 15.0268 9.49176 15.0268C8.93765 15.0268 8.48846 14.5773 8.48846 14.0227C8.48846 13.4682 8.93765 13.0186 9.49176 13.0186C10.0798 13.0186 10.5784 13.16 10.9967 13.3894V12.5088C10.9955 12.0294 10.8868 11.3255 10.6061 10.7794C10.3427 10.2668 10.0054 10.0064 9.49176 10.0064C8.93765 10.0064 8.48846 9.55688 8.48846 9.00234C8.48846 8.4478 8.93765 7.99826 9.49176 7.99826C10.0798 7.99826 10.5784 8.13957 10.9967 8.36902L10.9967 3.97532Z"/></svg>;
  if (cat === 'fullstack') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
  if (cat === 'client') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>;
  if (cat === 'certification') return <svg viewBox="0 0 431.17 431.17" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M68.831,99.602h255.814c7.878,0,14.265-6.387,14.265-14.265c0-7.878-6.387-14.265-14.265-14.265H68.831c-7.878,0-14.265,6.387-14.265,14.265C54.566,93.215,60.953,99.602,68.831,99.602z"/><path d="M68.831,160.465h255.814c7.878,0,14.265-6.387,14.265-14.265c0-7.878-6.387-14.265-14.265-14.265H68.831c-7.878,0-14.265,6.387-14.265,14.265C54.566,154.078,60.953,160.465,68.831,160.465z"/><path d="M204.549,192.799H68.831c-7.878,0-14.265,6.387-14.265,14.265c0,7.878,6.387,14.265,14.265,14.265h135.718c7.878,0,14.265-6.387,14.265-14.265C218.814,199.186,212.427,192.799,204.549,192.799z"/><path d="M430.373,409.679l-37.295-73.843l14.431-5.759c3.79-1.513,6.97-5.888,7.24-9.96l1.229-18.516c0.206-3.102,1.778-7.941,3.434-10.569l9.886-15.702c2.175-3.452,2.175-8.861,0.001-12.314l-9.887-15.702c-1.654-2.628-3.227-7.469-3.433-10.569l-1.228-18.516c-0.232-3.486-2.6-7.188-5.652-9.132V37.438c0-15.732-12.798-28.53-28.529-28.53H28.529C12.798,8.908,0,21.706,0,37.438v244.381c0,15.732,12.798,28.529,28.529,28.529h224.396l0.648,9.77c0.271,4.072,3.45,8.446,7.24,9.959l13.549,5.407l-37.474,74.195c-1.153,2.284-0.844,3.66-0.381,4.412c0.293,0.477,1.011,1.275,2.523,1.275c0.756,0,1.627-0.204,2.589-0.606l30.697-12.852c0.755-0.316,1.653-0.483,2.597-0.483c2.255,0,4.553,0.933,5.854,2.374l14.746,16.349c1.229,1.363,2.751,2.114,4.283,2.114c2.022,0,3.836-1.307,4.85-3.494l28.89-62.32c0.063-0.001,0.125-0.001,0.188-0.002l28.891,62.322c1.014,2.188,2.827,3.494,4.851,3.494c1.531,0,3.053-0.751,4.282-2.115l14.745-16.347c1.302-1.442,3.6-2.375,5.854-2.375c0.943,0,1.842,0.167,2.597,0.483l30.697,12.852c0.962,0.402,1.833,0.606,2.589,0.606c1.513,0,2.23-0.799,2.523-1.275C431.217,413.339,431.526,411.963,430.373,409.679z M28.529,37.438h352.039l0.002,156.56l-11.152-13.417c-2.036-2.449-5.764-4.094-9.275-4.094c-0.855,0-1.673,0.098-2.433,0.291l-17.998,4.581c-2.867,0.729-8.236,0.729-11.104,0l-17.996-4.581c-0.76-0.193-1.578-0.291-2.433-0.291c-3.512,0-7.239,1.645-9.275,4.094l-11.866,14.277c-1.984,2.389-6.099,5.379-8.983,6.53l-17.24,6.882c-3.791,1.513-6.971,5.887-7.241,9.959l-1.229,18.516c-0.205,3.102-1.777,7.941-3.433,10.569l-9.886,15.702c-2.175,3.452-2.175,8.862,0,12.314l4.085,6.488H28.529V37.438z M334.16,329.825c-33.497,0-60.652-27.154-60.652-60.652c0-33.498,27.155-60.652,60.652-60.652c33.498,0,60.654,27.154,60.654,60.652C394.815,302.671,367.658,329.825,334.16,329.825z"/></svg>;
  if (cat === 'academic') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
  if (cat === 'activity') return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/></svg>;
};

function BackgroundEffects() {
  const grainRef = useRef(null);
  const morphRef = useRef(null);

  useEffect(() => {
    const c = grainRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    c.width = 256; c.height = 256;
    const d = ctx.createImageData(256, 256);
    for (let i = 0; i < d.data.length; i += 4) {
      const v = Math.random() * 255;
      d.data[i] = v; d.data[i+1] = v; d.data[i+2] = v; d.data[i+3] = 18;
    }
    ctx.putImageData(d, 0, 0);
  }, []);

  useEffect(() => {
    const c = morphRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let id, t = 0;
    const shapes = [
      { x: 0.2, y: 0.3, r: 60, color: '#ff00ff', speed: 0.3 },
      { x: 0.8, y: 0.6, r: 80, color: '#00ffff', speed: 0.4 },
      { x: 0.5, y: 0.8, r: 50, color: '#ffff00', speed: 0.2 },
      { x: 0.7, y: 0.2, r: 45, color: '#00ff00', speed: 0.35 },
    ];
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, c.width, c.height);
      shapes.forEach((s, i) => {
        s.x += Math.sin(t * s.speed + i * 1.7) * 0.002;
        s.y += Math.cos(t * s.speed * 0.7 + i * 2.3) * 0.002;
        const r = s.r + Math.sin(t * s.speed * 1.5 + i * 3.1) * 12;
        const x = s.x * c.width, y = s.y * c.height;
        ctx.globalAlpha = 0.06;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    id = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);

  return <><canvas ref={grainRef} className="grain-canvas" /><canvas ref={morphRef} className="morph-canvas" /></>;
}

function KineticText({ text }) {
  return (
    <span className="kinetic-text">
      {text.split('').map((ch, i) => (
        <span key={i} className="kt-char" style={{ animationDelay: `${i * 0.07}s` }}>{ch === ' ' ? '\u00A0' : ch}</span>
      ))}
    </span>
  );
}

function WordReveal({ text }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); o.unobserve(el); } }, { threshold: 0.1 });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return (
    <span ref={ref} className="word-reveal-wrap">
      {text.split(' ').map((w, i) => (
        <span key={i} className={`wr-word ${vis ? 'vis' : ''}`} style={{ transitionDelay: `${i * 35}ms` }}>{w}</span>
      ))}
    </span>
  );
}

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Harshit's AI assistant. Ask me about his skills, certifications, or how to reach him!", isUser: false }
  ]);
  const chatEndRef = useRef(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('Just saying hi');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSending, setFormSending] = useState(false);
  const [contactTab, setContactTab] = useState('message');
  const [crName, setCrName] = useState('');
  const [crEmail, setCrEmail] = useState('');
  const [crRepo, setCrRepo] = useState('');
  const [crPRLink, setCrPRLink] = useState('');
  const [crLanguage, setCrLanguage] = useState('');
  const [crDescription, setCrDescription] = useState('');
  const [crConcerns, setCrConcerns] = useState('');
  const [crSubmitted, setCrSubmitted] = useState(false);
  const [crError, setCrError] = useState('');
  const [crSending, setCrSending] = useState(false);
  const [filterTab, setFilterTab] = useState('about');
  const [selectedProcessProject, setSelectedProcessProject] = useState(null);
  const [showAllStack, setShowAllStack] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState('idle');
  const [konamiTriggered, setKonamiTriggered] = useState(false);
  const [konamiPhase, setKonamiPhase] = useState('');
  const [show404, setShow404] = useState(false);
  const [konamiCount, setKonamiCount] = useState(null);
  const [voidBleed, setVoidBleed] = useState(false);
  const [voidSweep, setVoidSweep] = useState(false);
  const [staticPop, setStaticPop] = useState(false);
  const [bleedPos, setBleedPos] = useState({ x: 50, y: 50 });
  const [shuffleKey, setShuffleKey] = useState(0);
  const [voidThemeActive, setVoidThemeActive] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('voidThemeActive') === 'true';
    }
    return false;
  });
  const hoverTimerRef = useRef(null);
  const hoverOpenedRef = useRef(false);
  const tabBarRef = useRef(null);
  const prevTabRef = useRef('about');
  const transTimerRef = useRef(null);
  const keySeqRef = useRef([]);
  const voidThemeActiveRef = useRef(voidThemeActive);
  useEffect(() => { voidThemeActiveRef.current = voidThemeActive; }, [voidThemeActive]);
  const BUILD_TIME = "2026-06-12 15:30";

  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('https://page-views-api.ratneshc.com/api/v1/views?site=harshitshyamsukha.github.io&path=/konami').then(r => r.json()).then(d => { if (d.views) setKonamiCount(d.views); }).catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBleedPos({ x: Math.random() * 100, y: Math.random() * 100 });
      setVoidBleed(true);
      setTimeout(() => setVoidBleed(false), 300);
    }, 20000 + Math.random() * 20000);
    return () => clearTimeout(timer);
  }, [voidBleed]);

  useEffect(() => {
    const c = document.getElementById('corruption-canvas');
    if (!c) return;
    const ctx = c.getContext('2d');
    let particles = [], raf;
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);
    let mx = -100, my = -100;
    const move = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', move);
      const draw = () => {
        ctx.clearRect(0, 0, c.width, c.height);
        particles.push({ x: mx + (Math.random() - 0.5) * 10, y: my + (Math.random() - 0.5) * 10, life: 1, size: 2 + Math.random() * 3 });
        particles.forEach(p => {
          p.life -= 0.025;
          p.x += (Math.random() - 0.5) * 1.5;
          p.y += (Math.random() - 0.5) * 1.5;
        });
        particles = particles.filter(p => p.life > 0);
        particles.forEach(p => {
          const r = p.size * p.life;
          if (r > 0.1) { ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fillStyle = "rgba(80, 0, 160, " + p.life * 0.4 + ")"; ctx.fill(); }
        });
        if (particles.length > 0) raf = requestAnimationFrame(draw);
      };
    const startStop = () => { if (particles.length === 0) { raf = requestAnimationFrame(draw); } };
    const checkInterval = setInterval(startStop, 100);
    return () => { cancelAnimationFrame(raf); clearInterval(checkInterval); window.removeEventListener('mousemove', move); window.removeEventListener('resize', resize); };
  }, []);

  useEffect(() => {
    if (showProjectModal) { setStaticPop(true); setTimeout(() => setStaticPop(false), 400); }
  }, [showProjectModal]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  useEffect(() => {
    setShuffleKey(k => k + 1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    document.querySelectorAll('.pin-card').forEach((el) => observer.observe(el));
    document.querySelectorAll('.section-title, .contact-wrap').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filterTab]);

  useEffect(() => {
    if (filterTab === 'process' && !selectedProcessProject) {
      setSelectedProcessProject(CORE_PROJECTS[0]?.id);
    }
  }, [filterTab, selectedProcessProject]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && showProjectModal) closeProjectModal(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showProjectModal]);

  useEffect(() => {
    const handleKey = (e) => {
      const seq = keySeqRef.current;
      const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
      seq.push(e.key);
      if (seq.length > konami.length) seq.shift();
      if (seq.length === konami.length && seq.every((k, i) => k === konami[i])) {
        setKonamiTriggered(true);
        setKonamiPhase('tilt');
        fetch('https://page-views-api.ratneshc.com/api/v1/track?site=harshitshyamsukha.github.io&path=/konami').then(r => r.json()).then(d => { if (d.views) setKonamiCount(d.views); }).catch(() => {});
        if (voidThemeActiveRef.current) {
          setTimeout(() => setKonamiPhase('void-swallow'), 350);
          setTimeout(() => setKonamiPhase('void-revive'), 1200);
          setTimeout(() => window.location.reload(), 2800);
        } else {
          setTimeout(() => setKonamiPhase('tilt slide'), 350);
          setTimeout(() => setShow404(true), 900);
          setTimeout(() => window.location.reload(), 3200);
        }
        seq.length = 0;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim().toLowerCase();
    setMessages(prev => [...prev, { text: chatInput, isUser: true }]);
    setChatInput('');
    let reply = KNOWLEDGE.default;
    if (userMsg.match(/skill|know|tech|language|stack|java|c\+\+|linux|python|react|docker|kubernetes|fastapi|faiss|llm|llama|gemini/)) reply = KNOWLEDGE.skill;
    else if (userMsg.match(/experience|internship|work|study australia/)) reply = KNOWLEDGE.experience;
    else if (userMsg.match(/project|built|made/)) reply = KNOWLEDGE.project;
    else if (userMsg.match(/cert|red hat|dsa|dbms|os/)) reply = KNOWLEDGE.certifications;
    else if (userMsg.match(/hire|contact|available|reach|email|phone/)) reply = KNOWLEDGE.hire;
    else if (userMsg.match(/educat|study|college|srm|degree/)) reply = KNOWLEDGE.education;
    setTimeout(() => {
      setMessages(prev => [...prev, { text: reply, isUser: false }]);
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  };

  const openProjectModal = (pin, fromHover) => {
    if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null; }
    setSelectedProject(pin);
    setShowProjectModal(true);
    setShowAllStack(false);
    document.body.style.overflow = 'hidden';
    hoverOpenedRef.current = !!fromHover;
    if (window.plausible) window.plausible('Pin Click', { props: { title: pin.title } });
  };

  const handleCardMouseEnter = (pin) => {
    if (showProjectModal) return;
    hoverTimerRef.current = setTimeout(() => openProjectModal(pin, true), 1000);
  };

  const handleCardMouseMove = (pin, e, el) => {
    if (!hoverOpenedRef.current && hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = setTimeout(() => openProjectModal(pin, true), 1000);
    }
    handleCardTilt(e, el);
  };

  const handleCardMouseLeave = () => {
    if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null; }
  };

  const handleTabMagnet = (e) => {
    const bar = tabBarRef.current;
    if (!bar) return;
    const tabs = bar.querySelectorAll('.tab-btn');
    const mr = bar.getBoundingClientRect();
    tabs.forEach(t => {
      const tr = t.getBoundingClientRect();
      const dx = e.clientX - (tr.left + tr.width / 2);
      const dy = e.clientY - (tr.top + tr.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxD = 180;
      if (dist < maxD) {
        const f = (1 - dist / maxD) * 7;
        const a = Math.atan2(dy, dx);
        t.style.transform = `translate(${Math.cos(a) * f}px, ${Math.sin(a) * f}px)`;
      } else t.style.transform = '';
    });
  };
  const resetTabMagnet = () => {
    tabBarRef.current?.querySelectorAll('.tab-btn').forEach(t => t.style.transform = '');
  };

  const handleCardTilt = (e, el) => {
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    el.style.setProperty('--tilt-x', `${((y - r.height / 2) / (r.height / 2)) * -7}deg`);
    el.style.setProperty('--tilt-y', `${((x - r.width / 2) / (r.width / 2)) * 7}deg`);
  };
  const resetCardTilt = (el) => {
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  };

  const closeProjectModal = () => {
    if (hoverTimerRef.current) { clearTimeout(hoverTimerRef.current); hoverTimerRef.current = null; }
    setShowProjectModal(false);
    setSelectedProject(null);
    document.body.style.overflow = '';
    hoverOpenedRef.current = false;
  };

  const handleResumeDownload = () => { if (window.plausible) window.plausible('Download Resume'); };
  const handleGitHubClick = () => { if (window.plausible) window.plausible('GitHub Link Click'); };

  const activateVoidTheme = () => {
    setVoidThemeActive(true);
    localStorage.setItem('voidThemeActive', 'true');
  };
  const deactivateVoidTheme = () => {
    setVoidThemeActive(false);
    localStorage.setItem('voidThemeActive', 'false');
  };

  const handleTabChange = (key) => {
    if (transitionPhase !== 'idle') return;
    if (key === filterTab) {
      if (key === 'void') {
        deactivateVoidTheme();
        setFilterTab('about');
        setShuffleKey(k => k + 1);
        setTransitionPhase('exiting');
        transTimerRef.current = setTimeout(() => setTransitionPhase('idle'), 350);
      }
      return;
    }
    if (transTimerRef.current) clearTimeout(transTimerRef.current);
    prevTabRef.current = filterTab;
    setFilterTab(key);
    setShuffleKey(k => k + 1);
    if (key === 'void') {
      if (!voidThemeActive) activateVoidTheme();
      setVoidSweep(true);
      setTimeout(() => setVoidSweep(false), 800);
    }
    setTransitionPhase('exiting');
    transTimerRef.current = setTimeout(() => {
      setTransitionPhase('entering');
      transTimerRef.current = setTimeout(() => setTransitionPhase('idle'), 320);
    }, 200);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    const honeypot = e.target.querySelector('input[name="bot-field"]');
    if (honeypot && honeypot.value) return;
    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) { setFormError('Please fill in all required fields.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail)) { setFormError('Please enter a valid email address.'); return; }
    setFormSending(true);
    emailjs.send('service_lhev4mm', 'template_3nekq1l', { name: formName, email: formEmail, subject: formSubject, message: formMessage, time: new Date().toLocaleString() }, 'oimlw2aQxH_KKaX__')
      .then(() => { setFormSubmitted(true); setFormName(''); setFormEmail(''); setFormSubject('Just saying hi'); setFormMessage(''); if (window.plausible) window.plausible('Contact Form Submit'); })
      .catch(() => setFormError('Failed to send message. Please try again later.'))
      .finally(() => setFormSending(false));
  };

  const handleCodeReviewSubmit = (e) => {
    e.preventDefault();
    setCrError('');
    const honeypot = e.target.querySelector('input[name="bot-field"]');
    if (honeypot && honeypot.value) return;
    if (!crName.trim() || !crEmail.trim() || !crRepo.trim() || !crDescription.trim()) { setCrError('Please fill in all required fields.'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(crEmail)) { setCrError('Please enter a valid email address.'); return; }
    setCrSending(true);
    const reviewMessage = [
      `Code Review Request from ${crName} (${crEmail})`,
      `Repo: ${crRepo}`,
      `PR/Issue: ${crPRLink || 'N/A'}`,
      `Language: ${crLanguage || 'N/A'}`,
      `Description: ${crDescription}`,
      `Concerns: ${crConcerns || 'N/A'}`
    ].join('\n');
    emailjs.send('service_lhev4mm', 'template_3nekq1l', {
      name: crName,
      email: crEmail,
      subject: 'Code Review Request',
      message: reviewMessage,
      time: new Date().toLocaleString()
    }, 'oimlw2aQxH_KKaX__')
      .then(() => { setCrSubmitted(true); if (window.plausible) window.plausible('Code Review Request Submit'); })
      .catch(() => setCrError('Failed to send request. Please try again later.'))
      .finally(() => setCrSending(false));
  };

  const filteredPins = useMemo(() => ALL_PINS.filter(p => {
    if (filterTab === 'all') return true;
    if (filterTab === 'about' || filterTab === 'contact' || filterTab === 'process') return false;
    if (filterTab === 'projects') return ['ai', 'fullstack', 'client'].includes(p.category);
    if (filterTab === 'ai') return p.category === 'ai';
    if (filterTab === 'fullstack') return p.category === 'fullstack';
    if (filterTab === 'client') return p.category === 'client';
    if (filterTab === 'credentials') return ['certification', 'academic'].includes(p.category);
    if (filterTab === 'activity') return p.category === 'activity';
    if (filterTab === 'void') return true;
    return false;
  }), [filterTab]);

  const shuffledPins = useMemo(() => {
    const arr = [...(filteredPins || [])];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shuffleKey]);

  const projectNav = (dir) => {
    const idx = filteredPins.findIndex(p => p.id === selectedProject?.id);
    const next = (idx + dir + filteredPins.length) % filteredPins.length;
    openProjectModal(filteredPins[next]);
  };

  const openProjectById = (id) => {
    const p = ALL_PINS.find(x => x.id === id);
    if (p) openProjectModal(p);
  };

  const VisualBlock = ({ project, height }) => {
    const bg = '#0A0A0C';
    let content = null;

    if (project.id === 'dsfs') {
      content = (
        <svg viewBox="0 0 400 160" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <rect width="400" height="160" fill={bg} />
          <path d="M200,12 L260,18 L310,28 L350,38 L355,55 L320,68 L310,85 L270,100 L245,115 L200,128 L155,115 L135,105 L115,90 L100,75 L88,55 L100,38 L130,25 L165,15 Z" fill="none" stroke="#2E2E33" strokeWidth="1.5" />
          <path d="M200,12 L260,18 L310,28 L350,38 L355,55 L320,68 L310,85 L270,100 L245,115 L200,128 L155,115 L135,105 L115,90 L100,75 L88,55 L100,38 L130,25 L165,15 Z" fill="none" stroke="#ff0000" strokeWidth="1.5" opacity="0.4" />
          <circle cx="165" cy="30" r="4" fill="#ff0000"><animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" /></circle>
          <circle cx="100" cy="68" r="4" fill="#ff0000"><animate attributeName="r" values="3;6;3" dur="2s" begin="0.7s" repeatCount="indefinite" /></circle>
          <circle cx="245" cy="105" r="4" fill="#ff0000"><animate attributeName="r" values="3;6;3" dur="2s" begin="1.4s" repeatCount="indefinite" /></circle>
          <text x="278" y="140" fill="#FF6B75" fontFamily="JetBrains Mono" fontSize="11">LTROC 0.73</text>
        </svg>
      );
    } else if (project.id === 'skillroute') {
      const nodes = [{ cx: 80, cy: 80 }, { cx: 160, cy: 40 }, { cx: 200, cy: 100 }, { cx: 280, cy: 50 }, { cx: 300, cy: 110 }, { cx: 120, cy: 120 }, { cx: 340, cy: 80 }];
      const edges = [[0,1],[0,5],[1,2],[2,3],[3,4],[2,5],[3,6],[4,6],[5,2]];
      content = (
        <svg viewBox="0 0 400 160" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <rect width="400" height="160" fill={bg} />
          {edges.map(([a,b], i) => (<line key={i} x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy} stroke="#2E2E33" strokeWidth="1" />))}
          {nodes.slice(0,3).map((n, i) => (<circle key={i} cx={n.cx} cy={n.cy} r="4" fill="#ff0000"><animate attributeName="cx" values={`${n.cx};${n.cx+2};${n.cx}`} dur="3s" repeatCount="indefinite" /><animate attributeName="cy" values={`${n.cy};${n.cy-2};${n.cy}`} dur="3s" repeatCount="indefinite" /></circle>))}
          {nodes.slice(3).map((n, i) => (<circle key={i+3} cx={n.cx} cy={n.cy} r="3" fill="#45454C" />))}
          <text x="185" y="105" fill="#9A9AA8" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle">FAISS</text>
        </svg>
      );
    } else if (project.id === 'ai-ethics') {
      content = (
        <svg viewBox="0 0 400 140" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <rect width="400" height="140" fill={bg} />
          <rect x="30" y="30" width="160" height="28" rx="14" fill="#1E1E21" /><text x="46" y="49" fill="#9A9AA8" fontFamily="Hanken Grotesk, sans-serif" fontSize="9">Analyze this decision...</text>
          <rect x="210" y="72" width="160" height="28" rx="14" fill="#7A1A20" /><text x="226" y="91" fill="#FF6B75" fontFamily="Hanken Grotesk, sans-serif" fontSize="9">Risk: High ~ Privacy...</text>
        </svg>
      );
    } else if (project.id === 'deepfake') {
      content = (
        <svg viewBox="0 0 400 140" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <rect width="400" height="140" fill={bg} />
          {[0,1,2].map(row => [0,1,2].map(col => (<rect key={`${row}-${col}`} x={80 + col * 90} y={25 + row * 34} width="60" height="24" rx="2" fill="#161618" stroke="#2E2E33" strokeWidth="0.5" />)))}
          <line x1="80" y1="25" x2="380" y2="140" stroke="#ff0000" strokeWidth="4" opacity="0.1" /><line x1="80" y1="59" x2="380" y2="140" stroke="#ff0000" strokeWidth="4" opacity="0.1" /><line x1="80" y1="93" x2="380" y2="140" stroke="#ff0000" strokeWidth="4" opacity="0.1" />
          <text x="240" y="115" fill="#ff0000" fontFamily="Hanken Grotesk, sans-serif" fontSize="20" fontWeight="600">✖</text>
        </svg>
      );
    } else if (project.id === 'insightx') {
      content = (
        <svg viewBox="0 0 400 140" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <rect width="400" height="140" fill={bg} />
          <text x="30" y="30" fill="#9A9AA8" fontFamily="JetBrains Mono" fontSize="9">SELECT revenue FROM...</text>
          {[40,65,90,115,140].map((x, i) => (<rect key={i} x={x} y={70 + (4-i)*10} width="30" height={(i+1)*16} rx="2" fill="#ff0000" opacity="0.6" />))}
        </svg>
      );
    } else if (project.id === 'crest') {
      content = (
        <svg viewBox="0 0 400 140" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <rect width="400" height="140" fill="#0C0B09" />
          <path d="M80 100 Q100 50 180 45 Q260 40 320 50 Q360 55 380 100" fill="none" stroke="#45454C" strokeWidth="1.5" />
          <circle cx="90" cy="100" r="20" fill="url(#spot)" opacity="0.15" /><circle cx="360" cy="100" r="20" fill="url(#spot)" opacity="0.15" />
          <defs><radialGradient id="spot"><stop offset="0%" stopColor="#FFBD2E" stopOpacity="0.3" /><stop offset="100%" stopColor="#FFBD2E" stopOpacity="0" /></radialGradient></defs>
        </svg>
      );
    } else if (project.id === 'redhat') {
      content = (
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, background: bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 6px)' }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: '42px', color: '#EE0000', lineHeight: 1 }}>RH</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--c-text-3)', marginTop: '4px' }}>Certified</span>
        </div>
      );
    } else if (project.id === 'practera') {
      content = (
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, background: bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: '18px', color: 'var(--c-text-2)' }}>Practera</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--c-text-3)', marginTop: '4px' }}>Study Australia</span>
        </div>
      );
    } else if (project.id === 'dsa-c') {
      content = (
        <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <rect width="400" height="100" fill={bg} />
          <circle cx="200" cy="20" r="8" fill="#1E1E21" stroke="var(--c-border-hover)" strokeWidth="1" />
          <circle cx="130" cy="55" r="8" fill="var(--c-surface-3)" stroke="var(--c-border-hover)" strokeWidth="1" />
          <circle cx="270" cy="55" r="8" fill="var(--c-surface-3)" stroke="var(--c-border-hover)" strokeWidth="1" />
          <circle cx="80" cy="85" r="8" fill="var(--c-surface-3)" stroke="var(--c-border-hover)" strokeWidth="1" />
          <circle cx="180" cy="85" r="8" fill="var(--c-surface-3)" stroke="var(--c-border-hover)" strokeWidth="1" />
          <circle cx="220" cy="85" r="8" fill="var(--c-surface-3)" stroke="var(--c-border-hover)" strokeWidth="1" />
          <circle cx="320" cy="85" r="8" fill="var(--c-surface-3)" stroke="var(--c-border-hover)" strokeWidth="1" />
          <line x1="200" y1="28" x2="130" y2="47" stroke="var(--c-border-hover)" strokeWidth="1" />
          <line x1="200" y1="28" x2="270" y2="47" stroke="var(--c-border-hover)" strokeWidth="1" />
          <line x1="130" y1="63" x2="80" y2="77" stroke="var(--c-border-hover)" strokeWidth="1" />
          <line x1="130" y1="63" x2="180" y2="77" stroke="var(--c-border-hover)" strokeWidth="1" />
          <line x1="270" y1="63" x2="220" y2="77" stroke="var(--c-border-hover)" strokeWidth="1" />
          <line x1="270" y1="63" x2="320" y2="77" stroke="var(--c-border-hover)" strokeWidth="1" />
          <circle cx="200" cy="20" r="8" fill="#FFBD2E" />
        </svg>
      );
    } else if (project.id === 'dbms') {
      content = (
        <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <rect width="400" height="100" fill={bg} />
          <rect x="70" y="20" width="40" height="22" rx="2" fill="var(--c-surface-3)" stroke="var(--c-border)" strokeWidth="1" />
          <rect x="180" y="20" width="40" height="22" rx="2" fill="var(--c-surface-3)" stroke="#ff00ff" strokeWidth="1" />
          <rect x="290" y="20" width="40" height="22" rx="2" fill="var(--c-surface-3)" stroke="var(--c-border)" strokeWidth="1" />
          <line x1="110" y1="31" x2="180" y2="31" stroke="var(--c-border)" strokeWidth="1" />
          <line x1="220" y1="31" x2="290" y2="31" stroke="var(--c-border)" strokeWidth="1" />
          <text x="90" y="34" fill="var(--c-text-3)" fontFamily="JetBrains Mono" fontSize="6" textAnchor="middle">users</text>
          <text x="200" y="34" fill="var(--c-text-3)" fontFamily="JetBrains Mono" fontSize="6" textAnchor="middle">orders</text>
          <text x="310" y="34" fill="var(--c-text-3)" fontFamily="JetBrains Mono" fontSize="6" textAnchor="middle">items</text>
        </svg>
      );
    } else if (project.id === 'os') {
      content = (
        <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <rect width="400" height="100" fill={bg} />
          <circle cx="80" cy="50" r="22" fill="none" stroke="var(--c-border-hover)" strokeWidth="1.5" />
          <circle cx="200" cy="50" r="22" fill="none" stroke="var(--c-green)" strokeWidth="1.5" />
          <circle cx="320" cy="50" r="22" fill="none" stroke="var(--c-border-hover)" strokeWidth="1.5" />
          <text x="80" y="54" fill="var(--c-text-3)" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle">Ready</text>
          <text x="200" y="54" fill="var(--c-text-3)" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle">Run</text>
          <text x="320" y="54" fill="var(--c-text-3)" fontFamily="JetBrains Mono" fontSize="8" textAnchor="middle">Wait</text>
          <line x1="102" y1="50" x2="178" y2="50" stroke="var(--c-border-hover)" strokeWidth="1" markerEnd="url(#arrow)" />
          <line x1="222" y1="50" x2="298" y2="50" stroke="var(--c-border-hover)" strokeWidth="1" markerEnd="url(#arrow)" />
          <line x1="320" y1="72" x2="80" y2="72" stroke="var(--c-border-hover)" strokeWidth="1" strokeDasharray="4 2" markerEnd="url(#arrow)" />
          <defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0,0 L10,5 L0,10 Z" fill="var(--c-border-hover)" /></marker></defs>
        </svg>
      );
    } else if (project.id === 'btech-cse' || project.visual === 'degree') {
      content = (
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, background: bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: '20px', color: '#ff00ff' }}>SRMIST</span>
          <hr style={{ width: '60%', border: 'none', borderTop: '1px solid var(--c-border)', margin: '6px 0' }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--c-text-3)' }}>Comp. Tech. · CSE</span>
        </div>
      );
    } else if (project.id === 'compiler-design') {
      content = (
        <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <rect width="400" height="100" fill={bg} />
          <rect x="40" y="42" width="60" height="16" rx="2" fill="var(--c-surface-3)" stroke="var(--c-border)" strokeWidth="1" />
          <text x="55" y="54" fill="var(--c-text-3)" fontFamily="JetBrains Mono" fontSize="7">TOKEN</text>
          <text x="108" y="52" fill="#ff00ff" fontFamily="JetBrains Mono" fontSize="10">→</text>
          <rect x="170" y="42" width="60" height="16" rx="2" fill="var(--c-surface-3)" stroke="var(--c-border)" strokeWidth="1" />
          <text x="178" y="54" fill="var(--c-text-3)" fontFamily="JetBrains Mono" fontSize="7">PARSER</text>
          <text x="238" y="52" fill="#ff00ff" fontFamily="JetBrains Mono" fontSize="10">→</text>
          <rect x="300" y="42" width="60" height="16" rx="2" fill="var(--c-surface-3)" stroke="var(--c-border)" strokeWidth="1" />
          <text x="318" y="54" fill="var(--c-text-3)" fontFamily="JetBrains Mono" fontSize="7">AST</text>
        </svg>
      );
    } else if (project.id === 'data-science') {
      const dots = [[30,30],[90,20],[60,55],[150,35],[200,15],[120,65],[250,45],[310,25],[280,60],[350,35],[180,80],[330,70]];
      content = (
        <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <rect width="400" height="100" fill={bg} />
          {[0,25,50,75,100].map(y => (<line key={y} x1="0" y1={y} x2="400" y2={y} stroke="var(--c-border)" strokeWidth="0.5" opacity="0.25" />))}
          {[0,100,200,300,400].map(x => (<line key={x} x1={x} y1="0" x2={x} y2="100" stroke="var(--c-border)" strokeWidth="0.5" opacity="0.25" />))}
          {dots.map((d,i) => (<circle key={i} cx={d[0]} cy={d[1]} r="4" fill={i % 3 === 0 ? '#ff0000' : '#ff00ff'} opacity="0.7" />))}
        </svg>
      );
    } else if (project.id === 'devops') {
      content = (
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, background: bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
          <div style={{ width: '60%', height: '14px', background: 'var(--c-surface-3)', border: '1px solid #34D399', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '8px', color: 'var(--c-text-3)' }}>app</span>
          </div>
          <div style={{ width: '50%', height: '10px', background: 'var(--c-surface-3)', border: '1px solid var(--c-border)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', color: 'var(--c-text-3)' }}>runtime</span>
          </div>
          <div style={{ width: '40%', height: '10px', background: 'var(--c-surface-3)', border: '1px solid var(--c-border)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '7px', color: 'var(--c-text-3)' }}>kernel</span>
          </div>
        </div>
      );
    } else if (project.id === 'software-engineering') {
      content = (
        <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <rect width="400" height="100" fill={bg} />
          <rect x="135" y="22" width="130" height="56" rx="2" fill="var(--c-surface-3)" stroke="#ff00ff" strokeWidth="1" />
          <text x="165" y="40" fill="var(--c-text-2)" fontFamily="Sora, sans-serif" fontSize="8" fontWeight="600">ProjectManager</text>
          <line x1="135" y1="45" x2="265" y2="45" stroke="var(--c-border)" strokeWidth="1" />
          <text x="142" y="58" fill="var(--c-text-3)" fontFamily="JetBrains Mono" fontSize="7">+ sprints: Sprint[]</text>
          <text x="142" y="70" fill="var(--c-text-3)" fontFamily="JetBrains Mono" fontSize="7">+ team: Developer[]</text>
        </svg>
      );
    } else if (project.id === 'research-papers') {
      content = (
        <svg viewBox="0 0 400 100" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
          <rect width="400" height="100" fill={bg} />
          <path d="M180 35 L180 65 L200 55 L220 65 L220 35 Z" fill="none" stroke="#ff00ff" strokeWidth="1.5" />
          <path d="M175 30 L175 60 L195 50 L215 60 L215 30 Z" fill="none" stroke="#ff00ff" strokeWidth="1.5" opacity="0.5" />
          <text x="200" y="80" fill="#ff00ff" fontFamily="Sora, sans-serif" fontSize="12" fontWeight="600" textAnchor="middle">IEEE</text>
        </svg>
      );
    } else if (project.id === 'github-activity') {
      content = <GitHubChart />;
    }

    const defaultH = project.id === 'dsfs' || project.id === 'skillroute' ? '160px' : project.category === 'activity' ? '180px' : '100px';
    const h = height || defaultH;
    return <div className="card-visual" style={{ height: h, position: 'relative', background: bg, overflow: 'hidden' }}>{content}</div>;
  };

  return (
    <>
    <div className={`layout ${konamiTriggered ? 'konami-' + konamiPhase : ''} ${voidThemeActive ? 'void-theme' : ''}`}>
      <BackgroundEffects />
      <main className="main">
        <div className="tab-bar" ref={tabBarRef} onMouseMove={handleTabMagnet} onMouseLeave={resetTabMagnet}>
          {[
            { key: 'about', label: 'About' },
            { key: 'all', label: 'All' },
            { key: 'ai', label: 'AI / Research' },
            { key: 'fullstack', label: 'Full-Stack' },
            { key: 'client', label: 'Client Work' },
            { key: 'credentials', label: 'Credentials' },
            { key: 'activity', label: 'Activity' },
            { key: 'process', label: 'Process' },
            { key: 'contact', label: 'Contact' },
            { key: 'void', label: '◆ Void' }
          ].map(tab => (
            <button key={tab.key} className={`tab-btn ${filterTab === tab.key ? 'active' : ''}`} onClick={() => handleTabChange(tab.key)}>
              {tab.label}
            </button>
          ))}
          <span className="konami-counter">{konamiCount !== null ? `🕹 ${konamiCount}` : ''}</span>
        </div>

        <div className="tab-content-wrap" key={filterTab}>
        {filterTab === 'about' && (
          <section className="about-hero">
            <div className="about-avatar" title="↑↑↓↓←→←→">HS</div>
            <div className="about-hero-right">
              <div className="about-name">Harshit Shyamsukha</div>
              <div className="about-role"><KineticText text="B.Tech CSE (Core) @ SRMIST, Chennai · Aug 2023 -- May 2027" /></div>
              <div className="about-tags">Red Hat Certified Specialist | AI/ML Engineer | Full-Stack Developer</div>
              <div className="about-social">
              <a href="https://github.com/Harshitshyamsukha" target="_blank" rel="noopener noreferrer" onClick={handleGitHubClick} aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/harshit-shyamsukha-512254258/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
            </div>
            <div className="about-cards paper-stack">
              <div className="about-card" onClick={() => setFilterTab('credentials')}>
                <div className="about-card-hdr">
                  <div className="about-card-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></div>
                  <span className="about-card-title">Education</span>
                </div>
                <div className="about-card-body">
                  <div className="about-card-row"><strong style={{ color: 'var(--c-text-1)' }}>B.Tech CSE (Core)</strong> — Computing Technologies</div>
                  <div className="about-card-row">SRM Institute of Science & Technology, Chennai</div>
                  <div className="about-card-row" style={{ fontFamily: "var(--font-mono)", fontSize: '11px', color: 'var(--c-text-3)' }}>Aug 2023 -- May 2027</div>
                  <div className="about-card-row" style={{ color: 'var(--c-text-3)', fontSize: '12px' }}>Key courses: Compiler Design, Software Engineering, Data Science, DevOps, Advanced Calculus</div>
                </div>
              </div>
              <div className="about-card" onClick={() => setFilterTab('credentials')}>
                <div className="about-card-hdr">
                  <div className="about-card-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 2a10 10 0 1 0 10 10h-10V2z"/></svg></div>
                  <span className="about-card-title">Certifications</span>
                </div>
                <div className="about-card-body">
                  <div className="about-card-row">Red Hat Certified Specialist — Linux Diagnostics & Troubleshooting (EX342)</div>
                  <div className="about-card-row">Practera — Study Australia Industry Experience Program</div>
                  <div className="about-card-tags" style={{ marginTop: '4px' }}>
                    <span className="about-card-tag">DSA in C</span>
                    <span className="about-card-tag">DBMS</span>
                    <span className="about-card-tag">Operating Systems</span>
                  </div>
                </div>
              </div>
              <div className="about-card" onClick={() => setFilterTab('all')}>
                <div className="about-card-hdr">
                  <div className="about-card-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
                  <span className="about-card-title">Languages</span>
                </div>
                <div className="about-card-body">
                  <div className="about-card-tags">
                    <span className="about-card-tag">Python</span>
                    <span className="about-card-tag">JavaScript</span>
                    <span className="about-card-tag">TypeScript</span>
                    <span className="about-card-tag">C++</span>
                    <span className="about-card-tag">Java</span>
                    <span className="about-card-tag">SQL</span>
                    <span className="about-card-tag">Bash</span>
                    <span className="about-card-tag">C</span>
                  </div>
                </div>
              </div>
              <div className="about-card" onClick={() => setFilterTab('all')}>
                <div className="about-card-hdr">
                  <div className="about-card-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
                  <span className="about-card-title">Frameworks & Tools</span>
                </div>
                <div className="about-card-body">
                  <div className="about-card-tags">
                    <span className="about-card-tag">React</span>
                    <span className="about-card-tag">FastAPI</span>
                    <span className="about-card-tag">Node.js</span>
                    <span className="about-card-tag">PyTorch</span>
                    <span className="about-card-tag">FAISS</span>
                    <span className="about-card-tag">Docker</span>
                    <span className="about-card-tag">Kubernetes</span>
                    <span className="about-card-tag">Red Hat OpenShift</span>
                    <span className="about-card-tag">Podman</span>
                    <span className="about-card-tag">GitHub Actions</span>
                    <span className="about-card-tag">MongoDB</span>
                    <span className="about-card-tag">Supabase</span>
                    <span className="about-card-tag">MinIO</span>
                  </div>
                </div>
              </div>
              <div className="about-card" onClick={() => setFilterTab('ai')}>
                <div className="about-card-hdr">
                  <div className="about-card-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></div>
                  <span className="about-card-title">AI / ML Stack</span>
                </div>
                <div className="about-card-body">
                  <div className="about-card-tags">
                    <span className="about-card-tag">Llama 3</span>
                    <span className="about-card-tag">Gemini</span>
                    <span className="about-card-tag">Groq</span>
                    <span className="about-card-tag">Sentence Transformers</span>
                    <span className="about-card-tag">Ollama</span>
                    <span className="about-card-tag">MuRIL</span>
                    <span className="about-card-tag">GDELT</span>
                    <span className="about-card-tag">ACLED</span>
                    <span className="about-card-tag">Pandas</span>
                    <span className="about-card-tag">NumPy</span>
                    <span className="about-card-tag">scikit-learn</span>
                  </div>
                </div>
              </div>
              <div className="about-card" onClick={() => setFilterTab('all')}>
                <div className="about-card-hdr">
                  <div className="about-card-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
                  <span className="about-card-title">Projects</span>
                </div>
                <div className="about-card-body">
                  <div className="about-card-row"><strong style={{ color: 'var(--c-text-1)' }}>DSFS</strong> — Conflict forecasting model (LTROC 0.73)</div>
                  <div className="about-card-row"><strong style={{ color: 'var(--c-text-1)' }}>SkillRoute</strong> — Semantic talent routing with FAISS</div>
                  <div className="about-card-row"><strong style={{ color: 'var(--c-text-1)' }}>AI Ethics Advisor</strong> — Llama 3 powered ethical analysis</div>
                  <div className="about-card-row"><strong style={{ color: 'var(--c-text-1)' }}>DeepFake Detection</strong> — Microservices-based detection</div>
                  <div className="about-card-row"><strong style={{ color: 'var(--c-text-1)' }}>InsightX Analytics</strong> — NL-to-SQL analytics engine</div>
                  <div className="about-card-row"><strong style={{ color: 'var(--c-text-1)' }}>Crest Automotive</strong> — Client portal with 3 role views</div>
                </div>
              </div>
              <div className="about-card" onClick={() => setFilterTab('ai')}>
                <div className="about-card-hdr">
                  <div className="about-card-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
                  <span className="about-card-title">Research</span>
                </div>
                <div className="about-card-body">
                  <div className="about-card-row">DSFS — IEEE-format paper on conflict forecasting with LTROC 0.73 benchmark</div>
                  <div className="about-card-row">SkillRoute — IEEE-format paper on semantic talent routing using FAISS vector search</div>
                  <div className="about-card-row">LLM-IoT Bridge — B.Tech project report on LLM-integrated IoT systems</div>
                  <div className="about-card-row">Kissan AI — Multimodal crop disease detection academic report</div>
                </div>
              </div>
              <div className="about-card" onClick={() => setFilterTab('activity')}>
                <div className="about-card-hdr">
                  <div className="about-card-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></div>
                  <span className="about-card-title">Open Source</span>
                </div>
                <div className="about-card-body">
                  <div className="about-card-row">Active on GitHub with public repositories spanning AI/ML, full-stack apps, and academic projects</div>
                  <div className="about-card-row" style={{ fontFamily: "var(--font-mono)", fontSize: '11px', color: 'var(--c-blue-link)' }}>
                    <a href="https://github.com/Harshitshyamsukha" target="_blank" rel="noopener noreferrer">github.com/Harshitshyamsukha ↗</a>
                  </div>
                </div>
              </div>
              <div className="about-card" onClick={() => setFilterTab('all')}>
                <div className="about-card-hdr">
                  <div className="about-card-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg></div>
                  <span className="about-card-title">Interests</span>
                </div>
                <div className="about-card-body">
                  <div className="about-card-tags">
                    <span className="about-card-tag">AI / ML</span>
                    <span className="about-card-tag">Systems Programming</span>
                    <span className="about-card-tag">Linux</span>
                    <span className="about-card-tag">DevOps</span>
                    <span className="about-card-tag">Conflict Forecasting</span>
                    <span className="about-card-tag">NLP</span>
                    <span className="about-card-tag">Containerization</span>
                    <span className="about-card-tag">Open Source</span>
                  </div>
                  <div className="about-card-row" style={{ marginTop: 'var(--sp-2)', fontSize: '12px', color: 'var(--c-text-3)' }}>Chennai, India — Open to SDE internships</div>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className={`masonry${filterTab === 'void' ? ' void-mode' : ''}`}>
          {shuffledPins.map((pin) => {
            const badge = getBadgeStyle(pin.category);
            return (
                <div key={pin.id} className="pin-card reveal" style={{ '--card-index': 0 }}
                  onClick={() => openProjectModal(pin)}
                  onMouseEnter={(e) => { handleCardMouseEnter(pin); }}
                  onMouseMove={(e) => handleCardMouseMove(pin, e, e.currentTarget)}
                  onMouseLeave={(e) => { resetCardTilt(e.currentTarget); handleCardMouseLeave(); }}>
                  <div className="shadow-double"></div>
                  <div className="pin-icon">{getPinIcon(pin)}</div>
                <h3 className="pin-title">{pin.title}</h3>
                <p className="pin-desc">{pin.desc}</p>
                <div className="pin-meta">
                  <span className="pin-category" style={{ background: badge.bg, color: badge.text }}>{getPinCategory(pin.category)}</span>
                  {pin.status && <span className={`pin-status ${pin.status}`} title={pin.status === 'live' ? 'Live / Complete' : 'In Progress'}></span>}
                </div>
              </div>
            );
          })}
        </div>

        {filterTab === 'process' && (
          <section className="process-section">
            <h2 className="section-title reveal">Thinking Process</h2>
            <div className="process-nav">
              {CORE_PROJECTS.map(p => {
                const data = PROCESS_DATA[p.id];
                return (
                  <button
                    key={p.id}
                    className={`process-nav-btn ${selectedProcessProject === p.id ? 'active' : ''}`}
                    onClick={() => setSelectedProcessProject(p.id)}
                  >
                    {p.title}
                  </button>
                );
              })}
            </div>
            {selectedProcessProject && PROCESS_DATA[selectedProcessProject] ? (
              <div className="process-content">
                <h3 className="process-title">{CORE_PROJECTS.find(p => p.id === selectedProcessProject)?.title}</h3>
                <a href={CORE_PROJECTS.find(p => p.id === selectedProcessProject)?.githubUrl || `https://github.com/Harshitshyamsukha/${CORE_PROJECTS.find(p => p.id === selectedProcessProject)?.repo}`} target="_blank" rel="noopener noreferrer" className="process-repo-link">View on GitHub →</a>
                <div className="process-block">
                  <h4 className="process-block-title">Thinking Process</h4>
                  <p className="process-text"><WordReveal text={PROCESS_DATA[selectedProcessProject].thinking} /></p>
                </div>
                <div className="process-block">
                  <h4 className="process-block-title">Errors Encountered</h4>
                  <ul className="process-list">
                    {PROCESS_DATA[selectedProcessProject].errors.map((e, i) => (
                      <li key={i} className="process-list-item">{e}</li>
                    ))}
                  </ul>
                </div>
                <div className="process-block">
                  <h4 className="process-block-title">Skills Learned</h4>
                  <div className="process-tags">
                    {PROCESS_DATA[selectedProcessProject].skillsLearned.map((s, i) => (
                      <span key={i} className="process-tag">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : selectedProcessProject ? (
              <div className="process-content">
                <p className="process-text" style={{ textAlign: 'center', color: 'var(--c-text-3)' }}>Process documentation coming soon for this project.</p>
              </div>
            ) : (
              <div className="process-content">
                <p className="process-text" style={{ textAlign: 'center', color: 'var(--c-text-3)' }}>Select a project above to see the thinking process, errors encountered, and skills learned.</p>
              </div>
            )}
          </section>
        )}

        {filterTab === 'contact' && (
          <section id="contact" className="contact-section">
            <h2 className="section-title reveal"><Typewriter text="Let's build something." /></h2>
            <div className="contact-tabs">
              <button className={`contact-tab ${contactTab === 'message' ? 'active' : ''}`} onClick={() => setContactTab('message')}>Contact Me</button>
              <button className={`contact-tab ${contactTab === 'codereview' ? 'active' : ''}`} onClick={() => setContactTab('codereview')}>Code Review Request</button>
            </div>
            <div className="contact-wrap reveal">
              {contactTab === 'message' ? (
                formSubmitted ? (
                  <div className="form-success">
                    <p>Message sent successfully!</p>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                    <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => setFormSubmitted(false)}>Send another message</button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleContactSubmit}>
                    <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                      <input type="text" name="bot-field" tabIndex="-1" autoComplete="off" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="form-name">Name *</label>
                      <input id="form-name" type="text" placeholder="Your name" value={formName} onChange={e => setFormName(e.target.value)} required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="form-email">Email *</label>
                      <input id="form-email" type="email" placeholder="your@email.com" value={formEmail} onChange={e => setFormEmail(e.target.value)} required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="form-subject">Subject</label>
                      <select id="form-subject" value={formSubject} onChange={e => setFormSubject(e.target.value)}>
                        <option value="Internship Opportunity">Internship Opportunity</option>
                        <option value="Collaboration">Collaboration</option>
                        <option value="Just saying hi">Just saying hi</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label htmlFor="form-message">Message *</label>
                      <textarea id="form-message" rows="5" placeholder="Your message..." value={formMessage} onChange={e => setFormMessage(e.target.value)} required />
                    </div>
                    {formError && <p className="form-error">{formError}</p>}
                    <button type="submit" className="btn-primary" disabled={formSending}>{formSending ? 'Sending...' : 'Send Message'}</button>
                  </form>
                )
              ) : (
                crSubmitted ? (
                  <div className="form-success">
                    <p>Review request submitted!</p>
                    <p>I'll review the code and get back to you at {crEmail}.</p>
                    <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => { setCrSubmitted(false); setCrName(''); setCrEmail(''); setCrRepo(''); setCrPRLink(''); setCrLanguage(''); setCrDescription(''); setCrConcerns(''); }}>Submit another</button>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleCodeReviewSubmit}>
                    <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                      <input type="text" name="bot-field" tabIndex="-1" autoComplete="off" />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cr-name">Name *</label>
                      <input id="cr-name" type="text" placeholder="Your name" value={crName} onChange={e => setCrName(e.target.value)} required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cr-email">Email *</label>
                      <input id="cr-email" type="email" placeholder="your@email.com" value={crEmail} onChange={e => setCrEmail(e.target.value)} required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cr-repo">GitHub Repo URL *</label>
                      <input id="cr-repo" type="url" placeholder="https://github.com/user/repo" value={crRepo} onChange={e => setCrRepo(e.target.value)} required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cr-pr">PR / Issue Link</label>
                      <input id="cr-pr" type="url" placeholder="https://github.com/user/repo/pull/1" value={crPRLink} onChange={e => setCrPRLink(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cr-lang">Language / Framework</label>
                      <input id="cr-lang" type="text" placeholder="e.g. Python, React, Go" value={crLanguage} onChange={e => setCrLanguage(e.target.value)} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cr-desc">What needs reviewing? *</label>
                      <textarea id="cr-desc" rows="4" placeholder="Describe what the code does and what you'd like me to focus on..." value={crDescription} onChange={e => setCrDescription(e.target.value)} required />
                    </div>
                    <div className="form-field">
                      <label htmlFor="cr-concerns">Specific Concerns</label>
                      <textarea id="cr-concerns" rows="3" placeholder="Performance, security, architecture, code style..." value={crConcerns} onChange={e => setCrConcerns(e.target.value)} />
                    </div>
                    {crError && <p className="form-error">{crError}</p>}
                    <button type="submit" className="btn-primary" disabled={crSending}>{crSending ? 'Sending...' : 'Submit for Review'}</button>
                  </form>
                )
              )}
            </div>
            <div className="contact-social">
              <a href="https://github.com/Harshitshyamsukha" target="_blank" rel="noopener noreferrer" onClick={handleGitHubClick}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/harshit-shyamsukha-512254258/" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
          </section>
        )}

        </div>

        <footer className="footer">
          <p>Designed & Built by <span style={{ color: 'var(--c-accent)' }}>Harshit Shyamsukha</span></p>
          <p className="build-time">built: {BUILD_TIME} <span className="konami-hint">· ↑↑↓↓←→←→</span></p>
        </footer>
      </main>

      {!chatOpen && (
        <div className="chat-toggle-wrap">
          <button className="chat-toggle" onClick={() => setChatOpen(true)} title="Ask AI Assistant">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path></svg>
          </button>
        </div>
      )}

      <div id="chat-bubble" className={chatOpen ? 'open' : ''}>
        <div className="chat-hdr">
          <span>Ask my AI Assistant</span>
          <button onClick={() => setChatOpen(false)} style={{ background: 'transparent', border: 'none', color: '#000000', cursor: 'pointer' }}>✖</button>
        </div>
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.isUser ? 'user' : ''}`}>
              <div className={`msg-av ${m.isUser ? 'mv-user' : 'mv-bot'}`} style={{ overflow: 'hidden', padding: 0 }}>
                {m.isUser ? ('U') : (
                  <img src="/ai-avatar.svg" alt="AI Avatar" width="28" height="28" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.textContent = 'AI'; e.target.parentElement.style.display = 'flex'; e.target.parentElement.style.alignItems = 'center'; e.target.parentElement.style.justifyContent = 'center'; e.target.parentElement.style.fontSize = '0.7rem'; e.target.parentElement.style.fontWeight = 'bold'; e.target.parentElement.style.color = '#fff'; }} />
                )}
              </div>
              <div className={`msg-bubble ${m.isUser ? 'mb-user' : 'mb-bot'}`}>{m.text}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        {messages.length === 1 && (
          <div style={{ display: 'flex', gap: '6px', padding: '0 var(--sp-3) var(--sp-2)', flexWrap: 'wrap' }}>
            {['skills', 'projects', 'how to hire?'].map(q => (
              <button key={q} onClick={() => setChatInput(q)}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', padding: '4px 10px', borderRadius: '0px', border: '2px solid #000000', background: 'transparent', color: 'var(--c-text-3)', cursor: 'pointer', transition: 'all 150ms ease' }}
                onMouseOver={e => e.target.style.background = 'var(--c-secondary-dim)'}
                onMouseOut={e => e.target.style.background = 'transparent'}
              >{q}</button>
            ))}
          </div>
        )}
        <form className="chat-inp-row" onSubmit={handleChatSubmit}>
          <input type="text" placeholder="Ask about my skills or certifications..." value={chatInput} onChange={e => setChatInput(e.target.value)} />
          <button type="submit">➤</button>
        </form>
      </div>

      {showTopBtn && <button className="back-to-top" onClick={scrollToTop} title="Back to Top">↑</button>}

      {showProjectModal && selectedProject && (
        <div className="modal-overlay" onClick={closeProjectModal}>
          <button className="modal-nav-btn prev" onClick={(e) => { e.stopPropagation(); projectNav(-1); }}>‹</button>
          <div className="modal-shell" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeProjectModal}>✖</button>

            {selectedProject.category === 'certification' ? (
              <>
                <div className="modal-left">
                  <div className="modal-top-row">
                    <span className="pin-category" style={{ background: '#000000', color: '#ffff00' }}>Certification</span>
                  </div>
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <span className="modal-date" style={{ marginTop: '4px' }}>{selectedProject.issuer}</span>
                  <span className="modal-date" style={{ marginTop: '2px' }}>{selectedProject.date}</span>
                  <div className="modal-divider"></div>
                  <p className="modal-caption">{selectedProject.desc}</p>
                  <div className="modal-links-row">
                    {selectedProject.usedIn?.map(id => {
                      const p = ALL_PINS.find(x => x.id === id);
                      return p ? (
                        <button key={id} className="modal-link-btn" onClick={() => openProjectById(id)}>
                          {p.title}
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
                <div className="modal-right">
                  <div className="comment-block">
                    <div className="comment-header">
                      <div className="comment-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                      </div>
                      <span className="comment-label">Skills Covered</span>
                    </div>
                    <div className="comment-divider"></div>
                    <div className="comment-list">
                      {selectedProject.skills?.map((s, i) => (
                        <div key={i} className="comment-item" style={{ gap: 'var(--sp-2)' }}>
                          <span className="comment-bullet">→</span>
                          <span className="comment-text">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="comment-block">
                    <div className="comment-header">
                      <div className="comment-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></svg>
                      </div>
                      <span className="comment-label">Used In</span>
                    </div>
                    <div className="comment-divider"></div>
                    <div className="pin-stack" style={{ gap: 'var(--sp-1)' }}>
                      {selectedProject.usedIn?.map(id => {
                        const p = ALL_PINS.find(x => x.id === id);
                        return p ? (
                          <button key={id} onClick={() => openProjectById(id)}
                            style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', padding: '4px 10px', borderRadius: 'var(--r-sm)', background: 'var(--c-secondary-dim)', border: '1px solid var(--c-secondary)', color: 'var(--c-text-2)', cursor: 'pointer', transition: 'all 150ms ease' }}
                            onMouseOver={e => { e.target.style.borderColor = 'var(--c-secondary)'; e.target.style.color = 'var(--c-secondary-text)'; }}
                            onMouseOut={e => { e.target.style.borderColor = 'var(--c-secondary)'; e.target.style.color = 'var(--c-text-2)'; }}
                          >{p.title}</button>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </>
            ) : selectedProject.category === 'academic' ? (
              <>
                <div className="modal-left">
                  <div className="modal-top-row">
                    <span className="pin-category" style={{ background: '#000000', color: '#ff00ff' }}>Academic</span>
                  </div>
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <span className="modal-date" style={{ marginTop: '4px' }}>{selectedProject.institution}</span>
                  <span className="modal-date" style={{ marginTop: '2px' }}>{selectedProject.date}</span>
                  <div className="modal-divider"></div>
                  <p className="modal-caption">{selectedProject.desc}</p>
                  <div className="modal-problem" style={{ borderLeftColor: '#ff00ff' }}>
                    <span className="modal-problem-label">Key Takeaways</span>
                    {selectedProject.highlights?.map((h, i) => (
                      <div key={i} className="comment-item" style={{ gap: 'var(--sp-2)', padding: '3px 0', borderBottom: 'none' }}>
                        <span className="comment-bullet" style={{ color: '#ff00ff' }}>→</span>
                        <span className="comment-text">{h}</span>
                      </div>
                    ))}
                  </div>
                  <div className="modal-links-row">
                    {selectedProject.usedIn?.map(id => {
                      const p = ALL_PINS.find(x => x.id === id);
                      return p ? (
                        <button key={id} className="modal-link-btn" onClick={() => openProjectById(id)}>
                          {p.title}
                        </button>
                      ) : null;
                    })}
                  </div>
                </div>
                <div className="modal-right">
                  <div className="comment-block">
                    <div className="comment-header">
                      <div className="comment-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                      </div>
                      <span className="comment-label">Applied In Projects</span>
                    </div>
                    <div className="comment-divider"></div>
                    <div className="pin-stack" style={{ gap: 'var(--sp-1)' }}>
                      {selectedProject.usedIn?.map(id => {
                        const p = ALL_PINS.find(x => x.id === id);
                        return p ? (
                          <button key={id} onClick={() => openProjectById(id)}
                            style={{ fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '11px', padding: '4px 10px', borderRadius: 'var(--r-sm)', background: 'var(--c-secondary-dim)', border: '1px solid var(--c-secondary)', color: 'var(--c-text-2)', cursor: 'pointer', transition: 'all 150ms ease' }}
                            onMouseOver={e => { e.target.style.borderColor = 'var(--c-secondary)'; e.target.style.color = 'var(--c-secondary-text)'; }}
                            onMouseOut={e => { e.target.style.borderColor = 'var(--c-secondary)'; e.target.style.color = 'var(--c-text-2)'; }}
                          >{p.title}</button>
                        ) : null;
                      })}
                      {(!selectedProject.usedIn || selectedProject.usedIn.length === 0) && (
                        <span className="comment-text">Foundation knowledge — broadly applicable</span>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : selectedProject.category === 'activity' ? (
              <>
                <div className="modal-left">
                  <div className="modal-top-row">
                    <span className="pin-category" style={{ background: '#000000', color: '#00ffff' }}>Activity</span>
                  </div>
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <span className="modal-date">{selectedProject.date}</span>
                  <div className="modal-divider"></div>
                  <VisualBlock project={selectedProject} height="160px" />
                  <p className="modal-caption">All active development happens on GitHub. Repositories span AI/ML research prototypes, production full-stack applications, and academic lab experiments.</p>
                  <GitHubStats username="Harshitshyamsukha" />
                </div>
                <div className="modal-right">
                  <div className="comment-block">
                    <div className="comment-header">
                      <div className="comment-icon">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                      </div>
                      <span className="comment-label">Live Activity Feed</span>
                    </div>
                    <div className="comment-divider"></div>
                    <GitHubActivityFeed username="Harshitshyamsukha" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="modal-left">
                  <div className="modal-top-row">
                    <span className="pin-category" style={{ background: 'var(--c-accent-dim)', color: 'var(--c-accent-text)' }}>{getPinCategory(selectedProject.category)}</span>
                    {selectedProject.status && <span className={`pin-status ${selectedProject.status}`} title={selectedProject.status === 'live' ? 'Live / Complete' : 'In Progress'}></span>}
                  </div>
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <span className="modal-date">{selectedProject.date}</span>
                  {selectedProject.stack && (
                    <div className="pin-stack" style={{ marginTop: 'var(--sp-3)' }}>
                      {selectedProject.stack.map((s, i) => (<span key={i} className="pin-tag">{s}</span>))}
                    </div>
                  )}
                  <div className="modal-divider"></div>
                  <p className="modal-caption">{selectedProject.desc}</p>
                  <div className="modal-problem">
                    <span className="modal-problem-label">The Problem</span>
                    <p>{selectedProject.problem}</p>
                  </div>
                  {selectedProject.metrics && (
                    <div className="modal-metrics">
                      <span className="modal-metrics-label">Outcome</span>
                      <span className="modal-metrics-value">{selectedProject.metrics}</span>
                    </div>
                  )}
                  <div className="modal-links-row">
                    {selectedProject.github && <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="modal-link-btn" onClick={handleGitHubClick}>View on GitHub ↗</a>}
                    {selectedProject.demo && <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="modal-link-btn">Live Demo ↗</a>}
                  </div>
                </div>
                <div className="modal-right">
                  {selectedProject.architecture && (
                    <div className="comment-block">
                      <div className="comment-header">
                        <div className="comment-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M9 21V9" /></svg>
                        </div>
                        <span className="comment-label">Architecture</span>
                      </div>
                      <div className="comment-divider"></div>
                      <div className="comment-list">
                        {selectedProject.architecture.map((point, i) => (
                          <div key={i} className="comment-item">
                            <span className="comment-num">{String(i + 1).padStart(2, '0')}</span>
                            <span className="comment-text">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedProject.decisions && (
                    <div className="comment-block">
                      <div className="comment-header">
                        <div className="comment-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4" /><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /></svg>
                        </div>
                        <span className="comment-label">Key Decisions</span>
                      </div>
                      <div className="comment-divider"></div>
                      <div className="comment-list">
                        {selectedProject.decisions.map((d, i) => (
                          <div key={i} className="comment-item" style={{ gap: 'var(--sp-2)' }}>
                            <span className="comment-bullet">→</span>
                            <span className="comment-text">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedProject.files && selectedProject.files.length > 0 && (
                    <div className="comment-block">
                      <div className="comment-header">
                        <div className="comment-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                        </div>
                        <span className="comment-label">Related Files</span>
                      </div>
                      <div className="comment-divider"></div>
                      {selectedProject.files.map((f, i) => (
                        <a key={i} href={f.url} target="_blank" rel="noopener noreferrer" className="file-link" onClick={handleGitHubClick}>
                          <span className="file-icon">{f.type === 'py' ? '🐍' : f.type === 'md' ? 'M' : f.type === 'pdf' ? '📄' : f.type === 'jsx' ? '⚛' : f.type === 'yml' ? '⚙' : f.type === 'sql' ? '🗄' : f.type === 'txt' ? 'T' : f.type === 'c' ? '⚡' : '📁'}</span>
                          <div className="file-info"><span className="file-name">{f.name}</span><span className="file-path">{f.path}</span></div>
                          <span className="file-ext">↗</span>
                        </a>
                      ))}
                    </div>
                  )}
                  {selectedProject.stack && (
                    <div className="comment-block">
                      <div className="comment-header">
                        <div className="comment-icon">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                        </div>
                        <span className="comment-label">Stack</span>
                      </div>
                      <div className="comment-divider"></div>
                      <div className="pin-stack" style={{ gap: 'var(--sp-1)' }}>
                        {selectedProject.stack.slice(0, showAllStack ? selectedProject.stack.length : 2).map((s, i) => (<span key={i} className="pin-tag">{s}</span>))}
                        {!showAllStack && selectedProject.stack.length > 2 && (
                          <button onClick={() => setShowAllStack(true)}
                            style={{ background: 'none', border: 'none', color: 'var(--c-text-3)', fontFamily: 'var(--font-body)', fontSize: '11px', cursor: 'pointer', padding: 0 }}
                            onMouseOver={e => e.target.style.color = 'var(--c-text-2)'}
                            onMouseOut={e => e.target.style.color = 'var(--c-text-3)'}
                          >Show all →</button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <button className="modal-nav-btn next" onClick={(e) => { e.stopPropagation(); projectNav(1); }}>›</button>
        </div>
      )}
    </div>

      {konamiPhase === 'void-swallow' && (
        <div className="void-swallow-overlay">
          <span className="vs-code">◈</span>
          <span className="vs-msg">Swallowed by the void</span>
          <span className="vs-sub">The darkness consumes all...</span>
        </div>
      )}
      {konamiPhase === 'void-revive' && (
        <div className="void-swallow-overlay revive">
          <span className="vs-code">✦</span>
          <span className="vs-msg">Reviving now</span>
          <span className="vs-sub">Returning from the darkness</span>
        </div>
      )}
      {show404 && (
        <div className="easter-404">
          <span className="e404-code">404</span>
          <span className="e404-msg">Page Not Found</span>
          <span className="e404-sub">The Konami code broke reality. Rebooting...</span>
        </div>
      )}
      <div className={`void-sweep${voidSweep ? ' active' : ''}`}>
        <div className="crack-center"></div>
        {Array.from({ length: 12 }).map((_, i) => <div key={i} className="crack-line"></div>)}
      </div>
      <div className={`static-pop${staticPop ? ' active' : ''}`}>
        <div className="static-inner"></div>
      </div>
      <div className={`void-bleed${voidBleed ? ' active' : ''}`} style={{ '--bleed-x': `${bleedPos.x}%`, '--bleed-y': `${bleedPos.y}%` }}></div>
      <canvas className="corruption-canvas" id="corruption-canvas"></canvas>
    </>
  );
}
