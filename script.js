const grid = document.getElementById("grid");
const startButton = document.getElementById("startButton");
const timeRange = document.getElementById("timeRange");
const timeValue = document.getElementById("timeValue");
const bestScoreElement = document.getElementById("bestScore");
const messageElement = document.getElementById("message");

let bestScore = 0;
let sequence = [];
let step = 0;
let startEnable = false;

timeRange.oninput = () => timeValue.value = timeRange.value;
timeValue.oninput = () => timeRange.value = timeValue.value;

function createGrid() {
    grid.innerHTML = "";
    for (let i = 0; i < 25; i++)
    {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.onclick = () => onClick(i, cell);
        grid.appendChild(cell);
    }
}

function start()
{
    startButton.disabled = true;
    createGrid();
    messageElement.textContent = "";
    messageElement.className = "";

    step = 0;
    startEnable = false;

    const positions = [...Array(25).keys()];
    sequence = positions.sort(() => Math.random() - 0.5).slice(0, 10);

    sequence.forEach((pos, i) => {
        grid.children[pos].textContent = i + 1;
    });

    setTimeout(() => {
        sequence.forEach(pos => grid.children[pos].textContent = "");
        startEnable = true;
    }, timeRange.value * 1000);
}

function onClick(index, cell)
{
    if (!startEnable)
        return;

    if (index === sequence[step])
    {
        cell.classList.add("correct");
        step++;

        if (step === sequence.length)
            win();

    }
    else
        lose(cell);
}

function updateBestScore()
{
    if (step > bestScore)
    {
        bestScore = step;
        bestScoreElement.textContent = bestScore;
    }
}

function win()
{
    startEnable = false;
    startButton.disabled = false;
    updateBestScore();
    messageElement.textContent = "You win! score = " + step;
    messageElement.className = "success";
}

function lose(cell)
{
    startEnable = false;
    startButton.disabled = false;
    updateBestScore();
    cell.classList.add("wrong");
    messageElement.textContent = "You loose! score = " + step;
    messageElement.className = "error";
}

startButton.onclick = start;
createGrid();
