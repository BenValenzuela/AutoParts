// Validación de acceso
window.addEventListener('DOMContentLoaded', () => {
    const sesion = localStorage.getItem('sesionActiva');
    const rol = localStorage.getItem('rolUsuario');

    if (sesion !== 'true' || rol !== 'mayorista') {
        alert('Acceso denegado. Solo disponible para mayoristas.');
        window.location.href = 'login.html';
        return;
    }

    // Filtro de productos por categoría
    const filtro = document.getElementById('filtro');
    const productos = document.querySelectorAll('.producto');

    function filtrarProductos(categoria) {
        let hayResultados = false;

        productos.forEach(producto => {
            if (categoria === 'todos' || producto.classList.contains(categoria)) {
                producto.classList.remove('hidden');
                hayResultados = true;
            } else {
                producto.classList.add('hidden');
            }
        });

        // Mensaje si no hay productos visibles
        let aviso = document.getElementById('aviso-sin-productos');
        if (!hayResultados) {
            if (!aviso) {
                aviso = document.createElement('p');
                aviso.id = 'aviso-sin-productos';
                aviso.className = 'text-center text-red-600 mt-8 font-semibold';
                aviso.textContent = 'No hay productos disponibles para esta categoría.';
                document.getElementById('productos').after(aviso);
            }
        } else if (aviso) {
            aviso.remove();
        }
    }

    // Aplicar filtro guardado (si existe)
    const categoriaGuardada = localStorage.getItem('categoriaSeleccionada');
    if (categoriaGuardada) {
        filtro.value = categoriaGuardada;
        filtrarProductos(categoriaGuardada);
    }

    // Cambiar filtro dinámicamente
    filtro.addEventListener('change', function () {
        const categoria = this.value;
        localStorage.setItem('categoriaSeleccionada', categoria);
        filtrarProductos(categoria);
    });
});

