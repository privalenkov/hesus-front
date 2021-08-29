const containerbtn1 = document.querySelector('#container-hesus')
const containerbtn2 = document.querySelector('#container-bratishkin')
const btn1 = document.querySelector('.container__btn_hesus')
const btn2 = document.querySelector('.container__btn_bratishkin')
const tips = document.querySelector(".container__point-up")
const tips1 = document.querySelector("#point-up-hesus")
const tips2 = document.querySelector("#point-up-bratishkin")

const socket = io()
let hesusClicks = 0
let bratishkinClicks = 0
let lastClick = 0
let clientsCount = 1

tips.addEventListener('animationend', function() {
    document.querySelector(".container__point-up__add-point").remove()
})

function UpdateClick(obj) {
    hesusUpdateClick(obj)
    bratishkinUpdateClick(obj)
}

function hesusUpdateClick(obj) {
    hesusClicks = obj.hesusClicks
    let normalized = 1 + obj.hesusClicks / 1000000
    btn1.style.transform = `scale(${normalized})`
    zIndex()
    document.querySelector('.count-hesus').textContent = hesusClicks
}

function zIndex () {
    if (hesusClicks >= bratishkinClicks) {
        containerbtn2.style.zIndex = 8;
    } else {
        containerbtn1.style.zIndex = 8;
    }
}

function bratishkinUpdateClick(obj) {
    bratishkinClicks = obj.bratishkinClicks
    let normalized = 1 + obj.bratishkinClicks / 1000000
    btn2.style.transform = `scale(${normalized})`
    zIndex()
    document.querySelector('.count-bratishkin').textContent = bratishkinClicks
}

function UpdateUsers(count) {
    clientsCount = count
    document.querySelector('.container__users-online').textContent = `Онлайн: ${clientsCount}`
}

function hesusAddClick() {
    hesusUpdateClick(hesusClicks + 1)
    socket.emit('click')
}

function bratishkinAddClick() {
    bratishkinUpdateClick(bratishkinClicks + 1)
    socket.emit('click')
}

function debounce(f, ms) {

    let isCooldown;
    
    return function() {
        clearTimeout(isCooldown)
        isCooldown = setTimeout(() => {
            f()
        }, ms);
    };
  
}

const pauseClick = debounce(() => {
    audio.pause()
    audio.playbackRate = 1.0
}, 1000)

socket.on('connection', UpdateClick)
socket.on('click', UpdateClick)
socket.on('updateUserCount', UpdateUsers)

function intervalClick() {
    audio.play()
    var d = new Date()
    let t = d.getTime()
    let interval = t - lastClick
    pauseClick()
    if(document.documentElement.clientWidth > 768) {
        if(interval <= 150) {
            audio.playbackRate = 2.0;
        } 
        else if (interval >= 150 && interval <= 500) {
            audio.playbackRate = 1.0;
        }
    }
    lastClick = t
}
function pointup (e) {
    const tip = document.createElement("h1")
    tip.innerHTML = "+1";
    tip.classList.add("container__point-up__add-point");
    if (e.id === 'hesus') {
        tips1.appendChild(tip)
    } else {
        tips2.appendChild(tip)
    }
}

function resetAnim(el) {
    el.style.animation = 'none'
    el.offsetHeight
    el.style.animation = null
}

btn1.addEventListener('click', (e) => {
    pointup(e.target)
    hesusOnPlaysSound()
    intervalClick()
    hesusAddClick()
    resetAnim(btn1)
})

btn1.addEventListener('mouseleave', () => {
    audio.pause()
})

btn2.addEventListener('click', (e) => {
    pointup(e.target)
    bratishkinOnPlaysSound()
    intervalClick()
    bratishkinAddClick()
    resetAnim(btn2)
})

btn2.addEventListener('mouseleave', () => {
    audio.pause()
})


const brffbtn = document.querySelector('.btn-brff');
const hesbtn = document.querySelector('.btn-hesus');

brffbtn.addEventListener('click', () => {
    const elbf = document.querySelector('.container__btn_bratishkin')
    const elhes = document.querySelector('.container__btn_hesus')
    elbf.style.display = 'block'
    elhes.style.display = 'none'
})

hesbtn.addEventListener('click', () => {
    const elbf = document.querySelector('.container__btn_bratishkin')
    const elhes = document.querySelector('.container__btn_hesus')
    elbf.style.display = 'none'
    elhes.style.display = 'block'
})


window.addEventListener('resize', () => {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    const elbf = document.querySelector('.container__btn_bratishkin')
    const elhes = document.querySelector('.container__btn_hesus')
    if (width >= 720) {
        elbf.style.display = 'block'
        elhes.style.display = 'block'
    } else {
        elbf.style.display = 'none'
        elhes.style.display = 'none'
    }
})