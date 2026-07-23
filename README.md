# 🐻‍❄️ 구도연 (Doyeon Koo) - Interactive Web Portfolio

[![Firebase Hosting](https://img.shields.io/badge/Deploy-Firebase_Hosting-FFCA28?style=flat-art&logo=firebase&logoColor=white)](https://doyeon-portfolio.web.app)
[![Vite](https://img.shields.io/badge/Build-Vite_8.1.5-646CFF?style=flat-art&logo=vite&logoColor=white)](https://vite.dev)
[![React](https://img.shields.io/badge/Framework-React_19-61DAFB?style=flat-art&logo=react&logoColor=black)](https://react.dev)

다재다능한 **제너럴리스트 PM & Full-Stack Developer 구도연**의 개인 포트폴리오 웹사이트 소스 코드 및 산출물 통합 저장소입니다.  
실시간 동작하는 반응형 웹 포트폴리오는 아래 링크에서 조작 및 확인하실 수 있습니다.

👉 **[실시간 웹 포트폴리오 바로가기](https://doyeon-portfolio.web.app/)**

---

## ✨ Key Features (주요 구현 스펙)

1. **💻 Interactive Java IDE Mockup Editor**
   - Hero 영역 우측에 맥북 스타일 다크 IDE 창을 구성하여 도연님의 아이덴티티와 핵심 역량을 정의하는 Java 클래스(`DoyeonKoo.java`) 타이핑 효과를 연출했습니다.
   - 처음부터 모든 코드를 치는 대신 주석과 클래스 뼈대 코드는 **즉시 렌더링(Static Boilerplate)**하고, 핵심 인스턴스 메소드(`pm.setNickname`, `pm.addSkills` 등) 4줄만 **실시간 한 자씩 타이핑(Dynamic Typing)**한 후 무결하게 멈추어 가독성과 몰입감을 조화시켰습니다.

2. **📥 Direct PDF Resume Downloader**
   - 이력서를 서류로 별도 보관하려는 인사담당자(HR)의 편의성을 극대화하기 위해, 메인 헤더의 `PDF 다운로드` 버튼 클릭 시 unmasked 원본 자격증 등록번호가 기재된 **제출용 2페이지 PDF 요약본 이력서**를 단번에 획득할 수 있도록 내장했습니다.

3. **🌱 Detailed 2026 Study Log (Obsidian Sync)**
   - 매일 배운 지식을 기록하고 아카이빙하는 **Obsidian Vault**의 속살을 입증하기 위해, 2026년 한 해 동안 축적한 Backend, Frontend & Product, DevOps & Infra, Data & AI의 핵심 학습 리포트를 반응형 4열 그리드 카드로 시각화했습니다.

4. **📱 100% Mobile Responsive Glassmorphism**
   - 창 크기가 좁아지거나 모바일 기기 접속 시에도 컨테이너 끝단에 콘텐츠가 달라붙지 않도록 **좌우 20px의 쾌적한 Gutter 패딩 여백**을 고수합니다.
   - 글래스모피즘(Glassmorphism) 기반 세련된 다크/글래스 UI가 데스크톱 뷰와 모바일 하단 탭 내비게이션 바 레이아웃으로 부드럽게 분기됩니다.

---

## 📂 Repository Layout (디렉토리 구조)

이 저장소는 면접관의 원활한 코드 검토와 산출물 보관을 위해 소스 코드와 최종 릴리즈 에셋을 단일 경로에 집중 관리합니다.

* **`구도연_포트폴리오.html`** : Vite Singlefile 컴파일러를 통해 리액트 컴포넌트와 CSS, JS 에셋을 1인치 단위로 결합한 **오프라인 소장용 단일 HTML 파일**입니다.
* **`구도연_포트폴리오_제출용.pdf`** : ReportLab 라이브러리를 통해 한글 폰트 매핑 및 2페이지 한계(2-Page Limit) 마진을 정교하게 제어해 낸 **인쇄용/제출용 PDF 이력서**입니다.
* **`src/`** : 포트폴리오 페이지 구성, 스크롤 애니메이션, 타이퍼 이펙트가 장착된 리액트 소스 디렉토리입니다.
* **`scratch/generate_pdf.py`** : 텍스트 데이터의 수정에 따라 PDF 파일을 무결하게 재컴파일하는 빌드 스크립트입니다.

---

## 🛠️ Tech Stack (기술 스택)

- **Frontend**: React 19, JavaScript, CSS (Custom Glassmorphism, Neon Aura Effect)
- **Tooling & Build**: Vite, `vite-plugin-singlefile` (에셋 인라인 컴파일러)
- **Deployment**: Firebase Hosting
- **PDF Generator**: Python (ReportLab Library)

---

## 💻 Local Run & Deployment (실행 및 배포)

### 로컬 개발 서버 구동
```bash
# 1. 의존성 패키지 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev
```

### 상용 배포 및 에셋 동기화
```bash
# 빌드 컴파일 및 Firebase Hosting 실시간 배포 동시 실행
npm run deploy
```
