'use strict';

const player = document.querySelector('.player');
const playerOne = document.querySelector('.player--0');
const playerTwo = document.querySelector('.player--1');
const playerOneTotalScore = document.getElementById('score--0');
const playerTwoTotalScore = document.getElementById('score--1');
const playerOneCurrentScore = document.getElementById('current--0');
const playerTwoCurrentScore = document.getElementById('current--1');
const newBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');

// declare default value for starting the game
let winner;
let dice;
let currentPlayer;
let currentScore;
let playerOneTotalScoreNum;
let playerTwoTotalScoreNum;
// default declaration end

// set value to default state
const setToDefault = () => {
  document
    .querySelector(`.player--${currentPlayer === 2 ? 1 : 0}`)
    .classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
  document
    .querySelector(`.player--${winner === 1 ? 0 : 1}`)
    .classList.remove('player--winner');
  winner = null;
  currentPlayer = 1;
  dice = null;
  currentScore = 0;
  playerOneTotalScoreNum = 0;
  playerTwoTotalScoreNum = 0;
  setTextValue(playerOneTotalScore, playerOneTotalScoreNum);
  setTextValue(playerTwoTotalScore, playerTwoTotalScoreNum);
  setTextValue(playerOneCurrentScore, currentScore);
  setTextValue(playerTwoCurrentScore, currentScore);
  diceImg.classList.add('hidden');
};

// toggle the current player
const toggleCurrentPlayer = () => {
// my method
//   if (currentPlayer === 1) {
//     playerOne.classList.remove('player--active');
//     playerTwo.classList.add('player--active');
//     currentPlayer = 2;
//   } else {
//     playerOne.classList.add('player--active');
//     playerTwo.classList.remove('player--active');
//     currentPlayer = 1;
//   }
    
    // course's instructor method
    document.querySelector(`.player--${currentPlayer === 1 ? 0 : 1}`).classList.remove('player--active');
    document.querySelector(`.player--${currentPlayer === 1 ? 1 : 0}`).classList.add('player--active');
    currentPlayer = currentPlayer === 1 ? 2 : 1;
};

// add content value
const setTextValue = (query, value) => {
  query.textContent = value;
};

// set player one score to zero when hold-button is clicked
const setPlayerCurrentScoreZero = () => {
  currentScore = 0;
  setTextValue(
    document.getElementById(`current--${currentPlayer - 1}`),
    currentScore
  );
};

// select winner if their score is greater or equal to 100
const checkWinner = playerScore => {
  if (playerScore >= 100) {
    
    // my method  
    // if (currentPlayer === 1) {
    //   winner = 1;
    //   playerOne.classList.remove('player--active');
    //   playerOne.classList.add('player--winner');
    // } else {
    //   winner = 2;
    //   playerTwo.classList.remove('player--active');
    //   playerTwo.classList.add('player--winner');
    // }
      
    // course instructor method
    document.querySelector(`.player--${currentPlayer === 1 ? 0 : 1 }`).classList.remove('player--active');
    document.querySelector(`.player--${currentPlayer === 1 ? 0 : 1}`).classList.add('player--winner');
    winner = currentPlayer === 1 ? 1 : 2;
  }
};

// alter dice image if the dice value is change when rolling the dice
// this is the course instructor's method
const altDiceImg = dice => {
  diceImg.src = `dice-${dice}.png`;
};
// my method for alter image is using switch statement. Awful

// set default value
setToDefault();
// set default value

holdBtn.addEventListener('click', function () {
  if (winner === null) {
    if (currentPlayer === 1) {
      playerOneTotalScoreNum += currentScore;
      setTextValue(playerOneTotalScore, playerOneTotalScoreNum);
      setPlayerCurrentScoreZero();
      checkWinner(playerOneTotalScoreNum);
    } else if (currentPlayer === 2) {
      playerTwoTotalScoreNum += currentScore;
      setTextValue(playerTwoTotalScore, playerTwoTotalScoreNum);
      setPlayerCurrentScoreZero();
      checkWinner(playerTwoTotalScoreNum);
    }
    toggleCurrentPlayer();
  }
});

rollBtn.addEventListener('click', function () {
  diceImg.classList.remove('hidden');
  if (winner === null) {
    dice = Math.trunc(Math.random() * 6) + 1;
    altDiceImg(dice);
    // console.log(dice);
    if (dice !== 1) {
      currentScore += dice;
      // this is my way for altering player
      // if (currentPlayer === 1) {
      //     setTextValue(playerOneCurrentScore, currentScore);
      // } else if (currentPlayer === 2) {
      //     setTextValue(playerTwoCurrentScore, currentScore);
      // }

      // here is the course instructor's way
      document.getElementById(`current--${currentPlayer - 1}`).textContent =
        currentScore;
    } else {
      // this is my way for altering player
      // if (currentPlayer === 1) {
      //     setPlayerOneCurrentScoreZero();
      // } else if (currentPlayer === 2) {
      //     setPlayerTwoCurrentScoreZero();
      // }

      // here is the course instructor's way
      setPlayerCurrentScoreZero();
      toggleCurrentPlayer();
    }
  }
});

newBtn.addEventListener('click', function () {
  setToDefault();
});
