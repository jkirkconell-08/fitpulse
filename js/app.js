/* =========================================================
   FitPulse - Rutina Diaria del "Hoy" (editable por usuario)
   ========================================================= */

const DEFAULT_DAILY_ITEMS = [
  { id: 'agua_manana',      label: 'Agua al levantarse',            icon: 'drop', seccion: 'manana',  gymOnly: false },
  { id: 'pre_entreno',      label: 'Pre-entreno (banano/galletas)', icon: 'bolt', seccion: 'manana',  gymOnly: true  },
  { id: 'gym',              label: 'Gym completado',                icon: 'dumbbell', seccion: 'manana',  gymOnly: true  },
  { id: 'desayuno_postgym', label: 'Desayuno completo',            icon: 'utensils', seccion: 'manana',  gymOnly: false },
  { id: 'merienda_manana',  label: 'Merienda mañana',              icon: 'cup', seccion: 'manana',  gymOnly: false },
  { id: 'almuerzo',         label: 'Almuerzo',                     icon: 'utensils', seccion: 'tarde',   gymOnly: false },
  { id: 'merienda_tarde',   label: 'Merienda tarde',               icon: 'apple', seccion: 'tarde',   gymOnly: false },
  { id: 'cena',             label: 'Cena',                         icon: 'leaf', seccion: 'noche',   gymOnly: false },
  { id: 'agua_2L',          label: '2 litros de agua hoy',         icon: 'drop', seccion: 'general', gymOnly: false },
  { id: 'dormir_10pm',      label: 'Dormir antes de 10:00pm',      icon: 'moon', seccion: 'noche',   gymOnly: false }
];

const DAILY_ROUTINE_KEY = 'fitpulse_daily_routine';

function getDailyItems() {
  const raw = localStorage.getItem(DAILY_ROUTINE_KEY);
  if (raw) { try { return JSON.parse(raw); } catch {} }
  const defaults = JSON.parse(JSON.stringify(DEFAULT_DAILY_ITEMS));
  localStorage.setItem(DAILY_ROUTINE_KEY, JSON.stringify(defaults));
  return defaults;
}

function saveDailyItems(items) {
  localStorage.setItem(DAILY_ROUTINE_KEY, JSON.stringify(items));
  if (typeof Storage !== 'undefined' && Storage._syncToCloud) Storage._syncToCloud();
}

function getItemsForDate(fecha) {
  const d = new Date(fecha + 'T12:00:00');
  const diaSemana = d.getDay();
  const config = Storage.obtenerConfig();
  const diasGym = config.diasGym || [1, 2, 3, 4, 5];
  const esGym = diasGym.includes(diaSemana);
  return getDailyItems().filter(item => !item.gymOnly || esGym);
}


const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const DIAS_CORTO  = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

/* ─── Helper: dark mode init (shared) ─── */
function initDarkMode() {
  // Default is dark. Light mode = body.light class
  const isLight = Storage.getDarkMode() === 'light';
  if (isLight) {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
  } else {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
  }

  const toggle = document.getElementById('dark-toggle');
  if (toggle) {
    // Remove any previously attached listeners by cloning
    const fresh = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(fresh, toggle);
    fresh.addEventListener('click', () => {
      const nowLight = document.body.classList.toggle('light');
      document.body.classList.toggle('dark', !nowLight);
      Storage.setDarkMode(nowLight ? 'light' : 'dark');
    });
  }
}

/* ─── Helper: toast ─── */
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

/* =========================================================
   App - Checklist del día actual
   ========================================================= */
