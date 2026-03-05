(function() {
  'use strict';

  const demos = [
    { role: 'SUPER ADMIN (FSO)', icon: 'crown', email: 'admin@fso.ec', password: 'admin123' },
    { role: 'ADMIN - TechCorp', icon: 'building', email: 'admin@techcorp.ec', password: 'admin123' },
    { role: 'OPERATIVO (Cajero/Vendedor/Bodega/RRHH)', icon: 'user', email: 'operativo@techcorp.ec', password: 'operativo123' }
  ];

  document.addEventListener('DOMContentLoaded', function() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const toggle = document.getElementById('togglePassword');
    const loginBtn = document.getElementById('loginBtn');
    const error = document.getElementById('errorMessage');
    const demoList = document.getElementById('demoList');

    // Toggle contraseña
    if (toggle) {
      toggle.addEventListener('click', function() {
        const type = password.type === 'password' ? 'text' : 'password';
        password.type = type;
        this.querySelector('i').className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
      });
    }

    // Cargar demos
    if (demoList) {
      demos.forEach(demo => {
        const item = document.createElement('div');
        item.className = 'demo-item';
        item.innerHTML = `
          <span class="demo-role">
            <i class="fas fa-${demo.icon}"></i>
            ${demo.role}
          </span>
          <span class="demo-email">${demo.email}</span>
        `;
        
        item.onclick = () => {
          email.value = demo.email;
          password.value = demo.password;
          error.style.display = 'none';
          
          document.querySelectorAll('.demo-item').forEach(el => {
            el.style.borderColor = 'var(--gray-4)';
          });
          item.style.borderColor = 'var(--primary)';
        };
        
        demoList.appendChild(item);
      });
    }

    // Login
    if (loginBtn) {
      loginBtn.onclick = () => {
        const emailVal = email.value.trim().toLowerCase();
        const passVal = password.value;

        // SUPER ADMIN
        if (emailVal === 'admin@fso.ec' && passVal === 'admin123') {
          window.location.href = '../inicio-superadmin/inicio-superadmin.html';
        } 
        // ADMIN TechCorp
        else if (emailVal === 'admin@techcorp.ec' && passVal === 'admin123') {
          window.location.href = '../inicio-admin/inicio-admin.html';
        }
        // OPERATIVO ÚNICO
        else if (emailVal === 'operativo@techcorp.ec' && passVal === 'operativo123') {
          // Pasamos parámetro para saber qué tipo de operativo simular
          // Por defecto, mostramos todos los bloques
          window.location.href = '../inicio-operativo/inicio-operativo.html?demo=completo';
        }
        else {
          error.style.display = 'flex';
          email.style.borderColor = '#E53935';
          password.style.borderColor = '#E53935';
          
          setTimeout(() => {
            email.style.borderColor = '';
            password.style.borderColor = '';
          }, 1000);
        }
      };
    }

    // Enter key
    [email, password].forEach(input => {
      if (input) {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter' && loginBtn) loginBtn.click();
        });
      }
    });
  });
})();