/* «Автосигнализация» — охрана, тревога, автозапуск в мороз, проверка тока покоя. avtoelektrik-pro.kz */
(function(){
var P = '.w-alarm';
var CSS = [
P+' .tabs .chip{min-height:40px;padding:9px 12px}',
P+' .lbl{fill:#C9CED4;font-size:13px}',
'@keyframes wal-bl{50%{opacity:.15}}',
'@keyframes wal-pu{50%{opacity:.35}}',
/* поворотники и светодиод */
P+' .blk{fill:#FFA500;opacity:.2}'+P+' .bgl{fill:#FFA500;opacity:0}',
P+'[data-st=arm] .blk{animation:wal-arm 3.5s linear infinite}'+P+'[data-st=arm] .bgl{animation:wal-armg 3.5s linear infinite}',
'@keyframes wal-arm{0%,8%{opacity:1}9%,100%{opacity:.2}}',
'@keyframes wal-armg{0%,8%{opacity:.45}9%,100%{opacity:0}}',
P+'[data-st=alarm] .blk{animation:wal-fast .55s steps(1) infinite}'+P+'[data-st=alarm] .bgl{animation:wal-fastg .55s steps(1) infinite}',
'@keyframes wal-fast{0%{opacity:1}50%{opacity:.2}}',
'@keyframes wal-fastg{0%{opacity:.5}50%{opacity:0}}',
P+' .led{fill:#5B2323}'+P+'[data-st=arm] .led,'+P+'[data-st=alarm] .led,'+P+'[data-st=start] .led{fill:#EF5350;animation:wal-bl 1.4s steps(2) infinite}',
P+' .hl{opacity:0;transition:opacity .4s}'+P+'[data-st=start] .hl{opacity:.35}',
/* сирена */
P+' .snd path{fill:none;stroke:#EF5350;stroke-width:3;stroke-linecap:round;opacity:0}',
P+'[data-st=alarm] .snd path{animation:wal-snd .9s ease-out infinite}',
P+' .snd path:nth-child(2){animation-delay:.3s}'+P+' .snd path:nth-child(3){animation-delay:.6s}',
'@keyframes wal-snd{0%{opacity:0}30%{opacity:1}100%{opacity:0}}',
/* радиосвязь брелок ↔ машина */
P+' .wv path{fill:none;stroke:#FFA500;stroke-width:3;stroke-linecap:round;opacity:0;transform-origin:86px 176px}',
P+'[data-st=arm] .wv path,'+P+'[data-st=start] .wv path{animation:wal-wv 1.8s ease-out infinite}',
P+'[data-st=alarm] .wv path{stroke:#EF5350;animation:wal-wv 1.2s ease-out infinite reverse}',
P+' .wv path:nth-child(2){animation-delay:.6s!important}'+P+' .wv path:nth-child(3){animation-delay:1.2s!important}',
'@keyframes wal-wv{0%{opacity:0;transform:scale(.6)}25%{opacity:1}100%{opacity:0;transform:scale(1.5)}}',
/* брелок и телефон */
P+' .fs{display:none}',
P+'[data-st=arm] .fs-arm,'+P+'[data-st=alarm] .fs-al,'+P+'[data-st=start] .fs-st,'+P+'[data-st=drain] .fs-dr{display:inline}',
P+' .fscr{fill:#B9CBA0;transition:fill .3s}'+P+'[data-st=alarm] .fscr{animation:wal-fscr .55s steps(1) infinite}',
'@keyframes wal-fscr{0%{fill:#EF9A9A}50%{fill:#B9CBA0}}',
/* мороз и выхлоп */
P+' .snow,'+P+' .thermo,'+P+' .exh{display:none}'+P+'[data-st=start] .snow,'+P+'[data-st=start] .thermo,'+P+'[data-st=start] .exh{display:inline}',
P+' .snow path{fill:none;stroke:#E3F2FD;stroke-width:1.6;stroke-linecap:round;animation:wal-sn 4s linear infinite}',
'@keyframes wal-sn{0%{transform:translateY(-10px);opacity:0}15%{opacity:1}100%{transform:translateY(150px);opacity:0}}',
P+' .exh circle{fill:#9AA3AD;opacity:0;transform-box:fill-box;transform-origin:center;animation:wal-ex 2.2s ease-out infinite}',
P+' .exh circle:nth-child(2){animation-delay:.7s}'+P+' .exh circle:nth-child(3){animation-delay:1.4s}',
'@keyframes wal-ex{0%{opacity:.7;transform:translate(0,0) scale(.6)}100%{opacity:0;transform:translate(-6px,-30px) scale(2)}}',
/* панель */
P+' .pn{display:none}',
P+'[data-st=arm] .pn-s,'+P+'[data-st=alarm] .pn-s,'+P+'[data-st=start] .pn-st,'+P+'[data-st=drain] .pn-dr{display:inline}',
P+' .ok-t{display:inline}'+P+' .al-t{display:none}'+P+'[data-st=alarm] .s3 .ok-t{display:none}'+P+'[data-st=alarm] .s3 .al-t{display:inline}',
P+' .si{fill:#5CC86C}'+P+'[data-st=alarm] .s3 .si{fill:#EF5350;animation:wal-bl .55s steps(1) infinite}',
P+' .bar{transform-box:fill-box;transform-origin:left center;transform:scaleX(.85)}',
P+'.run[data-st=start] .bar{animation:wal-bar 3.4s ease-out both}',
'@keyframes wal-bar{from{transform:scaleX(.05)}to{transform:scaleX(.85)}}',
P+'.run[data-st=drain] .after{animation:wal-in 1.8s both}',
'@keyframes wal-in{0%,55%{opacity:0}75%,100%{opacity:1}}',
P+'.run[data-st=drain] .fuse{animation:wal-fz 1.8s both}',
'@keyframes wal-fz{0%,40%{transform:translateY(0)}60%,100%{transform:translateY(-10px)}}',
/* пауза и «меньше движения» */
P+'.is-off *{animation-play-state:paused!important}',
P+'.rm *{animation:none!important;transition:none!important}',
'@media (prefers-reduced-motion:reduce){'+P+' *{animation:none!important;transition:none!important}}'
].join('\n');

function arc(cx, cy, r, a0, a1){
  var p = function(a){ a = a * Math.PI / 180; return (cx + r * Math.cos(a)).toFixed(1) + ' ' + (cy + r * Math.sin(a)).toFixed(1); };
  return 'M' + p(a0) + 'A' + r + ' ' + r + ' 0 0 1 ' + p(a1);
}
function lockIcon(x, y, c){ return '<path d="M' + (x - 5) + ' ' + y + 'v-4a5 5 0 0 1 10 0v4" fill="none" stroke="' + c + '" stroke-width="2.2"/><rect x="' + (x - 7) + '" y="' + y + '" width="14" height="10" rx="2" fill="' + c + '"/>'; }

function svg(){
  var s = [], i;
  s.push('<svg viewBox="0 0 440 300" role="img" aria-label="Машина под сигнализацией, брелок и телефон, панель датчиков и тока покоя">');
  /* мороз */
  var fl = '';
  [[150,0,0],[210,10,1.2],[268,-6,2.4],[330,4,.6],[392,-2,1.8],[30,6,3],[96,-8,.9],[180,40,2.9],[300,30,1.5],[420,26,3.4]].forEach(function(f){
    fl += '<g transform="translate(' + f[0] + ' ' + f[1] + ')"><path d="M0-5V5M-4.3-2.5L4.3 2.5M-4.3 2.5L4.3-2.5" style="animation-delay:' + f[2] + 's"/></g>'; });
  s.push('<g class="snow">' + fl + '</g>');
  s.push('<g class="thermo"><rect x="24" y="22" width="14" height="66" rx="7" fill="#1E1E1E" stroke="#9AA3AD" stroke-width="2"/><rect x="28" y="62" width="6" height="28" fill="#4FC3F7"/><circle cx="31" cy="96" r="11" fill="#4FC3F7" stroke="#9AA3AD" stroke-width="2"/><text x="48" y="62" fill="#4FC3F7" font-size="20" font-weight="700">−25°</text></g>');
  /* машина */
  s.push('<g transform="translate(104 -24) scale(.54)">' +
    '<ellipse class="hl" cx="52" cy="206" rx="40" ry="22" fill="#FFF59D"/>' +
    '<path d="M40 210 C40 182 58 170 92 164 L168 152 C196 118 232 94 300 90 L410 90 C452 90 486 112 516 150 L572 160 C600 166 612 184 612 210 L612 222 L40 222 Z" fill="#2B2B2B" stroke="#4A4A4A" stroke-width="4"/>' +
    '<path d="M206 150 C228 120 256 104 300 102 L352 102 L352 150 Z" fill="#3B4A57"/><path d="M366 102 L408 102 C440 102 466 120 488 150 L366 150 Z" fill="#3B4A57"/>' +
    '<path d="M44 206 h22" stroke="#FFD54F" stroke-width="7" stroke-linecap="round"/><path d="M596 196 h16" stroke="#E53935" stroke-width="7" stroke-linecap="round"/>' +
    '<circle class="bgl" cx="70" cy="188" r="26"/><circle class="bgl" cx="600" cy="182" r="24"/><circle class="bgl" cx="214" cy="150" r="18"/>' +
    '<circle class="blk" cx="70" cy="188" r="10"/><circle class="blk" cx="600" cy="182" r="9"/><circle class="blk" cx="214" cy="150" r="7"/>' +
    '<circle class="led" cx="330" cy="140" r="6"/>' +
    '<circle cx="150" cy="222" r="40" fill="#151515" stroke="#555" stroke-width="5"/><circle cx="150" cy="222" r="16" fill="#777"/>' +
    '<circle cx="500" cy="222" r="40" fill="#151515" stroke="#555" stroke-width="5"/><circle cx="500" cy="222" r="16" fill="#777"/></g>');
  s.push('<path d="M120 119H436" stroke="#2E2E2E" stroke-width="3"/>');
  s.push('<g class="exh"><circle cx="428" cy="98" r="5"/><circle cx="428" cy="98" r="5"/><circle cx="428" cy="98" r="5"/></g>');
  s.push('<g class="snd"><path d="M116 62Q108 74 116 86"/><path d="M106 54Q94 74 106 94"/><path d="M96 46Q80 74 96 102"/></g>');
  /* волны связи */
  s.push('<g class="wv"><path d="' + arc(86, 176, 30, -75, -15) + '"/><path d="' + arc(86, 176, 30, -75, -15) + '"/><path d="' + arc(86, 176, 30, -75, -15) + '"/></g>');
  /* брелок */
  s.push('<rect x="20" y="176" width="58" height="110" rx="22" fill="#222" stroke="#555" stroke-width="2"/><rect class="fscr" x="29" y="190" width="40" height="34" rx="4"/>');
  s.push('<g class="fs fs-arm fs-dr">' + lockIcon(49, 207, '#1B2414') + '</g>');
  s.push('<g class="fs fs-al"><text x="49" y="216" text-anchor="middle" font-size="22" font-weight="700" fill="#7F1D1D">!</text></g>');
  s.push('<g class="fs fs-st"><text x="49" y="213" text-anchor="middle" font-size="13" font-weight="700" fill="#1B2414">−25°</text></g>');
  s.push('<circle cx="36" cy="242" r="8" fill="#333" stroke="#555" stroke-width="1.5"/><circle cx="62" cy="242" r="8" fill="#333" stroke="#555" stroke-width="1.5"/><circle cx="49" cy="266" r="8" fill="#333" stroke="#555" stroke-width="1.5"/>');
  s.push(lockIcon(36, 242, '#9AA3AD').replace(/height="10"/, 'height="6"'));
  /* телефон */
  s.push('<rect x="92" y="180" width="56" height="106" rx="10" fill="#161616" stroke="#555" stroke-width="2"/><rect x="97" y="192" width="46" height="82" rx="4" fill="#0E1620"/><rect x="112" y="184" width="16" height="3" rx="1.5" fill="#444"/>');
  s.push('<path d="M104 222q2-8 8-9h16q6 1 8 9v6h-32z" fill="#3B4A57"/><circle cx="110" cy="229" r="3.5" fill="#9AA3AD"/><circle cx="130" cy="229" r="3.5" fill="#9AA3AD"/>');
  s.push('<g font-size="11" font-weight="700" text-anchor="middle"><text class="fs fs-arm" x="120" y="252" fill="#5CC86C">Охрана</text><text class="fs fs-al" x="120" y="252" fill="#EF5350">Тревога</text><text class="fs fs-st" x="120" y="252" fill="#4FC3F7">Прогрев</text><text class="fs fs-dr" x="120" y="252" fill="#EF5350">АКБ слаб</text></g>');
  /* панель */
  s.push('<rect x="170" y="140" width="258" height="150" rx="12" fill="#1A1A1A" stroke="#333" stroke-width="2"/>');
  var SN = ['Двери','Капот и багажник','Датчик удара'], ps = '<g class="pn pn-s"><text x="186" y="164" fill="#9AA3AD" font-size="11" font-weight="700">ДАТЧИКИ ОХРАНЫ</text>';
  for (i = 0; i < 3; i++){ var y = 196 + 32 * i;
    ps += '<g class="s' + (i + 1) + '"><circle class="si" cx="194" cy="' + (y - 5) + '" r="7"/><text x="210" y="' + y + '" fill="#E0E6EA" font-size="14">' + SN[i] + '</text>' +
      '<text class="ok-t" x="414" y="' + y + '" text-anchor="end" fill="#5CC86C" font-size="13" font-weight="700">норма</text><text class="al-t" x="414" y="' + y + '" text-anchor="end" fill="#EF5350" font-size="13" font-weight="700">сработал</text></g>'; }
  s.push(ps + '</g>');
  s.push('<g class="pn pn-st"><text x="186" y="164" fill="#9AA3AD" font-size="11" font-weight="700">АВТОЗАПУСК</text>' +
    '<text x="186" y="196" fill="#E0E6EA" font-size="14">На улице</text><text x="414" y="196" text-anchor="end" fill="#4FC3F7" font-size="15" font-weight="700">−25°</text>' +
    '<text x="186" y="226" fill="#E0E6EA" font-size="14">Двигатель прогревается</text>' +
    '<rect x="186" y="236" width="228" height="12" rx="6" fill="#2A2A2A"/><rect class="bar" x="186" y="236" width="228" height="12" rx="6" fill="#FFA500"/>' +
    '<text x="186" y="276" fill="#C9CED4" font-size="12">двери остаются закрытыми</text></g>');
  s.push('<g class="pn pn-dr"><text x="186" y="164" fill="#9AA3AD" font-size="11" font-weight="700">ТОК ПОКОЯ — МАШИНА «СПИТ»</text>' +
    '<rect x="372" y="152" width="40" height="18" rx="3" fill="none" stroke="#EF5350" stroke-width="2"/><rect x="412" y="157" width="4" height="8" fill="#EF5350"/><rect x="375" y="155" width="9" height="12" fill="#EF5350"/>' +
    '<text x="186" y="203" fill="#E0E6EA" font-size="14">Всё подключено</text><text x="414" y="206" text-anchor="end" fill="#EF5350" font-size="26" font-weight="700">180 мА</text>' +
    '<path d="M186 220H414" stroke="#2E2E2E" stroke-width="1.5"/>' +
    '<g class="fuse"><rect x="186" y="234" width="20" height="12" rx="2" fill="#FFA500"/><path d="M190 234v-4M202 234v-4" stroke="#9AA3AD" stroke-width="2"/></g>' +
    '<text x="214" y="245" fill="#C9CED4" font-size="12">сняли предохранитель сигнализации</text>' +
    '<g class="after"><text x="186" y="277" fill="#E0E6EA" font-size="14">Ток упал</text><text x="414" y="280" text-anchor="end" fill="#5CC86C" font-size="26" font-weight="700">25 мА</text></g></g>');
  s.push('</svg>');
  return s.join('');
}

var MODES = [
 {id:'arm', n:'Охрана', wa:'Хочу проверить сигнализацию.',
  h:'Машина под охраной', t:'Сигнализация следит за дверями, капотом, багажником и датчиком удара. Поворотники мигнули — охрана включена, брелок или телефон это подтверждают.',
  c:['Проверим концевики дверей, капота и багажника','Настроим датчик удара','Проверим брелок и связь с телефоном']},
 {id:'alarm', n:'Тревога', wa:'Сигнализация срабатывает сама.',
  h:'Тревога: мигают поворотники, воет сирена', t:'Если сигнализация срабатывает сама по себе — чаще виноват концевик капота или двери, слишком чувствительный датчик удара или слабый аккумулятор.',
  c:['Смотрим, какой датчик даёт тревогу','Регулируем или меняем концевики и датчик','Проверяем питание и массу блока']},
 {id:'start', n:'Автозапуск в мороз', wa:'Вопрос по автозапуску.',
  h:'Автозапуск: садитесь в прогретую машину', t:'Двигатель запускается по времени, по температуре или с брелока и прогревается, пока вы собираетесь. Двери при этом остаются закрытыми.',
  c:['Проверяем и настраиваем автозапуск','Проверяем аккумулятор — в мороз ему тяжелее всего','Проверяем проводку и подключение блока']},
 {id:'drain', n:'Сажает аккумулятор', wa:'Сигнализация сажает аккумулятор.',
  h:'Сигнализация сажает аккумулятор', t:'Машина постояла пару дней и не заводится? Замеряем ток покоя — сколько машина берёт, когда всё выключено и «уснуло». Отключили сигнализацию, а ток упал — значит, дело в ней или в её подключении.',
  c:['Замеряем ток покоя амперметром','Ищем потребителя по предохранителям','Ремонтируем подключение или меняем блок']}
];
var WA = 'Здравствуйте, Олег! Вопрос по автосигнализации.';

AO_SITE.reg('alarm', {css: CSS, html: '<div class="aox w-alarm"><div class="L"></div><div class="card" aria-live="polite"></div></div>', init: function(R, U){
  var L = R.querySelector('.L'), C = R.querySelector('.card');
  if (U.reduce) R.classList.add('rm');
  L.innerHTML = '<h2>Установка и ремонт автосигнализаций</h2><p class="sub">Выберите режим — покажу, как работает сигнализация и что проверит мастер.</p>' + svg() +
    '<div class="tabs" role="group" aria-label="Режимы">' + MODES.map(function(m){ return '<button type="button" class="chip" data-m="' + m.id + '" aria-pressed="false">' + m.n + '</button>'; }).join('') + '</div>';
  C.innerHTML = '<span class="k"></span><h3></h3><p class="t"></p><ul></ul>' + U.ctas(WA);
  var K = C.querySelector('.k'), H = C.querySelector('h3'), T = C.querySelector('.t'), UL = C.querySelector('ul'), WAa = C.querySelector('.btn.w');
  var MODE = {}, ids = [], st = null, used = false, vis = false;
  MODES.forEach(function(m){ MODE[m.id] = m; ids.push(m.id); });
  function setMode(id){
    var m = MODE[id]; st = id;
    R.setAttribute('data-st', id);
    R.classList.remove('run'); void R.offsetWidth; R.classList.add('run');
    L.querySelectorAll('.chip').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-m') === id ? 'true' : 'false'); });
    K.textContent = 'Сигнализация: ' + m.n.toLowerCase(); H.textContent = m.h; T.textContent = m.t;
    UL.innerHTML = m.c.map(function(x){ return '<li>' + x + '</li>'; }).join('');
    WAa.href = U.wa(WA + ' ' + m.wa);
  }
  function touch(){ used = true; }
  L.addEventListener('click', function(e){ var c = e.target.closest('.chip'); if (c){ touch(); setMode(c.getAttribute('data-m')); U.buzz(); } });
  R.addEventListener('click', touch); R.addEventListener('keydown', touch);
  setMode(ids[0]);
  U.seen(R, function(v){ vis = v; R.classList.toggle('is-off', !v); });
  if (!U.reduce) setInterval(function(){
    if (used || !vis || document.hidden) return;
    setMode(ids[(ids.indexOf(st) + 1) % ids.length]);
  }, 3600);
}});
})();
