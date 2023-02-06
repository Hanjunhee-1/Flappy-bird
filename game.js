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
let pipeX = 400;
let pipeY = canvas.height - 200;

// 점수와 최고점수에 관련된 변수들
let scoreDiv = document.getElementById('score-display');
let score = 0;
let highScore = 0;


// 오직 새가 장애물을 넘었을 때만 점수를 증가시켜주기위해 flag 변수를 선언합니다.
let flag = false;


// Space 키만으로 새를 움직이게 할 수 있습니다.
document.body.onkeyup = function(e) {
    if (e.code == 'Space') {
        birdVelocity = FLAP_SPEED;
    } 
}

// 게임이 종료되었을 때 게임을 재시작할 수 있게 해줍니다.
document.getElementById('restart-button').addEventListener('click', function() {
    hideEndMenu();
    resetGame();
    loop();
})


// 게임 기능 관련 함수 모음
function increaseScore() {
    // 장애물을 넘어갔을 때마다 점수를 증가합니다.
    if (
        birdX > pipeX + PIPE_WIDTH &&
        (birdY < pipeY + PIPE_GAP || birdY + + BIRD_HEIGHT > pipeY + PIPE_GAP) &&
        !flag
    ) {
        score += 1;
        scoreDiv.innerHTML = score;
        flag = true;
    }

    // 장애물을 넘어갔다면 flag 를 다시 false 로 바꿉니다.
    if (birdX < pipeX + PIPE_WIDTH) {
        flag = false;
    }
}

function collisionCheck() {
    // 새와 장애물을 위해 경계선을 만들어줍니다.
    const birdBox = {
        x: birdX,
        y: birdY,
        width: BIRD_WIDTH,
        height: BIRD_HEIGHT,
    };

    const topPipeBox = {
        x: pipeX,
        y: pipeY - PIPE_GAP + BIRD_HEIGHT,
        width: PIPE_WIDTH,
        height: pipeY,
    };

    const bottomPipeBox = {
        x: pipeX,
        y: pipeY + PIPE_GAP + BIRD_HEIGHT,
        width: PIPE_WIDTH,
        height: canvas.height - pipeY - PIPE_GAP,
    }

    // 위의 파이프와 충돌했는지 체크합니다.
    if (
        birdBox.x + birdBox.width > topPipeBox.x &&
        birdBox.x < topPipeBox.x + topPipeBox.width &&
        birdBox.y < topPipeBox.y    
    ) {
        return true;
    }

    // 아래의 파이프와 충돌했는지 체크합니다.
    if (
        birdBox.x + birdBox.width > bottomPipeBox.x &&
        birdBox.x < bottomPipeBox.x + bottomPipeBox.width &&
        birdBox.y + birdBox.height > bottomPipeBox.y
    ) {
        return true;
    }

    // 화면의 경계선과 충돌했는지 체크합니다.
    if (birdY < 0 || birdY + BIRD_HEIGHT > canvas.height) {
        return true;
    }

    // 위의 조건들이 아니라면 false 를 반환해야 게임이 계속 진행됩니다.
    return false;
}

function hideEndMenu() {
    document.getElementById('end-menu').style.display = 'none';
    gameContainer.classList.remove('backdrop-blur');

}

function showEndMenu() {
    document.getElementById('end-menu').style.display = 'block';
    gameContainer.classList.add('backdrop-blur');
    document.getElementById('end-score').innerHTML = score;

    // 최고기록을 갱신시켜주기 위한 코드입니다.
    if (highScore < score) {
        highScore = score;
    }
    document.getElementById('best-score').innerHTML = highScore;
}


// 초기화 합니다.
function resetGame() {
    birdX = 50;
    birdY = 50;
    birdVelocity = 0;
    birdAcceleration = 0.1;

    pipeX = 400;
    pipeY = canvas.height - 200;

    score = 0;
}

function endGame() {
    showEndMenu();
}

function loop() {
    // loop 가 반복된 후에 ctx 를 리셋합니다.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 새 이미지 그려주기
    ctx.drawImage(flappyImg, birdX, birdY);

    // 장애물 그려주기
    ctx.fillStyle = '#333';
    ctx.fillRect(pipeX, -100, PIPE_WIDTH, pipeY);
    ctx.fillRect(pipeX, pipeY + PIPE_GAP, PIPE_WIDTH, canvas.height - pipeY);

    // 새가 장애물과 충돌하는 것을 확인할 필요가 있습니다.
    // 장애물과 충돌했다면 게임이 종료됩니다.
    if (collisionCheck()) {
        endGame();
        return;
    }

    // 장애물이 움직인다(?) --> 새가 움직이는 것이라고 생각하면 쉽습니다
    pipeX -= 2.2;

    // 장애물이 화면 밖으로 사라진다면 다시 리셋 시켜줄 필요가 있습니다.
    if (pipeX < -50) {
        pipeX = 400;
        pipeY = Math.random() * (canvas.height - PIPE_GAP) + PIPE_WIDTH;
    }

    // 새에게 중력을 적용시켜주고 움직이게 합니다.
    birdVelocity += birdAcceleration;
    birdY += birdVelocity;

    increaseScore();
    requestAnimationFrame(loop);
}

loop();