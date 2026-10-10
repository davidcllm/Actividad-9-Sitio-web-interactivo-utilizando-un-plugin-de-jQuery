$(document).ready(function() {

    // 1. Modo Oscuro guardando la preferencia en LocalStorage
    if (localStorage.getItem('tema') === 'dark') {
        $('body').attr('data-theme', 'dark');
    }
    $('#btn-tema').on('click', function() {
        if ($('body').attr('data-theme') === 'dark') {$('body').removeAttr('data-theme');
            localStorage.setItem('tema', 'light');
        } else {
            $('body').attr('data-theme', 'dark');
            localStorage.setItem('tema', 'dark');
        }
    });

    // 2. Fecha y Hora Actual con manipulación DOM jQuery
    function actualizarReloj() {
        const ahora = new Date();
        const fechaStr = ahora.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        const horaStr = ahora.toLocaleTimeString('es-MX');
        $('#fecha-hora').text(`${fechaStr} | ${horaStr}`);
    }
    setInterval(actualizarReloj, 1000);
    actualizarReloj();

    // 3. Botón de Ir arriba usando eventos scroll y click + animación
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {$('#btn-arriba').fadeIn();
        } else {
            $('#btn-arriba').fadeOut();
        }
    });
    $('#btn-arriba').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 600); // Efecto animate
    });

    // 4. Integración de Plugin jQuery 
    if ($('.slider-habitaciones').length) {$('.slider-habitaciones').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true,
            autoplaySpeed: 3000
        });
    }

    // 5. Validación de Formulario de Contacto
    $('#form-contacto').on('submit', function(e) {
        e.preventDefault();
        $('.error-msg').hide(); // Ocultar errores previos
        let errores = false;

        const nombre = $('#nombre').val().trim();
        const correo = $('#correo').val().trim();
        const asunto = $('#asunto').val().trim();
        const mensaje = $('#mensaje').val().trim();
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nombre.length < 3) { $('#err-nombre').slideDown(); errores = true; }
        if (!regexCorreo.test(correo)) { $('#err-correo').slideDown(); errores = true; }
        if (asunto.length < 3) { $('#err-asunto').slideDown(); errores = true; }
        if (mensaje.length < 10) { $('#err-mensaje').slideDown(); errores = true; }

        if (!errores) {
            $(this).html('<h3 style="color: #27ae60;">¡Mensaje enviado correctamente!</h3>');
        }
    });
});