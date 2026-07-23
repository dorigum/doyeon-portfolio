import os
from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# 1. 한글 폰트 등록 (Windows의 맑은 고딕 사용)
font_path = r"C:\Windows\Fonts\malgun.ttf"
font_bold_path = r"C:\Windows\Fonts\malgunbd.ttf"

if not os.path.exists(font_path):
    # 폴백으로 바탕화면이나 다른 기본 경로 맑은 고딕 탐색
    font_path = "malgun.ttf"
    font_bold_path = "malgunbd.ttf"

try:
    pdfmetrics.registerFont(TTFont("MalgunGothic", font_path))
    pdfmetrics.registerFont(TTFont("MalgunGothic-Bold", font_bold_path))
    print("Fonts registered successfully.")
except Exception as e:
    print(f"Font registration failed: {e}. Falling back to default.")

# 2. PDF 생성 설정
project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pdf_output_dir = os.path.join(project_root, "output", "pdf")
os.makedirs(pdf_output_dir, exist_ok=True)
pdf_output_path = os.path.join(pdf_output_dir, "구도연_포트폴리오_제출용.pdf")
doc = SimpleDocTemplate(
    pdf_output_path,
    pagesize=A4,
    rightMargin=40,
    leftMargin=40,
    topMargin=40,
    bottomMargin=40
)

styles = getSampleStyleSheet()

# 커스텀 스타일 정의
normal_style = ParagraphStyle(
    'NormalKo',
    fontName='MalgunGothic',
    fontSize=9,
    leading=14,
    textColor=colors.HexColor("#1e293b")
)

bold_style = ParagraphStyle(
    'BoldKo',
    fontName='MalgunGothic-Bold',
    fontSize=9,
    leading=14,
    textColor=colors.HexColor("#0f172a")
)

title_style = ParagraphStyle(
    'TitleKo',
    fontName='MalgunGothic-Bold',
    fontSize=22,
    leading=28,
    textColor=colors.HexColor("#0f172a"),
    alignment=0 # Left aligned
)

subtitle_style = ParagraphStyle(
    'SubTitleKo',
    fontName='MalgunGothic',
    fontSize=12,
    leading=16,
    textColor=colors.HexColor("#64748b")
)

section_title_style = ParagraphStyle(
    'SectionTitleKo',
    fontName='MalgunGothic-Bold',
    fontSize=14,
    leading=18,
    textColor=colors.HexColor("#3b82f6"), # 브랜드 블루
    spaceBefore=10,
    spaceAfter=6,
    keepWithNext=True
)

project_title_style = ParagraphStyle(
    'ProjectTitleKo',
    fontName='MalgunGothic-Bold',
    fontSize=11,
    leading=15,
    textColor=colors.HexColor("#1e3a8a"),
    spaceBefore=6,
    spaceAfter=4,
    keepWithNext=True
)

bullet_style = ParagraphStyle(
    'BulletKo',
    fontName='MalgunGothic',
    fontSize=8.5,
    leading=13,
    textColor=colors.HexColor("#334155"),
    leftIndent=12,
    firstLineIndent=-12
)

# 3. PDF 본문 빌딩
story = []

# --- Page 1: Profile & Skills & Certifications ---
# 타이틀 & 헤더
story.append(Paragraph("구도연 | 포트폴리오", title_style))
story.append(Spacer(1, 4))
story.append(Paragraph("다재다능한 제너럴리스트 PM & Full-Stack Developer", subtitle_style))
story.append(Spacer(1, 12))

# 하이브리드 링크 안내 박스
link_box_data = [
    [
        Paragraph(
            "🚀 <b>인터랙티브 포트폴리오 안내</b><br/>"
            "동봉된 <b>[구도연_포트폴리오.html]</b> 파일을 실행하시거나 온라인 링크를 통해 실시간 웹 버전을 조작하실 수 있습니다.<br/>"
            "웹 포트폴리오: <font color='#2563eb'><u>https://doyeon-portfolio.web.app</u></font> | 이메일: kkamang03@gmail.com",
            ParagraphStyle('LinkBox', parent=normal_style, fontSize=9.5, leading=15, textColor=colors.HexColor("#1e3a8a"))
        )
    ]
]
t_link = Table(link_box_data, colWidths=[515])
t_link.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#eff6ff")),
    ('PADDING', (0,0), (-1,-1), 10),
    ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#bfdbfe")),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
]))
story.append(t_link)
story.append(Spacer(1, 15))

