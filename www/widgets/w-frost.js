/* «Почему зимой не заводится и как отогреть» — страница услуги «Отогрев авто» avtoelektrik-pro.kz
   Вставка: <div class="ao-w" data-ao="frost"></div> + ao-site.js */
AO_SITE.reg('frost', {
css: [
'.w-frost svg text{font-family:inherit}',
'.w-frost .w-rg{margin-top:12px;background:#1A1A1A;border:1px solid #2E2E2E;border-radius:12px;padding:10px 14px}',
'.w-frost .w-rg label{display:block;color:#C9CED4;font-size:15px}',
'.w-frost .w-rg b{color:#4FC3F7}',
'.w-frost .w-rg input{display:block;width:100%;height:36px;margin:4px 0 0;accent-color:#FFA500;cursor:pointer}',
'.w-frost .w-ctl{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}',
'.w-frost .w-ctl .btn{min-height:44px;padding:10px 18px}',
'.w-frost .tabs button{min-height:40px}',
'.w-frost .card .lh{font-size:14px;color:#9AA3AD}',
'.w-frost .bay{fill:#181818;stroke:#2E2E2E;stroke-width:2}',
'.w-frost .tube{fill:#222;stroke:#555;stroke-width:2}',
'.w-frost .merc{fill:#4FC3F7}',
'.w-frost .tick{stroke:#555;stroke-width:2}',
'.w-frost .tl{fill:#9AA3AD;font-size:12px}',
'.w-frost .tt{fill:#4FC3F7;font-size:15px;font-weight:700;text-anchor:middle}',
'.w-frost .cap{fill:#9AA3AD;font-size:12px}',
'.w-frost .cap.c{text-anchor:middle}.w-frost .cap.e{text-anchor:end;fill:#fff;font-weight:700}',
'.w-frost .uh{fill:#C9CED4;font-size:13px}.w-frost .uh tspan{font-weight:700}',
'.w-frost .badge{font-size:13px;font-weight:700;text-anchor:end;fill:#FFA500}',
'.w-frost .badge.ok{fill:#5CC86C}.w-frost .badge.bad{fill:#EF5350}',
'.w-frost .bat .b{fill:#2B2B2B;stroke:#555;stroke-width:2}',
'.w-frost .tp{fill:#E53935}.w-frost .tn{fill:#9AA3AD}',
'.w-frost .bat text{fill:#C9CED4;font-size:14px;font-weight:700;text-anchor:middle}',
'.w-frost .ice{fill:#BFE6FF;pointer-events:none;transition:opacity .4s}',
'.w-frost .bg{fill:#151515;stroke:#3A3A3A}',
'.w-frost .bar{transition:transform .35s ease,fill .3s}',
'.w-frost .pw{fill:#5CC86C;transform-origin:92px 0}.w-frost .pw.mid{fill:#FFA500}.w-frost .pw.bad{fill:#EF5350}',
'.w-frost .oil{fill:#C68A12;transform-origin:192px 0}',
'.w-frost .eng .blk{fill:#262626;stroke:#444;stroke-width:2}',
'.w-frost .drop{fill:#C68A12}',
'.w-frost .pul circle{fill:#1E1E1E;stroke:#5B6A77;stroke-width:3}',
'.w-frost .pul path{stroke:#5B6A77;stroke-width:3;stroke-linecap:round}',
'.w-frost.crk .pul path,.w-frost.run .pul path{stroke:#FFA500}',
'.w-frost.crk .pul,.w-frost.run .pul{animation:wfrost-rot var(--wfd,.4s) linear infinite}',
'.w-frost.run .eng{animation:wfrost-sh .14s linear infinite}',
'@keyframes wfrost-rot{to{transform:rotate(360deg)}}',
'@keyframes wfrost-sh{50%{transform:translate(.8px,-.6px)}}',
'.w-frost .clk{opacity:0;fill:#FFA500;font-size:14px;font-weight:700;text-anchor:middle}',
'.w-frost.clicks .clk{opacity:1;animation:wfrost-bl .5s steps(2) 3}',
'@keyframes wfrost-bl{50%{opacity:0}}',
'.w-frost .arc{fill:none;stroke-width:7}',
'.w-frost .arc.r{stroke:#EF5350}.w-frost .arc.g{stroke:#5CC86C}',
'.w-frost .ndl{stroke:#fff;stroke-width:3;stroke-linecap:round;transform-origin:360px 128px;transition:transform .45s ease}',
'.w-frost .hub{fill:#fff}',
'.w-frost .gs{font-size:13px;font-weight:700;text-anchor:middle;fill:#fff}',
'.w-frost .gs.ok{fill:#5CC86C}.w-frost .gs.mid{fill:#FFA500}.w-frost .gs.bad{fill:#EF5350}',
'.w-frost .gun .gb{fill:#333;stroke:#555;stroke-width:2}',
'.w-frost .gun .nz{fill:#444;transition:fill .3s}.w-frost.hot .gun .nz{fill:#FFA500}',
'.w-frost .gf path{stroke:#9AA3AD;stroke-width:2.5;stroke-linecap:round}',
'.w-frost.hot .gf{animation:wfrost-rot .35s linear infinite}',
'.w-frost .air{fill:none;stroke:#FFA500;stroke-width:3;stroke-linecap:round;stroke-dasharray:6 7;opacity:0;transition:opacity .3s}',
'.w-frost.hot .air{opacity:.9;animation:wfrost-air .7s linear infinite}',
'@keyframes wfrost-air{to{stroke-dashoffset:-13}}',
'.w-frost .fl path{fill:none;stroke:#BFE6FF;stroke-width:2;stroke-linecap:round}',
'.w-frost .fl{transition:opacity .4s}',
'.w-frost.w-off *{animation-play-state:paused!important}',
'@media (prefers-reduced-motion:reduce){.w-frost *{animation:none!important;transition:none!important}}'
].join('\n'),
html: [
'<div class="aox w-frost"><div>',
'<h2>Не заводится в мороз — почему и как отогреть</h2>',
'<p class="sub">Двигайте ползунок мороза и жмите «Завести» или «Отогреть» — схема покажет, что происходит под капотом.</p>',
'<svg viewBox="0 0 420 266" role="img" aria-label="Термометр, аккумулятор, двигатель и стрелка скорости прокрутки стартера на морозе; тепловая пушка дует тёплый воздух под капот">',
/* термометр */
'<text class="tt" x="34" y="28">−25°</text>',
'<rect class="tube" x="24" y="40" width="20" height="160" rx="10"/><circle class="merc" cx="34" cy="212" r="16"/>',
'<rect class="merc mc" x="29" y="125" width="10" height="87" rx="5"/>',
'<path class="tick" d="M44 60h6M44 125h6M44 190h6"/>',
'<text class="tl" x="53" y="64">0</text><text class="tl" x="53" y="129">−20</text><text class="tl" x="53" y="194">−40</text>',
'<text class="cap c" x="34" y="248">улица</text>',
/* подкапотное пространство */
'<rect class="bay" x="82" y="20" width="330" height="184" rx="16"/>',
'<text class="uh" x="96" y="42">под капотом: <tspan class="te">−25 °C</tspan></text>',
'<text class="badge" x="398" y="42"></text>',
'<g class="fl"><path d="M186 56v10M181 61h10M182.5 57.5l7 7M189.5 57.5l-7 7"/><path d="M318 62v10M313 67h10M314.5 63.5l7 7M321.5 63.5l-7 7"/>',
'<path d="M394 182v10M389 187h10M390.5 183.5l7 7M397.5 183.5l-7 7"/><path d="M110 168v10M105 173h10M106.5 169.5l7 7M113.5 169.5l-7 7"/></g>',
/* АКБ */
'<g class="bat"><rect class="tp" x="102" y="58" width="12" height="7" rx="2"/><rect class="tn" x="154" y="58" width="12" height="7" rx="2"/>',
'<rect class="b" x="92" y="64" width="84" height="52" rx="6"/><text x="134" y="95">АКБ</text>',
'<rect class="ice" x="92" y="64" width="84" height="52" rx="6" opacity="0"/></g>',
'<text class="cap" x="92" y="134">мощность</text><text class="cap e pv" x="176" y="134">50%</text>',
'<rect class="bg" x="92" y="140" width="84" height="10" rx="3"/><rect class="bar pw" x="92" y="140" width="84" height="10" rx="3"/>',
/* двигатель */
'<g class="eng"><rect class="blk" x="196" y="56" width="108" height="96" rx="10"/>',
'<path class="drop" d="M224 84c-7 10-12 16-12 22a12 12 0 0 0 24 0c0-6-5-12-12-22z"/>',
'<g class="pul" style="transform-origin:272px 112px"><circle cx="272" cy="112" r="20"/><path d="M272 96v32M256 112h32M261 101l22 22M283 101l-22 22"/></g>',
'<text class="clk" x="272" y="146">щёлк…</text></g>',
'<text class="cap" x="196" y="170">масло</text><text class="cap e ov" x="304" y="170">густое</text>',
'<rect class="bg" x="196" y="176" width="108" height="10" rx="3"/><rect class="bar oil" x="196" y="176" width="108" height="10" rx="3"/>',
/* стрелка прокрутки */
'<path class="arc r" d="M324 128A36 36 0 0 1 348.9 93.8"/><path class="arc g" d="M348.9 93.8A36 36 0 0 1 396 128"/>',
'<line class="ndl" x1="360" y1="128" x2="360" y2="98"/><circle class="hub" cx="360" cy="128" r="4"/>',
'<text class="cap c" x="360" y="148">прокрутка</text><text class="gs" x="360" y="168">медленно</text>',
/* тепловая пушка и тёплый воздух */
'<path class="air" d="M166 224C178 210 152 200 162 184"/><path class="air" d="M168 230C198 222 198 204 224 194"/><path class="air" d="M168 236C222 236 238 214 264 200"/>',
'<g class="gun"><rect class="gb" x="96" y="216" width="56" height="30" rx="8"/><rect class="nz" x="150" y="222" width="16" height="18" rx="3"/>',
'<g class="gf" style="transform-origin:116px 231px"><path d="M116 223v16M108 231h16"/></g></g>',
'<text class="cap" x="96" y="261">тепловая пушка</text>',
'</svg>',
'<div class="w-rg"><label>Мороз на улице: <b class="tv">−25 °C</b><input type="range" min="-40" max="0" step="1" value="-25" aria-label="Температура на улице"></label></div>',
'<div class="w-ctl"><button type="button" class="btn o go">Завести</button><button type="button" class="btn w hot-b">Отогреть</button></div>',
'<div class="tabs" role="group" aria-label="Состояние аккумулятора"><button type="button" class="chip" data-b="1" aria-pressed="true">АКБ заряжен</button><button type="button" class="chip" data-b="0" aria-pressed="false">АКБ подсевший</button></div>',
'</div>',
'<div class="card" aria-live="polite"><span class="k"></span><h3></h3><p class="t"></p><p class="lh"></p><ul></ul></div>',
'</div>'
].join(''),
init: function(R, U, ds){
var T = -25, Te = -25, good = true, ph = 'idle', used = false, vis = false, tm = [], iv = null;
function q(s){ return R.querySelector(s); }
function qa(s){ return Array.prototype.slice.call(R.querySelectorAll(s)); }
function clamp(v, a, b){ return v < a ? a : v > b ? b : v; }
function deg(v){ v = Math.round(v); return (v < 0 ? '−' + (-v) : v > 0 ? '+' + v : '0') + ' °C'; }
function later(f, ms){ tm.push(setTimeout(f, ms)); }
function stop(){ tm.forEach(clearTimeout); tm = []; if (iv){ clearInterval(iv); iv = null; } }
/* условная модель: отдача АКБ падает на холоде, густое масло требует больше силы */
function model(t){
 var p = clamp(0.8 + 0.012 * t, 0.05, 1) * (good ? 1 : 0.65);
 var n = clamp(0.3 - 0.0155 * t, 0.22, 1);
 return {p: p, n: n, s: clamp(p / n * 0.5, 0, 1)};
}
var card = q('.card'), rg = q('input[type=range]');
card.insertAdjacentHTML('beforeend', U.ctas('Здравствуйте, Олег! Машина не заводится на морозе, нужен отогрев.'));
var wa = q('.card .btn.w');
var L1 = ['Проверка АКБ под нагрузкой и зарядка', 'Замер зарядки генератора', 'Клеммы, масса и стартер'];
var L2 = ['Отогрев двигателя и АКБ тёплым воздухом — без огня', 'Проверка и зарядка аккумулятора', 'Стартер, клеммы, масса; на дизеле — свечи накала'];
function setCls(el, base, c){ el.setAttribute('class', base + (c ? ' ' + c : '')); }
function render(){
 var m = model(Te), warmed = Te > T + 3;
 /* термометр */
 var y = 60 + (-T) * 130 / 40;
 var mc = q('.mc'); mc.setAttribute('y', y.toFixed(1)); mc.setAttribute('height', (212 - y).toFixed(1));
 q('.tt').textContent = (T < 0 ? '−' + (-T) : T) + '°';
 q('.tv').textContent = deg(T);
 q('.te').textContent = deg(Te);
 q('.te').setAttribute('fill', Te > 0 ? '#5CC86C' : Te > -10 ? '#FFA500' : '#4FC3F7');
 /* АКБ и масло */
 var pw = q('.pw'); pw.style.transform = 'scaleX(' + m.p.toFixed(3) + ')';
 setCls(pw, 'bar pw', m.p < 0.4 ? 'bad' : m.p < 0.6 ? 'mid' : '');
 q('.pv').textContent = Math.round(m.p * 100) + '%';
 q('.oil').style.transform = 'scaleX(' + m.n.toFixed(3) + ')';
 q('.ov').textContent = Te >= 0 ? 'жидкое' : Te > -15 ? 'густеет' : Te > -30 ? 'густое' : 'как мёд';
 q('.ice').setAttribute('opacity', (clamp(-Te / 40, 0, 1) * 0.35).toFixed(2));
 q('.fl').style.opacity = clamp((-Te - 5) / 25, 0, 1).toFixed(2);
 /* стрелка прокрутки */
 q('.ndl').style.transform = 'rotate(' + (-90 + m.s * 180).toFixed(1) + 'deg)';
 var gs = q('.gs');
 gs.textContent = m.s < 0.15 ? 'не крутит' : m.s < 0.4 ? 'медленно' : m.s < 0.7 ? 'нормально' : 'бодро';
 setCls(gs, 'gs', m.s < 0.15 ? 'bad' : m.s < 0.4 ? 'bad' : m.s < 0.7 ? 'mid' : 'ok');
 R.style.setProperty('--wfd', (m.s >= 0.4 && ph === 'run' ? 0.18 : 0.25 + (1 - m.s) * 1.1).toFixed(2) + 's');
 /* состояние */
 R.classList.toggle('crk', ph === 'crank');
 R.classList.toggle('run', ph === 'run');
 R.classList.toggle('hot', ph === 'warm');
 R.classList.toggle('clicks', ph === 'click');
 var bd = q('.badge'), B = {idle: ['', ''], crank: ['КРУТИМ…', ''], run: ['ЗАВЕЛАСЬ', 'ok'], fail: ['НЕ ЗАВЕЛАСЬ', 'bad'], click: ['ТОЛЬКО ЩЕЛЧКИ', 'bad'], warm: ['ГРЕЕМ…', '']}[ph];
 bd.textContent = B[0]; setCls(bd, 'badge', B[1]);
 /* карточка */
 var k, h, t, L = L2, weakTxt = good ? '' : ' Подсевший аккумулятор на морозе сдаётся первым.';
 if (ph === 'warm'){ k = 'Отогрев'; h = 'Греем тёплым воздухом под капотом'; t = 'Тепловой пушкой дуем тёплый воздух на двигатель и аккумулятор. Масло становится жиже, АКБ оживает — стрелка прокрутки поднимается. Открытый огонь и паяльные лампы — нельзя.'; }
 else if (ph === 'crank'){ k = 'Пробуем завести'; h = 'Стартер крутит…'; t = 'Смотрим на скорость прокрутки: чем холоднее, тем медленнее крутит стартер.'; L = Te > -10 ? L1 : L2; }
 else if (ph === 'run' && warmed){ k = 'Готово'; h = 'Отогрели — завелась'; t = 'После отогрева стартер крутит бодро, двигатель схватывает. Дальше выясняем, почему не завелась сама: аккумулятор, стартер, свечи, зарядка.'; }
 else if (ph === 'run'){ k = 'Завелась'; h = 'Аккумулятора и стартера хватило'; t = 'Пусть мотор поработает, не включайте сразу всё подряд — генератор подзарядит АКБ. Если крутит всё тяжелее — проверьте аккумулятор до сильных морозов.'; L = L1; }
 else if (ph === 'fail'){ k = 'Не завелась'; h = 'Крутит медленно — не схватывает'; t = 'Не мучайте стартер и аккумулятор длинными попытками: каждая забирает заряд. Правильнее отогреть двигатель и АКБ тёплым воздухом и подзарядить аккумулятор.' + weakTxt; }
 else if (ph === 'click'){ k = 'Не завелась'; h = 'Только щелчки — аккумулятор не тянет'; t = 'Стартеру не хватает тока даже провернуть двигатель. Нужен отогрев и зарядка АКБ, а если не помогает — проверка стартера и клемм.'; }
 else if (Te > 0){ k = 'Отогрето'; h = 'Под капотом плюс — можно заводить'; t = 'Масло жидкое, аккумулятор отдаёт ток. Жмите «Завести».'; }
 else if (Te > -10){ k = 'Лёгкий мороз'; h = 'Аккумулятор ещё бодрый'; t = 'При лёгком морозе исправный аккумулятор и стартер справляются. Если уже сейчас крутит вяло — АКБ стоит проверить до сильных морозов.' + weakTxt; L = L1; }
 else if (Te > -25){ k = 'Мороз'; h = 'АКБ отдаёт меньше, масло густеет'; t = 'На холоде химия в аккумуляторе замедляется — он отдаёт меньше тока. А густое масло тормозит двигатель, стартеру нужно больше силы. Стрелка прокрутки падает.' + weakTxt; }
 else { k = 'Сильный мороз'; h = 'Масло как мёд, стартер еле крутит'; t = 'В сильный мороз даже хороший аккумулятор теряет большую часть отдачи. Долго крутить стартером не стоит — посадите АКБ окончательно. Правильнее отогреть.' + weakTxt; }
 q('.card .k').textContent = k; q('.card h3').textContent = h; q('.card .t').textContent = t;
 q('.card .lh').textContent = L === L1 ? 'Что проверит мастер:' : 'Что сделаем на выезде:';
 q('.card ul').innerHTML = L.map(function(x){ return '<li>' + x + '</li>'; }).join('');
 wa.href = U.wa('Здравствуйте, Олег! Машина не заводится на морозе (' + deg(T) + '), нужен отогрев.');
 qa('.tabs .chip').forEach(function(b){ b.setAttribute('aria-pressed', (b.getAttribute('data-b') === '1') === good ? 'true' : 'false'); });
}
function crank(){
 stop(); var s = model(Te).s;
 ph = s < 0.15 ? 'click' : 'crank'; render();
 later(function(){ ph = s >= 0.4 ? 'run' : s < 0.15 ? 'click' : 'fail'; render(); }, U.reduce ? 0 : 1300);
}
function warm(){
 stop(); ph = 'warm'; render();
 if (U.reduce){ Te = 6; render(); crank(); return; }
 var from = Te, i = 0, N = 24;
 iv = setInterval(function(){
  i++; Te = from + (6 - from) * i / N; render();
  if (i >= N){ clearInterval(iv); iv = null; crank(); }
 }, 90);
}
function setT(v){ stop(); T = v; Te = v; ph = 'idle'; rg.value = v; render(); }
function touch(){ used = true; }
R.addEventListener('pointerdown', touch);
R.addEventListener('keydown', touch);
rg.addEventListener('input', function(){ touch(); setT(parseInt(rg.value, 10)); });
q('.go').addEventListener('click', function(){ touch(); U.buzz(15); crank(); });
q('.hot-b').addEventListener('click', function(){ touch(); U.buzz(15); warm(); });
qa('.tabs .chip').forEach(function(b){ b.addEventListener('click', function(){ touch(); stop(); good = b.getAttribute('data-b') === '1'; ph = 'idle'; render(); }); });
render();
/* автопоказ: лёгкий мороз — завелась, сильный — нет, отогрев — завелась, подсевший АКБ — нет */
var AUTO = [
 function(){ good = true; setT(-10); later(crank, 500); },
 function(){ setT(-30); later(crank, 500); },
 function(){ warm(); },
 null,
 function(){ good = false; setT(-18); later(crank, 500); }
], ai = 0;
U.seen(R, function(v){ vis = v; R.classList.toggle('w-off', !v); });
if (!U.reduce) setInterval(function(){
 if (used || !vis || document.hidden) return;
 var f = AUTO[ai]; ai = (ai + 1) % AUTO.length;
 if (f) f();
}, 3600);
}});
