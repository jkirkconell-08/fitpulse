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

/* =========================================================
   Puente Comidas <-> Hábitos del día
   Un hábito como "Desayuno completo" se detecta por palabras clave en su
   etiqueta (funciona con los hábitos por defecto y con los que el usuario
   renombró/creó), y queda enlazado al tipo de comida de Comidas.js.
   ========================================================= */
const MEAL_TYPE_LABELS = { desayuno: 'el desayuno', almuerzo: 'el almuerzo', cena: 'la cena', merienda_am: 'la merienda de la mañana', merienda_pm: 'la merienda de la tarde' };

function _normalizarTexto(txt) {
  return (txt || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function mealTypeForHabitItem(item) {
  if (!item || !item.label) return null;
  const label = _normalizarTexto(item.label);
  if (label.includes('desayuno')) return 'desayuno';
  if (label.includes('almuerzo')) return 'almuerzo';
  if (label.includes('cena')) return 'cena';
  if (label.includes('merienda')) {
    if (label.includes('tarde') || /\bpm\b/.test(label)) return 'merienda_pm';
    if (label.includes('manana') || /\bam\b/.test(label)) return 'merienda_am';
    return item.seccion === 'tarde' ? 'merienda_pm' : 'merienda_am';
  }
  return null;
}

function habitItemForMealType(fecha, tipo) {
  return getItemsForDate(fecha).find(i => mealTypeForHabitItem(i) === tipo) || null;
}

function isWaterGoalHabitItem(item) {
  if (!item || !item.label) return false;
  return item.id === 'agua_2L' || _normalizarTexto(item.label).includes('litro');
}

function _marcarHabito(fecha, item) {
  const dia = Storage.obtenerDia(fecha) || { fecha, checklist: {}, nota: '', cumplimiento: 0 };
  if (dia.checklist[item.id] === true) return false;
  dia.checklist[item.id] = true;
  const items = getItemsForDate(fecha);
  const checked = items.filter(i => dia.checklist[i.id] === true).length;
  dia.cumplimiento = Math.round((checked / items.length) * 100);
  Storage.guardarDia(fecha, dia);
  return true;
}

/* Llamada desde Comidas.js al guardar alimentos: marca el hábito de esa comida si existe */
function markMealHabitDone(fecha, tipo) {
  const item = habitItemForMealType(fecha, tipo);
  if (!item) return null;
  return _marcarHabito(fecha, item) ? item : null;
}

/* Llamada desde el widget de agua al llegar a la meta de vasos */
function markWaterHabitDone(fecha) {
  const item = getItemsForDate(fecha).find(isWaterGoalHabitItem);
  if (!item) return null;
  return _marcarHabito(fecha, item) ? item : null;
}


const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const DIAS_CORTO  = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

/* ─── Demo Mode ─── */
const DemoData = {
  isDemo() { return localStorage.getItem('fitpulse_demo') === 'true'; },

  load() {
    if (!this.isDemo()) return;
    // Only inject if no real data exists
    if (localStorage.getItem('fitpulse_config')) return;

    const today = Storage.today();
    const peso = (65 + Math.random() * 30).toFixed(1);

    Storage.guardarConfig({
      nombre: 'Atleta',
      pesoInicial: parseFloat(peso),
      meta: parseFloat(peso) - 10,
      hito: Math.ceil(parseFloat(peso) / 10) * 10,
      metaCal: 2200,
      horaGym: '06:00',
      horaCena: '19:00',
      diasGym: [1, 3, 5],
      unidades: { peso: 'kg', altura: 'cm', ejercicio: 'lbs' }
    });

    // Fake week of check-ins
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const f = d.toISOString().split('T')[0];
      const pct = 60 + Math.floor(Math.random() * 40);
      const items = getDailyItems();
      const checked = items.filter(() => Math.random() < pct / 100).map(it => it.id);
      const checklist = {};
      checked.forEach(id => checklist[id] = true);
      Storage.guardarDia(f, { fecha: f, checklist, nota: '', cumplimiento: pct });
      Storage.guardarAgua(f, { vasos: Math.floor(4 + Math.random() * 5), meta: 8 });
      Storage.guardarPeso(f, parseFloat((parseFloat(peso) - i * 0.15).toFixed(1)));
    }

    // Fake today's meals
    Storage.guardarComidas(today, {
      comidas: [
        { nombre: 'Huevos revueltos', cal: 220, prot: 18, carbs: 2, grasas: 15, cantidad: 1, tipo: 'desayuno' },
        { nombre: 'Pan integral', cal: 140, prot: 5, carbs: 28, grasas: 2, cantidad: 2, tipo: 'desayuno' },
        { nombre: 'Pollo a la plancha', cal: 165, prot: 31, carbs: 0, grasas: 4, cantidad: 1, tipo: 'almuerzo' },
        { nombre: 'Arroz blanco', cal: 206, prot: 4, carbs: 45, grasas: 0, cantidad: 1, tipo: 'almuerzo' }
      ]
    });
  },

  showBanner() {
    if (!this.isDemo()) return;
    const existing = document.getElementById('demo-banner');
    if (existing) return;
    const banner = document.createElement('div');
    banner.id = 'demo-banner';
    banner.innerHTML = `
      <div style="background:linear-gradient(135deg,rgba(124,58,237,0.15),rgba(71,118,230,0.15));border:1px solid rgba(124,58,237,0.3);border-radius:14px;padding:14px 16px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;gap:12px;">
        <div>
          <div style="font-size:0.85rem;font-weight:700;color:#A78BFA;margin-bottom:2px;">Modo exploración</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">Datos de ejemplo — no puedes modificarlos</div>
        </div>
        <a href="login.html" style="background:#7C3AED;color:#fff;font-size:0.8rem;font-weight:700;padding:8px 14px;border-radius:10px;text-decoration:none;white-space:nowrap;flex-shrink:0;">Crear cuenta</a>
      </div>`;
    const container = document.querySelector('.container') || document.body;
    const firstChild = container.querySelector('h1, .page-title, .dash-greeting');
    if (firstChild) container.insertBefore(banner, firstChild);
    else container.prepend(banner);
  }
};

/* ─── Offline → Cloud upgrade helper ─── */
function showLinkAccountBanner() {
  const isOffline = localStorage.getItem('fitpulse_offline') === 'true';
  const isDemo    = localStorage.getItem('fitpulse_demo')    === 'true';
  const hasUser   = !!localStorage.getItem('fitpulse_user');
  if (!isOffline || hasUser || isDemo) return;
  const existing = document.getElementById('link-account-banner');
  if (existing) return;
  const banner = document.createElement('div');
  banner.id = 'link-account-banner';
  banner.innerHTML = `
    <div style="background:rgba(48,209,88,0.08);border:1px solid rgba(48,209,88,0.25);border-radius:14px;padding:14px 16px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;gap:12px;">
      <div>
        <div style="font-size:0.85rem;font-weight:700;color:#30D158;margin-bottom:2px;">Sin cuenta activa</div>
        <div style="font-size:0.75rem;color:var(--text-muted);">Inicia sesión para guardar tus datos en la nube</div>
      </div>
      <a href="login.html" style="background:#30D158;color:#000;font-size:0.8rem;font-weight:700;padding:8px 14px;border-radius:10px;text-decoration:none;white-space:nowrap;flex-shrink:0;">Sincronizar</a>
    </div>`;
  const container = document.querySelector('.container') || document.body;
  const firstChild = container.querySelector('h1, .page-title, .dash-greeting');
  if (firstChild) container.insertBefore(banner, firstChild);
  else container.prepend(banner);
}

/* ─── Tabs: router local basado en location.hash, usado por ejercicios.html y progreso.html ─── */
const Tabs = {
  init(pillsSelector, panesPrefix, defaultTab, onShow) {
    const pills = document.querySelectorAll(pillsSelector);
    const show = (id) => {
      pills.forEach(p => p.classList.toggle('active', p.dataset.tab === id));
      document.querySelectorAll(`[id^="${panesPrefix}"]`).forEach(pane => {
        pane.classList.toggle('active', pane.id === panesPrefix + id);
      });
      if (onShow) onShow(id);
    };
    pills.forEach(p => {
      p.addEventListener('click', () => { location.hash = '#' + p.dataset.tab; show(p.dataset.tab); });
    });
    const raw = (location.hash || '').replace('#', '').split('?')[0];
    const initial = [...pills].some(p => p.dataset.tab === raw) ? raw : defaultTab;
    show(initial);
  }
};

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
  cierreDismissed: false,

  init() {
    this.fecha = Storage.today();
    this.config = Storage.obtenerConfig();
    this._renderFecha();
    this._renderHeroRing();
    this._renderTodayWorkout();
    this._renderWater();
    this._renderChecklist();
    this._renderNota();
    this._startCierreCheck();
    Notificaciones.init();
  },

  _renderFecha() {
    const el = document.getElementById('fecha-display');
    if (!el) return;
    const d = new Date();
    const nombre = (this.config && this.config.nombre) || 'Atleta';
    el.innerHTML = `
      <div>
        <div class="font-mono" style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--text-muted);">${DIAS_SEMANA[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()].toLowerCase()}</div>
        <div class="font-display" style="font-size:32px;line-height:1.05;margin-top:2px;">Hola, ${nombre}</div>
      </div>
    `;
  },

  _renderHeroRing() {
    const el = document.getElementById('hero-ring-container');
    if (!el) return;
    const dia = Storage.obtenerDia(this.fecha);
    const items = getItemsForDate(this.fecha);
    const checked = dia ? Object.values(dia.checklist || {}).filter(v => v === true).length : 0;
    const habitPct = items.length ? Math.round((checked / items.length) * 100) : 0;

    const comidas = Storage.obtenerComidas(this.fecha);
    const kcal = Math.round((comidas.comidas || []).reduce((s, c) => s + (c.cal * (c.cantidad || 1)), 0));
    const metaCal = this.config.metaCal || 2200;
    const kcalPct = Math.min(100, Math.round((kcal / metaCal) * 100));

    const agua = Storage.obtenerAgua(this.fecha);
    const aguaPct = Math.min(100, Math.round((agua.vasos / agua.meta) * 100));

    const overallPct = Math.round((habitPct + kcalPct + aguaPct) / 3);
    const racha = Storage.calcularRacha();

    const R1 = 68, R2 = 54, R3 = 42;
    const C1 = 2 * Math.PI * R1, C2 = 2 * Math.PI * R2, C3 = 2 * Math.PI * R3;
    const off = (c, pct) => c - (c * Math.min(pct, 100) / 100);

    el.innerHTML = `
      <div style="display:flex;align-items:center;gap:20px;">
        <div class="hero-ring-wrap">
          <svg viewBox="0 0 146 146">
            <circle cx="73" cy="73" r="${R1}" fill="none" stroke="var(--border)" stroke-width="10"></circle>
            <circle cx="73" cy="73" r="${R1}" fill="none" stroke="var(--lime)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${C1}" stroke-dashoffset="${off(C1, habitPct)}" style="animation:fp-ring 1.1s cubic-bezier(.22,1,.36,1) both"></circle>
            <circle cx="73" cy="73" r="${R2}" fill="none" stroke="var(--border)" stroke-width="8"></circle>
            <circle cx="73" cy="73" r="${R2}" fill="none" stroke="var(--brand-light)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C2}" stroke-dashoffset="${off(C2, kcalPct)}" style="animation:fp-ring 1.3s cubic-bezier(.22,1,.36,1) both"></circle>
            <circle cx="73" cy="73" r="${R3}" fill="none" stroke="var(--border)" stroke-width="7"></circle>
            <circle cx="73" cy="73" r="${R3}" fill="none" stroke="var(--cyan)" stroke-width="7" stroke-linecap="round" stroke-dasharray="${C3}" stroke-dashoffset="${off(C3, aguaPct)}" style="animation:fp-ring2 1.5s cubic-bezier(.22,1,.36,1) both"></circle>
          </svg>
          <div class="hero-ring-center">
            <span class="hero-ring-pct">${overallPct}<span>%</span></span>
            <span class="hero-ring-sub">DEL DÍA</span>
          </div>
        </div>
        <div class="hero-legend">
          <div class="hero-legend-row"><span class="hero-legend-dot" style="background:var(--lime);"></span><div><div class="hero-legend-label font-mono">HÁBITOS</div><div class="hero-legend-val">${checked} / ${items.length}</div></div></div>
          <div class="hero-legend-row"><span class="hero-legend-dot" style="background:var(--brand-light);"></span><div><div class="hero-legend-label font-mono">KCAL</div><div class="hero-legend-val">${kcal}</div></div></div>
          <div class="hero-legend-row"><span class="hero-legend-dot" style="background:var(--cyan);"></span><div><div class="hero-legend-label font-mono">AGUA</div><div class="hero-legend-val">${agua.vasos} / ${agua.meta}</div></div></div>
        </div>
      </div>
      ${racha > 0 ? `
      <div class="hero-streak-row">
        <span class="hero-streak-dot"></span>
        <span class="hero-streak-label">RACHA ${racha} DÍA${racha > 1 ? 'S' : ''}</span>
      </div>` : ''}
    `;
  },

  _renderTodayWorkout() {
    const el = document.getElementById('today-workout-container');
    if (!el) return;
    if (typeof Routines === 'undefined') { el.innerHTML = ''; return; }
    const todayEntry = typeof Routines.getTodayEntry === 'function' ? Routines.getTodayEntry() : (Routines.getTodayRoutine() ? { type: 'routine', item: Routines.getTodayRoutine() } : null);
    if (!todayEntry) {
      el.innerHTML = `
        <div class="hero-card" style="background:var(--bg-card);border-color:var(--border);text-align:center;">
          <div style="width:48px;height:48px;border-radius:14px;background:var(--lime-soft);color:var(--lime);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;">
            <i data-lucide="dumbbell" style="width:24px;height:24px;"></i>
          </div>
          <div class="font-display" style="font-size:22px;line-height:1.1;margin-bottom:6px;">Aún no tienes rutinas</div>
          <div style="font-size:13px;color:var(--text-muted);margin-bottom:18px;">Crea una rutina de gym (por ejemplo, de 3 o 4 días) y aquí verás la de hoy.</div>
          <a href="ejercicios.html#fuerza?new=1" class="btn-lime" style="width:100%;height:52px;border-radius:16px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:8px;font-size:16px;">
            <i data-lucide="plus" style="width:18px;height:18px;"></i>Crear rutina
          </a>
        </div>
      `;
      Icons.init(el);
      return;
    }
    let nombre, ejercicios, vol;
    if (todayEntry.type === 'group') {
      const group = todayEntry.item;
      const members = (group.routineIds || []).map(id => Routines.getById(id)).filter(Boolean);
      nombre = group.name || members.map(r => r.name).join(' + ');
      ejercicios = members.reduce((s, r) => s + (r.exercises || []).length, 0);
      vol = members.reduce((s, r) => { const l = Routines.getLastSession ? Routines.getLastSession(r.id) : null; return s + (l ? Routines.calcVolume(l) : 0); }, 0);
    } else {
      const rutinaHoy = todayEntry.item;
      const last = Routines.getLastSession ? Routines.getLastSession(rutinaHoy.id) : null;
      nombre = rutinaHoy.name;
      ejercicios = (rutinaHoy.exercises || []).length;
      vol = last ? Routines.calcVolume(last) : 0;
    }
    el.innerHTML = `
      <div class="hero-card" style="background:var(--bg-card);border-color:var(--border);">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          <span class="font-mono" style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--text-muted);">Toca hoy${todayEntry.type === 'group' ? ' · grupo' : ''}</span>
        </div>
        <div class="font-display" style="font-size:30px;line-height:1.05;margin-bottom:6px;">${nombre}</div>
        <div class="font-mono" style="font-size:12px;color:var(--text-muted);margin-bottom:16px;">${ejercicios} ejercicios${vol ? ` · último ${Routines._fmtVol(vol)}` : ''}</div>
        <a href="ejercicios.html#fuerza" class="btn-lime glow" style="width:100%;height:56px;border-radius:16px;text-decoration:none;display:flex;align-items:center;justify-content:center;gap:10px;">
          <i data-lucide="play" style="width:19px;height:19px"></i>Empezar
        </a>
      </div>
    `;
    Icons.init(el);
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
      const data = Storage.agregarVasoAgua(this.fecha);
      if (data.vasos >= data.meta && markWaterHabitDone(this.fecha) && typeof this._renderChecklist === 'function') {
        this._renderChecklist();
        if (typeof showToast === 'function') showToast('¡Meta de agua cumplida! Hábito marcado');
      }
      this._renderWater();
      this._renderHeroRing();
    });
    document.getElementById('water-minus').addEventListener('click', () => {
      Storage.quitarVasoAgua(this.fecha);
      this._renderWater();
      this._renderHeroRing();
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
              this._renderHeroRing();
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

    let selectedIcon = existing?.icon || 'droplets';
    let selectedSec  = existing?.seccion || defaultSec;

    Icons.init(overlay);
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
      this._renderHeroRing();
      showToast(isNew ? 'Hábito agregado' : 'Hábito actualizado');
    });
  },

  _toggleItem(id, el) {
    const dia = Storage.obtenerDia(this.fecha) || { fecha: this.fecha, checklist: {}, nota: '', cumplimiento: 0 };
    const turningOn = !dia.checklist[id];

    // Un habito de comida (desayuno/almuerzo/cena/merienda) no se puede marcar
    // a mano sin haber registrado antes que comiste eso — evita marcar en
    // falso y manda a Comidas con esa franja horaria ya preseleccionada.
    if (turningOn) {
      const item = getItemsForDate(this.fecha).find(i => i.id === id);
      const tipo = mealTypeForHabitItem(item);
      if (tipo) {
        const registro = Storage.obtenerComidas(this.fecha);
        const yaRegistrado = (registro.comidas || []).some(c => c.tipo === tipo);
        if (!yaRegistrado) {
          if (typeof showToast === 'function') showToast(`Primero registra ${MEAL_TYPE_LABELS[tipo] || 'esa comida'} en Comidas`, 'warning');
          setTimeout(() => { location.href = `comidas.html?openSearch=1&tipo=${tipo}`; }, 900);
          return;
        }
      }
    }

    dia.checklist[id] = turningOn;
    const items = getItemsForDate(this.fecha);
    const checked = items.filter(i => dia.checklist[i.id] === true).length;
    dia.cumplimiento = Math.round((checked / items.length) * 100);
    Storage.guardarDia(this.fecha, dia);
    el.classList.toggle('checked');
    const box = el.querySelector('.check-box');
    if (box) { box.classList.add('pulse'); setTimeout(() => box.classList.remove('pulse'), 400); }
    this._renderHeroRing();
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

  _startCierreCheck() {
    this._checkCierre();
    setInterval(() => this._checkCierre(), 5 * 60000);
  },

  _checkCierre() {
    if (this.cierreDismissed) return;
    const now = new Date();
    if (now.getHours() < 21) return;
    const dia = Storage.obtenerDia(this.fecha);
    if (dia && (dia.nota || '').trim().length > 0 && dia.mood) return;
    this._showCierreSheet();
  },

  _showCierreSheet() {
    const backdrop = document.getElementById('cierre-backdrop');
    if (!backdrop) return;
    backdrop.classList.add('active');

    const dia = Storage.obtenerDia(this.fecha) || { fecha: this.fecha, checklist: {}, nota: '', cumplimiento: 0 };
    const items = getItemsForDate(this.fecha);
    const checked = Object.values(dia.checklist || {}).filter(v => v === true).length;
    const entrenoHecho = dia.checklist && dia.checklist.gym === true;
    let mood = dia.mood || null;

    backdrop.innerHTML = `
      <div class="bottom-sheet active" id="cierre-sheet" onclick="event.stopPropagation()">
        <div class="sheet-handle"></div>
        <h2 style="font-size:22px;margin-bottom:4px;">Cierre del día</h2>
        <p style="color:var(--text-secondary);font-size:14px;margin-bottom:16px;">Completaste ${checked}/${items.length} hábitos${entrenoHecho ? ' y entrenaste' : ''}.</p>
        <div class="mood-chips" id="mood-chips">
          <div class="mood-chip" data-mood="flojo">😴<span class="mood-label">FLOJO</span></div>
          <div class="mood-chip" data-mood="bien">🙂<span class="mood-label">BIEN</span></div>
          <div class="mood-chip" data-mood="fuerte">💪<span class="mood-label">FUERTE</span></div>
        </div>
        <textarea id="cierre-nota" class="nota-textarea" placeholder="¿Algo que anotar? (opcional)">${dia.nota || ''}</textarea>
        <div style="display:flex;gap:10px;margin-top:16px;">
          <button id="cierre-luego" class="btn btn-secondary" style="flex:1;">Luego</button>
          <button id="cierre-guardar" class="btn-lime" style="flex:2;height:52px;border-radius:14px;border:none;cursor:pointer;">Guardar y cerrar</button>
        </div>
      </div>
    `;
    backdrop.onclick = () => { this.cierreDismissed = true; backdrop.classList.remove('active'); };
    backdrop.querySelectorAll('.mood-chip').forEach(chip => {
      if (chip.dataset.mood === mood) chip.classList.add('selected');
      chip.addEventListener('click', () => {
        backdrop.querySelectorAll('.mood-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        mood = chip.dataset.mood;
      });
    });
    document.getElementById('cierre-luego').addEventListener('click', () => {
      this.cierreDismissed = true;
      backdrop.classList.remove('active');
    });
    document.getElementById('cierre-guardar').addEventListener('click', () => {
      const texto = document.getElementById('cierre-nota').value.trim();
      const d = Storage.obtenerDia(this.fecha) || { fecha: this.fecha, checklist: {}, nota: '', cumplimiento: 0 };
      d.nota = texto;
      d.mood = mood;
      Storage.guardarDia(this.fecha, d);
      this.cierreDismissed = true;
      backdrop.classList.remove('active');
      const mainNota = document.getElementById('nota-textarea');
      if (mainNota) mainNota.value = texto;
      showToast('Día cerrado');
    });
  }
};

/* =========================================================
   Historial - Con edición de días anteriores
   ========================================================= */
const Historial = {
  init() {
    this._showSkeleton();
    // Defer actual render so skeleton paints first
    requestAnimationFrame(() => setTimeout(() => this._render(), 16));
  },

  _showSkeleton() {
    const container = document.getElementById('historial-container');
    if (!container) return;
    const skeletonItem = `
      <div style="background:var(--bg-card);border-radius:14px;padding:16px;margin-bottom:10px;display:flex;align-items:center;gap:12px;animation:pulse 1.5s ease-in-out infinite;">
        <div style="width:12px;height:12px;border-radius:50%;background:var(--bg-input);flex-shrink:0;"></div>
        <div style="flex:1;">
          <div style="height:12px;background:var(--bg-input);border-radius:6px;width:40%;margin-bottom:6px;"></div>
          <div style="height:10px;background:var(--bg-input);border-radius:6px;width:60%;"></div>
        </div>
        <div style="width:32px;height:32px;background:var(--bg-input);border-radius:8px;"></div>
      </div>`;
    container.innerHTML = skeletonItem.repeat(7);
  },

  _render() {
    const container = document.getElementById('historial-container');
    if (!container) return;
    const dias = Storage.obtenerHistorial(30);
    const ITEM_LABELS = {};
    getDailyItems().forEach(i => ITEM_LABELS[i.id] = i.label);

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

