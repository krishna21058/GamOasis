
let secretCode = generateSecretCode();

let attempts = 10;
let checkAttempts = 3;
let highLowAttempts = 3;
let divAttempts = 3;
let guessHistory = [];


// Generate a random 4-digit 
function generateSecretCode() {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

function checkGuess() {
  let guess1 = document.getElementById("guess1").value;
  let guess2 = document.getElementById("guess2").value;
  let guess3 = document.getElementById("guess3").value;
  let guess4 = document.getElementById("guess4").value;

  let guess = guess1 + guess2 + guess3 + guess4;

  if (guess.length !== 4 || isNaN(guess)) {
    alert("Please enter a 4-digit numerical guess!");
    return;
  }

  attempts--;

  if (guess === secretCode) {
    showResult("Congratulations! You guessed the secret code!", true);
    return;
  }

  if (attempts === 0) {
    showResult(`Game Over! The secret code was ${secretCode}`, false);
    return;
  }

  guessHistory.push(guess);
  updateGuessHistory();

}

function clearInput() {
  document.getElementById("guess1").value="";
  document.getElementById("guess2").value="";
  document.getElementById("guess3").value="";
  document.getElementById("guess4").value="";


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
    let guess = document.getElementById("guess").value;
    console.log(guess);
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
    let guess = document.getElementById("guess").value;
    console.log(guess);
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
    let guess = document.getElementById("guess").value;
    console.log(guess);
    let num = prompt("Please enter the number you want to check divisibility with")
    let divornot = getCheckDivHint(guess, num);
    document.getElementById("checkdiv").textContent = divornot;
    document.getElementById("divattempts").textContent = `Checks left: ${--divAttempts}`;
  }
}

function getCorrectDigits(guess) {
  let checkDigits = "";
  console.log(secretCode);
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
  console.log(secretCode);
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
  let guessHistoryContainer = document.querySelector("#guessHistory .guess-list");
  guessHistoryContainer.innerHTML = "";

  for (let i = 0; i < guessHistory.length; i++) {
    let guessItem = document.createElement("li");
    guessItem.textContent = guessHistory[i];
    guessHistoryContainer.appendChild(guessItem);
  }
  document.getElementById("remainingAttempts").textContent = `Remaining Attempts: ${attempts}`;
}

function showResult(message, isWin) {
  document.getElementById("message").textContent = message;
  document.getElementById("message").style.color = isWin ? "green" : "red";
  document.getElementById("remainingAttempts").textContent = isWin ? `Remaining Attempts: ${attempts}` : `Remaining Attempts: ${0}`;;
  document.getElementById("guess").disabled = true;
  document.getElementsByTagName("button")[0].disabled = true;
  let buttons = document.getElementsByTagName("button");
  for (let i = 1; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
  document.getElementById("reset").disabled = false;
}
function resetGame() {
  attempts = 10;
  checkAttempts = 3;
  highLowAttempts = 3;
  divAttempts = 3;
  guessHistory = [];

  document.getElementById("guess").value = "";
  document.getElementById("message").textContent = "";

  document.getElementById("guess").disabled = false;
  document.getElementsByTagName("button")[0].disabled = false;
  let buttons = document.getElementsByTagName("button");
  for (let i = 1; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }

  updateGuessHistory();
  document.getElementById("hlbtn").style.backgroundColor = "#60e060";
  document.getElementById("cdbtn").style.backgroundColor = "#60e060";
  document.getElementById("divbtn").style.backgroundColor = "#60e060";

  document.getElementById("checkdig").textContent = "";
  document.getElementById("dattempts").textContent = "Checks left: " + checkAttempts;
  document.getElementById("highlow").textContent = "";
  document.getElementById("hlattempts").textContent = "Checks left: " + highLowAttempts;
  document.getElementById("checkdiv").textContent = "";
  document.getElementById("divattempts").textContent = "Checks left: " + divAttempts;
}



