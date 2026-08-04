import React, { useState, useEffect } from 'react';
import portfolioData from './data/portfolio-data.json';

function App() {
  const { profile, skills, certifications, learningTopics, featuredProjects, timeline, studyLog } = portfolioData;
  const [activeSection, setActiveSection] = useState('home');
  const [showTopBtn, setShowTopBtn] = useState(false);

  // 1. Code Typer Logic
  const codeLines = [
    { isStatic: true, text: '// 🐻‍❄️ Polar Bear 빼꼼 Doyeon Koo', tokens: [{text: '// 🐻‍❄️ Polar Bear 빼꼼 Doyeon Koo', color: 'var(--token-comment)'}] },
    { isStatic: true, text: 'public class DoyeonKoo {', tokens: [{text: 'public class ', color: 'var(--token-keyword)'}, {text: 'DoyeonKoo', color: 'var(--token-class)'}, {text: ' {', color: 'var(--text-primary)'}] },
    { isStatic: true, text: '    public static void main(String[] args) {', tokens: [{text: '    public static void ', color: 'var(--token-keyword)'}, {text: 'main', color: 'var(--token-method)'}, {text: '(String[] args) {', color: 'var(--text-primary)'}] },
    { isStatic: true, text: '        Developer pm = new Developer("구도연");', tokens: [{text: '        Developer', color: 'var(--token-class)'}, {text: ' pm = ', color: 'var(--text-primary)'}, {text: 'new ', color: 'var(--token-keyword)'}, {text: 'Developer', color: 'var(--token-class)'}, {text: '(', color: 'var(--text-primary)'}, {text: '"구도연"', color: 'var(--token-string)'}, {text: ');', color: 'var(--text-primary)'}] },
    { isStatic: false, text: '        pm.setNickname("Polar Bear 빼꼼");', tokens: [{text: '        pm.', color: 'var(--text-primary)'}, {text: 'setNickname', color: 'var(--token-method)'}, {text: '(', color: 'var(--text-primary)'}, {text: '"Polar Bear 빼꼼"', color: 'var(--token-string)'}, {text: ');', color: 'var(--text-primary)'}] },
    { isStatic: false, text: '        pm.addSkills("Spring Boot", "React", "AI RAG");', tokens: [{text: '        pm.', color: 'var(--text-primary)'}, {text: 'addSkills', color: 'var(--token-method)'}, {text: '(', color: 'var(--text-primary)'}, {text: '"Spring Boot", "React", "AI RAG"', color: 'var(--token-string)'}, {text: ');', color: 'var(--text-primary)'}] },
    { isStatic: false, text: '        pm.setVision("Generalist PM who codes 🐻‍❄️");', tokens: [{text: '        pm.', color: 'var(--text-primary)'}, {text: 'setVision', color: 'var(--token-method)'}, {text: '(', color: 'var(--text-primary)'}, {text: '"Generalist PM who codes 🐻‍❄️"', color: 'var(--token-string)'}, {text: ');', color: 'var(--text-primary)'}] },
    { isStatic: false, text: '        pm.runDailyCommit();', tokens: [{text: '        pm.', color: 'var(--text-primary)'}, {text: 'runDailyCommit', color: 'var(--token-method)'}, {text: '();', color: 'var(--text-primary)'}] },
    { isStatic: true, text: '    }', tokens: [{text: '    }', color: 'var(--text-primary)'}] },
    { isStatic: true, text: '}', tokens: [{text: '}', color: 'var(--text-primary)'}] }
  ];

  // Calculate total characters of dynamic lines to type
  const totalLength = codeLines.filter(line => !line.isStatic).reduce((acc, line) => acc + line.text.length, 0);
  const [typeProgress, setTypeProgress] = useState(0);

  useEffect(() => {
    let timer;
    const tick = () => {
      setTypeProgress((prev) => {
        if (prev >= totalLength) {
          // Stay typed, do not reset loop
          return prev;
        }
        // Random typing speed variation
        const nextTick = Math.min(prev + 1, totalLength);
        timer = setTimeout(tick, Math.random() * 30 + 15);
        return nextTick;
      });
    };

    timer = setTimeout(tick, 1200);
    return () => clearTimeout(timer);
  }, [totalLength]);

  // Helper to render code tokens up to current typing progress
  const renderTypedCode = () => {
    let dynamicCharCounter = 0;
    
    return codeLines.map((line, lineIdx) => {
      // 1. Static lines: always render fully
      if (line.isStatic) {
        return (
          <div key={lineIdx} className="code-line">
            <span className="line-num">{lineIdx + 1}</span>
            <span className="line-content">
              {line.tokens.map((token, tokIdx) => (
                <span key={tokIdx} style={{ color: token.color }}>
                  {token.text}
                </span>
              ))}
            </span>
          </div>
        );
      }

      // 2. Dynamic lines: render dynamically based on typing progress
      const lineProgress = Math.max(0, typeProgress - dynamicCharCounter);
      const prevCounter = dynamicCharCounter;
      dynamicCharCounter += line.text.length;

      if (lineProgress <= 0 && typeProgress < prevCounter) {
        return null;
      }

      let renderedLength = 0;
      return (
        <div key={lineIdx} className="code-line">
          <span className="line-num">{lineIdx + 1}</span>
          <span className="line-content">
            {line.tokens.map((token, tokIdx) => {
              const tokenProgress = Math.max(0, lineProgress - renderedLength);
              renderedLength += token.text.length;

              if (tokenProgress <= 0) return null;
              
              const textToRender = token.text.substring(0, tokenProgress);
              return (
                <span key={tokIdx} style={{ color: token.color }}>
                  {textToRender}
                </span>
              );
            })}
            {typeProgress >= prevCounter && typeProgress < dynamicCharCounter && (
              <span className="code-cursor">|</span>
            )}
          </span>
        </div>
      );
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      // 1. Active Section Navigation
      const sections = ['home', 'skills', 'habits', 'certifications', 'projects', 'timeline'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }

      // 2. Show/Hide Back to Top Button
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animation (Scroll Reveal)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Background Light Glows */}
      <div className="bg-glows">
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
      </div>

      {/* Header / Nav */}
      <header>
        <div className="container nav-container">
          <a href="#home" className="logo">
            <span>&lt;</span>Doyeon 🐻‍❄️ <span>/&gt;</span>
          </a>
          <nav className="nav-links">
            <a 
              href="#home" 
              className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            >
              Home
            </a>
            <a 
              href="#skills" 
              className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}
            >
              Skills
            </a>
            <a 
              href="#habits" 
              className={`nav-link ${activeSection === 'habits' ? 'active' : ''}`}
            >
              Learning & Habits
            </a>
            <a
              href="#certifications"
              className={`nav-link ${activeSection === 'certifications' ? 'active' : ''}`}
            >
              Certifications
            </a>
            <a 
              href="#projects" 
              className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}
            >
              Featured Projects
            </a>
            <a 
              href="#timeline" 
              className={`nav-link ${activeSection === 'timeline' ? 'active' : ''}`}
            >
              Experience
            </a>
          </nav>
        </div>
      </header>

      {/* Hero / Profile Section */}
      <section id="home" className="container hero-section">
        <div className="hero-grid">
          {/* Left Panel: Introduction Text */}
          <div className="hero-content">
            <div className="mbti-badge">{profile.mbti} • {profile.major}</div>
            <h1 className="hero-name">{profile.name}</h1>
            <h2 className="hero-title">
              다재다능한 <span className="gradient-text-anim">제너럴리스트 PM</span> & <span className="gradient-text-anim">Full-Stack Developer</span>
            </h2>
            <p className="hero-desc">
              하고 싶은 것도, 좋아하는 것도 많은 <span className="gradient-text-anim">다재다능 제너럴리스트 PM</span>을 꿈꾸고 있어요.<br />
              <span className="gradient-text-anim">사용자의 흐름</span>을 먼저 생각하고, 직접 만들고 고치고 배포하면서 배운 것을 차곡차곡 기록합니다 🚀
            </p>
            <div className="social-links">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-btn primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a 
                href="/구도연_포트폴리오_제출용.pdf" 
                download="구도연_포트폴리오_제출용.pdf" 
                className="social-btn secondary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                PDF 다운로드
              </a>
              <a href={`mailto:${profile.email}`} className="email-text-link">
                📧 {profile.email}
              </a>
            </div>
          </div>

          {/* Right Panel: Interactive Code typing Animation */}
          <div className="hero-code-panel">
            <div className="mockup-editor">
              <div className="editor-header">
                <span className="dot dot-close"></span>
                <span className="dot dot-minimize"></span>
                <span className="dot dot-maximize"></span>
                <span className="editor-tab">DoyeonKoo.java</span>
              </div>
              <div className="editor-body">
                {renderTypedCode()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="container section-spacing">
        <h2 className="section-title">Tech Stack</h2>
        <div className="skills-grid">
          <div className="glass-card skills-card reveal-on-scroll">
            <h3>Backend & Server</h3>
            <div className="skill-badges">
              {skills.backend.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
          <div className="glass-card skills-card reveal-on-scroll">
            <h3>Database & Cloud</h3>
            <div className="skill-badges">
              {skills.database.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
          <div className="glass-card skills-card reveal-on-scroll">
            <h3>Frontend Development</h3>
            <div className="skill-badges">
              {skills.frontend.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
          <div className="glass-card skills-card reveal-on-scroll">
            <h3>DevOps & Tools</h3>
            <div className="skill-badges">
              {skills.devops.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
          <div className="glass-card skills-card reveal-on-scroll">
            <h3>AI & Data Analytics</h3>
            <div className="skill-badges">
              {skills.ai_data.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
          <div className="glass-card skills-card reveal-on-scroll">
            <h3>Collaboration & Tools</h3>
            <div className="skill-badges">
              {skills.collaboration && skills.collaboration.map((skill, index) => (
                <span key={index} className="skill-badge">{skill}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning & Habits Section */}
      <section id="habits" className="container section-spacing">
        <h2 className="section-title">Continuous Learning & Habits</h2>
        <div className="glass-card habits-container reveal-on-scroll habits-padding">
          <div className="habit-header">
            <span className="habit-icon">📝</span>
            <div className="habit-meta">
              <h3>지속 가능한 성장 루틴: Obsidian Vault & 일일 커밋</h3>
              <p className="habit-desc">{profile.learningHabit}</p>
            </div>
          </div>
          
          <div className="topics-grid" style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {learningTopics.map((topic, index) => (
              <div key={index} className="topic-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: 'var(--glow-blue)', fontFamily: 'var(--font-mono)', fontSize: '1rem', marginBottom: '8px' }}>
                  &gt; {topic.topic}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                  {topic.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Detailed 2026 Study Log */}
          <div className="study-log-section" style={{ marginTop: '50px', borderTop: '1px solid var(--glass-border)', paddingTop: '40px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
              <span style={{ color: 'var(--glow-blue)' }}>🌱</span> 2026 Study Log (Obsidian Vault 데이터 동기화)
            </h3>
            <div className="study-log-grid">
              <div className="study-log-card">
                <h4>Backend</h4>
                <ul>
                  {studyLog.backend.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="study-log-card">
                <h4>Frontend & Product</h4>
                <ul>
                  {studyLog.frontend.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="study-log-card">
                <h4>DevOps & Infra</h4>
                <ul>
                  {studyLog.devops.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="study-log-card">
                <h4>Data & AI</h4>
                <ul>
                  {studyLog.ai_data.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Licenses & Certifications Section (Separated to the bottom) */}
      <section id="certifications" className="container section-spacing">
        <h2 className="section-title">Licenses & Certifications</h2>
        <div className="certs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {certifications.map((cert, index) => (
            <div key={index} className="glass-card cert-card-standalone reveal-on-scroll" style={{ padding: '24px', borderLeft: '3px solid var(--glow-purple)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{cert.title}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{cert.issuer}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid rgba(15,23,42,0.04)', paddingTop: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>취득일자:</span>
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{cert.date}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>등록번호:</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>{cert.serial}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="container section-spacing">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {featuredProjects.map((project) => (
            <div key={project.id} className="glass-card project-card reveal-on-scroll">
              {/* Project Header: Title and Meta on left, buttons on right */}
              <div className="project-header-container">
                <div className="project-title-area">
                  <div className="project-meta">
                    <span className="project-period">{project.period}</span>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                </div>
                
                <div className="project-actions-horizontal">
                  {project.links.service && (
                    <a href={project.links.service} target="_blank" rel="noopener noreferrer" className="project-btn accent">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                      Live Demo
                    </a>
                  )}
                  {project.links.repo && (
                    <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="project-btn">
                      GitHub 저장소
                    </a>
                  )}
                  {project.links.frontend && (
                    <a href={project.links.frontend} target="_blank" rel="noopener noreferrer" className="project-btn">
                      Frontend Code
                    </a>
                  )}
                  {project.links.backend && (
                    <a href={project.links.backend} target="_blank" rel="noopener noreferrer" className="project-btn">
                      Backend Code
                    </a>
                  )}
                </div>
              </div>

              {/* Tech tags */}
              <div className="project-tech">
                {project.techStack.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>

              {/* Details (Full Width) */}
              <div className="project-body-content">
                <div className="contributions-list">
                  <h4>💡 담당 업무 및 구현 기여점</h4>
                  <ul>
                    {project.contributions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                {project.troubleshooting && project.troubleshooting.length > 0 && (
                  <div className="troubleshooting-box">
                    <h4>🛠️ Key Troubleshooting</h4>
                    <ul>
                      {project.troubleshooting.map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
                      ))}
                    </ul>
                  </div>
                )}

                <div className="learnings-box">
                  <h4>🧠 프로젝트 성과 및 배운 점</h4>
                  <ul>
                    {project.learnings.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience / Timeline Section */}
      <section id="timeline" className="container section-spacing">
        <h2 className="section-title">Experience & Projects Archive</h2>
        <div className="timeline-container">
          <div className="timeline-line"></div>
          {timeline.map((item, index) => (
            <div key={index} className="timeline-item reveal-on-scroll">
              <div className="timeline-dot"></div>
              <div className="glass-card timeline-content">
                <div className="timeline-header">
                  <span className="timeline-category">{item.category}</span>
                  <span className="timeline-date">{item.date}</span>
                </div>
                <h3 className="timeline-title">{item.title}</h3>
                <p className="timeline-desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p className="footer-text">
            © 2026 Doyeon 🐻‍❄️. Built with <span className="footer-heart">♥</span> using React & Vite. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Mobile Floating Navigation Bar */}
      <nav className="mobile-nav">
        <a href="#home" className={`mobile-nav-item ${activeSection === 'home' ? 'active' : ''}`}>
          <span className="mobile-nav-icon">🏠</span>
          <span>Home</span>
        </a>
        <a href="#skills" className={`mobile-nav-item ${activeSection === 'skills' ? 'active' : ''}`}>
          <span className="mobile-nav-icon">🛠️</span>
          <span>Skills</span>
        </a>
        <a href="#habits" className={`mobile-nav-item ${activeSection === 'habits' ? 'active' : ''}`}>
          <span className="mobile-nav-icon">📝</span>
          <span>Habits</span>
        </a>
        <a href="#certifications" className={`mobile-nav-item ${activeSection === 'certifications' ? 'active' : ''}`}>
          <span className="mobile-nav-icon">🎓</span>
          <span>Certs</span>
        </a>
        <a href="#projects" className={`mobile-nav-item ${activeSection === 'projects' ? 'active' : ''}`}>
          <span className="mobile-nav-icon">💻</span>
          <span>Projects</span>
        </a>
        <a href="#timeline" className={`mobile-nav-item ${activeSection === 'timeline' ? 'active' : ''}`}>
          <span className="mobile-nav-icon">📅</span>
          <span>Timeline</span>
        </a>
      </nav>

      {/* Back to Top Button */}
      <button 
        onClick={scrollToTop} 
        className={`back-to-top ${showTopBtn ? 'visible' : ''}`}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}

export default App;
