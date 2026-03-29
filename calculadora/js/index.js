const display = document.getElementById('display');

function insert(val) {
  if (display.placeholder === '0') display.placeholder = '';
  display.value += val;
}

function clearScreen() {
  display.value = '';
  display.placeholder = '0';
}

function borrar() {
  const display = document.getElementById('display');
  // Toma el valor actual y le quita el último carácter
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    // Usamos Math.js para procesar la cadena de texto como operación matemática
  let result = math.evaluate(display.value);
  // Limitamos los decimales para que no se salgan de la pantalla
  display.value = math.format(result, {precision: 2 });}
  catch (e) {
  display.value = "Error";
  setTimeout(clearScreen, 1500);
}
  }
// Soporte para teclado físico
document.addEventListener('keydown', (e) => {
  if (e.key >= 0 && e.key <= 10) insert(e.key);
  if (e.key === '+') insert('+');
  if (e.key === '-') insert('-');
  if (e.key === '*') insert('*');
  if (e.key === '/') insert('/');
  
  if (e.key === 'Enter') calculate();
  if (e.key === 'Escape') clearScreen();
});