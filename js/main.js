let countdown;
let timeRemaining = 0;
let isPaused = false;

document.getElementById('startButton').addEventListener('click', startCountdown);
document.getElementById('pauseButton').addEventListener('click', () => {
  !isPaused ? pauseCountdown() : resumeCountdown();
});
document.getElementById('resetButton').addEventListener('click', resetCountdown);

function startCountdown() {
  const timeInput = document.getElementById('timeInput').value;
  const [minutes, seconds] = timeInput.split(':').map(Number);
  timeRemaining = (minutes * 60) + seconds;

  if (timeRemaining > 0 && !countdown) {
    countdown = setInterval(updateTimer, 1000);
  }
}

function updateTimer() {
  if (timeRemaining <= 0) {
    alert("Time's up!");
    resetCountdown();
    return;
  }

  timeRemaining--;

  const display = document.getElementById('timerDisplay');
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (timeRemaining < 10) {
    display.style.color = 'red';
  } else {
    display.style.color = '#333333';
  }
}

function pauseCountdown() {
  if (countdown) {
    document.getElementById("pauseButton").textContent = 'Resume';
    clearInterval(countdown);
    countdown = null;
    isPaused = true;
  }
}

function resumeCountdown() {
  if (isPaused && timeRemaining > 0) {
    document.getElementById("pauseButton").textContent = 'Pause';
    countdown = setInterval(updateTimer, 1000);
    isPaused = false;
  }
}

function resetCountdown() {
  clearInterval(countdown);
  countdown = null;
  timeRemaining = 0;
  document.getElementById('timerDisplay').textContent = '00:00';
  document.getElementById('timeInput').value = '';
  isPaused = false;
}