/* =========================================================
   FitPulse - Rutinas Personalizadas
   CRUD completo: crear, editar, eliminar rutinas
   + Sesión de gym paso a paso con timer de descanso
   ========================================================= */

const DEFAULT_ROUTINES = [
  {
    id: 'default_push', name: 'Push Day', icon: 'dumbbell',
    gradient: 'cat-coral', dias: [1, 3, 5],
    exercises: [
      { name: 'Press de Banca', sets: 4, reps: '8-10', rest: 90 },
      { name: 'Press Inclinado', sets: 3, reps: '10-12', rest: 75 },
      { name: 'Fondos en Paralelas', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Press Militar', sets: 4, reps: '8-10', rest: 90 },
      { name: 'Elevaciones Laterales', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Triceps con Polea', sets: 3, reps: '12-15', rest: 60 }
    ]
  },
  {
    id: 'default_pull', name: 'Pull Day', icon: 'arrow-left-right',
    gradient: 'cat-teal', dias: [2, 4, 6],
    exercises: [
      { name: 'Dominadas', sets: 4, reps: '6-8', rest: 90 },
      { name: 'Remo con Barra', sets: 4, reps: '8-10', rest: 90 },
      { name: 'Remo en Polea', sets: 3, reps: '10-12', rest: 75 },
      { name: 'Curl de Bíceps', sets: 3, reps: '10-12', rest: 60 },
      { name: 'Martillo', sets: 3, reps: '12-15', rest: 60 }
    ]
  },
  {
    id: 'default_legs', name: 'Leg Day', icon: 'activity',
    gradient: 'cat-blue', dias: [3, 6],
    exercises: [
      { name: 'Sentadillas', sets: 5, reps: '5-8', rest: 120 },
      { name: 'Prensa de Pierna', sets: 4, reps: '10-12', rest: 90 },
      { name: 'Extensiones de Cuádriceps', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Curl de Femoral', sets: 3, reps: '12-15', rest: 60 },
      { name: 'Elevaciones de Pantorrilla', sets: 4, reps: '15-20', rest: 45 }
    ]
  }
];

const Routines = {
  STORAGE_KEY: 'fitpulse_routines',

  /* ---- CRUD ---- */

  getAll() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw !== null) {
      // Key exists — return stored value even if empty array
      try { return JSON.parse(raw); } catch {}
    }
    // Key never set → first time ever, load defaults
    return this._initDefaults();
  },

  _initDefaults() {
    const ts = Date.now();
    const defaults = DEFAULT_ROUTINES.map((r, i) => ({
      ...r,
      id: `routine_${ts}_${i}`,
      dias: [] // no longer used - sessions track date automatically
    }));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(defaults));
    return JSON.parse(JSON.stringify(defaults));
  },

  /* ---- Session History ---- */
  SESSION_KEY: 'fitpulse_gym_sessions',

  getSessions(routineId) {
    try {
      const all = JSON.parse(localStorage.getItem(this.SESSION_KEY) || '[]');
      return routineId ? all.filter(s => s.routineId === routineId) : all;
    } catch { return []; }
  },

  saveSession(sessionData) {
    try {
      const all = JSON.parse(localStorage.getItem(this.SESSION_KEY) || '[]');
      all.unshift(sessionData); // newest first
      // Keep max 100 sessions
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(all.slice(0, 100)));
    } catch {}
  },

  getLastSession(routineId) {
    return this.getSessions(routineId)[0] || null;
  },

  calcVolume(session) {
    // Total kg lifted = sum of (peso * reps) per set
    if (!session?.exercises) return 0;
    return session.exercises.reduce((total, ex) =>
      total + (ex.sets || []).reduce((s, set) =>
        s + ((set.weightDone || set.peso || 0) * (set.repsDone || set.reps || 0)), 0
      ), 0
    );
  },

  getById(id) {
    return this.getAll().find(r => r.id === id) || null;
  },

  /* Rutina "de hoy": respeta días asignados manualmente; si ninguna rutina
     tiene días configurados, rota a la que lleva más tiempo sin hacerse. */
  getTodayRoutine() {
    const all = this.getAll();
    if (all.length === 0) return null;
    const weekday = new Date().getDay();
    const byDay = all.find(r => (r.dias || []).includes(weekday));
    if (byDay) return byDay;
    const withLast = all.map(r => {
      const last = this.getLastSession(r.id);
      const ts = last ? (last.endedAt || last.startedAt || 0) : 0;
      return { r, ts };
    });
    withLast.sort((a, b) => a.ts - b.ts);
    return withLast[0].r;
  },

  save(routine) {
    const all = this.getAll();
    const idx = all.findIndex(r => r.id === routine.id);
    if (idx >= 0) all[idx] = routine;
    else all.push(routine);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
    if (typeof Storage !== 'undefined' && Storage._syncToCloud) Storage._syncToCloud();
    return routine;
  },

  create(data) {
    const routine = {
      id: 'routine_' + Date.now(),
      name: data.name || 'Nueva Rutina',
      icon: data.icon || 'dumbbell',
      gradient: data.gradient || 'cat-blue',
      dias: data.dias || [],
      exercises: data.exercises || []
    };
    return this.save(routine);
  },

  update(id, changes) {
    const routine = this.getById(id);
    if (!routine) return null;
    return this.save({ ...routine, ...changes });
  },

  delete(id) {
    const all = this.getAll().filter(r => r.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
    if (typeof Storage !== 'undefined' && Storage._syncToCloud) Storage._syncToCloud();
  },

  /* ---- Historial de sesiones (todas las rutinas) ---- */
  renderHistorial() {
    const container = document.getElementById('historial-sessions-container');
    if (!container) return;
    const sessions = this.getSessions();
    if (sessions.length === 0) {
      container.innerHTML = `<div class="empty-state"><p>Aún no hay sesiones registradas.</p></div>`;
      return;
    }
    container.innerHTML = sessions.slice(0, 60).map(s => {
      const d = new Date(s.endedAt || s.startedAt);
      const vol = this.calcVolume(s);
      const totalSets = (s.exercises || []).reduce((t, ex) => t + (ex.sets || []).length, 0);
      return `
        <div class="stat-tile" style="margin-bottom:8px;display:flex;align-items:center;justify-content:space-between;">
          <div>
            <div style="font-weight:700;font-size:0.9rem;">${s.routineName}</div>
            <div class="font-mono" style="font-size:11px;color:var(--text-muted);margin-top:2px;">${DIAS_SEMANA[d.getDay()]} ${d.getDate()}/${d.getMonth()+1} · ${totalSets} series</div>
          </div>
          <div class="font-display" style="font-weight:800;font-size:20px;color:var(--lime);">${this._fmtVol(vol)}</div>
        </div>`;
    }).join('');
  },

  /* ---- UI ---- */

  init() {
    this._render();
  },

  _render() {
    const container = document.getElementById('routines-container');
    if (!container) return;
    const all = this.getAll();

    if (all.length === 0) {
      container.innerHTML = `
        <div class="hero-card" style="background:var(--bg-card);border-color:var(--border);text-align:center;">
          <div style="width:48px;height:48px;border-radius:14px;background:var(--lime-soft);color:var(--lime);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;">
            <i data-lucide="dumbbell" style="width:24px;height:24px;"></i>
          </div>
          <div class="font-display" style="font-size:22px;line-height:1.1;margin-bottom:6px;">Aún no tienes rutinas</div>
          <div style="font-size:13px;color:var(--text-muted);margin-bottom:18px;">Crea una rutina de gym (por ejemplo, de 3 o 4 días) para empezar.</div>
          <button id="btn-new-routine" class="btn-lime" style="width:100%;height:52px;border:none;border-radius:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-size:16px;">
            <i data-lucide="plus" style="width:18px;height:18px;"></i>Crear rutina
          </button>
        </div>`;
      document.getElementById('btn-new-routine').addEventListener('click', () => this.openEditor(null));
      Icons.init(container);
      return;
    }

    const rutinaHoy = this.getTodayRoutine();

    container.innerHTML = `
      ${rutinaHoy ? this._heroCard(rutinaHoy, all) : ''}
      <div style="display:flex;align-items:center;justify-content:space-between;margin:20px 4px 12px;">
        <span class="font-mono" style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--text-muted);">Mi programa · ${all.length} rutina${all.length === 1 ? '' : 's'}</span>
        <button id="btn-new-routine" style="width:34px;height:34px;border-radius:11px;border:1px solid var(--border);background:var(--bg-card);color:var(--text-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;">
          <i data-lucide="plus" style="width:17px;height:17px;"></i>
        </button>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;" id="routines-list">
        ${all.map(r => this._routineRow(r)).join('')}
      </div>
    `;

    document.getElementById('btn-new-routine').addEventListener('click', () => this.openEditor(null));
    document.getElementById('btn-start-today')?.addEventListener('click', () => this.startSession(rutinaHoy.id));

    Icons.init(container);
    container.querySelectorAll('.routine-edit-btn').forEach(btn => {
      btn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); this.openEditor(btn.dataset.id); });
    });
    container.querySelectorAll('.routine-del-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault(); e.stopPropagation();
        if (confirm('¿Eliminar esta rutina?')) {
          this.delete(btn.dataset.id);
          this._render();
          if (typeof showToast === 'function') showToast('Rutina eliminada');
        }
      });
    });
    container.querySelectorAll('.routine-row[data-id]').forEach(row => {
      row.addEventListener('click', () => this.openDetail(row.dataset.id));
    });
  },

  _lastLabel(r) {
    const last = this.getLastSession(r.id);
    if (!last) return 'Sin sesiones aún';
    const vol = this.calcVolume(last);
    const d = new Date(last.endedAt || last.startedAt);
    return DIAS_SEMANA[d.getDay()] + ' ' + d.getDate() + '/' + (d.getMonth()+1) +
           (vol > 0 ? ' · ' + this._fmtVol(vol) : '');
  },

  _fmtVol(vol) {
    return (vol >= 1000 ? (vol/1000).toFixed(1) + 'k' : Math.round(vol).toLocaleString()) + ' lbs';
  },

  _heroCard(r, all) {
    const totalSeries = (r.exercises || []).reduce((s, e) => s + (parseInt(e.sets) || 0), 0);
    const last = this.getLastSession(r.id);
    const vol  = last ? this.calcVolume(last) : 0;
    const idx  = all.findIndex(x => x.id === r.id);
    const dayLabel = all.length > 1 ? `HOY · RUTINA ${idx + 1} DE ${all.length}` : 'HOY';
    return `
      <div class="hero-card" style="background:linear-gradient(150deg,#1B1626,var(--bg-card) 65%);border-color:#2E2640;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
          <span class="hero-streak-dot" style="background:var(--lime);"></span>
          <span class="font-mono" style="font-size:10.5px;font-weight:700;letter-spacing:.08em;color:var(--lime);">${dayLabel}</span>
        </div>
        <div class="font-display" style="font-size:30px;line-height:1.05;margin-bottom:14px;">${r.name}</div>
        <div style="display:flex;gap:20px;margin-bottom:18px;">
          <div><div class="font-mono" style="font-size:10px;color:var(--text-muted);">EJERCICIOS</div><div class="font-display" style="font-weight:800;font-size:20px;">${(r.exercises || []).length}</div></div>
          <div><div class="font-mono" style="font-size:10px;color:var(--text-muted);">SERIES</div><div class="font-display" style="font-weight:800;font-size:20px;">${totalSeries}</div></div>
          <div><div class="font-mono" style="font-size:10px;color:var(--text-muted);">ÚLTIMO VOL.</div><div class="font-display" style="font-weight:800;font-size:20px;">${vol ? this._fmtVol(vol) : '—'}</div></div>
        </div>
        <button id="btn-start-today" class="btn-lime" style="width:100%;height:56px;border:none;border-radius:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;font-size:17px;font-weight:800;">
          <i data-lucide="play" style="width:19px;height:19px;"></i>Empezar sesión
        </button>
      </div>
    `;
  },

  _routineRow(r) {
    const doneToday = this.getSessions(r.id).some(s => {
      const d = new Date(s.endedAt || s.startedAt);
      const f = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      return f === Storage.today();
    });
    return `
      <div class="routine-row" data-id="${r.id}" style="display:flex;align-items:center;gap:13px;background:var(--bg-card);border:1px solid var(--border);border-radius:18px;padding:15px 16px;cursor:pointer;">
        <span style="flex:none;width:34px;height:34px;border-radius:11px;background:${doneToday ? 'rgba(48,209,88,.14)' : 'var(--bg-input)'};display:flex;align-items:center;justify-content:center;">
          <i data-lucide="${doneToday ? 'check' : r.icon}" style="width:17px;height:17px;color:${doneToday ? '#30D158' : 'var(--text-secondary)'};"></i>
        </span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:16px;font-weight:700;">${r.name}</div>
          <div class="font-mono" style="font-size:11.5px;color:var(--text-muted);margin-top:2px;">${(r.exercises || []).length} ejercicios · ${this._lastLabel(r)}</div>
        </div>
        <button class="routine-edit-btn" data-id="${r.id}"
          style="flex:none;background:var(--bg-input);border:1px solid var(--border);color:var(--text-secondary);width:32px;height:32px;border-radius:9px;cursor:pointer;display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="routine-del-btn" data-id="${r.id}"
          style="flex:none;background:var(--bg-input);border:1px solid var(--border);color:var(--text-secondary);width:32px;height:32px;border-radius:9px;cursor:pointer;display:flex;align-items:center;justify-content:center;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
        </button>
        <i data-lucide="chevron-right" style="width:19px;height:19px;color:var(--text-dim);flex:none;"></i>
      </div>
    `;
  },

  /* ---- Detail + Session Launcher ---- */

  openDetail(id) {
    const routine = this.getById(id);
    if (!routine) return;
    const overlay = document.getElementById('routine-overlay');
    if (!overlay) return;

    const last = this.getLastSession(id);
    const vol  = last ? this.calcVolume(last) : 0;
    const lastLine = last
      ? (() => {
          const d = new Date(last.endedAt || last.startedAt);
          return `Última sesión: ${DIAS_SEMANA[d.getDay()]} ${d.getDate()}/${d.getMonth()+1}` +
                 (vol > 0 ? ` · ${this._fmtVol(vol)}` : '');
        })()
      : null;

    overlay.innerHTML = `
      <div class="overlay-content" style="overflow-y:auto;text-align:left;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h2 style="font-size:1.1rem;font-weight:800;">${routine.name}</h2>
          <button id="detail-close" style="background:none;border:none;color:var(--text-muted);font-size:1.5rem;cursor:pointer;">✕</button>
        </div>
        ${lastLine ? `<div style="font-size:0.78rem;color:var(--brand-light);font-weight:600;margin-bottom:14px;padding:8px 12px;background:rgba(124,58,237,0.1);border-radius:10px;">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:4px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          ${lastLine}
        </div>` : ''}
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${routine.exercises.map((ex, i) => `
            <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--bg-input);border-radius:12px;">
              <div style="width:36px;height:36px;background:linear-gradient(135deg,#4776E6,#8E54E9);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:0.85rem;flex-shrink:0;">${i+1}</div>
              <div style="flex:1;">
                <div style="font-weight:700;font-size:0.9rem;">${ex.name}</div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">${ex.sets} series × ${ex.reps} reps · ${ex.rest}s descanso</div>
              </div>
            </div>
          `).join('')}
        </div>
        <button id="btn-start-routine" class="btn btn-primary btn-full" style="margin-top:20px;">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:middle;margin-right:6px;"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Iniciar sesión de gym
        </button>
      </div>
    `;

    overlay.classList.add('active', 'full');
    Icons.init();
    document.getElementById('detail-close').onclick = () => overlay.classList.remove('active', 'full');
    document.getElementById('btn-start-routine').onclick = () => {
      overlay.classList.remove('active', 'full');
      this.startSession(id);
    };
  },

  /* ============================================================
     WORKOUT SESSION — step-by-step set tracker
     ============================================================ */

  startSession(routineId) {
    const routine = this.getById(routineId);
    if (!routine || routine.exercises.length === 0) {
      if (typeof showToast === 'function') showToast('Esta rutina no tiene ejercicios', 'warning');
      return;
    }

    const session = {
      routineId,
      routineName: routine.name,
      startedAt: Date.now(),
      exercises: routine.exercises.map(ex => ({
        name: ex.name,
        targetSets: parseInt(ex.sets) || 3,
        targetReps: String(ex.reps),
        restSeconds: parseInt(ex.rest) || 60,
        weight: ex.weight || 0,
        sets: []
      })),
      currentEx: 0,
      currentSet: 0
    };

    this._renderSession(session);
  },

  /* Mejor serie histórica de este ejercicio (mismo nombre) en esta rutina — para el "PR" de referencia */
  _bestSetForExercise(routineId, exName) {
    let best = null;
    this.getSessions(routineId).forEach(sess => {
      (sess.exercises || []).forEach(ex => {
        if (ex.name !== exName) return;
        (ex.sets || []).forEach(st => {
          if (!st.weightDone && !st.repsDone) return;
          if (!best || (st.weightDone || 0) > best.weight || ((st.weightDone || 0) === best.weight && (st.repsDone || 0) > best.reps)) {
            best = { weight: st.weightDone || 0, reps: st.repsDone || 0 };
          }
        });
      });
    });
    return best;
  },

  _startElapsedTimer(s) {
    clearInterval(this._elapsedTimer);
    const tick = () => {
      const el = document.getElementById('sess-elapsed');
      if (!el) return;
      const ms = Date.now() - s.startedAt;
      const mins = Math.floor(ms / 60000);
      const secs = Math.floor((ms % 60000) / 1000);
      el.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
    tick();
    this._elapsedTimer = setInterval(tick, 1000);
  },

  _stopElapsedTimer() {
    clearInterval(this._elapsedTimer);
    this._elapsedTimer = null;
  },

  /* ---- Sesión en vivo — el núcleo de Entreno ---- */
  _renderSession(s) {
    const overlay = document.getElementById('routine-overlay');
    if (!overlay) return;

    if (s.currentEx >= s.exercises.length) {
      this._stopElapsedTimer();
      this._showSessionSummary(s);
      return;
    }

    const ex        = s.exercises[s.currentEx];
    const totalSets = ex.targetSets;
    const exNum     = s.currentEx + 1;
    const totalEx   = s.exercises.length;
    const targetMin = parseInt(ex.targetReps.split('-')[0]) || 10;
    const lastSet   = ex.sets[ex.sets.length - 1];
    const weightStart = lastSet?.weightDone ?? (ex.weight || 0);
    const best      = this._bestSetForExercise(s.routineId, ex.name);
    const volSoFar  = this.calcVolume({ exercises: s.exercises });
    const nextEx    = s.exercises[s.currentEx + 1];

    overlay.classList.remove('full');
    overlay.classList.add('active');

    const segs = Array.from({ length: totalEx }, (_, i) =>
      `<span style="flex:1;height:4px;border-radius:999px;background:${i < exNum ? 'var(--lime)' : 'var(--border)'};display:block;"></span>`
    ).join('');

    const setsRows = Array.from({ length: totalSets }, (_, i) => {
      if (i < s.currentSet) {
        const st = ex.sets[i];
        const skipped = st?.status === 'skipped';
        return `<div style="display:grid;grid-template-columns:46px 1fr 1fr 46px;gap:6px;align-items:center;padding:12px 16px;border-top:1px solid var(--border);font-family:var(--font-mono);font-size:15px;">
          <span style="color:var(--text-muted);">${i + 1}</span>
          <span style="text-align:right;font-weight:700;${skipped ? 'color:var(--text-dim);' : ''}">${skipped ? '—' : st.weightDone}</span>
          <span style="text-align:right;font-weight:700;${skipped ? 'color:var(--text-dim);' : ''}">${skipped ? '—' : st.repsDone}</span>
          <span style="text-align:right;"><i data-lucide="${skipped ? 'minus' : 'check'}" style="width:16px;height:16px;color:${skipped ? 'var(--text-dim)' : '#30D158'};"></i></span>
        </div>`;
      }
      if (i === s.currentSet) return `<div id="active-set-row"></div>`;
      return `<div style="display:grid;grid-template-columns:46px 1fr;gap:6px;padding:12px 16px;border-top:1px solid var(--border);font-family:var(--font-mono);font-size:13px;color:var(--text-dim);"><span>${i + 1}</span><span style="text-align:right;">${weightStart || '—'} × ${targetMin} previsto</span></div>`;
    }).join('');

    overlay.innerHTML = `
      <div class="overlay-content" style="max-width:440px;text-align:left;padding:0;overflow:hidden;display:flex;flex-direction:column;max-height:92vh;">
        <div style="padding:18px 20px 14px;border-bottom:1px solid var(--border);flex:none;">
          <div style="display:flex;align-items:center;gap:12px;">
            <button id="sess-exit" style="width:38px;height:38px;flex:none;border-radius:12px;border:1px solid var(--border);background:var(--bg-input);color:var(--text-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;"><i data-lucide="chevron-down" style="width:18px;height:18px;"></i></button>
            <div style="flex:1;min-width:0;">
              <div class="font-mono" style="font-size:10px;letter-spacing:.08em;color:var(--lime);">EN CURSO</div>
              <div class="font-display" style="font-weight:800;font-size:19px;line-height:1.1;">${s.routineName}</div>
            </div>
            <div style="flex:none;text-align:right;">
              <div id="sess-elapsed" class="font-mono" style="font-weight:700;font-size:18px;color:var(--lime);">00:00</div>
              <div class="font-mono" style="font-size:10px;color:var(--text-muted);">${this._fmtVol(volSoFar)}</div>
            </div>
          </div>
          <div style="display:flex;gap:4px;margin-top:14px;">${segs}</div>
        </div>

        <div style="flex:1;overflow-y:auto;padding:16px 20px 0;">
          <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:4px;">
            <span class="font-mono" style="font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--text-muted);">EJERCICIO ${exNum} DE ${totalEx}</span>
            ${best ? `<span class="font-mono" style="font-size:11px;color:var(--text-muted);">PR ${best.weight} × ${best.reps}</span>` : ''}
          </div>
          <h2 class="font-display" style="font-size:26px;line-height:1.05;margin-bottom:14px;">${ex.name}</h2>

          <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:20px;overflow:hidden;margin-bottom:12px;">
            <div style="display:grid;grid-template-columns:46px 1fr 1fr 46px;gap:6px;padding:11px 16px;background:var(--bg-input);font-family:var(--font-mono);font-size:10.5px;font-weight:700;letter-spacing:.06em;color:var(--text-muted);"><span>SERIE</span><span style="text-align:right;">LBS</span><span style="text-align:right;">REPS</span><span style="text-align:right;">OK</span></div>
            ${setsRows}
          </div>

          <div id="rest-or-controls"></div>

          ${nextEx ? `
          <div style="display:flex;align-items:center;gap:12px;background:var(--bg-card);border:1px solid var(--border);border-radius:18px;padding:14px 16px;margin:14px 0;">
            <span style="flex:none;width:32px;height:32px;border-radius:10px;background:var(--bg-input);display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--text-muted);">${exNum + 1}</span>
            <div style="flex:1;min-width:0;"><div style="font-size:15px;font-weight:600;color:var(--text-secondary);">${nextEx.name}</div></div>
            <span class="font-mono" style="font-size:12px;color:var(--text-muted);">${nextEx.targetSets} × ${nextEx.targetReps}</span>
          </div>` : `<div style="height:14px;"></div>`}
        </div>

        <div style="flex:none;padding:14px 20px 20px;display:flex;gap:10px;border-top:1px solid var(--border);">
          <button id="sess-list-toggle" style="flex:none;width:52px;height:52px;border-radius:16px;border:1px solid var(--border-strong);background:var(--bg-input);color:var(--text-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;"><i data-lucide="list" style="width:19px;height:19px;"></i></button>
          <button id="sess-skip-exercise" style="flex:1;height:52px;border:none;border-radius:16px;background:linear-gradient(135deg,#7C3AED,#A78BFA);color:#fff;font-family:var(--font-display);font-weight:800;font-size:17px;letter-spacing:.03em;text-transform:uppercase;cursor:pointer;">Siguiente ejercicio</button>
        </div>
      </div>
    `;

    Icons.init(overlay);
    this._startElapsedTimer(s);

    document.getElementById('sess-exit').onclick = () => {
      if (confirm('¿Terminar la sesión ahora?')) { this._stopElapsedTimer(); this._showSessionSummary(s); }
    };
    document.getElementById('sess-skip-exercise').onclick = () => {
      while (ex.sets.length < totalSets) ex.sets.push({ repsDone: 0, weightDone: weightStart, status: 'skipped' });
      if (navigator.vibrate) navigator.vibrate([60, 80, 60]);
      s._resting = null;
      s.currentEx++;
      s.currentSet = 0;
      this._renderSession(s);
      requestAnimationFrame(() => {
        const el = document.querySelector('#routine-overlay .overlay-content');
        if (el) { el.classList.add('ex-slide-in'); setTimeout(() => el.classList.remove('ex-slide-in'), 350); }
      });
    };
    document.getElementById('sess-list-toggle').onclick = () => this._toggleExerciseList(s);

    this._renderActiveSetPanel(s, ex, weightStart, targetMin);
  },

  _renderActiveSetPanel(s, ex, weightStart, targetMin) {
    const rowEl = document.getElementById('active-set-row');
    const ctrlEl = document.getElementById('rest-or-controls');
    if (!rowEl || !ctrlEl) return;

    if (s._resting) {
      rowEl.outerHTML = `<div id="active-set-row" style="display:grid;grid-template-columns:46px 1fr 1fr 46px;gap:6px;align-items:center;padding:12px 16px;border-top:1px solid var(--border);background:rgba(200,255,77,.05);">
        <span class="font-mono" style="font-size:15px;font-weight:700;color:var(--lime);">${s.currentSet + 1}</span>
        <span style="text-align:right;color:var(--text-muted);font-family:var(--font-mono);">${s._resting.nextWeight}</span>
        <span style="text-align:right;color:var(--text-muted);font-family:var(--font-mono);">${targetMin}</span>
        <span></span>
      </div>`;
      this._renderRestPanel(ctrlEl, s);
      return;
    }

    let weightVal = weightStart;
    let repsVal = targetMin;

    rowEl.outerHTML = `
      <div id="active-set-row" style="padding:14px 16px;border-top:1px solid var(--border);background:rgba(200,255,77,.05);">
        <div style="display:grid;grid-template-columns:46px 1fr 1fr 46px;gap:6px;align-items:center;">
          <span class="font-mono" style="font-size:15px;font-weight:700;color:var(--lime);">${s.currentSet + 1}</span>
          <div id="active-weight-box" style="height:52px;border-radius:13px;border:1.5px solid var(--lime);background:var(--bg-input);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:800;font-size:24px;">${weightVal}</div>
          <div id="active-reps-box" style="height:52px;border-radius:13px;border:1.5px solid var(--border-strong);background:var(--bg-input);display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-weight:800;font-size:24px;">${repsVal}</div>
          <button id="active-confirm" style="height:52px;border-radius:13px;border:none;background:var(--lime);color:#08080A;cursor:pointer;display:flex;align-items:center;justify-content:center;animation:fp-glow 2.4s infinite;"><i data-lucide="check" style="width:20px;height:20px;"></i></button>
        </div>
      </div>
    `;

    ctrlEl.innerHTML = `
      <div style="display:flex;gap:7px;margin:12px 0;">
        <button class="set-chip" data-adjust="w-" style="flex:1;text-align:center;padding:9px 0;border-radius:11px;background:var(--bg-input);border:1px solid var(--border-strong);font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--text-secondary);cursor:pointer;">−5</button>
        <button class="set-chip" data-adjust="w+" style="flex:1;text-align:center;padding:9px 0;border-radius:11px;background:var(--bg-input);border:1px solid var(--border-strong);font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--text-secondary);cursor:pointer;">+5</button>
        <button class="set-chip" data-adjust="r-" style="flex:1;text-align:center;padding:9px 0;border-radius:11px;background:var(--bg-input);border:1px solid var(--border-strong);font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--text-secondary);cursor:pointer;">−1 rep</button>
        <button class="set-chip" data-adjust="r+" style="flex:1;text-align:center;padding:9px 0;border-radius:11px;background:var(--bg-input);border:1px solid var(--border-strong);font-family:var(--font-mono);font-size:12px;font-weight:700;color:var(--text-secondary);cursor:pointer;">+1 rep</button>
      </div>
      <button id="active-skip-set" style="width:100%;background:none;border:none;color:var(--text-muted);font-family:inherit;font-size:0.8rem;font-weight:700;cursor:pointer;padding:4px 0 10px;">Saltar esta serie</button>
    `;

    const wBox = document.getElementById('active-weight-box');
    const rBox = document.getElementById('active-reps-box');
    ctrlEl.querySelectorAll('.set-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const a = btn.dataset.adjust;
        if (a === 'w-') weightVal = Math.max(0, weightVal - 5);
        if (a === 'w+') weightVal += 5;
        if (a === 'r-') repsVal = Math.max(0, repsVal - 1);
        if (a === 'r+') repsVal++;
        wBox.textContent = weightVal;
        rBox.textContent = repsVal;
      });
    });

    document.getElementById('active-confirm').onclick = () => {
      ex.sets.push({ repsDone: repsVal, weightDone: weightVal, status: repsVal >= targetMin ? 'done' : 'partial' });
      this._advanceSession(s, weightVal);
    };
    document.getElementById('active-skip-set').onclick = () => {
      ex.sets.push({ repsDone: 0, weightDone: weightVal, status: 'skipped' });
      this._advanceSession(s, weightVal);
    };
  },

  _advanceSession(s, weightDone) {
    if (navigator.vibrate) navigator.vibrate(60);
    const ex = s.exercises[s.currentEx];
    if (ex.sets.length >= ex.targetSets) {
      if (navigator.vibrate) navigator.vibrate([60, 80, 60]);
      s._resting = null;
      s.currentEx++;
      s.currentSet = 0;
      this._renderSession(s);
      requestAnimationFrame(() => {
        const el = document.querySelector('#routine-overlay .overlay-content');
        if (el) { el.classList.add('ex-slide-in'); setTimeout(() => el.classList.remove('ex-slide-in'), 350); }
      });
    } else {
      s.currentSet++;
      const restSeconds = ex.restSeconds || 60;
      s._resting = { remaining: restSeconds, total: restSeconds, nextWeight: weightDone };
      this._renderSession(s);
    }
  },

  /* Panel de descanso EMBEBIDO en la propia pantalla de sesión (no una pantalla aparte) */
  _renderRestPanel(ctrlEl, s) {
    clearInterval(this._restTimer);
    const state = s._resting;
    const draw = () => {
      const pct = (state.total - state.remaining) / state.total;
      ctrlEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:14px;background:rgba(124,58,237,.1);border:1px solid rgba(124,58,237,.32);border-radius:20px;padding:16px 18px;margin:12px 0;">
          <div style="position:relative;width:52px;height:52px;flex:none;">
            <svg viewBox="0 0 52 52" style="width:52px;height:52px;transform:rotate(-90deg);display:block;"><circle cx="26" cy="26" r="22" fill="none" stroke="var(--border)" stroke-width="5"/><circle cx="26" cy="26" r="22" fill="none" stroke="#A78BFA" stroke-width="5" stroke-linecap="round" stroke-dasharray="138" stroke-dashoffset="${138 - pct * 138}"/></svg>
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:700;font-size:13px;">${state.remaining}</div>
          </div>
          <div style="flex:1;min-width:0;"><div style="font-size:16px;font-weight:700;">Descanso</div><div class="font-mono" style="font-size:12px;color:var(--text-secondary);margin-top:2px;">Siguiente: serie ${s.currentSet + 1} · ${state.nextWeight} lbs</div></div>
          <button id="rest-skip" style="flex:none;padding:0 15px;height:40px;border-radius:12px;border:1px solid var(--border-strong);background:var(--bg-input);color:var(--text-primary);font-size:13px;font-weight:600;cursor:pointer;">Saltar</button>
        </div>
      `;
      document.getElementById('rest-skip').onclick = () => { clearInterval(this._restTimer); s._resting = null; this._renderSession(s); };
    };
    draw();
    this._restTimer = setInterval(() => {
      state.remaining--;
      if (state.remaining <= 0) { clearInterval(this._restTimer); s._resting = null; this._renderSession(s); }
      else draw();
    }, 1000);
  },

  /* Lista de ejercicios de la sesión (botón "list" de la barra inferior) */
  _toggleExerciseList(s) {
    const scrollBody = document.querySelector('#routine-overlay .overlay-content > div[style*="overflow-y:auto"]');
    if (!scrollBody) return;
    if (scrollBody.dataset.mode === 'list') { this._renderSession(s); return; }
    scrollBody.dataset.mode = 'list';
    scrollBody.innerHTML = `
      <button id="ex-list-back" style="background:none;border:none;color:var(--text-muted);display:flex;align-items:center;gap:6px;font-size:0.82rem;font-weight:700;padding:12px 0;cursor:pointer;"><i data-lucide="chevron-left" style="width:16px;height:16px;"></i>Volver a la serie activa</button>
      <div style="display:flex;flex-direction:column;gap:8px;padding-bottom:20px;">
        ${s.exercises.map((ex2, i) => {
          const done = i < s.currentEx;
          const active = i === s.currentEx;
          return `<div style="display:flex;align-items:center;gap:13px;background:var(--bg-card);border:1px solid ${active ? 'var(--lime)' : 'var(--border)'};border-radius:18px;padding:14px 16px;">
            <span style="flex:none;width:32px;height:32px;border-radius:10px;background:${done ? 'rgba(48,209,88,.14)' : 'var(--bg-input)'};display:flex;align-items:center;justify-content:center;"><i data-lucide="${done ? 'check' : 'dumbbell'}" style="width:16px;height:16px;color:${done ? '#30D158' : 'var(--text-secondary)'};"></i></span>
            <div style="flex:1;min-width:0;"><div style="font-size:15px;font-weight:700;">${ex2.name}</div><div class="font-mono" style="font-size:11.5px;color:var(--text-muted);margin-top:2px;">${ex2.targetSets} × ${ex2.targetReps}</div></div>
            ${active ? `<span class="font-mono" style="font-size:10px;font-weight:700;color:var(--lime);">ACTUAL</span>` : ''}
          </div>`;
        }).join('')}
      </div>
    `;
    Icons.init(scrollBody);
    document.getElementById('ex-list-back').onclick = () => this._renderSession(s);
  },

  /* ---- Sesión completada ---- */
  _showSessionSummary(s) {
    this._stopElapsedTimer();
    const overlay = document.getElementById('routine-overlay');
    const duration = Math.max(1, Math.round((Date.now() - s.startedAt) / 60000));
    let totalSets = 0;
    s.exercises.forEach(ex => { totalSets += ex.sets.length; });

    const volume = this.calcVolume({ exercises: s.exercises });
    const last = this.getLastSession(s.routineId);
    const lastVolume = last ? this.calcVolume(last) : 0;
    const vsAnteriorPct = lastVolume > 0 ? Math.round(((volume - lastVolume) / lastVolume) * 100) : null;

    // Récord personal: mejor serie (peso x reps) de algún ejercicio de esta sesión vs. su histórico
    let prDetail = null;
    s.exercises.forEach(ex => {
      const priorBest = this._bestSetForExercise(s.routineId, ex.name);
      ex.sets.forEach(st => {
        if (!st.weightDone || !st.repsDone) return;
        const beatsIt = !priorBest || st.weightDone > priorBest.weight || (st.weightDone === priorBest.weight && st.repsDone > priorBest.reps);
        if (beatsIt && (!prDetail || st.weightDone > prDetail.weight)) {
          prDetail = { name: ex.name, weight: st.weightDone, reps: st.repsDone, priorWeight: priorBest?.weight, priorReps: priorBest?.reps };
        }
      });
    });

    const priorSessions = this.getSessions(s.routineId);
    const last6 = priorSessions.slice(0, 5).map(sess => this.calcVolume(sess)).reverse();
    last6.push(volume);
    const maxVol = Math.max(...last6, 1);

    overlay.innerHTML = `
      <div class="overlay-content" style="max-width:420px;text-align:center;">
        <div style="width:76px;height:76px;margin:4px auto 16px;border-radius:26px;background:var(--lime);display:flex;align-items:center;justify-content:center;">
          <i data-lucide="check" style="width:38px;height:38px;color:#08080A;"></i>
        </div>
        <div class="font-mono" style="font-size:11px;font-weight:700;letter-spacing:.1em;color:var(--lime);margin-bottom:8px;">SESIÓN COMPLETADA</div>
        <h1 class="font-display" style="margin:0 0 20px;font-size:32px;line-height:1;">${s.routineName}</h1>

        <div class="stat-tiles" style="text-align:left;margin-bottom:12px;">
          <div class="stat-tile"><div class="stat-tile-label">DURACIÓN</div><div class="stat-tile-val">${duration}<span style="font-size:15px;color:var(--text-muted);"> min</span></div></div>
          <div class="stat-tile"><div class="stat-tile-label">VOLUMEN</div><div class="stat-tile-val lime">${this._fmtVol(volume)}</div></div>
          <div class="stat-tile"><div class="stat-tile-label">SERIES</div><div class="stat-tile-val">${totalSets}</div></div>
          <div class="stat-tile"><div class="stat-tile-label">VS. ANTERIOR</div><div class="stat-tile-val" style="color:${vsAnteriorPct === null ? 'var(--text-muted)' : vsAnteriorPct >= 0 ? '#30D158' : 'var(--danger)'};">${vsAnteriorPct === null ? '—' : (vsAnteriorPct >= 0 ? '+' : '') + vsAnteriorPct + '%'}</div></div>
        </div>

        ${prDetail ? `
        <div style="display:flex;gap:12px;align-items:flex-start;background:rgba(48,209,88,.08);border:1px solid rgba(48,209,88,.3);border-radius:18px;padding:15px 16px;text-align:left;margin-bottom:12px;">
          <i data-lucide="trophy" style="width:20px;height:20px;color:#30D158;flex:none;margin-top:1px;"></i>
          <div><div style="font-size:15.5px;font-weight:700;">Récord personal</div><div style="font-size:13px;color:var(--text-secondary);margin-top:2px;">${prDetail.name} ${prDetail.weight} lbs × ${prDetail.reps}${prDetail.priorWeight ? ` — antes ${prDetail.priorWeight} × ${prDetail.priorReps}` : ''}</div></div>
        </div>` : ''}

        <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:20px;padding:18px;text-align:left;margin-bottom:20px;">
          <div class="font-mono" style="font-size:10.5px;font-weight:700;letter-spacing:.06em;color:var(--text-muted);margin-bottom:14px;">VOLUMEN · ÚLTIMAS ${last6.length} SESIONES</div>
          <div style="display:flex;align-items:flex-end;gap:9px;height:70px;">
            ${last6.map((v, i) => {
              const isLast = i === last6.length - 1;
              const h = Math.max(6, Math.round((v / maxVol) * 100));
              return `<div style="flex:1;height:${h}%;border-radius:6px 6px 0 0;background:${isLast ? 'var(--lime)' : '#2E2640'};"></div>`;
            }).join('')}
          </div>
        </div>

        <div style="display:flex;gap:8px;">
          <button id="sess-share" style="flex:none;width:56px;height:56px;border-radius:16px;border:1px solid var(--border-strong);background:var(--bg-input);color:var(--text-secondary);cursor:pointer;display:flex;align-items:center;justify-content:center;"><i data-lucide="share-2" style="width:19px;height:19px;"></i></button>
          <button id="sess-finish" class="btn-lime" style="flex:1;height:56px;border:none;border-radius:16px;cursor:pointer;font-family:var(--font-display);font-weight:800;font-size:18px;">Guardar sesión</button>
        </div>
      </div>
    `;
    overlay.classList.remove('full');
    overlay.classList.add('active');
    Icons.init(overlay);

    document.getElementById('sess-share')?.addEventListener('click', () => {
      const totalReps = s.exercises.reduce((t, ex) => t + ex.sets.reduce((s2, st) => s2 + (st.repsDone || 0), 0), 0);
      this._shareSession({ routineName: s.routineName, duration, totalSets, totalReps, exercises: s.exercises });
    });

    document.getElementById('sess-finish').onclick = () => {
      this.saveSession({
        routineId: s.routineId,
        routineName: s.routineName,
        startedAt: s.startedAt,
        endedAt: Date.now(),
        exercises: s.exercises
      });
      try {
        const today = Storage.today();
        const dia = Storage.obtenerDia(today) || { fecha: today, checklist: {}, nota: '', cumplimiento: 0 };
        if (dia.checklist.gym !== true) {
          dia.checklist.gym = true;
          const items = getItemsForDate(today);
          const checked = items.filter(i => dia.checklist[i.id] === true).length;
          dia.cumplimiento = Math.round((checked / items.length) * 100);
          Storage.guardarDia(today, dia);
        }
      } catch (e) {}
      overlay.classList.remove('active');
      this._render();
    };
  },

  /* ---- Editor de rutina ---- */

  openEditor(id) {
    const routine = id ? this.getById(id) : null;
    const isNew   = !routine;
    const GRADIENTS = [
      { id: 'cat-coral',  name: 'Coral' },
      { id: 'cat-teal',   name: 'Teal' },
      { id: 'cat-blue',   name: 'Azul' },
      { id: 'cat-purple', name: 'Violeta' },
      { id: 'cat-orange', name: 'Naranja' },
      { id: 'cat-navy',   name: 'Navy' },
    ];
    const ICONS = ['dumbbell','activity','zap','flame','target','heart','trophy','timer','run','wind','scale','clock','sun','moon','leaf','apple','droplets','bolt','brain','star'];

    const overlay = document.getElementById('routine-overlay');
    overlay.innerHTML = `
      <div class="overlay-content" style="overflow-y:auto;overflow-x:hidden;text-align:left;box-sizing:border-box;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h2 style="font-size:1.1rem;font-weight:800;">${isNew ? 'Nueva Rutina' : 'Editar Rutina'}</h2>
          <button id="editor-close" style="background:none;border:none;color:var(--text-muted);cursor:pointer;display:flex;align-items:center;"><i data-lucide="x" style="width:22px;height:22px;"></i></button>
        </div>

        <div style="display:flex;flex-direction:column;gap:14px;">
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px;">Nombre</label>
            <input id="ed-name" type="text" value="${routine?.name || ''}" placeholder="Ej: Push Day"
              style="width:100%;padding:12px 14px;border:1.5px solid var(--border);border-radius:12px;background:var(--bg-input);color:var(--text-primary);font-family:inherit;font-size:0.95rem;outline:none;">
          </div>
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px;">Ícono</label>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              ${ICONS.map(ic => `
                <button class="icon-btn" data-icon="${ic}" title="${ic}"
                  style="width:44px;height:44px;border-radius:10px;border:2px solid ${routine?.icon===ic?'#7C3AED':'var(--border)'};background:${routine?.icon===ic?'rgba(124,58,237,0.15)':'var(--bg-input)'};cursor:pointer;transition:all 0.15s;display:flex;align-items:center;justify-content:center;">
                  <i data-lucide="${ic}" style="width:22px;height:22px;pointer-events:none;"></i>
                </button>
              `).join('')}
            </div>
          </div>
          <div>
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px;">Color</label>
            <select id="ed-gradient" style="width:100%;padding:12px 14px;border:1.5px solid var(--border);border-radius:12px;background:var(--bg-input);color:var(--text-primary);font-family:inherit;font-size:0.95rem;outline:none;">
              ${GRADIENTS.map(g => `<option value="${g.id}" ${routine?.gradient===g.id?'selected':''}>${g.name}</option>`).join('')}
            </select>
          </div>
          <div>
            <label style="${labelStyle}">Días</label>
            <div style="display:flex;gap:6px;" id="ed-dias">
              ${['D','L','M','X','J','V','S'].map((d,i) => `
                <button class="ed-dia-btn" data-dia="${i}"
                  style="flex:1;padding:10px 0;border-radius:10px;border:1.5px solid ${routine?.dias?.includes(i)?'#7C3AED':'var(--border)'};background:${routine?.dias?.includes(i)?'rgba(124,58,237,0.2)':'var(--bg-input)'};color:${routine?.dias?.includes(i)?'#A78BFA':'var(--text-muted)'};font-weight:700;font-size:0.78rem;cursor:pointer;transition:all 0.15s;">${d}</button>
              `).join('')}
            </div>
            <div style="font-size:0.72rem;color:var(--text-muted);margin-top:6px;">Opcional — los días se registran automáticamente al hacer sesión.</div>
          </div>
        </div>

        <div style="margin-top:20px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;">Ejercicios</label>
            <button id="btn-add-ex" style="background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.3);color:#A78BFA;padding:6px 12px;border-radius:8px;font-size:0.8rem;font-weight:700;cursor:pointer;">+ Agregar</button>
          </div>
          <div id="ed-exercises" style="display:flex;flex-direction:column;gap:8px;">
            ${(routine?.exercises || []).map((ex, i) => this._exerciseRow(ex, i)).join('')}
          </div>
        </div>

        <button id="btn-save-routine" class="btn btn-primary btn-full" style="margin-top:24px;">
          ${isNew ? 'Crear Rutina' : 'Guardar Cambios'}
        </button>
      </div>
    `;

    overlay.classList.add('active', 'full');
    Icons.init();

    let selectedIcon = routine?.icon || 'dumbbell';
    let selectedDias = [...(routine?.dias || [])];

    overlay.querySelectorAll('.icon-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedIcon = btn.dataset.icon;
        overlay.querySelectorAll('.icon-btn').forEach(b => {
          b.style.borderColor = b.dataset.icon === selectedIcon ? '#7C3AED' : 'var(--border)';
          b.style.background  = b.dataset.icon === selectedIcon ? 'rgba(124,58,237,0.15)' : 'var(--bg-input)';
        });
      });
    });

    overlay.querySelectorAll('.ed-dia-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const dia = parseInt(btn.dataset.dia);
        if (selectedDias.includes(dia)) selectedDias = selectedDias.filter(d => d !== dia);
        else selectedDias.push(dia);
        btn.style.borderColor = selectedDias.includes(dia) ? '#7C3AED' : 'var(--border)';
        btn.style.background  = selectedDias.includes(dia) ? 'rgba(124,58,237,0.2)' : 'var(--bg-input)';
        btn.style.color       = selectedDias.includes(dia) ? '#A78BFA' : 'var(--text-muted)';
      });
    });

    document.getElementById('btn-add-ex').addEventListener('click', () => {
      const list = document.getElementById('ed-exercises');
      const div  = document.createElement('div');
      div.innerHTML = this._exerciseRow({ name: '', sets: 3, reps: '10-12', rest: 60 }, list.children.length);
      const row = div.firstElementChild;
      list.appendChild(row);
      this._bindRemoveEx(row);
    });

    overlay.querySelectorAll('.btn-remove-ex').forEach(btn => this._bindRemoveEx(btn.closest('.ex-row')));

    document.getElementById('btn-save-routine').addEventListener('click', () => {
      const name = document.getElementById('ed-name').value.trim();
      if (!name) { document.getElementById('ed-name').focus(); if (typeof showToast === 'function') showToast('Escribe un nombre', 'warning'); return; }

      const gradient  = document.getElementById('ed-gradient').value;
      const exercises = [];
      overlay.querySelectorAll('.ex-row').forEach(row => {
        const n = row.querySelector('.ex-name').value.trim();
        if (n) exercises.push({
          name: n,
          sets:   parseInt(row.querySelector('.ex-sets').value)   || 3,
          reps:   row.querySelector('.ex-reps').value              || '10-12',
          rest:   parseInt(row.querySelector('.ex-rest').value)   || 60,
          weight: parseFloat(row.querySelector('.ex-weight').value) || 0
        });
      });

      const data = { name, icon: selectedIcon, gradient, dias: selectedDias, exercises };
      if (isNew) this.create(data);
      else this.update(id, data);

      overlay.classList.remove('active', 'full');
      this._render();
      if (typeof showToast === 'function') showToast(isNew ? 'Rutina creada' : 'Cambios guardados');
    });

    document.getElementById('editor-close').onclick = () => overlay.classList.remove('active', 'full');
  },

  _exerciseRow(ex) {
    const SVG_X = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="pointer-events:none;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    const inputStyle = 'width:100%;border:1.5px solid var(--border);border-radius:8px;padding:8px 6px;background:var(--bg-card);color:var(--text-primary);font-family:inherit;font-size:0.85rem;outline:none;text-align:center;box-sizing:border-box;';
    const labelStyle = 'font-size:0.65rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:3px;';
    return `
      <div class="ex-row" style="background:var(--bg-input);border-radius:12px;padding:12px;box-sizing:border-box;width:100%;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
          <input class="ex-name" type="text" value="${ex.name || ''}" placeholder="Nombre del ejercicio"
            style="flex:1;min-width:0;border:1.5px solid var(--border);border-radius:8px;padding:9px 10px;background:var(--bg-card);color:var(--text-primary);font-family:inherit;font-size:0.85rem;outline:none;box-sizing:border-box;">
          <button class="btn-remove-ex"
            style="flex-shrink:0;background:rgba(255,69,58,0.1);border:1.5px solid rgba(255,69,58,0.3);color:#FF453A;width:34px;height:34px;border-radius:8px;cursor:pointer;display:flex;align-items:center;justify-content:center;">
            ${SVG_X}
          </button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%;box-sizing:border-box;">
          <div>
            <label style="${labelStyle}">Series</label>
            <input class="ex-sets" type="number" value="${ex.sets || 3}" min="1" style="${inputStyle}">
          </div>
          <div>
            <label style="${labelStyle}">Reps</label>
            <input class="ex-reps" type="text" value="${ex.reps || '10-12'}" style="${inputStyle}">
          </div>
          <div>
            <label style="${labelStyle}">Descanso (seg)</label>
            <input class="ex-rest" type="number" value="${ex.rest || 60}" min="0" style="${inputStyle}">
          </div>
          <div>
            <label style="${labelStyle}">Peso (lbs)</label>
            <input class="ex-weight" type="number" value="${ex.weight || ''}" min="0" step="2.5" placeholder="—" style="${inputStyle}">
          </div>
        </div>
      </div>
    `;
  },

  _bindRemoveEx(rowEl) {
    if (!rowEl) return;
    const btn = rowEl.querySelector('.btn-remove-ex');
    if (btn) btn.addEventListener('click', () => rowEl.remove());
  }
