/* «Проверка компрессии» — двигатель на 4 или 6 цилиндров, манометр поднимается рывками, сравнение цилиндров. AVTOELEKTRIK-PRO.KZ */
AO_SITE.reg('comp', {css:
'.w-comp .tabs button{min-height:40px;padding:8px 13px;font-size:14px}' +
'.w-comp svg text{font-family:Arial,"Helvetica Neue",Helvetica,sans-serif}' +
'.w-comp .cy{cursor:pointer;outline:none}' +
'.w-comp .cy .hz{fill:transparent}' +
'.w-comp .cy .bo{fill:#14181C;stroke:#5B6A77;stroke-width:3;transition:stroke .2s}' +
'.w-comp .cy:hover .bo{stroke:#C9CED4}' +
'.w-comp .cy.ok .bo{stroke:#5CC86C}.w-comp .cy.low .bo{stroke:#EF5350}' +
'.w-comp .cy.sel .bo{stroke:#FFA500;stroke-width:4}' +
'.w-comp .cy:focus-visible .bo{stroke:#4FC3F7;stroke-width:4}' +
'.w-comp .cy .no{fill:#fff;font-size:18px;font-weight:700;pointer-events:none}' +
'.w-comp .rg{display:none;fill:none;stroke:#FFA500;stroke-width:2;transform-box:fill-box;transform-origin:center;animation:wcm-p 2.2s ease-out infinite}' +
'.w-comp .cy.idle .rg{display:inline}' +
'@keyframes wcm-p{0%{opacity:.9;transform:scale(.95)}80%,100%{opacity:0;transform:scale(1.18)}}' +
'.w-comp .mv{font-size:15px;font-weight:700;paint-order:stroke;stroke:#2B2B2B;stroke-width:4px;stroke-linejoin:round}' +
'.w-comp .tk{fill:#C9CED4;font-size:12px;font-weight:700}' +
'.w-comp .gv{fill:#fff;font-size:15px;font-weight:700}' +
'.w-comp .ct{fill:#8FA0AE;font-size:12px}.w-comp .dl{font-size:12px;font-weight:700}' +
'.w-comp .bl{fill:#8FA0AE;font-size:12px}.w-comp .bv{font-size:12px;font-weight:700}' +
'@media (prefers-reduced-motion:reduce){.w-comp .rg{animation:none;opacity:.6}}',
html: '<div class="aox w-comp"><div>' +
'<h2>Проверка компрессии</h2>' +
'<p class="sub">Нажмите на цилиндр — стрелка манометра поднимется рывками и покажет давление.</p>' +
'<svg viewBox="0 0 400 300" role="group" aria-label="Двигатель, вид сверху, манометр и результаты замеров">' +
'<rect x="12" y="12" width="376" height="104" rx="16" fill="#2B2B2B" stroke="#4A4A4A" stroke-width="2"/>' +
'<g class="eng"></g>' +
'<path class="hs" fill="none" stroke="#5B6A77" stroke-width="5" stroke-linecap="round"/>' +
'<circle class="hf" r="5" fill="#9AA3AD"/>' +
'<g class="vals"></g>' +
/* манометр */
'<circle cx="100" cy="228" r="66" fill="#1D1D1D" stroke="#555" stroke-width="3"/>' +
'<circle cx="100" cy="228" r="58" fill="#0A0E11"/>' +
'<g class="gt"></g>' +
'<line class="nd" x1="100" y1="238" x2="100" y2="180" stroke="#FFA500" stroke-width="3" stroke-linecap="round"/>' +
'<circle cx="100" cy="228" r="6" fill="#FFA500"/>' +
'<text class="gv" x="100" y="278" text-anchor="middle">0.0 бар</text>' +
/* результаты */
'<rect x="184" y="156" width="206" height="138" rx="12" fill="#0A0E11" stroke="#2A3036" stroke-width="2"/>' +
'<text class="ct" x="196" y="176">Результаты, бар</text><text class="dl" x="378" y="176" text-anchor="end"></text>' +
'<path d="M196 262H378" stroke="#2A3036" stroke-width="1.5"/>' +
'<g class="bars"></g>' +
'</svg>' +
'<div class="tabs" role="group" aria-label="Двигатель и замеры">' +
'<button type="button" data-n="4" aria-pressed="true">4 цилиндра</button>' +
'<button type="button" data-n="6" aria-pressed="false">6 цилиндров</button>' +
'<button type="button" data-a="all">Замерить все</button>' +
'<button type="button" data-a="reset">Сбросить</button>' +
'</div></div>' +
'<div class="card" aria-live="polite"><span class="k">Проверка компрессии</span><h3></h3><p class="t"></p><ul></ul></div></div>',
init: function(R, U){
var $ = function(s){ return R.querySelector(s); };
var cardEl = $('.card'), h3 = cardEl.querySelector('h3'), pt = cardEl.querySelector('.t'), ul = cardEl.querySelector('ul');
cardEl.insertAdjacentHTML('beforeend', U.ctas('Здравствуйте, Олег! Хочу проверить компрессию в двигателе.'));
var eng = $('.eng'), vals = $('.vals'), bars = $('.bars'), hs = $('.hs'), hf = $('.hf'), nd = $('.nd'), gv = $('.gv'), ct = $('.ct'), dl = $('.dl'), tabs = $('.tabs');
/* цифры для примера: один цилиндр заметно ниже остальных */
var VALS = {4: [12.3, 12.6, 8.4, 12.1], 6: [12.2, 12.5, 12.0, 12.4, 8.7, 12.3]}, LOW = {4: 2, 6: 4};
var n = 4, meas = [], sel = -1, busy = false, needle = 0, runAll = false, gen = 0, doneShown = false;

/* шкала манометра 0–20 бар */
var s = '';
for (var v = 0; v <= 20; v++) {
  var a = (-135 + v * 13.5) * Math.PI / 180, sn = Math.sin(a), cs = Math.cos(a), r1 = v % 5 ? 50 : 44;
  s += '<path d="M' + (100 + r1 * sn).toFixed(1) + ' ' + (228 - r1 * cs).toFixed(1) + 'L' + (100 + 56 * sn).toFixed(1) + ' ' + (228 - 56 * cs).toFixed(1) + '" stroke="#9AA3AD" stroke-width="' + (v % 5 ? 1.5 : 2.5) + '"/>';
  if (v % 5 === 0) s += '<text class="tk" x="' + (100 + 34 * sn).toFixed(1) + '" y="' + (228 - 34 * cs + 4).toFixed(1) + '" text-anchor="middle">' + v + '</text>';
}
$('.gt').innerHTML = s;

function geo(i){
  var r = n === 4 ? 34 : 25;
  return {x: 12 + 376 * (i + 0.5) / n, y: 64, r: r};
}
function slot(i){ var w = 182 / n; return {x: 196 + w * (i + 0.5), bw: Math.min(28, w * 0.6)}; }
function build(){
  var e = '', vv = '', b = '';
  for (var i = 0; i < n; i++) {
    var g = geo(i), py = g.y + g.r * 0.55;
    e += '<g class="cy" data-i="' + i + '" role="button" tabindex="0" aria-label="Цилиндр ' + (i + 1) + '">' +
      '<circle class="hz" cx="' + g.x + '" cy="' + g.y + '" r="' + (g.r + 5) + '"/>' +
      '<circle class="rg" cx="' + g.x + '" cy="' + g.y + '" r="' + (g.r + 3) + '"/>' +
      '<circle class="bo" cx="' + g.x + '" cy="' + g.y + '" r="' + g.r + '"/>' +
      '<circle cx="' + g.x + '" cy="' + g.y + '" r="' + (g.r * 0.72).toFixed(1) + '" fill="#33383E"/>' +
      '<circle cx="' + g.x + '" cy="' + py.toFixed(1) + '" r="' + (g.r > 30 ? 5 : 4) + '" fill="#0A0A0A" stroke="#555"/>' +
      '<text class="no" x="' + g.x + '" y="' + (g.y + 2) + '" text-anchor="middle">' + (i + 1) + '</text></g>';
    vv += '<text class="mv" x="' + g.x + '" y="140" text-anchor="middle"></text>';
    var sl = slot(i);
    b += '<rect class="br" x="' + (sl.x - sl.bw / 2).toFixed(1) + '" y="262" width="' + sl.bw.toFixed(1) + '" height="0" rx="4"/>' +
      '<text class="bv" x="' + sl.x.toFixed(1) + '" y="256" text-anchor="middle"></text>' +
      '<text class="bl" x="' + sl.x.toFixed(1) + '" y="280" text-anchor="middle">' + (i + 1) + '</text>';
  }
  eng.innerHTML = e; vals.innerHTML = vv; bars.innerHTML = b;
}
function measured(){ var c = 0; for (var i = 0; i < n; i++) if (meas[i] !== undefined) c++; return c; }
function nextUn(){ for (var i = 0; i < n; i++) if (meas[i] === undefined) return i; return -1; }
function paint(){
  var cys = eng.querySelectorAll('.cy'), mv = vals.querySelectorAll('.mv'), br = bars.querySelectorAll('.br'), bv = bars.querySelectorAll('.bv');
  var lo = LOW[n], mn = 99, mx = 0, c = 0, nx = nextUn();
  for (var i = 0; i < n; i++) {
    var m = meas[i], isLow = i === lo, col = isLow ? '#EF5350' : '#5CC86C';
    cys[i].setAttribute('class', 'cy' + (i === sel && busy ? ' sel' : '') + (m !== undefined ? (isLow ? ' low' : ' ok') : (!busy && i === nx ? ' idle' : '')));
    mv[i].textContent = m !== undefined ? m.toFixed(1) : '';
    mv[i].setAttribute('fill', col);
    var h = m !== undefined ? m / 16 * 72 : 0;
    br[i].setAttribute('y', (262 - h).toFixed(1)); br[i].setAttribute('height', h.toFixed(1)); br[i].setAttribute('fill', col);
    bv[i].textContent = m !== undefined ? m.toFixed(1) : '';
    bv[i].setAttribute('y', (256 - h).toFixed(1)); bv[i].setAttribute('fill', col);
    if (m !== undefined) { c++; mn = Math.min(mn, m); mx = Math.max(mx, m); }
  }
  if (sel >= 0) {
    var g = geo(sel), py = g.y + g.r * 0.55;
    hs.setAttribute('d', 'M' + g.x + ' ' + py.toFixed(1) + 'C' + g.x + ' ' + (py + 70).toFixed(1) + ' 100 92 100 162');
    hf.setAttribute('cx', g.x); hf.setAttribute('cy', py.toFixed(1));
    hs.style.display = hf.style.display = '';
  } else hs.style.display = hf.style.display = 'none';
  if (!busy && c >= 2) {
    var bad = meas[lo] !== undefined;
    dl.textContent = 'разница ' + (mx - mn).toFixed(1);
    dl.setAttribute('fill', bad ? '#EF5350' : '#5CC86C');
  } else dl.textContent = '';
}
var L0 = ['Замер в каждом цилиндре по очереди', 'Сравнение цилиндров между собой', 'Подскажу, что проверять дальше'];
var LBAD = ['Повторный замер этого цилиндра', 'Сверка с ошибками пропусков зажигания по сканеру', 'Подскажу, что проверять дальше'];
var PBAD = 'Разница больше нормы — повод для дальнейшей проверки. Причина может быть в кольцах, клапанах или прокладке ГБЦ — её выясняют дополнительными проверками, а не ремонтом наугад.';
function card(){
  var c = measured(), lo = LOW[n], lowM = meas[lo] !== undefined, d;
  if (busy) d = ['Замер: цилиндр ' + (sel + 1), 'Стартер крутит мотор, и на каждом такте сжатия стрелка поднимается рывком. Клапан в манометре держит самое большое значение.', L0];
  else if (c === 0) d = ['Компрессия — давление в цилиндре при прокрутке стартером', 'Вместо свечи вкручивают компрессометр, стартер крутит мотор — и на каждом такте сжатия стрелка поднимается рывком. Нажмите на цилиндр, чтобы замерить.', L0];
  else if (lowM && c >= 2) d = [c === n ? 'Итог: в цилиндре ' + (lo + 1) + ' компрессия ниже' : 'Цилиндр ' + (lo + 1) + ' заметно ниже остальных', PBAD, LBAD];
  else if (lowM) d = ['Цилиндр ' + (lo + 1) + ': ' + meas[lo].toFixed(1) + ' бар', 'Это ниже, чем у многих моторов в хорошем состоянии. Чтобы сделать вывод, сравним с остальными цилиндрами — главное именно разница.', ['Замерю остальные цилиндры', 'Сравню цифры между собой', 'Подскажу, что проверять дальше']];
  else d = ['Цилиндр ' + (sel + 1) + ': ' + meas[sel].toFixed(1) + ' бар', 'Примерно 10–14 бар у многих бензиновых моторов в хорошем состоянии, но точная цифра зависит от мотора. Главное — разница между цилиндрами.', ['Замерю остальные цилиндры', 'Сравню цифры между собой', 'Замер на прогретом моторе и с заряженным аккумулятором']];
  h3.textContent = d[0]; pt.textContent = d[1];
  ul.innerHTML = d[2].map(function(x){ return '<li>' + x + '</li>'; }).join('');
}

/* стрелка манометра */
var raf = window.requestAnimationFrame || function(f){ return setTimeout(function(){ f(Date.now()); }, 16); };
function setNeedle(v){
  needle = v;
  nd.setAttribute('transform', 'rotate(' + (-135 + v / 20 * 270).toFixed(1) + ' 100 228)');
  gv.textContent = v.toFixed(1) + ' бар';
}
function anim(to, dur, cb){
  var from = needle, t0 = null;
  function fr(ts){
    if (t0 === null) t0 = ts;
    var p = dur > 0 ? Math.min(1, (ts - t0) / dur) : 1, e = 1 - Math.pow(1 - p, 3);
    setNeedle(from + (to - from) * e);
    if (p < 1) raf(fr); else if (cb) cb();
  }
  raf(fr);
}
function measure(i){
  if (busy) return;
  busy = true; sel = i; meas[i] = undefined; doneShown = false;
  var g = gen, V = VALS[n][i];
  paint(); card();
  function finish(){
    if (g !== gen) return;
    meas[i] = V; busy = false; ct.textContent = 'Результаты, бар';
    paint(); card();
    if (runAll) {
      var nx = nextUn();
      if (nx >= 0) setTimeout(function(){ if (g === gen && runAll) measure(nx); }, U.reduce ? 150 : 450);
      else runAll = false;
    }
  }
  if (U.reduce) { setNeedle(V); finish(); return; }
  function stroke(k){
    if (g !== gen) return;
    ct.textContent = 'Цилиндр ' + (i + 1) + ' · такт сжатия ' + k;
    anim(k >= 6 ? V : V * (1 - Math.pow(0.48, k)), 110, function(){
      setTimeout(function(){ if (k < 6) stroke(k + 1); else finish(); }, 190);
    });
  }
  ct.textContent = 'Цилиндр ' + (i + 1) + ' · стартер';
  anim(0, needle > 0 ? 250 : 0, function(){ stroke(1); });
}
function setEngine(k){
  gen++; busy = false; runAll = false; doneShown = false;
  n = k; meas = []; sel = -1;
  setNeedle(0); ct.textContent = 'Результаты, бар';
  tabs.querySelectorAll('button[data-n]').forEach(function(b){ b.setAttribute('aria-pressed', +b.getAttribute('data-n') === k ? 'true' : 'false'); });
  build(); paint(); card();
}

/* управление */
function pick(e){
  var c = e.target.closest('.cy');
  if (!c) return;
  U.buzz(12); runAll = false; measure(+c.getAttribute('data-i'));
}
eng.addEventListener('click', pick);
eng.addEventListener('keydown', function(e){ if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.cy')) { e.preventDefault(); pick(e); } });
tabs.addEventListener('click', function(e){
  var b = e.target.closest('button');
  if (!b) return;
  U.buzz(10);
  if (b.hasAttribute('data-n')) setEngine(+b.getAttribute('data-n'));
  else if (b.getAttribute('data-a') === 'reset') setEngine(n);
  else if (b.getAttribute('data-a') === 'all') {
    if (nextUn() < 0) setEngine(n);
    runAll = true;
    if (!busy) measure(nextUn());
  }
});

/* автопоказ: замер цилиндров по очереди, итог, затем другой мотор — пока посетитель не трогал блок */
var used = false, vis = false, started = false;
function stopAuto(){ used = true; }
R.addEventListener('pointerdown', stopAuto);
R.addEventListener('keydown', stopAuto);
function auto(){
  if (used || !vis || document.hidden || busy) return;
  var nx = nextUn();
  if (nx >= 0) { measure(nx); return; }
  if (!doneShown) { doneShown = true; return; }
  setEngine(n === 4 ? 6 : 4);
}
U.seen(R, function(v){
  vis = v;
  if (v && !started && !U.reduce) { started = true; setTimeout(auto, 1000); }
});
if (!U.reduce) setInterval(auto, 3200);
setEngine(4);
}});
