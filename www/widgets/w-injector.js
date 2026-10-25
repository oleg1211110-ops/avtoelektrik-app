/* «Промывка форсунок» — страница промывки и проверки форсунок на стенде, avtoelektrik-pro.kz */
(function(){
var P = '.w-injector';
var css = [
P+' .chip{min-height:38px}',
P+' .inj .chip{min-width:48px}',
P+' .cap{align-self:center;font-size:13px;color:#C9CED4;margin-right:2px}',
P+' .row{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:12px}',
P+' .row .btn{min-height:44px;padding:10px 18px}',
P+' .row .btn:disabled{opacity:.65;cursor:default}',
P+' .seg{display:inline-flex}',
P+' .seg .chip{border-radius:0;min-height:44px;font-size:14px}',
P+' .seg .chip:first-child{border-radius:8px 0 0 8px}'+P+' .seg .chip:last-child{border-radius:0 8px 8px 0;margin-left:-1px}',
P+' svg text{font-family:inherit}',
P+' .lbl{font-size:14px;fill:#9AA3AD}',
P+' .nm{font-size:18px;font-weight:700;fill:#fff}',
P+' .stl{font-size:14px;font-weight:700;fill:#5CC86C}'+P+' .stl.bd{fill:#EF5350}'+P+' .stl.go{fill:#FFA500}',
P+' .val{font-size:14px;font-weight:700;fill:#5CC86C}'+P+' .val.mid{fill:#FFA500}'+P+' .val.bd{fill:#EF5350}',
P+' .num{font-size:14px;fill:#C9CED4}'+P+' .tb.on .num{fill:#FFA500;font-weight:700}',
P+' .tb{cursor:pointer;outline:none}',
P+' .tb .gl{fill:#161B20;stroke:#5B6A77;stroke-width:2;transition:stroke .2s}',
P+' .tb.on .gl{stroke:#FFA500;stroke-width:3}',
P+' .tb:focus-visible .gl{stroke:#4FC3F7;stroke-width:3}',
P+' .lq{fill:#FFD27A;opacity:.85;transform-box:fill-box;transform-origin:50% 100%;transition:transform .9s ease}',
P+' .drop{fill:#FFE3A3;transform:translate(calc(var(--x) * var(--f)),calc(var(--y) * var(--f)));opacity:.85;animation:wiS .7s linear infinite}',
P+' .big{animation-duration:1.3s;animation-timing-function:ease-in}',
'@keyframes wiS{from{transform:translate(0,0);opacity:.95}to{transform:translate(var(--x),var(--y));opacity:0}}',
P+' .jet{fill:none;stroke:#FFE3A3;stroke-width:3.5;stroke-linecap:round;stroke-dasharray:14 6;animation:wiJ .4s linear infinite}',
'@keyframes wiJ{to{stroke-dashoffset:-20}}',
P+' .spC,'+P+' .spD{transition:opacity .5s}',
P+' .spD{opacity:0}'+P+'.dirty .spD{opacity:1}'+P+'.dirty .spC{opacity:0}',
P+'.fl .spC,'+P+'.fl .spD{opacity:0}',
P+' .bub{opacity:0}'+P+'.fl .bub{opacity:1}',
P+' .bub circle{fill:none;stroke:#4FC3F7;stroke-width:1.5;animation:wiB 1s ease-out infinite}',
P+' .bub circle:nth-child(2n){animation-delay:.3s}'+P+' .bub circle:nth-child(3n){animation-delay:.6s}',
'@keyframes wiB{from{transform:translate(0,8px);opacity:0}30%{opacity:1}to{transform:translate(0,-22px);opacity:0}}',
P+'.fl .ib{animation:wiV .08s linear infinite}',
'@keyframes wiV{50%{transform:translate(1px,0)}}',
P+' .sum{display:flex;justify-content:space-between;flex-wrap:wrap;gap:4px 12px;margin-top:10px;background:#1D1D1D;border:1px solid #2E2E2E;border-radius:12px;padding:9px 12px;font-size:14px;color:#C9CED4}',
P+' .sum b{color:#fff}'+P+' .sum .ok{color:#5CC86C}'+P+' .sum .bd{color:#EF5350}',
P+'.ps *{animation-play-state:paused!important}',
'@media (prefers-reduced-motion:reduce){'+P+' *{animation:none!important;transition-duration:.01s!important}}'
].join('\n');

var seed = 11;
function rnd(){ seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
function drop(a, L, r, cls, dur){
  var x = (Math.sin(a * Math.PI / 180) * L).toFixed(1), y = (Math.cos(a * Math.PI / 180) * L).toFixed(1);
  return '<circle class="drop' + (cls ? ' ' + cls : '') + '" r="' + r + '" style="--x:' + x + 'px;--y:' + y + 'px;--f:' + (.15 + rnd() * .85).toFixed(2) + ';animation-delay:-' + (rnd() * dur).toFixed(2) + 's"/>';
}
var clean = '', dirty = '', i;
for (i = 0; i < 44; i++) clean += drop(-20 + 40 * (i / 43) + (rnd() - .5) * 2, 100 + rnd() * 20, 1.7, '', .7);
for (i = 0; i < 12; i++) dirty += drop(2 + rnd() * 16, 70 + rnd() * 45, 1.8, '', .7);
for (i = 0; i < 6; i++) dirty += drop(-4 + rnd() * 14, 30 + rnd() * 85, (3 + rnd() * 1.4).toFixed(1), 'big', 1.3);

var TX = [200, 248, 296, 344], tubes = '';
TX.forEach(function(x, k){
  tubes += '<g class="tb" data-i="' + k + '" tabindex="0" role="button" aria-label="Форсунка ' + (k + 1) + ' на стенде">' +
   '<rect class="gl" x="' + x + '" y="46" width="36" height="168" rx="6"/>' +
   '<rect class="lq" x="' + (x + 4) + '" y="60" width="28" height="150" rx="3"/>' +
   '<path d="M' + x + ' 97.5 h8 M' + x + ' 135 h8 M' + x + ' 172.5 h8" stroke="#7D8790" stroke-width="1.5"/>' +
   '<text class="val" x="' + (x + 18) + '" y="234" text-anchor="middle"></text>' +
   '<text class="num" x="' + (x + 18) + '" y="252" text-anchor="middle">Ф' + (k + 1) + '</text></g>';
});

var svg = '<svg viewBox="0 0 400 260" role="img" aria-label="Форсунка распыляет топливо в мерную колбу; справа стенд с производительностью четырёх форсунок">' +
 '<rect x="24" y="124" width="120" height="126" rx="6" fill="rgba(79,195,247,.05)" stroke="#3A4651" stroke-width="2"/>' +
 '<rect x="26" y="236" width="116" height="12" rx="3" fill="#FFD27A" opacity=".35"/>' +
 '<g transform="translate(84 112)">' +
  '<g class="spC"><path d="M0 0 L-44 116 L44 116 Z" fill="rgba(255,227,163,.10)"/>' + clean + '</g>' +
  '<g class="spD"><path d="M0 0 L4 116 L32 116 Z" fill="rgba(255,227,163,.07)"/><path class="jet" d="M0 0 L12 112"/>' + dirty + '</g>' +
 '</g>' +
 '<g class="ib"><rect x="66" y="10" width="36" height="18" rx="3" fill="#3A4651" stroke="#5B6A77" stroke-width="2"/>' +
  '<rect x="60" y="26" width="48" height="58" rx="8" fill="#2F3A44" stroke="#7D8790" stroke-width="2"/>' +
  '<rect x="60" y="34" width="48" height="6" fill="#1A1A1A"/>' +
  '<rect x="70" y="84" width="28" height="22" rx="4" fill="#3A4651" stroke="#7D8790" stroke-width="2"/>' +
  '<rect x="78" y="104" width="12" height="8" rx="2" fill="#C9CED4"/></g>' +
 '<g class="bub"><circle cx="58" cy="60" r="4"/><circle cx="112" cy="48" r="3"/><circle cx="54" cy="96" r="3"/><circle cx="114" cy="86" r="4"/><circle cx="66" cy="112" r="3"/><circle cx="104" cy="114" r="3"/><circle cx="50" cy="30" r="3"/><circle cx="118" cy="22" r="3"/></g>' +
 '<text class="nm" x="114" y="44">Ф2</text><text class="stl" x="114" y="64"></text>' +
 '<text class="lbl" x="196" y="30">Подача, % от эталона</text>' +
 tubes +
 '<path d="M194 60 H386" stroke="#5CC86C" stroke-width="2" stroke-dasharray="4 4"/>' +
'</svg>';

var html = '<div class="aox w-injector"><div>' +
 '<h2>Промывка форсунок</h2>' +
 '<p class="sub">Выберите форсунку и нажмите «Промыть» — факел распыла выровняется, а подача на стенде станет одинаковой.</p>' +
 svg +
 '<div class="sum" aria-hidden="true"><span class="s1"></span><span class="s2"></span></div>' +
 '<div class="row"><div class="seg" role="group" aria-label="До или после промывки"><button type="button" class="chip" data-s="b" aria-pressed="true">До промывки</button><button type="button" class="chip" data-s="a" aria-pressed="false">После</button></div>' +
 '<button type="button" class="btn o go">Промыть</button></div>' +
 '<div class="tabs inj" role="group" aria-label="Форсунка"><span class="cap">Форсунка:</span></div>' +
'</div>' +
'<div class="card"><span class="k"></span><h3></h3><p class="t"></p><ul></ul></div></div>';

AO_SITE.reg('injector', {css: css, html: html, init: function(R, U){
var V = {b: [97, 81, 99, 88], a: [99, 97, 100, 98]};
var LIST = ['Замер производительности каждой форсунки на стенде','Промывка и проверка факела распыла, нет ли подтёков','Повторный замер; форсунку, которая не отмылась, — под замену'];
var st = 'b', sel = 1, busy = false, used = false, vis = true, tm = [], step = 0;
var STEPS = [['b', 1], ['b', 3], ['flush', 3], ['a', 1]];
function $(q){ return R.querySelector(q); }
function $$(q){ return R.querySelectorAll(q); }
var card = $('.card'), btn = $('.go');
card.insertAdjacentHTML('beforeend', U.ctas('Здравствуйте, Олег! Нужна промывка и проверка форсунок.'));
$('.card ul').innerHTML = LIST.map(function(x){ return '<li>' + x + '</li>'; }).join('');
$('.inj').insertAdjacentHTML('beforeend', [0, 1, 2, 3].map(function(k){ return '<button type="button" class="chip" data-i="' + k + '" aria-pressed="false">Ф' + (k + 1) + '</button>'; }).join(''));

function cls(v){ return v >= 95 ? '' : v >= 90 ? ' mid' : ' bd'; }
function clearT(){ tm.forEach(clearTimeout); tm = []; }
function later(fn, ms){ tm.push(setTimeout(fn, U.reduce ? 0 : ms)); }
function bench(stagger){
  var vals = V[st], tbs = $$('.tb');
  [].forEach.call(tbs, function(g, k){
    var lq = g.querySelector('.lq'), v = vals[k];
    lq.style.transitionDelay = stagger ? (k * 180) + 'ms' : '0ms';
    lq.style.transform = 'scaleY(' + (v / 100) + ')';
    var t = g.querySelector('.val'); t.textContent = v + '%'; t.setAttribute('class', 'val' + cls(v));
  });
  var spread = Math.max.apply(null, vals) - Math.min.apply(null, vals), ok = spread <= 5;
  $('.s1').innerHTML = 'Разброс между форсунками: <b class="' + (ok ? 'ok' : 'bd') + '">' + spread + ' %</b>';
  $('.s2').textContent = st === 'b' ? 'до промывки' : 'после промывки';
}
function show(){
  var v = V[st][sel], dirty = v < 92;
  R.classList.toggle('dirty', dirty);
  $('.nm').textContent = 'Ф' + (sel + 1);
  var s = $('.stl'); s.textContent = dirty ? 'грязная' : 'чистая'; s.setAttribute('class', 'stl' + (dirty ? ' bd' : ''));
  [].forEach.call($$('.tb'), function(g){ g.classList.toggle('on', +g.getAttribute('data-i') === sel); });
  [].forEach.call($$('.inj .chip'), function(b){ b.setAttribute('aria-pressed', +b.getAttribute('data-i') === sel ? 'true' : 'false'); });
  [].forEach.call($$('.seg .chip'), function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-s') === st ? 'true' : 'false'); });
  var n = 'Форсунка ' + (sel + 1);
  $('.card .k').textContent = n + (st === 'b' ? ' · до промывки' : ' · после промывки');
  if (st === 'a') {
    $('.card h3').textContent = 'Факел ровный, подача выровнялась';
    $('.card .t').textContent = 'После промывки снова проверяем все форсунки на стенде: факел и производительность. Если форсунка не вышла в норму — её лучше заменить, промывка помогает не всегда.';
  } else if (dirty) {
    $('.card h3').textContent = 'Загрязнённая: струя и капли';
    $('.card .t').textContent = 'Отложения в сопле ломают факел: вместо тумана — струя и крупные капли, подача меньше нормы. Топливо хуже сгорает: троит, плавают обороты, растёт расход, провалы при разгоне.';
  } else {
    $('.card h3').textContent = 'В норме: ровный конус';
    $('.card .t').textContent = 'Топливо распыляется мелким туманом ровным конусом — так оно лучше смешивается с воздухом и полностью сгорает. Подача близка к эталону.';
  }
}
function setState(s, stagger){ clearT(); busy = false; btn.disabled = false; R.classList.remove('fl'); st = s; bench(stagger); show(); }
function pick(k){ sel = k; if (!busy) show(); else [].forEach.call($$('.tb'), function(g){ g.classList.toggle('on', +g.getAttribute('data-i') === sel); }); }
function flush(){
  setState('b', false); busy = true; btn.disabled = true; btn.textContent = 'Промываем…';
  R.classList.add('fl'); var s = $('.stl'); s.textContent = 'промывка'; s.setAttribute('class', 'stl go');
  later(function(){ R.classList.remove('fl'); busy = false; btn.disabled = false; btn.textContent = 'Промыть'; st = 'a'; bench(true); show(); }, 1700);
}
function touch(){ if (used) return; used = true; card.setAttribute('aria-live', 'polite'); }
R.addEventListener('pointerdown', touch);
R.addEventListener('keydown', function(e){
  touch();
  var t = e.target.closest && e.target.closest('.tb');
  if (t && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pick(+t.getAttribute('data-i')); }
});
R.addEventListener('click', function(e){
  var t = e.target.closest('button, .tb'); if (!t || !R.contains(t)) return;
  touch();
  if (t.classList.contains('go')) flush();
  else if (t.hasAttribute('data-s')) setState(t.getAttribute('data-s'), true);
  else if (t.hasAttribute('data-i')) pick(+t.getAttribute('data-i'));
  else return;
  U.buzz(12);
});
setState('b', false);
U.seen(R, function(v){ vis = v; R.classList.toggle('ps', !v); });
if (!U.reduce) setInterval(function(){
  if (used || !vis || document.hidden || busy) return;
  step = (step + 1) % STEPS.length; var s = STEPS[step];
  sel = s[1];
  if (s[0] === 'flush') flush(); else setState(s[0], true);
}, 3600);
}});
})();
