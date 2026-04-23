/* =========================================================
   FitPulse - Lucide Icon Helper
   Wrapper sobre Lucide Icons CDN (https://lucide.dev)
   Uso: Icons.get('flame', 'icon-md icon-accent')
   ========================================================= */

const Icons = {
  /* Map internal names → Lucide icon names */
  _map: {
    home:       'home',
    check:      'check',
    check_sq:   'check-square',
    menu:       'more-vertical',
    settings:   'settings',
    edit:       'pencil',
    trash:      'trash-2',
    close:      'x',
    plus:       'plus',
    arrow_r:    'chevron-right',
    lock:       'lock',
    sun:        'sun',
    sunrise:    'sunrise',
    moon:       'moon',
    clock:      'clock',
    calendar:   'calendar',
    pin:        'map-pin',
    dumbbell:   'dumbbell',
    heart:      'heart',
    flame:      'flame',
    run:        'activity',
    scale2:     'scale',
    ruler:      'ruler',
    trophy:     'trophy',
    flag:       'flag',
    target:     'target',
    bolt:       'zap',
    drop:       'droplets',
    cup:        'cup-soda',
    utensils:   'utensils',
    coffee:     'coffee',
    apple:      'apple',
    leaf:       'leaf',
    user:       'user',
    users:      'users',
    bed:        'bed',
    brain:      'brain',
    book:       'book-open',
    meditation: 'wind',
    shower:     'shower-head',
    pill:       'pill',
    wave:       'hand',
    cloud:      'cloud',
    upload:     'upload-cloud',
    download:   'download-cloud',
    logout:     'log-out',
    signin:     'log-in',
    chart:      'bar-chart-2',
    trending:   'trending-up',
    star:       'star',
    note:       'file-text',
    bell:       'bell',
    grid:       'layout-grid',
    muscle:     'dumbbell',
    sparkle:    'sparkles',
  },

  /**
   * Returns an <i data-lucide> HTML string
   * @param {string} name   - internal icon name (key from _map)
   * @param {string} cls    - CSS classes  e.g. 'icon-md icon-accent'
   * @param {number} size   - pixel size (default 20)
   */
  get(name, cls = '', size = 20) {
    const lucideName = this._map[name] || name;
    return `<i data-lucide="${lucideName}" class="icon ${cls}" style="width:${size}px;height:${size}px;"></i>`;
  },

  /**
   * Initialize Lucide icons in a container.
   * Uses requestAnimationFrame so the DOM is painted first.
   * Retries up to 4 times if the Lucide CDN is not yet loaded (defer).
   */
  init(container = document, _retries = 4) {
    const run = () => {
      if (window.lucide) {
        try {
          lucide.createIcons({ attrs: { 'stroke-width': '2' }, rootElement: container });
        } catch(e) { console.warn('Lucide init error:', e); }
      } else if (_retries > 0) {
        setTimeout(() => Icons.init(container, _retries - 1), 150);
      }
    };
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(run);
    } else {
      run();
    }
  }
};
