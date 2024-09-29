// app.js

const API_BASE_URL = 'https://chavo-del-8.onrender.com/Api';

// Modales
const carritoModal = document.getElementById("carritoModal");
const comprasModal = document.getElementById("comprasModal");
const detalleComprasModal = document.getElementById("detalleComprasModal");
const clientesModal = document.getElementById("clientesModal");

// Botones para abrir los modales
document.getElementById("openCarritoModal").onclick = function() {
    carritoModal.style.display = "block";
};

document.getElementById("openComprasModal").onclick = function() {
    comprasModal.style.display = "block";
};

document.getElementById("openDetalleComprasModal").onclick = function() {
    detalleComprasModal.style.display = "block";
};

document.getElementById("openClientesModal").onclick = function() {
    clientesModal.style.display = "block";
};

// Cerrar los modales
document.getElementById("closeCarritoModal").onclick = function() {
    carritoModal.style.display = "none";
};

document.getElementById("closeComprasModal").onclick = function() {
    comprasModal.style.display = "none";
};

document.getElementById("closeDetalleComprasModal").onclick = function() {
    detalleComprasModal.style.display = "none";
};

document.getElementById("closeClientesModal").onclick = function() {
    clientesModal.style.display = "none";
};

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    if (event.target === carritoModal) {
        carritoModal.style.display = "none";
    }
    if (event.target === comprasModal) {
        comprasModal.style.display = "none";
    }
    if (event.target === detalleComprasModal) {
        detalleComprasModal.style.display = "none";
    }
    if (event.target === clientesModal) {
        clientesModal.style.display = "none";
    }
};

// Manejo de formularios
document.getElementById("carritoForm").onsubmit = function(event) {
    event.preventDefault();
    // Obtener datos del formulario
    const cliente = document.getElementById("cliente").value;
    const productos = document.getElementById("productos").value;
    const total = document.getElementById("total").value;
    const metodoPago = document.getElementById("metodoPago").value;

    // Crear el objeto para la API
    const nuevoCarrito = { cliente, productos, total, metodoPago };

    // Enviar los datos a la API
    fetch(`${API_BASE_URL}/carrito`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCarrito)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Carrito agregado:", data);
        // Cerrar el modal
        carritoModal.style.display = "none";
        // Actualizar la tabla de carritos aquí
    })
    .catch(error => console.error("Error al agregar carrito:", error));
};

// Repetir para el resto de los formularios
document.getElementById("comprasForm").onsubmit = function(event) {
    event.preventDefault();
    const numeroCompra = document.getElementById("numeroCompra").value;
    const numeroFactura = document.getElementById("numeroFactura").value;
    const proveedor = document.getElementById("proveedor").value;
    const montoTotal = document.getElementById("montoTotal").value;
    const fechaCompra = document.getElementById("fechaCompra").value;
    const clientId = document.getElementById("clientId").value;

    const nuevaCompra = { numeroCompra, numeroFactura, proveedor, montoTotal, fechaCompra, clientId };

    fetch(`${API_BASE_URL}/compras`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaCompra)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Compra agregada:", data);
        comprasModal.style.display = "none";
        // Actualizar la tabla de compras aquí
    })
    .catch(error => console.error("Error al agregar compra:", error));
};

// Repetir para el resto de los formularios
document.getElementById("detalleComprasForm").onsubmit = function(event) {
    event.preventDefault();
    const compraId = document.getElementById("compraId").value;
    const productoId = document.getElementById("productoId").value;
    const cantidad = document.getElementById("cantidad").value;
    const precio = document.getElementById("precio").value;

    const nuevoDetalle = { compraId, productoId, cantidad, precio };

    fetch(`${API_BASE_URL}/detalleCompras`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoDetalle)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Detalle de compra agregado:", data);
        detalleComprasModal.style.display = "none";
        // Actualizar la tabla de detalle de compras aquí
    })
    .catch(error => console.error("Error al agregar detalle de compra:", error));
};

// Repetir para el resto de los formularios
document.getElementById("clientesForm").onsubmit = function(event) {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;
    const estado = document.getElementById("estado").value;

    const nuevoCliente = { nombre, correo, telefono, direccion, estado };

    fetch(`${API_BASE_URL}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoCliente)
    })
    .then(response => response.json())
    .then(data => {
        console.log("Cliente agregado:", data);
        clientesModal.style.display = "none";
        // Actualizar la tabla de clientes aquí
    })
    .catch(error => console.error("Error al agregar cliente:", error));
};

// Funciones adicionales para Leer, Actualizar y Eliminar se deben implementar
