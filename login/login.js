(function() {
  'use strict';

  const demos = [
    { role: 'SUPER ADMIN (FSO)', icon: 'crown', email: 'admin@fso.ec', password: 'admin123' },
    { role: 'ADMIN - TechCorp', icon: 'building', email: 'admin@techcorp.ec', password: 'admin123' },
    { role: 'OPERATIVO - TechCorp (Cajero)', icon: 'user', email: 'operativo1@techcorp.ec', password: 'operativo123' },
    { role: 'OPERATIVO - TechCorp (RRHH)', icon: 'users', email: 'operativo2@techcorp.ec', password: 'operativo123' },
    { role: 'OPERATIVO - TechCorp (Bodega)', icon: 'warehouse', email: 'operativo3@techcorp.ec', password: 'operativo123' },
    { role: 'ADMIN - Consultora', icon: 'briefcase', email: 'admin@consultora.ec', password: 'admin123' },
    { role: 'OPERATIVO - Consultora (Ventas)', icon: 'chart-line', email: 'operativo1@consultora.ec', password: 'operativo123' }
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

        if (emailVal === 'admin@fso.ec' && passVal === 'admin123') {
          window.location.href = '../inicio-superadmin/inicio-superadmin.html';
        } 
        else if (emailVal === 'admin@techcorp.ec' && passVal === 'admin123') {
          window.location.href = '../inicio-admin/inicio-admin.html';
        }
        else if (emailVal === 'admin@consultora.ec' && passVal === 'admin123') {
          window.location.href = '../inicio-admin/inicio-admin.html';
        }
        else if (emailVal.includes('operativo') && passVal === 'operativo123') {
          window.location.href = '../inicio-operativo/inicio-operativo.html';
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