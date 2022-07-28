export function shot({ posX, maxY }) {
  const v0 = 60;
  const g = 9.81; 
  const pathEl = document.querySelector('#shot');

  this.fire = ({angle}) => {
    const distance = v0 * v0 * Math.sin(2 * angle) / g;
    const maxUp = v0 * v0 * Math.sin(angle) * Math.sin(angle) / g;
    const pathD = `M${posX} ${maxY} q${distance / 2} ${- maxUp}, ${distance} ${0}`;

    pathEl.setAttribute('d', pathD);
    return distance;
  }; 
  
  this.clear = () => { pathEl.setAttribute('d', ""); };
}
