// Reemplaza con tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA8nVmMUyPz6EHh7MZip-LmpGdfxUVuDLE",
    authDomain: "autoparts-78761.firebaseapp.com",
    projectId: "autoparts-78761",
    storageBucket: "autoparts-78761.firebasestorage.app",
    messagingSenderId: "971683882726",
    appId: "1:971683882726:web:881f7a5fa9c34f357b3d27",
    measurementId: "G-K1TCFGC61Q"
    };

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// login-admin.js
function loginAdmin(email, password) {
auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Verifica si el usuario es admin
    db.collection("admins").doc(userCredential.user.uid).get()
        .then((doc) => {
        if (doc.exists) {
            window.location.href = "admin.html";
        } else {
            alert("No tienes permisos de administrador");
            auth.signOut();
        }
        });
    })
    .catch((error) => {
    alert("Error: " + error.message);
    });
}

// admin-products.js
// Cargar productos
function cargarProductos() {
db.collection("productos").onSnapshot((querySnapshot) => {
    const productos = [];
    querySnapshot.forEach((doc) => {
    productos.push({ id: doc.id, ...doc.data() });
    });
    renderProductos(productos); // Función para mostrar en la tabla
});
}

// Añadir producto
function agregarProducto(nombre, precio, categoria, stock) {
db.collection("productos").add({
    nombre,
    precio: Number(precio),
    categoria,
    stock: Number(stock),
    fecha: firebase.firestore.FieldValue.serverTimestamp()
});
}

// Actualizar stock
function actualizarStock(id, nuevoStock) {
db.collection("productos").doc(id).update({
    stock: Number(nuevoStock)
});
}