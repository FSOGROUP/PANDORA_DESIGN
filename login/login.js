(function() {
  'use strict';
  
  // Base de datos de usuarios (SOLO VISUAL)
  const usuarios = {
    'admin@fso.ec': { rol: 'superadmin', nombre: 'Dev Admin' },
    'admin@techcorp.ec': { rol: 'admin', nombre: 'Carlos Gómez' },
    'operativo1@techcorp.ec': { rol: 'operativo', nombre: 'Carlos Cajero' },
    'operativo2@techcorp.ec': { rol: 'operativo', nombre: 'Ana RRHH' },
    'operativo3@techcorp.ec': { rol: 'operativo', nombre: 'Luis Bodega' },
    'admin@consultora.ec': { rol: 'admin', nombre: 'Ana López' },
    'operativo1@consultora.ec': { rol: 'operativo', nombre: 'María Ventas' }
  };

  const demos = [
    { role: '🔱 SUPER ADMIN (FSO)', email: 'admin@fso.ec', password: 'admin123' },
    { role: '🏢 ADMIN - TechCorp', email: 'admin@techcorp.ec', password: 'admin123' },
    { role: '👤 OPERATIVO - TechCorp (Cajero)', email: 'operativo1@techcorp.ec', password: 'operativo123' },
    { role: '👤 OPERATIVO - TechCorp (RRHH)', email: 'operativo2@techcorp.ec', password: 'operativo123' },
    { role: '👤 OPERATIVO - TechCorp (Bodega)', email: 'operativo3@techcorp.ec', password: 'operativo123' },
    { role: '🏢 ADMIN - Consultora', email: 'admin@consultora.ec', password: 'admin123' },
    { role: '👤 OPERATIVO - Consultora (Ventas)', email: 'operativo1@consultora.ec', password: 'operativo123' }
  ];

  // Cargar lista de demostración
  document.addEventListener('DOMContentLoaded', function() {
    const demoList = document.getElementById('demo-accounts-list');
    
    demos.forEach(demo => {
      const el = document.createElement('div');
      el.className = 'demo-account';
      el.innerHTML = `
        <span class="demo-role">${demo.role}</span>
        <span class="demo-creds">${demo.email}</span>
      `;
      el.onclick = function() {
        document.getElementById('login-email').value = demo.email;
        document.getElementById('login-password').value = demo.password;
        document.getElementById('login-error').style.display = 'none';
      };
      demoList.appendChild(el);
    });

    // Evento del botón login
    document.getElementById('login-button').addEventListener('click', doLogin);
  });

  function doLogin() {
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');

    // Validación visual simple
    if (email === 'admin@fso.ec' && password === 'admin123') {
      window.location.href = '../inicio-superadmin/inicio-superadmin.html';
    } 
    else if (email === 'admin@techcorp.ec' && password === 'admin123') {
      window.location.href = '../inicio-admin/inicio-admin.html';
    }
    else if (email === 'admin@consultora.ec' && password === 'admin123') {
      window.location.href = '../inicio-admin/inicio-admin.html';
    }
    else if (email.includes('operativo') && password === 'operativo123') {
      window.location.href = '../inicio-operativo/inicio-operativo.html';
    }
    else {
      errorEl.style.display = 'flex';
    }
  }

  // Exponer función para los demos
  window.fillDemo = function(email, password) {
    document.getElementById('login-email').value = email;
    document.getElementById('login-password').value = password;
    document.getElementById('login-error').style.display = 'none';
  };
})();