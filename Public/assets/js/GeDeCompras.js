// URLs de las APIs
const API_URL = 'https://chavo-del-8.onrender.com/Api/Compras';
const PROVEEDOR_API_URL = 'https://chavo-del-8.onrender.com/Api/Proveedor';
const CLIENTE_API_URL = 'https://chavo-del-8.onrender.com/Api/Cliente';
const PRODUCTO_API_URL = 'https://chavo-del-8.onrender.com/Api/Producto';

// Variables globales
let compras = [];
let proveedores = [];
let clientes = [];
let productos = [];
let purchaseProducts = [];
let currentPage = 1;
const itemsPerPage = 10;

// Funciones de carga de datos
async function cargarDatos() {
    try {
        const [comprasRes, proveedoresRes, clientesRes, productosRes] = await Promise.all([
            fetch(API_URL),
            fetch(PROVEEDOR_API_URL),
            fetch(CLIENTE_API_URL),
            fetch(PRODUCTO_API_URL)
        ]);

        if (!comprasRes.ok) throw new Error(`HTTP error! status: ${comprasRes.status}`);
        if (!proveedoresRes.ok) throw new Error(`HTTP error! status: ${proveedoresRes.status}`);
        if (!clientesRes.ok) throw new Error(`HTTP error! status: ${clientesRes.status}`);
        if (!productosRes.ok) throw new Error(`HTTP error! status: ${productosRes.status}`);

        compras = await comprasRes.json();
        proveedores = await proveedoresRes.json();
        clientes = await clientesRes.json();
        productos = await productosRes.json();

        console.log('Datos cargados:', { compras, proveedores, clientes, productos });

        actualizarTabla();
        actualizarSelects();
    } catch (error) {
        console.error('Error al cargar datos:', error);
        mostrarAlerta('Error al cargar datos: ' + error.message, 'error');
    }
}

