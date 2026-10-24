/* Интерактивные анимации для сайта avtoelektrik-pro.kz (Тильда, блок T123).
   Вставка на страницу:  <div class="ao-w" data-ao="car"></div><script src="https://help.avtoelektrik-pro.kz/widgets/ao-site.js" defer></script>
   Каждая анимация — свой файл w-<имя>.js, подгружается сам. © АвтоЭлектрик Олег · AVTOELEKTRIK-PRO.KZ */
(function(){
if (window.AO_SITE) { window.AO_SITE.mount(); return; }
var VER = '1';
var cur = document.currentScript && document.currentScript.src || 'https://help.avtoelektrik-pro.kz/widgets/ao-site.js';
var BASE = cur.replace(/[^\/]*$/, '');
var W = {}, loading = {};
/* общий стиль: чёрная карточка, оранжевый акцент, шрифт Arial — как на avtoelektrik-pro.kz */
var CSS = '.ao-w{display:block}.ao-pad{padding:28px 16px}' +
'.aox{--o:#FFA500;--k:#111;--w:#fff;font-family:Arial,"Helvetica Neue",Helvetica,sans-serif;color:#fff;background:#111;border-radius:24px;max-width:1160px;margin:0 auto;padding:clamp(18px,3vw,36px);box-sizing:border-box;display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:clamp(16px,3vw,36px);align-items:center}' +
'.aox *{box-sizing:border-box}.aox h2{margin:0 0 8px;font-size:clamp(24px,3.4vw,40px);line-height:1.15;font-weight:600;color:#fff}' +
'.aox .sub{margin:0 0 16px;color:#C9CED4;font-size:16px;line-height:1.45}.aox svg{display:block;width:100%;height:auto;-webkit-tap-highlight-color:transparent;user-select:none}' +
'.aox .card{background:#1D1D1D;border:1px solid #2E2E2E;border-radius:18px;padding:18px;min-height:230px;display:flex;flex-direction:column;gap:10px}' +
'.aox .card .k{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#FFA500;font-weight:700}.aox .card h3{margin:0;font-size:22px;line-height:1.2;color:#fff;font-weight:600}' +
'.aox .card p{margin:0;color:#D9DDE1;font-size:15.5px;line-height:1.5}.aox .card ul{margin:0;padding-left:20px;color:#D9DDE1;font-size:15px;line-height:1.45}' +
'.aox .btns{display:flex;flex-wrap:wrap;gap:10px;margin-top:auto}.aox .btn{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:12px 20px;border-radius:8px;font-weight:600;font-size:15px;text-decoration:none;border:2px solid transparent;font-family:inherit;cursor:pointer}' +
'.aox .btn.o{background:#FFA500;color:#111}.aox .btn.w{border-color:#fff;color:#fff;background:transparent}' +
'.aox .tabs{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}.aox .tabs button,.aox .chip{font:inherit;font-size:13px;font-weight:600;color:#fff;background:#222;border:1px solid #3A3A3A;border-radius:8px;padding:7px 10px;cursor:pointer}' +
'.aox .tabs button[aria-pressed="true"],.aox .chip[aria-pressed="true"]{background:#FFA500;border-color:#FFA500;color:#111}' +
'.aox .lcd{background:#B9CBA0;color:#1B2414;border-radius:10px;padding:8px 12px;font-family:Menlo,Consolas,"Courier New",monospace;font-weight:700;font-size:14px}' +
'.aox button:focus-visible,.aox a:focus-visible,.aox [tabindex]:focus-visible{outline:3px solid #4FC3F7;outline-offset:2px}' +
'@media (max-width:820px){.aox{grid-template-columns:minmax(0,1fr)}}';
function css(id, text){ if (!text || document.getElementById(id)) return; var st = document.createElement('style'); st.id = id; st.textContent = text; document.head.appendChild(st); }
/* общие помощники для анимаций */
var U = {
  reduce: !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches),
  /* следит, виден ли блок: анимации и автопоказ работают только на экране */
  seen: function(el, cb){ if (!('IntersectionObserver' in window)) { cb(true); return; } new IntersectionObserver(function(es){ cb(es[0].isIntersecting); }, {threshold: 0.2}).observe(el); },
  wa: function(text){ return 'https://wa.me/77011211110?text=' + encodeURIComponent(text); },
  tel: 'tel:+77011211110',
  buzz: function(ms){ try { if (navigator.vibrate) navigator.vibrate(ms || 12); } catch (e) {} },
  ctas: function(waText){ return '<div class="btns"><a class="btn o" href="tel:+77011211110">Позвонить мастеру</a><a class="btn w" href="' + 'https://wa.me/77011211110?text=' + encodeURIComponent(waText || 'Здравствуйте, Олег!') + '" target="_blank" rel="noopener">Написать в WhatsApp</a></div>'; }
};
function mount(){
  css('ao-site-css', CSS);
  document.querySelectorAll('.ao-w[data-ao]').forEach(function(el){
    if (el.dataset.aoOn) return;
    var n = el.dataset.ao, w = W[n];
    if (w){ el.dataset.aoOn = '1'; css('ao-css-' + n, w.css); el.innerHTML = '<div class="ao-pad">' + w.html + '</div>'; try { w.init(el.querySelector('.ao-pad > *'), U, el.dataset); } catch (e) { if (window.console) console.warn('ao-site', n, e); } }
    else if (!loading[n] && /^[a-z0-9-]+$/.test(n)){ loading[n] = 1; var s = document.createElement('script'); s.src = BASE + 'w-' + n + '.js?v=' + VER; s.defer = true; document.head.appendChild(s); }
  });
}
window.AO_SITE = {mount: mount, W: W, U: U, reg: function(name, def){ W[name] = def; mount(); }};
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
