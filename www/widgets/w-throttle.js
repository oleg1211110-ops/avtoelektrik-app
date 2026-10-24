/* «Дроссельная заслонка» — педаль открывает заслонку, нагар на кромке, обороты холостого хода на тахометре.
   data-mode: (нет) — страница про заслонку/холостые, clean — страница «чистка дросселя». AVTOELEKTRIK-PRO.KZ */
AO_SITE.reg('throttle', {css:
'.w-throttle .tabs button{min-height:40px;padding:8px 13px;font-size:14px}' +
'.w-throttle svg text{font-family:Arial,"Helvetica Neue",Helvetica,sans-serif}' +
'.w-throttle .ped{display:flex;align-items:center;gap:12px;margin-top:12px;color:#C9CED4;font-size:15px}' +
'.w-throttle .ped b{color:#FFA500;min-width:44px;font-variant-numeric:tabular-nums}' +
'.w-throttle .ped input{flex:1 1 auto;min-width:0;height:36px;margin:0;accent-color:#FFA500;cursor:pointer}' +
'.w-throttle .cb{opacity:0;transition:opacity .5s}.w-throttle.dirty .cb{opacity:1}' +
'.w-throttle .air path{fill:none;stroke:#C9CED4;stroke-width:2;stroke-dasharray:10 14;stroke-linecap:round}' +
'.w-throttle .sig{fill:none;stroke:#FFA500;stroke-width:2;stroke-dasharray:3 6;animation:wth-f .8s linear infinite}' +
'@keyframes wth-f{to{stroke-dashoffset:-18}}' +
'.w-throttle .lb{fill:#8FA0AE;font-size:12px}.w-throttle .nt{fill:#6B7680;font-size:11px}' +
'.w-throttle .op{fill:#C9CED4;font-size:13px}' +
'.w-throttle .tk{fill:#C9CED4;font-size:12px;font-weight:700}' +
'.w-throttle .rp{fill:#fff;font-size:22px;font-weight:700}' +
'.w-throttle .ss{fill:#C9CED4;font-size:14px;font-weight:700}' +
'.w-throttle .ss.ok{fill:#5CC86C}.w-throttle .ss.bad{fill:#EF5350}.w-throttle .ss.warn{fill:#FFA500}' +
'@media (prefers-reduced-motion:reduce){.w-throttle .sig{animation:none}.w-throttle .cb{transition:none}}',
html: '<div class="aox w-throttle"><div>' +
'<h2></h2>' +
'<p class="sub">Двигайте педаль и переключайте состояние заслонки — смотрите на нагар и обороты холостого хода.</p>' +
'<svg viewBox="0 0 400 270" role="img" aria-label="Дроссельная заслонка в разрезе и тахометр">' +
'<text class="lb" x="16" y="26">воздух →</text>' +
'<rect x="80" y="6" width="100" height="28" rx="6" fill="#1D1D1D" stroke="#5B6A77" stroke-width="2"/>' +
'<text x="130" y="25" text-anchor="middle" fill="#C9CED4" font-size="12">мотор, датчик</text>' +
'<path d="M130 34V40" stroke="#5B6A77" stroke-width="4"/>' +
'<path d="M180 20H232" stroke="#5B6A77" stroke-width="3"/><path class="sig" d="M232 20H180"/>' +
'<rect x="232" y="8" width="46" height="24" rx="5" fill="#1D1D1D" stroke="#5B6A77" stroke-width="2"/>' +
'<text x="255" y="25" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">ЭБУ</text>' +
/* корпус и канал */
'<rect x="14" y="56" width="232" height="140" fill="#0A0E11"/>' +
'<g class="air"><path d="M14 60H246"/><path d="M14 74H246"/><path d="M14 92H246"/><path d="M14 112H246"/><path d="M14 140H246"/><path d="M14 160H246"/><path d="M14 178H246"/><path d="M14 192H246"/></g>' +
'<rect x="14" y="40" width="232" height="16" fill="#2B2B2B" stroke="#4A4A4A" stroke-width="1.5"/>' +
'<rect x="14" y="196" width="232" height="16" fill="#2B2B2B" stroke="#4A4A4A" stroke-width="1.5"/>' +
'<rect x="8" y="34" width="8" height="184" rx="2" fill="#3A3A3A"/><rect x="244" y="34" width="8" height="184" rx="2" fill="#3A3A3A"/>' +
'<path class="cb" d="M100 56Q104 61 108 58Q112 63 117 59Q121 64 126 60Q130 65 135 60Q139 64 144 59Q149 63 153 58Q158 61 162 56Z" fill="#3E2B1A" stroke="#2A1D12"/>' +
'<path class="cb" d="M100 196Q104 191 108 194Q112 189 117 193Q121 188 126 192Q130 187 135 192Q139 188 144 193Q149 189 153 194Q158 191 162 196Z" fill="#3E2B1A" stroke="#2A1D12"/>' +
'<g class="pl" transform="rotate(8 130 126)">' +
'<rect x="126" y="58" width="8" height="136" rx="4" fill="#B8C0C8" stroke="#8A939C"/>' +
'<path class="cb" d="M122 60Q124 55 128 57Q131 53 135 57Q139 56 138 62L138 70Q134 72 130 69Q126 72 122 68Z" fill="#3E2B1A" stroke="#2A1D12"/>' +
'<path class="cb" d="M122 192Q124 197 128 195Q131 199 135 195Q139 196 138 190L138 182Q134 180 130 183Q126 180 122 184Z" fill="#3E2B1A" stroke="#2A1D12"/>' +
'<circle cx="130" cy="126" r="7" fill="#5B6A77" stroke="#2B2B2B" stroke-width="2"/></g>' +
'<text class="op" x="130" y="238" text-anchor="middle"></text>' +
'<text class="nt" x="130" y="258" text-anchor="middle">значения для примера</text>' +
/* тахометр */
'<circle cx="326" cy="128" r="64" fill="#0A0E11" stroke="#3A3A3A" stroke-width="3"/>' +
'<path d="M375.4 99.5A57 57 0 0 1 375.4 156.5" fill="none" stroke="#EF5350" stroke-width="5"/>' +
'<g class="tks"></g>' +
'<text class="nt" x="326" y="166" text-anchor="middle">×1000</text>' +
'<line class="nd" x1="326" y1="138" x2="326" y2="80" stroke="#FFA500" stroke-width="3" stroke-linecap="round"/>' +
'<circle cx="326" cy="128" r="6" fill="#FFA500"/>' +
'<text class="rp" x="326" y="218" text-anchor="middle">0</text>' +
'<text class="lb" x="326" y="235" text-anchor="middle">об/мин</text>' +
'<text class="ss" x="326" y="258" text-anchor="middle"></text>' +
'</svg>' +
'<label class="ped"><span>Педаль газа</span><b>0%</b><input type="range" min="0" max="100" step="1" value="0"></label>' +
'<div class="tabs" role="group" aria-label="Состояние заслонки"></div>' +
'</div>' +
'<div class="card" aria-live="polite"><span class="k"></span><h3></h3><p class="t"></p><ul></ul></div></div>',
init: function(R, U, ds){
var cm = ds.mode === 'clean';
var $ = function(s){ return R.querySelector(s); };
var MODES = cm ? [['dirty', 'В нагаре'], ['noad', 'Почистили без адаптации'], ['fixed', 'Чистка + адаптация']]
               : [['clean', 'Чистая'], ['dirty', 'В нагаре'], ['fixed', 'После чистки и адаптации']];
/* io — на сколько блок приоткрывает заслонку на холостых, idle — обороты ХХ (для примера), hunt — насколько плавают */
var P = {
  clean: {cb: 0, io: 3, idle: 760, hunt: 10, st: ['ХХ ровные', 'ok']},
  dirty: {cb: 1, io: 9, idle: 700, hunt: 120, st: ['ХХ плавают', 'bad']},
  noad:  {cb: 0, io: 9, idle: 1180, hunt: 40, st: ['ХХ завышены', 'warn']},
  fixed: {cb: 0, io: 3, idle: 760, hunt: 10, st: ['ХХ ровные', 'ok']}
};
var DIRTY = ['Нагар на кромке — обороты плавают', 'На кромке заслонки и стенках копится нагар, и на холостых воздуха проходит меньше. Блок приоткрывает заслонку сильнее, но обороты всё равно могут плавать, а мотор — глохнуть при включении нагрузки.'];
var CARD = cm ? {
  dirty: [DIRTY[0], DIRTY[1], ['Смотрю ошибки и положение заслонки в живых данных', 'Аккуратно чищу кромку и корпус', 'Делаю адаптацию сканером после чистки']],
  noad: ['Почистили, но не сделали адаптацию', 'Нагара нет, воздуха проходит больше, а блок по старой памяти приоткрывает заслонку. Обороты холостого хода могут быть завышены или плавать, пока блок не переучится.', ['Проверяю положение заслонки в живых данных', 'Запускаю адаптацию сканером', 'Проверяю холостые с нагрузкой: фары, кондиционер']],
  fixed: ['Чистка + адаптация — холостые ровные', 'После чистки запускаю адаптацию: блок заново запоминает положение закрытой заслонки. На одних машинах обучение проходит само, на других — только сканером.', ['Чистка на месте или со снятием — по ситуации', 'Аккуратная чистка кромки и корпуса', 'Адаптация сканером и проверка холостых']]
} : {
  clean: ['Чистая заслонка — ровные холостые', 'В большинстве современных машин педаль не тянет трос: блок управления по сигналу педали открывает заслонку мотором, а датчики сообщают ему её положение.', ['Проверка датчиков педали и заслонки в живых данных', 'Чтение ошибок по заслонке', 'Проверка проводки и разъёма заслонки']],
  dirty: [DIRTY[0], DIRTY[1], ['Смотрю положение заслонки на холостых в живых данных', 'Аккуратно чищу заслонку и корпус', 'Делаю адаптацию сканером после чистки']],
  fixed: ['После чистки и адаптации — холостые ровные', 'Без нагара воздуха проходит больше, а блок помнит старую поправку. Поэтому после чистки делаю адаптацию: блок заново запоминает положение заслонки, и обороты выравниваются.', ['Чистка заслонки', 'Адаптация сканером', 'Проверка холостых и ошибок после работы']]
};
$('h2').textContent = cm ? 'Чистка дроссельной заслонки' : 'Дроссельная заслонка и холостые обороты';
var cardEl = $('.card'), h3 = cardEl.querySelector('h3'), pt = cardEl.querySelector('.t'), ul = cardEl.querySelector('ul');
cardEl.querySelector('.k').textContent = cm ? 'Чистка дросселя' : 'Дроссельная заслонка';
cardEl.insertAdjacentHTML('beforeend', U.ctas(cm ? 'Здравствуйте, Олег! Хочу почистить дроссельную заслонку с адаптацией.' : 'Здравствуйте, Олег! Вопрос по дроссельной заслонке — плавают обороты холостого хода.'));
var tabs = $('.tabs');
tabs.innerHTML = MODES.map(function(m){ return '<button type="button" data-m="' + m[0] + '" aria-pressed="false">' + m[1] + '</button>'; }).join('');

/* шкала тахометра */
var CX = 326, CY = 128, s = '';
for (var i = 0; i <= 16; i++) {
  var a = (-120 + i * 15) * Math.PI / 180, r1 = i % 2 ? 56 : 52, sn = Math.sin(a), cs = Math.cos(a);
  s += '<path d="M' + (CX + r1 * sn).toFixed(1) + ' ' + (CY - r1 * cs).toFixed(1) + 'L' + (CX + 61 * sn).toFixed(1) + ' ' + (CY - 61 * cs).toFixed(1) + '" stroke="' + (i >= 12 ? '#EF5350' : '#9AA3AD') + '" stroke-width="' + (i % 2 ? 1.5 : 2.5) + '"/>';
  if (i % 2 === 0) s += '<text class="tk" x="' + (CX + 42 * sn).toFixed(1) + '" y="' + (CY - 42 * cs + 4).toFixed(1) + '" text-anchor="middle">' + (i / 2) + '</text>';
}
$('.tks').innerHTML = s;

var plate = $('.pl'), air = $('.air'), streaks = air.querySelectorAll('path'), nd = $('.nd'), rp = $('.rp'), ss = $('.ss'), op = $('.op');
var range = $('.ped input'), pv = $('.ped b');
range.setAttribute('aria-label', 'Педаль газа');
var D = [66, 52, 34, 14, 14, 34, 52, 66];
var mode = MODES[0][0], ped = 0, ang = 8, rpm = P[mode].idle, T = 0, dip = 0, off = 0, autoPed = 0, mT = 0;
var used = false, vis = false;

function openPct(){ var pm = P[mode]; return pm.io + ped * (100 - pm.io) / 100; }
function targetAng(){ return 6 + openPct() * 0.84; }
function targetRpm(){ return P[mode].idle + Math.pow(ped / 100, 1.4) * 4300; }
function paint(){
  var pm = P[mode], h = 68 * Math.cos(ang * Math.PI / 180);
  plate.setAttribute('transform', 'rotate(' + ang.toFixed(2) + ' 130 126)');
  for (var i = 0; i < streaks.length; i++) {
    var v = (D[i] - h + (pm.cb ? 1 : 5)) / 12;
    streaks[i].style.opacity = (Math.max(0, Math.min(1, v)) * 0.85).toFixed(2);
  }
  var deg = -120 + Math.max(0, Math.min(8000, rpm)) / 8000 * 240;
  nd.setAttribute('transform', 'rotate(' + deg.toFixed(1) + ' ' + CX + ' ' + CY + ')');
  rp.textContent = String(Math.round(rpm / 10) * 10);
  var stt = ped > 10 ? ['Педаль нажата', ''] : pm.st;
  ss.textContent = stt[0]; ss.setAttribute('class', 'ss ' + stt[1]);
  op.textContent = 'Открытие заслонки: ' + Math.round(openPct()) + '%';
  pv.textContent = Math.round(ped) + '%';
}
function setMode(m){
  mode = m; mT = 0;
  R.classList.toggle('dirty', !!P[m].cb);
  tabs.querySelectorAll('button').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-m') === m ? 'true' : 'false'); });
  var c = CARD[m];
  h3.textContent = c[0]; pt.textContent = c[1];
  ul.innerHTML = c[2].map(function(x){ return '<li>' + x + '</li>'; }).join('');
  if (U.reduce) { ang = targetAng(); rpm = targetRpm(); }
  paint();
}

/* живой цикл: только когда блок на экране и вкладка открыта; при reduce — без бесконечного движения */
var raf = window.requestAnimationFrame || function(f){ return setTimeout(function(){ f(Date.now()); }, 16); };
var running = false, last = 0;
function need(){ return vis && !document.hidden && !U.reduce; }
function kick(){ if (!running && need()) { running = true; last = 0; raf(loop); } }
function loop(ts){
  var dt = last ? Math.min(50, ts - last) : 16;
  last = ts; T += dt / 1000; mT += dt;
  if (!used) {
    autoPed = (mT > 1300 && mT < 2300) ? 40 : 0;
    ped += (autoPed - ped) * Math.min(1, dt / 220);
    if (Math.abs(ped - autoPed) < 0.3) ped = autoPed;
    range.value = String(Math.round(ped));
  }
  ang += (targetAng() - ang) * Math.min(1, dt / 90);
  var pm = P[mode], pr = ped / 100, hunt = pm.hunt * Math.pow(1 - pr, 2);
  var wob = hunt * Math.sin(T * 2.6) + hunt * 0.45 * Math.sin(T * 6.1 + 1) + (Math.random() - 0.5) * 12 * (1 - pr);
  if (pm.cb && pr < 0.1 && dip <= 0 && Math.random() < dt * 0.0003) dip = 700;
  if (dip > 0) { dip -= dt; wob -= 220; }
  rpm += (targetRpm() + wob - rpm) * Math.min(1, dt / 300);
  var flow = 1 - 68 * Math.cos(ang * Math.PI / 180) / 68;
  off -= dt * (25 + 260 * flow) / 1000;
  air.style.strokeDashoffset = off.toFixed(1);
  paint();
  if (need()) raf(loop); else running = false;
}
document.addEventListener('visibilitychange', kick);

range.addEventListener('input', function(){
  used = true;
  ped = +range.value;
  if (U.reduce) { ang = targetAng(); rpm = targetRpm(); }
  paint(); kick();
});
tabs.addEventListener('click', function(e){
  var b = e.target.closest('button[data-m]');
  if (!b) return;
  U.buzz(12); setMode(b.getAttribute('data-m'));
});

/* автопоказ: раз в 3,6 с следующее состояние и короткий «газок», пока посетитель не трогал блок */
function stopAuto(){ used = true; }
R.addEventListener('pointerdown', stopAuto);
R.addEventListener('keydown', stopAuto);
U.seen(R, function(v){ vis = v; kick(); });
var keys = MODES.map(function(m){ return m[0]; });
if (!U.reduce) setInterval(function(){
  if (used || !vis || document.hidden) return;
  setMode(keys[(keys.indexOf(mode) + 1) % keys.length]);
}, 3600);

ang = targetAng();
setMode(mode);
}});
