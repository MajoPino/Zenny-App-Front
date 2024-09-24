const buttons = document.querySelectorAll('.image');

// Agrega el evento de clic a cada botón
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Quita la clase de todos los botones
        buttons.forEach(btn => btn.classList.remove('active-border'));
        // Agrega la clase solo al botón que fue clicado
        this.classList.add('active-border');
    });
});