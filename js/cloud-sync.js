/* =========================================================
   FitPulse - Cloud Sync (Firestore)
   Syncs localStorage data to/from Firebase Firestore
   ========================================================= */

const CloudSync = {
  _syncing: false,
  _lastSync: 0,

  /* Push all local data to Firestore */
  async pushToCloud() {
    if (!Auth.initialized || !Auth.user || this._syncing) return;
    this._syncing = true;

    try {
      const { doc, setDoc } = Auth._dbModule;
      const uid = Auth.user.uid;

      // Collect all fitpulse/nutritrack data
      const allData = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('nutritrack_') || key.startsWith('fitpulse_')) {
          try { allData[key] = JSON.parse(localStorage.getItem(key)); }
          catch { allData[key] = localStorage.getItem(key); }
        }
      }

      // Save as single document (efficient for small apps)
      await setDoc(doc(Auth.db, 'users', uid), {
        data: JSON.stringify(allData),
        updatedAt: new Date().toISOString(),
        email: Auth.user.email || '',
        name: Auth.user.displayName || ''
      }, { merge: true });

      this._lastSync = Date.now();
      console.log('CloudSync: pushed to cloud');
    } catch (e) {
      console.error('CloudSync push error:', e);
    } finally {
      this._syncing = false;
    }
  },

  /* Pull data from Firestore to localStorage */
  async pullFromCloud() {
    if (!Auth.initialized || !Auth.user) return;

    try {
      const { doc, getDoc } = Auth._dbModule;
      const uid = Auth.user.uid;
      const snap = await getDoc(doc(Auth.db, 'users', uid));

      if (snap.exists()) {
        const cloudData = JSON.parse(snap.data().data || '{}');
        let imported = 0;

        for (const [key, val] of Object.entries(cloudData)) {
          // Only import if local doesn't have it or cloud is newer
          const localVal = localStorage.getItem(key);
          if (!localVal) {
            localStorage.setItem(key, typeof val === 'string' ? val : JSON.stringify(val));
            imported++;
          }
        }

        if (imported > 0) {
          console.log(`CloudSync: pulled ${imported} items from cloud`);
        }
      }
    } catch (e) {
      console.error('CloudSync pull error:', e);
    }
  },

  /* Auto-sync: call periodically or on data change */
  scheduleSync() {
    // Sync every 5 minutes
    setInterval(() => this.pushToCloud(), 5 * 60 * 1000);

    // Also sync when page is about to close
    window.addEventListener('beforeunload', () => {
      if (Auth.initialized && Auth.user) {
        // Use sendBeacon for reliability
        this.pushToCloud();
      }
    });

    // Sync on visibility change (when user comes back to app)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && Auth.initialized) {
        this.pullFromCloud();
      }
    });
  }
};
