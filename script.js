function final_result(pscore, cscore) {
  console.log("res")
  if (Number(pscore.innerText) == 10) {
      let finres = document.getElementById("final-result")
      finres.innerText = "You Win!!"
  }
  if (Number(cscore.innerText) == 10) {
      let finres = document.getElementById("final-result")
      finres.innerText = "You Lose!!"
  }
}

function showResult(score, playerChoice, computerChoice) {
  let result = document.getElementById('round-result')
  switch (score) {
      case -1:
          result.innerText = `Computer gets 1 point!`
          break;
      case 0:
          result.innerText = `Draw!`
          break;
      case 1:
          result.innerText = `You get 1 point!`
          break;
  }
}


function getResult(playerChoice, computerChoice, pscore, cscore) {
  let score = 0
  if (playerChoice == computerChoice) {
      score = 0
  } else if (playerChoice == 'Rock' && computerChoice == 'Scissors') {
      pscore.innerText = Number(pscore.innerText) + 1
      score = 1

  } else if (playerChoice == "Paper" && computerChoice == "Rock") {

      pscore.innerText = Number(pscore.innerText) + 1
      score = 1
  } else if (playerChoice == "Scissors" && computerChoice == "Paper") {

      pscore.innerText = Number(pscore.innerText) + 1
      score = 1
  } else {

      score = -1
      cscore.innerText = Number(cscore.innerText) + 1

  }
  return score
}



function onClick(playerChoice, pscore, cscore) {
  let Choices = ['Rock', 'Paper', 'Scissors'];
  const computerChoice = Choices[Math.floor(Math.random() * 3)];
  console.log(playerChoice.value)
  let cChoice = document.getElementById('comp-chooses')
  cChoice.style.display = 'block'
  let img = document.querySelector("#comp-chooses img")
  let lab = document.querySelector("#comp-chooses label")
  img.src = `assets/${computerChoice}_inv.png`
  lab.innerText = `${playerChoice.value}`


  const score = getResult(playerChoice.value, computerChoice, pscore, cscore)
  showResult(score, playerChoice.value, computerChoice)
}

function endGame() {
  let playerScore = document.getElementById('player-score')
  let compScore = document.getElementById('comp-score')
  let computerChoice = document.getElementById('comp-chooses')
  let result = document.getElementById('final-result')
  playerScore.innerText = 0
  compScore.innerText = 0
  result.innerText = ''
}


function playGame() {
  let rock = document.getElementById("rock")
  let paper = document.getElementById("paper")
  let scissors = document.getElementById("scissors")

  let pScore = document.getElementById('player-score')
  let cScore = document.getElementById('comp-score')
  pScore.innerText = 0
  cScore.innerText = 0
  // while ((Number(pScore.innerText) < 0) && Number(cScore.innerText) < 10) {
  console.log("here")
  rock.onclick = () => onClick(rock, pScore, cScore)
  paper.onclick = () => onClick(paper, pScore, cScore)
  scissors.onclick = () => onClick(scissors, pScore, cScore)

  if ((Number(pScore.innerText) == 10) || Number(cScore.innerText) == 10) {
      final_result(cScore, pScore)
  }

  let quitButton = document.getElementById('restart')
  quitButton.onclick = () => endGame()
}



playGame()