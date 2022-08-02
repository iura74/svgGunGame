import { enemyArr } from './enemyArr.js';
import {gun} from './gun.js';
import { score } from './score.js';
import { shot } from './shot.js';

const game = document.getElementById('game');

const gameHeight = game.clientHeight;
const gameWidth = game.clientWidth;

const bigGun = new gun({ x: gameWidth / 2, y: gameHeight });
const sniperShot = new shot({ posX: gameWidth / 2, maxY: gameHeight });
const enemys = new enemyArr({ game, gameWidth, gameHeight, onEnemyWin });
const curScore = new score();

let gameAlive = true;

function onEnemyWin() {
  if (!gameAlive) { return; }
  gameAlive = false;
  game.insertAdjacentHTML('afterbegin', `<text x="${gameWidth / 2}" y="${gameHeight / 2}" font-size="50" text-anchor="middle" >Game Over!</text>`);
  sniperShot.clear();
}

document.body.addEventListener('keydown', (event) => {
  if (!gameAlive) {return;}
  if (event.key === 'ArrowLeft') {
    bigGun.turnLeft();
  } else if (event.key === 'ArrowRight') {
    bigGun.turnRight();
  } else if (event.key === ' ') {
    const distance = sniperShot.fire({ angle: bigGun.getAngle()});
    curScore.addPoints(enemys.attakAll(distance) * 100);
  }
});


const btnRight = document.getElementById('right');
const btnLeft = document.getElementById('left');
const btnFire = document.getElementById('fire');

btnLeft.addEventListener('click', () => {
  if (!gameAlive) { return; }
  bigGun.turnLeft();
});
btnRight.addEventListener('click', () => {
  if (!gameAlive) { return; }
  bigGun.turnRight();
});
btnFire.addEventListener('click', () => {
  if (!gameAlive) { return; }
  const distance = sniperShot.fire({ angle: bigGun.getAngle() });
  curScore.addPoints(enemys.attakAll(distance) * 100);
});