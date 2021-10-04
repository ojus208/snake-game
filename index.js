// define constant
let inputdir = { x: 0, y: 0 };
let food = { x: 3, y: 5 };
let speed = 18;
let lastpainttime = 0;
let snakearr = [
    { x: 5, y: 15 }
]
let score = 0;


// game function
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastpainttime) / 1000 < 1 / speed) {
        return;
    }
    lastpainttime = ctime
    gameEngine()
}

function iscollide(snakearr) {
    for (let i = 0; i < snakearr.length; i++) {

        // console.log(snakearr[0].y)
        if (snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y) {
            console.log("inside")
            return true;
        }
        if (snakearr[0].x >= 18 || snakearr[0].x <= 0 && snakearr[0].y >= 18 || snakearr[0].y <= 0) {
            console.log("outside")
            return true;
        }
        else {
            return false;
        }

    }
}



function gameEngine() {

    for (let i = 1; i < snakearr.length; i++) {

        // console.log(snakearr[0].y)
        if (snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y) {
            console.log("inside")
            inputdir = { x: 0, y: 0 };
            alert("you loose the game")
            snakearr = [
                { x: 5, y: 15 }
            ]
            score = 0;
        }
        if (snakearr[0].x >= 18 || snakearr[0].x <= 0 || snakearr[0].y >= 18 || snakearr[0].y <= 0) {
            console.log("outside")
            inputdir = { x: 0, y: 0 };
            alert("you loose the game")
            score = 0;
            snakearr = [
                { x: 5, y: 15 }
            ]
        }
    }
    // updating the snake and food
    // moving and updating the snake
    if (food.x === snakearr[0].x && food.y === snakearr[0].y) {
        snakearr.unshift({ x: snakearr[0].x + inputdir.x, y: snakearr[0].y + inputdir.y })
        let a = 2;
        let b = 16;
        food = ({ x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) })
        score += 1;
    }

    for (let i = snakearr.length - 2; i >= 0; i--) {
        snakearr[i + 1] = { ...snakearr[i] };
    }
    snakearr[0].x += inputdir.x

    snakearr[0].y += inputdir.y



    // display snake and food
    // display the snake in the screen
    bord.innerHTML = "";
    let scor = document.getElementById("scor");
    scor.innerHTML = "score :" +score;
    // scor.innerHTML = "score :" + score
    snakearr.forEach((e, index) => {
        const bord = document.getElementById("bord");
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.x;
        snakeElement.style.gridColumnStart = e.y
        if (index === 0) {
            snakeElement.classList.add("snakehead")
        }
        else {
            snakeElement.classList.add("snakebody")
        }
        bord.appendChild(snakeElement)
    })
    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.x;
    foodElement.style.gridColumnStart = food.y
    foodElement.classList.add("food")
    bord.appendChild(foodElement)
}

// main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputdir = { x: -1, y: 0 }//start the game
    switch (e.key) {
        case 'ArrowUp':
            inputdir.x = -1;
            inputdir.y = 0;
            // console.log("arrowup")
            break;
        case 'ArrowDown':
            // console.log("arrowdown")
            inputdir.x = 1;
            inputdir.y = 0;
            break;
        case 'ArrowLeft':
            // console.log("arrowleft")
            inputdir.x = 0;
            inputdir.y = -1;
            break;
        case 'ArrowRight':
            // console.log("arrowright")
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        default:
            break;
    }
});
