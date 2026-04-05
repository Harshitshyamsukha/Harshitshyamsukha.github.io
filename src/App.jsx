import React, { useEffect, useState, useRef } from 'react';

// Trained on Harshit's actual resume data
const KNOWLEDGE = {
  skill: "I'm skilled in Java, C, C++, Shell Scripting, SQL, HTML, and JavaScript. I also have strong expertise in Red Hat Linux, Docker, and Containerization.",
  experience: "My experience includes a content writing internship and participation in the Study Australia Industry Experience Program, where I honed my cross-functional collaboration skills.",
  project: "I've built projects like an AI Ethics Advisor, DeepFake Detection microservices, and InsightX Analytics.",
  cert: "I am a Red Hat Certified Specialist in Linux Diagnostics & Troubleshooting. I'm also certified in DSA in C, DBMS, and Operating Systems.",
  hire: "I'm actively looking for SDE Internships! You can reach me at harshitshyamsukha@gmail.com or 7412811448.",
  education: "I'm currently pursuing my B.Tech in Computer Science at SRM Institute of Science & Technology, Chennai (Batch of Aug 2023 - May 2027).",
  default: "I'm a B.Tech CSE student at SRM Chennai passionate about software development, systems programming, and Linux. Ask me about my skills, certifications, or how to reach me!"
};

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Harshit's AI assistant. Ask me about his skills, certifications, or how to reach him!", isUser: false }
  ]);
  const [terminalContent, setTerminalContent] = useState([]);
  const chatEndRef = useRef(null);

  // --- 1. Cursor & Particles Effect ---
  useEffect(() => {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const canvas = document.getElementById('particle-canvas');
    if (!dot || !ring || !canvas) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMouseMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    };
    const animRing = () => {
      rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(animRing);
    };
    window.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(animRing);

    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize(); window.addEventListener('resize', resize);

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
        ctx.fillStyle = `rgba(29,158,117,${p.a * 0.5})`; ctx.fill();
      });
      requestAnimationFrame(drawParticles);
    };
    drawParticles();

    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // --- 2. Intersection Observer (Scroll Reveal) ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // --- 3. Terminal Typing Animation (Strict Mode Safe) ---
  useEffect(() => {
    const lines = [
      { t: 'cmd', text: 'whoami' },
      { t: 'out', text: '→ harshit | btech_cse@srm | sde_intern' },
      { t: 'cmd', text: 'cat skills.txt' },
      { t: 'out', text: '→ java c++ linux docker sql' }
    ];
    let timeoutId;
    let lineIdx = 0;
    
    setTerminalContent([]); 

    const runTerminal = () => {
      if (lineIdx >= lines.length) return;
      const currentLine = lines[lineIdx];
      if (currentLine) {
        setTerminalContent(prev => [...prev, currentLine]);
      }
      lineIdx++;
      timeoutId = setTimeout(runTerminal, 800);
    };
    timeoutId = setTimeout(runTerminal, 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  // --- 4. Chatbot Logic ---
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput.trim().toLowerCase();
    setMessages(prev => [...prev, { text: chatInput, isUser: true }]);
    setChatInput('');
    
    let reply = KNOWLEDGE.default;
    if (userMsg.match(/skill|know|tech|language|stack|java|c\+\+|linux/)) reply = KNOWLEDGE.skill;
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

  return (
    <>
      <nav>
        <div className="nav-logo">hs@portfolio<span style={{ color: 'var(--teal-2)' }}>_</span></div>
        <div className="nav-links">
          <a href="#skills"><span>01.</span>skills</a>
          <a href="#experience"><span>02.</span>experience</a>
          <a href="#projects"><span>03.</span>projects</a>
          <a href="#certifications"><span>04.</span>certifications</a>
          <button className="theme-btn" onClick={toggleTheme} title="Toggle theme"></button>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '7rem' }}>
        <div className="container hero-inner" style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '280px' }}>
            <p className="hero-greeting">// hello world 👋</p>
            <h1 className="hero-name">Harshit<br/><span style={{ color: 'var(--teal-2)' }}>Shyamsukha</span></h1>
            <p className="hero-sub">
              I'm a dynamic B.Tech CSE student at SRM with hands-on experience in Java, C++, and Linux systems. Passionate about problem-solving and actively looking for SDE Internships.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }} className="reveal">
              <a href="https://github.com/Harshitshyamsukha" target="_blank" rel="noreferrer" className="btn-primary">GitHub Profile</a>
              <a href="mailto:harshitshyamsukha@gmail.com" className="btn-primary" style={{ background: 'transparent', border: '1px solid var(--teal)', color: 'var(--text)' }}>Contact Me</a>
            </div>
          </div>
          
          <div className="terminal-wrap" style={{ flex: '1', minWidth: '300px' }}>
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

      {/* SKILLS */}
      <section id="skills">
        <div className="container">
          <p className="section-label reveal">// skillset</p>
          <h2 className="section-title reveal">Technical Arsenal</h2>
          <div className="section-divider reveal"></div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }} className="reveal">
             <div>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.85', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                  I specialize in building a strong foundation in software development and systems programming. With hands-on experience in object-oriented programming and Linux containerization, I focus on solving real-world problems through clean code and analytical thinking.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                   {['Python','Java', 'C++', 'C', 'Red Hat Linux', 'Docker', 'SQL', 'Shell Scripting', 'JavaScript', 'Shell', 'MongoDB', 'WordPress'].map(chip => (
                     <span key={chip} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', padding: '5px 12px', borderRadius: '20px', border: '1px solid var(--border-2)', color: 'var(--teal)', background: 'var(--teal-glow)' }}>{chip}</span>
                   ))}
                </div>
             </div>
             
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {[
                  { name: 'Java / C / C++ / Python', pct: 90 },
                  { name: 'Red Hat Linux / Docker', pct: 85 },
                  { name: 'SQL / DBMS', pct: 80 },
                  { name: 'HTML / JavaScript / Shell', pct: 75 },
                  { name: 'MongoDB / WordPress / Shell Scripting', pct: 70 }
                ].map(skill => (
                  <div key={skill.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--text)' }}>{skill.name}</span>
                      <span style={{ color: 'var(--teal)' }}>{skill.pct}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'var(--surface-2)', borderRadius: '3px', overflow: 'hidden' }}>
                       <div style={{ height: '100%', background: 'linear-gradient(90deg, var(--teal), var(--teal-2))', width: `${skill.pct}%`, borderRadius: '3px' }}></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="container">
          <p className="section-label reveal">// background</p>
          <h2 className="section-title reveal">Experience</h2>
          <div className="section-divider reveal"></div>
          
          <div className="timeline">
            {[
              { title: "Study Australia Industry Experience Program", date: "Global Learning Program", stack: ["Cross-Functional Collaboration", "Teamwork", "Adaptability"], desc: "Participated in a global learning initiative, learning to work across teams and deliver results effectively under pressure." },
              { title: "Content Writing Intern", date: "Internship", stack: ["Communication", "Analytical Thinking", "Writing"], desc: "Cultivated a versatile skill set emphasizing clear communication, research, and collaborative project execution." }
            ].map((exp, idx) => (
              <div className="tl-item reveal" key={idx}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '38px' }}>
                  <div className="tl-dot"></div>
                </div>
                <div className="tl-card" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{exp.title}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{exp.date}</span>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    {exp.stack.map((s, i) => <span key={i} className="stack-tag" style={{ marginRight: '6px' }}>{s}</span>)}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>▸ {exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="container">
          <p className="section-label reveal">// showcase</p>
          <h2 className="section-title reveal">Projects</h2>
          <div className="section-divider reveal"></div>
          
          <div className="timeline">
            {[
              { title: "AI Ethics Advisor", date: "Jan 2026 – Ongoing", stack: ["Llama 3 (8B)", "JSON Streaming", "Full-Stack"], desc: "Built a full-stack web app powered by a locally hosted Llama 3 model to analyze business dilemmas." },
              { title: "DeepFake Detection", date: "Oct 2025", stack: ["FastAPI", "Docker Compose", "MinIO"], desc: "Microservices MVP capable of evaluating image authenticity with structured persistence." },
              { title: "InsightX Analytics", date: "Aug 2025", stack: ["Gemini 1.5", "React", "NL-to-SQL"], desc: "Enterprise-grade analytics engine translating natural language to executing SQL queries." }
            ].map((proj, idx) => (
              <div className="tl-item reveal" key={idx}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '38px' }}>
                  <div className="tl-dot"></div>
                </div>
                <div className="tl-card" onMouseMove={handleTilt} onMouseLeave={resetTilt}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{proj.title}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{proj.date}</span>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    {proj.stack.map((s, i) => <span key={i} className="stack-tag" style={{ marginRight: '6px' }}>{s}</span>)}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>▸ {proj.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GITHUB ACTIVITY */}
      <section id="activity">
        <div className="container">
          <p className="section-label reveal">// activity</p>
          <h2 className="section-title reveal">GitHub Stats</h2>
          <div className="section-divider reveal"></div>
          
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div className="tl-card" style={{ flex: '1 1 500px', display: 'flex', flexDirection: 'column', padding: '2rem' }} onMouseMove={handleTilt} onMouseLeave={resetTilt}>
               <span className="section-label" style={{ marginBottom: '1.5rem' }}>Commit Graph</span>
               <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                 <img src="https://ghchart.rshah.org/1D9E75/harshitshyamsukha" alt="GitHub Contributions" style={{ width: '100%', opacity: 0.9 }} />
               </div>
            </div>
            
            <div className="tl-card" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', padding: '2rem' }} onMouseMove={handleTilt} onMouseLeave={resetTilt}>
              <span className="section-label" style={{ marginBottom: '1.5rem' }}>Current Streak</span>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <img src="https://github-readme-streak-stats.herokuapp.com/?user=harshitshyamsukha&theme=radical&hide_border=true&background=00000000&ring=1D9E75&fire=1D9E75&currStreakNum=E8EDF5&sideNums=E8EDF5&sideLabels=7A8BA8&dates=7A8BA8&currStreakLabel=1D9E75" alt="GitHub Streak" style={{ width: '100%', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications">
        <div className="container">
          <p className="section-label reveal">// achievements</p>
          <h2 className="section-title reveal">Certifications</h2>
          <div className="section-divider reveal"></div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }} className="reveal">
             {[
               { issuer: 'Red Hat', name: 'Certified Specialist in Linux Diagnostics and Troubleshooting', date: 'November 14th, 2025' },
               { issuer: 'Practera', name: 'Study Australia Industry Experience Program', date: 'January 2023 - February 2023' },
               { issuer: 'Udemy', name: 'Data Structures and Algorithms in C', date: 'November 10th, 2024' },
               { issuer: 'Scaler', name: 'DBMS - Fundamentals and Advanced Concepts', date: 'May 6th, 2025' },
               { issuer: 'Udemy', name: 'Operating Systems (Real-Time OS)', date: 'November 10th, 2025' }
             ].map((cert, i) => (
                <div key={i} className="tl-card" onMouseMove={handleTilt} onMouseLeave={resetTilt} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                   <div>
                     <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--teal)', marginBottom: '8px' }}>{cert.issuer}</div>
                     <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: '1.4', color: 'var(--text)' }}>{cert.name}</h3>
                   </div>
                   <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cert.date}</div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* CHAT WIDGET */}
      {/* UPGRADED CHAT WIDGET TOGGLE */}
      <button className="chat-toggle" onClick={() => setChatOpen(!chatOpen)} title="Ask AI Assistant">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
        </svg>
      </button>
   {/* CHAT WIDGET */}
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
                  /* AI Avatar replacing 'H' */
                  <img 
                    src="/ai-avatar.png" 
                    alt="AI Avatar" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
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

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '3rem 0', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Designed & Built by <span style={{ color: 'var(--teal)' }}>Harshit Shyamsukha</span></p>
      </footer>
    </>
  );
}