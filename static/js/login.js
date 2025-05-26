document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('correo').value;
    const password = document.getElementById('contrasena').value;
    const errorMsg = document.getElementById('error-msg');

    // Validación simple de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        errorMsg.textContent = 'Correo inválido.';
        return;
    }

    if (password.length < 4) {
        errorMsg.textContent = 'La contraseña debe tener al menos 4 caracteres.';
        return;
    }

    // Validación de credenciales
    if (email === 'distribuidor@autoparts.cl' && password === '123456') {
        localStorage.setItem('rolUsuario', 'mayorista');
        localStorage.setItem('sesionActiva', 'true');
        localStorage.setItem('usuarioCorreo', email);
        window.location.href = 'mayorista.html';
    } else if (email === 'cliente@autoparts.cl' && password === '123456') {
        localStorage.setItem('rolUsuario', 'cliente');
        localStorage.setItem('sesionActiva', 'true');
        localStorage.setItem('usuarioCorreo', email);
        window.location.href = 'catalogo.html';
    } else {
        errorMsg.textContent = 'Correo o contraseña incorrectos.';
    }
});

