import React from 'react';
import { motion } from 'framer-motion';

function App() {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const projects = [
    {
      title: "InsightX Analytics",
      description: "AI-powered Text-to-SQL engine built with Python and Streamlit. Translates natural language into database queries and generates structured, factual business reports via the Gemini API.",
      tech: ["Python", "Streamlit", "SQLite", "Gemini API"],
      link: "https://github.com/Harshitshyamsukha"
    },
    {
      title: "Enterprise AI Ethics Advisor",
      description: "Full-stack web app leveraging a locally hosted Llama 3 model to analyze business dilemmas. Engineered custom Modelfiles to enforce strict JSON parsing and real-time streaming.",
      tech: ["React.js", "Ollama", "Llama 3", "Tailwind CSS"],
      link: "https://github.com/Harshitshyamsukha"
    },
    {
      title: "Deepfake Detection MVP",
      description: "Microservices platform using FastAPI and Docker to ingest and analyze multimodal media. Features a scalable pipeline with MinIO and a deterministic fusion aggregator.",
      tech: ["FastAPI", "Docker", "MinIO", "Python"],
      link: "https://github.com/Harshitshyamsukha"
    }
  ];

  // Updated with actual company logo URLs (Wikimedia Commons SVGs)
  const certifications = [
    { 
      title: "Red Hat OpenShift Development I: Introduction to Containers with Podman (DO188)", 
      issuer: "Red Hat", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Red_Hat_logo.svg" 
    },
    { 
      title: "Data Structures & Algorithms in C", 
      issuer: "Udemy", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg" 
    },
    { 
      title: "Real Time Operating Systems", 
      issuer: "Udemy", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg" 
    }
  ];

  const skills = [
    "C / C++", "Java", "Python", "JavaScript", "React.js", "SQL & MongoDB",
    "Red Hat Linux", "Docker / Podman", "Bash Scripting", "Data Structures", "Pandas", "PyTorch"
  ];

  const experience = [
    {
      role: "B.Tech Computer Science Engineering",
      company: "SRM Institute of Science & Technology",
      date: "Aug 2023 - May 2027",
      desc: "Specializing in software engineering, OS, and algorithms. Maintaining a strong academic record while building full-stack projects."
    },
    {
      role: "Participant, Industry Experience Program",
      company: "Study Australia (Practera)",
      date: "Jan 2023 - Feb 2023",
      desc: "Participated in a global learning program, collaborating across cross-functional teams to deliver project requirements under strict deadlines."
    },
    {
      role: "Content Writer Intern",
      company: "NewsCanvass",
      date: "Jul 2022 - Aug 2022",
      desc: "Cultivated a versatile skill set including analytical thinking, adaptability, and clear communication in a fast-paced environment."
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed w-full z-50 top-0 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">HS.</a>
          <div className="hidden md:flex space-x-8 text-sm font-medium items-center">
            <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="hover:text-cyan-400 transition-colors cursor-pointer">Experience</a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-cyan-400 transition-colors cursor-pointer">Projects</a>
            <a href="#stats" onClick={(e) => scrollToSection(e, 'stats')} className="hover:text-cyan-400 transition-colors cursor-pointer">Stats</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="hover:text-cyan-400 transition-colors cursor-pointer">Contact</a>
            <a href="/resume.pdf" target="_blank" className="px-4 py-2 border border-cyan-500/50 text-cyan-400 rounded hover:bg-cyan-500/10 transition-all">Resume</a>
          </div>
        </div>
      </motion.nav>

{/* Hero Section */}
      <header className="container mx-auto px-6 pt-40 pb-20 lg:py-40 flex flex-col-reverse lg:flex-row items-center gap-12">
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="lg:w-3/5 space-y-6"
        >
          <motion.p variants={fadeInUp} className="text-cyan-400 font-mono tracking-wide flex items-center gap-2">
            <span className="h-px w-8 bg-cyan-400 inline-block"></span> Hi, my name is
          </motion.p>
          <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-lg">
            Harshit Shyamsukha.
          </motion.h1>
          <motion.h2 variants={fadeInUp} className="text-3xl lg:text-5xl font-bold text-slate-500">
            I build intelligent systems.
          </motion.h2>
          <motion.div variants={fadeInUp} className="max-w-xl text-lg text-slate-400 leading-relaxed pt-4 space-y-4">
            <p>
              I am a Software Developer with a strong focus on building clean, efficient code and a passion for open-source collaboration. 
              I love diving into modern DevOps practices, which led me to earn my Red Hat DO188 certification in OpenShift and Podman.
            </p>
            <p>
              Whether I'm pushing commits to GitHub or learning a new framework, I am driven by the process of solving complex problems through technology.
            </p>
          </motion.div>

          {/* NEW: Social Links in Hero */}
          <motion.div variants={fadeInUp} className="flex items-center gap-6 pt-4">
            <a href="https://github.com/Harshitshyamsukha" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300">
              <span className="sr-only">GitHub</span>
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>
            <a href="https://linkedin.com/in/harshit-shyamsukha-512254258/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </motion.div>
        </motion.div>
      

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="lg:w-2/5 flex justify-center perspective-1000"
        >
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse"></div>
          <img 
            src="profile.png" 
            alt="Harshit Shyamsukha" 
            onError={(e) => { 
            e.target.onerror = null; // Prevents infinite loops
            e.target.src = "https://ui-avatars.com/api/?name=Harshit+Shyamsukha&background=1e293b&color=38bdf8&size=400"; 
            }}
            className="relative rounded-2xl object-cover border-2 border-slate-800 shadow-2xl h-[300px] w-[300px] lg:h-[400px] lg:w-[400px] group-hover:scale-[1.02] group-hover:-rotate-2 transition-transform duration-500"
          />
          </div>
        </motion.div>
      </header>

      {/* Experience Section */}
      <motion.section 
        id="experience" 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        className="container mx-auto px-6 py-20 border-t border-slate-800/50"
      >
        <h3 className="text-2xl font-bold text-white mb-12 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xl">01.</span> Experience & Education
        </h3>
        <div className="max-w-3xl mx-auto border-l-2 border-slate-800 ml-4 md:ml-auto">
          {experience.map((exp, index) => (
            <div key={index} className="relative pl-8 mb-12 last:mb-0 group">
              <div className="absolute w-4 h-4 bg-slate-900 border-2 border-cyan-500 rounded-full -left-[9px] top-1 group-hover:bg-cyan-500 transition-colors shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
              <h4 className="text-xl font-bold text-white">{exp.role}</h4>
              <p className="text-cyan-400 font-mono text-sm mb-3">{exp.company} <span className="text-slate-500 ml-2">| {exp.date}</span></p>
              <p className="text-slate-400 text-sm leading-relaxed">{exp.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        className="container mx-auto px-6 py-20 border-t border-slate-800/50"
      >
        <h3 className="text-2xl font-bold text-white mb-12 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xl">02.</span> Featured Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div key={index} variants={fadeInUp} className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-xl p-8 hover:-translate-y-3 hover:border-cyan-500/50 hover:shadow-[0_15px_30px_-10px_rgba(6,182,212,0.2)] transition-all duration-300 flex flex-col h-full group">
              <div className="flex justify-between items-center mb-6">
                <svg className="w-10 h-10 text-cyan-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition">
                  <svg className="w-6 h-6 hover:scale-125 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </a>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition">{project.title}</h4>
              <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-3 mt-auto">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Certifications and Skills */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        className="container mx-auto px-6 py-20 border-t border-slate-800/50 grid grid-cols-1 lg:grid-cols-2 gap-16"
      >
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="text-cyan-400 font-mono text-xl">03.</span> Certifications
          </h3>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-5 p-4 bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-colors rounded-lg">
                {/* Custom Logo Display instead of Emojis */}
                <div className="w-14 h-14 flex-shrink-0 bg-white rounded flex items-center justify-center p-2 shadow-inner">
                  <img src={cert.logo} alt={`${cert.issuer} Logo`} className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm leading-snug">{cert.title}</h4>
                  <p className="text-cyan-400 font-mono text-xs mt-1">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="text-cyan-400 font-mono text-xl">04.</span> Core Skills
          </h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span 
                key={index} 
                whileHover={{ scale: 1.1, backgroundColor: "rgba(6, 182, 212, 0.1)", color: "#22d3ee" }}
                className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-full text-sm font-medium transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.section>

{/* GitHub Stats Section - Using Alternative APIs */}
      <motion.section 
        id="stats"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
        className="container mx-auto px-6 py-20 border-t border-slate-800/50"
      >
        <h3 className="text-2xl font-bold text-white mb-12 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xl">05.</span> GitHub Activity
        </h3>
        
        <div className="flex flex-col items-center gap-10 w-full">
          {/* GitHub Streak Card */}
          <a href="https://github.com/Harshitshyamsukha" target="_blank" rel="noreferrer" className="w-full max-w-[500px]">
            <img 
              src="https://github-readme-streak-stats.herokuapp.com/?user=Harshitshyamsukha&theme=radical&hide_border=true&background=0f172a" 
              alt="GitHub Streak" 
              className="w-full border border-slate-800 rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-1 transition-all duration-300"
            />
          </a>

          {/* GitHub Contribution Graph */}
          <a href="https://github.com/Harshitshyamsukha" target="_blank" rel="noreferrer" className="w-full max-w-[800px]">
            <div className="w-full bg-[#0f172a] border border-slate-800 rounded-xl p-4 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] hover:-translate-y-1 transition-all duration-300 flex justify-center">
              <img 
                src="https://ghchart.rshah.org/22d3ee/Harshitshyamsukha" 
                alt="Harshit's Github Contribution Graph" 
                className="w-full max-w-full"
              />
            </div>
          </a>
        </div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section 
        id="contact" 
        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
        className="container mx-auto px-6 py-32 border-t border-slate-800/50 text-center max-w-2xl"
      >
        <p className="text-cyan-400 font-mono mb-4">06. What's Next?</p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
        <p className="text-slate-400 mb-10 text-lg">
          I am currently looking for SDE Internship opportunities. Whether you have a question, an opportunity, or just want to talk about Linux systems and AI, my inbox is always open!
        </p>
        <a 
          href="mailto:harshitshyamsukha@gmail.com" 
          className="inline-block border border-cyan-500 text-cyan-400 px-10 py-4 rounded-md font-bold text-lg hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:-translate-y-1 transition-all duration-300"
        >
          Say Hello
        </a>
      {/* NEW: Social Links under Contact Button */}
        <div className="flex justify-center gap-8 mt-12">
          <a href="https://github.com/Harshitshyamsukha" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300">
            <span className="sr-only">GitHub</span>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
          </a>
          <a href="https://linkedin.com/in/harshit-shyamsukha-512254258/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300">
            <span className="sr-only">LinkedIn</span>
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        </div>
      </motion.section>

      <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-800/50">
        <p>Built with React, Tailwind & Framer Motion by Harshit Shyamsukha.</p>
      </footer>
    </div>
  );
}

export default App;