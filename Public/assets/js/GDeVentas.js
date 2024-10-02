
// Variables globales
let clientes = [];
let ventas = [];
let currentPage = 1;
const itemsPerPage = 10;

// Función para cargar clientes
async function cargarClientes() {
    try {
        const response = await fetch('https://chavo-del-8.onrender.com/Api/Cliente');
        clientes = await response.json();
    } catch (error) {
        console.error('Error al cargar clientes:', error);
    }
}

// Función para cargar ventas
async function cargarVentas() {
    try {
        const response = await fetch('https://chavo-del-8.onrender.com/Api/Ventas');
        ventas = await response.json();
        mostrarVentas();
    } catch (error) {
        console.error('Error al cargar ventas:', error);
    }
}

// Función para mostrar ventas en la tabla
function mostrarVentas() {
    const tabla = document.getElementById('ventasTable').getElementsByTagName('tbody')[0];
    tabla.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const ventasPaginadas = ventas.slice(startIndex, endIndex);

    ventasPaginadas.forEach(venta => {
        const row = tabla.insertRow();
        row.innerHTML = `
            <td>${venta._id}</td>
            <td>${venta.idUsuario ? venta.idUsuario.nombre : 'N/A'}</td>
            <td>${venta.idUsuario ? venta.idUsuario.documento : 'N/A'}</td>
            <td>${new Date(venta.fecha).toLocaleDateString()}</td>
            <td>$${venta.precioTotal.toFixed(2)}</td>
            <td>${venta.estado}</td>
            <td>
                <button class="btn btn-sm btn-warning editar-venta" data-id="${venta._id}">Editar</button>
                <button class="btn btn-sm btn-danger anular-venta" data-id="${venta._id}">Anular</button>
            </td>
        `;
    });

    actualizarPaginacion();
}

// Función para actualizar la paginación
function actualizarPaginacion() {
    const totalPages = Math.ceil(ventas.length / itemsPerPage);
    const paginationElement = document.querySelector('.pagination');
    paginationElement.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" data-page="${i}">${i}</a>`;
        paginationElement.appendChild(li);
    }

    paginationElement.addEventListener('click', function(e) {
        e.preventDefault();
        if (e.target.tagName === 'A') {
            currentPage = parseInt(e.target.getAttribute('data-page'));
            mostrarVentas();
        }
    });
}

// Función para crear una nueva venta
async function crearVenta(ventaData) {
    try {
        const response = await fetch('https://chavo-del-8.onrender.com/Api/Ventas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ventaData)
        });
        const data = await response.json();
        if (response.ok) {
            alert('Venta creada con éxito');
            await cargarVentas();
        } else {
            alert('Error al crear la venta: ' + data.message);
        }
    } catch (error) {
        console.error('Error al crear venta:', error);
        alert('Error al crear la venta');
    }
}

// Función para anular una venta
async function anularVenta(id) {
    try {
        const response = await fetch(`https://chavo-del-8.onrender.com/Api/Ventas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ estado: 'anulada' })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Venta anulada con éxito');
            await cargarVentas();
        } else {
            alert('Error al anular la venta: ' + data.message);
        }
    } catch (error) {
        console.error('Error al anular venta:', error);
        alert('Error al anular la venta');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', async () => {
    await cargarClientes();
    await cargarVentas();

    // Evento para crear venta
    document.getElementById('ventaForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const ventaData = {
            idUsuario: document.getElementById('nombreCliente').value,
            idProducto: document.getElementById('nombreProducto').value,
            cantidad: parseInt(document.getElementById('cantidadProducto').value),
            precioUnitario: parseFloat(document.getElementById('precioProducto').value),
            precioTotal: parseFloat(document.getElementById('totalVenta').textContent),
            estado: document.getElementById('estadoVenta').value
        };
        await crearVenta(ventaData);
    });

    // Evento para buscar venta
    document.getElementById('buscarVenta').addEventListener('input', (e) => {
        const busqueda = e.target.value.toLowerCase();
        const ventasFiltradas = ventas.filter(venta => 
            venta._id.toLowerCase().includes(busqueda) ||
            (venta.idUsuario && venta.idUsuario.nombre.toLowerCase().includes(busqueda)) ||
            (venta.idUsuario && venta.idUsuario.documento.toLowerCase().includes(busqueda))
        );
        ventas = ventasFiltradas;
        currentPage = 1;
        mostrarVentas();
    });

    // Evento para anular venta
    document.getElementById('ventasTable').addEventListener('click', async (e) => {
        if (e.target.classList.contains('anular-venta')) {
            const id = e.target.getAttribute('data-id');
            if (confirm('¿Está seguro de que desea anular esta venta?')) {
                await anularVenta(id);
            }
        }
    });

    // Evento para listar clientes
    document.getElementById('listarClientes').addEventListener('click', () => {
        const clientesList = document.createElement('ul');
        clientes.forEach(cliente => {
            const li = document.createElement('li');
            li.textContent = `${cliente.nombre} - ${cliente.documento}`;
            li.style.cursor = 'pointer';
            li.addEventListener('click', () => {
                document.getElementById('nombreCliente').value = cliente.nombre;
                document.getElementById('numeroDocumento').value = cliente.documento;
                document.getElementById('emailCliente').value = cliente.email;
            });
            clientesList.appendChild(li);
        });
        Swal.fire({
            title: 'Lista de Clientes',
            html: clientesList.outerHTML,
            width: 600,
            showCloseButton: true,
            showConfirmButton: false
        });
    });
});
