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
  const choiceDiv = e.currentTarget;
  const userChoice = choiceDiv.dataset.choice;
  playGame(userChoice);
}

// when the user click the image, js reads its choice and send it to playGame()

document.querySelectorAll(".choice").forEach((choice) => {
  choice.addEventListener("click", handleUserClick);
});

// function to compare two choices

function getWinner(user, computer) {
  if (user === computer) {
    return "tie up";
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
    `[data-choice="${userChoice}"] img`
  ).src;

  const computerImgSrc = document.querySelector(
    `[data-choice="${computerChoice}"] img`
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

  const line1 = document.querySelector(".line-1");
  const line2 = document.querySelector(".line-2");
  if (winner === "user") {
    line1.textContent = "YOU WIN";
    line2.textContent = "AGAINST PC";
    userScore++;
    localStorage.setItem("userScore", userScore);
    document.getElementById("user-score").textContent = userScore;
    nextBtn.style.display = "inline-block";
  } else if (winner === "computer") {
    line1.textContent = "YOU LOSE";
    line2.textContent = "AGAINST PC";
    computerScore++;
    localStorage.setItem("computerScore", computerScore);
    document.getElementById("computer-score").textContent = computerScore;
    nextBtn.style.display = "none";
  } else {
    line1.textContent = "TIE UP";
    line2.textContent = "";
    nextBtn.style.display = "none";
  }

  const userPicked = document.querySelector(".user-picked");
  const pcPicked = document.querySelector(".pc-picked");

  // reset old states
  userPicked.classList.remove("winner-ring");
  pcPicked.classList.remove("winner-ring");

  if (winner === "user") {
    userPicked.classList.add("winner-ring");
  } else if (winner === "computer") {
    pcPicked.classList.add("winner-ring");
  }
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
