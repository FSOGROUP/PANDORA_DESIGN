(function() {
  'use strict';

  // ============================================
  // DATOS GLOBALES DEL SISTEMA (TODAS LAS TABLAS) - EXPANDIDO
  // ============================================
  const tenants = [
    { id: 't1', nombre_comercial: 'PANDORA FSO', slug: 'pandora-fso', estado: 'activo', plan: 'enterprise', ruc: '1799999999001', created_at: '2024-01-01', usuarios: 24, facturas_mes: 8432, logo: null },
    { id: 't2', nombre_comercial: 'TechCorp S.A.', slug: 'techcorp', estado: 'activo', plan: 'profesional', ruc: '1791234567001', created_at: '2024-01-15', usuarios: 18, facturas_mes: 3241, logo: null },
    { id: 't3', nombre_comercial: 'Consultoría M&A', slug: 'consultoria-ma', estado: 'activo', plan: 'basico', ruc: '0990123456001', created_at: '2024-02-01', usuarios: 5, facturas_mes: 876, logo: null }
  ];

  const razonesSociales = [
    { id: 'r1', tenant_id: 't1', ruc: '1799999999001', razon_social: 'PANDORA FSO CIA. LTDA.', nombre_comercial: 'PANDORA FSO', direccion_matriz: 'Av. Amazonas N35-45 y Juan Pablo Sanz, Quito', obligado_contabilidad: true, contribuyente_especial: 'Resolución 12345', agente_retencion: 'Resolución 6789', gran_contribuyente: 'Resolución 54321', regimen_rimpe: false, exportador_habitual: true, exportador_no_habitual: false, ambiente_sri: 2, tipo_emision_sri: '1', establecimientos: 3, puntos_emision: 5, telefono: '0998239803', telefono2: '023456789', ciudad: 'Quito', provincia: 'Pichincha', email: 'info@pandora.com.ec' },
    { id: 'r2', tenant_id: 't1', ruc: '1791234567001', razon_social: 'TECHCORP S.A.', nombre_comercial: 'TechCorp', direccion_matriz: 'Av. República E7-123 y Amazonas, Quito', obligado_contabilidad: true, contribuyente_especial: null, agente_retencion: null, gran_contribuyente: null, regimen_rimpe: false, exportador_habitual: false, exportador_no_habitual: false, ambiente_sri: 2, tipo_emision_sri: '1', establecimientos: 2, puntos_emision: 3, telefono: '023456789', telefono2: null, ciudad: 'Quito', provincia: 'Pichincha', email: 'facturacion@techcorp.com' }
  ];

  const usuarios = [
    { id: 'u1', tenant_id: 't1', email: 'admin@pandora.com', nombre: 'Dev', apellido: 'Admin', es_admin_tenant: true, esta_activo: true, ultima_conexion: '2024-01-15 14:30', telefono: '0991234567', roles: ['super_admin'] },
    { id: 'u2', tenant_id: 't1', email: 'juan.perez@techcorp.com', nombre: 'Juan', apellido: 'Pérez', es_admin_tenant: false, esta_activo: true, ultima_conexion: '2024-01-15 10:15', telefono: '0987654321', roles: ['operativo'], tipo_operativo: 'vendedor' },
    { id: 'u3', tenant_id: 't2', email: 'maria.gonzalez@consultoria.com', nombre: 'María', apellido: 'González', es_admin_tenant: true, esta_activo: true, ultima_conexion: '2024-01-14 16:45', telefono: '0998765432', roles: ['admin'] },
    { id: 'u4', tenant_id: 't3', email: 'carlos.rodriguez@distri.com', nombre: 'Carlos', apellido: 'Rodríguez', es_admin_tenant: true, esta_activo: false, ultima_conexion: '2024-01-10 09:20', telefono: '0981234567', roles: ['admin'] },
    { id: 'u5', tenant_id: 't1', email: 'ana.martinez@pandora.com', nombre: 'Ana', apellido: 'Martínez', es_admin_tenant: false, esta_activo: true, ultima_conexion: '2024-01-15 11:30', telefono: '0999876543', roles: ['operativo'], tipo_operativo: 'recursos_humanos' }
  ];

  // ROLES CORREGIDOS - SOLO 3 ROLES: Super Admin, Administrador, Operativo
  const roles = [
    { id: 'rol1', nombre: 'Super Admin', nivel: 'global', permisos: ['todo'], usuarios: 1 },
    { id: 'rol2', nombre: 'Administrador', nivel: 'tenant', permisos: ['config', 'usuarios', 'facturacion', 'reportes', 'contabilidad'], usuarios: 3 },
    { id: 'rol3', nombre: 'Operativo', nivel: 'tenant', permisos: ['ver_asignado'], usuarios: 6 }
  ];

  // TIPOS OPERATIVOS - Catálogo de tipos para el rol operativo
  const tiposOperativos = [
    { id: 'vendedor', nombre: 'Vendedor', descripcion: 'Gestión de ventas y clientes' },
    { id: 'cajero', nombre: 'Cajero', descripcion: 'Facturación y cobros' },
    { id: 'recursos_humanos', nombre: 'Recursos Humanos', descripcion: 'Gestión de personal' }
  ];

  const facturas = [
    { id: 'f1', numero: '001-001-000001', cliente: 'TechCorp S.A.', cliente_id: 'p1', ruc: '1791234567001', fecha: '2024-01-15', subtotal: 1250.00, subtotal_0: 0, subtotal_12: 1250.00, iva: 150.00, total: 1400.00, estado: 'AUTORIZADA', forma_pago: '01 - Efectivo', fecha_autorizacion: '2024-01-15 10:30:22', vendedor: 'Juan Pérez', establecimiento: '001', punto_emision: '001', secuencial: '000001', clave_acceso: '1501202401179123456700120010010000000011234567812' },
    { id: 'f2', numero: '001-001-000002', cliente: 'Consultoría M&A', cliente_id: 'p2', ruc: '0990123456001', fecha: '2024-01-15', subtotal: 850.50, subtotal_0: 0, subtotal_12: 850.50, iva: 102.06, total: 952.56, estado: 'PENDIENTE', forma_pago: '20 - Transferencia', fecha_autorizacion: null, vendedor: 'María González', establecimiento: '001', punto_emision: '001', secuencial: '000002', clave_acceso: null },
    { id: 'f3', numero: '001-001-000003', cliente: 'Distribuidora XYZ', cliente_id: 'p4', ruc: '1798765432001', fecha: '2024-01-14', subtotal: 3200.00, subtotal_0: 0, subtotal_12: 3200.00, iva: 384.00, total: 3584.00, estado: 'AUTORIZADA', forma_pago: '01 - Efectivo', fecha_autorizacion: '2024-01-14 15:22:10', vendedor: 'Juan Pérez', establecimiento: '001', punto_emision: '001', secuencial: '000003', clave_acceso: '14012024011798765432001200100100000300000123456789' },
    { id: 'f4', numero: '001-001-000004', cliente: 'Servicios Integrales', cliente_id: 'p5', ruc: '1795554443001', fecha: '2024-01-14', subtotal: 675.25, subtotal_0: 0, subtotal_12: 675.25, iva: 81.03, total: 756.28, estado: 'RECHAZADA', forma_pago: '20 - Transferencia', fecha_autorizacion: null, vendedor: 'María González', establecimiento: '001', punto_emision: '001', secuencial: '000004', clave_acceso: null },
    { id: 'f5', numero: '001-001-000005', cliente: 'PANDORA FSO', cliente_id: 'r1', ruc: '1799999999001', fecha: '2024-01-13', subtotal: 4300.00, subtotal_0: 0, subtotal_12: 4300.00, iva: 516.00, total: 4816.00, estado: 'AUTORIZADA', forma_pago: '01 - Efectivo', fecha_autorizacion: '2024-01-13 11:45:33', vendedor: 'Dev Admin', establecimiento: '001', punto_emision: '001', secuencial: '000005', clave_acceso: '13012024011799999990012001001000005000001234567890' }
  ];

  const facturasDetalles = [
    { id: 'fd1', factura_id: 'f1', producto: 'Laptop HP Pavilion', cantidad: 1, precio_unitario: 850.00, descuento: 0, subtotal: 850.00, iva: 127.50 },
    { id: 'fd2', factura_id: 'f1', producto: 'Monitor Samsung 24"', cantidad: 1, precio_unitario: 320.00, descuento: 0, subtotal: 320.00, iva: 48.00 }
  ];

  const notasCredito = [
    { id: 'nc1', numero: '001-001-000001', factura_origen: '001-001-000003', cliente: 'Distribuidora XYZ', fecha: '2024-01-15', motivo: 'Devolución de productos', subtotal: 320.00, iva: 38.40, total: 358.40, estado: 'AUTORIZADA' },
    { id: 'nc2', numero: '001-001-000002', factura_origen: '001-001-000001', cliente: 'TechCorp S.A.', fecha: '2024-01-14', motivo: 'Descuento comercial', subtotal: 125.00, iva: 15.00, total: 140.00, estado: 'AUTORIZADA' }
  ];

  const notasDebito = [
    { id: 'nd1', numero: '001-001-000001', factura_origen: '001-001-000005', cliente: 'PANDORA FSO', fecha: '2024-01-15', motivo: 'Intereses por mora', valor: 48.16, iva: 5.78, total: 53.94, estado: 'PENDIENTE' }
  ];

  const retenciones = [
    { id: 'r1', numero: '001-001-000001', proveedor: 'Consultoría M&A', ruc: '0990123456001', fecha: '2024-01-15', periodo_fiscal: '01/2024', comprobante_retenido: '001-001-000002', base_imponible: 850.50, valor_retenido: 85.05, estado: 'AUTORIZADA' },
    { id: 'r2', numero: '001-001-000002', proveedor: 'Servicios Integrales', ruc: '1795554443001', fecha: '2024-01-14', periodo_fiscal: '01/2024', comprobante_retenido: '001-001-000004', base_imponible: 675.25, valor_retenido: 67.53, estado: 'AUTORIZADA' }
  ];

  const guiasRemision = [
    { id: 'g1', numero: '001-001-000001', destino: 'TechCorp S.A.', fecha_inicio: '2024-01-15', fecha_fin: '2024-01-15', motivo: 'Venta de productos', productos: 5, estado: 'ENTREGADA' },
    { id: 'g2', numero: '001-001-000002', destino: 'Distribuidora XYZ', fecha_inicio: '2024-01-14', fecha_fin: '2024-01-14', motivo: 'Venta de productos', productos: 3, estado: 'ENTREGADA' }
  ];

  const personas = [
    { id: 'p1', tipo: 'EMPRESA', identificacion: '1791234567001', nombre: 'TechCorp S.A.', nombre_comercial: 'TechCorp', email: 'facturacion@techcorp.com', telefono: '023456789', telefono_movil: '0991234567', direccion: 'Av. República E7-123', ciudad: 'Quito', provincia: 'Pichincha', es_cliente: true, es_proveedor: false, limite_credito: 5000.00, plazo_pago: 30, estado: 'ACTIVO' },
    { id: 'p2', tipo: 'EMPRESA', identificacion: '0990123456001', nombre: 'Consultoría M&A', nombre_comercial: 'M&A Consulting', email: 'facturacion@consultoria.com', telefono: '042345678', telefono_movil: '0987654321', direccion: 'Av. 9 de Octubre 123', ciudad: 'Guayaquil', provincia: 'Guayas', es_cliente: true, es_proveedor: false, limite_credito: 3000.00, plazo_pago: 30, estado: 'ACTIVO' },
    { id: 'p3', tipo: 'PERSONA', identificacion: '1712345678', nombre: 'Carlos Rodríguez', nombre_comercial: null, email: 'carlos.r@email.com', telefono: '0998765432', telefono_movil: '0998765432', direccion: 'Av. América N23-45', ciudad: 'Quito', provincia: 'Pichincha', es_cliente: true, es_proveedor: false, limite_credito: 1000.00, plazo_pago: 15, estado: 'ACTIVO' },
    { id: 'p4', tipo: 'EMPRESA', identificacion: '1792223334001', nombre: 'Distribuidora Mayorista', nombre_comercial: 'DistriMayorista', email: 'ventas@distrimayorista.com', telefono: '023456123', telefono_movil: '0999876543', direccion: 'Av. De la Prensa N45-67', ciudad: 'Quito', provincia: 'Pichincha', es_cliente: false, es_proveedor: true, limite_credito: 0, plazo_pago: 45, estado: 'ACTIVO' }
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
    { id: 'pc4', codigo: '1.1.1.01', nombre: 'Caja General', nivel: 4, naturaleza: 'DEUDORA', permite_movimiento: true, saldo: 12500.00 },
    { id: 'pc5', codigo: '1.1.1.02', nombre: 'Bancos', nivel: 4, naturaleza: 'DEUDORA', permite_movimiento: true, saldo: 45890.00 },
    { id: 'pc6', codigo: '1.1.2', nombre: 'CUENTAS POR COBRAR', nivel: 3, naturaleza: 'DEUDORA', permite_movimiento: false, saldo: 0 },
    { id: 'pc7', codigo: '1.1.2.01', nombre: 'Clientes', nivel: 4, naturaleza: 'DEUDORA', permite_movimiento: true, saldo: 34560.00 },
    { id: 'pc8', codigo: '1.2', nombre: 'ACTIVO NO CORRIENTE', nivel: 2, naturaleza: 'DEUDORA', permite_movimiento: false, saldo: 0 },
    { id: 'pc9', codigo: '2', nombre: 'PASIVO', nivel: 1, naturaleza: 'ACREEDORA', permite_movimiento: false, saldo: 0 },
    { id: 'pc10', codigo: '2.1', nombre: 'PASIVO CORRIENTE', nivel: 2, naturaleza: 'ACREEDORA', permite_movimiento: false, saldo: 0 },
    { id: 'pc11', codigo: '2.1.1', nombre: 'CUENTAS POR PAGAR', nivel: 3, naturaleza: 'ACREEDORA', permite_movimiento: true, saldo: 23450.00 },
    { id: 'pc12', codigo: '3', nombre: 'PATRIMONIO', nivel: 1, naturaleza: 'ACREEDORA', permite_movimiento: false, saldo: 0 },
    { id: 'pc13', codigo: '4', nombre: 'INGRESOS', nivel: 1, naturaleza: 'ACREEDORA', permite_movimiento: false, saldo: 0 },
    { id: 'pc14', codigo: '5', nombre: 'GASTOS', nivel: 1, naturaleza: 'DEUDORA', permite_movimiento: false, saldo: 0 }
  ];

  const asientos = [
    { id: 'as1', numero: 1, fecha: '2024-01-15', glosa: 'Venta de productos según factura 001-001-000001', tipo: 'VENTA', estado: 'CONTABILIZADO', debe: 1400.00, haber: 1400.00, usuario: 'Dev Admin' },
    { id: 'as2', numero: 2, fecha: '2024-01-15', glosa: 'Compra de mercadería según factura 001-001-000001', tipo: 'COMPRA', estado: 'CONTABILIZADO', debe: 1400.00, haber: 1400.00, usuario: 'Dev Admin' },
    { id: 'as3', numero: 3, fecha: '2024-01-14', glosa: 'Pago de nómina mensual', tipo: 'NÓMINA', estado: 'CONTABILIZADO', debe: 8500.00, haber: 8500.00, usuario: 'Ana Martínez' }
  ];

  const asientosDetalles = [
    { id: 'ad1', asiento_id: 'as1', cuenta: '1.1.1.01', debe: 1400.00, haber: 0 },
    { id: 'ad2', asiento_id: 'as1', cuenta: '4.1', debe: 0, haber: 1250.00 },
    { id: 'ad3', asiento_id: 'as1', cuenta: '2.1.2', debe: 0, haber: 150.00 }
  ];

  const centrosCosto = [
    { id: 'cc1', codigo: 'CC001', nombre: 'Administración', presupuesto: 50000.00, ejecutado: 32450.00, estado: 'ACTIVO' },
    { id: 'cc2', codigo: 'CC002', nombre: 'Ventas', presupuesto: 30000.00, ejecutado: 18760.00, estado: 'ACTIVO' },
    { id: 'cc3', codigo: 'CC003', nombre: 'Producción', presupuesto: 80000.00, ejecutado: 45230.00, estado: 'ACTIVO' }
  ];

  const proyectos = [
    { id: 'pj1', codigo: 'PROJ001', nombre: 'Implementación ERP', cliente: 'TechCorp S.A.', fecha_inicio: '2024-01-01', fecha_fin: '2024-06-30', presupuesto: 45000.00, avance: 25, estado: 'EN_PROGRESO' }
  ];

  const periodosContables = [
    { id: 'pc1', anio: 2024, mes: 1, estado: 'ABIERTO', fecha_apertura: '2024-01-01', total_asientos: 156, total_debe: 245678.90, total_haber: 245678.90 },
    { id: 'pc2', anio: 2023, mes: 12, estado: 'CERRADO', fecha_apertura: '2023-12-01', fecha_cierre: '2023-12-31', total_asientos: 234, total_debe: 345678.90, total_haber: 345678.90 }
  ];

  const cuentasCobrar = [
    { id: 'cxc1', cliente: 'TechCorp S.A.', documento: 'FAC-001-001-000001', fecha_emision: '2024-01-15', fecha_vencimiento: '2024-02-14', monto_original: 1400.00, saldo_pendiente: 1400.00, estado: 'PENDIENTE', dias_mora: 0 },
    { id: 'cxc2', cliente: 'Consultoría M&A', documento: 'FAC-001-001-000002', fecha_emision: '2024-01-15', fecha_vencimiento: '2024-02-14', monto_original: 952.56, saldo_pendiente: 952.56, estado: 'PENDIENTE', dias_mora: 0 }
  ];

  const cuentasPagar = [
    { id: 'cxp1', proveedor: 'Distribuidora Mayorista', documento: 'COM-001-001-000001', fecha_emision: '2024-01-15', fecha_vencimiento: '2024-02-14', monto_original: 1400.00, saldo_pendiente: 1400.00, estado: 'PENDIENTE', dias_mora: 0 }
  ];

  const cobros = [
    { id: 'cb1', numero: 'REC001', cliente: 'TechCorp S.A.', fecha: '2024-01-15', factura: 'FAC-001-001-000001', monto: 500.00, forma_pago: '01 - Efectivo', estado: 'APLICADO' }
  ];

  const pagos = [
    { id: 'pg1', numero: 'PAG001', proveedor: 'Distribuidora Mayorista', fecha: '2024-01-14', factura: 'COM-001-001-000001', monto: 500.00, forma_pago: '20 - Transferencia', estado: 'APLICADO' }
  ];

  const bancos = [
    { id: 'b1', codigo: '001', nombre: 'Banco Pichincha', activo: true },
    { id: 'b2', codigo: '002', nombre: 'Banco del Pacífico', activo: true },
    { id: 'b3', codigo: '003', nombre: 'Produbanco', activo: true }
  ];

  const cuentasBancarias = [
    { id: 'cb1', banco: 'Banco Pichincha', numero: '001-1234567-89', tipo: 'CORRIENTE', moneda: 'USD', saldo_actual: 45890.00, activa: true },
    { id: 'cb2', banco: 'Produbanco', numero: '003-7654321-01', tipo: 'AHORROS', moneda: 'USD', saldo_actual: 12340.00, activa: true }
  ];

  const cajas = [
    { id: 'cj1', codigo: 'CAJ01', nombre: 'Caja Principal', saldo_actual: 8500.00, activa: true },
    { id: 'cj2', codigo: 'CAJ02', nombre: 'Caja Chica', saldo_actual: 500.00, activa: true }
  ];

  const establecimientos = [
    { id: 'es1', codigo: '001', nombre: 'Matriz Quito', direccion: 'Av. Amazonas N35-45', es_matriz: true, puntos_emision: 3, activo: true },
    { id: 'es2', codigo: '002', nombre: 'Sucursal Guayaquil', direccion: 'Av. 9 de Octubre 123', es_matriz: false, puntos_emision: 2, activo: true }
  ];

  const puntosEmision = [
    { id: 'pe1', establecimiento: '001', codigo: '001', descripcion: 'Caja Principal', tipo: 'FISICO', activo: true },
    { id: 'pe2', establecimiento: '001', codigo: '002', descripcion: 'Caja Secundaria', tipo: 'FISICO', activo: true },
    { id: 'pe3', establecimiento: '002', codigo: '001', descripcion: 'Caja Guayaquil', tipo: 'FISICO', activo: true }
  ];

  const secuenciales = [
    { id: 's1', establecimiento: '001', punto_emision: '001', tipo_comprobante: '01', siguiente: 156 },
    { id: 's2', establecimiento: '001', punto_emision: '001', tipo_comprobante: '04', siguiente: 23 },
    { id: 's3', establecimiento: '002', punto_emision: '001', tipo_comprobante: '01', siguiente: 67 }
  ];

  const rangosAutorizados = [
    { id: 'ra1', establecimiento: '001', punto_emision: '001', tipo_comprobante: '01', numero_autorizacion: '1234567890', desde: 1, hasta: 500, fecha_autorizacion: '2024-01-01', activo: true }
  ];

  const sesionesActivas = [
    { id: 'ss1', usuario: 'Dev Admin', dispositivo: 'Chrome / Windows 11', ip: '190.12.34.56', ultima_actividad: 'Hace 5 minutos' },
    { id: 'ss2', usuario: 'Juan Pérez', dispositivo: 'Firefox / Windows 10', ip: '186.45.67.89', ultima_actividad: 'Hace 15 minutos' }
  ];

  const apiKeys = [
    { id: 'ak1', nombre: 'Integración Contable', prefix: 'pk_live_a1b2c3', nivel_acceso: 'alto', usos: 15420, activa: true },
    { id: 'ak2', nombre: 'Portal Clientes', prefix: 'pk_live_d4e5f6', nivel_acceso: 'medio', usos: 8765, activa: true }
  ];

  const impuestosSRI = [
    { codigo: '1', descripcion: 'IVA', activo: true },
    { codigo: '2', descripcion: 'ICE', activo: true },
    { codigo: '3', descripcion: 'IRBPNR', activo: true }
  ];

  const tarifasImpuestos = [
    { id: 'ti1', impuesto: 'IVA', codigo: '0', descripcion: 'Tarifa 0%', porcentaje: 0.00, activo: true },
    { id: 'ti2', impuesto: 'IVA', codigo: '2', descripcion: 'Tarifa 12%', porcentaje: 12.00, activo: true },
    { id: 'ti3', impuesto: 'IVA', codigo: '4', descripcion: 'Tarifa 15%', porcentaje: 15.00, activo: true }
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
    { id: 'n1', icon: 'fa-circle-info', type: 'info', text: 'Firma TechCorp expira en 5 días', time: 'Hace 2h', leida: false },
    { id: 'n2', icon: 'fa-circle-check', type: 'success', text: 'Factura #0000842 autorizada', time: 'Hace 3h', leida: false },
    { id: 'n3', icon: 'fa-triangle-exclamation', type: 'warning', text: 'Stock crítico: Laptop HP', time: 'Hace 1d', leida: true }
  ];

  // Estado
  let currentSection = 'dashboard';
  let sidebarCollapsed = false;

  // ============================================
  // INICIALIZACIÓN - CORREGIDA
  // ============================================
  document.addEventListener('DOMContentLoaded', function() {
    updateCurrentDate();
    initializeAccordions(); // Ahora cierra todas excepto Gestión Global
    setupEventListeners(); // Incluye eventos para avatar y user-info
    showSection('dashboard'); // Muestra Dashboard Global al iniciar
  });

  function updateCurrentDate() {
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
      const today = new Date();
      dateEl.textContent = today.toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  }

  // ============================================
  // ACCORDIONS - CORREGIDO: Solo Gestión Global abierta
  // ============================================
  function initializeAccordions() {
    const sections = ['gestion-global', 'facturacion', 'datos-maestros', 'contabilidad', 'reportes', 'tesoreria', 'inventario', 'activos', 'rrhh', 'crm', 'estructura', 'seguridad'];
    
    sections.forEach(section => {
      const content = document.getElementById(`section-${section}`);
      const arrow = document.getElementById(`arrow-${section}`);
      
      if (content && arrow) {
        // Solo Gestión Global está abierta por defecto
        if (section === 'gestion-global') {
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
  // EVENT LISTENERS - CORREGIDO: Avatar y user-info
  // ============================================
  function setupEventListeners() {
    const collapseBtn = document.getElementById('sidebar-collapse');
    if (collapseBtn) collapseBtn.addEventListener('click', toggleSidebar);

    // IMPORTANTE: Event listeners para el menú de usuario
    const avatar = document.querySelector('.user-avatar');
    const userInfo = document.querySelector('.user-info');
    
    if (avatar) avatar.addEventListener('click', toggleUserMenu);
    if (userInfo) userInfo.addEventListener('click', toggleUserMenu);

    const companyBadge = document.getElementById('header-company-badge');
    if (companyBadge) companyBadge.addEventListener('click', () => openModal('company-switch'));

    const notificationsBtn = document.querySelector('.notifications-badge');
    if (notificationsBtn) notificationsBtn.addEventListener('click', () => openModal('notifications'));

    // Cerrar dropdown al hacer clic fuera
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

  function toggleNotifications() {
    document.getElementById('notifications-dropdown')?.classList.toggle('open');
  }

  function toggleUserMenu() {
    const userMenu = document.getElementById('user-dropdown');
    if (userMenu) {
      userMenu.classList.toggle('open');
      console.log('Menu toggled'); // Para debugging
    }
  }

  // ============================================
  // FUNCIÓN DE NAVEGACIÓN MEJORADA - SOLO UNA SECCIÓN ABIERTA A LA VEZ
  // ============================================
  function toggleSection(sectionId) {
    const section = document.getElementById(`section-${sectionId}`);
    const arrow = document.getElementById(`arrow-${sectionId}`);
    if (!section || !arrow) return;
    
    // Cerrar todas las secciones primero
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
    
    // Alternar la sección seleccionada
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
      'dashboard': 'Dashboard Global',
      'tenants': 'Empresas',
      'usuarios-fso': 'Usuarios Globales',
      'facturas-venta': 'Facturas Venta',
      'notas-credito': 'Notas Crédito',
      'notas-debito': 'Notas Débito',
      'retenciones': 'Retenciones',
      'guias-remision': 'Guías Remisión',
      'personas': 'Personas',
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
      'roles-permisos': 'Roles y Permisos',
      'sesiones-activas': 'Sesiones Activas',
      'api-keys': 'API Keys',
      'mi-perfil': 'Mi Perfil',
      'preferencias': 'Preferencias',
      'configuracion-empresa': 'Configuración Empresa',
      'sri-config': 'Configuración SRI',
      'notificaciones-config': 'Notificaciones',
      'seguridad': 'Seguridad',
      'impuestos': 'Impuestos SRI',
      'tarifas-impuestos': 'Tarifas Impuestos',
      'formas-pago': 'Formas de Pago',
      'tipos-comprobante': 'Tipos de Comprobante',
      'empleados': 'Empleados',
      'nominas': 'Nóminas',
      'bodegas': 'Bodegas',
      'kardex': 'Kardex',
      'movimientos-inventario': 'Movimientos',
      'activos-fijos': 'Activos Fijos',
      'depreciaciones': 'Depreciaciones',
      'cotizaciones': 'Cotizaciones',
      'proformas': 'Proformas'
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
      case 'tenants': return renderTenants();
      case 'usuarios-fso': return renderUsuariosGlobales();
      case 'facturas-venta': return renderFacturasVenta();
      case 'notas-credito': return renderNotasCredito();
      case 'notas-debito': return renderNotasDebito();
      case 'retenciones': return renderRetenciones();
      case 'guias-remision': return renderGuiasRemision();
      case 'personas': return renderPersonas();
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
      case 'roles-permisos': return renderRolesPermisos();
      case 'sesiones-activas': return renderSesionesActivas();
      case 'api-keys': return renderApiKeys();
      case 'mi-perfil': return renderMiPerfil();
      case 'preferencias': return renderPreferencias();
      case 'configuracion-empresa': return renderConfiguracionEmpresa();
      case 'sri-config': return renderSriConfig();
      case 'notificaciones-config': return renderNotificacionesConfig();
      case 'seguridad': return renderSeguridad();
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
  // RENDERIZADO - DASHBOARD (MEJORADO)
  // ============================================
  function renderDashboard() {
    const totalActivos = planCuentas.filter(c => c.codigo.startsWith('1') && c.saldo).reduce((s, c) => s + (c.saldo || 0), 0);
    const totalPasivos = planCuentas.filter(c => c.codigo.startsWith('2') && c.saldo).reduce((s, c) => s + (c.saldo || 0), 0);
    const totalPatrimonio = planCuentas.filter(c => c.codigo.startsWith('3') && c.saldo).reduce((s, c) => s + (c.saldo || 0), 0);
    const totalCxC = cuentasCobrar.reduce((s, c) => s + c.saldo_pendiente, 0);
    const totalCxP = cuentasPagar.reduce((s, c) => s + c.saldo_pendiente, 0);
    
    return `
      <div class="dashboard-container">
        <!-- Header -->
        <div class="page-header">
          <div>
            <h1 class="page-title">Dashboard Global</h1>
            <p class="page-subtitle">Visión general del sistema · ${tenants.length} empresas activas · ${usuarios.length} usuarios</p>
          </div>
          <div class="page-actions">
            <div class="dropdown">
              <button class="btn btn-secondary" onclick="toggleDropdown('report-dropdown')">
                <i class="fas fa-download"></i> Exportar Reporte <i class="fas fa-chevron-down"></i>
              </button>
              <div class="dropdown-menu" id="report-dropdown">
                <div class="dropdown-item" onclick="exportarPDF()"><i class="fas fa-file-pdf"></i> Exportar a PDF</div>
                <div class="dropdown-item" onclick="exportarExcel()"><i class="fas fa-file-excel"></i> Exportar a Excel</div>
                <div class="dropdown-item" onclick="exportarCSV()"><i class="fas fa-file-csv"></i> Exportar a CSV</div>
              </div>
            </div>
            <button class="btn btn-primary" onclick="openModal('new-tenant')">
              <i class="fas fa-plus"></i> Nueva Empresa
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
                <option>Este mes</option>
                <option>Mes pasado</option>
                <option>Este trimestre</option>
                <option>Este año</option>
                <option>Personalizado</option>
              </select>
            </div>
            <div class="filter-group">
              <label>Empresa</label>
              <select class="form-control">
                <option>Todas las empresas</option>
                ${tenants.map(t => `<option>${t.nombre_comercial}</option>`).join('')}
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
          <div class="kpi-card" onclick="showSection('tenants')">
            <div class="kpi-icon"><i class="fas fa-building"></i></div>
            <div class="kpi-content">
              <div class="kpi-value">${tenants.length}</div>
              <div class="kpi-label">Empresas Activas</div>
              <div class="kpi-trend positive"><i class="fas fa-arrow-up"></i> +1 este mes</div>
            </div>
          </div>
          <div class="kpi-card" onclick="showSection('usuarios-fso')">
            <div class="kpi-icon"><i class="fas fa-users"></i></div>
            <div class="kpi-content">
              <div class="kpi-value">${usuarios.length}</div>
              <div class="kpi-label">Usuarios Activos</div>
              <div class="kpi-trend positive"><i class="fas fa-arrow-up"></i> +2 hoy</div>
            </div>
          </div>
          <div class="kpi-card" onclick="showSection('facturas-venta')">
            <div class="kpi-icon"><i class="fas fa-file-invoice"></i></div>
            <div class="kpi-content">
              <div class="kpi-value">${facturas.length}</div>
              <div class="kpi-label">Facturas este mes</div>
              <div class="kpi-trend positive"><i class="fas fa-arrow-up"></i> +12%</div>
            </div>
          </div>
          <div class="kpi-card" onclick="showSection('cxc')">
            <div class="kpi-icon"><i class="fas fa-dollar-sign"></i></div>
            <div class="kpi-content">
              <div class="kpi-value">$${totalCxC.toLocaleString()}</div>
              <div class="kpi-label">Cuentas por Cobrar</div>
              <div class="kpi-trend negative"><i class="fas fa-arrow-down"></i> -5%</div>
            </div>
          </div>
          <div class="kpi-card" onclick="showSection('cxp')">
            <div class="kpi-icon"><i class="fas fa-credit-card"></i></div>
            <div class="kpi-content">
              <div class="kpi-value">$${totalCxP.toLocaleString()}</div>
              <div class="kpi-label">Cuentas por Pagar</div>
              <div class="kpi-trend positive"><i class="fas fa-arrow-up"></i> +3%</div>
            </div>
          </div>
          <div class="kpi-card" onclick="showSection('balance-general')">
            <div class="kpi-icon"><i class="fas fa-scale-balanced"></i></div>
            <div class="kpi-content">
              <div class="kpi-value">$${totalActivos.toLocaleString()}</div>
              <div class="kpi-label">Activo Total</div>
              <div class="kpi-trend positive"><i class="fas fa-arrow-up"></i> +8%</div>
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
                <button class="btn btn-icon" onclick="exportarGrafico('ventas')"><i class="fas fa-download"></i></button>
              </div>
            </div>
            <div class="chart-body">
              <canvas id="ventasChart" style="height: 250px;"></canvas>
            </div>
          </div>
          <div class="chart-card">
            <div class="chart-header">
              <h3>Distribución por Empresa</h3>
              <button class="btn btn-icon" onclick="exportarGrafico('empresas')"><i class="fas fa-download"></i></button>
            </div>
            <div class="chart-body">
              <canvas id="empresasChart" style="height: 250px;"></canvas>
            </div>
          </div>
        </div>

        <!-- Reportes Rápidos -->
        <div class="quick-reports">
          <div class="report-card" onclick="showSection('balance-general')">
            <div class="report-icon"><i class="fas fa-scale-balanced"></i></div>
            <div class="report-info">
              <h4>Balance General</h4>
              <p>Ver balance al cierre del mes</p>
            </div>
            <div class="report-value">$${totalActivos.toLocaleString()}</div>
          </div>
          <div class="report-card" onclick="showSection('estado-resultados')">
            <div class="report-icon"><i class="fas fa-chart-line"></i></div>
            <div class="report-info">
              <h4>Estado de Resultados</h4>
              <p>Utilidad del período: $77,788</p>
            </div>
            <div class="report-value positive">+15%</div>
          </div>
          <div class="report-card" onclick="showSection('libro-mayor')">
            <div class="report-icon"><i class="fas fa-book-open"></i></div>
            <div class="report-info">
              <h4>Libro Mayor</h4>
              <p>Movimientos por cuenta</p>
            </div>
            <div class="report-value">156 asientos</div>
          </div>
          <div class="report-card" onclick="showSection('cxc')">
            <div class="report-icon"><i class="fas fa-clock"></i></div>
            <div class="report-info">
              <h4>Cuentas por Cobrar</h4>
              <p>Vencidas: $0</p>
            </div>
            <div class="report-value">$${totalCxC.toLocaleString()}</div>
          </div>
        </div>

        <!-- Últimas Facturas -->
        <div class="transactions-card">
          <div class="card-header">
            <h3>Últimas Transacciones</h3>
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
                  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                  datasets: [{
                    label: 'Ventas 2024',
                    data: [12500, 19000, 15000, 22000, 18000, 24000, 21000, 28000, 26000, 31000, 29000, 35000],
                    borderColor: '#F5A623',
                    backgroundColor: 'rgba(245, 166, 35, 0.1)',
                    tension: 0.4,
                    fill: true
                  }, {
                    label: 'Ventas 2023',
                    data: [11000, 15000, 13000, 18000, 16000, 20000, 19000, 23000, 21000, 26000, 24000, 28000],
                    borderColor: '#27AE60',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
                    tension: 0.4,
                    fill: true
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false
                }
              });

              new Chart(document.getElementById('empresasChart'), {
                type: 'doughnut',
                data: {
                  labels: ${JSON.stringify(tenants.map(t => t.nombre_comercial))},
                  datasets: [{
                    data: [45, 28, 18, 9],
                    backgroundColor: ['#F5A623', '#27AE60', '#2979FF', '#FFB300']
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
  // RENDERIZADO - EMPRESAS (MEJORADO)
  // ============================================
  function renderTenants() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Empresas</h1>
          <p class="page-subtitle">${tenants.length} empresas registradas en el sistema</p>
        </div>
        <div class="page-actions">
          <div class="dropdown">
            <button class="btn btn-secondary" onclick="toggleDropdown('empresas-import')">
              <i class="fas fa-download"></i> Importar <i class="fas fa-chevron-down"></i>
            </button>
            <div class="dropdown-menu" id="empresas-import">
              <div class="dropdown-item" onclick="importarExcel()"><i class="fas fa-file-excel"></i> Importar Excel</div>
              <div class="dropdown-item" onclick="importarXML()"><i class="fas fa-file-code"></i> Importar XML</div>
              <div class="dropdown-item" onclick="descargarPlantilla()"><i class="fas fa-download"></i> Plantilla Excel</div>
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary" onclick="toggleDropdown('empresas-export')">
              <i class="fas fa-upload"></i> Exportar <i class="fas fa-chevron-down"></i>
            </button>
            <div class="dropdown-menu" id="empresas-export">
              <div class="dropdown-item" onclick="exportarExcel()"><i class="fas fa-file-excel"></i> Exportar Excel</div>
              <div class="dropdown-item" onclick="exportarPDF()"><i class="fas fa-file-pdf"></i> Exportar PDF</div>
            </div>
          </div>
          <button class="btn btn-primary" onclick="openModal('new-tenant')">
            <i class="fas fa-plus"></i> Nueva Empresa
          </button>
        </div>
      </div>

      <!-- Buscador Avanzado -->
      <div class="filters-panel">
        <div class="filters-grid" style="grid-template-columns: repeat(4, 1fr);">
          <div class="filter-group">
            <label>Buscar</label>
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Nombre, RUC, slug...">
            </div>
          </div>
          <div class="filter-group">
            <label>Plan</label>
            <select class="form-control">
              <option>Todos</option>
              <option>Básico</option>
              <option>Profesional</option>
              <option>Enterprise</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Estado</label>
            <select class="form-control">
              <option>Todos</option>
              <option>Activo</option>
              <option>Inactivo</option>
              <option>Suspendido</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Fecha creación</label>
            <select class="form-control">
              <option>Cualquier fecha</option>
              <option>Último mes</option>
              <option>Último año</option>
              <option>Personalizado</option>
            </select>
          </div>
        </div>
        <div class="search-actions">
          <button class="btn btn-primary"><i class="fas fa-search"></i> Buscar</button>
          <button class="btn btn-text">Limpiar</button>
        </div>
      </div>

      <!-- Resumen -->
      <div class="summary-cards" style="margin-bottom: 20px;">
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-building"></i></div>
          <div class="summary-value">${tenants.length}</div>
          <div class="summary-label">Total Empresas</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-check-circle"></i></div>
          <div class="summary-value">${tenants.filter(t => t.estado === 'activo').length}</div>
          <div class="summary-label">Activas</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-users"></i></div>
          <div class="summary-value">${usuarios.length}</div>
          <div class="summary-label">Usuarios Totales</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-file-invoice"></i></div>
          <div class="summary-value">${facturas.length * 1200}</div>
          <div class="summary-label">Facturas este mes</div>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th style="width: 30px;"><input type="checkbox"></th>
                <th>Empresa</th>
                <th>RUC</th>
                <th>Plan</th>
                <th>Usuarios</th>
                <th>Facturas/mes</th>
                <th>Fecha Creación</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${tenants.map(t => `
                <tr>
                  <td><input type="checkbox"></td>
                  <td class="fw-600">
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <div class="company-icon"><i class="fas fa-building"></i></div>
                      ${t.nombre_comercial}
                    </div>
                  </td>
                  <td class="mono">${t.ruc || '1799999999001'}</td>
                  <td><span class="badge badge-primary">${t.plan}</span></td>
                  <td>${t.usuarios}</td>
                  <td>${t.facturas_mes}</td>
                  <td>${t.created_at}</td>
                  <td><span class="badge badge-success">${t.estado}</span></td>
                  <td>
                    <div class="action-buttons">
                      <button class="btn btn-icon" onclick="openModal('view-tenant', '${t.id}')" title="Ver detalles"><i class="fas fa-eye"></i></button>
                      <button class="btn btn-icon" onclick="openModal('edit-tenant', '${t.id}')" title="Editar"><i class="fas fa-edit"></i></button>
                      <button class="btn btn-icon" onclick="openModal('config-tenant', '${t.id}')" title="Configurar"><i class="fas fa-cog"></i></button>
                      <div class="dropdown">
                        <button class="btn btn-icon" onclick="toggleDropdown('actions-${t.id}')"><i class="fas fa-ellipsis-v"></i></button>
                        <div class="dropdown-menu" id="actions-${t.id}">
                          <div class="dropdown-item" onclick="suspendEmpresa('${t.id}')"><i class="fas fa-pause"></i> Suspender</div>
                          <div class="dropdown-item" onclick="activateEmpresa('${t.id}')"><i class="fas fa-play"></i> Activar</div>
                          <div class="dropdown-item" onclick="deleteEmpresa('${t.id}')"><i class="fas fa-trash"></i> Eliminar</div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${tenants.length} de ${tenants.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item">3</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - USUARIOS GLOBALES (MEJORADO)
  // ============================================
  function renderUsuariosGlobales() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Usuarios Globales</h1>
          <p class="page-subtitle">${usuarios.length} usuarios en el sistema</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary btn-sm" onclick="openModal('import-usuarios')">
            <i class="fas fa-file-excel"></i> Importar Excel
          </button>
          <button class="btn btn-primary btn-sm" onclick="openModal('new-user')">
            <i class="fas fa-plus"></i> Nuevo Usuario
          </button>
        </div>
      </div>

      <div class="filters-panel">
        <div class="filters-grid" style="grid-template-columns: repeat(4, 1fr);">
          <div class="filter-group">
            <label>Buscar</label>
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Nombre, email...">
            </div>
          </div>
          <div class="filter-group">
            <label>Empresa</label>
            <select class="form-control">
              <option>Todas</option>
              ${tenants.map(t => `<option>${t.nombre_comercial}</option>`).join('')}
            </select>
          </div>
          <div class="filter-group">
            <label>Rol</label>
            <select class="form-control">
              <option>Todos</option>
              <option>Super Admin</option>
              <option>Administrador</option>
              <option>Operativo</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Tipo Operativo</label>
            <select class="form-control">
              <option>Todos</option>
              ${tiposOperativos.map(to => `<option>${to.nombre}</option>`).join('')}
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
          <div class="summary-value">${usuarios.length}</div>
          <div class="summary-label">Total Usuarios</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-check-circle"></i></div>
          <div class="summary-value">${usuarios.filter(u => u.esta_activo).length}</div>
          <div class="summary-label">Activos</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-clock"></i></div>
          <div class="summary-value">${usuarios.filter(u => !u.esta_activo).length}</div>
          <div class="summary-label">Inactivos</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-user-shield"></i></div>
          <div class="summary-value">${usuarios.filter(u => u.roles.includes('super_admin')).length}</div>
          <div class="summary-label">Super Admins</div>
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
                <th>Empresa</th>
                <th>Rol</th>
                <th>Tipo Operativo</th>
                <th>Teléfono</th>
                <th>Última Conexión</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${usuarios.map(u => {
                const rolNombre = u.roles.includes('super_admin') ? 'Super Admin' : 
                                  u.roles.includes('admin') ? 'Administrador' : 'Operativo';
                const tipoOperativo = u.tipo_operativo ? tiposOperativos.find(to => to.id === u.tipo_operativo) : null;
                return `
                  <tr>
                    <td><input type="checkbox"></td>
                    <td class="fw-600">${u.nombre} ${u.apellido}</td>
                    <td>${u.email}</td>
                    <td>${tenants.find(t => t.id === u.tenant_id)?.nombre_comercial || ''}</td>
                    <td><span class="badge ${u.roles.includes('super_admin') ? 'badge-danger' : u.roles.includes('admin') ? 'badge-warning' : 'badge-primary'}">${rolNombre}</span></td>
                    <td>${tipoOperativo ? tipoOperativo.nombre : '-'}</td>
                    <td>${u.telefono}</td>
                    <td>${u.ultima_conexion || 'Nunca'}</td>
                    <td><span class="badge ${u.esta_activo ? 'badge-success' : 'badge-danger'}">${u.esta_activo ? 'Activo' : 'Inactivo'}</span></td>
                    <td>
                      <div class="action-buttons">
                        <button class="btn btn-icon" onclick="openModal('view-user', '${u.id}')"><i class="fas fa-eye"></i></button>
                        <button class="btn btn-icon" onclick="openModal('edit-user', '${u.id}')"><i class="fas fa-edit"></i></button>
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
          <div>Mostrando 1-${usuarios.length} de ${usuarios.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item">3</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - ROLES Y PERMISOS (ACTUALIZADO CON SOLO 3 ROLES)
  // ============================================
  function renderRolesPermisos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Roles y Permisos</h1>
          <p class="page-subtitle">${roles.length} roles configurados en el sistema</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-role')">
            <i class="fas fa-plus"></i> Nuevo Rol
          </button>
        </div>
      </div>

      <div class="summary-cards" style="margin-bottom: 20px;">
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-user-shield"></i></div>
          <div class="summary-value">${roles.length}</div>
          <div class="summary-label">Total Roles</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-globe"></i></div>
          <div class="summary-value">${roles.filter(r => r.nivel === 'global').length}</div>
          <div class="summary-label">Globales</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-building"></i></div>
          <div class="summary-value">${roles.filter(r => r.nivel === 'tenant').length}</div>
          <div class="summary-label">Por Empresa</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-users"></i></div>
          <div class="summary-value">${tiposOperativos.length}</div>
          <div class="summary-label">Tipos Operativos</div>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Rol</th>
                <th>Nivel</th>
                <th>Usuarios</th>
                <th>Permisos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${roles.map(r => `
                <tr>
                  <td class="fw-600">${r.nombre}</td>
                  <td><span class="badge badge-primary">${r.nivel}</span></td>
                  <td>${r.usuarios}</td>
                  <td>${r.permisos.length} permisos</td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon"><i class="fas fa-key"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div class="card" style="margin-top: 24px;">
        <div class="card-header">
          <h3 class="card-title">Tipos de Usuario Operativo</h3>
          <div class="card-actions">
            <button class="btn btn-primary btn-sm" onclick="openModal('new-tipo-operativo')">
              <i class="fas fa-plus"></i> Nuevo Tipo
            </button>
          </div>
        </div>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Usuarios</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${tiposOperativos.map(to => {
                const usuariosTipo = usuarios.filter(u => u.tipo_operativo === to.id).length;
                return `
                  <tr>
                    <td class="fw-600">${to.nombre}</td>
                    <td>${to.descripcion}</td>
                    <td>${usuariosTipo}</td>
                    <td>
                      <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - FACTURAS VENTA
  // ============================================
  function renderFacturasVenta() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Facturas de Venta</h1>
          <p class="page-subtitle">${facturas.length} facturas en el sistema</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary btn-sm" onclick="openModal('importar-facturas')">
            <i class="fas fa-file-excel"></i> Importar Excel
          </button>
          <button class="btn btn-secondary btn-sm" onclick="openModal('importar-xml')">
            <i class="fas fa-file-code"></i> Importar XML
          </button>
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
              <input type="text" placeholder="Número, cliente, RUC...">
            </div>
          </div>
          <div class="filter-group">
            <label>Fecha desde</label>
            <input type="date" class="form-control" value="2024-01-01">
          </div>
          <div class="filter-group">
            <label>Fecha hasta</label>
            <input type="date" class="form-control" value="2024-01-31">
          </div>
          <div class="filter-group">
            <label>Estado</label>
            <select class="form-control">
              <option>Todos</option>
              <option>AUTORIZADA</option>
              <option>PENDIENTE</option>
              <option>RECHAZADA</option>
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
          <div class="summary-icon"><i class="fas fa-times-circle"></i></div>
          <div class="summary-value">${facturas.filter(f => f.estado === 'RECHAZADA').length}</div>
          <div class="summary-label">Rechazadas</div>
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
                <th><input type="checkbox"></th>
                <th>Número</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>RUC</th>
                <th>Subtotal</th>
                <th>IVA</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${facturas.map(f => `
                <tr>
                  <td><input type="checkbox"></td>
                  <td class="mono fw-600">${f.numero}</td>
                  <td>${f.fecha}</td>
                  <td>${f.cliente}</td>
                  <td class="mono">${f.ruc}</td>
                  <td class="mono">$${f.subtotal.toFixed(2)}</td>
                  <td class="mono">$${f.iva.toFixed(2)}</td>
                  <td class="mono fw-600">$${f.total.toFixed(2)}</td>
                  <td><span class="badge ${f.estado === 'AUTORIZADA' ? 'badge-success' : f.estado === 'RECHAZADA' ? 'badge-danger' : 'badge-warning'}">${f.estado}</span></td>
                  <td>
                    <div class="action-buttons">
                      <button class="btn btn-icon" onclick="openModal('view-factura', '${f.numero}')" title="Ver"><i class="fas fa-eye"></i></button>
                      <button class="btn btn-icon" onclick="descargarPDF('${f.numero}')" title="PDF"><i class="fas fa-file-pdf"></i></button>
                      <button class="btn btn-icon" onclick="descargarXML('${f.numero}')" title="XML"><i class="fas fa-file-code"></i></button>
                      <button class="btn btn-icon" onclick="enviarEmail('${f.numero}')" title="Enviar"><i class="fas fa-envelope"></i></button>
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
            <button class="page-item">2</button>
            <button class="page-item">3</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - NOTAS CRÉDITO
  // ============================================
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
            <input type="date" class="form-control" value="2024-01-01">
          </div>
          <div class="filter-group">
            <label>Fecha hasta</label>
            <input type="date" class="form-control" value="2024-01-31">
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
                <th>Subtotal</th>
                <th>IVA</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
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
                  <td class="mono">$${n.subtotal.toFixed(2)}</td>
                  <td class="mono">$${n.iva.toFixed(2)}</td>
                  <td class="mono fw-600">$${n.total.toFixed(2)}</td>
                  <td><span class="badge badge-success">${n.estado}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-icon"><i class="fas fa-file-pdf"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${notasCredito.length} de ${notasCredito.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - NOTAS DÉBITO
  // ============================================
  function renderNotasDebito() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Notas de Débito</h1>
          <p class="page-subtitle">${notasDebito.length} notas de débito</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-nota-debito')">
            <i class="fas fa-plus"></i> Nueva Nota
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
            <input type="date" class="form-control" value="2024-01-01">
          </div>
          <div class="filter-group">
            <label>Fecha hasta</label>
            <input type="date" class="form-control" value="2024-01-31">
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
                <th>Valor</th>
                <th>IVA</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${notasDebito.map(n => `
                <tr>
                  <td class="mono fw-600">${n.numero}</td>
                  <td>${n.fecha}</td>
                  <td class="mono">${n.factura_origen}</td>
                  <td>${n.cliente}</td>
                  <td>${n.motivo}</td>
                  <td class="mono">$${n.valor.toFixed(2)}</td>
                  <td class="mono">$${n.iva.toFixed(2)}</td>
                  <td class="mono fw-600">$${n.total.toFixed(2)}</td>
                  <td><span class="badge badge-warning">${n.estado}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-eye"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${notasDebito.length} de ${notasDebito.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - RETENCIONES
  // ============================================
  function renderRetenciones() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Retenciones</h1>
          <p class="page-subtitle">${retenciones.length} comprobantes de retención</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-retencion')">
            <i class="fas fa-plus"></i> Nueva Retención
          </button>
        </div>
      </div>

      <div class="filters-panel">
        <div class="filters-grid" style="grid-template-columns: repeat(4, 1fr);">
          <div class="filter-group">
            <label>Buscar</label>
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Número, proveedor...">
            </div>
          </div>
          <div class="filter-group">
            <label>Fecha desde</label>
            <input type="date" class="form-control" value="2024-01-01">
          </div>
          <div class="filter-group">
            <label>Fecha hasta</label>
            <input type="date" class="form-control" value="2024-01-31">
          </div>
          <div class="filter-group">
            <label>Periodo</label>
            <input type="text" class="form-control" placeholder="01/2024">
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
                <th>Número</th>
                <th>Fecha</th>
                <th>Proveedor</th>
                <th>RUC</th>
                <th>Período</th>
                <th>Base</th>
                <th>Valor Retenido</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${retenciones.map(r => `
                <tr>
                  <td class="mono fw-600">${r.numero}</td>
                  <td>${r.fecha}</td>
                  <td>${r.proveedor}</td>
                  <td class="mono">${r.ruc}</td>
                  <td>${r.periodo_fiscal}</td>
                  <td class="mono">$${r.base_imponible.toFixed(2)}</td>
                  <td class="mono fw-600">$${r.valor_retenido.toFixed(2)}</td>
                  <td><span class="badge badge-success">${r.estado}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-icon"><i class="fas fa-file-pdf"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${retenciones.length} de ${retenciones.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - GUÍAS REMISIÓN
  // ============================================
  function renderGuiasRemision() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Guías de Remisión</h1>
          <p class="page-subtitle">${guiasRemision.length} guías de remisión</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-guia')">
            <i class="fas fa-plus"></i> Nueva Guía
          </button>
        </div>
      </div>

      <div class="filters-panel">
        <div class="filters-grid" style="grid-template-columns: repeat(4, 1fr);">
          <div class="filter-group">
            <label>Buscar</label>
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Número, destino...">
            </div>
          </div>
          <div class="filter-group">
            <label>Fecha desde</label>
            <input type="date" class="form-control" value="2024-01-01">
          </div>
          <div class="filter-group">
            <label>Fecha hasta</label>
            <input type="date" class="form-control" value="2024-01-31">
          </div>
          <div class="filter-group">
            <label>Estado</label>
            <select class="form-control">
              <option>Todos</option>
              <option>ENTREGADA</option>
              <option>PENDIENTE</option>
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
                <th>Número</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Destino</th>
                <th>Motivo</th>
                <th>Productos</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${guiasRemision.map(g => `
                <tr>
                  <td class="mono fw-600">${g.numero}</td>
                  <td>${g.fecha_inicio}</td>
                  <td>${g.fecha_fin}</td>
                  <td>${g.destino}</td>
                  <td>${g.motivo}</td>
                  <td>${g.productos}</td>
                  <td><span class="badge badge-success">${g.estado}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-eye"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${guiasRemision.length} de ${guiasRemision.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - PERSONAS
  // ============================================
  function renderPersonas() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Personas</h1>
          <p class="page-subtitle">${personas.length} personas registradas</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary btn-sm" onclick="openModal('import-personas')">
            <i class="fas fa-file-excel"></i> Importar Excel
          </button>
          <button class="btn btn-primary btn-sm" onclick="openModal('new-persona')">
            <i class="fas fa-plus"></i> Nueva Persona
          </button>
        </div>
      </div>

      <div class="filters-panel">
        <div class="filters-grid" style="grid-template-columns: repeat(4, 1fr);">
          <div class="filter-group">
            <label>Buscar</label>
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Identificación, nombre...">
            </div>
          </div>
          <div class="filter-group">
            <label>Tipo</label>
            <select class="form-control">
              <option>Todos</option>
              <option>Persona Natural</option>
              <option>Empresa</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Cliente</label>
            <select class="form-control">
              <option>Todos</option>
              <option>Sí</option>
              <option>No</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Proveedor</label>
            <select class="form-control">
              <option>Todos</option>
              <option>Sí</option>
              <option>No</option>
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
          <div class="summary-value">${personas.length}</div>
          <div class="summary-label">Total Personas</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-user-tie"></i></div>
          <div class="summary-value">${personas.filter(p => p.tipo === 'EMPRESA').length}</div>
          <div class="summary-label">Empresas</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-user"></i></div>
          <div class="summary-value">${personas.filter(p => p.tipo === 'PERSONA').length}</div>
          <div class="summary-label">Personas Naturales</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-handshake"></i></div>
          <div class="summary-value">${personas.filter(p => p.es_cliente).length}</div>
          <div class="summary-label">Clientes</div>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox"></th>
                <th>Identificación</th>
                <th>Nombre/Razón Social</th>
                <th>Tipo</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Ciudad</th>
                <th>Cliente</th>
                <th>Proveedor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${personas.map(p => `
                <tr>
                  <td><input type="checkbox"></td>
                  <td class="mono fw-600">${p.identificacion}</td>
                  <td>${p.nombre}</td>
                  <td><span class="badge badge-info">${p.tipo}</span></td>
                  <td>${p.email}</td>
                  <td>${p.telefono}</td>
                  <td>${p.ciudad}</td>
                  <td>${p.es_cliente ? '<span class="badge badge-success">Sí</span>' : '<span class="badge badge-secondary">No</span>'}</td>
                  <td>${p.es_proveedor ? '<span class="badge badge-success">Sí</span>' : '<span class="badge badge-secondary">No</span>'}</td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon"><i class="fas fa-history"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${personas.length} de ${personas.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item">3</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - PRODUCTOS
  // ============================================
  function renderProductos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Productos / Servicios</h1>
          <p class="page-subtitle">${productos.length} ítems registrados</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary btn-sm" onclick="openModal('import-productos')">
            <i class="fas fa-file-excel"></i> Importar Excel
          </button>
          <button class="btn btn-primary btn-sm" onclick="openModal('new-producto')">
            <i class="fas fa-plus"></i> Nuevo Producto
          </button>
        </div>
      </div>

      <div class="filters-panel">
        <div class="filters-grid" style="grid-template-columns: repeat(4, 1fr);">
          <div class="filter-group">
            <label>Buscar</label>
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Código, nombre...">
            </div>
          </div>
          <div class="filter-group">
            <label>Categoría</label>
            <select class="form-control">
              <option>Todas</option>
              ${categorias.map(c => `<option>${c.nombre}</option>`).join('')}
            </select>
          </div>
          <div class="filter-group">
            <label>Tipo</label>
            <select class="form-control">
              <option>Todos</option>
              <option>Producto</option>
              <option>Servicio</option>
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
          <div class="summary-icon"><i class="fas fa-box"></i></div>
          <div class="summary-value">${productos.filter(p => p.tipo === 'PRODUCTO').length}</div>
          <div class="summary-label">Productos</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-concierge-bell"></i></div>
          <div class="summary-value">${productos.filter(p => p.tipo === 'SERVICIO').length}</div>
          <div class="summary-label">Servicios</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-boxes"></i></div>
          <div class="summary-value">${productos.reduce((s, p) => s + p.stock, 0)}</div>
          <div class="summary-label">Stock Total</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-exclamation-triangle"></i></div>
          <div class="summary-value">${productos.filter(p => p.stock <= p.stock_minimo).length}</div>
          <div class="summary-label">Stock Bajo</div>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox"></th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Tipo</th>
                <th>Stock</th>
                <th>Precio Venta</th>
                <th>Precio Compra</th>
                <th>IVA</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${productos.map(p => `
                <tr>
                  <td><input type="checkbox"></td>
                  <td class="mono fw-600">${p.codigo}</td>
                  <td>${p.nombre}</td>
                  <td>${p.categoria}</td>
                  <td><span class="badge badge-primary">${p.tipo}</span></td>
                  <td class="mono ${p.stock <= p.stock_minimo ? 'text-danger fw-600' : ''}">${p.stock}</td>
                  <td class="mono">$${p.precio_venta.toFixed(2)}</td>
                  <td class="mono">$${p.precio_compra.toFixed(2)}</td>
                  <td>${p.iva}</td>
                  <td><span class="badge badge-success">${p.estado}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon"><i class="fas fa-copy"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${productos.length} de ${productos.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item">3</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - CATEGORÍAS (DEV)
  // ============================================
  function renderCategorias() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Categorías de Productos</h1>
          <p class="page-subtitle">${categorias.length} categorías</p>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
          <button class="btn btn-primary btn-sm" onclick="openModal('new-categoria')">
            <i class="fas fa-plus"></i> Nueva Categoría
          </button>
        </div>
      </div>

      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo en desarrollo. Próximamente disponible con funcionalidades completas.</span>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Nivel</th>
                <th>Productos</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${categorias.map(c => `
                <tr>
                  <td class="mono fw-600">${c.codigo}</td>
                  <td>${c.nombre}</td>
                  <td>${c.nivel}</td>
                  <td>${c.productos}</td>
                  <td><span class="badge ${c.activa ? 'badge-success' : 'badge-danger'}">${c.activa ? 'Activa' : 'Inactiva'}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
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
  // RENDERIZADO - PLAN DE CUENTAS
  // ============================================
  function renderPlanCuentas() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Plan de Cuentas</h1>
          <p class="page-subtitle">${planCuentas.length} cuentas contables</p>
        </div>
        <div class="page-actions">
          <div class="dropdown">
            <button class="btn btn-secondary" onclick="toggleDropdown('plan-import')">
              <i class="fas fa-download"></i> Importar <i class="fas fa-chevron-down"></i>
            </button>
            <div class="dropdown-menu" id="plan-import">
              <div class="dropdown-item" onclick="importarExcel()"><i class="fas fa-file-excel"></i> Importar Excel</div>
              <div class="dropdown-item" onclick="importarXML()"><i class="fas fa-file-code"></i> Importar XML</div>
              <div class="dropdown-item" onclick="descargarPlantilla()"><i class="fas fa-download"></i> Plantilla Excel</div>
            </div>
          </div>
          <div class="dropdown">
            <button class="btn btn-secondary" onclick="toggleDropdown('plan-export')">
              <i class="fas fa-upload"></i> Exportar <i class="fas fa-chevron-down"></i>
            </button>
            <div class="dropdown-menu" id="plan-export">
              <div class="dropdown-item" onclick="exportarExcel()"><i class="fas fa-file-excel"></i> Exportar Excel</div>
              <div class="dropdown-item" onclick="exportarPDF()"><i class="fas fa-file-pdf"></i> Exportar PDF</div>
            </div>
          </div>
          <button class="btn btn-primary" onclick="openModal('new-cuenta')">
            <i class="fas fa-plus"></i> Nueva Cuenta
          </button>
        </div>
      </div>

      <div class="filters-panel">
        <div class="search-box" style="max-width: 400px;">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Buscar cuenta por código o nombre...">
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
                <th>Permite Movimiento</th>
                <th>Saldo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${planCuentas.map(c => `
                <tr>
                  <td class="mono fw-600">${c.codigo}</td>
                  <td>${c.nombre}</td>
                  <td>${c.nivel}</td>
                  <td><span class="badge ${c.naturaleza === 'DEUDORA' ? 'badge-info' : 'badge-warning'}">${c.naturaleza}</span></td>
                  <td>${c.permite_movimiento ? '<span class="badge badge-success">Sí</span>' : '<span class="badge badge-secondary">No</span>'}</td>
                  <td class="mono">${c.saldo ? '$' + c.saldo.toFixed(2) : '-'}</td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon"><i class="fas fa-history"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${planCuentas.length} de ${planCuentas.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item">3</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - ASIENTOS CONTABLES
  // ============================================
  function renderAsientos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Asientos Contables</h1>
          <p class="page-subtitle">${asientos.length} asientos contables</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-asiento')">
            <i class="fas fa-plus"></i> Nuevo Asiento
          </button>
        </div>
      </div>

      <div class="filters-panel">
        <div class="filters-grid" style="grid-template-columns: repeat(4, 1fr);">
          <div class="filter-group">
            <label>Buscar</label>
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Número o glosa...">
            </div>
          </div>
          <div class="filter-group">
            <label>Fecha desde</label>
            <input type="date" class="form-control" value="2024-01-01">
          </div>
          <div class="filter-group">
            <label>Fecha hasta</label>
            <input type="date" class="form-control" value="2024-01-31">
          </div>
          <div class="filter-group">
            <label>Estado</label>
            <select class="form-control">
              <option>Todos</option>
              <option>CONTABILIZADO</option>
              <option>BORRADOR</option>
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
          <div class="summary-icon"><i class="fas fa-calculator"></i></div>
          <div class="summary-value">${asientos.length}</div>
          <div class="summary-label">Total Asientos</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-check-circle"></i></div>
          <div class="summary-value">${asientos.filter(a => a.estado === 'CONTABILIZADO').length}</div>
          <div class="summary-label">Contabilizados</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-pen"></i></div>
          <div class="summary-value">${asientos.filter(a => a.estado === 'BORRADOR').length}</div>
          <div class="summary-label">Borradores</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-dollar-sign"></i></div>
          <div class="summary-value">$${asientos.reduce((s, a) => s + a.debe, 0).toLocaleString()}</div>
          <div class="summary-label">Total Debe</div>
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
                <th>Usuario</th>
                <th>Estado</th>
                <th>Acciones</th>
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
                  <td>${a.usuario}</td>
                  <td><span class="badge badge-success">${a.estado}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon"><i class="fas fa-copy"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${asientos.length} de ${asientos.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item">3</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - CENTROS DE COSTO
  // ============================================
  function renderCentrosCosto() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Centros de Costo</h1>
          <p class="page-subtitle">${centrosCosto.length} centros de costo</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-centro')">
            <i class="fas fa-plus"></i> Nuevo Centro
          </button>
        </div>
      </div>

      <div class="filters-panel">
        <div class="search-box" style="max-width: 400px;">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Buscar por código o nombre...">
        </div>
      </div>

      <div class="summary-cards" style="margin-bottom: 20px;">
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-diagram-project"></i></div>
          <div class="summary-value">${centrosCosto.length}</div>
          <div class="summary-label">Total Centros</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-dollar-sign"></i></div>
          <div class="summary-value">$${centrosCosto.reduce((s, c) => s + c.presupuesto, 0).toLocaleString()}</div>
          <div class="summary-label">Presupuesto Total</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-chart-line"></i></div>
          <div class="summary-value">$${centrosCosto.reduce((s, c) => s + c.ejecutado, 0).toLocaleString()}</div>
          <div class="summary-label">Ejecutado Total</div>
        </div>
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-percent"></i></div>
          <div class="summary-value">${((centrosCosto.reduce((s, c) => s + c.ejecutado, 0) / centrosCosto.reduce((s, c) => s + c.presupuesto, 0)) * 100).toFixed(1)}%</div>
          <div class="summary-label">Ejecución Global</div>
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
                <th>% Ejecución</th>
                <th>Saldo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${centrosCosto.map(c => {
                const porcentaje = (c.ejecutado / c.presupuesto * 100).toFixed(1);
                const saldo = c.presupuesto - c.ejecutado;
                return `
                  <tr>
                    <td class="mono fw-600">${c.codigo}</td>
                    <td>${c.nombre}</td>
                    <td class="mono">$${c.presupuesto.toFixed(2)}</td>
                    <td class="mono">$${c.ejecutado.toFixed(2)}</td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <span>${porcentaje}%</span>
                        <div class="progress" style="width: 80px;"><div class="progress-bar" style="width: ${porcentaje}%"></div></div>
                      </div>
                    </td>
                    <td class="mono ${saldo < 0 ? 'text-danger' : ''}">$${saldo.toFixed(2)}</td>
                    <td><span class="badge badge-success">${c.estado}</span></td>
                    <td>
                      <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                      <button class="btn btn-icon"><i class="fas fa-chart-line"></i></button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${centrosCosto.length} de ${centrosCosto.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - PROYECTOS (DEV)
  // ============================================
  function renderProyectos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Proyectos</h1>
          <p class="page-subtitle">${proyectos.length} proyectos activos</p>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>

      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo en desarrollo. Próximamente disponible con gestión completa de proyectos.</span>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Cliente</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Presupuesto</th>
                <th>Avance</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${proyectos.map(p => `
                <tr>
                  <td class="mono fw-600">${p.codigo}</td>
                  <td>${p.nombre}</td>
                  <td>${p.cliente}</td>
                  <td>${p.fecha_inicio}</td>
                  <td>${p.fecha_fin}</td>
                  <td class="mono">$${p.presupuesto.toFixed(2)}</td>
                  <td>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <span>${p.avance}%</span>
                      <div class="progress" style="width: 80px;"><div class="progress-bar" style="width: ${p.avance}%"></div></div>
                    </div>
                  </td>
                  <td><span class="badge badge-primary">${p.estado}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-eye"></i></button>
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
  // RENDERIZADO - PERIODOS CONTABLES
  // ============================================
  function renderPeriodosContables() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Periodos Contables</h1>
          <p class="page-subtitle">Gestión de periodos fiscales</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-periodo')">
            <i class="fas fa-plus"></i> Nuevo Periodo
          </button>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Año</th>
                <th>Mes</th>
                <th>Periodo</th>
                <th>Fecha Apertura</th>
                <th>Fecha Cierre</th>
                <th>Total Asientos</th>
                <th>Total Debe</th>
                <th>Total Haber</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${periodosContables.map(p => `
                <tr>
                  <td class="fw-600">${p.anio}</td>
                  <td>${p.mes}</td>
                  <td>${p.mes}/${p.anio}</td>
                  <td>${p.fecha_apertura}</td>
                  <td>${p.fecha_cierre || '-'}</td>
                  <td class="mono">${p.total_asientos}</td>
                  <td class="mono">$${p.total_debe.toFixed(2)}</td>
                  <td class="mono">$${p.total_haber.toFixed(2)}</td>
                  <td><span class="badge ${p.estado === 'ABIERTO' ? 'badge-success' : 'badge-secondary'}">${p.estado}</span></td>
                  <td>
                    ${p.estado === 'ABIERTO' ? '<button class="btn btn-warning btn-sm" onclick="cerrarPeriodo()">Cerrar</button>' : ''}
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
  // RENDERIZADO - BALANCE GENERAL (MEJORADO)
  // ============================================
  function renderBalanceGeneral() {
    const activos = planCuentas.filter(c => c.codigo.startsWith('1') && c.saldo).reduce((s, c) => s + (c.saldo || 0), 0);
    const pasivos = planCuentas.filter(c => c.codigo.startsWith('2') && c.saldo).reduce((s, c) => s + (c.saldo || 0), 0);
    const patrimonio = planCuentas.filter(c => c.codigo.startsWith('3') && c.saldo).reduce((s, c) => s + (c.saldo || 0), 0);
    
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Balance General</h1>
          <p class="page-subtitle">Al 29 de febrero de 2024</p>
        </div>
        <div class="page-actions">
          <div class="dropdown">
            <button class="btn btn-secondary" onclick="toggleDropdown('balance-export')">
              <i class="fas fa-download"></i> Exportar <i class="fas fa-chevron-down"></i>
            </button>
            <div class="dropdown-menu" id="balance-export">
              <div class="dropdown-item"><i class="fas fa-file-pdf"></i> Exportar a PDF</div>
              <div class="dropdown-item"><i class="fas fa-file-excel"></i> Exportar a Excel</div>
              <div class="dropdown-item"><i class="fas fa-print"></i> Imprimir</div>
            </div>
          </div>
          <button class="btn btn-primary" onclick="showSection('periodos-contables')">
            <i class="fas fa-calendar"></i> Cambiar Período
          </button>
        </div>
      </div>

      <div class="period-selector">
        <div class="period-nav">
          <button class="btn btn-icon"><i class="fas fa-chevron-left"></i></button>
          <span class="current-period">Febrero 2024</span>
          <button class="btn btn-icon"><i class="fas fa-chevron-right"></i></button>
        </div>
        <div class="period-info">
          <span><i class="far fa-calendar-alt"></i> Corte: 29/02/2024</span>
          <span><i class="fas fa-check-circle" style="color: var(--success);"></i> Período cerrado</span>
        </div>
      </div>

      <div class="balance-container">
        <div class="balance-section">
          <div class="section-header">
            <h2>ACTIVO</h2>
            <span class="section-total">$${activos.toLocaleString()}</span>
          </div>
          
          <div class="subsecciones">
            <div class="subseccion">
              <div class="subseccion-header" onclick="toggleSubseccion('activo-corriente')">
                <i class="fas fa-chevron-down"></i>
                <span>ACTIVO CORRIENTE</span>
                <span class="subseccion-total">$${planCuentas.find(c => c.codigo === '1.1')?.saldo.toLocaleString() || '0'}</span>
              </div>
              <div class="subseccion-content" id="activo-corriente">
                <table class="balance-table">
                  <tbody>
                    ${planCuentas.filter(c => c.codigo.startsWith('1.1') && c.nivel === 4).map(c => `
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
            
            <div class="subseccion">
              <div class="subseccion-header" onclick="toggleSubseccion('activo-no-corriente')">
                <i class="fas fa-chevron-down"></i>
                <span>ACTIVO NO CORRIENTE</span>
                <span class="subseccion-total">$${planCuentas.find(c => c.codigo === '1.2')?.saldo.toLocaleString() || '0'}</span>
              </div>
              <div class="subseccion-content" id="activo-no-corriente">
                <table class="balance-table">
                  <tbody>
                    ${planCuentas.filter(c => c.codigo.startsWith('1.2') && c.nivel === 4).map(c => `
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
          </div>
        </div>

        <div class="balance-section">
          <div class="section-header">
            <h2>PASIVO</h2>
            <span class="section-total">$${pasivos.toLocaleString()}</span>
          </div>
          
          <div class="subseccion">
            <div class="subseccion-header" onclick="toggleSubseccion('pasivo-corriente')">
              <i class="fas fa-chevron-down"></i>
              <span>PASIVO CORRIENTE</span>
              <span class="subseccion-total">$${planCuentas.find(c => c.codigo === '2.1')?.saldo.toLocaleString() || '0'}</span>
            </div>
            <div class="subseccion-content" id="pasivo-corriente">
              <table class="balance-table">
                <tbody>
                  ${planCuentas.filter(c => c.codigo.startsWith('2.1') && c.nivel === 4).map(c => `
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
        </div>

        <div class="balance-section">
          <div class="section-header">
            <h2>PATRIMONIO</h2>
            <span class="section-total">$${patrimonio.toLocaleString()}</span>
          </div>
          
          <div class="subseccion">
            <div class="subseccion-header" onclick="toggleSubseccion('patrimonio-detalle')">
              <i class="fas fa-chevron-down"></i>
              <span>PATRIMONIO NETO</span>
              <span class="subseccion-total">$${patrimonio.toLocaleString()}</span>
            </div>
            <div class="subseccion-content" id="patrimonio-detalle">
              <table class="balance-table">
                <tbody>
                  ${planCuentas.filter(c => c.codigo.startsWith('3') && c.nivel === 4).map(c => `
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

  // ============================================
  // RENDERIZADO - ESTADO DE RESULTADOS (MEJORADO)
  // ============================================
  function renderEstadoResultados() {
    const ingresos = planCuentas.filter(c => c.codigo.startsWith('4') && c.saldo).reduce((s, c) => s + (c.saldo || 0), 0);
    const gastos = planCuentas.filter(c => c.codigo.startsWith('5') && c.saldo).reduce((s, c) => s + (c.saldo || 0), 0);
    const utilidad = ingresos - gastos;
    
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Estado de Resultados</h1>
          <p class="page-subtitle">Del 1 al 29 de febrero de 2024</p>
        </div>
        <div class="page-actions">
          <div class="dropdown">
            <button class="btn btn-secondary" onclick="toggleDropdown('eerr-export')">
              <i class="fas fa-download"></i> Exportar <i class="fas fa-chevron-down"></i>
            </button>
            <div class="dropdown-menu" id="eerr-export">
              <div class="dropdown-item"><i class="fas fa-file-pdf"></i> Exportar a PDF</div>
              <div class="dropdown-item"><i class="fas fa-file-excel"></i> Exportar a Excel</div>
            </div>
          </div>
        </div>
      </div>

      <div class="resultados-container">
        <div class="resultados-section">
          <div class="section-header" onclick="toggleSeccion('ingresos')">
            <i class="fas fa-chevron-down"></i>
            <h2>INGRESOS OPERACIONALES</h2>
            <span class="section-total">$${ingresos.toLocaleString()}</span>
          </div>
          <div class="section-content" id="ingresos">
            <table class="resultados-table">
              <tbody>
                ${planCuentas.filter(c => c.codigo.startsWith('4') && c.nivel === 4).map(c => `
                  <tr>
                    <td>${c.nombre}</td>
                    <td class="mono">$${c.saldo.toFixed(2)}</td>
                  </tr>
                `).join('')}
                <tr class="total-row">
                  <td>TOTAL INGRESOS</td>
                  <td class="mono fw-700">$${ingresos.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="resultados-section">
          <div class="section-header" onclick="toggleSeccion('gastos')">
            <i class="fas fa-chevron-down"></i>
            <h2>GASTOS OPERACIONALES</h2>
            <span class="section-total">$${gastos.toLocaleString()}</span>
          </div>
          <div class="section-content" id="gastos">
            <table class="resultados-table">
              <tbody>
                ${planCuentas.filter(c => c.codigo.startsWith('5') && c.nivel === 4).map(c => `
                  <tr>
                    <td>${c.nombre}</td>
                    <td class="mono">$${c.saldo.toFixed(2)}</td>
                  </tr>
                `).join('')}
                <tr class="total-row">
                  <td>TOTAL GASTOS</td>
                  <td class="mono fw-700">$${gastos.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="resultados-neta ${utilidad >= 0 ? 'positiva' : 'negativa'}">
          <div class="neta-label">UTILIDAD DEL EJERCICIO</div>
          <div class="neta-valor">$${Math.abs(utilidad).toLocaleString()} ${utilidad >= 0 ? '(Utilidad)' : '(Pérdida)'}</div>
          <div class="neta-ratio">Margen: ${((utilidad / ingresos) * 100).toFixed(2)}%</div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - LIBRO MAYOR
  // ============================================
  function renderLibroMayor() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Libro Mayor</h1>
          <p class="page-subtitle">Movimientos detallados por cuenta contable</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary btn-sm"><i class="fas fa-file-pdf"></i> PDF</button>
          <button class="btn btn-secondary btn-sm"><i class="fas fa-file-excel"></i> Excel</button>
        </div>
      </div>

      <div class="cuenta-selector">
        <div class="form-group" style="flex: 1;">
          <label class="form-label">Seleccionar cuenta</label>
          <select class="form-control" onchange="cambiarCuentaLibroMayor(this.value)">
            ${planCuentas.filter(c => c.permite_movimiento).map(c => `
              <option value="${c.codigo}" ${c.codigo === '1.1.1.01' ? 'selected' : ''}>
                ${c.codigo} - ${c.nombre}
              </option>
            `).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Fecha desde</label>
          <input type="date" class="form-control" value="2024-01-01">
        </div>
        <div class="form-group">
          <label class="form-label">Fecha hasta</label>
          <input type="date" class="form-control" value="2024-01-31">
        </div>
      </div>

      <div class="cuenta-info">
        <div class="info-item">
          <span class="info-label">Cuenta:</span>
          <span class="info-value">1.1.1.01 - Caja General</span>
        </div>
        <div class="info-item">
          <span class="info-label">Naturaleza:</span>
          <span class="info-value badge badge-info">DEUDORA</span>
        </div>
        <div class="info-item">
          <span class="info-label">Saldo inicial:</span>
          <span class="info-value">$11,200.00</span>
        </div>
        <div class="info-item">
          <span class="info-label">Saldo final:</span>
          <span class="info-value">$13,600.00</span>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table class="libro-mayor-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Asiento</th>
                <th>Detalle</th>
                <th>Debe</th>
                <th>Haber</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              <tr class="saldo-inicial">
                <td colspan="5">SALDO INICIAL</td>
                <td class="mono fw-600">$11,200.00</td>
              </tr>
              <tr>
                <td>2024-01-15</td>
                <td class="mono">1</td>
                <td>Venta según factura 001-001-000001</td>
                <td class="mono">$1,400.00</td>
                <td class="mono">$0.00</td>
                <td class="mono">$12,600.00</td>
              </tr>
              <tr>
                <td>2024-01-15</td>
                <td class="mono">2</td>
                <td>Cobro parcial factura 001-001-000001</td>
                <td class="mono">$500.00</td>
                <td class="mono">$0.00</td>
                <td class="mono">$13,100.00</td>
              </tr>
              <tr>
                <td>2024-01-14</td>
                <td class="mono">3</td>
                <td>Pago a proveedor según factura 001-001-000001</td>
                <td class="mono">$0.00</td>
                <td class="mono">$1,200.00</td>
                <td class="mono">$11,900.00</td>
              </tr>
              <tr>
                <td>2024-01-13</td>
                <td class="mono">4</td>
                <td>Cobro cliente TechCorp</td>
                <td class="mono">$500.00</td>
                <td class="mono">$0.00</td>
                <td class="mono">$13,100.00</td>
              </tr>
              <tr>
                <td>2024-01-12</td>
                <td class="mono">5</td>
                <td>Pago de nómina</td>
                <td class="mono">$0.00</td>
                <td class="mono">$8,500.00</td>
                <td class="mono">$12,600.00</td>
              </tr>
              <tr class="saldo-final">
                <td colspan="5">SALDO FINAL</td>
                <td class="mono fw-700">$13,600.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="resumen-movimientos">
        <div class="resumen-item">
          <span class="resumen-label">Total Debe:</span>
          <span class="resumen-valor">$2,400.00</span>
        </div>
        <div class="resumen-item">
          <span class="resumen-label">Total Haber:</span>
          <span class="resumen-valor">$9,700.00</span>
        </div>
        <div class="resumen-item">
          <span class="resumen-label">Movimientos:</span>
          <span class="resumen-valor">5</span>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - FLUJO EFECTIVO (DEV)
  // ============================================
  function renderFlujoEfectivo() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Flujo de Efectivo</h1>
          <p class="page-subtitle">Módulo en desarrollo</p>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>

      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo de flujo de efectivo en desarrollo. Próximamente disponible.</span>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - CUENTAS POR COBRAR (MEJORADO)
  // ============================================
  function renderCxC() {
    const totalPendiente = cuentasCobrar.reduce((s, c) => s + c.saldo_pendiente, 0);
    const vencido = cuentasCobrar.filter(c => c.dias_mora > 30).reduce((s, c) => s + c.saldo_pendiente, 0);
    
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Cuentas por Cobrar</h1>
          <p class="page-subtitle">Gestión de cartera de clientes</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-secondary btn-sm" onclick="openModal('import-cxc')">
            <i class="fas fa-file-excel"></i> Importar
          </button>
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
        <div class="resumen-card vencido">
          <div class="resumen-icon"><i class="fas fa-exclamation-triangle"></i></div>
          <div class="resumen-content">
            <div class="resumen-label">Vencido</div>
            <div class="resumen-valor">$${vencido.toFixed(2)}</div>
          </div>
        </div>
        <div class="resumen-card por-vencer">
          <div class="resumen-icon"><i class="fas fa-clock"></i></div>
          <div class="resumen-content">
            <div class="resumen-label">Por Vencer</div>
            <div class="resumen-valor">$${(totalPendiente - vencido).toFixed(2)}</div>
          </div>
        </div>
        <div class="resumen-card clientes">
          <div class="resumen-icon"><i class="fas fa-users"></i></div>
          <div class="resumen-content">
            <div class="resumen-label">Clientes</div>
            <div class="resumen-valor">${cuentasCobrar.length}</div>
          </div>
        </div>
      </div>

      <div class="antiguedad-card">
        <div class="card-header">
          <h3>Antigüedad de Saldos</h3>
        </div>
        <div class="antiguedad-barras">
          <div class="barra-item">
            <span class="barra-label">0-30 días</span>
            <div class="barra-container">
              <div class="barra" style="width: 70%"></div>
            </div>
            <span class="barra-valor">$1,650.00</span>
          </div>
          <div class="barra-item">
            <span class="barra-label">31-60 días</span>
            <div class="barra-container">
              <div class="barra" style="width: 20%"></div>
            </div>
            <span class="barra-valor">$480.00</span>
          </div>
          <div class="barra-item">
            <span class="barra-label">61-90 días</span>
            <div class="barra-container">
              <div class="barra" style="width: 7%"></div>
            </div>
            <span class="barra-valor">$160.00</span>
          </div>
          <div class="barra-item">
            <span class="barra-label">90+ días</span>
            <div class="barra-container">
              <div class="barra" style="width: 3%"></div>
            </div>
            <span class="barra-valor">$62.00</span>
          </div>
        </div>
      </div>

      <div class="filters-panel">
        <div class="filters-grid" style="grid-template-columns: repeat(4, 1fr);">
          <div class="filter-group">
            <label>Cliente</label>
            <input type="text" class="form-control" placeholder="Nombre o RUC">
          </div>
          <div class="filter-group">
            <label>Estado</label>
            <select class="form-control">
              <option>Todos</option>
              <option>Pendiente</option>
              <option>Parcial</option>
              <option>Vencido</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Fecha desde</label>
            <input type="date" class="form-control" value="2024-01-01">
          </div>
          <div class="filter-group">
            <label>Fecha hasta</label>
            <input type="date" class="form-control" value="2024-01-31">
          </div>
        </div>
        <div class="search-actions">
          <button class="btn btn-primary"><i class="fas fa-search"></i> Buscar</button>
          <button class="btn btn-text">Limpiar</button>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table class="cxc-table">
            <thead>
              <tr>
                <th><input type="checkbox"></th>
                <th>Cliente</th>
                <th>Documento</th>
                <th>Fecha Emisión</th>
                <th>Fecha Venc.</th>
                <th>Monto</th>
                <th>Saldo</th>
                <th>Días</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${cuentasCobrar.map(c => `
                <tr>
                  <td><input type="checkbox"></td>
                  <td class="fw-600">${c.cliente}</td>
                  <td class="mono">${c.documento}</td>
                  <td>${c.fecha_emision}</td>
                  <td>${c.fecha_vencimiento}</td>
                  <td class="mono">$${c.monto_original.toFixed(2)}</td>
                  <td class="mono fw-600">$${c.saldo_pendiente.toFixed(2)}</td>
                  <td><span class="badge ${c.dias_mora > 30 ? 'badge-danger' : c.dias_mora > 15 ? 'badge-warning' : 'badge-success'}">${c.dias_mora}</span></td>
                  <td><span class="badge badge-warning">${c.estado}</span></td>
                  <td>
                    <div class="acciones-btns">
                      <button class="btn btn-icon" onclick="openModal('ver-cxc', '${c.documento}')" title="Ver"><i class="fas fa-eye"></i></button>
                      <button class="btn btn-icon btn-success" onclick="openModal('registrar-cobro', '${c.documento}')" title="Cobrar"><i class="fas fa-hand-holding-usd"></i></button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${cuentasCobrar.length} de ${cuentasCobrar.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - CUENTAS POR PAGAR
  // ============================================
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
        <div class="summary-card">
          <div class="summary-icon"><i class="fas fa-exclamation-triangle"></i></div>
          <div class="summary-value">${cuentasPagar.filter(c => c.dias_mora > 30).length}</div>
          <div class="summary-label">Vencidas</div>
        </div>
      </div>

      <div class="filters-panel">
        <div class="filters-grid" style="grid-template-columns: repeat(4, 1fr);">
          <div class="filter-group">
            <label>Proveedor</label>
            <input type="text" class="form-control" placeholder="Nombre o RUC">
          </div>
          <div class="filter-group">
            <label>Estado</label>
            <select class="form-control">
              <option>Todos</option>
              <option>Pendiente</option>
              <option>Parcial</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Fecha desde</label>
            <input type="date" class="form-control" value="2024-01-01">
          </div>
          <div class="filter-group">
            <label>Fecha hasta</label>
            <input type="date" class="form-control" value="2024-01-31">
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
                <th>Proveedor</th>
                <th>Documento</th>
                <th>Fecha Emisión</th>
                <th>Fecha Vencimiento</th>
                <th>Monto</th>
                <th>Saldo</th>
                <th>Días</th>
                <th>Estado</th>
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
                  <td><span class="badge ${c.dias_mora > 30 ? 'badge-danger' : 'badge-warning'}">${c.dias_mora}</span></td>
                  <td><span class="badge badge-warning">${c.estado}</span></td>
                  <td>
                    <button class="btn btn-primary btn-sm" onclick="openModal('registrar-pago', '${c.documento}')">Pagar</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${cuentasPagar.length} de ${cuentasPagar.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - COBROS
  // ============================================
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

      <div class="filters-panel">
        <div class="search-box" style="max-width: 400px;">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Buscar por número o cliente...">
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
                <th>Acciones</th>
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
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-icon"><i class="fas fa-file-pdf"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${cobros.length} de ${cobros.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - PAGOS
  // ============================================
  function renderPagos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Pagos</h1>
          <p class="page-subtitle">${pagos.length} pagos registrados</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-pago')">
            <i class="fas fa-plus"></i> Nuevo Pago
          </button>
        </div>
      </div>

      <div class="filters-panel">
        <div class="search-box" style="max-width: 400px;">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Buscar por número o proveedor...">
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Número</th>
                <th>Fecha</th>
                <th>Proveedor</th>
                <th>Factura</th>
                <th>Monto</th>
                <th>Forma Pago</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${pagos.map(p => `
                <tr>
                  <td class="mono fw-600">${p.numero}</td>
                  <td>${p.fecha}</td>
                  <td>${p.proveedor}</td>
                  <td class="mono">${p.factura}</td>
                  <td class="mono fw-600">$${p.monto.toFixed(2)}</td>
                  <td>${p.forma_pago}</td>
                  <td><span class="badge badge-success">${p.estado}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-eye"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${pagos.length} de ${pagos.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - BANCOS
  // ============================================
  function renderBancos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Catálogo de Bancos</h1>
          <p class="page-subtitle">${bancos.length} bancos registrados</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-banco')">
            <i class="fas fa-plus"></i> Nuevo Banco
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
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${bancos.map(b => `
                <tr>
                  <td class="mono fw-600">${b.codigo}</td>
                  <td>${b.nombre}</td>
                  <td><span class="badge ${b.activo ? 'badge-success' : 'badge-danger'}">${b.activo ? 'Activo' : 'Inactivo'}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${bancos.length} de ${bancos.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - CUENTAS BANCARIAS
  // ============================================
  function renderCuentasBancarias() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Cuentas Bancarias</h1>
          <p class="page-subtitle">${cuentasBancarias.length} cuentas registradas</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-cuenta-bancaria')">
            <i class="fas fa-plus"></i> Nueva Cuenta
          </button>
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
                <th>Moneda</th>
                <th>Saldo Actual</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${cuentasBancarias.map(c => `
                <tr>
                  <td class="fw-600">${c.banco}</td>
                  <td class="mono">${c.numero}</td>
                  <td>${c.tipo}</td>
                  <td>${c.moneda}</td>
                  <td class="mono fw-600">$${c.saldo_actual.toFixed(2)}</td>
                  <td><span class="badge ${c.activa ? 'badge-success' : 'badge-danger'}">${c.activa ? 'Activa' : 'Inactiva'}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon"><i class="fas fa-history"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${cuentasBancarias.length} de ${cuentasBancarias.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - CAJAS
  // ============================================
  function renderCajas() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Cajas</h1>
          <p class="page-subtitle">${cajas.length} cajas registradas</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-caja')">
            <i class="fas fa-plus"></i> Nueva Caja
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
                <th>Saldo Actual</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${cajas.map(c => `
                <tr>
                  <td class="mono fw-600">${c.codigo}</td>
                  <td>${c.nombre}</td>
                  <td class="mono fw-600">$${c.saldo_actual.toFixed(2)}</td>
                  <td><span class="badge ${c.activa ? 'badge-success' : 'badge-danger'}">${c.activa ? 'Activa' : 'Inactiva'}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${cajas.length} de ${cajas.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - CONCILIACIONES (DEV)
  // ============================================
  function renderConciliaciones() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Conciliaciones Bancarias</h1>
          <p class="page-subtitle">Módulo en desarrollo</p>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>

      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo de conciliaciones bancarias en desarrollo. Próximamente disponible.</span>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - ESTABLECIMIENTOS
  // ============================================
  function renderEstablecimientos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Establecimientos</h1>
          <p class="page-subtitle">${establecimientos.length} establecimientos</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-establecimiento')">
            <i class="fas fa-plus"></i> Nuevo Establecimiento
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
                <th>Dirección</th>
                <th>Matriz</th>
                <th>Puntos Emisión</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${establecimientos.map(e => `
                <tr>
                  <td class="mono fw-600">${e.codigo}</td>
                  <td>${e.nombre}</td>
                  <td>${e.direccion}</td>
                  <td>${e.es_matriz ? '<span class="badge badge-success">Sí</span>' : '<span class="badge badge-secondary">No</span>'}</td>
                  <td>${e.puntos_emision}</td>
                  <td><span class="badge ${e.activo ? 'badge-success' : 'badge-danger'}">${e.activo ? 'Activo' : 'Inactivo'}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${establecimientos.length} de ${establecimientos.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - PUNTOS DE EMISIÓN
  // ============================================
  function renderPuntosEmision() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Puntos de Emisión</h1>
          <p class="page-subtitle">${puntosEmision.length} puntos activos</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-punto')">
            <i class="fas fa-plus"></i> Nuevo Punto
          </button>
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${puntosEmision.map(p => `
                <tr>
                  <td class="fw-600">${p.establecimiento}</td>
                  <td class="mono">${p.codigo}</td>
                  <td>${p.descripcion}</td>
                  <td><span class="badge badge-primary">${p.tipo}</span></td>
                  <td><span class="badge ${p.activo ? 'badge-success' : 'badge-danger'}">${p.activo ? 'Activo' : 'Inactivo'}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${puntosEmision.length} de ${puntosEmision.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - SECUENCIALES
  // ============================================
  function renderSecuenciales() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Secuenciales</h1>
          <p class="page-subtitle">Control de numeración</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-secuencial')">
            <i class="fas fa-plus"></i> Nuevo Secuencial
          </button>
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${secuenciales.map(s => `
                <tr>
                  <td class="fw-600">${s.establecimiento}</td>
                  <td class="mono">${s.punto_emision}</td>
                  <td>${s.tipo_comprobante === '01' ? 'Factura' : s.tipo_comprobante === '04' ? 'Nota Crédito' : 'Retención'}</td>
                  <td class="mono fw-600">${s.siguiente}</td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${secuenciales.length} de ${secuenciales.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - RANGOS AUTORIZADOS
  // ============================================
  function renderRangosAutorizados() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Rangos Autorizados SRI</h1>
          <p class="page-subtitle">${rangosAutorizados.length} rangos activos</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-rango')">
            <i class="fas fa-plus"></i> Nuevo Rango
          </button>
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
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${rangosAutorizados.map(r => `
                <tr>
                  <td class="fw-600">${r.establecimiento}</td>
                  <td class="mono">${r.punto_emision}</td>
                  <td>${r.tipo_comprobante === '01' ? 'Factura' : 'NC'}</td>
                  <td class="mono">${r.numero_autorizacion}</td>
                  <td class="mono">${r.desde}</td>
                  <td class="mono">${r.hasta}</td>
                  <td>${r.fecha_autorizacion}</td>
                  <td><span class="badge ${r.activo ? 'badge-success' : 'badge-danger'}">${r.activo ? 'Activo' : 'Inactivo'}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${rangosAutorizados.length} de ${rangosAutorizados.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - SESIONES ACTIVAS
  // ============================================
  function renderSesionesActivas() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Sesiones Activas</h1>
          <p class="page-subtitle">${sesionesActivas.length} sesiones activas</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-danger btn-sm"><i class="fas fa-power-off"></i> Cerrar todas</button>
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${sesionesActivas.map(s => `
                <tr>
                  <td class="fw-600">${s.usuario}</td>
                  <td>${s.dispositivo}</td>
                  <td class="mono">${s.ip}</td>
                  <td>${s.ultima_actividad}</td>
                  <td>
                    <button class="btn btn-danger btn-sm"><i class="fas fa-power-off"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${sesionesActivas.length} de ${sesionesActivas.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - API KEYS
  // ============================================
  function renderApiKeys() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">API Keys</h1>
          <p class="page-subtitle">${apiKeys.length} claves API configuradas</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-api-key')">
            <i class="fas fa-plus"></i> Nueva API Key
          </button>
        </div>
      </div>

      <div class="card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Prefijo</th>
                <th>Nivel</th>
                <th>Usos</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${apiKeys.map(k => `
                <tr>
                  <td class="fw-600">${k.nombre}</td>
                  <td class="mono">${k.prefix}</td>
                  <td><span class="badge ${k.nivel_acceso === 'alto' ? 'badge-danger' : 'badge-warning'}">${k.nivel_acceso}</span></td>
                  <td class="mono">${k.usos.toLocaleString()}</td>
                  <td><span class="badge ${k.activa ? 'badge-success' : 'badge-danger'}">${k.activa ? 'Activa' : 'Inactiva'}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-icon"><i class="fas fa-ban"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${apiKeys.length} de ${apiKeys.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - MI PERFIL
  // ============================================
  function renderMiPerfil() {
    const u = usuarios[0];
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Mi Perfil</h1>
          <p class="page-subtitle">Configura tu información personal</p>
        </div>
      </div>

      <div class="perfil-grid">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Información Personal</h3>
          </div>
          <div class="card-body">
            <div class="avatar-section">
              <div class="avatar-large">${u.nombre.charAt(0)}${u.apellido.charAt(0)}</div>
              <button class="btn btn-secondary btn-sm">Cambiar foto</button>
            </div>
            
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">Nombres</label>
                <input class="form-control" value="${u.nombre}">
              </div>
              <div class="form-group">
                <label class="form-label">Apellidos</label>
                <input class="form-control" value="${u.apellido}">
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input class="form-control" value="${u.email}">
              </div>
              <div class="form-group">
                <label class="form-label">Teléfono</label>
                <input class="form-control" value="${u.telefono}">
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

  // ============================================
  // RENDERIZADO - PREFERENCIAS
  // ============================================
  function renderPreferencias() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Preferencias</h1>
          <p class="page-subtitle">Personaliza tu experiencia</p>
        </div>
      </div>

      <div class="card">
        <div class="card-body">
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Tema</label>
              <select class="form-control">
                <option>Oscuro</option>
                <option>Claro</option>
                <option>Sistema</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Idioma</label>
              <select class="form-control">
                <option>Español (Ecuador)</option>
                <option>Inglés</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Formato de Fecha</label>
              <select class="form-control">
                <option>DD/MM/YYYY</option>
                <option>MM/DD/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Zona Horaria</label>
              <select class="form-control">
                <option>America/Guayaquil</option>
                <option>America/New_York</option>
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

  // ============================================
  // RENDERIZADO - CONFIGURACIÓN EMPRESA
  // ============================================
  function renderConfiguracionEmpresa() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Configuración de Empresa</h1>
          <p class="page-subtitle">Administra los datos de tu empresa</p>
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
              <input class="form-control" value="1799999999001" readonly>
            </div>
            <div class="form-group">
              <label class="form-label">Razón Social</label>
              <input class="form-control" value="PANDORA FSO CIA. LTDA.">
            </div>
            <div class="form-group">
              <label class="form-label">Nombre Comercial</label>
              <input class="form-control" value="PANDORA FSO">
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input class="form-control" value="info@pandora.com.ec">
            </div>
            <div class="form-group">
              <label class="form-label">Teléfono</label>
              <input class="form-control" value="0998239803">
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
              <input class="form-control" value="Av. Amazonas N35-45 y Juan Pablo Sanz">
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
              <label class="form-label">Contribuyente Especial</label>
              <input class="form-control" value="Resolución 12345">
            </div>
            <div class="form-group">
              <label class="form-label">Agente de Retención</label>
              <input class="form-control" value="Resolución 6789">
            </div>
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

  // ============================================
  // RENDERIZADO - CONFIGURACIÓN SRI
  // ============================================
  function renderSriConfig() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Configuración SRI</h1>
          <p class="page-subtitle">Parámetros de facturación electrónica</p>
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
            <div class="form-group">
              <label class="form-label">Tipo de Emisión</label>
              <select class="form-control">
                <option selected>Normal</option>
                <option>Contingencia</option>
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
                <input type="text" class="form-control" value="certificado.p12" readonly>
                <button class="btn btn-secondary">Cambiar</button>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Contraseña</label>
              <input type="password" class="form-control" value="********">
            </div>
            <div class="form-group">
              <label class="form-check">
                <input type="checkbox" checked> Firmar automáticamente
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Datos de Contribuyente</h3>
        </div>
        <div class="card-body">
          <div class="form-grid-3">
            <div class="form-group">
              <label class="form-label">Contribuyente Especial</label>
              <input class="form-control" value="12345">
            </div>
            <div class="form-group">
              <label class="form-label">Agente de Retención</label>
              <input class="form-control" value="6789">
            </div>
            <div class="form-group">
              <label class="form-check">
                <input type="checkbox" checked> Obligado a contabilidad
              </label>
            </div>
          </div>
          <button class="btn btn-primary mt-4">Guardar Configuración</button>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - NOTIFICACIONES
  // ============================================
  function renderNotificacionesConfig() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Configuración de Notificaciones</h1>
          <p class="page-subtitle">Administra tus preferencias de notificación</p>
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
            <label class="checkbox-item">
              <input type="checkbox"> SMS
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
              <input type="checkbox" checked> Intento de login fallido
            </label>
            <label class="checkbox-item">
              <input type="checkbox" checked> Vencimiento de certificado
            </label>
            <label class="checkbox-item">
              <input type="checkbox" checked> Stock crítico
            </label>
            <label class="checkbox-item">
              <input type="checkbox"> Nuevo usuario creado
            </label>
          </div>

          <button class="btn btn-primary">Guardar Configuración</button>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - SEGURIDAD
  // ============================================
  function renderSeguridad() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Seguridad</h1>
          <p class="page-subtitle">Configuración de seguridad de la cuenta</p>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Autenticación de Dos Factores</h3>
          </div>
          <div class="card-body">
            <p class="mb-3">Añade una capa extra de seguridad a tu cuenta.</p>
            <div class="alert alert-info">
              <i class="fas fa-info-circle"></i>
              <span>La autenticación de dos factores está desactivada.</span>
            </div>
            <button class="btn btn-primary mt-3">Activar 2FA</button>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Sesiones Activas</h3>
          </div>
          <div class="card-body">
            <div class="session-item">
              <i class="fas fa-desktop"></i>
              <span>Chrome / Windows 11 - IP: 190.12.34.56</span>
              <span class="badge badge-success">Actual</span>
            </div>
            <div class="session-item">
              <i class="fas fa-mobile-alt"></i>
              <span>App Móvil - IP: 190.56.78.90</span>
              <span class="badge badge-secondary">Hace 2 días</span>
            </div>
            <button class="btn btn-danger btn-sm mt-3">Cerrar todas las sesiones</button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Registro de Actividad</h3>
        </div>
        <div class="card-body">
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Usuario</th>
                  <th>Acción</th>
                  <th>IP</th>
                  <th>Dispositivo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-03-15 14:30</td>
                  <td>Dev Admin</td>
                  <td>Inicio de sesión</td>
                  <td>190.12.34.56</td>
                  <td>Chrome / Windows 11</td>
                </tr>
                <tr>
                  <td>2024-03-15 10:15</td>
                  <td>Juan Pérez</td>
                  <td>Factura autorizada</td>
                  <td>186.45.67.89</td>
                  <td>Firefox / Windows 10</td>
                </tr>
                <tr>
                  <td>2024-03-14 16:45</td>
                  <td>María González</td>
                  <td>Cambio de contraseña</td>
                  <td>190.45.67.89</td>
                  <td>Chrome / Android</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - IMPUESTOS SRI
  // ============================================
  function renderImpuestosSRI() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Impuestos SRI</h1>
          <p class="page-subtitle">Catálogo de impuestos</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-impuesto')">
            <i class="fas fa-plus"></i> Nuevo Impuesto
          </button>
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${impuestosSRI.map(i => `
                <tr>
                  <td class="mono fw-600">${i.codigo}</td>
                  <td>${i.descripcion}</td>
                  <td><span class="badge ${i.activo ? 'badge-success' : 'badge-danger'}">${i.activo ? 'Activo' : 'Inactivo'}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${impuestosSRI.length} de ${impuestosSRI.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - TARIFAS IMPUESTOS
  // ============================================
  function renderTarifasImpuestos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Tarifas de Impuestos</h1>
          <p class="page-subtitle">${tarifasImpuestos.length} tarifas configuradas</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-tarifa')">
            <i class="fas fa-plus"></i> Nueva Tarifa
          </button>
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
                <th>Vigencia</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${tarifasImpuestos.map(t => `
                <tr>
                  <td>${t.impuesto}</td>
                  <td class="mono">${t.codigo}</td>
                  <td>${t.descripcion}</td>
                  <td class="mono fw-600">${t.porcentaje}%</td>
                  <td>${t.fecha_inicio || '2000-01-01'} - ${t.fecha_fin || 'Actual'}</td>
                  <td><span class="badge ${t.activo ? 'badge-success' : 'badge-danger'}">${t.activo ? 'Activo' : 'Inactivo'}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${tarifasImpuestos.length} de ${tarifasImpuestos.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - FORMAS DE PAGO
  // ============================================
  function renderFormasPagoSRI() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Formas de Pago SRI</h1>
          <p class="page-subtitle">${formasPagoSRI.length} formas de pago</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-forma-pago')">
            <i class="fas fa-plus"></i> Nueva Forma de Pago
          </button>
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
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${formasPagoSRI.map(f => `
                <tr>
                  <td class="mono fw-600">${f.codigo}</td>
                  <td>${f.descripcion}</td>
                  <td><span class="badge ${f.activo ? 'badge-success' : 'badge-danger'}">${f.activo ? 'Activo' : 'Inactivo'}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${formasPagoSRI.length} de ${formasPagoSRI.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - TIPOS DE COMPROBANTE
  // ============================================
  function renderTiposComprobanteSRI() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Tipos de Comprobante SRI</h1>
          <p class="page-subtitle">${tiposComprobanteSRI.length} tipos</p>
        </div>
        <div class="page-actions">
          <button class="btn btn-primary btn-sm" onclick="openModal('new-tipo')">
            <i class="fas fa-plus"></i> Nuevo Tipo
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
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              ${tiposComprobanteSRI.map(t => `
                <tr>
                  <td class="mono fw-600">${t.codigo}</td>
                  <td>${t.nombre}</td>
                  <td><span class="badge ${t.activo ? 'badge-success' : 'badge-danger'}">${t.activo ? 'Activo' : 'Inactivo'}</span></td>
                  <td>
                    <button class="btn btn-icon"><i class="fas fa-edit"></i></button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          <div>Mostrando 1-${tiposComprobanteSRI.length} de ${tiposComprobanteSRI.length}</div>
          <div class="pagination">
            <button class="page-item"><i class="fas fa-chevron-left"></i></button>
            <button class="page-item active">1</button>
            <button class="page-item">2</button>
            <button class="page-item"><i class="fas fa-chevron-right"></i></button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - EMPLEADOS (DEV)
  // ============================================
  function renderEmpleados() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Empleados</h1>
          <p class="page-subtitle">Gestión de personal</p>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
          <button class="btn btn-primary btn-sm" onclick="openModal('new-empleado')">
            <i class="fas fa-plus"></i> Nuevo Empleado
          </button>
        </div>
      </div>

      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo de empleados en desarrollo. Próximamente disponible.</span>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - NÓMINAS (DEV)
  // ============================================
  function renderNominas() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Nóminas</h1>
          <p class="page-subtitle">Gestión de nóminas y roles de pago</p>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
          <button class="btn btn-primary btn-sm" onclick="openModal('new-nomina')">
            <i class="fas fa-plus"></i> Nueva Nómina
          </button>
        </div>
      </div>

      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo de nóminas en desarrollo. Próximamente disponible.</span>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - BODEGAS (DEV)
  // ============================================
  function renderBodegas() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Bodegas</h1>
          <p class="page-subtitle">Gestión de almacenes</p>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
          <button class="btn btn-primary btn-sm" onclick="openModal('new-bodega')">
            <i class="fas fa-plus"></i> Nueva Bodega
          </button>
        </div>
      </div>

      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo de bodegas en desarrollo. Próximamente disponible.</span>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - KARDEX (DEV)
  // ============================================
  function renderKardex() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Kardex</h1>
          <p class="page-subtitle">Control de inventario valorado</p>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
        </div>
      </div>

      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo de kardex en desarrollo. Próximamente disponible.</span>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - MOVIMIENTOS INVENTARIO (DEV)
  // ============================================
  function renderMovimientosInventario() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Movimientos de Inventario</h1>
          <p class="page-subtitle">Registro de entradas y salidas</p>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
          <button class="btn btn-primary btn-sm" onclick="openModal('new-movimiento')">
            <i class="fas fa-plus"></i> Nuevo Movimiento
          </button>
        </div>
      </div>

      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo de movimientos en desarrollo. Próximamente disponible.</span>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - ACTIVOS FIJOS (DEV)
  // ============================================
  function renderActivosFijos() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Activos Fijos</h1>
          <p class="page-subtitle">Gestión de activos de la empresa</p>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
          <button class="btn btn-primary btn-sm" onclick="openModal('new-activo')">
            <i class="fas fa-plus"></i> Nuevo Activo
          </button>
        </div>
      </div>

      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo de activos fijos en desarrollo. Próximamente disponible.</span>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - DEPRECIACIONES (DEV)
  // ============================================
  function renderDepreciaciones() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Depreciaciones</h1>
          <p class="page-subtitle">Cálculo de depreciación de activos</p>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
          <button class="btn btn-primary btn-sm" onclick="openModal('calcular-depreciacion')">
            <i class="fas fa-calculator"></i> Calcular
          </button>
        </div>
      </div>

      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo de depreciaciones en desarrollo. Próximamente disponible.</span>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - COTIZACIONES (DEV)
  // ============================================
  function renderCotizaciones() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Cotizaciones</h1>
          <p class="page-subtitle">Gestión de cotizaciones a clientes</p>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
          <button class="btn btn-primary btn-sm" onclick="openModal('new-cotizacion')">
            <i class="fas fa-plus"></i> Nueva Cotización
          </button>
        </div>
      </div>

      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo de cotizaciones en desarrollo. Próximamente disponible.</span>
      </div>
    `;
  }

  // ============================================
  // RENDERIZADO - PROFORMAS (DEV)
  // ============================================
  function renderProformas() {
    return `
      <div class="page-header">
        <div>
          <h1 class="page-title">Proformas</h1>
          <p class="page-subtitle">Documentos proforma para clientes</p>
        </div>
        <div class="page-actions">
          <span class="badge badge-info">DEV</span>
          <button class="btn btn-primary btn-sm" onclick="openModal('new-proforma')">
            <i class="fas fa-plus"></i> Nueva Proforma
          </button>
        </div>
      </div>

      <div class="alert alert-info">
        <i class="fas fa-info-circle"></i>
        <span>Módulo de proformas en desarrollo. Próximamente disponible.</span>
      </div>
    `;
  }

  // ============================================
  // FUNCIONES AUXILIARES
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
  // FUNCIONES DE MODAL
  // ============================================
  function openModal(type, id = null) {
    const modal = document.getElementById('modal-overlay');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    const footer = document.getElementById('modal-footer');

    if (!modal) return;

    if (type === 'company-switch') {
      title.innerHTML = 'Cambiar empresa activa';
      body.innerHTML = `
        <div class="empresa-list">
          ${tenants.map(t => `
            <div class="empresa-item" onclick="selectCompany('${t.nombre_comercial}')">
              <div class="empresa-icon"><i class="fas fa-building"></i></div>
              <div class="empresa-info">
                <div class="empresa-nombre">${t.nombre_comercial}</div>
                <div class="empresa-ruc">${t.ruc}</div>
              </div>
              <span class="badge badge-primary">${t.plan}</span>
            </div>
          `).join('')}
        </div>
      `;
      footer.innerHTML = '<button class="btn btn-secondary" onclick="closeModal()">Cerrar</button>';
    } else if (type === 'notifications') {
      title.innerHTML = 'Notificaciones';
      body.innerHTML = renderNotificationsModal();
      footer.innerHTML = '<button class="btn btn-secondary" onclick="closeModal()">Cerrar</button>';
    } else if (type === 'new-tenant') {
      title.innerHTML = 'Nueva Empresa';
      body.innerHTML = `
        <form class="modal-form">
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">RUC <span class="text-danger">*</span></label>
              <input class="form-control" placeholder="13 dígitos">
            </div>
            <div class="form-group">
              <label class="form-label">Razón Social <span class="text-danger">*</span></label>
              <input class="form-control">
            </div>
            <div class="form-group">
              <label class="form-label">Nombre Comercial</label>
              <input class="form-control">
            </div>
            <div class="form-group">
              <label class="form-label">Plan</label>
              <select class="form-control">
                <option>Básico</option>
                <option>Profesional</option>
                <option>Enterprise</option>
              </select>
            </div>
          </div>
        </form>
      `;
      footer.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="closeModal()">Guardar</button>
      `;
    } else if (type === 'new-user') {
      title.innerHTML = 'Nuevo Usuario';
      body.innerHTML = `
        <form class="modal-form">
          <div class="form-group">
            <label class="form-label">Nombres</label>
            <input class="form-control">
          </div>
          <div class="form-group">
            <label class="form-label">Apellidos</label>
            <input class="form-control">
          </div>
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-control">
          </div>
          <div class="form-group">
            <label class="form-label">Empresa</label>
            <select class="form-control">
              ${tenants.map(t => `<option>${t.nombre_comercial}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Rol</label>
            <select class="form-control">
              <option value="super_admin">Super Admin</option>
              <option value="admin">Administrador</option>
              <option value="operativo">Operativo</option>
            </select>
          </div>
          <div class="form-group" id="tipoOperativoField" style="display: none;">
            <label class="form-label">Tipo Operativo</label>
            <select class="form-control">
              ${tiposOperativos.map(to => `<option value="${to.id}">${to.nombre}</option>`).join('')}
            </select>
          </div>
        </form>
        <script>
          document.querySelector('#new-user select[name="rol"]').addEventListener('change', function() {
            document.getElementById('tipoOperativoField').style.display = this.value === 'operativo' ? 'block' : 'none';
          });
        </script>
      `;
      footer.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="closeModal()">Guardar</button>
      `;
    } else if (type === 'new-cobro') {
      title.innerHTML = 'Registrar Cobro';
      body.innerHTML = `
        <form class="modal-form">
          <div class="form-group">
            <label class="form-label">Cliente</label>
            <select class="form-control">
              <option>TechCorp S.A.</option>
              <option>Consultoría M&A</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Factura</label>
            <select class="form-control">
              <option>FAC-001-001-000001 - $1,400.00</option>
              <option>FAC-001-001-000002 - $952.56</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Monto a cobrar</label>
            <input type="number" class="form-control" value="1400.00">
          </div>
          <div class="form-group">
            <label class="form-label">Fecha de cobro</label>
            <input type="date" class="form-control" value="2024-01-31">
          </div>
          <div class="form-group">
            <label class="form-label">Forma de pago</label>
            <select class="form-control">
              <option>Efectivo</option>
              <option>Transferencia</option>
              <option>Tarjeta de crédito</option>
              <option>Cheque</option>
            </select>
          </div>
        </form>
      `;
      footer.innerHTML = `
        <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
        <button class="btn btn-primary" onclick="closeModal()">Registrar Cobro</button>
      `;
    } else if (type === 'view-factura' && id) {
      const factura = facturas.find(f => f.numero === id);
      title.innerHTML = `Factura ${id}`;
      body.innerHTML = `
        <div class="factura-detalle">
          <p><strong>Cliente:</strong> ${factura.cliente}</p>
          <p><strong>RUC:</strong> ${factura.ruc}</p>
          <p><strong>Fecha:</strong> ${factura.fecha}</p>
          <p><strong>Total:</strong> $${factura.total.toFixed(2)}</p>
          <p><strong>Estado:</strong> ${factura.estado}</p>
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

  function selectCompany(companyName) {
    document.getElementById('header-company').textContent = companyName;
    closeModal();
  }

  // ============================================
  // EXPORTAR FUNCIONES GLOBALMENTE
  // ============================================
  window.showSection = showSection;
  window.toggleSidebar = toggleSidebar;
  window.toggleNotifications = toggleNotifications;
  window.toggleUserMenu = toggleUserMenu;
  window.toggleSection = toggleSection;
  window.toggleDropdown = toggleDropdown;
  window.toggleSeccion = toggleSeccion;
  window.toggleSubseccion = toggleSubseccion;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.selectCompany = selectCompany;
})();