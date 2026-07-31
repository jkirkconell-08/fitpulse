/* =========================================================
   NutriTrack - Medidas Corporales
   ========================================================= */

const _ICON_RULER = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;opacity:0.7;"><path d="M2 12h20M2 12l4-4M2 12l4 4M22 12l-4-4M22 12l-4 4"/></svg>`;
const _ICON_ARM   = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;opacity:0.7;"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/></svg>`;
const _ICON_LEG   = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;opacity:0.7;"><line x1="12" y1="2" x2="12" y2="22"/><path d="M12 8l-4 4 4 4"/></svg>`;
const _ICON_NECK  = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;opacity:0.7;"><circle cx="12" cy="8" r="4"/><path d="M10 14v8M14 14v8"/></svg>`;

const MEDIDA_FIELDS = [
  { id: 'cintura',  label: 'Cintura',          icon: _ICON_RULER, unit: 'cm' },
  { id: 'pecho',    label: 'Pecho',            icon: _ICON_RULER, unit: 'cm' },
  { id: 'cadera',   label: 'Cadera',           icon: _ICON_RULER, unit: 'cm' },
  { id: 'brazoD',   label: 'Brazo derecho',    icon: _ICON_ARM,   unit: 'cm' },
  { id: 'brazoI',   label: 'Brazo izquierdo',  icon: _ICON_ARM,   unit: 'cm' },
  { id: 'piernaD',  label: 'Pierna derecha',   icon: _ICON_LEG,   unit: 'cm' },
  { id: 'piernaI',  label: 'Pierna izquierda', icon: _ICON_LEG,   unit: 'cm' },
  { id: 'cuello',   label: 'Cuello',           icon: _ICON_NECK,  unit: 'cm' },
];

const _SVG_RULER_SM = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:6px;"><path d="M3 9l4-4 14 14-4 4z"/><line x1="14" y1="5" x2="19" y2="10"/><line x1="10" y1="9" x2="15" y2="14"/><line x1="6" y1="13" x2="11" y2="18"/></svg>`;
const _SVG_CHART_SM = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:6px;"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`;
const _SVG_CAL_SM   = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:6px;"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;

