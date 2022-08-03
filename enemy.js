export function enemy({ maxX, maxY, gameEl, gunX, onEnemyWin}) {
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
  };

  const valBetween = ({ test, val1, val2 }) => (test >= val1 && test <= val2) || (test <= val1 && test >= val2);
  const rangeCrossing = ({ range1S, range1F, range2S, range2F }) => {
    if (range1S > range1F) return rangeCrossing ({ range1S: range1F, range1F: range1S, range2S, range2F });
    if (range2S > range2F) return rangeCrossing({ range1S, range1F, range2S: range2F, range2F: range2S });
    return range1S <= range2F && range1F >= range2S;
  };
  

  this.attak = (shotX) => {
    const x = gunX + shotX;
    if (valBetween({ test: x, val1: state.posX, val2: state.posX + enemyLenght })) {
      kill();
      return true;
    }
    return false;
  };

  this.attakRange = ({shotX, range}) => {
    if (range === 0) return this.attak(shotX);
    const x = gunX + shotX;
    if (rangeCrossing({ range1S: state.posX, range1F: state.posX + enemyLenght, range2S: x - range, range2F: x + range })) {
      kill();
      return true;
    }
    return false;
  };

}
