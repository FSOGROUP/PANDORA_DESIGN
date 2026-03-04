Migración 0001: Extensiones PostgreSQL
(Esta migración no crea tablas, solo instala extensiones)

Migración 0002: Catálogos del SRI
Tabla: sri_impuestos

codigo (CHAR(1), PK)

descripcion (VARCHAR(100))

Tabla: sri_impuestos_tarifas

id (SERIAL, PK)

codigo_impuesto (CHAR(1), FK a sri_impuestos.codigo)

codigo_tarifa (CHAR(4))

descripcion (VARCHAR(100))

porcentaje (DECIMAL(5,2))

fecha_inicio (DATE)

fecha_fin (DATE)

Tabla: sri_formas_pago

codigo (CHAR(2), PK)

descripcion (VARCHAR(100))

activo (BOOLEAN)

Tabla: sri_tipos_comprobante

codigo (CHAR(2), PK)

nombre (VARCHAR(100))

Tabla: sri_tipos_retencion

id (SERIAL, PK)

codigo_impuesto (VARCHAR(5))

codigo_retencion (VARCHAR(5))

descripcion (VARCHAR(200))

porcentaje (DECIMAL(5,2))

activo (BOOLEAN)

Migración 0003: Multi-Tenancy (Tenants)
Tabla: tenants

id (UUID, PK)

nombre_comercial (VARCHAR(255))

slug (VARCHAR(100))

estado (VARCHAR(20))

plan (VARCHAR(50))

configuracion_json (JSONB)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Migración 0004: Sistema de Autenticación y Seguridad
Tabla: usuarios

id (UUID, PK)

tenant_id (UUID, FK a tenants.id)

email (CITEXT)

clave_hash (TEXT)

nombre (VARCHAR(100))

apellido (VARCHAR(100))

es_admin_tenant (BOOLEAN)

esta_activo (BOOLEAN)

ultima_conexion (TIMESTAMP WITH TIME ZONE)

telefono (VARCHAR(20))

foto_url (TEXT)

idioma (VARCHAR(5))

zona_horaria (VARCHAR(50))

mfa_habilitado (BOOLEAN)

mfa_secret (TEXT)

mfa_backup_codes (TEXT[])

intentos_login_fallidos (INTEGER)

bloqueado_hasta (TIMESTAMP WITH TIME ZONE)

motivo_bloqueo (TEXT)

requiere_cambio_clave (BOOLEAN)

ultima_cambio_clave (TIMESTAMP WITH TIME ZONE)

preferencias_json (JSONB)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: auth_refresh_tokens

id (UUID, PK)

usuario_id (UUID, FK a usuarios.id)

token_hash (TEXT)

expires_at (TIMESTAMP WITH TIME ZONE)

revoked (BOOLEAN)

revoked_at (TIMESTAMP WITH TIME ZONE)

revoked_reason (TEXT)

created_at (TIMESTAMP)

Tabla: auth_sesiones_activas

id (UUID, PK)

usuario_id (UUID, FK a usuarios.id)

tenant_id (UUID, FK a tenants.id)

session_token_hash (TEXT)

refresh_token_id (UUID, FK a auth_refresh_tokens.id)

dispositivo_nombre (VARCHAR(255))

dispositivo_tipo (VARCHAR(50))

navegador (VARCHAR(100))

sistema_operativo (VARCHAR(100))

ip_address (VARCHAR(45))

pais (VARCHAR(100))

ciudad (VARCHAR(100))

latitud (DECIMAL(10,8))

longitud (DECIMAL(11,8))

fecha_login (TIMESTAMP WITH TIME ZONE)

ultima_actividad (TIMESTAMP WITH TIME ZONE)

fecha_logout (TIMESTAMP WITH TIME ZONE)

expires_at (TIMESTAMP WITH TIME ZONE)

activa (BOOLEAN)

user_agent (TEXT)

datos_adicionales (JSONB)

Tabla: auth_login_intentos

id (UUID, PK)

tenant_id (UUID, FK a tenants.id)

usuario_id (UUID, FK a usuarios.id)

email_intento (CITEXT)

exitoso (BOOLEAN)

motivo_fallo (VARCHAR(100))

ip_address (VARCHAR(45))

user_agent (TEXT)

pais (VARCHAR(100))

ciudad (VARCHAR(100))

navegador (VARCHAR(100))

sistema_operativo (VARCHAR(100))

dispositivo_tipo (VARCHAR(50))

created_at (TIMESTAMP WITH TIME ZONE)

Tabla: auth_password_reset

id (UUID, PK)

usuario_id (UUID, FK a usuarios.id)

token_hash (TEXT)

expires_at (TIMESTAMP WITH TIME ZONE)

usado (BOOLEAN)

usado_at (TIMESTAMP WITH TIME ZONE)

ip_solicitud (VARCHAR(45))

ip_uso (VARCHAR(45))

created_at (TIMESTAMP WITH TIME ZONE)

Tabla: seguridad_ip_control

id (UUID, PK)

tenant_id (UUID, FK a tenants.id)

ip_address (VARCHAR(45))

ip_range (VARCHAR(50))

tipo (VARCHAR(20))

aplica_a (VARCHAR(20))

motivo (TEXT)

activo (BOOLEAN)

pais (VARCHAR(100))

organizacion (VARCHAR(255))

creado_por (UUID, FK a usuarios.id)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: api_keys

id (UUID, PK)

tenant_id (UUID, FK a tenants.id)

razon_social_id (UUID)

nombre (VARCHAR(255))

descripcion (TEXT)

key_hash (TEXT)

key_prefix (VARCHAR(10))

permisos_json (JSONB)

nivel_acceso (VARCHAR(20))

ips_permitidas (TEXT[])

rate_limit_por_minuto (INTEGER)

rate_limit_por_hora (INTEGER)

expires_at (TIMESTAMP WITH TIME ZONE)

activa (BOOLEAN)

revocada (BOOLEAN)

revocada_at (TIMESTAMP WITH TIME ZONE)

motivo_revocacion (TEXT)

ultimo_uso (TIMESTAMP WITH TIME ZONE)

contador_uso (INTEGER)

creado_por (UUID, FK a usuarios.id)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: api_keys_log

id (UUID, PK)

api_key_id (UUID, FK a api_keys.id)

metodo (VARCHAR(10))

endpoint (VARCHAR(500))

ip_address (VARCHAR(45))

status_code (INTEGER)

tiempo_respuesta_ms (INTEGER)

