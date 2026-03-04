(function() {
  'use strict';

  // ============================================
  // CONFIGURACIÓN - TechCorp S.A. (tenant_id = 't2')
  // ============================================
  const CURRENT_TENANT_ID = 't2';
  const CURRENT_TENANT = {
    id: 't2',
    nombre_comercial: 'TechCorp S.A.',
    slug: 'techcorp',
    ruc: '1791234567001',
    plan: 'profesional'
  };

  // ============================================
  // DATOS FILTRADOS POR TENANT
  // ============================================
  
  // Usuarios de TechCorp
  const usuarios = [
    { id: 'u3', tenant_id: 't2', email: 'maria.gonzalez@techcorp.com', nombre: 'María', apellido: 'González', es_admin_tenant: true, esta_activo: true, ultima_conexion: '2024-03-15 09:30', telefono: '0998765432', roles: ['admin'] },
    { id: 'u6', tenant_id: 't2', email: 'carlos.mendez@techcorp.com', nombre: 'Carlos', apellido: 'Méndez', es_admin_tenant: false, esta_activo: true, ultima_conexion: '2024-03-14 16:20', telefono: '0987654321', roles: ['operativo'], tipo_operativo: 'vendedor' },
    { id: 'u7', tenant_id: 't2', email: 'laura.sanchez@techcorp.com', nombre: 'Laura', apellido: 'Sánchez', es_admin_tenant: false, esta_activo: true, ultima_conexion: '2024-03-15 10:15', telefono: '0991234567', roles: ['operativo'], tipo_operativo: 'cajero' },
    { id: 'u8', tenant_id: 't2', email: 'pedro.ramirez@techcorp.com', nombre: 'Pedro', apellido: 'Ramírez', es_admin_tenant: false, esta_activo: false, ultima_conexion: '2024-03-10 11:45', telefono: '0982345678', roles: ['operativo'], tipo_operativo: 'recursos_humanos' }
  ];

  // Facturas de TechCorp
  const facturas = [
    { id: 'f1', numero: '001-001-000001', cliente: 'Distribuidora XYZ', cliente_id: 'p4', ruc: '1798765432001', fecha: '2024-03-15', subtotal: 1250.00, subtotal_0: 0, subtotal_12: 1250.00, iva: 150.00, total: 1400.00, estado: 'AUTORIZADA', forma_pago: '01 - Efectivo', fecha_autorizacion: '2024-03-15 10:30:22', vendedor: 'Carlos Méndez', establecimiento: '001', punto_emision: '001', secuencial: '000001', clave_acceso: '1503202401179123456700120010010000000011234567812' },
    { id: 'f2', numero: '001-001-000002', cliente: 'Servicios Integrales', cliente_id: 'p5', ruc: '1795554443001', fecha: '2024-03-15', subtotal: 850.50, subtotal_0: 0, subtotal_12: 850.50, iva: 102.06, total: 952.56, estado: 'PENDIENTE', forma_pago: '20 - Transferencia', fecha_autorizacion: null, vendedor: 'Laura Sánchez', establecimiento: '001', punto_emision: '001', secuencial: '000002', clave_acceso: null },
    { id: 'f3', numero: '001-001-000003', cliente: 'TechSolutions Cía.', cliente_id: 'p6', ruc: '1793332222001', fecha: '2024-03-14', subtotal: 3200.00, subtotal_0: 0, subtotal_12: 3200.00, iva: 384.00, total: 3584.00, estado: 'AUTORIZADA', forma_pago: '01 - Efectivo', fecha_autorizacion: '2024-03-14 15:22:10', vendedor: 'Carlos Méndez', establecimiento: '001', punto_emision: '001', secuencial: '000003', clave_acceso: '14032024011798765432001200100100000300000123456789' },
    { id: 'f4', numero: '001-001-000004', cliente: 'Consultoría M&A', cliente_id: 'p2', ruc: '0990123456001', fecha: '2024-03-13', subtotal: 4300.00, subtotal_0: 0, subtotal_12: 4300.00, iva: 516.00, total: 4816.00, estado: 'AUTORIZADA', forma_pago: '01 - Efectivo', fecha_autorizacion: '2024-03-13 11:45:33', vendedor: 'María González', establecimiento: '001', punto_emision: '001', secuencial: '000004', clave_acceso: '13032024011799999990012001001000005000001234567890' }
  ];

  const facturasDetalles = [
    { id: 'fd1', factura_id: 'f1', producto: 'Laptop HP Pavilion', cantidad: 1, precio_unitario: 850.00, descuento: 0, subtotal: 850.00, iva: 127.50 },
    { id: 'fd2', factura_id: 'f1', producto: 'Monitor Samsung 24"', cantidad: 1, precio_unitario: 320.00, descuento: 0, subtotal: 320.00, iva: 48.00 }
  ];

  const notasCredito = [
    { id: 'nc1', numero: '001-001-000001', factura_origen: '001-001-000003', cliente: 'TechSolutions Cía.', fecha: '2024-03-15', motivo: 'Devolución de productos', subtotal: 320.00, iva: 38.40, total: 358.40, estado: 'AUTORIZADA' },
    { id: 'nc2', numero: '001-001-000002', factura_origen: '001-001-000001', cliente: 'Distribuidora XYZ', fecha: '2024-03-14', motivo: 'Descuento comercial', subtotal: 125.00, iva: 15.00, total: 140.00, estado: 'AUTORIZADA' }
  ];

  const notasDebito = [];

  const retenciones = [];

  const guiasRemision = [
    { id: 'g1', numero: '001-001-000001', destino: 'Distribuidora XYZ', fecha_inicio: '2024-03-15', fecha_fin: '2024-03-15', motivo: 'Venta de productos', productos: 5, estado: 'ENTREGADA' }
  ];

  // Personas (clientes y proveedores de TechCorp)
  const personas = [
    { id: 'p1', tipo: 'EMPRESA', identificacion: '1798765432001', nombre: 'Distribuidora XYZ', nombre_comercial: 'DistriXYZ', email: 'ventas@distrixyz.com', telefono: '023456789', telefono_movil: '0991234567', direccion: 'Av. América N23-45', ciudad: 'Quito', provincia: 'Pichincha', es_cliente: true, es_proveedor: false, limite_credito: 5000.00, plazo_pago: 30, estado: 'ACTIVO' },
    { id: 'p2', tipo: 'EMPRESA', identificacion: '0990123456001', nombre: 'Consultoría M&A', nombre_comercial: 'M&A Consulting', email: 'facturacion@consultoria.com', telefono: '042345678', telefono_movil: '0987654321', direccion: 'Av. 9 de Octubre 123', ciudad: 'Guayaquil', provincia: 'Guayas', es_cliente: true, es_proveedor: false, limite_credito: 3000.00, plazo_pago: 30, estado: 'ACTIVO' },
    { id: 'p3', tipo: 'EMPRESA', identificacion: '1793332222001', nombre: 'TechSolutions Cía.', nombre_comercial: 'TechSolutions', email: 'info@techsolutions.com', telefono: '023456123', telefono_movil: '0999876543', direccion: 'Av. De la Prensa N45-67', ciudad: 'Quito', provincia: 'Pichincha', es_cliente: true, es_proveedor: false, limite_credito: 8000.00, plazo_pago: 45, estado: 'ACTIVO' },
    { id: 'p4', tipo: 'EMPRESA', identificacion: '1795554443001', nombre: 'Servicios Integrales', nombre_comercial: 'Serintegral', email: 'facturacion@serintegral.com', telefono: '023456456', telefono_movil: '0992345678', direccion: 'Av. 6 de Diciembre N34-56', ciudad: 'Quito', provincia: 'Pichincha', es_cliente: false, es_proveedor: true, limite_credito: 0, plazo_pago: 30, estado: 'ACTIVO' }
  ];

  const productos = [
    { id: 'prod1', codigo: 'P001', nombre: 'Laptop HP Pavilion', categoria: 'Equipos', categoria_id: 'cat1', tipo: 'PRODUCTO', stock: 15, stock_minimo: 5, precio_venta: 850.00, precio_compra: 700.00, iva: '15%', estado: 'ACTIVO' },
    { id: 'prod2', codigo: 'P002', nombre: 'Monitor Samsung 24"', categoria: 'Periféricos', categoria_id: 'cat2', tipo: 'PRODUCTO', stock: 8, stock_minimo: 3, precio_venta: 320.00, precio_compra: 250.00, iva: '15%', estado: 'ACTIVO' },
    { id: 'prod3', codigo: 'P003', nombre: 'Teclado Logitech', categoria: 'Periféricos', categoria_id: 'cat2', tipo: 'PRODUCTO', stock: 25, stock_minimo: 10, precio_venta: 45.00, precio_compra: 30.00, iva: '15%', estado: 'ACTIVO' },
    { id: 'prod4', codigo: 'S001', nombre: 'Mantenimiento', categoria: 'Servicios', categoria_id: 'cat4', tipo: 'SERVICIO', stock: 999, stock_minimo: 0, precio_venta: 150.00, precio_compra: 0, iva: '15%', estado: 'ACTIVO' }
  ];

  const categorias = [
    { id: 'cat1', codigo: 'CAT01', nombre: 'Equipos', productos: 2, nivel: 1, activa: true },
    { id: 'cat2', codigo: 'CAT02', nombre: 'Periféricos', productos: 2, nivel: 1, activa: true },
    { id: 'cat3', codigo: 'CAT03', nombre: 'Redes', productos: 0, nivel: 1, activa: true },
    { id: 'cat4', codigo: 'CAT04', nombre: 'Servicios', productos: 1, nivel: 1, activa: true }
  ];

  const planCuentas = [
    { id: 'pc1', codigo: '1', nombre: 'ACTIVO', nivel: 1, naturaleza: 'DEUDORA', permite_movimiento: false, saldo: 0 },
    { id: 'pc2', codigo: '1.1', nombre: 'ACTIVO CORRIENTE', nivel: 2, naturaleza: 'DEUDORA', permite_movimiento: false, saldo: 0 },
    { id: 'pc3', codigo: '1.1.1', nombre: 'EFECTIVO Y EQUIVALENTES', nivel: 3, naturaleza: 'DEUDORA', permite_movimiento: false, saldo: 0 },
    { id: 'pc4', codigo: '1.1.1.01', nombre: 'Caja General', nivel: 4, naturaleza: 'DEUDORA', permite_movimiento: true, saldo: 8500.00 },
    { id: 'pc5', codigo: '1.1.1.02', nombre: 'Bancos', nivel: 4, naturaleza: 'DEUDORA', permite_movimiento: true, saldo: 32450.00 },
    { id: 'pc6', codigo: '1.1.2', nombre: 'CUENTAS POR COBRAR', nivel: 3, naturaleza: 'DEUDORA', permite_movimiento: false, saldo: 0 },
    { id: 'pc7', codigo: '1.1.2.01', nombre: 'Clientes', nivel: 4, naturaleza: 'DEUDORA', permite_movimiento: true, saldo: 10752.56 },
    { id: 'pc8', codigo: '1.2', nombre: 'ACTIVO NO CORRIENTE', nivel: 2, naturaleza: 'DEUDORA', permite_movimiento: false, saldo: 0 },
    { id: 'pc9', codigo: '2', nombre: 'PASIVO', nivel: 1, naturaleza: 'ACREEDORA', permite_movimiento: false, saldo: 0 },
    { id: 'pc10', codigo: '2.1', nombre: 'PASIVO CORRIENTE', nivel: 2, naturaleza: 'ACREEDORA', permite_movimiento: false, saldo: 0 },
    { id: 'pc11', codigo: '2.1.1', nombre: 'CUENTAS POR PAGAR', nivel: 3, naturaleza: 'ACREEDORA', permite_movimiento: true, saldo: 1400.00 },
    { id: 'pc12', codigo: '3', nombre: 'PATRIMONIO', nivel: 1, naturaleza: 'ACREEDORA', permite_movimiento: false, saldo: 0 },
    { id: 'pc13', codigo: '4', nombre: 'INGRESOS', nivel: 1, naturaleza: 'ACREEDORA', permite_movimiento: false, saldo: 0 },
    { id: 'pc14', codigo: '5', nombre: 'GASTOS', nivel: 1, naturaleza: 'DEUDORA', permite_movimiento: false, saldo: 0 }
  ];

  const asientos = [
    { id: 'as1', numero: 1, fecha: '2024-03-15', glosa: 'Venta según factura 001-001-000001', tipo: 'VENTA', estado: 'CONTABILIZADO', debe: 1400.00, haber: 1400.00, usuario: 'María González' },
    { id: 'as2', numero: 2, fecha: '2024-03-15', glosa: 'Venta según factura 001-001-000002', tipo: 'VENTA', estado: 'CONTABILIZADO', debe: 952.56, haber: 952.56, usuario: 'María González' },
    { id: 'as3', numero: 3, fecha: '2024-03-14', glosa: 'Venta según factura 001-001-000003', tipo: 'VENTA', estado: 'CONTABILIZADO', debe: 3584.00, haber: 3584.00, usuario: 'Carlos Méndez' }
  ];

  const asientosDetalles = [
    { id: 'ad1', asiento_id: 'as1', cuenta: '1.1.1.01', debe: 1400.00, haber: 0 },
    { id: 'ad2', asiento_id: 'as1', cuenta: '4.1', debe: 0, haber: 1250.00 },
    { id: 'ad3', asiento_id: 'as1', cuenta: '2.1.2', debe: 0, haber: 150.00 }
  ];

  const centrosCosto = [
    { id: 'cc1', codigo: 'CC001', nombre: 'Administración', presupuesto: 50000.00, ejecutado: 32450.00, estado: 'ACTIVO' },
    { id: 'cc2', codigo: 'CC002', nombre: 'Ventas', presupuesto: 30000.00, ejecutado: 18760.00, estado: 'ACTIVO' }
  ];

  const proyectos = [
    { id: 'pj1', codigo: 'PROJ001', nombre: 'Implementación ERP Cliente', cliente: 'Distribuidora XYZ', fecha_inicio: '2024-01-01', fecha_fin: '2024-06-30', presupuesto: 15000.00, avance: 45, estado: 'EN_PROGRESO' }
  ];

  const periodosContables = [
    { id: 'pc1', anio: 2024, mes: 3, estado: 'ABIERTO', fecha_apertura: '2024-03-01', total_asientos: 45, total_debe: 87654.32, total_haber: 87654.32 }
  ];

  const cuentasCobrar = [
    { id: 'cxc1', cliente: 'Distribuidora XYZ', documento: 'FAC-001-001-000001', fecha_emision: '2024-03-15', fecha_vencimiento: '2024-04-14', monto_original: 1400.00, saldo_pendiente: 1400.00, estado: 'PENDIENTE', dias_mora: 0 },
    { id: 'cxc2', cliente: 'Servicios Integrales', documento: 'FAC-001-001-000002', fecha_emision: '2024-03-15', fecha_vencimiento: '2024-04-14', monto_original: 952.56, saldo_pendiente: 952.56, estado: 'PENDIENTE', dias_mora: 0 },
    { id: 'cxc3', cliente: 'TechSolutions Cía.', documento: 'FAC-001-001-000003', fecha_emision: '2024-03-14', fecha_vencimiento: '2024-04-13', monto_original: 3584.00, saldo_pendiente: 3584.00, estado: 'PENDIENTE', dias_mora: 0 },
    { id: 'cxc4', cliente: 'Consultoría M&A', documento: 'FAC-001-001-000004', fecha_emision: '2024-03-13', fecha_vencimiento: '2024-04-12', monto_original: 4816.00, saldo_pendiente: 4816.00, estado: 'PENDIENTE', dias_mora: 0 }
  ];

  const cuentasPagar = [
    { id: 'cxp1', proveedor: 'Servicios Integrales', documento: 'COM-001-001-000001', fecha_emision: '2024-03-10', fecha_vencimiento: '2024-04-09', monto_original: 1400.00, saldo_pendiente: 1400.00, estado: 'PENDIENTE', dias_mora: 0 }
  ];

  const cobros = [
    { id: 'cb1', numero: 'REC001', cliente: 'Distribuidora XYZ', fecha: '2024-03-15', factura: 'FAC-001-001-000001', monto: 500.00, forma_pago: '01 - Efectivo', estado: 'APLICADO' }
  ];

  const pagos = [];

  const bancos = [
    { id: 'b1', codigo: '001', nombre: 'Banco Pichincha', activo: true },
    { id: 'b2', codigo: '002', nombre: 'Banco del Pacífico', activo: true }
  ];

  const cuentasBancarias = [
    { id: 'cb1', banco: 'Banco Pichincha', numero: '001-1234567-89', tipo: 'CORRIENTE', moneda: 'USD', saldo_actual: 32450.00, activa: true }
  ];

  const cajas = [
    { id: 'cj1', codigo: 'CAJ01', nombre: 'Caja Principal', saldo_actual: 8500.00, activa: true },
    { id: 'cj2', codigo: 'CAJ02', nombre: 'Caja Chica', saldo_actual: 500.00, activa: true }
  ];

  const establecimientos = [
    { id: 'es1', codigo: '001', nombre: 'Matriz Quito', direccion: 'Av. República E7-123 y Amazonas', es_matriz: true, puntos_emision: 2, activo: true }
  ];

  const puntosEmision = [
    { id: 'pe1', establecimiento: '001', codigo: '001', descripcion: 'Caja Principal', tipo: 'FISICO', activo: true },
    { id: 'pe2', establecimiento: '001', codigo: '002', descripcion: 'Caja Secundaria', tipo: 'FISICO', activo: true }
  ];

  const secuenciales = [
    { id: 's1', establecimiento: '001', punto_emision: '001', tipo_comprobante: '01', siguiente: 5 },
    { id: 's2', establecimiento: '001', punto_emision: '001', tipo_comprobante: '04', siguiente: 3 }
  ];

  const rangosAutorizados = [
    { id: 'ra1', establecimiento: '001', punto_emision: '001', tipo_comprobante: '01', numero_autorizacion: '1234567890', desde: 1, hasta: 50, fecha_autorizacion: '2024-01-01', activo: true }
  ];

  const sesionesActivas = [
    { id: 'ss1', usuario: 'María González', dispositivo: 'Chrome / Windows 11', ip: '190.12.34.56', ultima_actividad: 'Hace 5 minutos' },
    { id: 'ss2', usuario: 'Carlos Méndez', dispositivo: 'Firefox / Windows 10', ip: '186.45.67.89', ultima_actividad: 'Hace 15 minutos' }
  ];

  // Roles operativos (los que el Admin puede asignar)
  const rolesOperativos = [
    { id: 'vendedor', nombre: 'Vendedor', descripcion: 'Gestión de ventas y clientes', usuarios: 1 },
    { id: 'cajero', nombre: 'Cajero', descripcion: 'Facturación y cobros', usuarios: 1 },
    { id: 'recursos_humanos', nombre: 'Recursos Humanos', descripcion: 'Gestión de personal', usuarios: 1 }
  ];

  const impuestosSRI = [
    { codigo: '1', descripcion: 'IVA', activo: true },
    { codigo: '2', descripcion: 'ICE', activo: true }
  ];

  const tarifasImpuestos = [
    { id: 'ti1', impuesto: 'IVA', codigo: '0', descripcion: 'Tarifa 0%', porcentaje: 0.00, activo: true },
    { id: 'ti2', impuesto: 'IVA', codigo: '2', descripcion: 'Tarifa 12%', porcentaje: 12.00, activo: true }
  ];

  const formasPagoSRI = [
    { codigo: '01', descripcion: 'EFECTIVO', activo: true },
    { codigo: '19', descripcion: 'TARJETA DE CRÉDITO', activo: true },
    { codigo: '20', descripcion: 'TRANSFERENCIA', activo: true }
  ];

  const tiposComprobanteSRI = [
    { codigo: '01', nombre: 'FACTURA', activo: true },
    { codigo: '04', nombre: 'NOTA DE CRÉDITO', activo: true },
    { codigo: '05', nombre: 'NOTA DE DÉBITO', activo: true },
    { codigo: '06', nombre: 'GUÍA DE REMISIÓN', activo: true },
    { codigo: '07', nombre: 'RETENCIÓN', activo: true }
  ];

  const notificaciones = [
    { id: 'n1', icon: 'fa-circle-info', type: 'info', text: 'Certificado digital expira en 15 días', time: 'Hace 2h', leida: false },
    { id: 'n2', icon: 'fa-circle-check', type: 'success', text: 'Factura #001-001-000004 autorizada', time: 'Hace 3h', leida: false },
    { id: 'n3', icon: 'fa-triangle-exclamation', type: 'warning', text: 'Stock crítico: Monitor Samsung', time: 'Hace 1d', leida: true }
  ];

  // ============================================
  // ESTADO
  // ============================================
  let currentSection = 'dashboard';
  let sidebarCollapsed = false;

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
      dateEl.textContent = today.toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  }

  // ============================================
  // ACCORDIONS - Dashboard abierto por defecto
  // ============================================
  function initializeAccordions() {
    const sections = ['dashboard-section', 'facturacion', 'datos-maestros', 'contabilidad', 'reportes', 'tesoreria', 'inventario', 'activos', 'rrhh', 'crm', 'estructura', 'seguridad-acceso'];
    
    sections.forEach(section => {
      const content = document.getElementById(`section-${section}`);
      const arrow = document.getElementById(`arrow-${section}`);
      
      if (content && arrow) {
        if (section === 'dashboard-section') {
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

  // ============================================
  // EVENT LISTENERS
  // ============================================
  function setupEventListeners() {
    const collapseBtn = document.getElementById('sidebar-collapse');
    if (collapseBtn) collapseBtn.addEventListener('click', toggleSidebar);

    const avatar = document.querySelector('.user-avatar');
    const userInfo = document.querySelector('.user-info');
    
    if (avatar) avatar.addEventListener('click', toggleUserMenu);
    if (userInfo) userInfo.addEventListener('click', toggleUserMenu);

    const notificationsBtn = document.querySelector('.notifications-badge');
    if (notificationsBtn) notificationsBtn.addEventListener('click', () => openModal('notifications'));

    document.addEventListener('click', function(e) {
      const userMenu = document.getElementById('user-dropdown');
      const avatar = document.querySelector('.user-avatar');
      const userInfo = document.querySelector('.user-info');
      
      if (userMenu && avatar && userInfo) {
        if (!avatar.contains(e.target) && !userInfo.contains(e.target) && !userMenu.contains(e.target)) {
          userMenu.classList.remove('open');
        }
      }
    });
  }

  // ============================================
  // FUNCIONES DE NAVEGACIÓN
  // ============================================
  function toggleSidebar() {
    sidebarCollapsed = !sidebarCollapsed;
    const sidebar = document.getElementById('sidebar');
    const icon = document.getElementById('collapse-icon');
    sidebar.classList.toggle('collapsed', sidebarCollapsed);
    if (icon) icon.className = sidebarCollapsed ? 'fas fa-chevron-right' : 'fas fa-chevron-left';
  }

  function toggleUserMenu() {
    const userMenu = document.getElementById('user-dropdown');
    if (userMenu) userMenu.classList.toggle('open');
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
      'dashboard': 'Dashboard Empresarial',
      'facturas-venta': 'Facturas Venta',
      'notas-credito': 'Notas Crédito',
      'notas-debito': 'Notas Débito',
      'retenciones': 'Retenciones',
      'guias-remision': 'Guías Remisión',
      'personas': 'Personas',
      'clientes': 'Clientes',
      'proveedores': 'Proveedores',
      'productos': 'Productos / Servicios',
      'categorias': 'Categorías (DEV)',
      'plan-cuentas': 'Plan de Cuentas',
      'asientos': 'Asientos Contables',
      'centros-costo': 'Centros de Costo',
      'proyectos': 'Proyectos (DEV)',
      'periodos-contables': 'Periodos Contables',
      'balance-general': 'Balance General',
      'estado-resultados': 'Estado de Resultados',
      'libro-mayor': 'Libro Mayor',
      'flujo-efectivo': 'Flujo Efectivo (DEV)',
      'cxc': 'Cuentas x Cobrar',
      'cxp': 'Cuentas x Pagar',
      'cobros': 'Cobros',
      'pagos': 'Pagos',
      'bancos': 'Bancos',
      'cuentas-bancarias': 'Cuentas Bancarias',
      'cajas': 'Cajas',
      'conciliaciones': 'Conciliaciones (DEV)',
      'establecimientos': 'Establecimientos',
      'puntos-emision': 'Puntos de Emisión',
      'secuenciales': 'Secuenciales',
      'rangos-autorizados': 'Rangos Autorizados',
      'usuarios-operativos': 'Usuarios Operativos',
      'roles-operativos': 'Roles Operativos',
      'sesiones-activas': 'Sesiones Activas',
      'mi-perfil': 'Mi Perfil',
      'preferencias': 'Preferencias',
      'configuracion-empresa': 'Configuración Empresa',
      'sri-config': 'Configuración SRI',
      'notificaciones-config': 'Notificaciones',
      'impuestos': 'Impuestos SRI',
      'tarifas-impuestos': 'Tarifas Impuestos',
      'formas-pago': 'Formas de Pago',
      'tipos-comprobante': 'Tipos de Comprobante',
      'empleados': 'Empleados (DEV)',
      'nominas': 'Nóminas (DEV)',
      'bodegas': 'Bodegas (DEV)',
      'kardex': 'Kardex (DEV)',
      'movimientos-inventario': 'Movimientos (DEV)',
      'activos-fijos': 'Activos Fijos (DEV)',
      'depreciaciones': 'Depreciaciones (DEV)',
      'cotizaciones': 'Cotizaciones (DEV)',
      'proformas': 'Proformas (DEV)'
    };
    
    const breadcrumb = document.getElementById('current-section');
    if (breadcrumb) breadcrumb.textContent = titles[section] || section;

    const container = document.getElementById('main-container');
    if (container) container.innerHTML = renderSection(section);
  }

  // ============================================
  // FUNCIÓN PRINCIPAL DE RENDERIZADO
  // ============================================
  function renderSection(section) {
    switch(section) {
      case 'dashboard': return renderDashboard();
      case 'facturas-venta': return renderFacturasVenta();
      case 'notas-credito': return renderNotasCredito();
      case 'notas-debito': return renderNotasDebito();
      case 'retenciones': return renderRetenciones();
      case 'guias-remision': return renderGuiasRemision();
      case 'personas': return renderPersonas();
      case 'clientes': return renderClientes();
      case 'proveedores': return renderProveedores();
      case 'productos': return renderProductos();
      case 'categorias': return renderCategorias();
      case 'plan-cuentas': return renderPlanCuentas();
      case 'asientos': return renderAsientos();
      case 'centros-costo': return renderCentrosCosto();
      case 'proyectos': return renderProyectos();
      case 'periodos-contables': return renderPeriodosContables();
      case 'balance-general': return renderBalanceGeneral();
      case 'estado-resultados': return renderEstadoResultados();
      case 'libro-mayor': return renderLibroMayor();
      case 'flujo-efectivo': return renderFlujoEfectivo();
      case 'cxc': return renderCxC();
      case 'cxp': return renderCxP();
      case 'cobros': return renderCobros();
      case 'pagos': return renderPagos();
      case 'bancos': return renderBancos();
      case 'cuentas-bancarias': return renderCuentasBancarias();
      case 'cajas': return renderCajas();
      case 'conciliaciones': return renderConciliaciones();
      case 'establecimientos': return renderEstablecimientos();
      case 'puntos-emision': return renderPuntosEmision();
      case 'secuenciales': return renderSecuenciales();
      case 'rangos-autorizados': return renderRangosAutorizados();
      case 'usuarios-operativos': return renderUsuariosOperativos();
      case 'roles-operativos': return renderRolesOperativos();
      case 'sesiones-activas': return renderSesionesActivas();
      case 'mi-perfil': return renderMiPerfil();
      case 'preferencias': return renderPreferencias();
      case 'configuracion-empresa': return renderConfiguracionEmpresa();
      case 'sri-config': return renderSriConfig();
      case 'notificaciones-config': return renderNotificacionesConfig();
      case 'impuestos': return renderImpuestosSRI();
      case 'tarifas-impuestos': return renderTarifasImpuestos();
      case 'formas-pago': return renderFormasPagoSRI();
      case 'tipos-comprobante': return renderTiposComprobanteSRI();
      case 'empleados': return renderEmpleados();
      case 'nominas': return renderNominas();
      case 'bodegas': return renderBodegas();
      case 'kardex': return renderKardex();
      case 'movimientos-inventario': return renderMovimientosInventario();
      case 'activos-fijos': return renderActivosFijos();
      case 'depreciaciones': return renderDepreciaciones();
      case 'cotizaciones': return renderCotizaciones();
      case 'proformas': return renderProformas();
      default: return renderDashboard();
    }
  }

  // ============================================
  // RENDERIZADO - DASHBOARD EMPRESARIAL
  // ============================================
  function renderDashboard() {
    const totalFacturado = facturas.reduce((s, f) => s + f.total, 0);
    const totalCxC = cuentasCobrar.reduce((s, c) => s + c.saldo_pendiente, 0);
    const totalCxP = cuentasPagar.reduce((s, c) => s + c.saldo_pendiente, 0);
    const facturasMes = facturas.length;
    const usuariosActivos = usuarios.filter(u => u.esta_activo).length;
    
    return `
      <div class="dashboard-container">
        <!-- Header -->
        <div class="page-header">
          <div>
            <h1 class="page-title">Dashboard Empresarial</h1>
            <p class="page-subtitle">TechCorp S.A. · RUC 1791234567001 · ${usuariosActivos} usuarios activos</p>
          </div>
          <div class="page-actions">
            <div class="dropdown">
              <button class="btn btn-secondary" onclick="toggleDropdown('report-dropdown')">
                <i class="fas fa-download"></i> Exportar Reporte <i class="fas fa-chevron-down"></i>
              </button>
              <div class="dropdown-menu" id="report-dropdown">
                <div class="dropdown-item" onclick="exportarPDF()"><i class="fas fa-file-pdf"></i> Exportar a PDF</div>
                <div class="dropdown-item" onclick="exportarExcel()"><i class="fas fa-file-excel"></i> Exportar a Excel</div>
              </div>
            </div>
            <button class="btn btn-primary" onclick="openModal('new-factura')">
              <i class="fas fa-plus"></i> Nueva Factura
            </button>
          </div>
        </div>

        <!-- Filtros Rápidos -->
        <div class="filters-panel">
          <div class="filters-header">
            <h3><i class="fas fa-filter"></i> Filtros de Reportes</h3>
            <button class="btn btn-text" onclick="limpiarFiltros()">Limpiar filtros</button>
          </div>
          <div class="filters-grid">
            <div class="filter-group">
              <label>Período</label>
              <select class="form-control">
                <option>Marzo 2024</option>
                <option>Febrero 2024</option>
                <option>Enero 2024</option>
                <option>Personalizado</option>
              </select>
            </div>
            <div class="filter-group">
              <label>Tipo de reporte</label>
              <select class="form-control">
                <option>General</option>
                <option>Ventas</option>
                <option>Compras</option>
                <option>Financiero</option>
              </select>
            </div>
          </div>
        </div>

        <!-- KPIs Principales -->
        <div class="kpi-grid">
          <div class="kpi-card" onclick="showSection('facturas-venta')">
            <div class="kpi-icon"><i class="fas fa-file-invoice"></i></div>
            <div class="kpi-content">
              <div class="kpi-value">${facturasMes}</div>
              <div class="kpi-label">Facturas este mes</div>
              <div class="kpi-trend positive"><i class="fas fa-arrow-up"></i> +2 vs mes anterior</div>
            </div>
          </div>
          <div class="kpi-card" onclick="showSection('cxc')">
            <div class="kpi-icon"><i class="fas fa-dollar-sign"></i></div>
            <div class="kpi-content">
              <div class="kpi-value">$${totalFacturado.toLocaleString()}</div>
              <div class="kpi-label">Total Facturado</div>
              <div class="kpi-trend positive"><i class="fas fa-arrow-up"></i> +15%</div>
            </div>
          </div>
          <div class="kpi-card" onclick="showSection('cxc')">
            <div class="kpi-icon"><i class="fas fa-hand-holding-dollar"></i></div>
            <div class="kpi-content">
              <div class="kpi-value">$${totalCxC.toLocaleString()}</div>
              <div class="kpi-label">Cuentas por Cobrar</div>
              <div class="kpi-trend neutral"><i class="fas fa-minus"></i> 4 facturas</div>
            </div>
          </div>
          <div class="kpi-card" onclick="showSection('cxp')">
            <div class="kpi-icon"><i class="fas fa-credit-card"></i></div>
            <div class="kpi-content">
              <div class="kpi-value">$${totalCxP.toLocaleString()}</div>
              <div class="kpi-label">Cuentas por Pagar</div>
              <div class="kpi-trend negative"><i class="fas fa-exclamation-triangle"></i> 1 factura</div>
            </div>
          </div>
          <div class="kpi-card" onclick="showSection('usuarios-operativos')">
            <div class="kpi-icon"><i class="fas fa-users"></i></div>
            <div class="kpi-content">
              <div class="kpi-value">${usuariosActivos}</div>
              <div class="kpi-label">Usuarios Activos</div>
              <div class="kpi-trend positive"><i class="fas fa-arrow-up"></i> 3 operativos</div>
            </div>
          </div>
          <div class="kpi-card" onclick="showSection('balance-general')">
            <div class="kpi-icon"><i class="fas fa-scale-balanced"></i></div>
            <div class="kpi-content">
              <div class="kpi-value">$41,702.56</div>
              <div class="kpi-label">Activo Total</div>
              <div class="kpi-trend positive"><i class="fas fa-arrow-up"></i> +5%</div>
            </div>
          </div>
        </div>

        <!-- Gráficas -->
        <div class="charts-grid">
          <div class="chart-card">
            <div class="chart-header">
              <h3>Ventas Mensuales</h3>
              <div class="chart-actions">
                <select class="form-control" style="width: 100px;">
                  <option>2024</option>
                  <option>2023</option>
                </select>
              </div>
            </div>
            <div class="chart-body">
              <canvas id="ventasChart" style="height: 250px;"></canvas>
            </div>
          </div>
          <div class="chart-card">
            <div class="chart-header">
              <h3>Ventas por Cliente</h3>
              <button class="btn btn-icon" onclick="exportarGrafico('clientes')"><i class="fas fa-download"></i></button>
            </div>
            <div class="chart-body">
              <canvas id="clientesChart" style="height: 250px;"></canvas>
            </div>
          </div>
        </div>

        <!-- Reportes Rápidos -->
        <div class="quick-reports">
          <div class="report-card" onclick="showSection('balance-general')">
            <div class="report-icon"><i class="fas fa-scale-balanced"></i></div>
            <div class="report-info">
              <h4>Balance General</h4>
              <p>Al 15 de marzo 2024</p>
            </div>
            <div class="report-value">$41,702.56</div>
          </div>
          <div class="report-card" onclick="showSection('estado-resultados')">
            <div class="report-icon"><i class="fas fa-chart-line"></i></div>
            <div class="report-info">
              <h4>Estado de Resultados</h4>
              <p>Utilidad del mes: $3,500</p>
            </div>
            <div class="report-value positive">+12%</div>
          </div>
          <div class="report-card" onclick="showSection('cxc')">
            <div class="report-icon"><i class="fas fa-clock"></i></div>
            <div class="report-info">
              <h4>Cuentas por Cobrar</h4>
              <p>Vencidas: $0</p>
            </div>
            <div class="report-value">$${totalCxC.toLocaleString()}</div>
          </div>
          <div class="report-card" onclick="showSection('productos')">
            <div class="report-icon"><i class="fas fa-box"></i></div>
            <div class="report-info">
              <h4>Stock Bajo</h4>
              <p>2 productos críticos</p>
            </div>
            <div class="report-value">⚠️</div>
          </div>
        </div>

        <!-- Últimas Facturas -->
        <div class="transactions-card">
          <div class="card-header">
            <h3>Últimas Facturas</h3>
            <div class="card-actions">
              <button class="btn btn-text" onclick="showSection('facturas-venta')">Ver todas</button>
            </div>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Documento</th>
                  <th>Cliente</th>
                  <th>Monto</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                ${facturas.slice(0, 5).map(f => `
                  <tr onclick="openModal('view-factura', '${f.numero}')">
                    <td>${f.fecha}</td>
                    <td class="mono">${f.numero}</td>
                    <td>${f.cliente}</td>
                    <td class="mono fw-600">$${f.total.toFixed(2)}</td>
                    <td><span class="badge ${f.estado === 'AUTORIZADA' ? 'badge-success' : f.estado === 'RECHAZADA' ? 'badge-danger' : 'badge-warning'}">${f.estado}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <script>
          setTimeout(() => {
            if (typeof Chart !== 'undefined') {
              new Chart(document.getElementById('ventasChart'), {
                type: 'line',
                data: {
                  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                  datasets: [{
                    label: 'Ventas 2024',
                    data: [18500, 22000, 10752, 0, 0, 0],
                    borderColor: '#E8833A',
                    backgroundColor: 'rgba(232, 131, 58, 0.1)',
                    tension: 0.4,
                    fill: true
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false
                }
              });

              new Chart(document.getElementById('clientesChart'), {
                type: 'doughnut',
                data: {
                  labels: ['Distribuidora XYZ', 'TechSolutions', 'Consultoría M&A', 'Servicios Integrales'],
                  datasets: [{
                    data: [1400, 3584, 4816, 953],
                    backgroundColor: ['#E8833A', '#27AE60', '#2979FF', '#FFB300']
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
          }, 100);
        </script>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - CLIENTES
  // ============================================
  function renderClientes() {
    const clientes = personas.filter(p => p.es_cliente);
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

      <div class="filters-panel">
        <div class="filters-grid" style="grid-template-columns: repeat(3, 1fr);">
          <div class="filter-group">
            <label>Buscar</label>
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Nombre o RUC...">
            </div>
          </div>
          <div class="filter-group">
            <label>Ciudad</label>
            <select class="form-control">
              <option>Todas</option>
              <option>Quito</option>
              <option>Guayaquil</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Estado</label>
            <select class="form-control">
              <option>Todos</option>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </div>
        </div>
        <div class="search-actions">
          <button class="btn btn-primary"><i class="fas fa-search"></i> Buscar</button>
          <button class="btn btn-text">Limpiar</button>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox"></th>
                <th>RUC/Cédula</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Ciudad</th>
                <th>Límite Crédito</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${clientes.map(c => `
                <tr>
                  <td><input type="checkbox"></td>
                  <td class="mono fw-600">${c.identificacion}</td>
                  <td>${c.nombre}</td>
                  <td>${c.email}</td>
                  <td>${c.telefono}</td>
                  <td>${c.ciudad}</td>
                  <td class="mono">$${c.limite_credito.toFixed(2)}</td>
                  <td><span class="badge badge-success">${c.estado}</span></td>
                  <td>
                    <div class="action-buttons">
                      <button class="btn btn-icon" onclick="openModal('view-cliente', '${c.id}')" title="Ver"><i class="fas fa-eye"></i></button>
                      <button class="btn btn-icon" onclick="openModal('edit-cliente', '${c.id}')" title="Editar"><i class="fas fa-edit"></i></button>
                      <button class="btn btn-icon" onclick="openModal('historial-cliente', '${c.id}')" title="Historial"><i class="fas fa-history"></i></button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${clientes.length} de ${clientes.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - PROVEEDORES
  // ============================================
  function renderProveedores() {
    const proveedores = personas.filter(p => p.es_proveedor);
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Proveedores</h1>
          <p class="page-subtitle">${proveedores.length} proveedores registrados</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-proveedor')">
            <i class="fas fa-plus"></i> Nuevo Proveedor
          </button>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>RUC</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Ciudad</th>
                <th>Plazo Pago</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${proveedores.map(p => `
                <tr>
                  <td class="mono fw-600">${p.identificacion}</td>
                  <td>${p.nombre}</td>
                  <td>${p.email}</td>
                  <td>${p.telefono}</td>
                  <td>${p.ciudad}</td>
                  <td>${p.plazo_pago} días</td>
                  <td><span class="badge badge-success">${p.estado}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${proveedores.length} de ${proveedores.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - USUARIOS OPERATIVOS
  // ============================================
  function renderUsuariosOperativos() {
    const operativos = usuarios.filter(u => u.roles.includes('operativo'));
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Usuarios Operativos</h1>
          <p class="page-subtitle">${operativos.length} usuarios operativos en TechCorp</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-usuario-operativo')">
            <i class="fas fa-plus"></i> Nuevo Usuario
          </button>
        </div>
      </div>

      <div class="filters-panel">
        <div class="filters-grid" style="grid-template-columns: repeat(3, 1fr);">
          <div class="filter-group">
            <label>Buscar</label>
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Nombre o email...">
            </div>
          </div>
          <div class="filter-group">
            <label>Rol Operativo</label>
            <select class="form-control">
              <option>Todos</option>
              ${rolesOperativos.map(r => `<option>${r.nombre}</option>`).join('')}
            </select>
          </div>
          <div class="filter-group">
            <label>Estado</label>
            <select class="form-control">
              <option>Todos</option>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </div>
        </div>
        <div class="search-actions">
          <button class="btn btn-primary"><i class="fas fa-search"></i> Buscar</button>
          <button class="btn btn-text">Limpiar</button>
        </div>
      </div>

      <div class="summary-cards" style="margin-bottom: 20px;">
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-users"></i></div>
          <div class="summary-value">${operativos.length}</div>
          <div class="summary-label">Total Operativos</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-check-circle"></i></div>
          <div class="summary-value">${operativos.filter(u => u.esta_activo).length}</div>
          <div class="summary-label">Activos</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-clock"></i></div>
          <div class="summary-value">${operativos.filter(u => !u.esta_activo).length}</div>
          <div class="summary-label">Inactivos</div>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox"></th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Rol Operativo</th>
                <th>Teléfono</th>
                <th>Última Conexión</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${operativos.map(u => {
                const rolNombre = rolesOperativos.find(r => r.id === u.tipo_operativo)?.nombre || '-';
                return `
                  <tr>
                    <td><input type="checkbox"></td>
                    <td class="fw-600">${u.nombre} ${u.apellido}</td>
                    <td>${u.email}</td>
                    <td><span class="badge badge-primary">${rolNombre}</span></td>
                    <td>${u.telefono}</td>
                    <td>${u.ultima_conexion || 'Nunca'}</td>
                    <td><span class="badge ${u.esta_activo ? 'badge-success' : 'badge-danger'}">${u.esta_activo ? 'Activo' : 'Inactivo'}</span></td>
                    <td>
                      <div class="action-buttons">
                        <button class="btn btn-icon" onclick="openModal('edit-usuario', '${u.id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-icon" onclick="openModal('reset-password', '${u.id}')"><i class="fas fa-key"></i></button>
                        <button class="btn btn-icon" onclick="toggleUserStatus('${u.id}')">
                          <i class="fas ${u.esta_activo ? 'fa-ban' : 'fa-play'}"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${operativos.length} de ${operativos.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - ROLES OPERATIVOS
  // ============================================
  function renderRolesOperativos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Roles Operativos</h1>
          <p class="page-subtitle">Gestiona los tipos de usuarios operativos</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-rol-operativo')">
            <i class="fas fa-plus"></i> Nuevo Rol
          </button>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Rol</th>
                <th>Descripción</th>
                <th>Usuarios</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${rolesOperativos.map(r => `
                <tr>
                  <td class="fw-600">${r.nombre}</td>
                  <td>${r.descripcion}</td>
                  <td>${r.usuarios}</td>
                  <td>
                    <button class="btn btn-icon" onclick="openModal('edit-rol', '${r.id}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon" onclick="openModal('permisos-rol', '${r.id}')"><i class="fas fa-key"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card" style="margin-top: 24px;">
        <div class="card-header">
          <h3 class="card-title">Permisos por Defecto</h3>
        </div>
        <div class="card-body">
          <p class="mb-3">Los roles operativos tienen acceso limitado a las siguientes funcionalidades:</p>
          <ul style="margin-left: 20px;">
            <li>Facturación (crear y ver sus propias facturas)</li>
            <li>Clientes (ver y crear)</li>
            <li>Productos (ver)</li>
            <li>Reportes básicos</li>
          </ul>
        </div>
      </div>
    `;
  }

  // ============================================
  // FUNCIONES AUXILIARES (adaptadas de Super Admin)
  // ============================================
  function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    if (dropdown) dropdown.classList.toggle('open');
  }

  function toggleSeccion(id) {
    const content = document.getElementById(id);
    const header = content.previousElementSibling;
    const icon = header.querySelector('i');
    
    if (content.style.display === 'none') {
      content.style.display = 'block';
      icon.classList.remove('fa-chevron-right');
      icon.classList.add('fa-chevron-down');
      header.classList.remove('collapsed');
    } else {
      content.style.display = 'none';
      icon.classList.remove('fa-chevron-down');
      icon.classList.add('fa-chevron-right');
      header.classList.add('collapsed');
    }
  }

  function toggleSubseccion(id) {
    const content = document.getElementById(id);
    const header = content.previousElementSibling;
    const icon = header.querySelector('i');
    
    if (content.style.display === 'none') {
      content.style.display = 'block';
      icon.classList.remove('fa-chevron-right');
      icon.classList.add('fa-chevron-down');
      header.classList.remove('collapsed');
    } else {
      content.style.display = 'none';
      icon.classList.remove('fa-chevron-down');
      icon.classList.add('fa-chevron-right');
      header.classList.add('collapsed');
    }
  }

  // ============================================
  // FUNCIONES DE MODAL (simplificadas)
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
    } else if (type === 'new-factura') {
      title.innerHTML = 'Nueva Factura';
      body.innerHTML = `
        <form class="modal-form">
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Cliente</label>
              <select class="form-control">
                ${personas.filter(p => p.es_cliente).map(c => `<option>${c.nombre}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Fecha</label>
              <input type="date" class="form-control" value="${new Date().toISOString().split('T')[0]}">
            </div>
            <div class="form-group">
              <label class="form-label">Producto</label>
              <select class="form-control">
                ${productos.map(p => `<option>${p.nombre} - $${p.precio_venta}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Cantidad</label>
              <input type="number" class="form-control" value="1">
            </div>
          </div>
        </form>
      `;
      footer.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="closeModal()">Crear Factura</button>
      `;
    } else if (type === 'new-usuario-operativo') {
      title.innerHTML = 'Nuevo Usuario Operativo';
      body.innerHTML = `
        <form class="modal-form">
          <div class="form-group">
            <label class="form-label">Nombres</label>
            <input class="form-control" placeholder="Ej: Juan Carlos">
          </div>
          <div class="form-group">
            <label class="form-label">Apellidos</label>
            <input class="form-control" placeholder="Ej: Pérez Méndez">
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" placeholder="ejemplo@techcorp.com">
          </div>
          <div class="form-group">
            <label class="form-label">Teléfono</label>
            <input class="form-control" placeholder="0991234567">
          </div>
          <div class="form-group">
            <label class="form-label">Rol Operativo</label>
            <select class="form-control">
              ${rolesOperativos.map(r => `<option value="${r.id}">${r.nombre}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-check">
              <input type="checkbox" checked> Enviar invitación por email
            </label>
          </div>
        </form>
      `;
      footer.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="closeModal()">Crear Usuario</button>
      `;
    } else if (type === 'view-factura' && id) {
      const factura = facturas.find(f => f.numero === id);
      title.innerHTML = `Factura ${id}`;
      body.innerHTML = `
        <div class="factura-detalle">
          <p><strong>Cliente:</strong> ${factura.cliente}</p>
          <p><strong>RUC:</strong> ${factura.ruc}</p>
          <p><strong>Fecha:</strong> ${factura.fecha}</p>
          <p><strong>Subtotal:</strong> $${factura.subtotal.toFixed(2)}</p>
          <p><strong>IVA:</strong> $${factura.iva.toFixed(2)}</p>
          <p><strong>Total:</strong> $${factura.total.toFixed(2)}</p>
          <p><strong>Estado:</strong> <span class="badge badge-success">${factura.estado}</span></p>
          <p><strong>Vendedor:</strong> ${factura.vendedor}</p>
        </div>
      `;
      footer.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cerrar</button>
        <button class="btn btn-primary"><i class="fas fa-file-pdf"></i> PDF</button>
      `;
    } else {
      title.innerHTML = 'Nuevo registro';
      body.innerHTML = '<p class="text-center" style="padding: 32px;">Formulario en construcción</p>';
      footer.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="closeModal()">Guardar</button>
      `;
    }

    modal.classList.add('open');
  }

  function renderNotificationsModal() {
    return `
      <div class="notifications-list">
        ${notificaciones.map(n => `
          <div class="notification-item ${n.leida ? 'read' : 'unread'}">
            <div class="notification-icon ${n.type}">
              <i class="fas ${n.icon}"></i>
            </div>
            <div class="notification-content">
              <div class="notification-text">${n.text}</div>
              <div class="notification-time">${n.time}</div>
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

  // ============================================
  // REUTILIZAR FUNCIONES DE RENDERIZADO DEL SUPER ADMIN (con datos filtrados)
  // ============================================
  
  // Facturas Venta (adaptada)
  function renderFacturasVenta() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Facturas de Venta</h1>
          <p class="page-subtitle">${facturas.length} facturas emitidas</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-factura')">
            <i class="fas fa-plus"></i> Nueva Factura
          </button>
        </div>
      </div>

      <div class="filters-panel">
        <div class="filters-grid" style="grid-template-columns: repeat(4, 1fr);">
          <div class="filter-group">
            <label>Buscar</label>
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Número, cliente...">
            </div>
          </div>
          <div class="filter-group">
            <label>Fecha desde</label>
            <input type="date" class="form-control" value="2024-03-01">
          </div>
          <div class="filter-group">
            <label>Fecha hasta</label>
            <input type="date" class="form-control" value="2024-03-31">
          </div>
          <div class="filter-group">
            <label>Estado</label>
            <select class="form-control">
              <option>Todos</option>
              <option>AUTORIZADA</option>
              <option>PENDIENTE</option>
            </select>
          </div>
        </div>
        <div class="search-actions">
          <button class="btn btn-primary"><i class="fas fa-search"></i> Buscar</button>
          <button class="btn btn-text">Limpiar</button>
        </div>
      </div>

      <div class="summary-cards">
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-check-circle"></i></div>
          <div class="summary-value">${facturas.filter(f => f.estado === 'AUTORIZADA').length}</div>
          <div class="summary-label">Autorizadas</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-clock"></i></div>
          <div class="summary-value">${facturas.filter(f => f.estado === 'PENDIENTE').length}</div>
          <div class="summary-label">Pendientes</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-dollar-sign"></i></div>
          <div class="summary-value">$${facturas.reduce((s, f) => s + f.total, 0).toLocaleString()}</div>
          <div class="summary-label">Total Facturado</div>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>RUC</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${facturas.map(f => `
                <tr>
                  <td class="mono fw-600">${f.numero}</td>
                  <td>${f.fecha}</td>
                  <td>${f.cliente}</td>
                  <td class="mono">${f.ruc}</td>
                  <td class="mono fw-600">$${f.total.toFixed(2)}</td>
                  <td><span class="badge ${f.estado === 'AUTORIZADA' ? 'badge-success' : 'badge-warning'}">${f.estado}</span></td>
                  <td>
                    <div class="action-buttons">
                      <button class="btn btn-icon" onclick="openModal('view-factura', '${f.numero}')"><i class="fas fa-eye"></i></button>
                      <button class="btn btn-icon" onclick="descargarPDF('${f.numero}')"><i class="fas fa-file-pdf"></i></button>
                      <button class="btn btn-icon" onclick="enviarEmail('${f.numero}')"><i class="fas fa-envelope"></i></button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${facturas.length} de ${facturas.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // Notas Crédito
  function renderNotasCredito() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Notas de Crédito</h1>
          <p class="page-subtitle">${notasCredito.length} notas de crédito</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-nota-credito')">
            <i class="fas fa-plus"></i> Nueva Nota
          </button>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Fecha</th>
                <th>Factura Origen</th>
                <th>Cliente</th>
                <th>Motivo</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${notasCredito.map(n => `
                <tr>
                  <td class="mono fw-600">${n.numero}</td>
                  <td>${n.fecha}</td>
                  <td class="mono">${n.factura_origen}</td>
                  <td>${n.cliente}</td>
                  <td>${n.motivo}</td>
                  <td class="mono fw-600">$${n.total.toFixed(2)}</td>
                  <td><span class="badge badge-success">${n.estado}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Notas Débito
  function renderNotasDebito() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Notas de Débito</h1>
          <p class="page-subtitle">${notasDebito.length} notas de débito</p>
        </div>
      </div>
      <div class="empty-state">
        <div class="empty-icon"><i class="fas fa-file-invoice"></i></div>
        <div class="empty-title">No hay notas de débito</div>
        <div class="empty-description">Las notas de débito aparecerán aquí cuando se generen.</div>
      </div>
    `;
  }

  // Retenciones
  function renderRetenciones() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Retenciones</h1>
          <p class="page-subtitle">${retenciones.length} comprobantes</p>
        </div>
      </div>
      <div class="empty-state">
        <div class="empty-icon"><i class="fas fa-receipt"></i></div>
        <div class="empty-title">No hay retenciones</div>
        <div class="empty-description">Las retenciones aparecerán aquí cuando se registren.</div>
      </div>
    `;
  }

  // Guías Remisión
  function renderGuiasRemision() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Guías de Remisión</h1>
          <p class="page-subtitle">${guiasRemision.length} guías</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-guia')">
            <i class="fas fa-plus"></i> Nueva Guía
          </button>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Fecha</th>
                <th>Destino</th>
                <th>Motivo</th>
                <th>Productos</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${guiasRemision.map(g => `
                <tr>
                  <td class="mono fw-600">${g.numero}</td>
                  <td>${g.fecha_inicio}</td>
                  <td>${g.destino}</td>
                  <td>${g.motivo}</td>
                  <td>${g.productos}</td>
                  <td><span class="badge badge-success">${g.estado}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Personas
  function renderPersonas() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Personas</h1>
          <p class="page-subtitle">${personas.length} personas registradas</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-persona')">
            <i class="fas fa-plus"></i> Nueva Persona
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
                <th>Tipo</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Ciudad</th>
                <th>Cliente</th>
                <th>Proveedor</th>
              </tr>
            </thead>
            <tbody>
              ${personas.map(p => `
                <tr>
                  <td class="mono fw-600">${p.identificacion}</td>
                  <td>${p.nombre}</td>
                  <td><span class="badge badge-info">${p.tipo}</span></td>
                  <td>${p.email}</td>
                  <td>${p.telefono}</td>
                  <td>${p.ciudad}</td>
                  <td>${p.es_cliente ? '✅' : '❌'}</td>
                  <td>${p.es_proveedor ? '✅' : '❌'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Productos
  function renderProductos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Productos / Servicios</h1>
          <p class="page-subtitle">${productos.length} ítems</p>
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
                <th>Categoría</th>
                <th>Tipo</th>
                <th>Stock</th>
                <th>Precio Venta</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${productos.map(p => `
                <tr>
                  <td class="mono fw-600">${p.codigo}</td>
                  <td>${p.nombre}</td>
                  <td>${p.categoria}</td>
                  <td><span class="badge badge-primary">${p.tipo}</span></td>
                  <td class="mono ${p.stock <= p.stock_minimo ? 'text-danger fw-600' : ''}">${p.stock}</td>
                  <td class="mono">$${p.precio_venta.toFixed(2)}</td>
                  <td><span class="badge badge-success">${p.estado}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Categorías (DEV)
  function renderCategorias() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Categorías</h1>
          <p class="page-subtitle">${categorias.length} categorías</p>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>
      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo en desarrollo. Próximamente disponible.</span>
      </div>
    `;
  }

  // Plan de Cuentas
  function renderPlanCuentas() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Plan de Cuentas</h1>
          <p class="page-subtitle">${planCuentas.length} cuentas contables</p>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Nivel</th>
                <th>Naturaleza</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              ${planCuentas.map(c => `
                <tr>
                  <td class="mono fw-600">${c.codigo}</td>
                  <td>${c.nombre}</td>
                  <td>${c.nivel}</td>
                  <td><span class="badge ${c.naturaleza === 'DEUDORA' ? 'badge-info' : 'badge-warning'}">${c.naturaleza}</span></td>
                  <td class="mono">${c.saldo ? '$' + c.saldo.toFixed(2) : '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Asientos Contables
  function renderAsientos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Asientos Contables</h1>
          <p class="page-subtitle">${asientos.length} asientos</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-asiento')">
            <i class="fas fa-plus"></i> Nuevo Asiento
          </button>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>Fecha</th>
                <th>Glosa</th>
                <th>Tipo</th>
                <th>Debe</th>
                <th>Haber</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${asientos.map(a => `
                <tr>
                  <td class="mono fw-600">${a.numero}</td>
                  <td>${a.fecha}</td>
                  <td>${a.glosa}</td>
                  <td><span class="badge badge-primary">${a.tipo}</span></td>
                  <td class="mono">$${a.debe.toFixed(2)}</td>
                  <td class="mono">$${a.haber.toFixed(2)}</td>
                  <td><span class="badge badge-success">${a.estado}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Centros de Costo
  function renderCentrosCosto() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Centros de Costo</h1>
          <p class="page-subtitle">${centrosCosto.length} centros</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-centro')">
            <i class="fas fa-plus"></i> Nuevo Centro
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
                <th>Presupuesto</th>
                <th>Ejecutado</th>
                <th>%</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${centrosCosto.map(c => {
                const porcentaje = (c.ejecutado / c.presupuesto * 100).toFixed(1);
                return `
                  <tr>
                    <td class="mono fw-600">${c.codigo}</td>
                    <td>${c.nombre}</td>
                    <td class="mono">$${c.presupuesto.toFixed(2)}</td>
                    <td class="mono">$${c.ejecutado.toFixed(2)}</td>
                    <td>${porcentaje}%</td>
                    <td><span class="badge badge-success">${c.estado}</span></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Proyectos (DEV)
  function renderProyectos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Proyectos</h1>
          <p class="page-subtitle">${proyectos.length} proyectos</p>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>
      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo en desarrollo.</span>
      </div>
    `;
  }

  // Periodos Contables
  function renderPeriodosContables() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Periodos Contables</h1>
        </div>
      </div>
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Año</th>
                <th>Mes</th>
                <th>Estado</th>
                <th>Asientos</th>
                <th>Total Debe</th>
                <th>Total Haber</th>
              </tr>
            </thead>
            <tbody>
              ${periodosContables.map(p => `
                <tr>
                  <td>${p.anio}</td>
                  <td>${p.mes}</td>
                  <td><span class="badge badge-success">${p.estado}</span></td>
                  <td>${p.total_asientos}</td>
                  <td class="mono">$${p.total_debe.toFixed(2)}</td>
                  <td class="mono">$${p.total_haber.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Balance General
  function renderBalanceGeneral() {
    const activos = planCuentas.filter(c => c.codigo.startsWith('1') && c.saldo).reduce((s, c) => s + (c.saldo || 0), 0);
    const pasivos = planCuentas.filter(c => c.codigo.startsWith('2') && c.saldo).reduce((s, c) => s + (c.saldo || 0), 0);
    const patrimonio = activos - pasivos;
    
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Balance General</h1>
          <p class="page-subtitle">Al 15 de marzo de 2024</p>
        </div>
      </div>

      <div class="balance-container">
        <div class="balance-section">
          <div class="section-header">
            <h2>ACTIVO</h2>
            <span class="section-total">$${activos.toLocaleString()}</span>
          </div>
          <div class="subseccion-content">
            <table class="balance-table">
              <tbody>
                ${planCuentas.filter(c => c.codigo.startsWith('1') && c.saldo).map(c => `
                  <tr>
                    <td class="cuenta-codigo">${c.codigo}</td>
                    <td class="cuenta-nombre">${c.nombre}</td>
                    <td class="cuenta-saldo">$${c.saldo.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="balance-section">
          <div class="section-header">
            <h2>PASIVO</h2>
            <span class="section-total">$${pasivos.toLocaleString()}</span>
          </div>
          <div class="subseccion-content">
            <table class="balance-table">
              <tbody>
                ${planCuentas.filter(c => c.codigo.startsWith('2') && c.saldo).map(c => `
                  <tr>
                    <td class="cuenta-codigo">${c.codigo}</td>
                    <td class="cuenta-nombre">${c.nombre}</td>
                    <td class="cuenta-saldo">$${c.saldo.toFixed(2)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="balance-section">
          <div class="section-header">
            <h2>PATRIMONIO</h2>
            <span class="section-total">$${patrimonio.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div class="ecuacion-card">
        <div class="ecuacion-item">
          <span class="ecuacion-label">ACTIVO</span>
          <span class="ecuacion-valor">$${activos.toLocaleString()}</span>
        </div>
        <div class="ecuacion-signo">=</div>
        <div class="ecuacion-item">
          <span class="ecuacion-label">PASIVO</span>
          <span class="ecuacion-valor">$${pasivos.toLocaleString()}</span>
        </div>
        <div class="ecuacion-signo">+</div>
        <div class="ecuacion-item">
          <span class="ecuacion-label">PATRIMONIO</span>
          <span class="ecuacion-valor">$${patrimonio.toLocaleString()}</span>
        </div>
        <div class="ecuacion-verificacion valid">
          <i class="fas fa-check-circle"></i> Balance Verificado
        </div>
      </div>
    `;
  }

  // Estado de Resultados
  function renderEstadoResultados() {
    const ingresos = 10752.56; // Total facturado marzo
    const gastos = 1400.00; // Cuentas por pagar
    const utilidad = ingresos - gastos;
    
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Estado de Resultados</h1>
          <p class="page-subtitle">Del 1 al 15 de marzo de 2024</p>
        </div>
      </div>

      <div class="resultados-container">
        <div class="resultados-section">
          <div class="section-header">
            <h2>INGRESOS</h2>
            <span class="section-total">$${ingresos.toLocaleString()}</span>
          </div>
          <div class="section-content">
            <table class="resultados-table">
              <tbody>
                <tr>
                  <td>Ventas de productos</td>
                  <td class="mono">$${ingresos.toFixed(2)}</td>
                </tr>
                <tr class="total-row">
                  <td>TOTAL INGRESOS</td>
                  <td class="mono fw-700">$${ingresos.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="resultados-section">
          <div class="section-header">
            <h2>GASTOS</h2>
            <span class="section-total">$${gastos.toLocaleString()}</span>
          </div>
          <div class="section-content">
            <table class="resultados-table">
              <tbody>
                <tr>
                  <td>Compras</td>
                  <td class="mono">$${gastos.toFixed(2)}</td>
                </tr>
                <tr class="total-row">
                  <td>TOTAL GASTOS</td>
                  <td class="mono fw-700">$${gastos.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="resultados-neta positiva">
          <div class="neta-label">UTILIDAD DEL PERÍODO</div>
          <div class="neta-valor">$${utilidad.toLocaleString()}</div>
          <div class="neta-ratio">Margen: ${((utilidad / ingresos) * 100).toFixed(2)}%</div>
        </div>
      </div>
    `;
  }

  // Libro Mayor
  function renderLibroMayor() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Libro Mayor</h1>
          <p class="page-subtitle">Movimientos por cuenta</p>
        </div>
      </div>
      <div class="empty-state">
        <div class="empty-icon"><i class="fas fa-book-open"></i></div>
        <div class="empty-title">Selecciona una cuenta</div>
        <div class="empty-description">Elige una cuenta del plan de cuentas para ver sus movimientos.</div>
      </div>
    `;
  }

  // Flujo Efectivo (DEV)
  function renderFlujoEfectivo() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Flujo de Efectivo</h1>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>
      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo en desarrollo.</span>
      </div>
    `;
  }

  // Cuentas por Cobrar
  function renderCxC() {
    const totalPendiente = cuentasCobrar.reduce((s, c) => s + c.saldo_pendiente, 0);
    
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Cuentas por Cobrar</h1>
          <p class="page-subtitle">${cuentasCobrar.length} facturas pendientes</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-cobro')">
            <i class="fas fa-plus"></i> Registrar Cobro
          </button>
        </div>
      </div>

      <div class="cartera-resumen">
        <div class="resumen-card total">
          <div class="resumen-icon"><i class="fas fa-dollar-sign"></i></div>
          <div class="resumen-content">
            <div class="resumen-label">Total por Cobrar</div>
            <div class="resumen-valor">$${totalPendiente.toFixed(2)}</div>
          </div>
        </div>
        <div class="resumen-card clientes">
          <div class="resumen-icon"><i class="fas fa-users"></i></div>
          <div class="resumen-content">
            <div class="resumen-label">Clientes</div>
            <div class="resumen-valor">${new Set(cuentasCobrar.map(c => c.cliente)).size}</div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table class="cxc-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Documento</th>
                <th>Fecha Emisión</th>
                <th>Fecha Venc.</th>
                <th>Monto</th>
                <th>Saldo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${cuentasCobrar.map(c => `
                <tr>
                  <td class="fw-600">${c.cliente}</td>
                  <td class="mono">${c.documento}</td>
                  <td>${c.fecha_emision}</td>
                  <td>${c.fecha_vencimiento}</td>
                  <td class="mono">$${c.monto_original.toFixed(2)}</td>
                  <td class="mono fw-600">$${c.saldo_pendiente.toFixed(2)}</td>
                  <td><span class="badge badge-warning">${c.estado}</span></td>
                  <td>
                    <button class="btn btn-success btn-sm" onclick="openModal('registrar-cobro', '${c.documento}')">Cobrar</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Cuentas por Pagar
  function renderCxP() {
    const totalPendiente = cuentasPagar.reduce((s, c) => s + c.saldo_pendiente, 0);
    
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Cuentas por Pagar</h1>
          <p class="page-subtitle">${cuentasPagar.length} facturas pendientes</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-pago')">
            <i class="fas fa-plus"></i> Registrar Pago
          </button>
        </div>
      </div>

      <div class="summary-cards">
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-dollar-sign"></i></div>
          <div class="summary-value">$${totalPendiente.toFixed(2)}</div>
          <div class="summary-label">Total por Pagar</div>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Proveedor</th>
                <th>Documento</th>
                <th>Fecha Emisión</th>
                <th>Fecha Venc.</th>
                <th>Monto</th>
                <th>Saldo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${cuentasPagar.map(c => `
                <tr>
                  <td class="fw-600">${c.proveedor}</td>
                  <td class="mono">${c.documento}</td>
                  <td>${c.fecha_emision}</td>
                  <td>${c.fecha_vencimiento}</td>
                  <td class="mono">$${c.monto_original.toFixed(2)}</td>
                  <td class="mono fw-600">$${c.saldo_pendiente.toFixed(2)}</td>
                  <td>
                    <button class="btn btn-primary btn-sm" onclick="openModal('registrar-pago', '${c.documento}')">Pagar</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Cobros
  function renderCobros() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Cobros</h1>
          <p class="page-subtitle">${cobros.length} cobros registrados</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-cobro')">
            <i class="fas fa-plus"></i> Nuevo Cobro
          </button>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Factura</th>
                <th>Monto</th>
                <th>Forma Pago</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${cobros.map(c => `
                <tr>
                  <td class="mono fw-600">${c.numero}</td>
                  <td>${c.fecha}</td>
                  <td>${c.cliente}</td>
                  <td class="mono">${c.factura}</td>
                  <td class="mono fw-600">$${c.monto.toFixed(2)}</td>
                  <td>${c.forma_pago}</td>
                  <td><span class="badge badge-success">${c.estado}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Pagos
  function renderPagos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Pagos</h1>
          <p class="page-subtitle">${pagos.length} pagos registrados</p>
        </div>
      </div>
      <div class="empty-state">
        <div class="empty-icon"><i class="fas fa-money-bill-transfer"></i></div>
        <div class="empty-title">No hay pagos registrados</div>
      </div>
    `;
  }

  // Bancos
  function renderBancos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Bancos</h1>
        </div>
      </div>
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${bancos.map(b => `
                <tr>
                  <td class="mono fw-600">${b.codigo}</td>
                  <td>${b.nombre}</td>
                  <td><span class="badge ${b.activo ? 'badge-success' : 'badge-danger'}">${b.activo ? 'Activo' : 'Inactivo'}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Cuentas Bancarias
  function renderCuentasBancarias() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Cuentas Bancarias</h1>
          <p class="page-subtitle">${cuentasBancarias.length} cuentas</p>
        </div>
      </div>
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Banco</th>
                <th>Número</th>
                <th>Tipo</th>
                <th>Saldo Actual</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${cuentasBancarias.map(c => `
                <tr>
                  <td class="fw-600">${c.banco}</td>
                  <td class="mono">${c.numero}</td>
                  <td>${c.tipo}</td>
                  <td class="mono fw-600">$${c.saldo_actual.toFixed(2)}</td>
                  <td><span class="badge badge-success">Activa</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Cajas
  function renderCajas() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Cajas</h1>
          <p class="page-subtitle">${cajas.length} cajas</p>
        </div>
      </div>
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Saldo Actual</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${cajas.map(c => `
                <tr>
                  <td class="mono fw-600">${c.codigo}</td>
                  <td>${c.nombre}</td>
                  <td class="mono fw-600">$${c.saldo_actual.toFixed(2)}</td>
                  <td><span class="badge badge-success">Activa</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Conciliaciones (DEV)
  function renderConciliaciones() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Conciliaciones</h1>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>
      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo en desarrollo.</span>
      </div>
    `;
  }

  // Establecimientos
  function renderEstablecimientos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Establecimientos</h1>
          <p class="page-subtitle">${establecimientos.length} establecimientos</p>
        </div>
      </div>
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Matriz</th>
                <th>Puntos Emisión</th>
              </tr>
            </thead>
            <tbody>
              ${establecimientos.map(e => `
                <tr>
                  <td class="mono fw-600">${e.codigo}</td>
                  <td>${e.nombre}</td>
                  <td>${e.direccion}</td>
                  <td>${e.es_matriz ? '✅' : '❌'}</td>
                  <td>${e.puntos_emision}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Puntos de Emisión
  function renderPuntosEmision() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Puntos de Emisión</h1>
          <p class="page-subtitle">${puntosEmision.length} puntos</p>
        </div>
      </div>
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Establecimiento</th>
                <th>Código</th>
                <th>Descripción</th>
                <th>Tipo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${puntosEmision.map(p => `
                <tr>
                  <td class="fw-600">${p.establecimiento}</td>
                  <td class="mono">${p.codigo}</td>
                  <td>${p.descripcion}</td>
                  <td><span class="badge badge-primary">${p.tipo}</span></td>
                  <td><span class="badge badge-success">Activo</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Secuenciales
  function renderSecuenciales() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Secuenciales</h1>
        </div>
      </div>
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Establecimiento</th>
                <th>Punto</th>
                <th>Tipo</th>
                <th>Siguiente</th>
              </tr>
            </thead>
            <tbody>
              ${secuenciales.map(s => `
                <tr>
                  <td class="fw-600">${s.establecimiento}</td>
                  <td class="mono">${s.punto_emision}</td>
                  <td>${s.tipo_comprobante === '01' ? 'Factura' : 'Nota Crédito'}</td>
                  <td class="mono fw-600">${s.siguiente}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Rangos Autorizados
  function renderRangosAutorizados() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Rangos Autorizados SRI</h1>
        </div>
      </div>
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Estab.</th>
                <th>Punto</th>
                <th>Tipo</th>
                <th>N° Autorización</th>
                <th>Desde</th>
                <th>Hasta</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              ${rangosAutorizados.map(r => `
                <tr>
                  <td class="fw-600">${r.establecimiento}</td>
                  <td class="mono">${r.punto_emision}</td>
                  <td>Factura</td>
                  <td class="mono">${r.numero_autorizacion}</td>
                  <td class="mono">${r.desde}</td>
                  <td class="mono">${r.hasta}</td>
                  <td>${r.fecha_autorizacion}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Sesiones Activas
  function renderSesionesActivas() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Sesiones Activas</h1>
          <p class="page-subtitle">${sesionesActivas.length} sesiones activas</p>
        </div>
      </div>
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Dispositivo</th>
                <th>IP</th>
                <th>Última Actividad</th>
              </tr>
            </thead>
            <tbody>
              ${sesionesActivas.map(s => `
                <tr>
                  <td class="fw-600">${s.usuario}</td>
                  <td>${s.dispositivo}</td>
                  <td class="mono">${s.ip}</td>
                  <td>${s.ultima_actividad}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Mi Perfil
  function renderMiPerfil() {
    const u = usuarios.find(u => u.roles.includes('admin'));
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Mi Perfil</h1>
          <p class="page-subtitle">${u ? u.email : 'maria.gonzalez@techcorp.com'}</p>
        </div>
      </div>

      <div class="perfil-grid">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Información Personal</h3>
          </div>
          <div class="card-body">
            <div class="avatar-section">
              <div class="avatar-large">MG</div>
              <button class="btn btn-secondary btn-sm">Cambiar foto</button>
            </div>
            
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">Nombres</label>
                <input class="form-control" value="María">
              </div>
              <div class="form-group">
                <label class="form-label">Apellidos</label>
                <input class="form-control" value="González">
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input class="form-control" value="maria.gonzalez@techcorp.com">
              </div>
              <div class="form-group">
                <label class="form-label">Teléfono</label>
                <input class="form-control" value="0998765432">
              </div>
            </div>
            <button class="btn btn-primary">Actualizar Perfil</button>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Cambiar Contraseña</h3>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">Contraseña Actual</label>
              <input type="password" class="form-control">
            </div>
            <div class="form-group">
              <label class="form-label">Nueva Contraseña</label>
              <input type="password" class="form-control">
            </div>
            <div class="form-group">
              <label class="form-label">Confirmar Contraseña</label>
              <input type="password" class="form-control">
            </div>
            <button class="btn btn-primary">Cambiar Contraseña</button>
          </div>
        </div>
      </div>
    `;
  }

  // Preferencias
  function renderPreferencias() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Preferencias</h1>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Tema</label>
              <select class="form-control">
                <option>Claro</option>
                <option>Oscuro</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Idioma</label>
              <select class="form-control">
                <option>Español (Ecuador)</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Elementos por Página</label>
              <select class="form-control">
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
            </div>
          </div>
          <button class="btn btn-primary">Guardar Preferencias</button>
        </div>
      </div>
    `;
  }

  // Configuración Empresa
  function renderConfiguracionEmpresa() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Configuración de Empresa</h1>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Información General</h3>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">RUC</label>
              <input class="form-control" value="1791234567001" readonly>
            </div>
            <div class="form-group">
              <label class="form-label">Razón Social</label>
              <input class="form-control" value="TECHCORP S.A.">
            </div>
            <div class="form-group">
              <label class="form-label">Nombre Comercial</label>
              <input class="form-control" value="TechCorp">
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input class="form-control" value="info@techcorp.com">
            </div>
            <div class="form-group">
              <label class="form-label">Teléfono</label>
              <input class="form-control" value="023456789">
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Dirección</h3>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">Dirección Matriz</label>
              <input class="form-control" value="Av. República E7-123 y Amazonas">
            </div>
            <div class="form-group">
              <label class="form-label">Ciudad</label>
              <input class="form-control" value="Quito">
            </div>
            <div class="form-group">
              <label class="form-label">Provincia</label>
              <input class="form-control" value="Pichincha">
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Configuración SRI</h3>
        </div>
        <div class="card-body">
          <div class="form-grid-3">
            <div class="form-group">
              <label class="form-check">
                <input type="checkbox" checked> Obligado a contabilidad
              </label>
            </div>
          </div>
          <button class="btn btn-primary mt-4">Guardar Cambios</button>
        </div>
      </div>
    `;
  }

  // Configuración SRI
  function renderSriConfig() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Configuración SRI</h1>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Ambiente</h3>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">Ambiente SRI</label>
              <select class="form-control">
                <option selected>Producción</option>
                <option>Pruebas</option>
              </select>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Certificado Digital</h3>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">Archivo</label>
              <div class="file-upload">
                <input type="text" class="form-control" value="certificado_techcorp.p12" readonly>
                <button class="btn btn-secondary">Cambiar</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Contraseña</label>
              <input type="password" class="form-control" value="********">
            </div>
          </div>
        </div>
      </div>

      <button class="btn btn-primary">Guardar Configuración</button>
    `;
  }

  // Notificaciones Config
  function renderNotificacionesConfig() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Notificaciones</h1>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <h3>Canales de Notificación</h3>
          <div class="checkbox-group">
            <label class="checkbox-item">
              <input type="checkbox" checked> Correo Electrónico
            </label>
            <label class="checkbox-item">
              <input type="checkbox" checked> Notificaciones en Sistema
            </label>
          </div>

          <h3>Eventos a Notificar</h3>
          <div class="checkbox-group">
            <label class="checkbox-item">
              <input type="checkbox" checked> Factura autorizada
            </label>
            <label class="checkbox-item">
              <input type="checkbox" checked> Factura rechazada
            </label>
            <label class="checkbox-item">
              <input type="checkbox" checked> Stock crítico
            </label>
          </div>

          <button class="btn btn-primary">Guardar</button>
        </div>
      </div>
    `;
  }

  // Impuestos SRI
  function renderImpuestosSRI() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Impuestos SRI</h1>
        </div>
      </div>
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${impuestosSRI.map(i => `
                <tr>
                  <td class="mono fw-600">${i.codigo}</td>
                  <td>${i.descripcion}</td>
                  <td><span class="badge badge-success">Activo</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Tarifas Impuestos
  function renderTarifasImpuestos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Tarifas de Impuestos</h1>
        </div>
      </div>
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Impuesto</th>
                <th>Código</th>
                <th>Descripción</th>
                <th>Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              ${tarifasImpuestos.map(t => `
                <tr>
                  <td>${t.impuesto}</td>
                  <td class="mono">${t.codigo}</td>
                  <td>${t.descripcion}</td>
                  <td class="mono fw-600">${t.porcentaje}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Formas de Pago
  function renderFormasPagoSRI() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Formas de Pago</h1>
        </div>
      </div>
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Descripción</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${formasPagoSRI.map(f => `
                <tr>
                  <td class="mono fw-600">${f.codigo}</td>
                  <td>${f.descripcion}</td>
                  <td><span class="badge badge-success">Activo</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Tipos de Comprobante
  function renderTiposComprobanteSRI() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Tipos de Comprobante</h1>
        </div>
      </div>
      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${tiposComprobanteSRI.map(t => `
                <tr>
                  <td class="mono fw-600">${t.codigo}</td>
                  <td>${t.nombre}</td>
                  <td><span class="badge badge-success">Activo</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Empleados (DEV)
  function renderEmpleados() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Empleados</h1>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>
      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo en desarrollo.</span>
      </div>
    `;
  }

  // Nóminas (DEV)
  function renderNominas() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Nóminas</h1>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>
      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo en desarrollo.</span>
      </div>
    `;
  }

  // Bodegas (DEV)
  function renderBodegas() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Bodegas</h1>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>
      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo en desarrollo.</span>
      </div>
    `;
  }

  // Kardex (DEV)
  function renderKardex() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Kardex</h1>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>
      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo en desarrollo.</span>
      </div>
    `;
  }

  // Movimientos Inventario (DEV)
  function renderMovimientosInventario() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Movimientos de Inventario</h1>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>
      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo en desarrollo.</span>
      </div>
    `;
  }

  // Activos Fijos (DEV)
  function renderActivosFijos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Activos Fijos</h1>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>
      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo en desarrollo.</span>
      </div>
    `;
  }

  // Depreciaciones (DEV)
  function renderDepreciaciones() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Depreciaciones</h1>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>
      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo en desarrollo.</span>
      </div>
    `;
  }

  // Cotizaciones (DEV)
  function renderCotizaciones() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Cotizaciones</h1>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>
      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo en desarrollo.</span>
      </div>
    `;
  }

  // Proformas (DEV)
  function renderProformas() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Proformas</h1>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>
      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo en desarrollo.</span>
      </div>
    `;
  }

  // Funciones placeholder para acciones
  window.exportarPDF = function() { alert('Exportando PDF...'); };
  window.exportarExcel = function() { alert('Exportando Excel...'); };
  window.exportarGrafico = function(tipo) { alert(`Exportando gráfico de ${tipo}...`); };
  window.limpiarFiltros = function() { alert('Filtros limpiados'); };
  window.descargarPDF = function(numero) { alert(`Descargando PDF de factura ${numero}`); };
  window.enviarEmail = function(numero) { alert(`Enviando factura ${numero} por email`); };
  window.toggleUserStatus = function(id) { alert(`Cambiando estado del usuario ${id}`); };

  // ============================================
  // EXPORTAR FUNCIONES GLOBALMENTE
  // ============================================
  window.showSection = showSection;
  window.toggleSidebar = toggleSidebar;
  window.toggleUserMenu = toggleUserMenu;
  window.toggleSection = toggleSection;
  window.toggleDropdown = toggleDropdown;
  window.toggleSeccion = toggleSeccion;
  window.toggleSubseccion = toggleSubseccion;
  window.openModal = openModal;
  window.closeModal = closeModal;
})();