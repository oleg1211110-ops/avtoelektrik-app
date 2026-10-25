/* «Иммобилайзер и ключи», замок зажигания (data-mode="lock"),
   аварийное вскрытие (data-mode="open"). avtoelektrik-pro.kz
   Только законные работы: прописка ключей и вскрытие — при документах на машину. */
(function(){
var P = '.w-key';
var CSS = [
P+' .tabs .chip{min-height:40px;padding:9px 12px}',
P+' .lbl{fill:#C9CED4;font-size:13px}',
P+' .wr{fill:none;stroke:#5B6A77;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}',
P+' .sg{fill:none;stroke:#FFA500;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:6 12;animation:wky-f .9s linear infinite;display:none}',
P+' .vv{fill:none;stroke:#FFA500;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}',
'@keyframes wky-f{to{stroke-dashoffset:-36}}',
'@keyframes wky-bl{50%{opacity:.2}}',
'@keyframes wky-rot{to{transform:rotate(360deg)}}',
'@keyframes wky-pu{50%{opacity:.35}}',
P+' .gear{transform-box:fill-box;transform-origin:center}',
/* иммобилайзер */
P+' .wv path{fill:none;stroke:#FFA500;stroke-width:3;stroke-linecap:round;opacity:0}',
P+'[data-st=ok] .wv path,'+P+'[data-st=tag] .wv path,'+P+'[data-st=new] .wv path{animation:wky-w 1.5s ease-out infinite}',
P+' .wv path:nth-child(2){animation-delay:.5s}'+P+' .wv path:nth-child(3){animation-delay:1s}',
'@keyframes wky-w{0%{opacity:0;transform:translateX(4px)}20%{opacity:1}100%{opacity:0;transform:translateX(-40px)}}',
P+' .rsp circle{fill:none;stroke:#5CC86C;stroke-width:2.5;opacity:0;transform-box:fill-box;transform-origin:center}',
P+'[data-st=ok] .rsp circle,'+P+'[data-st=new] .rsp circle{animation:wky-r 1.5s ease-out infinite .6s}',
P+' .rsp circle:nth-child(2){animation-delay:1.1s!important}',
'@keyframes wky-r{0%{opacity:.9;transform:scale(.5)}100%{opacity:0;transform:scale(2.4)}}',
P+' .tag{fill:#FFA500;transition:fill .3s}'+P+'[data-st=ok] .tag{fill:#5CC86C}'+P+'[data-st=tag] .tag{fill:#555}',
P+'[data-st=new] .tag{animation:wky-tg 1.5s steps(2) infinite}',
'@keyframes wky-tg{50%{fill:#5CC86C}}',
P+' .tx,'+P+' .cgap,'+P+' .abrk,'+P+' .doc,'+P+' .nk{opacity:0;transition:opacity .35s}',
P+'[data-st=tag] .tx,'+P+'[data-st=ant] .cgap,'+P+'[data-st=ant] .abrk,'+P+'[data-st=new] .doc,'+P+'[data-st=new] .nk{opacity:1}',
P+' .coil{stroke:#B87333;transition:stroke .3s}'+P+'[data-st=ant] .coil{stroke:#EF5350}',
P+'.v-immo[data-st=ok] .sg,'+P+'.v-immo[data-st=new] .sg{display:inline}',
P+' .res text{display:none}',
P+'[data-st=ok] .r-ok,'+P+'[data-st=new] .r-new,'+P+'[data-st=tag] .r-no,'+P+'[data-st=ant] .r-no{display:inline}',
P+' .lampc{fill:#333}',
P+'[data-st=tag] .lampc,'+P+'[data-st=ant] .lampc{fill:#EF5350;animation:wky-bl .8s steps(2) infinite}',
P+' .gear circle.t{stroke:#5B6A77;transition:stroke .3s}',
P+'.v-immo[data-st=ok] .gear,'+P+'.v-immo[data-st=new] .gear{animation:wky-rot 2s linear infinite}',
P+'.v-immo[data-st=ok] .gear circle.t,'+P+'.v-immo[data-st=new] .gear circle.t{stroke:#5CC86C}',
P+'.v-immo[data-st=tag] .gear circle.t,'+P+'.v-immo[data-st=ant] .gear circle.t{stroke:#EF5350}',
P+' .ecu-b{stroke:#4A4A4A;transition:stroke .3s}',
P+'[data-st=ok] .ecu-b,'+P+'[data-st=new] .ecu-b{stroke:#5CC86C}'+P+'[data-st=tag] .ecu-b,'+P+'[data-st=ant] .ecu-b{stroke:#EF5350}',
/* замок зажигания */
P+' .rng{display:block;margin-top:12px;color:#C9CED4;font-size:15px}',
P+' .rng input{display:block;width:100%;height:36px;margin:4px 0 0;accent-color:#FFA500;cursor:pointer}',
P+' .ticks{display:flex;justify-content:space-between;font-size:13px;font-weight:700;color:#C9CED4;padding:0 2px}',
P+' .kh{transform-origin:104px 140px;transition:transform .35s ease}',
P+' .kh.shake{animation:wky-sh .5s ease-in-out}',
'@keyframes wky-sh{0%,100%{transform:rotate(-40deg)}30%{transform:rotate(-27deg)}60%{transform:rotate(-43deg)}80%{transform:rotate(-31deg)}}',
P+' .cyl{stroke:#C9CED4;transition:stroke .3s}'+P+'[data-st=jam] .cyl{stroke:#EF5350;stroke-width:4}',
P+' .pos{cursor:pointer;outline:none}'+P+' .pos text{fill:#9AA3AD;font-size:13px;font-weight:700}',
P+' .pos.on text{fill:#FFA500}'+P+' .pos:focus-visible text{fill:#4FC3F7}',
P+' .row .bl{transform-box:view-box;transition:transform .3s;stroke:#C9CED4;stroke-width:3.5;stroke-linecap:round}',
P+' .row .sg{display:none}'+P+' .row.on .sg{display:inline}',
P+' .row .rl{fill:#9AA3AD;font-size:12px;font-weight:700}'+P+' .row.on .rl{fill:#FFA500}',
P+' .rad{fill:#333;transition:fill .3s}'+P+' .row.on .rad{fill:#4FC3F7}',
P+' .ndl{transform-box:view-box;transition:transform .4s}',
P+'[data-st=wear] .row.on.r2 .sg,'+P+'[data-st=wear] .row.on.r2 .ndl,'+P+'[data-st=wear] .row.on.r2 .spk{animation:wky-flk 1s steps(1) infinite}',
'@keyframes wky-flk{0%{opacity:1}14%{opacity:.1}22%{opacity:1}50%{opacity:.3}56%{opacity:1}78%{opacity:.05}84%{opacity:1}}',
P+' .spk{opacity:0}'+P+'[data-st=wear] .row.on.r2 .spk{opacity:1}',
P+' .row.on .gear{animation:wky-rot .9s linear infinite}'+P+' .row.on .gear circle.t{stroke:#5CC86C}',
/* аварийное вскрытие */
P+' .kin{transition:transform .8s ease,opacity .4s}',
P+'[data-st=done] .kin{transform:translate(-58px,-64px)}',
P+' .shk{transition:transform .5s}'+P+'[data-st=done] .shk{transform:translateY(-8px)}',
P+' .pbody{fill:#FFA500;transition:fill .3s}'+P+'[data-st=done] .pbody{fill:#5CC86C}'+P+'[data-st=nodoc] .pbody{fill:#EF5350}',
P+' .docs,'+P+' .dok,'+P+' .dno,'+P+' .prog,'+P+' .door,'+P+' .okb{opacity:0;transition:opacity .35s}',
P+'[data-st=docs] .docs,'+P+'[data-st=work] .docs,'+P+'[data-st=done] .docs,'+P+'[data-st=nodoc] .docs{opacity:1}',
P+'[data-st=docs] .dok,'+P+'[data-st=work] .dok,'+P+'[data-st=done] .dok,'+P+'[data-st=nodoc] .dno,'+P+'[data-st=work] .prog,'+P+'[data-st=work] .door,'+P+'[data-st=done] .okb{opacity:1}',
P+' .prog circle{transform-box:fill-box;transform-origin:center;animation:wky-rot 1.4s linear infinite}',
P+'[data-st=work] .door{animation:wky-pu 1s ease-in-out infinite}',
P+'[data-st=locked] .kin .halo{animation:wky-pu 1.2s ease-in-out infinite}',
P+' .stc{fill:#262626;stroke:#4A4A4A;stroke-width:2.5;transition:fill .3s,stroke .3s}',
P+' .stp text.n{fill:#C9CED4;font-size:15px;font-weight:700}'+P+' .stp text.l{fill:#9AA3AD;font-size:12px}',
P+' .stp.cur .stc{fill:#FFA500;stroke:#FFA500}'+P+' .stp.cur text.n{fill:#111}'+P+' .stp.cur text.l{fill:#fff}',
P+' .stp.done .stc{fill:#5CC86C;stroke:#5CC86C}'+P+' .stp.done text.n{fill:#111}',
P+' .stp.no .stc{fill:#EF5350;stroke:#EF5350}'+P+' .stp.no text.n{fill:#111}'+P+' .stp.no text.l{fill:#EF5350}',
P+' .stp.off{opacity:.4}'+P+' .stp{cursor:pointer;outline:none}'+P+' .stp:focus-visible .stc{stroke:#4FC3F7;stroke-width:3.5}',
/* пауза и «меньше движения» */
P+'.is-off *{animation-play-state:paused!important}',
P+'.rm *{animation:none!important;transition:none!important}',
'@media (prefers-reduced-motion:reduce){'+P+' *{animation:none!important;transition:none!important}}'
].join('\n');

function gear(cx, cy, r){
  var c = 2 * Math.PI * r, d = (c / 16).toFixed(2);
  return '<g transform="translate(' + cx + ' ' + cy + ')"><g class="gear"><circle class="t" r="' + r + '" fill="#1B1B1B" stroke-width="7" stroke-dasharray="' + d + ' ' + d + '"/><circle r="' + (r - 5) + '" fill="#1B1B1B"/><circle r="' + Math.round(r * .4) + '" fill="#555"/></g></g>';
}

/* ---------- иммобилайзер ---------- */
function immoSvg(){
  var s = [];
  s.push('<svg viewBox="0 0 440 300" role="img" aria-label="Ключ с меткой, катушка-антенна на замке, блок иммобилайзера и блок двигателя">');
  s.push('<text class="lbl" x="150" y="40" text-anchor="middle">катушка-антенна</text><text class="lbl" x="47" y="158" text-anchor="middle">метка (чип)</text>');
  /* провода */
  s.push('<path class="wr" d="M196 70V49H250M305 74V170M360 195H384"/>');
  s.push('<path class="sg" d="M196 70V49H250"/><path class="sg" d="M305 74V170"/><path class="sg" d="M360 195H384"/>');
  s.push('<path class="abrk" d="M189 53l14 14m0-14l-14 14" stroke="#EF5350" stroke-width="3" stroke-linecap="round"/>');
  /* ключ */
  s.push('<path d="M80 93H158V107H80ZM88 93L93 86L98 93L103 86L108 93L113 86L118 93Z" fill="#9AA3AD"/>');
  s.push('<rect x="14" y="62" width="66" height="76" rx="24" fill="#2A2A2A" stroke="#5A5A5A" stroke-width="2"/><circle cx="32" cy="100" r="7" fill="#111" stroke="#444" stroke-width="2"/>');
  s.push('<rect class="tag" x="48" y="92" width="22" height="16" rx="3"/><path d="M52 96h14M52 100h14M52 104h14" stroke="#111" stroke-width="1" opacity=".35"/>');
  s.push('<path class="tx" d="M51 93l16 14m0-14l-16 14" stroke="#EF5350" stroke-width="3" stroke-linecap="round"/>');
  s.push('<g class="rsp"><circle cx="59" cy="100" r="12"/><circle cx="59" cy="100" r="12"/></g>');
  s.push('<g class="nk"><circle cx="76" cy="64" r="12" fill="#5CC86C"/><path d="M76 58v12M70 64h12" stroke="#111" stroke-width="3" stroke-linecap="round"/></g>');
  /* замок и катушка */
  s.push('<rect x="134" y="70" width="80" height="60" rx="8" fill="#2B2B2B" stroke="#4A4A4A" stroke-width="2"/><rect x="134" y="76" width="8" height="48" fill="#3A3A3A"/>');
  s.push('<ellipse class="coil" cx="140" cy="100" rx="11" ry="42" fill="none" stroke-width="6"/><ellipse cx="140" cy="100" rx="6" ry="35" fill="none" stroke="#7A4A22" stroke-width="2"/>');
  s.push('<g class="cgap"><rect x="126" y="52" width="28" height="13" fill="#111"/><path d="M130 50l4 5M150 50l-4 5" stroke="#EF5350" stroke-width="3" stroke-linecap="round"/></g>');
  s.push('<g class="wv"><path d="M126 78Q114 100 126 122"/><path d="M126 78Q114 100 126 122"/><path d="M126 78Q114 100 126 122"/></g>');
  /* блоки */
  s.push('<rect x="250" y="24" width="110" height="50" rx="8" fill="#262626" stroke="#4A4A4A" stroke-width="2"/><text x="305" y="54" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">иммобилайзер</text>');
  s.push('<rect class="ecu-b" x="250" y="170" width="110" height="50" rx="8" fill="#262626" stroke-width="2.5"/><text x="305" y="200" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">ЭБУ двигателя</text>');
  s.push('<g class="res" font-size="14" font-weight="700" text-anchor="middle"><text class="r-ok" x="305" y="246" fill="#5CC86C">ПУСК РАЗРЕШЁН</text><text class="r-no" x="305" y="246" fill="#EF5350">ПУСК ЗАПРЕЩЁН</text><text class="r-new" x="305" y="246" fill="#5CC86C">КЛЮЧ ПРОПИСАН</text></g>');
  s.push(gear(408, 195, 18) + '<text class="lbl" x="408" y="236" text-anchor="middle" font-size="12">двигатель</text>');
  /* лампа на панели */
  s.push('<rect x="14" y="196" width="150" height="60" rx="10" fill="#1A1A1A" stroke="#333" stroke-width="2"/><circle class="lampc" cx="44" cy="226" r="15"/>');
  s.push('<path d="M35 226h11m-3 0v4m-4-4v3" stroke="#111" stroke-width="2.4" stroke-linecap="round" fill="none"/><circle cx="50" cy="226" r="4" fill="none" stroke="#111" stroke-width="2.4"/>');
  s.push('<text x="68" y="222" fill="#C9CED4" font-size="12">лампа</text><text x="68" y="238" fill="#C9CED4" font-size="12">иммобилайзера</text>');
  /* документы (новый ключ) */
  s.push('<g class="doc"><rect x="186" y="190" width="50" height="64" rx="4" fill="#ECEFF1"/><path d="M194 206h34M194 216h34M194 226h24M194 236h30" stroke="#9AA3AD" stroke-width="2"/>' +
    '<circle cx="233" cy="192" r="11" fill="#5CC86C" stroke="#111" stroke-width="2"/><path d="M228 192l4 4 7-8" fill="none" stroke="#111" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<text x="211" y="272" text-anchor="middle" fill="#C9CED4" font-size="12">документы</text></g>');
  s.push('</svg>');
  return s.join('');
}

/* ---------- замок зажигания ---------- */
var ANG = [-40, 0, 40, 80], PN = ['LOCK', 'ACC', 'ON', 'START'];
function lockSvg(){
  var s = [], i, a, x, y, cx = 104, cy = 140;
  s.push('<svg viewBox="0 0 440 266" role="group" aria-label="Замок зажигания и его контакты: ACC, ON, START">');
  s.push('<circle cx="104" cy="140" r="80" fill="#262626" stroke="#4A4A4A" stroke-width="3"/><circle cx="104" cy="140" r="62" fill="#1E1E1E" stroke="#3A3A3A" stroke-width="2"/>');
  for (i = 0; i < 4; i++){ a = ANG[i] * Math.PI / 180;
    s.push('<path d="M' + (cx + 66 * Math.sin(a)).toFixed(1) + ' ' + (cy - 66 * Math.cos(a)).toFixed(1) + 'L' + (cx + 76 * Math.sin(a)).toFixed(1) + ' ' + (cy - 76 * Math.cos(a)).toFixed(1) + '" stroke="#9AA3AD" stroke-width="3" stroke-linecap="round"/>');
    x = cx + 100 * Math.sin(a); y = cy - 100 * Math.cos(a) + 5;
    s.push('<g class="pos" data-p="' + i + '" tabindex="0" role="button" aria-label="Положение ' + PN[i] + '"><rect x="' + (x - 28).toFixed(1) + '" y="' + (y - 18).toFixed(1) + '" width="56" height="26" fill="#fff" fill-opacity="0"/><text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" text-anchor="middle">' + PN[i] + '</text></g>');
  }
  s.push('<circle class="cyl" cx="104" cy="140" r="34" fill="#8A949C" stroke-width="2"/><circle cx="104" cy="140" r="26" fill="none" stroke="#6E7880" stroke-width="1.5"/>');
  s.push('<text x="104" y="250" text-anchor="middle" class="lbl" font-size="12">личинка замка</text>');
  s.push('<g class="kh"><rect x="99" y="114" width="10" height="52" rx="2" fill="#2A2A2A"/><rect x="95" y="82" width="18" height="116" rx="9" fill="#333" stroke="#777" stroke-width="2"/><circle cx="104" cy="94" r="4.5" fill="#FFA500"/></g>');
  /* контакты */
  s.push('<text class="lbl" x="246" y="50" font-size="12">+12 В от АКБ</text>');
  s.push('<path class="wr" d="M252 58V224"/><path class="vv" d="M252 58V224"/>');
  var R = [[104,'ACC','магнитола'],[164,'ON','приборы, ЭБУ'],[224,'START','стартер']];
  R.forEach(function(r, k){ var y = r[0], dev;
    if (k === 0) dev = '<rect x="370" y="' + (y - 16) + '" width="46" height="32" rx="4" fill="#222" stroke="#555" stroke-width="2"/><rect class="rad" x="376" y="' + (y - 10) + '" width="26" height="10" rx="2"/><circle cx="408" cy="' + (y + 7) + '" r="4" fill="#555"/>';
    else if (k === 1) dev = '<path d="M372 ' + (y + 10) + 'A22 22 0 0 1 416 ' + (y + 10) + '" fill="none" stroke="#555" stroke-width="4" stroke-linecap="round"/><path class="ndl" d="M394 ' + (y + 10) + 'L378 ' + (y + 4) + '" stroke="#FFA500" stroke-width="3" stroke-linecap="round" style="transform-origin:394px ' + (y + 10) + 'px"/><circle cx="394" cy="' + (y + 10) + '" r="3.5" fill="#9AA3AD"/>';
    else dev = gear(394, y, 14);
    s.push('<g class="row r' + (k + 1) + '"><path class="bl" d="M252 ' + y + 'H280" style="transform-origin:252px ' + y + 'px"/><circle cx="283" cy="' + y + '" r="4" fill="#9AA3AD"/>' +
      '<path class="wr" d="M287 ' + y + 'H364"/><path class="sg" d="M287 ' + y + 'H364"/>' +
      '<text class="rl" x="296" y="' + (y - 10) + '">' + r[1] + '</text>' + dev +
      '<text class="lbl" x="394" y="' + (y + 32) + '" text-anchor="middle" font-size="12">' + r[2] + '</text>' +
      (k === 1 ? '<path class="spk" d="M278 ' + (y - 8) + 'l5 5-4 2 5 5" fill="none" stroke="#FFE082" stroke-width="2.4" stroke-linejoin="round"/>' : '') + '</g>');
  });
  s.push('</svg>');
  return s.join('');
}

/* ---------- аварийное вскрытие ---------- */
function openSvg(){
  var s = [];
  s.push('<svg viewBox="0 0 440 284" role="group" aria-label="Машина с ключами внутри: проверка документов, аккуратное вскрытие, открыто">');
  s.push('<g transform="translate(-8 -8) scale(.7)">' +
    '<path d="M40 210 C40 182 58 170 92 164 L168 152 C196 118 232 94 300 90 L410 90 C452 90 486 112 516 150 L572 160 C600 166 612 184 612 210 L612 222 L40 222 Z" fill="#2B2B2B" stroke="#4A4A4A" stroke-width="4"/>' +
    '<path d="M206 150 C228 120 256 104 300 102 L352 102 L352 150 Z" fill="#3B4A57"/><path d="M366 102 L408 102 C440 102 466 120 488 150 L366 150 Z" fill="#3B4A57"/>' +
    '<path d="M359 102V214M196 156V214" stroke="#3E3E3E" stroke-width="3"/><path d="M320 166h22" stroke="#666" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M44 206 h22" stroke="#FFD54F" stroke-width="6" stroke-linecap="round"/><path d="M596 196 h16" stroke="#E53935" stroke-width="6" stroke-linecap="round"/>' +
    '<circle cx="150" cy="222" r="40" fill="#151515" stroke="#555" stroke-width="5"/><circle cx="150" cy="222" r="16" fill="#777"/>' +
    '<circle cx="500" cy="222" r="40" fill="#151515" stroke="#555" stroke-width="5"/><circle cx="500" cy="222" r="16" fill="#777"/>' +
    '<path class="door" d="M200 156 L206 150 C228 120 256 104 300 102 L356 102 V212 H200 Z" fill="none" stroke="#FFA500" stroke-width="5" stroke-dasharray="12 8"/></g>');
  s.push('<path d="M34 177H408" stroke="#2E2E2E" stroke-width="3"/>');
  /* ключ внутри */
  s.push('<g class="kin"><circle class="halo" cx="200" cy="84" r="16" fill="#FFA500" opacity=".25"/><circle cx="190" cy="84" r="6.5" fill="none" stroke="#FFA500" stroke-width="3.5"/><path d="M196 84h16v5M207 84v4" fill="none" stroke="#FFA500" stroke-width="3.5" stroke-linecap="round"/></g>');
  /* замок */
  s.push('<g class="prog"><circle cx="300" cy="34" r="27" fill="none" stroke="#FFA500" stroke-width="3" stroke-dasharray="38 132" stroke-linecap="round"/></g>');
  s.push('<path class="shk" d="M291 30V22a9 9 0 0 1 18 0V30" fill="none" stroke="#C9CED4" stroke-width="4"/><rect class="pbody" x="284" y="29" width="32" height="24" rx="4"/><circle cx="300" cy="39" r="3.5" fill="#111"/><path d="M300 41v6" stroke="#111" stroke-width="3"/>');
  s.push('<g class="okb"><circle cx="330" cy="22" r="11" fill="#5CC86C" stroke="#111" stroke-width="2"/><path d="M325 22l4 4 7-8" fill="none" stroke="#111" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></g>');
  /* документы */
  s.push('<g class="docs"><rect x="22" y="12" width="44" height="58" rx="3" fill="#ECEFF1"/><path d="M29 24h30M29 33h30M29 42h20" stroke="#9AA3AD" stroke-width="2"/>' +
    '<rect x="48" y="38" width="58" height="36" rx="4" fill="#CFD8DC" stroke="#90A4AE" stroke-width="1.5"/><rect x="54" y="44" width="14" height="18" rx="2" fill="#90A4AE"/><path d="M74 48h26M74 56h20M74 64h24" stroke="#90A4AE" stroke-width="2"/>' +
    '<g class="dok"><circle cx="104" cy="36" r="11" fill="#5CC86C" stroke="#111" stroke-width="2"/><path d="M99 36l4 4 7-8" fill="none" stroke="#111" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></g>' +
    '<g class="dno"><circle cx="104" cy="36" r="11" fill="#EF5350" stroke="#111" stroke-width="2"/><path d="M99 31l10 10m0-10l-10 10" stroke="#111" stroke-width="2.5" stroke-linecap="round"/></g></g>');
  /* шаги */
  s.push('<path d="M60 228H360" stroke="#3A3A3A" stroke-width="3"/><path class="pl" d="M60 228H60" stroke="#5CC86C" stroke-width="3"/>');
  var SM = ['locked','docs','work','done'];
  ['ключи внутри','документы','вскрытие','открыто'].forEach(function(l, i){ var x = 60 + 100 * i;
    s.push('<g class="stp" data-s="' + SM[i] + '" tabindex="0" role="button" aria-label="Шаг ' + (i + 1) + ': ' + l + '"><rect x="' + (x - 46) + '" y="206" width="92" height="68" fill="#fff" fill-opacity="0"/><circle class="stc" cx="' + x + '" cy="228" r="18"/><text class="n" x="' + x + '" y="233" text-anchor="middle">' + (i + 1) + '</text><text class="l" x="' + x + '" y="266" text-anchor="middle">' + l + '</text></g>'); });
  s.push('</svg>');
  return s.join('');
}

var VARS = {
 immo: {
  h2: 'Иммобилайзер и ключи',
  sub: 'Как машина узнаёт свой ключ. Выберите режим — покажу, что происходит и что делает мастер.',
  wa: 'Здравствуйте, Олег! Вопрос по иммобилайзеру и ключам.',
  km: 'Иммобилайзер',
  svg: immoSvg,
  modes: [
   {id:'ok', n:'Ключ распознан', wa:'Хочу проверить ключи.',
    h:'Ключ свой — пуск разрешён', t:'В головке ключа — маленькая метка (чип). Катушка-антенна вокруг замка «спрашивает» метку, иммобилайзер проверяет ответ и разрешает блоку двигателя запуск.',
    c:['Проверим, как читается каждый ключ','Проверим антенну и проводку к блоку','Проверим связь иммобилайзера с ЭБУ']},
   {id:'tag', n:'Метка не читается', wa:'Машина не видит ключ, мигает лампа иммобилайзера.',
    h:'Метка не читается — двигатель не запускается', t:'Мигает лампа иммобилайзера, а двигатель не запускается. Чип в ключе повреждён после падения или воды, а у смарт-ключа часто просто села батарейка.',
    c:['Проверяем, читается ли метка ключа','Меняем батарейку или корпус ключа','Если чип погиб — новый ключ, только при документах']},
   {id:'ant', n:'Обрыв антенны', wa:'Не читается ни один ключ.',
    h:'Не видит ни один ключ — подозреваем антенну', t:'Если не читается ни основной, ни запасной ключ — виновата чаще катушка-антенна на замке, её разъём или проводка к блоку.',
    c:['Проверяем катушку и её разъём','Ищем обрыв в проводке до блока','Меняем или восстанавливаем антенну']},
   {id:'new', n:'Новый ключ', wa:'Нужен новый или запасной ключ, документы на машину есть.',
    h:'Новый ключ — только при документах на машину', t:'Если ключ потерян или нужен запасной, делаем и прописываем его в иммобилайзер. Сначала проверяем документы на машину — без них не делаем.',
    c:['Проверяем документы на машину','Готовим ключ и прописываем метку','Проверяем запуск всеми ключами']}
  ]
 },
 lock: {
  h2: 'Ремонт замка зажигания',
  sub: 'Двигайте ползунок или нажимайте LOCK / ACC / ON / START — замок раздаёт питание по цепям.',
  wa: 'Здравствуйте, Олег! Проблема с замком зажигания.',
  km: 'Замок зажигания',
  svg: lockSvg,
  pos: [
   {h:'LOCK — всё выключено', t:'Все цепи замка разомкнуты. Ключ можно вынуть, руль блокируется.'},
   {h:'ACC — магнитола и прикуриватель', t:'Плюс от аккумулятора идёт на магнитолу и прикуриватель. Двигатель и приборы выключены.'},
   {h:'ON — зажигание включено', t:'Работают приборы, блок двигателя, бензонасос. В этом положении ключ стоит всю поездку.'},
   {h:'START — крутит стартер', t:'Плюс идёт на реле стартера, магнитола на время прокрутки обычно отключается. Отпустите ключ — пружина вернёт его в ON.'}
  ],
  modes: [
   {id:'ok', n:'Исправен', wa:'Хочу проверить замок зажигания.',
    c:['Проверяем, что каждое положение даёт питание куда нужно','Замеряем падение напряжения на контактах','Проверяем разъём замка на подгорание']},
   {id:'wear', n:'Износ контактов', wa:'Пропадает зажигание, мигают приборы.',
    h:'Износ контактов: пропадает зажигание', t:'Контакты подгорают от больших токов. На ходу мигают приборы или глохнет двигатель, если задеть ключ, стартер крутит не с первого раза.',
    c:['Замеряем падение напряжения на контактах','Меняем контактную группу','Проверяем разъём — бывает оплавлен']},
   {id:'jam', n:'Заедает личинка', wa:'Ключ туго поворачивается или не поворачивается.',
    h:'Ключ не поворачивается — заедает личинка', t:'Износ личинки или стёршийся ключ: ключ туго входит, не поворачивается или проворачивается через раз. Силой крутить не стоит — можно сломать ключ в замке.',
    c:['Проверяем ключ и личинку','Ремонтируем или меняем личинку','Новый ключ — только при документах на машину']}
  ]
 },
 open: {
  h2: 'Аварийное вскрытие автомобиля',
  sub: 'Ключи остались в машине? Нажимайте шаги — покажу, как работает мастер. Вскрываем только при документах на машину.',
  wa: 'Здравствуйте, Олег! Нужно аварийно вскрыть машину — ключи остались внутри.',
  km: 'Вскрытие',
  svg: openSvg,
  modes: [
   {id:'locked', n:'Ключи в машине', step:0, wa:'Документы на машину есть.',
    h:'Ключи остались в машине, двери закрылись', t:'Бывает: ключ на сиденье, дверь захлопнулась или сработал автозамок. Не бейте стекло — позвоните мастеру.',
    c:['Уточним машину и как она закрылась','Проверим документы на машину на месте','Откроем аккуратно, без повреждений']},
   {id:'docs', n:'Документы', step:1, wa:'Документы на машину есть.',
    h:'Сначала — документы', t:'Вскрываем только машину, на которую у вас есть право. Перед работой проверяем документы на машину и личность владельца.',
    c:['Техпаспорт (свидетельство о регистрации)','Удостоверение личности','Без подтверждения права на машину — не вскрываем']},
   {id:'work', n:'Вскрытие', step:2, wa:'Документы на машину есть.',
    h:'Аккуратно, без повреждений', t:'Открываем дверь аккуратно — без поломки замка, стекла и уплотнителей. Способ зависит от машины.',
    c:['Подбираем способ под конкретную машину','Работаем без повреждений замка и стекла','Проверяем, что замки работают как раньше']},
   {id:'done', n:'Открыто', step:3, wa:'Документы на машину есть.',
    h:'Открыто — ключи у владельца', t:'Если ключ потерян или сломан, можно сделать и прописать новый — тоже только при документах на машину.',
    c:['Проверяем работу замков','При необходимости — новый ключ и прописка','Проверяем запуск двигателя']},
   {id:'nodoc', n:'Нет документов', step:-1, wa:'Подскажите, какие документы нужны для вскрытия.',
    h:'Нет документов — не вскрываем', t:'Это защита для всех владельцев: мы не открываем машину, пока нет подтверждения, что она ваша.',
    c:['Подготовьте документы на машину','Нужен владелец или документы, подтверждающие право','Позвоните — подскажем, что взять']}
  ]
 }
};

AO_SITE.reg('key', {css: CSS, html: '<div class="aox w-key"><div class="L"></div><div class="card" aria-live="polite"></div></div>', init: function(R, U, ds){
  var vid = ds.mode === 'lock' ? 'lock' : ds.mode === 'open' ? 'open' : 'immo', V = VARS[vid];
  var L = R.querySelector('.L'), C = R.querySelector('.card');
  if (U.reduce) R.classList.add('rm');
  R.classList.add('v-' + vid);
  L.innerHTML = '<h2>' + V.h2 + '</h2><p class="sub">' + V.sub + '</p>' + V.svg() +
    (vid === 'lock' ? '<label class="rng">Поверните ключ<input type="range" min="0" max="3" step="1" value="0" aria-valuetext="LOCK"></label><div class="ticks" aria-hidden="true"><span>LOCK</span><span>ACC</span><span>ON</span><span>START</span></div>' : '') +
    '<div class="tabs" role="group" aria-label="Режимы">' + V.modes.map(function(m){ return '<button type="button" class="chip" data-m="' + m.id + '" aria-pressed="false">' + m.n + '</button>'; }).join('') + '</div>';
  C.innerHTML = '<span class="k"></span><h3></h3><p class="t"></p><ul></ul>' + U.ctas(V.wa);
  var K = C.querySelector('.k'), H = C.querySelector('h3'), T = C.querySelector('.t'), UL = C.querySelector('ul'), WA = C.querySelector('.btn.w');
  var MODE = {}, ids = [], st = null, used = false, vis = false;
  V.modes.forEach(function(m){ MODE[m.id] = m; ids.push(m.id); });
  function fill(k, h, t, c, wa){
    K.textContent = k; H.textContent = h; T.textContent = t;
    UL.innerHTML = c.map(function(x){ return '<li>' + x + '</li>'; }).join('');
    WA.href = U.wa(V.wa + ' ' + wa);
  }
  function chips(id){ L.querySelectorAll('.chip').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-m') === id ? 'true' : 'false'); }); }

  /* --- замок зажигания: положение ключа + режим --- */
  var p = 0, back = null, KH, RNG, ROWS;
  if (vid === 'lock'){
    KH = L.querySelector('.kh'); RNG = L.querySelector('input'); ROWS = L.querySelectorAll('.row');
  }
  function lockPaint(){
    KH.style.transform = 'rotate(' + ANG[p] + 'deg)';
    RNG.value = p; RNG.setAttribute('aria-valuetext', PN[p]);
    var on = [p === 1 || p === 2, p >= 2, p === 3];
    for (var i = 0; i < 3; i++){
      ROWS[i].classList.toggle('on', on[i]);
      ROWS[i].querySelector('.bl').style.transform = on[i] ? 'rotate(0deg)' : 'rotate(-28deg)';
    }
    var nd = ROWS[1].querySelector('.ndl'); nd.style.transform = on[1] ? 'rotate(62deg)' : 'rotate(0deg)';
    L.querySelectorAll('.pos').forEach(function(e){ e.classList.toggle('on', +e.getAttribute('data-p') === p); });
    var m = MODE[st];
    if (st === 'ok') fill(V.km + ': ' + PN[p], V.pos[p].h, V.pos[p].t, m.c, m.wa);
    else fill(V.km + ': ' + m.n.toLowerCase(), m.h, m.t, m.c, m.wa);
  }
  function setPos(n){
    clearTimeout(back);
    if (st === 'jam' && n > 0){
      p = 0; lockPaint(); RNG.value = n;
      KH.classList.remove('shake'); void KH.getBoundingClientRect(); KH.classList.add('shake');
      back = setTimeout(function(){ KH.classList.remove('shake'); RNG.value = 0; }, 520);
      return;
    }
    p = n; lockPaint();
    if (p === 3) back = setTimeout(function(){ if (p === 3){ p = 2; lockPaint(); } }, 1700);
  }

  /* --- вскрытие: шаги --- */
  function openPaint(m){
    var stp = L.querySelectorAll('.stp'), i, cls;
    for (i = 0; i < 4; i++){
      if (m.step < 0) cls = i === 0 ? 'done' : i === 1 ? 'no' : 'off';
      else cls = i < m.step ? 'done' : i === m.step ? (m.step === 3 ? 'done' : 'cur') : '';
      stp[i].setAttribute('class', 'stp ' + cls);
      stp[i].setAttribute('aria-pressed', i === m.step ? 'true' : 'false');
    }
    var x = m.step < 0 ? 160 : 60 + 100 * m.step;
    L.querySelector('.pl').setAttribute('d', 'M60 228H' + x);
    L.querySelector('.pl').setAttribute('stroke', m.step < 0 ? '#EF5350' : '#5CC86C');
  }

  function setMode(id){
    var m = MODE[id]; st = id;
    R.setAttribute('data-st', id); chips(id);
    if (vid === 'lock'){ if (id === 'jam'){ clearTimeout(back); p = 0; } else if (id === 'wear' && p < 2) p = 2; lockPaint(); return; }
    if (vid === 'open') openPaint(m);
    fill(V.km + ': ' + m.n.toLowerCase(), m.h, m.t, m.c, m.wa);
  }
  function touch(){ used = true; }
  L.addEventListener('click', function(e){
    var c = e.target.closest('.chip'), ps = e.target.closest('.pos'), sp = e.target.closest('.stp');
    if (c){ touch(); setMode(c.getAttribute('data-m')); U.buzz(); }
    else if (sp){ touch(); setMode(sp.getAttribute('data-s')); U.buzz(); }
    else if (ps){ touch(); setPos(+ps.getAttribute('data-p')); U.buzz(); }
  });
  L.addEventListener('keydown', function(e){
    var ps = e.target.closest && e.target.closest('.pos'), sp = e.target.closest && e.target.closest('.stp');
    if (ps && (e.key === 'Enter' || e.key === ' ')){ e.preventDefault(); touch(); setPos(+ps.getAttribute('data-p')); }
    if (sp && (e.key === 'Enter' || e.key === ' ')){ e.preventDefault(); touch(); setMode(sp.getAttribute('data-s')); }
  });
  if (RNG) RNG.addEventListener('input', function(){ touch(); setPos(+RNG.value); });
  R.addEventListener('click', touch); R.addEventListener('keydown', touch);
  setMode(ids[0]);
  U.seen(R, function(v){ vis = v; R.classList.toggle('is-off', !v); });
  /* автопоказ */
  var seq = vid === 'lock' ? [['ok',1],['ok',2],['ok',3],['wear',2],['jam',1],['ok',0]] : null, si = 0;
  if (!U.reduce) setInterval(function(){
    if (used || !vis || document.hidden) return;
    if (seq){ var q = seq[si]; si = (si + 1) % seq.length; if (q[0] !== st) setMode(q[0]); setPos(q[1]); }
    else setMode(ids[(ids.indexOf(st) + 1) % ids.length]);
  }, 3500);
}});
})();
