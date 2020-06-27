
const img = document.getElementsByTagName("img")[0]
const movementVector = [screen.width / 2, screen.height / 2];
acceleration = 3 
framerate = 10

const keys = [];

window.addEventListener('keydown', (event) => {
    const { key } = event;
    const classes = ["rotated_cima", "rotated_esquerda", "rotated_baixo", "rotated_direita"]
    classes.forEach(status_de_rotacao => {
      if (img.classList.contains(status_de_rotacao)){
        img.classList.remove(status_de_rotacao);
    }
    });

    switch(key){
      case "w":
          img.classList.add("rotated_cima");
          break;

      case "a":
          img.classList.add("rotated_esquerda");
          break;

      case "s":
          img.classList.add("rotated_baixo");
          break;

      case "d":
          img.classList.add("rotated_direita");
          break;
  }

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

  const bola = document.getElementsByClassName("container")[0]

   if (!((movementVector[0]/screen.width)*100 <= 11)){
     movementVector[0] -= forceVector[1] * acceleration;
     bola.style.left = `${movementVector[0]}px`;
   }

   if (!((movementVector[1]/screen.height)*100 <= 25)){
     movementVector[1] -= forceVector[0] * acceleration;
     bola.style.top = `${movementVector[1]}px`;
  }

  if (!((movementVector[0]/screen.width)*100 >= 87)){
    movementVector[0] += forceVector[3] * acceleration;
    bola.style.right = `${movementVector[0]}px`;
  }

  if (!((movementVector[1]/screen.height)*100 >= 85)){
    movementVector[1] += forceVector[2] * acceleration;
    bola.style.down = `${movementVector[1]}px`;
 }

}, framerate);
