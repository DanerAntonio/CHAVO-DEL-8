// URL base de la API
const API_URL = 'https://chavo-del-8.onrender.com/Api/Compras';

// Array para almacenar las compras
let compras = [];

// Función para cargar las compras desde la API
async function cargarCompras() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al cargar las compras');
    }
    compras = await response.json();
    actualizarTabla();
  } catch (error) {
    console.error('Error:', error);
    mostrarAlerta(`Error al cargar las compras: ${error.message}`, 'error');
  }
}

// Función para actualizar la tabla de compras
function actualizarTabla() {
  const tableBody = document.getElementById('comprasTableBody');
  tableBody.innerHTML = '';

  compras.forEach(compra => {
    const row = `
      <tr>
        <td class="border-bottom-0"><h6 class="fw-semibold mb-0">${compra.numeroCompra}</h6></td>
        <td class="border-bottom-0"><h6 class="fw-semibold mb-0">${compra.numeroFactura}</h6></td>
        <td class="border-bottom-0"><p class="mb-0 fw-normal">${compra.proveedor}</p></td>
        <td class="border-bottom-0"><p class="mb-0 fw-normal">$${compra.montoTotal.toFixed(2)}</p></td>
        <td class="border-bottom-0"><p class="mb-0 fw-normal">${new Date(compra.fechaCompra).toLocaleDateString()}</p></td>
        <td class="border-bottom-0">
          <button class="btn btn-primary btn-sm me-2" onclick="abrirModalEditar('${compra._id}')">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarCompra('${compra._id}')">Eliminar</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Función para crear una compra
async function crearCompra(event) {
  event.preventDefault();
  const numeroCompra = document.getElementById('createCompraNumero').value;
  const numeroFactura = document.getElementById('createCompraFactura').value;
  const proveedor = document.getElementById('createCompraProveedor').value;
  const montoTotal = parseFloat(document.getElementById('createCompraMonto').value);
  const fechaCompra = document.getElementById('createCompraFecha').value;

  if (!numeroCompra || !numeroFactura || !proveedor || isNaN(montoTotal) || !fechaCompra) {
    mostrarAlerta('Por favor, complete todos los campos correctamente.', 'error');
    return;
  }

  const nuevaCompra = { numeroCompra, numeroFactura, proveedor, montoTotal, fechaCompra };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevaCompra),
    });

    if (!response.ok) throw new Error('Error al crear la compra');
    
    await cargarCompras();
    cerrarModal('createCompraModal');
    mostrarAlerta('Compra creada exitosamente', 'success');
    document.getElementById('createCompraForm').reset();
  } catch (error) {
    console.error('Error:', error);
    mostrarAlerta('Error al crear la compra', 'error');
  }
}

// Función para abrir el modal de edición
function abrirModalEditar(id) {
  const compra = compras.find(c => c._id === id);
  if (compra) {
    document.getElementById('editCompraId').value = compra._id;
    document.getElementById('editCompraNumero').value = compra.numeroCompra;
    document.getElementById('editCompraFactura').value = compra.numeroFactura;
    document.getElementById('editCompraProveedor').value = compra.proveedor;
    document.getElementById('editCompraMonto').value = compra.montoTotal;
    document.getElementById('editCompraFecha').value = new Date(compra.fechaCompra).toISOString().split('T')[0];
    
    const editCompraModal = new bootstrap.Modal(document.getElementById('editCompraModal'));
    editCompraModal.show();
  }
}

// Función para guardar los cambios de una compra editada
async function guardarCambiosCompra(event) {
  event.preventDefault();
  const id = document.getElementById('editCompraId').value;
  const numeroCompra = document.getElementById('editCompraNumero').value;
  const numeroFactura = document.getElementById('editCompraFactura').value;
  const proveedor = document.getElementById('editCompraProveedor').value;
  const montoTotal = parseFloat(document.getElementById('editCompraMonto').value);
  const fechaCompra = document.getElementById('editCompraFecha').value;

  if (!numeroCompra || !numeroFactura || !proveedor || isNaN(montoTotal) || !fechaCompra) {
    mostrarAlerta('Por favor, complete todos los campos correctamente.', 'error');
    return;
  }

  const compraActualizada = { numeroCompra, numeroFactura, proveedor, montoTotal, fechaCompra };

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(compraActualizada),
    });

    if (!response.ok) throw new Error('Error al actualizar la compra');
    
    await cargarCompras();
    cerrarModal('editCompraModal');
    mostrarAlerta('Compra actualizada exitosamente', 'success');
  } catch (error) {
    console.error('Error:', error);
    mostrarAlerta('Error al actualizar la compra', 'error');
  }
}

// Función para eliminar una compra
async function eliminarCompra(id) {
  if (confirm('¿Está seguro de que desea eliminar esta compra?')) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar la compra');
      
      await cargarCompras();
      mostrarAlerta('Compra eliminada exitosamente', 'success');
    } catch (error) {
      console.error('Error:', error);
      mostrarAlerta('Error al eliminar la compra', 'error');
    }
  }
}

// Función para mostrar alertas usando SweetAlert2
function mostrarAlerta(mensaje, tipo) {
  Swal.fire({
    icon: tipo,
    title: tipo === 'success' ? 'Éxito' : 'Error',
    text: mensaje,
  });
}

// Función para cerrar modales
function cerrarModal(modalId) {
  const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
  modal.hide();
}

// Event Listeners
document.getElementById('saveCreateCompraButton').addEventListener('click', crearCompra);
document.getElementById('saveEditCompraButton').addEventListener('click', guardarCambiosCompra);

// Cargar compras al iniciar la página
document.addEventListener('DOMContentLoaded', cargarCompras);