/* =========================================================
   FitPulse - Authentication (Firebase Auth)
   ========================================================= */

const Auth = {
  user: null,
  app: null,
  auth: null,
  db: null,
  initialized: false,

  async init() {
    // Check if Firebase config is set
    if (!FIREBASE_CONFIG.apiKey || FIREBASE_CONFIG.apiKey === 'TU_API_KEY_AQUI') {
      console.warn('Firebase not configured. Running in offline mode.');
      this._checkLocalUser();
      return;
    }

    try {
      // Initialize Firebase
      const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
      const { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
      const { getFirestore } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');

      this.app = initializeApp(FIREBASE_CONFIG);
      this.auth = getAuth(this.app);
      this.db = getFirestore(this.app);
      this.initialized = true;

      // Store modules for later use
      this._authModules = { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged };
      this._dbModule = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');

      // Listen for auth changes
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.user = user;
          localStorage.setItem('fitpulse_user', JSON.stringify({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL
          }));
          // Sync data from cloud
          CloudSync.pullFromCloud();
        } else {
          this.user = null;
          localStorage.removeItem('fitpulse_user');
        }
        this._updateUI();
      });

    } catch (e) {
      console.error('Firebase init error:', e);
      this._checkLocalUser();
    }
  },

  _checkLocalUser() {
    const saved = localStorage.getItem('fitpulse_user');
    if (saved) {
      this.user = JSON.parse(saved);
    }
    this._updateUI();
  },

  _updateUI() {
    // Update user avatar in header if exists
    const avatar = document.getElementById('user-avatar');
    if (avatar && this.user) {
      avatar.innerHTML = this.user.photo
        ? `<img src="${this.user.photo}" alt="${this.user.name}" class="avatar-img">`
        : `<div class="avatar-letter">${(this.user.name || 'U')[0]}</div>`;
      avatar.style.display = 'flex';
    }
  },

  async loginWithGoogle() {
    if (!this.initialized) {
      showToast('Firebase no configurado. Configura js/firebase-config.js', 'warning');
      return false;
    }

    try {
      const { signInWithPopup, GoogleAuthProvider } = this._authModules;
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      this.user = result.user;

      // Check if first time - needs onboarding
      const config = Storage.obtenerConfig();
      if (!config.nombre || config.nombre === 'Usuario') {
        return 'onboarding';
      }
      return 'dashboard';
    } catch (e) {
      console.error('Login error:', e);
      if (e.code === 'auth/popup-closed-by-user') return false;
      showToast('Error al iniciar sesión', 'warning');
      return false;
    }
  },

  async logout() {
    if (this.initialized && this.auth) {
      const { signOut } = this._authModules;
      await signOut(this.auth);
    }
    localStorage.removeItem('fitpulse_user');
    this.user = null;
    window.location.href = 'login.html';
  },

  isLoggedIn() {
    return !!this.user || !!localStorage.getItem('fitpulse_user');
  },

  getUser() {
    if (this.user) return this.user;
    const saved = localStorage.getItem('fitpulse_user');
    return saved ? JSON.parse(saved) : null;
  },

  // Check auth on page load - redirect to login if not logged in
  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  }
};
