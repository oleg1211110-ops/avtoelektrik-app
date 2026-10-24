/* «Адаптация АКПП» — рычаг P-R-N-D, индикатор передачи, обучение коробки, график толчков до и после. AVTOELEKTRIK-PRO.KZ */
AO_SITE.reg('akpp', {css:
'.w-akpp .tabs button{min-height:40px;padding:8px 13px;font-size:14px}' +
'.w-akpp svg text{font-family:Arial,"Helvetica Neue",Helvetica,sans-serif}' +
'.w-akpp .gr{cursor:pointer;outline:none}' +
'.w-akpp .gr .hit{fill:transparent}' +
'.w-akpp .gr text{fill:#8FA0AE;font-size:26px;font-weight:700;transition:fill .2s;pointer-events:none}' +
'.w-akpp .gr:hover text{fill:#fff}' +
'.w-akpp .gr.on text{fill:#FFA500}' +
'.w-akpp .gr:focus-visible .hit{stroke:#4FC3F7;stroke-width:3}' +
'.w-akpp .knob{transition:transform .35s cubic-bezier(.3,1.4,.5,1);pointer-events:none}' +
'.w-akpp .gear{fill:#FFA500;font-size:50px;font-weight:700}' +
'.w-akpp .lb{fill:#8FA0AE;font-size:12px;letter-spacing:.06em}' +
'.w-akpp .lg{fill:#C9CED4;font-size:12px}.w-akpp .gt{fill:#8FA0AE;font-size:12px}' +
'.w-akpp .js{fill:#6B7680;font-size:14px;font-weight:700}' +
'.w-akpp .js.bad{fill:#EF5350}.w-akpp .js.ok{fill:#5CC86C}' +
'.w-akpp .car{transform-box:fill-box;transform-origin:50% 100%}' +
'.w-akpp .car.jolt{animation:wak-j .45s ease-out}' +
'.w-akpp .car.soft{animation:wak-s .6s ease-in-out}' +
'@keyframes wak-j{0%{transform:none}15%{transform:translateX(-7px) rotate(-3deg)}35%{transform:translateX(6px) rotate(2deg)}55%{transform:translateX(-4px) rotate(-1deg)}75%{transform:translateX(2px)}100%{transform:none}}' +
'@keyframes wak-s{50%{transform:translateX(-1.5px)}}' +
'.w-akpp .pl{fill:#C9CED4;font-size:13px}.w-akpp .pp{fill:#fff;font-size:13px;font-weight:700}' +
'.w-akpp .cur{stroke:#FFA500;stroke-width:1.5;opacity:.8}' +
'.w-akpp .card li.on{color:#FFA500;font-weight:700}.w-akpp .card li.ok{color:#5CC86C}' +
'@media (prefers-reduced-motion:reduce){.w-akpp .car{animation:none!important}.w-akpp .knob{transition:none}}',
html: '<div class="aox w-akpp"><div>' +
'<h2>Адаптация АКПП</h2>' +
'<p class="sub">Переключите рычаг и нажмите «Адаптация» — посмотрите, как пинки при переключении становятся плавными.</p>' +
'<svg viewBox="0 0 400 300" role="group" aria-label="Рычаг коробки, индикатор передачи и график толчков">' +
/* рычаг */
'<rect x="10" y="10" width="104" height="280" rx="16" fill="#1A1A1A" stroke="#333" stroke-width="2"/>' +
'<rect x="74" y="34" width="12" height="232" rx="6" fill="#050505" stroke="#2A2A2A"/>' +
'<g class="gr" data-g="P" role="button" tabindex="0" aria-label="P — паркинг"><rect class="hit" rx="10" x="14" y="20" width="96" height="60"/><text x="38" y="59" text-anchor="middle">P</text></g>' +
'<g class="gr" data-g="R" role="button" tabindex="0" aria-label="R — задний ход"><rect class="hit" rx="10" x="14" y="84" width="96" height="60"/><text x="38" y="123" text-anchor="middle">R</text></g>' +
'<g class="gr" data-g="N" role="button" tabindex="0" aria-label="N — нейтраль"><rect class="hit" rx="10" x="14" y="148" width="96" height="60"/><text x="38" y="187" text-anchor="middle">N</text></g>' +
'<g class="gr" data-g="D" role="button" tabindex="0" aria-label="D — движение"><rect class="hit" rx="10" x="14" y="212" width="96" height="60"/><text x="38" y="251" text-anchor="middle">D</text></g>' +
'<g class="knob"><rect x="62" y="-16" width="36" height="32" rx="10" fill="#FFA500"/><path d="M70 -6H90M70 0H90M70 6H90" stroke="#111" stroke-opacity=".35" stroke-width="2"/></g>' +
/* индикатор */
'<rect x="126" y="10" width="264" height="96" rx="12" fill="#0A0E11" stroke="#2A3036" stroke-width="2"/>' +
'<text class="lb" x="183" y="32" text-anchor="middle">ПЕРЕДАЧА</text>' +
'<text class="gear" x="183" y="88" text-anchor="middle">D1</text>' +
'<path d="M240 22V94" stroke="#1F262C" stroke-width="2"/>' +
'<g class="car"><path d="M256 72C256 66 259 63 266 62L282 59C290 50 299 46 312 46L334 46C344 46 352 51 359 58L370 60C376 61 380 65 380 70L380 74L256 74Z" fill="#2B2B2B" stroke="#5B6A77" stroke-width="2"/>' +
'<path d="M290 58C296 51 302 49 312 49L322 49L322 58ZM326 49L334 49C341 49 347 53 352 58L326 58Z" fill="#3B4A57"/>' +
'<circle cx="280" cy="75" r="8" fill="#111" stroke="#9AA3AD" stroke-width="3"/><circle cx="356" cy="75" r="8" fill="#111" stroke="#9AA3AD" stroke-width="3"/></g>' +
'<text class="js" x="318" y="100" text-anchor="middle">—</text>' +
/* прогресс адаптации */
'<text class="pl" x="126" y="128"></text><text class="pp" x="390" y="128" text-anchor="end"></text>' +
'<rect x="126" y="136" width="264" height="10" rx="5" fill="#1F262C"/><rect class="pf" x="126" y="136" width="0" height="10" rx="5" fill="#FFA500"/>' +
/* график */
'<rect x="126" y="156" width="264" height="134" rx="12" fill="#0A0E11" stroke="#2A3036" stroke-width="2"/>' +
'<text class="gt" x="138" y="176">Толчок при переключении</text>' +
'<path d="M294 172h12" stroke="#EF5350" stroke-width="3"/><text class="lg" x="310" y="176">до</text>' +
'<path d="M330 172h12" stroke="#5CC86C" stroke-width="3"/><text class="lg" x="346" y="176">после</text>' +
'<path d="M138 232H378" stroke="#2A3036" stroke-width="1.5"/>' +
'<path d="M196 188V266M256 188V266M316 188V266" stroke="#2A3036" stroke-dasharray="3 4"/>' +
'<text class="lg" x="196" y="282" text-anchor="middle">1→2</text><text class="lg" x="256" y="282" text-anchor="middle">2→3</text><text class="lg" x="316" y="282" text-anchor="middle">3→4</text>' +
'<path class="pb" fill="none" stroke="#EF5350" stroke-width="2.5" stroke-linejoin="round"/>' +
'<path class="pa" fill="none" stroke="#5CC86C" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>' +
'<line class="cur" x1="138" y1="188" x2="138" y2="266"/><circle class="cd" cx="138" cy="232" r="4.5" fill="#FFA500"/>' +
'</svg>' +
'<div class="tabs" role="group" aria-label="Состояние коробки">' +
'<button type="button" data-s="before" aria-pressed="true">До адаптации</button>' +
'<button type="button" data-s="adapt" aria-pressed="false">Адаптация</button>' +
'<button type="button" data-s="after" aria-pressed="false">После</button>' +
'</div></div>' +
'<div class="card" aria-live="polite"><span class="k">Адаптация АКПП</span><h3></h3><p class="t"></p><ul></ul></div></div>',
init: function(R, U){
var $ = function(s){ return R.querySelector(s); };
var cardEl = $('.card'), h3 = cardEl.querySelector('h3'), pt = cardEl.querySelector('.t'), ul = cardEl.querySelector('ul');
cardEl.insertAdjacentHTML('beforeend', U.ctas('Здравствуйте, Олег! Нужна адаптация АКПП — пинки при переключении.'));
var knob = $('.knob'), gearT = $('.gear'), car = $('.car'), js = $('.js'), pl = $('.pl'), pp = $('.pp'), pf = $('.pf');
var pb = $('.pb'), pa = $('.pa'), cur = $('.cur'), cd = $('.cd'), tabs = $('.tabs');
var GY = {P: 50, R: 114, N: 178, D: 242}, SX = [196, 256, 316], X1 = 138, X2 = 378, BASE = 232;
var STEPS = ['сброс старых значений', 'прогрев масла', 'обучение переключений'];
var CARD = {
  before: ['Пинки при переключении и удар при включении D или R', 'Блок АКПП подстраивает давление включения под износ и масло. После замены масла, ремонта или просто со временем значения «уходят» — появляются толчки. Часто помогает сброс и новая адаптация сканером.',
           ['Читаю ошибки блока АКПП и живые данные', 'Смотрю температуру масла и проскальзывания', 'Сбрасываю старые адаптации и обучаю коробку заново']],
  adapt: ['Идёт обучение коробки', 'Сканер сбрасывает старые значения, а коробка заново учится переключаться. Порядок у разных машин свой — делаю по процедуре для конкретной коробки.',
          ['Сброс старых адаптаций сканером', 'Прогрев масла до рабочей температуры', 'Переключения по алгоритму обучения']],
  after: ['Переключения стали плавными', 'Блок заново подобрал давление для каждой передачи. Если пинки остались — причина глубже: масло, клапаны или механика. Тогда нужна дальнейшая проверка коробки.',
          ['Проверочная поездка после адаптации', 'Повторное чтение ошибок', 'Подскажу, что проверять дальше, если толчки остались']]
};
var st = 'before', prog = 0, lever = 'D', gear = 1, x = X1, step = -1, since = Date.now();
var ADUR = U.reduce ? 700 : 3200;

/* кривые толчка: до — рывок с раскачкой, после — мягкий бугорок */
function fBefore(xx){
  var y = 0.8 * Math.sin(xx / 4.3);
  for (var k = 0; k < SX.length; k++) { var d = xx - SX[k] + 4; if (d > 0) y += 55 * (1 - Math.exp(-d / 1.5)) * Math.exp(-d / 9) * Math.sin(d / 2.8); }
  return Math.max(-34, Math.min(34, y));
}
function fAfter(xx){
  var y = 0.5 * Math.sin(xx / 4.3);
  for (var k = 0; k < SX.length; k++) { var d = xx - SX[k]; y += 6 * Math.exp(-d * d / 120); }
  return y;
}
function path(f, xmax){
  var s = '';
  for (var xx = X1; xx <= xmax; xx += 2) s += (xx === X1 ? 'M' : 'L') + xx + ' ' + (BASE - f(xx)).toFixed(1);
  return s;
}
pb.setAttribute('d', path(fBefore, X2));
function curveY(xx){
  if (st === 'before') return fBefore(xx);
  if (st === 'after') return fAfter(xx);
  return fBefore(xx) * (1 - prog) + fAfter(xx) * prog;
}
function paintGraph(){
  if (st === 'before') { pb.style.opacity = '1'; pb.setAttribute('stroke-dasharray', ''); pa.setAttribute('d', ''); }
  else if (st === 'adapt') { pb.style.opacity = String(1 - 0.6 * prog); pb.setAttribute('stroke-dasharray', ''); pa.setAttribute('d', prog > 0.01 ? path(fAfter, X1 + Math.floor(120 * prog) * 2) : ''); }
  else { pb.style.opacity = '.4'; pb.setAttribute('stroke-dasharray', '4 4'); pa.setAttribute('d', path(fAfter, X2)); }
}
function paintProg(){
  if (st === 'before') { pl.textContent = 'Адаптация: старые значения'; pp.textContent = '—'; pf.setAttribute('width', '0'); pf.setAttribute('fill', '#FFA500'); }
  else if (st === 'adapt') {
    var i = prog < 1 / 3 ? 0 : (prog < 2 / 3 ? 1 : 2);
    pl.textContent = 'Адаптация: ' + STEPS[i] + '…'; pp.textContent = Math.round(prog * 100) + '%';
    pf.setAttribute('width', (264 * prog).toFixed(1)); pf.setAttribute('fill', '#FFA500');
    if (i !== step) { step = i; card(); }
  } else { pl.textContent = 'Адаптация выполнена'; pp.textContent = '100%'; pf.setAttribute('width', '264'); pf.setAttribute('fill', '#5CC86C'); }
}
function card(){
  var c = CARD[st];
  h3.textContent = c[0]; pt.textContent = c[1];
  ul.innerHTML = c[2].map(function(t, i){
    var cls = st === 'adapt' ? (i < step ? ' class="ok"' : (i === step ? ' class="on"' : '')) : '';
    return '<li' + cls + '>' + (st === 'adapt' && i < step ? '✓ ' : '') + t + '</li>';
  }).join('');
}
function showGear(){ gearT.textContent = lever === 'D' ? 'D' + gear : lever; }
function smooth(){ return st === 'after' || (st === 'adapt' && prog > 0.5); }
function jolt(bad){
  car.classList.remove('jolt', 'soft');
  car.getBoundingClientRect();
  if (!U.reduce) car.classList.add(bad ? 'jolt' : 'soft');
  js.textContent = bad ? 'ТОЛЧОК!' : 'плавно';
  js.setAttribute('class', 'js ' + (bad ? 'bad' : 'ok'));
}
function paintCursor(){
  var on = lever === 'D' && !U.reduce, xx = Math.min(x, X2);
  cur.style.display = cd.style.display = on ? '' : 'none';
  if (!on) return;
  cur.setAttribute('x1', xx); cur.setAttribute('x2', xx);
  cd.setAttribute('cx', xx); cd.setAttribute('cy', (BASE - curveY(xx)).toFixed(1));
}
function setLever(g){
  var prev = lever;
  lever = g;
  knob.style.transform = 'translate(0px,' + GY[g] + 'px)';
  R.querySelectorAll('.gr').forEach(function(e){ e.classList.toggle('on', e.getAttribute('data-g') === g); });
  if (g === 'D') { x = X1; gear = 1; }
  showGear();
  if ((g === 'D' || g === 'R') && prev !== g) jolt(!smooth());
  else if (g === 'P' || g === 'N') { js.textContent = '—'; js.setAttribute('class', 'js'); }
  paintCursor(); kick();
}
function setState(s){
  st = s; step = -1;
  prog = s === 'after' ? 1 : 0;
  tabs.querySelectorAll('button').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-s') === s ? 'true' : 'false'); });
  since = Date.now();
  paintProg(); paintGraph(); paintCursor(); card(); kick();
}

/* общий цикл: езда в D и ход обучения; работает только когда блок на экране */
var raf = window.requestAnimationFrame || function(f){ return setTimeout(function(){ f(Date.now()); }, 16); };
var running = false, last = 0, vis = false, used = false;
function need(){ return vis && !document.hidden && (st === 'adapt' || (lever === 'D' && !U.reduce)); }
function kick(){ if (!running && need()) { running = true; last = 0; raf(loop); } }
function loop(ts){
  var dt = last ? Math.min(50, ts - last) : 16;
  last = ts;
  if (st === 'adapt') {
    prog = Math.min(1, prog + dt / ADUR);
    paintProg(); paintGraph();
    if (prog >= 1) setState('after');
  }
  if (lever === 'D' && !U.reduce) {
    var px = x;
    x += dt * 0.06;
    if (x > X2 + 40) { x = X1; gear = 1; showGear(); }
    for (var k = 0; k < SX.length; k++) if (px < SX[k] && x >= SX[k]) { gear = k + 2; showGear(); jolt(!smooth()); }
    paintCursor();
  }
  if (need()) raf(loop); else running = false;
}
document.addEventListener('visibilitychange', kick);

/* управление */
function pickLever(e){
  var g = e.target.closest('.gr');
  if (!g) return;
  U.buzz(12); setLever(g.getAttribute('data-g'));
}
R.querySelector('svg').addEventListener('click', pickLever);
R.querySelector('svg').addEventListener('keydown', function(e){
  if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.gr')) { e.preventDefault(); pickLever(e); }
});
tabs.addEventListener('click', function(e){
  var b = e.target.closest('button[data-s]');
  if (!b) return;
  U.buzz(12); setState(b.getAttribute('data-s'));
});

/* автопоказ: до → адаптация → после → снова до, пока посетитель не трогал блок */
function stopAuto(){ used = true; }
R.addEventListener('pointerdown', stopAuto);
R.addEventListener('keydown', stopAuto);
U.seen(R, function(v){ vis = v; if (v) since = Math.max(since, Date.now() - 2000); kick(); });
if (!U.reduce) setInterval(function(){
  if (used || !vis || document.hidden || st === 'adapt') return;
  if (Date.now() - since < 3800) return;
  setState(st === 'before' ? 'adapt' : 'before');
}, 400);

setLever('D'); setState('before');
js.textContent = '—'; js.setAttribute('class', 'js');
}});
