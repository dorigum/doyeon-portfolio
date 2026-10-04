import React, { useState, useEffect } from 'react';
import portfolioData from './data/portfolio-data.json';

const projectHighlights = {
  baseball: {
    category: "Real-time AI Simulation & Architecture",
    problem: "주자 상황이나 볼카운트 변경 시 비동기 AI 분석 응답의 지연으로 최신 화면 데이터가 왜곡되는 레이스 컨디션 발생",
    dataFlow: "KBO 10개 구단 라인업 및 13분할 투구 히트맵 데이터 구조화, 500ms 디바운스 및 SVG 야구장 9방위 드래그 시프트",
    reliability: "AbortController 요청 취소 메커니즘으로 화면 동기화 정합성 100% 보장 및 로컬 룰엔진 Fallback UX 구축",
    metrics: [
      { label: "화면-데이터 정합성", val: "100%" },
      { label: "비동기 디바운스", val: "500ms" },
      { label: "예외 복원력", val: "Local Fallback" }
    ]
  },
  zipt: {
    category: "Full-Stack Web & Performance Optimization",
    problem: "전월세 계약 전 필수적인 권리 분석(등기부등본, 계약서, 보증보험) 절차가 파편화되어 사용자의 직관적 위험 파악 곤란",
    dataFlow: "계약 단계별 사용자 여정 UI 및 등기부·계약서 비동기 분석 파이프라인, 카카오맵 실시간 POI와 Gemini AI 인프라 브리핑 동기화",
    reliability: "React.lazy 지연 로딩으로 초기 번들 73.7% 감축(1,243KB → 327KB), 이미지 WebP 99.6% 최적화, 5단계 AI Model Fallback",
    metrics: [
      { label: "초기 JS 번들 감축", val: "73.7%" },
      { label: "이미지 용량 최적화", val: "99.6%" },
      { label: "AI 모델 안정성", val: "5단계 Fallback" }
    ]
  },
  codemate: {
    category: "Concurrency Control & Backend Architecture",
    problem: "선착순 스터디 모집 마감 직전 다수 사용자의 동시 신청 트래픽 발생 시 정원 초과 및 데이터 불일치 위험",
    dataFlow: "참여 신청-승인-거절 워크플로우 상태 머신 설계, Refresh Token Rotation(RTR) 및 Redis 블랙리스트 보안 체계",
    reliability: "DB 비관적 락(Pessimistic Lock) 적용 및 Testcontainers를 통한 실제 MySQL 동시성 통합 테스트로 0건의 초과 발생 보장",
    metrics: [
      { label: "동시성 정원 초과", val: "0건 방지" },
      { label: "세션 보안", val: "RTR + Redis" },
      { label: "테스트 무결성", val: "Testcontainers" }
    ]
  },
  codetrip: {
    category: "Serverless Migration & Resilient Pipeline",
    problem: "한국관광공사 TourAPI 대용량 조회의 429 레이트 리밋/지연과 비정형 AI 생성 데이터의 파싱 오류로 인한 서비스 중단 위험",
    dataFlow: "AWS/Express 구조를 Firebase Serverless로 전환, 관광공사 정형 데이터와 AI 추천 데이터를 분리 검증 저장하는 파이프라인",
    reliability: "메모리·LocalStorage·RTDB 3단계 캐시와 Stale Fallback 구축, Playwright E2E 자동화 테스트로 공개 라우팅 및 배포 품질 검증",
    metrics: [
      { label: "다층 캐싱 계층", val: "3-Tier Cache" },
      { label: "배포 품질 검증", val: "Playwright E2E" },
      { label: "데이터 신뢰성", val: "Server-side JSON 검증" }
    ]
  },
  cafekiosk: {
    category: "Layered Architecture & Domain Modeling",
    problem: "콘솔 환경에서 주문, 회원 포인트 적립/차감, 일자별 매출 통계 처리 시 데이터 왜곡 없는 견고한 비즈니스 로직 필요",
    dataFlow: "MVC Layered Architecture 기반의 도메인-서비스-리포지토리 계층 분리 및 트랜잭션 단위 정합성 유지",
    reliability: "포인트 변동 이력(PointHistory) 추적성 확보 및 UTF-8 CSV 통계 리포트 생성, 객체지향 설계(SOLID)로 유지보수성 극대화",
    metrics: [
      { label: "아키텍처 패턴", val: "Layered MVC" },
      { label: "데이터 추적성", val: "Point History" },
      { label: "비즈니스 리포트", val: "CSV 통계 자동화" }
    ]
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
      {/* Refined Engineering Background Grid Pattern */}
      <div className="bg-engineering-grid" aria-hidden="true">
        <div className="grid-overlay"></div>
        <div className="grid-ambient-gradient"></div>
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
            <div className="hero-eyebrow">
              <span className="eyebrow-pill">ENGINEERING PROFILE</span>
              구도연 · INDUSTRIAL ENGINEERING & DATA-DRIVEN FULL-STACK
            </div>
            <h1 className="hero-name">
              사용자와 현장의 흐름을 읽고,<br />
              <span className="hero-headline-highlight">신뢰할 수 있는 시스템</span>으로 해결합니다
            </h1>
            <p className="hero-subtitle">
              산업공학(IE)과 데이터 분석(ADsP, SQLD) 기반으로 사용자 여정, 업무 프로세스, 데이터 흐름을 입체적으로 연결합니다.
            </p>
            <p className="hero-desc">
              {profile.description}
            </p>
            <div className="hero-keywords" aria-label="핵심 역량">
              <span>🎯 현장 프로세스 최적화</span>
              <span>📊 데이터 정합성 & 모델링</span>
              <span>🛡️ 동시성 제어 & 복원력</span>
              <span>⚡ 성능 최적화 & 테스트 검증</span>
            </div>
            <div className="social-links">
              <div className="hero-action-btns">
                <a href="#projects" className="social-btn primary">대표 프로젝트 보기 <span aria-hidden="true">↓</span></a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-btn secondary">
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

          {/* Right Panel: 3-Pillar Engineering Lens */}
          <div className="hero-code-panel">
            <aside className="engineering-lens-card" aria-label="산업공학 기반 문제 해결 3단계 관점">
              <div className="lens-card-header">
                <div className="lens-badge">
                  <span className="lens-badge-dot"></span>
                  HOW I SOLVE PROBLEMS
                </div>
                <h2 className="lens-card-title">문제를 시스템으로 풀어내는 3단계 관점</h2>
                <p className="lens-card-subtitle">산업공학적 프로세스 분석에서 신뢰성 있는 아키텍처 구축까지</p>
              </div>

              <div className="lens-layers">
                {/* Layer 1: Process */}
                <div className="lens-layer-item">
                  <div className="layer-marker">
                    <span className="layer-num">01</span>
                    <span className="layer-tag">PROCESS</span>
                  </div>
                  <div className="layer-body">
                    <h3 className="layer-title">사용자 & 현장 워크플로우 분석</h3>
                    <p className="layer-desc">현장의 불편과 병목 구간을 프로세스 관점에서 진단하고 직관적인 사용자 여정으로 재설계합니다.</p>
                    <div className="layer-chips">
                      <span>워크플로우 최적화</span>
                      <span>병목 제거</span>
                      <span>직관적 UX</span>
                    </div>
                  </div>
                </div>

                {/* Layer 2: Data Flow */}
                <div className="lens-layer-item">
                  <div className="layer-marker">
                    <span className="layer-num">02</span>
                    <span className="layer-tag">DATA FLOW</span>
                  </div>
                  <div className="layer-body">
                    <h3 className="layer-title">데이터 흐름 & 정합성 보장</h3>
                    <p className="layer-desc">도메인 모델링과 상태 머신을 바탕으로 데이터 왜곡, 동시성 충돌, 비동기 Race Condition을 선제 차단합니다.</p>
                    <div className="layer-chips">
                      <span>동시성 비관적 락</span>
                      <span>비동기 동기화</span>
                      <span>데이터 무결성</span>
                    </div>
                  </div>
                </div>

                {/* Layer 3: System */}
                <div className="lens-layer-item">
                  <div className="layer-marker">
                    <span className="layer-num">03</span>
                    <span className="layer-tag">RELIABLE SYSTEM</span>
                  </div>
                  <div className="layer-body">
                    <h3 className="layer-title">신뢰할 수 있는 시스템 & 운영 검증</h3>
                    <p className="layer-desc">API 장애 대비 Fallback 구축, 자원 최적화, 자동화된 CI/E2E 테스트로 지속 가능한 운영을 담보합니다.</p>
                    <div className="layer-chips">
                      <span>73.7% 번들 감축</span>
                      <span>5단계 Fallback</span>
                      <span>Playwright E2E</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics Strip */}
              <div className="lens-metrics-strip">
                <div className="lens-metric-cell">
                  <strong className="metric-val">73.7%</strong>
                  <span className="metric-lbl">초기 번들 감축</span>
                </div>
                <div className="lens-metric-cell">
                  <strong className="metric-val">0건</strong>
                  <span className="metric-lbl">동시성 초과 방지</span>
                </div>
                <div className="lens-metric-cell">
                  <strong className="metric-val">100%</strong>
                  <span className="metric-lbl">화면 동기화 보장</span>
                </div>
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

                {/* 3-Pillar Problem-Solving Architecture Card */}
                {projectHighlights[project.id] && (
                  <div className="project-lens-grid">
                    <div className="lens-col problem">
                      <div className="lens-col-header">
                        <span className="lens-dot"></span>
                        <span className="lens-col-label">01. 현장 & 사용자 문제 (PROBLEM)</span>
                      </div>
                      <p className="lens-col-text">{projectHighlights[project.id].problem}</p>
                    </div>
                    <div className="lens-col dataflow">
                      <div className="lens-col-header">
                        <span className="lens-dot"></span>
                        <span className="lens-col-label">02. 데이터 흐름 & 아키텍처 (DATA FLOW)</span>
                      </div>
                      <p className="lens-col-text">{projectHighlights[project.id].dataFlow}</p>
                    </div>
                    <div className="lens-col reliability">
                      <div className="lens-col-header">
                        <span className="lens-dot"></span>
                        <span className="lens-col-label">03. 시스템 신뢰성 & 검증 (RELIABILITY)</span>
                      </div>
                      <p className="lens-col-text">{projectHighlights[project.id].reliability}</p>
                    </div>
                  </div>
                )}

                {/* Key Metrics Chips */}
                {projectHighlights[project.id]?.metrics && (
                  <div className="project-metrics-strip">
                    {projectHighlights[project.id].metrics.map((m, idx) => (
                      <div key={idx} className="project-metric-badge">
                        <span className="badge-label">{m.label}</span>
                        <span className="badge-value">{m.val}</span>
                      </div>
                    ))}
                  </div>
                )}

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
