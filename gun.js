export function gun({ x, y, length = 25 }) {
  const angleMin = 0;
  const angleMax = Math.PI;
  const state = {     
    step: Math.PI / 100,    
    angle: Math.PI / 2,
    x2: 0,
    y2: 0
  };
  const gunEl = document.querySelector("#gun");

  gunEl.setAttribute('x1', x);
  gunEl.setAttribute('y1', y);

  const calcEndPos = () => {
    state.x2 = x + Math.cos(state.angle) * length;
    state.y2 = y - Math.sin(state.angle) * length;
  };

  const render = () => {
    gunEl.setAttribute('x2', state.x2);
    gunEl.setAttribute('y2', state.y2);
  };
  
  calcEndPos();
  render();

  this.turnLeft = () => {
    state.angle += state.step;
    if (state.angle >= angleMax) {
      state.angle = angleMax;
    }
    calcEndPos();
    render();
  };

  this.turnRight = () => {
    state.angle -= state.step;
    if (state.angle <= angleMin) {
      state.angle = angleMin;
    }
    calcEndPos();
    render();
  };

  this.getAngle = () => state.angle;
}
