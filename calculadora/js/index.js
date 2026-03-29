// --- LOGIC NODE SIMULATOR ---

document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los inputs
    const inputs = document.querySelectorAll('input[type="number"]');
    
    // Escuchar cambios en cualquier input
    inputs.forEach(input => {
        input.addEventListener('input', calculateImpact);
    });

    function calculateImpact() {
        // 1. Obtener valores de los inputs
        const ltv = parseFloat(document.getElementById('val_ltv').value) || 0;
        const currentSales = parseFloat(document.getElementById('current_sales').value) || 0;
        const percImprovement = (parseFloat(document.getElementById('perc_improvement').value) || 0) / 100;
        const payroll = parseFloat(document.getElementById('payroll').value) || 0;
        const percAutomation = (parseFloat(document.getElementById('perc_automation').value) || 0) / 100;
        const projectCost = parseFloat(document.getElementById('project_cost').value) || 0;

        // 2. Cálculos de Negocio
        // Nuevos ingresos mensuales por rescate de leads
        const monthlyNewRev = ltv * currentSales * percImprovement;
        
        // Ahorro operativo (tiempo de asistente recuperado)
        const monthlySavings = payroll * percAutomation;
        
        // Impacto Total Mensual
        const totalMonthlyImpact = monthlyNewRev + monthlySavings;
        
        // Beneficio Neto Anual (Impacto x 12)
        const annualImpact = totalMonthlyImpact * 12;

        // Punto de Equilibrio (en cuántos meses se paga la inversión)
        let breakEvenMonths = 0;
        if (totalMonthlyImpact > 0) {
            breakEvenMonths = projectCost / totalMonthlyImpact;
        }

        // 3. Actualizar la Interfaz (DOM)
        updateDisplay(totalMonthlyImpact, annualImpact, breakEvenMonths);
    }

    function updateDisplay(monthly, annual, breakEven) {
        // Formateador de moneda
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
        });

        // Actualizar números principales
        document.getElementById('roi_main').textContent = formatter.format(monthly);
        document.getElementById('annual_net').textContent = formatter.format(annual);

        // Actualizar Punto de Equilibrio (Días o Meses)
        const breakEvenText = document.getElementById('break_even_text');
        if (breakEven === 0) {
            breakEvenText.textContent = "Esperando datos...";
        } else if (breakEven < 1) {
            const days = Math.ceil(breakEven * 30);
            breakEvenText.textContent = `Se paga solo en ${days} días`;
        } else {
            breakEvenText.textContent = `Se paga solo en ${breakEven.toFixed(1)} meses`;
        }

        // Actualizar el Pitch de venta dinámicamente
        const pitchSpan = document.querySelector('.focus-text');
        if (breakEven > 0) {
            pitchSpan.textContent = breakEven < 1 
                ? "menos de un mes" 
                : `${breakEven.toFixed(1)} meses`;
        }
    }

    // Ejecutar cálculo inicial al cargar
    calculateImpact();
});
// Lógica del Modal de Ayuda
const modal = document.getElementById('help-modal');
const btnOpen = document.getElementById('open-help');
const btnClose = document.getElementById('close-help');

btnOpen.onclick = () => modal.style.display = 'flex';
btnClose.onclick = () => modal.style.display = 'none';

// Cerrar si hacen clic fuera del cuadro
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}