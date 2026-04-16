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
   * Initialize Lucide icons in the whole document (or a container)
   * Call after any dynamic innerHTML update
   */
  init(container = document) {
    if (window.lucide) {
      lucide.createIcons({ attrs: { 'stroke-width': '2' }, rootElement: container });
    }
  }
};
