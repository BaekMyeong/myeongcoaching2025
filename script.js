// 비용 계산기 스크립트
function calculateCost() {
    const numParticipants = parseInt(document.getElementById('numParticipants').value);
    const rentalHours = parseInt(document.getElementById('rentalHours').value);
    const useProjector = document.getElementById('useProjector').checked;

    if (isNaN(numParticipants) || numParticipants <= 0 || isNaN(rentalHours) || rentalHours <= 0) {
        document.getElementById('totalCost').innerText = "0"; // 유효하지 않은 입력 시 0으로 초기화
        return;
    }

    let baseRatePerHour;
    // --- 비용 정책 업데이트 시 이 부분을 수정하세요 ---
    if (numParticipants <= 15) {
        baseRatePerHour = 60000; // 15인 이하
    } else {
        baseRatePerHour = 70000; // 15인 이상
    }

    let totalBaseCost = baseRatePerHour * rentalHours;
    let projectorCost = 0;

    // --- 프로젝터 비용 정책 업데이트 시 이 부분을 수정하세요 ---
    if (useProjector) {
        projectorCost = 5000 * rentalHours;
    }
    // ---------------------------------------------

    let finalCost = totalBaseCost + projectorCost;

    document.getElementById('totalCost').innerText = finalCost.toLocaleString();
}

// 페이지 로드 시 또는 특정 이벤트 발생 시 함수들이 실행되도록 설정
document.addEventListener('DOMContentLoaded', () => {
    
    // 페이지가 처음 로드될 때 계산기 초기화
    calculateCost();

    // 네비게이션(상단/하단) 탭 스크롤 기능 및 활성화
    const allNavLinks = document.querySelectorAll('.navbar a, .bottom-nav a');

    allNavLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if(targetElement) {
                // sticky navbar 높이를 고려하여 스크롤 위치 조정 (데스크톱만 해당)
                let offset = 0;
                if (window.innerWidth > 768) {
                    offset = document.querySelector('.navbar').offsetHeight;
                }
                
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 스크롤 위치에 따라 네비게이션 탭 활성화
    const sections = document.querySelectorAll('.section-card');
    const navLinksDesktop = document.querySelectorAll('.navbar a');
    const navLinksMobile = document.querySelectorAll('.bottom-nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        // 활성화 위치를 화면의 약 1/4 지점으로 조정하여 더 자연스럽게
        const scrollTriggerPoint = window.innerHeight * 0.25; 
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - scrollTriggerPoint) {
                current = '#' + section.getAttribute('id');
            }
        });

        // 데스크톱과 모바일 네비게이션 링크 모두 업데이트
        navLinksDesktop.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
        navLinksMobile.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });

    // 계산기 버튼에 이벤트 리스너 연결
    const calculateButton = document.querySelector('.calculate-button');
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateCost);
    }

    // 계산기 입력 필드 값이 변경될 때마다 다시 계산
    const calculatorInputs = document.querySelectorAll('.calculator-section input');
    calculatorInputs.forEach(input => {
        input.addEventListener('input', calculateCost);
    });
});
