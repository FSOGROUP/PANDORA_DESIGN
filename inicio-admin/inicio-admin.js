(function() {
  'use strict';

  // Datos de ejemplo
  const clientes = [
    { id: 'per1', identificacion: '1791000001001', nombre: 'Corporación ABC S.A.', email: 'compras@abc.com', credito: 50000 },
    { id: 'per2', identificacion: '1712345678', nombre: 'Juan Carlos Pérez', email: 'jperez@gmail.com', credito: 0 }
  ];

  const productos = [
    { codigo: 'LPT-001', nombre: 'Laptop HP 15"', tipo: 'BIEN', precio: 1190.00, stock: 15 },
    { codigo: 'MOU-001', nombre: 'Mouse Logitech', tipo: 'BIEN', precio: 19.99, stock: 142 }
  ];

  const empleados = [
    { id: 'emp1', nombre: 'Ana García', cargo: 'Contadora General', salario: 1800 },
    { id: 'emp2', nombre: 'Luis Morales', cargo: 'Ejecutivo Ventas', salario: 900 }
  ];

  const facturas = [
    { numero: '001-001-000842', cliente: 'Corporación ABC S.A.', fecha: '2026-02-24', total: 1240.00, estado: 'AUTORIZADO' },
    { numero: '001-001-000843', cliente: 'Juan Carlos Pérez', fecha: '2026-02-24', total: 890.50, estado: 'AUTORIZADO' }
  ];

  const notificaciones = [
    { icon: '⚠️', text: 'Stock crítico: Laptop HP (5 unidades)', time: 'Hace 1h' },
    { icon: '✅', text: 'Factura #000842 autorizada', time: 'Hace 3h' },
    { icon: '💰', text: 'Pago recibido: $1,240.00', time: 'Hace 1d' }
  ];

  // Estado
  let currentSection = 'dashboard';
  let sidebarCollapsed = false;

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
      'dashboard': 'Dashboard',
      'facturacion': 'Facturación',
      'clientes': 'Clientes',
      'productos': 'Productos',
      'cotizaciones': 'Cotizaciones',
      'notas-credito': 'Notas de Crédito',
      'balance': 'Balance General',
      'asientos': 'Asientos Contables',
      'plan-cuentas': 'Plan de Cuentas',
      'reportes': 'Reportes',
      'empleados': 'Empleados',
      'nominas': 'Nóminas',
      'prestamos': 'Préstamos',
      'bancos': 'Bancos',
      'cxc': 'Cuentas por Cobrar',
      'cxp': 'Cuentas por Pagar',
      'conciliacion': 'Conciliación',
      'stock': 'Stock',
      'kardex': 'Kardex',
      'activos-fijos': 'Activos Fijos',
      'sri-config': 'Configuración SRI',
      'establecimientos': 'Establecimientos',
      'usuarios': 'Usuarios',
      'mi-perfil': 'Mi Perfil'
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
      case 'facturacion':
        return renderFacturacion();
      case 'clientes':
        return renderClientes();
      case 'productos':
        return renderProductos();
      case 'empleados':
        return renderEmpleados();
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
          <h1 class="page-title">TechCorp S.A.</h1>
          <p class="page-subtitle">RUC: 1791234567001 · PRODUCTOS</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="showSection('facturacion')">
            <i class="fas fa-plus"></i> Nueva Factura
          </button>
          <button class="btn btn-secondary btn-sm" onclick="openModal('pos')">
            <i class="fas fa-cash-register"></i> POS Rápido
          </button>
        </div>
      </div>
      
      <div class="grid-4">
        <div class="stat-card success">
          <div class="stat-icon">💰</div>
          <div class="stat-value">$48,230</div>
          <div class="stat-label">Ventas del mes</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +8%</div>
        </div>
        <div class="stat-card primary">
          <div class="stat-icon">📥</div>
          <div class="stat-value">$12,800</div>
          <div class="stat-label">Por Cobrar</div>
          <div class="stat-change">5 clientes</div>
        </div>
        <div class="stat-card info">
          <div class="stat-icon">👥</div>
          <div class="stat-value">48</div>
          <div class="stat-label">Empleados</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +2</div>
        </div>
        <div class="stat-card warning">
          <div class="stat-icon">📦</div>
          <div class="stat-value">1,284</div>
          <div class="stat-label">Productos</div>
          <div class="stat-change negative"><i class="fas fa-arrow-down"></i> 12 bajos</div>
        </div>
      </div>
      
      <div class="grid-21" style="margin-top: 24px;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Ventas Últimos 6 Meses</h3>
          </div>
          <div class="card-body">
            <div class="chart-container">
              <div class="chart-bar" style="height: 70%; background: rgba(245, 166, 35, 0.3);">
                <div class="chart-value">32K</div>
              </div>
              <div class="chart-bar" style="height: 65%; background: rgba(245, 166, 35, 0.3);">
                <div class="chart-value">28K</div>
              </div>
              <div class="chart-bar" style="height: 85%; background: rgba(245, 166, 35, 0.3);">
                <div class="chart-value">41K</div>
              </div>
              <div class="chart-bar" style="height: 80%; background: rgba(245, 166, 35, 0.3);">
                <div class="chart-value">38K</div>
              </div>
              <div class="chart-bar" style="height: 90%; background: rgba(245, 166, 35, 0.3);">
                <div class="chart-value">44K</div>
              </div>
              <div class="chart-bar" style="height: 100%; background: var(--primary);">
                <div class="chart-value">48K</div>
              </div>
            </div>
            <div class="chart-labels">
              <div class="chart-label">Sep</div>
              <div class="chart-label">Oct</div>
              <div class="chart-label">Nov</div>
              <div class="chart-label">Dic</div>
              <div class="chart-label">Ene</div>
              <div class="chart-label">Feb</div>
            </div>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Últimas Facturas</h3>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Cliente</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${facturas.map(f => `
                  <tr>
                    <td class="mono">${f.numero}</td>
                    <td>${f.cliente}</td>
                    <td class="mono">$${f.total.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function renderFacturacion() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Facturación Electrónica</h1>
          <p class="page-subtitle">TechCorp S.A.</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-factura')">
            <i class="fas fa-plus"></i> Nueva Factura
          </button>
        </div>
      </div>
      
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${facturas.map(f => `
                <tr>
                  <td class="mono">${f.numero}</td>
                  <td>${f.cliente}</td>
                  <td>${f.fecha}</td>
                  <td class="mono">$${f.total.toFixed(2)}</td>
                  <td><span class="badge badge-success">${f.estado}</span></td>
                  <td><button class="btn btn-secondary btn-sm" onclick="openModal('ver-factura')"><i class="fas fa-eye"></i></button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderClientes() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Clientes</h1>
          <p class="page-subtitle">${clientes.length} clientes registrados</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-cliente')">
            <i class="fas fa-plus"></i> Nuevo Cliente
          </button>
        </div>
      </div>
      
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Identificación</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Límite Crédito</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${clientes.map(c => `
                <tr>
                  <td class="mono">${c.identificacion}</td>
                  <td class="fw-600">${c.nombre}</td>
                  <td>${c.email}</td>
                  <td class="mono">$${c.credito.toFixed(2)}</td>
                  <td><button class="btn btn-secondary btn-sm"><i class="fas fa-edit"></i></button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderProductos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Productos y Servicios</h1>
          <p class="page-subtitle">${productos.length} items en catálogo</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-producto')">
            <i class="fas fa-plus"></i> Nuevo Producto
          </button>
        </div>
      </div>
      
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Precio</th>
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${productos.map(p => `
                <tr>
                  <td class="mono">${p.codigo}</td>
                  <td class="fw-600">${p.nombre}</td>
                  <td><span class="tag tag-primary">${p.tipo}</span></td>
                  <td class="mono">$${p.precio.toFixed(2)}</td>
                  <td class="mono">${p.stock}</td>
                  <td><button class="btn btn-secondary btn-sm"><i class="fas fa-edit"></i></button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderEmpleados() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Empleados</h1>
          <p class="page-subtitle">${empleados.length} empleados activos</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-empleado')">
            <i class="fas fa-plus"></i> Nuevo Empleado
          </button>
        </div>
      </div>
      
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cargo</th>
                <th>Salario Base</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${empleados.map(e => `
                <tr>
                  <td class="fw-600">${e.nombre}</td>
                  <td>${e.cargo}</td>
                  <td class="mono">$${e.salario.toFixed(2)}</td>
                  <td><span class="badge badge-success">ACTIVO</span></td>
                  <td><button class="btn btn-secondary btn-sm"><i class="fas fa-edit"></i></button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderPerfil() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Mi Perfil</h1>
          <p class="page-subtitle">Información personal y configuración de cuenta</p>
        </div>
      </div>
      
      <div class="grid-21">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Datos Personales</h3>
          </div>
          <div class="card-body">
            <div class="flex items-center gap-4" style="margin-bottom: 24px;">
              <div class="user-avatar" style="width: 64px; height: 64px; font-size: 24px;">CG</div>
              <div>
                <h3 style="font-size: 18px; font-weight: 600;">Carlos Gómez</h3>
                <p style="color: var(--gray-2);">admin@techcorp.ec</p>
                <span class="badge badge-primary">Administrador</span>
              </div>
            </div>
            
            <div class="form-grid">
              <div class="form-group">
                <label class="form-label">Nombres</label>
                <input type="text" class="form-control" value="Carlos">
              </div>
              <div class="form-group">
                <label class="form-label">Apellidos</label>
                <input type="text" class="form-control" value="Gómez">
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" value="admin@techcorp.ec">
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
            <h3 class="card-title">Seguridad</h3>
          </div>
          <div class="card-body">
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label">Contraseña actual</label>
              <input type="password" class="form-control" placeholder="••••••••">
            </div>
            <div class="form-group" style="margin-bottom: 16px;">
              <label class="form-label">Nueva contraseña</label>
              <input type="password" class="form-control" placeholder="••••••••">
            </div>
            <div class="form-group" style="margin-bottom: 24px;">
              <label class="form-label">Confirmar contraseña</label>
              <input type="password" class="form-control" placeholder="••••••••">
            </div>
            <button class="btn btn-primary">Cambiar contraseña</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderPlaceholder(section) {
    const titles = {
      'cotizaciones': 'Cotizaciones',
      'notas-credito': 'Notas de Crédito',
      'balance': 'Balance General',
      'asientos': 'Asientos Contables',
      'plan-cuentas': 'Plan de Cuentas',
      'reportes': 'Reportes Financieros',
      'nominas': 'Nóminas',
      'prestamos': 'Préstamos',
      'bancos': 'Bancos',
      'cxc': 'Cuentas por Cobrar',
      'cxp': 'Cuentas por Pagar',
      'conciliacion': 'Conciliación Bancaria',
      'stock': 'Stock',
      'kardex': 'Kardex',
      'activos-fijos': 'Activos Fijos',
      'sri-config': 'Configuración SRI',
      'establecimientos': 'Establecimientos',
      'usuarios': 'Usuarios'
    };
    
    return `
      <div class="empty-state">
        <div class="empty-icon">🔧</div>
        <div class="empty-title">${titles[section] || section}</div>
        <div class="empty-description">Módulo en construcción. Próximamente disponible.</div>
        <button class="btn btn-primary" onclick="showSection('dashboard')">
          <i class="fas fa-arrow-left"></i> Volver al Dashboard
        </button>
      </div>
    `;
  }

  function openModal(type) {
    const modal = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    const footer = document.getElementById('modal-footer');

    if (type === 'pos') {
      title.innerHTML = '<i class="fas fa-cash-register"></i> Punto de Venta Rápido';
      body.innerHTML = `
        <p style="margin-bottom: 16px;">¿Deseas abrir el POS para registrar ventas?</p>
        <div style="display: flex; gap: 12px;">
          <button class="btn btn-primary" style="flex: 1;" onclick="window.location.href='../operativo/inicio-operativo.html?section=pos'">
            <i class="fas fa-cash-register"></i> Abrir POS
          </button>
        </div>
      `;
      footer.innerHTML = '<button class="btn btn-secondary" onclick="closeModal()">Cerrar</button>';
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

  function closeModal() {
    document.getElementById('modal-overlay').classList.remove('open');
  }

  // Exponer funciones globalmente
  window.showSection = showSection;
  window.toggleSidebar = toggleSidebar;
  window.toggleNotifications = toggleNotifications;
  window.openModal = openModal;
  window.closeModal = closeModal;
})();