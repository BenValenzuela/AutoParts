// static/js/catalogo.js

document.addEventListener("DOMContentLoaded", async () => {
const botones = document.querySelectorAll("button[data-categoria]");
const grid = document.getElementById("productGrid");

try {
const res = await fetch("/api/productos");
const data = await res.json();

data.productos.forEach(prod => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.categoria = prod.categoria.toLowerCase();

    card.innerHTML = `
    <img src="${prod.imagen}" alt="${prod.nombre}">
    <div class="product-info">
        <h3>${prod.nombre}</h3>
        <p>Categoría: ${prod.categoria}</p>
        <p>Stock: ${prod.stock}</p>
        <div class="price">$${prod.precio.toLocaleString('es-CL')}</div>
        <button class="btn-agregar" onclick="agregarAlCarrito('${prod.nombre}', ${prod.precio}, '${prod.nombre.toLowerCase().replace(/\s+/g, '-')}', '${prod.categoria}')">Agregar al Carrito</button>
    </div>
    `;

    grid.appendChild(card);
});
} catch (err) {
grid.innerHTML = '<p>Error al cargar productos.</p>';
console.error('Error:', err);
}

botones.forEach(boton => {
boton.addEventListener("click", () => {
    const categoria = boton.getAttribute("data-categoria");
    const productos = document.querySelectorAll(".product-card");

    productos.forEach(producto => {
    if (categoria === "todos" || producto.getAttribute("data-categoria") === categoria) {
        producto.classList.remove("hidden");
    } else {
        producto.classList.add("hidden");
    }
    });
});
});

if (window.location.pathname.includes("carrito.html")) {
mostrarCarrito();
}
});

function agregarAlCarrito(nombre, precio, id, categoria) {
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const productoExistente = carrito.find(item => item.id === id);

if (productoExistente) {
productoExistente.cantidad += 1;
} else {
carrito.push({ id, nombre, precio, cantidad: 1 });
}

localStorage.setItem("carrito", JSON.stringify(carrito));
alert(`${nombre} ha sido agregado al carrito`);
}

function mostrarCarrito() {
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const carritoItems = document.getElementById("carritoItems");
const totalElement = document.getElementById("total");

if (carrito.length === 0) {
carritoItems.innerHTML = "<p>No hay productos en el carrito.</p>";
totalElement.textContent = "";
} else {
let total = 0;
carritoItems.innerHTML = carrito.map(item => `
    <div class="carrito-item">
    <p><strong>${item.nombre}</strong></p>
    <p>Precio: $${item.precio}</p>
    <p>Cantidad: ${item.cantidad}</p>
    <button class="btn-eliminar" onclick="eliminarDelCarrito('${item.id}')">Eliminar</button>
    </div>
`).join("");

carrito.forEach(item => total += item.precio * item.cantidad);
totalElement.textContent = `Total: $${total}`;
}
}

function eliminarDelCarrito(id) {
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
carrito = carrito.filter(item => item.id !== id);
localStorage.setItem("carrito", JSON.stringify(carrito));
mostrarCarrito();
}
