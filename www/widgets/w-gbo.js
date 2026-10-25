/* «ГБО: ремонт и настройка» — страница ремонта газобаллонного оборудования, avtoelektrik-pro.kz */
(function(){
var P = '.w-gbo';
var css = [
P+' .chip{min-height:38px}',
P+' .row{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:12px}',
P+' .seg{display:inline-flex}',
P+' .seg .chip{border-radius:0;min-width:84px;min-height:44px;font-size:14px}',
P+' .seg .chip:first-child{border-radius:8px 0 0 8px}'+P+' .seg .chip:last-child{border-radius:0 8px 8px 0;margin-left:-1px}',
P+' svg text{font-family:inherit}',
P+' .lbl{font-size:14px;fill:#9AA3AD}',
P+' .bt{font-size:14px;font-weight:700;fill:#fff}',
P+' .et{font-size:15px;font-weight:700;fill:#fff}',
P+' .lt{font-size:14px;fill:#fff}',
P+' .exs{font-size:15px;font-weight:700;fill:#fff}',
P+' .wr{fill:none;stroke:#5B6A77;stroke-width:2;stroke-dasharray:3 3}',
P+' .ln{fill:none;stroke:#5B6A77;stroke-width:4;stroke-linejoin:round}',
P+' .ecu{fill:#1D1D1D;stroke:#FFA500;stroke-width:2;transition:stroke .3s}',
P+'.err .ecu{stroke:#EF5350}',
P+' .ex,'+P+' .gx{opacity:0;transition:opacity .3s}'+P+'.err .ex,'+P+'.err .gx{opacity:1}',
P+' .ledp,'+P+' .ledg{fill:#333;stroke:#555;stroke-width:1.5;transition:fill .3s}',
P+'.onp .ledp{fill:#E6E9EC}'+P+'.ong .ledg{fill:#FFA500}',
P+'.wait .ledg{animation:wgL .6s steps(1) infinite}',
P+'.err .ledg{fill:#EF5350;animation:wgL .4s steps(1) infinite}',
'@keyframes wgL{50%{fill:#333}}',
P+' .cool{fill:none;stroke:#E57373;stroke-width:5;stroke-linecap:round;transition:stroke .4s}',
P+'.coldr .cool{stroke:#4FC3F7}',
P+' .ts{fill:#5CC86C;stroke:#111;stroke-width:1.5;transition:fill .3s}'+P+'.coldr .ts{fill:#EF5350}',
P+' .gi,'+P+' .pi{fill:#4A5560;stroke:#7D8790;stroke-width:1.5}',
P+' .cy.g .gi{animation:wgI .6s steps(1) infinite}',
P+' .cy.p .pi{animation:wgP .6s steps(1) infinite}',
P+' .cy[data-c="2"] .gi,'+P+' .cy[data-c="2"] .pi{animation-delay:.15s}',
P+' .cy[data-c="3"] .gi,'+P+' .cy[data-c="3"] .pi{animation-delay:.3s}',
P+' .cy[data-c="1"] .gi,'+P+' .cy[data-c="1"] .pi{animation-delay:.45s}',
'@keyframes wgI{0%{fill:#FFA500}40%{fill:#4A5560}}',
'@keyframes wgP{0%{fill:#E6E9EC}40%{fill:#4A5560}}',
P+'.err .cy[data-c="2"] .gi{fill:#EF5350;animation:none}',
P+'.jerk .cy.g .gi{animation-duration:.23s}',
P+'.jerk .eng{animation:wgS .12s linear infinite}',
'@keyframes wgS{25%{transform:translate(2px,-1px)}75%{transform:translate(-2px,1px)}}',
P+' .fg,'+P+' .fp{fill:none;stroke-width:3;stroke-linecap:round;stroke-dasharray:4 8;opacity:0;transition:opacity .4s;animation:wgF .8s linear infinite}',
P+' .fg{stroke:#FFA500}'+P+' .fp{stroke:#E6E9EC}',
P+'.ong .fg,'+P+'.onp .fp{opacity:1}',
'@keyframes wgF{to{stroke-dashoffset:-12}}',
P+' .hl{display:flex;justify-content:space-between;flex-wrap:wrap;gap:2px 14px;margin-top:10px}',
P+' .hl .bd{color:#B3261E}',
P+' .stt{margin:10px 0 0;font-size:14.5px;line-height:1.4;color:#C9CED4;min-height:2.8em}',
'@media (min-width:821px){'+P+' .stt{min-height:1.4em}}',
P+' .stt.ok{color:#5CC86C}'+P+' .stt.bd{color:#EF5350}',
P+' .warn{border-left:3px solid #EF5350;background:rgba(239,83,80,.09);padding:8px 10px;border-radius:6px;color:#E6E9EC;font-size:14.5px;line-height:1.4}',
P+' .warn b{color:#fff}',
P+'.ps *{animation-play-state:paused!important}',
'@media (prefers-reduced-motion:reduce){'+P+' *{animation:none!important;transition-duration:.01s!important}}'
].join('\n');

var cyl = '';
for (var i = 0; i < 4; i++) {
  var x = 244 + 28 * i;
  cyl += '<g class="cy p" data-c="' + i + '"><rect class="gi" x="' + x + '" y="128" width="14" height="20" rx="3"/><rect class="pi" x="' + (x + 14) + '" y="230" width="12" height="14" rx="2"/>' +
   (i === 2 ? '<path class="gx" d="M' + (x - 2) + ' 126 l18 24 m0 -24 l-18 24" stroke="#EF5350" stroke-width="3"/>' : '') + '</g>';
}
var GAS = 'M46 112 H66 V136 H80 M156 136 H176 M204 136 H216 V117 H232 M251 148 V188 M279 148 V188 M307 148 V188 M335 148 V188';
var svg = '<svg viewBox="0 0 400 262" role="img" aria-label="Схема ГБО: баллон, редуктор с подогревом антифризом, фильтр, газовые форсунки, ЭБУ ГБО и кнопка переключения">' +
 '<path class="wr" d="M140 34 H170 M196 56 V94 H148 V110 M250 56 V106"/>' +
 '<rect x="10" y="12" width="130" height="44" rx="10" fill="#1D1D1D" stroke="#5B6A77" stroke-width="2"/>' +
 '<circle class="ledp" cx="26" cy="34" r="7"/><text class="bt" x="38" y="39">бензин</text>' +
 '<circle class="ledg" cx="98" cy="34" r="7"/><text class="bt" x="110" y="39">газ</text>' +
 '<text class="lbl" x="75" y="76" text-anchor="middle">кнопка переключения</text>' +
 '<rect class="ecu" x="170" y="12" width="96" height="44" rx="8"/><text class="et" x="218" y="39" text-anchor="middle">ЭБУ ГБО</text>' +
 '<g class="ex"><circle cx="264" cy="14" r="10" fill="#EF5350"/><text class="exs" x="264" y="19" text-anchor="middle">!</text></g>' +
 '<rect x="28" y="104" width="18" height="14" rx="2" fill="#7D8790"/>' +
 '<rect x="8" y="116" width="58" height="110" rx="26" fill="#2B3540" stroke="#5B6A77" stroke-width="2"/>' +
 '<text class="lbl" x="37" y="176" text-anchor="middle">баллон</text>' +
 '<path class="ln" d="' + GAS + '"/>' +
 '<path class="ln" d="M150 249 H232"/>' +
 '<path class="cool" d="M100 162 V204 M138 162 V204"/>' +
 '<text class="lbl" x="119" y="222" text-anchor="middle">антифриз</text>' +
 '<rect x="80" y="110" width="76" height="52" rx="10" fill="#3A4651" stroke="#5B6A77" stroke-width="2"/>' +
 '<text class="lt" x="118" y="141" text-anchor="middle">редуктор</text><circle class="ts" cx="148" cy="116" r="5"/>' +
 '<rect x="176" y="126" width="28" height="20" rx="6" fill="#3A4651" stroke="#5B6A77" stroke-width="2"/>' +
 '<text class="lbl" x="190" y="166" text-anchor="middle">фильтр</text>' +
 '<text class="lbl" x="262" y="98">форсунки ГБО</text>' +
 '<rect x="232" y="106" width="120" height="22" rx="6" fill="#3A4651" stroke="#5B6A77" stroke-width="2"/>' +
 '<g class="eng"><rect x="226" y="188" width="168" height="44" rx="8" fill="#2F3A44" stroke="#5B6A77" stroke-width="2"/>' +
 '<text class="lbl" x="310" y="215" text-anchor="middle">впускной коллектор</text>' +
 '<rect x="232" y="244" width="150" height="10" rx="4" fill="#3A4651" stroke="#5B6A77" stroke-width="1.5"/>' + cyl + '</g>' +
 '<text class="lbl" x="156" y="242">бензин</text>' +
 '<path class="fg" d="' + GAS + '"/><path class="fp" d="M150 249 H380"/>' +
'</svg>';

var html = '<div class="aox w-gbo"><div>' +
 '<h2>ГБО: ремонт и настройка</h2>' +
 '<p class="sub">Переключите «Бензин / Газ» и выберите неисправность — увидите, что происходит с редуктором и форсунками.</p>' +
 svg +
 '<div class="lcd hl" aria-hidden="true"><span class="lf"></span><span class="lr"></span><span class="lo"></span></div>' +
 '<p class="stt" role="status"></p>' +
 '<div class="row"><div class="seg" role="group" aria-label="Топливо"><button type="button" class="chip" data-f="p" aria-pressed="true">Бензин</button><button type="button" class="chip" data-f="g" aria-pressed="false">Газ</button></div></div>' +
 '<div class="tabs" role="group" aria-label="Ситуация"></div>' +
'</div>' +
'<div class="card"><span class="k"></span><h3></h3><p class="t"></p><ul></ul>' +
 '<p class="warn"><b>Запах газа?</b> Заглушите двигатель, закройте вентили на баллоне и обратитесь к специалисту. Утечки газа проверяют только специалисты — никогда не ищите их огнём.</p></div></div>';

AO_SITE.reg('gbo', {css: css, html: html, init: function(R, U){
var M = {
 smooth: {n:'Плавный переход', k:'ГБО · норма', h:'Плавный переход на газ', t:52,
  p:'Мотор прогрелся, редуктор тёплый — ЭБУ ГБО по очереди отключает бензиновые форсунки и включает газовые. Обороты не проседают, машина едет ровно.',
  c:['Диагностика ЭБУ ГБО: ошибки, температура, давление газа','Проверка газовых форсунок и фильтров','Настройка перехода и смеси на газу']},
 jerk: {n:'Дёргается при переходе', k:'ГБО · рывок', h:'Дёргается при переходе на газ', t:52,
  p:'Чаще всего сбита настройка, загрязнились или износились газовые форсунки, забит фильтр, проблема с давлением в редукторе. Бывает виновата и бензиновая часть — свечи, катушки: на газу слабая искра заметнее.',
  c:['Сравнение работы на бензине и газе сканером','Проверка форсунок ГБО, фильтров и редуктора','Калибровка перехода и смеси']},
 cold: {n:'Не переходит на газ', k:'ГБО · не переходит', h:'Не переходит на газ', t:18,
  p:'ЭБУ ГБО ждёт, пока редуктор прогреется до температуры перехода. Редуктор греется антифризом: если мало антифриза, воздушная пробка, пережат шланг или врёт датчик температуры — переход не происходит.',
  c:['Проверка датчика температуры редуктора','Проверка шлангов подогрева и уровня антифриза','Проверка настроек перехода в ЭБУ ГБО']},
 inj: {n:'Ошибка форсунки', k:'ГБО · ошибка', h:'Ошибка газовой форсунки', t:52,
  p:'Обрыв в обмотке или проводке, залипание форсунки. ЭБУ ГБО видит ошибку и может вернуть мотор на бензин, пискнув кнопкой. На газу при этом может троить.',
  c:['Чтение ошибок ЭБУ ГБО','Замер сопротивления форсунки, проверка проводки','Чистка или замена форсунки, калибровка']}
};
var K = ['smooth','jerk','cold','inj'], mode = 'smooth', fuel = 'p', cyl = ['p','p','p','p'], rpm = 800, tm = [];
var used = false, vis = true;
function $(q){ return R.querySelector(q); }
function $$(q){ return R.querySelectorAll(q); }
var card = $('.card');
card.insertAdjacentHTML('beforeend', U.ctas('Здравствуйте, Олег! Нужна диагностика ГБО.'));
$('.tabs').innerHTML = K.map(function(k){ return '<button type="button" class="chip" data-k="' + k + '" aria-pressed="false">' + M[k].n + '</button>'; }).join('');

function clearT(){ tm.forEach(clearTimeout); tm = []; }
function later(fn, ms){ tm.push(setTimeout(fn, U.reduce ? 0 : ms)); }
function press(sel, attr, val){ [].forEach.call($$(sel), function(b){ b.setAttribute('aria-pressed', b.getAttribute(attr) === val ? 'true' : 'false'); }); }
function stt(t, c){ var e = $('.stt'); e.textContent = t; e.className = 'stt' + (c ? ' ' + c : ''); }
function render(){
  var cs = $$('.cy');
  for (var i = 0; i < 4; i++) cs[i].setAttribute('class', 'cy ' + cyl[i]);
  var g = cyl.indexOf('g') >= 0, p = cyl.indexOf('p') >= 0;
  R.classList.toggle('ong', g); R.classList.toggle('onp', p);
  R.classList.toggle('coldr', mode === 'cold');
  var t = M[mode].t, lf = $('.lf'), lr = $('.lr');
  lf.textContent = 'ТОПЛИВО: ' + (g && p ? 'ПЕРЕХОД' : g ? 'ГАЗ' : 'БЕНЗИН');
  lr.textContent = 'РЕДУКТОР ' + t + '°C'; lr.className = 'lr' + (t < 30 ? ' bd' : '');
  var lo = $('.lo'); lo.textContent = rpm + ' ОБ/МИН'; lo.className = 'lo' + (rpm !== 800 ? ' bd' : '');
  press('.seg .chip', 'data-f', fuel);
}
function toPetrol(){
  clearT(); fuel = 'p'; cyl = ['p','p','p','p']; rpm = 800;
  R.classList.remove('wait', 'err', 'jerk');
  render(); stt('Едем на бензине. Нажмите «Газ» — посмотрите переход.');
}
function each(fn, step, start){ [0, 1, 2, 3].forEach(function(i){ later(function(){ fn(i); render(); }, start + step * i); }); }
function toGas(){
  clearT(); fuel = 'g'; R.classList.remove('wait', 'err', 'jerk'); rpm = 800; render();
  if (mode === 'cold') {
    R.classList.add('wait');
    stt('Газ не включается: редуктор холодный (18 °C), ЭБУ ждёт прогрева', 'bd');
    return;
  }
  if (mode === 'jerk') {
    stt('Переход…');
    later(function(){ cyl = ['g','g','g','g']; rpm = 610; R.classList.add('jerk'); render(); stt('Рывок при переходе: обороты провалились', 'bd'); }, 250);
    later(function(){ rpm = 930; render(); }, 600);
    later(function(){ rpm = 760; render(); }, 900);
    later(function(){ rpm = 800; R.classList.remove('jerk'); render(); stt('Теперь на газу, но переход был с рывком', 'bd'); }, 1300);
    return;
  }
  stt('Переход по одному цилиндру…');
  each(function(i){ cyl[i] = 'g'; }, 250, 250);
  if (mode === 'smooth') { later(function(){ stt('Переход прошёл плавно — обороты ровные', 'ok'); }, 1100); return; }
  later(function(){ R.classList.add('err'); rpm = 700; render(); stt('ЭБУ ГБО видит ошибку форсунки 3 — троит', 'bd'); }, 1500);
  later(function(){ fuel = 'p'; cyl = ['p','p','p','p']; rpm = 800; render(); stt('Ошибка форсунки 3 — ЭБУ ГБО вернул мотор на бензин', 'bd'); }, 2400);
}
function setMode(m){
  mode = m; var d = M[m];
  press('.tabs .chip', 'data-k', m);
  $('.card .k').textContent = d.k; $('.card h3').textContent = d.h; $('.card .t').textContent = d.p;
  $('.card ul').innerHTML = d.c.map(function(x){ return '<li>' + x + '</li>'; }).join('');
  toPetrol(); later(toGas, 700);
}
function touch(){ if (used) return; used = true; card.setAttribute('aria-live', 'polite'); }
R.addEventListener('pointerdown', touch);
R.addEventListener('keydown', touch);
R.addEventListener('click', function(e){
  var t = e.target.closest('button'); if (!t || !R.contains(t)) return;
  touch();
  if (t.hasAttribute('data-f')) { if (t.getAttribute('data-f') === 'g') toGas(); else toPetrol(); }
  else if (t.hasAttribute('data-k')) setMode(t.getAttribute('data-k'));
  else return;
  U.buzz(12);
});
setMode('smooth');
U.seen(R, function(v){ vis = v; R.classList.toggle('ps', !v); });
if (!U.reduce) setInterval(function(){
  if (used || !vis || document.hidden) return;
  setMode(K[(K.indexOf(mode) + 1) % K.length]);
}, 3800);
}});
})();
