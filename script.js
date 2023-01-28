// Get a reference to the video element and the buttons
let videoElement = document.querySelector('#video');
let controls_container = document.getElementById("controls");
let speedSelect = document.getElementById("speed-select");
let timelineProgress = document.getElementById("timeline-indicator");
let timelineProgress2 = document.getElementById("timeline");
let muteBtn = document.querySelector(".speaker");
let video = document.getElementById("video");
let playPauseButton = document.getElementById("play-pause");
let rewindButton = document.getElementById("backward");
let forwardButton = document.getElementById("forward");
let speedButton = document.getElementById("speed");
let fullscreenButton = document.getElementById("fullscreen");
let pictureInPictureButton = document.getElementById("picture-in-picture");
let speaker_range = document.getElementById("speaker_range");
let video_container = document.querySelector(".video_container");
let cards = document.querySelectorAll(".card");
let circle = document.querySelector(".circle");


forwardButton.addEventListener("click", forward);
playPauseButton.addEventListener("click", playPaues);
rewindButton.addEventListener("click", backward);
fullscreenButton.addEventListener("click", toggleFullScreen);
pictureInPictureButton.addEventListener("click", togglePictureInPicture);
muteBtn.addEventListener("click", mute);
video.addEventListener("timeupdate", updateTimeline);
speedSelect.addEventListener("change", VideoSpeed);
timelineProgress2.addEventListener("click", updateTimeLine);
speaker_range.addEventListener("click", volume)
videoElement.addEventListener("click", playPaues)

// on clicking the card, get its index
let zbc = [...cards].forEach((x, y) =>
  (x.addEventListener("click", () => {
    changeVideo(y)
  }))
)

function changeVideo(y) {
  obj.unshift(obj[y + 1]);
  obj.splice(y + 2, 1);
  rep();
  car();
  playPaues()
}

function car() {
  [...cards].forEach((x, y) => {
    x.children[0].src = obj[y + 1].poster;
    x.children[1].children[0].textContent = obj[y + 1].heading;
    x.children[1].children[1].textContent = obj[y + 1].description;
  })
}
car()

let newSource = document.createElement("source");

function rep() {
  newSource.src = obj[0].src;
  newSource.type = "video/mp4";
  video.setAttribute("poster", obj[0].poster)
  video.appendChild(newSource);
  document.querySelector(".video_container h1").textContent = obj[0].heading;
  document.querySelector(".heading_content").textContent = obj[0].heading;
  document.querySelector(".description_content").textContent = obj[0].description;

  video.load();
}
rep()


// shortcuts using keyboard events
document.addEventListener('keydown', (e) => {
  if (e.key == "i") {
    togglePictureInPicture()
  }
  if (e.key == "Enter") {
    playPaues()
  }
  if (e.key == "ArrowLeft") {
    backward()
  }
  if (e.key == "ArrowRight") {
    forward()
  }
  if (e.key == "f") {
    toggleFullScreen()
  }
  if (e.key == "m") {
    mute()
  }
  if (e.key == "ArrowUp") {
    if (video.volume < 1) video.volume += 0.05
    speaker_range.setAttribute("value", video.volume);
  }
  if (e.key == "ArrowDown") {
    if (video.volume > 0.05) video.volume -= 0.05
    speaker_range.setAttribute("value", video.volume);

  }
});