,

  /* share session image */
  async _shareSession({ routineName, duration, totalSets, totalReps, exercises }) {
    const W = 640, H = Math.max(700, 300 + exercises.length * 68);
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#0A0A12'); bg.addColorStop(1, '#12101E');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(124,58,237,0.18)';
    ctx.beginPath(); ctx.roundRect(20, 20, W-40, 90, 18); ctx.fill();
    ctx.strokeStyle = 'rgba(124,58,237,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(20, 20, W-40, 90, 18); ctx.stroke();
    ctx.fillStyle = '#A78BFA'; ctx.font = 'bold 22px Arial';
    ctx.fillText('FitPulse - Sesion de Gym', 40, 58);
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.font = '14px Arial';
    const dateStr = new Date().toLocaleDateString('es', { weekday:'long', day:'numeric', month:'long' });
    ctx.fillText(routineName + ' - ' + dateStr, 40, 82);
    const sC = (x, y, w, h, v, l, a) => {
      ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.beginPath(); ctx.roundRect(x,y,w,h,14); ctx.fill();
      ctx.strokeStyle = 'rgba(' + a + ',0.25)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.roundRect(x,y,w,h,14); ctx.stroke();
      ctx.fillStyle = '#F0F0F8'; ctx.font = 'bold 28px Arial'; ctx.textAlign = 'center';
      ctx.fillText(v, x+w/2, y+h*0.55);
      ctx.fillStyle = 'rgba(' + a + ',0.7)'; ctx.font = '11px Arial';
      ctx.fillText(l.toUpperCase(), x+w/2, y+h*0.82); ctx.textAlign = 'left';
    };
    const sw = (W - 64) / 3;
    sC(20, 130, sw, 80, duration, 'minutos', '167,139,250');
    sC(20+sw+12, 130, sw, 80, totalSets, 'series', '48,209,88');
    sC(20+sw*2+24, 130, sw, 80, totalReps, 'reps', '251,191,36');
    let ey = 240;
    exercises.forEach(ex => {
      const sets = ex.sets || [];
      const done = sets.filter(s => s.status === 'done').length;
      const skip = sets.filter(s => s.status === 'skipped').length;
      const col = sets.length===0 ? '#636366' : skip===sets.length ? '#FF453A' : done===ex.targetSets ? '#30D158' : '#FFD60A';
      const lbl = sets.length===0 ? 'SIN HACER' : skip===sets.length ? 'SALTADO' : done===ex.targetSets ? 'COMPLETO' : 'PARCIAL';
      ctx.fillStyle = 'rgba(255,255,255,0.04)'; ctx.beginPath(); ctx.roundRect(20,ey,W-40,56,12); ctx.fill();
      ctx.fillStyle = col; ctx.beginPath(); ctx.roundRect(20,ey,4,56,[12,0,0,12]); ctx.fill();
      ctx.fillStyle = '#F0F0F8'; ctx.font = 'bold 14px Arial'; ctx.fillText(ex.name, 36, ey+22);
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '11px Arial';
      const setsStr = sets.map(st => (st.repsDone||0) + 'r' + (st.weightDone ? ' x ' + st.weightDone + 'lbs' : '')).join(' - ') || '-';
      ctx.fillText(setsStr, 36, ey+40);
      ctx.fillStyle = col; ctx.font = 'bold 10px Arial'; ctx.textAlign = 'right';
      ctx.fillText(lbl, W-30, ey+22); ctx.textAlign = 'left'; ey += 64;
    });
    ctx.fillStyle = 'rgba(255,255,255,0.06)'; ctx.fillRect(0, H-50, W, 50);
    ctx.fillStyle = '#7C3AED'; ctx.font = 'bold 13px Arial';
    ctx.fillText('FitPulse - Tu companero fitness', 24, H-18);
    canvas.toBlob(async blob => {
      if (navigator.share && navigator.canShare) {
        try {
          const file = new File([blob], 'fitpulse-sesion.png', { type: 'image/png' });
          await navigator.share({ title: 'Sesion: ' + routineName, files: [file] });
        } catch(e) { this._dlBlob(blob); }
      } else { this._dlBlob(blob); }
    }, 'image/png');
  },

  _dlBlob(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'fitpulse_sesion_' + new Date().toISOString().slice(0,10) + '.png';
    a.click(); URL.revokeObjectURL(url);
    showToast('Imagen descargada');
  }

};
