//scores
let userScore = Number(localStorage.getItem("userScore")) || 0;
let computerScore = Number(localStorage.getItem("computerScore")) || 0;

document.getElementById("user-score").textContent = userScore;
document.getElementById("computer-score").textContent = computerScore;


const choices = ["rock", "paper", "scissor"];
function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function getWinner(user, computer) {
  if (user === computer) return "tie";
  if (
    (user === "rock" && computer === "scissor") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissor" && computer === "paper")
  )
    return "user";
  return "computer";
}


const imagesWrap = document.querySelector(".images");
const triangle = document.querySelector(".triangle"); // hide whole triangle + choices
const resultArea = document.querySelector(".result");
const finalResult = document.querySelector(".final-result");
const userPickedEl = document.querySelector(".user-picked");
const pcPickedEl = document.querySelector(".pc-picked");
const line1 = document.querySelector(".line-1");
const line2 = document.querySelector(".line-2");
const nextBtn = document.querySelector(".next-btn");


resultArea.style.display = "none";
finalResult.style.display = "none";
nextBtn.style.display = "none";


document.querySelectorAll(".choice").forEach((choice) => {
  choice.addEventListener("click", (e) =>
    handleUserClick(e.currentTarget.dataset.choice)
  );
});

function handleUserClick(userChoice) {
  playGame(userChoice);
}


function playGame(userChoice) {
  const computerChoice = getComputerChoice();

  // Hide triangle
  document.querySelector(".images").style.display = "none";
  document.querySelector(".result").style.display = "flex";

  const userPickedBox = document.querySelector(".user-picked .clone");
  const pcPickedBox = document.querySelector(".pc-picked .clone");

  const userGlow = document.querySelector(".user-picked .winner-glow");
  const pcGlow = document.querySelector(".pc-picked .winner-glow");

  // Reset
  userGlow.style.display = "none";
  pcGlow.style.display = "none";
  userPickedBox.innerHTML = "";
  pcPickedBox.innerHTML = "";

  
  const userChoiceEl = document
    .querySelector(`[data-choice="${userChoice}"]`)
    .cloneNode(true);
  const pcChoiceEl = document
    .querySelector(`[data-choice="${computerChoice}"]`)
    .cloneNode(true);

  userChoiceEl.classList.add("clone");
  pcChoiceEl.classList.add("clone");

  userPickedBox.appendChild(userChoiceEl);
  pcPickedBox.appendChild(pcChoiceEl);

  const winner = getWinner(userChoice, computerChoice);

  const line1 = document.querySelector(".line-1");
  const line2 = document.querySelector(".line-2");
  const nextBtn = document.querySelector(".next-btn");

  nextBtn.style.display = "none";

  if (winner === "user") {
    line1.textContent = "YOU WIN";
    line2.textContent = "AGAINST PC";
    userGlow.style.display = "block";
    userScore++;
    localStorage.setItem("userScore", userScore);
    document.getElementById("user-score").textContent = userScore;
    nextBtn.style.display = "inline-block";
  } else if (winner === "computer") {
    line1.textContent = "YOU LOSE";
    line2.textContent = "AGAINST PC";
    pcGlow.style.display = "block";
    computerScore++;
    localStorage.setItem("computerScore", computerScore);
    document.getElementById("computer-score").textContent = computerScore;
  } else {
    line1.textContent = "TIE UP";
    line2.textContent = "";
    
  }

  document.querySelector(".final-result").style.display = "flex";
}

// PLAY AGAIN 
function playAgain() {
  document.querySelector(".images").style.display = "flex";
  document.querySelector(".result").style.display = "none";
  document.querySelector(".final-result").style.display = "none";

  document.querySelector(".user-picked .clone").innerHTML = "";
  document.querySelector(".pc-picked .clone").innerHTML = "";

  document.querySelector(".user-picked .winner-glow").style.display = "none";
  document.querySelector(".pc-picked .winner-glow").style.display = "none";

  document.querySelector(".next-btn").style.display = "none";
}

// HURRAY / NEXT 
function showHurrayScreen() {
  document.querySelector(".container").style.display = "none";
  document.querySelector(".hurray-screen").style.display = "flex";
}

// RESET
function resetGame() {
  document.querySelector(".hurray-screen").style.display = "none";
  document.querySelector(".container").style.display = "block";
  playAgain();
  nextBtn.style.display = "none";
}

function popup() {
  document.querySelector(".rules").style.display = "block";
}

function closepopup() {
  document.querySelector(".rules").style.display = "none";
}
