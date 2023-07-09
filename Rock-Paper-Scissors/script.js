function final_result(pscore, cscore) {
  let playerScore = document.getElementById('player-score')
  let compScore = document.getElementById('comp-score')
  let computerChoice = document.getElementById('comp-chooses')
  let result = document.getElementById('round-result')
  console.log("res")
  if (Number(pscore.innerText) == 10) {
    let finres = document.getElementById("final-result")
    finres.innerText = "You Win! 🎉"
    finres.style.color = "greenyellow"

    result.innerText = ""
    disableButtons()
    finres.classList.add("wave-animation");
  }
  if (Number(cscore.innerText) == 10) {
    let finres = document.getElementById("final-result")
    finres.innerText = "You Lose!!"
    finres.style.color = "red"

    result.innerText = ""
    disableButtons()
  }
}

function disableButtons() {
  let rock = document.getElementById("rock")
  let paper = document.getElementById("paper")
  let scissors = document.getElementById("scissors")

  rock.disabled = true
  paper.disabled = true
  scissors.disabled = true

}


function showResult(score, playerChoice, computerChoice) {
  let result = document.getElementById('round-result')
  switch (score) {
    case -1:
      result.classList.remove("wave-animation");
      result.style.color = "red"
      result.innerText = `Computer gets 1 point!`
      break;
    case 0:
      result.classList.remove("wave-animation");
      result.style.color = "white"
      result.innerText = `Draw!`
      break;
    case 1:
      result.style.color = "greenyellow"
      result.classList.remove("wave-animation");
      result.classList.add("wave-animation");
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
  if ((Number(pscore.innerText) == 10) || Number(cscore.innerText) == 10) {
    final_result(pscore, cscore)
  }

}

function endGame() {
  let playerScore = document.getElementById('player-score')
  let compScore = document.getElementById('comp-score')
  let computerChoice = document.getElementById('comp-chooses')
  let rresult = document.getElementById('round-result')
  let fresult = document.getElementById('final-result')
  let rock = document.getElementById("rock")
  let paper = document.getElementById("paper")
  let scissors = document.getElementById("scissors")

  scissors.disabled = false
  rock.disabled = false
  paper.disabled = false

  playerScore.innerText = 0
  compScore.innerText = 0
  rresult.innerText = ''
  fresult.innerText = ''
  result.classList.remove("wave-animation")
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

  let rButton = document.getElementById('restart')
  rButton.onclick = () => endGame()
  let quit = document.getElementById('quit')
}

playGame()
