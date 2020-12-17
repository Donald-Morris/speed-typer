const word = document.getElementById('word');
const text = document.getElementById('text');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const settings = document.getElementById('settings');
const settingsBtn = document.getElementById('settings-btn');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const endgameEl = document.getElementById('end-game-container');

//list of words
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

//init word
let randomWord;

//init score
let score = 0;

//init time
let time = 10;

//init difficulty
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';
//set difficulty value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

//focus input
text.focus();

//start countdown
const timeInterval = setInterval(updateTime, 1000);

//get random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}
//update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

//update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    //end game
    gameOver();
  }
}

//game over
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onCLick='location.reload()'>Replay</button>`;
  endgameEl.style.display = 'flex';
}
addWordToDOM();

//event listeners
text.addEventListener('input', e => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    //clear e.target.value
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
});

//hide settings
settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
});

//difficulty setting
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
