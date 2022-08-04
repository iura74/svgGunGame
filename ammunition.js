export function ammunition() {
  // ammoTypes ⁖ ⛬ ⁙ • ⬤ ◉ ⦿ 🅞 ☢
  const maxLenght = 5;
  const ammoTypes = [
    { icon: '☢', range: 1000, name: 'разрывной', chance: 0.01 },
    { icon: '⛬', range: 40, name: 'разрывной', chance: 0.06 },
    { icon: '⦿', range: 0, name: 'обычный', chance: 1 }
  ];
  const ammoEl = document.querySelector('#ammo');
  let ammoArr = [];

  const render = () => {
    ammoEl.textContent = `⊕ ${ammoArr.map(x => x.icon).join(' ')}`;
  };
  const proxy = (x) => render() || x;

  const addIem = () => {
    if (ammoArr.length < maxLenght) {
      const chance = Math.random();
      const item = ammoTypes.find( x => (x.chance >= chance));
      ammoArr.push(item);
    }
  };

  for (let i = 0; i < maxLenght; i++) {addIem();}
  render();

  this.getItem = () => proxy(ammoArr.shift());

  setInterval(() => proxy(addIem()), 1500);
}
