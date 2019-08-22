var colours = ["red", "blue", "green", "yellow"];
var userArray = [];
var gamePattern = [];
var level = 0;
var started = false;

$(document).on("keydown", function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

window.addEventListener('touchstart', function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

function startOver() {
  level = 0;
  gamePattern = [];
  userArray = [];
  started = false;
}

function animateButton(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(function() {
    $("#" + colour).removeClass("pressed");
  }, 100);
}

function playSound(colour) {
  switch (colour) {
    case "blue":
      sound = new Audio("sounds/blue.mp3");
      sound.play();
      break;
    case "red":
      sound = new Audio("sounds/red.mp3");
      sound.play();
      break;
    case "yellow":
      sound = new Audio("sounds/yellow.mp3");
      sound.play();
      break;
    case "green":
      sound = new Audio("sounds/green.mp3");
      sound.play();
      break;
    default:
      console.log(colour);
      break;
  }
}

function nextSequence() {
  var randomNumber = Math.floor((Math.random() * 4));
  var randomColour = colours[randomNumber];
  gamePattern.push(randomColour);
  $("#" + randomColour).fadeOut(100).fadeIn(100);
  playSound(randomColour);
  level++;
  $("h1").html("Level " + level);
  userArray = [];
}

$(".btn").click(function(event) {
  var selectedButton = event.target.id;
  animateButton(selectedButton);
  userArray.push(selectedButton);
  playSound(selectedButton);
  checkPattern(userArray.length - 1);
});

function checkPattern(level) {
  if (userArray[level] == gamePattern[level]) {
    if (gamePattern.length === userArray.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("GAME OVER, press a key to restart");
    startOver();
  }
}
