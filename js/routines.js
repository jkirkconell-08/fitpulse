/* =========================================================
   FitPulse - Rutinas Personalizadas
   CRUD completo: crear, editar, eliminar rutinas
   ========================================================= */

const DEFAULT_ROUTINES = [
  {
    id: 'default_push', name: 'Push Day', icon: '💪',
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
    id: 'default_pull', name: 'Pull Day', icon: '🔙',
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
    id: 'default_legs', name: 'Leg Day', icon: '🦵',
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

  // ---- CRUD ----

  getAll() {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (raw !== null) {
      // Key exists — return whatever is stored (even empty array)
      try { return JSON.parse(raw); } catch {}
    }
    // Key never set → first time, load defaults
    return this._initDefaults();
  },

  _initDefaults() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(DEFAULT_ROUTINES));
    Storage._syncToCloud?.();
    return DEFAULT_ROUTINES;
  },

  getById(id) {
    return this.getAll().find(r => r.id === id) || null;
  },

  save(routine) {
    const all = this.getAll();
    const idx = all.findIndex(r => r.id === routine.id);
    if (idx >= 0) {
      all[idx] = routine;
    } else {
      all.push(routine);
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(all));
    Storage._syncToCloud?.();
    return routine;
  },

  create(data) {
    const routine = {
      id: 'routine_' + Date.now(),
      name: data.name || 'Nueva Rutina',
      icon: data.icon || '💪',
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
    Storage._syncToCloud?.();
  },

  // ---- UI ----

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
      <div class="workout-categories" id="routines-list">
        ${all.map(r => this._routineCard(r)).join('')}
      </div>
    `;

    document.getElementById('btn-new-routine').addEventListener('click', () => this.openEditor(null));

    container.querySelectorAll('.routine-edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        this.openEditor(btn.dataset.id);
      });
    });

    container.querySelectorAll('.routine-del-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault(); e.stopPropagation();
        if (confirm('¿Eliminar esta rutina?')) {
          this.delete(btn.dataset.id);
          this._render();
          showToast('Rutina eliminada');
        }
      });
    });

    container.querySelectorAll('.workout-cat-card[data-id]').forEach(card => {
      card.addEventListener('click', () => this.openDetail(card.dataset.id));
    });
  },

  _routineCard(r) {
    const DIAS = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
    const diasStr = r.dias.length > 0 ? r.dias.map(d => DIAS[d]).join(' · ') : 'Sin días';
    return `
      <div class="workout-cat-card ${r.gradient}" data-id="${r.id}" style="cursor:pointer;">
        <div class="cat-bg"></div>
        <div class="cat-body">
          <div class="cat-name">${r.icon} ${r.name}</div>
          <div class="cat-count">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M6.5 6.5h11M6.5 17.5h11M12 6.5v11"/>
              <rect x="2" y="4" width="4" height="16" rx="1"/>
              <rect x="18" y="4" width="4" height="16" rx="1"/>
            </svg>
            ${r.exercises.length} ejercicios · ${diasStr}
          </div>
        </div>
        <div style="position:absolute;top:10px;right:10px;z-index:3;display:flex;gap:6px;">
          <button class="routine-edit-btn" data-id="${r.id}"
            style="background:rgba(0,0,0,0.35);border:none;color:#fff;width:32px;height:32px;border-radius:8px;font-size:0.9rem;cursor:pointer;backdrop-filter:blur(4px);">✏️</button>
          <button class="routine-del-btn" data-id="${r.id}"
            style="background:rgba(0,0,0,0.35);border:none;color:#fff;width:32px;height:32px;border-radius:8px;font-size:0.9rem;cursor:pointer;backdrop-filter:blur(4px);">🗑️</button>
        </div>
      </div>
    `;
  },

  openDetail(id) {
    const routine = this.getById(id);
    if (!routine) return;
    const overlay = document.getElementById('routine-overlay');
    if (!overlay) return;

    overlay.innerHTML = `
      <div class="overlay-content" style="max-width:500px;max-height:90vh;overflow-y:auto;text-align:left;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h2 style="font-size:1.1rem;font-weight:800;">${routine.icon} ${routine.name}</h2>
          <button id="detail-close" style="background:none;border:none;color:var(--text-muted);font-size:1.5rem;cursor:pointer;">✕</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${routine.exercises.map((ex, i) => `
            <div style="display:flex;align-items:center;gap:12px;padding:12px;background:var(--bg-input);border-radius:12px;">
              <div style="width:36px;height:36px;background:linear-gradient(135deg,#4776E6,#8E54E9);border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:0.85rem;flex-shrink:0;">${i+1}</div>
              <div style="flex:1;">
                <div style="font-weight:700;font-size:0.9rem;">${ex.name}</div>
                <div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">${ex.sets} series &times; ${ex.reps} reps · ${ex.rest}s descanso</div>
              </div>
            </div>
          `).join('')}
        </div>
        <button id="btn-start-routine" class="btn btn-primary btn-full" style="margin-top:20px;">
          ▶ Iniciar sesión de gym
        </button>
      </div>
    `;

    overlay.classList.add('active');
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
      showToast('Esta rutina no tiene ejercicios', 'warning');
      return;
    }

    // Session state
    const session = {
      routineId,
      routineName: routine.name,
      startedAt: Date.now(),
      exercises: routine.exercises.map(ex => ({
        name: ex.name,
        targetSets: parseInt(ex.sets) || 3,
        targetReps: ex.reps,
        restSeconds: parseInt(ex.rest) || 60,
        sets: [] // { repsTarget, repsDone, status: 'done'|'partial'|'skipped' }
      })),
      currentEx: 0,
      currentSet: 0
    };

    this._renderSession(session);
  },

  _renderSession(s) {
    const overlay = document.getElementById('routine-overlay');

    const isFinished = s.currentEx >= s.exercises.length;
    if (isFinished) { this._showSessionSummary(s); return; }

    const ex  = s.exercises[s.currentEx];
    const setNum = s.currentSet + 1;
    const totalSets = ex.targetSets;
    const exNum  = s.currentEx + 1;
    const totalEx = s.exercises.length;
    const progress = Math.round(((s.currentEx) / totalEx) * 100);

    overlay.classList.add('active');
    overlay.innerHTML = `
      <div class="overlay-content" style="max-width:420px;text-align:center;">

        <!-- Top bar -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span style="font-size:0.8rem;font-weight:700;color:var(--text-muted);">EJERCICIO ${exNum}/${totalEx}</span>
          <button id="sess-exit"
            style="background:none;border:none;color:var(--text-muted);font-size:0.85rem;font-weight:700;cursor:pointer;padding:4px 8px;border-radius:8px;border:1px solid var(--border);">Terminar</button>
        </div>

        <!-- Progress bar -->
        <div style="height:4px;background:var(--border);border-radius:2px;margin-bottom:20px;">
          <div style="height:4px;background:linear-gradient(90deg,#7C3AED,#A78BFA);border-radius:2px;width:${progress}%;transition:width 0.4s;"></div>
        </div>

        <!-- Exercise name -->
        <div style="font-size:0.75rem;font-weight:700;color:#A78BFA;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Ejercicio actual</div>
        <h2 style="font-size:1.5rem;font-weight:900;letter-spacing:-0.04em;margin-bottom:4px;">${ex.name}</h2>
        <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:24px;">Meta: ${ex.targetReps} reps</div>

        <!-- Set indicator -->
        <div style="display:flex;justify-content:center;gap:8px;margin-bottom:24px;">
          ${Array.from({length: totalSets}, (_, i) => {
            const st = ex.sets[i];
            const color = !st ? 'var(--border)'
              : st.status === 'done'    ? '#30D158'
              : st.status === 'partial' ? '#FFD60A'
              : '#FF453A';
            return `<div style="width:36px;height:36px;border-radius:50%;border:2px solid ${color};background:${st ? color+'22' : 'transparent'};display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:800;color:${color};">${i === s.currentSet && !st ? '→' : (st?.repsDone ?? i+1)}</div>`;
          }).join('')}
        </div>

        <!-- Current set card -->
        <div style="background:var(--bg-card);border:1.5px solid var(--border);border-radius:20px;padding:20px;margin-bottom:20px;">
          <div style="font-size:1rem;font-weight:700;color:var(--text-secondary);margin-bottom:14px;">Serie ${setNum} de ${totalSets}</div>

          <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:8px;">¿Cuántas repeticiones hiciste?</div>
          <div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:16px;">
            <button id="reps-dec"
              style="width:44px;height:44px;border-radius:50%;border:2px solid var(--border);background:var(--bg-input);color:var(--text-primary);font-size:1.5rem;font-weight:700;cursor:pointer;">−</button>
            <div id="reps-value"
              style="font-size:2.8rem;font-weight:900;letter-spacing:-0.06em;min-width:60px;text-align:center;">${ex.targetReps.split('-')[0] || ex.targetReps}</div>
            <button id="reps-inc"
              style="width:44px;height:44px;border-radius:50%;border:2px solid var(--border);background:var(--bg-input);color:var(--text-primary);font-size:1.5rem;font-weight:700;cursor:pointer;">+</button>
          </div>

          <!-- Action buttons -->
          <div style="display:flex;gap:8px;">
            <button id="sess-skip"
              style="flex:1;padding:12px;border-radius:14px;border:1.5px solid var(--border);background:transparent;color:var(--text-muted);font-family:inherit;font-size:0.85rem;font-weight:700;cursor:pointer;">Saltar</button>
            <button id="sess-complete"
              style="flex:2;padding:12px;border-radius:14px;border:none;background:linear-gradient(135deg,#30D158,#34C759);color:#fff;font-family:inherit;font-size:0.95rem;font-weight:800;cursor:pointer;">✓ Completada</button>
          </div>
        </div>

        <!-- Rest of exercises mini preview -->
        <div style="font-size:0.75rem;color:var(--text-muted);font-weight:600;text-align:left;margin-bottom:6px;">SIGUIENTE</div>
        <div style="text-align:left;font-size:0.85rem;color:var(--text-secondary);font-weight:600;">
          ${s.exercises[s.currentEx + 1] ? `${s.currentEx + 2}. ${s.exercises[s.currentEx + 1].name}` : '🏁 Fin de la rutina'}
        </div>
      </div>
    `;

    // Reps counter
    let targetMin = parseInt((ex.targetReps + '').split('-')[0]) || 10;
    let repsVal = targetMin;
    const repsEl = document.getElementById('reps-value');

    document.getElementById('reps-dec').onclick = () => {
      repsVal = Math.max(0, repsVal - 1);
      repsEl.textContent = repsVal;
    };
    document.getElementById('reps-inc').onclick = () => {
      repsVal = repsVal + 1;
      repsEl.textContent = repsVal;
    };

    // Complete set
    document.getElementById('sess-complete').onclick = () => {
      ex.sets.push({ repsDone: repsVal, status: repsVal >= targetMin ? 'done' : 'partial' });
      this._advanceSession(s);
    };

    // Skip set
    document.getElementById('sess-skip').onclick = () => {
      ex.sets.push({ repsDone: 0, status: 'skipped' });
      this._advanceSession(s);
    };

    // Exit early
    document.getElementById('sess-exit').onclick = () => {
      if (confirm('¿Terminar la sesión ahora?')) {
        this._showSessionSummary(s);
      }
    };
  },

  _advanceSession(s) {
    const ex = s.exercises[s.currentEx];
    const doneAllSets = ex.sets.length >= ex.targetSets;

    if (doneAllSets) {
      // Move to next exercise
      s.currentEx++;
      s.currentSet = 0;
      this._renderSession(s);
    } else {
      // Show rest timer then next set
      s.currentSet++;
      this._showRestTimer(ex.restSeconds, () => this._renderSession(s));
    }
  },

  _showRestTimer(seconds, onDone) {
    const overlay = document.getElementById('routine-overlay');
    let remaining = seconds;

    const render = () => {
      const pct = ((seconds - remaining) / seconds) * 283; // circumference
      overlay.innerHTML = `
        <div class="overlay-content" style="max-width:320px;text-align:center;">
          <div style="font-size:0.8rem;font-weight:700;color:#A78BFA;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:20px;">Descanso</div>

          <svg viewBox="0 0 100 100" style="width:160px;height:160px;transform:rotate(-90deg);margin-bottom:16px;">
            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" stroke-width="6"/>
            <circle cx="50" cy="50" r="45" fill="none" stroke="#7C3AED" stroke-width="6"
              stroke-dasharray="283" stroke-dashoffset="${283 - pct}" stroke-linecap="round"
              style="transition:stroke-dashoffset 0.9s linear;"/>
          </svg>

          <div style="font-size:3.5rem;font-weight:900;letter-spacing:-0.06em;margin-top:-120px;margin-bottom:90px;">${remaining}<span style="font-size:1rem;color:var(--text-muted);">s</span></div>

          <div style="font-size:0.9rem;color:var(--text-muted);margin-bottom:24px;">Prepárate para la siguiente serie</div>

          <button id="rest-skip-btn" class="btn btn-secondary btn-full">Saltar descanso →</button>
        </div>
      `;
      document.getElementById('rest-skip-btn').onclick = () => {
        clearInterval(timer);
        onDone();
      };
    };

    render();
    const timer = setInterval(() => {
      remaining--;
      if (remaining <= 0) { clearInterval(timer); onDone(); }
      else render();
    }, 1000);
  },

  _showSessionSummary(s) {
    const overlay = document.getElementById('routine-overlay');
    const duration = Math.round((Date.now() - s.startedAt) / 60000);
    let totalSets = 0, totalReps = 0, skipped = 0;

    s.exercises.forEach(ex => {
      ex.sets.forEach(st => {
        totalSets++;
        totalReps += st.repsDone || 0;
        if (st.status === 'skipped') skipped++;
      });
    });

    // Save to localStorage
    const fecha = new Date().toISOString().slice(0, 10);
    const sessions = JSON.parse(localStorage.getItem('fitpulse_gym_sessions') || '[]');
    sessions.push({ fecha, routineName: s.routineName, duration, totalSets, totalReps, exercises: s.exercises });
    localStorage.setItem('fitpulse_gym_sessions', JSON.stringify(sessions.slice(-90)));
    if (typeof Storage !== 'undefined' && Storage._syncToCloud) Storage._syncToCloud();

    overlay.innerHTML = `
      <div class="overlay-content" style="max-width:400px;text-align:center;">
        <div style="font-size:3rem;margin-bottom:12px;">🏆</div>
        <h2 style="font-size:1.4rem;font-weight:900;letter-spacing:-0.04em;margin-bottom:4px;">¡Sesión completada!</h2>
        <p style="color:var(--text-muted);font-size:0.85rem;margin-bottom:24px;">${s.routineName}</p>

        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:24px;">
          <div style="background:var(--bg-input);border-radius:14px;padding:14px 8px;">
            <div style="font-size:1.6rem;font-weight:900;">${duration}</div>
            <div style="font-size:0.7rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;">min</div>
          </div>
          <div style="background:var(--bg-input);border-radius:14px;padding:14px 8px;">
            <div style="font-size:1.6rem;font-weight:900;">${totalSets}</div>
            <div style="font-size:0.7rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;">series</div>
          </div>
          <div style="background:var(--bg-input);border-radius:14px;padding:14px 8px;">
            <div style="font-size:1.6rem;font-weight:900;">${totalReps}</div>
            <div style="font-size:0.7rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;">reps</div>
          </div>
        </div>

        <!-- Per exercise summary -->
        <div style="text-align:left;display:flex;flex-direction:column;gap:8px;margin-bottom:24px;">
          ${s.exercises.map(ex => {
            const done  = ex.sets.filter(st => st.status === 'done').length;
            const part  = ex.sets.filter(st => st.status === 'partial').length;
            const skip  = ex.sets.filter(st => st.status === 'skipped').length;
            const color = skip === ex.sets.length ? '#FF453A' : done + part === 0 ? '#636366' : done === ex.sets.length ? '#30D158' : '#FFD60A';
            return `
              <div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg-input);border-radius:12px;border-left:3px solid ${color};">
                <div style="flex:1;">
                  <div style="font-weight:700;font-size:0.85rem;">${ex.name}</div>
                  <div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px;">${ex.sets.map(st => st.repsDone+'rep').join(' · ') || 'Sin series'}</div>
                </div>
                <div style="font-size:0.75rem;font-weight:700;color:${color};">${skip===ex.sets.length?'SALTADO':done===ex.targetSets?'✓ COMPLETO':'PARCIAL'}</div>
              </div>`;
          }).join('')}
        </div>

        <button id="sess-finish" class="btn btn-primary btn-full">Cerrar</button>
      </div>
    `;
    overlay.classList.add('active');
    document.getElementById('sess-finish').onclick = () => overlay.classList.remove('active');
  }
};

  openEditor(id) {
    const routine = id ? this.getById(id) : null;
    const isNew = !routine;
    const GRADIENTS = [
      { id: 'cat-coral',  name: '🔴 Coral' },
      { id: 'cat-teal',   name: '🟢 Teal' },
      { id: 'cat-blue',   name: '🔵 Azul' },
      { id: 'cat-purple', name: '🟣 Violeta' },
      { id: 'cat-orange', name: '🟠 Naranja' },
      { id: 'cat-navy',   name: '⚓ Navy' },
    ];
    const ICONS = ['💪','🏋️','🦵','🔙','🏃','⚡','🔥','🎯','🥊','🤸'];

    const overlay = document.getElementById('routine-overlay');
    overlay.innerHTML = `
      <div class="overlay-content" style="max-width:520px;max-height:90vh;overflow-y:auto;text-align:left;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h2 style="font-size:1.1rem;font-weight:800;">${isNew ? '➕ Nueva Rutina' : '✏️ Editar Rutina'}</h2>
          <button id="editor-close" style="background:none;border:none;color:var(--text-muted);font-size:1.5rem;cursor:pointer;">✕</button>
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
                <button class="icon-btn" data-icon="${ic}"
                  style="width:44px;height:44px;border-radius:10px;border:2px solid ${routine?.icon===ic?'#7C3AED':'var(--border)'};background:${routine?.icon===ic?'rgba(124,58,237,0.15)':'var(--bg-input)'};font-size:1.3rem;cursor:pointer;transition:all 0.15s;">${ic}</button>
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
            <label style="font-size:0.78rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">Días</label>
            <div style="display:flex;gap:6px;" id="ed-dias">
              ${['D','L','M','X','J','V','S'].map((d,i) => `
                <button class="ed-dia-btn" data-dia="${i}"
                  style="flex:1;padding:10px 0;border-radius:10px;border:1.5px solid ${routine?.dias?.includes(i)?'#7C3AED':'var(--border)'};background:${routine?.dias?.includes(i)?'rgba(124,58,237,0.2)':'var(--bg-input)'};color:${routine?.dias?.includes(i)?'#A78BFA':'var(--text-muted)'};font-weight:700;font-size:0.78rem;cursor:pointer;transition:all 0.15s;">${d}</button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Exercises -->
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
          ${isNew ? '✅ Crear Rutina' : '💾 Guardar Cambios'}
        </button>
      </div>
    `;

    overlay.classList.add('active');

    // State
    let selectedIcon = routine?.icon || '💪';
    let selectedDias = [...(routine?.dias || [])];

    // Icon selection
    overlay.querySelectorAll('.icon-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        selectedIcon = btn.dataset.icon;
        overlay.querySelectorAll('.icon-btn').forEach(b => {
          b.style.borderColor = b.dataset.icon === selectedIcon ? '#7C3AED' : 'var(--border)';
          b.style.background = b.dataset.icon === selectedIcon ? 'rgba(124,58,237,0.15)' : 'var(--bg-input)';
        });
      });
    });

    // Day selection
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

    // Add exercise
    document.getElementById('btn-add-ex').addEventListener('click', () => {
      const list = document.getElementById('ed-exercises');
      const idx = list.children.length;
      const div = document.createElement('div');
      div.innerHTML = this._exerciseRow({ name: '', sets: 3, reps: '10-12', rest: 60 }, idx);
      list.appendChild(div.firstElementChild);
      this._bindRemoveEx(list.lastElementChild);
    });

    // Bind existing remove buttons
    overlay.querySelectorAll('.btn-remove-ex').forEach(btn => this._bindRemoveEx(btn.parentElement));

    // Save
    document.getElementById('btn-save-routine').addEventListener('click', () => {
      const name = document.getElementById('ed-name').value.trim();
      if (!name) { document.getElementById('ed-name').focus(); showToast('Escribe un nombre', 'warning'); return; }

      const gradient = document.getElementById('ed-gradient').value;
      const exercises = [];
      overlay.querySelectorAll('.ex-row').forEach(row => {
        const n = row.querySelector('.ex-name').value.trim();
        if (n) exercises.push({
          name: n,
          sets: parseInt(row.querySelector('.ex-sets').value) || 3,
          reps: row.querySelector('.ex-reps').value || '10-12',
          rest: parseInt(row.querySelector('.ex-rest').value) || 60
        });
      });

      const data = { name, icon: selectedIcon, gradient, dias: selectedDias, exercises };
      if (isNew) this.create(data);
      else this.update(id, data);

      overlay.classList.remove('active');
      this._render();
      showToast(isNew ? '✅ Rutina creada' : '✅ Cambios guardados');
    });

    document.getElementById('editor-close').onclick = () => overlay.classList.remove('active');
  },

  _exerciseRow(ex, i) {
    return `
      <div class="ex-row" style="background:var(--bg-input);border-radius:12px;padding:12px;display:grid;grid-template-columns:1fr auto;gap:8px;align-items:start;">
        <div style="display:flex;flex-direction:column;gap:6px;">
          <input class="ex-name" type="text" value="${ex.name}" placeholder="Nombre del ejercicio"
            style="border:1.5px solid var(--border);border-radius:8px;padding:8px 10px;background:var(--bg-card);color:var(--text-primary);font-family:inherit;font-size:0.85rem;outline:none;width:100%;">
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">
            <input class="ex-sets" type="number" value="${ex.sets}" placeholder="Series" min="1"
              style="border:1.5px solid var(--border);border-radius:8px;padding:7px 8px;background:var(--bg-card);color:var(--text-primary);font-family:inherit;font-size:0.8rem;outline:none;text-align:center;">
            <input class="ex-reps" type="text" value="${ex.reps}" placeholder="Reps"
              style="border:1.5px solid var(--border);border-radius:8px;padding:7px 8px;background:var(--bg-card);color:var(--text-primary);font-family:inherit;font-size:0.8rem;outline:none;text-align:center;">
            <input class="ex-rest" type="number" value="${ex.rest}" placeholder="Desc(s)" min="0"
              style="border:1.5px solid var(--border);border-radius:8px;padding:7px 8px;background:var(--bg-card);color:var(--text-primary);font-family:inherit;font-size:0.8rem;outline:none;text-align:center;">
          </div>
        </div>
        <button class="btn-remove-ex"
          style="background:rgba(255,69,58,0.1);border:1px solid rgba(255,69,58,0.2);color:#FF453A;width:32px;height:32px;border-radius:8px;font-size:0.9rem;cursor:pointer;flex-shrink:0;margin-top:2px;">✕</button>
      </div>
    `;
  },

  _bindRemoveEx(rowEl) {
    const btn = rowEl?.querySelector?.('.btn-remove-ex');
    if (btn) btn.addEventListener('click', () => rowEl.remove());
  }
};
