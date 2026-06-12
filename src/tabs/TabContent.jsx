import React, { useState, useEffect } from 'react';

function Typewriter({ text, speed = 50 }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    if (typeof text !== 'string') return;
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => { i++; setDisplayed(text.slice(0, i)); if (i >= text.length) clearInterval(interval); }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <>{displayed}</>;
}

function KineticText({ text }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 200); return () => clearTimeout(t); }, []);
  if (!visible) return <span style={{ opacity: 0 }}>{text}</span>;
  return <span>{text.split('').map((ch, i) => <span key={i} style={{ animation: `charIn 40ms ${i * 30}ms both` }}>{ch}</span>)}</span>;
}

function WordReveal({ text }) {
  const words = (text || '').split(' ');
  return <>{words.map((w, i) => <span key={i} className="word-reveal" style={{ animationDelay: `${i * 30}ms` }}>{w}{i < words.length - 1 ? ' ' : ''}</span>)}</>;
}

const getBadgeStyle = (cat) => {
  if (cat === 'certification') return { bg: '#000000', text: '#ffff00' };
  if (cat === 'academic') return { bg: '#000000', text: '#ff00ff' };
  if (cat === 'activity') return { bg: '#000000', text: '#00ffff' };
  if (cat === 'ai' || cat === 'fullstack' || cat === 'client') return { bg: 'var(--c-accent-dim)', text: 'var(--c-accent-text)' };
  return { bg: 'var(--c-surface-3)', text: 'var(--c-text-3)' };
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

export default function TabContent({
  filterTab, shuffledPins, openProjectModal, voidThemeActive,
  handleCardMouseEnter, handleCardMouseMove, handleCardMouseLeave, resetCardTilt,
  getPinIcon, setFilterTab, handleGitHubClick,
  CORE_PROJECTS, PROCESS_DATA, selectedProcessProject, setSelectedProcessProject,
  contactTab, setContactTab,
  formSubmitted, setFormSubmitted, formName, setFormName,
  formEmail, setFormEmail, formSubject, setFormSubject,
  formMessage, setFormMessage, formError, formSending, handleContactSubmit,
  crSubmitted, setCrSubmitted, crName, setCrName,
  crEmail, setCrEmail, crRepo, setCrRepo, crPRLink, setCrPRLink,
  crLanguage, setCrLanguage, crDescription, setCrDescription,
  crConcerns, setCrConcerns, crError, crSending, handleCodeReviewSubmit,
}) {
  return (
    <>
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
                <div className="about-card-row" style={{ fontFamily: "var(--font-mono)", fontSize: '11px', color: '#3366cc' }}>
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
              onMouseEnter={() => handleCardMouseEnter(pin)}
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
    </>
  );
}
