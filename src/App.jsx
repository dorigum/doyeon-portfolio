import React, { useState, useEffect } from 'react';
import portfolioData from './data/portfolio-data.json';

const projectBriefs = {
  baseball: {
    problem: '복잡한 실시간 수비·경기 상태에서 최신 전술 정보를 일관되게 보여줘야 하는 문제',
    role: 'React·Spring AI 기반 인터랙션, 상태 흐름, AI 피드백 API 설계',
    outcome: '요청 취소와 fallback UX로 오래된 응답이 최신 화면을 덮는 문제를 방지'
  },
  zipt: {
    problem: '계약 전 필요한 여러 확인 절차와 AI 분석 대기 흐름이 분산된 문제',
    role: '전체 사용자 흐름·화면 구조, 지도·AI 브리핑 상태 관리 구현',
    outcome: '초기 JS 번들을 73.7% 줄이고 분석 단계의 로딩·오류 경험을 정리'
  },
  codemate: {
    problem: '마감 직전 동시 신청에서 정원 초과와 데이터 불일치가 생길 수 있는 문제',
    role: '신청 상태 흐름, 인증·권한, 테스트 가능한 백엔드 구조 설계',
    outcome: '비관적 락과 통합 테스트로 정원 초과 방지와 데이터 정합성 검증'
  },
  codetrip: {
    problem: '분산된 여행 정보와 외부 API 지연으로 의사결정 흐름이 끊기는 문제',
    role: '서버리스 전환, 외부 API·AI 응답 검증, 보안·배포 품질 설계',
    outcome: '캐시·stale fallback과 CI/E2E 검증으로 장애 영향과 반복 호출을 완화'
  },
  cafekiosk: {
    problem: '주문·포인트·통계 데이터를 일관되게 관리하고 추적해야 하는 문제',
    role: 'Layered Architecture, 트랜잭션, 예외 처리와 CSV 리포트 구현',
    outcome: '포인트 변동 이력과 매출 분석을 갖춘 확장 가능한 도메인 구조 확보'
  }
};

function App() {
  const { profile, skills, certifications, learningTopics, featuredProjects, timeline, studyLog } = portfolioData;
  const [activeSection, setActiveSection] = useState('home');
  const [showTopBtn, setShowTopBtn] = useState(false);

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
            <div className="hero-eyebrow">구도연 · FULL-STACK DEVELOPER · {profile.major}</div>
            <h1 className="hero-name">불편을 줄이는<br />운영 중심 개발자</h1>
            <h2 className="hero-title">사용자 경험 · 운영 안정성 · 지속 가능한 확장</h2>
            <p className="hero-desc">
              {profile.description}
            </p>
            <div className="hero-keywords" aria-label="핵심 역량">
              <span>사용자 흐름 설계</span><span>데이터 정합성</span><span>성능·비용 최적화</span><span>배포·운영</span>
            </div>
            <div className="social-links">
              <div className="hero-action-btns">
                <a href="#projects" className="social-btn primary">대표 프로젝트 보기 <span aria-hidden="true">↓</span></a>
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
              </div>
              <a href={`mailto:${profile.email}`} className="email-text-link">
                📧 {profile.email}
              </a>
            </div>
          </div>

          {/* Right Panel: Recruiter-facing impact summary */}
          <div className="hero-code-panel">
            <aside className="impact-panel" aria-label="개발 방식과 대표 성과">
              <p className="impact-panel-label">HOW I BUILD</p>
              <h2>문제를 이해하고,<br />안정적으로 개선합니다.</h2>
              <ol className="impact-steps">
                <li><span>01</span><div><strong>사용자·업무 흐름 파악</strong><p>불편과 정책·데이터 조건을 함께 정리합니다.</p></div></li>
                <li><span>02</span><div><strong>안전한 구조로 구현</strong><p>인증, 상태, 예외와 테스트를 설계합니다.</p></div></li>
                <li><span>03</span><div><strong>운영하며 지속 개선</strong><p>성능·비용·장애 영향을 측정하고 보완합니다.</p></div></li>
              </ol>
              <div className="impact-metrics">
                <div><strong>73.7%</strong><span>초기 JS 번들 감축</span></div>
                <div><strong>CI / E2E</strong><span>배포 품질 검증</span></div>
                <div><strong>Lock + Test</strong><span>동시성 정합성 검증</span></div>
              </div>
            </aside>
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
          
          <div className="topics-grid">
            {learningTopics.map((topic, index) => (
              <div key={index} className="topic-card">
                <h4 className="topic-card-title">
                  &gt; {topic.topic}
                </h4>
                <p className="topic-card-desc">
                  {topic.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Detailed 2026 Study Log */}
          <div className="study-log-section">
            <h3 className="study-log-title">
              <span className="study-log-emoji">🌱</span> 2026 Study Log (Obsidian Vault 데이터 동기화)
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
        <div className="certs-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="glass-card cert-card-standalone reveal-on-scroll">
              <div className="cert-card-header">
                <h3 className="cert-card-title">{cert.title}</h3>
                <span className="cert-card-issuer">{cert.issuer}</span>
              </div>
              <div className="cert-card-meta">
                <div className="cert-card-row">
                  <span>취득일자:</span>
                  <span className="cert-card-date">{cert.date}</span>
                </div>
                <div className="cert-card-row">
                  <span>등록번호:</span>
                  <span className="cert-card-serial">{cert.serial}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="container section-spacing">
        <p className="section-kicker">SELECTED WORK</p>
        <h2 className="section-title">문제와 결과로 설명하는 프로젝트</h2>
        <p className="section-intro">기술을 나열하기보다, 어떤 문제를 맡아 어떤 판단으로 개선했는지 보여드립니다.</p>
        <div className="projects-grid">
          {featuredProjects.map((project) => (
            <div key={project.id} className="glass-card project-card reveal-on-scroll">
              {/* Project Header */}
              <div className="project-header-container">
                <div className="project-header-top">
                  <span className="project-period">{project.period}</span>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>

                <div className="project-brief-grid">
                  <div><span>PROBLEM</span><p>{projectBriefs[project.id]?.problem}</p></div>
                  <div><span>MY ROLE</span><p>{projectBriefs[project.id]?.role}</p></div>
                  <div><span>OUTCOME</span><p>{projectBriefs[project.id]?.outcome}</p></div>
                </div>

                {/* Project Action Buttons */}
                <div className="project-actions-horizontal">
                  {project.links.service && (
                    <a href={project.links.service} target="_blank" rel="noopener noreferrer" className="project-btn accent">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                  {project.links.repo_team && (
                    <a href={project.links.repo_team} target="_blank" rel="noopener noreferrer" className="project-btn">
                      GitHub (2인 프로젝트)
                    </a>
                  )}
                  {project.links.repo_firebase && (
                    <a href={project.links.repo_firebase} target="_blank" rel="noopener noreferrer" className="project-btn">
                      GitHub (1인 Firebase)
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

                {/* Tech tags */}
                <div className="project-tech">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <details className="project-details">
                <summary>구현 내용과 트러블슈팅 전체 보기</summary>
                <div className="project-body-content">
                <div className="contributions-list">
                  <h4>💡 담당 업무 및 구현 기여점</h4>
                  <ul>
                    {project.contributions.map((item, index) => (
                      <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
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
                      <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                    ))}
                  </ul>
                </div>
                </div>
              </details>
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
            <span className="footer-line">© 2026 Doyeon (Polar bear 빼꼼🐻‍❄️)</span>
            <span className="footer-line">Built with <span className="footer-heart">♥</span> using React & Vite. All rights reserved.</span>
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
