export function enemy({ maxX, maxY, gameEl, enemysArr, gunX, onEnemyWin}) {
  const isRight = Math.random() > 0.5;
  const enemyLenght = isRight ? 20 : -20;
  const enemyWidth = 5;
  const state = {
    posX: isRight ? maxX: 0,
    posY: maxY - enemyWidth / 2,
    step: isRight ? -0.8 : 0.8,
  };
  const enemyEl = document.createElementNS("http://www.w3.org/2000/svg", 'path');

  enemyEl.setAttribute('d', `M${state.posX} ${state.posY} h ${enemyLenght}`);
  enemyEl.setAttribute('stroke', 'black');
  enemyEl.setAttribute('fill', 'transparent');
  enemyEl.setAttribute('stroke-width', enemyWidth);
  gameEl.insertAdjacentElement('beforeend', enemyEl);

  const moving = setInterval(() => {
    state.posX += state.step;
    enemyEl.setAttribute('d', `M${state.posX} ${state.posY} h ${enemyLenght}`);
    if ((isRight && state.posX <= gunX) || (!isRight && state.posX >= gunX)) {      
      if (typeof (onEnemyWin) === "function") {onEnemyWin();}
      kill();
    }
  }, 40);

  const kill = () => {
    clearInterval(moving);
    gameEl.removeChild(enemyEl);
    enemysArr.splice(enemysArr.indexOf(this), 1);
  };

  const valBetween = ({ test, val1, val2 }) => (test >= val1 && test <= val2) || (test <= val1 && test >= val2);

  this.attak = (shotX) => {
    const x = gunX + shotX;
    if (valBetween({ test: x, val1: state.posX, val2: state.posX + enemyLenght })) {
      kill();
      return true;
    }
    return false;
  };

}
