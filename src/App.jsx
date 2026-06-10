import React, { useEffect, useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

const KNOWLEDGE = {
  skill: "I work across the full stack: languages like Python, JavaScript/TypeScript, C++, Java, SQL, Bash; frameworks like React, FastAPI, Node.js, PyTorch, Pandas; infrastructure tools like Docker, Kubernetes, Red Hat OpenShift, Podman, GitHub Actions; databases including MongoDB, MySQL, Supabase, MinIO; and an AI/ML stack spanning LLMs (Llama 3, Gemini, Groq), FAISS, Sentence Transformers, Ollama, MuRIL, and GDELT/ACLED pipelines.",
  experience: "My experience includes a content writing internship and participation in the Study Australia Industry Experience Program, where I honed cross-functional collaboration skills.",
  project: "I've built projects like an AI Ethics Advisor with Llama 3, DeepFake Detection microservices, InsightX Analytics, a Dynamic Societal Friction Simulator for conflict forecasting, and SkillRoute for talent routing with FAISS.",
  certifications: "I am a Red Hat Certified Specialist in Linux Diagnostics & Troubleshooting. I'm also certified in DSA in C, DBMS, and Operating Systems.",
  hire: "I'm actively looking for SDE Internships! You can reach me at harshitshyamsukha@gmail.com.",
  education: "I'm currently pursuing my B.Tech in Computer Science at SRM Institute of Science & Technology, Chennai (Batch of Aug 2023 - May 2027).",
  default: "I'm a B.Tech CSE student at SRM Chennai passionate about software development, systems programming, and Linux. Ask me about my skills, certifications, or how to reach me!"
};

const PROJECTS_DETAILED = [
  {
    id: 'ai-ethics',
    title: "AI Ethics Advisor",
    date: "Jan 2026 – Ongoing",
    stack: ["Llama 3 (8B)", "FastAPI", "React", "JSON Streaming", "Ollama"],
    badge: null,
    desc: "Full-stack web application powered by a locally hosted Llama 3 8B model that analyzes real-world business dilemmas through an ethical lens.",
    problem: "Businesses need ethical guidance when making tough decisions, but sending sensitive internal data to third-party APIs like ChatGPT poses privacy and compliance risks.",
    architecture: [
      "React frontend with real-time JSON streaming for token-by-token responses",
      "FastAPI backend orchestrating prompt engineering and response validation",
      "Ollama runtime serving Llama 3 8B entirely on-premises",
      "No data ever leaves the local network — fully air-gapped inference"
    ],
    decisions: [
      "Chose Ollama over cloud APIs to guarantee data privacy",
      "JSON streaming avoids UI blocking and enables partial result rendering",
      "Prompt chaining decomposes complex ethical dilemmas into sub-questions"
    ],
    metrics: null,
    github: "https://github.com/Harshitshyamsukha",
    demo: null,
    image: null,
    category: "ai",
    status: "live"
  },
  {
    id: 'deepfake',
    title: "DeepFake Detection",
    date: "Oct 2025",
    stack: ["FastAPI", "Docker Compose", "MinIO", "Python"],
    badge: null,
    desc: "Microservices-based MVP for evaluating image authenticity at scale, with structured persistence and containerized deployment.",
    problem: "Image authenticity verification is computationally expensive and needs a scalable, reproducible pipeline that can handle batches of uploads.",
    architecture: [
      "Upload service accepts images via REST API and queues them for processing",
      "Processing pipeline runs detection models in isolated containers",
      "MinIO (S3-compatible) stores raw uploads and results with metadata",
      "Docker Compose orchestrates all services for one-command deployment"
    ],
    decisions: [
      "MinIO over cloud S3 for full local control and zero egress costs",
      "Docker Compose enables reproducible dev/test/prod environments",
      "Async task queue prevents upload endpoint from blocking on inference"
    ],
    metrics: null,
    github: "https://github.com/Harshitshyamsukha",
    demo: null,
    image: null,
    category: "fullstack",
    status: "live"
  },
  {
    id: 'insightx',
    title: "InsightX Analytics",
    date: "Aug 2025",
    stack: ["Gemini 1.5", "React", "FastAPI", "NL-to-SQL"],
    badge: null,
    desc: "Enterprise-grade analytics engine that translates natural language questions into executing SQL queries against relational databases.",
    problem: "Non-technical stakeholders rely on data-driven decisions but lack SQL proficiency, creating a bottleneck around engineering teams for every ad-hoc query.",
    architecture: [
      "React frontend with a chat-like interface for asking data questions",
      "FastAPI backend pipes natural language through Gemini 1.5 API",
      "NL-to-SQL engine generates, validates, and executes SQL against the target database",
      "Results returned as formatted tables with optional chart renderings"
    ],
    decisions: [
      "Gemini 1.5 chosen for its 1M-token context window — can ingest full schema definitions",
      "SQL validation step prevents hallucinated or destructive queries",
      "Stateless design keeps the backend simple and horizontally scalable"
    ],
    metrics: null,
    github: "https://github.com/Harshitshyamsukha",
    demo: null,
    image: null,
    category: "fullstack",
    status: "live"
  },
  {
    id: 'dsfs',
    title: "Dynamic Societal Friction Simulator (DSFS)",
    date: "Ongoing",
    stack: ["GDELT", "ACLED", "MuRIL", "Python", "PyTorch"],
    badge: "Research",
    desc: "Conflict forecasting model that fuses GDELT event data with ACLED conflict records and MuRIL multilingual embeddings to predict societal friction.",
    problem: "Traditional conflict forecasting relies on sparse survey data and lags behind real-time events. Automated early-warning systems need to ingest global news and conflict reports continuously.",
    architecture: [
      "GDELT 2.0 event stream captures real-time global news coverage",
      "ACLED provides validated conflict event records for supervised training",
      "MuRIL multilingual embeddings enable cross-lingual signal extraction from Indian regional languages",
      "Transformer-based temporal fusion model forecasts friction scores at weekly horizons"
    ],
    decisions: [
      "MuRIL over multilingual BERT for superior performance on 16 Indian languages",
      "Hawkes process baseline for rigorous comparison — not just naive baselines",
      "h=4 weeks forecasting horizon balances lead time against accuracy decay"
    ],
    metrics: "LTROC 0.73 at h=4 weeks, 12.3% improvement over Hawkes baseline",
    github: "https://github.com/Harshitshyamsukha",
    demo: null,
    image: null,
    category: "ai",
    status: "wip"
  },
  {
    id: 'skillroute',
    title: "SkillRoute",
    date: "Ongoing",
    stack: ["FAISS", "Sentence Transformers", "React 19", "MapLibre GL JS", "FastAPI"],
    badge: null,
    desc: "Intelligent talent routing system that matches candidates to opportunities using vector similarity search and geospatial dispatch visualization.",
    problem: "Talent matching platforms use keyword filtering that misses nuanced skill adjacencies. Organizations need semantic understanding of candidate profiles plus geographic dispatch optimization.",
    architecture: [
      "Candidate profiles embedded via sentence-transformers into a FAISS vector index",
      "Synergy Score computed from cosine similarity + weighted experience factors",
      "MapLibre GL JS renders dispatch map showing candidate-to-opportunity routing",
      "FastAPI backend handles indexing, querying, and scoring orchestration"
    ],
    decisions: [
      "FAISS enables sub-50ms similarity search across thousands of candidate profiles",
      "MapLibre GL JS avoids paid map SDKs while delivering full-featured geospatial viz",
      "Synergy Score combines semantic match, location proximity, and availability windows"
    ],
    metrics: null,
    github: "https://github.com/Harshitshyamsukha",
    demo: null,
    image: null,
    category: "ai",
    status: "wip"
  }
];

const subtitles = [
  "Building AI systems that reason.",
  "Shipping full-stack products.",
  "Turning research into running code."
];

export default function App() {

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Harshit's AI assistant. Ask me about his skills, certifications, or how to reach him!", isUser: false }
  ]);
  const [terminalContent, setTerminalContent] = useState([]);
  const chatEndRef = useRef(null);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('Just saying hi');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSending, setFormSending] = useState(false);

  const [subtitleIndex, setSubtitleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const canvas = document.getElementById('particle-canvas');
    if (!dot || !ring || !canvas) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let ringRafId = null;
    let particleRafId = null;

    const onMouseMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    };
    const animRing = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      ringRafId = requestAnimationFrame(animRing);
    };
    window.addEventListener('mousemove', onMouseMove);
    ringRafId = requestAnimationFrame(animRing);

    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);

    const r = 230, g = 57, b = 70;

    class P {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W; this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.4; this.vy = (Math.random() - 0.5) * 0.4;
        this.r = Math.random() * 1.8 + 0.5; this.a = Math.random();
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
      }
    }
    for (let i = 0; i < 60; i++) particles.push(new P());

    const drawParticles = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.update();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.a * 0.5})`; ctx.fill();
      });
      particleRafId = requestAnimationFrame(drawParticles);
    };
    particleRafId = requestAnimationFrame(drawParticles);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      if (ringRafId) cancelAnimationFrame(ringRafId);
      if (particleRafId) cancelAnimationFrame(particleRafId);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal, .section-title').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const lines = [
      { t: 'cmd', text: 'whoami' },
      { t: 'out', text: '→ harshit | btech_cse@srm | ai/ml_engineer' },
      { t: 'cmd', text: 'cat skills.txt' },
      { t: 'out', text: '→ python js ts c++ java sql bash react fastapi docker kubernetes' }
    ];
    let timeoutId;
    let lineIdx = 0;
    let cancelled = false;

    setTerminalContent([]);

    const runTerminal = () => {
      if (cancelled || lineIdx >= lines.length) return;
      const currentLine = lines[lineIdx];
      if (currentLine) {
        setTerminalContent(prev => [...prev, currentLine]);
      }
      lineIdx++;
      timeoutId = setTimeout(runTerminal, 800);
    };
    timeoutId = setTimeout(runTerminal, 1500);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      const cacheKey = 'gh-repos-cache';
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < 3600000) {
          setRepos(data);
          setLoadingRepos(false);
          return;
        }
      }
      try {
        const res = await fetch('https://api.github.com/users/harshitshyamsukha/repos?sort=updated&per_page=5');
        const data = await res.json();
        setRepos(data);
        localStorage.setItem(cacheKey, JSON.stringify({ data, timestamp: Date.now() }));
      } catch {
        setRepos([]);
      } finally {
        setLoadingRepos(false);
      }
    };
    fetchRepos();
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
    else if (userMsg.match(/cert|red hat|dsa|dbms|os/)) reply = KNOWLEDGE.cert;
    else if (userMsg.match(/hire|contact|available|reach|email|phone/)) reply = KNOWLEDGE.hire;
    else if (userMsg.match(/educat|study|college|srm|degree/)) reply = KNOWLEDGE.education;

    setTimeout(() => {
      setMessages(prev => [...prev, { text: reply, isUser: false }]);
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
  };
  const resetTilt = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
  };

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setShowProjectModal(true);
    document.body.style.overflow = 'hidden';
    if (window.plausible) {
      window.plausible('Project Click', { props: { project: project.title } });
    }
  };

  const closeProjectModal = () => {
    setShowProjectModal(false);
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  const handleResumeDownload = () => {
    if (window.plausible) {
      window.plausible('Download Resume');
    }
  };

  const handleGitHubClick = () => {
    if (window.plausible) {
      window.plausible('GitHub Link Click');
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    const honeypot = e.target.querySelector('input[name="bot-field"]');
    if (honeypot && honeypot.value) return;

    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setFormSending(true);

    emailjs.send('service_lhev4mm', 'template_3nekq1l', {
      name: formName,
      email: formEmail,
      subject: formSubject,
      message: formMessage,
      time: new Date().toLocaleString(),
    }, 'oimlw2aQxH_KKaX__')
      .then(() => {
        setFormSubmitted(true);
        setFormName('');
        setFormEmail('');
        setFormSubject('Just saying hi');
        setFormMessage('');
        if (window.plausible) {
          window.plausible('Contact Form Submit');
        }
      })
      .catch(() => {
        setFormError('Failed to send message. Please try again later.');
      })
      .finally(() => {
        setFormSending(false);
      });
  };

  const skillCategories = [
    {
      name: 'Languages',
      items: ['Python', 'JavaScript / TypeScript', 'C++', 'Java', 'SQL', 'Bash']
    },
    {
      name: 'Frameworks',
      items: ['React', 'FastAPI', 'Node.js', 'PyTorch', 'Pandas']
    },
    {
      name: 'Infrastructure',
      items: ['Docker', 'Kubernetes', 'Red Hat OpenShift', 'Podman', 'GitHub Actions']
    },
    {
      name: 'Databases',
      items: ['MongoDB', 'MySQL', 'Supabase', 'MinIO']
    },
    {
      name: 'AI / ML Stack',
      items: ['LLMs (Llama 3, Gemini, Groq)', 'FAISS', 'Sentence Transformers', 'Ollama', 'MuRIL', 'GDELT / ACLED pipelines']
    }
  ];

  const getCategoryClass = (cat) => {
    if (cat === 'ai') return 'card-category-badge ai';
    if (cat === 'fullstack') return 'card-category-badge fullstack';
    if (cat === 'client') return 'card-category-badge client';
    return 'card-category-badge hackathon';
  };

  const getCategoryLabel = (cat) => {
    if (cat === 'ai') return 'AI / Research';
    if (cat === 'fullstack') return 'Full-Stack';
    if (cat === 'client') return 'Client';
    return 'Hackathon';
  };

  const getArchSnippet = (id) => {
    if (id === 'dsfs') return 'GDELT 2.0 + ACLED → MuRIL embeddings → Transformer temporal fusion → Weekly friction forecasts';
    if (id === 'skillroute') return 'Sentence-BERT embeddings → FAISS index → Synergy Score → MapLibre dispatch viz';
    return null;
  };

  return (
    <>
      <nav className="navbar">
        <a className="nav-link" href="#skills">skills</a>
        <a className="nav-link" href="#experience">experience</a>
        <a className="nav-link" href="#projects">projects</a>
        <a className="nav-link" href="#activity">activity</a>
        <a className="nav-link" href="#certifications">certifications</a>
        <a className="nav-link" href="#contact">contact</a>
        <a
          className="resume-nav-btn"
          href="/resume.pdf"
          download="Harshit_Shyamsukha_Resume.pdf"
          onClick={handleResumeDownload}
        >
          Resume
        </a>
        <button
          onClick={toggleTheme}
          title="Toggle theme"
          style={{
            background: 'transparent',
            border: '1px solid var(--color-border-hover)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontSize: '16px',
            padding: '6px 10px',
            lineHeight: 1,
            transition: 'all var(--duration-base) ease'
          }}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </nav>

      <section className="hero-section">
        <div className="hero-bg-grid"></div>
        <div className="hero-glow"></div>
        <div className="container hero-inner">
          <div className="hero-left">
            <p className="hero-eyebrow">// full-stack engineer & ai researcher</p>
            <h1 className="hero-name">
              <span className="initial">H</span>arshit<br/>Shyamsukha
            </h1>
            <p className="hero-subtitle">
              {subtitles[subtitleIndex]}<span className="typewriter-cursor"></span>
            </p>
            <p className="hero-bio">
              B.Tech CSE @ SRMIST · Red Hat Certified · Currently building conflict forecasting models and social analytics infrastructure.
            </p>
            <div className="hero-ctas">
              <a
                className="btn-primary"
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View my work ↓
              </a>
              <a
                className="btn-secondary"
                href="/resume.pdf"
                download="Harshit_Shyamsukha_Resume.pdf"
                onClick={handleResumeDownload}
              >
                Download Resume
              </a>
            </div>
            <div className="hero-stat-pills">
              <span className="stat-pill">6 projects shipped</span>
              <span className="stat-pill">Red Hat Certified</span>
              <span className="stat-pill">SRMIST '27</span>
            </div>
          </div>
          <div className="terminal-wrap">
            <div className="terminal-header">
              <div className="t-dot" style={{ background: '#FF5F57' }}></div>
              <div className="t-dot" style={{ background: '#FFBD2E' }}></div>
              <div className="t-dot" style={{ background: '#28CA41' }}></div>
              <div className="t-title">bash</div>
            </div>
            <div className="terminal-body">
              {terminalContent.map((line, i) => (
                <div key={i}>
                  {line?.t === 'cmd' ? (
                    <><span className="t-prompt">hs</span> <span className="t-dim">$</span> <span className="t-cmd">{line.text}</span></>
                  ) : (
                    <span className="t-out">{line?.text}</span>
                  )}
                </div>
              ))}
              <div><span className="t-prompt">hs</span> <span className="t-dim">$</span> <span className="cursor-blink"></span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <p className="section-eyebrow reveal">// skillset</p>
          <h2 className="section-title">Technical Arsenal</h2>
          <div className="skills-grid reveal">
            {skillCategories.map((cat) => (
              <div key={cat.name} className="skill-cluster">
                <div className="skill-cluster-label">{cat.name}</div>
                <div className="skill-tags">
                  {cat.items.map((chip) => (
                    <span key={chip} className="skill-tag">{chip}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="container">
          <p className="section-eyebrow reveal">// background</p>
          <h2 className="section-title">Experience</h2>
          <div className="reveal">
            {[
              { title: "Study Australia Industry Experience Program", date: "Global Learning Program", stack: ["Cross-Functional Collaboration", "Teamwork", "Adaptability"], desc: "Participated in a global learning initiative, learning to work across teams and deliver results effectively under pressure." },
              { title: "Content Writing Intern", date: "Internship", stack: ["Communication", "Analytical Thinking", "Writing"], desc: "Cultivated a versatile skill set emphasizing clear communication, research, and collaborative project execution." }
            ].map((exp, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: 'var(--space-4)',
                  marginBottom: 'var(--space-6)',
                  padding: 'var(--space-5)',
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border-default)',
                  borderRadius: 'var(--radius-lg)'
                }}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
              >
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--color-accent-primary)',
                  marginTop: '6px',
                  flexShrink: 0
                }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{exp.title}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}>{exp.date}</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '0.75rem' }}>
                    {exp.stack.map((s, i) => (
                      <span key={i} className="card-stack-tag">{s}</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>▸ {exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <p className="section-eyebrow reveal">// showcase</p>
          <h2 className="section-title">Projects</h2>
          <div className="projects-grid reveal">
            {PROJECTS_DETAILED.map((proj, idx) => (
              <div
                key={proj.id}
                className={`project-card${proj.id === 'dsfs' || proj.id === 'skillroute' ? ' featured' : ''}`}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                onClick={() => openProjectModal(proj)}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <span className={getCategoryClass(proj.category)}>{getCategoryLabel(proj.category)}</span>
                <span className={`status-dot ${proj.status}`}></span>
                <h3 className="card-title">{proj.title}</h3>
                <p className="card-desc">{proj.desc}</p>
                {proj.metrics && (
                  <div style={{ marginBottom: 'var(--space-3)' }}>
                    <div className="card-metric">{proj.metrics.split(',')[0]}</div>
                    <div className="card-metric-label">forecast accuracy</div>
                  </div>
                )}
                <div className="card-stack">
                  {proj.stack.map((s, i) => (
                    <span key={i} className="card-stack-tag">{s}</span>
                  ))}
                </div>
                {(proj.id === 'dsfs' || proj.id === 'skillroute') && (
                  <div className="card-arch">
                    {getArchSnippet(proj.id)}
                  </div>
                )}
                <div className="card-footer">
                  <a href={proj.github} target="_blank" rel="noopener noreferrer" onClick={(e) => { e.stopPropagation(); handleGitHubClick(); }}>
                    View Project
                  </a>
                  <span className="card-arrow">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="github-feed">
        <div className="container">
          <p className="section-eyebrow reveal">// live activity</p>
          <h2 className="section-title">GitHub Activity Feed</h2>
          <div className="reveal">
            {loadingRepos ? (
              <div className="github-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}>Loading repositories...</p>
              </div>
            ) : repos.length > 0 ? (
              <>
                <div className="github-card" style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span className="building-badge"><span className="pulse"></span>Currently building</span>
                  <a
                    href={repos[0].html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-name"
                    onClick={handleGitHubClick}
                  >
                    {repos[0].name}
                  </a>
                  <span className="repo-desc" style={{ display: 'inline', margin: 0 }}>
                    — {repos[0].description || 'No description'}
                  </span>
                </div>
                {repos.map((repo) => (
                  <div key={repo.id} className="github-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="repo-name"
                        onClick={handleGitHubClick}
                      >
                        {repo.name}
                      </a>
                      <span className="repo-meta" style={{ fontSize: '0.72rem' }}>
                        {new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    {repo.description && (
                      <p className="repo-desc">{repo.description}</p>
                    )}
                    <div className="repo-meta">
                      {repo.language && (
                        <span>
                          <span className="lang-dot" style={{ backgroundColor: getLangColor(repo.language) }}></span>
                          {repo.language}
                        </span>
                      )}
                      <span>★ {repo.stargazers_count}</span>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="github-card" style={{ padding: '2rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}>Could not load repositories.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="activity">
        <div className="container">
          <p className="section-eyebrow reveal">// activity</p>
          <h2 className="section-title">GitHub Stats</h2>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div
              style={{
                flex: '1 1 500px',
                padding: 'var(--space-6)',
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border-default)',
                borderRadius: 'var(--radius-lg)'
              }}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-eyebrow)', color: 'var(--color-text-tertiary)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                Commit Graph
              </p>
              <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                <img src="https://ghchart.rshah.org/E63946/harshitshyamsukha" alt="GitHub Contributions" width="800" height="128" style={{ width: '100%', opacity: 0.9 }} loading="lazy" />
              </div>
            </div>
            <div
              style={{
                flex: '1 1 300px',
                padding: 'var(--space-6)',
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border-default)',
                borderRadius: 'var(--radius-lg)'
              }}
              onMouseMove={handleTilt}
              onMouseLeave={resetTilt}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-eyebrow)', color: 'var(--color-text-tertiary)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
                Current Streak
              </p>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <img src="https://github-readme-streak-stats.herokuapp.com/?user=harshitshyamsukha&theme=radical&hide_border=true&background=00000000&ring=E63946&fire=E63946&currStreakNum=E8EDF5&sideNums=E8EDF5&sideLabels=7A8BA8&dates=7A8BA8&currStreakLabel=E63946" alt="GitHub Streak" width="400" height="150" style={{ width: '100%', objectFit: 'contain' }} loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="certifications">
        <div className="container">
          <p className="section-eyebrow reveal">// achievements</p>
          <h2 className="section-title">Certifications</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }} className="reveal">
            {[
              { issuer: 'Red Hat', name: 'Certified Specialist in Linux Diagnostics and Troubleshooting', date: 'November 14th, 2025' },
              { issuer: 'Practera', name: 'Study Australia Industry Experience Program', date: 'January 2023 - February 2023' },
              { issuer: 'Udemy', name: 'Data Structures and Algorithms in C', date: 'November 10th, 2024' },
              { issuer: 'Scaler', name: 'DBMS - Fundamentals and Advanced Concepts', date: 'May 6th, 2025' },
              { issuer: 'Udemy', name: 'Operating Systems (Real-Time OS)', date: 'November 10th, 2025' }
            ].map((cert, i) => (
              <div
                key={i}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                style={{
                  padding: 'var(--space-5)',
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border-default)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent-primary)', marginBottom: '8px' }}>{cert.issuer}</div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', lineHeight: '1.4', color: 'var(--color-text-primary)' }}>{cert.name}</h3>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>{cert.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <div className="contact-wrap">
            <p className="section-eyebrow reveal">// get in touch</p>
            <h2 className="contact-heading reveal">Let's build something.</h2>
            <p className="contact-sub reveal">
              I'm actively looking for SDE Internships. Whether you have a question, an idea, or just want to connect — my inbox is always open.
            </p>

            {formSubmitted ? (
              <div className="contact-form reveal">
                <div className="form-success">
                  <p>Message sent successfully!</p>
                  <p>Thank you for reaching out. I'll get back to you soon.</p>
                </div>
                <button
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setFormSubmitted(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact-form reveal" onSubmit={handleContactSubmit}>
                <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                  <input type="text" name="bot-field" tabIndex="-1" autoComplete="off" />
                </div>
                <div className="form-field">
                  <label htmlFor="form-name">Name *</label>
                  <input
                    id="form-name"
                    type="text"
                    placeholder="Your name"
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="form-email">Email *</label>
                  <input
                    id="form-email"
                    type="email"
                    placeholder="your@email.com"
                    value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="form-subject">Subject</label>
                  <select
                    id="form-subject"
                    value={formSubject}
                    onChange={e => setFormSubject(e.target.value)}
                  >
                    <option value="Internship Opportunity">Internship Opportunity</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Just saying hi">Just saying hi</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="form-message">Message *</label>
                  <textarea
                    id="form-message"
                    rows="5"
                    placeholder="Your message..."
                    value={formMessage}
                    onChange={e => setFormMessage(e.target.value)}
                    required
                  />
                </div>
                {formError && (
                  <p className="form-error">{formError}</p>
                )}
                <button type="submit" className="btn-primary" disabled={formSending}>
                  {formSending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}

            <div className="social-links">
              <a className="social-link" href="https://github.com/Harshitshyamsukha" target="_blank" rel="noopener noreferrer" onClick={handleGitHubClick}>GitHub</a>
              <a className="social-link" href="https://www.linkedin.com/in/harshit-shyamsukha-512254258/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="social-link" href="mailto:harshitshyamsukha@gmail.com">Email</a>
            </div>
          </div>
        </div>
      </section>

      <button className="chat-toggle" onClick={() => setChatOpen(!chatOpen)} title="Ask AI Assistant">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
        </svg>
      </button>

      <div id="chat-bubble" className={chatOpen ? 'open' : ''}>
        <div className="chat-hdr">
          <span>Ask my AI Assistant</span>
          <button onClick={() => setChatOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>✖</button>
        </div>
        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.isUser ? 'user' : ''}`}>
              <div className={`msg-av ${m.isUser ? 'mv-user' : 'mv-bot'}`} style={{ overflow: 'hidden', padding: 0 }}>
                {m.isUser ? (
                  'U'
                ) : (
                  <img
                    src="/ai-avatar.svg"
                    alt="AI Avatar"
                    width="28"
                    height="28"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.textContent = 'AI';
                      e.target.parentElement.style.display = 'flex';
                      e.target.parentElement.style.alignItems = 'center';
                      e.target.parentElement.style.justifyContent = 'center';
                      e.target.parentElement.style.fontSize = '0.7rem';
                      e.target.parentElement.style.fontWeight = 'bold';
                      e.target.parentElement.style.color = '#fff';
                    }}
                  />
                )}
              </div>
              <div className={`msg-bubble ${m.isUser ? 'mb-user' : 'mb-bot'}`}>{m.text}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form className="chat-inp-row" onSubmit={handleChatSubmit}>
          <input type="text" placeholder="Ask about my skills or certifications..." value={chatInput} onChange={e => setChatInput(e.target.value)} />
          <button type="submit">➤</button>
        </form>
      </div>

      {showTopBtn && (
        <button className="back-to-top" onClick={scrollToTop} title="Back to Top">
          ↑
        </button>
      )}

      {showProjectModal && selectedProject && (
        <div className="modal-overlay" onClick={closeProjectModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeProjectModal}>✖</button>
            <h2>
              {selectedProject.title}
              {selectedProject.badge && <span className="research-badge">{selectedProject.badge}</span>}
            </h2>
            <span className="modal-meta">{selectedProject.date}</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: 'var(--space-5)' }}>
              {selectedProject.stack.map((s, i) => (
                <span key={i} className="card-stack-tag">{s}</span>
              ))}
            </div>
            {selectedProject.image && (
              <div style={{ marginBottom: 'var(--space-5)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--color-bg-elevated)', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={selectedProject.image} alt={`${selectedProject.title} screenshot`} width="800" height="450" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              </div>
            )}
            {!selectedProject.image && (
              <div style={{ marginBottom: 'var(--space-5)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-elevated)', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--color-border-default)' }}>
                <span style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>Screenshot placeholder</span>
              </div>
            )}
            <div className="modal-section">
              <h3>Overview</h3>
              <p>{selectedProject.desc}</p>
            </div>
            <div className="modal-section">
              <h3>Problem</h3>
              <p>{selectedProject.problem}</p>
            </div>
            <div className="modal-section">
              <h3>Architecture</h3>
              <ul>
                {selectedProject.architecture.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="modal-section">
              <h3>Key Technical Decisions</h3>
              <ul>
                {selectedProject.decisions.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
            {selectedProject.metrics && (
              <div className="modal-metric-box">
                <h3>Metrics / Outcomes</h3>
                <p>{selectedProject.metrics}</p>
              </div>
            )}
            <div className="modal-links">
              {selectedProject.github && (
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" onClick={handleGitHubClick}>
                  View on GitHub
                </a>
              )}
              {selectedProject.demo && (
                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>Designed & Built by <span style={{ color: 'var(--color-accent-primary)' }}>Harshit Shyamsukha</span></p>
      </footer>
    </>
  );
}

function getLangColor(lang) {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    C: '#555555',
    'C++': '#f34b7d',
    Shell: '#89e051',
    Dockerfile: '#384d54',
    Jupyter: '#DA5B0B',
  };
  return colors[lang] || '#6e7681';
}
