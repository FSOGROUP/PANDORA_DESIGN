(function() {
  'use strict';

  // Datos de ejemplo
  const productos = [
    { id: 'p1', codigo: 'LPT-001', nombre: 'Laptop HP 15"', precio: 1190.00, stock: 15, categoria: 'Computadoras' },
    { id: 'p2', codigo: 'MOU-001', nombre: 'Mouse Logitech', precio: 19.99, stock: 142, categoria: 'Periféricos' },
    { id: 'p3', codigo: 'TCL-001', nombre: 'Teclado Mecánico', precio: 89.99, stock: 34, categoria: 'Periféricos' },
    { id: 'p4', codigo: 'MON-001', nombre: 'Monitor 24"', precio: 249.99, stock: 8, categoria: 'Computadoras' }
  ];

  const categorias = ['Todos', 'Computadoras', 'Periféricos', 'Servicios'];

  const ventas = [
    { id: 'v1', fecha: '2026-02-24', cliente: 'Juan Pérez', total: 1240.00, estado: 'COMPLETADA' },
    { id: 'v2', fecha: '2026-02-24', cliente: 'Ana Gómez', total: 89.99, estado: 'COMPLETADA' },
    { id: 'v3', fecha: '2026-02-23', cliente: 'Carlos Ruiz', total: 269.98, estado: 'COMPLETADA' }
  ];

  const notificaciones = [
    { icon: '💰', text: 'Venta registrada: $1,240.00', time: 'Hace 10min' },
    { icon: '⚠️', text: 'Stock bajo: Monitor 24" (8 unidades)', time: 'Hace 1h' },
    { icon: '✅', text: 'Caja aperturada correctamente', time: 'Hace 3h' }
  ];

  // Estado
  let currentSection = 'dashboard';
  let sidebarCollapsed = false;
  let posCart = [];
  let posCustomer = 'Consumidor Final';

  document.addEventListener('DOMContentLoaded', function() {
    // Fecha actual
    const today = new Date();
    document.getElementById('current-date').textContent = today.toLocaleDateString('es-EC', { 
      day: 'numeric', month: 'long', year: 'numeric' 
    });

    // Notificaciones
    const notifList = document.getElementById('notifications-list');
    if (notifList) {
      notificaciones.forEach(n => {
        notifList.innerHTML += `
          <div class="notification-item">
            <div class="notification-icon">${n.icon}</div>
            <div class="notification-content">
              <div class="notification-text">${n.text}</div>
              <div class="notification-time">${n.time}</div>
            </div>
          </div>
        `;
      });
    }

    // Event listeners
    document.getElementById('sidebar-collapse').addEventListener('click', toggleSidebar);
    document.getElementById('notifications-btn').addEventListener('click', toggleNotifications);
    document.getElementById('modal-close').addEventListener('click', closeModal);

    // Cargar sección inicial
    showSection('dashboard');
  });

  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
    const sidebar = document.getElementById('sidebar');
    const icon = document.getElementById('collapse-icon');
    
    sidebar.classList.toggle('collapsed', sidebarCollapsed);
    icon.className = sidebarCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left';
  }

  function toggleNotifications() {
    document.getElementById('notifications-dropdown')?.classList.toggle('open');
  }

  function showSection(section) {
    currentSection = section;
    
    // Actualizar active en menú
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const activeEl = Array.from(document.querySelectorAll('.nav-item')).find(el => 
      el.getAttribute('onclick')?.includes(section)
    );
    if (activeEl) activeEl.classList.add('active');

    // Actualizar breadcrumb
    const titles = {
      'dashboard': 'Mi Dashboard',
      'pos': 'Punto de Venta',
      'ventas': 'Registrar Venta',
      'clientes': 'Clientes',
      'stock-rapido': 'Consultar Stock',
      'mis-ventas': 'Mis Ventas',
      'cierre-caja': 'Cierre de Caja',
      'mi-perfil': 'Mi Perfil',
      'caja-diaria': 'Caja Diaria',
      'inventario-rapido': 'Inventario Rápido',
      'reportes-diarios': 'Reportes del Día'
    };
    document.getElementById('current-section').textContent = titles[section] || section;

    // Renderizar contenido
    const container = document.getElementById('main-container');
    container.innerHTML = renderSection(section);
  }

  function renderSection(section) {
    switch(section) {
      case 'dashboard':
        return renderDashboard();
      case 'pos':
        return renderPOS();
      case 'ventas':
        return renderVentas();
      case 'clientes':
        return renderClientes();
      case 'stock-rapido':
        return renderStockRapido();
      case 'mis-ventas':
        return renderMisVentas();
      case 'cierre-caja':
        return renderCierreCaja();
      case 'mi-perfil':
        return renderPerfil();
      default:
        return renderPlaceholder(section);
    }
  }

  function renderDashboard() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Hola, Carlos 👋</h1>
          <p class="page-subtitle">TechCorp S.A. · Cajero</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="showSection('pos')">
            <i class="fas fa-cash-register"></i> Abrir POS
          </button>
          <button class="btn btn-secondary btn-sm" onclick="showSection('ventas')">
            <i class="fas fa-cart-shopping"></i> Nueva Venta
          </button>
        </div>
      </div>
      
      <div class="grid-4">
        <div class="stat-card success">
          <div class="stat-icon">🧾</div>
          <div class="stat-value">42</div>
          <div class="stat-label">Mis ventas hoy</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +7</div>
        </div>
        <div class="stat-card primary">
          <div class="stat-icon">💰</div>
          <div class="stat-value">$3,840</div>
          <div class="stat-label">Total del día</div>
          <div class="stat-change positive">Buen ritmo</div>
        </div>
        <div class="stat-card info">
          <div class="stat-icon">👤</div>
          <div class="stat-value">18</div>
          <div class="stat-label">Clientes atendidos</div>
          <div class="stat-change">Hoy</div>
        </div>
        <div class="stat-card warning">
          <div class="stat-icon">⚠️</div>
          <div class="stat-value">3</div>
          <div class="stat-label">Stock crítico</div>
          <div class="stat-change negative">Revisar</div>
        </div>
      </div>
      
      <div class="grid-3" style="margin-top: 24px;">
        <div class="quick-action-card" onclick="showSection('pos')">
          <div class="quick-action-icon">
            <i class="fas fa-cash-register"></i>
          </div>
          <div class="quick-action-title">Abrir POS</div>
          <div class="quick-action-desc">Punto de venta rápido</div>
        </div>
        
        <div class="quick-action-card" onclick="showSection('stock-rapido')">
          <div class="quick-action-icon">
            <i class="fas fa-cubes"></i>
          </div>
          <div class="quick-action-title">Consultar Stock</div>
          <div class="quick-action-desc">Ver disponibilidad</div>
        </div>
        
        <div class="quick-action-card" onclick="showSection('mis-ventas')">
          <div class="quick-action-icon">
            <i class="fas fa-receipt"></i>
          </div>
          <div class="quick-action-title">Mis Ventas</div>
          <div class="quick-action-desc">Historial del día</div>
        </div>
      </div>

      <div class="card" style="margin-top: 24px;">
        <div class="card-header">
          <h3 class="card-title">Últimas Ventas</h3>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${ventas.map(v => `
                <tr>
                  <td>${v.fecha}</td>
                  <td>${v.cliente}</td>
                  <td class="mono">$${v.total.toFixed(2)}</td>
                  <td><span class="badge badge-success">${v.estado}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderPOS() {
    // Reset cart when entering POS
    posCart = [];
    posCustomer = 'Consumidor Final';

    return `
      <div class="pos-grid">
        <!-- Left side - Products -->
        <div class="pos-products-section">
          <div class="pos-categories">
            ${categorias.map(c => `
              <div class="pos-category ${c === 'Todos' ? 'active' : ''}" onclick="filterPOSCategory('${c}')">${c}</div>
            `).join('')}
          </div>
          
          <div class="pos-products-grid" id="pos-products">
            ${productos.map(p => `
              <div class="pos-product-card" onclick="addToCart('${p.id}')">
                <div class="pos-product-icon">📦</div>
                <div class="pos-product-name">${p.nombre}</div>
                <div class="pos-product-price">$${p.precio.toFixed(2)}</div>
                <div class="pos-product-stock">Stock: ${p.stock}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right side - Cart -->
        <div class="pos-cart-section">
          <div class="pos-cart-header">
            <span class="pos-cart-title">
              <i class="fas fa-shopping-cart"></i> Carrito <span class="pos-cart-count" id="cart-count">(0)</span>
            </span>
            <span class="pos-cart-customer" onclick="openModal('pos-customer')">
              <i class="fas fa-user"></i> <span id="customer-name">${posCustomer}</span>
            </span>
          </div>
          
          <div class="pos-cart-items" id="cart-items">
            <div class="pos-cart-empty">
              <i class="fas fa-shopping-basket" style="font-size: 48px; margin-bottom: 16px; opacity: 0.3;"></i>
              <p>Selecciona productos del catálogo</p>
            </div>
          </div>
          
          <div class="pos-totals">
            <div class="pos-total-row">
              <span>Subtotal</span>
              <span class="pos-total-value" id="cart-subtotal">$0.00</span>
            </div>
            <div class="pos-total-row">
              <span>IVA 15%</span>
              <span class="pos-total-value" id="cart-iva">$0.00</span>
            </div>
            <div class="pos-total-row grand-total">
              <span>TOTAL</span>
              <span class="pos-total-value" id="cart-total">$0.00</span>
            </div>
          </div>
          
          <div class="pos-actions">
            <button class="pos-action-btn pos-action-cash" onclick="processPayment('cash')">
              <i class="fas fa-money-bill-wave"></i> Efectivo
            </button>
            <button class="pos-action-btn pos-action-card" onclick="processPayment('card')">
              <i class="far fa-credit-card"></i> Tarjeta
            </button>
            <button class="pos-action-btn pos-action-transfer" onclick="processPayment('transfer')">
              <i class="fas fa-university"></i> Transferencia
            </button>
            <div class="pos-clear" onclick="clearCart()">
              <i class="fas fa-trash-alt"></i> Limpiar carrito
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function filterPOSCategory(category) {
    document.querySelectorAll('.pos-category').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
    
    const filtered = category === 'Todos' 
      ? productos 
      : productos.filter(p => p.categoria === category);
    
    const container = document.getElementById('pos-products');
    container.innerHTML = filtered.map(p => `
      <div class="pos-product-card" onclick="addToCart('${p.id}')">
        <div class="pos-product-icon">📦</div>
        <div class="pos-product-name">${p.nombre}</div>
        <div class="pos-product-price">$${p.precio.toFixed(2)}</div>
        <div class="pos-product-stock">Stock: ${p.stock}</div>
      </div>
    `).join('');
  }

  function addToCart(productId) {
    const product = productos.find(p => p.id === productId);
    if (!product) return;
    
    const existing = posCart.find(i => i.id === productId);
    if (existing) {
      existing.cantidad++;
    } else {
      posCart.push({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: 1
      });
    }
    
    renderPOSCart();
  }

  function renderPOSCart() {
    const container = document.getElementById('cart-items');
    const countEl = document.getElementById('cart-count');
    const subtotalEl = document.getElementById('cart-subtotal');
    const ivaEl = document.getElementById('cart-iva');
    const totalEl = document.getElementById('cart-total');
    
    if (!container) return;
    
    countEl.textContent = `(${posCart.reduce((sum, i) => sum + i.cantidad, 0)})`;
    
    if (posCart.length === 0) {
      container.innerHTML = `
        <div class="pos-cart-empty">
          <i class="fas fa-shopping-basket"></i>
          <p>Selecciona productos del catálogo</p>
        </div>
      `;
      subtotalEl.textContent = '$0.00';
      ivaEl.textContent = '$0.00';
      totalEl.textContent = '$0.00';
      return;
    }
    
    let html = '';
    let subtotal = 0;
    
    posCart.forEach(item => {
      const itemTotal = item.precio * item.cantidad;
      subtotal += itemTotal;
      
      html += `
        <div class="pos-cart-item">
          <div class="pos-item-info">
            <div class="pos-item-name">${item.nombre}</div>
            <div class="pos-item-price">$${item.precio.toFixed(2)} c/u</div>
          </div>
          <div class="pos-item-qty">
            <div class="pos-qty-btn" onclick="updateCartQty('${item.id}', -1)">−</div>
            <div class="pos-qty-value">${item.cantidad}</div>
            <div class="pos-qty-btn" onclick="updateCartQty('${item.id}', 1)">+</div>
          </div>
          <div class="pos-item-total">$${itemTotal.toFixed(2)}</div>
          <div class="pos-item-remove" onclick="removeFromCart('${item.id}')">
            <i class="fas fa-times"></i>
          </div>
        </div>
      `;
    });
    
    container.innerHTML = html;
    
    const iva = subtotal * 0.15;
    const total = subtotal + iva;
    
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    ivaEl.textContent = `$${iva.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
  }

  function updateCartQty(productId, delta) {
    const item = posCart.find(i => i.id === productId);
    if (!item) return;
    
    item.cantidad = Math.max(1, item.cantidad + delta);
    renderPOSCart();
  }

  function removeFromCart(productId) {
    posCart = posCart.filter(i => i.id !== productId);
    renderPOSCart();
  }

  function clearCart() {
    if (posCart.length > 0 && confirm('¿Limpiar el carrito?')) {
      posCart = [];
      renderPOSCart();
    }
  }

  function processPayment(method) {
    if (posCart.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    
    const total = posCart.reduce((sum, i) => sum + i.precio * i.cantidad, 0) * 1.15;
    const methods = { cash: 'Efectivo', card: 'Tarjeta', transfer: 'Transferencia' };
    
    alert(`✅ Venta procesada\n\nTotal: $${total.toFixed(2)}\nMétodo: ${methods[method]}`);
    
    posCart = [];
    renderPOSCart();
  }

  function renderVentas() {
    return `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <div class="empty-title">Registrar Venta</div>
        <div class="empty-description">Módulo de ventas en construcción</div>
        <button class="btn btn-primary" onclick="showSection('pos')">
          <i class="fas fa-cash-register"></i> Ir a POS
        </button>
      </div>
    `;
  }

  function renderClientes() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Clientes</h1>
          <p class="page-subtitle">Búsqueda rápida de clientes</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-cliente')">
            <i class="fas fa-plus"></i> Nuevo Cliente
          </button>
        </div>
      </div>
      
      <div class="card">
        <div class="card-body">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Buscar por nombre, cédula o RUC...">
          </div>
          <div style="margin-top: 20px; color: var(--gray-2); text-align: center;">
            Ingresa un término de búsqueda
          </div>
        </div>
      </div>
    `;
  }

  function renderStockRapido() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Consultar Stock</h1>
          <p class="page-subtitle">Ver disponibilidad de productos</p>
        </div>
      </div>
      
      <div class="card">
        <div class="card-body">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Buscar producto por nombre o código...">
          </div>
          
          <div style="margin-top: 24px;">
            <div class="grid-2">
              <div class="stat-card" style="padding: 16px;">
                <div class="flex justify-between">
                  <span class="fw-600">Laptop HP 15"</span>
                  <span class="mono fw-600" style="color: var(--success);">15 und</span>
                </div>
                <div class="text-xs text-gray-2">Código: LPT-001</div>
              </div>
              <div class="stat-card" style="padding: 16px;">
                <div class="flex justify-between">
                  <span class="fw-600">Mouse Logitech</span>
                  <span class="mono fw-600" style="color: var(--success);">142 und</span>
                </div>
                <div class="text-xs text-gray-2">Código: MOU-001</div>
              </div>
              <div class="stat-card" style="padding: 16px;">
                <div class="flex justify-between">
                  <span class="fw-600">Teclado Mecánico</span>
                  <span class="mono fw-600" style="color: var(--success);">34 und</span>
                </div>
                <div class="text-xs text-gray-2">Código: TCL-001</div>
              </div>
              <div class="stat-card" style="padding: 16px;">
                <div class="flex justify-between">
                  <span class="fw-600">Monitor 24"</span>
                  <span class="mono fw-600" style="color: var(--warning);">8 und</span>
                </div>
                <div class="text-xs text-gray-2">Código: MON-001 · Stock bajo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderMisVentas() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Mis Ventas</h1>
          <p class="page-subtitle">Historial de ventas del día</p>
        </div>
      </div>
      
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Hora</th>
                <th>Cliente</th>
                <th>Productos</th>
                <th>Total</th>
                <th>Método</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>10:30</td>
                <td>Juan Pérez</td>
                <td>Laptop HP</td>
                <td class="mono">$1,240.00</td>
                <td>Efectivo</td>
              </tr>
              <tr>
                <td>11:15</td>
                <td>Ana Gómez</td>
                <td>Teclado Mecánico</td>
                <td class="mono">$89.99</td>
                <td>Tarjeta</td>
              </tr>
              <tr>
                <td>12:00</td>
                <td>Carlos Ruiz</td>
                <td>Mouse + Monitor</td>
                <td class="mono">$269.98</td>
                <td>Transferencia</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderCierreCaja() {
    return `
      <div class="empty-state">
        <div class="empty-icon">🔒</div>
        <div class="empty-title">Cierre de Caja</div>
        <div class="empty-description">Módulo de cierre de caja en construcción</div>
        <button class="btn btn-primary" onclick="showSection('dashboard')">
          <i class="fas fa-arrow-left"></i> Volver
        </button>
      </div>
    `;
  }

  function renderPerfil() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Mi Perfil</h1>
          <p class="page-subtitle">Información personal</p>
        </div>
      </div>
      
      <div class="grid-21">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Datos Personales</h3>
          </div>
          <div class="card-body">
            <div class="flex items-center gap-4" style="margin-bottom: 24px;">
              <div class="user-avatar" style="width: 64px; height: 64px; font-size: 24px;">CC</div>
              <div>
                <h3 style="font-size: 18px; font-weight: 600;">Carlos Cajero</h3>
                <p style="color: var(--gray-2);">operativo1@techcorp.ec</p>
                <span class="badge badge-primary">Cajero</span>
              </div>
            </div>
            
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Nombres</label>
                <input type="text" class="form-control" value="Carlos">
              </div>
              <div class="form-group">
                <label class="form-label">Apellidos</label>
                <input type="text" class="form-control" value="Cajero">
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" value="operativo1@techcorp.ec">
              </div>
              <div class="form-group">
                <label class="form-label">Teléfono</label>
                <input type="text" class="form-control" placeholder="0999999999">
              </div>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Cambiar Contraseña</h3>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">Contraseña actual</label>
              <input type="password" class="form-control" placeholder="••••••••">
            </div>
            <div class="form-group">
              <label class="form-label">Nueva contraseña</label>
              <input type="password" class="form-control" placeholder="••••••••">
            </div>
            <div class="form-group">
              <label class="form-label">Confirmar</label>
              <input type="password" class="form-control" placeholder="••••••••">
            </div>
            <button class="btn btn-primary">Actualizar</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderPlaceholder(section) {
    const titles = {
      'caja-diaria': 'Caja Diaria',
      'inventario-rapido': 'Inventario Rápido',
      'reportes-diarios': 'Reportes del Día'
    };
    
    return `
      <div class="empty-state">
        <div class="empty-icon">🔧</div>
        <div class="empty-title">${titles[section] || section}</div>
        <div class="empty-description">Módulo en construcción</div>
        <button class="btn btn-primary" onclick="showSection('dashboard')">
          <i class="fas fa-arrow-left"></i> Volver
        </button>
      </div>
    `;
  }

  function openModal(type) {
    const modal = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    const footer = document.getElementById('modal-footer');

    if (type === 'pos-customer') {
      title.innerHTML = '<i class="fas fa-user"></i> Seleccionar cliente';
      body.innerHTML = `
        <div class="form-group">
          <label class="form-label">Tipo de identificación</label>
          <select class="form-control">
            <option>Consumidor Final</option>
            <option>RUC</option>
            <option>Cédula</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Número</label>
          <input type="text" class="form-control" placeholder="0000000000">
        </div>
        <div class="form-group">
          <label class="form-label">Nombre / Razón Social</label>
          <input type="text" class="form-control" id="modal-customer-name" placeholder="Nombre del cliente">
        </div>
      `;
      footer.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="setPOSCustomer(); closeModal();">Confirmar</button>
      `;
    } else {
      title.innerHTML = 'Nuevo registro';
      body.innerHTML = '<p>Formulario en construcción</p>';
      footer.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="closeModal()">Guardar</button>
      `;
    }

    modal.classList.add('open');
  }

  function setPOSCustomer() {
    const nameInput = document.getElementById('modal-customer-name');
    if (nameInput && nameInput.value) {
      posCustomer = nameInput.value;
      document.getElementById('customer-name').textContent = posCustomer;
    }
  }

  function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
  }

  // Exponer funciones globalmente
  window.showSection = showSection;
  window.toggleSidebar = toggleSidebar;
  window.toggleNotifications = toggleNotifications;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.filterPOSCategory = filterPOSCategory;
  window.addToCart = addToCart;
  window.updateCartQty = updateCartQty;
  window.removeFromCart = removeFromCart;
  window.clearCart = clearCart;
  window.processPayment = processPayment;
  window.setPOSCustomer = setPOSCustomer;
})();