// // 1. Display empty correctLetter with word length of chosen word
//        >Need a bank of possible words
//        >one of words is randomly chosen
//    2. User inputs letter
//        >if userText = char in computerGuess then function(print correct letter in correct space)
//        >else if function(print wrongGuess letter)
//            & let guessRemain = 10; guessRemain--
//    3. if GuessRemain = 0 then reset
//    4. if corrrectLetter = computerGuess then winCounter++ & page reset 
// 
const maxTries = 9;           // Countdown as user guesses incorrectly
var wrongGuess = [];          // stores the letters the user already guessed
var guessingWord = [];        // word that we are building to currentWord
var currentWordIndex;         // Index number of the currentWord
var gameStarted = false;      // Boolean for game start
var hasFinished = false;      // Resets game 
var wins = 0;                 // win counter 
guessRemain = 0;         // 
// IDs: wins correctLetter guessRemain wrongGuess 
// Array of all the word options
var wordBank = ["MAPLE", "SYCAMORE", "BALD CYPRESS", "CATALPA", "BLACK LOCUS", "HEMLOCK"];

// Reset game
function resetGame() {

    // select random word from wordBank
    currentWordIndex = Math.floor(Math.random() * (wordBank.length));
    
    gameStarted = false;
    guessRemain = maxTries;
    wrongGuess = [];
    guessingWord = [];
    updateDisplay();

    // Build guessing word and clear it
    for (var i= 0; i < wordBank[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }

    updateDisplay();
};

function updateDisplay() {

    
    // Avoid commas from array. Concatenate a string from each value in the array.
    var guessingWordText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        guessingWordText =+ guessingWord[i];
    }

    
    // Link IDs to variables
    document.getElementById("wins").innerText = wins;
    document.getElementById("correctLetter").innerText = guessingWord;
    document.getElementById("guessRemain").innerText = guessRemain;
    document.getElementById("wrongGuess").innerText = wrongGuess
};


// Searches the string for the letters guessed by the user and replaces "_" with correct letters. 
function evaluateGuess (letter) {
    // empty array to store positions of letters in string 
    var positions = [];

    // Loop the word looking for guessed letter and store the index in array
    for (var i = 0; i < wordBank[currentWordIndex].length; i++) {
        if(wordBank[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // if incorrect guess, remove a guess
    if (positions.length <= 0) {
        guessRemain--;
    } else {
        // Loop through and replace with a letter if correct
        for (var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

// Check for a win by looking for any "_" and update wins. 
function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        wins++;
        hasFinished = true;
    }
};

// Check for loss
function checkLoss() {
    if(guessRemain <= 0) {
        hasFinished = true;
    }
}

// Makes a guess
function makeGuess(letter) {
    if (guessRemain > 0) {
        if (wrongGuess.indexOf(letter) === -1) {
            wrongGuess.push(letter);
            evaluateGuess(letter);
        }
    }
};

// Event listener
document.onkeydown = function(event) {
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    } else {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toUpperCase());
            updateDisplay()
            checkWin();
            checkLoss();
        }
    }
}; 



// This homework proved to be too much for me. I wrote something different trying to figure 
// out how to replace "_" with correct letters. But none of my code was working then I found 
// http://wedotechstuff.com/Articles/Javascript-Hangman-Tutorial and typed out their solution, but was still unable to get it working despite trying to debug for a while. 
