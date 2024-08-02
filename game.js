let gamePattern = [];
let userClickedPattern = [];
var started = false;
let level = 0;
const buttonColors = ["red", "green", "blue", "yellow"];
$(document).keypress(() => {
  if (!started) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});
$(".btn").click((e) => {
  let userChosenColor = e.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
const checkAnswer = (currentLevel) => {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    startOver();
  }
};

const startOver = () => {
  level = 0;
  gamePattern = [];
  started = false;
};
const nextSequence = () => {
  userClickedPattern = [];
  level++;
  $("#level-title").text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  animateClick(randomChosenColor);
  playSound(randomChosenColor);
};

function playSound(name) {
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animateClick(clickedButton) {
  $(`#${clickedButton}`).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => $(`#${currentColor}`).removeClass("pressed"), 100);
}
