document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', calculateImpact);
    });

    function calculateImpact() {
        // Captura de datos
        const ltv = parseFloat(document.getElementById('val_ltv').value) || 0;
        const currentSales = parseFloat(document.getElementById('current_sales').value) || 0;
        const percImprovement = (parseFloat(document.getElementById('perc_improvement').value) || 0) / 100;
        const payroll = parseFloat(document.getElementById('payroll').value) || 0;
        const percAutomation = (parseFloat(document.getElementById('perc_automation').value) || 0) / 100;
        const projectCost = parseFloat(document.getElementById('project_cost').value) || 0;

        // Lógica de Negocio
        const monthlyNewRev = ltv * currentSales * percImprovement;
        const monthlySavings = payroll * percAutomation;
        const totalMonthlyImpact = monthlyNewRev + monthlySavings;
        const annualImpact = totalMonthlyImpact * 12;

        // Cálculo dinámico de Horas (Basado en 160h laborales al mes)
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

        // Actualizar Números
        document.getElementById('roi_main').textContent = formatter.format(monthly);
        document.getElementById('annual_net').textContent = formatter.format(annual);
        
        // Actualizar Horas (¡Ya no son estáticas!)
        const hoursBox = document.querySelector('.result-box.featured .medium-number');
        hoursBox.textContent = `+${hours} Horas/Año`;

        // Actualizar Badge de Punto de Equilibrio
        const breakEvenText = document.getElementById('break_even_text');
        breakEvenText.textContent = breakEven < 1 
            ? `Punto de equilibrio: ${Math.ceil(breakEven * 30)} días` 
            : `Punto de equilibrio: ${breakEven.toFixed(1)} meses`;

        // Argumento de Venta Dinámico
        const pitchContainer = document.getElementById('pitch_text');
        let argument = "";

        if (breakEven <= 0) {
            argument = "Ingrese los datos de su clínica para generar un análisis de retorno personalizado.";
        } else if (breakEven <= 1) {
            argument = `Doctor, este sistema es un activo que se paga solo en <span class="focus-text">menos de un mes</span> rescatando pacientes que hoy pierde por falta de respuesta inmediata.`;
        } else if (breakEven <= 6) {
            argument = `Doctor, con un retorno de inversión en <span class="focus-text">${breakEven.toFixed(1)} meses</span>, el sistema se autofinancia mientras recuperamos ${hours} horas para atención directa.`;
        } else {
            argument = `Doctor, el valor principal aquí son las <span class="focus-text">${hours} horas anuales</span> que eliminamos de carga administrativa, permitiendo escalar sin aumentar la nómina.`;
        }
        pitchContainer.innerHTML = `"${argument}"`;
    }

    // Modal Logic
    const modal = document.getElementById('help-modal');
    const btnOpen = document.getElementById('open-help');
    const btnClose = document.getElementById('close-help');

    btnOpen.onclick = () => modal.style.display = 'flex';
    btnClose.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; }

    calculateImpact(); // Ejecución inicial
});