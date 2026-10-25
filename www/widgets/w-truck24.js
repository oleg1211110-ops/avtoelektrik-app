/* «Грузовик 24 В: две АКБ последовательно» — страницы «Грузовой автоэлектрик», КамАЗ и т. п. avtoelektrik-pro.kz
   Вставка: <div class="ao-w" data-ao="truck24"></div> + ao-site.js
   Вариант для страниц марок: data-mode="brand" (общая сеть 24 В, без режима «слабая АКБ»),
   по желанию data-brand="КамАЗ" — марка попадёт в заголовок и текст сообщения. */
AO_SITE.reg('truck24', {
css: [
'.w-truck24 svg text{font-family:inherit}',
'.w-truck24 .tabs button{min-height:40px}',
'.w-truck24 .card .lh{font-size:14px;color:#9AA3AD}',
'.w-truck24 .cap{fill:#9AA3AD;font-size:12px}.w-truck24 .cap.c{text-anchor:middle}',
'.w-truck24 .lcdr{fill:#B9CBA0}',
'.w-truck24 .ll{font-size:12px;fill:#1B2414}',
'.w-truck24 .lv{font-family:Menlo,Consolas,"Courier New",monospace;font-size:20px;font-weight:700;fill:#1B2414;text-anchor:end}',
'.w-truck24 .ns{font-size:12px;font-weight:700;fill:#9AA3AD}',
'.w-truck24 .ok{fill:#5CC86C}.w-truck24 .mid{fill:#FFA500}.w-truck24 .bad{fill:#EF5350}',
'.w-truck24 .bat .b{fill:#2B2B2B;stroke:#555;stroke-width:2;transition:stroke .3s}',
'.w-truck24 .bat.weak .b{stroke:#EF5350}',
'.w-truck24 .tp{fill:#E53935}.w-truck24 .tn{fill:#9AA3AD}',
'.w-truck24 .bn{fill:#9AA3AD;font-size:12px;font-weight:700;text-anchor:middle}',
'.w-truck24 .bv{font-size:16px;font-weight:700;text-anchor:middle;fill:#fff}',
'.w-truck24 .wf{font-size:12px;font-weight:700;text-anchor:middle;fill:#EF5350;opacity:0}',
'.w-truck24.m-weak .wf{opacity:1}',
'.w-truck24 .eq{font-size:13px;font-weight:700;text-anchor:middle;fill:#C9CED4}',
'.w-truck24 .wr{fill:none;stroke:#5B6A77;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}',
'.w-truck24 .wr.j{stroke-width:6}',
'.w-truck24 .frame{fill:#2A2A2A;stroke:#444;stroke-width:2}',
'.w-truck24 .fl{fill:none;stroke:#FFD54F;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:4 8;opacity:0;transition:opacity .2s}',
'.w-truck24.pwr .fl.a,.w-truck24.chg .fl.g{opacity:1;animation:wt24-fl .8s linear infinite}',
'.w-truck24.chg .fl.b{animation-direction:reverse}',
'@keyframes wt24-fl{to{stroke-dashoffset:-12}}',
'.w-truck24 .sw{cursor:pointer;outline:none}',
'.w-truck24 .sw .hit{fill:transparent}',
'.w-truck24 .sw .lev{stroke:#C9CED4;stroke-width:5;stroke-linecap:round;transform-origin:24px 140px;transition:transform .2s}',
'.w-truck24.off .sw .lev{transform:rotate(-38deg);stroke:#EF5350}',
'.w-truck24 .sw .ct{fill:#9AA3AD}',
'.w-truck24 .sw:focus-visible .lev{stroke:#4FC3F7}',
'.w-truck24 .ld .bx{fill:#1D1D1D;stroke:#3A3A3A;stroke-width:2;transition:stroke .3s}',
'.w-truck24.pwr .ld .bx{stroke:#FFA500}',
'.w-truck24 .ld text{fill:#9AA3AD;font-size:13px;font-weight:700;text-anchor:middle;transition:fill .3s}',
'.w-truck24.pwr .ld text{fill:#fff}',
'.w-truck24 .gen circle{fill:#1E1E1E;stroke:#5B6A77;stroke-width:3}.w-truck24 .gen path{stroke:#5B6A77;stroke-width:3;stroke-linecap:round}',
'.w-truck24.chg .gen path{stroke:#FFA500}',
'.w-truck24.chg .gen{animation:wt24-rot .5s linear infinite}',
'@keyframes wt24-rot{to{transform:rotate(360deg)}}',
'.w-truck24 .badge{font-size:13px;font-weight:700;text-anchor:end;fill:#9AA3AD}',
'.w-truck24.w-off *{animation-play-state:paused!important}',
'@media (prefers-reduced-motion:reduce){.w-truck24 *{animation:none!important;transition:none!important}}'
].join('\n'),
html: [
'<div class="aox w-truck24"><div>',
'<h2>Грузовик 24&nbsp;В: две АКБ по&nbsp;12&nbsp;В</h2>',
'<p class="sub">Выбирайте режим и щёлкайте выключателем массы — схема покажет, что творится в сети 24 В.</p>',
'<svg viewBox="0 0 420 256" role="img" aria-label="Две аккумуляторные батареи по 12 В соединены последовательно, плюс идёт на стартер, свет и блоки, минус — на раму через выключатель массы; генератор заряжает обе батареи">',
/* вольтметр сети */
'<rect class="lcdr" x="14" y="10" width="156" height="40" rx="8"/><text class="ll" x="24" y="35">сеть:</text><text class="lv" x="160" y="38">25,4 В</text>',
'<text class="ns" x="178" y="32"></text>',
'<text class="badge" x="410" y="24"></text>',
/* перемычка между АКБ */
'<text class="cap c" x="152" y="68">перемычка</text>',
'<path class="wr j" d="M128 96C128 74 176 74 176 96"/>',
/* плюсовая шина и потребители */
'<path class="wr" d="M232 96V40H300V148M300 56H314M300 102H314M300 148H314M270 40V113"/>',
'<path class="wr" d="M398 56H406V222M398 102H406M398 148H406"/>',
'<g class="ld"><rect class="bx" x="314" y="40" width="84" height="32" rx="8"/><text x="356" y="61">стартер</text></g>',
'<g class="ld"><rect class="bx" x="314" y="86" width="84" height="32" rx="8"/><text x="356" y="107">свет</text></g>',
'<g class="ld"><rect class="bx" x="314" y="132" width="84" height="32" rx="8"/><text x="356" y="153">блоки</text></g>',
/* генератор */
'<g class="gen" style="transform-origin:270px 128px"><circle cx="270" cy="128" r="15"/><path d="M270 116v24M258 128h24"/></g>',
'<text class="cap c" x="272" y="164">генератор</text>',
/* масса: минус АКБ 1 -> выключатель -> рама */
'<path class="wr" d="M72 96V84H24V140M24 176V222"/>',
'<rect class="frame" x="14" y="222" width="398" height="8" rx="3"/>',
'<text class="cap c" x="220" y="248">рама — масса</text>',
'<g class="sw" role="button" tabindex="0" aria-label="Выключатель массы"><rect class="hit" x="4" y="128" width="44" height="60"/>',
'<circle class="ct" cx="24" cy="140" r="4"/><circle class="ct" cx="24" cy="176" r="4"/><line class="lev" x1="24" y1="140" x2="24" y2="176"/></g>',
'<text class="cap" x="34" y="214">выключатель массы</text>',
/* потоки тока */
'<path class="fl a b" d="M232 96V40H270"/><path class="fl a" d="M270 40H300V148"/><path class="fl g" d="M270 113V40"/>',
'<path class="fl a b" d="M128 96C128 74 176 74 176 96"/><path class="fl a b" d="M406 56V226H24V84H72V96"/>',
/* батареи */
'<g class="bat b1"><rect class="tn" x="65" y="96" width="14" height="8" rx="2"/><rect class="tp" x="121" y="96" width="14" height="8" rx="2"/>',
'<rect class="b" x="60" y="104" width="80" height="56" rx="6"/><text class="bn" x="100" y="124">АКБ 1 · 12 В</text><text class="bv" x="100" y="148">12,7 В</text></g>',
'<g class="bat b2"><rect class="tn" x="169" y="96" width="14" height="8" rx="2"/><rect class="tp" x="225" y="96" width="14" height="8" rx="2"/>',
'<rect class="b" x="164" y="104" width="80" height="56" rx="6"/><text class="bn" x="204" y="124">АКБ 2 · 12 В</text><text class="bv" x="204" y="148">12,7 В</text></g>',
'<text class="wf" x="204" y="176">слабая!</text>',
'<text class="eq" x="152" y="196">12,7 + 12,7 = 25,4 В</text>',
'</svg>',
'<div class="tabs" role="group" aria-label="Режимы"></div>',
'</div>',
'<div class="card" aria-live="polite"><span class="k"></span><h3></h3><p class="t"></p><p class="lh">Что проверим:</p><ul></ul></div>',
'</div>'
].join(''),
init: function(R, U, ds){
var brand = ds && ds.mode === 'brand', bname = (ds && ds.brand ? String(ds.brand) : '').slice(0, 40);
var OFF = {k: 'Масса выключена', h: 'Выключатель массы разомкнут — сеть обесточена', v: [12.7, 12.7], net: 0,
 t: 'Выключатель разрывает минус: на стоянке ничего не разряжает батареи, а при ремонте электрики так безопаснее. Если с включённой массой машина «мёртвая» — проверяем сам выключатель, его контакты и провода.',
 c: ['Контакты и провода выключателя массы', 'Клеммы и перемычка между АКБ', 'Масса двигателя и рамы']};
var M = brand ? {
 park: {n: 'Стоянка', k: 'Сеть 24 В', h: 'Бортовая сеть грузовика — 24 В', v: [12.7, 12.7],
  t: 'Две батареи по 12 В соединены последовательно: вместе около 25 В на стоянке. От этого напряжения работают стартер, свет, блоки управления и приборы. Минус идёт на раму через выключатель массы.',
  c: ['Компьютерная диагностика блоков грузовика', 'АКБ, генератор и стартер 24 В', 'Обрывы и окислы проводки, масса на раме']},
 run: {n: 'Мотор работает', k: 'Мотор работает', h: 'Генератор даёт 27,2–28,8 В', v: [14.1, 14.1],
  t: 'На работающем моторе генератор заряжает обе АКБ и питает всю сеть. Ниже нормы — батареи недозаряжаются; заметно выше 28,8 В — перезаряд: АКБ «кипят», горят лампы, страдают блоки.',
  c: ['Замер зарядки на холостых и под нагрузкой', 'Генератор 24 В: регулятор, щётки, диоды', 'Каждую АКБ — отдельно']},
 off: {n: 'Масса выключена'}
} : {
 park: {n: 'Нормально', k: 'Две АКБ последовательно', h: '12 В + 12 В = 24 В', v: [12.7, 12.7],
  t: 'Плюс первой батареи соединён перемычкой с минусом второй — напряжения складываются: на стоянке около 25 В. Минус первой идёт на раму через выключатель массы, плюс второй — на стартер и всю сеть.',
  c: ['Каждую АКБ отдельно — замер и проверка под нагрузкой', 'Перемычку, клеммы, силовые провода', 'Зарядку генератора: 27,2–28,8 В']},
 weak: {n: 'Одна АКБ слабая', k: 'Неисправность', h: 'Одна АКБ слабая — общий вольтметр обманывает', v: [12.8, 11.9],
  t: 'На двоих 24,7 В — вроде почти норма. А по отдельности 12,8 и 11,9 В: слабая батарея первой проседает при пуске, и стартер еле крутит. Вывод: проверяем каждую АКБ отдельно, под нагрузкой.',
  c: ['Замер и нагрузочная проверка каждой АКБ', 'Зарядка; при замене — пара одинаковых по ёмкости', 'Утечка тока на стоянке']},
 run: {n: 'Мотор работает', k: 'Мотор работает', h: 'Зарядка 27,2–28,8 В', v: [14.1, 14.1],
  t: 'Генератор 24-вольтовой сети заряжает обе батареи сразу. Ниже 27,2 В — недозаряд, АКБ будут садиться; заметно выше 28,8 В — перезаряд: батареи «кипят», горят лампы.',
  c: ['Замер зарядки на холостых и под нагрузкой', 'Генератор 24 В: регулятор, щётки, диоды', 'Как заряжается каждая АКБ']},
 off: {n: 'Масса выключена'}
};
var keys = brand ? ['park', 'run', 'off'] : ['park', 'weak', 'run', 'off'];
var mode = 'park', massOff = false, used = false, vis = false;
function q(s){ return R.querySelector(s); }
function qa(s){ return Array.prototype.slice.call(R.querySelectorAll(s)); }
function f1(v){ return v.toFixed(1).replace('.', ','); }
function cls(el, base, c){ el.setAttribute('class', base + (c ? ' ' + c : '')); }
var card = q('.card'), tabs = q('.tabs');
if (brand){
 q('h2').textContent = bname ? 'Электрика ' + bname + ': сеть 24\u00a0В' : 'Электрика грузовика: сеть 24\u00a0В';
 q('.sub').textContent = 'Нажимайте режимы и выключатель массы — схема покажет, как устроена бортовая сеть 24 В.';
}
var waBase = 'Здравствуйте, Олег! Нужен автоэлектрик по грузовику 24 В' + (bname ? ' (' + bname + ')' : '');
card.insertAdjacentHTML('beforeend', U.ctas(waBase + '.'));
var wa = q('.card .btn.w');
tabs.innerHTML = keys.map(function(k){ return '<button type="button" data-m="' + k + '" aria-pressed="false">' + M[k].n + '</button>'; }).join('');
function render(){
 var off = massOff, d = off ? OFF : M[mode], v = d.v, sum = v[0] + v[1], net = off ? 0 : sum, run = !off && mode === 'run';
 keys.forEach(function(k){ R.classList.toggle('m-' + k, !off && k === mode); });
 R.classList.toggle('off', off);
 R.classList.toggle('pwr', !off);
 R.classList.toggle('chg', run);
 /* напряжения */
 q('.lv').textContent = f1(net) + ' В';
 var ns = q('.ns');
 if (off){ ns.textContent = 'обесточено'; cls(ns, 'ns', 'bad'); }
 else if (run){ ns.textContent = 'зарядка в норме'; cls(ns, 'ns', 'ok'); }
 else if (mode === 'weak'){ ns.textContent = 'проверьте каждую!'; cls(ns, 'ns', 'mid'); }
 else { ns.textContent = 'норма'; cls(ns, 'ns', 'ok'); }
 [0, 1].forEach(function(i){
  var g = q('.bat.b' + (i + 1)), t = g.querySelector('.bv'), weak = v[i] < 12.4;
  t.textContent = f1(v[i]) + ' В';
  cls(t, 'bv', weak ? 'bad' : run ? 'ok' : '');
  g.classList.toggle('weak', weak && !off);
 });
 q('.eq').textContent = f1(v[0]) + ' + ' + f1(v[1]) + ' = ' + f1(sum) + ' В' + (off ? ' на АКБ' : '');
 q('.badge').textContent = run ? 'МОТОР РАБОТАЕТ' : off ? 'МАССА ВЫКЛ.' : '';
 /* кнопки и карточка */
 qa('.tabs button').forEach(function(b){ var k = b.getAttribute('data-m'); b.setAttribute('aria-pressed', (k === 'off' ? off : (!off && k === mode)) ? 'true' : 'false'); });
 q('.sw').setAttribute('aria-pressed', off ? 'false' : 'true');
 q('.sw').setAttribute('aria-label', off ? 'Выключатель массы: выключен. Нажмите, чтобы включить' : 'Выключатель массы: включён. Нажмите, чтобы выключить');
 q('.card .k').textContent = d.k; q('.card h3').textContent = d.h; q('.card .t').textContent = d.t;
 q('.card ul').innerHTML = d.c.map(function(x){ return '<li>' + x + '</li>'; }).join('');
 wa.href = U.wa(waBase + (off ? '.' : mode === 'weak' ? ': похоже, одна АКБ слабая.' : mode === 'run' ? ': проверить зарядку.' : '.'));
}
function pick(k){
 if (k === 'off'){ massOff = true; if (mode === 'run') mode = 'park'; }
 else { massOff = false; mode = k; }
 render();
}
function toggleMass(){ massOff = !massOff; if (massOff && mode === 'run') mode = 'park'; render(); U.buzz(20); }
function touch(){ used = true; }
R.addEventListener('pointerdown', touch);
R.addEventListener('keydown', touch);
tabs.addEventListener('click', function(e){ var b = e.target.closest('button[data-m]'); if (!b) return; touch(); U.buzz(12); pick(b.getAttribute('data-m')); });
var sw = q('.sw');
sw.addEventListener('click', function(){ touch(); toggleMass(); });
sw.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); touch(); toggleMass(); } });
render();
U.seen(R, function(v){ vis = v; R.classList.toggle('w-off', !v); });
var ai = 0;
if (!U.reduce) setInterval(function(){
 if (used || !vis || document.hidden) return;
 ai = (ai + 1) % keys.length; pick(keys[ai]);
}, 3600);
}});
