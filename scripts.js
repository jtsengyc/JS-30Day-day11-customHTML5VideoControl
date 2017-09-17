const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progressHolder = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const playBtn = player.querySelector('.toggle');
const fullscreenBtn = player.querySelector('.fullscreen');

const skipBtns = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('[type="range"]');


function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function togglePlayBtn() {
  const icon = video.paused ? '▶︎' : '∎ ∎';
  playBtn.innerText = icon;
}

function skipVideo() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function updateVideoRange() {
  video[this.name] = this.value;
}

function updateProgress() {
  const ratio = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${ratio}%`;
}

let activeProgress = false, wasPlaying = false;

function clickProgress(e) {
  e.stopPropagation();
  const videoTime = e.offsetX / this.offsetWidth * video.duration;
  video.currentTime = videoTime;
  activeProgress = true;
  wasPlaying = video.played;
  video.pause();
}

function shiftProgress(e) {
  if(activeProgress) {
    const videoTime = e.offsetX / this.offsetWidth * video.duration;
    video.currentTime = videoTime;
  }
}

function resumeProgress() {
  if(wasPlaying) {
    video.play();
  }
  activeProgress = false;
}

function toggleFullscreen() {
  if(document.webkitFullscreenEnabled) {
    video.webkitEnterFullscreen();
  }
}

fullscreenBtn.addEventListener('click', toggleFullscreen);
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', togglePlayBtn);
video.addEventListener('pause', togglePlayBtn);
video.addEventListener('timeupdate', updateProgress);
progressHolder.addEventListener('mousedown', clickProgress);
progressHolder.addEventListener('mouseup', resumeProgress);
progressHolder.addEventListener('mousemove', shiftProgress);

skipBtns.forEach(btn => btn.addEventListener('click', skipVideo));
ranges.forEach(range => range.addEventListener('input', updateVideoRange))
