// 현재 페이지의 경로 가져오기
const currentPath = window.location.pathname;
const isSubPage = currentPath.includes('/');
const isGitHubPages = window.location.hostname.includes('github.io');

// 경로 접두사 설정 (GitHub Pages 또는 로컬)
let pathPrefix = '';

// GitHub Pages에서 실행 중인지 확인
if (isGitHubPages) {
  // GitHub Pages에서는 저장소 이름이 경로에 포함됨
  pathPrefix = '/potteryclass/';
}

// 콘텐츠가 하위 디렉토리에 있는 경우 경로 조정
const homePath = isSubPage && !currentPath.includes('potteryclass') ? '../' : '';

// 메뉴 HTML 생성
const menuHTML = `
  <div class="global-menu-container">
    <div class="logo">
      <a href="${homePath}index.html">
        <img src="${homePath}images/pottery-logo.png" alt="도자기공작소 숨 로고" width="50" height="50">
        <span>도자기공작소 숨</span>
      </a>
    </div>
    <nav class="main-nav">
      <ul class="menu-list">
        <li><a href="${homePath}index.html" class="${currentPath.endsWith('index.html') || currentPath.endsWith('/') ? 'active' : ''}">홈</a></li>
        <li><a href="${homePath}chapter1.html" class="${currentPath.includes('chapter1') ? 'active' : ''}">챕터 1: 성형</a></li>
        <li><a href="${homePath}chapter2.html" class="${currentPath.includes('chapter2') ? 'active' : ''}">챕터 2: 정형</a></li>
        <li><a href="${homePath}chapter3.html" class="${currentPath.includes('chapter3') ? 'active' : ''}">챕터 3: 장식</a></li>
        <li><a href="${homePath}chapter4.html" class="${currentPath.includes('chapter4') ? 'active' : ''}">챕터 4: 초벌</a></li>
        <li><a href="${homePath}chapter5.html" class="${currentPath.includes('chapter5') ? 'active' : ''}">챕터 5: 유약</a></li>
        <li><a href="${homePath}chapter6.html" class="${currentPath.includes('chapter6') ? 'active' : ''}">챕터 6: 재벌</a></li>
        <li><a href="${homePath}chapter7.html" class="${currentPath.includes('chapter7') ? 'active' : ''}">챕터 7: 마케팅</a></li>
        <li><a href="${homePath}pottery-terms.html" class="${currentPath.includes('pottery-terms') ? 'active' : ''}">용어집</a></li>
        <li><a href="${homePath}user-guide.html" class="${currentPath.includes('user-guide') ? 'active' : ''}">사용설명서</a></li>
      </ul>
    </nav>
    <div class="menu-right">
      <div class="search-container">
        <input type="text" id="search-input" placeholder="검색...">
        <button id="search-button"><i class="search-icon">🔍</i></button>
        <div id="search-results"></div>
      </div>
      <button id="dark-mode-toggle" class="dark-mode-toggle" aria-label="다크 모드 전환">
        <span class="dark-icon">🌙</span>
        <span class="light-icon">☀️</span>
      </button>
      <button class="mobile-menu-toggle" aria-label="모바일 메뉴 열기">
        <span class="hamburger-icon">☰</span>
      </button>
    </div>
  </div>
`;

// 메뉴 초기화 함수
function initializeMenu() {
  // 글로벌 메뉴 컨테이너에 메뉴 HTML 삽입
  const menuContainer = document.getElementById('global-menu');
  if (menuContainer) {
    menuContainer.innerHTML = menuHTML;
  }

  // 모바일 메뉴 토글 기능
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      mobileMenuToggle.classList.toggle('active');
    });
  }

  // 다크 모드 토글 기능
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  if (darkModeToggle) {
    // 로컬 스토리지에서 다크 모드 설정 불러오기
    const savedDarkMode = localStorage.getItem('darkMode');
    
    // 시스템 설정 확인
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // 저장된 설정이 있으면 그 설정을 따르고, 없으면 시스템 설정을 따름
    if (savedDarkMode === 'true' || (savedDarkMode === null && prefersDarkMode)) {
      document.body.classList.add('dark-mode');
    }
    
    // 다크 모드 토글 클릭 이벤트
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
  }
  
  // 검색 기능 초기화
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  
  if (searchInput && searchButton) {
    // 검색 버튼 클릭 이벤트
    searchButton.addEventListener('click', () => {
      if (searchInput.value.trim() !== '') {
        window.location.href = `${homePath}search.html?q=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
    
    // 엔터 키 이벤트
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter' && searchInput.value.trim() !== '') {
        window.location.href = `${homePath}search.html?q=${encodeURIComponent(searchInput.value.trim())}`;
      }
    });
  }
}

// DOM이 로드되면 메뉴 초기화
document.addEventListener('DOMContentLoaded', initializeMenu); 