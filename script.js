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
    // --- 햄버거 메뉴 기능 추가 ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // 페이지가 처음 로드될 때 계산기 초기화
    calculateCost();

    // 네비게이션 탭 스크롤 기능 및 활성화
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // 모바일 메뉴가 열려있으면 닫기
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // sticky navbar 높이를 고려하여 스크롤 위치 조정
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // 모든 탭의 active 클래스 제거
            document.querySelectorAll('.navbar a').forEach(item => item.classList.remove('active'));
            // 클릭된 탭에 active 클래스 추가
            this.classList.add('active');
        });
    });

    // 스크롤 위치에 따라 네비게이션 탭 활성화
    const sections = document.querySelectorAll('.section-card'); // section-box 대신 section-card 사용
    const navLinksList = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const navbarHeight = 70; // 네비게이션 바 높이 근사치
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - navbarHeight) {
                current = '#' + section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
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
