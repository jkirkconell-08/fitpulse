/* =========================================================
   FitPulse - Dashboard Semanal
   ========================================================= */

const Dashboard = {
  init() {
    initDarkMode();
    if (typeof DemoData !== 'undefined') DemoData.load();
    this._render();
    if (typeof DemoData !== 'undefined') DemoData.showBanner();
    if (typeof showLinkAccountBanner !== 'undefined') showLinkAccountBanner();
  },

  _render() {
    const container = document.getElementById('dashboard-container');
    if (!container) return;

    const config = Storage.obtenerConfig();
    const datos = Storage.obtenerDatosSemana();
    const pesos = Storage.obtenerPesos();
    const lastPeso = pesos.registros[pesos.registros.length - 1];
    const racha = Storage.calcularRacha();
    const hoy = Storage.today();
    const aguaHoy = Storage.obtenerAgua(hoy);
    const comidasHoy = Storage.obtenerComidas(hoy);
    const calHoy = Math.round((comidasHoy.comidas || []).reduce((s, c) => s + (c.cal * c.cantidad), 0));

    const DIAS_MINI = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

    container.innerHTML = `
      <!-- Saludo -->
      <div class="dash-greeting fade-in">
        <h2>Hola, ${this._getDisplayName(config)} <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#A78BFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline;vertical-align:middle;"><path d="M18 11.5V9a2 2 0 00-2-2v0a2 2 0 00-2 2v1M14 10V8a2 2 0 00-2-2v0a2 2 0 00-2 2v2m0 0V5a2 2 0 00-2-2v0a2 2 0 00-2 2v9"/><path d="M6 14v0a6 6 0 006 6h2a6 6 0 006-6v-3"/></svg></h2>
        <p>${this._getGreetingMsg()}</p>
      </div>

      <!-- Resumen rápido de hoy -->
      <div class="dash-today fade-in">
        <div class="dash-today-grid">
          <div class="dash-metric">
            <div class="dash-metric-circle cal">
              <span>${calHoy}</span>
            </div>
            <div class="dash-metric-label">kcal hoy</div>
          </div>
          <div class="dash-metric">
            <div class="dash-metric-circle water">
              <span>${aguaHoy.vasos}/${aguaHoy.meta}</span>
            </div>
            <div class="dash-metric-label">vasos agua</div>
          </div>
          <div class="dash-metric">
            <div class="dash-metric-circle streak">
              <span>${racha}</span>
            </div>
            <div class="dash-metric-label">racha</div>
          </div>
          <div class="dash-metric">
            <div class="dash-metric-circle weight">
              <span>${lastPeso.peso}</span>
            </div>
            <div class="dash-metric-label">kg actual</div>
          </div>
        </div>
      </div>

      <!-- Semana: calorías -->
      <div class="dash-card fade-in">
        <div class="dash-card-header">
          <h3><i data-lucide="bar-chart-2" class="icon" style="width:18px;height:18px;margin-right:6px;"></i>Calorías de la semana</h3>
          <span class="dash-card-badge">Prom: ${datos.promedioCal} kcal</span>
        </div>
        <div class="dash-bar-chart" id="cal-bars">
          ${datos.dias.map((d, i) => {
            const pct = config.metaCal > 0 ? Math.min(100, (d.cal / config.metaCal) * 100) : 0;
            const isToday = d.fecha === hoy;
            const over = d.cal > config.metaCal;
            return `
              <div class="dash-bar-col ${isToday ? 'today' : ''}">
                <div class="dash-bar-val">${d.cal > 0 ? d.cal : '-'}</div>
                <div class="dash-bar-track">
                  <div class="dash-bar-fill ${over ? 'over' : ''}" style="height:${pct}%"></div>
                </div>
                <div class="dash-bar-label">${DIAS_MINI[i]}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Semana: cumplimiento -->
      <div class="dash-card fade-in">
        <div class="dash-card-header">
          <h3><i data-lucide="check-circle" class="icon" style="width:18px;height:18px;margin-right:6px;"></i>Cumplimiento</h3>
          <span class="dash-card-badge">${datos.cumplimientoPromedio}% prom</span>
        </div>
        <div class="dash-week-dots">
          ${datos.dias.map((d, i) => {
            let cls = 'empty';
            if (d.cumplimiento >= 80) cls = 'green';
            else if (d.cumplimiento >= 50) cls = 'yellow';
            else if (d.cumplimiento > 0) cls = 'red';
            const isToday = d.fecha === hoy;
            return `<div class="dash-dot-col ${isToday ? 'today' : ''}">
              <div class="dash-dot ${cls}">${d.cumplimiento > 0 ? d.cumplimiento + '%' : '-'}</div>
              <span>${DIAS_MINI[i]}</span>
            </div>`;
          }).join('')}
        </div>
      </div>

      <!-- Semana: agua -->
      <div class="dash-card fade-in">
        <div class="dash-card-header">
          <h3><i data-lucide="droplets" class="icon" style="width:18px;height:18px;margin-right:6px;"></i>Agua</h3>
          <span class="dash-card-badge">${datos.totalAgua} vasos total</span>
        </div>
        <div class="dash-week-dots">
          ${datos.dias.map((d, i) => {
            const meta = 8;
            let cls = 'empty';
            if (d.agua >= meta) cls = 'green';
            else if (d.agua >= meta * 0.5) cls = 'yellow';
            else if (d.agua > 0) cls = 'red';
            const isToday = d.fecha === hoy;
            return `<div class="dash-dot-col ${isToday ? 'today' : ''}">
              <div class="dash-dot ${cls}">${d.agua > 0 ? d.agua : '-'}</div>
              <span>${DIAS_MINI[i]}</span>
            </div>`;
          }).join('')}
        </div>
      </div>

      <!-- Gym esta semana + métricas rutinas -->
      <div class="dash-card fade-in">
        <div class="dash-card-header">
          <h3><i data-lucide="dumbbell" class="icon" style="width:18px;height:18px;margin-right:6px;"></i>Gym</h3>
          <span class="dash-card-badge">${datos.ejerciciosDias}/7 días</span>
        </div>
        <div class="dash-week-dots">
          ${datos.dias.map((d, i) => {
            const isToday = d.fecha === hoy;
            return `<div class="dash-dot-col ${isToday ? 'today' : ''}">
              <div class="dash-dot ${d.ejercicios ? 'green' : 'empty'}">${d.ejercicios ? '<i data-lucide="dumbbell" style="width:14px;height:14px;"></i>' : '-'}</div>
              <span>${DIAS_MINI[i]}</span>
            </div>`;
          }).join('')}
        </div>
        ${this._renderGymMetrics()}
      </div>

      <!-- Peso progress -->
      <div class="dash-card fade-in">
        <div class="dash-card-header">
          <h3><i data-lucide="scale" class="icon" style="width:18px;height:18px;margin-right:6px;"></i>Progreso de peso</h3>
        </div>
        <div class="dash-peso-summary">
          <div class="dash-peso-num">${lastPeso.peso} <small>kg</small></div>
          <div class="dash-peso-meta">Meta: ${config.meta} kg · Faltan ${(lastPeso.peso - config.meta).toFixed(1)} kg</div>
          <div class="progress-bar-bg" style="height:12px;border-radius:6px;margin-top:10px;">
            <div class="progress-bar-fill" style="width:${Math.min(100, ((config.pesoInicial - lastPeso.peso) / (config.pesoInicial - config.meta)) * 100)}%;height:100%;border-radius:6px;"></div>
          </div>
        </div>
      </div>

      <!-- Compartir -->
      <button id="btn-compartir" class="btn btn-primary btn-full" style="margin-top:8px;">
        <i data-lucide="share-2" style="width:18px;height:18px;margin-right:8px;vertical-align:middle;"></i>Compartir resumen semanal
      </button>
    `;

    Icons.init();
    document.getElementById('btn-compartir').addEventListener('click', () => this._share(datos, config, lastPeso));
  },

  /* ─── Gym metrics: última sesión + volumen semanal ─── */
  _renderGymMetrics() {
    try {
      const sessions = typeof Routines !== 'undefined' ? Routines.getSessions() : [];
      if (sessions.length === 0) return '';

      // Last session
      const last = sessions[0];
      const lastDate = new Date(last.endedAt || last.startedAt);
      const lastVol  = typeof Routines !== 'undefined' ? Routines.calcVolume(last) : 0;
      const DIAS_S = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
      const lastLabel = `${DIAS_S[lastDate.getDay()]} ${lastDate.getDate()}/${lastDate.getMonth()+1}`;

      // Volume this week
      const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
      const weekSessions = sessions.filter(s => (s.endedAt || s.startedAt) >= weekAgo);
      const weekVol = weekSessions.reduce((t, s) => t + (typeof Routines !== 'undefined' ? Routines.calcVolume(s) : 0), 0);

      return `
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px;">
          <div style="background:rgba(124,58,237,0.08);border:1px solid rgba(124,58,237,0.2);border-radius:12px;padding:10px 12px;">
            <div style="font-size:0.65rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Última sesión</div>
            <div style="font-weight:800;font-size:0.9rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${last.routineName}</div>
            <div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px;">${lastLabel} · ${Math.round(lastVol).toLocaleString()} kg</div>
          </div>
          <div style="background:rgba(48,209,88,0.08);border:1px solid rgba(48,209,88,0.2);border-radius:12px;padding:10px 12px;">
            <div style="font-size:0.65rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">Volumen semana</div>
            <div style="font-weight:800;font-size:0.9rem;">${Math.round(weekVol).toLocaleString()} kg</div>
            <div style="font-size:0.72rem;color:var(--text-muted);margin-top:2px;">${weekSessions.length} sesiones · 7 días</div>
          </div>
        </div>
      `;
    } catch(e) { return ''; }
  },

  _getGreetingMsg() {
    const h = new Date().getHours();
    if (h < 12) return 'Buenos días! Empieza tu día con energía.';
    if (h < 18) return 'Buena tarde! ¿Cómo va tu alimentación hoy?';
    return 'Buenas noches! No olvides completar tu registro.';
  },

  _getDisplayName(config) {
    // Priority: onboarding name > Google name > 'Atleta'
    if (config.nombre && config.nombre !== 'Usuario' && config.nombre !== 'Atleta') {
      return config.nombre;
    }
    // Try Google account name
    const user = (typeof Auth !== 'undefined') ? Auth.getUser() : null;
    if (user) {
      const googleName = user.name || user.displayName;
      if (googleName) {
        // Use only first name
        const firstName = googleName.split(' ')[0];
        return firstName;
      }
    }
    return config.nombre || 'Atleta';
  },

  /* ─── Compartir como imagen — Premium redesign ─── */
  async _share(datos, config, lastPeso) {
    const W = 640, H = 900;
    const canvas = document.createElement('canvas');
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // — Background gradient —
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0,   '#0A0A12');
    bg.addColorStop(0.5, '#12101E');
    bg.addColorStop(1,   '#0A0A12');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // — Purple glow top-right —
    const glow = ctx.createRadialGradient(W, 0, 0, W, 0, 420);
    glow.addColorStop(0,   'rgba(124,58,237,0.28)');
    glow.addColorStop(1,   'rgba(124,58,237,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // — Header pill —
    ctx.fillStyle = 'rgba(124,58,237,0.15)';
    ctx.beginPath(); ctx.roundRect(24, 24, W - 48, 80, 20); ctx.fill();
    ctx.strokeStyle = 'rgba(124,58,237,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.roundRect(24, 24, W - 48, 80, 20); ctx.stroke();

    ctx.fillStyle = '#A78BFA';
    ctx.font = 'bold 26px Arial';
    ctx.fillText('FitPulse', 48, 72);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '14px Arial';
    const dateStr = new Date().toLocaleDateString('es', { weekday:'long', day:'numeric', month:'long' });
    ctx.fillText(dateStr, 48, 92);
    // FP badge right
    ctx.fillStyle = '#7C3AED';
    ctx.beginPath(); ctx.arc(W - 60, 64, 28, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.font = 'bold 16px Arial'; ctx.textAlign = 'center';
    ctx.fillText('FP', W - 60, 70); ctx.textAlign = 'left';

    // — Helper: draw metric card —
    const metricCard = (x, y, w, h, label, value, unit, accent) => {
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      ctx.beginPath(); ctx.roundRect(x, y, w, h, 16); ctx.fill();
      ctx.strokeStyle = `rgba(${accent},0.3)`; ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.roundRect(x, y, w, h, 16); ctx.stroke();
      ctx.fillStyle = `rgba(${accent},0.7)`;
      ctx.font = 'bold 11px Arial';
      ctx.fillText(label.toUpperCase(), x + 14, y + 22);
      ctx.fillStyle = '#F0F0F8';
      ctx.font = `bold 28px Arial`;
      ctx.fillText(value, x + 14, y + 58);
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '12px Arial';
      ctx.fillText(unit, x + 14, y + 76);
    };

    // — 4 metric cards —
    const gymSessions = typeof Routines !== 'undefined' ? Routines.getSessions() : [];
    const weekAgo = Date.now() - 7*24*3600*1000;
    const weekVol  = gymSessions.filter(s=>(s.endedAt||s.startedAt)>=weekAgo)
                      .reduce((t,s)=>t+(typeof Routines!=='undefined'?Routines.calcVolume(s):0),0);

    const gap = 12, cw = (W - 48 - gap) / 2, ch = 96, cy = 124;
    metricCard(24,        cy, cw, ch, 'Peso actual',     `${lastPeso.peso}`, 'kg',          '167,139,250');
    metricCard(24+cw+gap, cy, cw, ch, 'Prom. Calorías',  `${datos.promedioCal}`, 'kcal/día','48,209,88');
    metricCard(24,        cy+ch+gap, cw, ch, 'Agua semana', `${datos.totalAgua}`, 'vasos',  '6,182,212');
    metricCard(24+cw+gap, cy+ch+gap, cw, ch, 'Volumen gym', `${Math.round(weekVol/1000*10)/10||0}`, 'ton/sem', '251,191,36');

    // — Weekly cal bars —
    const DIAS7 = ['L','M','M','J','V','S','D'];
    const bx = 24, by = 350, bw = W - 48, bh = 180;
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 16); ctx.fill();
    ctx.fillStyle = 'rgba(167,139,250,0.6)'; ctx.font = 'bold 12px Arial';
    ctx.fillText('Calorías de la semana', bx + 14, by + 24);
    ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.font = '11px Arial';
    ctx.fillText(`Meta: ${config.metaCal} kcal`, bx + bw - 110, by + 24);

    const maxCal = Math.max(...datos.dias.map(d=>d.cal), config.metaCal, 1);
    const barW   = Math.floor((bw - 40) / 7) - 8;
    datos.dias.forEach((d, i) => {
      const bBarX = bx + 20 + i * ((bw - 40) / 7);
      const bBarH = Math.max(0, (d.cal / maxCal) * 110);
      const isOver = d.cal > config.metaCal;
      const grad   = ctx.createLinearGradient(0, by+bh-20-bBarH, 0, by+bh-20);
      grad.addColorStop(0, isOver ? '#FF453A' : '#7C3AED');
      grad.addColorStop(1, isOver ? '#FF6B6B' : '#A78BFA');
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.roundRect(bBarX, by+bh-20-bBarH, barW, Math.max(2,bBarH), [4,4,0,0]); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '11px Arial'; ctx.textAlign='center';
      ctx.fillText(DIAS7[i], bBarX + barW/2, by + bh - 4);
      if (d.cal > 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.font = '10px Arial';
        ctx.fillText(d.cal, bBarX + barW/2, by+bh-22-bBarH);
      }
      ctx.textAlign = 'left';
    });
    // Meta line
    const metaY = by + bh - 20 - (config.metaCal / maxCal * 110);
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(255,213,0,0.4)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(bx+14, metaY); ctx.lineTo(bx+bw-14, metaY); ctx.stroke();
    ctx.setLineDash([]);

    // — Progress bar —
    const py = 556;
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.beginPath(); ctx.roundRect(24, py, W-48, 80, 16); ctx.fill();
    ctx.fillStyle = 'rgba(167,139,250,0.6)'; ctx.font = 'bold 12px Arial';
    ctx.fillText('Progreso hacia meta', 38, py + 22);
    const progPct = Math.max(0, Math.min(1, (config.pesoInicial - lastPeso.peso) / (Math.max(0.1, config.pesoInicial - config.meta))));
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath(); ctx.roundRect(38, py + 32, W-76, 18, 9); ctx.fill();
    const progG = ctx.createLinearGradient(38, 0, W-38, 0);
    progG.addColorStop(0, '#6C3CE1'); progG.addColorStop(1, '#A78BFA');
    ctx.fillStyle = progG;
    ctx.beginPath(); ctx.roundRect(38, py+32, Math.max(18,(W-76)*progPct), 18, 9); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.font = '11px Arial';
    ctx.fillText(`${config.pesoInicial} kg  →  ${config.meta} kg  (${Math.round(progPct*100)}% completado)`, 38, py+68);

    // — Cumplimiento dots —
    const dy = 660;
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    ctx.beginPath(); ctx.roundRect(24, dy, W-48, 90, 16); ctx.fill();
    ctx.fillStyle = 'rgba(167,139,250,0.6)'; ctx.font = 'bold 12px Arial';
    ctx.fillText('Cumplimiento semanal', 38, dy+22);
    datos.dias.forEach((d, i) => {
      const cx = 38 + i * 82, cy2 = dy + 58;
      const color = d.cumplimiento >= 80 ? '#30D158' : d.cumplimiento >= 50 ? '#FFD60A' : d.cumplimiento > 0 ? '#FF453A' : '#3A3A48';
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(cx + 18, cy2, 18, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = 'bold 11px Arial'; ctx.textAlign='center';
      ctx.fillText(d.cumplimiento > 0 ? d.cumplimiento+'%' : '-', cx+18, cy2+4);
      ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '10px Arial';
      ctx.fillText(DIAS7[i], cx+18, dy+84); ctx.textAlign='left';
    });

    // — Footer —
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(0, H-60, W, 60);
    ctx.fillStyle = '#7C3AED'; ctx.font = 'bold 14px Arial';
    ctx.fillText('FitPulse — Tu compañero fitness', 24, H-28);
    ctx.fillStyle = 'rgba(255,255,255,0.3)'; ctx.font = '11px Arial';
    ctx.fillText('fitpulse.app', W-90, H-28);

    // — Download/share —
    canvas.toBlob(async (blob) => {
      if (navigator.share && navigator.canShare) {
        try {
          const file = new File([blob], 'fitpulse-semanal.png', { type: 'image/png' });
          await navigator.share({ title: 'Mi progreso FitPulse', files: [file] });
        } catch(e) { this._downloadBlob(blob); }
      } else { this._downloadBlob(blob); }
    }, 'image/png');
  },

  _downloadBlob(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `fitpulse_semanal_${Storage.today()}.png`;
    a.click(); URL.revokeObjectURL(url);
    showToast('Imagen descargada ✅');
  }
};
