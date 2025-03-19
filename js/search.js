/**
 * 도예 교육과정 웹사이트 검색 기능
 * 이 스크립트는 웹사이트 내 콘텐츠를 검색하는 기능을 제공합니다.
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    
    // 검색 데이터 - 각 페이지의 중요 섹션과 내용을 포함
    const searchData = [
        // 챕터1: 성형 단계
        {
            title: '성형 단계 개요',
            url: 'chapter1.html',
            content: '흙의 특성 이해부터 시작하여 손성형과 물레성형의 기본을 학습합니다. 다양한 흙의 종류와 특성, 기본 도구 사용법, 손성형 기법, 물레 작동법 등을 배웁니다.'
        },
        {
            title: '흙의 종류와 특성',
            url: 'chapter1.html#clay-types',
            content: '도예에 사용되는 흙은 크게 백자토, 분청토, 옹기토 등으로 나눌 수 있습니다. 백자토는 부드럽고 미세한 입자로 이루어져 있어 섬세한 작업에 적합하며, 색상이 하얗고 순수한 것이 특징입니다.'
        },
        {
            title: '손성형 기법: 핀칭과 코일링',
            url: 'chapter1.html#hand-forming',
            content: '손성형은 물레를 사용하지 않고 손으로 직접 흙을 빚어 형태를 만드는 방법입니다. 가장 원시적이면서도 무한한 창의성을 발휘할 수 있는 방법이며, 도예의 기초를 다지는 데 매우 중요합니다.'
        },
        {
            title: '물레 기본 작동법 및 중심잡기',
            url: 'chapter1.html#wheel-centering',
            content: '물레는 도예에서 가장 일반적으로 사용되는 도구입니다. 중심잡기는 물레 성형의 가장 기초적이면서도 가장 중요한 기술입니다. 물레를 천천히 회전시키면서 양손으로 흙을 감싸쥡니다.'
        },
        {
            title: '기본 형태 성형하기',
            url: 'chapter1.html#basic-forms',
            content: '물레 성형에서 원통형과 볼 형태는 모든 도자기 형태의 기본이 됩니다. 컵, 화분, 항아리 등 대부분의 기물은 이 두 기본 형태에서 시작합니다.'
        },
        
        // 챕터2: 정형 단계
        {
            title: '정형 단계 개요',
            url: 'chapter2.html',
            content: '성형된 기물의 형태를 정교하게 다듬고 완성하는 기술을 배웁니다. 정형 도구의 사용법, 굽 깎기와 다듬기 기법, 세부 장식 기법과 문양 표현, 부속품 제작 및 부착 방법을 학습합니다.'
        },
        {
            title: '정형 도구와 가죽경도의 이해',
            url: 'chapter2.html#trimming-tools',
            content: '정형은 성형된 기물의 형태를 다듬고, 굽을 만들고, 부속품을 부착하는 등 작품을 완성하는 과정입니다. 가죽경도란 말 그대로 가죽처럼 약간 단단하면서도 어느 정도 유연성이 남아있는 상태를 말합니다.'
        },
        {
            title: '굽 깎기와 다듬기 기법',
            url: 'chapter2.html#foot-trimming',
            content: '굽은 도자기의 기초이자 작품의 안정성을 결정하는 중요한 요소입니다. 단순히 기능적인 측면뿐만 아니라 미적인 측면에서도 굽은 매우 중요합니다.'
        },
        {
            title: '손잡이, 주둥이 등 부속품 제작 및 부착',
            url: 'chapter2.html#attachments',
            content: '부속품은 도자기의 기능성과 미적 가치를 모두 높여주는 중요한 요소입니다. 예를 들어, 잘 디자인된 손잡이는 컵이나 주전자를 사용하기 쉽게 만들 뿐만 아니라, 작품의 전체적인 인상을 결정짓는 요소가 되기도 합니다.'
        },
        {
            title: '기물의 균형과 비례 조정하기',
            url: 'chapter2.html#balance-proportion',
            content: '균형과 비례는 모든 예술 분야에서 중요한 요소지만, 특히 도예에서는 실용성과 직결되기 때문에 더욱 중요합니다. 균형이 잘 잡힌 도자기는 보기에도 아름답지만, 실제 사용할 때도 안정감이 있고 편리합니다.'
        },
        
        // 챕터3: 장식 단계
        {
            title: '장식 단계 개요',
            url: 'chapter3.html',
            content: '작품의 미적 가치를 높이는 다양한 장식 기법을 배웁니다. 장식 도구와 재료, 조각과 양각 기법, 색화장토와 안료 사용법, 전사지와 문양 표현 기법을 익힙니다.'
        },
        {
            title: '장식 도구와 재료 소개',
            url: 'chapter3.html#decoration-tools',
            content: '도자기 장식에는 다양한 도구와 재료가 사용됩니다. 조각도, 롤러, 스탬프, 스펀지 등 각각의 도구는 특유의 질감과 패턴을 만들어냅니다.'
        },
        {
            title: '조각과 양각 기법',
            url: 'chapter3.html#carving-techniques',
            content: '음각과 양각은 도자기 표면에 깊이감을 주는 대표적인 장식 기법입니다. 음각은 표면을 파내어 패인 무늬를 만들고, 양각은 부조처럼 돌출된 무늬를 만듭니다.'
        },
        {
            title: '색화장토와 안료 사용법',
            url: 'chapter3.html#colored-slips',
            content: '색화장토는 안료를 섞은 슬립으로, 도자기에 다양한 색상을 표현할 수 있게 해줍니다. 붓, 딥핑, 포어링 등 다양한 방식으로 적용할 수 있습니다.'
        },
        
        // 챕터4: 초벌 단계
        {
            title: '초벌 단계 개요',
            url: 'chapter4.html',
            content: '작품의 안전한 건조 방법과 첫 번째 소성 과정인 초벌구이에 대해 배웁니다. 도자기 건조 과정과 방법, 건조 과정에서 발생하는 문제점과 해결책, 가마의 종류와 초벌구이 원리, 온도 설정과 가마 적재 방법을 학습합니다.'
        },
        {
            title: '도자기 건조 과정과 방법',
            url: 'chapter4.html#drying-process',
            content: '균일한 건조는 도자기 제작에서 가장 중요한 과정 중 하나입니다. 너무 빠르게 건조되면 균열이나 뒤틀림이 발생할 수 있으며, 너무 느리게 건조되면 곰팡이가 생길 수 있습니다.'
        },
        {
            title: '건조 과정에서 발생하는 문제점과 해결책',
            url: 'chapter4.html#drying-problems',
            content: '건조 중 발생하는 대표적인 문제는 균열과 뒤틀림입니다. 두께가 불균일하거나 건조 속도가 너무 빠를 때 주로 발생하며, 천천히 균일하게 건조하는 것이 중요합니다.'
        },
        {
            title: '가마의 종류와 초벌구이 원리',
            url: 'chapter4.html#kiln-types',
            content: '가마는 크게 전기가마, 가스가마, 장작가마로 나뉩니다. 초벌구이는 보통 800-900°C 사이에서 진행되며, 이 과정에서 점토의 화학적 변화가 일어납니다.'
        },
        
        // 챕터5: 유약 단계
        {
            title: '유약 단계 개요',
            url: 'chapter5.html',
            content: '도자기의 완성도를 높이는 유약에 대해 배우고, 다양한 시유 기법을 실습합니다. 유약의 이해와 기본 원리, 시유 도구와 기본 기법, 응용 시유 기법, 유약 실험과 창의적 표현 방법을 익힙니다.'
        },
        {
            title: '유약의 이해와 기본 원리',
            url: 'chapter5.html#glaze-basics',
            content: '유약은 크게 융제, 내화제, 안정제로 구성됩니다. 융제는 유약을 녹게 하고, 내화제는 경도를 높이며, 안정제는 유약이 흘러내리지 않게 합니다. 이러한 성분의 비율에 따라 유약의 특성이 달라집니다.'
        },
        {
            title: '시유 도구와 기본 기법',
            url: 'chapter5.html#glazing-techniques',
            content: '시유 방법에는 담금법, 붓칠법, 스프레이법 등이 있습니다. 담금법은 유약에 직접 담가 전체를 시유하는 방법이고, 붓칠법은 세부적인 장식에 적합하며, 스프레이법은 균일한 시유에 효과적입니다.'
        },
        {
            title: '응용 시유 기법',
            url: 'chapter5.html#advanced-glazing',
            content: '다양한 유약을 중첩하거나 부분적으로 시유하여 독특한 효과를 낼 수 있습니다. 왁스 레지스트 기법은 시유를 방지하고 싶은 부분에 왁스를 발라 패턴을 만드는 방법입니다.'
        },
        
        // 챕터6: 재벌 단계
        {
            title: '재벌 단계 개요',
            url: 'chapter6.html',
            content: '유약을 바른 도자기의 최종 소성 과정과 온도 관리, 냉각 과정까지 모든 소성 기술을 학습합니다. 재벌 소성의 원리와 가마 운영, 온도 관리와 소성 분위기, 특수 소성 기법, 냉각 과정과 최종 평가를 배웁니다.'
        },
        {
            title: '재벌 소성의 원리와 가마 운영',
            url: 'chapter6.html#firing-principles',
            content: '재벌 소성은 유약이 용융되어 유리질 층을 형성하는 과정입니다. 일반적으로 1200-1300°C 사이에서 진행되며, 유약과 점토의 종류에 따라 최적의 온도가 달라집니다.'
        },
        {
            title: '온도 관리와 소성 분위기',
            url: 'chapter6.html#temperature-control',
            content: '소성 곡선은 가마의 온도 상승과 유지, 냉각을 계획한 그래프입니다. 적절한 소성 곡선을 따르는 것이 중요하며, 특히 결정유약 등 특수 유약은 정확한 온도 관리가 필수적입니다.'
        },
        
        // 챕터7: 마케팅
        {
            title: '마케팅 단계 개요',
            url: 'chapter7.html',
            content: '도예 작품의 마케팅과 판매 전략에 대해 배우고, 작품 정체성 구축, 온라인 마케팅, 전시 전략 등을 학습합니다.'
        },
        {
            title: '작품 사진 촬영 기법',
            url: 'chapter7.html#product-photography',
            content: '도자기 작품 촬영은 적절한 조명과 배경이 중요합니다. 작품의 질감과 색상을 정확히 표현하기 위해 자연광이나 확산 조명을 활용하는 것이 좋습니다.'
        },
        
        // 도예 용어집
        {
            title: '도예 용어집',
            url: 'pottery-terms.html',
            content: '도예에 관련된 전문 용어들을 모아 놓은 용어집입니다. 흙, 성형, 유약, 소성 등에 관련된 다양한 용어들을 알기 쉽게 설명합니다.'
        },
        {
            title: '성형 관련 용어',
            url: 'pottery-terms.html#section-ㅅ',
            content: '물레성형, 손성형, 코일링, 핀칭 등 도자기를 만드는 다양한 방법에 관한 용어들을 설명합니다.'
        },
        {
            title: '유약 관련 용어',
            url: 'pottery-terms.html#section-ㅇ',
            content: '유약, 시유, 크랙유, 투명유, 매트유 등 도자기 표면 처리와 관련된 용어들을 설명합니다.'
        },
        {
            title: '소성 관련 용어',
            url: 'pottery-terms.html#section-ㅅ',
            content: '초벌, 재벌, 환원소성, 산화소성 등 도자기를 구워내는 과정과 관련된 용어들을 설명합니다.'
        },
        
        // 사용설명서 관련 항목 추가
        {
            title: '홈페이지 사용설명서',
            url: 'user-guide.html',
            content: '도자기공작소 숨 홈페이지를 효과적으로 사용하는 방법을 안내합니다. 사이트 개요, 메뉴 탐색, 검색 기능, 챕터 내 이동 방법, 다크모드 설정 등 다양한 기능을 확인할 수 있습니다.'
        },
        {
            title: '메뉴 및 탐색 방법',
            url: 'user-guide.html#navigation',
            content: '상단 메뉴를 통해 원하는 챕터나 페이지로 쉽게 이동할 수 있습니다. 모바일 화면에서는 햄버거 아이콘을 클릭하여 메뉴를 열 수 있습니다.'
        },
        {
            title: '검색 기능 활용하기',
            url: 'user-guide.html#search-guide',
            content: '원하는 정보를 빠르게 찾기 위해 상단 검색창을 활용하세요. 정확한 키워드를 사용하고, 여러 키워드를 시도해 보며, 앵커 링크를 활용하면 더 효과적으로 검색할 수 있습니다.'
        },
        {
            title: '모바일 사용자를 위한 팁',
            url: 'user-guide.html#mobile-experience',
            content: '도자기공작소 숨 홈페이지는 모바일 환경에 최적화되어 있습니다. 반응형 레이아웃, 가로 스크롤 최소화, 터치 친화적 요소, 빠른 로딩 등의 모바일 최적화 기능을 제공합니다.'
        },
        
        // 사이트맵 관련 항목 추가
        {
            title: '사이트맵',
            url: 'sitemap.html',
            content: '도자기공작소 숨 웹사이트의 모든 페이지를 한눈에 확인할 수 있는 사이트맵입니다. 원하는 페이지를 빠르게 찾아 접근할 수 있습니다.'
        }
    ];
    
    // 검색 함수
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query === '') {
            searchResults.innerHTML = '<p>검색어를 입력해주세요.</p>';
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.content.toLowerCase().includes(query)
        );
        
        displayResults(results, query);
    }
    
    // 검색 결과 표시 함수
    function displayResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p>검색 결과가 없습니다.</p>';
            return;
        }
        
        let html = '<h3>검색 결과</h3><ul class="search-results-list">';
        
        results.forEach(item => {
            // 검색어를 강조 표시
            const highlightedContent = highlightText(item.content, query);
            
            html += `
                <li class="search-result-item">
                    <a href="${item.url}" class="result-title">${item.title}</a>
                    <p class="result-content">${highlightedContent}</p>
                </li>
            `;
        });
        
        html += '</ul>';
        searchResults.innerHTML = html;
    }
    
    // 검색어 강조 표시 함수
    function highlightText(text, query) {
        const regex = new RegExp(query, 'gi');
        return text.replace(regex, match => `<span class="highlight">${match}</span>`);
    }
    
    // 이벤트 리스너 추가
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}); 