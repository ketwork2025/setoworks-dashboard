import { useState } from 'react';
import './App.css';
import { FiBox, FiTrendingUp, FiGlobe, FiShoppingCart, FiAlertCircle, FiSettings, FiUploadCloud, FiActivity, FiInfo, FiLayout, FiCreditCard } from 'react-icons/fi';
import { FaAmazon, FaStore } from 'react-icons/fa';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(0);
  const [predictionState, setPredictionState] = useState(0);
  const [activePredictorPlatform, setActivePredictorPlatform] = useState<'Kickstarter' | 'Makuake' | 'Zeczec'>('Kickstarter');
  const [isScraping, setIsScraping] = useState(false);
  const [showPredictionInfo, setShowPredictionInfo] = useState(false);
  const [logisticsStatus, setLogisticsStatus] = useState(0);
  const [marketingStatus, setMarketingStatus] = useState(0);
  const [caasStatus, setCaasStatus] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const issueTracking = () => {
    setLogisticsStatus(1);
    setTimeout(() => setLogisticsStatus(2), 1500);
  };

  const generateMarketing = () => {
    if (!uploadedImage) {
      alert("이미지를 먼저 업로드해주세요.");
      return;
    }
    setMarketingStatus(1);
    setTimeout(() => setMarketingStatus(2), 2000);
  };

  const applyCaas = () => {
    setCaasStatus(1);
    setTimeout(() => setCaasStatus(2), 1500);
  };

  const MOCK_PREDICTION_DB = {
    "Kickstarter": {
      url: "https://www.kickstarter.com/projects/denten/kioku-complete-japanese-learning-card-series",
      title: "Kioku: Complete Japanese Learning Card Series",
      creator: "DENTEN",
      image: "/images/setoworks_ces_09.png",
      target: "$10,000",
      probability: 98,
      estMin: "$280,000",
      estMax: "$350,000",
      velocity: "Very High (9.2/10)",
      competitors: [
        { name: "Nihongo Master Deck", funding: "$120K", diff: "+25%" },
        { name: "Kanji Flash Pro", funding: "$85K", diff: "+70%" }
      ],
      insights: [
        "얼리버드(Early Bird) 리워드 티어의 유입 전환율이 동종 에듀테크 캠페인 벤치마크 대비 40% 이상 높습니다.",
        "Add-on(디지털 워크북 추가 구매) 설정 시 최종 고객단가(AOV) 베이스로 모금액이 15% 추가 상승할 여력이 있습니다."
      ]
    },
    "Makuake": {
      url: "https://www.makuake.com/project/titanium_tent/",
      title: "세상에 없던 초경량 티타늄 텐트 에어돔",
      creator: "Setoworks Outdoor",
      image: "/images/setoworks_ces_10.png",
      target: "¥500,000",
      probability: 92,
      estMin: "¥18,000,000",
      estMax: "¥25,000,000",
      velocity: "High (8.5/10)",
      competitors: [
        { name: "울트라라이트 백패킹 텐트", funding: "¥12M", diff: "+50%" },
        { name: "스노우피크 알파인 프로", funding: "¥30M", diff: "-16%" }
      ],
      insights: [
        "일본 캠핑 시장 특성상, 솔로 캠퍼를 위한 1인용 초경량 추가 옵션이 절호의 마케팅 포인트가 될 수 있습니다.",
        "어얼리버드 리워드 소진 속도가 예측 모델상 매우 빠르므로, 2차 추가 물량 팩키징 확보가 조기에 필요합니다."
      ]
    },
    "Zeczec": {
      url: "https://www.zeczec.com/projects/smart-desk-organizer",
      title: "스마트 데스크 오거나이저 모듈 (Zeczec)",
      creator: "Setoworks Living",
      image: "/images/setoworks_ces_11.png",
      target: "NT$100,000",
      probability: 88,
      estMin: "NT$1,500,000",
      estMax: "NT$2,200,000",
      velocity: "Good (7.8/10)",
      competitors: [
        { name: "Magnetic Desk Kit", funding: "NT$1.2M", diff: "+25%" }
      ],
      insights: [
        "대만 Zeczec 오피스 카테고리 평균 객단가를 상회합니다. 리플렛 마케팅 캠페인 추가를 권장합니다."
      ]
    }
  };

  const simulateScraping = () => {
    setIsScraping(true);
    setShowPredictionInfo(false);
    setTimeout(() => {
      setIsScraping(false);
      setShowPredictionInfo(true);
    }, 1800);
  };

  const startPrediction = () => {
    setPredictionState(1);
    setTimeout(() => {
      setPredictionState(2);
    }, 2500);
  };

  const startUpload = () => {
    setUploadStatus(1);
    setTimeout(() => setUploadStatus(2), 2000);
    setTimeout(() => {
      setUploadStatus(3);
      setTimeout(() => {
        setShowModal(false);
        setUploadStatus(0);
      }, 3000);
    }, 4500);
  };

  return (
    <div className="dashboard-container">
      {/* 1. GNB (Global Navigation Bar) */}
      <nav className="gnb">
        <div className="gnb-left">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="https://setoworks.com/images/logo.png" alt="Setoworks" style={{ height: '32px', filter: 'brightness(0) invert(1)' }} onError={(e) => { e.currentTarget.src = 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png'; e.currentTarget.style.filter = 'brightness(0) invert(1)'; }} />
            <span style={{ fontWeight: 300, letterSpacing: '1px', marginLeft: '-5px' }}>BRIDGE</span>
          </div>
          <div className="nav-links">
            <span className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>대시보드</span>
            <span className={`nav-item ${activeTab === 'predictor' ? 'active' : ''}`} onClick={() => { setActiveTab('predictor'); setShowPredictionInfo(false); }}>
              <FiTrendingUp style={{ color: '#eab308' }} /> 예측기 PRO
            </span>
            <span className={`nav-item ${activeTab === 'builder' ? 'active' : ''}`} onClick={() => setActiveTab('builder')}>독립 빌더 <span style={{ fontSize: '0.7rem', background: 'var(--highlight-color)', color: 'white', padding: '2px 6px', borderRadius: '10px', marginLeft: '4px' }}>Beta</span></span>
            <span className={`nav-item ${activeTab === 'logistics' ? 'active' : ''}`} onClick={() => setActiveTab('logistics')}>글로벌 물류 추적</span>
            <span className={`nav-item ${activeTab === 'marketing' ? 'active' : ''}`} onClick={() => setActiveTab('marketing')}>AI 마케팅</span>
            <span className={`nav-item ${activeTab === 'caas' ? 'active' : ''}`} onClick={() => setActiveTab('caas')}>CaaS 투자 매칭</span>
          </div>
        </div>
        <div className="gnb-right">
          <span className="badge">Pro Plan</span>
          <span className="nav-item" style={{ fontSize: '0.85rem' }}>잔여 AI 번역: 45 / 50</span>
          <FiSettings size={20} className="nav-item" />
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            K
          </div>
        </div>
      </nav>

      {/* 2. Main Dashboard Content */}
      {activeTab === 'dashboard' && (
        <main className="main-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h1 className="page-title" style={{ margin: 0 }}>글로벌 통합 대시보드</h1>
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              <FiUploadCloud size={20} /> 새 상품 원클릭 글로벌 전송
            </button>
          </div>

          {/* Hero Banner Area */}
          <section className="hero-banner">
            <div>
              <h2 className="hero-title">Beyond Crowdfunding, Global Commerce Platform</h2>
              <p className="hero-subtitle">세계 시장 진출, 이제 세토웍스 원클릭 동기화로 시작하세요.</p>
            </div>
          </section>

          {/* 2-1. Top Metrics Cards */}
          <section className="metrics-row">
            <div className="metric-card">
              <div className="metric-header">
                <span>톡톡(Total) 통합 매출</span>
                <FiTrendingUp size={20} color="var(--primary-color)" />
              </div>
              <div className="metric-value">$ 4,520</div>
              <div className="metric-footer">
                전주 대비 <span className="positive">+15% 🔺</span>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-header">
                <span>신규 주문 (Amazon + Qoo10)</span>
                <FiShoppingCart size={20} color="var(--accent-color)" />
              </div>
              <div className="metric-value">18 건</div>
              <div className="metric-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>미발송 처리 대기중</span>
                <button className="btn-secondary">전체 발송 처리</button>
              </div>
            </div>
            <div className="metric-card">
              <div className="metric-header">
                <span>AI 번역 및 전송 현황</span>
                <FiBox size={20} color="#805ad5" />
              </div>
              <div className="metric-value">15 건 완료</div>
              <div className="metric-footer">
                <span>진행 중 2건</span>
                <span style={{ float: 'right', color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 600 }}>상세 보기 →</span>
              </div>
            </div>
          </section>

          {/* 2-2. Channel Status Columns */}
          <section className="channels-row">
            {/* Amazon US Card */}
            <div className="channel-card">
              <div className="channel-header">
                <div className="channel-title">
                  <FaAmazon size={24} color="#FF9900" /> Amazon US 채널
                </div>
                <span className="status-ok">🟢 정상 연동 중</span>
              </div>
              <div className="item-list">
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', color: 'var(--text-secondary)' }}>🔥 베스트 상품 TOP</h4>
                <div className="item-row">
                  <div className="item-info">
                    <img className="item-image" src="/images/setoworks_ces_04.png" alt="스마트워치" />
                    <span className="item-name">프로핏(ProFit) 프리미엄 스마트워치</span>
                  </div>
                  <span className="item-stats">$199.00 | 45건 판매</span>
                </div>
                <div className="item-row">
                  <div className="item-info">
                    <img className="item-image" src="/images/setoworks_ces_05.png" alt="무선 헤드폰" />
                    <span className="item-name">소음 캔슬링 프리미엄 무선 헤드폰</span>
                  </div>
                  <span className="item-stats">$89.00 | 12건 판매</span>
                </div>
              </div>
              <div className="alert-box">
                <FiAlertCircle size={18} />
                <span>랜턴 블랙 색상의 FBA 창고 재고가 5개 미만입니다!</span>
              </div>
            </div>

            {/* Qoo10 JP Card */}
            <div className="channel-card">
              <div className="channel-header">
                <div className="channel-title">
                  <FaStore size={24} color="#2A6EC0" /> Qoo10 Japan 채널
                </div>
                <span className="status-ok">🟢 정상 연동 중</span>
              </div>
              <div className="item-list">
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', color: 'var(--text-secondary)' }}>🔥 베스트 상품 TOP</h4>
                <div className="item-row">
                  <div className="item-info">
                    <img className="item-image" src="/images/setoworks_ces_06.png" alt="스니커즈" />
                    <span className="item-name">스트릿 에디션 레드 스니커즈</span>
                  </div>
                  <span className="item-stats">¥12,800 | 24건 판매</span>
                </div>
                <div className="item-row">
                  <div className="item-info">
                    <img className="item-image" src="/images/setoworks_ces_07.png" alt="블루투스 스피커" />
                    <span className="item-name">레트로 감성 우든 블루투스 스피커</span>
                  </div>
                  <span className="item-stats">¥15,000 | 8건 판매</span>
                </div>
              </div>
              <div style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                * 메가와리 프로모션 자동 할인가 세팅 적용 중
              </div>
            </div>
          </section>

          {/* 2-3. AI Funding Predictor */}
          <section className="predictor-section">
            <div className="predictor-header">
              <h2 className="predictor-title"><FiActivity size={24} /> AI 글로벌 펀딩 타당성 분석기</h2>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>제품의 번역 전 한국어 특장점을 입력하면 세토웍스의 빅데이터 엔진이 국가별 펀딩 성공률을 예측합니다.</p>
            </div>
            <div className="predictor-content">
              <div className="predictor-input-area">
                <textarea placeholder="제품의 핵심 소구점이나 기존 펀딩 준비용 상세페이지 텍스트를 자유롭게 입력하세요..." className="form-input" style={{ resize: 'none', height: '100%', minHeight: '150px' }}></textarea>
                <button className="btn-primary" onClick={startPrediction} style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>
                  <FiActivity size={18} /> AI 타당성 예측 시작
                </button>
              </div>

              {predictionState === 0 && (
                <div className="predictor-empty">
                  <FiInfo size={32} color="var(--border-color)" style={{ marginBottom: '16px' }} />
                  <p style={{ margin: 0, fontWeight: 600 }}>좌측에 제품 소개 데이터를 입력하고, 펀딩 성공률 분석을 시작해보세요.</p>
                </div>
              )}

              {predictionState === 1 && (
                <div className="predictor-loading">
                  <div className="spinner"></div>
                  <h3 style={{ color: 'var(--primary-color)', margin: '0 0 8px 0' }}>빅데이터 기반 AI 매칭 중...</h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>글로벌 양대 플랫폼(Makuake, Kickstarter) 펀딩 성공 데이터셋과 대조 분석 중</p>
                </div>
              )}

              {predictionState === 2 && (
                <div className="predictor-results">
                  <div className="result-card best-match">
                    <div className="best-badge">BEST MATCH</div>
                    <div className="platform-name">🇯🇵 Makuake (마쿠아케)</div>
                    <div className="match-score">🔥 94% 성공 예측</div>
                    <p className="est-funding">예상 펀딩액: <strong style={{ fontSize: '1.4rem', color: 'var(--primary-color)' }}>¥ 8,500,000</strong></p>
                    <div className="insight">"입력하신 캠핑용 랜턴 키워드는 일본 아웃도어 트렌드와 일치하여 프리미엄 가격 전략이 매우 유효하게 작동합니다."</div>
                  </div>
                  <div className="result-card">
                    <div className="platform-name">🇺🇸 Kickstarter (킥스타터)</div>
                    <div className="match-score">⭐️ 82% 성공 예측</div>
                    <p className="est-funding">예상 펀딩액: <strong style={{ fontSize: '1.2rem', color: 'var(--primary-color)' }}>$ 45,000</strong></p>
                    <div className="insight">"기능성 소구점은 좋으나, 유사 경쟁 제품들이 킥스타터에 다수 존재하므로 비주얼 영상 퀄리티에 예산 배분을 권장합니다."</div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {/* 3. D2C Builder Content */}
      {activeTab === 'builder' && (
        <main className="main-content">
          <div className="title-row" style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '20px', marginBottom: '30px' }}>
            <div>
              <h1 className="page-title" style={{ margin: 0, color: 'var(--primary-color)' }}>독립 펀딩 브랜드 빌더 <span className="badge" style={{ verticalAlign: 'middle', marginLeft: '10px' }}>Phase 3</span></h1>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px', marginBottom: 0 }}>거대 플랫폼 종속에서 벗어나, 100% 자사몰 기반의 글로벌 크라우드펀딩 캠페인을 다국어로 즉시 오픈하세요.</p>
            </div>
            <button className="btn-primary">
              <FiUploadCloud size={20} /> 빌더 저장 및 퍼블리싱
            </button>
          </div>

          <div className="builder-container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            {/* Builder Controls */}
            <div className="builder-controls" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

              <div className="config-card" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}><FiLayout /> 캠페인 기본 설정</h3>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>캠페인 타이틀</label>
                  <input type="text" className="form-input" placeholder="예: 세상에 없던 초경량 티타늄 텐트" />
                </div>
                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>목표 펀딩 금액 (USD)</label>
                  <input type="number" className="form-input" placeholder="100,000" />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>종료일</label>
                  <input type="date" className="form-input" />
                </div>
              </div>

              <div className="config-card" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}><FiGlobe /> 글로벌 스킨 템플릿</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div style={{ border: '2px solid var(--primary-color)', borderRadius: '8px', padding: '16px', textAlign: 'center', cursor: 'pointer', background: '#ebf4ff' }}>
                    <div style={{ fontWeight: 800, marginBottom: '8px' }}>미니멀리즘</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>모던형/심플 텍스트</div>
                  </div>
                  <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px', textAlign: 'center', cursor: 'pointer' }}>
                    <div style={{ fontWeight: 800, marginBottom: '8px' }}>다이나믹</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>비디오 영상 특화</div>
                  </div>
                  <div style={{ border: '1px solid var(--border-color)', borderRadius: '8px', padding: '16px', textAlign: 'center', cursor: 'pointer' }}>
                    <div style={{ fontWeight: 800, marginBottom: '8px' }}>프리미엄</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>명품/고가 제품용</div>
                  </div>
                </div>
              </div>

              <div className="config-card" style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}><FiCreditCard /> 글로벌 결제 연동 (PG)</h3>
                <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                    <input type="checkbox" checked readOnly /> <span>Stripe (해외 신용카드)</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                    <input type="checkbox" checked readOnly /> <span>PayPal (글로벌 간편결제)</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Live Preview Panel */}
            <div className="builder-preview" style={{ background: '#f8fafc', border: '8px solid #cbd5e0', borderRadius: '32px', padding: '0', overflow: 'hidden', height: '600px', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(11,59,96,0.3)' }}>
              <div style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 10 }}>
                <h4 style={{ margin: 0, color: 'var(--primary-color)' }}>Preview: 세상에 없던 초경량 티타늄 텐트</h4>
                <span style={{ fontSize: '0.8rem', color: '#666', background: '#e2e8f0', padding: '4px 8px', borderRadius: '12px', fontWeight: 600 }}>미니멀리즘 템플릿</span>
              </div>
              <div style={{ flex: 1, overflowY: 'auto' }}>
                <img src="https://images.unsplash.com/photo-1528297506728-9533d2ac3fa4?auto=format&fit=crop&w=800&q=80" alt="Hero" style={{ width: '100%', height: '260px', objectFit: 'cover' }} />
                <div style={{ padding: '24px' }}>
                  <div style={{ color: 'var(--highlight-color)', fontWeight: 800, marginBottom: '8px' }}>달성률 0% • 30일 남음</div>
                  <h2 style={{ margin: '0 0 16px 0', fontSize: '1.5rem' }}>세상에 없던 초경량 티타늄 텐트</h2>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>크라우드펀딩 플랫폼의 높은 수수료를 없앴습니다. 독립된 자사 채널에서 글로벌 백커(Backer)들의 펀딩을 직접 획득하세요.</p>

                  <div style={{ background: '#edf2f7', padding: '16px', borderRadius: '8px', margin: '24px 0', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-color)' }}>$ 0</div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>목표: $100,000</div>
                  </div>

                  <button style={{ width: '100%', padding: '16px', background: 'var(--highlight-color)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer' }}>
                    BACK THIS PROJECT
                  </button>
                </div>
              </div>
              <div style={{ height: '4px', background: 'var(--primary-color)', width: '30%', margin: '0 auto 8px auto', borderRadius: '2px' }}></div>
            </div>
          </div>
        </main>
      )}

      {/* 4. AI Predictor Content */}
      {activeTab === 'predictor' && (
        <main className="main-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '2.2rem', margin: '0 0 8px 0', fontWeight: 800, background: 'linear-gradient(90deg, var(--primary-color) 0%, var(--highlight-color) 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Funding Intelligence Pro</h2>
              <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '1.1rem' }}>URL 하나로 글로벌 3대 펀딩 플랫폼 경쟁 우위 및 모금액을 실시간 예측합니다.</p>
            </div>
            <div className="platform-tabs">
              {(['Kickstarter', 'Makuake', 'Zeczec'] as const).map(platform => (
                <button
                  key={platform}
                  className={`platform-tab ${activePredictorPlatform === platform ? 'active' : ''}`}
                  onClick={() => { setActivePredictorPlatform(platform); setShowPredictionInfo(false); }}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          <div className="predictor-card" style={{ display: 'flex', gap: '16px', padding: '24px' }}>
            <input
              type="text"
              className="form-input"
              style={{ flex: 1, fontSize: '1.1rem', padding: '16px' }}
              value={MOCK_PREDICTION_DB[activePredictorPlatform].url}
              readOnly
            />
            <button className="btn-primary" style={{ padding: '0 40px', fontSize: '1.1rem', borderRadius: '8px' }} onClick={simulateScraping}>
              <FiActivity /> AI 빅데이터 분석 시작
            </button>
          </div>

          {isScraping && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div className="spinner" style={{ width: '50px', height: '50px', borderWidth: '4px' }}></div>
              <h3 style={{ color: 'var(--primary-color)', marginTop: '24px', fontSize: '1.5rem' }}>프로젝트 구조 스크래핑 중...</h3>
              <p style={{ color: 'var(--text-secondary)' }}>과거 유사 성공 사례 14,200건의 메타데이터와 비교 분석을 수행하고 있습니다.</p>
            </div>
          )}

          {showPredictionInfo && (
            <div>
              <div className="predictor-card" style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '20px' }}>
                <img src={MOCK_PREDICTION_DB[activePredictorPlatform].image} style={{ width: '120px', height: '120px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <div style={{ flex: 1 }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>{MOCK_PREDICTION_DB[activePredictorPlatform].creator}</span>
                  <h3 style={{ margin: '4px 0 12px 0', fontSize: '1.5rem' }}>{MOCK_PREDICTION_DB[activePredictorPlatform].title}</h3>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ background: '#edf2f7', padding: '6px 12px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem' }}>목표치: <span style={{ color: 'var(--primary-color)' }}>{MOCK_PREDICTION_DB[activePredictorPlatform].target}</span></span>
                    <span style={{ background: '#edf2f7', padding: '6px 12px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem' }}><FiTrendingUp style={{ color: '#e53e3e' }} /> 트렌드 점수: <span>{MOCK_PREDICTION_DB[activePredictorPlatform].velocity}</span></span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr', gap: '24px', marginBottom: '30px' }}>
                <div className="predictor-card" style={{ textAlign: 'center', marginBottom: 0 }}>
                  <h4 style={{ margin: '0 0 20px 0', color: 'var(--text-secondary)' }}>예상 성공 확률 (AI Score)</h4>
                  <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto' }}>
                    <svg width="160" height="160" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
                      <circle cx="80" cy="80" r="70" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                      <circle cx="80" cy="80" r="70" fill="none" stroke="var(--highlight-color)" strokeWidth="12" strokeDasharray="439.8" strokeDashoffset={440 - (440 * MOCK_PREDICTION_DB[activePredictorPlatform].probability) / 100} style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} />
                    </svg>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                      <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-color)' }}>{MOCK_PREDICTION_DB[activePredictorPlatform].probability}%</div>
                    </div>
                  </div>
                  <p style={{ margin: '20px 0 0 0', fontSize: '0.9rem', color: '#276749', fontWeight: 700 }}><FiTrendingUp /> 상위 1% 캠페인 패턴 일치</p>
                </div>

                <div className="predictor-card" style={{ marginBottom: 0 }}>
                  <h4 style={{ margin: '0 0 24px 0', color: 'var(--text-secondary)' }}>최종 펀딩 예상 모금액 (범위)</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Pessimistic (최소 예상)</div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#718096' }}>{MOCK_PREDICTION_DB[activePredictorPlatform].estMin}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: 700, marginBottom: '4px' }}>Optimistic (최대 예상)</div>
                      <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-color)' }}>{MOCK_PREDICTION_DB[activePredictorPlatform].estMax}</div>
                    </div>
                  </div>
                  <div style={{ height: '12px', borderRadius: '6px', background: 'linear-gradient(90deg, #cbd5e0 0%, var(--highlight-color) 100%)', width: '100%', marginBottom: '24px' }}></div>

                  <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Actionable Insights</h4>
                  <div>
                    {MOCK_PREDICTION_DB[activePredictorPlatform].insights.map((insight, idx) => (
                      <div key={idx} className="insight-item">
                        <FiInfo style={{ color: '#eab308', marginTop: '2px' }} />
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="predictor-card" style={{ marginBottom: 0 }}>
                  <h4 style={{ margin: '0 0 20px 0', color: 'var(--text-secondary)' }}>유사 카테고리 경쟁 벤치마크</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {MOCK_PREDICTION_DB[activePredictorPlatform].competitors.map((c, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>{c.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>총 펀딩: {c.funding}</div>
                        </div>
                        <div style={{ color: c.diff.startsWith('+') ? '#276749' : '#e53e3e', fontWeight: 800, fontSize: '1.1rem' }}>
                          {c.diff}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* 4. Logistics Content */}
      {activeTab === 'logistics' && (
        <main className="main-content">
          <div className="title-row">
            <h1 className="page-title">🚚 Funding to Fulfillment 트래커</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>펀딩 종료 후 제조부터 해외 현지 배송까지 파트너 창고 데이터를 통합 시각화합니다.</p>
          </div>
          <div className="predictor-card">
            <h3 style={{ marginTop: 0, color: 'var(--text-primary)' }}><FiBox /> 프로젝트: Kioku Learning Cards (Kickstarter)</h3>
            <div className="pipeline-container">
              <div className="pipeline-line"></div>
              <div className="pipeline-progress" style={{ width: '50%' }}></div>
              <div className="pipeline-step">
                <div className="step-circle completed">🏭</div>
                <div className="step-label">1. 양산/제조</div>
                <div className="step-desc">100% 완료<br />(Shenzhen, CN)</div>
              </div>
              <div className="pipeline-step">
                <div className="step-circle completed">🚢</div>
                <div className="step-label">2. 해운 선적</div>
                <div className="step-desc">도착 완료<br />(Los Angeles, US)</div>
              </div>
              <div className="pipeline-step">
                <div className="step-circle active">🏢</div>
                <div className="step-label active">3. 로컬 창고 입고</div>
                <div className="step-desc">분류 작업 중<br />(CA Fulfillment)</div>
              </div>
              <div className="pipeline-step">
                <div className="step-circle">🚚</div>
                <div className="step-label">4. 백커 최종 배송</div>
                <div className="step-desc">대기 중<br />(USPS 연동 예정)</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
              <div className="insight-item" style={{ flex: 1, alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem' }}>✅</span>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>입고 현황 정상</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>총 3,200개 세트 중 3,200개 입고 스캔 완료</div>
                </div>
              </div>
              <div className="insight-item" style={{ flex: 1, alignItems: 'center', borderColor: '#fbd38d' }}>
                <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#dd6b20' }}>배송 지연 주의 구간</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>현지 폭설로 인한 동부 해안 배송일 +2일 지연 예상</div>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <button className="btn-primary" style={{ padding: '12px 24px', background: logisticsStatus === 2 ? '#276749' : undefined }} onClick={issueTracking} disabled={logisticsStatus > 0}>
                {logisticsStatus === 0 ? "통합 송장번호(Tracking) 발급/전송" : logisticsStatus === 1 ? "로지스틱스 API 연동 중..." : "통합 송장 발급 완료 (USPS-199203)"}
              </button>
            </div>
          </div>
        </main>
      )}

      {/* 5. Marketing Content */}
      {activeTab === 'marketing' && (
        <main className="main-content">
          <div className="title-row">
            <h1 className="page-title">🪄 AI Marketing Agency</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>상품 이미지 한 장으로 미국/일본 메인 채널 카피와 썸네일을 3초 만에 생성합니다.</p>
          </div>
          <div style={{ display: 'flex', gap: '30px' }}>
            <div style={{ flex: 1 }}>
              <div className="predictor-card" style={{ marginBottom: '20px', textAlign: 'center', border: '2px dashed var(--primary-color)', background: 'rgba(37,99,235,0.05)', padding: '50px 20px', cursor: 'pointer' }} onClick={() => setUploadedImage('✅ Kioku_Main_Asset.jpg (업로드됨)')}>
                <FiUploadCloud style={{ fontSize: '3rem', color: 'var(--primary-color)', marginBottom: '16px' }} />
                <h3 style={{ margin: '0 0 8px 0' }}>{uploadedImage ? uploadedImage : "제품 대표 이미지 업로드"}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                  {uploadedImage ? "마케팅 로직 생성 준비 완료!" : "마케팅 소재를 자동 생성할 프로덕트 사진 1장을 올려주세요.\n(JPG, PNG, WEBP 최대 10MB)"}
                </p>
              </div>
              <button className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(37,99,235,0.3)', justifyContent: 'center', background: marketingStatus === 2 ? '#276749' : undefined }} onClick={generateMarketing} disabled={marketingStatus > 0}>
                {marketingStatus === 0 ? "로봇 멀티버스 마케팅 에셋 생성" : marketingStatus === 1 ? "AI 멀티버스 에셋 생성 중..." : "채널별 에셋 생성 완료"}
              </button>
            </div>
            <div style={{ flex: 1.5, display: marketingStatus === 2 ? 'flex' : 'none', flexDirection: 'column', gap: '20px' }}>
              <div className="predictor-card" style={{ marginBottom: 0, padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ margin: 0, color: '#05ce78' }}>Kickstarter 캠페인 통합 에셋</h4>
                  <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>전체 복사</button>
                </div>
                <div className="insight-item" style={{ flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>[Hero Title]</span>
                  <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Kioku: The Ultimate Japanese Learning Card Series That Rewires Your Brain.</span>
                </div>
                <div className="insight-item" style={{ flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>[Facebook Ad Copy]</span>
                  <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Struggling with Kanji? Meet Kioku. 🧠 Master 1,000+ characters through native-designed mnemonics. Early birds get 40% OFF + free audio guide! #LearnJapanese #Kickstarter</span>
                </div>
              </div>
              <div className="predictor-card" style={{ marginBottom: 0, padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h4 style={{ margin: 0, color: '#e53e3e' }}>Makuake 최적화 에셋</h4>
                  <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>전체 복사</button>
                </div>
                <div className="insight-item" style={{ flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>[Hero Title: Hook]</span>
                  <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>漢字学習の常識を変える！ネイティブ発想で脳に直接刻む「記憶（Kioku）」カード誕生</span>
                </div>
                <div className="insight-item" style={{ flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontWeight: 800, color: 'var(--text-primary)' }}>[Instagram Story Line]</span>
                  <span style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>超早割限定40%オフ🎁 アプリより確実な定着率。毎日のスキマ時間が「日本語マスター」への最短ルートに。今すぐプロジェクトをチェック！</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 6. CaaS Content */}
      {activeTab === 'caas' && (
        <main className="main-content">
          <div className="title-row">
            <h1 className="page-title">🤝 CaaS 투자 매칭(Funding Funding)</h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>AI 예측 90% 이상 유망 프로젝트를 위한 마케팅 초기 자본 원클릭 심사 보드입니다.</p>
          </div>
          <div style={{ display: 'flex', gap: '30px' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="predictor-card" style={{ marginBottom: 0, background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)', color: 'white', padding: '40px 30px', textAlign: 'center' }}>
                <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px', fontWeight: 700, fontSize: '0.9rem', marginBottom: '24px' }}>
                  🎯 심사 자격 100% 충족
                </div>
                <img src="/images/setoworks_ces_09.png" style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.3)', marginBottom: '16px', objectFit: 'cover', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }} />
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.4rem' }}>Kioku Learning Cards</h3>
                <p style={{ margin: '0 0 24px 0', fontSize: '0.95rem', opacity: 0.8 }}>킥스타터 예상 성공률: <strong>98%</strong> (상위 1%)</p>
                <button className="btn-primary" style={{ background: caasStatus === 0 ? 'white' : '#05ce78', color: caasStatus === 0 ? '#1e3a8a' : 'white', fontWeight: 800, border: 'none', width: '100%', padding: '16px', borderRadius: '12px', fontSize: '1.1rem', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', justifyContent: 'center' }} onClick={applyCaas} disabled={caasStatus > 0}>
                  {caasStatus === 0 ? "파트너스 조건부 펀딩 신청" : caasStatus === 1 ? "심사 원장 등록 중..." : "등록 완료 (심사 진행중)"}
                </button>
                <p style={{ fontSize: '0.8rem', margin: '16px 0 0 0', opacity: 0.7 }}>*신청 시 세토웍스 내부 투자심의위로 데이터가 직행합니다.</p>
              </div>
            </div>
            <div style={{ flex: 1.5 }}>
              <h3 style={{ marginTop: 0, marginBottom: '24px', color: 'var(--text-primary)' }}>펀딩 투자 매칭 현황</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '-10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#05ce78', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', zIndex: 2 }}>✓</div>
                    <div style={{ width: '2px', height: '60px', background: '#05ce78', marginTop: '4px', marginBottom: '4px' }}></div>
                  </div>
                  <div style={{ paddingTop: '4px' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>AI 자격 요건 검증</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>시스템 데이터 상위 1% 성공률 충족 완료</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '-10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: caasStatus === 2 ? '#05ce78' : 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: caasStatus === 2 ? '4px solid #05ce78' : '4px solid #bfdbfe', color: 'white', zIndex: 2 }}>
                      {caasStatus === 2 ? '✓' : <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }}></div>}
                    </div>
                    <div style={{ width: '2px', height: '60px', background: '#e2e8f0', marginTop: '4px', marginBottom: '4px' }}></div>
                  </div>
                  <div style={{ paddingTop: '4px' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: caasStatus === 2 ? 'var(--text-primary)' : 'var(--primary-color)' }}>{caasStatus === 2 ? "세토웍스 내부 심의 진행 중" : "세토웍스 심의 대기중"}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{caasStatus === 2 ? "담당 심사역 배정이 완료되었으며 서류 검토 중입니다." : "전문 심사역 배정 완료 (예상 소요일: D-2)"}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '-10px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'white', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e0', zIndex: 2 }}>3</div>
                    <div style={{ width: '2px', height: '60px', background: '#e2e8f0', marginTop: '4px', marginBottom: '4px' }}></div>
                  </div>
                  <div style={{ paddingTop: '4px' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#a0aec0' }}>계약 조건 협의(Term Sheet)</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'white', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e0', zIndex: 2 }}>4</div>
                  </div>
                  <div style={{ paddingTop: '4px' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#a0aec0' }}>펀딩 자금 집행 및 마케팅 개시</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 3D 코다리 아바타 컴포넌트 등장 영역 (선택 가능하게 추후 연결) */}
      {/* <Kodari /> */}

      {/* AI Smart Upload Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, color: 'var(--primary-color)' }}>새 상품 원클릭 글로벌 전송</h2>
              <button onClick={() => { setShowModal(false); setUploadStatus(0); }} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>&times;</button>
            </div>

            {uploadStatus === 0 && (
              <div className="upload-form">
                <div className="form-group">
                  <label>상품명 (한국어)</label>
                  <input type="text" placeholder="예: 세토웍스 아웃도어 캠핑 랜턴" className="form-input" />
                </div>
                <div className="form-group">
                  <label>판매가 (KRW)</label>
                  <input type="number" placeholder="예: 45000" className="form-input" />
                </div>
                <div className="form-group">
                  <label>상품 설명</label>
                  <textarea placeholder="성공적인 크라우드펀딩 스토리라인 또는 상세 설명을 입력하세요..." className="form-input" rows={4}></textarea>
                </div>
                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }} onClick={startUpload}>
                  <FiGlobe size={18} /> AI 번역 및 양국 상점 동시 전송 시작
                </button>
              </div>
            )}

            {uploadStatus === 1 && (
              <div className="upload-progress">
                <div className="spinner"></div>
                <h3 style={{ color: 'var(--primary-color)' }}>AI 자동 번역 진행 중...</h3>
                <p style={{ color: 'var(--text-secondary)' }}>한국어 설명을 영어(Amazon)와 일본어(Qoo10)로 문맥에 맞춰 로컬라이징하고 있습니다.</p>
              </div>
            )}

            {uploadStatus === 2 && (
              <div className="upload-progress">
                <div className="spinner"></div>
                <h3 style={{ color: 'var(--primary-color)' }}>글로벌 채널 송출 중...</h3>
                <p style={{ color: 'var(--text-secondary)' }}>US Amazon 및 JP Qoo10 시스템에 API를 통해 새 상품을 리스팅하고 있습니다.</p>
              </div>
            )}

            {uploadStatus === 3 && (
              <div className="upload-progress success-state">
                <div className="success-icon">✔️</div>
                <h3 style={{ color: '#276749' }}>글로벌 전송 완료!</h3>
                <p style={{ color: 'var(--text-secondary)' }}>성공적으로 아마존과 큐텐 스토어에 상품이 동시 등록되었습니다.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
