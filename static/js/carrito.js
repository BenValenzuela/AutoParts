// Función para obtener los productos del carrito desde localStorage
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productosCarritoDiv = document.getElementById('productos-carrito');
    const totalCompraSpan = document.getElementById('total-compra');

    // Limpiar productos previos
    productosCarritoDiv.innerHTML = '';

    let totalCompra = 0;

    // Agregar productos al carrito y calcular el total
    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('bg-white', 'p-4', 'rounded-md', 'shadow-md', 'flex', 'justify-between', 'items-center');

        productoDiv.innerHTML = `
            <div>
                <h3 class="font-semibold">${producto.nombre}</h3>
                <p>Cantidad: ${producto.cantidad}</p>
                <p>Precio Unitario: $${producto.precio}</p>
            </div>
            <div>
                <p class="font-semibold">Subtotal: $${producto.precio * producto.cantidad}</p>
                <button class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700" onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </div>
        `;

        // Agregar al contenedor
        productosCarritoDiv.appendChild(productoDiv);

        // Actualizar el total de la compra
        totalCompra += producto.precio * producto.cantidad;
    });

    // Mostrar el total
    totalCompraSpan.textContent = totalCompra.toFixed(2);
}

// Función para eliminar un producto del carrito
function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Filtrar el producto a eliminar
    carrito = carrito.filter(producto => producto.id !== id);

    // Actualizar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Recargar el carrito
    cargarCarrito();
}

// Llamar a cargarCarrito cuando la página se carga
document.addEventListener('DOMContentLoaded', cargarCarrito);
