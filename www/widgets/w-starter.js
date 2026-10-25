/* «Как работает стартер и что в нём ломается» — страница услуги «Ремонт стартера» avtoelektrik-pro.kz
   Вставка: <div class="ao-w" data-ao="starter"></div> + ao-site.js */
AO_SITE.reg('starter', {
css: [
'.w-starter svg text{font-family:inherit}',
'.w-starter .w-ctl{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}',
'.w-starter .w-ctl .btn{min-height:44px;padding:10px 18px}',
'.w-starter .tabs button{min-height:40px}',
'.w-starter .card .lh{font-size:14px;color:#9AA3AD}',
'.w-starter .w-lcd{display:flex;flex-wrap:wrap;justify-content:space-between;gap:4px 12px;margin-top:10px}',
'.w-starter .w-lcd b{font-weight:700}',
'.w-starter .ks{fill:#1D1D1D;stroke:#555;stroke-width:3}',
'.w-starter .kl{fill:#9AA3AD;font-size:11px;font-weight:700;text-anchor:middle}',
'.w-starter .key{cursor:pointer;outline:none}',
'.w-starter .key:focus-visible .ks{stroke:#4FC3F7}',
'.w-starter .kb{transform-origin:52px 62px;transition:transform .2s ease}',
'.w-starter.k-on .kb{transform:rotate(55deg)}',
'.w-starter .kb rect{fill:#C9CED4}.w-starter .kb circle{fill:#1D1D1D}',
'.w-starter .cap{fill:#9AA3AD;font-size:12px}.w-starter .cap.c{text-anchor:middle}',
'.w-starter .bat .b{fill:#2B2B2B;stroke:#555;stroke-width:2}',
'.w-starter .tp{fill:#E53935}.w-starter .tn{fill:#9AA3AD}',
'.w-starter .bat text{fill:#C9CED4;font-size:13px;font-weight:700;text-anchor:middle}',
'.w-starter .wr{fill:none;stroke:#5B6A77;stroke-linecap:round;stroke-linejoin:round}',
'.w-starter .wr.p{stroke-width:6}.w-starter .wr.c{stroke-width:3}.w-starter .wr.g{stroke-width:3}',
'.w-starter .gnd{fill:none;stroke:#5B6A77;stroke-width:3;stroke-linecap:round}',
'.w-starter .fl{fill:none;stroke:#FFD54F;stroke-linecap:round;stroke-linejoin:round;opacity:0;transition:opacity .15s}',
'.w-starter .fl.p{stroke-width:3;stroke-dasharray:6 8}.w-starter .fl.c{stroke-width:2;stroke-dasharray:4 7}',
'.w-starter.ctl .fl.c,.w-starter.pw .fl.p{opacity:1;animation:wstart-fl .6s linear infinite}',
'@keyframes wstart-fl{to{stroke-dashoffset:-14}}',
'.w-starter .sol{fill:#3A3F44;stroke:#5B6A77;stroke-width:2}',
'.w-starter .mot{fill:#2F3438;stroke:#5B6A77;stroke-width:2}',
'.w-starter .nose{fill:#2A2E31;stroke:#5B6A77;stroke-width:2}',
'.w-starter .in{fill:#C9CED4;font-size:12px;text-anchor:middle}',
'.w-starter .term{fill:#9AA3AD}',
'.w-starter .plg{fill:#9AA3AD;transition:transform .12s}',
'.w-starter.sol .plg{transform:translateX(-12px)}',
'.w-starter .lev{stroke:#C9CED4;stroke-width:4;stroke-linecap:round;transform-origin:289px 139px;transition:transform .15s}',
'.w-starter.sol .lev{transform:rotate(-28deg)}',
'.w-starter .shaft{stroke:#9AA3AD;stroke-width:4}',
'.w-starter .pin{transition:transform .18s ease}',
'.w-starter.sol .pin{transform:translateX(16px)}',
'.w-starter .pr circle.a{fill:#C9CED4}.w-starter .pr circle.t{fill:none;stroke:#C9CED4;stroke-width:5;stroke-dasharray:3 2.5}',
'.w-starter .pr path{stroke:#555;stroke-width:2}',
'.w-starter .arm circle{fill:#1E1E1E;stroke:#5B6A77;stroke-width:3}.w-starter .arm path{stroke:#5B6A77;stroke-width:3;stroke-linecap:round}',
'.w-starter.spin .arm path{stroke:#FFA500}',
'.w-starter .rg .b{fill:#222;stroke:#5B6A77;stroke-width:2}.w-starter .rg .t{fill:none;stroke:#9AA3AD;stroke-width:6;stroke-dasharray:4 3.3}',
'.w-starter .rg path{stroke:#5B6A77;stroke-width:4;stroke-linecap:round}.w-starter .rg .h{fill:#5B6A77}',
'.w-starter.spin .arm,.w-starter.spin .pr{animation:wstart-rot .25s linear infinite}',
'.w-starter.spin .rg{animation:wstart-rr 1.8s linear infinite}',
'.w-starter.slow .arm,.w-starter.slow .pr{animation-duration:1.1s}',
'.w-starter.slow .rg{animation-duration:7s}',
'.w-starter.eng .rg{animation:wstart-rr .7s linear infinite}',
'.w-starter.howl .arm,.w-starter.howl .pr{animation-duration:.09s}',
'@keyframes wstart-rot{to{transform:rotate(360deg)}}',
'@keyframes wstart-rr{to{transform:rotate(-360deg)}}',
'.w-starter .nx,.w-starter .brk,.w-starter .clk,.w-starter .hw{opacity:0;pointer-events:none}',
'.w-starter .nx path,.w-starter .brk path{fill:none;stroke:#EF5350;stroke-width:4;stroke-linecap:round}',
'.w-starter .brk text,.w-starter .hw{fill:#EF5350;font-size:13px;font-weight:700;text-anchor:middle}',
'.w-starter .clk{fill:#FFA500;font-size:15px;font-weight:700;text-anchor:middle}',
'.w-starter.nospin .nx,.w-starter.brk .brk,.w-starter.clk .clk{opacity:1}',
'.w-starter.howl .hw{opacity:1;animation:wstart-bl .4s steps(2) infinite}',
'@keyframes wstart-bl{50%{opacity:.2}}',
'.w-starter .badge{font-size:13px;font-weight:700;text-anchor:end;fill:#FFA500}',
'.w-starter .badge.ok{fill:#5CC86C}.w-starter .badge.bad{fill:#EF5350}.w-starter .badge.n{fill:#9AA3AD}',
'.w-starter.w-off *{animation-play-state:paused!important}',
'@media (prefers-reduced-motion:reduce){.w-starter *{animation:none!important;transition:none!important}}'
].join('\n'),
html: [
'<div class="aox w-starter"><div>',
'<h2>Как работает стартер и что в нём ломается</h2>',
'<p class="sub">Нажмите «Повернуть ключ» или выберите неисправность — увидите, что происходит внутри стартера.</p>',
'<svg viewBox="0 0 420 250" role="img" aria-label="Схема пуска: замок зажигания, аккумулятор, втягивающее реле, мотор стартера, шестерня бендикса и венец маховика">',
'<text class="badge" x="410" y="22"></text>',
/* замок зажигания */
'<g class="key" role="button" tabindex="0" aria-label="Повернуть ключ"><circle class="ks" cx="52" cy="62" r="32"/>',
'<g class="kb"><rect x="45" y="36" width="14" height="52" rx="6"/><circle cx="52" cy="46" r="3.5"/></g></g>',
'<text class="kl" x="52" y="22">ON</text><text class="kl" x="100" y="36">START</text>',
'<text class="cap c" x="52" y="112">замок</text>',
/* аккумулятор */
'<g class="bat"><rect class="tp" x="30" y="160" width="12" height="7" rx="2"/><rect class="tn" x="70" y="160" width="12" height="7" rx="2"/>',
'<rect class="b" x="16" y="166" width="80" height="50" rx="6"/><text x="56" y="196">АКБ</text></g>',
/* провода: силовой, управляющий, масса */
'<path class="wr p" d="M36 160V140H140V76H204V90"/><path class="fl p" d="M36 160V140H140V76H204V90"/>',
'<path class="wr c" d="M84 62H252V92"/><path class="fl c" d="M84 62H252V92"/>',
'<path class="wr g" d="M76 160V150H112V226"/><path class="gnd" d="M100 228h24M104 234h16M108 240h8"/>',
'<path class="wr g" d="M244 198V226"/><path class="gnd" d="M232 228h24M236 234h16M240 240h8"/>',
'<text class="cap" x="128" y="238">масса</text>',
'<g class="brk"><path d="M164 54l14 16M178 54l-14 16"/><text x="171" y="48">нет «+»</text></g>',
/* втягивающее реле */
'<rect class="term" x="198" y="88" width="12" height="9" rx="2"/><rect class="term" x="248" y="90" width="8" height="7" rx="2"/>',
'<rect class="sol" x="170" y="96" width="100" height="34" rx="8"/><text class="in" x="216" y="118">втягивающее</text>',
'<rect class="plg" x="270" y="104" width="22" height="18" rx="3"/>',
'<text class="clk" x="300" y="96">щёлк!</text>',
/* мотор стартера */
'<rect class="mot" x="168" y="136" width="100" height="62" rx="12"/>',
'<g class="arm" style="transform-origin:206px 167px"><circle cx="206" cy="167" r="20"/><path d="M206 151v32M190 167h32M195 156l22 22M217 156l-22 22"/></g>',
'<text class="in" x="246" y="172">мотор</text>',
'<g class="nx"><path d="M190 151l32 32M222 151l-32 32"/></g>',
'<path class="nose" d="M268 144L288 152V184L268 192Z"/>',
'<line class="shaft" x1="288" y1="168" x2="326" y2="168"/>',
'<line class="lev" x1="284" y1="120" x2="294" y2="158"/>',
/* шестерня бендикса */
'<g class="pin"><g class="pr" style="transform-origin:300px 168px"><circle class="t" cx="300" cy="168" r="10"/><circle class="a" cx="300" cy="168" r="8"/><path d="M300 162v12M294 168h12"/></g></g>',
'<text class="cap c" x="300" y="206">бендикс</text>',
/* венец маховика */
'<g class="rg" style="transform-origin:370px 168px"><circle class="b" cx="370" cy="168" r="40"/><circle class="t" cx="370" cy="168" r="44"/>',
'<path d="M370 136v64M338 168h64"/><circle class="h" cx="370" cy="168" r="9"/></g>',
'<text class="cap c" x="370" y="232">маховик</text>',
'<text class="hw" x="356" y="112">ВОЕТ!</text>',
'</svg>',
'<div class="lcd w-lcd" aria-live="off"><span>АКБ: <b class="v">12,6 В</b></span><span class="snd">звук: —</span></div>',
'<div class="w-ctl"><button type="button" class="btn o kbtn">Повернуть ключ</button></div>',
'<div class="tabs" role="group" aria-label="Неисправности стартера"></div>',
'</div>',
'<div class="card" aria-live="polite"><span class="k"></span><h3></h3><p class="t"></p><p class="lh">Что проверим:</p><ul></ul></div>',
'</div>'
].join(''),
init: function(R, U, ds){
var M = {
 ok: {n: 'Исправен', k: 'Исправный стартер', h: 'Щелчок — и бодрая прокрутка',
  t: 'Ключ подаёт «плюс» на втягивающее реле. Оно щёлкает, вводит шестерню бендикса в венец маховика и замыкает силовые контакты — мотор стартера крутит двигатель. Отпустили ключ — шестерня вышла.',
  c: ['Напряжение на АКБ при прокрутке', 'Цепь управления: реле, замок, провод на втягивающее', 'Щётки, втулки и бендикс при ремонте'], snd: 'щёлк + бодрая прокрутка'},
 click: {n: 'Щелчок и тишина', k: 'Неисправность', h: 'Щелчок — и тишина',
  t: 'Втягивающее срабатывает, а мотор стартера не крутит. Часто подгорели силовые контакты (пятаки) втягивающего, износились щётки, окислены клеммы или пропала масса. Бывает и просто сел аккумулятор.',
  c: ['Напряжение при прокрутке: проседает или нет', 'Падение напряжения на плюсовом проводе и массе', 'Контакты втягивающего, щётки и коллектор'], snd: 'один щелчок'},
 slow: {n: 'Крутит медленно', k: 'Неисправность', h: 'Крутит медленно, не заводится',
  t: 'Стартеру не хватает тока или ему тяжело крутиться: разряжен или изношен аккумулятор, окислены клеммы, плохая масса, износ щёток и втулок — якорь цепляет.',
  c: ['Нагрузочная проверка АКБ и напряжение при прокрутке', 'Клеммы, силовой провод и масса двигателя', 'Щётки, коллектор и втулки стартера'], snd: 'щёлк + ву… ву… медленно'},
 howl: {n: 'Воет, не выключается', k: 'Неисправность', h: 'Не выключается — воет',
  t: 'Двигатель завёлся, ключ отпущен, а шестерня осталась в венце: мотор раскручивает стартер, и он воет. Залипли контакты втягивающего или реле стартера, неисправна контактная группа замка или бендикс закис на валу. Сразу заглушите — стартер быстро выходит из строя.',
  c: ['Реле стартера и контактная группа замка', 'Контакты втягивающего реле', 'Бендикс и вал: чистка или замена'], snd: 'вой после пуска'},
 dead: {n: 'Тишина вообще', k: 'Неисправность', h: 'Тишина — даже щелчка нет',
  t: 'На втягивающее не приходит «плюс» или само реле не срабатывает. Ищем по цепочке: предохранитель и реле стартера, замок зажигания, провод на втягивающее, блокировки запуска (селектор АКПП, педаль сцепления). Или аккумулятор сел в ноль.',
  c: ['Есть ли «плюс» на втягивающем при повороте ключа', 'Предохранитель, реле, замок и проводка', 'Обмотка втягивающего реле'], snd: 'тишина'}
};
var keys = ['ok', 'click', 'slow', 'howl', 'dead'], mode = 'ok', used = false, vis = false, tm = [];
var FLAGS = ['k-on', 'ctl', 'sol', 'clk', 'spin', 'slow', 'pw', 'eng', 'howl', 'nospin', 'brk'];
function q(s){ return R.querySelector(s); }
function qa(s){ return Array.prototype.slice.call(R.querySelectorAll(s)); }
var card = q('.card'), tabs = q('.tabs'), badge = q('.badge'), vEl = q('.lcd .v'), sEl = q('.lcd .snd');
card.insertAdjacentHTML('beforeend', U.ctas('Здравствуйте, Олег! Проблема со стартером.'));
var wa = q('.card .btn.w');
tabs.innerHTML = keys.map(function(k){ return '<button type="button" data-m="' + k + '" aria-pressed="false">' + M[k].n + '</button>'; }).join('');
function set(c, on){ R.classList.toggle(c, !!on); }
function later(f, ms){ tm.push(setTimeout(f, ms)); }
function stop(){ tm.forEach(clearTimeout); tm = []; FLAGS.forEach(function(c){ set(c, 0); }); }
function bd(t, c){ badge.textContent = t; badge.setAttribute('class', 'badge' + (c ? ' ' + c : '')); }
function volt(v, snd){ vEl.textContent = v.toFixed(1).replace('.', ',') + ' В'; if (snd !== undefined) sEl.textContent = 'звук: ' + snd; }
function show(){
 var d = M[mode];
 q('.card .k').textContent = d.k; q('.card h3').textContent = d.h; q('.card .t').textContent = d.t;
 q('.card ul').innerHTML = d.c.map(function(x){ return '<li>' + x + '</li>'; }).join('');
 wa.href = U.wa('Здравствуйте, Олег! Проблема со стартером: ' + d.h.toLowerCase() + '.');
 qa('.tabs button').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-m') === mode ? 'true' : 'false'); });
}
function idle(){ stop(); bd('', ''); volt(12.6, '—'); }
function release(){ set('k-on', 0); set('ctl', 0); }
/* поворот ключа: сценарий зависит от неисправности */
function turn(){
 var m = mode; stop();
 set('k-on', 1); bd('КЛЮЧ: СТАРТ', ''); volt(12.5, '…');
 if (m === 'dead'){
  set('brk', 1); bd('ТИШИНА', 'bad'); volt(12.6, M.dead.snd);
  later(function(){ release(); }, 1700);
  return;
 }
 set('ctl', 1);
 later(function(){ set('sol', 1); set('clk', 1); U.buzz(20); }, 150);
 later(function(){ set('clk', 0); }, 800);
 if (m === 'click'){
  later(function(){ set('nospin', 1); bd('ЩЁЛК — И ВСЁ', 'bad'); volt(12.2, M.click.snd); }, 320);
  later(function(){ release(); set('sol', 0); set('nospin', 0); }, 1800);
  return;
 }
 later(function(){ set('spin', 1); set('pw', 1); if (m === 'slow') set('slow', 1); bd('КРУТИТ…', ''); volt(m === 'slow' ? 8.6 : 10.4, M[m].snd); }, 350);
 if (m === 'slow'){
  later(function(){ release(); set('sol', 0); set('spin', 0); set('pw', 0); set('slow', 0); bd('НЕ ЗАВЁЛСЯ', 'bad'); volt(11.9); }, 2700);
  return;
 }
 later(function(){ set('eng', 1); bd('ЗАВЁЛСЯ', 'ok'); volt(13.9); }, 1450);
 later(function(){
  release();
  if (m === 'ok'){ set('sol', 0); set('spin', 0); set('pw', 0); volt(14.1); }
  else { set('howl', 1); set('pw', 0); bd('НЕ ВЫКЛЮЧАЕТСЯ', 'bad'); volt(13.2, M.howl.snd); U.buzz(80); }
 }, 1900);
 if (m === 'howl') later(function(){ set('howl', 0); set('sol', 0); set('spin', 0); set('eng', 0); bd('ЗАГЛУШИЛИ', 'n'); volt(12.5); }, 3800);
}
function pick(m){ mode = m; show(); turn(); }
function touch(){ used = true; }
R.addEventListener('pointerdown', touch);
R.addEventListener('keydown', touch);
tabs.addEventListener('click', function(e){ var b = e.target.closest('button[data-m]'); if (!b) return; touch(); U.buzz(12); pick(b.getAttribute('data-m')); });
q('.kbtn').addEventListener('click', function(){ touch(); turn(); });
var key = q('.key');
key.addEventListener('click', function(){ touch(); turn(); });
key.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); touch(); turn(); } });
show(); idle();
U.seen(R, function(v){ vis = v; R.classList.toggle('w-off', !v); });
var ai = -1;
if (!U.reduce) setInterval(function(){
 if (used || !vis || document.hidden) return;
 ai = (ai + 1) % keys.length; pick(keys[ai]);
}, 4000);
}});
