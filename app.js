//describe target behaviours
let targetDetails = [
  {
    color: "darkred",
    highlight: "red",
    sound: new Audio("./audio/1.mp3"),
  },
  {
    color: "darkblue",
    highlight: "blue",
    sound: new Audio("./audio/2.mp3"),
  },
  {
    color: "darkgreen",
    highlight: "green",
    sound: new Audio("./audio/3.mp3"),
  },
  {
    color: "goldenrod",
    highlight: "yellow",
    sound: new Audio("./audio/4.mp3"),
  },
];

function defineTargets() {
  let lightAndSound = (target, targetDetail) => {
    target.style.background = targetDetail.highlight;
    targetDetail.sound.play();
    setTimeout(function () {
      target.style.background = targetDetail.color;
    }, 200);
  };

  //make targets in browser
  let targets = document.getElementsByClassName("target");
  for (let i = 0; i < targets.length; i++) {
    targets[i].style.background = targetDetails[i].color;
    targets[i].onclick = () => {
      document.getElementById("recordOfClicks").append(i);
      lightAndSound(targets[i], targetDetails[i]);
    };
  }
}

function generateSequence(length, limit) {
  let sequence = [];
  for (let i = 0; i < length; i++) {
    sequence[i] = Math.floor(Math.random() * limit);
  }
  return sequence.join("");
}

function hasWon() {
  let sequence = document.getElementById("sequence").innerText;
  let recordOfClicks = document.getElementById("recordOfClicks").innerText;

  if (sequence == recordOfClicks) {
    return true;
  } else {
    return false;
  }
}

defineTargets();

function setSequence(length) {
  let sequence = generateSequence(length, 4);
  document.getElementById("sequence").innerText = sequence;
}

function game() {
  let refresh = () => {
    setSequence(5);
    document.getElementById("recordOfClicks").innerText = "";
  };

  let gameState = "playing";
  setSequence(5);

  document.body.onclick = () => {
    console.log(gameState);
    if (gameState == "playing" && hasWon()) {
      gameState = "gameEnd";
      console.log("winner");
    } else if (gameState == "gameEnd") {
      refresh();
      gameState = "playing";
    } else if (
      gameState == "playing" &&
      document.getElementById("recordOfClicks").innerText.length >=
        document.getElementById("sequence").innerText.length
    ) {
      gameState = "gameEnd";
      console.log("loser");
    }
  };
}

game();