const App = {
  fecha: null,
  config: null,
  overlayActive: false,

  init() {
    this.fecha = Storage.today();
    this.config = Storage.obtenerConfig();
    initDarkMode();
    this._renderFecha();
    this._renderStats();
    this._renderWater();
    this._renderChecklist();
    this._renderNota();
    this._startOverlayCheck();
    Notificaciones.init();
  },

  _renderFecha() {
    const el = document.getElementById('fecha-display');
    if (!el) return;
    const d = new Date();
    const racha = Storage.calcularRacha();
    el.innerHTML = `
      <div class="fecha-dia">
        <span class="num">${d.getDate()}</span>
        <span class="dia">${DIAS_CORTO[d.getDay()]}</span>
      </div>
      <div class="fecha-info">
        <div class="mes-year">${MESES[d.getMonth()]} ${d.getFullYear()}</div>
        ${racha > 0 ? `<div class="racha" style="display:flex;align-items:center;gap:5px;"><i data-lucide="flame" style="width:15px;height:15px;color:#FF6B35;"></i> ${racha} día${racha > 1 ? 's' : ''} de racha</div>` : ''}
      </div>
    `;
    if (window.lucide) lucide.createIcons();
  },

  _renderStats() {
    const el = document.getElementById('stats-row');
    if (!el) return;
    const dia = Storage.obtenerDia(this.fecha);
    const cumplimiento = dia ? dia.cumplimiento : 0;
    const racha = Storage.calcularRacha();
    const items = getItemsForDate(this.fecha);
    const checked = dia ? Object.values(dia.checklist || {}).filter(v => v === true).length : 0;
    el.innerHTML = `
      <div class="stat-mini"><span class="valor">${cumplimiento}%</span><span class="label">Hoy</span></div>
      <div class="stat-mini"><span class="valor">${checked}/${items.length}</span><span class="label">Items</span></div>
      <div class="stat-mini"><span class="valor">${racha}</span><span class="label">Racha</span></div>
    `;
  },

  _renderWater() {
    const el = document.getElementById('water-widget');
    if (!el) return;
    const agua = Storage.obtenerAgua(this.fecha);
    const pct = Math.min(100, (agua.vasos / agua.meta) * 100);
    const full = agua.vasos >= agua.meta;

    el.innerHTML = `
      <div class="water-card fade-in ${full ? 'complete' : ''}">
        <div class="water-left">
          <div class="water-bottle">
            <div class="water-fill" style="height:${pct}%"></div>
            <div class="water-drops">${'💧'.repeat(Math.min(agua.vasos, agua.meta))}</div>
          </div>
        </div>
        <div class="water-right">
          <div class="water-count">${agua.vasos}<span>/${agua.meta}</span></div>
          <div class="water-label">vasos de agua</div>
          <div class="water-btns">
            <button id="water-minus" class="water-btn minus">−</button>
            <button id="water-plus" class="water-btn plus">+ 1 vaso</button>
          </div>
          ${full ? '<div class="water-done">✅ ¡Meta cumplida!</div>' : ''}
        </div>
      </div>
    `;

    document.getElementById('water-plus').addEventListener('click', () => {
      Storage.agregarVasoAgua(this.fecha);
      this._renderWater();
    });
    document.getElementById('water-minus').addEventListener('click', () => {
      Storage.quitarVasoAgua(this.fecha);
      this._renderWater();
    });
    Icons.init();
  },

  _isItemDisponible(item) {
    if (item.hora === '00:00') return true;
    const now = new Date();
    const [h, m] = item.hora.split(':').map(Number);
    return now.getHours() * 60 + now.getMinutes() >= h * 60 + m;
  },

  _renderChecklist() {
    const container = document.getElementById('checklist-container');
    if (!container) return;
    const items = getItemsForDate(this.fecha);
    const dia = Storage.obtenerDia(this.fecha);
    const checklist = dia ? dia.checklist : {};

    const SECCIONES = [
      { key: 'manana',  titulo: '<i data-lucide="sunrise" style="width:18px;height:18px;margin-right:6px;vertical-align:middle;"></i>Mañana' },
      { key: 'tarde',   titulo: '<i data-lucide="sun" style="width:18px;height:18px;margin-right:6px;vertical-align:middle;"></i>Tarde' },
      { key: 'noche',   titulo: '<i data-lucide="moon" style="width:18px;height:18px;margin-right:6px;vertical-align:middle;"></i>Noche' },
      { key: 'general', titulo: '<i data-lucide="map-pin" style="width:18px;height:18px;margin-right:6px;vertical-align:middle;"></i>General' }
    ];

    container.innerHTML = '';

    for (const sec of SECCIONES) {
      const secItems = items.filter(i => i.seccion === sec.key);

      const section = document.createElement('div');
      section.className = 'checklist-section fade-in';

      // Section title row with edit button
      const titleRow = document.createElement('div');
      titleRow.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;';
      titleRow.innerHTML = `
        <div class="checklist-section-title" style="margin-bottom:0;">${sec.titulo}</div>
        <button class="btn-add-routine-item" data-sec="${sec.key}"
          style="background:rgba(124,58,237,0.12);border:1px solid rgba(124,58,237,0.25);color:#A78BFA;
                 padding:4px 10px;border-radius:8px;font-size:0.75rem;font-weight:700;cursor:pointer;">+ Agregar</button>
      `;
      section.appendChild(titleRow);

      if (secItems.length === 0) {
        const empty = document.createElement('div');
        empty.style.cssText = 'font-size:0.8rem;color:var(--text-muted);padding:10px 0 4px;font-style:italic;';
        empty.textContent = 'Ningún hábito — pulsa + Agregar';
        section.appendChild(empty);
      } else {
        const card = document.createElement('div');
        card.className = 'checklist-card';
        secItems.forEach(item => {
          const isChecked = checklist[item.id] === true;
          const el = document.createElement('div');
          el.className = `check-item${isChecked ? ' checked' : ''}`;
          el.style.cssText = 'gap:10px;';
          el.innerHTML = `
            <div class="check-box"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
            <div class="check-icon"><i data-lucide="${item.icon}" style="width:22px;height:22px;"></i></div>
            <div class="check-content" style="flex:1;">
              <div class="check-label">${item.label}</div>
            </div>
            <div style="display:flex;gap:4px;flex-shrink:0;">
              <button class="item-edit-btn" data-id="${item.id}"
                style="background:none;border:none;color:var(--text-muted);cursor:pointer;padding:4px;display:flex;align-items:center;" title="Editar">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none;"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="item-del-btn" data-id="${item.id}"
                style="background:none;border:none;color:var(--text-muted);cursor:pointer;padding:4px;display:flex;align-items:center;" title="Eliminar">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="pointer-events:none;"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
              </button>
            </div>
          `;
          el.querySelector('.check-box').addEventListener('click', (e) => { e.stopPropagation(); this._toggleItem(item.id, el); });
          el.querySelector('.check-label').addEventListener('click', (e) => { e.stopPropagation(); this._toggleItem(item.id, el); });
          el.querySelector('.check-icon').addEventListener('click', (e) => { e.stopPropagation(); this._toggleItem(item.id, el); });

          el.querySelector('.item-edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this._openItemEditor(item.id, sec.key);
          });
          el.querySelector('.item-del-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`¿Eliminar "${item.label}"?`)) {
              const all = getDailyItems().filter(i => i.id !== item.id);
              saveDailyItems(all);
              this._renderChecklist();
              this._renderStats();
              showToast('Hábito eliminado');
            }
          });

          card.appendChild(el);
        });
        section.appendChild(card);
      }

      // Wire add button
      section.querySelector('.btn-add-routine-item').addEventListener('click', () => {
        this._openItemEditor(null, sec.key);
      });

      container.appendChild(section);
    }
    Icons.init();
  },

  /* Open modal to add/edit a daily routine item */
  _openItemEditor(itemId, defaultSec = 'manana') {
    const existing = itemId ? getDailyItems().find(i => i.id === itemId) : null;
    const isNew = !existing;
    const ICONS = ['droplets','zap','dumbbell','utensils','cup-soda','coffee','apple','leaf','moon','map-pin','activity','pill','wind','book-open','shower-head','bed','clock','scale','brain','flame'];
    const SECS = [
      { key: 'manana', label: '<i data-lucide="sunrise" style="width:18px;height:18px;margin-right:6px;vertical-align:middle;"></i>Mañana' },
      { key: 'tarde',  label: '<i data-lucide="sun" style="width:18px;height:18px;margin-right:6px;vertical-align:middle;"></i>Tarde' },
      { key: 'noche',  label: '<i data-lucide="moon" style="width:18px;height:18px;margin-right:6px;vertical-align:middle;"></i>Noche' },
      { key: 'general',label: '<i data-lucide="map-pin" style="width:18px;height:18px;margin-right:6px;vertical-align:middle;"></i>General' }
    ];

    // Use nota-overlay as modal (repurpose)
    const overlay = document.getElementById('nota-overlay');
    overlay.classList.add('active');
    overlay.innerHTML = `
      <div class="overlay-content" style="max-width:460px;text-align:left;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h2 style="font-size:1.05rem;font-weight:800;">${isNew ? 'Nuevo hábito' : 'Editar hábito'}</h2>
          <button id="item-ed-close" style="background:none;border:none;color:var(--text-muted);font-size:1.5rem;cursor:pointer;">✕</button>
        </div>

        <label style="font-size:0.75rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px;">Descripción</label>
        <input id="item-ed-label" type="text" value="${existing?.label || ''}" placeholder="Ej: Tomar vitaminas"
          style="width:100%;padding:12px 14px;border:1.5px solid var(--border);border-radius:12px;background:var(--bg-input);color:var(--text-primary);font-family:inherit;font-size:0.95rem;outline:none;margin-bottom:14px;">

        <label style="font-size:0.75rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">Ícono</label>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;" id="icon-grid">
          ${ICONS.map(ic => `<button class="ic-btn" data-ic="${ic}" title="${ic}"
            style="width:40px;height:40px;border-radius:10px;border:2px solid ${existing?.icon===ic?'#7C3AED':'var(--border)'};background:${existing?.icon===ic?'rgba(124,58,237,0.15)':'var(--bg-input)'};cursor:pointer;display:flex;align-items:center;justify-content:center;"><i data-lucide="${ic}" style="width:20px;height:20px;"></i></button>`).join('')}
        </div>

        <label style="font-size:0.75rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">Momento del día</label>
        <div style="display:flex;gap:8px;margin-bottom:14px;" id="sec-grid">
          ${SECS.map(s => `<button class="sec-btn" data-sec="${s.key}"
            style="flex:1;padding:9px 4px;border-radius:10px;font-size:0.72rem;font-weight:700;border:1.5px solid ${(existing?.seccion||defaultSec)===s.key?'#7C3AED':'var(--border)'};background:${(existing?.seccion||defaultSec)===s.key?'rgba(124,58,237,0.15)':'var(--bg-input)'};color:${(existing?.seccion||defaultSec)===s.key?'#A78BFA':'var(--text-muted)'};cursor:pointer;">${s.label}</button>`).join('')}
        </div>

        <label style="display:flex;align-items:center;gap:10px;font-size:0.85rem;font-weight:700;margin-bottom:20px;cursor:pointer;">
          <input type="checkbox" id="item-ed-gym" ${existing?.gymOnly?'checked':''} style="width:18px;height:18px;accent-color:#7C3AED;">
          Solo en días de gym
        </label>

        <button id="item-ed-save" class="btn btn-primary btn-full">${isNew ? 'Agregar hábito' : 'Guardar cambios'}</button>
      </div>
    `;

    let selectedIcon = existing?.icon || '💧';
    let selectedSec  = existing?.seccion || defaultSec;

    Icons.init();
    document.getElementById('item-ed-close').onclick = () => overlay.classList.remove('active');

    overlay.querySelectorAll('.ic-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedIcon = btn.dataset.ic;
        overlay.querySelectorAll('.ic-btn').forEach(b => {
          b.style.borderColor = b.dataset.ic === selectedIcon ? '#7C3AED' : 'var(--border)';
          b.style.background  = b.dataset.ic === selectedIcon ? 'rgba(124,58,237,0.15)' : 'var(--bg-input)';
        });
      });
    });

    overlay.querySelectorAll('.sec-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedSec = btn.dataset.sec;
        overlay.querySelectorAll('.sec-btn').forEach(b => {
          b.style.borderColor = b.dataset.sec === selectedSec ? '#7C3AED' : 'var(--border)';
          b.style.background  = b.dataset.sec === selectedSec ? 'rgba(124,58,237,0.15)' : 'var(--bg-input)';
          b.style.color       = b.dataset.sec === selectedSec ? '#A78BFA' : 'var(--text-muted)';
        });
      });
    });

    document.getElementById('item-ed-save').addEventListener('click', () => {
      const label = document.getElementById('item-ed-label').value.trim();
      if (!label) { document.getElementById('item-ed-label').focus(); return; }
      const gymOnly = document.getElementById('item-ed-gym').checked;

      const all = getDailyItems();
      if (isNew) {
        all.push({ id: 'habit_' + Date.now(), label, icon: selectedIcon, seccion: selectedSec, gymOnly });
      } else {
        const idx = all.findIndex(i => i.id === itemId);
        if (idx >= 0) all[idx] = { ...all[idx], label, icon: selectedIcon, seccion: selectedSec, gymOnly };
      }
      saveDailyItems(all);
      overlay.classList.remove('active');
      this._renderChecklist();
      this._renderStats();
      showToast(isNew ? 'Hábito agregado' : 'Hábito actualizado');
    });
  },

  _toggleItem(id, el) {
    const dia = Storage.obtenerDia(this.fecha) || { fecha: this.fecha, checklist: {}, nota: '', cumplimiento: 0 };
    dia.checklist[id] = !dia.checklist[id];
    const items = getItemsForDate(this.fecha);
    const checked = items.filter(i => dia.checklist[i.id] === true).length;
    dia.cumplimiento = Math.round((checked / items.length) * 100);
    Storage.guardarDia(this.fecha, dia);
    el.classList.toggle('checked');
    const box = el.querySelector('.check-box');
    if (box) { box.classList.add('pulse'); setTimeout(() => box.classList.remove('pulse'), 400); }
    this._renderStats();
  },

  _renderNota() {
    const container = document.getElementById('nota-container');
    if (!container) return;
    const dia = Storage.obtenerDia(this.fecha);
    const nota = dia ? dia.nota || '' : '';
    container.innerHTML = `
      <div class="nota-card">
        <h3><i data-lucide="file-text" style="width:18px;height:18px;margin-right:6px;vertical-align:middle;"></i>Nota del día</h3>
        <textarea id="nota-textarea" class="nota-textarea" placeholder="¿Qué comiste hoy? ¿Cómo te sentiste?">${nota}</textarea>
        <div id="nota-guardada" class="nota-guardada">Guardada</div>
      </div>
    `;
    let timeout;
    document.getElementById('nota-textarea').addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => this._guardarNota(e.target.value), 500);
    });
  },

  _guardarNota(texto) {
    const dia = Storage.obtenerDia(this.fecha) || { fecha: this.fecha, checklist: {}, nota: '', cumplimiento: 0 };
    dia.nota = texto;
    Storage.guardarDia(this.fecha, dia);
    const el = document.getElementById('nota-guardada');
    if (el) { el.classList.add('visible'); setTimeout(() => el.classList.remove('visible'), 2000); }
  },

  _startOverlayCheck() {
    setInterval(() => this._checkOverlay(), 30000);
    this._checkOverlay();
  },

  _checkOverlay() {
    const now = new Date();
    if (now.getHours() < 21) return;
    const dia = Storage.obtenerDia(this.fecha);
    if (dia && (dia.nota || '').trim().length > 0) return;
    this._showOverlay();
  },

  _showOverlay() {
    if (this.overlayActive) return;
    this.overlayActive = true;
    const overlay = document.getElementById('nota-overlay');
    if (!overlay) return;
    overlay.classList.add('active');
    const btn = document.getElementById('overlay-guardar');
    if (btn) {
      btn.onclick = () => {
        const texto = document.getElementById('overlay-nota').value.trim();
        if (!texto) { document.getElementById('overlay-nota').style.borderColor = 'var(--danger)'; return; }
        this._guardarNota(texto);
        overlay.classList.remove('active');
        this.overlayActive = false;
        const mainNota = document.getElementById('nota-textarea');
        if (mainNota) mainNota.value = texto;
      };
    }
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && this.overlayActive) { e.preventDefault(); e.stopPropagation(); } });
  }
};

