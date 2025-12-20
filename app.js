//we put at the top so the scores are loaded before any logic runs

let userScore = localStorage.getItem("userScore")
  ? Number(localStorage.getItem("userScore"))
  : 0;

let computerScore = localStorage.getItem("computerScore")
  ? Number(localStorage.getItem("computerScore"))
  : 0;

// update UI
document.getElementById("user-score").textContent = userScore;
document.getElementById("computer-score").textContent = computerScore;

function popup() {
  document.getElementsByClassName("rules")[0].style.display = "block";
}

function closepopup() {
  document.getElementsByClassName("rules")[0].style.display = "none";
}

// computer choices automatically

const choices = ["rock", "paper", "scissor"];

function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

//user choice

function handleUserClick(e) {
  const userChoice = e.target.dataset.choice;
  playGame(userChoice);
}
// when the user click the image, js reads its choice and send it to playGame()

document.querySelectorAll(".images img").forEach((img) => {
  img.addEventListener("click", handleUserClick);
});

// function to compare two choices

function getWinner(user, computer) {
  if (user === computer) {
    return "draw";
  }

  if (
    (user === "rock" && computer === "scissor") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissor" && computer === "paper")
  ) {
    return "user";
  }

  return "computer";
}

//playGame Function
function playGame(userChoice) {
  const computerChoice = getComputerChoice();

  // hide triangle & lines
  document.querySelector(".images").style.display = "none";
  document
    .querySelectorAll(".line")
    .forEach((line) => (line.style.display = "none"));

  // show result section
  document.querySelector(".result").style.display = "flex";

  // get image sources
  const userImgSrc = document.querySelector(
    `[data-choice="${userChoice}"]`
  ).src;

  const computerImgSrc = document.querySelector(
    `[data-choice="${computerChoice}"]`
  ).src;

  // show picked images
  document.querySelector(
    ".user-picked"
  ).innerHTML = `<img src="${userImgSrc}" class="selected">`;

  document.querySelector(
    ".pc-picked"
  ).innerHTML = `<img src="${computerImgSrc}" class="selected">`;

  // winner logic
  const winner = getWinner(userChoice, computerChoice);

  const resultBox = document.querySelector(".final-result");
  const resultText = document.querySelector(".result-text");
  const nextBtn = document.querySelector(".next-btn");

  resultBox.style.display = "block";

  if (winner === "user") {
    resultText.textContent = "YOU WIN AGAINST PC";
    userScore++;
    document.getElementById("user-score").textContent = userScore;

    nextBtn.style.display = "inline-block";
  } else if (winner === "computer") {
    resultText.textContent = "YOU LOSE AGAINST PC";
    computerScore++;
    document.getElementById("computer-score").textContent = computerScore;

    nextBtn.style.display = "none";
  } else {
    resultText.textContent = "TIE UP";
    nextBtn.style.display = "none";
  }

  const userPicked = document.querySelector(".user-picked");
  const pcPicked = document.querySelector(".pc-picked");

  // reset old states
  userPicked.classList.remove("winner-ring", "loser-ring");
  pcPicked.classList.remove("winner-ring", "loser-ring");

  if (winner === "user") {
    userPicked.classList.add("winner-ring");
    pcPicked.classList.add("loser-ring");
  } else if (winner === "computer") {
    pcPicked.classList.add("winner-ring");
    userPicked.classList.add("loser-ring");
  }

  if (winner === "user") {
    userScore++;
    document.getElementById("user-score").textContent = userScore;
    localStorage.setItem("userScore", userScore);
  } else if (winner === "computer") {
    computerScore++;
    document.getElementById("computer-score").textContent = computerScore;
    localStorage.setItem("computerScore", computerScore);
  }

  localStorage.getItem("userScore");
  localStorage.getItem("computerScore");
}

//playagain function

function playAgain() {
  document.querySelector(".images").style.display = "block";

  document.querySelectorAll(".line").forEach((line) => {
    line.style.display = "block";
  });

  document.querySelector(".result").style.display = "none";
  document.querySelector(".final-result").style.display = "none";

  document.querySelector(".user-picked").innerHTML = "";
  document.querySelector(".pc-picked").innerHTML = "";

  document.querySelector(".next-btn").style.display = "none";
}

//hurray screen

function showHurrayScreen() {
  document.querySelector(".container").style.display = "none";
  document.querySelector(".next-btn").style.display = "none";
  document.querySelector(".hurray-screen").style.display = "flex";
}

//reset button

function resetGame() {
  //  Hide hurray screen
  document.querySelector(".hurray-screen").style.display = "none";

  //  Show main game container
  document.querySelector(".container").style.display = "block";

  const images = document.querySelector(".images");
  images.style.display = "block";

  document.querySelector(".user-picked").innerHTML = "";
  document.querySelector(".pc-picked").innerHTML = "";

  //  Hide result sections
  document.querySelector(".result").style.display = "none";
  document.querySelector(".final-result").style.display = "none";

  document.querySelectorAll(".choice").forEach((img) => {
    img.classList.remove("hide", "selected", "winner", "loser");
  });

  document.querySelectorAll(".line").forEach((line) => {
    line.style.display = "block";
    line.classList.remove("hide");
  });

  document.querySelector(".next-btn").style.display = "none";
}
