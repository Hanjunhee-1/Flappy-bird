const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// 종료화면을 보여줄때 game-container 를 흐릿하게 처리하기 위해 필요합니다.
const gameContainer = document.getElementById('game-container');

const flappyImg = new Image();
flappyImg.src = 'assets/bird.png';


// 게임에 필요한 상수들
const FLAP_SPEED = -5;
const BIRD_WIDTH = 40;
const BIRD_HEIGHT = 30;
const PIPE_WIDTH = 50;
const PIPE_GAP = 125;


// 새와 관련된 변수들
let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAcceleration = 0.1;

// 장애물과 관련된 변수들
let PipeX = 400;
let PipeY = canvas.height - 200;

// 점수와 최고점수에 관련된 변수들
let scoreDiv = document.getElementById('score-display');
let score = 0;
let highScore = 0;


// 게임 기능 관련 함수 모음
function increaseScore() {
    // TODO
}

function collisionCheck() {
    // TODO
}

function hideEndMenu() {
    document.getElementById('end-menu').style.display = 'none';
    gameContainer.classList.remove('backdrop-blur');

}

function showEndMenu() {
    document.getElementById('end-menu').style.display = 'block';
    gameContainer.classList.add('backdrop-blur');
    document.getElementById('end-score').innerHTML = score;
}

function resetGame() {
    // TODO
}

function endGame() {
    // TODO
}

function loop() {
    // TODO
}