# 1. 소개 (About Me)
story.append(Paragraph("About Me", section_title_style))
about_text = (
    "경영정보학과 산업공학을 전공하며 비즈니스 흐름과 시스템적 구조화 역량을 쌓았습니다.<br/>"
    "사용자의 흐름을 우선시하고 기획부터 백엔드 개발, 클라이언트 렌더링, 인프라 배포까지 아우르는 <b>제너럴리스트 PM</b>을 지향합니다.<br/>"
    "매일 학습한 내용을 Obsidian Vault에 기록하고 일일 커밋을 통해 지식을 다지는 견고한 성장 루틴을 유지하고 있습니다."
)
story.append(Paragraph(about_text, normal_style))
story.append(Spacer(1, 12))

# 2. 기술 스택 (Tech Stack)
story.append(Paragraph("Tech Stack", section_title_style))
skills_data = [
    [Paragraph("<b>Backend & Server</b>", bold_style), Paragraph("Java, Spring, Spring Boot, Spring Security, JPA, Node.js, Express, REST API, JWT, OAuth2, Flyway", normal_style)],
    [Paragraph("<b>Database & Cloud</b>", bold_style), Paragraph("MySQL, Oracle, Redis, PostgreSQL, pgvector (Vector DB), Firebase Realtime DB", normal_style)],
    [Paragraph("<b>Frontend & UI</b>", bold_style), Paragraph("JavaScript, React, Vite, React Router, Zustand, TanStack Query, Axios, Tailwind CSS, SCSS", normal_style)],
    [Paragraph("<b>DevOps & Tools</b>", bold_style), Paragraph("Git, GitHub Actions, Docker, Docker Compose, AWS (EC2, S3, CloudFront, Route53), Nginx, Swagger, Jenkins, JUnit5, Testcontainers", normal_style)],
    [Paragraph("<b>AI & Data</b>", bold_style), Paragraph("Spring AI, Gemini API, AWS Bedrock, OCR, Python, Pandas, RAG", normal_style)],
    [Paragraph("<b>Collaboration</b>", bold_style), Paragraph("Notion, Discord, Obsidian", normal_style)],
]
t_skills = Table(skills_data, colWidths=[130, 385])
t_skills.setStyle(TableStyle([
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
    ('BACKGROUND', (0,0), (0,-1), colors.HexColor("#f8fafc")),
    ('PADDING', (0,0), (-1,-1), 5),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
]))
story.append(t_skills)
story.append(Spacer(1, 10))

# 3. 자격증 (Licenses & Certifications)
story.append(Paragraph("Licenses & Certifications", section_title_style))
certs_data = [
    [Paragraph("<b>자격증명</b>", bold_style), Paragraph("<b>발급기관</b>", bold_style), Paragraph("<b>취득일자</b>", bold_style), Paragraph("<b>등록번호</b>", bold_style)],
    [Paragraph("정보처리기사", normal_style), Paragraph("한국산업인력공단", normal_style), Paragraph("2022.06.17", normal_style), Paragraph("22201100825X", normal_style)],
    [Paragraph("ADsP(데이터분석준전문가)", normal_style), Paragraph("한국데이터산업진흥원", normal_style), Paragraph("2021.04.09", normal_style), Paragraph("ADsP-028000376", normal_style)],
    [Paragraph("SQLD(SQL 개발자)", normal_style), Paragraph("한국데이터산업진흥원", normal_style), Paragraph("2020.06.30", normal_style), Paragraph("SQLD-0370138", normal_style)],
    [Paragraph("GTQ 그래픽기술자격 1급", normal_style), Paragraph("한국생산성본부", normal_style), Paragraph("2015.02.13", normal_style), Paragraph("GA01G15101275925", normal_style)],
    [Paragraph("CS Leaders(관리사)", normal_style), Paragraph("한국정보평가협회", normal_style), Paragraph("2016.10.18", normal_style), Paragraph("160060284C", normal_style)],
]
t_certs = Table(certs_data, colWidths=[175, 130, 95, 115])
t_certs.setStyle(TableStyle([
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
    ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f8fafc")),
    ('PADDING', (0,0), (-1,-1), 4.5),
    ('ALIGN', (2,0), (2,-1), 'CENTER'),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
]))
story.append(t_certs)

# 페이지 나누기
story.append(PageBreak())

