function sleep(ms) {
  //lazy way to control audio playback
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
    targetDetail.sound.load();
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

  return targets;
}

let targets = defineTargets();

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

function setSequence(length) {
  let sequence = generateSequence(length, 4);
  document.getElementById("sequence").innerText = sequence;
}
async function playSequence(sequence) {
  for (let i = 0; i < sequence.length; i++) {
    targetDetails[sequence[i]].sound.load();
    document.body.style.background = targetDetails[sequence[i]].color;
    targetDetails[sequence[i]].sound.play();
    targets[sequence[i]].style.background =
      targetDetails[sequence[i]].highlight;
    await sleep(300);
    targets[sequence[i]].style.background = targetDetails[sequence[i]].color;
    document.body.style.background = "white";
  }
}
function game() {
  let refresh = () => {
    //get new game sequences
    setSequence(5);
    document.getElementById("recordOfClicks").innerText = "";

    //dissapear win/lose banners
    let endGamePages = document.getElementsByClassName("endGameBanner");
    for (let i = 0; i < endGamePages.length; i++) {
      endGamePages[i].style.display = "none";
    }

    //play new sequence
    playSequence(document.getElementById("sequence").innerText);
  };

  let gameState = "playing";
  refresh();

  document.body.onclick = () => {
    if (gameState == "playing" && hasWon()) {
      gameState = "gameEnd";
      document.getElementById("winPage").style.display = "block";
    } else if (gameState == "gameEnd") {
      refresh();
      gameState = "playing";
    } else if (
      gameState == "playing" &&
      document.getElementById("recordOfClicks").innerText.length >=
        document.getElementById("sequence").innerText.length
    ) {
      gameState = "gameEnd";
      document.getElementById("losePage").style.display = "block";
    }
  };
}

game();
