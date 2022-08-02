export function score() {
  const scoreEl = document.querySelector('#score');
  let currentScore = 0;
  this.addPoints = (points) => {
    currentScore += points;
    render();
  };
  const render = () => {
    scoreEl.textContent = `☆ ${currentScore.toString().padStart(6, '0')}`;
  };
  render();
}
