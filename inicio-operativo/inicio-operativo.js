(function() {
  'use strict';

  // ============================================
  // DATOS DE EJEMPLO - OPERATIVO
  // ============================================
  const CURRENT_USER = {
    nombre: 'Carlos',
    apellido: 'Operativo',
    email: 'carlos.operativo@techcorp.ec',
    rol: 'operativo',
    tipo: 'cajero',
    avatar: 'CO'
  };

  const EMPRESA = {
    nombre: 'TechCorp S.A.',
    ruc: '1791234567001',
    tipo: 'restaurante',
    logo: '../assets/logo-techcorp.png'
  };

  // Formas de pago disponibles
  const formasPago = [
    { id: 'efectivo', nombre: 'Efectivo', icono: 'fa-money-bill-wave' },
    { id: 'tarjeta', nombre: 'Tarjeta de Crédito/Débito', icono: 'fa-credit-card' },
    { id: 'transferencia', nombre: 'Transferencia Bancaria', icono: 'fa-university' },
  ];

  // Productos
  const productosRestaurante = [
    { 
      id: 'r1', 
      codigo: 'PLATO001', 
      nombre: 'Hamburguesa Clásica', 
      precio: 8.50, 
      iva: 15, 
      categoria: 'Platos', 
      imagen: '🍔',
      gruposToppings: [
        {
          nombre: 'Extras',
          tipo: 'checkbox',
          max: 3,
          opciones: [
            { nombre: 'Queso', precio: 1.00 },
            { nombre: 'Tocineta', precio: 1.50 },
            { nombre: 'Huevo', precio: 0.80 }
          ]
        },
        {
          nombre: 'Salsas',
          tipo: 'radio',
          obligatorio: true,
          opciones: [
            { nombre: 'Ketchup', precio: 0.30 },
            { nombre: 'Mayonesa', precio: 0.30 },
            { nombre: 'Mostaza', precio: 0.30 }
          ]
        }
      ]
    },
    { 
      id: 'r3', 
      codigo: 'POSTRE001', 
      nombre: 'Helado Artesanal', 
      precio: 5.00, 
      iva: 15, 
      categoria: 'Postres', 
      imagen: '🍦',
      gruposToppings: [
        {
          nombre: 'Toppings',
          tipo: 'checkbox',
          max: 3,
          opciones: [
            { nombre: 'Chocolate', precio: 0.50 },
            { nombre: 'Chispas', precio: 0.30 },
            { nombre: 'Fresas', precio: 0.80 }
          ]
        },
        {
          nombre: 'Salsas',
          tipo: 'radio',
          obligatorio: true,
          opciones: [
            { nombre: 'Fresa', precio: 0.60 },
            { nombre: 'Caramelo', precio: 0.60 }
          ]
        }
      ]
    }
  ];

  const catalogoProductos = productosRestaurante;

  const clientes = [
    { id: 'c1', identificacion: '1712345678001', nombre: 'Distribuidora XYZ', email: 'ventas@distrixyz.com', telefono: '023456789' },
    { id: 'c2', identificacion: '1712345678', nombre: 'Carlos Rodríguez', email: 'carlos.r@email.com', telefono: '0998765432' }
  ];

  // Ventas
  const misVentas = [
    { id: 'v1', numero: '001-001-000045', fecha: '2026-03-04', cliente: 'Distribuidora XYZ', total: 1250.00, estado: 'COMPLETADA', items: 3, forma_pago: 'EFECTIVO' },
    { id: 'v2', numero: '001-001-000046', fecha: '2026-03-04', cliente: 'Carlos Rodríguez', total: 95.00, estado: 'COMPLETADA', items: 2, forma_pago: 'TARJETA' },
    { id: 'v3', numero: '001-001-000047', fecha: '2026-03-03', cliente: 'Distribuidora XYZ', total: 3584.00, estado: 'COMPLETADA', items: 5, forma_pago: 'TRANSFERENCIA' },
    { id: 'v4', numero: '001-001-000048', fecha: '2026-03-03', cliente: 'Carlos Rodríguez', total: 450.00, estado: 'PENDIENTE', items: 1, forma_pago: 'CREDITO' },
    { id: 'v5', numero: '001-001-000049', fecha: '2026-03-02', cliente: 'Distribuidora XYZ', total: 125.50, estado: 'COMPLETADA', items: 3, forma_pago: 'EFECTIVO' }
  ];

  const notificaciones = [
    { id: 'n1', icon: 'fa-circle-info', type: 'info', text: 'Stock bajo: Helado (quedan 5 unidades)', time: 'Hace 2h', leida: false },
    { id: 'n2', icon: 'fa-circle-check', type: 'success', text: 'Venta #000048 registrada por $450', time: 'Hace 3h', leida: false },
    { id: 'n3', icon: 'fa-triangle-exclamation', type: 'warning', text: 'Caja abierta desde las 08:00', time: 'Hace 1d', leida: true }
  ];

  // Estado
  let currentSection = 'dashboard';
  let sidebarCollapsed = false;
  let carrito = [];
  let clienteSeleccionado = null;
  let formaPagoSeleccionada = 'efectivo';
  let productoActual = null;
  let seleccionesToppings = {};
  let filtroProductos = '';
  let categoriaSeleccionada = 'todos';

  // ============================================
  // INICIALIZACIÓN
  // ============================================
  document.addEventListener('DOMContentLoaded', function() {
    updateCurrentDate();
    initializeAccordions();
    setupEventListeners();
    showSection('dashboard');
  });

  function updateCurrentDate() {
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
      const today = new Date();
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      dateEl.innerHTML = `<i class="far fa-calendar-alt"></i> ${today.toLocaleDateString('es-EC', options)}`;
    }
  }

  function initializeAccordions() {
    const sections = ['mi-trabajo', 'inventario', 'rrhh'];
    sections.forEach(section => {
      const content = document.getElementById(`section-${section}`);
      const arrow = document.getElementById(`arrow-${section}`);
      if (content && arrow) {
        if (section === 'mi-trabajo') {
          content.style.display = 'block';
          arrow.classList.remove('fa-chevron-down');
          arrow.classList.add('fa-chevron-up');
        } else {
          content.style.display = 'none';
          arrow.classList.remove('fa-chevron-up');
          arrow.classList.add('fa-chevron-down');
        }
      }
    });
  }

  function setupEventListeners() {
    const collapseBtn = document.getElementById('sidebar-collapse');
    if (collapseBtn) collapseBtn.addEventListener('click', toggleSidebar);

    const notificationsBtn = document.querySelector('.notifications-badge');
    if (notificationsBtn) notificationsBtn.addEventListener('click', () => openModal('notifications'));

    document.addEventListener('keydown', function(e) {
      if (e.key === 'F2' && currentSection === 'punto-venta') {
        e.preventDefault();
        document.getElementById('buscar-producto-pos')?.focus();
      }
      if (e.key === 'F8' && currentSection === 'punto-venta') {
        e.preventDefault();
        procesarVenta();
      }
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
    });

    document.addEventListener('click', function(e) {
      const dropdown = document.getElementById('user-dropdown');
      const avatar = document.querySelector('.user-avatar');
      const userInfo = document.querySelector('.user-info');
      if (dropdown && avatar && userInfo) {
        if (!avatar.contains(e.target) && !userInfo.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.remove('open');
        }
      }
    });
  }

  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
    const sidebar = document.getElementById('sidebar');
    const icon = document.getElementById('collapse-icon');
    sidebar.classList.toggle('collapsed', sidebarCollapsed);
    if (icon) icon.className = sidebarCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left';
  }

  function toggleUserMenu() {
    document.getElementById('user-dropdown')?.classList.toggle('open');
  }

  function toggleSection(sectionId) {
    const section = document.getElementById(`section-${sectionId}`);
    const arrow = document.getElementById(`arrow-${sectionId}`);
    if (!section || !arrow) return;
    
    const allSections = document.querySelectorAll('.nav-subsection');
    const allArrows = document.querySelectorAll('.section-arrow');
    
    allSections.forEach(s => {
      if (s.id !== `section-${sectionId}`) {
        s.style.display = 'none';
      }
    });
    
    allArrows.forEach(a => {
      if (a.id !== `arrow-${sectionId}`) {
        a.classList.remove('fa-chevron-up');
        a.classList.add('fa-chevron-down');
      }
    });
    
    if (section.style.display === 'none' || !section.style.display) {
      section.style.display = 'block';
      arrow.classList.remove('fa-chevron-down');
      arrow.classList.add('fa-chevron-up');
    } else {
      section.style.display = 'none';
      arrow.classList.remove('fa-chevron-up');
      arrow.classList.add('fa-chevron-down');
    }
  }

  function showSection(section) {
    currentSection = section;
    
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const activeEl = Array.from(document.querySelectorAll('.nav-item')).find(el => 
      el.getAttribute('onclick')?.includes(section)
    );
    if (activeEl) activeEl.classList.add('active');

    const titles = {
      'dashboard': 'Mi Dashboard',
      'punto-venta': 'Punto de Venta',
      'mis-ventas': 'Mis Ventas',
      'cobros': 'Cobros',
      'cierre-caja': 'Cierre de Caja',
      'consulta-stock': 'Consulta de Stock',
      'entradas-salidas': 'Entradas y Salidas',
      'inventario-rapido': 'Inventario Rápido',
      'empleados': 'Empleados',
      'asistencias': 'Asistencias',
      'nominas': 'Nóminas',
      'mi-perfil': 'Mi Perfil',
      'preferencias': 'Preferencias'
    };
    
    const breadcrumb = document.getElementById('current-section');
    if (breadcrumb) breadcrumb.textContent = titles[section] || section;

    const container = document.getElementById('main-container');
    if (container) {
      container.innerHTML = renderSection(section);
      
      if (section === 'dashboard') {
        setTimeout(() => {
          if (typeof Chart !== 'undefined') {
            initDashboardCharts();
          }
        }, 100);
      }
    }
  }

  function renderSection(section) {
    switch(section) {
      case 'dashboard': return renderDashboard();
      case 'punto-venta': return renderPuntoVenta();
      case 'mis-ventas': return renderMisVentas();
      case 'cobros': return renderCobros();
      case 'cierre-caja': return renderCierreCaja();
      case 'consulta-stock': return renderConsultaStock();
      case 'entradas-salidas': return renderEntradasSalidas();
      case 'inventario-rapido': return renderInventarioRapido();
      case 'empleados': return renderEmpleados();
      case 'asistencias': return renderAsistencias();
      case 'nominas': return renderNominas();
      case 'mi-perfil': return renderMiPerfil();
      case 'preferencias': return renderPreferencias();
      default: return renderDashboard();
    }
  }

  // ============================================
  // RENDERIZADO - DASHBOARD MEJORADO
  // ============================================
  function renderDashboard() {
    const ventasHoy = misVentas.filter(v => v.fecha === '2026-03-04').length;
    const totalHoy = misVentas.filter(v => v.fecha === '2026-03-04').reduce((s, v) => s + v.total, 0);
    const totalSemana = misVentas.reduce((s, v) => s + v.total, 0);
    const ticketPromedio = (totalSemana / misVentas.length).toFixed(2);
    
    return `
      <div class="dashboard-container">
        <!-- Header con acciones -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 4px;">Mi Dashboard</h1>
            <p style="color: var(--gray-2);">Bienvenido, ${CURRENT_USER.nombre} · Resumen del día</p>
          </div>
          <div style="display: flex; gap: 12px;">

            <button class="btn btn-secondary" onclick="exportarPDF('dashboard')">
              <i class="fas fa-file-pdf"></i> PDF
            </button>
            <button class="btn btn-primary" onclick="showSection('punto-venta')">
              <i class="fas fa-cash-register"></i> Nueva Venta
            </button>
          </div>
        </div>

        <!-- KPIs mejorados -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 24px;">
          <div style="background: linear-gradient(135deg, var(--primary), var(--primary-dark)); border-radius: 20px; padding: 24px; color: white;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span style="font-size: 14px; opacity: 0.9;">Ventas hoy</span>
              <span style="background: rgba(255,255,255,0.2); padding: 8px; border-radius: 12px;">
                <i class="fas fa-receipt"></i>
              </span>
            </div>
            <div style="font-size: 32px; font-weight: 700; margin-bottom: 4px;">${ventasHoy}</div>
            <div style="display: flex; justify-content: space-between; font-size: 13px; opacity: 0.9;">
              <span>Meta: 10</span>
              <span>${Math.round((ventasHoy/10)*100)}%</span>
            </div>
            <div style="width: 100%; height: 4px; background: rgba(255,255,255,0.2); border-radius: 4px; margin-top: 8px;">
              <div style="width: ${Math.min((ventasHoy/10)*100, 100)}%; height: 100%; background: white; border-radius: 4px;"></div>
            </div>
          </div>

          <div style="background: white; border-radius: 20px; padding: 24px; border: 1px solid var(--gray-4); box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span style="color: var(--gray-2);">Total hoy</span>
              <span style="background: var(--success); color: white; padding: 8px; border-radius: 12px;">
                <i class="fas fa-dollar-sign"></i>
              </span>
            </div>
            <div style="font-size: 28px; font-weight: 700; color: var(--success);">$${totalHoy.toFixed(2)}</div>
            <div style="margin-top: 8px; color: var(--gray-2); font-size: 13px;">
              <i class="fas fa-arrow-up" style="color: var(--success);"></i> +12% vs ayer
            </div>
          </div>

          <div style="background: white; border-radius: 20px; padding: 24px; border: 1px solid var(--gray-4); box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span style="color: var(--gray-2);">Total semana</span>
              <span style="background: var(--info); color: white; padding: 8px; border-radius: 12px;">
                <i class="fas fa-chart-line"></i>
              </span>
            </div>
            <div style="font-size: 28px; font-weight: 700; color: var(--info);">$${totalSemana.toFixed(2)}</div>
            <div style="margin-top: 8px; color: var(--gray-2); font-size: 13px;">
              <i class="fas fa-arrow-up" style="color: var(--success);"></i> +8% vs semana anterior
            </div>
          </div>

          <div style="background: white; border-radius: 20px; padding: 24px; border: 1px solid var(--gray-4); box-shadow: var(--shadow-sm);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
              <span style="color: var(--gray-2);">Ticket promedio</span>
              <span style="background: var(--warning); color: white; padding: 8px; border-radius: 12px;">
                <i class="fas fa-ticket-alt"></i>
              </span>
            </div>
            <div style="font-size: 28px; font-weight: 700; color: var(--warning);">$${ticketPromedio}</div>
            <div style="margin-top: 8px; color: var(--gray-2); font-size: 13px;">
              <i class="fas fa-minus"></i> Sin cambios
            </div>
          </div>
        </div>

        <!-- Gráficas y estadísticas -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 24px;">
          <div style="background: white; border-radius: 20px; padding: 24px; border: 1px solid var(--gray-4);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <h3 style="font-weight: 600;">Ventas de la Semana</h3>
              <div>
                <select class="form-control" style="width: 120px;" onchange="cambiarPeriodoVentas(this.value)">
                  <option>7 días</option>
                  <option>30 días</option>
                </select>
              </div>
            </div>
            <div style="height: 250px;">
              <canvas id="ventasChart"></canvas>
            </div>
          </div>

          <div style="background: white; border-radius: 20px; padding: 24px; border: 1px solid var(--gray-4);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <h3 style="font-weight: 600;">Ventas por Categoría</h3>
              <button class="btn btn-icon" onclick="exportarGrafico('categorias')">
                <i class="fas fa-download"></i>
              </button>
            </div>
            <div style="height: 200px;">
              <canvas id="categoriasChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Últimas ventas y accesos rápidos -->
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
          <div style="background: white; border-radius: 20px; border: 1px solid var(--gray-4); overflow: hidden;">
            <div style="padding: 20px; border-bottom: 1px solid var(--gray-4); display: flex; justify-content: space-between; align-items: center;">
              <h3 style="font-weight: 600;">Últimas Ventas</h3>
              <div style="display: flex; gap: 8px;">
                <div style="position: relative;">
                  <i class="fas fa-search" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--gray-2);"></i>
                  <input type="text" placeholder="Buscar..." style="padding: 8px 8px 8px 36px; border: 1px solid var(--gray-4); border-radius: 40px; outline: none;">
                </div>
                <button class="btn btn-text" onclick="showSection('mis-ventas')">Ver todas</button>
              </div>
            </div>
            <div style="padding: 20px;">
              ${misVentas.slice(0, 4).map(v => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--gray-4);">
                  <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 40px; height: 40px; background: var(--primary-light); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--primary);">
                      <i class="fas fa-receipt"></i>
                    </div>
                    <div>
                      <div style="font-weight: 600;">${v.cliente}</div>
                      <div style="font-size: 11px; color: var(--gray-2);">${v.numero} · ${v.fecha}</div>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 20px;">
                    <span style="font-weight: 700; color: var(--primary);">$${v.total.toFixed(2)}</span>
                    <span class="badge ${v.estado === 'COMPLETADA' ? 'badge-success' : 'badge-warning'}">${v.estado}</span>
                    <button class="btn btn-icon" onclick="imprimirFactura('${v.numero}')" style="color: var(--gray-2);">
                      <i class="fas fa-print"></i>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="background: white; border-radius: 20px; padding: 20px; border: 1px solid var(--gray-4);">
              <h3 style="font-weight: 600; margin-bottom: 16px;">Accesos Rápidos</h3>
              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                <button class="btn btn-secondary" onclick="showSection('punto-venta')" style="justify-content: start;">
                  <i class="fas fa-cash-register" style="margin-right: 8px;"></i> POS
                </button>
                <button class="btn btn-secondary" onclick="showSection('cobros')" style="justify-content: start;">
                  <i class="fas fa-hand-holding-dollar"></i> Cobros
                </button>
                <button class="btn btn-secondary" onclick="showSection('consulta-stock')" style="justify-content: start;">
                  <i class="fas fa-cubes"></i> Stock
                </button>
                <button class="btn btn-secondary" onclick="showSection('cierre-caja')" style="justify-content: start;">
                  <i class="fas fa-lock"></i> Cierre
                </button>
              </div>
            </div>

            <div style="background: linear-gradient(135deg, var(--primary), var(--primary-dark)); border-radius: 20px; padding: 20px; color: white;">
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <i class="fas fa-clock" style="font-size: 24px;"></i>
                <div>
                  <div style="font-weight: 600;">Hora apertura</div>
                  <div style="font-size: 20px; font-weight: 700;">08:00</div>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span>Caja:</span>
                <span style="font-weight: 600;">$2,045.00</span>
              </div>
            </div>
          </div>
        </div>

        <script>
          function initDashboardCharts() {
            if (typeof Chart === 'undefined') return;
            
            new Chart(document.getElementById('ventasChart'), {
              type: 'line',
              data: {
                labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
                datasets: [{
                  label: 'Ventas ($)',
                  data: [1250, 2150, 1875, 4034, 3584, 2840, 1345],
                  borderColor: '#E8833A',
                  backgroundColor: 'rgba(232, 131, 58, 0.1)',
                  tension: 0.4,
                  fill: true,
                  pointBackgroundColor: '#E8833A',
                  pointBorderColor: 'white',
                  pointRadius: 5
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return '$' + context.parsed.y.toLocaleString();
                      }
                    }
                  }
                }
              }
            });

            new Chart(document.getElementById('categoriasChart'), {
              type: 'doughnut',
              data: {
                labels: ['Platos', 'Postres', 'Bebidas'],
                datasets: [{
                  data: [4500, 3200, 1800],
                  backgroundColor: ['#E8833A', '#27AE60', '#2979FF'],
                  borderWidth: 0
                }]
              },
              options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom' }
                }
              }
            });
          }
        </script>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - PUNTO DE VENTA (con método de pago)
  // ============================================
function renderPuntoVenta() {
    const categorias = [...new Set(catalogoProductos.map(p => p.categoria))];
    const productosFiltrados = catalogoProductos.filter(p => 
      (filtroProductos === '' || p.nombre.toLowerCase().includes(filtroProductos.toLowerCase()) || p.codigo.toLowerCase().includes(filtroProductos.toLowerCase())) &&
      (categoriaSeleccionada === 'todos' || p.categoria === categoriaSeleccionada)
    );

    return `
      <div style="display: grid; grid-template-columns: 2fr 1.2fr; gap: 20px;">
        <!-- Panel izquierdo: Productos -->
        <div style="background: white; border-radius: 18px; border: 1px solid var(--gray-4); overflow: hidden;">
          <div style="padding: 18px; border-bottom: 1px solid var(--gray-4);">
            <div style="display: flex; align-items: center; gap: 14px;">
              <div style="flex: 1; display: flex; align-items: center; background: var(--gray-5); border-radius: 50px; padding: 0 18px; height: 52px; border: 2px solid var(--gray-4);">
                <i class="fas fa-search" style="color: var(--primary); margin-right: 10px; font-size: 15px;"></i>
                <input type="text" id="buscar-producto-pos" placeholder="Buscar producto por nombre o código..." style="border: none; background: transparent; outline: none; width: 100%; font-size: 14px;" value="${filtroProductos}" onkeyup="actualizarFiltroProductos(this.value)">
              </div>
            </div>
            <div style="display: flex; gap: 7px; margin-top: 14px; overflow-x: auto; padding-bottom: 4px;">
              <span class="categoria-chip ${categoriaSeleccionada === 'todos' ? 'active' : ''}" onclick="cambiarCategoria('todos')" style="padding: 7px 15px; background: ${categoriaSeleccionada === 'todos' ? 'var(--primary)' : 'var(--gray-5)'}; color: ${categoriaSeleccionada === 'todos' ? 'white' : 'var(--dark)'}; border-radius: 35px; font-size: 12.5px; cursor: pointer; white-space: nowrap;">Todos</span>
              ${categorias.map(cat => `
                <span class="categoria-chip ${categoriaSeleccionada === cat ? 'active' : ''}" onclick="cambiarCategoria('${cat}')" style="padding: 7px 15px; background: ${categoriaSeleccionada === cat ? 'var(--primary)' : 'var(--gray-5)'}; color: ${categoriaSeleccionada === cat ? 'white' : 'var(--dark)'}; border-radius: 35px; font-size: 12.5px; cursor: pointer; white-space: nowrap;">${cat}</span>
              `).join('')}
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; padding: 18px; max-height: 520px; overflow-y: auto;">
            ${productosFiltrados.map(p => `
              <div class="producto-card" onclick="abrirPersonalizacion('${p.id}')" style="background: white; border: 1px solid var(--gray-4); border-radius: 15px; overflow: hidden; cursor: pointer; transition: all 0.2s;">
                <div style="height: 110px; background: var(--gray-5); display: flex; align-items: center; justify-content: center; position: relative;">
                  <span style="font-size: 44px;">${p.imagen}</span>
                  <span style="position: absolute; top: 7px; right: 7px; background: rgba(0,0,0,0.6); color: white; padding: 2px 7px; border-radius: 18px; font-size: 10.5px;"><i class="fas fa-cube"></i> ${p.stock || 25}</span>
                </div>
                <div style="padding: 14px;">
                  <div style="font-size: 10.5px; color: var(--gray-2);">${p.codigo}</div>
                  <div style="font-weight: 600; font-size: 13.5px; margin: 3px 0;">${p.nombre}</div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 17px; font-weight: 700; color: var(--primary);">$${p.precio.toFixed(2)}</span>
                    <span style="font-size: 10.5px; color: var(--gray-2);">+IVA</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Panel derecho: Carrito -->
        <div style="background: white; border-radius: 18px; border: 1px solid var(--gray-4); display: flex; flex-direction: column; overflow: hidden;">
          <div style="background: var(--primary); padding: 17px; color: white;">
            <h3 style="display: flex; align-items: center; gap: 9px; font-size: 17px; margin: 0;"><i class="fas fa-shopping-cart"></i> Carrito de Venta <span style="background: white; color: var(--primary); padding: 2px 9px; border-radius: 35px; font-size: 11.5px; margin-left: 8px;" id="item-count">${carrito.length}</span></h3>
          </div>

          <div style="padding: 14px; border-bottom: 1px solid var(--gray-4);">
            <label style="font-weight: 600; font-size: 12.5px;">Cliente</label>
            <div style="display: flex; gap: 7px; margin-top: 7px;">
              <select class="form-control" id="cliente-venta" style="flex: 1; padding: 9px; border: 1px solid var(--gray-4); border-radius: 7px; font-size: 13px;" onchange="seleccionarCliente(this.value)">
                <option value="">-- Seleccionar cliente --</option>
                ${clientes.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('')}
              </select>
              <button class="btn btn-icon" onclick="openModal('nuevo-cliente')" style="border: 1px solid var(--gray-4); padding: 0 11px;"><i class="fas fa-user-plus"></i></button>
            </div>
          </div>

          <div id="carrito-items" style="flex: 1; overflow-y: auto; padding: 14px; max-height: 220px;">
            ${carrito.length === 0 ? `
              <div style="text-align: center; padding: 35px 18px; color: var(--gray-3);">
                <i class="fas fa-cart-plus" style="font-size: 44px; margin-bottom: 14px;"></i>
                <p style="margin: 0; font-size: 14px;">Carrito vacío</p>
                <p style="font-size: 11.5px; margin: 5px 0 0;">Selecciona productos para comenzar</p>
              </div>
            ` : carrito.map((item, index) => `
              <div style="display: flex; gap: 10px; padding: 10px; border-bottom: 1px solid var(--gray-4);">
                <div style="width: 38px; height: 38px; background: var(--gray-5); border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 19px;">
                  ${item.imagen}
                </div>
                <div style="flex: 1;">
                  <div style="font-weight: 600; font-size: 12.5px;">${item.nombre}</div>
                  ${item.toppings && item.toppings.length > 0 ? `
                    <div style="font-size: 9.5px; color: var(--primary); margin: 3px 0; line-height: 1.3;">
                      ${item.toppings.map(t => t.nombre).join(' • ')}
                    </div>
                  ` : ''}
                  <div style="display: flex; align-items: center; gap: 10px; margin-top: 6px;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                      <button class="btn btn-icon btn-sm" onclick="cambiarCantidad(${index}, -1)" style="width: 26px; height: 26px; border: 1px solid var(--gray-4); padding: 0;">−</button>
                      <span style="min-width: 27px; text-align: center; font-size: 12.5px;">${item.cantidad}</span>
                      <button class="btn btn-icon btn-sm" onclick="cambiarCantidad(${index}, 1)" style="width: 26px; height: 26px; border: 1px solid var(--gray-4); padding: 0;">+</button>
                    </div>
                    <div style="font-weight: 700; margin-left: auto; font-size: 12.5px;">
                      $${((item.precio + (item.totalToppings || 0)) * item.cantidad).toFixed(2)}
                    </div>
                    <button class="btn btn-icon btn-sm" onclick="eliminarDelCarrito(${index})" style="color: var(--danger); padding: 0; width: 22px;">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Selector de método de pago -->
          <div style="padding: 14px; border-top: 1px solid var(--gray-4); border-bottom: 1px solid var(--gray-4);">
            <label style="font-weight: 600; font-size: 12.5px; margin-bottom: 7px; display: block;">Método de pago</label>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 7px;">
              ${formasPago.map(fp => `
                <div onclick="seleccionarFormaPago('${fp.id}')" style="border: 1px solid ${formaPagoSeleccionada === fp.id ? 'var(--primary)' : 'var(--gray-4)'}; background: ${formaPagoSeleccionada === fp.id ? 'var(--primary-light)' : 'white'}; border-radius: 10px; padding: 10px 6px; text-align: center; cursor: pointer;">
                  <i class="fas ${fp.icono}" style="color: ${formaPagoSeleccionada === fp.id ? 'var(--primary)' : 'var(--gray-2)'}; font-size: 18px; margin-bottom: 3px; display: block;"></i>
                  <span style="font-size: 10.5px; font-weight: 500;">${fp.nombre.split(' ')[0]}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div style="padding: 14px; background: var(--gray-5);">
            <div style="margin-bottom: 14px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13.5px;">
                <span>Subtotal:</span>
                <span class="mono" id="subtotal">$${calcularSubtotal().toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-size: 13.5px;">
                <span>IVA (15%):</span>
                <span class="mono" id="iva">$${calcularIVA().toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 17px; font-weight: 700; margin-top: 10px; padding-top: 10px; border-top: 2px solid var(--gray-4);">
                <span>TOTAL:</span>
                <span class="mono" style="color: var(--primary);" id="total">$${calcularTotal().toFixed(2)}</span>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px;">
              <button class="btn btn-secondary" onclick="limpiarCarrito()" style="padding: 9px; font-size: 13.5px;">
                <i class="fas fa-trash"></i> Limpiar
              </button>
              <button class="btn btn-primary btn-lg" onclick="procesarVenta()" ${carrito.length === 0 ? 'disabled' : ''} style="${carrito.length === 0 ? 'opacity: 0.5;' : ''} padding: 9px; font-size: 13.5px;">
                <i class="fas fa-check-circle"></i> Cobrar (F8)
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal de personalización (toppings) -->
      <div class="modal-overlay" id="toppings-modal" style="display: none;">
        <div class="modal" style="max-width: 470px;">
          <div class="modal-header" style="padding: 14px;">
            <h3 class="modal-title" id="toppings-title" style="font-size: 17px;">Personalizar producto</h3>
            <button class="modal-close" onclick="cerrarToppings()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body" id="toppings-body" style="padding: 14px;">
            <!-- Se llena dinámicamente -->
          </div>
          <div class="modal-footer" style="padding: 14px;">
            <button class="btn btn-secondary" onclick="cerrarToppings()" style="padding: 7px 14px;">Cancelar</button>
            <button class="btn btn-primary" onclick="agregarConToppings()" style="padding: 7px 14px;">Agregar al carrito</button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // FUNCIONES DEL CARRITO Y TOPPINGS
  // ============================================
  function abrirPersonalizacion(productoId) {
    const producto = catalogoProductos.find(p => p.id === productoId);
    if (!producto) return;
    
    if (!producto.gruposToppings || producto.gruposToppings.length === 0) {
      agregarAlCarrito(producto);
      return;
    }
    
    productoActual = producto;
    seleccionesToppings = {};
    
    producto.gruposToppings.forEach(grupo => {
      if (grupo.tipo === 'radio' && grupo.obligatorio) {
        seleccionesToppings[grupo.nombre] = grupo.opciones[0];
      } else if (grupo.tipo === 'checkbox') {
        seleccionesToppings[grupo.nombre] = [];
      }
    });
    
    mostrarModalToppings();
  }

  function mostrarModalToppings() {
    if (!productoActual) return;
    
    const modal = document.getElementById('toppings-modal');
    const body = document.getElementById('toppings-body');
    const title = document.getElementById('toppings-title');
    
    title.textContent = `Personalizar ${productoActual.nombre}`;
    
    let html = `<p style="margin-bottom: 16px;"><strong>Precio base:</strong> $${productoActual.precio.toFixed(2)}</p>`;
    
    productoActual.gruposToppings.forEach(grupo => {
      html += `
        <div style="margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
            <span style="font-weight: 600;">${grupo.nombre}</span>
            <span style="font-size: 12px; color: var(--gray-2);">
              ${grupo.tipo === 'checkbox' ? `(máx ${grupo.max})` : grupo.obligatorio ? '(obligatorio)' : '(opcional)'}
            </span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            ${grupo.opciones.map(opcion => {
              const isChecked = grupo.tipo === 'radio' ? 
                seleccionesToppings[grupo.nombre]?.nombre === opcion.nombre :
                seleccionesToppings[grupo.nombre]?.some(s => s.nombre === opcion.nombre);
              
              return `
                <label style="display: flex; align-items: center; padding: 8px; background: var(--gray-5); border-radius: 8px; cursor: pointer; ${isChecked ? 'border: 2px solid var(--primary);' : ''}">
                  <input type="${grupo.tipo}" name="topping-${grupo.nombre}" value="${opcion.nombre}" 
                    ${isChecked ? 'checked' : ''} 
                    onchange="seleccionarTopping('${grupo.nombre}', '${opcion.nombre}', ${opcion.precio}, '${grupo.tipo}')"
                    style="margin-right: 12px;">
                  <div style="flex: 1; display: flex; justify-content: space-between;">
                    <span>${opcion.nombre}</span>
                    <span style="color: var(--primary); font-weight: 600;">${opcion.precio > 0 ? '+$' + opcion.precio.toFixed(2) : ''}</span>
                  </div>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });
    
    const totalConToppings = calcularTotalConToppings();
    html += `
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--gray-4);">
        <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 700;">
          <span>Total:</span>
          <span style="color: var(--primary);" id="toppings-total">$${totalConToppings.toFixed(2)}</span>
        </div>
      </div>
    `;
    
    body.innerHTML = html;
    modal.style.display = 'flex';
  }

  function seleccionarTopping(grupoNombre, opcionNombre, precio, tipo) {
    const grupo = productoActual.gruposToppings.find(g => g.nombre === grupoNombre);
    const opcion = grupo.opciones.find(o => o.nombre === opcionNombre);
    
    if (tipo === 'radio') {
      seleccionesToppings[grupoNombre] = opcion;
    } else {
      if (!seleccionesToppings[grupoNombre]) {
        seleccionesToppings[grupoNombre] = [];
      }
      
      const index = seleccionesToppings[grupoNombre].findIndex(s => s.nombre === opcionNombre);
      if (index >= 0) {
        seleccionesToppings[grupoNombre].splice(index, 1);
      } else {
        if (seleccionesToppings[grupoNombre].length < grupo.max) {
          seleccionesToppings[grupoNombre].push(opcion);
        } else {
          alert(`Solo puedes seleccionar máximo ${grupo.max} opciones`);
          const input = document.querySelector(`input[name="topping-${grupoNombre}"][value="${opcionNombre}"]`);
          if (input) input.checked = false;
          return;
        }
      }
    }
    
    const total = calcularTotalConToppings();
    document.getElementById('toppings-total').textContent = `$${total.toFixed(2)}`;
  }

  function calcularTotalConToppings() {
    if (!productoActual) return 0;
    
    let totalToppings = 0;
    
    Object.values(seleccionesToppings).forEach(seleccion => {
      if (Array.isArray(seleccion)) {
        totalToppings += seleccion.reduce((sum, s) => sum + (s.precio || 0), 0);
      } else if (seleccion && seleccion.precio) {
        totalToppings += seleccion.precio;
      }
    });
    
    return productoActual.precio + totalToppings;
  }

  function agregarConToppings() {
    if (!productoActual) return;
    
    for (const grupo of productoActual.gruposToppings) {
      if (grupo.obligatorio) {
        const seleccion = seleccionesToppings[grupo.nombre];
        if (!seleccion || (Array.isArray(seleccion) && seleccion.length === 0)) {
          alert(`Debes seleccionar una opción en ${grupo.nombre}`);
          return;
        }
      }
    }
    
    const totalToppings = calcularTotalConToppings() - productoActual.precio;
    
    const toppingsSeleccionados = [];
    Object.entries(seleccionesToppings).forEach(([grupo, seleccion]) => {
      if (Array.isArray(seleccion)) {
        toppingsSeleccionados.push(...seleccion);
      } else if (seleccion) {
        toppingsSeleccionados.push(seleccion);
      }
    });
    
    const item = {
      id: Date.now(),
      nombre: productoActual.nombre,
      precio: productoActual.precio,
      imagen: productoActual.imagen,
      categoria: productoActual.categoria,
      cantidad: 1,
      toppings: toppingsSeleccionados,
      totalToppings: totalToppings
    };
    
    carrito.push(item);
    cerrarToppings();
    actualizarCarrito();
  }

  function cerrarToppings() {
    document.getElementById('toppings-modal').style.display = 'none';
    productoActual = null;
    seleccionesToppings = {};
  }

  function agregarAlCarrito(producto) {
    const item = {
      id: Date.now(),
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      categoria: producto.categoria,
      cantidad: 1,
      toppings: [],
      totalToppings: 0
    };
    carrito.push(item);
    actualizarCarrito();
  }

  function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
  }

  function cambiarCantidad(index, delta) {
    if (carrito[index].cantidad + delta > 0) {
      carrito[index].cantidad += delta;
      actualizarCarrito();
    }
  }

  function limpiarCarrito() {
    if (carrito.length > 0 && confirm('¿Estás seguro de limpiar el carrito?')) {
      carrito = [];
      actualizarCarrito();
    }
  }

  function actualizarCarrito() {
    const subtotal = calcularSubtotal();
    const iva = calcularIVA();
    const total = calcularTotal();
    
    document.getElementById('item-count').textContent = carrito.length;
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('iva').textContent = `$${iva.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    
    showSection('punto-venta');
  }

  function calcularSubtotal() {
    return carrito.reduce((sum, item) => sum + ((item.precio + (item.totalToppings || 0)) * item.cantidad), 0);
  }

  function calcularIVA() {
    return calcularSubtotal() * 0.15;
  }

  function calcularTotal() {
    return calcularSubtotal() + calcularIVA();
  }

  function seleccionarCliente(clienteId) {
    clienteSeleccionado = clientes.find(c => c.id === clienteId);
  }

  function seleccionarFormaPago(fpId) {
    formaPagoSeleccionada = fpId;
    showSection('punto-venta');
  }

  function procesarVenta() {
    if (!clienteSeleccionado) {
      alert('Debes seleccionar un cliente');
      return;
    }
    
    if (carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    
    const formaPago = formasPago.find(fp => fp.id === formaPagoSeleccionada);
    alert(`Venta procesada exitosamente\nCliente: ${clienteSeleccionado.nombre}\nTotal: $${calcularTotal().toFixed(2)}\nForma de pago: ${formaPago.nombre}`);
    
    carrito = [];
    actualizarCarrito();
    showSection('mis-ventas');
  }

  // Filtros
  window.actualizarFiltroProductos = function(valor) {
    filtroProductos = valor;
    showSection('punto-venta');
  };

  window.cambiarCategoria = function(categoria) {
    categoriaSeleccionada = categoria;
    showSection('punto-venta');
  };

  window.seleccionarFormaPago = seleccionarFormaPago;

  // ============================================
  // RENDERIZADO - MIS VENTAS (con buscador)
  // ============================================
  function renderMisVentas() {
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 4px;">Mis Ventas</h1>
          <p style="color: var(--gray-2);">${misVentas.length} ventas registradas · Total: $${misVentas.reduce((s, v) => s + v.total, 0).toFixed(2)}</p>
        </div>
        <div style="display: flex; gap: 12px;">
          <div style="display: flex; align-items: center; background: white; border: 1px solid var(--gray-4); border-radius: 40px; padding: 0 16px;">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Buscar ventas..." style="border: none; padding: 12px; outline: none; width: 250px;">
          </div>
          <button class="btn btn-secondary" onclick="exportarPDF('ventas')">
            <i class="fas fa-file-pdf"></i> PDF
          </button>
          <button class="btn btn-secondary" onclick="exportarExcel('ventas')">
            <i class="fas fa-file-excel"></i> Excel
          </button>
          <button class="btn btn-primary" onclick="showSection('punto-venta')">
            <i class="fas fa-plus"></i> Nueva Venta
          </button>
        </div>
      </div>

      <div style="background: white; border-radius: 20px; border: 1px solid var(--gray-4); overflow: hidden;">
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: var(--gray-5);">
                <th style="padding: 16px; text-align: left;">Número</th>
                <th style="padding: 16px; text-align: left;">Fecha</th>
                <th style="padding: 16px; text-align: left;">Cliente</th>
                <th style="padding: 16px; text-align: left;">Items</th>
                <th style="padding: 16px; text-align: left;">Total</th>
                <th style="padding: 16px; text-align: left;">Forma Pago</th>
                <th style="padding: 16px; text-align: left;">Estado</th>
                <th style="padding: 16px; text-align: left;">Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${misVentas.map(v => `
                <tr style="border-bottom: 1px solid var(--gray-4);">
                  <td style="padding: 16px;" class="mono">${v.numero}</td>
                  <td style="padding: 16px;">${v.fecha}</td>
                  <td style="padding: 16px;">${v.cliente}</td>
                  <td style="padding: 16px;">${v.items}</td>
                  <td style="padding: 16px; font-weight: 600;">$${v.total.toFixed(2)}</td>
                  <td style="padding: 16px;">${v.forma_pago}</td>
                  <td style="padding: 16px;"><span class="badge ${v.estado === 'COMPLETADA' ? 'badge-success' : 'badge-warning'}">${v.estado}</span></td>
                  <td style="padding: 16px;">
                    <button class="btn btn-icon" onclick="openModal('view-venta', '${v.numero}')"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-icon" onclick="imprimirFactura('${v.numero}')"><i class="fas fa-print"></i></button>
                    <button class="btn btn-icon" onclick="enviarFactura('${v.numero}')"><i class="fas fa-envelope"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div style="padding: 20px; display: flex; justify-content: space-between; align-items: center;">
          <div style="color: var(--gray-2);">Mostrando 1-5 de ${misVentas.length}</div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-icon" disabled><i class="fas fa-chevron-left"></i></button>
            <button class="btn btn-primary" style="width: 40px;">1</button>
            <button class="btn btn-icon">2</button>
            <button class="btn btn-icon">3</button>
            <button class="btn btn-icon"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - COBROS
  // ============================================
  function renderCobros() {
    const cobros = [
      { numero: 'REC001', fecha: '2026-03-04', cliente: 'Distribuidora XYZ', factura: '001-001-000045', monto: 500.00, forma_pago: 'EFECTIVO' },
      { numero: 'REC002', fecha: '2026-03-03', cliente: 'Carlos Rodríguez', factura: '001-001-000046', monto: 95.00, forma_pago: 'TARJETA' }
    ];
    
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 4px;">Cobros</h1>
          <p style="color: var(--gray-2);">${cobros.length} cobros registrados</p>
        </div>
        <div style="display: flex; gap: 12px;">
          <div style="display: flex; align-items: center; background: white; border: 1px solid var(--gray-4); border-radius: 40px; padding: 0 16px;">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Buscar cobros..." style="border: none; padding: 12px; outline: none; width: 250px;">
          </div>
          <button class="btn btn-primary" onclick="openModal('nuevo-cobro')">
            <i class="fas fa-plus"></i> Registrar Cobro
          </button>
        </div>
      </div>

      <div style="background: white; border-radius: 20px; border: 1px solid var(--gray-4); overflow: hidden;">
        <div class="table-container">
          <table style="width: 100%;">
            <thead>
              <tr style="background: var(--gray-5);">
                <th style="padding: 16px;">Número</th>
                <th style="padding: 16px;">Fecha</th>
                <th style="padding: 16px;">Cliente</th>
                <th style="padding: 16px;">Factura</th>
                <th style="padding: 16px;">Monto</th>
                <th style="padding: 16px;">Forma Pago</th>
              </tr>
            </thead>
            <tbody>
              ${cobros.map(c => `
                <tr style="border-bottom: 1px solid var(--gray-4);">
                  <td style="padding: 16px;" class="mono">${c.numero}</td>
                  <td style="padding: 16px;">${c.fecha}</td>
                  <td style="padding: 16px;">${c.cliente}</td>
                  <td style="padding: 16px;" class="mono">${c.factura}</td>
                  <td style="padding: 16px; font-weight: 600;">$${c.monto.toFixed(2)}</td>
                  <td style="padding: 16px;">${c.forma_pago}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - CIERRE DE CAJA
  // ============================================
  function renderCierreCaja() {
    const ventasDelDia = misVentas.filter(v => v.fecha === '2026-03-04');
    const totalEfectivo = ventasDelDia.filter(v => v.forma_pago === 'EFECTIVO').reduce((s, v) => s + v.total, 0);
    const totalTarjeta = ventasDelDia.filter(v => v.forma_pago === 'TARJETA').reduce((s, v) => s + v.total, 0);
    const totalTransferencia = ventasDelDia.filter(v => v.forma_pago === 'TRANSFERENCIA').reduce((s, v) => s + v.total, 0);
    
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 4px;">Cierre de Caja</h1>
          <p style="color: var(--gray-2);">${new Date().toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <button class="btn btn-secondary" onclick="exportarPDF('caja')">
          <i class="fas fa-file-pdf"></i> Exportar Reporte
        </button>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px;">
        <div style="background: white; border-radius: 20px; padding: 24px; border: 1px solid var(--gray-4);">
          <h3 style="margin-bottom: 20px;">Resumen del Día</h3>
          
          <div style="display: grid; gap: 16px;">
            <div style="display: flex; justify-content: space-between; padding: 16px; background: var(--gray-5); border-radius: 12px;">
              <span>Ventas del día:</span>
              <span class="mono fw-600">$${ventasDelDia.reduce((s, v) => s + v.total, 0).toFixed(2)}</span>
            </div>
            
            <div style="border-top: 1px dashed var(--gray-4); padding-top: 16px;">
              <h4 style="margin-bottom: 12px;">Desglose por forma de pago</h4>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span><i class="fas fa-money-bill-wave" style="color: var(--success);"></i> Efectivo:</span>
                <span class="mono">$${totalEfectivo.toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span><i class="fas fa-credit-card" style="color: var(--info);"></i> Tarjeta:</span>
                <span class="mono">$${totalTarjeta.toFixed(2)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span><i class="fas fa-university" style="color: var(--warning);"></i> Transferencia:</span>
                <span class="mono">$${totalTransferencia.toFixed(2)}</span>
              </div>
            </div>

            <div style="background: var(--primary-light); padding: 20px; border-radius: 12px; margin-top: 16px;">
              <div style="display: flex; justify-content: space-between; font-size: 20px; font-weight: 700;">
                <span>Saldo final:</span>
                <span style="color: var(--primary);">$${(200 + ventasDelDia.reduce((s, v) => s + v.total, 0)).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div style="background: white; border-radius: 20px; padding: 24px; border: 1px solid var(--gray-4);">
          <h3 style="margin-bottom: 20px;">Cerrar Caja</h3>
          
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <label style="display: block; margin-bottom: 8px;">Saldo inicial</label>
              <input type="number" class="form-control" value="200.00" readonly style="background: var(--gray-5);">
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 8px;">Saldo final declarado</label>
              <input type="number" class="form-control" value="${(200 + ventasDelDia.reduce((s, v) => s + v.total, 0)).toFixed(2)}" style="font-size: 18px;">
            </div>
            
            <div>
              <label style="display: block; margin-bottom: 8px;">Observaciones</label>
              <textarea class="form-control" rows="3" placeholder="Ingresa cualquier novedad..."></textarea>
            </div>
            
            <button class="btn btn-primary" style="width: 100%; padding: 16px;" onclick="confirmarCierreCaja()">
              <i class="fas fa-lock"></i> Confirmar Cierre de Caja
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - CONSULTA DE STOCK (con buscador)
  // ============================================
  function renderConsultaStock() {
    const stock = [
      { producto: 'Hamburguesa Clásica', codigo: 'PLATO001', stock: 25, min: 10, max: 50 },
      { producto: 'Helado Artesanal', codigo: 'POSTRE001', stock: 15, min: 8, max: 40 },
      { producto: 'Coca Cola 500ml', codigo: 'BEBIDA001', stock: 60, min: 20, max: 100 }
    ];
    
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 4px;">Consulta de Stock</h1>
          <p style="color: var(--gray-2);">Disponibilidad de productos</p>
        </div>
        <div style="display: flex; align-items: center; background: white; border: 1px solid var(--gray-4); border-radius: 40px; padding: 0 16px; width: 300px;">
          <i class="fas fa-search" style="color: var(--gray-2);"></i>
          <input type="text" placeholder="Buscar producto..." style="border: none; padding: 12px; outline: none; width: 100%;">
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px;">
        <div style="background: white; border-radius: 16px; padding: 20px; border: 1px solid var(--gray-4);">
          <div style="font-size: 28px; font-weight: 700; color: var(--primary);">${stock.reduce((s, i) => s + i.stock, 0)}</div>
          <div style="color: var(--gray-2);">Unidades totales</div>
        </div>
        <div style="background: white; border-radius: 16px; padding: 20px; border: 1px solid var(--gray-4);">
          <div style="font-size: 28px; font-weight: 700; color: var(--success);">$${stock.reduce((s, i) => s + (i.stock * 5), 0).toFixed(2)}</div>
          <div style="color: var(--gray-2);">Valor inventario</div>
        </div>
        <div style="background: white; border-radius: 16px; padding: 20px; border: 1px solid var(--gray-4);">
          <div style="font-size: 28px; font-weight: 700; color: var(--danger);">${stock.filter(s => s.stock <= s.min).length}</div>
          <div style="color: var(--gray-2);">Productos con stock bajo</div>
        </div>
      </div>

      <div style="background: white; border-radius: 20px; border: 1px solid var(--gray-4); overflow: hidden;">
        <div class="table-container">
          <table style="width: 100%;">
            <thead>
              <tr style="background: var(--gray-5);">
                <th style="padding: 16px;">Código</th>
                <th style="padding: 16px;">Producto</th>
                <th style="padding: 16px;">Stock</th>
                <th style="padding: 16px;">Mínimo</th>
                <th style="padding: 16px;">Máximo</th>
                <th style="padding: 16px;">Estado</th>
              </tr>
            </thead>
            <tbody>
              ${stock.map(s => `
                <tr style="border-bottom: 1px solid var(--gray-4);">
                  <td style="padding: 16px;" class="mono">${s.codigo}</td>
                  <td style="padding: 16px;">${s.producto}</td>
                  <td style="padding: 16px;" class="${s.stock <= s.min ? 'text-danger fw-600' : ''}">${s.stock}</td>
                  <td style="padding: 16px;">${s.min}</td>
                  <td style="padding: 16px;">${s.max}</td>
                  <td style="padding: 16px;">
                    <span class="badge ${s.stock <= s.min ? 'badge-danger' : s.stock >= s.max ? 'badge-warning' : 'badge-success'}">
                      ${s.stock <= s.min ? 'BAJO' : s.stock >= s.max ? 'EXCESO' : 'NORMAL'}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - ENTRADAS Y SALIDAS
  // ============================================
  function renderEntradasSalidas() {
    const movimientos = [
      { fecha: '2026-03-04', tipo: 'ENTRADA', producto: 'Hamburguesa Clásica', cantidad: 10, usuario: 'Carlos' },
      { fecha: '2026-03-03', tipo: 'SALIDA', producto: 'Helado Artesanal', cantidad: 5, usuario: 'Carlos' }
    ];
    
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 4px;">Entradas y Salidas</h1>
        </div>
        <div style="display: flex; gap: 12px;">
          <div style="display: flex; align-items: center; background: white; border: 1px solid var(--gray-4); border-radius: 40px; padding: 0 16px;">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Buscar..." style="border: none; padding: 12px; outline: none; width: 250px;">
          </div>
          <button class="btn btn-primary" onclick="openModal('nuevo-movimiento')">
            <i class="fas fa-plus"></i> Nuevo Movimiento
          </button>
        </div>
      </div>

      <div style="background: white; border-radius: 20px; border: 1px solid var(--gray-4); overflow: hidden;">
        <div class="table-container">
          <table style="width: 100%;">
            <thead>
              <tr style="background: var(--gray-5);">
                <th style="padding: 16px;">Fecha</th>
                <th style="padding: 16px;">Tipo</th>
                <th style="padding: 16px;">Producto</th>
                <th style="padding: 16px;">Cantidad</th>
                <th style="padding: 16px;">Usuario</th>
              </tr>
            </thead>
            <tbody>
              ${movimientos.map(m => `
                <tr style="border-bottom: 1px solid var(--gray-4);">
                  <td style="padding: 16px;">${m.fecha}</td>
                  <td style="padding: 16px;"><span class="badge ${m.tipo === 'ENTRADA' ? 'badge-success' : 'badge-danger'}">${m.tipo}</span></td>
                  <td style="padding: 16px;">${m.producto}</td>
                  <td style="padding: 16px;">${m.cantidad}</td>
                  <td style="padding: 16px;">${m.usuario}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - INVENTARIO RÁPIDO
  // ============================================
  function renderInventarioRapido() {
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 4px;">Inventario Rápido</h1>
        </div>
        <button class="btn btn-secondary" onclick="exportarPDF('inventario')">
          <i class="fas fa-file-pdf"></i> Exportar
        </button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px;">
        <div style="background: white; border-radius: 16px; padding: 20px; text-align: center;">
          <div style="font-size: 36px; font-weight: 700; color: var(--primary);">100</div>
          <div style="color: var(--gray-2);">Total productos</div>
        </div>
        <div style="background: white; border-radius: 16px; padding: 20px; text-align: center;">
          <div style="font-size: 36px; font-weight: 700; color: var(--success);">$15,750</div>
          <div style="color: var(--gray-2);">Valor inventario</div>
        </div>
        <div style="background: white; border-radius: 16px; padding: 20px; text-align: center;">
          <div style="font-size: 36px; font-weight: 700; color: var(--danger);">1</div>
          <div style="color: var(--gray-2);">Stock bajo</div>
        </div>
      </div>

      <div style="background: white; border-radius: 20px; padding: 24px; border: 1px solid var(--gray-4);">
        <h3 style="margin-bottom: 20px;">Top 5 Productos</h3>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 30px; font-weight: 600;">1</div>
            <div style="flex: 1;">Hamburguesa Clásica</div>
            <div style="width: 200px;">
              <div class="progress"><div class="progress-bar" style="width: 50%;"></div></div>
            </div>
            <div class="mono fw-600">25 / 50</div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 30px; font-weight: 600;">2</div>
            <div style="flex: 1;">Coca Cola 500ml</div>
            <div style="width: 200px;">
              <div class="progress"><div class="progress-bar" style="width: 60%;"></div></div>
            </div>
            <div class="mono fw-600">60 / 100</div>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - EMPLEADOS
  // ============================================
  function renderEmpleados() {
    const empleados = [
      { nombre: 'María González', cargo: 'Administradora', email: 'maria@techcorp.ec', telefono: '0998765432' },
      { nombre: 'Carlos Méndez', cargo: 'Vendedor', email: 'carlos@techcorp.ec', telefono: '0987654321' }
    ];
    
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 4px;">Empleados</h1>
        </div>
        <div style="display: flex; gap: 12px;">
          <div style="display: flex; align-items: center; background: white; border: 1px solid var(--gray-4); border-radius: 40px; padding: 0 16px;">
            <i class="fas fa-search"></i>
            <input type="text" placeholder="Buscar empleados..." style="border: none; padding: 12px; outline: none; width: 250px;">
          </div>
          <button class="btn btn-primary" onclick="openModal('nuevo-empleado')">
            <i class="fas fa-plus"></i> Nuevo Empleado
          </button>
        </div>
      </div>

      <div style="background: white; border-radius: 20px; border: 1px solid var(--gray-4); overflow: hidden;">
        <div class="table-container">
          <table style="width: 100%;">
            <thead>
              <tr style="background: var(--gray-5);">
                <th style="padding: 16px;">Nombre</th>
                <th style="padding: 16px;">Cargo</th>
                <th style="padding: 16px;">Email</th>
                <th style="padding: 16px;">Teléfono</th>
              </tr>
            </thead>
            <tbody>
              ${empleados.map(e => `
                <tr style="border-bottom: 1px solid var(--gray-4);">
                  <td style="padding: 16px;">${e.nombre}</td>
                  <td style="padding: 16px;">${e.cargo}</td>
                  <td style="padding: 16px;">${e.email}</td>
                  <td style="padding: 16px;">${e.telefono}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - ASISTENCIAS
  // ============================================
  function renderAsistencias() {
    const asistencias = [
      { fecha: '2026-03-04', empleado: 'María González', entrada: '08:00', salida: '17:00', horas: 9 },
      { fecha: '2026-03-04', empleado: 'Carlos Méndez', entrada: '08:30', salida: '17:30', horas: 9 }
    ];
    
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 4px;">Asistencias</h1>
        </div>
        <div style="display: flex; gap: 12px;">
          <div style="display: flex; align-items: center; background: white; border: 1px solid var(--gray-4); border-radius: 40px; padding: 0 16px;">
            <i class="fas fa-calendar"></i>
            <input type="text" placeholder="Seleccionar fecha..." value="04/03/2026" style="border: none; padding: 12px; outline: none; width: 150px;">
          </div>
          <button class="btn btn-primary" onclick="openModal('registrar-asistencia')">
            <i class="fas fa-clock"></i> Registrar
          </button>
        </div>
      </div>

      <div style="background: white; border-radius: 20px; border: 1px solid var(--gray-4); overflow: hidden;">
        <div class="table-container">
          <table style="width: 100%;">
            <thead>
              <tr style="background: var(--gray-5);">
                <th style="padding: 16px;">Fecha</th>
                <th style="padding: 16px;">Empleado</th>
                <th style="padding: 16px;">Entrada</th>
                <th style="padding: 16px;">Salida</th>
                <th style="padding: 16px;">Horas</th>
              </tr>
            </thead>
            <tbody>
              ${asistencias.map(a => `
                <tr style="border-bottom: 1px solid var(--gray-4);">
                  <td style="padding: 16px;">${a.fecha}</td>
                  <td style="padding: 16px;">${a.empleado}</td>
                  <td style="padding: 16px;">${a.entrada}</td>
                  <td style="padding: 16px;">${a.salida}</td>
                  <td style="padding: 16px;">${a.horas}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - NÓMINAS (DEV)
  // ============================================
  function renderNominas() {
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 4px;">Nóminas</h1>
          <p style="color: var(--gray-2);">Módulo en desarrollo</p>
        </div>
        <span class="badge badge-info">DEV</span>
      </div>

      <div style="background: white; border-radius: 20px; padding: 60px; text-align: center;">
        <i class="fas fa-file-invoice" style="font-size: 64px; color: var(--gray-3); margin-bottom: 20px;"></i>
        <h3 style="color: var(--gray-2);">Módulo de Nóminas</h3>
        <p style="color: var(--gray-2);">Próximamente disponible</p>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - MI PERFIL
  // ============================================
  function renderMiPerfil() {
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 4px;">Mi Perfil</h1>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <div style="background: white; border-radius: 20px; padding: 24px; border: 1px solid var(--gray-4);">
          <h3 style="margin-bottom: 20px;">Información Personal</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <label style="display: block; margin-bottom: 8px;">Nombre completo</label>
              <input type="text" class="form-control" value="${CURRENT_USER.nombre} ${CURRENT_USER.apellido}" style="width: 100%; padding: 12px;">
            </div>
            <div>
              <label style="display: block; margin-bottom: 8px;">Email</label>
              <input type="email" class="form-control" value="${CURRENT_USER.email}" style="width: 100%; padding: 12px;">
            </div>
            <div>
              <label style="display: block; margin-bottom: 8px;">Teléfono</label>
              <input type="text" class="form-control" value="0991234567" style="width: 100%; padding: 12px;">
            </div>
            <button class="btn btn-primary" style="margin-top: 8px;">Actualizar Perfil</button>
          </div>
        </div>

        <div style="background: white; border-radius: 20px; padding: 24px; border: 1px solid var(--gray-4);">
          <h3 style="margin-bottom: 20px;">Cambiar Contraseña</h3>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <label style="display: block; margin-bottom: 8px;">Contraseña actual</label>
              <input type="password" class="form-control" style="width: 100%; padding: 12px;">
            </div>
            <div>
              <label style="display: block; margin-bottom: 8px;">Nueva contraseña</label>
              <input type="password" class="form-control" style="width: 100%; padding: 12px;">
            </div>
            <div>
              <label style="display: block; margin-bottom: 8px;">Confirmar contraseña</label>
              <input type="password" class="form-control" style="width: 100%; padding: 12px;">
            </div>
            <button class="btn btn-primary" style="margin-top: 8px;">Cambiar Contraseña</button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - PREFERENCIAS
  // ============================================
  function renderPreferencias() {
    return `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 style="font-size: 28px; font-weight: 800; margin-bottom: 4px;">Preferencias</h1>
        </div>
      </div>

      <div style="background: white; border-radius: 20px; padding: 24px; border: 1px solid var(--gray-4);">
        <div style="display: grid; gap: 20px;">
          <div>
            <label style="display: block; margin-bottom: 8px;">Tema de la aplicación</label>
            <select class="form-control" style="width: 100%; padding: 12px;">
              <option>Claro</option>
              <option>Oscuro</option>
              <option>Automático</option>
            </select>
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px;">Idioma</label>
            <select class="form-control" style="width: 100%; padding: 12px;">
              <option>Español (Ecuador)</option>
              <option>English</option>
            </select>
          </div>
          <div>
            <label style="display: block; margin-bottom: 8px;">Notificaciones</label>
            <div style="display: flex; gap: 20px;">
              <label><input type="checkbox" checked> Correo electrónico</label>
              <label><input type="checkbox" checked> En el sistema</label>
            </div>
          </div>
          <button class="btn btn-primary">Guardar Preferencias</button>
        </div>
      </div>
    `;
  }

  // ============================================
  // FUNCIONES DE MODAL
  // ============================================
  function openModal(type, id = null) {
    const modal = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    const footer = document.getElementById('modal-footer');

    if (!modal) return;

    if (type === 'notifications') {
      title.innerHTML = 'Notificaciones';
      body.innerHTML = renderNotificationsModal();
      footer.innerHTML = '<button class="btn btn-secondary" onclick="closeModal()">Cerrar</button>';
    } else if (type === 'nuevo-cliente') {
      title.innerHTML = 'Nuevo Cliente';
      body.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div>
            <label style="display: block; margin-bottom: 4px;">Tipo identificación</label>
            <select class="form-control">
              <option>RUC</option>
              <option>Cédula</option>
              <option>Pasaporte</option>
            </select>
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px;">Número</label>
            <input type="text" class="form-control" placeholder="Ingrese número">
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px;">Nombre/Razón Social</label>
            <input type="text" class="form-control" placeholder="Nombre completo">
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px;">Email</label>
            <input type="email" class="form-control" placeholder="correo@ejemplo.com">
          </div>
          <div>
            <label style="display: block; margin-bottom: 4px;">Teléfono</label>
            <input type="text" class="form-control" placeholder="0991234567">
          </div>
        </div>
      `;
      footer.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="guardarClienteNuevo()">Guardar Cliente</button>
      `;
    } else if (type === 'view-venta' && id) {
      const venta = misVentas.find(v => v.numero === id);
      title.innerHTML = `Venta ${id}`;
      body.innerHTML = `
        <div style="padding: 20px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
            <div>
              <p><strong>Cliente:</strong> ${venta.cliente}</p>
              <p><strong>Fecha:</strong> ${venta.fecha}</p>
              <p><strong>Forma pago:</strong> ${venta.forma_pago}</p>
            </div>
            <div>
              <p><strong>Total:</strong> $${venta.total.toFixed(2)}</p>
              <p><strong>Estado:</strong> <span class="badge badge-success">${venta.estado}</span></p>
              <p><strong>Items:</strong> ${venta.items}</p>
            </div>
          </div>
          <h4 style="margin-bottom: 12px;">Items de la venta:</h4>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: var(--gray-5);">
                <th style="padding: 8px;">Producto</th>
                <th style="padding: 8px;">Cantidad</th>
                <th style="padding: 8px;">Precio</th>
                <th style="padding: 8px;">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding: 8px;">Hamburguesa Clásica</td>
                <td style="padding: 8px;">1</td>
                <td style="padding: 8px;">$8.50</td>
                <td style="padding: 8px;">$8.50</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
      footer.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cerrar</button>
        <button class="btn btn-primary" onclick="imprimirFactura('${id}')"><i class="fas fa-print"></i> Imprimir</button>
      `;
    } else {
      title.innerHTML = 'Nuevo registro';
      body.innerHTML = '<p style="text-align: center; padding: 32px;">Formulario en construcción</p>';
      footer.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="closeModal()">Guardar</button>
      `;
    }

    modal.classList.add('open');
  }

  function renderNotificationsModal() {
    return `
      <div style="max-height: 400px; overflow-y: auto;">
        ${notificaciones.map(n => `
          <div style="padding: 16px; border-bottom: 1px solid var(--gray-4); display: flex; gap: 12px; ${!n.leida ? 'background: var(--primary-light);' : ''}">
            <div style="color: var(--${n.type});"><i class="fas ${n.icon}"></i></div>
            <div style="flex: 1;">
              <div>${n.text}</div>
              <div style="font-size: 11px; color: var(--gray-2);">${n.time}</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function closeModal() {
    const modal = document.getElementById('modal-overlay');
    if (modal) modal.classList.remove('open');
  }

  // Funciones placeholder
  window.guardarClienteNuevo = function() {
    alert('Cliente guardado exitosamente');
    closeModal();
  };

  window.confirmarCierreCaja = function() {
    if (confirm('¿Estás seguro de cerrar la caja?')) {
      alert('Caja cerrada exitosamente');
      showSection('dashboard');
    }
  };

  window.imprimirFactura = function(numero) {
    alert(`Imprimiendo factura ${numero}`);
  };

  window.enviarFactura = function(numero) {
    alert(`Enviando factura ${numero} por email`);
  };

  window.exportarPDF = function(tipo) {
    alert(`Exportando ${tipo} a PDF...`);
  };

  window.exportarExcel = function(tipo) {
    alert(`Exportando ${tipo} a Excel...`);
  };

  window.exportarGrafico = function(tipo) {
    alert(`Exportando gráfico de ${tipo}`);
  };

  window.cambiarPeriodoVentas = function(periodo) {
    console.log('Cambiando período a:', periodo);
  };

  // ============================================
  // EXPORTAR FUNCIONES
  // ============================================
  window.showSection = showSection;
  window.toggleSection = toggleSection;
  window.toggleSidebar = toggleSidebar;
  window.toggleUserMenu = toggleUserMenu;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.abrirPersonalizacion = abrirPersonalizacion;
  window.seleccionarTopping = seleccionarTopping;
  window.agregarConToppings = agregarConToppings;
  window.cerrarToppings = cerrarToppings;
  window.eliminarDelCarrito = eliminarDelCarrito;
  window.cambiarCantidad = cambiarCantidad;
  window.limpiarCarrito = limpiarCarrito;
  window.procesarVenta = procesarVenta;
  window.seleccionarCliente = seleccionarCliente;
  window.seleccionarFormaPago = seleccionarFormaPago;
})();