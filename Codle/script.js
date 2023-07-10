
let secretCode = generateSecretCode();

let attempts = 10;
let checkAttempts = 3;
let highLowAttempts = 3;
let divAttempts = 3;
let guessHistory = [];
let guess;
const remainingAttemptsContainer = document.getElementById("remainingAttempts");
const controlButtonsContainer = document.getElementById("controlbtns");

let won=false;
// Generate a random 4-digit 
function generateSecretCode() {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}


function checkGuess() {
  let guess1 = document.getElementById("guess1").value.trim();
  let guess2 = document.getElementById("guess2").value.trim();
  let guess3 = document.getElementById("guess3").value.trim();
  let guess4 = document.getElementById("guess4").value.trim();

  guess = guess1 + guess2 + guess3 + guess4;

  for(let i=0; i<guess.length;i++){
    if(guess[i]==="") {
      alert("Please enter a 4-digit numerical guess!");
      return; 
    }
  }
  if (guess.length !== 4 || isNaN(guess)) {
    alert("Please enter a 4-digit numerical guess!");
    return;
  }

  attempts--;
  if (guess === secretCode) {
    won=true;
    updateGuessHistory();
    addHighScore(10 - attempts);
    document.getElementById("guessMsg").textContent = "";
  
    const remainingAttemptsContainer = document.getElementById("remainingAttempts");
    remainingAttemptsContainer.innerHTML = "";
  
    const congratulationsContainer = document.createElement("h2");
    congratulationsContainer.classList.add("animate-congratulations");
    congratulationsContainer.textContent = "Congratulations!";
    congratulationsContainer.style.color = "blue";
  
    const waveIcon = document.createElement("span");
    waveIcon.classList.add("animate-wave");
    waveIcon.textContent = "🎉";
    congratulationsContainer.appendChild(waveIcon);
  
    const attemptsText = document.createElement("p");
    attemptsText.textContent = `You guessed the secret code in ${10 - attempts} attempts!`;
    attemptsText.style.color = "blue";
    attemptsText.style.marginTop = "0";
  
    remainingAttemptsContainer.appendChild(congratulationsContainer);
    remainingAttemptsContainer.appendChild(attemptsText);
    remainingAttemptsContainer.style.marginTop = "0";
    controlButtonsContainer.style.marginTop = "15px";

  
    showResult();
    return;
  }
  
  else {
    document.getElementById("guessMsg").textContent = "Wrong Guess!";
    document.getElementById("guessMsg").style.color = "red";
  }

  if (attempts === 0) {
    updateGuessHistory();
    let msg = document.getElementById("remainingAttempts").textContent;

    document.getElementById("remainingAttempts").style.fontSize = "25px";
    document.getElementById("remainingAttempts").style.color = "red";
    document.getElementById("remainingAttempts").innerHTML = msg + "<br>Game Over! The secret code was " + secretCode + "!";

    showResult();
    return;
  }

  guessHistory.push(guess);
  updateGuessHistory();
}


function clearInput() {
  document.getElementById("guess1").value = "";
  document.getElementById("guess2").value = "";
  document.getElementById("guess3").value = "";
  document.getElementById("guess4").value = "";

}




function moveToNextInput(currentInp) {
  if (currentInp < 4) {
    let nextInp = document.getElementById(`guess${currentInp + 1}`);
    nextInp.focus();
  }
}

function provideCheckDigitsHint() {
  if (checkAttempts === 1) {
    document.getElementById("cdbtn").style.backgroundColor = "#40a345";
    document.getElementById("cdbtn").disabled = true;
  }
  if (checkAttempts > 0) {
    let checkDigits = getCorrectDigits(guess);
    document.getElementById("checkdig").textContent = checkDigits;
    document.getElementById("dattempts").textContent = `Checks left: ${--checkAttempts}`;
  }
}

function provideHighLowHint() {
  if (highLowAttempts === 1) {
    document.getElementById("hlbtn").style.backgroundColor = "#40a345";
    document.getElementById("hlbtn").disabled = true;
  }
  if (highLowAttempts > 0) {
    let highLow = getHighLowHint(guess);
    document.getElementById("highlow").textContent = highLow;
    document.getElementById("hlattempts").textContent = `Checks left: ${--highLowAttempts}`;
  }
}
function provideDivisibilityHint() {
  if (divAttempts === 1) {
    document.getElementById("divbtn").style.backgroundColor = "#40a345";
    document.getElementById("divbtn").disabled = true;
  }
  if (divAttempts > 0) {
    let num = prompt("Please enter the number you want to check divisibility with")
    let divornot = getCheckDivHint(guess, num);
    document.getElementById("checkdiv").textContent = divornot;
    document.getElementById("divattempts").textContent = `Checks left: ${--divAttempts}`;
  }
}

function getCorrectDigits(guess) {
  let checkDigits = "";
  for (let i = 0; i < 4; i++) {
    let flag = 0;
    if (guess[i] === secretCode[i]) {
      checkDigits += guess[i] + " ";
      flag = 1;
    }
    for (let j = 0; j < 4; j++) {
      if (guess[i] == secretCode[j] && flag === 0) {
        checkDigits += "* ";
        flag = 1;
        break;
      }
    }
    if (flag === 0) {
      checkDigits += "- ";
    }
  }
  return checkDigits;
}

