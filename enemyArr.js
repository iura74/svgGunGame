import { enemy } from './enemy.js';

export function enemyArr({ game, gameWidth, gameHeight, onEnemyWin }) {
  const emenys = [];

  const emenyObj = {
    maxX: gameWidth,
    maxY: gameHeight,
    gameEl: game,
    enemysArr: emenys,
    gunX: gameWidth / 2,
    onEnemyWin
  };
  const minPouse = 1500;
  const addEnemy = (pouse = 6000) => {
    emenys.push(new enemy(emenyObj));
    const nextPouse = pouse * 0.95;
    setTimeout(() => { addEnemy(nextPouse > minPouse ? nextPouse : minPouse); }, pouse);
  };
  addEnemy();

  this.attakAll = (distance) => emenys.filter(x => x.attak(distance)).length;

}
