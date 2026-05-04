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

  /* ---- UI ---- */

  init() {
    if (typeof initDarkMode === 'function') initDarkMode();
    this._render();
  },

  _render() {
    const container = document.getElementById('routines-container');
    if (!container) return;
    const all = this.getAll();

    container.innerHTML = `
      <div class="section-header" style="margin-top:0">
        <h2>Mis Rutinas</h2>
        <button class="btn btn-primary" id="btn-new-routine" style="padding:8px 16px;font-size:0.85rem;">+ Nueva</button>
      </div>
      ${all.length === 0
        ? `<div style="text-align:center;padding:40px 20px;color:var(--text-muted);">
             <div style="margin-bottom:12px;opacity:0.5;"><i data-lucide="dumbbell" style="width:48px;height:48px;"></i></div>
             <div style="font-weight:700;margin-bottom:6px;">Sin rutinas</div>
             <div style="font-size:0.85rem;">Pulsa + Nueva para crear tu primera rutina</div>
           </div>`
        : `<div class="workout-categories" id="routines-list">
             ${all.map(r => this._routineCard(r)).join('')}
           </div>`
      }
    `;

    document.getElementById('btn-new-routine').addEventListener('click', () => this.openEditor(null));

    Icons.init();
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
    container.querySelectorAll('.workout-cat-card[data-id]').forEach(card => {
      card.addEventListener('click', () => this.openDetail(card.dataset.id));
    });
  },

  _routineCard(r) {
    const last = this.getLastSession(r.id);
    const vol  = last ? this.calcVolume(last) : 0;
    const lastLabel = last
      ? (() => {
          const d = new Date(last.endedAt || last.startedAt);
          return DIAS_SEMANA[d.getDay()] + ' ' + d.getDate() + '/' + (d.getMonth()+1) +
                 (vol > 0 ? ' · ' + Math.round(vol).toLocaleString() + ' kg' : '');
        })()
      : 'Sin sesiones aún';
    return `
      <div class="workout-cat-card ${r.gradient}" data-id="${r.id}" style="cursor:pointer;">
        <div class="cat-bg"></div>
        <div class="cat-body">
          <div class="cat-icon-wrap" style="margin-bottom:8px;opacity:0.9;">
            <i data-lucide="${r.icon}" style="width:28px;height:28px;"></i>
          </div>
          <div class="cat-name" style="font-size:1rem;font-weight:800;margin-bottom:4px;">${r.name}</div>
          <div class="cat-count">
            <i data-lucide="layers" style="width:13px;height:13px;margin-right:3px;opacity:0.7;"></i>
            ${r.exercises.length} ejercicios
          </div>
          <div style="font-size:0.68rem;color:rgba(255,255,255,0.65);margin-top:4px;display:flex;align-items:center;gap:4px;">
            <i data-lucide="clock" style="width:11px;height:11px;"></i>
            ${lastLabel}
          </div>
        </div>
        <div style="position:absolute;top:10px;right:10px;z-index:3;display:flex;gap:6px;">
          <button class="routine-edit-btn" data-id="${r.id}"
            style="background:rgba(0,0,0,0.35);border:none;color:#fff;width:32px;height:32px;border-radius:8px;cursor:pointer;backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="routine-del-btn" data-id="${r.id}"
            style="background:rgba(0,0,0,0.35);border:none;color:#fff;width:32px;height:32px;border-radius:8px;cursor:pointer;backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
          </button>
        </div>
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
                 (vol > 0 ? ` · ${Math.round(vol).toLocaleString()} kg` : '');
        })()
      : null;

    overlay.innerHTML = `
      <div class="overlay-content" style="max-width:500px;max-height:90vh;overflow-y:auto;text-align:left;">
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

    overlay.classList.add('active');
    Icons.init();
    document.getElementById('detail-close').onclick = () => overlay.classList.remove('active');
    document.getElementById('btn-start-routine').onclick = () => {
      overlay.classList.remove('active');
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

  _renderSession(s) {
    const overlay = document.getElementById('routine-overlay');
    if (!overlay) return;

    if (s.currentEx >= s.exercises.length) {
      this._showSessionSummary(s);
      return;
    }

    const ex       = s.exercises[s.currentEx];
    const setNum   = s.currentSet + 1;
    const totalSets = ex.targetSets;
    const exNum    = s.currentEx + 1;
    const totalEx  = s.exercises.length;
    const progress = Math.round((s.currentEx / totalEx) * 100);
    const targetMin = parseInt(ex.targetReps.split('-')[0]) || 10;

    overlay.classList.add('active');
    overlay.innerHTML = `
      <div class="overlay-content" style="max-width:420px;text-align:center;">

        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span style="font-size:0.8rem;font-weight:700;color:var(--text-muted);">EJERCICIO ${exNum}/${totalEx}</span>
          <button id="sess-exit"
            style="background:none;border:1px solid var(--border);color:var(--text-muted);font-size:0.85rem;font-weight:700;cursor:pointer;padding:4px 10px;border-radius:8px;font-family:inherit;">Terminar</button>
        </div>

        <div style="height:4px;background:var(--border);border-radius:2px;margin-bottom:20px;">
          <div style="height:4px;background:linear-gradient(90deg,#7C3AED,#A78BFA);border-radius:2px;width:${progress}%;transition:width 0.4s;"></div>
        </div>

        <div style="font-size:0.72rem;font-weight:700;color:#A78BFA;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:6px;">Ejercicio actual</div>
        <h2 style="font-size:1.5rem;font-weight:900;letter-spacing:-0.04em;margin-bottom:4px;">${ex.name}</h2>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:4px;">Meta: ${ex.targetReps} reps</div>
        ${ex.weight > 0 ? `<div style="display:inline-flex;align-items:center;gap:5px;background:rgba(124,58,237,0.12);border:1px solid rgba(124,58,237,0.25);color:#A78BFA;font-size:0.8rem;font-weight:700;padding:3px 10px;border-radius:20px;margin-bottom:16px;"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6.5 6.5h11M6.5 17.5h11M12 6.5v11"/><rect x="2" y="4" width="4" height="16" rx="1"/><rect x="18" y="4" width="4" height="16" rx="1"/></svg> ${ex.weight} lbs</div>` : '<div style="margin-bottom:16px;"></div>'}

        <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px;">
          ${Array.from({length: totalSets}, (_, i) => {
            const st = ex.sets[i];
            const color = !st ? 'var(--border)'
              : st.status === 'done'    ? '#30D158'
              : st.status === 'partial' ? '#FFD60A'
              : '#FF453A';
            const label = i === s.currentSet && !st ? '→' : (st ? st.repsDone : i + 1);
            return `<div style="width:38px;height:38px;border-radius:50%;border:2px solid ${color};background:${st ? color + '22' : 'transparent'};display:flex;align-items:center;justify-content:center;font-size:0.78rem;font-weight:800;color:${color};">${label}</div>`;
          }).join('')}
        </div>

        <div style="background:var(--bg-card);border:1.5px solid var(--border);border-radius:20px;padding:20px;margin-bottom:20px;">
          <div style="font-size:0.9rem;font-weight:700;color:var(--text-secondary);margin-bottom:14px;">Serie ${setNum} de ${totalSets}</div>

          <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:10px;">¿Cuántas repeticiones hiciste?</div>
          <div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:18px;">
            <button id="reps-dec"
              style="width:48px;height:48px;border-radius:50%;border:2px solid var(--border);background:var(--bg-input);color:var(--text-primary);font-size:1.6rem;font-weight:700;cursor:pointer;font-family:inherit;">−</button>
            <div id="reps-value"
              style="font-size:3rem;font-weight:900;letter-spacing:-0.06em;min-width:70px;text-align:center;">${targetMin}</div>
            <button id="reps-inc"
              style="width:48px;height:48px;border-radius:50%;border:2px solid var(--border);background:var(--bg-input);color:var(--text-primary);font-size:1.6rem;font-weight:700;cursor:pointer;font-family:inherit;">+</button>
          </div>

          <div style="display:flex;gap:8px;">
            <button id="sess-skip"
              style="flex:1;padding:13px;border-radius:14px;border:1.5px solid var(--border);background:transparent;color:var(--text-muted);font-family:inherit;font-size:0.85rem;font-weight:700;cursor:pointer;">Saltar</button>
            <button id="sess-complete"
              style="flex:2;padding:13px;border-radius:14px;border:none;background:linear-gradient(135deg,#30D158,#34C759);color:#fff;font-family:inherit;font-size:0.95rem;font-weight:800;cursor:pointer;">Completada</button>
          </div>
        </div>

        <div style="font-size:0.72rem;color:var(--text-muted);font-weight:700;text-align:left;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:4px;">Siguiente</div>
        <div style="text-align:left;font-size:0.85rem;color:var(--text-secondary);font-weight:600;">
          ${s.exercises[s.currentEx + 1] ? `${s.currentEx + 2}. ${s.exercises[s.currentEx + 1].name}` : '<svg style="width:20px;height:20px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg> Fin de la rutina'}
        </div>
      </div>
    `;

    let repsVal = targetMin;
    const repsEl = document.getElementById('reps-value');

    document.getElementById('reps-dec').onclick = () => { repsVal = Math.max(0, repsVal - 1); repsEl.textContent = repsVal; };
    document.getElementById('reps-inc').onclick = () => { repsVal++; repsEl.textContent = repsVal; };

    document.getElementById('sess-complete').onclick = () => {
      ex.sets.push({ repsDone: repsVal, status: repsVal >= targetMin ? 'done' : 'partial' });
      this._advanceSession(s);
    };
    document.getElementById('sess-skip').onclick = () => {
      ex.sets.push({ repsDone: 0, status: 'skipped' });
      this._advanceSession(s);
    };
    document.getElementById('sess-exit').onclick = () => {
      if (confirm('¿Terminar la sesión ahora?')) this._showSessionSummary(s);
    };
  },

  _advanceSession(s) {
    // Haptic feedback — short pulse on set done
    if (navigator.vibrate) navigator.vibrate(60);
    const ex = s.exercises[s.currentEx];
    if (ex.sets.length >= ex.targetSets) {
      // Longer vibration when finishing an exercise
      if (navigator.vibrate) navigator.vibrate([60, 80, 60]);
      s._lastDirection = 'forward';
      s.currentEx++;
      s.currentSet = 0;
      this._renderSession(s);
      // Apply slide-in animation to overlay content
      requestAnimationFrame(() => {
        const el = document.querySelector('#routine-overlay .overlay-content');
        if (el) { el.classList.add('ex-slide-in'); setTimeout(() => el.classList.remove('ex-slide-in'), 350); }
      });
    } else {
      s.currentSet++;
      this._showRestTimer(ex.restSeconds, () => this._renderSession(s));
    }
  },

  _showRestTimer(seconds, onDone) {
    const overlay = document.getElementById('routine-overlay');
    let remaining = seconds;
    let timer;

    const render = () => {
      const pct = ((seconds - remaining) / seconds) * 283;
      overlay.innerHTML = `
        <div class="overlay-content" style="max-width:320px;text-align:center;">
          <div style="font-size:0.75rem;font-weight:700;color:#A78BFA;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:24px;">⏱ Descanso</div>

          <div style="position:relative;display:inline-flex;align-items:center;justify-content:center;margin-bottom:28px;">
            <svg viewBox="0 0 100 100" style="width:160px;height:160px;transform:rotate(-90deg);">
              <circle cx="50" cy="50" r="44" fill="none" stroke="var(--border)" stroke-width="6"/>
              <circle cx="50" cy="50" r="44" fill="none" stroke="#7C3AED" stroke-width="6"
                stroke-dasharray="276" stroke-dashoffset="${276 - (pct * 276 / 283)}" stroke-linecap="round"/>
            </svg>
            <div style="position:absolute;font-size:2.8rem;font-weight:900;letter-spacing:-0.06em;">
              ${remaining}<span style="font-size:1rem;color:var(--text-muted);">s</span>
            </div>
          </div>

          <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:24px;">Prepárate para la siguiente serie</div>
          <button id="rest-skip-btn" class="btn btn-secondary btn-full">Saltar descanso →</button>
        </div>
      `;
      Icons.init();
      document.getElementById('rest-skip-btn').onclick = () => { clearInterval(timer); onDone(); };
    };

    render();
    timer = setInterval(() => {
      remaining--;
      if (remaining <= 0) { clearInterval(timer); onDone(); }
      else render();
    }, 1000);
  },

  _showSessionSummary(s) {
    const overlay = document.getElementById('routine-overlay');
    const duration = Math.max(1, Math.round((Date.now() - s.startedAt) / 60000));
    let totalSets = 0, totalReps = 0;

    s.exercises.forEach(ex => {
      ex.sets.forEach(st => { totalSets++; totalReps += st.repsDone || 0; });
    });

    // Save session
    const fecha = new Date().toISOString().slice(0, 10);
    const sessions = JSON.parse(localStorage.getItem('fitpulse_gym_sessions') || '[]');
    sessions.push({ fecha, routineName: s.routineName, duration, totalSets, totalReps, exercises: s.exercises });
    localStorage.setItem('fitpulse_gym_sessions', JSON.stringify(sessions.slice(-90)));
    if (typeof Storage !== 'undefined' && Storage._syncToCloud) Storage._syncToCloud();

    overlay.innerHTML = `
      <div class="overlay-content" style="max-width:400px;text-align:center;">
        <div style="font-size:3.5rem;margin-bottom:10px;"><svg style="width:56px;height:56px;color:#FFD60A;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 010-5H6"/><path d="M18 9h1.5a2.5 2.5 0 000-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 006 6v0a6 6 0 006-6V2z"/></svg></div>
        <h2 style="font-size:1.5rem;font-weight:900;letter-spacing:-0.04em;margin-bottom:4px;">¡Sesión completada!</h2>
        <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:24px;">${s.routineName}</p>

        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:24px;">
          <div style="background:var(--bg-input);border-radius:14px;padding:16px 8px;">
            <div style="font-size:1.8rem;font-weight:900;">${duration}</div>
            <div style="font-size:0.7rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;margin-top:2px;">min</div>
          </div>
          <div style="background:var(--bg-input);border-radius:14px;padding:16px 8px;">
            <div style="font-size:1.8rem;font-weight:900;">${totalSets}</div>
            <div style="font-size:0.7rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;margin-top:2px;">series</div>
          </div>
          <div style="background:var(--bg-input);border-radius:14px;padding:16px 8px;">
            <div style="font-size:1.8rem;font-weight:900;">${totalReps}</div>
            <div style="font-size:0.7rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;margin-top:2px;">reps</div>
          </div>
        </div>

        <div style="text-align:left;display:flex;flex-direction:column;gap:8px;margin-bottom:24px;">
          ${s.exercises.map(ex => {
            const done  = ex.sets.filter(st => st.status === 'done').length;
            const skip  = ex.sets.filter(st => st.status === 'skipped').length;
            const color = ex.sets.length === 0 ? '#636366'
              : skip === ex.sets.length ? '#FF453A'
              : done === ex.targetSets   ? '#30D158'
              : '#FFD60A';
            const label = ex.sets.length === 0 ? 'SIN HACER'
              : skip === ex.sets.length ? 'SALTADO'
              : done === ex.targetSets  ? 'COMPLETO' : 'PARCIAL';
            return `
              <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg-input);border-radius:12px;border-left:3px solid ${color};">
                <div style="flex:1;">
                  <div style="font-weight:700;font-size:0.85rem;">${ex.name}</div>
                  <div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px;">${ex.sets.length > 0 ? ex.sets.map(st => st.repsDone + ' rep').join(' · ') : '—'}</div>
                </div>
                <div style="font-size:0.72rem;font-weight:800;color:${color};">${label}</div>
              </div>`;
          }).join('')}
        </div>

        <div style="display:flex;gap:8px;margin-top:0;">
          <button id="sess-share" class="btn btn-secondary" style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Compartir
          </button>
          <button id="sess-finish" class="btn btn-primary" style="flex:2;">Cerrar y guardar</button>
        </div>
      </div>
    `;
    overlay.classList.add('active');
    Icons.init();

    document.getElementById('sess-share')?.addEventListener('click', () => {
      this._shareSession({ routineName: s.routineName, duration, totalSets, totalReps, exercises: s.exercises });
    });

    document.getElementById('sess-finish').onclick = () => {
      // Save completed session to history
      this.saveSession({
        routineId: s.routineId,
        routineName: s.routineName,
        startedAt: s.startedAt,
        endedAt: Date.now(),
        exercises: s.exercises
      });
      // Auto-mark gym checklist item for today
      try {
        const today = Storage.today();
        const cl = Storage.obtenerChecklist(today) || { checked: [], pct: 0 };
        if (!cl.checked.includes('gym')) {
          cl.checked.push('gym');
          cl.pct = Math.round((cl.checked.length / 10) * 100);
          Storage.guardarChecklist(today, cl);
        }
      } catch(e) {}
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
      <div class="overlay-content" style="max-width:520px;width:100%;max-height:90vh;overflow-y:auto;overflow-x:hidden;text-align:left;box-sizing:border-box;">
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

    overlay.classList.add('active');
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

      overlay.classList.remove('active');
      this._render();
      if (typeof showToast === 'function') showToast(isNew ? 'Rutina creada' : 'Cambios guardados');
    });

    document.getElementById('editor-close').onclick = () => overlay.classList.remove('active');
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
