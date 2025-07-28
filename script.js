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

    // 네비게이션 탭 스크롤 기능 및 활성화
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
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
    const sections = document.querySelectorAll('.section-box');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 70) { // 70px는 navbar 높이를 고려한 여백
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 계산기 버튼에 이벤트 리스너 연결 (HTML의 onclick을 대체하는 방식)
    const calculateButton = document.querySelector('.calculate-button');
    if (calculateButton) {
        calculateButton.addEventListener('click', calculateCost);
    }

    // 계산기 입력 필드 값이 변경될 때마다 다시 계산 (선택적 기능)
    const calculatorInputs = document.querySelectorAll('.calculator-section input');
    calculatorInputs.forEach(input => {
        input.addEventListener('input', calculateCost);
    });
});