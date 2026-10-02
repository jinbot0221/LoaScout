const clock = document.querySelector('#clock');
const today = document.querySelector('#today');
const themeToggle = document.querySelector('#themeToggle');
const tabs = document.querySelectorAll('.tabs button');
const bubbles = document.querySelectorAll('.bubble');

const ranges = {
  day: ['+4.82%', '+3.67%', '+2.91%', '+1.84%', '-1.26%', '+0.92%', '-0.73%'],
  week: ['+9.74%', '+6.21%', '+8.08%', '+4.37%', '-3.44%', '+2.18%', '-2.09%'],
  month: ['+15.32%', '+11.85%', '+9.41%', '+13.22%', '-6.18%', '+5.73%', '-4.12%'],
};

function updateClock() {
  const now = new Date();
  clock.textContent = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).format(now);
  today.textContent = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric', weekday: 'short',
  }).format(now);
}

tabs.forEach((tab) => tab.addEventListener('click', () => {
  tabs.forEach((item) => item.classList.remove('active'));
  tab.classList.add('active');
  bubbles.forEach((bubble, index) => {
    const value = ranges[tab.dataset.range][index];
    bubble.querySelector('span').textContent = value;
    bubble.classList.toggle('negative', value.startsWith('-'));
  });
}));

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  themeToggle.textContent = document.body.classList.contains('light') ? '☀' : '◐';
});

document.querySelectorAll('.sector-card').forEach((card) => {
  card.addEventListener('click', () => card.classList.toggle('featured'));
});

updateClock();
window.setInterval(updateClock, 1000);
