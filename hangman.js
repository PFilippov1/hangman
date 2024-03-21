'use strict';

document.body.onload = addElements;

function addElements() {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('wrapper');
  document.body.appendChild(wrapperDiv);
  //gallows wrapper
  const gallowsWrapper = document.createElement('div');
  gallowsWrapper.classList.add('gallows__wrapper');
  wrapperDiv.appendChild(gallowsWrapper);
  //gallows
  const gallows = document.createElement('div');
  gallows.classList.add('gallows');
  gallowsWrapper.appendChild(gallows);
  //gallows img
  const gallowsImg = document.createElement('img');
  gallowsImg.src = 'asset/img/gallows.svg'
  gallowsImg.alt = 'gallows';
  gallows.append(gallowsImg);
  //hangman
  const hangmanHead = document.createElement('span');
  hangmanHead.classList.add('hangman', 'h-head');
  const hangmanLArm = document.createElement('span');
  hangmanLArm.classList.add('hangman', 'l-arm');
  const hangmanRArm = document.createElement('span');
  hangmanRArm.classList.add('hangman', 'r-arm');
  const hangmanLLeg = document.createElement('span');
  hangmanLLeg.classList.add('hangman', 'l-leg');
  const hangmanRLeg = document.createElement('span');
  hangmanRLeg.classList.add('hangman', 'r-leg');
  const hangmanBody = document.createElement('span');
  hangmanBody.classList.add('hangman', 'h-body');
  gallowsWrapper.append(hangmanHead, hangmanBody, hangmanLArm, hangmanRArm, hangmanLLeg, hangmanRLeg);
  hideHangmanParts();

  //text div
  const gameName = document.createElement('h1');
  gameName.textContent = 'hangman game';
  gameName.textContent = gameName.textContent.toUpperCase();
  gameName.classList.add('game-name');
  gallowsWrapper.appendChild(gameName);
  //keyboard-text-wrapper
  const keyboardTextWrapper = document.createElement('div');
  keyboardTextWrapper.classList.add('keyboard-text__wrapper');
  wrapperDiv.append(keyboardTextWrapper);
  //guess word
  // object with words and hints

  const hintWordObject = [
    { word: 'Rocket', hint: 'Hint: It uses for travel to abroad earth' },
    { word: 'Chicago', hint: 'Hint: What is 3/7 chicken, 2/3 cat, and 2/4 goat?' },
    { word: 'Priest', hint: 'Hint: Who has married many people but has never been married himself?' },
    { word: 'Incorrectly', hint: 'Hint: Which word in the dictionary is spelled incorrectly?' },
    { word: 'Candle', hint: 'Hint: What gets shorter as it grows older?' },
    { word: 'Towel', hint: 'Hint: What gets wet while drying?' },
    { word: 'Refrigerator', hint: 'Hint: What`s always running but never gets hot?' },
    { word: 'Silence', hint: 'Hint: What is so fragile that saying its name breaks it?' },
    { word: 'Cutlery', hint: 'Hint: What do you buy to eat but never consume?' },
    { word: 'Promise', hint: 'Hint: What gets broken without being held?' },
    { word: 'Edam', hint: 'Hint:  What type of cheese is made backward?' },
    { word: 'Footsteps', hint: 'Hint: The more of them you take, the more you leave behind. What are they?' },
    { word: 'Pseudocode', hint: 'I’m a language for everything yet I have no real identity of my own. Good luck trying to compile me. What am I?' },
    { word: 'Compiler', hint: 'Hint: As a developer, you usually get mad at me because I complain a lot, although I’m usually right. What am I?' },
    { word: 'Java', hint: 'Hint: Knock, knock. Who’s there?.. very long pause….' },
    { word: 'Inheritance', hint: 'Hint: What is the object-oriented way to become wealthy?' }
  ]
  function getRandomHint(wordsObjHint) {
    const randomIndex = Math.floor(Math.random() * wordsObjHint.length);
    return wordsObjHint[randomIndex];
  }

  // Example usage word hint

  const randomHint = getRandomHint(hintWordObject);
  console.log(randomHint);
  const wordArray = randomHint.word.split('');
  console.log(wordArray) // splitted word as array
  const hiddenWord = wordArray.join('');
  console.log(hiddenWord);

  const guessWord = document.createElement('div');
  guessWord.classList.add('guess-word');
  guessWord.textContent = hideCorrectWord(wordArray);
  keyboardTextWrapper.append(guessWord);

  //delete after
  const guessWordHiddenHint = document.createElement('div');
  guessWordHiddenHint.classList.add('guess-word-hidden__hint');
  guessWordHiddenHint.textContent = hiddenWord;
  keyboardTextWrapper.append(guessWordHiddenHint);

  //word-hint
  const wordHint = document.createElement('div');
  wordHint.classList.add('word-hint');
  wordHint.textContent = randomHint.hint;
  keyboardTextWrapper.append(wordHint);
  //number of attempts
  const attempts = document.createElement('div');
  attempts.classList.add('attempts')
  keyboardTextWrapper.append(attempts);

  const numbOfAttempts = document.createElement('span');
  numbOfAttempts.classList.add('numb-attempts')
  numbOfAttempts.textContent = 'incorrect guesses:';
  const space = document.createTextNode(' '); //text node for space
  const numbOfAttemptsRed = document.createElement('span');
  numbOfAttemptsRed.classList.add('numb-attempts-red')
  numbOfAttemptsRed.textContent = '0/6';
  attempts.append(numbOfAttempts, space, numbOfAttemptsRed);

  //keyboard wrapper
  const keyboardWrapper = document.createElement('div');
  keyboardWrapper.classList.add('keyboard__wrapper');
  keyboardTextWrapper.append(keyboardWrapper);

  // let keyboard2 = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM'];
  // let keyboard = [81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 65, 83, 68, 70, 71, 72, 74, 75, 76, 90, 88, 67, 86, 66, 78, 77];
  const keyboard = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  const letters = keyboard.map((key) => {
    const keycode = key.toUpperCase();
    return keycode;
  });
  console.log(letters);

  init();
  function init() {
    let keys = '';
    for (let i = 0; i < keyboard.length; i++) {
      keys += '<div class="k-key" data="' + keyboard[i] + '">' + letters[i] + '</div>'

    }
    document.querySelector('.keyboard__wrapper').innerHTML = keys;

  }

  document.querySelector('.keyboard__wrapper').addEventListener('click', function (event) {
    if (event.target.classList.contains('k-key') && !event.target.classList.contains('active')) {
      const key = event.target.textContent.toLowerCase();
      console.log(key);
      updateHiddenWord(key);
      const guessedLetter = event.target.textContent.toLowerCase();
      if (!checkIfLetterIsInWord(guessedLetter)) {
        updateWrongAttempts();
      }
      event.target.classList.add('active');
    }
  });

  document.addEventListener('keydown', function (event) {
    const key = event.key.toLowerCase();
    const letterPattern = /[a-zA-Z]/;
    const pressedKey = document.querySelector('.keyboard__wrapper .k-key[data="' + key + '"]');
    if (letterPattern.test(key) && key.length === 1) {//check pattern and only 'simple' one symbol to type
      updateHiddenWord(key);
      const guessedLetter = key;
      //make condition to press button
      if (!checkIfLetterIsInWord(guessedLetter) && (!pressedKey.classList.contains('active'))) {
        updateWrongAttempts();
      }
      // const pressedKey = document.querySelector('.keyboard__wrapper .k-key[data="' + key + '"]');
      if (pressedKey) {
        console.log(pressedKey.getAttribute('data')); // button attribute 
        pressedKey.classList.add('active');
      }
    }
  });
} //end adds elements