const Medidas = {
  init() {
    this._render();
    this._renderFoto();
  },

  async _renderFoto() {
    const container = document.getElementById('medidas-foto-container');
    if (!container || typeof PhotoStore === 'undefined') return;
    const fecha = Storage.today();
    const existing = await PhotoStore.get(fecha);
    const photos = await PhotoStore.getAll();
    container.innerHTML = `
      <div class="config-card fade-in" style="margin-bottom:20px;">
        <h3 style="display:flex;align-items:center;gap:8px;"><i data-lucide="camera" style="width:18px;height:18px;"></i>Foto de progreso</h3>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:14px;">Local y opcional — nunca se sube a la nube.</p>
        <label class="sheet-row" style="border-style:dashed;justify-content:center;">
          <input type="file" accept="image/*" capture="environment" id="foto-input" style="display:none;">
          <span class="sheet-row-label" style="flex:none;color:var(--lime);">${existing ? 'Reemplazar foto de hoy' : '+ Tomar foto de hoy'}</span>
        </label>
        ${photos.length > 0 ? `<div style="display:flex;gap:8px;overflow-x:auto;margin-top:12px;" id="foto-strip"></div>` : ''}
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    document.getElementById('foto-input').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      await PhotoStore.save(fecha, file);
      showToast('Foto guardada');
      this._renderFoto();
    });
    const strip = document.getElementById('foto-strip');
    if (strip) {
      photos.slice(0, 10).forEach(p => {
        const url = URL.createObjectURL(p.blob);
        const img = document.createElement('img');
        img.src = url;
        img.style.cssText = 'width:64px;height:64px;object-fit:cover;border-radius:12px;flex:none;border:1px solid var(--border);';
        strip.appendChild(img);
      });
    }
  },

  _render() {
    const container = document.getElementById('medidas-container');
    if (!container) return;

    const data = Storage.obtenerMedidas();
    const registros = data.registros || [];
    const ultimo = registros.length > 0 ? registros[0] : null;
    const penultimo = registros.length > 1 ? registros[1] : null;

    container.innerHTML = `
      <!-- Registrar nuevas medidas -->
      <div class="config-card fade-in" style="margin-bottom:20px;">
        <h3 style="display:flex;align-items:center;gap:8px;">${_SVG_RULER_SM} Registrar medidas</h3>
        <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:16px;">Mídete cada 2-4 semanas para ver cambios reales.</p>
        <div class="medidas-grid">
          ${MEDIDA_FIELDS.map(f => `
            <div class="config-row" style="margin-bottom:12px;">
              <label style="display:flex;align-items:center;gap:6px;">${f.icon} ${f.label} (${f.unit})</label>
              <input type="number" id="med-${f.id}" step="0.5" placeholder="${ultimo ? ultimo[f.id] || '' : ''}" value="">
            </div>
          `).join('')}
        </div>
        <button id="btn-guardar-medidas" class="btn btn-primary btn-full">Guardar medidas</button>
      </div>

      <!-- Última medición vs anterior -->
      ${ultimo ? `
        <div class="config-card fade-in" style="margin-bottom:20px;">
          <h3 style="display:flex;align-items:center;gap:8px;">${_SVG_CHART_SM} Última medición</h3>
          <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:12px;">${this._formatDate(ultimo.fecha)}</p>
          <div class="medidas-compare">
            ${MEDIDA_FIELDS.map(f => {
              const val = ultimo[f.id];
              if (!val) return '';
              const prev = penultimo ? penultimo[f.id] : null;
              let diff = '';
              if (prev) {
                const d = val - prev;
                if (d !== 0) diff = `<span class="${d < 0 ? 'positivo' : 'negativo'}">${d > 0 ? '+' : ''}${d.toFixed(1)}</span>`;
              }
              return `
                <div class="medida-compare-row">
                  <span class="medida-label" style="display:flex;align-items:center;gap:5px;">${f.icon} ${f.label}</span>
                  <span class="medida-val">${val} ${f.unit}</span>
                  ${diff}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Historial -->
      ${registros.length > 0 ? `
        <div class="config-card fade-in">
          <h3 style="display:flex;align-items:center;gap:8px;">${_SVG_CAL_SM} Historial de medidas</h3>
          <p style="font-size:0.8rem;color:var(--text-muted);margin-bottom:12px;">${registros.length} registro${registros.length > 1 ? 's' : ''} · toca uno para ver el detalle completo</p>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${registros.map((r, i) => {
              const prev = registros[i + 1] || null;
              const primary = MEDIDA_FIELDS.find(f => r[f.id] != null);
              const val = primary ? r[primary.id] : null;
              const prevVal = primary && prev ? prev[primary.id] : null;
              const diff = (primary && prevVal != null) ? +(val - prevVal).toFixed(1) : null;
              const camposCount = MEDIDA_FIELDS.filter(f => r[f.id] != null).length;
              return `
                <div class="medida-hist-row" data-fecha="${r.fecha}" style="display:flex;align-items:center;gap:12px;background:var(--bg-input);border-radius:14px;padding:12px 14px;cursor:pointer;">
                  <div style="flex:1;min-width:0;">
                    <div style="font-weight:700;font-size:0.9rem;">${this._formatDate(r.fecha)}</div>
                    <div class="font-mono" style="font-size:11px;color:var(--text-muted);margin-top:2px;">${camposCount} medida${camposCount > 1 ? 's' : ''} registrada${camposCount > 1 ? 's' : ''}</div>
                  </div>
                  ${primary ? `
                  <div style="text-align:right;">
                    <div class="font-display" style="font-weight:800;font-size:18px;">${val}<span style="font-size:11px;color:var(--text-muted);font-family:var(--font-mono);"> ${primary.unit}</span></div>
                    ${diff !== null && diff !== 0 ? `<div class="font-mono ${diff < 0 ? 'positivo' : 'negativo'}" style="font-size:11px;">${diff > 0 ? '+' : ''}${diff}</div>` : ''}
                  </div>` : ''}
                  <i data-lucide="chevron-right" style="width:18px;height:18px;color:var(--text-dim);flex:none;"></i>
                </div>`;
            }).join('')}
          </div>
        </div>
      ` : ''}
    `;

    document.getElementById('btn-guardar-medidas').addEventListener('click', () => {
      const medida = { fecha: Storage.today() };
      let hasData = false;
      MEDIDA_FIELDS.forEach(f => {
        const val = parseFloat(document.getElementById(`med-${f.id}`).value);
        if (val > 0) { medida[f.id] = val; hasData = true; }
      });
      if (!hasData) { showToast('Ingresa al menos una medida', 'warning'); return; }
      Storage.agregarMedida(medida);
      showToast('Medidas guardadas');
      this._render();
    });

    if (typeof Icons !== 'undefined') Icons.init(container);
    container.querySelectorAll('.medida-hist-row').forEach(row => {
      row.addEventListener('click', () => this._showDetail(row.dataset.fecha));
    });
  },

  _showDetail(fecha) {
    const overlay = document.getElementById('medida-detail-overlay');
    if (!overlay) return;
    const data = Storage.obtenerMedidas();
    const registros = data.registros || [];
    const idx = registros.findIndex(r => r.fecha === fecha);
    if (idx === -1) return;
    const r = registros[idx];
    const prev = registros[idx + 1] || null;

    overlay.innerHTML = `
      <div class="overlay-content" style="text-align:left;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h2 style="font-size:1.1rem;font-weight:800;">${this._formatDate(r.fecha)}</h2>
          <button id="medida-detail-close" style="background:none;border:none;color:var(--text-muted);cursor:pointer;display:flex;"><i data-lucide="x" style="width:20px;height:20px;"></i></button>
        </div>
        <div class="medidas-compare" style="margin-bottom:20px;">
          ${MEDIDA_FIELDS.map(f => {
            const val = r[f.id];
            if (val == null) return '';
            const prevVal = prev ? prev[f.id] : null;
            let diff = '';
            if (prevVal != null) {
              const d = +(val - prevVal).toFixed(1);
              if (d !== 0) diff = `<span class="${d < 0 ? 'positivo' : 'negativo'}">${d > 0 ? '+' : ''}${d}</span>`;
            }
            return `
              <div class="medida-compare-row">
                <span class="medida-label" style="display:flex;align-items:center;gap:5px;">${f.icon} ${f.label}</span>
                <span class="medida-val">${val} ${f.unit}</span>
                ${diff}
              </div>`;
          }).join('')}
        </div>
        <button id="medida-detail-del" class="btn btn-secondary btn-full" style="color:var(--danger);border-color:rgba(255,69,58,0.3);">Eliminar este registro</button>
      </div>
    `;
    overlay.classList.add('active');
    Icons.init(overlay);
    document.getElementById('medida-detail-close').onclick = () => overlay.classList.remove('active');
    document.getElementById('medida-detail-del').onclick = () => {
      if (!confirm('¿Eliminar este registro de medidas?')) return;
      data.registros = registros.filter(x => x.fecha !== fecha);
      Storage.guardarMedidas(data);
      overlay.classList.remove('active');
      this._render();
      if (typeof showToast === 'function') showToast('Registro eliminado');
    };
  },

  _formatDate(fecha) {
    const d = new Date(fecha + 'T12:00:00');
    const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    return `${d.getDate()} ${MESES[d.getMonth()]} ${d.getFullYear()}`;
  },

  _formatDateShort(fecha) {
    const d = new Date(fecha + 'T12:00:00');
    return `${d.getDate()}/${d.getMonth() + 1}`;
  }
};
