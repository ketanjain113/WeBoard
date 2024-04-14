
const canvas = document.getElementById('fullPageCanvas');
const context = canvas.getContext('2d');
canvas.style.backgroundImage = 'url("gridlines.png")';

let drawing = false;
let lastX = 0;
let lastY = 0;
let currentTool = 'pen'; 
let currentLineWidth = 4; 
let penLineWidth = 4;
let highlighterLineWidth = 20;

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', startDrawingTouch);
canvas.addEventListener('touchmove', drawTouch);
canvas.addEventListener('touchend', stopDrawingTouch);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function startDrawing(event) {
    drawing = true;
    const { offsetX, offsetY } = getCursorPosition(event);
    lastX = offsetX;
    lastY = offsetY;
    setLineWidth(currentTool);
}

function startDrawingTouch(event) {
    event.preventDefault();
    const touch = event.touches[0];
    if (touch) {
        drawing = true;
        const rect = canvas.getBoundingClientRect();
        lastX = touch.clientX - rect.left;
        lastY = touch.clientY - rect.top;
        setLineWidth(currentTool);
    }
}

function stopDrawing() {
    drawing = false;
    canvas.style.cursor = 'auto'; 
}

function stopDrawingTouch() {
    drawing = false;
}

function draw(event) {
    if (!drawing) return;

    const { offsetX, offsetY } = getCursorPosition(event);

    context.strokeStyle = document.getElementById('colorPicker').value; 
    context.lineWidth = currentLineWidth; 
    context.lineCap = 'round'; 

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(offsetX, offsetY);
    context.stroke();

    lastX = offsetX;
    lastY = offsetY;
}

function drawTouch(event) {
    if (!drawing) return;
    event.preventDefault(); 
    const touch = event.touches[0];
    if (touch) {
        const rect = canvas.getBoundingClientRect();
        const offsetX = touch.clientX - rect.left;
        const offsetY = touch.clientY - rect.top;
        
        context.strokeStyle = document.getElementById('colorPicker').value; 
        context.lineWidth = currentLineWidth; 
        context.lineCap = 'round'; 
    
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(offsetX, offsetY);
        context.stroke();
    
        lastX = offsetX;
        lastY = offsetY;
    }
}

function getCursorPosition(event) {
    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    return { offsetX, offsetY };
}

function setLineWidth(tool) {
    switch (tool) {
        case 'pen':
            currentLineWidth = penLineWidth;
            break;
        case 'highlighter':
            currentLineWidth = highlighterLineWidth;
            break;
        case 'pencil':
            currentLineWidth = penLineWidth;
            break;
        default:
            currentLineWidth = penLineWidth;
            break;
    }
}

document.getElementById('clearButton').addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
});

document.getElementById('Pen').addEventListener('click', () => {
    currentTool = 'pen';
    setLineWidth(currentTool);
});

document.getElementById('Highlighter').addEventListener('click', () => {
    if (currentTool === 'highlighter') {
        currentTool = 'pen'; 
    } else {
        currentTool = 'highlighter';
    }
    setLineWidth(currentTool);
});

document.getElementById('Pencil').addEventListener('click', () => {
    currentTool = 'pencil';
    setLineWidth(currentTool);
});

