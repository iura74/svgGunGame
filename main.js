import { enemy } from './enemy.js';
import {gun} from './gun.js';
import { shot } from './shot.js';

const game = document.getElementById('game');

const gameHeight = game.clientHeight;
const gameWidth = game.clientWidth;

const bigGun = new gun({ x: gameWidth / 2, y: gameHeight });

let gameAlive = true;

const emenys = [];

const emenyObj = { 
  maxX: gameWidth, 
  maxY: gameHeight, 
  gameEl: game, 
  enemysArr: emenys, 
  gunX: gameWidth / 2, 
  onEnemyWin() { 
    if (!gameAlive) { return; }
    gameAlive = false; 
    game.insertAdjacentHTML('afterbegin', `<text x="${gameWidth / 2}" y="${gameHeight / 2}" font-size="50" text-anchor="middle" >Game Over!</text>`);
    game.removeChild(document.querySelector('#shot'));
  }
 };

const minPouse = 1500;
const addEnemy = (pouse = 6000) => {
  emenys.push(new enemy(emenyObj));
  const nextPouse = pouse * 0.95;
  setTimeout(() => { addEnemy(nextPouse > minPouse ? nextPouse : minPouse);}, pouse);
}
addEnemy();
//setInterval( () => { emenys.push(new enemy(emenyObj)); }, 6000);

document.body.addEventListener('keydown', (event) => {
  if (!gameAlive) {return;}
  if (event.key === 'ArrowLeft') {
    bigGun.turnLeft();
  }
  if (event.key === 'ArrowRight') {
    bigGun.turnRight();
  }
  if (event.key === ' ') {
    const distance = shot({ posX: gameWidth / 2 , maxY: gameHeight, angle: bigGun.getAngle()});
    emenys.forEach(x => x.attak(distance));
  }
});

/*const btnRight = document.getElementById('right');
const btnLeft = document.getElementById('left');

btnLeft.addEventListener('click', () => { bigGun.turnLeft() });
btnRight.addEventListener('click', () => { bigGun.turnRight() });*/