// global variable for keeping wrong attempts
let wrongAttempts = 0;

// hide word
const hideCorrectWord = function (wordForHide) {
  for (let i = 0; i < wordForHide.length; i++) {
    wordForHide[i] = '_'
  }
  console.log(wordForHide);
  return wordForHide.join('');
}

const checkIfLetterIsInWord = function (guessedLetter) {
  const wordToGuess = document.querySelector('.guess-word-hidden__hint').textContent.toLowerCase();
  return wordToGuess.includes(guessedLetter);
}

const updateWrongAttempts = function () {
  wrongAttempts++;
  showParts(wrongAttempts);
  showModal(wrongAttempts)
  const numbOfAttemptsRed = document.querySelector('.numb-attempts-red');
  numbOfAttemptsRed.textContent = `${wrongAttempts}/6`;
}

//modal window after load all page end elements
window.addEventListener('load', function () {
  createModal();
});

function createModal() {
  const modalWrapper = document.createElement('div');
  modalWrapper.classList.add('modal__wrapper');
  document.body.appendChild(modalWrapper);
  modalWrapper.style.display = 'none'; // Hide initially

  const modalWindow = document.createElement('div');
  modalWindow.classList.add('modal__window');
  modalWrapper.appendChild(modalWindow);

  const modalContent = document.createElement('div');
  modalContent.classList.add('modal__content');
  modalWindow.appendChild(modalContent);

  const gameSecretWord = document.createElement('h2');
  gameSecretWord.classList.add('game__result');

  const modalPlayAgainBtn = document.createElement('button');
  modalPlayAgainBtn.classList.add('play-again__button');
  modalPlayAgainBtn.textContent = 'Play again';
  modalWindow.appendChild(modalPlayAgainBtn);

  // modalContent.appendChild(gameResultMessage);
  modalContent.appendChild(gameSecretWord);
  modalContent.appendChild(modalPlayAgainBtn);
  playButton();
}

const updateHiddenWord = function (guessedLetter) {
  const hiddenWordElement = document.querySelector('.guess-word');
  const wordToGuess = document.querySelector('.guess-word-hidden__hint').textContent;
  let updatedWord = '';

  for (let i = 0; i < wordToGuess.length; i++) {
    if (wordToGuess[i].toLowerCase() === guessedLetter) {
      updatedWord += guessedLetter.toUpperCase();
    } else {
      updatedWord += hiddenWordElement.textContent[i];
    }
  }
  hiddenWordElement.textContent = updatedWord;

  if (updatedWord.toLowerCase() === wordToGuess.toLowerCase()) {
    showModal(wrongAttempts);
  }
}

