var numberOfSquares = 6;
var colors = [];
var goal;
var pickedColor = document.querySelector("#colorGenerated");
var squares = document.querySelectorAll(".square");
var message = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#Reset");
var modeButton = document.querySelectorAll(".mode");

init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    for (var i = 0; i < modeButton.length; i++) {
        modeButton[i].addEventListener('click', function() {
            modeButton[0].classList.remove("selected");
            modeButton[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numberOfSquares = 3 : numberOfSquares = 6;
            reset();
        });
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', function() {
            if (this.style.backgroundColor === goal) {
                message.textContent = "Correct!"
                resetButton.textContent = "Play Again?"
                changeColors(this.style.backgroundColor);
                h1.style.backgroundColor = this.style.backgroundColor;
            } else {
                this.style.backgroundColor = "#232323";
                message.textContent = "Try again!"
            }
        })
    }
}

function reset() {
    colors = generateRandomColors(numberOfSquares);
    message.textContent = "";
    goal = pickColor();
    pickedColor.textContent = goal;
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }
    }
    resetButton.textContent = "New Colors";
    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener('click', function(numberOfSquares) {
    reset();
})

function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var number = Math.floor(Math.random() * colors.length);
    return colors[number];
}

function generateRandomColors() {
    var arr = [];
    for (var i = 0; i < numberOfSquares; i++) {
        arr[i] = randomColor();
    }
    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}