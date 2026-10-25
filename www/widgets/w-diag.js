/* «Компьютерная диагностика» — экран сканера: опрос блоков, ошибки, живые данные.
   data-mode: (нет) — легковые, truck — грузовые 24 В, buy — проверка перед покупкой. AVTOELEKTRIK-PRO.KZ */
AO_SITE.reg('diag', {css:
'.w-diag .tabs button{min-height:40px;padding:8px 14px;font-size:14px}' +
'.w-diag svg text{font-family:Arial,"Helvetica Neue",Helvetica,sans-serif}' +
'.w-diag .scan{cursor:pointer;outline:none}' +
'.w-diag .scan rect{fill:#FFA500;transition:fill .2s}' +
'.w-diag .scan:hover rect{fill:#FFB52E}' +
'.w-diag .scan:focus-visible rect{stroke:#4FC3F7;stroke-width:3}' +
'.w-diag .scan text{fill:#111;font-size:17px;font-weight:700;letter-spacing:.06em;pointer-events:none}' +
'.w-diag.busy .scan rect{fill:#8A6420}' +
'.w-diag .led{fill:#26332B;stroke:#3A3A3A;stroke-width:2}' +
'.w-diag.busy .led{fill:#5CC86C;animation:wdg-b .5s steps(1) infinite}' +
'.w-diag.run .led{fill:#5CC86C}' +
'.w-diag .flow{fill:none;stroke:#FFA500;stroke-width:2;stroke-dasharray:4 6;opacity:0}' +
'.w-diag.busy .flow,.w-diag.run .flow{opacity:1;animation:wdg-f .6s linear infinite}' +
'.w-diag .hd{fill:#8FA0AE;font-size:12px;font-weight:700;letter-spacing:.08em}' +
'.w-diag .hv{fill:#5CC86C;font-size:13px;font-weight:700}' +
'.w-diag .nm{fill:#fff;font-size:14px}' +
'.w-diag .st{fill:#6B7680;font-size:14px;font-weight:700}' +
'.w-diag .st.ok{fill:#5CC86C}.w-diag .st.bad{fill:#EF5350}.w-diag .st.warn,.w-diag .st.run{fill:#FFA500}' +
'.w-diag .cd{font-family:Menlo,Consolas,"Courier New",monospace;font-size:13px;font-weight:700;fill:#111}' +
'.w-diag .t1{fill:#fff;font-size:15px}.w-diag .t2{fill:#8FA0AE;font-size:13px}' +
'.w-diag .lb{fill:#8FA0AE;font-size:12px}.w-diag .vl{font-size:19px;font-weight:700}' +
'.w-diag .msg{fill:#C9CED4;font-size:15px}.w-diag .ac{fill:#FFA500;font-size:15px;font-weight:700}' +
'.w-diag .pu{fill:none;stroke:#EF5350;stroke-width:2;transform-box:fill-box;transform-origin:center;animation:wdg-p 1.8s ease-out infinite}' +
'@keyframes wdg-b{50%{opacity:.25}}@keyframes wdg-f{to{stroke-dashoffset:-20}}' +
'@keyframes wdg-p{0%{opacity:.9;transform:scale(.7)}80%,100%{opacity:0;transform:scale(1.5)}}' +
'@media (prefers-reduced-motion:reduce){.w-diag .led,.w-diag .flow,.w-diag .pu{animation:none!important}}',
html: '<div class="aox w-diag"><div>' +
'<h2></h2><p class="sub"></p>' +
'<svg viewBox="0 0 400 300" role="group" aria-label="Экран диагностического сканера">' +
'<rect x="2" y="2" width="396" height="296" rx="22" fill="#1A1A1A" stroke="#333" stroke-width="2"/>' +
'<rect x="14" y="14" width="372" height="222" rx="10" fill="#0A0E11" stroke="#2A3036" stroke-width="2"/>' +
'<text class="hd" x="26" y="34"></text><text class="hv" x="374" y="34" text-anchor="end"></text>' +
'<path d="M24 42H376" stroke="#1F262C" stroke-width="1.5"/>' +
'<g class="scr"></g>' +
'<g class="scan" role="button" tabindex="0" aria-label="Сканировать"><rect x="14" y="246" width="200" height="46" rx="10"/><text x="114" y="275" text-anchor="middle">СКАНИРОВАТЬ</text></g>' +
'<circle class="led" cx="230" cy="269" r="7"/><text x="243" y="274" fill="#8FA0AE" font-size="13">связь</text>' +
'<path d="M282 269H306" stroke="#5B6A77" stroke-width="6" stroke-linecap="round"/><path class="flow" d="M282 269H306"/>' +
'<path d="M306 252H380L372 286H314Z" fill="#2B2B2B" stroke="#4A4A4A" stroke-width="2"/>' +
'<path d="M320 260v6M329 260v6M338 260v6M347 260v6M356 260v6M365 260v6M324 274v6M333 274v6M342 274v6M351 274v6M360 274v6" stroke="#9AA3AD" stroke-width="3"/>' +
'</svg>' +
'<div class="tabs" role="group" aria-label="Экраны сканера"></div>' +
'</div>' +
'<div class="card" aria-live="polite"><span class="k"></span><h3></h3><p class="t"></p><ul></ul></div></div>',
init: function(R, U, ds){
var mode = ds.mode === 'truck' ? 'truck' : (ds.mode === 'buy' ? 'buy' : 'car');
function rnd(a){ return (Math.random() - 0.5) * 2 * a; }
var LISTS = {
  car: ['Читаю и расшифровываю ошибки всех блоков', 'Смотрю живые данные датчиков на работающем моторе', 'Проверяю проводку и разъёмы там, куда указывают ошибки'],
  truck: ['Ошибки двигателя, КПП, ABS/EBS и AdBlue', 'Живые данные на работающем моторе', 'Проверка датчиков, разъёмов и проводки по раме'],
  buy: ['Ошибки всех блоков и признаки, что их недавно стирали', 'Пробег в блоках и на приборке', 'Следы ремонта проводки и нештатные подключения']
};
var ALL = {
car: {
  h2: 'Компьютерная диагностика',
  sub: 'Нажмите «Сканировать» — сканер опросит блоки, покажет ошибки и живые данные датчиков.',
  k: 'Компьютерная диагностика', hd: 'СКАНЕР · ЛЕГКОВЫЕ', vOff: 'АКБ 12.5 В', vOn: 'БОРТСЕТЬ 14.2 В',
  wa: 'Здравствуйте, Олег! Хочу сделать компьютерную диагностику машины.',
  views: [['blocks', 'Блоки'], ['codes', 'Ошибки'], ['live', 'Живые данные']],
  blocks: [['Двигатель', '2 ошибки', 'bad'], ['АКПП', 'OK', 'ok'], ['ABS', '1 ошибка', 'bad'], ['Подушки (SRS)', 'OK', 'ok'], ['Кузов (BCM)', 'OK', 'ok']],
  codes: [['P0171', 'bad', 'Смесь бедная (банк 1)', 'Двигатель · подсос воздуха? датчик?'],
          ['P0301', 'bad', 'Пропуски зажигания, 1-й цилиндр', 'Двигатель · свеча, катушка, форсунка?'],
          ['ABS', 'bad', 'Датчик колеса: сигнал пропадает', 'ABS · датчик, разъём, проводка']],
  foot: 'Найдено 3 ошибки в 2 блоках',
  live: [
    {l: 'Обороты, об/мин', c: '#FFA500', mn: 640, mx: 880, f: function(t){ return 780 + 30 * Math.sin(t * 1.7) + rnd(15) - (Math.random() < 0.07 ? 90 : 0); }, fmt: function(v){ return String(Math.round(v / 10) * 10); }},
    {l: 'Напряжение, В', c: '#5CC86C', mn: 13.8, mx: 14.6, f: function(t){ return 14.2 + 0.1 * Math.sin(t * 0.8) + rnd(0.05); }, fmt: function(v){ return v.toFixed(1); }},
    {l: 'Температура ОЖ, °C', c: '#4FC3F7', mn: 72, mx: 96, f: function(t){ return Math.min(90, 82 + t * 0.05) + 0.6 * Math.sin(t * 0.4) + rnd(0.3); }, fmt: function(v){ return String(Math.round(v)); }},
    {l: 'Коррекция топлива, %', c: '#FFFFFF', mn: -10, mx: 30, z: true, f: function(t){ return 17 + 3 * Math.sin(t * 0.6) + rnd(2); }, fmt: function(v){ return (v >= 0 ? '+' : '') + Math.round(v); }}
  ],
  card: {
    intro: ['Сканер опрашивает все блоки, а не только двигатель', 'Подключаюсь к диагностическому разъёму и читаю ошибки двигателя, коробки, ABS, подушек и кузова. Так видна вся картина, а не одна лампа Check Engine.', LISTS.car],
    done: ['Опрошено 5 блоков — ошибки в двух', 'Двигатель и ABS сообщили об ошибках, остальные блоки в порядке. Дальше смотрю, что именно записано и почему.', ['Сохраняю список ошибок до стирания', 'Смотрю, ошибка активная или старая, из памяти', 'Ищу причину, а не просто стираю ошибки']],
    codes: ['Код ошибки — подсказка, где искать', '«Бедная смесь» бывает из-за подсоса воздуха, датчика или топливной системы. Причину находят проверкой, а не заменой деталей наугад.', ['Расшифровка каждой ошибки простыми словами', 'Проверка датчика, разъёма и проводки по ошибке', 'Стираю ошибки после ремонта и проверяю снова']],
    live: ['Живые данные — как мотор работает прямо сейчас', 'Обороты, напряжение, температура, коррекции топлива. Большая плюсовая коррекция значит, что блок добавляет топливо: где-то лишний воздух или не хватает подачи.', ['Сравниваю показания датчиков между собой', 'Смотрю данные на холостых и под нагрузкой', 'Нахожу датчик, который показывает неправду']]
  }
},
truck: {
  h2: 'Диагностика грузовиков',
  sub: 'Нажмите «Сканировать» — сканер опросит блоки грузовика, покажет ошибки и живые данные.',
  k: 'Диагностика грузовых', hd: 'СКАНЕР · ГРУЗОВЫЕ', vOff: 'АКБ 25.4 В', vOn: 'БОРТСЕТЬ 27.9 В',
  wa: 'Здравствуйте, Олег! Нужна компьютерная диагностика грузовика.',
  views: [['blocks', 'Блоки'], ['codes', 'Ошибки'], ['live', 'Живые данные']],
  blocks: [['Двигатель', 'OK', 'ok'], ['КПП', 'OK', 'ok'], ['ABS / EBS', '1 ошибка', 'bad'], ['AdBlue (SCR)', '1 ошибка', 'bad'], ['Кузов, приборы', 'OK', 'ok']],
  codes: [['EBS', 'bad', 'Датчик колеса: обрыв цепи', 'ABS / EBS · датчик или проводка'],
          ['AdBlue', 'bad', 'Ошибка датчика AdBlue', 'Датчик, разъём или питание'],
          ['OK', 'ok', 'Двигатель, КПП, кузов', 'Ошибок нет']],
  foot: 'Найдено 2 ошибки в 2 блоках',
  live: [
    {l: 'Обороты, об/мин', c: '#FFA500', mn: 520, mx: 680, f: function(t){ return 600 + 15 * Math.sin(t * 1.3) + rnd(8); }, fmt: function(v){ return String(Math.round(v / 10) * 10); }},
    {l: 'Напряжение, В', c: '#5CC86C', mn: 27.2, mx: 28.6, f: function(t){ return 27.9 + 0.15 * Math.sin(t * 0.7) + rnd(0.08); }, fmt: function(v){ return v.toFixed(1); }},
    {l: 'Температура ОЖ, °C', c: '#4FC3F7', mn: 70, mx: 94, f: function(t){ return Math.min(86, 80 + t * 0.04) + 0.6 * Math.sin(t * 0.4) + rnd(0.3); }, fmt: function(v){ return String(Math.round(v)); }},
    {l: 'Нагрузка, %', c: '#FFFFFF', mn: 0, mx: 40, f: function(t){ return 15 + 5 * Math.sin(t * 0.9) + rnd(2); }, fmt: function(v){ return String(Math.round(v)); }}
  ],
  card: {
    intro: ['Грузовик: бортсеть 24 В и много блоков', 'Опрашиваю двигатель, КПП, ABS/EBS, систему AdBlue, кузов и приборы. У грузовиков свои разъёмы и протоколы — нужен грузовой сканер.', LISTS.truck],
    done: ['Опрошено 5 блоков — ошибки в двух', 'ABS/EBS и AdBlue сообщили об ошибках датчиков. Двигатель, КПП и кузов — без ошибок.', ['Сохраняю список ошибок до стирания', 'Смотрю, ошибка активная или из памяти', 'Ищу причину: датчик, разъём или проводка']],
    codes: ['Ошибка датчика — ищем причину', 'Датчики колёс и AdBlue страдают от грязи, воды и окисленных разъёмов. Проверяю датчик, разъём и проводку и ремонтирую, чтобы система работала как положено.', ['Проверка датчика AdBlue, его питания и разъёма', 'Поиск обрыва в цепи датчика колеса', 'Стираю ошибки после ремонта и проверяю повторно']],
    live: ['Живые данные грузовика', 'Обороты, напряжение бортсети, температура, нагрузка. Бортсеть 24 В: на заведённом моторе напряжение обычно около 27–29 В.', ['Проверка зарядки на 24 В', 'Сравнение показаний датчиков между собой', 'Данные на холостых и под нагрузкой']]
  }
},
buy: {
  h2: 'Диагностика перед покупкой',
  sub: 'Нажмите «Сканировать» и переключайте экраны: ошибки, пробег в блоках, проводка.',
  k: 'Перед покупкой', hd: 'СКАНЕР · ПЕРЕД ПОКУПКОЙ', vOff: 'АКБ 12.5 В', vOn: 'АКБ 12.5 В',
  wa: 'Здравствуйте, Олег! Хочу проверить машину перед покупкой.',
  views: [['blocks', 'Блоки'], ['codes', 'Ошибки'], ['km', 'Пробег'], ['wire', 'Проводка']],
  blocks: [['Двигатель', 'внимание', 'warn'], ['АКПП', 'OK', 'ok'], ['ABS', 'OK', 'ok'], ['Подушки (SRS)', '1 ошибка', 'bad'], ['Панель приборов', 'пробег?', 'warn']],
  codes: [['ДВС', 'warn', 'Мониторы готовности не завершены', 'Ошибки могли недавно стереть'],
          ['SRS', 'bad', 'Ошибка в блоке подушек', 'Узнать, не было ли ДТП и ремонта'],
          ['КМ', 'warn', 'Пробег в блоках не совпадает', 'Повод насторожиться']],
  foot: 'Есть вопросы к продавцу',
  km: [['Панель приборов', 98000, '#EF5350'], ['Блок двигателя', 187400, '#9AA3AD'], ['Блок АКПП', 186900, '#9AA3AD']],
  card: {
    intro: ['Проверьте машину до того, как отдать деньги', 'Продавец мог стереть ошибки перед показом, а пробег — не совпадать с настоящим. Сканер опрашивает все блоки и помогает это заметить.', LISTS.buy],
    done: ['Опрошено 5 блоков — есть вопросы', 'Ошибок двигателя нет, но похоже, их недавно стирали. В блоке подушек ошибка, а пробег на приборке под вопросом.', ['Разбираю каждую находку', 'Подскажу, о чём спросить продавца', 'Покажу всё на экране сканера']],
    codes: ['Нет ошибок — ещё не значит, что всё хорошо', 'Если мониторы готовности не завершены, ошибки могли стереть незадолго до показа. А ошибка в блоке подушек — повод узнать, не было ли ДТП и ремонта.', ['Проверка мониторов готовности', 'Чтение ошибок блока подушек', 'Ошибки двигателя, АКПП, ABS и кузова']],
    km: ['Пробег не совпадает — повод насторожиться', 'Во многих машинах пробег записан не только в приборке, но и в других блоках. Если цифры сильно расходятся, пробег могли изменить. Бывает и честная причина — блок меняли, поэтому разбираемся до покупки.', ['Сравниваю пробег в блоках, где он записан', 'Учитываю, что блок могли заменить', 'Объясняю, что это значит для покупки']],
    wire: ['Следы ремонта проводки', 'Скрутки, изолента, не родные провода и врезки — не приговор, но надо понять, что чинили и почему. Часто так выглядит ремонт после воды, ДТП или установки сигнализации.', ['Осмотр проводки в доступных местах', 'Проверка нештатных подключений', 'Объясню, чем это может грозить']]
  }
}};
var C = ALL[mode], VIEWS = C.views.map(function(v){ return v[0]; });
var scr = R.querySelector('.scr'), hv = R.querySelector('.hv'), tabs = R.querySelector('.tabs');
var cardEl = R.querySelector('.card'), h3 = cardEl.querySelector('h3'), pt = cardEl.querySelector('.t'), ul = cardEl.querySelector('ul');
R.querySelector('h2').textContent = C.h2;
R.querySelector('.sub').textContent = C.sub;
R.querySelector('.hd').textContent = C.hd;
cardEl.querySelector('.k').textContent = C.k;
cardEl.insertAdjacentHTML('beforeend', U.ctas(C.wa));
tabs.innerHTML = C.views.map(function(v){ return '<button type="button" data-v="' + v[0] + '" aria-pressed="false">' + v[1] + '</button>'; }).join('');

var view = 'blocks', scanned = false, busy = false, lastChange = 0;
var prog = [0, 0, 0, 0, 0], stat = ['', '', '', '', ''];
var COL = {ok: '#5CC86C', bad: '#EF5350', warn: '#FFA500'};

/* ---- живые данные ---- */
var N = 54, X0 = 162, T = 0, data = [], lines = null, vals = null;
if (C.live) {
  for (var a = 0; a < C.live.length; a++) data.push([]);
  for (var j = 0; j < N; j++) { T += 0.15; for (a = 0; a < C.live.length; a++) data[a].push(C.live[a].f(T)); }
}
function yv(P, v, y){ var k = (v - P.mn) / (P.mx - P.mn); k = Math.max(0, Math.min(1, k)); return (y + 40 - k * 32).toFixed(1); }
function drawLive(){
  if (!lines) return;
  for (var i = 0; i < C.live.length; i++) {
    var P = C.live[i], y = 48 + i * 45, pts = [];
    for (var j = 0; j < N; j++) pts.push((X0 + j * 4) + ',' + yv(P, data[i][j], y));
    lines[i].setAttribute('points', pts.join(' '));
    vals[i].textContent = P.fmt(data[i][N - 1]);
  }
}
function tickLive(){
  T += 0.15;
  for (var i = 0; i < C.live.length; i++) { data[i].shift(); data[i].push(C.live[i].f(T)); }
  drawLive();
}

/* ---- экраны ---- */
function esc(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
function waitMsg(){
  return '<text class="msg" x="200" y="124" text-anchor="middle">Данные появятся после сканирования</text>' +
         '<text class="ac" x="200" y="154" text-anchor="middle">Нажмите «СКАНИРОВАТЬ» ↓</text>';
}
function rowHtml(i){
  var b = C.blocks[i], y = 50 + i * 36, s = stat[i];
  var cls = s === 'done' ? b[2] : (s === 'run' ? 'run' : '');
  var txt = s === 'done' ? b[1] : (s === 'run' ? 'опрос…' : '—');
  var col = s === 'done' ? COL[b[2]] : '#FFA500';
  return '<g data-i="' + i + '">' + (i ? '<path d="M24 ' + y + 'H376" stroke="#161C21"/>' : '') +
    '<text class="nm" x="26" y="' + (y + 23) + '">' + esc(b[0]) + '</text>' +
    '<rect x="160" y="' + (y + 12) + '" width="120" height="12" rx="6" fill="#1F262C"/>' +
    '<rect class="pb" x="160" y="' + (y + 12) + '" width="' + (120 * prog[i]).toFixed(1) + '" height="12" rx="6" fill="' + col + '"/>' +
    '<text class="st ' + cls + '" x="374" y="' + (y + 23) + '" text-anchor="end">' + txt + '</text></g>';
}
function paintRow(i){
  if (view !== 'blocks') return;
  var g = scr.querySelector('[data-i="' + i + '"]');
  if (!g) return;
  var b = C.blocks[i], s = stat[i], pb = g.querySelector('.pb'), st = g.querySelector('.st');
  pb.setAttribute('width', (120 * prog[i]).toFixed(1));
  pb.setAttribute('fill', s === 'done' ? COL[b[2]] : '#FFA500');
  st.textContent = s === 'done' ? b[1] : (s === 'run' ? 'опрос…' : '—');
  st.setAttribute('class', 'st ' + (s === 'done' ? b[2] : (s === 'run' ? 'run' : '')));
}
function render(){
  var s = '', i;
  lines = vals = null;
  if (view === 'blocks') {
    for (i = 0; i < C.blocks.length; i++) s += rowHtml(i);
  } else if (view === 'codes') {
    if (!scanned) s = waitMsg();
    else {
      for (i = 0; i < C.codes.length; i++) {
        var c = C.codes[i], y = 52 + i * 54;
        s += '<rect x="26" y="' + y + '" width="64" height="24" rx="6" fill="' + COL[c[1]] + '"/>' +
          '<text class="cd" x="58" y="' + (y + 17) + '" text-anchor="middle">' + esc(c[0]) + '</text>' +
          '<text class="t1" x="100" y="' + (y + 17) + '">' + esc(c[2]) + '</text>' +
          '<text class="t2" x="100" y="' + (y + 37) + '">' + esc(c[3]) + '</text>';
      }
      s += '<path d="M24 210H376" stroke="#161C21"/><text class="lb" x="26" y="227">' + esc(C.foot) + '</text>';
    }
  } else if (view === 'live') {
    for (i = 0; i < C.live.length; i++) {
      var P = C.live[i], y2 = 48 + i * 45;
      s += (i ? '<path d="M24 ' + (y2 - 2) + 'H376" stroke="#161C21"/>' : '') +
        '<text class="lb" x="26" y="' + (y2 + 15) + '">' + esc(P.l) + '</text>' +
        '<text class="vl" x="26" y="' + (y2 + 38) + '" fill="' + P.c + '"></text>' +
        (P.z ? '<path d="M' + X0 + ' ' + yv(P, 0, y2) + 'H374" stroke="#3A444D" stroke-dasharray="3 4"/>' : '') +
        '<polyline fill="none" stroke="' + P.c + '" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>';
    }
  } else if (view === 'km') {
    if (!scanned) s = waitMsg();
    else {
      for (i = 0; i < C.km.length; i++) {
        var k = C.km[i], y3 = 52 + i * 50;
        s += '<text class="nm" x="26" y="' + (y3 + 14) + '">' + esc(k[0]) + '</text>' +
          '<text class="st" x="374" y="' + (y3 + 14) + '" text-anchor="end" style="fill:' + (i ? '#fff' : '#EF5350') + '">' + String(k[1]).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' км</text>' +
          '<rect x="26" y="' + (y3 + 22) + '" width="348" height="14" rx="7" fill="#1F262C"/>' +
          '<rect x="26" y="' + (y3 + 22) + '" width="' + (348 * k[1] / 200000).toFixed(1) + '" height="14" rx="7" fill="' + k[2] + '"/>';
      }
      s += '<text class="ac" x="26" y="218">Не совпадает — повод насторожиться</text>';
    }
  } else if (view === 'wire') {
    s = '<path d="M26 86H374" stroke="#5B6A77" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M26 106H132M168 106H374" stroke="#6F7E8B" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M132 106l4-5 4 10 4-10 4 10 4-10 4 10 4-10 4 10 4-5" fill="none" stroke="#6F7E8B" stroke-width="4"/>' +
      '<rect x="138" y="96" width="24" height="20" rx="6" fill="#050505" stroke="#3A3A3A" stroke-width="1.5"/>' +
      '<path d="M142 97l6 18M150 97l6 18" stroke="#2A2A2A" stroke-width="2"/>' +
      '<path d="M26 126H374" stroke="#4A5762" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M26 146H374" stroke="#5B6A77" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M272 118V74Q272 60 288 60H374" fill="none" stroke="#C9CED4" stroke-width="3"/>' +
      '<rect x="262" y="116" width="20" height="20" rx="3" fill="#C9CED4" stroke="#111" stroke-width="2"/>' +
      '<circle cx="150" cy="106" r="24" fill="none" stroke="#EF5350" stroke-width="2" stroke-dasharray="5 4"/><circle cx="272" cy="126" r="22" fill="none" stroke="#EF5350" stroke-width="2" stroke-dasharray="5 4"/>' +
      '<circle class="pu" cx="150" cy="106" r="24"/><circle class="pu" cx="272" cy="126" r="22"/>' +
      '<text class="t1" x="150" y="68" text-anchor="middle">скрутка + изолента</text>' +
      '<text class="t1" x="272" y="178" text-anchor="middle">нештатная врезка</text>' +
      '<text class="ac" x="26" y="218">Не приговор — но надо понять, что чинили</text>';
  }
  scr.innerHTML = s;
  if (view === 'live') { lines = scr.querySelectorAll('polyline'); vals = scr.querySelectorAll('.vl'); drawLive(); }
}
function card(){
  var key = view === 'blocks' ? (scanned ? 'done' : 'intro') : view, c = C.card[key];
  h3.textContent = c[0]; pt.textContent = c[1];
  ul.innerHTML = c[2].map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('');
}
function setView(v){
  view = v; lastChange = Date.now();
  hv.textContent = v === 'live' ? C.vOn : C.vOff;
  R.classList.toggle('run', v === 'live');
  tabs.querySelectorAll('button').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-v') === v ? 'true' : 'false'); });
  render(); card();
}

/* ---- сканирование ---- */
var raf = window.requestAnimationFrame || function(f){ return setTimeout(function(){ f(Date.now()); }, 16); };
function scan(){
  if (busy) return;
  busy = true; scanned = false;
  for (var i = 0; i < 5; i++) { prog[i] = 0; stat[i] = ''; }
  R.classList.add('busy');
  setView('blocks');
  var n = 0, dur = U.reduce ? 140 : 520;
  function one(){
    if (n >= C.blocks.length) {
      busy = false; scanned = true; R.classList.remove('busy');
      if (view === 'blocks') card();
      setTimeout(function(){ if (view === 'blocks' && scanned && !busy) setView('codes'); }, U.reduce ? 400 : 1000);
      return;
    }
    stat[n] = 'run'; paintRow(n);
    var t0 = null;
    function fr(ts){
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      prog[n] = p;
      if (p >= 1) { stat[n] = 'done'; paintRow(n); n++; one(); }
      else { paintRow(n); raf(fr); }
    }
    raf(fr);
  }
  one();
}
var btn = R.querySelector('.scan');
btn.addEventListener('click', function(){ U.buzz(15); scan(); });
btn.addEventListener('keydown', function(e){ if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); scan(); } });
tabs.addEventListener('click', function(e){
  var b = e.target.closest('button[data-v]');
  if (!b) return;
  U.buzz(10); setView(b.getAttribute('data-v'));
});

/* ---- автопоказ: пока посетитель не трогал блок ---- */
var used = false, vis = false, started = false;
function stopAuto(){ used = true; }
R.addEventListener('pointerdown', stopAuto);
R.addEventListener('keydown', stopAuto);
function auto(){
  if (used || !vis || document.hidden || busy || Date.now() - lastChange < 2500) return;
  if (!scanned) { scan(); return; }
  var i = VIEWS.indexOf(view);
  if (i >= VIEWS.length - 1) scan(); else setView(VIEWS[i + 1]);
}
U.seen(R, function(v){
  vis = v;
  if (v && !started && !U.reduce) { started = true; setTimeout(auto, 1200); }
});
if (!U.reduce) {
  setInterval(auto, 3600);
  if (C.live) setInterval(function(){ if (view === 'live' && vis && !document.hidden) tickLive(); }, 150);
}
setView('blocks');
lastChange = 0;
}});
