# 도예 교육과정 웹사이트

이 저장소는 도예 교육과정 웹사이트의 소스 코드를 포함하고 있습니다. 웹사이트는 도예 수업에 대한 정보와 주차별 강의 계획을 제공합니다.

## 주요 기능

- 반응형 디자인: 모바일과 데스크탑 환경 모두에서 최적화된 경험
- 다크 모드 지원: 사용자가 선호하는 테마 선택 가능
- 접근성: 키보드 네비게이션 및 스크린 리더 지원
- SEO 최적화: 검색 엔진에서 쉽게 찾을 수 있는 구조

## 이미지 최적화 방법

웹사이트의 이미지 로딩 속도를 향상시키기 위한 여러 최적화 기법이 적용되어 있습니다:

### 1. 클라이언트 측 최적화

- **지연 로딩(Lazy Loading)**: 뷰포트에 들어올 때만 이미지를 로드하여 초기 페이지 로딩 속도 향상
- **점진적 로딩(Progressive Loading)**: 저해상도 플레이스홀더를 먼저 표시하고 실제 이미지는 나중에 로드
- **이미지 컨테이너 사전 확보**: 이미지 크기에 맞는 공간을 미리 확보하여 레이아웃 이동 최소화
- **중요 이미지 프리로드**: 배너 및 로고와 같은 중요 이미지는 우선적으로 로드

```html
<!-- 이미지 지연 로딩 예시 -->
<div class="img-container">
    <img src="data:image/svg+xml,%3Csvg ..." data-src="images/real-image.jpg" alt="설명" class="responsive-img">
</div>
```

### 2. 서버 측 최적화

- **이미지 크기 조정**: 여러 화면 크기에 맞는 다양한 이미지 크기 생성
- **이미지 압축**: 화질 저하 없이 파일 크기 최적화
- **WebP 형식 변환**: 고급 압축을 제공하는 최신 이미지 형식 적용
- **캐싱 헤더 설정**: 이미지 캐싱을 통한 재방문 시 로딩 속도 향상

서버 측 이미지 최적화를 위한 스크립트는 `tools/image-optimizer` 디렉토리에 있습니다:

```bash
# 이미지 최적화 스크립트 실행
cd tools/image-optimizer
npm install sharp glob
node optimize-images.js
```

### 3. 추가 고려사항

- **모바일 사용자를 위한 데이터 절약 모드 지원**: `prefers-reduced-data` 미디어 쿼리 적용
- **CSS에서의 이미지 최적화**: 백그라운드 이미지의 경우 지연 로딩 적용
- **이미지 크기 속성 정의**: 이미지의 `width`와 `height` 속성을 명시하여 CLS(Cumulative Layout Shift) 방지

## 이미지 최적화 기술 세부 사항

```javascript
// 이미지 최적화 스크립트의 주요 기능
- IntersectionObserver를 사용한 지연 로딩
- 저해상도 SVG 플레이스홀더로 즉시 시각적 피드백 제공
- 데이터 절약 모드 지원 (prefers-reduced-data 미디어 쿼리)
- 중요 이미지(Above the fold)는 미리 로드하여 사용자 경험 향상
```

## 웹사이트 구조

- `index.html`: 메인 페이지
- `chapter*.html`: 각 장(단원)의 개요 페이지
- `chapter*/week*.html`: 각 주차 강의 계획 및 내용
- `styles.css`: 스타일시트
- `js/`: JavaScript 파일들
- `images/`: 이미지 파일들

## 방문하기

웹사이트는 다음 URL에서 확인할 수 있습니다: [도예 교육과정](https://jinwooleegit.github.io/potteryclass/)