function hideHangmanParts() {
  const parts = document.querySelectorAll('.hangman')
  const hangmanParts = parts.forEach(part => {
    part.style.visibility = 'hidden';
  });
  console.log(parts)
}

// showPart after check letter
function showParts(qtyOfParts) {
  const parts = document.querySelectorAll('.hangman')
  if (qtyOfParts <= 6) {
    for (let i = 0; i < qtyOfParts; i++) {
      parts[i].style.visibility = 'visible';
    }
  }
}

function showModal(qtyOfParts) {
  const wordToGuess = document.querySelector('.guess-word-hidden__hint').textContent.toLowerCase();
  console.log(wordToGuess)
  const word = document.querySelector('.guess-word').textContent.toLowerCase();
  console.log(word)
  const modalSecretWord = document.querySelector('.game__result');
  if (wordToGuess === word || qtyOfParts === 6) {
    const modalWrapper = document.querySelector('.modal__wrapper');
    modalWrapper.style.display = 'block';
    modalSecretWord.textContent = word === wordToGuess
      ? `Congratulations! You win! The secret word is : "${wordToGuess.toUpperCase()}"` :
      'Sorry, you lost! The secret word was "' + wordToGuess.toUpperCase() + '"';
  }

  const modal = document.querySelector(".modal__window");
  modal.addEventListener("keydown", (event) => {
    event.preventDefault();
  });

  modal.addEventListener("focusin", (event) => {
    event.target.blur();
  });

  //disable scrolling 
  document.body.style.overflow = 'hidden';
}

function playButton() {
  const modalPlayAgainBtn = document.querySelector('.play-again__button');
  modalPlayAgainBtn.addEventListener('click', () => {
    document.querySelector('.modal__wrapper').style.display = 'none';
    //change attempts to 0
    wrongAttempts = 0;
    const numbOfAttemptsRed = document.querySelector('.numb-attempts-red');
    numbOfAttemptsRed.textContent = `${wrongAttempts}/6`;
    //hide word   
    hideHangmanParts();

    const hintWordObject = [
      { word: 'Rocket', hint: 'Hint: It uses for travel to abroad earth' },
      { word: 'Chicago', hint: 'Hint: What is 3/7 chicken, 2/3 cat, and 2/4 goat?' },
      { word: 'Priest', hint: 'Hint: Who has married many people but has never been married himself?' },
      { word: 'Incorrectly', hint: 'Hint: Which word in the dictionary is spelled incorrectly?' },
      { word: 'Candle', hint: 'Hint: What gets shorter as it grows older?' },
      { word: 'Towel', hint: 'Hint: What gets wet while drying?' },
      { word: 'Refrigerator', hint: 'Hint: What`s always running but never gets hot?' },
      { word: 'Silence', hint: 'Hint: What is so fragile that saying its name breaks it?' },
      { word: 'Cutlery', hint: 'Hint: What do you buy to eat but never consume?' },
      { word: 'Promise', hint: 'Hint: What gets broken without being held?' },
      { word: 'Edam', hint: 'Hint:  What type of cheese is made backward?' },
      { word: 'Footsteps', hint: 'Hint: The more of them you take, the more you leave behind. What are they?' },
      { word: 'Pseudocode', hint: 'I’m a language for everything yet I have no real identity of my own. Good luck trying to compile me. What am I?' },
      { word: 'Compiler', hint: 'Hint: As a developer, you usually get mad at me because I complain a lot, although I’m usually right. What am I?' },
      { word: 'Java', hint: 'Hint: Knock, knock. Who’s there?.. very long pause….' },
      { word: 'Inheritance', hint: 'Hint: What is the object-oriented way to become wealthy?' }
    ]
    function getRandomHint(wordsObjHint) {
      const randomIndex = Math.floor(Math.random() * wordsObjHint.length);
      return wordsObjHint[randomIndex];
    }

    getRandomHint(hintWordObject);
    //hide word
    const randomHint = getRandomHint(hintWordObject);
    const wordArray = randomHint.word.split('');
    // const hiddenWord = wordArray.join('');
    const guessWord = document.querySelector('.guess-word')
    guessWord.textContent = hideCorrectWord(wordArray);

    //word-hint
    const wordHint = document.querySelector('.guess-word-hidden__hint');
    wordHint.textContent = randomHint.word;
    //hint
    const hint = document.querySelector('.word-hint');
    hint.textContent = randomHint.hint;

    //disable active for keys
    document.querySelectorAll('.k-key').forEach(key => {
      key.classList.remove('active')
    })
    //enable scrolling 
    document.body.style.overflow = 'auto';
  })

  //add possibility use space and enter keyboard keys 
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      modalPlayAgainBtn.click();
    }
  });
}