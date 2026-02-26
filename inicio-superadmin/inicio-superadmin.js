(function() {
  'use strict';

  // Datos de ejemplo
  const empresas = [
    { ruc: '1799999999001', razon_social: 'PANDORA FSO', tipo: 'MIXTO', ambiente: 'Producción' },
    { ruc: '1791234567001', razon_social: 'TechCorp S.A.', tipo: 'PRODUCTOS', ambiente: 'Producción' },
    { ruc: '0990123456001', razon_social: 'Consultoría M&A', tipo: 'SERVICIOS', ambiente: 'Pruebas' }
  ];

  const notificaciones = [
    { icon: '⚠️', text: 'Firma TechCorp expira en 5 días', time: 'Hace 2h' },
    { icon: '✅', text: 'Factura #0000842 autorizada', time: 'Hace 3h' },
    { icon: '📦', text: 'Stock crítico: Laptop HP', time: 'Hace 1d' }
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
    document.getElementById('company-switcher').addEventListener('click', () => openModal('company-switch'));
    document.getElementById('header-company-badge').addEventListener('click', () => openModal('company-switch'));
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
      'dashboard': 'Dashboard Global',
      'empresas': 'Empresas',
      'monitor-sri': 'Monitor SRI',
      'logs': 'Logs del Sistema',
      'usuarios-fso': 'Usuarios FSO',
      'facturacion': 'Facturación',
      'clientes': 'Clientes',
      'productos': 'Productos',
      'cotizaciones': 'Cotizaciones',
      'balance': 'Balance General',
      'asientos': 'Asientos Contables',
      'plan-cuentas': 'Plan de Cuentas',
      'empleados': 'Empleados',
      'nominas': 'Nóminas',
      'bancos': 'Bancos',
      'cxc': 'C x Cobrar',
      'stock': 'Stock',
      'activos-fijos': 'Activos Fijos',
      'mi-perfil': 'Mi Perfil',
      'sri-config': 'Configuración SRI'
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
      case 'empresas':
        return renderEmpresas();
      default:
        return renderPlaceholder(section);
    }
  }

  function renderDashboard() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Dashboard Global</h1>
          <p class="page-subtitle">Panel de control PANDORA · 3 empresas activas</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary btn-sm" onclick="openModal('export')">
            <i class="fas fa-download"></i> Exportar
          </button>
          <button class="btn btn-primary btn-sm" onclick="openModal('new-empresa')">
            <i class="fas fa-plus"></i> Nueva Empresa
          </button>
        </div>
      </div>
      
      <div class="grid-4">
        <div class="stat-card primary">
          <div class="stat-icon">🏢</div>
          <div class="stat-value">3</div>
          <div class="stat-label">Empresas Activas</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +1 este mes</div>
        </div>
        <div class="stat-card success">
          <div class="stat-icon">🧾</div>
          <div class="stat-value">8,432</div>
          <div class="stat-label">Facturas hoy</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +12%</div>
        </div>
        <div class="stat-card info">
          <div class="stat-icon">📡</div>
          <div class="stat-value">99.7%</div>
          <div class="stat-label">SRI Uptime</div>
          <div class="stat-change">Estable</div>
        </div>
        <div class="stat-card warning">
          <div class="stat-icon">👥</div>
          <div class="stat-value">12</div>
          <div class="stat-label">Usuarios</div>
          <div class="stat-change">Totales</div>
        </div>
      </div>
      
      <div class="grid-21" style="margin-top: 24px;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Empresas Registradas</h3>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>RUC</th>
                  <th>Razón Social</th>
                  <th>Tipo</th>
                  <th>Ambiente</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${empresas.map(e => `
                  <tr>
                    <td class="mono">${e.ruc}</td>
                    <td class="fw-600">${e.razon_social}</td>
                    <td><span class="tag tag-primary">${e.tipo}</span></td>
                    <td>${e.ambiente}</td>
                    <td><button class="btn btn-secondary btn-sm" onclick="openModal('empresa-details')">Ver</button></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Resumen Financiero</h3>
          </div>
          <div class="card-body">
            <div style="margin-bottom: 16px;">
              <div class="flex justify-between" style="margin-bottom: 8px;">
                <span class="text-sm text-gray-2">Ingresos MRR</span>
                <span class="mono font-bold">$14,280</span>
              </div>
              <div class="progress">
                <div class="progress-bar" style="width: 75%"></div>
              </div>
            </div>
            <div style="margin-bottom: 16px;">
              <div class="flex justify-between" style="margin-bottom: 8px;">
                <span class="text-sm text-gray-2">Proyección ARR</span>
                <span class="mono font-bold">$171,360</span>
              </div>
              <div class="progress">
                <div class="progress-bar" style="width: 60%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="alert alert-primary" style="margin-top: 24px;">
        <i class="fas fa-crown"></i>
        <span><strong>Super Admin:</strong> Usa el selector de empresa arriba para operar como cualquier empresa del sistema.</span>
      </div>
    `;
  }

  function renderEmpresas() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Gestión de Empresas</h1>
          <p class="page-subtitle">3 empresas registradas</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-empresa')">
            <i class="fas fa-plus"></i> Nueva Empresa
          </button>
        </div>
      </div>
      
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>RUC</th>
                <th>Razón Social</th>
                <th>Tipo</th>
                <th>Ambiente</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${empresas.map(e => `
                <tr>
                  <td class="mono">${e.ruc}</td>
                  <td class="fw-600">${e.razon_social}</td>
                  <td><span class="tag tag-primary">${e.tipo}</span></td>
                  <td>${e.ambiente}</td>
                  <td><span class="badge badge-success">Activo</span></td>
                  <td>
                    <button class="btn btn-secondary btn-sm" onclick="openModal('empresa-details')">
                      <i class="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderPlaceholder(section) {
    const titles = {
      'monitor-sri': 'Monitor SRI',
      'logs': 'Logs del Sistema',
      'usuarios-fso': 'Usuarios FSO',
      'facturacion': 'Facturación',
      'clientes': 'Clientes',
      'productos': 'Productos',
      'cotizaciones': 'Cotizaciones',
      'balance': 'Balance General',
      'asientos': 'Asientos Contables',
      'plan-cuentas': 'Plan de Cuentas',
      'empleados': 'Empleados',
      'nominas': 'Nóminas',
      'bancos': 'Bancos',
      'cxc': 'Cuentas por Cobrar',
      'stock': 'Stock',
      'activos-fijos': 'Activos Fijos',
      'mi-perfil': 'Mi Perfil',
      'sri-config': 'Configuración SRI'
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

    if (type === 'company-switch') {
      title.innerHTML = '<i class="fas fa-building"></i> Cambiar empresa activa';
      body.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${empresas.map(e => `
            <div style="padding: 16px; background: var(--gray-5); border: 1px solid var(--gray-4); border-radius: 12px; cursor: pointer;" onclick="closeModal(); document.getElementById('active-company').textContent = '${e.razon_social}'; document.getElementById('header-company').textContent = '${e.razon_social}';">
              <div style="font-weight: 700;">${e.razon_social}</div>
              <div style="font-size: 12px; color: var(--gray-2);">${e.ruc} · ${e.tipo}</div>
            </div>
          `).join('')}
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