/* «Автономные отопители и печки» — страницы ремонта автономок (data-mode="auto") и печки салона (data-mode="pech"), avtoelektrik-pro.kz
   Без data-mode показываются оба варианта с переключателем. */
(function(){
var P = '.w-heater';
var css = [
P+' [hidden]{display:none!important}',
P+' .chip{min-height:38px}'+P+' .spd .chip{min-width:44px}',
P+' .row{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:12px}',
P+' .row .btn{min-height:44px;padding:10px 18px}',
P+' .top{margin:0 0 12px}',
P+' .cap{align-self:center;font-size:13px;color:#C9CED4;margin-right:2px}',
P+' svg text{font-family:inherit}',
P+' .lbl{font-size:14px;fill:#9AA3AD}',
P+' .hl{display:flex;justify-content:space-between;flex-wrap:wrap;gap:2px 12px;margin-top:10px}',
P+' .hl .bd{color:#B3261E}',
P+' .stg{list-style:none;margin:10px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:6px}',
P+' .stg li{font-size:12.5px;font-weight:700;color:#9AA3AD;background:#1D1D1D;border:1px solid #2E2E2E;border-radius:20px;padding:6px 10px;transition:background .25s,color .25s}',
P+' .stg li.ok{color:#5CC86C;border-color:#2F5F37}',
P+' .stg li.now{color:#111;background:#FFA500;border-color:#FFA500}',
P+' .stg li.bad{color:#fff;background:#EF5350;border-color:#EF5350}',
/* автономка */
P+' .cas{fill:#2B2B2B;stroke:#5B6A77;stroke-width:2;transition:stroke .3s}',
P+'.hot .cas{stroke:#EF5350}',
P+' .chm{fill:#161616;stroke:#4A4A4A;stroke-width:2;transition:stroke .3s}'+P+'.err .chm{stroke:#EF5350}',
P+' .flm{opacity:0;transform-box:fill-box;transform-origin:50% 100%;transition:opacity .3s}',
P+'.flame .flm{opacity:1;animation:whF .35s ease-in-out infinite alternate}',
P+'.try .flm{opacity:.35;animation:whK .5s steps(2) infinite}',
'@keyframes whF{from{transform:scaleY(.86)}to{transform:scaleY(1.06)}}',
'@keyframes whK{50%{opacity:0}}',
P+' .gp{fill:#555;transition:fill .3s}',
P+'.plug .gp{fill:#FF7A00;animation:whG .8s ease-in-out infinite alternate}',
'@keyframes whG{to{fill:#FFD54F}}',
P+' .fan,'+P+' .fan2{transform-box:fill-box;transform-origin:center;animation:whR .5s linear infinite;animation-play-state:paused}',
P+'.fan .fan{animation-play-state:running}',
'@keyframes whR{to{transform:rotate(360deg)}}',
P+' .pump{transform-box:fill-box;transform-origin:center}',
P+'.fuel .pump{animation:whP 1s steps(1) infinite}',
'@keyframes whP{0%{transform:scale(1.1)}15%{transform:scale(1)}}',
P+' .tik{font-size:14px;font-weight:700;fill:#FFA500;opacity:0}',
P+'.fuel .tik{animation:whTk 1s steps(1) infinite}',
'@keyframes whTk{0%{opacity:1}35%{opacity:0}}',
P+' .drp{fill:none;stroke:#E0B050;stroke-width:6;stroke-linecap:round;stroke-dasharray:.1 20;opacity:0}',
P+'.fuel .drp{opacity:1;animation:whD 1s cubic-bezier(.2,.8,.3,1) infinite}',
'@keyframes whD{to{stroke-dashoffset:-20.1}}',
P+' .wv{fill:none;stroke:#FFA500;stroke-width:3;stroke-linecap:round;stroke-dasharray:10 8;opacity:0;transition:opacity .4s}',
P+'.heat .wv{opacity:.9;animation:whW 1s linear infinite}',
P+'.hot .wv{stroke:#EF5350}',
'@keyframes whW{to{stroke-dashoffset:-18}}',
P+' .ovx{opacity:0;transition:opacity .3s}'+P+'.hot .ovx{opacity:1}',
P+' .exh circle{fill:#9AA3AD;opacity:0}',
P+'.flame .exh circle{animation:whE 1.6s ease-out infinite}',
P+' .exh circle:nth-child(2){animation-delay:.5s}'+P+' .exh circle:nth-child(3){animation-delay:1s}',
'@keyframes whE{0%{opacity:.7;transform:translate(0,0)}100%{opacity:0;transform:translate(22px,-6px)}}',
/* печка */
P+' .wr{fill:none;stroke:#5B6A77;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}',
P+' .zz{fill:none;stroke:#C9CED4;stroke-width:2.5;stroke-linejoin:round}',
P+' .rbx{fill:#1D1D1D;stroke:#5B6A77;stroke-width:2;transition:stroke .3s}',
P+'.rb .rbx{stroke:#EF5350}',
P+' .brk,'+P+' .fzx{opacity:0}'+P+'.rb .brk,'+P+'.fz .fzx{opacity:1}',
P+' .fzb{fill:#3A4651;stroke:#5B6A77;stroke-width:2}'+P+'.fz .fzb{stroke:#EF5350;fill:#5A2A2A}',
P+' .ct{fill:#7D8790}',
P+' .wp{transition:transform .35s ease}',
P+' .cur{fill:none;stroke:#FFA500;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:6 8;animation:whC .8s linear infinite}',
'@keyframes whC{to{stroke-dashoffset:-14}}',
P+' .fh{fill:#1A1A1A;stroke:#4A4A4A;stroke-width:2}',
P+'.run .fan2{animation-play-state:running}',
P+'.sp1 .fan2{animation-duration:1.4s}'+P+'.sp2 .fan2{animation-duration:.8s}'+P+'.sp3 .fan2{animation-duration:.45s}'+P+'.sp4 .fan2{animation-duration:.25s}',
P+' .dc{fill:#161B20;stroke:#3A4651;stroke-width:2}',
P+' .core{fill:#3A1F1F;stroke:#EF5350;stroke-width:2}',
P+' .flp{stroke:#C9CED4;stroke-width:5;stroke-linecap:round;transform-box:fill-box;transform-origin:0 50%;transform:rotate(-90deg);transition:transform .6s ease,stroke .3s}',
P+'.cold .flp{transform:rotate(90deg);stroke:#EF5350}',
P+' .ac,'+P+' .ah1,'+P+' .ah2{fill:none;stroke-width:3;stroke-linecap:round;stroke-dasharray:8 10;opacity:0;transition:opacity .4s;animation:whA 1s linear infinite}',
P+' .ac{stroke:#4FC3F7}'+P+' .ah1{stroke:#9AA3AD}'+P+' .ah2{stroke:#FFA500}',
P+'.run:not(.cold) .ah1,'+P+'.run:not(.cold) .ah2,'+P+'.run.cold .ac{opacity:1}',
P+'.sp1 .ac,'+P+'.sp1 .ah1,'+P+'.sp1 .ah2{animation-duration:2s}',
P+'.sp2 .ac,'+P+'.sp2 .ah1,'+P+'.sp2 .ah2{animation-duration:1.3s}',
P+'.sp3 .ac,'+P+'.sp3 .ah1,'+P+'.sp3 .ah2{animation-duration:.85s}',
P+'.sp4 .ac,'+P+'.sp4 .ah1,'+P+'.sp4 .ah2{animation-duration:.5s}',
'@keyframes whA{to{stroke-dashoffset:-18}}',
P+'.ps *{animation-play-state:paused!important}',
'@media (prefers-reduced-motion:reduce){'+P+' *{animation:none!important;transition-duration:.01s!important}}'
].join('\n');

function blades(cx, cy, r){
  var s = '';
  for (var a = 0; a < 360; a += 60) s += '<ellipse cx="'+cx+'" cy="'+(cy - r * .5)+'" rx="'+(r * .18).toFixed(1)+'" ry="'+(r * .42).toFixed(1)+'" fill="#7D8790" transform="rotate('+a+' '+cx+' '+cy+')"/>';
  return s;
}
function wave(y){ return '<path class="wv" d="M146 '+y+' q-8 -6 -16 0 t-16 0 t-16 0 t-16 0 t-16 0 t-16 0"/>'; }

var svgA = '<svg class="sa" viewBox="0 0 400 250" role="img" aria-label="Автономный отопитель: бак, насос-дозатор, свеча накала, камера сгорания с пламенем, вентилятор">' +
 '<text class="lbl" x="10" y="72">тёплый воздух</text>' + wave(94) + wave(115) + wave(136) +
 '<path d="M236 160 V214 H262" fill="none" stroke="#5B6A77" stroke-width="8" stroke-linejoin="round"/>' +
 '<g class="exh"><circle cx="270" cy="213" r="5"/><circle cx="270" cy="213" r="6"/><circle cx="270" cy="213" r="4"/></g>' +
 '<text class="lbl" x="272" y="240">выхлоп</text>' +
 '<rect class="cas" x="150" y="70" width="210" height="90" rx="22"/>' +
 '<rect class="chm" x="166" y="86" width="116" height="58" rx="12"/>' +
 '<g class="flm"><path d="M206 142 C200 128 208 116 216 104 C218 116 224 120 224 128 C228 118 234 108 240 98 C244 112 252 122 250 132 C256 126 260 118 262 112 C270 124 272 134 266 142 Z" fill="#FFA500"/>' +
  '<path d="M218 142 C214 132 220 124 226 118 C228 126 234 130 236 136 C240 130 244 126 246 122 C252 130 254 136 250 142 Z" fill="#FFE082"/></g>' +
 '<rect x="194" y="56" width="12" height="44" rx="3" fill="#7D8790"/><rect class="gp" x="195" y="92" width="10" height="14" rx="3"/>' +
 '<text class="lbl" x="212" y="54">свеча накала</text>' +
 '<circle cx="320" cy="115" r="30" fill="#1A1A1A" stroke="#4A4A4A" stroke-width="2"/><g class="fan">' + blades(320, 115, 26) + '</g><circle cx="320" cy="115" r="5" fill="#C9CED4"/>' +
 '<text class="lbl" x="320" y="182" text-anchor="middle">вентилятор</text>' +
 '<rect class="ovx" x="141" y="82" width="7" height="66" rx="2" fill="#EF5350"/>' +
 '<rect x="10" y="176" width="56" height="60" rx="6" fill="#2B2B2B" stroke="#4A4A4A" stroke-width="2"/><text class="lbl" x="38" y="212" text-anchor="middle">бак</text>' +
 '<path d="M66 196 H80 M136 196 H170 V160" fill="none" stroke="#5B6A77" stroke-width="5"/>' +
 '<path class="drp" d="M136 196 H170 V160"/>' +
 '<rect class="pump" x="80" y="184" width="56" height="24" rx="12" fill="#3A4651" stroke="#5B6A77" stroke-width="2"/>' +
 '<text class="tik" x="108" y="176" text-anchor="middle">тик</text>' +
 '<text class="lbl" x="116" y="230" text-anchor="middle">насос-дозатор</text>' +
'</svg>';

var XS = [190, 230, 270, 310], zz = '', ct = '';
for (var i = 0; i < 4; i++) {
  ct += '<rect class="ct" x="'+(XS[i] - 6)+'" y="30" width="12" height="6" rx="2"/><path class="wr" d="M'+XS[i]+' 36 V64"/><text class="lbl" x="'+(XS[i] + 6)+'" y="49">'+(i + 1)+'</text>';
  if (i < 3) zz += 'M'+XS[i]+' 64 h8 l2 -5 l4 10 l4 -10 l4 10 l4 -10 l4 10 l2 -5 h8 ';
}
var svgP = '<svg class="sp" viewBox="0 0 400 252" role="img" aria-label="Печка салона: предохранитель, переключатель скоростей, резистор, мотор вентилятора, заслонка и радиатор печки" hidden>' +
 '<path class="wr" d="M4 14 H24 M60 14 H316"/>' +
 '<rect class="fzb" x="24" y="6" width="36" height="16" rx="4"/><path class="fzx" d="M34 6 l16 16 m0 -16 l-16 16" stroke="#EF5350" stroke-width="3"/>' +
 '<text class="lbl" x="4" y="40">предохранитель</text>' +
 '<text class="lbl" x="56" y="66">переключатель</text>' +
 ct +
 '<rect class="rbx" x="178" y="54" width="144" height="22" rx="6"/>' +
 '<path class="zz" d="' + zz + '"/>' +
 '<circle cx="190" cy="64" r="3" fill="#C9CED4"/><circle cx="230" cy="64" r="3" fill="#C9CED4"/><circle cx="270" cy="64" r="3" fill="#C9CED4"/><circle cx="310" cy="64" r="3" fill="#C9CED4"/>' +
 '<path class="brk" d="M283 55 l14 18 m0 -18 l-14 18" stroke="#EF5350" stroke-width="3.5"/>' +
 '<text class="lbl" x="250" y="96" text-anchor="middle">резистор</text>' +
 '<path class="wr" d="M310 64 H334"/>' +
 '<path class="cur" d=""/>' +
 '<g class="wp" style="transform:translateX(190px)"><line x1="0" y1="14" x2="0" y2="30" stroke="#FFA500" stroke-width="5" stroke-linecap="round"/><circle cx="0" cy="14" r="5" fill="#FFA500"/></g>' +
 '<rect class="dc" x="8" y="150" width="384" height="94" rx="12"/>' +
 '<path d="M346 150 V98 M378 150 V98" stroke="#3A4651" stroke-width="2"/><rect x="347" y="96" width="30" height="58" fill="#161B20"/>' +
 '<circle class="fh" cx="362" cy="68" r="30"/><g class="fan2">' + blades(362, 68, 26) + '</g><circle cx="362" cy="68" r="5" fill="#C9CED4"/>' +
 '<text class="lbl" x="338" y="128" text-anchor="end">мотор печки</text>' +
 '<rect class="core" x="150" y="194" width="40" height="44" rx="3"/><path d="M158 196 V236 M166 196 V236 M174 196 V236 M182 196 V236" stroke="#EF5350" stroke-width="1.5" opacity=".7"/>' +
 '<text class="lbl" x="40" y="200">радиатор печки</text>' +
 '<path class="ac" d="M362 156 V172 H20"/>' +
 '<path class="ah1" d="M362 156 V172 H246 C230 172 224 217 208 217 H192"/>' +
 '<path class="ah2" d="M148 217 H20"/>' +
 '<line class="flp" x1="200" y1="195" x2="242" y2="195"/><circle cx="200" cy="195" r="4" fill="#C9CED4"/>' +
 '<text class="lbl" x="212" y="236">заслонка</text>' +
 '<text class="lbl" x="20" y="238">в салон</text>' +
'</svg>';

var html = '<div class="aox w-heater"><div>' +
 '<div class="tabs top" role="group" aria-label="Что показать" hidden><button type="button" class="chip" data-v="auto" aria-pressed="true">Автономный отопитель</button><button type="button" class="chip" data-v="pech" aria-pressed="false">Печка салона</button></div>' +
 '<h2></h2><p class="sub"></p>' + svgA + svgP +
 '<div class="lcd hl" aria-hidden="true"><span class="lt"></span><span class="lv"></span></div>' +
 '<ol class="stg" aria-hidden="true"><li>1 Продувка</li><li>2 Свеча</li><li>3 Топливо</li><li>4 Пламя</li><li>5 Нагрев</li></ol>' +
 '<div class="tabs spd" role="group" aria-label="Скорость вентилятора" hidden></div>' +
 '<div class="tabs prb" role="group" aria-label="Ситуация"></div>' +
 '<div class="row ra"><button type="button" class="btn o go">Запустить</button></div>' +
'</div>' +
'<div class="card"><span class="k"></span><h3></h3><p class="t"></p><ul></ul></div></div>';

AO_SITE.reg('heater', {css: css, html: html, init: function(R, U, ds){
var A = {
 norm: {n:'Нормальный запуск', k:'Автономный отопитель · запуск', h:'Так проходит нормальный запуск',
  p:'Сначала продувка, потом разогревается свеча накала, насос-дозатор начинает тикать — подаёт топливо порциями. Загорается пламя, свеча отключается, вентилятор гонит тёплый воздух.',
  c:['Чтение ошибок отопителя (пульт или диагностика)','Проверка свечи накала, насоса-дозатора и топливной линии','Проверка питания, массы и проводки'],
  q:[['fan',0,'Продувка камеры'],['fan plug',1,'Разогрев свечи накала'],['fan plug fuel',2,'Подача топлива: тик-тик'],['fan plug fuel flame',3,'Розжиг — есть пламя'],['fan fuel flame heat',4,'Работа: греет']]},
 noflame: {n:'Нет пламени', k:'Автономный отопитель · ошибка', h:'Ошибка: нет пламени, не запускается',
  p:'Насос тикает, свеча греет, а пламени нет. Обычно не доходит топливо (насос, магистраль, фильтр, загустевшая в мороз солярка), неисправна свеча или в камере нагар. После нескольких неудачных попыток отопитель уходит в ошибку.',
  c:['Проверка подачи топлива и насоса-дозатора','Проверка свечи накала','Чистка камеры сгорания от нагара'],
  q:[['fan',0,'Продувка камеры'],['fan plug',1,'Разогрев свечи накала'],['fan plug fuel',2,'Подача топлива: тик-тик'],['fan plug fuel try',3,'Розжиг… пламени нет'],['fan plug fuel try',3,'Повторная попытка…'],['fan err',3,'ОШИБКА: нет пламени']]},
 ovh: {n:'Перегрев', k:'Автономный отопитель · ошибка', h:'Ошибка: перегрев',
  p:'Отопитель запустился, но тепло не уходит: закрыт вход или выход воздуха, неисправен датчик перегрева; у жидкостных — мало антифриза, воздушная пробка или не крутит помпа. Отопитель гасит пламя и продувается, чтобы остыть.',
  c:['Проверка воздуховодов и решёток','Проверка датчиков температуры и перегрева','У жидкостных: помпа, уровень антифриза, воздух в системе'],
  q:[['fan',0,'Продувка камеры'],['fan plug',1,'Разогрев свечи накала'],['fan plug fuel',2,'Подача топлива: тик-тик'],['fan plug fuel flame',3,'Розжиг — есть пламя'],['fan fuel flame heat',4,'Работа: греет'],['fan fuel flame heat hot',4,'Температура растёт!'],['fan err hot',4,'ОШИБКА: перегрев, охлаждение']]},
 lowv: {n:'Низкое напряжение', k:'Автономный отопитель · ошибка', h:'Ошибка: низкое напряжение',
  p:'Свеча накала берёт большой ток, и при слабом аккумуляторе напряжение проседает — отопитель отключается, чтобы не посадить АКБ совсем. Причины: аккумулятор, окисленные клеммы, тонкие или подгоревшие провода питания.',
  c:['Проверка АКБ под нагрузкой','Замер напряжения на разъёме отопителя при запуске','Восстановление питания, массы и предохранителя'],
  q:[['fan',0,'Продувка камеры'],['fan plug lowv',1,'Свеча греет — напряжение просело'],['err lowv',1,'ОШИБКА: низкое напряжение']]}
};
var B = {
 norm: {n:'Норма', k:'Печка салона · норма',
  h:function(s){ return s < 4 ? 'Скорость ' + s + ' — ток идёт через резистор' : 'Скорость 4 — напрямую, на полную'; },
  p:'На 1–3-й скорости ток идёт через резистор (блок сопротивлений): чем больше сопротивление, тем медленнее крутится мотор. На 4-й — мимо резистора, напрямую. В некоторых машинах вместо резистора стоит электронный блок управления вентилятором.',
  c:['Проверка предохранителя, реле и разъёмов','Замер напряжения на моторе на каждой скорости','Проверка резистора или блока управления вентилятором']},
 r4: {n:'Дует только на 4-й', k:'Печка · дует только на 4-й',
  h:function(s){ return s < 4 ? 'Скорость ' + s + ' — не дует: обрыв в резисторе' : 'На 4-й дует — ток идёт мимо резистора'; },
  p:'Классика: сгорел резистор или его термопредохранитель. 1–3-я скорости идут через резистор и не работают, а 4-я — напрямую, поэтому дует только она. Часто подгорает и разъём резистора.',
  c:['Проверка резистора и его разъёма','Замер тока мотора — тугой мотор перегревает резистор','Замена резистора, восстановление разъёма']},
 none: {n:'Не дует совсем', k:'Печка · не дует совсем',
  h:function(){ return 'Не дует ни на одной скорости'; },
  p:'Сначала — предохранитель и реле вентилятора. Если питание на мотор приходит, а он стоит — износились щётки, заклинил подшипник или подгорел разъём мотора.',
  c:['Проверка предохранителя и реле','Замер питания и массы на моторе','Ремонт или замена мотора печки']},
 cold: {n:'Дует холодным', k:'Печка · дует холодным',
  h:function(){ return 'Вентилятор дует, но холодным'; },
  p:'Электрика вентилятора в порядке, но заслонка не пускает воздух через радиатор печки: не работает моторчик заслонки или слетела тяга. Ещё причины — мало антифриза, воздушная пробка, термостат.',
  c:['Проверка моторчиков заслонок и их ошибок сканером','Проверка уровня антифриза и прогрева мотора','Ремонт привода и калибровка заслонок']}
};
var V = {
 auto: {h:'Автономка не запускается? Разберёмся', s:'Выберите ситуацию и нажмите «Запустить» — посмотрите этапы запуска и где он обрывается.', wa:'Здравствуйте, Олег! Нужна диагностика автономного отопителя.'},
 pech: {h:'Печка дует не так? Найдём причину', s:'Переключайте скорость и выберите неисправность — увидите, куда идёт ток и куда дует воздух.', wa:'Здравствуйте, Олег! Не работает печка в машине — нужна проверка.'}
};
var AK = ['norm','noflame','ovh','lowv'], BK = ['norm','r4','none','cold'];
var BSTEPS = [['norm',1],['norm',2],['norm',3],['norm',4],['r4',2],['r4',4],['none',3],['cold',3]];
var only = (ds.mode === 'auto' || ds.mode === 'pech') ? ds.mode : '';
var view = only || 'auto', aMode = 'norm', bMode = 'norm', speed = 2, bStep = 1;
var used = false, vis = true, tmr = null, running = false, startAt = 0, doneAt = 0;
var STATE = ['fan','plug','fuel','flame','try','heat','hot','err','lowv','run','sp1','sp2','sp3','sp4','cold','fz','rb'];
function $(q){ return R.querySelector(q); }
function $$(q){ return R.querySelectorAll(q); }
function hide(q, h){ var e = $(q); if (h) e.setAttribute('hidden', ''); else e.removeAttribute('hidden'); }
var card = $('.card');
card.insertAdjacentHTML('beforeend', U.ctas(V[view].wa));
if (!only) hide('.top', false);

function setState(list){
  STATE.forEach(function(c){ R.classList.remove(c); });
  list.forEach(function(c){ if (c) R.classList.add(c); });
}
function fillCard(k, h, p, c){
  $('.card .k').textContent = k; $('.card h3').textContent = h; $('.card .t').textContent = p;
  $('.card ul').innerHTML = c.map(function(x){ return '<li>' + x + '</li>'; }).join('');
}
function press(sel, attr, val){ [].forEach.call($$(sel), function(b){ b.setAttribute('aria-pressed', b.getAttribute(attr) === String(val) ? 'true' : 'false'); }); }
function lcd(a, b, bad){
  $('.lt').textContent = a; var lv = $('.lv'); lv.textContent = b; lv.className = 'lv' + (bad ? ' bd' : '');
  $('.lt').className = 'lt' + (/ОШИБКА/.test(a) ? ' bd' : '');
}

/* автономка */
function applyA(st, last){
  var cls = st[0].split(' '), err = cls.indexOf('err') >= 0;
  setState(cls);
  lcd(st[2], cls.indexOf('lowv') >= 0 ? 'АКБ: просело' : 'АКБ: норма', cls.indexOf('lowv') >= 0);
  [].forEach.call($$('.stg li'), function(li, i){
    li.className = i < st[1] ? 'ok' : i === st[1] ? (err ? 'bad' : (last ? 'ok' : 'now')) : '';
  });
}
function runA(m){
  clearTimeout(tmr); aMode = m; var q = A[m].q, i = 0;
  press('.prb .chip', 'data-k', m);
  fillCard(A[m].k, A[m].h, A[m].p, A[m].c);
  running = true; startAt = Date.now();
  if (U.reduce) { applyA(q[q.length - 1], true); running = false; doneAt = Date.now(); return; }
  (function step(){
    var last = i === q.length - 1;
    applyA(q[i], last);
    if (last) { running = false; doneAt = Date.now(); return; }
    i++; tmr = setTimeout(step, 650);
  })();
}
/* печка */
function showB(m, s){
  bMode = m; speed = s;
  var d = B[m], broken = m === 'none' || (m === 'r4' && s < 4), spin = !broken;
  setState([spin ? 'run' : '', spin ? 'sp' + s : '', m === 'cold' ? 'cold' : '', m === 'none' ? 'fz' : '', m === 'r4' ? 'rb' : '']);
  $('.wp').style.transform = 'translateX(' + XS[s - 1] + 'px)';
  $('.cur').setAttribute('d', spin ? 'M4 14 H' + XS[s - 1] + ' V64 H334' : '');
  press('.prb .chip', 'data-k', m); press('.spd .chip', 'data-s', s);
  lcd('Скорость ' + s + ': ' + (spin ? 'дует' : 'не дует'), spin ? (m === 'cold' ? 'воздух холодный' : 'воздух тёплый') : 'мотор стоит', !spin || m === 'cold');
  fillCard(d.k, d.h(s), d.p, d.c);
}

function setView(v){
  clearTimeout(tmr); running = false; view = v;
  press('.top .chip', 'data-v', v);
  $('h2').textContent = V[v].h; $('.sub').textContent = V[v].s;
  hide('.sa', v !== 'auto'); hide('.sp', v !== 'pech');
  hide('.stg', v !== 'auto'); hide('.ra', v !== 'auto'); hide('.spd', v !== 'pech');
  card.querySelector('.btn.w').href = U.wa(V[v].wa);
  var keys = v === 'auto' ? AK : BK, D = v === 'auto' ? A : B;
  $('.prb').innerHTML = keys.map(function(k){ return '<button type="button" class="chip" data-k="' + k + '" aria-pressed="false">' + D[k].n + '</button>'; }).join('');
  if (v === 'pech') {
    $('.spd').innerHTML = '<span class="cap">Скорость:</span>' + [1, 2, 3, 4].map(function(s){ return '<button type="button" class="chip" data-s="' + s + '" aria-pressed="false">' + s + '</button>'; }).join('');
    showB(bMode, speed);
  } else runA(aMode);
}

function touch(){ if (used) return; used = true; card.setAttribute('aria-live', 'polite'); }
R.addEventListener('pointerdown', touch);
R.addEventListener('keydown', touch);
R.addEventListener('click', function(e){
  var t = e.target.closest('button'); if (!t || !R.contains(t)) return;
  touch();
  if (t.hasAttribute('data-v')) { if (t.getAttribute('data-v') !== view) setView(t.getAttribute('data-v')); }
  else if (t.classList.contains('go')) runA(aMode);
  else if (t.hasAttribute('data-s')) showB(bMode, +t.getAttribute('data-s'));
  else if (t.hasAttribute('data-k')) { if (view === 'auto') runA(t.getAttribute('data-k')); else showB(t.getAttribute('data-k'), speed); }
  else return;
  U.buzz(12);
});
setView(view);
U.seen(R, function(v){ vis = v; R.classList.toggle('ps', !v); });
if (!U.reduce) {
  setInterval(function(){
    if (used || !vis || document.hidden || view !== 'auto' || running) return;
    var now = Date.now(); if (now - startAt < 3800 || now - doneAt < 1800) return;
    runA(AK[(AK.indexOf(aMode) + 1) % AK.length]);
  }, 400);
  setInterval(function(){
    if (used || !vis || document.hidden || view !== 'pech') return;
    bStep = (bStep + 1) % BSTEPS.length; showB(BSTEPS[bStep][0], BSTEPS[bStep][1]);
  }, 3500);
}
}});
})();
