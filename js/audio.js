const audio = document.querySelector('#audio')
audio.volume = 0.2
audio.loop = true



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const audio2 = new Audio()