# --- Page 2: Key Projects & Education ---
# 프로젝트 섹션
story.append(Paragraph("Key Projects", section_title_style))

# 프로젝트 1: ZIPT
story.append(Paragraph("<b>1. ZIPT (전세사기 방지 플랫폼)</b> | 4_Final Project", project_title_style))
story.append(Paragraph("<i>기능 요약: 등기부등본/계약서 AI 분석 및 안심 특약 RAG 요약, 카카오 지도를 연동한 거주 환경 인프라 브리핑</i>", normal_style))
story.append(Paragraph("• <b>[성능 최적화] React.lazy 코드 스플리팅</b>: 전체 라우트 페이지를 지연 로딩으로 전환하여 초기 진입 시 로드해야 하는 <b>메인 JS 번들 용량을 73.7% 대폭 감소(1,243KB -> 327KB)</b>시키고 LCP(초기화면 로딩) 속도를 획기적으로 개선.", bullet_style))
story.append(Paragraph("• <b>[성능 최적화] 빌드타임 WebP 이미지 압축</b>: <code>vite-imagetools</code>를 도입하여 리소스 이미지를 표시 크기에 맞추어 리사이즈하고 WebP 포맷으로 변환을 자동화해 <b>용량 99.6% 극적 단축(280~370KB -> 1.1~1.5KB)</b>.", bullet_style))
story.append(Paragraph("• <b>[아키텍처] 브라우저 직송 Gemini AI 설계</b>: 백엔드 경유 오버헤드를 해소하기 위해 클라이언트단에서 카카오맵 API로 수집한 POI 정보를 Google AI SDK(Gemini API)로 직접 호출하게 설계. API 키 노출 트레이드오프를 감수하고 5단계 모델 fallback(discoverModel)을 구축해 안정성을 높임.", bullet_style))
story.append(Paragraph("• <b>[운영 효율성] S3 JSON 콘텐츠 동기화</b>: 앱 재빌드/배포 없이 S3에 업로드된 JSON 파일 교체(Upsert 패턴)만으로 운영 중인 부동산 가이드북과 용어사전 문구가 즉각 동기화되도록 결합 구조 설계.", bullet_style))
story.append(Paragraph("• <b>[트러블슈팅] AI 연산 할루시네이션 극복</b>: AI(LLM) 서류 분석 시 발생하는 수학적 할루시네이션(연산 오차)을 차단하기 위해, AI는 OCR 데이터 파싱만 전담하고 부채비율 계산은 백엔드 수학 연산 코드로 처리하는 2단계 파이프라인 아키텍처를 도입하여 <b>연산 오차율 0% 달성</b>.", bullet_style))
story.append(Spacer(1, 5))

# 프로젝트 2: CodeTrip
story.append(Paragraph("<b>2. CodeTrip (여행 큐레이션 서비스)</b> | 2_Frontend Project (공모전 출품 리팩토링)", project_title_style))
story.append(Paragraph("<i>기능 요약: 공공 여행 데이터, 실시간 기상 API 연동 추천, 위시리스트 폴더 관리 및 메모장 공유</i>", normal_style))
story.append(Paragraph("• <b>[성능 최적화] 서버 사이드 인메모리 캐싱 도입</b>: 공공 API(한국관광공사 KTO) 6만 건 데이터 조회 시 발생하는 429 API 호출 제한 및 지연 속도(2s)를 극복하기 위해 서버에 데이터를 인메모리 캐싱. 클라이언트 기준 외부 API 호출 <b>0회</b>로 차단하고 데이터 응답 시간을 <b>기존 2,000ms에서 10ms 미만으로 약 99.5%의 속도 대폭 개선</b>.", bullet_style))
story.append(Paragraph("• <b>[UX 최적화] 낙관적 업데이트</b>: 댓글 등록 및 좋아요 액션 시 서버 응답 지연에 영향받지 않도록 <code>useMutation</code>의 <code>onMutate</code>를 활용해 <b>체감 반응 속도 0ms</b> 구현 및 롤백 기능 탑재.", bullet_style))
story.append(Spacer(1, 5))

