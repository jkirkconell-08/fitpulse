/* =========================================================
   FitPulse - Registro de Service Worker + auto-actualización
   Cuando se publica una version nueva, el SW activa con
   skipWaiting()+clients.claim() y esta pestaña se recarga sola
   una vez, sin depender de que el usuario haga F5.
   ========================================================= */
(function () {
  if (!('serviceWorker' in navigator)) return;

  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  navigator.serviceWorker.register('sw.js').then((reg) => {
    const checkForUpdate = () => reg.update().catch(() => {});
    // Revisa apenas carga la pagina (no solo al volver a la pestaña o cada
    // 5 min) — asi una version nueva se detecta y aplica en cuanto se abre
    // la app, en vez de esperar a que la pestaña se reactive.
    checkForUpdate();
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') checkForUpdate();
    });
    setInterval(checkForUpdate, 5 * 60 * 1000);
  }).catch(() => {});
})();