rate_limit_excedido (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

Tabla: roles

id (UUID, PK)

tenant_id (UUID, FK a tenants.id)

nombre (VARCHAR(100))

nivel_rol (VARCHAR(20))

tipo_operativo (VARCHAR(50))

descripcion (TEXT)

permisos_json (JSONB)

es_rol_sistema (BOOLEAN)

activo (BOOLEAN)

created_at (TIMESTAMP)

updated_at (TIMESTAMP)

Tabla: usuario_roles

usuario_id (UUID, FK a usuarios.id)

rol_id (UUID, FK a roles.id)

Tabla: usuarios_preferencias

id (UUID, PK)

usuario_id (UUID, FK a usuarios.id)

tema (VARCHAR(20))

color_acento (VARCHAR(7))

tamano_fuente (VARCHAR(10))

idioma (VARCHAR(5))

zona_horaria (VARCHAR(50))

formato_fecha (VARCHAR(15))

formato_hora (VARCHAR(5))

moneda_display (VARCHAR(3))

separador_decimal (CHAR(1))

separador_miles (CHAR(1))

modulos_favoritos (TEXT[])

pagina_inicio (VARCHAR(100))

items_por_pagina (INTEGER)

confirmar_antes_eliminar (BOOLEAN)

mostrar_atajos_teclado (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: usuarios_notificaciones_config

id (UUID, PK)

usuario_id (UUID, FK a usuarios.id)

evento (VARCHAR(80))

canal_app (BOOLEAN)

canal_email (BOOLEAN)

canal_sms (BOOLEAN)

canal_webhook (BOOLEAN)

frecuencia (VARCHAR(20))

activo (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Migración 0005: Empresas y Estructura Fiscal
Tabla: razones_sociales

id (UUID, PK)

tenant_id (UUID, FK a tenants.id)

ruc (CHAR(13))

razon_social (VARCHAR(255))

nombre_comercial (VARCHAR(255))

direccion_matriz (TEXT)

obligado_contabilidad (BOOLEAN)

contribuyente_especial (VARCHAR(50))

agente_retencion (VARCHAR(50))

tipo_regimen (VARCHAR(100))

tipo_negocio (VARCHAR(20))

ambiente_sri (SMALLINT)

tipo_emision_sri (CHAR(1))

p12_archivo_path (TEXT)

p12_clave_encrypted (TEXT)

logo_url (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: usuario_acceso_empresa

usuario_id (UUID, FK a usuarios.id)

razon_social_id (UUID, FK a razones_sociales.id)

created_at (TIMESTAMP)

Tabla: establecimientos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

codigo_sri (CHAR(3))

nombre (VARCHAR(150))

direccion (TEXT)

es_matriz (BOOLEAN)

codigo_sectorial (VARCHAR(50))

tipo_establecimiento (VARCHAR(50))

usa_caja (BOOLEAN)

usa_caja_chica (BOOLEAN)

presupuesto_mensual (DECIMAL(18,2))

presupuesto_anual (DECIMAL(18,2))

activo (BOOLEAN)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: usuario_establecimientos

usuario_id (UUID, FK a usuarios.id)

establecimiento_id (UUID, FK a establecimientos.id)

es_default (BOOLEAN)

puede_ver_otras (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

Tabla: puntos_emision

id (UUID, PK)

establecimiento_id (UUID, FK a establecimientos.id)

codigo_sri (CHAR(3))

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: secuenciales_documentos

id (UUID, PK)

punto_emision_id (UUID, FK a puntos_emision.id)

tipo_comprobante (CHAR(2), FK a sri_tipos_comprobante.codigo)

siguiente_numero (INTEGER)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: rangos_autorizados_sri

id (UUID, PK)

punto_emision_id (UUID, FK a puntos_emision.id)

tipo_comprobante (CHAR(2), FK a sri_tipos_comprobante.codigo)

numero_autorizacion (VARCHAR(50))

desde (INTEGER)

hasta (INTEGER)

fecha_autorizacion (DATE)

fecha_vencimiento (DATE)

activo (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: personas

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

tipo_persona (VARCHAR(20))

identificacion (VARCHAR(20))

nombres (VARCHAR(150))

apellidos (VARCHAR(150))

nombre_legal (VARCHAR(255))

nombre_comercial (VARCHAR(255))

contribuyente_especial (VARCHAR(50))

obligado_llevar_contabilidad (BOOLEAN)

representante_legal_nombre (VARCHAR(255))

representante_legal_identificacion (VARCHAR(20))

email (CITEXT)

email_secundario (CITEXT)

telefono_movil (VARCHAR(20))

telefono_fijo (VARCHAR(20))

telefono (VARCHAR(50))

direccion (TEXT)

ciudad (VARCHAR(100))

provincia (VARCHAR(100))

codigo_postal (VARCHAR(10))

pais (VARCHAR(50))

es_cliente (BOOLEAN)

es_proveedor (BOOLEAN)

categoria (VARCHAR(50))

segmento (VARCHAR(50))

limite_credito (DECIMAL(18,2))

plazo_pago_dias (INTEGER)

descuento_predeterminado (DECIMAL(5,2))

forma_pago_preferida (CHAR(2), FK a sri_formas_pago.codigo)

banco_pago_id (UUID)

numero_cuenta_bancaria (VARCHAR(50))

tipo_cuenta_bancaria (VARCHAR(20))

vendedor_asignado_id (UUID, FK a usuarios.id)

cobrador_asignado_id (UUID, FK a usuarios.id)

activo (BOOLEAN)

motivo_inactivacion (TEXT)

fecha_registro (DATE)

fecha_primera_compra (DATE)

fecha_ultima_compra (DATE)

fecha_primera_venta (DATE)

fecha_ultima_venta (DATE)

observaciones (TEXT)

notas_internas (TEXT)

sitio_web (VARCHAR(255))

imagen_logo_url (TEXT)

created_at (TIMESTAMP)

updated_at (TIMESTAMP)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: bancos_catalogo

id (UUID, PK)

codigo (VARCHAR(10))

nombre (VARCHAR(150))

activo (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

Tabla: cuentas_bancarias

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

banco_id (UUID, FK a bancos_catalogo.id)

numero_cuenta (VARCHAR(50))

tipo_cuenta (VARCHAR(20))

moneda (VARCHAR(3))

saldo_inicial (DECIMAL(18,2))

saldo_actual (DECIMAL(18,2))

cuenta_contable_id (UUID)

activa (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: cajas

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

codigo (VARCHAR(20))

nombre (VARCHAR(100))

descripcion (TEXT)

saldo_actual (DECIMAL(18,2))

cuenta_contable_id (UUID)

activa (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Migración 0006: Núcleo Contable
Tabla: plan_cuentas

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

id_padre (UUID, FK a plan_cuentas.id)

codigo_cuenta (VARCHAR(50))

nombre_cuenta (VARCHAR(200))

nivel (INTEGER)

tipo_cuenta (VARCHAR(50))

naturaleza (CHAR(1))

permite_movimiento (BOOLEAN)

saldo_inicial (DECIMAL(18,2))

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: centros_costos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

codigo (VARCHAR(20))

nombre (VARCHAR(100))

descripcion (TEXT)

activo (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: proyectos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

codigo (VARCHAR(50))

nombre (VARCHAR(255))

descripcion (TEXT)

cliente_id (UUID)

fecha_inicio (DATE)

fecha_fin_estimada (DATE)

fecha_fin_real (DATE)

presupuesto_estimado (DECIMAL(18,2))

costo_real (DECIMAL(18,2))

ingreso_real (DECIMAL(18,2))

tipo_proyecto (VARCHAR(50))

prioridad (VARCHAR(20))

estado (VARCHAR(20))

responsable_id (UUID, FK a usuarios.id)

equipo_ids (JSONB)

ubicacion (TEXT)

establecimiento_id (UUID, FK a establecimientos.id)

datos_adicionales (JSONB)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: asientos_contables

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

numero_asiento (INTEGER)

fecha_asiento (DATE)

glosa_general (TEXT)

tipo_asiento (VARCHAR(50))

estado (VARCHAR(20))

usuario_creador (UUID, FK a usuarios.id)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: asientos_detalles

id (UUID, PK)

asiento_id (UUID, FK a asientos_contables.id)

cuenta_id (UUID, FK a plan_cuentas.id)

centro_costo_id (UUID, FK a centros_costos.id)

proyecto_id (UUID, FK a proyectos.id)

persona_id (UUID, FK a personas.id)

debe (DECIMAL(18,4))

haber (DECIMAL(18,4))

descripcion_linea (TEXT)

fecha_documento (DATE)

referencia (VARCHAR(100))

Tabla: asientos_versiones

id (UUID, PK)

asiento_id (UUID, FK a asientos_contables.id)

version_numero (INTEGER)

fecha_asiento (DATE)

glosa_general (TEXT)

tipo_asiento (VARCHAR(50))

estado (VARCHAR(20))

detalles_snapshot (JSONB)

accion (VARCHAR(50))

motivo_cambio (TEXT)

usuario_modificador (UUID, FK a usuarios.id)

created_at (TIMESTAMP WITH TIME ZONE)

Tabla: secuenciales_asientos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

siguiente_numero (INTEGER)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: periodos_contables

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

anio (INTEGER)

mes (INTEGER)

estado (VARCHAR(20))

fecha_apertura (TIMESTAMP WITH TIME ZONE)

fecha_cierre (TIMESTAMP WITH TIME ZONE)

usuario_cierre (UUID, FK a usuarios.id)

motivo_cierre (TEXT)

total_debe (DECIMAL(18,2))

total_haber (DECIMAL(18,2))

total_asientos (INTEGER)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Migración 0007: Facturación Electrónica SRI
Tabla: facturas_ventas

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

punto_emision_id (UUID, FK a puntos_emision.id)

persona_id (UUID)

ambiente (SMALLINT)

tipo_comprobante (CHAR(2), FK a sri_tipos_comprobante.codigo)

secuencial (VARCHAR(9))

clave_acceso (CHAR(49))

fecha_emision (DATE)

fecha_autorizacion (TIMESTAMP WITH TIME ZONE)

numero_autorizacion (VARCHAR(50))

direccion_comprador (VARCHAR(300))

telefono_comprador (VARCHAR(20))

email_comprador (VARCHAR(100))

forma_pago_codigo (CHAR(2), FK a sri_formas_pago.codigo)

plazo_dias (INTEGER)

subtotal_sin_impuestos (DECIMAL(18,2))

subtotal_0 (DECIMAL(18,2))

subtotal_12 (DECIMAL(18,2))

subtotal_15 (DECIMAL(18,2))

subtotal_no_objeto (DECIMAL(18,2))

subtotal_exento (DECIMAL(18,2))

descuento_total (DECIMAL(18,2))

ice_valor (DECIMAL(18,2))

iva_valor (DECIMAL(18,2))

propina (DECIMAL(18,2))

total_importe (DECIMAL(18,2))

estado_sri (VARCHAR(20))

mensaje_error_sri (TEXT)

xml_generado_url (TEXT)

xml_autorizado_url (TEXT)

pdf_ride_url (TEXT)

placa (VARCHAR(20))

guia_remision_id (UUID)

usuario_creador (UUID, FK a usuarios.id)

asiento_id (UUID, FK a asientos_contables.id)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: facturas_detalles

id (UUID, PK)

factura_id (UUID, FK a facturas_ventas.id)

producto_id (UUID)

codigo_principal (VARCHAR(25))

codigo_auxiliar (VARCHAR(25))

descripcion (VARCHAR(300))

unidad_medida (VARCHAR(10))

cantidad (DECIMAL(18,4))

precio_unitario (DECIMAL(18,4))

descuento (DECIMAL(18,4))

subtotal (DECIMAL(18,2))

tarifa_iva_id (INTEGER, FK a sri_impuestos_tarifas.id)

impuesto_valor (DECIMAL(18,2))

Tabla: facturas_detalles_info_adicional

id (UUID, PK)

factura_detalle_id (UUID, FK a facturas_detalles.id)

nombre (VARCHAR(100))

valor (VARCHAR(300))

Tabla: facturas_reembolsos

id (UUID, PK)

factura_id (UUID, FK a facturas_ventas.id)

tipo_proveedor_reembolso (VARCHAR(2))

identificacion_proveedor_reembolso (VARCHAR(20))

cod_pais_pago_proveedor_reembolso (VARCHAR(3))

tipo_proveedor_reembolso_codigo (VARCHAR(2))

fecha_emision_doc_reembolso (DATE)

tipo_documento_reembolso (CHAR(2))

autorizacion_doc_reembolso (VARCHAR(50))

establecimiento_doc_reembolso (VARCHAR(3))

punto_emision_doc_reembolso (VARCHAR(3))

secuencial_doc_reembolso (VARCHAR(9))

total_comprobantes_reembolso (DECIMAL(18,2))

total_base_imponible_reembolso (DECIMAL(18,2))

total_impuesto_reembolso (DECIMAL(18,2))

Tabla: facturas_reembolsos_detalle_impuestos

id (UUID, PK)

factura_reembolso_id (UUID, FK a facturas_reembolsos.id)

codigo_impuesto (VARCHAR(2))

codigo_porcentaje (VARCHAR(4))

tarifa (DECIMAL(5,2))

base_imponible_reembolso (DECIMAL(18,2))

impuesto_reembolso (DECIMAL(18,2))

Tabla: notas_credito

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

punto_emision_id (UUID, FK a puntos_emision.id)

persona_id (UUID)

factura_modificada_id (UUID, FK a facturas_ventas.id)

ambiente (SMALLINT)

tipo_comprobante (CHAR(2), FK a sri_tipos_comprobante.codigo)

secuencial (VARCHAR(9))

clave_acceso (CHAR(49))

fecha_emision (DATE)

fecha_autorizacion (TIMESTAMP WITH TIME ZONE)

motivo (TEXT)

doc_modificado_establecimiento (VARCHAR(3))

doc_modificado_punto_emision (VARCHAR(3))

doc_modificado_secuencial (VARCHAR(9))

doc_modificado_fecha (DATE)

subtotal_sin_impuestos (DECIMAL(18,2))

iva_valor (DECIMAL(18,2))

total_importe (DECIMAL(18,2))

estado_sri (VARCHAR(20))

xml_generado_url (TEXT)

xml_autorizado_url (TEXT)

pdf_ride_url (TEXT)

usuario_creador (UUID, FK a usuarios.id)

asiento_id (UUID, FK a asientos_contables.id)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: notas_credito_detalles

id (UUID, PK)

nota_credito_id (UUID, FK a notas_credito.id)

producto_id (UUID)

codigo_principal (VARCHAR(25))

codigo_auxiliar (VARCHAR(25))

descripcion (VARCHAR(300))

cantidad (DECIMAL(18,4))

precio_unitario (DECIMAL(18,4))

descuento (DECIMAL(18,4))

subtotal (DECIMAL(18,2))

tarifa_iva_id (INTEGER, FK a sri_impuestos_tarifas.id)

impuesto_valor (DECIMAL(18,2))

Tabla: notas_debito

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

punto_emision_id (UUID, FK a puntos_emision.id)

persona_id (UUID)

factura_modificada_id (UUID, FK a facturas_ventas.id)

ambiente (SMALLINT)

tipo_comprobante (CHAR(2), FK a sri_tipos_comprobante.codigo)

secuencial (VARCHAR(9))

clave_acceso (CHAR(49))

fecha_emision (DATE)

fecha_autorizacion (TIMESTAMP WITH TIME ZONE)

motivo (TEXT)

doc_modificado_establecimiento (VARCHAR(3))

doc_modificado_punto_emision (VARCHAR(3))

doc_modificado_secuencial (VARCHAR(9))

doc_modificado_fecha (DATE)

subtotal_sin_impuestos (DECIMAL(18,2))

iva_valor (DECIMAL(18,2))

total_importe (DECIMAL(18,2))

estado_sri (VARCHAR(20))

xml_generado_url (TEXT)

xml_autorizado_url (TEXT)

pdf_ride_url (TEXT)

usuario_creador (UUID, FK a usuarios.id)

asiento_id (UUID, FK a asientos_contables.id)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: notas_debito_detalles

id (UUID, PK)

nota_debito_id (UUID, FK a notas_debito.id)

concepto (VARCHAR(255))

valor (DECIMAL(18,2))

tarifa_iva_id (INTEGER, FK a sri_impuestos_tarifas.id)

impuesto_valor (DECIMAL(18,2))

Tabla: retenciones

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

punto_emision_id (UUID, FK a puntos_emision.id)

persona_id (UUID)

ambiente (SMALLINT)

tipo_comprobante (CHAR(2), FK a sri_tipos_comprobante.codigo)

secuencial (VARCHAR(9))

clave_acceso (CHAR(49))

fecha_emision (DATE)

fecha_autorizacion (TIMESTAMP WITH TIME ZONE)

periodo_fiscal (VARCHAR(7))

estado_sri (VARCHAR(20))

xml_generado_url (TEXT)

xml_autorizado_url (TEXT)

pdf_ride_url (TEXT)

usuario_creador (UUID, FK a usuarios.id)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: retenciones_detalles

id (UUID, PK)

retencion_id (UUID, FK a retenciones.id)

tipo_retencion_id (INTEGER, FK a sri_tipos_retencion.id)

codigo_impuesto (VARCHAR(5))

codigo_retencion (VARCHAR(5))

base_imponible (DECIMAL(18,2))

porcentaje (DECIMAL(5,2))

valor_retenido (DECIMAL(18,2))

Tabla: retenciones_sustentos

id (UUID, PK)

retencion_id (UUID, FK a retenciones.id)

cod_sustento (VARCHAR(2))

cod_doc_sustento (CHAR(2))

num_doc_sustento (VARCHAR(17))

fecha_emision_doc_sustento (DATE)

fecha_registro_contable (DATE)

num_aut_doc_sustento (VARCHAR(50))

pago_loc_ext (VARCHAR(2))

tipo_regi (VARCHAR(2))

pais_efec_pago (VARCHAR(3))

aplicativo_benef (BOOLEAN)

pais_efec_pago_gen (VARCHAR(3))

pais_efec_pago_parf (VARCHAR(3))

denopago (VARCHAR(2))

pais_efec_pago_tit (VARCHAR(3))

pago_ext_suj_ret_nor_leg (BOOLEAN)

pago_reg_fis (BOOLEAN)

total_comprobantes_reembolso (DECIMAL(18,2))

total_base_imponible_reembolso (DECIMAL(18,2))

total_impuesto_reembolso (DECIMAL(18,2))

total_sin_impuestos (DECIMAL(18,2))

importe_total (DECIMAL(18,2))

Tabla: retenciones_sustentos_retenciones

id (UUID, PK)

retencion_sustento_id (UUID, FK a retenciones_sustentos.id)

codigo (VARCHAR(5))

codigo_retencion (VARCHAR(5))

base_imponible (DECIMAL(18,2))

porcentaje_retener (DECIMAL(5,2))

valor_retenido (DECIMAL(18,2))

dividendos (DECIMAL(18,2))

fecha_pago_div (DATE)

imr (DECIMAL(18,2))

ano_uti_div (VARCHAR(4))

num_caj_ban (VARCHAR(2))

pre_caj_ban (VARCHAR(2))

cod_fue_dis (VARCHAR(2))

Tabla: retenciones_sustentos_impuestos

id (UUID, PK)

retencion_sustento_id (UUID, FK a retenciones_sustentos.id)

codigo (VARCHAR(2))

codigo_porcentaje (VARCHAR(4))

tarifa (DECIMAL(5,2))

base_imponible (DECIMAL(18,2))

valor (DECIMAL(18,2))

Tabla: facturas_compras

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

proveedor_id (UUID)

numero_autorizacion (VARCHAR(50))

ambiente (SMALLINT)

tipo_comprobante (CHAR(2), FK a sri_tipos_comprobante.codigo)

establecimiento (VARCHAR(3))

punto_emision (VARCHAR(3))

secuencial (VARCHAR(9))

fecha_emision (DATE)

fecha_registro (DATE)

subtotal_sin_impuestos (DECIMAL(18,2))

subtotal_0 (DECIMAL(18,2))

subtotal_12 (DECIMAL(18,2))

subtotal_15 (DECIMAL(18,2))

descuento_total (DECIMAL(18,2))

ice_valor (DECIMAL(18,2))

iva_valor (DECIMAL(18,2))

total_importe (DECIMAL(18,2))

forma_pago_codigo (CHAR(2), FK a sri_formas_pago.codigo)

plazo_dias (INTEGER)

estado (VARCHAR(20))

asiento_id (UUID, FK a asientos_contables.id)

usuario_creador (UUID, FK a usuarios.id)

observaciones (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: facturas_compras_detalles

id (UUID, PK)

factura_compra_id (UUID, FK a facturas_compras.id)

producto_id (UUID)

descripcion (VARCHAR(500))

cantidad (DECIMAL(18,4))

precio_unitario (DECIMAL(18,4))

descuento (DECIMAL(18,4))

subtotal (DECIMAL(18,2))

tarifa_iva_id (INTEGER, FK a sri_impuestos_tarifas.id)

impuesto_valor (DECIMAL(18,2))

Tabla: guias_remision

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

punto_emision_id (UUID, FK a puntos_emision.id)

ambiente (SMALLINT)

tipo_comprobante (CHAR(2), FK a sri_tipos_comprobante.codigo)

secuencial (VARCHAR(9))

clave_acceso (CHAR(49))

fecha_emision (DATE)

fecha_inicio_transporte (DATE)

fecha_fin_transporte (DATE)

fecha_autorizacion (TIMESTAMP WITH TIME ZONE)

numero_autorizacion (VARCHAR(50))

direccion_partida (VARCHAR(300))

direccion_destino (VARCHAR(300))

ruta (VARCHAR(500))

transportista_id (UUID)

razon_social_transportista (VARCHAR(300))

tipo_identificacion_transportista (CHAR(2))

identificacion_transportista (VARCHAR(13))

ruc_transportista (VARCHAR(13))

rise_transportista (BOOLEAN)

placa_vehiculo (VARCHAR(10))

estado_sri (VARCHAR(20))

mensaje_error_sri (TEXT)

xml_generado_url (TEXT)

xml_autorizado_url (TEXT)

pdf_ride_url (TEXT)

usuario_creador (UUID, FK a usuarios.id)

observaciones (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: guias_remision_destinatarios

id (UUID, PK)

guia_remision_id (UUID, FK a guias_remision.id)

destinatario_id (UUID)

identificacion_destinatario (VARCHAR(13))

razon_social_destinatario (VARCHAR(300))

direccion_destinatario (VARCHAR(300))

motivo_traslado (VARCHAR(300))

doc_aduanero_unico (VARCHAR(50))

cod_estab_destino (VARCHAR(3))

ruta (VARCHAR(500))

Tabla: guias_remision_detalles

id (UUID, PK)

guia_remision_destinatario_id (UUID, FK a guias_remision_destinatarios.id)

producto_id (UUID)

codigo_interno (VARCHAR(25))

codigo_adicional (VARCHAR(25))

descripcion (VARCHAR(300))

unidad_medida (VARCHAR(10))

cantidad (DECIMAL(18,4))

doc_sustento_tipo (CHAR(2))

doc_sustento_numero (VARCHAR(17))

doc_sustento_fecha (DATE)

doc_sustento_autorizacion (VARCHAR(50))

Tabla: liquidaciones_compra

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

punto_emision_id (UUID, FK a puntos_emision.id)

proveedor_id (UUID)

ambiente (SMALLINT)

tipo_comprobante (CHAR(2), FK a sri_tipos_comprobante.codigo)

secuencial (VARCHAR(9))

clave_acceso (CHAR(49))

fecha_emision (DATE)

fecha_autorizacion (TIMESTAMP WITH TIME ZONE)

numero_autorizacion (VARCHAR(50))

subtotal_sin_impuestos (DECIMAL(18,2))

subtotal_0 (DECIMAL(18,2))

subtotal_12 (DECIMAL(18,2))

subtotal_15 (DECIMAL(18,2))

descuento_total (DECIMAL(18,2))

ice_valor (DECIMAL(18,2))

iva_valor (DECIMAL(18,2))

total_importe (DECIMAL(18,2))

forma_pago_codigo (CHAR(2), FK a sri_formas_pago.codigo)

plazo_dias (INTEGER)

estado_sri (VARCHAR(20))

xml_generado_url (TEXT)

xml_autorizado_url (TEXT)

pdf_ride_url (TEXT)

usuario_creador (UUID, FK a usuarios.id)

asiento_id (UUID, FK a asientos_contables.id)

observaciones (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: liquidaciones_compra_detalles

id (UUID, PK)

liquidacion_compra_id (UUID, FK a liquidaciones_compra.id)

producto_id (UUID)

codigo_principal (VARCHAR(25))

codigo_auxiliar (VARCHAR(25))

descripcion (VARCHAR(300))

unidad_medida (VARCHAR(10))

cantidad (DECIMAL(18,4))

precio_unitario (DECIMAL(18,4))

descuento (DECIMAL(18,4))

subtotal (DECIMAL(18,2))

tarifa_iva_id (INTEGER, FK a sri_impuestos_tarifas.id)

impuesto_valor (DECIMAL(18,2))

Tabla: cuentas_por_cobrar

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

cliente_id (UUID)

factura_id (UUID, FK a facturas_ventas.id)

numero_documento (VARCHAR(50))

fecha_emision (DATE)

fecha_vencimiento (DATE)

monto_original (DECIMAL(18,2))

monto_cobrado (DECIMAL(18,2))

saldo_pendiente (DECIMAL(18,2))

estado (VARCHAR(20))

observaciones (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: cobros

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

cuenta_por_cobrar_id (UUID, FK a cuentas_por_cobrar.id)

numero_recibo (VARCHAR(20))

fecha_cobro (DATE)

monto_cobrado (DECIMAL(18,2))

forma_pago_codigo (CHAR(2), FK a sri_formas_pago.codigo)

numero_comprobante (VARCHAR(50))

cuenta_bancaria_id (UUID, FK a cuentas_bancarias.id)

observaciones (TEXT)

asiento_id (UUID, FK a asientos_contables.id)

usuario_creador (UUID, FK a usuarios.id)

created_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: cuentas_por_pagar

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

proveedor_id (UUID)

factura_compra_id (UUID, FK a facturas_compras.id)

numero_documento (VARCHAR(50))

fecha_emision (DATE)

fecha_vencimiento (DATE)

monto_original (DECIMAL(18,2))

monto_pagado (DECIMAL(18,2))

saldo_pendiente (DECIMAL(18,2))

estado (VARCHAR(20))

observaciones (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: pagos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

cuenta_por_pagar_id (UUID, FK a cuentas_por_pagar.id)

numero_comprobante (VARCHAR(20))

fecha_pago (DATE)

monto_pagado (DECIMAL(18,2))

forma_pago_codigo (CHAR(2), FK a sri_formas_pago.codigo)

numero_documento (VARCHAR(50))

cuenta_bancaria_id (UUID, FK a cuentas_bancarias.id)

observaciones (TEXT)

asiento_id (UUID, FK a asientos_contables.id)

usuario_creador (UUID, FK a usuarios.id)

created_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: facturas_info_adicional

id (UUID, PK)

factura_id (UUID, FK a facturas_ventas.id)

nombre (VARCHAR(100))

valor (VARCHAR(300))

orden (SMALLINT)

Tabla: facturas_formas_pago

id (UUID, PK)

factura_id (UUID, FK a facturas_ventas.id)

forma_pago_codigo (CHAR(2), FK a sri_formas_pago.codigo)

total (DECIMAL(18,2))

plazo (SMALLINT)

unidad_tiempo (VARCHAR(10))

orden (SMALLINT)

Tabla: notas_credito_info_adicional

id (UUID, PK)

nota_credito_id (UUID, FK a notas_credito.id)

nombre (VARCHAR(100))

valor (VARCHAR(300))

orden (SMALLINT)

Tabla: notas_debito_info_adicional

id (UUID, PK)

nota_debito_id (UUID, FK a notas_debito.id)

nombre (VARCHAR(100))

valor (VARCHAR(300))

orden (SMALLINT)

Tabla: guias_remision_info_adicional

id (UUID, PK)

guia_remision_id (UUID, FK a guias_remision.id)

nombre (VARCHAR(100))

valor (VARCHAR(300))

orden (SMALLINT)

Tabla: liquidaciones_info_adicional

id (UUID, PK)

liquidacion_compra_id (UUID, FK a liquidaciones_compra.id)

nombre (VARCHAR(100))

valor (VARCHAR(300))

orden (SMALLINT)

Tabla: retenciones_info_adicional

id (UUID, PK)

retencion_id (UUID, FK a retenciones.id)

nombre (VARCHAR(100))

valor (VARCHAR(300))

orden (SMALLINT)

Migración 0008: Inventario y Kardex
Tabla: categorias_productos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

id_padre (UUID, FK a categorias_productos.id)

codigo (VARCHAR(20))

nombre (VARCHAR(150))

descripcion (TEXT)

tipo_categoria (VARCHAR(20))

nivel (INTEGER)

activa (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: bodegas

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

codigo (VARCHAR(20))

nombre (VARCHAR(100))

descripcion (TEXT)

direccion (VARCHAR(300))

responsable_id (UUID, FK a usuarios.id)

es_principal (BOOLEAN)

activa (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: productos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

categoria_id (UUID, FK a categorias_productos.id)

codigo_principal (VARCHAR(50))

codigo_auxiliar (VARCHAR(50))

nombre (VARCHAR(255))

descripcion (TEXT)

tipo_producto (VARCHAR(20))

unidad_medida (VARCHAR(20))

precio_venta (DECIMAL(18,4))

precio_compra (DECIMAL(18,4))

tiene_iva (BOOLEAN)

tarifa_iva_id (INTEGER, FK a sri_impuestos_tarifas.id)

cuenta_contable_venta_id (UUID, FK a plan_cuentas.id)

cuenta_contable_inventario_id (UUID, FK a plan_cuentas.id)

cuenta_contable_costo_id (UUID, FK a plan_cuentas.id)

metodo_costeo (VARCHAR(20))

maneja_inventario (BOOLEAN, GENERATED)

stock_minimo (DECIMAL(18,6))

stock_maximo (DECIMAL(18,6))

activo (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: productos_grupos_complementos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

producto_id (UUID, FK a productos.id)

nombre (VARCHAR(100))

descripcion (TEXT)

es_obligatorio (BOOLEAN)

minimo_seleccion (INTEGER)

maximo_seleccion (INTEGER)

orden (SMALLINT)

activo (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: productos_complementos

id (UUID, PK)

grupo_complemento_id (UUID, FK a productos_grupos_complementos.id)

complemento_producto_id (UUID, FK a productos.id)

precio_adicional (DECIMAL(18,4))

es_default (BOOLEAN)

orden (SMALLINT)

activo (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: inventario_lotes

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

producto_id (UUID, FK a productos.id)

bodega_id (UUID, FK a bodegas.id)

numero_lote (VARCHAR(50))

fecha_ingreso (TIMESTAMP WITH TIME ZONE)

fecha_vencimiento (DATE)

pasillo (VARCHAR(20))

estante (VARCHAR(20))

nivel (VARCHAR(20))

cantidad_inicial (DECIMAL(18,6))

cantidad_disponible (DECIMAL(18,6))

costo_unitario (DECIMAL(18,6))

movimiento_ingreso_id (UUID)

documento_origen_tipo (VARCHAR(50))

documento_origen_id (UUID)

estado (VARCHAR(20))

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: inventario_movimientos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

producto_id (UUID, FK a productos.id)

bodega_id (UUID, FK a bodegas.id)

tipo_movimiento (VARCHAR(20))

cantidad (DECIMAL(18,6))

costo_unitario (DECIMAL(18,6))

costo_total (DECIMAL(18,6), GENERATED)

saldo_cantidad (DECIMAL(18,6))

saldo_costo_total (DECIMAL(18,6))

motivo_ajuste (TEXT)

referencia_documento_id (UUID)

referencia_tipo (VARCHAR(50))

fecha_movimiento (TIMESTAMP WITH TIME ZONE)

usuario_id (UUID, FK a usuarios.id)

Tabla: inventario_lotes_consumo

id (UUID, PK)

lote_id (UUID, FK a inventario_lotes.id)

movimiento_salida_id (UUID, FK a inventario_movimientos.id)

cantidad_consumida (DECIMAL(18,6))

costo_unitario_lote (DECIMAL(18,6))

costo_total (DECIMAL(18,6), GENERATED)

created_at (TIMESTAMP WITH TIME ZONE)

Migración 0009: Sistema de Auditoría
Tabla: auditoria_logs (PARTITIONED)

id (UUID)

tenant_id (UUID, FK a tenants.id)

razon_social_id (UUID, FK a razones_sociales.id)

usuario_id (UUID, FK a usuarios.id)

tabla (VARCHAR(50))

accion (VARCHAR(10))

datos_anteriores (JSONB)

datos_nuevos (JSONB)

ip_address (VARCHAR(45))

user_agent (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

Migración 0010: Funciones y Triggers
(Esta migración no crea tablas, solo funciones y triggers. Las tablas a las que se aplican los triggers ya han sido listadas).

Migración 0011: Recursos Humanos y Nómina
Tabla: empleados

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

usuario_id (UUID, FK a usuarios.id)

identificacion (VARCHAR(20))

nombres (VARCHAR(150))

apellidos (VARCHAR(150))

fecha_nacimiento (DATE)

genero (CHAR(1))

estado_civil (VARCHAR(20))

nacionalidad (VARCHAR(50))

email_personal (CITEXT)

telefono_movil (VARCHAR(20))

telefono_fijo (VARCHAR(20))

direccion_domicilio (TEXT)

ciudad (VARCHAR(100))

provincia (VARCHAR(100))

codigo_empleado (VARCHAR(20))

cargo (VARCHAR(100))

departamento (VARCHAR(100))

area (VARCHAR(100))

establecimiento_id (UUID, FK a establecimientos.id)

jefe_directo_id (UUID, FK a empleados.id)

fecha_ingreso (DATE)

fecha_salida (DATE)

tipo_contrato (VARCHAR(50))

fecha_fin_contrato (DATE)

salario_base (DECIMAL(12,2))

tipo_salario (VARCHAR(20))

moneda (VARCHAR(3))

forma_pago (VARCHAR(20))

cuenta_bancaria_pago (VARCHAR(50))

banco_pago_id (UUID, FK a bancos_catalogo.id)

tipo_cuenta_pago (VARCHAR(20))

afiliado_iess (BOOLEAN)

numero_iess (VARCHAR(20))

porcentaje_aporte_personal (DECIMAL(5,2))

aplicar_fondos_reserva (BOOLEAN)

tipo_sangre (VARCHAR(5))

discapacidad (BOOLEAN)

porcentaje_discapacidad (DECIMAL(5,2))

carnet_conadis (VARCHAR(20))

contacto_emergencia_nombre (VARCHAR(150))

contacto_emergencia_relacion (VARCHAR(50))

contacto_emergencia_telefono (VARCHAR(20))

nivel_educacion (VARCHAR(50))

titulo_profesional (VARCHAR(150))

universidad (VARCHAR(150))

estado (VARCHAR(20))

motivo_salida (TEXT)

observaciones (TEXT)

foto_url (TEXT)

curriculum_url (TEXT)

contrato_url (TEXT)

cedula_url (TEXT)

titulo_url (TEXT)

certificado_bancario_url (TEXT)

usa_biometrico (BOOLEAN)

codigo_biometrico (VARCHAR(50))

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: rrhh_conceptos_pago

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

codigo (VARCHAR(20))

nombre (VARCHAR(150))

descripcion (TEXT)

tipo_concepto (VARCHAR(30))

categoria (VARCHAR(50))

es_fijo (BOOLEAN)

monto_fijo (DECIMAL(12,2))

es_porcentual (BOOLEAN)

porcentaje (DECIMAL(5,2))

base_calculo (VARCHAR(50))

cuenta_contable_id (UUID, FK a plan_cuentas.id)

aplica_iess (BOOLEAN)

aplica_impuesto_renta (BOOLEAN)

activo (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: rrhh_nominas

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

numero_nomina (VARCHAR(20))

periodo (VARCHAR(7))

tipo_nomina (VARCHAR(30))

fecha_inicio (DATE)

fecha_fin (DATE)

fecha_pago (DATE)

total_ingresos (DECIMAL(18,2))

total_deducciones (DECIMAL(18,2))

total_neto (DECIMAL(18,2))

total_aporte_patronal (DECIMAL(18,2))

cantidad_empleados (INTEGER)

estado (VARCHAR(20))

observaciones (TEXT)

asiento_id (UUID, FK a asientos_contables.id)

usuario_creador (UUID, FK a usuarios.id)

usuario_aprobador (UUID, FK a usuarios.id)

fecha_aprobacion (TIMESTAMP WITH TIME ZONE)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: rrhh_nominas_detalles

id (UUID, PK)

nomina_id (UUID, FK a rrhh_nominas.id)

empleado_id (UUID, FK a empleados.id)

salario_base (DECIMAL(12,2))

dias_trabajados (INTEGER)

horas_trabajadas (DECIMAL(8,2))

horas_extra (DECIMAL(8,2))

total_ingresos (DECIMAL(12,2))

total_deducciones (DECIMAL(12,2))

neto_pagar (DECIMAL(12,2))

aporte_personal_iess (DECIMAL(12,2))

aporte_patronal_iess (DECIMAL(12,2))

fondos_reserva (DECIMAL(12,2))

estado_pago (VARCHAR(20))

fecha_pago_real (TIMESTAMP WITH TIME ZONE)

numero_comprobante_pago (VARCHAR(50))

observaciones (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

Tabla: rrhh_nominas_conceptos

id (UUID, PK)

nomina_detalle_id (UUID, FK a rrhh_nominas_detalles.id)

concepto_id (UUID, FK a rrhh_conceptos_pago.id)

tipo_concepto (VARCHAR(30))

codigo_concepto (VARCHAR(20))

nombre_concepto (VARCHAR(150))

cantidad (DECIMAL(10,2))

valor_unitario (DECIMAL(12,2))

valor_total (DECIMAL(12,2))

base_calculo (DECIMAL(12,2))

porcentaje_aplicado (DECIMAL(5,2))

observaciones (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

Tabla: rrhh_prestamos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

empleado_id (UUID, FK a empleados.id)

numero_prestamo (VARCHAR(20))

tipo_prestamo (VARCHAR(50))

monto_total (DECIMAL(12,2))

tasa_interes (DECIMAL(5,2))

numero_cuotas (INTEGER)

valor_cuota (DECIMAL(12,2))

fecha_desembolso (DATE)

fecha_primera_cuota (DATE)

periodicidad (VARCHAR(20))

monto_pagado (DECIMAL(12,2))

saldo_pendiente (DECIMAL(12,2))

cuotas_pagadas (INTEGER)

estado (VARCHAR(20))

cuenta_bancaria_desembolso_id (UUID, FK a cuentas_bancarias.id)

asiento_desembolso_id (UUID, FK a asientos_contables.id)

cuenta_contable_prestamo_id (UUID, FK a plan_cuentas.id)

observaciones (TEXT)

motivo_prestamo (TEXT)

usuario_creador (UUID, FK a usuarios.id)

usuario_aprobador (UUID, FK a usuarios.id)

fecha_aprobacion (TIMESTAMP WITH TIME ZONE)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: rrhh_prestamos_cuotas

id (UUID, PK)

prestamo_id (UUID, FK a rrhh_prestamos.id)

numero_cuota (INTEGER)

fecha_vencimiento (DATE)

valor_cuota (DECIMAL(12,2))

valor_capital (DECIMAL(12,2))

valor_interes (DECIMAL(12,2))

valor_pagado (DECIMAL(12,2))

saldo_cuota (DECIMAL(12,2))

estado (VARCHAR(20))

fecha_pago (TIMESTAMP WITH TIME ZONE)

nomina_detalle_id (UUID, FK a rrhh_nominas_detalles.id)

asiento_id (UUID, FK a asientos_contables.id)

observaciones (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: rrhh_historial_laboral

id (UUID, PK)

empleado_id (UUID, FK a empleados.id)

tipo_movimiento (VARCHAR(50))

fecha_movimiento (DATE)

cargo_anterior (VARCHAR(100))

departamento_anterior (VARCHAR(100))

salario_anterior (DECIMAL(12,2))

establecimiento_anterior_id (UUID, FK a establecimientos.id)

cargo_nuevo (VARCHAR(100))

departamento_nuevo (VARCHAR(100))

salario_nuevo (DECIMAL(12,2))

establecimiento_nuevo_id (UUID, FK a establecimientos.id)

motivo (TEXT)

observaciones (TEXT)

dias_duracion (INTEGER)

fecha_fin_movimiento (DATE)

documento_soporte_url (TEXT)

usuario_registro (UUID, FK a usuarios.id)

created_at (TIMESTAMP WITH TIME ZONE)

Tabla: rrhh_configuracion

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

dias_laborales_mes (INTEGER)

horas_laborales_dia (DECIMAL(4,2))

dias_laborales_semana (INTEGER)

porcentaje_aporte_patronal (DECIMAL(5,2))

porcentaje_aporte_personal (DECIMAL(5,2))

porcentaje_fondos_reserva (DECIMAL(5,2))

salario_basico_unificado (DECIMAL(12,2))

decimo_cuarto_monto (DECIMAL(12,2))

porcentaje_hora_extra_100 (DECIMAL(5,2))

porcentaje_hora_extra_50 (DECIMAL(5,2))

cuenta_sueldos_id (UUID, FK a plan_cuentas.id)

cuenta_aporte_patronal_id (UUID, FK a plan_cuentas.id)

cuenta_prestamos_id (UUID, FK a plan_cuentas.id)

cuenta_anticipos_id (UUID, FK a plan_cuentas.id)

prefijo_nomina (VARCHAR(10))

prefijo_prestamo (VARCHAR(10))

activo (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: rrhh_plantillas_nomina

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

codigo (VARCHAR(20))

nombre (VARCHAR(150))

descripcion (TEXT)

tipo_nomina (VARCHAR(30))

aplica_cargo (VARCHAR(100))

aplica_departamento (VARCHAR(100))

aplica_global (BOOLEAN)

activa (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: rrhh_plantillas_conceptos

id (UUID, PK)

plantilla_id (UUID, FK a rrhh_plantillas_nomina.id)

concepto_id (UUID, FK a rrhh_conceptos_pago.id)

monto_override (DECIMAL(12,2))

porcentaje_override (DECIMAL(5,2))

orden (INTEGER)

activo (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

Migración 0012: Tesorería y Bancos
Tabla: movimientos_bancarios

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

cuenta_bancaria_id (UUID, FK a cuentas_bancarias.id)

tipo_movimiento (VARCHAR(30))

numero_documento (VARCHAR(50))

fecha_movimiento (DATE)

fecha_valor (DATE)

monto (DECIMAL(18,2))

saldo_anterior (DECIMAL(18,2))

saldo_nuevo (DECIMAL(18,2))

referencia_tipo (VARCHAR(50))

referencia_id (UUID)

beneficiario_nombre (VARCHAR(255))

beneficiario_identificacion (VARCHAR(20))

beneficiario_banco (VARCHAR(100))

beneficiario_cuenta (VARCHAR(50))

categoria (VARCHAR(50))

descripcion (TEXT)

observaciones (TEXT)

conciliado (BOOLEAN)

fecha_conciliacion (TIMESTAMP WITH TIME ZONE)

conciliacion_id (UUID)

asiento_id (UUID, FK a asientos_contables.id)

comprobante_url (TEXT)

usuario_registro (UUID, FK a usuarios.id)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: depositos_bancarios

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

cuenta_bancaria_id (UUID, FK a cuentas_bancarias.id)

numero_deposito (VARCHAR(50))

fecha_deposito (DATE)

hora_deposito (TIME)

tipo_deposito (VARCHAR(30))

monto_efectivo (DECIMAL(18,2))

monto_cheques (DECIMAL(18,2))

total_deposito (DECIMAL(18,2))

billetes_json (JSONB)

cobro_ids (UUID[])

estado (VARCHAR(20))

fecha_confirmacion (DATE)

numero_comprobante_banco (VARCHAR(50))

observaciones (TEXT)

movimiento_bancario_id (UUID, FK a movimientos_bancarios.id)

conciliado (BOOLEAN)

asiento_id (UUID, FK a asientos_contables.id)

usuario_registro (UUID, FK a usuarios.id)

comprobante_url (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: cheques

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

cuenta_bancaria_id (UUID, FK a cuentas_bancarias.id)

tipo_cheque (VARCHAR(20))

numero_cheque (VARCHAR(20))

fecha_emision (DATE)

fecha_vencimiento (DATE)

monto (DECIMAL(18,2))

nombre_beneficiario (VARCHAR(255))

identificacion_beneficiario (VARCHAR(20))

concepto (TEXT)

estado (VARCHAR(20))

fecha_cobro (DATE)

fecha_rechazo (DATE)

motivo_rechazo (TEXT)

pago_id (UUID, FK a pagos.id)

cobro_id (UUID, FK a cobros.id)

deposito_id (UUID, FK a depositos_bancarios.id)

es_posfechado (BOOLEAN)

movimiento_bancario_id (UUID, FK a movimientos_bancarios.id)

conciliado (BOOLEAN)

asiento_id (UUID, FK a asientos_contables.id)

usuario_registro (UUID, FK a usuarios.id)

observaciones (TEXT)

imagen_cheque_url (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: conciliaciones_bancarias

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

cuenta_bancaria_id (UUID, FK a cuentas_bancarias.id)

numero_conciliacion (VARCHAR(20))

periodo (VARCHAR(7))

fecha_corte (DATE)

saldo_contable (DECIMAL(18,2))

saldo_bancario (DECIMAL(18,2))

diferencia (DECIMAL(18,2), GENERATED)

total_partidas_conciliatorias (DECIMAL(18,2))

total_notas_debito_no_contabilizadas (DECIMAL(18,2))

total_notas_credito_no_contabilizadas (DECIMAL(18,2))

total_cheques_transito (DECIMAL(18,2))

total_depositos_transito (DECIMAL(18,2))

estado (VARCHAR(20))

observaciones (TEXT)

usuario_responsable (UUID, FK a usuarios.id)

usuario_aprobador (UUID, FK a usuarios.id)

fecha_aprobacion (TIMESTAMP WITH TIME ZONE)

archivo_estado_cuenta_url (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: conciliaciones_detalles

id (UUID, PK)

conciliacion_id (UUID, FK a conciliaciones_bancarias.id)

movimiento_bancario_id (UUID, FK a movimientos_bancarios.id)

tipo_partida (VARCHAR(50))

fecha_partida (DATE)

descripcion (TEXT)

monto_banco (DECIMAL(18,2))

monto_contable (DECIMAL(18,2))

diferencia (DECIMAL(18,2), GENERATED)

conciliado (BOOLEAN)

observaciones (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

Tabla: transferencias_bancarias

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

numero_transferencia (VARCHAR(20))

fecha_transferencia (DATE)

cuenta_origen_id (UUID, FK a cuentas_bancarias.id)

cuenta_destino_id (UUID, FK a cuentas_bancarias.id)

monto_original (DECIMAL(18,2))

comision (DECIMAL(18,2))

impuestos (DECIMAL(18,2))

monto_recibido (DECIMAL(18,2))

tipo_transferencia (VARCHAR(30))

estado (VARCHAR(20))

numero_comprobante (VARCHAR(50))

concepto (TEXT)

observaciones (TEXT)

movimiento_origen_id (UUID, FK a movimientos_bancarios.id)

movimiento_destino_id (UUID, FK a movimientos_bancarios.id)

asiento_id (UUID, FK a asientos_contables.id)

usuario_registro (UUID, FK a usuarios.id)

comprobante_url (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Migración 0013: Cotizaciones y Bandeja de Documentos
Tabla: secuenciales_cotizaciones

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

siguiente_numero (INTEGER)

prefijo (VARCHAR(10))

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: secuenciales_proformas

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

siguiente_numero (INTEGER)

prefijo (VARCHAR(10))

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: secuenciales_oportunidades

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

siguiente_numero (INTEGER)

prefijo (VARCHAR(10))

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: secuenciales_bandeja_documentos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

siguiente_numero (INTEGER)

prefijo (VARCHAR(10))

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: cotizaciones

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

persona_id (UUID)

numero_cotizacion (VARCHAR(20))

fecha_emision (DATE)

fecha_vencimiento (DATE)

cliente_nombre (VARCHAR(255))

cliente_email (CITEXT)

cliente_telefono (VARCHAR(20))

cliente_direccion (TEXT)

subtotal (DECIMAL(18,2))

descuento_porcentaje (DECIMAL(5,2))

descuento_valor (DECIMAL(18,2))

subtotal_con_descuento (DECIMAL(18,2))

iva_valor (DECIMAL(18,2))

total (DECIMAL(18,2))

forma_pago_propuesta (VARCHAR(50))

plazo_entrega_dias (INTEGER)

condiciones_comerciales (TEXT)

validez_dias (INTEGER)

estado (VARCHAR(30))

probabilidad_cierre (INTEGER)

motivo_rechazo (TEXT)

fecha_aceptacion (TIMESTAMP WITH TIME ZONE)

fecha_rechazo (TIMESTAMP WITH TIME ZONE)

factura_id (UUID, FK a facturas_ventas.id)

fecha_conversion (TIMESTAMP WITH TIME ZONE)

vendedor_id (UUID, FK a usuarios.id)

comision_porcentaje (DECIMAL(5,2))

observaciones (TEXT)

notas_internas (TEXT)

pdf_url (TEXT)

usuario_creador (UUID, FK a usuarios.id)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: cotizaciones_detalles

id (UUID, PK)

cotizacion_id (UUID, FK a cotizaciones.id)

producto_id (UUID, FK a productos.id)

descripcion (VARCHAR(500))

cantidad (DECIMAL(18,4))

precio_unitario (DECIMAL(18,4))

descuento (DECIMAL(18,4))

subtotal (DECIMAL(18,2))

tarifa_iva_id (INTEGER, FK a sri_impuestos_tarifas.id)

impuesto_valor (DECIMAL(18,2))

observaciones (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

Tabla: proformas

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

punto_emision_id (UUID, FK a puntos_emision.id)

persona_id (UUID)

cotizacion_id (UUID, FK a cotizaciones.id)

numero_proforma (VARCHAR(20))

fecha_emision (DATE)

fecha_vencimiento (DATE)

subtotal_sin_impuestos (DECIMAL(18,2))

descuento_total (DECIMAL(18,2))

iva_valor (DECIMAL(18,2))

total_importe (DECIMAL(18,2))

forma_pago_propuesta (CHAR(2), FK a sri_formas_pago.codigo)

plazo_dias (INTEGER)

validez_dias (INTEGER)

condiciones (TEXT)

estado (VARCHAR(30))

factura_id (UUID, FK a facturas_ventas.id)

fecha_facturacion (TIMESTAMP WITH TIME ZONE)

observaciones (TEXT)

vendedor_id (UUID, FK a usuarios.id)

usuario_creador (UUID, FK a usuarios.id)

pdf_url (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: proformas_detalles

id (UUID, PK)

proforma_id (UUID, FK a proformas.id)

producto_id (UUID, FK a productos.id)

descripcion (VARCHAR(500))

cantidad (DECIMAL(18,4))

precio_unitario (DECIMAL(18,4))

descuento (DECIMAL(18,4))

subtotal (DECIMAL(18,2))

tarifa_iva_id (INTEGER, FK a sri_impuestos_tarifas.id)

impuesto_valor (DECIMAL(18,2))

created_at (TIMESTAMP WITH TIME ZONE)

Tabla: bandeja_documentos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

codigo_documento (VARCHAR(20))

archivo_original_nombre (VARCHAR(255))

archivo_original_url (TEXT)

archivo_tipo (VARCHAR(50))

archivo_tamano_bytes (BIGINT)

archivo_hash (VARCHAR(64))

tipo_documento (VARCHAR(50))

subtipo_documento (VARCHAR(50))

estado (VARCHAR(30))

datos_ocr (JSONB)

confianza_ocr (DECIMAL(5,2))

proveedor_id (UUID, FK a personas.id)

proveedor_nombre_detectado (VARCHAR(255))

proveedor_ruc_detectado (VARCHAR(13))

numero_documento_detectado (VARCHAR(50))

fecha_emision_detectada (DATE)

monto_total_detectado (DECIMAL(18,2))

documento_registrado_tipo (VARCHAR(50))

documento_registrado_id (UUID)

fecha_registro (TIMESTAMP WITH TIME ZONE)

requiere_revision (BOOLEAN)

motivo_revision (TEXT)

validado_por (UUID, FK a usuarios.id)

fecha_validacion (TIMESTAMP WITH TIME ZONE)

observaciones (TEXT)

tags (TEXT[])

fecha_recepcion (TIMESTAMP WITH TIME ZONE)

canal_recepcion (VARCHAR(50))

email_origen (VARCHAR(255))

usuario_asignado (UUID, FK a usuarios.id)

usuario_carga (UUID, FK a usuarios.id)

proveedor_ocr (VARCHAR(50))

tiempo_procesamiento_ms (INTEGER)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: bandeja_documentos_historial

id (UUID, PK)

documento_id (UUID, FK a bandeja_documentos.id)

accion (VARCHAR(50))

estado_anterior (VARCHAR(30))

estado_nuevo (VARCHAR(30))

usuario_id (UUID, FK a usuarios.id)

comentario (TEXT)

datos_adicionales (JSONB)

created_at (TIMESTAMP WITH TIME ZONE)

Tabla: oportunidades_venta

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

persona_id (UUID)

codigo_oportunidad (VARCHAR(20))

nombre_oportunidad (VARCHAR(255))

descripcion (TEXT)

valor_estimado (DECIMAL(18,2))

probabilidad_cierre (INTEGER)

etapa (VARCHAR(50))

fecha_inicio (DATE)

fecha_cierre_estimada (DATE)

fecha_cierre_real (DATE)

motivo_perdida (TEXT)

competidor (VARCHAR(255))

cotizacion_id (UUID, FK a cotizaciones.id)

factura_id (UUID, FK a facturas_ventas.id)

vendedor_id (UUID, FK a usuarios.id)

origen (VARCHAR(50))

notas (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Migración 0014: Activos Fijos y Depreciación
Tabla: secuenciales_activos_fijos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

siguiente_numero (INTEGER)

prefijo (VARCHAR(10))

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: secuenciales_revalorizaciones

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

siguiente_numero (INTEGER)

prefijo (VARCHAR(10))

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: secuenciales_mantenimientos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

siguiente_numero (INTEGER)

prefijo (VARCHAR(10))

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: secuenciales_disposiciones

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

siguiente_numero (INTEGER)

prefijo (VARCHAR(10))

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: categorias_activos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

codigo (VARCHAR(20))

nombre (VARCHAR(150))

descripcion (TEXT)

metodo_depreciacion_default (VARCHAR(30))

vida_util_anios_default (INTEGER)

porcentaje_depreciacion_anual (DECIMAL(5,2))

valor_residual_porcentaje (DECIMAL(5,2))

cuenta_activo_id (UUID, FK a plan_cuentas.id)

cuenta_depreciacion_acumulada_id (UUID, FK a plan_cuentas.id)

cuenta_gasto_depreciacion_id (UUID, FK a plan_cuentas.id)

activa (BOOLEAN)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: activos_fijos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

categoria_id (UUID, FK a categorias_activos.id)

codigo_activo (VARCHAR(50))

nombre (VARCHAR(255))

descripcion (TEXT)

marca (VARCHAR(100))

modelo (VARCHAR(100))

numero_serie (VARCHAR(100))

placa (VARCHAR(50))

color (VARCHAR(50))

establecimiento_id (UUID, FK a establecimientos.id)

ubicacion_especifica (VARCHAR(255))

responsable_id (UUID, FK a empleados.id)

fecha_adquisicion (DATE)

fecha_puesta_servicio (DATE)

fecha_fin_vida_util (DATE)

valor_compra (DECIMAL(18,2))

valor_mejoras (DECIMAL(18,2))

valor_total (DECIMAL(18,2), GENERATED)

valor_residual (DECIMAL(18,2))

valor_depreciable (DECIMAL(18,2), GENERATED)

metodo_depreciacion (VARCHAR(30))

vida_util_anios (INTEGER)

vida_util_meses (INTEGER)

porcentaje_depreciacion_anual (DECIMAL(5,2))

depreciacion_acumulada (DECIMAL(18,2))

valor_neto_libros (DECIMAL(18,2), GENERATED)

unidades_totales_estimadas (INTEGER)

unidades_utilizadas (INTEGER)

unidad_medida (VARCHAR(50))

factura_compra_id (UUID, FK a facturas_compras.id)

numero_factura_compra (VARCHAR(50))

proveedor_id (UUID, FK a personas.id)

tiene_garantia (BOOLEAN)

fecha_fin_garantia (DATE)

asegurado (BOOLEAN)

poliza_seguro (VARCHAR(100))

valor_asegurado (DECIMAL(18,2))

fecha_vencimiento_seguro (DATE)

estado (VARCHAR(30))

fecha_baja (DATE)

motivo_baja (TEXT)

cuenta_activo_id (UUID, FK a plan_cuentas.id)

cuenta_depreciacion_acumulada_id (UUID, FK a plan_cuentas.id)

cuenta_gasto_depreciacion_id (UUID, FK a plan_cuentas.id)

foto_url (TEXT)

factura_url (TEXT)

manual_url (TEXT)

observaciones (TEXT)

codigo_barras (VARCHAR(100))

codigo_qr (TEXT)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: depreciaciones

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

activo_id (UUID, FK a activos_fijos.id)

periodo (VARCHAR(7))

anio (INTEGER)

mes (INTEGER)

valor_activo_inicio (DECIMAL(18,2))

depreciacion_acumulada_inicio (DECIMAL(18,2))

valor_neto_inicio (DECIMAL(18,2))

valor_depreciacion_mes (DECIMAL(18,2))

depreciacion_acumulada_fin (DECIMAL(18,2))

valor_neto_fin (DECIMAL(18,2))

metodo_depreciacion (VARCHAR(30))

tasa_depreciacion (DECIMAL(5,2))

unidades_periodo (INTEGER)

estado (VARCHAR(20))

asiento_id (UUID, FK a asientos_contables.id)

fecha_contabilizacion (TIMESTAMP WITH TIME ZONE)

observaciones (TEXT)

calculado_automatico (BOOLEAN)

usuario_calculo (UUID, FK a usuarios.id)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

Tabla: activos_revalorizaciones

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

activo_id (UUID, FK a activos_fijos.id)

numero_revalorizacion (VARCHAR(20))

fecha_revalorizacion (DATE)

tipo_revalorizacion (VARCHAR(30))

valor_anterior (DECIMAL(18,2))

depreciacion_acumulada_anterior (DECIMAL(18,2))

valor_neto_anterior (DECIMAL(18,2))

valor_revalorizacion (DECIMAL(18,2))

valor_nuevo (DECIMAL(18,2))

valor_neto_nuevo (DECIMAL(18,2))

vida_util_anterior (INTEGER)

vida_util_nueva (INTEGER)

motivo (TEXT)

documento_soporte (VARCHAR(255))

perito_responsable (VARCHAR(255))

estado (VARCHAR(20))

asiento_id (UUID, FK a asientos_contables.id)

usuario_registro (UUID, FK a usuarios.id)

usuario_aprobador (UUID, FK a usuarios.id)

fecha_aprobacion (TIMESTAMP WITH TIME ZONE)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: activos_mantenimientos

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

activo_id (UUID, FK a activos_fijos.id)

numero_mantenimiento (VARCHAR(20))

tipo_mantenimiento (VARCHAR(30))

fecha_programada (DATE)

fecha_realizacion (DATE)

descripcion (TEXT)

problema_detectado (TEXT)

solucion_aplicada (TEXT)

costo_mano_obra (DECIMAL(18,2))

costo_repuestos (DECIMAL(18,2))

costo_otros (DECIMAL(18,2))

costo_total (DECIMAL(18,2), GENERATED)

es_capitalizable (BOOLEAN)

proveedor_id (UUID, FK a personas.id)

proveedor_nombre (VARCHAR(255))

tecnico_responsable (VARCHAR(255))

factura_id (UUID, FK a facturas_compras.id)

numero_orden_trabajo (VARCHAR(50))

estado (VARCHAR(20))

proxima_fecha_mantenimiento (DATE)

observaciones (TEXT)

informe_url (TEXT)

usuario_registro (UUID, FK a usuarios.id)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Tabla: activos_disposiciones

id (UUID, PK)

razon_social_id (UUID, FK a razones_sociales.id)

activo_id (UUID, FK a activos_fijos.id)

numero_disposicion (VARCHAR(20))

tipo_disposicion (VARCHAR(30))

fecha_disposicion (DATE)

valor_original (DECIMAL(18,2))

depreciacion_acumulada (DECIMAL(18,2))

valor_neto_libros (DECIMAL(18,2))

valor_venta (DECIMAL(18,2))

gastos_venta (DECIMAL(18,2))

valor_neto_venta (DECIMAL(18,2), GENERATED)

utilidad_perdida (DECIMAL(18,2), GENERATED)

comprador_id (UUID, FK a personas.id)

comprador_nombre (VARCHAR(255))

comprador_identificacion (VARCHAR(20))

motivo (TEXT)

autorizacion (VARCHAR(100))

estado (VARCHAR(20))

factura_venta_id (UUID, FK a facturas_ventas.id)

asiento_id (UUID, FK a asientos_contables.id)

documento_soporte_url (TEXT)

acta_baja_url (TEXT)

usuario_registro (UUID, FK a usuarios.id)

usuario_aprobador (UUID, FK a usuarios.id)

fecha_aprobacion (TIMESTAMP WITH TIME ZONE)

created_at (TIMESTAMP WITH TIME ZONE)

updated_at (TIMESTAMP WITH TIME ZONE)

deleted_at (TIMESTAMP WITH TIME ZONE)

Migración 0015: Vistas y Funciones de Reportes Financieros
(Esta migración no crea tablas físicas, sino vistas materializadas y funciones).

Vista: v_saldos_cuentas

Vista: v_balance_general

Vista: v_estado_resultados

Vista: v_libro_mayor

Vista: v_cuentas_por_cobrar_pagar

Vista: v_totales_balance

Vista: v_totales_estado_resultados

Vista: v_evolucion_mensual_cuentas

Función: fn_movimientos_contables()

Función: fn_balance_general()

Función: fn_estado_resultados()

Función: fn_calcular_utilidad_periodo()

Función: fn_comparativo_periodos()

Función: fn_rentabilidad_proyectos()

