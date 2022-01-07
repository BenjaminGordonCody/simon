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

let play = (target, targetDetail) => {
  target.style.background = targetDetail.highlight;
  console.log(targetDetail.sound);
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
    play(targets[i], targetDetails[i]);
  };
}
