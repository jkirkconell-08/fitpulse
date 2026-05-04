/* =========================================================
   FitPulse - Módulo Cardio / Running
   MET × peso_kg × horas = kcal
   ========================================================= */

const CARDIO_TYPES = [
  { id: 'correr',    label: 'Correr',     icon: 'activity', met: 9.8,  unit: 'km' },
  { id: 'caminar',   label: 'Caminar',    icon: 'footprints', met: 3.5, unit: 'km' },
  { id: 'ciclismo',  label: 'Ciclismo',   icon: 'bike',     met: 7.5,  unit: 'km' },
  { id: 'natacion',  label: 'Natación',   icon: 'waves',    met: 8.0,  unit: 'km' },
  { id: 'eliptica',  label: 'Elíptica',   icon: 'zap',      met: 5.0,  unit: 'min' },
  { id: 'cuerda',    label: 'Cuerda',     icon: 'repeat',   met: 10.0, unit: 'min' },
  { id: 'hiit',      label: 'HIIT',       icon: 'flame',    met: 8.5,  unit: 'min' },
  { id: 'otro',      label: 'Otro',       icon: 'heart',    met: 5.0,  unit: 'min' },
];

const CARDIO_KEY = 'fitpulse_cardio_sessions';

const Cardio = {
  DIAS_SEMANA: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],

  getSessions() {
    try { return JSON.parse(localStorage.getItem(CARDIO_KEY) || '[]'); } catch { return []; }
  },

  saveSession(s) {
    const all = this.getSessions();
    all.unshift(s);
    localStorage.setItem(CARDIO_KEY, JSON.stringify(all.slice(0, 200)));
    if (typeof Storage !== 'undefined' && Storage._syncToCloud) Storage._syncToCloud();
  },

  calcKcal(tipo, distancia, duracion, pesoKg) {
    const t = CARDIO_TYPES.find(c => c.id === tipo) || CARDIO_TYPES[0];
    const horas = duracion / 60;
    return Math.round(t.met * (pesoKg || 75) * horas);
  },

  init() {
    initDarkMode();
    this._render();
  },

  _render() {
    const container = document.getElementById('cardio-container');
    if (!container) return;
    const sessions = this.getSessions();
    const config   = Storage.obtenerConfig();
    const pesoKg   = Storage.obtenerPesos().registros.slice(-1)[0]?.peso || config.pesoInicial || 75;

    // Weekly stats
    const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
    const weekSes = sessions.filter(s => new Date(s.fecha + 'T12:00').getTime() >= weekAgo);
    const weekKcal = weekSes.reduce((t, s) => t + (s.kcal || 0), 0);
    const weekKm   = weekSes.reduce((t, s) => t + (s.distancia || 0), 0);

    container.innerHTML = `
      <!-- Stats rápidos -->
      <div class="stats-row fade-in" style="margin-bottom:18px;">
        <div class="stat-mini"><span class="valor">${weekSes.length}</span><span class="label">Sesiones</span></div>
        <div class="stat-mini"><span class="valor">${weekKm.toFixed(1)}</span><span class="label">km semana</span></div>
        <div class="stat-mini"><span class="valor">${weekKcal.toLocaleString()}</span><span class="label">kcal semana</span></div>
      </div>

      <!-- Registrar nueva sesión -->
      <div class="config-card fade-in" style="margin-bottom:20px;" id="cardio-form-card">
        <h3 style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          Registrar sesión
        </h3>

        <!-- Tipo de cardio -->
        <label class="cfg-label">Tipo</label>
        <div class="cardio-type-grid" id="cardio-type-grid">
          ${CARDIO_TYPES.map(t => `
            <button class="cardio-type-btn" data-id="${t.id}">
              <i data-lucide="${t.icon}" style="width:20px;height:20px;"></i>
              <span>${t.label}</span>
            </button>
          `).join('')}
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px;">
          <div>
            <label class="cfg-label">Fecha</label>
            <input type="date" id="cardio-fecha" value="${Storage.today()}" max="${Storage.today()}"
              style="width:100%;padding:10px 12px;border:1.5px solid var(--border);border-radius:10px;background:var(--bg-input);color:var(--text-primary);font-family:inherit;font-size:0.9rem;">
          </div>
          <div>
            <label class="cfg-label">Duración (min)</label>
            <input type="number" id="cardio-duracion" min="1" max="600" value="30" placeholder="30"
              style="width:100%;padding:10px 12px;border:1.5px solid var(--border);border-radius:10px;background:var(--bg-input);color:var(--text-primary);font-family:inherit;font-size:0.9rem;">
          </div>
          <div>
            <label class="cfg-label">Distancia (km)</label>
            <input type="number" id="cardio-distancia" min="0" step="0.1" value="" placeholder="0.0"
              style="width:100%;padding:10px 12px;border:1.5px solid var(--border);border-radius:10px;background:var(--bg-input);color:var(--text-primary);font-family:inherit;font-size:0.9rem;">
          </div>
          <div>
            <label class="cfg-label">Calorías est.</label>
            <div id="cardio-kcal-preview"
              style="padding:10px 12px;border:1.5px solid var(--border);border-radius:10px;background:var(--bg-input);color:var(--brand-light);font-weight:800;font-size:1rem;min-height:42px;display:flex;align-items:center;">—</div>
          </div>
        </div>

        <div style="margin-top:10px;">
          <label class="cfg-label">Nota (opcional)</label>
          <input type="text" id="cardio-nota" placeholder="Ej: Carrera en el parque"
            style="width:100%;padding:10px 12px;border:1.5px solid var(--border);border-radius:10px;background:var(--bg-input);color:var(--text-primary);font-family:inherit;font-size:0.9rem;">
        </div>

        <button id="btn-guardar-cardio" class="btn btn-primary btn-full" style="margin-top:14px;">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:middle;margin-right:6px;"><polyline points="20 6 9 17 4 12"/></svg>
          Guardar sesión
        </button>
      </div>

      <!-- Historial -->
      <div class="config-card fade-in">
        <h3 style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          Historial
        </h3>
        ${sessions.length === 0
          ? `<div class="empty-state"><p>Sin sesiones aún.<br>Registra tu primera sesión de cardio.</p></div>`
          : sessions.slice(0, 20).map(s => this._sessionCard(s)).join('')
        }
      </div>
    `;

    Icons.init(container);
    this._initForm(pesoKg);
  },

  _initForm(pesoKg) {
    let selectedType = CARDIO_TYPES[0].id;

    // Type buttons
    const grid = document.getElementById('cardio-type-grid');
    grid.querySelector(`[data-id="${selectedType}"]`).classList.add('active');
    grid.querySelectorAll('.cardio-type-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        grid.querySelectorAll('.cardio-type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedType = btn.dataset.id;
        this._updateKcalPreview(selectedType, pesoKg);
      });
    });

    // Auto-update kcal
    const updatePreview = () => this._updateKcalPreview(selectedType, pesoKg);
    document.getElementById('cardio-duracion').addEventListener('input', updatePreview);
    document.getElementById('cardio-distancia').addEventListener('input', updatePreview);

    document.getElementById('btn-guardar-cardio').addEventListener('click', () => {
      const fecha    = document.getElementById('cardio-fecha').value;
      const duracion = parseInt(document.getElementById('cardio-duracion').value) || 0;
      const dist     = parseFloat(document.getElementById('cardio-distancia').value) || 0;
      const nota     = document.getElementById('cardio-nota').value.trim();

      if (!fecha || duracion < 1) {
        showToast('Ingresa duración válida', 'warning'); return;
      }

      const kcal = this.calcKcal(selectedType, dist, duracion, pesoKg);
      const type = CARDIO_TYPES.find(t => t.id === selectedType);

      this.saveSession({
        id: 'cardio_' + Date.now(),
        fecha,
        tipo: selectedType,
        tipoLabel: type.label,
        tipoIcon:  type.icon,
        duracion,
        distancia: dist,
        kcal,
        nota
      });
      showToast(`✅ ${type.label} guardado — ${kcal} kcal`);
      this._render();
    });
  },

  _updateKcalPreview(tipo, pesoKg) {
    const duracion  = parseInt(document.getElementById('cardio-duracion')?.value) || 0;
    const distancia = parseFloat(document.getElementById('cardio-distancia')?.value) || 0;
    const kcal = this.calcKcal(tipo, distancia, duracion, pesoKg);
    const el = document.getElementById('cardio-kcal-preview');
    if (el) el.textContent = duracion > 0 ? `~${kcal} kcal` : '—';
  },

  _sessionCard(s) {
    const type = CARDIO_TYPES.find(t => t.id === s.tipo) || CARDIO_TYPES[0];
    const d = new Date(s.fecha + 'T12:00');
    const dateLabel = `${this.DIAS_SEMANA[d.getDay()]} ${d.getDate()}/${d.getMonth()+1}`;
    return `
      <div class="ex-card fade-in" style="margin-bottom:10px;" data-cid="${s.id}">
        <div class="ex-card-header" style="justify-content:flex-start;gap:12px;">
          <div style="width:40px;height:40px;background:linear-gradient(135deg,#7C3AED,#A78BFA);border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <i data-lucide="${type.icon}" style="width:20px;height:20px;color:#fff;"></i>
          </div>
          <div style="flex:1;min-width:0;">
            <div style="font-weight:800;font-size:0.9rem;">${s.tipoLabel || type.label}</div>
            <div style="font-size:0.72rem;color:var(--text-muted);">${dateLabel}</div>
          </div>
          <button class="cardio-del-btn meal-item-del" data-cid="${s.id}" title="Eliminar" style="flex-shrink:0;">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/></svg>
          </button>
        </div>
        <div style="display:flex;gap:12px;margin-top:10px;flex-wrap:wrap;">
          ${s.duracion ? `<div class="ex-serie-row" style="gap:4px;"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><span>${s.duracion} min</span></div>` : ''}
          ${s.distancia ? `<div class="ex-serie-row" style="gap:4px;"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg><span>${s.distancia} km</span></div>` : ''}
          ${s.kcal ? `<div class="ex-serie-row" style="gap:4px;color:var(--brand-light);"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg><span>${s.kcal} kcal</span></div>` : ''}
          ${s.nota ? `<div style="font-size:0.75rem;color:var(--text-muted);font-style:italic;width:100%;">"${s.nota}"</div>` : ''}
        </div>
      </div>
    `;
  }
};

// Init delete buttons after render (delegated)
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.cardio-del-btn');
  if (!btn) return;
  const cid = btn.dataset.cid;
  if (!cid) return;
  if (confirm('¿Eliminar esta sesión?')) {
    const all = Cardio.getSessions().filter(s => s.id !== cid);
    localStorage.setItem(CARDIO_KEY, JSON.stringify(all));
    Cardio._render();
    showToast('Sesión eliminada');
  }
});
