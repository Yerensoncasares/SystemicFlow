const display = document.getElementById('display');
let lastResult = "0"; 

// --- LÓGICA DE INTERFAZ BÁSICA ---
function insert(val) {
    // Si el placeholder es 0 y el valor está vacío, estamos listos para escribir
    if (display.value === "") {
        display.placeholder = "0";
    }
    display.value += val;
}

function clearScreen() {
    display.value = '';
    display.placeholder = '0';
}

function borrar() {
    display.value = display.value.slice(0, -1);
}

function insertAns() {
    display.value += lastResult;
}

function insertExp() {
    display.value += "*10^";
}

function med() {
    clearScreen();
    display.value = ""; 
}

// --- MOTOR DE CÁLCULO UNIFICADO ---
function calculate() {
    try {
        const input = display.value;

        // 1. LÓGICA MÉDICA (Formato: (peso)(altura))
        const medicalMatch = input.match(/^\(([\d.]+)\)\(([\d.]+)\)$/);

        if (medicalMatch) {
            const weight = parseFloat(medicalMatch[1]);
            const height = parseFloat(medicalMatch[2]);

            if (!isNaN(weight) && !isNaN(height) && height > 0) {
                const imcValue = weight / (height * height);
                let status = "";
                if (imcValue < 18.5) status = "B peso";
                else if (imcValue < 25) status = "Normal";
                else if (imcValue < 30) status = "S peso";
                else status = "Obesidad";

                display.value = `${imcValue.toFixed(1)} (${status})`;
                lastResult = imcValue.toFixed(1);
                return;
            }
        }

        // 2. CÁLCULO ESTÁNDAR
        let result = math.evaluate(input);
        lastResult = math.format(result, { precision: 4 });
        display.value = lastResult;

    } catch (e) {
        display.value = "Error";
        setTimeout(clearScreen, 1500);
    }
}

// --- SOPORTE DE TECLADO ---
document.addEventListener('keydown', (e) => {
    const validKeys = ['0','1','2','3','4','5','6','7','8','9','+','-','*','/','.',',','(',')'];
    if (validKeys.includes(e.key)) insert(e.key);
    if (e.key === 'Enter') { 
        e.preventDefault(); 
        calculate(); 
    }
    if (e.key === 'Escape') clearScreen();
    if (e.key === 'Backspace') borrar();
});