/* =========================================================
   Historial - Con edición de días anteriores
   ========================================================= */
const Historial = {
  init() {
    initDarkMode();
    this._render();
  },

  _render() {
    const container = document.getElementById('historial-container');
    if (!container) return;
    const dias = Storage.obtenerHistorial(30);
    const ITEM_LABELS = {};
    CHECKLIST_ITEMS.forEach(i => ITEM_LABELS[i.id] = i.label);

    if (dias.every(d => !d.data)) {
      container.innerHTML = `<div class="empty-state fade-in"><p>Aún no hay registros.<br>Completa tu primer checklist.</p></div>`;
      return;
    }

    container.innerHTML = '';
    dias.forEach((entry) => {
      const d = new Date(entry.fecha + 'T12:00:00');
      const esHoy = entry.fecha === Storage.today();

      if (!entry.data) {
        const el = document.createElement('div');
        el.className = 'historial-dia fade-in';
        el.innerHTML = `
          <div class="historial-header">
            <div class="historial-color gris"></div>
            <div class="historial-info">
              <div class="historial-fecha">${DIAS_SEMANA[d.getDay()]} ${d.getDate()} ${MESES[d.getMonth()]}</div>
              <div class="historial-pct">Sin registro</div>
            </div>
            ${!esHoy ? '<button class="hist-edit-btn">Editar</button>' : ''}
          </div>
        `;
        if (!esHoy) {
          el.querySelector('.hist-edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this._openEditOverlay(entry.fecha);
          });
        }
        container.appendChild(el);
        return;
      }

      const pct = entry.data.cumplimiento || 0;
      let colorClass = 'gris';
      if (pct >= 80) colorClass = 'verde';
      else if (pct >= 50) colorClass = 'amarillo';
      else if (pct > 0) colorClass = 'rojo';

      const el = document.createElement('div');
      el.className = 'historial-dia fade-in';

      let detalleHTML = '';
      if (entry.data.checklist) {
        for (const [key, val] of Object.entries(entry.data.checklist)) {
          detalleHTML += `<div class="detalle-item"><div class="detalle-check ${val ? 'si' : 'no'}">${val ? '✓' : '✗'}</div><span>${ITEM_LABELS[key] || key}</span></div>`;
        }
      }
      if (entry.data.nota) detalleHTML += `<div class="detalle-nota"><strong>Nota:</strong> ${entry.data.nota}</div>`;

      el.innerHTML = `
        <div class="historial-header">
          <div class="historial-color ${colorClass}"></div>
          <div class="historial-info">
            <div class="historial-fecha">${DIAS_SEMANA[d.getDay()]} ${d.getDate()} ${MESES[d.getMonth()]}</div>
            <div class="historial-pct">${pct}% completado</div>
          </div>
          ${!esHoy ? '<button class="hist-edit-btn">Editar</button>' : ''}
          <div class="historial-arrow">▼</div>
        </div>
        <div class="historial-detalle">${detalleHTML}</div>
      `;

      el.querySelector('.historial-header').addEventListener('click', (e) => {
        if (e.target.classList.contains('hist-edit-btn')) return;
        el.classList.toggle('open');
      });

      if (!esHoy) {
        el.querySelector('.hist-edit-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          this._openEditOverlay(entry.fecha);
        });
      }

      container.appendChild(el);
    });
  },

  /* ─── Edit overlay for past days ─── */
  _openEditOverlay(fecha) {
    const overlay = document.getElementById('edit-overlay');
    if (!overlay) return;
    overlay.classList.add('active');

    const d = new Date(fecha + 'T12:00:00');
    const items = getItemsForDate(fecha);
    const dia = Storage.obtenerDia(fecha) || { fecha, checklist: {}, nota: '', cumplimiento: 0 };

    let checklistHTML = '';
    items.forEach(item => {
      const isChecked = dia.checklist[item.id] === true;
      checklistHTML += `
        <div class="check-item${isChecked ? ' checked' : ''}" data-id="${item.id}">
          <div class="check-box"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div class="check-icon"><i data-lucide="${item.icon}" style="width:22px;height:22px;"></i></div>
          <div class="check-content"><div class="check-label">${item.label}</div></div>
        </div>
      `;
    });

    overlay.innerHTML = `
      <div class="overlay-content" style="max-width:500px;max-height:90vh;overflow-y:auto;text-align:left;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h2 style="font-size:1.1rem;"><i data-lucide="calendar" style="width:18px;height:18px;vertical-align:middle;margin-right:6px;"></i>${DIAS_SEMANA[d.getDay()]} ${d.getDate()} ${MESES[d.getMonth()]}</h2>
          <button id="edit-close" style="background:none;border:none;color:var(--text-muted);cursor:pointer;display:flex;align-items:center;"><i data-lucide="x" style="width:22px;height:22px;"></i></button>
        </div>
        <div class="checklist-card" id="edit-checklist">${checklistHTML}</div>
        <div style="margin-top:16px;">
          <label style="font-size:0.85rem;font-weight:600;color:var(--text-secondary);display:block;margin-bottom:6px;">Nota del día</label>
          <textarea id="edit-nota" class="nota-textarea" placeholder="¿Cómo fue tu día?">${dia.nota || ''}</textarea>
        </div>
        <button id="edit-save" class="btn btn-primary btn-full" style="margin-top:16px;">Guardar cambios</button>
      </div>
    `;

    overlay.querySelectorAll('.check-item').forEach(el => {
      el.addEventListener('click', () => el.classList.toggle('checked'));
    });
    if (window.lucide) lucide.createIcons();

    // Close
    document.getElementById('edit-close').addEventListener('click', () => overlay.classList.remove('active'));

    // Save
    document.getElementById('edit-save').addEventListener('click', () => {
      const checklist = {};
      overlay.querySelectorAll('.check-item').forEach(el => {
        checklist[el.dataset.id] = el.classList.contains('checked');
      });
      const nota = document.getElementById('edit-nota').value;
      const total = items.length;
      const checked = Object.values(checklist).filter(v => v).length;
      const cumplimiento = Math.round((checked / total) * 100);

      Storage.guardarDia(fecha, { fecha, checklist, nota, cumplimiento });
      overlay.classList.remove('active');
      showToast('Día actualizado');
      this._render();
    });
  }
};

