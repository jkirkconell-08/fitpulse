/* =========================================================
   FitPulse - Perfil y ajustes (fusiona menu.html + config.html)
   ========================================================= */

const Perfil = {
  init() {
    this._renderAccount();
    this._renderSync();
    this._renderPlan();
    this._renderApp();
  },

  _renderAccount() {
    const el = document.getElementById('account-card');
    if (!el) return;
    const user = Auth.getUser();
    const isOffline = localStorage.getItem('fitpulse_offline') === 'true';
    const isLocal = !user?.email && !isOffline;
    const noAccount = isOffline || isLocal;

    el.innerHTML = `
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px;">
        ${user?.photo || user?.photoURL
          ? `<img src="${user.photo || user.photoURL}" style="width:52px;height:52px;border-radius:50%;object-fit:cover;" alt="">`
          : `<div style="width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--brand),var(--brand-light));display:flex;align-items:center;justify-content:center;font-weight:900;font-size:1.3rem;color:#fff;">${(user?.name || user?.displayName || '?')[0]}</div>`}
        <div>
          <div style="font-weight:700;font-size:1rem;">${user?.name || user?.displayName || 'Usuario local'}</div>
          <div style="font-size:0.8rem;color:var(--text-muted);">${user?.email || (noAccount ? 'Sin cuenta — datos guardados localmente' : 'Sin correo')}</div>
        </div>
      </div>
      ${noAccount ? `
        <button id="btn-connect-google" class="btn-lime" style="width:100%;height:48px;border:none;border-radius:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
          <i data-lucide="chrome" style="width:18px;height:18px"></i>Conectar con Google
        </button>
      ` : `
        <button id="btn-logout" class="btn btn-secondary btn-full">Cerrar sesión</button>
      `}
    `;
    document.getElementById('btn-connect-google')?.addEventListener('click', async () => {
      showToast('Conectando con Google…');
      localStorage.removeItem('fitpulse_offline');
      const res = await Auth.loginWithGoogle();
      if (res) { showToast('Cuenta conectada'); setTimeout(() => location.reload(), 1000); }
      else localStorage.setItem('fitpulse_offline', 'true');
    });
    document.getElementById('btn-logout')?.addEventListener('click', () => Auth.logout());
    Icons.init(el);
  },

  _renderSync() {
    const el = document.getElementById('sync-card');
    if (!el) return;
    const isOffline = localStorage.getItem('fitpulse_offline') === 'true';
    const lastSync = localStorage.getItem('fitpulse_last_sync');
    el.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;font-size:0.82rem;color:var(--text-muted);margin-bottom:12px;">
        <span class="sync-dot ${isOffline ? 'offline' : 'synced'}"></span>
        ${isOffline ? 'Offline — los datos se guardan solo en este dispositivo' : `Nube activa${lastSync ? ' · último sync ' + new Date(parseInt(lastSync)).toLocaleTimeString() : ''}`}
      </div>
      <div style="display:flex;gap:8px;">
        <button id="btn-sync-up" class="btn btn-secondary" style="flex:1;">Subir</button>
        <button id="btn-sync-down" class="btn btn-secondary" style="flex:1;">Descargar</button>
      </div>
    `;
    document.getElementById('btn-sync-up').addEventListener('click', async () => {
      if (isOffline) { showToast('Inicia sesión para sincronizar', 'warning'); return; }
      showToast('Subiendo datos...');
      await CloudSync.pushToCloud();
      localStorage.setItem('fitpulse_last_sync', Date.now());
      showToast('Datos subidos a la nube');
    });
    document.getElementById('btn-sync-down').addEventListener('click', async () => {
      if (isOffline) { showToast('Inicia sesión para sincronizar', 'warning'); return; }
      showToast('Descargando desde la nube...');
      await CloudSync.forceDownload();
    });
  },

  _renderPlan() {
    const el = document.getElementById('plan-card');
    if (!el) return;
    const config = Storage.obtenerConfig();
    const DIAS_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const GOALS = { perder_grasa: 'Perder grasa', ganar_musculo: 'Ganar músculo', rendimiento: 'Rendimiento' };
    let diasHTML = '';
    for (let i = 0; i < 7; i++) {
      const checked = (config.diasGym || []).includes(i) ? 'checked' : '';
      diasHTML += `<input type="checkbox" class="dia-checkbox" id="dia-${i}" value="${i}" ${checked}><label for="dia-${i}" class="dia-label">${DIAS_LABELS[i]}</label>`;
    }
    el.innerHTML = `
      <div class="config-row"><label>Nombre</label><input type="text" id="cfg-nombre" value="${config.nombre || ''}"></div>
      <div class="config-row"><label>Meta</label>
        <select id="cfg-goal">
          <option value="">Sin definir</option>
          ${Object.entries(GOALS).map(([k, v]) => `<option value="${k}" ${config.goal === k ? 'selected' : ''}>${v}</option>`).join('')}
        </select>
      </div>
      <div class="config-row"><label>Peso inicial (kg)</label><input type="number" id="cfg-peso-inicial" value="${config.pesoInicial}" step="0.1"></div>
      <div class="config-row"><label>Meta de peso (kg)</label><input type="number" id="cfg-meta" value="${config.meta}" step="0.1"></div>
      <div class="config-row"><label>Hito motivador (kg)</label><input type="number" id="cfg-hito" value="${config.hito}" step="0.1"></div>
      <div class="config-row"><label>Meta calórica diaria (kcal)</label><input type="number" id="cfg-meta-cal" value="${config.metaCal || 2200}" step="50"></div>
      <div class="config-row"><label>Meta de agua (vasos)</label><input type="number" id="cfg-meta-agua" value="${Storage.obtenerAgua(Storage.today()).meta || 8}" step="1" min="1"></div>
      <div class="config-row"><label>Hora de inicio del gym</label><input type="time" id="cfg-hora-gym" value="${config.horaGym}"></div>
      <div class="config-row"><label>Hora de cena</label><input type="time" id="cfg-hora-cena" value="${config.horaCena}"></div>
      <div class="config-row"><label>Días de gym</label><div class="dias-gym-grid">${diasHTML}</div></div>
      <button id="btn-guardar-plan" class="btn-lime" style="width:100%;height:50px;border:none;border-radius:14px;cursor:pointer;margin-top:6px;">Guardar</button>
    `;
    document.getElementById('btn-guardar-plan').addEventListener('click', () => {
      const diasGym = [];
      for (let i = 0; i < 7; i++) { if (document.getElementById(`dia-${i}`).checked) diasGym.push(i); }
      Storage.guardarConfig({
        ...config,
        nombre: document.getElementById('cfg-nombre').value,
        goal: document.getElementById('cfg-goal').value || null,
        pesoInicial: parseFloat(document.getElementById('cfg-peso-inicial').value),
        meta: parseFloat(document.getElementById('cfg-meta').value),
        hito: parseFloat(document.getElementById('cfg-hito').value),
        metaCal: parseInt(document.getElementById('cfg-meta-cal').value) || 2200,
        horaGym: document.getElementById('cfg-hora-gym').value,
        horaCena: document.getElementById('cfg-hora-cena').value,
        diasGym
      });
      const agua = Storage.obtenerAgua(Storage.today());
      agua.meta = parseInt(document.getElementById('cfg-meta-agua').value) || 8;
      Storage.guardarAgua(Storage.today(), agua);
      showToast('Guardado');
    });
  },

  _renderApp() {
    const el = document.getElementById('app-card');
    if (!el) return;
    const notifCfg = JSON.parse(localStorage.getItem('fitpulse_notif_cfg') || '{}');
    const globalOn = notifCfg.global !== false;
    el.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border);">
        <div>
          <div style="font-weight:700;font-size:0.9rem;">Notificaciones</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">Recordatorios de comidas, gym y cierre del día</div>
        </div>
        <label class="toggle-switch"><input type="checkbox" id="notif-global-toggle" ${globalOn ? 'checked' : ''}><span class="toggle-slider"></span></label>
      </div>
      <div style="padding:12px 0;border-bottom:1px solid var(--border);">
        <button id="btn-test-notif" class="btn btn-secondary btn-full">Enviar notificación de prueba</button>
      </div>
      <div style="padding:12px 0;border-bottom:1px solid var(--border);">
        <div style="font-weight:700;font-size:0.9rem;margin-bottom:10px;">Datos</div>
        <div style="display:flex;gap:8px;">
          <button id="btn-exportar" class="btn btn-secondary" style="flex:1;">Exportar</button>
          <button id="btn-importar" class="btn btn-secondary" style="flex:1;">Importar</button>
        </div>
        <input type="file" id="import-file" accept=".json" style="display:none;">
      </div>
      <a href="privacy.html" style="display:flex;align-items:center;justify-content:space-between;padding:14px 0;text-decoration:none;color:var(--text-primary);">
        <span style="font-weight:700;font-size:0.9rem;">Privacidad</span>
        <i data-lucide="chevron-right" style="width:18px;height:18px;color:var(--text-muted);"></i>
      </a>
    `;
    Icons.init(el);

    document.getElementById('notif-global-toggle').addEventListener('change', async (e) => {
      const cfg = JSON.parse(localStorage.getItem('fitpulse_notif_cfg') || '{}');
      cfg.global = e.target.checked;
      localStorage.setItem('fitpulse_notif_cfg', JSON.stringify(cfg));
      if (cfg.global) { await Notificaciones.solicitarPermiso(); Notificaciones._scheduleToday(); }
    });
    document.getElementById('btn-test-notif').addEventListener('click', () => Notificaciones.test());
    document.getElementById('btn-exportar').addEventListener('click', () => {
      const blob = new Blob([Storage.exportarDatos()], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `fitpulse_backup_${Storage.today()}.json`;
      a.click();
    });
    document.getElementById('btn-importar').addEventListener('click', () => document.getElementById('import-file').click());
    document.getElementById('import-file').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try { Storage.importarDatos(ev.target.result); showToast('Datos importados. Recargando...'); setTimeout(() => location.reload(), 1500); }
        catch { showToast('Error al importar', 'warning'); }
      };
      reader.readAsText(file);
    });
  }
};
