const background = document.getElementsByClassName("background")[0]
const img = document.getElementsByClassName("char")[0]
const movementVector = [screen.width / 2, screen.height / 2];
acceleration = 1.5;
framerate = 10;
var audio = new Audio('./sound/sound_steps.mp3');
var impacto = false; // flag para controlar o audio de impacto do personagem com a paredes


const keys= []; 
const classes = ["rotated_cima", "rotated_esquerda", "rotated_baixo", "rotated_direita"];

window.addEventListener('keydown', (event) => {
  const { key } = event;
  //VERIFICA O MOVIMENTO DO PERSONAGEM E ROTACIONA DE ACORDO COM A DIRECAO
    classes.forEach(status_de_rotacao => {
      if (img.classList.contains(status_de_rotacao)){
        img.classList.remove(status_de_rotacao);
      }
    });

    switch(key){
      case "w":
          img.classList.add("rotated_cima");
          audio.play();
          break;

      case "a":
          img.classList.add("rotated_esquerda");
          audio.play();
          break;

      case "s":
          img.classList.add("rotated_baixo");
          audio.play();
          break;

      case "d":
          img.classList.add("rotated_direita");
          audio.play();
          break;
      default:
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

  const char = document.getElementsByClassName("container")[0]

  const porcentagemX = (movementVector[0]/background.width)*100   //Tela total X
  const porcentagemY = (movementVector[1]/background.height)*100 //Tela total Y

  //Emite apenas um som do minecraft quando bate na parede
  if (!( porcentagemX >= 15) || !(porcentagemY >= 20) || !(porcentagemX <= 85) || !(porcentagemY <= 80)){
    if(!impacto) {
      var audio = new Audio("./sound/sound_stop.mp3");
      audio.play();
      impacto = true
    }
  } else {
    impacto = false
  }


  if (!( porcentagemX <= 15)){  // Limite parede da esquera
    movementVector[0] -= forceVector[1] * acceleration;
    char.style.left = `${movementVector[0]}px`;
  }

  if (!(porcentagemY <= 20)){ // Limite parede cima
    movementVector[1] -= forceVector[0] * acceleration;
    char.style.top = `${movementVector[1]}px`;
  }

  if (!(porcentagemX >= 85)){ //Limite parede direita
    movementVector[0] += forceVector[3] * acceleration;
    char.style.right = `${movementVector[0]}px`;

  }

  if (!(porcentagemY >= 80)){ //Limite parede baixo
    movementVector[1] += forceVector[2] * acceleration;
    char.style.down = `${movementVector[1]}px`;
  }

}, framerate);