// Funciones de actualización de UI
function actualizarTabla(filteredCompras = compras) {
    const tableBody = document.getElementById('purchaseTableBody');
    tableBody.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCompras = filteredCompras.slice(startIndex, endIndex);

    paginatedCompras.forEach(compra => {
        const row = `
            <tr>
                <td>${compra.numeroCompra || 'N/A'}</td>
                <td>${compra.numeroFactura || 'N/A'}</td>
                <td>${obtenerNombreProveedor(compra.proveedor)}</td>
                <td>${obtenerNombreCliente(compra.clientId)}</td>
                <td>$${compra.montoTotal ? compra.montoTotal.toFixed(2) : 'N/A'}</td>
                <td>${compra.fechaCompra ? new Date(compra.fechaCompra).toLocaleDateString() : 'N/A'}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="verDetalleCompra('${compra._id}')">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="editarCompra('${compra._id}')">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarCompra('${compra._id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    actualizarPaginacion(filteredCompras.length);
}

function actualizarPaginacion(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="cambiarPagina(${i})">${i}</a>`;
        paginationElement.appendChild(li);
    }
}

function cambiarPagina(page) {
    currentPage = page;
    actualizarTabla();
}

function actualizarSelects() {
    const proveedorSelect = document.getElementById('purchaseProvider');
    const clienteSelect = document.getElementById('clientName');
    const productoSelect = document.getElementById('productSelect');

    proveedorSelect.innerHTML = '<option value="">Seleccione un proveedor</option>';
    clienteSelect.innerHTML = '<option value="">Seleccione un cliente</option>';
    productoSelect.innerHTML = '<option value="">Seleccione un producto</option>';

    proveedores.forEach(proveedor => {
        proveedorSelect.innerHTML += `<option value="${proveedor._id}">${proveedor.nombre_compania}</option>`;
    });

    clientes.forEach(cliente => {
        clienteSelect.innerHTML += `<option value="${cliente._id}">${cliente.nombre}</option>`;
    });

    productos.forEach(producto => {
        productoSelect.innerHTML += `<option value="${producto._id}">${producto.nombre}</option>`;
    });

    console.log('Selects actualizados:', { proveedores, clientes, productos });
}

function actualizarListaProductos() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    purchaseProducts.forEach((product, index) => {
        const productoNombre = obtenerNombreProducto(product.productoId);
        productList.innerHTML += `
            <div class="row mb-2 align-items-center">
                <div class="col-md-3">${productoNombre}</div>
                <div class="col-md-2">${product.cantidad}</div>
                <div class="col-md-3">$${product.precioUnitario.toFixed(2)}</div>
                <div class="col-md-3">$${(product.cantidad * product.precioUnitario).toFixed(2)}</div>
                <div class="col-md-1">
                    <button type="button" class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    calcularMontoTotal();
}

// Funciones de manejo de compras
function abrirModalCrearCompra() {
    document.getElementById('purchaseModalTitle').textContent = 'Crear Compra';
    document.getElementById('purchaseForm').reset();
    document.getElementById('purchaseId').value = '';
    purchaseProducts = [];
    actualizarListaProductos();
    const modal = new bootstrap.Modal(document.getElementById('purchaseModal'));
    modal.show();
}

function editarCompra(id) {
    const compra = compras.find(c => c._id === id);
    if (compra) {
        document.getElementById('purchaseModalTitle').textContent = 'Editar Compra';
        document.getElementById('purchaseId').value = compra._id;
        document.getElementById('purchaseNumber').value = compra.numeroCompra || '';
        document.getElementById('invoiceNumber').value = compra.numeroFactura || '';
        document.getElementById('purchaseProvider').value = compra.proveedor || '';
        document.getElementById('purchaseTotal').value = compra.montoTotal ? compra.montoTotal.toFixed(2) : '';
        document.getElementById('purchaseDate').value = compra.fechaCompra ? new Date(compra.fechaCompra).toISOString().split('T')[0] : '';
        document.getElementById('clientName').value = compra.clientId || '';
        
        purchaseProducts = compra.productos || [];
        actualizarListaProductos();
        
        const purchaseModal = new bootstrap.Modal(document.getElementById('purchaseModal'));
        purchaseModal.show();
    } else {
        mostrarAlerta('No se encontró la compra', 'error');
    }
}

async function guardarCompra() {
    const id = document.getElementById('purchaseId').value;
    const compra = {
        numeroCompra: document.getElementById('purchaseNumber').value,
        numeroFactura: document.getElementById('invoiceNumber').value,
        proveedor: document.getElementById('purchaseProvider').value,
        montoTotal: parseFloat(document.getElementById('purchaseTotal').value),
        fechaCompra: document.getElementById('purchaseDate').value,
        clientId: document.getElementById('clientName').value,
        productos: purchaseProducts
    };

    if (!validarCompra(compra)) {
        return;
    }

    try {
        const url = id ? `${API_URL}/${id}` : API_URL;
        const method = id ? 'PUT' : 'POST';
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(compra)
        });

        if (!response.ok) throw new Error('Error al guardar la compra');
        
        await cargarDatos();
        const modal = bootstrap.Modal.getInstance(document.getElementById('purchaseModal'));
        modal.hide();
        mostrarAlerta('Compra guardada exitosamente', 'success');
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('Error al guardar la compra: ' + error.message, 'error');
    }
}

async function eliminarCompra(id) {
    const result = await Swal.fire({
        title: '¿Está seguro?',
        text: "Esta acción no se puede deshacer",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Error al eliminar la compra');
            await cargarDatos();
            mostrarAlerta('Compra eliminada exitosamente', 'success');
        } catch (error) {
            console.error('Error:', error);
            mostrarAlerta('Error al eliminar la compra', 'error');
        }
    }
}

async function verDetalleCompra(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const compra = await response.json();
        console.log('Detalle de compra:', compra);

        document.getElementById('viewPurchaseNumber').textContent = compra.numeroCompra || 'N/A';
        document.getElementById('viewInvoiceNumber').textContent = compra.numeroFactura || 'N/A';
        document.getElementById('viewPurchaseProvider').textContent = compra.proveedorNombre || 'N/A';
        document.getElementById('viewClientName').textContent = compra.clienteNombre || 'N/A';
        document.getElementById('viewPurchaseTotal').textContent = compra.montoTotal ? `$${compra.montoTotal.toFixed(2)}` : 'N/A';
        document.getElementById('viewPurchaseDate').textContent = compra.fechaCompra ? new Date(compra.fechaCompra).toLocaleDateString() : 'N/A';

        const productList = document.getElementById('viewProductList');
        productList.innerHTML = '';
        if (compra.productos && Array.isArray(compra.productos) && compra.productos.length > 0) {
            compra.productos.forEach(product => {
                productList.innerHTML += `
                    <tr>
                        <td>${obtenerNombreProducto(product.productoId)}</td>
                        <td>${product.cantidad}</td>
                        <td>$${product.precioUnitario.toFixed(2)}</td>
                        <td>$${(product.cantidad * product.precioUnitario).toFixed(2)}</td>
                    </tr>
                `;
            });
        } else {
            productList.innerHTML = '<tr><td colspan="4">No hay productos asociados a esta compra.</td></tr>';
        }

        const viewPurchaseModal = new bootstrap.Modal(document.getElementById('viewPurchaseModal'));
        viewPurchaseModal.show();
    } catch (error) {
        console.error('Error in verDetalleCompra:', error);
        mostrarAlerta(`Error al cargar los detalles de la compra: ${error.message}`, 'error');
    }
}

// Funciones de manejo de productos en la compra
function agregarProducto() {
    const productoId = document.getElementById('productSelect').value;
    const cantidad = parseInt(document.getElementById('productQuantity').value);
    const precioUnitario = parseFloat(document.getElementById('productPrice').value);
    const producto = productos.find(p => p._id === productoId);

    if (productoId && cantidad && precioUnitario && producto) {
        purchaseProducts.push({
            productoId: productoId,
            cantidad: cantidad,
            precioUnitario: precioUnitario
        });
        actualizarListaProductos();
        calcularMontoTotal();
    } else {
        mostrarAlerta('Por favor, complete todos los campos del producto', 'error');
    }
}

function eliminarProducto(index) {
    purchaseProducts.splice(index, 1);
    actualizarListaProductos();
    calcularMontoTotal();
}

function calcularMontoTotal() {
    const total = purchaseProducts.reduce((sum, product) => {
        return sum + (product.cantidad * product.precioUnitario);
    }, 0);
    document.getElementById('purchaseTotal').value = total.toFixed(2);
}

// Funciones de utilidad
function obtenerNombreProveedor(id) {
    const proveedor = proveedores.find(p => p._id === id);
    return proveedor ? proveedor.nombre_compania : 'Proveedor no encontrado';
}

function obtenerNombreCliente(id) {
    const cliente = clientes.find(c => c._id === id);
    return cliente ? cliente.nombre : 'Cliente no encontrado';
}

function obtenerNombreProducto(id) {
    const producto = productos.find(p =>

 p._id === id);
    return producto ? producto.nombre : 'Producto no encontrado';
}

function mostrarAlerta(mensaje, tipo) {
    Swal.fire({
        icon: tipo,
        title: tipo === 'success' ? 'Éxito' : 'Error',
        text: mensaje,
        footer: tipo === 'error' ? 'Por favor, contacte al soporte técnico si el problema persiste.' : ''
    });
}

function validarCompra(compra) {
    if (!compra.numeroCompra || !compra.numeroFactura || !compra.proveedor || !compra.clientId) {
        mostrarAlerta('Por favor, complete todos los campos requeridos', 'error');
        return false;
    }
    if (compra.productos.length === 0) {
        mostrarAlerta('Debe agregar al menos un producto a la compra', 'error');
        return false;
    }
    return true;
}

// Función para descargar Excel
function descargarExcel() {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(compras.map(compra => ({
        'Número de Compra': compra.numeroCompra || 'N/A',
        'Número de Factura': compra.numeroFactura || 'N/A',
        'Proveedor': obtenerNombreProveedor(compra.proveedor),
        'Cliente': obtenerNombreCliente(compra.clientId),
        'Monto Total': compra.montoTotal ? `$${compra.montoTotal.toFixed(2)}` : 'N/A',
        'Fecha de Compra': compra.fechaCompra ? new Date(compra.fechaCompra).toLocaleDateString() : 'N/A'
    })));
    XLSX.utils.book_append_sheet(workbook, worksheet, "Compras");
    XLSX.writeFile(workbook, "Compras.xlsx");
}

// Función para buscar compras
function buscarCompras() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredCompras = compras.filter(compra => 
        (compra.numeroCompra && compra.numeroCompra.toLowerCase().includes(searchTerm)) ||
        (compra.numeroFactura && compra.numeroFactura.toLowerCase().includes(searchTerm)) ||
        obtenerNombreProveedor(compra.proveedor).toLowerCase().includes(searchTerm) ||
        obtenerNombreCliente(compra.clientId).toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    actualizarTabla(filteredCompras);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    cargarDatos();
    document.getElementById('searchInput').addEventListener('input', buscarCompras);
    document.getElementById('savePurchaseButton').addEventListener('click', guardarCompra);
    document.getElementById('addProductBtn').addEventListener('click', agregarProducto);
    document.getElementById('downloadExcelBtn').addEventListener('click', descargarExcel);
});