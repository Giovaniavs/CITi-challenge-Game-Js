
const img = document.getElementsByTagName("img")[0]
const movementVector = [screen.width / 2, screen.height / 2];
acceleration = 4 
framerate = 1

const keys = [];

window.addEventListener('keydown', (event) => {
    const { key } = event;
    

  if (!keys.includes(key)) keys.push(key);
});

window.addEventListener('keyup', (event) => {
  const { key } = event;

  if (keys.includes(key)) keys.splice(keys.indexOf(key), 1);
});

setInterval(() => {
  const up = keys.includes('w');
  const left = keys.includes('a');
  const down = keys.includes('s');
  const right = keys.includes('d');

  const forceVector = [+up, +left, +down, +right];

  movementVector[0] += forceVector[3] * acceleration;
  movementVector[1] += forceVector[2] * acceleration;
  movementVector[0] -= forceVector[1] * acceleration;
  movementVector[1] -= forceVector[0] * acceleration;

  const bola = document.getElementsByClassName("container")[0]
  bola.style.left = `${movementVector[0]}px`;
  bola.style.top = `${movementVector[1]}px`;
}, framerate);



