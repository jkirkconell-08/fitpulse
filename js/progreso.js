/* =========================================================
   FitPulse - Progreso: Peso (sparkline) + Semana (delegado)
   Reemplaza js/charts.js (Chart.js) por SVG dibujado a mano.
   ========================================================= */

const ProgresoPage = {
  init() {
    this._renderPesoTab();
    if (typeof Medidas !== 'undefined') Medidas.init();
    if (typeof Historial !== 'undefined') Historial.init();
    this._renderSemanaResumen();
  },

  _buildSparkline(registros, meta) {
    const W = 340, H = 120, PAD = 10;
    if (registros.length === 0) return '';
    const pesos = registros.map(r => r.peso);
    const min = Math.min(...pesos, meta) - 1;
    const max = Math.max(...pesos, meta) + 1;
    const range = max - min || 1;
    const stepX = registros.length > 1 ? (W - PAD * 2) / (registros.length - 1) : 0;
    const yFor = (p) => H - PAD - ((p - min) / range) * (H - PAD * 2);
    const points = registros.map((r, i) => [PAD + i * stepX, yFor(r.peso)]);
    const path = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
    const metaY = yFor(meta).toFixed(1);
    const last = points[points.length - 1];
    return `
      <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:120px;display:block;">
        <path class="meta-line" d="M${PAD},${metaY} L${W - PAD},${metaY}"></path>
        <path class="line" d="${path}"></path>
        <circle class="dot" cx="${last[0]}" cy="${last[1]}" r="4.5"></circle>
      </svg>
    `;
  },

  _renderPesoTab() {
    const container = document.getElementById('peso-tab-container');
    if (!container) return;
    const config = Storage.obtenerConfig();
    const data = Storage.obtenerPesos();
    const registros = data.registros;
    const pesoActual = registros.length > 0 ? registros[registros.length - 1].peso : config.pesoInicial;
    const pesoAnterior = registros.length > 1 ? registros[registros.length - 2].peso : pesoActual;
    const delta = (pesoActual - pesoAnterior);
    const pesoInicial = config.pesoInicial || pesoActual;
    const meta = config.meta || pesoActual;
    const totalPerder = Math.abs(pesoInicial - meta);
    const progreso = totalPerder > 0 ? Math.max(0, Math.min(100, (Math.abs(pesoInicial - pesoActual) / totalPerder) * 100)) : 0;
    const faltaMeta = (pesoActual - meta).toFixed(1);

    container.innerHTML = `
      <div class="hero-card">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:14px;">
          <div>
            <div class="font-mono" style="font-size:11px;color:var(--text-muted);margin-bottom:4px;">PESO ACTUAL</div>
            <div class="font-display" style="font-size:44px;line-height:1;">${pesoActual}<span style="font-size:18px;color:var(--text-muted);"> kg</span></div>
          </div>
          ${registros.length > 1 ? `<div class="font-mono" style="font-size:13px;font-weight:700;color:${delta <= 0 ? 'var(--lime)' : 'var(--danger)'};">${delta > 0 ? '+' : ''}${delta.toFixed(1)} kg</div>` : ''}
        </div>
        <div class="sparkline-card" style="padding:8px 0;background:transparent;border:none;">
          ${this._buildSparkline(registros, meta)}
        </div>
      </div>

      <div class="sparkline-card" style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);margin-bottom:8px;">
          <span>Hacia la meta</span><span class="font-mono">${progreso.toFixed(0)}%</span>
        </div>
        <div style="height:10px;border-radius:999px;background:var(--border);overflow:hidden;">
          <div style="width:${progreso}%;height:100%;border-radius:999px;background:linear-gradient(90deg,var(--brand),var(--lime));"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-top:6px;">
          <span>${pesoInicial} kg inicio</span><span>Meta ${meta} kg${parseFloat(faltaMeta) !== 0 ? ` · faltan ${Math.abs(faltaMeta)} kg` : ' · ¡lograda!'}</span>
        </div>
      </div>

      <div class="sparkline-card" style="margin-bottom:12px;">
        <h3 style="font-size:0.95rem;margin-bottom:12px;">Registrar peso</h3>
        <div style="display:flex;gap:10px;">
          <input type="number" id="peso-input" step="0.1" placeholder="Ej: 85.5" inputmode="decimal"
            style="flex:1;padding:12px 14px;border:1.5px solid var(--border-strong);border-radius:12px;background:var(--bg-input);color:var(--text-primary);font-family:inherit;font-size:1rem;outline:none;">
          <button id="btn-registrar-peso" class="btn-lime" style="padding:0 20px;border:none;border-radius:12px;cursor:pointer;font-size:15px;">Guardar</button>
        </div>
      </div>

      <div id="peso-historial-list"></div>
    `;

    document.getElementById('btn-registrar-peso').addEventListener('click', () => {
      const input = document.getElementById('peso-input');
      const peso = parseFloat(input.value);
      if (isNaN(peso) || peso < 20 || peso > 400) { showToast('Ingresa un peso válido (20-400 kg)', 'warning'); return; }
      Storage.guardarPeso(Storage.today(), peso);
      showToast(`Peso registrado: ${peso} kg`);
      this._renderPesoTab();
    });
    document.getElementById('peso-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') document.getElementById('btn-registrar-peso').click();
    });

    this._renderPesoHistorial(registros);

    if (location.hash.includes('openForm')) {
      setTimeout(() => document.getElementById('peso-input')?.focus(), 100);
    }
  },

  _renderPesoHistorial(registros) {
    const el = document.getElementById('peso-historial-list');
    if (!el) return;
    const rev = [...registros].reverse();
    el.innerHTML = rev.slice(0, 15).map((r, idx) => {
      const origIdx = registros.length - 1 - idx;
      const prev = origIdx > 0 ? registros[origIdx - 1] : null;
      const diff = prev ? (r.peso - prev.peso).toFixed(1) : null;
      const diffColor = diff === null ? 'var(--text-muted)' : parseFloat(diff) < 0 ? 'var(--lime)' : parseFloat(diff) > 0 ? 'var(--danger)' : 'var(--text-muted)';
      const d = new Date(r.fecha + 'T12:00:00');
      const fechaStr = d.toLocaleDateString('es', { day: 'numeric', month: 'short', year: 'numeric' });
      return `
        <div class="stat-tile" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div><div style="font-weight:700;font-size:0.9rem;">${r.peso} kg</div><div style="font-size:0.75rem;color:var(--text-muted);margin-top:2px;">${fechaStr}</div></div>
          <div style="font-size:0.82rem;font-weight:700;color:${diffColor};">${diff !== null ? (parseFloat(diff) > 0 ? '+' : '') + diff + ' kg' : 'Inicial'}</div>
        </div>`;
    }).join('');
  },

  _renderSemanaResumen() {
    const el = document.getElementById('semana-resumen-container');
    if (!el) return;
    const semana = Storage.obtenerDatosSemana();
    const DIAS_CORTO = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
    const hoy = Storage.today();
    const maxCal = Math.max(...semana.dias.map(d => d.cal), 1);

    el.innerHTML = `
      <div class="sparkline-card" style="margin-bottom:12px;">
        <div class="font-mono" style="font-size:11px;color:var(--text-muted);margin-bottom:12px;">CALORÍAS ESTA SEMANA</div>
        <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:6px;height:90px;">
          ${semana.dias.map(d => {
            const h = Math.max(4, Math.round((d.cal / maxCal) * 80));
            const over = d.cal > 0 && semana.promedioCal > 0 && d.cal > (Storage.obtenerConfig().metaCal || 2200);
            return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;height:100%;justify-content:flex-end;">
              <div style="width:100%;height:${h}px;border-radius:4px;background:${over ? 'var(--danger)' : 'var(--lime)'};"></div>
              <span class="font-mono" style="font-size:9px;color:${d.fecha === hoy ? 'var(--lime)' : 'var(--text-muted)'};font-weight:${d.fecha === hoy ? '800' : '600'};">${DIAS_CORTO[d.diaSemana]}</span>
            </div>`;
          }).join('')}
        </div>
      </div>
      <div class="sparkline-card" style="margin-bottom:20px;">
        <div class="font-mono" style="font-size:11px;color:var(--text-muted);margin-bottom:12px;">CUMPLIMIENTO</div>
        <div style="display:flex;gap:6px;">
          ${semana.dias.map(d => {
            const color = d.cumplimiento >= 80 ? 'var(--lime)' : d.cumplimiento >= 50 ? 'var(--amber)' : d.cumplimiento > 0 ? 'var(--danger)' : 'var(--text-dim)';
            return `<div style="flex:1;text-align:center;">
              <div class="font-mono" style="font-size:11px;font-weight:700;padding:8px 0;border-radius:8px;background:${color}22;color:${color};">${d.cumplimiento || '–'}</div>
              <span class="font-mono" style="font-size:9px;color:var(--text-muted);display:block;margin-top:4px;">${DIAS_CORTO[d.diaSemana]}</span>
            </div>`;
          }).join('')}
        </div>
      </div>
      <div class="font-mono" style="font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--text-muted);margin-bottom:10px;">Últimos 30 días</div>
    `;
  }
};
