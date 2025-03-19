// 이미지 최적화 스크립트
document.addEventListener('DOMContentLoaded', function() {
    // 지연 로딩 구현
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    // 인터섹션 옵저버 설정
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                
                // 이미지가 뷰포트에 들어오면 실제 src 속성에 할당
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                    
                    // 저해상도 이미지 클래스 제거, 고해상도 클래스 추가
                    img.classList.remove('blur-load');
                    img.classList.add('loaded');
                    
                    // 로드 완료 후 옵저버에서 제거
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px', // 뷰포트 기준 50px 미리 로딩
        threshold: 0.1 // 10% 이상 보이면 로딩 시작
    });
    
    // 모든 지연 로딩 이미지에 인터섹션 옵저버 적용
    lazyImages.forEach(img => {
        imageObserver.observe(img);
        
        // 백업: 인터섹션 옵저버가 지원되지 않는 브라우저를 위한 대체 방법
        if (!('IntersectionObserver' in window)) {
            loadImage(img);
        }
    });
    
    // 일반 이미지를 지연 로딩 형식으로 변환
    function convertToLazyLoad() {
        const images = document.querySelectorAll('img:not([data-src]):not(.loaded):not(.placeholder-img)');
        
        images.forEach(img => {
            if (img.src && !img.classList.contains('logo-image')) {
                img.setAttribute('data-src', img.src);
                
                // 로딩 중 저해상도 이미지나 색상을 표시
                const color = getAverageColor(img);
                img.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${img.width} ${img.height}'%3E%3Crect width='100%25' height='100%25' fill='${color}'/%3E%3C/svg%3E`;
                
                img.classList.add('blur-load');
                imageObserver.observe(img);
            }
        });
    }
    
    // 이미지의 평균 색상 추출 (간단한 구현)
    function getAverageColor(img) {
        // 기본 색상 반환 (실제로는 캔버스를 사용하여 이미지 색상 분석 필요)
        return '#f0f0f0';
    }
    
    // 수동 이미지 로딩
    function loadImage(img) {
        const src = img.getAttribute('data-src');
        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
            img.classList.remove('blur-load');
            img.classList.add('loaded');
        }
    }
    
    // 페이지 내의 모든 일반 이미지를 지연 로딩으로 변환
    convertToLazyLoad();
    
    // 스크롤 이벤트로 추가 백업 처리
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            lazyImages.forEach(img => {
                if (isInViewport(img) && img.getAttribute('data-src')) {
                    loadImage(img);
                }
            });
        }, 200);
    });
    
    // 요소가 현재 화면에 보이는지 확인
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) + 100 &&
            rect.bottom >= 0
        );
    }
    
    // 이미지 프리캐싱 - 주요 이미지 미리 로드
    function preloadCriticalImages() {
        const criticalPaths = [
            'images/header-banner.png', 
            'images/logo.png'
        ];
        
        criticalPaths.forEach(path => {
            const img = new Image();
            img.src = path;
        });
    }
    
    // 중요 이미지 프리로드
    preloadCriticalImages();
}); 