const state = {
    view:{
        jogador: document.querySelector(".jogador"),
        btnStart: document.querySelector(".btn-start"),
        telaStart: document.querySelector('.start-tela'),
        jogo: document.querySelector(".jogo")
    },
    value: {
        score: document.querySelector(".score-text"),
        bloqueioJump: true,
        audioJump: new Audio('./assets/sounds/pulo.mp3'),
    }
};

let engine = undefined;
let randomInterval = 2500;
let bloqueioIntervalo = true;
console.log(bloqueioIntervalo);

state.value.audioJump.volume = 0.3;
state.value.audioJump.playbackRate = 1.05;

let jump = () => (document.addEventListener('keydown', event => {
    if(event.key === "ArrowUp" || event.key === "w" || event.key === "W" || event.key === " "){
        state.value.audioJump.play();
        if(state.value.bloqueioJump){
            const jogador = state.view.jogador;

            jogador.classList.add("jump");
            setTimeout(() => {jogador.classList.remove("jump")}, 650)
            jogador.style.bottom = "none";
            state.value.bloqueioJump = false;

            setTimeout(() => {state.value.bloqueioJump = true;}, 700)
        }
    }}
))

let geradorDeIntervalos = () => {
    let intervaloGerado = Math.floor(Math.random() * (2501 - 1000) + 1000);

    return(intervaloGerado);
}

let randomNum = geradorDeIntervalos();

console.log(randomNum);

let geradorObstaculos = (randomInterval) => {
    
    let geradorInterval = setInterval(() => {const randomNum = Math.floor(Math.random() * 3);

    let obstaculoGerado = document.createElement('div');
    
    if(bloqueioIntervalo){
        randomInterval = geradorDeIntervalos();
        console.log(randomInterval);
        bloqueioIntervalo = false;
    }

    obstaculoGerado.setAttribute("class", `obs${randomNum}`);

    impacto(obstaculoGerado, geradorInterval);

    state.view.jogo.appendChild(obstaculoGerado);
    
    setTimeout(() => {
        bloqueioIntervalo = true;
        console.log(bloqueioIntervalo);
        state.view.jogo.removeChild(obstaculoGerado)}, 2500)}, randomInterval = randomInterval);
}

const impacto = (obstaculo, intervalGerador) => {
    setInterval(() => {
    const obstaculoPosition = obstaculo.offsetLeft;
    const jogadorBottom = +window.getComputedStyle(state.view.jogador).bottom.replace('px', '');

    if(obstaculoPosition <= 170 && obstaculoPosition > 0 && jogadorBottom < 25){
        obstaculo.style.animation = "none";
        obstaculo.style.left = `${obstaculoPosition}px`;
        clearInterval(intervalGerador);
        gameOver();
        state.value.bloqueioJump = true;
    }}, 95)
}

let start = () => {
    state.view.btnStart.addEventListener('click', () => {
            engine = () => { 
                jump();
                geradorObstaculos(randomNum);
            }
            engine();
            state.view.telaStart.style.display = "none"
    })
}

let gameOver = () => {
    state.view.telaStart.style.display = "flex"
}

start();