// --- LOGIC NODE SIMULATOR ---

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', calculateImpact);
    });

    function calculateImpact() {
        const ltv = parseFloat(document.getElementById('val_ltv').value) || 0;
        const currentSales = parseFloat(document.getElementById('current_sales').value) || 0;
        const percImprovement = (parseFloat(document.getElementById('perc_improvement').value) || 0) / 100;
        const payroll = parseFloat(document.getElementById('payroll').value) || 0;
        const percAutomation = (parseFloat(document.getElementById('perc_automation').value) || 0) / 100;
        const projectCost = parseFloat(document.getElementById('project_cost').value) || 0;

        // 1. Cálculos Financieros
        const monthlyNewRev = ltv * currentSales * percImprovement;
        const monthlySavings = payroll * percAutomation;
        const totalMonthlyImpact = monthlyNewRev + monthlySavings;
        const annualImpact = totalMonthlyImpact * 12;

        // 2. Cálculo de Horas Reales (Basado en una jornada estándar de 160h/mes)
        // Este valor ahora es totalmente dinámico
        const yearlyHoursSaved = Math.round((160 * percAutomation) * 12);

        let breakEvenMonths = 0;
        if (totalMonthlyImpact > 0) {
            breakEvenMonths = projectCost / totalMonthlyImpact;
        }

        updateDisplay(totalMonthlyImpact, annualImpact, breakEvenMonths, yearlyHoursSaved);
    }

    function updateDisplay(monthly, annual, breakEven, hours) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD', maximumFractionDigits: 0
        });

        // Actualizar cifras principales
        document.getElementById('roi_main').textContent = formatter.format(monthly);
        document.getElementById('annual_net').textContent = formatter.format(annual);

        // ACTUALIZACIÓN DINÁMICA DE HORAS
        const hoursElement = document.getElementById('hours_saved');
        if(hoursElement) {
            hoursElement.textContent = `+${hours} Horas/Año`;
        }

        // Actualizar Badge de Punto de Equilibrio
        const breakEvenText = document.getElementById('break_even_text');
        if (breakEven === 0) {
            breakEvenText.textContent = "Esperando parámetros...";
        } else {
            breakEvenText.textContent = breakEven < 1 
                ? `Punto de equilibrio: ${Math.ceil(breakEven * 30)} días` 
                : `Punto de equilibrio: ${breakEven.toFixed(1)} meses`;
        }

        // ARGUMENTO DE VENTA DINÁMICO (Pitch)
        const pitchText = document.getElementById('pitch_text');
        let argument = "";

        if (breakEven <= 0) {
            argument = "Ingrese los datos de su clínica para generar un análisis de retorno personalizado.";
        } else if (breakEven <= 1) {
            // Caso de éxito rotundo
            argument = `Doctor, este sistema es un activo que se paga solo en <span class="focus-text">menos de un mes</span> rescatando pacientes que hoy pierde por falta de respuesta inmediata.`;
        } else if (breakEven <= 6) {
            // Retorno a mediano plazo
            argument = `Doctor, con un retorno de inversión en <span class="focus-text">${breakEven.toFixed(1)} meses</span>, el sistema se autofinancia mientras recuperamos ${hours} horas de su personal para atención directa.`;
        } else {
            // Enfoque en eficiencia si el ROI es lento
            argument = `Doctor, el valor principal aquí son las <span class="focus-text">${hours} horas anuales</span> de carga administrativa que eliminamos, permitiendo que su clínica escale sin aumentar la nómina.`;
        }

        pitchText.innerHTML = `"${argument}"`;
    }

    calculateImpact();
});

// Lógica del Modal (Se mantiene igual)
const modal = document.getElementById('help-modal');
const btnOpen = document.getElementById('open-help');
const btnClose = document.getElementById('close-help');

btnOpen.onclick = () => modal.style.display = 'flex';
btnClose.onclick = () => modal.style.display = 'none';
window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; }