// add play or pause for controls function
function playPaues() {
  if (video.paused) {
    video.play();
    playPauseButton.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10,7A1,1,0,0,0,9,8v8a1,1,0,0,0,2,0V8A1,1,0,0,0,10,7Zm2-5A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20ZM14,7a1,1,0,0,0-1,1v8a1,1,0,0,0,2,0V8A1,1,0,0,0,14,7Z"/></svg>`
  } else {
    video.pause();
    playPauseButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="play-circle"><rect width="24" height="24" opacity="0"/><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><path d="M12.34 7.45a1.7 1.7 0 0 0-1.85-.3 1.6 1.6 0 0 0-1 1.48v6.74a1.6 1.6 0 0 0 1 1.48 1.68 1.68 0 0 0 .69.15 1.74 1.74 0 0 0 1.16-.45L16 13.18a1.6 1.6 0 0 0 0-2.36zm-.84 7.15V9.4l2.81 2.6z"/></g></g></svg>`;
  }
}

function forward() {
  video.currentTime += 5; // forward 5 seconds
}

function backward() {
  video.currentTime -= 5; // forward 5 seconds
}

// toggle fullscreen function
function toggleFullScreen() {
  /* for Firefox */
  if (video.mozRequestFullScreen) {
    if (document.mozFullScreenElement) {
      document.mozCancelFullScreen();
    } else {
      video.mozRequestFullScreen();
    }
  }
  /* Chrome, Safari and Opera */
  else if (video.webkitRequestFullscreen) {
    if (document.webkitFullscreenElement) {
      document.webkitExitFullscreen();
    } else {
      video.webkitRequestFullscreen();
    }
  }
}

// toggle picture in picture
function togglePictureInPicture() {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else {
    videoElement.requestPictureInPicture();
  }
}

// change the speed value on change
function VideoSpeed() {
  video.playbackRate = this.value;
  document.querySelector(".speed-label").textContent = `${this.value}x`
}
document.querySelector(".speed-label").textContent = `${speedSelect.value}x`


// timeline progress bar
// Get the video and timeline progress elements
// Update the timeline progress width
function updateTimeline() {
  var percentage = (video.currentTime / video.duration) * 100;
  timelineProgress.style.width = percentage + "%";
}

// Listen for the "timeupdate" event and call the updateTimeline function

// To change the current timeline on click

function updateTimeLine(event) {
  // The offsetWidth property returns the viewable width of an element (in pixels) including padding, border and scrollbar.
  var timelineWidth = timelineProgress2.offsetWidth;
  // The pageX property returns the horizontal coordinate  of the mouse pointer
  var clickPosition = event.pageX - timelineProgress2.offsetLeft;
  var percentage = (clickPosition / timelineWidth) * 100;
  var newTime = (video.duration * percentage) / 100;
  video.currentTime = newTime;
  timelineProgress.style.width = newTime + "%";
  // circle.style.marginLeft = `${newTime / 10.55}%`;
}
// toggle between speaker muteign

// Add event listener to the mute button
function mute() {
  // check the current volume of the video
  if (video.muted) {
    video.muted = false;
    muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" x="0" y="0" version="1.1" viewBox="0 0 29 29" xml:space="preserve"><path d="M12.657 23.415a1.83 1.83 0 01-1.146-.406L6.85 19.28H3.84A1.842 1.842 0 012 17.44v-5.88c0-1.015.825-1.84 1.84-1.84h3.01l4.661-3.729a1.826 1.826 0 011.946-.222c.644.31 1.043.945 1.043 1.659v14.145c0 .714-.399 1.349-1.043 1.658-.256.123-.53.184-.8.184zM4 17.28h3.2c.227 0 .447.077.625.219l4.675 3.74V7.761l-4.675 3.74a1.001 1.001 0 01-.625.219H4v5.56zM19.803 20.803a.999.999 0 01-.707-1.707C20.306 17.887 21 16.211 21 14.5s-.694-3.387-1.904-4.596A.999.999 0 1120.51 8.49C22.092 10.071 23 12.262 23 14.5s-.908 4.429-2.49 6.01a.993.993 0 01-.707.293z"/><path d="M22.632 23.632a.999.999 0 01-.707-1.707C23.879 19.97 25 17.264 25 14.5s-1.121-5.47-3.075-7.425a.999.999 0 111.414-1.414C25.666 7.988 27 11.209 27 14.5s-1.334 6.512-3.661 8.839a.997.997 0 01-.707.293zM16.975 17.975a1 1 0 01-.707-1.707c.465-.465.732-1.11.732-1.768s-.267-1.303-.732-1.768a1.002 1.002 0 010-1.415 1.002 1.002 0 011.415 0C18.52 12.156 19 13.316 19 14.5s-.48 2.344-1.317 3.182a1.001 1.001 0 01-.708.293z"/></svg>`;
  } else {
    video.muted = true;
    muteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 48 48"><path d="M33 24c0-3.53-2.04-6.58-5-8.05v4.42l4.91 4.91c.06-.42.09-.85.09-1.28zm5 0c0 1.88-.41 3.65-1.08 5.28l3.03 3.03C41.25 29.82 42 27 42 24c0-8.56-5.99-15.72-14-17.54v4.13c5.78 1.72 10 7.07 10 13.41zM8.55 6 6 8.55 15.45 18H6v12h8l10 10V26.55l8.51 8.51c-1.34 1.03-2.85 1.86-4.51 2.36v4.13a17.94 17.94 0 0 0 7.37-3.62L39.45 42 42 39.45l-18-18L8.55 6zM24 8l-4.18 4.18L24 16.36V8z"/><path fill="none" d="M0 0h48v48H0z"/></svg>`;
  }
}

function volume() {
  video.volume = speaker_range.value / 100;
}

// fading effects at top and bottom of the video element
let fadeOverlay1 = document.querySelector(".fading1")
let fadeOverlay2 = document.querySelector(".fading2")
let videoHeading = document.querySelector(".video_container h1")
let left = document.querySelector(".video_container")
left.addEventListener("mouseover", () => {
  videoHeading.style.display = "block";
  fadeOverlay1.style.opacity = 1;
  fadeOverlay2.style.opacity = 1;
  controls_container.style.display = "flex"
  timelineProgress2.style.display = "flex"
})
left.addEventListener("mouseout", () => {
  videoHeading.style.display = "none";
  fadeOverlay1.style.opacity = 0;
  fadeOverlay2.style.opacity = 0;
  timelineProgress2.style.display = "none"
  controls_container.style.display = "none"
})

// timer
var runtime = document.querySelector(".runtime");
var videoLength = document.querySelector(".VideoLength");
video.addEventListener("loadedmetadata", function () {
  videoLength.innerHTML = formatTime(video.duration);
});
video.addEventListener("timeupdate", function () {
  runtime.innerHTML = formatTime(video.currentTime);
  if (video.currentTime == video.duration) {
    changeVideo(Math.floor(Math.random() * obj.length))
  }
});
video.addEventListener("ended", function () {
  runtime.innerHTML = formatTime(video.duration);
});

function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
}

console.log(video.document);
console.log(video.duration);
if (video.duration == video.currentTime) {}