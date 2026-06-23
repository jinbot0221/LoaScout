const screenPreview = document.querySelector('#screenPreview');
const analysisState = document.querySelector('#analysisState');
const shareButton = document.querySelector('#shareButton');
const demoButton = document.querySelector('#demoButton');
const reportButton = document.querySelector('#reportButton');

let sharing = false;
let analysisTimer;

function setSharing() {
  sharing = true;
  screenPreview.classList.add('active');
  analysisState.textContent = '화면 공유가 준비되었습니다. 분석을 시작하세요';
}

function runDemoAnalysis() {
  if (!sharing) setSharing();
  window.clearTimeout(analysisTimer);
  screenPreview.classList.add('analyzing');
  analysisState.textContent = 'AI가 전투 로그와 화면 요소를 분석 중입니다';
  analysisTimer = window.setTimeout(() => {
    screenPreview.classList.remove('analyzing');
    analysisState.textContent = '분석 완료: 다음 트라이에서 약 18.6% 딜 상승 여지가 있습니다';
  }, 2200);
}

shareButton.addEventListener('click', setSharing);
demoButton.addEventListener('click', runDemoAnalysis);
reportButton.addEventListener('click', runDemoAnalysis);
