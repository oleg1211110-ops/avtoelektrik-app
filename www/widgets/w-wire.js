/* «Ремонт проводки» — поиск обрыва, окисла и замыкания по точкам;
   дневные ходовые огни (data-mode="dho"). avtoelektrik-pro.kz */
(function(){
var P = '.w-wire';
var CSS = [
P+' .tabs .chip{min-height:40px;padding:9px 12px}',
P+' .btn.go{margin-top:12px;border-color:#FFA500;color:#FFA500;background:rgba(255,165,0,.08);min-height:46px}',
P+' .btn.go:hover{background:rgba(255,165,0,.18)}',
P+' .log{margin:10px 0 0;min-height:23px;color:#C9CED4;font-size:15px;line-height:1.45}',
P+' .log b{color:#fff}',
P+' .lbl{fill:#C9CED4;font-size:13px}',
P+' .wire{fill:none;stroke:#5B6A77;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}',
P+' .vv,'+P+' .sg{fill:none;stroke:#FFA500;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;display:none}',
P+' .sg{stroke-dasharray:7 11;animation:wwr-f .9s linear infinite}',
'@keyframes wwr-f{to{stroke-dashoffset:-36}}',
'@keyframes wwr-o{0%,75%{opacity:1}80%,100%{opacity:0}}',
'@keyframes wwr-i{0%,75%{opacity:0}80%,100%{opacity:1}}',
'@keyframes wwr-bl{50%{opacity:.15}}',
'@keyframes wwr-pu{50%{stroke-opacity:.25}}',
'@keyframes wwr-flk{0%{opacity:1}12%{opacity:.2}20%{opacity:1}46%{opacity:.4}52%{opacity:1}70%{opacity:.1}76%{opacity:1}}',
/* точки замера */
P+' .tp{fill:#111;stroke:#C9CED4;stroke-width:2;transition:fill .2s,stroke .2s}',
P+' .tp.ok{fill:#5CC86C;stroke:#5CC86C}'+P+' .tp.bad{fill:#EF5350;stroke:#EF5350}'+P+' .tp.warn{fill:#FFA500;stroke:#FFA500}',
P+' .tl{fill:#C9CED4;font-size:13px;font-weight:700}',
P+' .tl.ok{fill:#5CC86C}'+P+' .tl.bad{fill:#EF5350}'+P+' .tl.warn{fill:#FFA500}',
P+' .fm{opacity:0;pointer-events:none}'+P+'.found .fm{opacity:1}',
P+' .fm rect{fill:rgba(239,83,80,.12);stroke:#EF5350;stroke-width:3;animation:wwr-pu 1.2s ease-in-out infinite}',
P+' .fm text{fill:#EF5350;font-size:14px;font-weight:700}',
P+' .mv{font-family:Menlo,Consolas,"Courier New",monospace;font-weight:700;fill:#1B2414}',
/* лампа и детали */
P+' .glow{fill:#FFD54F;opacity:0;transition:opacity .4s}'+P+' .bulb{fill:#2A2A2A;transition:fill .4s}',
P+'[data-st=ok] .glow{opacity:.35}'+P+'[data-st=ok] .bulb{fill:#FFE082}',
P+'[data-st=oxi] .glow{opacity:.12}'+P+'[data-st=oxi] .bulb{fill:#9C8A4A}',
P+' .brk,'+P+' .ox,'+P+' .chf{opacity:0;transition:opacity .3s}',
P+'[data-st=brk] .brk,'+P+'[data-st=one] .brk,'+P+'[data-st=oxi] .ox,'+P+'[data-st=flick] .ox,'+P+'[data-st=sht] .chf{opacity:1}',
P+' .cl,'+P+' .cr,'+P+' .fz{transition:transform .4s,opacity .4s}',
P+'.open .cl{transform:translateX(-6px)}'+P+'.open .cr{transform:translateX(6px)}'+P+'.open .fz{transform:translateY(-18px);opacity:.3}',
P+' .fzb{opacity:0}'+P+'[data-st=sht] .fzo{opacity:0}'+P+'[data-st=sht] .fzb{opacity:1}',
P+' .sur{display:none}'+P+'[data-st=sht] .sur{display:inline;opacity:0}',
P+'[data-st=sht].run .fzo,'+P+'[data-st=sht].run .sur{animation:wwr-o 1.8s both}',
P+'[data-st=sht].run .fzb{animation:wwr-i 1.8s both}',
P+' .sur .sg{display:inline;animation-duration:.35s}'+P+' .spk{animation:wwr-bl .14s steps(2) infinite}',
/* состояния: проводка */
P+'[data-st=ok] .sg.a,'+P+'[data-st=ok] .sg.b,'+P+'[data-st=ok] .sg.c,'+P+'[data-st=brk] .vv.a,'+P+'[data-st=oxi] .sg.a,'+P+'[data-st=oxi] .sg.b,'+P+'[data-st=oxi] .sg.c{display:inline}',
P+'[data-st=oxi] .sg.b,'+P+'[data-st=oxi] .sg.c{opacity:.45;animation-duration:2.4s}',
/* состояния: ДХО */
P+' .drl{fill:#3A3A3A;transition:fill .3s}'+P+' .dg{fill:#E3F2FD;opacity:0;transition:opacity .3s}',
P+'[data-st=ok] .drl,'+P+'[data-st=always] .drl,'+P+'[data-st=one] .dr .drl,'+P+'[data-st=flick] .drl{fill:#F5FBFF}',
P+'[data-st=ok] .dg,'+P+'[data-st=always] .dg,'+P+'[data-st=one] .dr .dg,'+P+'[data-st=flick] .dg{opacity:.3}',
P+'[data-st=flick] .dl{animation:wwr-flk 1.1s steps(1) infinite}',
P+'[data-st=ok] .sg.in,'+P+'[data-st=ok] .sg.l1,'+P+'[data-st=ok] .sg.l2,'+P+'[data-st=ok] .sg.r,'+P+'[data-st=ok] .vv.ign,',
P+'[data-st=one] .sg.in,'+P+'[data-st=one] .sg.r,'+P+'[data-st=one] .vv.l1,'+P+'[data-st=one] .vv.ign,',
P+'[data-st=flick] .sg.in,'+P+'[data-st=flick] .sg.r,'+P+'[data-st=flick] .sg.l1,'+P+'[data-st=flick] .sg.l2,'+P+'[data-st=flick] .vv.ign,',
P+'[data-st=always] .sg.in,'+P+'[data-st=always] .sg.l1,'+P+'[data-st=always] .sg.l2,'+P+'[data-st=always] .sg.r{display:inline}',
P+'[data-st=flick] .sg.l1,'+P+'[data-st=flick] .sg.l2{animation:wwr-f .9s linear infinite,wwr-flk 1.1s steps(1) infinite}',
P+' .ign-off{display:none}'+P+'[data-st=always] .ign-on{display:none}'+P+'[data-st=always] .ign-off{display:inline}',
/* пауза и «меньше движения» */
P+'.is-off *{animation-play-state:paused!important}',
P+'.rm *{animation:none!important;transition:none!important}',
'@media (prefers-reduced-motion:reduce){'+P+' *{animation:none!important;transition:none!important}}'
].join('\n');

function seg(cls, d){ return '<path class="vv ' + cls + '" d="' + d + '"/><path class="sg ' + cls + '" d="' + d + '"/>'; }
function conn(x, y, lab){
  return '<g class="cl"><rect x="' + (x - 15) + '" y="' + (y - 18) + '" width="14" height="36" rx="3" fill="#3A3A3A" stroke="#5A5A5A" stroke-width="2"/></g>' +
    '<g class="cr"><rect x="' + (x + 1) + '" y="' + (y - 18) + '" width="14" height="36" rx="3" fill="#3A3A3A" stroke="#5A5A5A" stroke-width="2"/><rect x="' + (x + 4) + '" y="' + (y - 24) + '" width="8" height="6" rx="1" fill="#5A5A5A"/></g>' +
    '<text class="lbl" x="' + x + '" y="' + (y - 32) + '" text-anchor="middle">' + lab + '</text>';
}
function meter(x, y){ /* мультиметр: x,y — левый верхний угол, 120×124 */
  return '<rect x="' + x + '" y="' + y + '" width="120" height="124" rx="14" fill="#262626" stroke="#FFA500" stroke-width="5"/>' +
    '<rect x="' + (x + 12) + '" y="' + (y + 12) + '" width="96" height="42" rx="4" fill="#B9CBA0"/>' +
    '<text class="mu" x="' + (x + 17) + '" y="' + (y + 28) + '" font-size="12" font-weight="700" fill="#1B2414">V</text>' +
    '<text class="mv" x="' + (x + 102) + '" y="' + (y + 45) + '" font-size="22" text-anchor="end">- -</text>' +
    '<circle cx="' + (x + 60) + '" cy="' + (y + 84) + '" r="19" fill="#1D1D1D" stroke="#555" stroke-width="3"/>' +
    '<path class="dial" d="M' + (x + 60) + ' ' + (y + 84) + 'V' + (y + 69) + '" stroke="#FFA500" stroke-width="4" stroke-linecap="round" transform="rotate(-40 ' + (x + 60) + ' ' + (y + 84) + ')"/>' +
    '<text x="' + (x + 26) + '" y="' + (y + 74) + '" font-size="11" fill="#9AA3AD" text-anchor="middle">V</text><text x="' + (x + 94) + '" y="' + (y + 74) + '" font-size="11" fill="#9AA3AD" text-anchor="middle">Ω</text>' +
    '<circle cx="' + (x + 28) + '" cy="' + (y + 112) + '" r="5" fill="#111" stroke="#777" stroke-width="2"/><circle cx="' + (x + 92) + '" cy="' + (y + 112) + '" r="5" fill="#111" stroke="#EF5350" stroke-width="2"/>';
}
var PROBE = '<g class="prb"><path d="M0 0L7 20" stroke="#ECEFF1" stroke-width="3" stroke-linecap="round"/><path d="M4 18L16 15L32 66L20 70Z" fill="#EF5350" stroke="#B71C1C" stroke-width="1"/><path d="M6 24l11-3" stroke="#B71C1C" stroke-width="2"/></g>';
function points(V){
  return V.pts.map(function(p, i){
    return '<circle class="tp" cx="' + p[0] + '" cy="' + p[1] + '" r="7"/><text class="tl" x="' + p[2] + '" y="' + p[3] + '" text-anchor="' + (p[4] || 'middle') + '">т.' + (i + 1) + '</text>';
  }).join('');
}
var FM = '<g class="fm"><g class="fmp"><rect x="-16" y="-16" width="32" height="32" rx="16"/></g><text></text></g>';

/* ---------- проводка: предохранитель → разъёмы → потребитель ---------- */
function wireSvg(V){
  var s = [];
  s.push('<svg viewBox="0 0 440 300" role="img" aria-label="Цепь: предохранитель, жгут с двумя разъёмами, потребитель, точки замера и вольтметр мастера">');
  s.push('<text class="lbl" x="12" y="44">предохранитель</text><text class="lbl" x="432" y="44" text-anchor="end">потребитель</text>');
  /* кузов */
  s.push('<rect x="230" y="106" width="66" height="10" rx="2" fill="#3A3F45" stroke="#5B6A77" stroke-width="1.5"/><path d="M238 116l6-10M250 116l6-10M262 116l6-10M274 116l6-10M286 116l6-10" stroke="#5B6A77" stroke-width="1.5"/>');
  s.push('<text class="lbl" x="224" y="116" text-anchor="end">кузов</text>');
  /* жгут */
  s.push('<path d="M70 90H372" stroke="#262B30" stroke-width="20" stroke-linecap="round"/><path d="M70 83H372M70 97H372" stroke="#3A4652" stroke-width="2.5"/>');
  s.push('<path class="wire" d="M56 90H382"/>');
  s.push(seg('a', 'M56 90H262') + seg('b', 'M262 90H382') + seg('c', 'M400 108V140'));
  s.push('<g class="sur"><path class="sg" d="M56 90H262V106"/><path class="spk" d="M258 97l8 3-7 2 8 4" fill="none" stroke="#FFE082" stroke-width="2.5" stroke-linejoin="round"/><circle cx="262" cy="102" r="9" fill="#FFD54F" opacity=".35"/></g>');
  s.push('<circle class="chf" cx="262" cy="98" r="3.5" fill="#E08A3C"/>');
  s.push('<g class="brk"><rect x="254" y="85" width="16" height="10" fill="#262B30"/><path d="M252 90h3l2-3M272 90h-3l-2 3" fill="none" stroke="#B87333" stroke-width="3" stroke-linecap="round"/></g>');
  /* предохранитель */
  s.push('<rect x="12" y="56" width="58" height="68" rx="8" fill="#1D1D1D" stroke="#3A3A3A" stroke-width="2"/><text x="41" y="116" text-anchor="middle" font-size="12" fill="#9AA3AD">+12 В</text>');
  s.push('<g class="fz"><g class="fzo"><rect x="26" y="80" width="30" height="20" rx="4" fill="#FFA500"/><path d="M30 90h6l5-4 5 8 5-4h3" fill="none" stroke="#7A4B00" stroke-width="2"/></g>' +
    '<g class="fzb"><rect x="26" y="80" width="30" height="20" rx="4" fill="#5B2A2A" stroke="#EF5350" stroke-width="2"/><path d="M30 90h6l3-3M52 90h-6l-3 3" fill="none" stroke="#EF5350" stroke-width="2"/></g></g>');
  /* разъёмы */
  s.push(conn(160, 90, 'разъём 1') + conn(312, 90, 'разъём 2'));
  s.push('<g class="ox"><circle cx="305" cy="80" r="4" fill="#9CCC65"/><circle cx="318" cy="96" r="4.5" fill="#9CCC65"/><circle cx="309" cy="99" r="3" fill="#E8F5E9"/><circle cx="320" cy="78" r="2.6" fill="#E8F5E9"/></g>');
  /* лампа */
  s.push('<circle class="glow" cx="400" cy="88" r="34"/><circle class="bulb" cx="400" cy="88" r="17" stroke="#9AA3AD" stroke-width="2"/><path d="M393 92l3-8 4 6 4-6 3 8" fill="none" stroke="#6D5A2A" stroke-width="1.8"/><rect x="392" y="104" width="16" height="8" rx="2" fill="#9AA3AD"/>');
  s.push('<path class="wire" d="M400 112V140"/><path d="M386 140h28M391 146h18M396 152h8" stroke="#5B6A77" stroke-width="3" stroke-linecap="round"/>');
  /* легенда */
  s.push('<g font-size="12" fill="#C9CED4"><path d="M262 214h30" stroke="#FFA500" stroke-width="4" stroke-linecap="round"/><text x="300" y="218">есть напряжение</text>' +
    '<path class="lg" d="M262 238h30" stroke="#FFA500" stroke-width="4" stroke-linecap="round" stroke-dasharray="7 11"/><text x="300" y="242">идёт ток</text>' +
    '<path d="M262 262h30" stroke="#5B6A77" stroke-width="4" stroke-linecap="round"/><text x="300" y="266">нет напряжения</text></g>');
  /* масса прибора, прибор, щуп */
  s.push('<path d="M42 280C60 300 150 300 176 284" fill="none" stroke="#2B2B2B" stroke-width="4" stroke-linecap="round"/><path d="M166 284h20M170 290h12M174 296h4" stroke="#5B6A77" stroke-width="2.5" stroke-linecap="round"/><text class="lbl" x="192" y="292">масса</text>');
  s.push(meter(14, 168));
  s.push(points(V) + FM);
  s.push('<path class="lead" fill="none" stroke="#C62828" stroke-width="3.5" stroke-linecap="round"/>' + PROBE);
  s.push('</svg>');
  return s.join('');
}

/* ---------- ДХО: блок/реле → огни ---------- */
function dhoSvg(V){
  var s = [];
  s.push('<svg viewBox="0 0 440 300" role="img" aria-label="Перед машины с дневными ходовыми огнями, блок ДХО, предохранитель и мультиметр мастера">');
  /* машина спереди */
  s.push('<rect x="70" y="150" width="44" height="22" rx="5" fill="#161616"/><rect x="326" y="150" width="44" height="22" rx="5" fill="#161616"/>');
  s.push('<path d="M60 150V104Q62 86 84 80L96 44Q100 30 116 30H324Q340 30 344 44L356 80Q378 86 380 104V150Q380 160 370 160H70Q60 160 60 150Z" fill="#2B2B2B" stroke="#4A4A4A" stroke-width="3"/>');
  s.push('<path d="M108 44Q110 38 118 38H322Q330 38 332 44L342 76H98Z" fill="#3B4A57"/>');
  s.push('<path d="M72 98Q74 88 86 88H150L144 108H78Q72 108 72 102Z" fill="#1A1A1A" stroke="#555" stroke-width="2"/><path d="M368 98Q366 88 354 88H290L296 108H362Q368 108 368 102Z" fill="#1A1A1A" stroke="#555" stroke-width="2"/>');
  s.push('<circle cx="100" cy="98" r="6" fill="#3A3A3A"/><circle cx="340" cy="98" r="6" fill="#3A3A3A"/>');
  s.push('<rect x="172" y="94" width="96" height="28" rx="6" fill="#1A1A1A" stroke="#444" stroke-width="2"/><path d="M180 103h80M180 113h80" stroke="#333" stroke-width="2"/>');
  s.push('<g class="dl"><rect class="dg" x="72" y="109" width="76" height="17" rx="8"/><rect class="drl" x="78" y="113" width="64" height="8" rx="4"/></g>');
  s.push('<g class="dr"><rect class="dg" x="292" y="109" width="76" height="17" rx="8"/><rect class="drl" x="298" y="113" width="64" height="8" rx="4"/></g>');
  /* провода */
  s.push('<path class="wire" d="M50 218H170M190 196V178H110V122M250 196V178H330V122M220 262V240"/>');
  s.push(seg('in', 'M50 218H170') + seg('l1', 'M190 196V178H110V160') + seg('l2', 'M110 160V122') + seg('r', 'M250 196V178H330V122') + seg('ign', 'M220 262V240'));
  s.push('<g class="brk"><rect x="105" y="153" width="10" height="14" fill="#2B2B2B"/><path d="M110 151v3l-3 2M110 169v-3l3-2" fill="none" stroke="#B87333" stroke-width="3" stroke-linecap="round"/></g>');
  s.push('<g class="ox"><circle cx="104" cy="126" r="3.5" fill="#9CCC65"/><circle cx="116" cy="130" r="3.5" fill="#9CCC65"/><circle cx="111" cy="133" r="2.4" fill="#E8F5E9"/></g>');
  /* предохранитель, блок */
  s.push('<rect x="10" y="198" width="44" height="40" rx="6" fill="#1D1D1D" stroke="#3A3A3A" stroke-width="2"/><rect x="18" y="209" width="28" height="18" rx="3" fill="#FFA500"/><path d="M22 218h5l4-3 4 6 4-3h3" fill="none" stroke="#7A4B00" stroke-width="2"/>');
  s.push('<text x="32" y="254" text-anchor="middle" font-size="12" fill="#9AA3AD">+12 В</text>');
  s.push('<rect x="170" y="196" width="100" height="44" rx="8" fill="#262626" stroke="#4A4A4A" stroke-width="2"/><text x="220" y="223" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">блок ДХО</text>');
  s.push('<text class="lbl ign-on" x="220" y="280" text-anchor="middle">зажигание: вкл</text><text class="ign-off" x="220" y="280" text-anchor="middle" font-size="13" font-weight="700" fill="#FFA500">зажигание: выкл</text>');
  s.push(meter(312, 172));
  s.push('<path d="M340 284V300" stroke="#2B2B2B" stroke-width="4"/>');
  s.push(points(V) + FM);
  s.push('<path class="lead" fill="none" stroke="#C62828" stroke-width="3.5" stroke-linecap="round"/>' + PROBE);
  s.push('</svg>');
  return s.join('');
}

var VARS = {
 wire: {
  h2: 'Ремонт автопроводки',
  sub: 'Выберите неисправность и нажмите кнопку — покажу, как мастер с вольтметром ищет место по точкам.',
  wa: 'Здравствуйте, Олег! Нужен ремонт проводки.',
  km: 'Проводка',
  svg: wireSvg,
  pts: [[110,90,110,70],[220,90,220,70],[352,90,352,70]],
  jack: [106,280], park: [176,190],
  modes: [
   {id:'ok', n:'Исправно', go:'Проверить цепь', u:'V', r:['12.4','12.4','12.3'], l:['12,4 В','12,4 В','12,3 В'], s:['ok','ok','ok'], wa:'Хочу проверить проводку.',
    h:'Цепь целая — потребитель работает', t:'Ток идёт от предохранителя через разъёмы к потребителю и возвращается через массу. На всех точках — почти полное напряжение аккумулятора.',
    c:['Проверяем предохранитель и реле','Замеряем напряжение по точкам под нагрузкой','Осматриваем разъёмы и жгут'],
    fh:'Везде около 12 вольт — проводка в порядке', ft:'Напряжение почти не теряется по пути. Если потребитель всё равно не работает — проверяем его самого и массу.'},
   {id:'brk', n:'Обрыв', go:'Найти обрыв', u:'V', r:['12.4','12.4','0.0'], l:['12,4 В','12,4 В','0 В'], s:['ok','ok','bad'], f:[262,90,32,32,262,140], fl:'обрыв', wa:'Не работает потребитель, предохранитель целый — похоже на обрыв.',
    h:'Потребитель не работает, предохранитель целый', t:'Где-то оборван провод или вышел контакт из разъёма. Тока нет, а напряжение есть только до места обрыва.',
    c:['Ищем обрыв по точкам вольтметром','Восстанавливаем провод: пайка и термоусадка','Проверяем работу потребителя'],
    fh:'Обрыв между точкой 2 и точкой 3', ft:'До точки 2 напряжение есть, на точке 3 — ноль. Значит, провод оборван на этом участке — чаще всего на изгибе или у разъёма.'},
   {id:'oxi', n:'Окисел', go:'Найти окисел', u:'V', r:['12.4','12.3','9.6'], l:['12,4 В','12,3 В','9,6 В'], s:['ok','ok','warn'], f:[312,90,46,52,312,140], fl:'окисел', wa:'Потребитель работает слабо, подозреваю окисел в разъёме.',
    h:'Работает слабо или через раз', t:'Фара тусклая, вентилятор крутит медленно. В разъём попала влага, контакт окислился и «съедает» напряжение, когда идёт ток.',
    c:['Замеряем падение напряжения под нагрузкой','Чистим или меняем контакты разъёма','Защищаем разъём от влаги'],
    fh:'Окисел в разъёме 2: теряется почти 3 вольта', ft:'До разъёма — 12,3 В, после — 9,6 В. Под нагрузкой контакт «проседает», и потребитель работает вполсилы.'},
   {id:'sht', n:'Замыкание на массу', go:'Найти замыкание', u:'Ω', open:1, r:['OL','0.2','OL'], l:['OL','0,2 Ом','OL'], s:['ok','bad','ok'], f:[262,99,34,34,262,140], fl:'КЗ на кузов', wa:'Сгорает предохранитель — похоже на замыкание.',
    h:'Предохранитель сгорает сразу или через время', t:'Провод перетёрся о кузов, и ток идёт напрямую на массу. Ставить предохранитель больше — нельзя: может оплавиться проводка.',
    c:['Делим жгут на участки и прозваниваем на массу','Восстанавливаем изоляцию и крепим жгут','Ставим предохранитель штатного номинала'],
    fh:'Провод замыкает на кузов между разъёмами', ft:'Сняли предохранитель, разъединили разъёмы и прозвонили каждый участок на массу: на втором — 0,2 Ом. Там перетёрлась изоляция.'}
  ]
 },
 dho: {
  h2: 'Ремонт дневных ходовых огней',
  sub: 'Выберите, что происходит с ДХО, и нажмите «Проверить цепь» — мастер пройдёт щупом по точкам.',
  wa: 'Здравствуйте, Олег! Проблема с дневными ходовыми огнями (ДХО).',
  km: 'ДХО',
  svg: dhoSvg,
  pts: [[110,218,110,206],[150,178,150,170],[110,140,122,145,'start']],
  jack: [404,284], park: [272,190],
  modes: [
   {id:'ok', n:'Горят обе', go:'Проверить цепь', u:'V', r:['14.2','14.0','13.9'], l:['14,2 В','14,0 В','13,9 В'], s:['ok','ok','ok'], wa:'Хочу проверить ДХО.',
    h:'ДХО включаются вместе с двигателем', t:'Блок или реле включает дневные огни, когда двигатель работает, и обычно гасит или приглушает их, когда включены фары.',
    c:['Проверим питание и массу блока ДХО','Проверим, что огни гаснут при выключении зажигания','Проверим разъёмы у фар'],
    fh:'Напряжение доходит до обеих сторон', ft:'Двигатель работает — на огнях около 14 вольт. Цепь в порядке.'},
   {id:'one', n:'Не горит одна', go:'Проверить цепь', u:'V', r:['14.2','14.0','0.0'], l:['14,2 В','14,0 В','0 В'], s:['ok','ok','bad'], f:[110,160,28,28,96,165,'end'], fl:'обрыв', wa:'Не горит один ДХО.',
    h:'Не горит одна сторона', t:'Если вторая горит, блок обычно жив — ищем обрыв провода, окисел в разъёме у фары или сгоревший светодиодный модуль.',
    c:['Замеряем напряжение у разъёма фары','Ищем обрыв по точкам','Ремонтируем проводку или модуль ДХО'],
    fh:'Обрыв в проводе к левой фаре', ft:'На выходе блока напряжение есть, а у разъёма фары — ноль. Провод оборван между ними.'},
   {id:'flick', n:'Мерцают', go:'Проверить цепь', u:'V', r:['14.2','14.0',['13.8','6.1','12.9','4.7','11.6','8.3']], l:['14,2 В','14,0 В','скачет'], s:['ok','ok','warn'], f:[110,126,28,28,128,133,'start'], fl:'плохой контакт', wa:'ДХО мерцают.',
    h:'Мерцают или моргают', t:'Плохая масса, окисленный разъём, неисправный драйвер светодиодов или подключение «на скрутках» дают мерцание.',
    c:['Проверяем массу и разъёмы','Смотрим напряжение у фары под нагрузкой','Меняем драйвер или переделываем подключение'],
    fh:'У разъёма фары напряжение «скачет»', ft:'До разъёма — ровные 14 вольт, а у самой фары скачет от 5 до 14. Плохой контакт в разъёме или на массе.'},
   {id:'always', n:'Горят всегда', go:'Проверить цепь', u:'V', r:['12.4','12.4','12.3'], l:['12,4 В','12,4 В','12,3 В'], s:['ok','bad','bad'], f:[220,218,112,56,0,0], fl:'', wa:'ДХО горят даже при выключенном зажигании.',
    h:'Горят даже на заглушённой машине', t:'Залипло реле, неисправен блок или огни подключены напрямую к плюсу. Так они за ночь могут посадить аккумулятор.',
    c:['Проверяем выход блока при выключенном зажигании','Меняем реле или блок','Подключаем ДХО так, чтобы гасли с двигателем'],
    fh:'Зажигание выключено, а на выходе блока 12 вольт', ft:'На входе плюс должен быть всегда, а на выходе — нет. Значит, залипло реле или неисправен блок.'}
  ]
 }
};

AO_SITE.reg('wire', {css: CSS, html: '<div class="aox w-wire"><div class="L"></div><div class="card" aria-live="polite"></div></div>', init: function(R, U, ds){
  var V = ds.mode === 'dho' ? VARS.dho : VARS.wire;
  var L = R.querySelector('.L'), C = R.querySelector('.card');
  if (U.reduce) R.classList.add('rm');
  L.innerHTML = '<h2>' + V.h2 + '</h2><p class="sub">' + V.sub + '</p>' + V.svg(V) +
    '<p class="log" aria-live="polite"></p>' +
    '<button type="button" class="btn go"></button>' +
    '<div class="tabs" role="group" aria-label="Неисправности">' + V.modes.map(function(m){ return '<button type="button" class="chip" data-m="' + m.id + '" aria-pressed="false">' + m.n + '</button>'; }).join('') + '</div>';
  C.innerHTML = '<span class="k"></span><h3></h3><p class="t"></p><ul></ul>' + U.ctas(V.wa);
  var K = C.querySelector('.k'), H = C.querySelector('h3'), T = C.querySelector('.t'), UL = C.querySelector('ul'), WA = C.querySelector('.btn.w');
  var LOG = L.querySelector('.log'), GO = L.querySelector('.go'), PRB = L.querySelector('.prb'), LEAD = L.querySelector('.lead');
  var MV = L.querySelector('.mv'), MU = L.querySelector('.mu'), DIAL = L.querySelector('.dial'), FMk = L.querySelector('.fm');
  var TP = L.querySelectorAll('.tp'), TL = L.querySelectorAll('.tl');
  var MODE = {}, ids = [], st = null, used = false, vis = false, tok = 0, cyc = null, pos = V.park.slice(), raf = 0;
  V.modes.forEach(function(m){ MODE[m.id] = m; ids.push(m.id); });
  var dialC = DIAL.getAttribute('transform').replace(/rotate\(-?\d+ /, '');

  function card(m, found){
    K.textContent = found ? 'Результат проверки' : V.km + ': ' + m.n;
    H.textContent = found ? m.fh : m.h; T.textContent = found ? m.ft : m.t;
    UL.innerHTML = m.c.map(function(x){ return '<li>' + x + '</li>'; }).join('');
    WA.href = U.wa(V.wa + ' ' + m.wa);
  }
  function place(x, y){
    pos = [x, y];
    PRB.setAttribute('transform', 'translate(' + x + ' ' + y + ')');
    var hx = x + 26, hy = y + 68, j = V.jack;
    LEAD.setAttribute('d', 'M' + j[0] + ' ' + j[1] + 'Q' + ((j[0] + hx) / 2) + ' ' + Math.max(j[1], hy + 30) + ' ' + hx + ' ' + hy);
  }
  function move(x, y, ms, cb){
    cancelAnimationFrame(raf);
    if (U.reduce || !ms){ place(x, y); cb && cb(); return; }
    var x0 = pos[0], y0 = pos[1], t0 = null;
    function fr(t){ if (t0 === null) t0 = t; var k = Math.min(1, (t - t0) / ms), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      place(x0 + (x - x0) * e, y0 + (y - y0) * e); if (k < 1) raf = requestAnimationFrame(fr); else cb && cb(); }
    raf = requestAnimationFrame(fr);
  }
  function stopCyc(){ if (cyc){ clearInterval(cyc); cyc = null; } }
  function meterShow(v){
    stopCyc();
    if (typeof v === 'string'){ MV.textContent = v; return; }
    var i = 0; MV.textContent = v[0];
    if (!U.reduce) cyc = setInterval(function(){ i = (i + 1) % v.length; MV.textContent = v[i]; }, 260);
  }
  function unit(u){ MU.textContent = u; DIAL.setAttribute('transform', 'rotate(' + (u === 'V' ? -40 : 40) + ' ' + dialC); }
  function resetPts(){
    for (var i = 0; i < TP.length; i++){ TP[i].setAttribute('class', 'tp'); TL[i].setAttribute('class', 'tl'); TL[i].textContent = 'т.' + (i + 1); }
  }
  function setMode(id, keepProbe){
    var m = MODE[id]; st = id; tok++; stopCyc();
    R.setAttribute('data-st', id);
    R.classList.remove('found', 'open', 'run'); void R.offsetWidth; R.classList.add('run');
    L.querySelectorAll('.chip').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-m') === id ? 'true' : 'false'); });
    GO.textContent = m.go; resetPts(); unit(m.u); MV.textContent = '- -';
    LOG.textContent = 'Нажмите «' + m.go + '».';
    if (m.f){
      FMk.querySelector('.fmp').setAttribute('transform', 'translate(' + m.f[0] + ' ' + m.f[1] + ')');
      var rc = FMk.querySelector('rect'), w = m.f[2], h = m.f[3];
      rc.setAttribute('x', -w / 2); rc.setAttribute('y', -h / 2); rc.setAttribute('width', w); rc.setAttribute('height', h); rc.setAttribute('rx', Math.min(w, h) / 2);
      var tx = FMk.querySelector('text'); tx.textContent = m.fl; tx.setAttribute('x', m.f[4]); tx.setAttribute('y', m.f[5]); tx.setAttribute('text-anchor', m.f[6] || 'middle');
      FMk.style.display = '';
    } else FMk.style.display = 'none';
    if (!keepProbe) move(V.park[0], V.park[1], 350);
    card(m, false);
  }
  function find(fast){
    var m = MODE[st], my = ++tok, i = 0, mv = fast ? 380 : 500, dw = fast ? 420 : 600;
    stopCyc(); resetPts(); R.classList.remove('found'); unit(m.u); MV.textContent = '- -';
    if (m.open){ R.classList.add('open'); LOG.innerHTML = 'Сняли предохранитель и разъединили разъёмы — <b>прозваниваем участки на массу</b>.'; }
    else LOG.innerHTML = 'Мастер меряет напряжение по точкам — <b>от предохранителя к потребителю</b>.';
    function step(){
      if (my !== tok) return;
      if (i >= V.pts.length){ done(); return; }
      var p = V.pts[i];
      move(p[0], p[1], mv, function(){
        if (my !== tok) return;
        meterShow(m.r[i]);
        TP[i].setAttribute('class', 'tp ' + m.s[i]); TL[i].setAttribute('class', 'tl ' + m.s[i]); TL[i].textContent = m.l[i];
        LOG.innerHTML = 'Точка ' + (i + 1) + ': <b>' + m.l[i] + '</b>';
        i++; setTimeout(step, dw);
      });
    }
    function done(){
      if (m.f) R.classList.add('found');
      LOG.innerHTML = '<b>' + m.fh + '</b>';
      setTimeout(function(){ if (my === tok) move(V.park[0], V.park[1], 400); }, 500);
      card(m, true);
    }
    setTimeout(step, m.open ? (fast ? 450 : 650) : 0);
  }
  function touch(){ used = true; }
  L.addEventListener('click', function(e){
    var c = e.target.closest('.chip');
    if (c){ touch(); setMode(c.getAttribute('data-m')); U.buzz(); return; }
    if (e.target.closest('.go')){ touch(); find(false); U.buzz(); }
  });
  R.addEventListener('click', touch); R.addEventListener('keydown', touch);
  place(V.park[0], V.park[1]);
  setMode(ids[0], true);
  U.seen(R, function(v){ vis = v; R.classList.toggle('is-off', !v); });
  /* автопоказ: выбрать неисправность → через такт найти её → следующая */
  var phase = 0;
  if (!U.reduce) setInterval(function(){
    if (used || !vis || document.hidden) return;
    if (phase === 0) find(true);
    else setMode(ids[(ids.indexOf(st) + 1) % ids.length]);
    phase = 1 - phase;
  }, 3800);
}});
})();
