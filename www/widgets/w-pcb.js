/* «Ремонт электронных блоков» — плата ЭБУ, коммутатор зажигания (data-mode="kommutator"),
   электроника сельхозтехники (data-mode="agro"). avtoelektrik-pro.kz */
(function(){
var P = '.w-pcb';
var CSS = [
P+'{--ok:#5CC86C;--bad:#EF5350}',
P+' .tabs .chip{min-height:40px;padding:9px 12px}',
P+' .zn{cursor:pointer;outline:none}',
P+' .zh{fill:#fff;fill-opacity:0}',
P+' .zo{fill:none;stroke:#FFA500;stroke-width:2;stroke-dasharray:6 5;opacity:0;transition:opacity .2s}',
'@media (hover:hover){'+P+' .zn:hover .zo{opacity:.6}}',
P+' .zn.on .zo{opacity:1}',
P+' .zn:focus-visible .zo{opacity:1;stroke:#4FC3F7;stroke-width:3}',
P+' .hs .c{fill:#FFA500;stroke:#fff;stroke-width:2.5}',
P+' .hs .p{fill:none;stroke:#FFA500;stroke-width:2;opacity:0;transform-box:fill-box;transform-origin:center;animation:wpcb-p 2.4s ease-out infinite}',
P+' .hs text{fill:#111;font-size:15px;font-weight:700;pointer-events:none}',
P+' .zn.on .hs .c{fill:#fff;stroke:#FFA500;stroke-width:3}',
'@keyframes wpcb-p{0%{opacity:.9;transform:scale(.8)}80%,100%{opacity:0;transform:scale(2.1)}}',
P+' .lbl{fill:#C9CED4;font-size:14px}',
P+' .cu{fill:none;stroke:#2F6446;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}',
P+' .wr{fill:none;stroke:#5B6A77;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}',
P+' .sg{fill:none;stroke:#FFA500;stroke-width:2.4;stroke-linecap:round;stroke-dasharray:4 16;animation:wpcb-f 1s linear infinite}',
'@keyframes wpcb-f{to{stroke-dashoffset:-40}}',
'@keyframes wpcb-bl{50%{opacity:.2}}',
'@keyframes wpcb-fl{0%{opacity:1}33%{opacity:.1}66%{opacity:.75}}',
P+' .lcd{display:flex;align-items:center;gap:10px;margin-top:10px;font-size:13px;white-space:nowrap;overflow:hidden}',
P+' .lcd .d{width:10px;height:10px;border-radius:50%;background:#2E7D32;flex:none}',
P+' .lcd .lt{overflow:hidden;text-overflow:ellipsis}',
P+'.bad .lcd .d{background:#C62828;animation:wpcb-bl 1s steps(2) infinite}',
/* ЭБУ */
P+' .wd,'+P+' .cor,'+P+' .smk,'+P+' .crk,'+P+' .wet{opacity:0;transition:opacity .35s}',
P+'[data-st=water] .wd,'+P+'[data-st=water] .cor{opacity:1}',
P+'[data-st=water] .wet{opacity:.22}',
P+'[data-st=drv] .smk,'+P+'[data-st=drv] .crk{opacity:1}',
P+' .wd path{fill:#4FC3F7;opacity:.9;animation:wpcb-dr 2.6s ease-in-out infinite}',
'@keyframes wpcb-dr{50%{transform:translateY(3px)}}',
P+' .smk circle{fill:#9AA3AD;opacity:.45;transform-box:fill-box;transform-origin:center;animation:wpcb-smk 2.4s ease-out infinite}',
P+' .smk circle:nth-child(2){animation-delay:.8s}'+P+' .smk circle:nth-child(3){animation-delay:1.6s}',
'@keyframes wpcb-smk{0%{transform:translateY(0) scale(.5);opacity:0}25%{opacity:.75}100%{transform:translateY(-36px) scale(1.7);opacity:0}}',
P+' .bd{transition:fill .3s,stroke .3s}',
P+'[data-st=drv] .d1 .bd{fill:#4A1717;stroke:#EF5350}',
P+'[data-st=nocomm] .canc{stroke:#EF5350;stroke-width:3;animation:wpcb-bl 1s steps(2) infinite}',
P+'[data-st=nocomm] .sg.g-can,'+P+'[data-st=drv] .sg.g-d1{stroke:#EF5350;animation:none;stroke-dasharray:3 6}',
P+'[data-st=water] .sg{animation:wpcb-f 1s linear infinite,wpcb-fl 1.3s steps(3) infinite}',
P+'[data-st=water] .sg.g-in{animation-delay:0s,.4s}'+P+'[data-st=water] .sg.g-can{stroke:#EF5350}',
/* коммутатор */
P+' .whl{transform-box:fill-box;transform-origin:center;animation:wpcb-rot 3.2s linear infinite}',
'@keyframes wpcb-rot{to{transform:rotate(360deg)}}',
P+' .spk{opacity:0}',
P+'[data-st=ok] .spk,'+P+'[data-st=heat] .spk{animation:wpcb-spk .8s linear infinite}',
'@keyframes wpcb-spk{0%,16%{opacity:1}17%,100%{opacity:0}}',
P+'[data-st=miss] .spk{animation:wpcb-spm 2.4s linear infinite}',
'@keyframes wpcb-spm{0%,5%{opacity:1}5.5%,33%{opacity:0}33.4%,38%{opacity:1}38.5%,100%{opacity:0}}',
P+'[data-st=heat] .hon{animation:wpcb-hon 4s linear infinite}',
P+'[data-st=heat] .hoff{animation:wpcb-hoff 4s linear infinite}',
'@keyframes wpcb-hon{0%,55%{opacity:1}56%,95%{opacity:0}96%,100%{opacity:1}}',
'@keyframes wpcb-hoff{0%,55%{opacity:0}56%,95%{opacity:1}96%,100%{opacity:0}}',
P+' .heat{opacity:0}',
P+'[data-st=heat] .heat{opacity:.4;animation:wpcb-heat 4s ease-in infinite}',
'@keyframes wpcb-heat{0%{opacity:0}55%,95%{opacity:.55}100%{opacity:0}}',
P+' .c2{display:none}',
P+'[data-st=ok] .c2.ok,'+P+'[data-st=heat] .c2.ok,'+P+'[data-st=heat] .c2.hflat,'+P+'[data-st=nospark] .c2.flat,'+P+'[data-st=miss] .c2.miss{display:inline}',
P+' svg svg{width:336px;height:100px;overflow:hidden}',
P+' .scope{animation:wpcb-sc 2.4s linear infinite}',
'@keyframes wpcb-sc{to{transform:translateX(-240px)}}',
P+' .tr{stroke:#9AA3AD;transition:stroke .3s}',
P+'[data-st=nospark] .tr{stroke:#EF5350}',
P+' .nx{opacity:0}'+P+'[data-st=nospark] .nx{opacity:1}',
P+'[data-st=nospark] .sg.g-out,'+P+'[data-st=nospark] .sg.g-hv{display:none}',
P+'[data-st=miss] .sg.g-out,'+P+'[data-st=miss] .sg.g-hv{animation:wpcb-f 1s linear infinite,wpcb-fl 1.2s steps(3) infinite}',
/* сельхозтехника */
P+' .okt{display:inline}'+P+' .not{display:none}',
P+'[data-st=lost] .r2 .okt,'+P+'[data-st=bus] .okt{display:none}',
P+'[data-st=lost] .r2 .not,'+P+'[data-st=bus] .not{display:inline}',
P+' .ind,'+P+' .led{fill:#5CC86C}',
P+'[data-st=lost] .r2 .ind,'+P+'[data-st=bus] .ind{fill:#EF5350}',
P+'[data-st=lost] .b2 .bx,'+P+'[data-st=bus] .bx{stroke:#EF5350}',
P+'[data-st=lost] .b2 .led,'+P+'[data-st=bus] .led{fill:#EF5350;animation:wpcb-bl 1s steps(2) infinite}',
P+'[data-st=lost] .sg.g-b2,'+P+'[data-st=bus] .sg{stroke:#EF5350;animation:none;stroke-dasharray:3 6}',
P+' .brk{opacity:0}'+P+'[data-st=bus] .brk{opacity:1}',
P+' .scr{transition:fill .3s}'+P+' .ui{transition:opacity .3s}',
P+'[data-st=dark] .scr{fill:#050505}'+P+'[data-st=dark] .ui{opacity:0}'+P+'[data-st=dark] .pled{fill:#333}'+P+'[data-st=dark] .mm{fill:#111;stroke:#333}',
P+'[data-st=dark] .sg.g-mon{stroke:#EF5350;animation:none;stroke-dasharray:3 6}',
P+' .ndl{transform-box:fill-box;transform-origin:0% 50%;animation:wpcb-ndl 3s ease-in-out infinite}',
'@keyframes wpcb-ndl{50%{transform:rotate(-14deg)}}',
/* пауза вне экрана и «меньше движения» */
P+'.is-off *{animation-play-state:paused!important}',
P+'.rm *{animation:none!important;transition:none!important}',
P+'.rm[data-st=heat] .hoff{display:none}',
'@media (prefers-reduced-motion:reduce){'+P+' *{animation:none!important;transition:none!important}}'
].join('\n');

function zones(list){
  return list.map(function(z, i){
    var r = 'x="' + z.r[0] + '" y="' + z.r[1] + '" width="' + z.r[2] + '" height="' + z.r[3] + '" rx="10"';
    return '<g class="zn" data-z="' + z.id + '" tabindex="0" role="button" aria-label="' + (i + 1) + '. ' + z.n + '">' +
      '<rect class="zh" ' + r + '/><rect class="zo" ' + r + '/>' +
      '<g class="hs"><circle class="p" cx="' + z.hx + '" cy="' + z.hy + '" r="13"/><circle class="c" cx="' + z.hx + '" cy="' + z.hy + '" r="13"/>' +
      '<text x="' + z.hx + '" y="' + (z.hy + 5) + '" text-anchor="middle">' + (i + 1) + '</text></g></g>';
  }).join('');
}
function paths(list, cls){ return list.map(function(d){ return '<path class="' + cls + '" d="' + d + '"/>'; }).join(''); }

/* ---------- ЭБУ: схематичная плата ---------- */
function ecuSvg(Z){
  var s = [], i, x, k, y;
  s.push('<svg viewBox="0 0 440 300" role="group" aria-label="Схема платы блока управления: питание, процессор, драйверы, CAN-трансивер, разъём">');
  s.push('<rect x="8" y="8" width="424" height="230" rx="14" fill="#13251A" stroke="#2C4A37" stroke-width="2"/>');
  s.push('<g class="wet" fill="#B2DFDB"><ellipse cx="70" cy="214" rx="40" ry="14"/><ellipse cx="250" cy="226" rx="70" ry="10"/><ellipse cx="392" cy="212" rx="30" ry="16"/><ellipse cx="146" cy="110" rx="22" ry="12"/></g>');
  [[24,24],[416,24],[24,222],[416,222]].forEach(function(p){ s.push('<circle cx="' + p[0] + '" cy="' + p[1] + '" r="6" fill="#0B0B0B" stroke="#3B5A46" stroke-width="2"/>'); });
  var T = {
    pwr: ['M93 226V174', 'M93 150V140H46V71', 'M70 128V140', 'M90 128V132H128L150 110H162', 'M118 63V132'],
    inp: ['M123 226V200L141 182H182V132', 'M138 226V206L152 192H190V132', 'M153 226V212L163 202H198V132', 'M198 226V216L210 204H214V132'],
    cpu: ['M250 120H266V126', 'M152 62H162', 'M152 76H162'],
    can: ['M222 132V154L246 178H264', 'M230 132V146L252 168H273V178', 'M273 212V226', 'M291 212V217L288 220V226'],
    d0: ['M250 64H292L312 44H322', 'M368 44H416V173L363 226'],
    d1: ['M250 80H322', 'M368 80H408V166L348 226'],
    d2: ['M250 96H296L316 116H322', 'M368 116H400V159L333 226'],
    d3: ['M250 112H282L322 152', 'M368 152H392L318 226']
  };
  for (k in T) s.push(paths(T[k], 'cu'));
  /* питание: конденсаторы, стабилизатор, диод */
  s.push('<circle cx="46" cy="56" r="15" fill="#2E3B45" stroke="#6E7F8C" stroke-width="2"/><path d="M38 56h16M46 48v16" stroke="#56656F" stroke-width="1.6"/>');
  s.push('<circle cx="118" cy="52" r="11" fill="#2E3B45" stroke="#6E7F8C" stroke-width="2"/><path d="M112 52h12M118 46v12" stroke="#56656F" stroke-width="1.4"/>');
  s.push('<rect x="58" y="78" width="44" height="10" rx="1.5" fill="#8A949C"/><rect x="61" y="88" width="38" height="30" rx="2" fill="#222" stroke="#454545" stroke-width="1.5"/>');
  s.push('<path d="M70 118v10M80 118v10M90 118v10" stroke="#B79A5B" stroke-width="3"/>');
  s.push('<rect x="87" y="150" width="12" height="24" rx="2" fill="#222" stroke="#454545" stroke-width="1.5"/><rect x="87" y="150" width="12" height="4" fill="#9AA3AD"/>');
  s.push('<rect x="106" y="150" width="10" height="6" rx="1" fill="#C8A97E"/><rect x="106" y="162" width="10" height="6" rx="1" fill="#C8A97E"/><rect x="58" y="150" width="12" height="6" rx="1" fill="#2B2B2B" stroke="#B79A5B" stroke-width="1"/>');
  /* кварц, процессор, память */
  s.push('<rect x="140" y="56" width="12" height="26" rx="6" fill="#A7AFB7" stroke="#C9CED4" stroke-width="1"/>');
  var pins = [];
  for (i = 0; i < 9; i++){ x = 174 + 8 * i; y = 56 + 8 * i;
    pins.push('M' + x + ' 44v6M' + x + ' 126v6M162 ' + y + 'h6M244 ' + y + 'h6'); }
  s.push('<path d="' + pins.join('') + '" stroke="#B79A5B" stroke-width="2.5"/>');
  s.push('<rect x="168" y="50" width="76" height="76" rx="4" fill="#1B1B1B" stroke="#3A3A3A" stroke-width="2"/><rect x="178" y="60" width="56" height="56" rx="3" fill="none" stroke="#262626" stroke-width="1.5"/><circle cx="176" cy="58" r="2.5" fill="#4A4A4A"/>');
  s.push('<path d="M258 126v6M266 126v6M274 126v6M282 126v6M258 156v6M266 156v6M274 156v6M282 156v6" stroke="#B79A5B" stroke-width="2.5"/>');
  s.push('<rect x="252" y="132" width="36" height="24" rx="2" fill="#1B1B1B" stroke="#3A3A3A" stroke-width="1.5"/><circle cx="257" cy="137" r="1.8" fill="#4A4A4A"/>');
  /* драйверы */
  for (k = 0; k < 4; k++){ y = 30 + 36 * k;
    s.push('<g class="d' + k + '"><path d="M322 ' + (y + 6) + 'h8M322 ' + (y + 14) + 'h8M322 ' + (y + 22) + 'h8" stroke="#B79A5B" stroke-width="3"/>' +
      '<rect x="358" y="' + (y - 3) + '" width="10" height="34" rx="1.5" fill="#8A949C"/>' +
      '<rect class="bd" x="330" y="' + y + '" width="28" height="28" rx="2" fill="#222" stroke="#454545" stroke-width="1.5"/></g>'); }
  s.push('<path class="crk" d="M336 70l7 8-5 5 8 8" fill="none" stroke="#EF5350" stroke-width="2"/>');
  /* CAN-трансивер */
  s.push('<path d="M264 178v6M273 178v6M282 178v6M291 178v6M264 206v6M273 206v6M282 206v6M291 206v6" stroke="#B79A5B" stroke-width="2.5"/>');
  s.push('<rect class="canc" x="258" y="184" width="40" height="22" rx="2" fill="#1B1B1B" stroke="#3A3A3A" stroke-width="1.5"/>');
  /* сигналы поверх дорожек */
  var G = {pwr: 'g-pwr', inp: 'g-in', cpu: 'g-cpu', can: 'g-can', d0: 'g-drv', d1: 'g-drv g-d1', d2: 'g-drv', d3: 'g-drv'};
  for (k in T) s.push(paths(T[k], 'sg ' + G[k]));
  /* разъём */
  var legs = [];
  for (i = 0; i < 20; i++) legs.push('M' + (78 + 15 * i) + ' 226v20');
  s.push('<path d="' + legs.join('') + '" stroke="#B79A5B" stroke-width="3"/>');
  s.push('<rect x="56" y="242" width="328" height="50" rx="8" fill="#262626" stroke="#454545" stroke-width="2"/><rect x="66" y="252" width="308" height="30" rx="4" fill="#151515"/>');
  var ph = [];
  for (i = 0; i < 20; i++){ x = 78 + 15 * i; ph.push('<rect x="' + (x - 3) + '" y="256" width="6" height="8" rx="1" fill="#B79A5B"/><rect x="' + (x - 3) + '" y="270" width="6" height="8" rx="1" fill="#8C7646"/>'); }
  s.push(ph.join(''));
  s.push('<g class="cor">' + [1,2,7,12,13,17].map(function(n){ x = 78 + 15 * n; return '<circle cx="' + x + '" cy="261" r="5" fill="#9CCC65"/><circle cx="' + (x + 3) + '" cy="275" r="3.4" fill="#E8F5E9"/>'; }).join('') + '</g>');
  /* вода и дым */
  s.push('<g class="wd">' + [[62,196],[134,98],[300,34],[236,222],[404,200],[120,250],[300,262]].map(function(p){ return '<g transform="translate(' + p[0] + ' ' + p[1] + ') scale(1.2)"><path d="M0-9C4-3 6 0 6 3A6 6 0 0 1-6 3C-6 0-4-3 0-9Z"/></g>'; }).join('') + '</g>');
  s.push('<g class="smk"><circle cx="352" cy="62" r="7"/><circle cx="362" cy="58" r="6"/><circle cx="344" cy="58" r="6"/></g>');
  s.push(zones(Z));
  s.push('</svg>');
  return s.join('');
}

/* ---------- коммутатор (модуль зажигания) ---------- */
function komSvg(Z){
  var s = [], i, x0, c1 = 'M0 34', c2 = 'M0 72', cm = 'M0 72';
  for (i = 0; i < 8; i++){ x0 = i * 80;
    c1 += 'H' + (x0 + 20) + 'V16H' + (x0 + 60) + 'V34H' + (x0 + 80);
    c2 += 'H' + (x0 + 30) + 'V84H' + (x0 + 50) + 'L' + (x0 + 51) + ' 44L' + (x0 + 53) + ' 64H' + (x0 + 62) + 'L' + (x0 + 64) + ' 78L' + (x0 + 66) + ' 68L' + (x0 + 68) + ' 74L' + (x0 + 70) + ' 72H' + (x0 + 80);
    if (i % 3 === 2) cm += 'H' + (x0 + 80);
    else cm += 'H' + (x0 + 30) + 'V84H' + (x0 + 50) + 'L' + (x0 + 51) + ' 44L' + (x0 + 53) + ' 64H' + (x0 + 62) + 'L' + (x0 + 64) + ' 78L' + (x0 + 66) + ' 68L' + (x0 + 68) + ' 74L' + (x0 + 70) + ' 72H' + (x0 + 80);
  }
  s.push('<svg viewBox="0 0 440 300" role="group" aria-label="Схема зажигания: датчик, коммутатор, катушка, свеча и осциллограмма импульсов">');
  /* датчик и диск */
  s.push('<g transform="translate(56 80)"><g class="whl"><circle r="30" fill="#1B1B1B" stroke="#5B6A77" stroke-width="10" stroke-dasharray="23.56 23.56"/><circle r="20" fill="#1B1B1B" stroke="#3A3A3A" stroke-width="2"/><circle r="7" fill="#9AA3AD"/></g></g>');
  s.push('<rect x="94" y="62" width="20" height="36" rx="3" fill="#2B2B2B" stroke="#5B6A77" stroke-width="2"/><rect x="94" y="74" width="8" height="12" fill="#111"/>');
  s.push('<text class="lbl" x="60" y="136" text-anchor="middle">датчик</text>');
  /* провода */
  s.push('<path class="wr" d="M114 80H140"/><path class="wr" d="M240 84H270"/>');
  s.push('<path d="M298 24C298 0 392 0 392 44" fill="none" stroke="#5B6A77" stroke-width="5" stroke-linecap="round"/>');
  /* коммутатор */
  var fins = '';
  for (i = 0; i < 8; i++) fins += '<rect x="' + (146 + 12 * i) + '" y="32" width="6" height="12" rx="1" fill="#3A3A3A"/>';
  s.push(fins);
  s.push('<rect x="140" y="44" width="100" height="76" rx="8" fill="#262626" stroke="#4A4A4A" stroke-width="2"/>');
  s.push('<rect class="heat" x="140" y="44" width="100" height="76" rx="8" fill="#EF5350"/>');
  s.push('<g class="tr" fill="none" stroke-width="2.4" stroke-linecap="round"><circle cx="186" cy="84" r="18"/><path d="M178 72v24M164 84h14M178 78l14-9v-9M178 90l14 9v9"/><path d="M186 96l6 3-1-6" stroke-linejoin="round"/></g>');
  s.push('<path class="nx" d="M248 70l14 14m0-14l-14 14" stroke="#EF5350" stroke-width="3" stroke-linecap="round"/>');
  s.push('<text class="lbl" x="190" y="140" text-anchor="middle">коммутатор</text>');
  /* катушка */
  s.push('<rect x="290" y="24" width="16" height="18" rx="3" fill="#2B2B2B" stroke="#5B6A77" stroke-width="2"/>');
  s.push('<rect x="270" y="40" width="56" height="96" rx="10" fill="#22303A" stroke="#5B6A77" stroke-width="2"/>');
  var wnd = '';
  for (i = 0; i < 10; i++) wnd += 'M279 ' + (52 + 8 * i) + 'H317';
  s.push('<path d="' + wnd + '" stroke="#B87333" stroke-width="2.2" opacity=".9"/>');
  s.push('<text class="lbl" x="298" y="156" text-anchor="middle">катушка</text>');
  /* свеча */
  s.push('<rect x="386" y="44" width="12" height="10" rx="2" fill="#C9CED4"/><rect x="381" y="54" width="22" height="44" rx="7" fill="#ECEFF1"/>');
  s.push('<path d="M383 66h18M383 76h18M383 86h18" stroke="#C9CED4" stroke-width="2"/>');
  s.push('<rect x="377" y="98" width="30" height="16" rx="2" fill="#9AA3AD"/><rect x="384" y="114" width="16" height="22" fill="#7B868F"/><path d="M384 119h16M384 125h16M384 131h16" stroke="#5B6670" stroke-width="1.6"/>');
  s.push('<rect x="390" y="136" width="4" height="6" fill="#C9CED4"/><path d="M400 136V152H389" fill="none" stroke="#C9CED4" stroke-width="4"/>');
  s.push('<g class="hon"><g class="spk"><circle cx="392" cy="146" r="13" fill="#FFD54F" opacity=".45"/><path d="M392 141l-5 3 9 3-5 4" fill="none" stroke="#FFF59D" stroke-width="2.6" stroke-linejoin="round"/></g></g>');
  s.push('<text class="lbl" x="392" y="174" text-anchor="middle">свеча</text>');
  /* импульсы по проводам */
  s.push('<path class="sg g-in" d="M114 80H140"/><g class="hon"><path class="sg g-out" d="M240 84H270"/><path class="sg g-hv" d="M298 24C298 0 392 0 392 44"/></g>');
  /* осциллограф */
  s.push('<rect x="14" y="186" width="412" height="104" rx="10" fill="#0C1711" stroke="#24402D" stroke-width="2"/>');
  var grid = '';
  for (i = 0; i < 9; i++) grid += 'M' + (86 + 40 * i) + ' 190V286';
  s.push('<path d="' + grid + 'M86 238H422" stroke="#173322" stroke-width="1"/>');
  s.push('<text x="24" y="210" fill="#7FBF8E" font-size="12" font-weight="700">ДАТЧИК</text><text x="24" y="262" fill="#7FBF8E" font-size="12" font-weight="700">КАТУШКА</text>');
  s.push('<svg x="86" y="188" width="336" height="100" viewBox="0 0 336 100" overflow="hidden"><g class="scope" fill="none" stroke-width="2" stroke-linejoin="round">' +
    '<path d="' + c1 + '" stroke="#9FD5A8"/>' +
    '<g class="c2 ok hon"><path d="' + c2 + '" stroke="#FFA500"/></g>' +
    '<g class="c2 flat"><path d="M0 72H640" stroke="#EF5350"/></g>' +
    '<g class="c2 hflat hoff"><path d="M0 72H640" stroke="#EF5350"/></g>' +
    '<g class="c2 miss"><path d="' + cm + '" stroke="#FFA500"/></g>' +
    '</g></svg>');
  s.push(zones(Z));
  s.push('</svg>');
  return s.join('');
}

/* ---------- сельхозтехника: монитор и CAN-шина ---------- */
function agroSvg(Z){
  var s = [], x, h = 'M28 176', l = 'M28 186', a = 176, b = 186, t, i;
  for (x = 28; x < 412; x += 16){ h += 'C' + (x + 8) + ' ' + a + ' ' + (x + 8) + ' ' + b + ' ' + (x + 16) + ' ' + b; l += 'C' + (x + 8) + ' ' + b + ' ' + (x + 8) + ' ' + a + ' ' + (x + 16) + ' ' + a; t = a; a = b; b = t; }
  s.push('<svg viewBox="0 0 440 300" role="group" aria-label="Монитор в кабине, CAN-шина и блоки управления сельхозтехники">');
  /* трактор (контекст) */
  s.push('<rect x="270" y="58" width="7" height="32" rx="2" fill="#444"/>');
  s.push('<rect x="236" y="88" width="98" height="30" rx="7" fill="#2B2B2B" stroke="#4A4A4A" stroke-width="2"/>');
  s.push('<rect x="326" y="28" width="76" height="66" rx="7" fill="#2B2B2B" stroke="#4A4A4A" stroke-width="2"/><rect x="334" y="36" width="60" height="42" rx="4" fill="#3B4A57"/>');
  s.push('<rect class="mm" x="340" y="56" width="18" height="13" rx="2" fill="#0D1A14" stroke="#5CC86C" stroke-width="1.6"/>');
  s.push('<circle cx="372" cy="118" r="34" fill="#161616" stroke="#4A4A4A" stroke-width="8"/><circle cx="372" cy="118" r="12" fill="#555"/>');
  s.push('<circle cx="262" cy="132" r="19" fill="#161616" stroke="#4A4A4A" stroke-width="6"/><circle cx="262" cy="132" r="6" fill="#555"/>');
  /* монитор */
  s.push('<rect x="96" y="132" width="20" height="14" fill="#333"/><rect x="74" y="146" width="64" height="6" rx="3" fill="#333"/>');
  s.push('<path class="wr" d="M146 132V176M154 132V186"/>');
  s.push('<rect x="18" y="12" width="176" height="120" rx="12" fill="#222" stroke="#444" stroke-width="2"/><rect class="scr" x="28" y="22" width="156" height="96" rx="4" fill="#0D1A14"/><circle class="pled" cx="182" cy="125" r="3" fill="#5CC86C"/>');
  s.push('<g class="ui"><text x="36" y="38" fill="#7FBF8E" font-size="11" font-weight="700">БЛОКИ НА СВЯЗИ</text><path d="M34 44H178" stroke="#1E3A2A" stroke-width="1.5"/>');
  ['Двигатель','КПП','Гидравлика'].forEach(function(n, k){ var y = 64 + 20 * k;
    s.push('<g class="r' + (k + 1) + '"><rect class="ind" x="36" y="' + (y - 10) + '" width="10" height="10" rx="2"/><text x="54" y="' + y + '" fill="#E0E6EA" font-size="13">' + n + '</text>' +
      '<text class="okt" x="176" y="' + y + '" text-anchor="end" fill="#5CC86C" font-size="12" font-weight="700">OK</text><text class="not" x="176" y="' + y + '" text-anchor="end" fill="#EF5350" font-size="12" font-weight="700">НЕТ</text></g>'); });
  s.push('</g>');
  /* шина */
  s.push('<path d="' + l + '" fill="none" stroke="#5B6A77" stroke-width="3"/><path d="' + h + '" fill="none" stroke="#B9772A" stroke-width="3"/>');
  s.push('<path d="M28 176H22M28 186H22M412 176H418M412 186H418" stroke="#5B6A77" stroke-width="3"/>');
  s.push('<rect x="12" y="170" width="10" height="22" rx="2" fill="#C8A97E" stroke="#8D6E63"/><rect x="418" y="170" width="10" height="22" rx="2" fill="#C8A97E" stroke="#8D6E63"/>');
  s.push('<text x="12" y="164" fill="#9AA3AD" font-size="12">120 Ом</text><text x="428" y="164" fill="#9AA3AD" font-size="12" text-anchor="end">120 Ом</text>');
  /* блоки */
  var B = [[34,'ДВИГАТЕЛЬ'],[170,'КПП'],[306,'ГИДРАВЛИКА']];
  B.forEach(function(q, k){ var cx = q[0] + 50;
    s.push('<g class="b' + (k + 1) + '"><path class="wr" d="M' + (cx - 5) + ' 176V222M' + (cx + 5) + ' 186V222"/>' +
      '<rect class="bx" x="' + q[0] + '" y="222" width="100" height="50" rx="8" fill="#262626" stroke="#4A4A4A" stroke-width="2"/>' +
      '<circle class="led" cx="' + cx + '" cy="236" r="5"/><text x="' + cx + '" y="260" text-anchor="middle" fill="#fff" font-size="13" font-weight="700">' + q[1] + '</text></g>'); });
  /* сигналы */
  s.push('<path class="sg g-bus" d="' + h + '"/><path class="sg g-mon" d="M146 176V132"/>');
  B.forEach(function(q, k){ s.push('<path class="sg g-b' + (k + 1) + '" d="M' + (q[0] + 45) + ' 176V222"/>'); });
  s.push('<g class="brk"><circle cx="290" cy="181" r="14" fill="#EF5350" opacity=".25"/><path d="M286 166l9 12-8 2 9 14" fill="none" stroke="#EF5350" stroke-width="3" stroke-linejoin="round"/></g>');
  s.push(zones(Z));
  s.push('</svg>');
  return s.join('');
}

var VARS = {
 ecu: {
  h2: 'Ремонт электронных блоков управления',
  sub: 'Нажмите на зону платы — покажу, что в ней обычно выходит из строя. Режимы внизу — как ведёт себя блок.',
  wa: 'Здравствуйте, Олег! Нужен ремонт блока управления (ЭБУ).',
  km: 'Блок',
  svg: ecuSvg,
  zones: [
   {id:'pwr', n:'Питание и стабилизатор', r:[14,14,130,172], hx:80, hy:103,
    h:'Блок «мёртвый», не просыпается', t:'Чаще всего страдает после прикуривания, переполюсовки или скачка напряжения: пробивается защитный диод, сгорает стабилизатор, вздуваются конденсаторы.',
    c:['Замеряем питание и массы на разъёме','Проверяем стабилизатор и цепь защиты','Меняем сгоревшие элементы на плате']},
   {id:'cpu', n:'Процессор и память', r:[148,14,154,160], hx:206, hy:88,
    h:'Блок не запускается или ведёт себя странно', t:'Процессор сам выходит из строя редко — чаще виновато его питание или кварц. Сбой памяти даёт ошибки, плохой запуск, потерю настроек.',
    c:['Проверяем питание и тактирование процессора','Сохраняем копию памяти перед ремонтом','Проверяем работу блока на столе']},
   {id:'drv', n:'Драйверы форсунок и катушек', r:[306,16,122,160], hx:344, hy:116,
    h:'Не работает цилиндр, ошибка по цепи форсунки или катушки', t:'Драйвер — силовой ключ, который «щёлкает» форсунку или катушку. Если в форсунке, катушке или проводке замыкание — ключ перегревается и сгорает.',
    c:['Проверяем форсунку или катушку и проводку до блока','Меняем драйвер на плате','Проверяем импульсы на машине после ремонта']},
   {id:'can', n:'CAN-трансивер', r:[240,174,92,48], hx:316, hy:196,
    h:'Сканер не видит блок, куча ошибок связи', t:'Через CAN-шину блоки «разговаривают» между собой. Трансивер может сгореть от замыкания в шине, скачка напряжения или воды.',
    c:['Замеряем CAN-шину: сопротивление и напряжения','Ищем замыкание или обрыв в проводке шины','Меняем трансивер на плате']},
   {id:'conn', n:'Разъём', r:[50,238,340,58], hx:220, hy:267,
    h:'Работает через раз, ошибки «плавают»', t:'В разъём попадает влага — контакты окисляются, появляется плохой контакт и утечки между соседними контактами.',
    c:['Осматриваем и чистим контакты','Меняем окисленные контакты или колодку','Ищем, откуда попадает вода']}
  ],
  modes: [
   {id:'ok', n:'Исправен', lcd:'12.4 V · 5.0 V · CAN: OK', wa:'Хочу проверить блок.',
    h:'Блок исправен: питание есть, сигналы идут', t:'Плата получает питание, стабилизатор даёт ровные 5 вольт, процессор читает датчики и управляет форсунками и катушками, по CAN идёт обмен с другими блоками.',
    c:['Проверяем питание и массы блока','Смотрим связь со сканером и ошибки','Проверяем сигналы на выходах']},
   {id:'nocomm', n:'Нет связи', bad:1, lcd:'12.4 V · 5.0 V · CAN: НЕТ СВЯЗИ', wa:'Сканер не видит блок, нет связи.',
    h:'Сканер не видит блок', t:'Причина может быть в машине или в самом блоке: нет питания или массы, обрыв или замыкание CAN-линии в проводке, сгорел стабилизатор или CAN-трансивер.',
    c:['Проверяем питание и массы на разъёме блока','Замеряем CAN-линию в проводке','Если дело в блоке — ремонтируем на столе']},
   {id:'drv', n:'Сгорел драйвер', bad:1, lcd:'P0202 · ЦЕПЬ ФОРСУНКИ 2', wa:'Ошибка по цепи форсунки или катушки, подозреваю драйвер.',
    h:'Сгорел драйвер — не работает форсунка или катушка', t:'Обычно драйвер сгорает не сам: виновато замыкание в форсунке, катушке или проводке. Если просто поменять драйвер и не найти причину — он сгорит снова.',
    c:['Ищем причину: форсунка, катушка, проводка','Меняем драйвер на плате','Проверяем работу цилиндра на машине']},
   {id:'water', n:'Вода', bad:1, lcd:'СВЯЗЬ ПРОПАДАЕТ · ОШИБКИ ПЛАВАЮТ', wa:'В блок попала вода.',
    h:'В блок попала вода', t:'Вода и окислы замыкают дорожки и контакты: блок то работает, то нет, появляются странные ошибки, может пропасть связь. Чем раньше вскрыть и отмыть — тем лучше.',
    c:['Вскрываем блок и отмываем плату от окислов','Восстанавливаем дорожки и контакты разъёма','Ищем, откуда течёт, чтобы не повторилось']}
  ]
 },
 kommutator: {
  h2: 'Ремонт коммутатора зажигания',
  sub: 'Датчик даёт сигнал — коммутатор «щёлкает» катушку — на свече искра. Нажмите на узел или выберите режим.',
  wa: 'Здравствуйте, Олег! Нужна проверка коммутатора (модуля) зажигания.',
  km: 'Зажигание',
  svg: komSvg,
  zones: [
   {id:'sens', n:'Датчик (Холла или коленвала)', r:[14,34,108,110], hx:56, hy:80,
    h:'Нет сигнала — нет искры', t:'Коммутатор работает по сигналу датчика. Нет сигнала или он «грязный» — искры нет совсем или она пропадает.',
    c:['Проверяем сигнал датчика','Проверяем проводку от датчика до коммутатора','Меняем датчик, если он неисправен']},
   {id:'mod', n:'Коммутатор: силовой ключ', r:[130,22,118,124], hx:222, hy:62,
    h:'Пробит силовой ключ', t:'Внутри коммутатора мощный транзистор, который прерывает ток катушки. Он греется и со временем выходит из строя — особенно при неисправной катушке или плохой массе.',
    c:['Проверяем коммутатор на работу и при нагреве','Ремонтируем или меняем модуль','Проверяем катушку, чтобы модуль не сгорел снова']},
   {id:'coil', n:'Катушка зажигания', r:[256,14,80,150], hx:298, hy:88,
    h:'Слабая искра, пробой катушки', t:'Межвитковое замыкание или трещина в корпусе — искра слабая или уходит на массу, а коммутатор работает с перегрузкой.',
    c:['Замеряем сопротивление обмоток','Проверяем катушку на пробой','Меняем катушку при необходимости']},
   {id:'plug', n:'Свеча и высоковольтный провод', r:[350,30,80,152], hx:392, hy:76,
    h:'Искра есть, но не туда', t:'Изношенные свечи и пробитые высоковольтные провода дают пропуски и лишнюю нагрузку на катушку и коммутатор.',
    c:['Проверяем свечи и зазор','Проверяем высоковольтные провода','Смотрим искру по каждому цилиндру']},
   {id:'scope', n:'Импульсы на осциллографе', r:[14,186,412,104], hx:404, hy:204,
    h:'Смотрим импульсы осциллографом', t:'По форме импульсов видно, где проблема: нет сигнала от датчика, нет управления катушкой или пробой во вторичной цепи.',
    c:['Сигнал датчика на входе коммутатора','Управление катушкой на выходе','Форма искры по высокому напряжению']}
  ],
  modes: [
   {id:'ok', n:'Искра есть', lcd:'ИСКРА: ЕСТЬ · ИМПУЛЬСЫ РОВНЫЕ', wa:'Хочу проверить зажигание.',
    h:'Импульс — искра, импульс — искра', t:'Датчик даёт сигнал, коммутатор размыкает ток катушки — и на свече проскакивает искра. Всё в такт оборотам двигателя.',
    c:['Проверяем сигнал датчика на входе','Смотрим импульсы управления катушкой','Проверяем искру на свечах']},
   {id:'nospark', n:'Нет искры', bad:1, lcd:'ВХОД: ЕСТЬ · ВЫХОД: НЕТ', wa:'Стартер крутит, искры нет.',
    h:'Стартер крутит, искры нет', t:'Сигнал от датчика приходит, а импульсов на катушку нет: чаще всего пробит ключ в коммутаторе, нет питания или плохая масса модуля.',
    c:['Проверяем питание и массу коммутатора','Сравниваем сигнал на входе и выходе','Ремонтируем или меняем коммутатор']},
   {id:'miss', n:'Пропуски', bad:1, lcd:'ИСКРА: ПРОПУСКИ', wa:'Двигатель троит, пропуски искры.',
    h:'Троит, дёргается — искра пропадает', t:'Искра пропадает через раз: плохой контакт в разъёме, слабый сигнал датчика, пробой катушки или высоковольтных проводов.',
    c:['Проверяем разъёмы и массу','Смотрим импульсы осциллографом','Проверяем катушку, провода и свечи']},
   {id:'heat', n:'Глохнет на горячую', bad:1, lcd:'НА ГОРЯЧУЮ: ИСКРА ПРОПАДАЕТ', wa:'Глохнет на горячую, после остывания заводится.',
    h:'Глохнет на горячую, остынет — заводится', t:'Частая история с коммутатором: при нагреве ключ перестаёт работать, искра пропадает. Проверяем именно в момент, когда неисправность проявляется.',
    c:['Проверяем модуль на прогретом двигателе','Проверяем крепление и теплоотвод модуля','Ремонтируем или меняем модуль']}
  ]
 },
 agro: {
  h2: 'Ремонт электроники сельхозтехники',
  sub: 'Монитор в кабине и блоки на машине связаны CAN-шиной. Нажмите на узел или выберите режим.',
  wa: 'Здравствуйте, Олег! Нужен ремонт электроники сельхозтехники.',
  km: 'Техника',
  svg: agroSvg,
  zones: [
   {id:'mon', n:'Монитор в кабине', r:[12,6,190,150], hx:184, hy:22,
    h:'Монитор гаснет, перезагружается, не реагирует', t:'Причины — питание и масса, разъёмы, вибрация и влага, неисправность внутри самого монитора.',
    c:['Проверяем питание, массу и разъём','Ремонтируем монитор на столе','Проверяем связь с блоками после ремонта']},
   {id:'bus', n:'CAN-шина', r:[8,160,424,40], hx:120, hy:181,
    h:'Две витые жилы, по которым идут данные', t:'По CAN-шине блоки обмениваются данными. На концах шины стоят согласующие резисторы — вместе обычно около 60 Ом.',
    c:['Замеряем сопротивление и напряжения шины','Ищем обрыв или замыкание по жгуту','Восстанавливаем проводку и разъёмы']},
   {id:'ecu', n:'Блоки управления на машине', r:[28,212,384,66], hx:34, hy:224,
    h:'Блок не отвечает или выдаёт ошибки', t:'Блоки работают в тряске, пыли и сырости. Страдают питание, разъёмы и платы — после воды или скачков напряжения.',
    c:['Проверяем питание и массы блока','Читаем ошибки и проверяем входы и выходы','Ремонтируем блок на столе']},
   {id:'tech', n:'Разъёмы и жгуты на технике', r:[214,16,218,140], hx:300, hy:104,
    h:'Вибрация, грязь и влага', t:'На технике разъёмы работают в пыли и сырости, жгуты перетираются о раму. Окислы и плохой контакт — самая частая причина «плавающих» ошибок.',
    c:['Осматриваем жгуты и разъёмы','Чистим и меняем окисленные контакты','Крепим и защищаем проводку']}
  ],
  modes: [
   {id:'ok', n:'Связь есть', lcd:'CAN: 3 БЛОКА НА СВЯЗИ', wa:'Хочу проверить электронику.',
    h:'Монитор видит все блоки', t:'Блоки на машине передают по CAN-шине обороты, давление, ошибки. Монитор в кабине показывает их и отправляет команды.',
    c:['Читаем ошибки всех блоков','Проверяем CAN-шину','Проверяем питание и массы блоков']},
   {id:'lost', n:'Не видит блок', bad:1, lcd:'CAN: КПП НЕ ОТВЕЧАЕТ', wa:'Монитор не видит один из блоков.',
    h:'Монитор не видит один блок', t:'Остальные на связи, а один молчит: обрыв провода к блоку, окисленный разъём, нет питания блока или неисправен сам блок.',
    c:['Проверяем питание и массу блока','Проверяем ответвление шины к блоку','Ремонтируем блок или проводку']},
   {id:'bus', n:'Ошибка шины', bad:1, lcd:'CAN: ОШИБКА ШИНЫ', wa:'Пропала связь со всеми блоками.',
    h:'Пропала связь сразу со всеми блоками', t:'Повреждена сама шина: перетёрся жгут, замыкание на массу или на плюс, нет согласующего резистора. Тогда связь «падает» у всех.',
    c:['Замеряем сопротивление шины','Ищем место повреждения по жгуту','Восстанавливаем проводку и разъёмы']},
   {id:'dark', n:'Монитор не включается', bad:1, lcd:'МОНИТОР: НЕТ ПИТАНИЯ', wa:'Монитор в кабине не включается.',
    h:'Монитор не включается или гаснет', t:'Нет питания или массы, сгорел предохранитель, окислился разъём или неисправен блок питания внутри монитора.',
    c:['Проверяем предохранитель, питание и массу','Проверяем разъём монитора','Ремонтируем монитор на столе']}
  ]
 }
};

AO_SITE.reg('pcb', {css: CSS, html: '<div class="aox w-pcb"><div class="L"></div><div class="card" aria-live="polite"></div></div>', init: function(R, U, ds){
  var V = VARS[ds.mode] || VARS.ecu;
  var L = R.querySelector('.L'), C = R.querySelector('.card');
  if (U.reduce) R.classList.add('rm');
  L.innerHTML = '<h2>' + V.h2 + '</h2><p class="sub">' + V.sub + '</p>' + V.svg(V.zones) +
    '<div class="lcd" aria-hidden="true"><span class="d"></span><span class="lt"></span></div>' +
    '<div class="tabs" role="group" aria-label="Режимы">' + V.modes.map(function(m){ return '<button type="button" class="chip" data-m="' + m.id + '" aria-pressed="false">' + m.n + '</button>'; }).join('') + '</div>';
  C.innerHTML = '<span class="k"></span><h3></h3><p class="t"></p><ul></ul>' + U.ctas(V.wa);
  var K = C.querySelector('.k'), H = C.querySelector('h3'), T = C.querySelector('.t'), UL = C.querySelector('ul'), WA = C.querySelector('.btn.w'), LT = L.querySelector('.lt');
  var MODE = {}, ZONE = {}, ids = [], st = null, used = false, vis = false;
  V.modes.forEach(function(m){ MODE[m.id] = m; ids.push(m.id); });
  V.zones.forEach(function(z, i){ ZONE[z.id] = z; z.i = i + 1; });
  function fill(k, d, wa){
    K.textContent = k; H.textContent = d.h; T.textContent = d.t;
    UL.innerHTML = d.c.map(function(x){ return '<li>' + x + '</li>'; }).join('');
    WA.href = U.wa(V.wa + ' ' + wa);
  }
  function mark(z){ L.querySelectorAll('.zn').forEach(function(e){ e.classList.toggle('on', e.getAttribute('data-z') === z); }); }
  function setMode(id){
    var m = MODE[id]; st = id;
    R.setAttribute('data-st', id); R.classList.toggle('bad', !!m.bad);
    L.querySelectorAll('.chip').forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-m') === id ? 'true' : 'false'); });
    mark(null); LT.textContent = m.lcd;
    fill(V.km + ': ' + m.n, m, m.wa);
  }
  function setZone(id){
    var z = ZONE[id]; mark(id);
    fill('Зона ' + z.i + ': ' + z.n, z, 'Вопрос: ' + z.n.toLowerCase() + '.');
  }
  function touch(){ used = true; }
  L.addEventListener('click', function(e){
    var c = e.target.closest('.chip'), z = e.target.closest('.zn');
    if (c){ touch(); setMode(c.getAttribute('data-m')); U.buzz(); }
    else if (z){ touch(); setZone(z.getAttribute('data-z')); U.buzz(); }
  });
  L.addEventListener('keydown', function(e){
    var z = e.target.closest && e.target.closest('.zn');
    if (z && (e.key === 'Enter' || e.key === ' ')){ e.preventDefault(); touch(); setZone(z.getAttribute('data-z')); }
  });
  R.addEventListener('click', touch); R.addEventListener('keydown', touch);
  setMode(ids[0]);
  U.seen(R, function(v){ vis = v; R.classList.toggle('is-off', !v); });
  if (!U.reduce) setInterval(function(){
    if (used || !vis || document.hidden) return;
    setMode(ids[(ids.indexOf(st) + 1) % ids.length]);
  }, 3600);
}});
})();
