const screenPreview = document.querySelector('#screenPreview');
const analysisState = document.querySelector('#analysisState');
const shareButton = document.querySelector('#shareButton');
const demoButton = document.querySelector('#demoButton');
const reportButton = document.querySelector('#reportButton');
const shareOptions = document.querySelectorAll('[data-share-surface]');
const previewVideo = document.querySelector('#previewVideo');
const reportPreview = document.querySelector('#reportPreview');
const reportClose = document.querySelector('#reportClose');

let sharing = false;
let selectedSurface = 'window';
let analysisTimer;
let activeStream;

const surfaceLabels = {
  monitor: '전체 화면',
  window: '게임 창',
  browser: '브라우저 탭',
};

function updateShareOption(nextSurface) {
  selectedSurface = nextSurface;
  shareOptions.forEach((button) => {
    const isSelected = button.dataset.shareSurface === selectedSurface;
    button.classList.toggle('selected', isSelected);
    button.setAttribute('aria-pressed', String(isSelected));
  });
  if (!sharing) {
    analysisState.textContent = `${surfaceLabels[selectedSurface]} 공유를 선택했습니다. 화면 공유 시작 버튼을 눌러주세요`;
  }
}

async function setSharing() {
  if (!navigator.mediaDevices?.getDisplayMedia) {
    enableMockSharing('이 브라우저는 화면 공유 API를 지원하지 않아 데모 화면으로 전환했습니다');
    return;
  }

  try {
    activeStream?.getTracks().forEach((track) => track.stop());
    activeStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: selectedSurface,
        frameRate: { ideal: 30, max: 60 },
      },
      audio: false,
    });
    sharing = true;
    previewVideo.srcObject = activeStream;
    previewVideo.hidden = false;
    screenPreview.classList.add('active', 'has-stream');
    analysisState.textContent = `${surfaceLabels[selectedSurface]} 공유 중입니다. 분석을 시작하세요`;

    const [track] = activeStream.getVideoTracks();
    track?.addEventListener('ended', stopSharing);
  } catch (error) {
    const message = error?.name === 'NotAllowedError'
      ? '화면 공유 권한이 취소되었습니다. 공유할 화면을 다시 선택해주세요'
      : '화면 공유를 시작하지 못했습니다. 데모 분석은 계속 실행할 수 있습니다';
    analysisState.textContent = message;
  }
}

function stopSharing() {
  activeStream = undefined;
  sharing = false;
  previewVideo.srcObject = null;
  previewVideo.hidden = true;
  screenPreview.classList.remove('active', 'has-stream', 'analyzing');
  analysisState.textContent = '화면 공유가 종료되었습니다. 다시 공유할 화면을 선택해주세요';
}

function enableMockSharing(message = '데모 화면 공유가 준비되었습니다. 분석을 시작하세요') {
  sharing = true;
  screenPreview.classList.add('active');
  analysisState.textContent = message;
}

function runDemoAnalysis({ showReport = false } = {}) {
  if (!sharing) enableMockSharing();
  window.clearTimeout(analysisTimer);
  screenPreview.classList.add('analyzing');
  analysisState.textContent = 'AI가 전투력 분석기와 전투 화면 요소를 분석 중입니다';
  analysisTimer = window.setTimeout(() => {
    screenPreview.classList.remove('analyzing');
    analysisState.textContent = '분석 완료: 다음 트라이에서 약 18.6% 딜 상승 여지가 있습니다';
    if (showReport) showReportPreview();
  }, 1200);
}

function showReportPreview() {
  reportPreview.hidden = false;
  reportPreview.classList.add('visible');
  reportPreview.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function hideReportPreview() {
  reportPreview.classList.remove('visible');
  reportPreview.hidden = true;
}

shareOptions.forEach((button) => {
  button.addEventListener('click', () => updateShareOption(button.dataset.shareSurface));
});
shareButton.addEventListener('click', setSharing);
demoButton.addEventListener('click', () => runDemoAnalysis());
reportButton.addEventListener('click', () => runDemoAnalysis({ showReport: true }));
reportClose.addEventListener('click', hideReportPreview);
updateShareOption(selectedSurface);
