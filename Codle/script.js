// Generate a random 4-digit codeOWatt
let secretCode = generateSecretCode();

// Initialize game variables
let attempts = 10; // Number of attempts the player has
let checkAttempts = 4; // Number of check digit attempts the player has
let highLowAttempts = 5; // Number of high/low attempts the player has
let divAttempts = 3; // Number of high/low attempts the player has
let guessHistory = []; // Array to store the player's guesses

// Function to generate a random 4-digit code
function generateSecretCode() {
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

// Function to check the player's guess
function checkGuess() {
  let guessInput = document.getElementById("guess");
  let guess = guessInput.value;

  // Validate the guess
  if (guess.length !== 4 || isNaN(guess)) {
    alert("Please enter a 4-digit numerical guess!");
    return;
  }

  // Reduce the attempts count
  attempts--;

  // Check if the guess is correct
  if (guess === secretCode) {
    showResult("Congratulations! You guessed the secret code!", true);
    return;
  }

  // Check if the player has any attempts left
  if (attempts === 0) {
    showResult(`Game Over! The secret code was ${secretCode}`, false);
    return;
  }

  // Store the guess in the history
  guessHistory.push(guess);
  updateGuessHistory();
}
function provideCheckDigitsHint() {
  if (checkAttempts > 0) {
    let guess = document.getElementById("guess").value;
    console.log(guess);
    let checkDigits = getCorrectDigits(guess);
    document.getElementById("checkdig").textContent = checkDigits;
    document.getElementById("dattempts").textContent = `Checks left: ${--checkAttempts}`;
  } else {
    alert("You have used all your 'Check Digits' hints!");
  }
}

// Function to provide the "High/Low" hint
function provideHighLowHint() {
  if (highLowAttempts > 0) {
    let guess = document.getElementById("guess").value;
    console.log(guess);
    let highLow = getHighLowHint(guess);
    document.getElementById("highlow").textContent = highLow;
    document.getElementById("hlattempts").textContent = `Checks left: ${--highLowAttempts}`;
  } else {
    alert("You have used all your 'High/Low' hints!");
  }
}
function provideDivisibilityHint() {
  if (divAttempts > 0) {
    let guess = document.getElementById("guess").value;
    console.log(guess);
    let num = prompt("Please enter the number you want to check divisibility with")
    let divornot = getCheckDivHint(guess,num);
    document.getElementById("checkdiv").textContent = divornot;
    document.getElementById("divattempts").textContent = `Checks left: ${--divAttempts}`;
  } else {
    alert("You have used all your 'High/Low' hints!");
  }
}

function getCorrectDigits(guess) {
  let checkDigits = "";
  console.log(secretCode);
  for (let i = 0; i < 4; i++) {
    let flag=0;
    if (guess[i] === secretCode[i]) {
      checkDigits += guess[i]+" ";
      flag=1;
    }
    for(let j=0; j<4; j++){
      if(guess[i]==secretCode[j] && flag===0){
        checkDigits += "* "; 
        flag=1;
        break;
      } 
    }
    if(flag===0) {
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
      highLow += "L ";
    } else if (guess[i] > secretCode[i]) {
      highLow += "H ";
    } else {
      highLow += "= ";
    }
  }
  return highLow;
}
function getCheckDivHint(guess,num) {
  if(secretCode%num==0){
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
  document.getElementById("remainingAttempts").textContent= isWin ? `Remaining Attempts: ${attempts}` : `Remaining Attempts: ${0}`;;
  document.getElementById("guess").disabled = true;
  document.getElementsByTagName("button")[0].disabled = true;
  let buttons=document.getElementsByTagName("button");
  for (let i = 1; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }
  document.getElementById("reset").disabled = false;
}
function resetGame() {
  // Reset game variables
  attempts = 10;
  checkAttempts = 4;
  highLowAttempts = 5;
  divAttempts = 3;
  guessHistory = [];

  // Reset input and message
  document.getElementById("guess").value = "";
  document.getElementById("message").textContent = "";

  // Enable input and guess button
  document.getElementById("guess").disabled = false;
  document.getElementsByTagName("button")[0].disabled = false;
  let buttons=document.getElementsByTagName("button");
  for (let i = 1; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }

  // Clear guess history
  updateGuessHistory();

  // Reset hint displays and attempts count
  document.getElementById("checkdig").textContent = "";
  document.getElementById("dattempts").textContent = "Checks left: " + checkAttempts;
  document.getElementById("highlow").textContent = "";
  document.getElementById("hlattempts").textContent = "Checks left: " + highLowAttempts;
  document.getElementById("checkdiv").textContent = "";
  document.getElementById("divattempts").textContent = "Checks left: " + divAttempts;
}



