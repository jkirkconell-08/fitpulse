/* =========================================================
   FitPulse - Authentication (Firebase Auth)
   FIX: auth state persists across pages, no false logouts
   ========================================================= */

const Auth = {
  user: null,
  app: null,
  auth: null,
  db: null,
  initialized: false,
  _authReady: false,
  _authReadyResolve: null,
  _authReadyPromise: null,

  // Promise that resolves when Firebase has determined auth state
  _waitForAuthReady() {
    if (this._authReady) return Promise.resolve();
    if (!this._authReadyPromise) {
      this._authReadyPromise = new Promise(resolve => {
        this._authReadyResolve = resolve;
      });
    }
    return this._authReadyPromise;
  },

  async init() {
    // If already initialized, just wait
    if (this.initialized && this._authReady) return;

    // Check offline mode first
    const isOffline = localStorage.getItem('fitpulse_offline') === 'true';
    if (isOffline) {
      this._checkLocalUser();
      this._authReady = true;
      if (this._authReadyResolve) this._authReadyResolve();
      return;
    }

    // Check if Firebase config is set
    if (!FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === 'TU_API_KEY_AQUI') {
      console.warn('Firebase not configured. Running in offline mode.');
      this._checkLocalUser();
      this._authReady = true;
      if (this._authReadyResolve) this._authReadyResolve();
      return;
    }

    try {
      const { initializeApp, getApps } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
      const { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } =
        await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
      const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');

      // Avoid re-initializing Firebase app
      this.app = getApps().length > 0 ? getApps()[0] : initializeApp(FIREBASE_CONFIG);
      this.auth = getAuth(this.app);
      this.db = getFirestore(this.app);
      this.initialized = true;

      this._authModules = { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged };
      this._dbModule = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');

      // onAuthStateChanged fires once immediately with current state
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.user = user;
          localStorage.setItem('fitpulse_user', JSON.stringify({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
          }));
          if (typeof CloudSync !== 'undefined') {
            CloudSync.pullFromCloud();
          }
        } else {
          this.user = null;
          // Only clear if not in offline mode
          if (localStorage.getItem('fitpulse_offline') !== 'true') {
            localStorage.removeItem('fitpulse_user');
          }
        }

        // Auth state is now known — resolve the promise
        if (!this._authReady) {
          this._authReady = true;
          if (this._authReadyResolve) this._authReadyResolve();
        }

        this._updateUI();
      });

    } catch (e) {
      console.error('Firebase init error:', e);
      this._checkLocalUser();
      this._authReady = true;
      if (this._authReadyResolve) this._authReadyResolve();
    }
  },

  _checkLocalUser() {
    const saved = localStorage.getItem('fitpulse_user');
    if (saved) {
      try { this.user = JSON.parse(saved); } catch {}
    }
    this._updateUI();
  },

  _updateUI() {
    const avatar = document.getElementById('user-avatar');
    if (avatar && this.user) {
      avatar.innerHTML = this.user.photo || this.user.photoURL
        ? `<img src="${this.user.photo || this.user.photoURL}" alt="${this.user.name || this.user.displayName}" class="avatar-img">`
        : `<div class="avatar-letter">${((this.user.name || this.user.displayName || 'U')[0]).toUpperCase()}</div>`;
      avatar.style.display = 'flex';
    }
  },

  async loginWithGoogle() {
    if (!this.initialized) {
      showToast('Firebase no configurado', 'warning');
      return false;
    }
    try {
      const { signInWithPopup, GoogleAuthProvider } = this._authModules;
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      this.user = result.user;

      // Save to localStorage immediately
      localStorage.setItem('fitpulse_user', JSON.stringify({
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL
      }));

      // Check if needs onboarding
      const config = Storage.obtenerConfig();
      const needsOnboarding = !config.nombre || config.nombre === 'Usuario';
      return needsOnboarding ? 'onboarding' : 'dashboard';
    } catch (e) {
      console.error('Login error:', e);
      if (e.code === 'auth/popup-closed-by-user') return false;
      showToast('Error al iniciar sesión: ' + (e.message || ''), 'warning');
      return false;
    }
  },

  async logout() {
    if (this.initialized && this.auth) {
      const { signOut } = this._authModules;
      await signOut(this.auth);
    }
    localStorage.removeItem('fitpulse_user');
    localStorage.removeItem('fitpulse_offline');
    this.user = null;
    this._authReady = false;
    this._authReadyPromise = null;
    window.location.href = 'login.html';
  },

  isLoggedIn() {
    // Check Firebase user OR saved session OR offline mode
    return !!this.user
      || !!localStorage.getItem('fitpulse_user')
      || localStorage.getItem('fitpulse_offline') === 'true';
  },

  getUser() {
    if (this.user) return this.user;
    const saved = localStorage.getItem('fitpulse_user');
    return saved ? JSON.parse(saved) : null;
  },

  // Waits for Firebase to confirm auth state, THEN checks login
  async requireAuth() {
    await this._waitForAuthReady();
    if (!this.isLoggedIn()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  },

  // Use on internal pages — don't show content until auth confirmed
  async guardPage() {
    // Show loading state briefly
    const ok = await this.requireAuth();
    return ok;
  }
};
