'use strict';

const player = document.querySelector('.player');
const playerOneTotalScore = document.getElementById('score--0');
const playerTwoTotalScore = document.getElementById('score--1');
const playerOneCurrentScore = document.getElementById('current--0');
const playerTwoCurrentScore = document.getElementById('current--1');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');

// declare default value for starting the game
let totalScore;
let winner;
let dice;
let currentPlayer;
let currentScore;
// default declaration end

// set value to default state
const setToDefault = () => {
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector(`.player--${winner === 1 ? 0 : 1}`).classList.remove('player--winner');
  currentPlayer = 1;
  winner = null;
  dice = null;
  currentScore = 0;
  totalScore = [0, 0];
  setTextValue(playerOneTotalScore, totalScore[0]);
  setTextValue(playerTwoTotalScore, totalScore[1]);
  setTextValue(playerOneCurrentScore, currentScore);
  setTextValue(playerTwoCurrentScore, currentScore);
  diceImg.classList.add('hidden');
};

// toggle the current player
const toggleCurrentPlayer = () => {
    // course's instructor method
    currentScore = 0;
    setTextValue(document.getElementById(`current--${currentPlayer - 1}`), currentScore);
    document.querySelector(`.player--${currentPlayer === 1 ? 0 : 1}`).classList.remove('player--active');
    document.querySelector(`.player--${currentPlayer === 1 ? 1 : 0}`).classList.add('player--active');
    currentPlayer = currentPlayer === 1 ? 2 : 1;
};

// add content value
const setTextValue = (query, value) => {
  query.textContent = value;
};

// select winner if their score is greater or equal to 100
const checkWinner = playerScore => {
  if (playerScore >= 100) {
    // course instructor method
    document.querySelector(`.player--${currentPlayer === 1 ? 0 : 1 }`).classList.remove('player--active');
    document.querySelector(`.player--${currentPlayer === 1 ? 0 : 1}`).classList.add('player--winner');
    winner = currentPlayer === 1 ? 1 : 2;
    diceImg.classList.add('hidden');  
  }
};

// alter dice image if the dice value is change when rolling the dice
// this is the course instructor's method
// my method for alter image is using switch statement. Awful
const altDiceImg = dice => {
  diceImg.src = `dice-${dice}.png`;
};


// set default value
setToDefault();
// set default value

holdBtn.addEventListener('click', function () {
  if (winner === null) {
    totalScore[currentPlayer === 1 ? 0 : 1] += currentScore;
    setTextValue(document.getElementById(`score--${currentPlayer === 1 ? 0 : 1}`), totalScore[currentPlayer === 1 ? 0 : 1]);
    checkWinner(totalScore[currentPlayer === 1 ? 0 : 1]);
    toggleCurrentPlayer();
  }
});

rollBtn.addEventListener('click', function () {
  diceImg.classList.remove('hidden');
  if (winner === null) {
    dice = Math.trunc(Math.random() * 6) + 1;
    altDiceImg(dice);
    if (dice !== 1) {
      currentScore += dice;     
      // here is the course instructor's way
      document.getElementById(`current--${currentPlayer - 1}`).textContent = currentScore;
    } else {     
      // here is the course instructor's way
      toggleCurrentPlayer();
    }
  }
});

newBtn.addEventListener('click', setToDefault);
