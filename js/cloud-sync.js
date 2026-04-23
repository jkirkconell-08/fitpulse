/* =========================================================
   FitPulse - Cloud Sync (Firestore)
   Sincroniza localStorage <-> Firebase Firestore
   
   Lógica:
   - Login en dispositivo nuevo → descarga TODO de la nube
   - Cambios locales → sube a la nube automáticamente
   - Mismo correo = mismos datos en cualquier lugar
   ========================================================= */

const CloudSync = {
  _syncing: false,
  _lastSync: 0,
  _saveTimer: null,

  /* Push all local data to Firestore */
  async pushToCloud() {
    if (!Auth.initialized || !Auth.user || this._syncing) return;
    this._syncing = true;

    try {
      const { doc, setDoc } = Auth._dbModule;
      const uid = Auth.user.uid;

      // Collect all app data from localStorage
      const allData = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('nutritrack_') || key.startsWith('fitpulse_r') || key === 'fitpulse_config') {
          try { allData[key] = JSON.parse(localStorage.getItem(key)); }
          catch { allData[key] = localStorage.getItem(key); }
        }
      }

      await setDoc(doc(Auth.db, 'users', uid), {
        data: JSON.stringify(allData),
        updatedAt: new Date().toISOString(),
        email: Auth.user.email || '',
        name: Auth.user.displayName || ''
      }, { merge: true });

      this._lastSync = Date.now();
      localStorage.setItem('fitpulse_last_sync', this._lastSync);
      console.log('☁️ Datos subidos a la nube');
    } catch (e) {
      console.error('CloudSync push error:', e);
    } finally {
      this._syncing = false;
      this._setSyncDot('synced');
    }
  },

  /* Pull ALL data from Firestore → replace localStorage */
  async pullFromCloud() {
    if (!Auth.initialized || !Auth.user) return;

    try {
      const { doc, getDoc } = Auth._dbModule;
      const uid = Auth.user.uid;
      const snap = await getDoc(doc(Auth.db, 'users', uid));

      if (snap.exists() && snap.data().data) {
        const cloudData = JSON.parse(snap.data().data);
        let imported = 0;

        // Check if this is a NEW device (no local data yet)
        const hasLocalData = localStorage.getItem('nutritrack_config') !== null;

        for (const [key, val] of Object.entries(cloudData)) {
          if (!hasLocalData) {
            // NEW DEVICE: import everything from cloud
            localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
            imported++;
          } else {
            // EXISTING DEVICE: only import what's missing locally
            const localVal = localStorage.getItem(key);
            if (!localVal) {
              localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
              imported++;
            }
          }
        }

        if (imported > 0) {
          console.log(`☁️ ${imported} items descargados de la nube`);
          // Reload page to show synced data (only if significant data was imported)
          if (imported > 2 && !hasLocalData) {
            window.location.reload();
          }
        }
      } else {
        // No cloud data exists yet — push local data up
        console.log('☁️ No hay datos en la nube, subiendo datos locales...');
        await this.pushToCloud();
      }
    } catch (e) {
      console.error('CloudSync pull error:', e);
    }
  },

  /* Force full sync: download cloud → overwrite local */
  async forceDownload() {
    if (!Auth.initialized || !Auth.user) {
      showToast('No hay sesión activa', 'warning');
      return;
    }

    try {
      const { doc, getDoc } = Auth._dbModule;
      const uid = Auth.user.uid;
      const snap = await getDoc(doc(Auth.db, 'users', uid));

      if (snap.exists() && snap.data().data) {
        const cloudData = JSON.parse(snap.data().data);

        // Clear local app data first
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith('nutritrack_') || key.startsWith('fitpulse_r')) keysToRemove.push(key);
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));

        // Import all cloud data
        for (const [key, val] of Object.entries(cloudData)) {
          localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
        }

        showToast('✅ Datos sincronizados desde la nube');
        setTimeout(() => window.location.reload(), 500);
      } else {
        showToast('No hay datos en la nube aún', 'warning');
      }
    } catch (e) {
      console.error('Force download error:', e);
      showToast('Error al sincronizar', 'warning');
    }
  },

  /* Debounced save: call this after any data change */
  onDataChanged() {
    if (!Auth.initialized || !Auth.user) return;
    this._setSyncDot('syncing');
    clearTimeout(this._saveTimer);
    this._saveTimer = setTimeout(() => this.pushToCloud(), 1500);
  },

  /* Sync dot helper — inserts a small dot into the header if not present */
  _setSyncDot(state) {
    let dot = document.getElementById('sync-status-dot');
    if (!dot) {
      const header = document.querySelector('.header-actions');
      if (!header) return;
      const wrap = document.createElement('div');
      wrap.className = 'sync-indicator';
      wrap.id = 'sync-indicator-wrap';
      wrap.innerHTML = `<span class="sync-dot" id="sync-status-dot"></span><span id="sync-status-label"></span>`;
      header.insertBefore(wrap, header.firstChild);
      dot = document.getElementById('sync-status-dot');
    }
    const label = document.getElementById('sync-status-label');
    dot.className = 'sync-dot ' + state;
    if (label) {
      label.textContent = state === 'syncing' ? 'Guardando…' : state === 'synced' ? 'Guardado' : '';
      // Auto-hide label after 3s when synced
      if (state === 'synced') setTimeout(() => { if (label) label.textContent = ''; }, 3000);
    }
  },

  /* Auto-sync scheduler */
  scheduleSync() {
    // Sync every 90 seconds
    setInterval(() => this.pushToCloud(), 90 * 1000);

    // Sync when page is about to close
    window.addEventListener('beforeunload', () => {
      if (Auth.initialized && Auth.user) {
        this.pushToCloud();
      }
    });

    // Pull fresh data when user comes back to app
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && Auth.initialized && Auth.user) {
        this.pullFromCloud();
      }
    });
  }
};
