document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
window.onload = () => {
    const display = document.getElementById('display');
    const welcomeMsg = "SYS_FLOW_v1.0: ONLINE...";
    let i = 0;

    // Efecto de escritura automática (typing effect)
    const typing = setInterval(() => {
        display.placeholder += welcomeMsg[i];
        i++;
        if (i === welcomeMsg.length) {
            clearInterval(typing);
            setTimeout(() => {
                display.placeholder = "0"; // Limpia para empezar a usarla
            }, 1500);
        }
    }, 80);
};