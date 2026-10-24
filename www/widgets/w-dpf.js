/* «Сажевый фильтр: чистим, а не удаляем» — страница регенерации сажевого фильтра (DPF/FAP), avtoelektrik-pro.kz */
(function(){
var P = '.w-dpf';
var css = [
P+' .chip{min-height:38px}',
P+' .row{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:12px}',
P+' .row .btn{min-height:44px;padding:10px 18px}',
P+' .row .btn:disabled{opacity:.65;cursor:default}',
P+' svg text{font-family:inherit}',
P+' .lbl{font-size:14px;fill:#9AA3AD}',
P+' .ttl{font-size:15px;font-weight:700;fill:#fff}',
P+' .okt{font-size:14px;font-weight:700;fill:#5CC86C}',
P+' .pp,'+P+' .cn{fill:#3A4651;stroke:#5B6A77;stroke-width:2}',
P+' .bd0{fill:#2F3A44;stroke:#7D8790;stroke-width:2}',
P+' .tb{fill:none;stroke:#5B6A77;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;transition:stroke .3s}',
P+'.lie .tb{stroke:#EF5350;stroke-dasharray:6 5;animation:wdB 1s ease-in-out infinite}',
P+' .dps{fill:#1D1D1D;stroke:#5B6A77;stroke-width:2;transition:stroke .3s}',
P+' .dps.hi{stroke:#EF5350}'+P+' .dps.ok{stroke:#5CC86C}',
P+' .dpt{font-size:15px;font-weight:700;fill:#fff}',
P+' .dpt.hi{fill:#EF5350}'+P+' .dpt.ok{fill:#5CC86C}',
P+'.lie .dpt{animation:wdB 1s ease-in-out infinite}',
'@keyframes wdB{50%{opacity:.45}}',
P+' .sto{fill:#141414}',
P+' .fi,'+P+' .fo{fill:none;stroke-width:2.5;stroke-linecap:round;stroke-dasharray:3 7;animation:wdF 1s linear infinite}',
P+' .fi{stroke:#1A1A1A}'+P+' .fo{stroke:#fff}',
P+'.cl .fi,'+P+'.cl .fo{animation-duration:2.8s}',
'@keyframes wdF{to{stroke-dashoffset:-20}}',
P+' .gl{fill:#FF7A00;pointer-events:none}',
P+' .sp{opacity:0;transition:opacity .4s}'+P+'.rg .sp{opacity:1}',
P+' .sp circle{fill:#FFD27A;animation:wdS .5s ease-in-out infinite alternate}',
P+' .sp circle:nth-child(2n){animation-delay:.25s}'+P+' .sp circle:nth-child(3n){animation-delay:.4s}',
'@keyframes wdS{from{opacity:.15}to{opacity:1}}',
P+' .rd{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:10px}',
P+' .m{background:#1D1D1D;border:1px solid #2E2E2E;border-radius:12px;padding:9px 11px;min-width:0}',
P+' .lb{display:block;font-size:12px;color:#C9CED4;line-height:1.3}',
P+' .v{display:block;font-size:clamp(15px,4.1vw,20px);font-weight:700;color:#fff;margin-top:2px;font-variant-numeric:tabular-nums;white-space:nowrap}',
P+' .v.ok{color:#5CC86C}'+P+' .v.bd{color:#EF5350}'+P+' .v.hot{color:#FFA500}',
P+'.lie .v.dpv{animation:wdB 1s ease-in-out infinite}',
P+' .tr{height:8px;border-radius:4px;background:#2E2E2E;margin-top:6px;overflow:hidden}',
P+' .tr b{display:block;height:100%;border-radius:4px;background:#EF5350}',
P+' .stt{margin:10px 0 0;font-size:14.5px;line-height:1.4;color:#C9CED4;min-height:2.8em}',
'@media (min-width:821px){'+P+' .stt{min-height:1.4em}}',
P+' .stt.ok{color:#5CC86C}'+P+' .stt.bd{color:#EF5350}'+P+' .stt.go{color:#FFA500}',
P+' .note{border-left:3px solid #5CC86C;background:rgba(92,200,108,.08);padding:8px 10px;border-radius:6px;color:#D9DDE1;font-size:14.5px;line-height:1.4}',
P+'.ps *{animation-play-state:paused!important}',
'@media (prefers-reduced-motion:reduce){'+P+' *{animation:none!important;transition-duration:.01s!important}}'
].join('\n');

var soot = '', walls = '', plugs = '', sparks = '';
for (var i = 0; i < 4; i++) {
  soot += '<rect class="sto" x="290" y="' + (101 + 20 * i) + '" width="0" height="8"/>';
  plugs += '<rect x="290" y="' + (100 + 20 * i) + '" width="6" height="10" fill="#C9CED4"/>';
  if (i < 3) plugs += '<rect x="104" y="' + (110 + 20 * i) + '" width="6" height="10" fill="#C9CED4"/>';
}
for (i = 1; i < 7; i++) walls += 'M104 ' + (100 + 10 * i) + ' H296 ';
[[150,105],[200,125],[240,145],[180,165],[262,105],[130,145],[225,165],[270,125],[160,125],[214,105]].forEach(function(p){ sparks += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.2"/>'; });

var svg = '<svg viewBox="0 0 400 248" role="img" aria-label="Сажевый фильтр в разрезе: каналы с сажей, датчик температуры и датчик перепада давления">' +
 '<path class="tb" d="M156 48 V64 H78 V100"/><path class="tb" d="M244 48 V64 H322 V100"/>' +
 '<rect class="dps" x="128" y="14" width="144" height="34" rx="8"/><text class="dpt" x="200" y="36" text-anchor="middle">ΔP: высокий</text>' +
 '<line x1="40" y1="70" x2="40" y2="128" stroke="#C9CED4" stroke-width="4"/><rect x="32" y="56" width="16" height="16" rx="3" fill="#3A4651" stroke="#5B6A77" stroke-width="2"/><text class="lbl" x="54" y="70">T</text>' +
 '<rect class="pp" x="0" y="118" width="62" height="34"/><path class="cn" d="M60 118 L92 90 V180 L60 152 Z"/>' +
 '<rect class="bd0" x="90" y="90" width="220" height="90" rx="10"/>' +
 '<path class="cn" d="M308 90 L340 118 V152 L308 180 Z"/><rect class="pp" x="338" y="118" width="62" height="34"/>' +
 '<rect x="104" y="100" width="192" height="70" fill="#6E7881"/>' +
 '<path class="fi" d="M2 135 H96 M106 105 H288 M106 125 H288 M106 145 H288 M106 165 H288"/>' +
 soot +
 '<path d="' + walls + '" stroke="#2B2F33" stroke-width="2"/>' +
 '<rect x="104" y="100" width="192" height="70" fill="none" stroke="#2B2F33" stroke-width="2"/>' +
 plugs +
 '<path class="fo" d="M112 115 H296 M112 135 H296 M112 155 H296 M300 135 H398"/>' +
 '<g class="sp">' + sparks + '</g>' +
 '<rect class="gl" x="90" y="90" width="220" height="90" rx="10" opacity="0"/>' +
 '<text class="lbl" x="4" y="172">от мотора</text><text class="lbl" x="396" y="172" text-anchor="end">выход</text>' +
 '<text class="ttl" x="200" y="206" text-anchor="middle">Сажевый фильтр (DPF/FAP) в разрезе</text>' +
 '<text class="okt" x="200" y="234" text-anchor="middle">Фильтр не удаляем — восстанавливаем его работу</text>' +
'</svg>';

var html = '<div class="aox w-dpf"><div>' +
 '<h2>Сажевый фильтр: чистим, а не удаляем</h2>' +
 '<p class="sub">Выберите состояние и нажмите «Принудительная регенерация» — посмотрите, как выгорает сажа.</p>' +
 svg +
 '<div class="rd" aria-hidden="true">' +
  '<div class="m"><span class="lb">Сажа в фильтре</span><span class="v sv">85 %</span><div class="tr"><b></b></div></div>' +
  '<div class="m"><span class="lb">Температура</span><span class="v tv">250 °C</span></div>' +
  '<div class="m"><span class="lb">Перепад ΔP</span><span class="v dpv">высокий</span></div>' +
 '</div>' +
 '<p class="stt" role="status"></p>' +
 '<div class="tabs" role="group" aria-label="Состояние фильтра"></div>' +
 '<div class="row"><button type="button" class="btn o go">Принудительная регенерация</button></div>' +
'</div>' +
'<div class="card"><span class="k"></span><h3></h3><p class="t"></p><ul></ul>' +
 '<p class="note">Сажевый фильтр не удаляем и не отключаем — восстанавливаем его работу: чистим регенерацией и устраняем причину, по которой копится сажа.</p></div></div>';

AO_SITE.reg('dpf', {css: css, html: html, init: function(R, U){
var M = {
 clog: {n:'Забит', s:.85, T:250, dp:'hi', st:'Сажи много — перепад давления высокий',
  k:'Сажевый фильтр · забит', h:'Фильтр забит сажей',
  p:'Сажа копится, когда машина ездит короткими поездками по городу и фильтр не успевает очиститься сам. Растёт перепад давления, загорается лампа, мотор может уйти в аварийный режим и потерять тягу.',
  c:['Ошибки и данные датчиков на сканере','Принудительная регенерация сканером, если фильтр цел','Ищем, почему сажа копится быстро: датчики, форсунки, режим езды']},
 done: {n:'После регенерации', s:.06, T:280, dp:'ok', st:'Сажи мало — перепад давления в норме',
  k:'Сажевый фильтр · после регенерации', h:'Сажа выгорела — фильтр снова работает',
  p:'При регенерации температура в фильтре поднимается примерно до 600 °C, и сажа сгорает. Перепад давления приходит в норму, тяга возвращается. Мотор должен быть прогрет, а процесс лучше не прерывать.',
  c:['Контроль перепада давления и температуры','Проверка, что ошибки не возвращаются','Подскажем режим езды, чтобы фильтр чистился сам']},
 lie: {n:'Датчик перепада врёт', s:.12, T:250, dp:'lie', st:'Сажи мало, а датчик показывает «высокий»',
  k:'Сажевый фильтр · датчик перепада', h:'Фильтр чистый, а датчик «видит» засор',
  p:'Если треснула или забилась трубка датчика перепада давления или неисправен сам датчик, блок думает, что фильтр забит. Регенерация тут не поможет — сначала лечим датчик.',
  c:['Сравниваем показания ΔP с реальным состоянием фильтра','Проверка трубок, датчика и проводки','Замена датчика или трубок, повторная проверка']}
};
var K = ['clog','done','lie'], mode = 'clog', s = .85, T = 250, dp = 'hi', token = 0, running = false, used = false, vis = true, step = 0;
function $(q){ return R.querySelector(q); }
var card = $('.card'), btn = $('.go'), soots = R.querySelectorAll('.sto'), gl = $('.gl');
card.insertAdjacentHTML('beforeend', U.ctas('Здравствуйте, Олег! Нужна диагностика и регенерация сажевого фильтра (DPF).'));
$('.tabs').innerHTML = K.map(function(k){ return '<button type="button" class="chip" data-k="'+k+'" aria-pressed="false">'+M[k].n+'</button>'; }).join('');

function draw(){
  var w = 180 * s;
  for (var i = 0; i < soots.length; i++) { soots[i].setAttribute('x', (290 - w).toFixed(1)); soots[i].setAttribute('width', w.toFixed(1)); }
  gl.setAttribute('opacity', (Math.max(0, Math.min(1, (T - 260) / 360)) * .5).toFixed(3));
  R.classList.toggle('cl', s > .5);
  R.classList.toggle('lie', dp === 'lie');
  var pc = Math.round(s * 100), sv = $('.sv');
  sv.textContent = pc + ' %'; sv.className = 'v sv ' + (pc > 70 ? 'bd' : pc > 40 ? 'hot' : 'ok');
  var b = $('.tr b'); b.style.width = pc + '%'; b.style.background = pc > 70 ? '#EF5350' : pc > 40 ? '#FFA500' : '#5CC86C';
  var tv = $('.tv'); tv.textContent = Math.round(T / 10) * 10 + ' °C'; tv.className = 'v tv' + (T > 450 ? ' hot' : '');
  var hi = dp !== 'ok', txt = dp === 'ok' ? 'норма' : 'высокий';
  var dv = $('.dpv'); dv.textContent = txt; dv.className = 'v dpv ' + (hi ? 'bd' : 'ok');
  $('.dpt').textContent = 'ΔP: ' + txt + (dp === 'lie' ? ' ?' : '');
  $('.dpt').setAttribute('class', 'dpt ' + (hi ? 'hi' : 'ok'));
  $('.dps').setAttribute('class', 'dps ' + (hi ? 'hi' : 'ok'));
}
function stt(t, c){ var e = $('.stt'); e.textContent = t; e.className = 'stt' + (c ? ' ' + c : ''); }
function chips(){ [].forEach.call(R.querySelectorAll('.chip'), function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-k') === mode ? 'true' : 'false'); }); }
function fill(m){
  var d = M[m];
  $('.card .k').textContent = d.k; $('.card h3').textContent = d.h; $('.card .t').textContent = d.p;
  $('.card ul').innerHTML = d.c.map(function(x){ return '<li>' + x + '</li>'; }).join('');
}
function btnReset(){ btn.disabled = false; btn.textContent = 'Принудительная регенерация'; }
function setMode(m){
  token++; running = false; mode = m; var d = M[m];
  s = d.s; T = d.T; dp = d.dp; R.classList.remove('rg');
  draw(); chips(); fill(m); btnReset(); stt(d.st, m === 'done' ? 'ok' : 'bd');
}
function tween(from, to, ms, fn, done, tk){
  if (U.reduce) { fn(to); done(); return; }
  var t0 = null;
  function f(ts){
    if (tk !== token) return;
    if (t0 === null) t0 = ts;
    var k = Math.min(1, (ts - t0) / ms), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
    fn(from + (to - from) * e);
    if (k < 1) requestAnimationFrame(f); else done();
  }
  requestAnimationFrame(f);
}
function regen(){
  if (running) return;
  var tk = ++token; running = true; btn.disabled = true; btn.textContent = 'Идёт регенерация…';
  R.classList.add('rg'); stt('Прогрев: температура в фильтре растёт примерно до 600 °C…', 'go');
  tween(T, 620, 1600, function(v){ T = v; draw(); }, function(){
    stt('Сажа выгорает…', 'go');
    tween(s, .05, 2400, function(v){ s = v; if (mode !== 'lie' && s < .35) dp = 'ok'; draw(); }, function(){
      R.classList.remove('rg');
      tween(T, 300, 1200, function(v){ T = v; draw(); }, function(){
        running = false; btnReset();
        if (mode === 'lie') stt('Сажи нет, а ΔP всё равно «высокий» — виноват датчик или его трубки', 'bd');
        else { mode = 'done'; chips(); fill('done'); stt('Готово: сажа выгорела, перепад давления в норме', 'ok'); }
      }, tk);
    }, tk);
  }, tk);
}
function touch(){ if (used) return; used = true; card.setAttribute('aria-live', 'polite'); }
R.addEventListener('pointerdown', touch);
R.addEventListener('keydown', touch);
R.addEventListener('click', function(e){
  if (e.target.closest('.go')) { touch(); regen(); U.buzz(15); return; }
  var t = e.target.closest('.chip'); if (!t) return;
  touch(); setMode(t.getAttribute('data-k')); U.buzz(12);
});
setMode('clog');
U.seen(R, function(v){ vis = v; R.classList.toggle('ps', !v); });
if (!U.reduce) setInterval(function(){
  if (used || !vis || document.hidden || running) return;
  step = (step + 1) % 4;
  if (step === 0) setMode('clog'); else if (step === 2) setMode('lie'); else regen();
}, 3600);
}});
})();
