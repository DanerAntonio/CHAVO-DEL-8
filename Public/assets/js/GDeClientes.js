// URL base de la API
const API_URL = 'https://chavo-del-8.onrender.com/Api/Cliente';

// Array para almacenar los clientes
let clientes = [];

// Función para cargar los clientes desde la API
async function cargarClientes() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al cargar los clientes');
    }
    clientes = await response.json();
    actualizarTabla();
  } catch (error) {
    console.error('Error:', error);
    mostrarAlerta(`Error al cargar los clientes: ${error.message}`, 'error');
  }
}

// Función para actualizar la tabla de clientes
function actualizarTabla() {
  const tableBody = document.getElementById('customerTableBody');
  tableBody.innerHTML = '';

  clientes.forEach(cliente => {
    const row = `
      <tr>
        <td class="border-bottom-0"><h6 class="fw-semibold mb-0">${cliente._id}</h6></td>
        <td class="border-bottom-0"><h6 class="fw-semibold mb-0">${cliente.nombre}</h6></td>
        <td class="border-bottom-0"><p class="mb-0 fw-normal">${cliente.correo}</p></td>
        <td class="border-bottom-0"><p class="mb-0 fw-normal">${cliente.telefono}</p></td>
        <td class="border-bottom-0"><p class="mb-0 fw-normal">${cliente.direccion}</p></td>
        <td class="border-bottom-0"><p class="mb-0 fw-normal">${cliente.estado}</p></td>
        <td class="border-bottom-0">
          <button class="btn btn-primary btn-sm me-2" onclick="abrirModalEditar('${cliente._id}')">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="eliminarCliente('${cliente._id}')">Eliminar</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// Función para crear un cliente
async function crearCliente(event) {
  event.preventDefault();
  const nombre = document.getElementById('createCustomerName').value;
  const correo = document.getElementById('createCustomerEmail').value;
  const telefono = document.getElementById('createCustomerPhone').value;
  const direccion = document.getElementById('createCustomerAddress').value;

  if (!nombre || !correo || !telefono || !direccion) {
    mostrarAlerta('Por favor, complete todos los campos.', 'error');
    return;
  }

  const nuevoCliente = { nombre, correo, telefono, direccion, estado: 'activo' };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoCliente),
    });

    if (!response.ok) throw new Error('Error al crear el cliente');
    
    await cargarClientes();
    cerrarModal('createCustomerModal');
    mostrarAlerta('Cliente creado exitosamente', 'success');
    document.getElementById('createCustomerForm').reset();
  } catch (error) {
    console.error('Error:', error);
    mostrarAlerta('Error al crear el cliente', 'error');
  }
}


// Función para abrir el modal de detalles del cliente
function verDetalleCliente(id) {
  const cliente = clientes.find(c => c._id === id);
  if (cliente) {
    // Aquí se agregan detalles adicionales del cliente
    document.getElementById('detalleClienteNombre').textContent = cliente.nombre;
    document.getElementById('detalleClienteCorreo').textContent = cliente.correo;
    document.getElementById('detalleClienteTelefono').textContent = cliente.telefono;
    document.getElementById('detalleClienteDireccion').textContent = cliente.direccion;
    document.getElementById('detalleClienteEstado').textContent = cliente.estado;

    // Detalle adicional (ejemplo: fecha de creación del cliente)
    document.getElementById('detalleClienteFecha').textContent = cliente.fechaCreacion || 'Fecha no disponible';

    const detalleClienteModal = new bootstrap.Modal(document.getElementById('detalleClienteModal'));
    detalleClienteModal.show();
  }
}


// Función para abrir el modal de edición
function abrirModalEditar(id) {
  const cliente = clientes.find(c => c._id === id);
  if (cliente) {
    document.getElementById('editCustomerId').value = cliente._id;
    document.getElementById('editCustomerName').value = cliente.nombre;
    document.getElementById('editCustomerEmail').value = cliente.correo;
    document.getElementById('editCustomerPhone').value = cliente.telefono;
    document.getElementById('editCustomerAddress').value = cliente.direccion;
    
    const editCustomerModal = new bootstrap.Modal(document.getElementById('editCustomerModal'));
    editCustomerModal.show();
  }
}

// Función para guardar los cambios de un cliente editado
async function guardarCambiosCliente(event) {
  event.preventDefault();
  const id = document.getElementById('editCustomerId').value;
  const nombre = document.getElementById('editCustomerName').value;
  const correo = document.getElementById('editCustomerEmail').value;
  const telefono = document.getElementById('editCustomerPhone').value;
  const direccion = document.getElementById('editCustomerAddress').value;

  if (!nombre || !correo || !telefono || !direccion) {
    mostrarAlerta('Por favor, complete todos los campos.', 'error');
    return;
  }

  const clienteActualizado = { nombre, correo, telefono, direccion };

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clienteActualizado),
    });

    if (!response.ok) throw new Error('Error al actualizar el cliente');
    
    await cargarClientes();
    cerrarModal('editCustomerModal');
    mostrarAlerta('Cliente actualizado exitosamente', 'success');
  } catch (error) {
    console.error('Error:', error);
    mostrarAlerta('Error al actualizar el cliente', 'error');
  }
}

// Función para eliminar un cliente
async function eliminarCliente(id) {
  if (confirm('¿Está seguro de que desea eliminar este cliente?')) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Error al eliminar el cliente');
      
      await cargarClientes();
      mostrarAlerta('Cliente eliminado exitosamente', 'success');
    } catch (error) {
      console.error('Error:', error);
      mostrarAlerta('Error al eliminar el cliente', 'error');
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
document.getElementById('saveCreateCustomerButton').addEventListener('click', crearCliente);
document.getElementById('saveEditCustomerButton').addEventListener('click', guardarCambiosCliente);

// Cargar clientes al iniciar la página
document.addEventListener('DOMContentLoaded', cargarClientes);