/* =========================================================
   Config
   ========================================================= */
const Config = {
  init() {
    initDarkMode();
    this._render();
  },

  _render() {
    const container = document.getElementById('config-container');
    if (!container) return;
    const config = Storage.obtenerConfig();
    const DIAS_LABELS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    let diasHTML = '';
    for (let i = 0; i < 7; i++) {
      const checked = config.diasGym.includes(i) ? 'checked' : '';
      diasHTML += `<input type="checkbox" class="dia-checkbox" id="dia-${i}" value="${i}" ${checked}><label for="dia-${i}" class="dia-label">${DIAS_LABELS[i]}</label>`;
    }

    container.innerHTML = `
      <div class="config-section fade-in">
        <div class="config-card">
          <h3 style="display:flex;align-items:center;gap:8px;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Datos personales
          </h3>
          <div class="config-row"><label for="cfg-nombre">Nombre</label><input type="text" id="cfg-nombre" value="${config.nombre}"></div>
          <div class="config-row"><label for="cfg-peso-inicial">Peso inicial (kg)</label><input type="number" id="cfg-peso-inicial" value="${config.pesoInicial}" step="0.1"></div>
          <div class="config-row"><label for="cfg-meta">Meta de peso (kg)</label><input type="number" id="cfg-meta" value="${config.meta}" step="0.1"></div>
          <div class="config-row"><label for="cfg-hito">Hito motivador (kg)</label><input type="number" id="cfg-hito" value="${config.hito}" step="0.1"></div>
          <div class="config-row"><label for="cfg-meta-cal">Meta calórica diaria (kcal)</label><input type="number" id="cfg-meta-cal" value="${config.metaCal || 2200}" step="50"></div>
        </div>
      </div>

      <div class="config-section fade-in">
        <div class="config-card">
          <h3 style="display:flex;align-items:center;gap:8px;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Horarios
          </h3>
          <div class="config-row"><label for="cfg-hora-gym">Hora de inicio del gym</label><input type="time" id="cfg-hora-gym" value="${config.horaGym}"></div>
          <div class="config-row"><label for="cfg-hora-cena">Hora de cena</label><input type="time" id="cfg-hora-cena" value="${config.horaCena}"></div>
          <div class="config-row"><label>Días de gym</label><div class="dias-gym-grid">${diasHTML}</div></div>
        </div>
      </div>

      <div class="config-section fade-in">
        <button id="btn-guardar-config" class="btn btn-primary btn-full">Guardar configuración</button>
      </div>

      <div class="config-section fade-in">
        <div class="config-card">
          <h3 style="display:flex;align-items:center;gap:8px;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            Notificaciones
          </h3>
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px;">Prueba que las notificaciones funcionan en tu dispositivo.</p>
          <button id="btn-test-notif" class="btn btn-secondary btn-full">Enviar notificación de prueba</button>
        </div>
      </div>

      <div class="config-section fade-in">
        <div class="config-card">
          <h3 style="display:flex;align-items:center;gap:8px;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Datos
          </h3>
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px;">Exporta tus datos como respaldo o importa uno anterior.</p>
          <div class="backup-actions">
            <button id="btn-exportar" class="btn btn-secondary" style="flex:1;">Exportar</button>
            <button id="btn-importar" class="btn btn-secondary" style="flex:1;">Importar</button>
          </div>
          <input type="file" id="import-file" accept=".json" style="display:none;">
        </div>
      </div>

      <div class="config-section fade-in">
        <div class="config-card">
          <h3 style="display:flex;align-items:center;gap:8px;">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>
            Sincronización
          </h3>
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:12px;">Usa el mismo correo de Google para tener tus datos en cualquier dispositivo.</p>
          <div id="sync-status" style="font-size:0.8rem;color:var(--text-muted);margin-bottom:12px;"></div>
          <div style="display:flex;gap:8px;">
            <button id="btn-sync-up" class="btn btn-secondary" style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
              Subir datos
            </button>
            <button id="btn-sync-down" class="btn btn-secondary" style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="8 17 12 21 16 17"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></svg>
              Descargar
            </button>
          </div>
        </div>
      </div>
    `;

    // Save config
    document.getElementById('btn-guardar-config').addEventListener('click', () => {
      const diasGym = [];
      for (let i = 0; i < 7; i++) { if (document.getElementById(`dia-${i}`).checked) diasGym.push(i); }
      Storage.guardarConfig({
        nombre: document.getElementById('cfg-nombre').value,
        pesoInicial: parseFloat(document.getElementById('cfg-peso-inicial').value),
        meta: parseFloat(document.getElementById('cfg-meta').value),
        hito: parseFloat(document.getElementById('cfg-hito').value),
        metaCal: parseInt(document.getElementById('cfg-meta-cal').value) || 2200,
        horaGym: document.getElementById('cfg-hora-gym').value,
        horaCena: document.getElementById('cfg-hora-cena').value,
        diasGym
      });
      showToast('Configuración guardada');
    });

    // Test notification
    document.getElementById('btn-test-notif').addEventListener('click', () => Notificaciones.test());

    // Export
    document.getElementById('btn-exportar').addEventListener('click', () => {
      const blob = new Blob([Storage.exportarDatos()], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `fitpulse_backup_${Storage.today()}.json`;
      a.click();
    });

    // Import
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

    // Cloud Sync buttons
    const syncStatus = document.getElementById('sync-status');
    const user = typeof Auth !== 'undefined' ? Auth.getUser() : null;
    if (syncStatus) {
      const connected = !!user?.email;
      const SVG_CHECK = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#30D158" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
      const SVG_WARN  = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#FFD60A" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
      syncStatus.innerHTML = connected
        ? `<span style="display:flex;align-items:center;gap:5px;">${SVG_CHECK} Conectado como ${user.email}</span>`
        : `<span style="display:flex;align-items:center;gap:5px;">${SVG_WARN} Sin sesión — inicia sesión con Google para sincronizar</span>`;
    }
    document.getElementById('btn-sync-up')?.addEventListener('click', async () => {
      if (!user) { showToast('Inicia sesión con Google primero', 'warning'); return; }
      showToast('Subiendo datos...');
      await CloudSync.pushToCloud();
      showToast('✅ Datos subidos a la nube');
    });
    document.getElementById('btn-sync-down')?.addEventListener('click', async () => {
      if (!user) { showToast('Inicia sesión con Google primero', 'warning'); return; }
      showToast('Descargando desde la nube...');
      await CloudSync.forceDownload();
    });
  }
};

/* =========================================================
   Progreso
   ========================================================= */
const Progreso = {
  init() {
    initDarkMode();
    Charts.init();
  }
};
