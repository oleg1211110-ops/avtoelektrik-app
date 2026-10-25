/* «Заряжает ли генератор» — страница услуги «Ремонт генератора» avtoelektrik-pro.kz
   Вставка: <div class="ao-w" data-ao="charge"></div> + ao-site.js */
AO_SITE.reg('charge', {
css: [
'.w-charge svg text{font-family:inherit}',
'.w-charge svg svg{display:inline;width:104px;height:46px;overflow:hidden}',
'.w-charge .w-rg{margin-top:12px;background:#1A1A1A;border:1px solid #2E2E2E;border-radius:12px;padding:10px 14px}',
'.w-charge .w-rg label{display:block;color:#C9CED4;font-size:15px}.w-charge .w-rg b{color:#fff}',
'.w-charge .w-rg input{display:block;width:100%;height:36px;margin:4px 0 0;accent-color:#FFA500;cursor:pointer}',
'.w-charge .tabs{align-items:center}',
'.w-charge .tabs button{min-height:40px}',
'.w-charge .tl{color:#9AA3AD;font-size:13px;margin-right:2px}',
'.w-charge .card .lh{font-size:14px;color:#9AA3AD}',
'.w-charge .cap{fill:#9AA3AD;font-size:12px}.w-charge .cap.c{text-anchor:middle}',
'.w-charge .pl circle{fill:#1E1E1E;stroke:#5B6A77;stroke-width:3}.w-charge .pl path{stroke:#9AA3AD;stroke-width:3;stroke-linecap:round}',
'.w-charge .pc{animation:wchg-rot var(--wcp,1.6s) linear infinite}',
'.w-charge .pg{animation:wchg-rot var(--wgp,.6s) linear infinite}',
'@keyframes wchg-rot{to{transform:rotate(360deg)}}',
'.w-charge .belt{fill:none;stroke:#3A3A3A;stroke-width:6;stroke-linejoin:round}',
'.w-charge .belt.m{stroke:#6B7782;stroke-width:3;stroke-dasharray:10 14;animation:wchg-belt var(--wbt,.2s) linear infinite}',
'@keyframes wchg-belt{to{stroke-dashoffset:-24}}',
'.w-charge .gen{fill:#2F3438;stroke:#5B6A77;stroke-width:2}',
'.w-charge .fin{stroke:#3E454B;stroke-width:3}',
'.w-charge .ico{fill:none;stroke:#9AA3AD;stroke-width:2.5;stroke-linejoin:round;transition:stroke .2s}',
'.w-charge .ico.f{fill:#9AA3AD;stroke:none}',
'.w-charge.m-diode .ico.d,.w-charge.m-reg .ico.r{stroke:#EF5350}.w-charge.m-diode .ico.d.f,.w-charge.m-reg .ico.r.f{fill:#EF5350}',
'.w-charge.m-weak .ico.d,.w-charge.m-weak .ico.r{stroke:#FFA500}.w-charge.m-weak .ico.r.f{fill:#FFA500}',
'.w-charge .flt{fill:#EF5350;font-size:13px;font-weight:700;text-anchor:middle}',
'.w-charge .wr{fill:none;stroke:#5B6A77;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}',
'.w-charge .fl{fill:none;stroke:#FFD54F;stroke-width:2.5;stroke-linecap:round;stroke-dasharray:4 7;opacity:0;transition:opacity .2s}',
'.w-charge .fl.on{opacity:1;animation:wchg-fl .7s linear infinite}',
'.w-charge .fl.dis{stroke:#EF5350}',
'@keyframes wchg-fl{to{stroke-dashoffset:-11}}',
'.w-charge .bat .b{fill:#2B2B2B;stroke:#555;stroke-width:2}',
'.w-charge .tp{fill:#E53935}.w-charge .tn{fill:#9AA3AD}',
'.w-charge .bat text{fill:#C9CED4;font-size:13px;font-weight:700;text-anchor:middle}',
'.w-charge .bub circle{fill:#9FD3FF;opacity:0}',
'.w-charge.m-reg .bub circle{animation:wchg-bub 1s ease-in infinite}',
'.w-charge.m-reg .bub circle:nth-child(2){animation-delay:.35s}.w-charge.m-reg .bub circle:nth-child(3){animation-delay:.7s}',
'@keyframes wchg-bub{0%{opacity:0;transform:translateY(0)}30%{opacity:.9}100%{opacity:0;transform:translateY(-22px)}}',
'.w-charge .bst{font-size:12px;font-weight:700;text-anchor:middle;fill:#9AA3AD}',
'.w-charge .ok{fill:#5CC86C}.w-charge .mid{fill:#FFA500}.w-charge .bad{fill:#EF5350}',
'.w-charge .lcdr{fill:#B9CBA0}',
'.w-charge .lv{font-family:Menlo,Consolas,"Courier New",monospace;font-size:22px;font-weight:700;fill:#1B2414;text-anchor:middle}',
'.w-charge .ll{font-size:11px;fill:#1B2414;text-anchor:middle}',
'.w-charge .vs{font-size:13px;font-weight:700}',
'.w-charge .lamp{fill:#3A3A3A;transition:fill .2s}.w-charge .lamp.on{fill:#EF5350}',
'.w-charge .lamp.blink{fill:#EF5350;animation:wchg-bl .5s steps(2) infinite}',
'@keyframes wchg-bl{50%{fill:#5A2626}}',
'.w-charge .ld{cursor:pointer;outline:none}',
'.w-charge .ld .bx{fill:#1D1D1D;stroke:#3A3A3A;stroke-width:2;transition:stroke .2s}',
'.w-charge .ld.on .bx{stroke:#FFA500}',
'.w-charge .ld:focus-visible .bx{stroke:#4FC3F7}',
'.w-charge .ld text{fill:#C9CED4;font-size:13px;font-weight:700}',
'.w-charge .ld .ic{fill:none;stroke:#5B6A77;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}',
'.w-charge .ld.on .ic{stroke:#FFD54F}',
'.w-charge .beam{stroke:#FFE082;stroke-width:2.5;stroke-linecap:round;opacity:0}',
'.w-charge.m-diode .ld.on .beam{animation:wchg-fk .25s steps(2) infinite}',
'@keyframes wchg-fk{50%{opacity:.25}}',
'.w-charge .fan{transform-origin:328px 104px}.w-charge .ld.on .fan{animation:wchg-rot .5s linear infinite}',
'.w-charge .osc{fill:#0E1A12;stroke:#2E4A36;stroke-width:2}',
'.w-charge .tr{fill:none;stroke:#5CC86C;stroke-width:2;animation:wchg-tr .6s linear infinite}',
'.w-charge.m-diode .tr{stroke:#FFA500}',
'@keyframes wchg-tr{to{transform:translateX(-30px)}}',
'.w-charge.w-off *{animation-play-state:paused!important}',
'@media (prefers-reduced-motion:reduce){.w-charge *{animation:none!important;transition:none!important}}'
].join('\n'),
html: [
'<div class="aox w-charge"><div>',
'<h2>Заряжает ли генератор?</h2>',
'<p class="sub">Двигайте обороты, включайте фары, печку и обогрев, выбирайте неисправность — смотрите на вольтметр.</p>',
'<svg viewBox="0 22 420 240" role="img" aria-label="Двигатель крутит ремнём генератор; генератор заряжает аккумулятор и питает фары, печку и обогрев стекла; вольтметр показывает напряжение на аккумуляторе">',
/* ремень и шкивы */
'<path class="belt" d="M43 84L28 200A30 30 0 0 0 88 200L73 84A15 15 0 0 0 43 84Z"/>',
'<path class="belt m" d="M43 84L28 200A30 30 0 0 0 88 200L73 84A15 15 0 0 0 43 84Z"/>',
'<g class="pl pc" style="transform-origin:58px 200px"><circle cx="58" cy="200" r="24"/><path d="M58 182v36M40 200h36"/></g>',
'<text class="cap c" x="58" y="250">коленвал</text>',
/* генератор */
'<text class="flt" x="122" y="40"></text>',
'<rect class="gen" x="74" y="52" width="96" height="64" rx="20"/>',
'<path class="fin" d="M96 58v52M160 58v52"/>',
'<path class="ico d" d="M104 74l12 8-12 8zM117 74v16"/>',
'<path class="ico r" d="M134 74h18v16h-18z"/><path class="ico r f" d="M139 79h8v6h-8z"/>',
'<g class="pl pg" style="transform-origin:58px 84px"><circle cx="58" cy="84" r="12"/><path d="M58 75v18M49 84h18"/></g>',
'<text class="cap c" x="122" y="134">генератор</text>',
/* провода */
'<path class="wr" d="M170 70H296M220 70V152M296 58V150M296 58H312M296 104H312M296 150H312"/>',
'<path class="fl g" d="M170 70H220"/>',
'<path class="fl dn" d="M220 70V152"/><path class="fl up dis" d="M220 152V70"/>',
'<path class="fl ls" d="M220 70H296V150"/>',
/* АКБ */
'<g class="bat"><rect class="tp" x="214" y="150" width="12" height="7" rx="2"/><rect class="tn" x="256" y="150" width="12" height="7" rx="2"/>',
'<rect class="b" x="200" y="156" width="84" height="50" rx="6"/><text x="242" y="186">АКБ</text>',
'<g class="bub"><circle cx="218" cy="200" r="3"/><circle cx="242" cy="202" r="2.5"/><circle cx="266" cy="200" r="3"/></g></g>',
'<text class="bst" x="242" y="224">заряжается</text>',
/* вольтметр */
'<rect class="lcdr" x="100" y="152" width="88" height="56" rx="8"/><text class="lv" x="144" y="184">14,2 В</text><text class="ll" x="144" y="201">на АКБ</text>',
'<path class="lamp" d="M102 230h20v14h-20zM105 227h4v3h-4zM115 227h4v3h-4z"/>',
'<text class="vs" x="128" y="242">норма</text>',
/* нагрузки */
'<g class="ld" data-l="hl" role="button" tabindex="0" aria-label="Фары"><rect class="bx" x="312" y="40" width="100" height="36" rx="8"/>',
'<path class="ic" d="M330 48a10 10 0 0 1 0 20z"/><path class="beam" d="M334 50h10M334 58h10M334 66h10"/><text x="352" y="63">фары</text></g>',
'<g class="ld" data-l="ht" role="button" tabindex="0" aria-label="Печка"><rect class="bx" x="312" y="86" width="100" height="36" rx="8"/>',
'<g class="fan"><path class="ic" d="M328 94v20M318 104h20M321 97l14 14M335 97l-14 14"/></g><text x="352" y="109">печка</text></g>',
'<g class="ld" data-l="df" role="button" tabindex="0" aria-label="Обогрев стекла"><rect class="bx" x="312" y="132" width="100" height="36" rx="8"/>',
'<path class="ic" d="M318 142h22v16h-22zM322 146h14M322 150h14M322 154h14"/><text x="346" y="155">обогрев</text></g>',
/* пульсации */
'<rect class="osc" x="304" y="184" width="108" height="50" rx="6"/>',
'<svg x="306" y="186" width="104" height="46" viewBox="0 0 104 46"><path class="tr" d=""/></svg>',
'<text class="cap c" x="358" y="252">пульсации</text>',
'</svg>',
'<div class="w-rg"><label>Обороты двигателя: <b class="rv">800 об/мин</b><input type="range" min="700" max="3000" step="100" value="800" aria-label="Обороты двигателя"></label></div>',
'<div class="tabs ldt" role="group" aria-label="Нагрузки"><span class="tl">Включить:</span><button type="button" data-l="hl" aria-pressed="false">Фары</button><button type="button" data-l="ht" aria-pressed="false">Печка</button><button type="button" data-l="df" aria-pressed="false">Обогрев стекла</button></div>',
'<div class="tabs mdt" role="group" aria-label="Состояние генератора"><span class="tl">Генератор:</span></div>',
'</div>',
'<div class="card" aria-live="polite"><span class="k"></span><h3></h3><p class="t"></p><p class="lh">Что проверим:</p><ul></ul></div>',
'</div>'
].join(''),
init: function(R, U, ds){
var M = {
 ok: {n: 'Исправен', k: 'Генератор исправен', h: '13,5–14,5 В — зарядка в норме', f: '',
  t: 'Двигатель крутит шкив генератора через ремень. Регулятор держит 13,5–14,5 В на любых оборотах, даже с фарами, печкой и обогревом, — аккумулятор подзаряжается.',
  c: ['Замер напряжения на холостых и под нагрузкой', 'Ремень, натяжитель и шкив', 'Провода, клеммы и масса генератора']},
 weak: {n: 'Слабый', k: 'Неисправность', h: 'Слабый генератор: под нагрузкой проседает', f: 'слабая отдача',
  t: 'Без нагрузки — вроде норма, а на холостых с фарами и печкой напряжение падает ниже 13 В, и аккумулятор разряжается на ходу. Причины: износ щёток или регулятора, проскальзывает ремень, диоды, обмотки.',
  c: ['Замер под нагрузкой на холостых', 'Щётки, регулятор, диодный мост', 'Натяжение и состояние ремня']},
 diode: {n: 'Пробит диод', k: 'Неисправность', h: 'Пробит диод — пульсации', f: 'пробит диод',
  t: 'Одна фаза не работает: напряжение «пилит», фары мерцают, может светиться лампа зарядки, генератор гудит. Неисправный диод может ещё и разряжать АКБ на стоянке.',
  c: ['Пульсации — осциллографом или тестером', 'Диодный мост генератора', 'Утечка тока на стоянке']},
 reg: {n: 'Регулятор (перезаряд)', k: 'Неисправность', h: 'Перезаряд: выше 14,7 В', f: 'регулятор',
  t: 'Регулятор не ограничивает напряжение: аккумулятор «кипит» и теряет воду, перегорают лампы, достаётся блокам управления. Ездить так долго нельзя.',
  c: ['Регулятор напряжения и щёточный узел', 'Провода и масса генератора', 'Состояние аккумулятора после перезаряда']}
};
var keys = ['ok', 'weak', 'diode', 'reg'], W = {hl: 1, ht: 0.8, df: 1.2};
var mode = 'ok', rpm = 800, loads = {hl: true, ht: false, df: false}, used = false, vis = false, jit = 0;
function q(s){ return R.querySelector(s); }
function qa(s){ return Array.prototype.slice.call(R.querySelectorAll(s)); }
function clamp(v, a, b){ return v < a ? a : v > b ? b : v; }
var card = q('.card'), rg = q('input[type=range]'), mdt = q('.mdt');
card.insertAdjacentHTML('beforeend', U.ctas('Здравствуйте, Олег! Нужна проверка генератора.'));
var wa = q('.card .btn.w');
mdt.insertAdjacentHTML('beforeend', keys.map(function(k){ return '<button type="button" data-m="' + k + '" aria-pressed="false">' + M[k].n + '</button>'; }).join(''));
/* рисунок пульсаций: период 30 px, чтобы бесшовно сдвигать */
function trace(m){
 var d = 'M0 23', x, y, a = m === 'diode' ? 0 : m === 'weak' ? 2.5 : m === 'reg' ? 1.5 : 1.2;
 for (x = 0; x <= 140; x += 1){
  var ph = x % 30, hump = Math.abs(Math.sin(Math.PI * ph / 10));
  if (m === 'diode') y = ph >= 20 ? 23 + 13 * Math.sin(Math.PI * (ph - 20) / 10) : 23 - 7 * hump;
  else y = 23 - a * hump;
  d += 'L' + x + ' ' + y.toFixed(1);
 }
 return d;
}
function volts(){
 var f = (rpm - 700) / 2300, L = 0, k;
 for (k in loads) if (loads[k]) L += W[k];
 if (mode === 'ok') return 14.3 - 0.12 * L + 0.05 * f;
 if (mode === 'weak') return 13.2 - 0.5 * L + 0.7 * f;
 if (mode === 'diode') return 13.1 - 0.35 * L + 0.3 * f;
 return 15.1 + 0.5 * f - 0.08 * L;
}
function cls(el, base, c){ el.setAttribute('class', base + (c ? ' ' + c : '')); }
function render(){
 var d = M[mode], V = volts(), any = loads.hl || loads.ht || loads.df, Vs = V + jit;
 keys.forEach(function(k){ R.classList.toggle('m-' + k, k === mode); });
 /* скорость шкивов и ремня */
 var cp = 1.6 * 800 / rpm;
 R.style.setProperty('--wcp', cp.toFixed(2) + 's');
 R.style.setProperty('--wgp', (cp / 2.5).toFixed(2) + 's');
 R.style.setProperty('--wbt', (cp * 24 / 188).toFixed(3) + 's');
 q('.rv').textContent = rpm + ' об/мин';
 /* вольтметр */
 q('.lv').textContent = Vs.toFixed(1).replace('.', ',') + ' В';
 var st = V > 14.7 ? ['перезаряд', 'bad'] : V >= 13.5 ? ['норма', 'ok'] : V >= 12.8 ? ['мало', 'mid'] : ['разряд', 'bad'];
 var vs = q('.vs'); vs.textContent = st[0]; cls(vs, 'vs', st[1]);
 cls(q('.lamp'), 'lamp', mode === 'diode' ? 'blink' : V < 12.8 ? 'on' : '');
 /* потоки тока */
 var chg = V >= 12.8;
 q('.fl.g').classList.toggle('on', true);
 q('.fl.dn').classList.toggle('on', chg);
 q('.fl.up').classList.toggle('on', !chg && any);
 q('.fl.ls').classList.toggle('on', any);
 var bs = q('.bst');
 if (mode === 'reg'){ bs.textContent = 'кипит!'; cls(bs, 'bst', 'bad'); }
 else if (V >= 13.3){ bs.textContent = 'заряжается'; cls(bs, 'bst', 'ok'); }
 else if (chg){ bs.textContent = 'недозаряд'; cls(bs, 'bst', 'mid'); }
 else { bs.textContent = 'разряжается'; cls(bs, 'bst', 'bad'); }
 /* нагрузки: яркость фар зависит от напряжения */
 qa('.ld').forEach(function(g){ g.classList.toggle('on', !!loads[g.getAttribute('data-l')]); g.setAttribute('aria-pressed', loads[g.getAttribute('data-l')] ? 'true' : 'false'); });
 qa('.beam').forEach(function(b){ b.style.opacity = loads.hl ? clamp((V - 11) / 3.3, 0.15, 1).toFixed(2) : 0; });
 qa('.ldt button').forEach(function(b){ b.setAttribute('aria-pressed', loads[b.getAttribute('data-l')] ? 'true' : 'false'); });
 qa('.mdt button').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-m') === mode ? 'true' : 'false'); });
 q('.flt').textContent = d.f;
 /* карточка */
 q('.card .k').textContent = d.k; q('.card h3').textContent = d.h; q('.card .t').textContent = d.t;
 q('.card ul').innerHTML = d.c.map(function(x){ return '<li>' + x + '</li>'; }).join('');
 wa.href = U.wa('Здравствуйте, Олег! Нужна проверка генератора' + (mode === 'ok' ? '.' : ': ' + d.h.toLowerCase() + '.'));
}
var lastTr = '';
function setMode(m){ mode = m; if (lastTr !== m){ q('.tr').setAttribute('d', trace(m)); lastTr = m; } jit = 0; render(); }
function toggle(l){ loads[l] = !loads[l]; render(); U.buzz(10); }
function touch(){ used = true; }
R.addEventListener('pointerdown', touch);
R.addEventListener('keydown', touch);
rg.addEventListener('input', function(){ touch(); rpm = parseInt(rg.value, 10); render(); });
q('.ldt').addEventListener('click', function(e){ var b = e.target.closest('button[data-l]'); if (b){ touch(); toggle(b.getAttribute('data-l')); } });
mdt.addEventListener('click', function(e){ var b = e.target.closest('button[data-m]'); if (b){ touch(); U.buzz(12); setMode(b.getAttribute('data-m')); } });
qa('.ld').forEach(function(g){
 g.addEventListener('click', function(){ touch(); toggle(g.getAttribute('data-l')); });
 g.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); touch(); toggle(g.getAttribute('data-l')); } });
});
setMode('ok');
U.seen(R, function(v){ vis = v; R.classList.toggle('w-off', !v); });
/* живой вольтметр: лёгкое дрожание цифр, при пробитом диоде — сильнее */
if (!U.reduce) setInterval(function(){
 if (!vis || document.hidden) return;
 jit = (Math.random() - 0.5) * (mode === 'diode' ? 0.5 : 0.08); render();
}, 600);
/* автопоказ */
var AUTO = [
 {m: 'ok', l: {hl: true, ht: true, df: true}, r: 800},
 {m: 'weak', l: {hl: true, ht: true, df: true}, r: 800},
 {m: 'diode', l: {hl: true, ht: false, df: false}, r: 1500},
 {m: 'reg', l: {hl: false, ht: false, df: false}, r: 2000}
], ai = -1;
if (!U.reduce) setInterval(function(){
 if (used || !vis || document.hidden) return;
 ai = (ai + 1) % AUTO.length; var a = AUTO[ai];
 loads = {hl: a.l.hl, ht: a.l.ht, df: a.l.df}; rpm = a.r; rg.value = a.r; setMode(a.m);
}, 3600);
}});
