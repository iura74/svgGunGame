import { enemy } from './enemy.js';

export function enemyArr({ game, gameWidth, gameHeight, onEnemyWin }) {
  const emenys = [];

  const emenyObj = {
    maxX: gameWidth,
    maxY: gameHeight,
    gameEl: game,    
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

  this.attakAll = (distance) => { 
    const emenysToKill = emenys.filter(x => x.attak(distance));
    emenysToKill.forEach(x => emenys.splice(emenys.indexOf(x), 1));
    return emenysToKill.length;
  };
  this.attakAllRange = ({ distance, range }) => {
    const emenysToKill = emenys.filter(x => x.attakRange({ shotX: distance, range }));
    emenysToKill.forEach(x => emenys.splice(emenys.indexOf(x), 1));
    return emenysToKill.length;
  };

}