# 프로젝트 3: CodeMate
story.append(Paragraph("<b>3. CodeMate (개발자 스터디 매칭 API)</b> | 3_Backend Project", project_title_style))
story.append(Paragraph("<i>기능 요약: 스터디 및 모각코 모집/신청/참여 상태 흐름 제어, Refresh Token Rotation 보안 API</i>", normal_style))
story.append(Paragraph("• <b>[신뢰성] 동시성 마감 제어</b>: 마감 인원 직전의 동시 신청 상황에서 race condition으로 발생하는 정원 초과 오류를 차단하기 위해 <b>JPA 비관적 락(Pessimistic Lock)</b>을 도입하고, 동시 요청 통합 테스트에서 정원 초과 및 데이터 무결성 오류 0건 확인.", bullet_style))
story.append(Spacer(1, 8))

# 4. 학력 및 주요 교육/대외활동 (Education & Experience)
story.append(Paragraph("Education & Experience", section_title_style))
edu_data = [
    [Paragraph("<b>글로벌아카데미</b>", bold_style), Paragraph("LowCode 기반 AI융합 스마트관리시스템 개발 심화과정 (2025.01.14 ~ 2025.03.17)", normal_style)],
    [Paragraph("<b>KOSTA</b>", bold_style), Paragraph("AI를 활용한 Java 기반 DevOps 개발자 양성 과정 수료 (2026.02.02 ~ 2026.07.10)", normal_style)],
    [Paragraph("<b>멀티캠퍼스</b>", bold_style), Paragraph("K-Digital 온·오프 연계 AI 활용 지능형 서비스 개발 과정 (2021.03.08 ~ 2021.06.17)", normal_style)],
    [Paragraph("<b>대학교</b>", bold_style), Paragraph("2019 복지서비스 모델제안 컴페티션 (공과 대학 학술제 졸업 연구) (2019.09.02 ~ 2019.12.05)", normal_style)],
    [Paragraph("<b>한이음 ICT 멘토링</b>", bold_style), Paragraph("공공데이터 이용 취업정보 추천 챗봇 앱 개발 - 팀장 역임 (2019.04.22 ~ 2019.11.30)", normal_style)],
    [Paragraph("<b>대학교</b>", bold_style), Paragraph("2018 학술 경진 대회 (지하철 동선 시뮬레이션 분석) - 팀장 역임 (2018.09.10 ~ 2018.11.30)", normal_style)],
    [Paragraph("<b>월드프렌즈 코리아</b>", bold_style), Paragraph("월드프렌즈 ICT 봉사단 - IT 총괄 PM으로서 라오스 앱 완수 (2018.07.08 ~ 2018.08.05)", normal_style)],
]
t_edu = Table(edu_data, colWidths=[120, 395])
t_edu.setStyle(TableStyle([
    ('LINEBELOW', (0,0), (-1,-2), 0.5, colors.HexColor("#e2e8f0")),
    ('PADDING', (0,0), (-1,-1), 3.5),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
]))
story.append(t_edu)
story.append(Spacer(1, 8))

# 5. 스터디 로그 요약 (Study Log)
story.append(Paragraph("Detailed 2026 Study Log (Obsidian Vault 동기화)", section_title_style))
study_data = [
    [Paragraph("<b>Backend & Server</b>", bold_style), Paragraph("Java OOP, MVC(Servlet/JSP), Spring Boot 3.5 MVC 아키텍처, JPA/QueryDSL, Security/OAuth2", normal_style)],
    [Paragraph("<b>Frontend & UI</b>", bold_style), Paragraph("React SPA, Vite, React Router, Zustand 상태 관리, TanStack Query, UX 시나리오 설계", normal_style)],
    [Paragraph("<b>DevOps & Infra</b>", bold_style), Paragraph("Docker & Compose, GitHub Actions CI/CD 파이프라인, AWS (EC2, S3, CloudFront), 모니터링(Prometheus/Grafana)", normal_style)],
    [Paragraph("<b>Data & AI</b>", bold_style), Paragraph("Python/Pandas 데이터 분석, Spring AI, AWS Bedrock, Gemini API, OCR 파싱 & pgvector RAG 모델링", normal_style)]
]
t_study = Table(study_data, colWidths=[130, 385])
t_study.setStyle(TableStyle([
    ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
    ('BACKGROUND', (0,0), (0,-1), colors.HexColor("#f8fafc")),
    ('PADDING', (0,0), (-1,-1), 3.5),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
]))
story.append(t_study)

# 4. 문서 빌드 실행
try:
    doc.build(story)
    print("PDF generated successfully at target path.")
except Exception as e:
    print(f"Error building PDF: {str(e)}")
