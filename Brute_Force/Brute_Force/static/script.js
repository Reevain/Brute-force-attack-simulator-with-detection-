let chart;
let attempts = 0;

function updateChart() {
  if (!chart) {
    const ctx = document.getElementById('attemptChart').getContext('2d');
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Attempts',
          data: [],
          borderColor: '#39ff14',
          borderWidth: 2,
          fill: false
        }]
      }
    });
  }
  chart.data.labels.push(new Date().toLocaleTimeString());
  chart.data.datasets[0].data.push(attempts);
  chart.update();
}

document.getElementById('attackForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  attempts = 0;
  document.getElementById('log-output').innerText = '';
  document.getElementById('status').innerText = 'Running';
  const tick = document.getElementById('tick');
  const success = document.getElementById('success');

  const payload = {
    target: document.getElementById('target').value,
    username: document.getElementById('username').value,
    passwords: document.getElementById('passwords').value,
    max_attempts: document.getElementById('max_attempts').value,
    delay: document.getElementById('delay').value
  };

  const res = await fetch('/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  const logBox = document.getElementById('log-output');
  const attemptsBox = document.getElementById('attempts');
  const durationBox = document.getElementById('duration');
  const startTime = Date.now();

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const text = decoder.decode(value);
    logBox.innerText += text;
    logBox.scrollTop = logBox.scrollHeight;
    if (text.includes('Failed')) tick.play();
    if (text.includes('✅')) success.play();
    attempts++;
    attemptsBox.innerText = attempts;
    durationBox.innerText = ((Date.now() - startTime) / 1000).toFixed(1);
    updateChart();
  }
  document.getElementById('status').innerText = 'Finished';
});