function getHighLowHint(guess) {
  let highLow = "";
  for (let i = 0; i < 4; i++) {
    if (guess[i] < secretCode[i]) {
      highLow += "H ";
    } else if (guess[i] > secretCode[i]) {
      highLow += "L ";
    } else {
      highLow += "= ";
    }
  }
  return highLow;
}
function getCheckDivHint(guess, num) {
  if (secretCode % num == 0) {
    return "Yes"
  }
  return "No";
}

function updateGuessHistory() {
  let guessHistoryContainer = document.querySelector("#guessHistory #guess-list");
  guessHistoryContainer.innerHTML = "";

  for (let i = 0; i < guessHistory.length; i++) {
    let guessItem = document.createElement("li");
    guessItem.textContent = guessHistory[i];
    guessHistoryContainer.appendChild(guessItem);
  }
  document.getElementById("remainingAttempts").textContent = `Remaining Attempts: ${attempts}`;
}

function showResult() {
  document.getElementById("guessbtn").disabled = true;
  document.getElementsByTagName("button")[0].disabled = true;
  let buttons = document.getElementsByTagName("button");
  for (let i = 1; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
  document.getElementById("reset").disabled = false;
  document.getElementById("infobtn").disabled = false;
  document.getElementById("quit").disabled = false;
}




let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

function updateHighScores() {
  const highScoresList = document.getElementById('highScoresList');
  highScoresList.innerHTML = '';

  for (let i = 0; i < highScores.length; i++) {
    const scoreItem = document.createElement('li');
    const scoreText = document.createElement('span');
    scoreText.textContent = highScores[i];
    scoreItem.appendChild(scoreText);
    highScoresList.appendChild(scoreItem);
  }
}

function saveHighScores() {
  localStorage.setItem('highScores', JSON.stringify(highScores));
}

function addHighScore(score) {
  highScores.push(score);
  highScores.sort((a, b) => a-b);
  if (highScores.length > 3) {
    highScores.pop();
  }
  updateHighScores();
  saveHighScores();
}

updateHighScores();

function toggleHighScores() {
  const dropdown = document.getElementById('highScoresDropdown');
  dropdown.classList.toggle('show');
}

document.getElementById('highScore').addEventListener('click', toggleHighScores);

// localStorage.clear();


//to transfer cursor and remove elemtent of previous i/p box if backspace is pressed and to check the guess if Enter is pressed.
document.addEventListener('keydown', function (event) {
  if (event.key === "Enter" && attempts>0 && won===false) {
    checkGuess();
  }
  if (event.key === 'Backspace') {
    let focusedElement = document.activeElement;
    if (focusedElement.tagName === 'INPUT' && focusedElement.value === '') {
      let previousElement = focusedElement.previousElementSibling;
      if (previousElement) {
        event.preventDefault();
        if (previousElement.tagName === 'INPUT') {
          previousElement.focus();
          previousElement.value = '';
        } else {
          let inputElements = previousElement.getElementsByTagName('input');
          if (inputElements.length > 0) {
            let lastInputElement = inputElements[inputElements.length - 1];
            lastInputElement.focus();
            lastInputElement.value = '';
          }
        }
      }
    } else {
      focusedElement.value = '';
    }
  }
});

document.getElementById('infobtn').addEventListener('click', function () {
  var infoContent = document.getElementById('info-content');
  if (infoContent.style.display === 'none') {
    infoContent.style.display = 'block';
  } else {
    infoContent.style.display = 'none';
  }
});


function resetGame() {
  attempts = 10;
  checkAttempts = 3;
  highLowAttempts = 3;
  divAttempts = 3;
  guessHistory = [];
  secretCode = generateSecretCode();
  guess="";


  document.getElementById("guessbtn").value = "";

  document.getElementById("guessbtn").disabled = false;
  document.getElementsByTagName("button")[0].disabled = false;
  let buttons = document.getElementsByTagName("button");
  for (let i = 1; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
  for (let i = 1; i < 5; i++) {
    document.getElementById(`guess${i}`).value = "";
  }

  updateGuessHistory();
  document.getElementById("hlbtn").style.backgroundColor = "#60e060";
  document.getElementById("cdbtn").style.backgroundColor = "#60e060";
  document.getElementById("divbtn").style.backgroundColor = "#60e060";
  document.getElementById("guessMsg").textContent = "";

  document.getElementById("checkdig").textContent = "";
  document.getElementById("dattempts").textContent = "Checks left: " + checkAttempts;
  document.getElementById("highlow").textContent = "";
  document.getElementById("hlattempts").textContent = "Checks left: " + highLowAttempts;
  document.getElementById("checkdiv").textContent = "";
  document.getElementById("divattempts").textContent = "Checks left: " + divAttempts;
  document.getElementById("remainingAttempts").style.color = "black";
  document.getElementById("remainingAttempts").style.fontSize = "20px";
  remainingAttemptsContainer.style.marginTop="30px";
  controlButtonsContainer.style.marginTop = "30px";
}



