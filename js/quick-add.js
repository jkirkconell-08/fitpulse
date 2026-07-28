/* =========================================================
   FitPulse - Quick Add: hoja del botón "+" central del nav
   ========================================================= */

const QuickAdd = {
  init() {
    const fab = document.getElementById('nav-fab');
    if (!fab) return;
    if (!document.getElementById('quickadd-backdrop')) {
      const backdrop = document.createElement('div');
      backdrop.id = 'quickadd-backdrop';
      backdrop.className = 'sheet-backdrop';
      document.body.appendChild(backdrop);
    }
    fab.addEventListener('click', () => this.open());
  },

  open() {
    const backdrop = document.getElementById('quickadd-backdrop');
    if (!backdrop) return;
    backdrop.innerHTML = `
      <div class="bottom-sheet active" onclick="event.stopPropagation()">
        <div class="sheet-handle"></div>
        <h2 style="font-size:20px;margin-bottom:14px;">Agregar</h2>
        <div class="sheet-row" id="qa-agua">
          <div class="sheet-row-icon" style="background:rgba(34,211,238,.14);color:var(--cyan);"><i data-lucide="droplets" style="width:20px;height:20px"></i></div>
          <span class="sheet-row-label">+1 vaso de agua</span>
        </div>
        <div class="sheet-row" id="qa-comida">
          <div class="sheet-row-icon"><i data-lucide="utensils" style="width:20px;height:20px"></i></div>
          <span class="sheet-row-label">Agregar comida</span>
        </div>
        <div class="sheet-row" id="qa-peso">
          <div class="sheet-row-icon"><i data-lucide="trending-up" style="width:20px;height:20px"></i></div>
          <span class="sheet-row-label">Registrar peso</span>
        </div>
        <div class="sheet-row" id="qa-gym">
          <div class="sheet-row-icon"><i data-lucide="dumbbell" style="width:20px;height:20px"></i></div>
          <span class="sheet-row-label">Empezar sesión de gym</span>
        </div>
        <div class="sheet-row" id="qa-cardio">
          <div class="sheet-row-icon"><i data-lucide="activity" style="width:20px;height:20px"></i></div>
          <span class="sheet-row-label">Registrar cardio</span>
        </div>
      </div>
    `;
    backdrop.classList.add('active');
    backdrop.onclick = () => this.close();
    Icons.init(backdrop);

    document.getElementById('qa-agua').addEventListener('click', () => {
      Storage.agregarVasoAgua(Storage.today());
      if (typeof showToast === 'function') showToast('+1 vaso de agua');
      if (typeof App !== 'undefined' && App._renderWater) { App._renderWater(); App._renderHeroRing(); }
      this.close();
    });
    document.getElementById('qa-comida').addEventListener('click', () => {
      window.location.href = 'comidas.html?openSearch=1';
    });
    document.getElementById('qa-peso').addEventListener('click', () => {
      window.location.href = 'progreso.html#peso?openForm=1';
    });
    document.getElementById('qa-gym').addEventListener('click', () => {
      window.location.href = 'ejercicios.html#fuerza';
    });
    document.getElementById('qa-cardio').addEventListener('click', () => {
      window.location.href = 'ejercicios.html#cardio';
    });
  },

  close() {
    const backdrop = document.getElementById('quickadd-backdrop');
    if (backdrop) backdrop.classList.remove('active');
  }
};
