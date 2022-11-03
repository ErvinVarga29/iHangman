const word = document.getElementById('word');
const incorrect = document.getElementById('incorrect');
const incorrectLettersEl = document.querySelector('#incorrect p');
const finalMsg = document.getElementById('msg-info');
const lmsg = document.getElementById('l-msg')
const msgInfoL = document.getElementById('lose-msg');
const playBtn = document.getElementById('play');
const playBtn2 = document.getElementById('play2');
const indication = document.getElementById('indication');
const stand = document.getElementById('stand')
const losing = document.getElementById('lost')


// List of words
const wordList = [
  'adam',
  // 'alexandra',
  // 'andres',
  // 'angela',
  // 'anna',
  // 'antonio',
  // 'carolin',
  // 'carolina',
  // 'costache',
  // 'daniel',
  // 'daniela',
  // 'ekta',
  // 'ervin',
  // 'ezequiel',
  // 'fernando',
  // 'fiodor',
  // 'frances',
  // 'ioannis',
  // 'iwona',
  // 'jakob',
  // 'josip',
  // 'marco',
  // 'matias',
  // 'melissa',
  // 'micaela',
  // 'nicolas',
  // 'pablo',
  // 'ruben',
  // 'sijin',
  // 'tomas',
  // 'toni',
  // 'vika',
  // 'zoey',
];

//Global Variable to decide win or lose
let winLose = null;
// Word that is selected to play
let selectedWord = null;
// Stores the count of no.of incorrectly typed letters
let incorrectCount = 0;
// Number of wrong guesses
let wrongGuesses = 6;
// Correct letters typed by the player
const correctLetters = [];
// Incorrect letters typed by the player
const incorrectLetters = [];

// Select a word randomly from wordList and initialize in the DOM
function initializeWord() {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)];
  const noOfLetters = selectedWord.length;
  for (let i = 0; i < noOfLetters; i++) {
    const listItem = document.createElement('li');
    listItem.classList.add('letter');
    word.appendChild(listItem);
  }
}
// Displays an indication sliding from the bottom
function displayIndication() {
  indication.classList.add('visible');

  setTimeout(() => {
    indication.classList.remove('visible');
  }, 1200);
}

// Update image when incorrect letters typed
function updateImg() {
    incorrectCount++
    if (incorrectCount < 7){
      document.getElementById("stand").src = `/images/pic${incorrectCount}.png`
    }

}

// Update guesses when incorrect letters typed

 function guessCounter() {
    wrongGuesses--
    document.getElementById("wrong-count").innerText = `${wrongGuesses}`
 }


// When player wins


function successState() {
    //setting winLose variable to string "win"
  finalMsg.classList.add('visible')
  window.removeEventListener('keyup', check);

}


// When player loses
function failureState() {
  //setting winLose variable to string "lose"

lmsg.classList.add('visible') 
document.getElementById('secondSpan').innerText = `"${selectedWord}"`
window.removeEventListener('keyup', check);

}

// Check if typed key is part of the selected word and update in the DOM if required
function check(ev) {
  const letterElements = document.querySelectorAll('.word .letter');
  const character = ev.key;

  // Handle keyboard events

  //if statement to check winLose state
  //if not "win" or "lose" then great, go ahead,if so, cant do it

  if (
    !indication.classList.contains('visible') &&
    ev.keyCode >= 65 && ev.keyCode <= 90
  )

  {
    if (selectedWord.includes(character)) {
      if (correctLetters.includes(character)) {
        displayIndication();
      } else {
        correctLetters.push(character);
        const indexes = [];
        [...selectedWord].forEach((value, index) => {
          if (value === character) {
            indexes.push(index);
          }
        });
        indexes.forEach((value) => {
          letterElements[value].textContent = character;
        });
      }
    } else {
      if (incorrectLetters.includes(character)) {
        displayIndication();
      } else {
        incorrectLetters.push(character);
        if (!incorrect.classList.contains('visible')) {
          incorrect.classList.add('visible');          
        }
        incorrectLettersEl.textContent = `${incorrectLetters.join(', ')}`;
        updateImg()
        guessCounter()

        
      }
      
    }
    
  }

  // Create a word from all letter items
  let formedWord = '';
  letterElements.forEach((value) => {
    formedWord += value.textContent;
  });

  // Check if created word is correct
  if (formedWord === selectedWord) {
   return successState();
  }

  // Check if game was lost

  if (incorrectCount >= 6) {
    return failureState();
  }

}


 

// Play button (reset)
function startNewGame() {
  selectedWord = null;
  incorrectCount = 0;
  wrongGuesses = 6;
  correctLetters.splice(0);
  incorrectLetters.splice(0);
  word.innerHTML = '';
  incorrect.classList.remove('visible');
  finalMsg.classList.remove('visible');
  lmsg.classList.remove('visible');
  document.getElementById("stand").src = `/images/pic0.png` 
  document.getElementById("wrong-count").innerText = "6"
  window.addEventListener('keyup', check);

  
  initializeWord();
}
// Start

initializeWord()

// Event Listeners
window.addEventListener('keyup', check);
playBtn.addEventListener('click', startNewGame);
playBtn2.addEventListener('click', startNewGame);

