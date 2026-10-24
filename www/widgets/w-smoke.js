/* «Подсос воздуха? Найдём дымом» — страница проверки подсоса воздуха дымогенератором, avtoelektrik-pro.kz */
(function(){
var P = '.w-smoke';
var css = [
P+' .chip{min-height:38px}',
P+' .row{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:12px}',
P+' .row .btn{min-height:44px;padding:10px 18px}',
P+' .row .btn[aria-pressed="true"]{background:#222;color:#FFA500;border-color:#FFA500}',
P+' svg text{font-family:inherit}',
P+' .s1{font-size:14px;fill:#C9CED4}',
P+' .s2{font-size:15px;font-weight:700;fill:#FFA500}',
P+' .s2.ok{fill:#5CC86C}'+P+' .s2.bd{fill:#EF5350}',
P+' .lbl{font-size:14px;fill:#7D8790}',
P+' .g1{font-size:15px;font-weight:700;fill:#fff}'+P+' .g2{font-size:14px;fill:#C9CED4}',
P+' .mfp,'+P+' .pipe{fill:#2F3A44;stroke:#5B6A77;stroke-width:2}',
P+' .hz{fill:none;stroke:#5B6A77;stroke-width:7;stroke-linecap:round;transition:stroke .3s}',
P+' .e-gasket{fill:#5B6A77;transition:fill .3s}',
P+' .e-pcv{fill:#3A4651;stroke:#5B6A77;stroke-width:2;transition:stroke .3s,fill .3s}',
P+'.sm .bad.hz{stroke:#EF5350}'+P+'.sm .bad.e-gasket{fill:#EF5350}'+P+'.sm .bad.e-pcv{stroke:#EF5350;fill:#5A2A2A}',
P+'.sm .bad{animation:wsmR 1.4s ease-in-out infinite}',
'@keyframes wsmR{50%{opacity:.55}}',
P+' .led{fill:#444;transition:fill .3s}'+P+'.sm .led{fill:#5CC86C}',
P+' .fog{fill:#DDE2E6;opacity:0;transition:opacity 1s}'+P+'.sm .fog{opacity:.42}',
P+' .fl{fill:none;stroke:#F2F4F6;stroke-width:2.5;stroke-linecap:round;stroke-dasharray:4 9;opacity:0;transition:opacity .4s;animation:wsmF 1s linear infinite}',
P+'.sm .fl{opacity:.9}',
'@keyframes wsmF{to{stroke-dashoffset:-26}}',
P+' .pf{opacity:0;transition:opacity .5s}'+P+'.sm.lk .pf{opacity:1}',
P+' .pf circle{fill:#E9ECEF;opacity:.7;transform-box:fill-box;transform-origin:center;animation:wsmP 2.1s ease-out infinite}',
P+' .pf circle:nth-child(2n){animation-name:wsmQ}',
P+' .pf circle:nth-child(2){animation-delay:.35s}'+P+' .pf circle:nth-child(3){animation-delay:.7s}'+P+' .pf circle:nth-child(4){animation-delay:1.05s}'+P+' .pf circle:nth-child(5){animation-delay:1.4s}'+P+' .pf circle:nth-child(6){animation-delay:1.75s}',
'@keyframes wsmP{0%{transform:translate(0,22px) scale(.4);opacity:0}20%{opacity:.85}100%{transform:translate(6px,-26px) scale(2.3);opacity:0}}',
'@keyframes wsmQ{0%{transform:translate(0,22px) scale(.4);opacity:0}20%{opacity:.85}100%{transform:translate(-8px,-24px) scale(2.1);opacity:0}}',
P+' .hs{cursor:pointer;outline:none}',
P+' .hs circle.c{fill:#FFA500;stroke:#fff;stroke-width:2.5}',
P+' .hs circle.p{fill:none;stroke:#FFA500;stroke-width:2;opacity:0;transform-box:fill-box;transform-origin:center;animation:wsmH 2.2s ease-out infinite}',
P+' .hs text{fill:#111;font-size:14px;font-weight:700;pointer-events:none}',
P+' .hs.on circle.c{fill:#fff;stroke:#FFA500;stroke-width:3.5}',
P+' .hs:focus-visible circle.c{stroke:#4FC3F7;stroke-width:4}',
'@keyframes wsmH{0%{opacity:.9;transform:scale(.8)}80%,100%{opacity:0;transform:scale(2.1)}}',
P+' .rd{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(0,1fr);gap:8px;margin-top:10px}',
P+' .m{background:#1D1D1D;border:1px solid #2E2E2E;border-radius:12px;padding:9px 12px;min-width:0}',
P+' .lb{display:block;font-size:12px;color:#C9CED4;line-height:1.3}',
P+' .vv{display:flex;align-items:baseline;flex-wrap:wrap;gap:2px 6px;margin-top:2px}',
P+' .v{font-size:22px;font-weight:700;color:#fff;font-variant-numeric:tabular-nums}',
P+' .ok{color:#5CC86C}'+P+' .bd{color:#EF5350}',
P+' .u{font-size:13px;color:#C9CED4}',
P+' .tg{font-size:12px;font-weight:700}',
P+' .tr{position:relative;height:10px;border-radius:5px;background:#2E2E2E;margin-top:6px}',
P+' .tr .zn{position:absolute;left:30%;width:40%;top:0;bottom:0;background:rgba(92,200,108,.35);border-radius:5px}',
P+' .tr .c0{position:absolute;left:50%;top:-2px;bottom:-2px;width:1px;background:#7D8790}',
P+' .tr .mk{position:absolute;top:-4px;left:50%;width:6px;height:18px;margin-left:-3px;border-radius:3px;background:#fff;transition:left .7s ease}',
P+' .sc{display:flex;justify-content:space-between;font-size:12px;color:#7D8790;margin-top:3px}',
P+'.ps *{animation-play-state:paused!important}',
'@media (prefers-reduced-motion:reduce){'+P+' *{animation:none!important;transition-duration:.01s!important}'+P+' .hs circle.p{opacity:0}}'
].join('\n');

var MF = 'M146 80 H324 Q338 80 338 94 V118 Q338 132 324 132 H322 V182 H292 V132 H274 V182 H244 V132 H226 V182 H196 V132 H178 V182 H148 V132 H146 Q132 132 132 118 V94 Q132 80 146 80 Z';
function hs(k, n, x, y, lab){
  return '<g class="hs" data-k="'+k+'" tabindex="0" role="button" aria-label="'+lab+'"><circle class="p" cx="'+x+'" cy="'+y+'" r="13"/><circle class="c" cx="'+x+'" cy="'+y+'" r="13"/><text x="'+x+'" y="'+(y+5)+'" text-anchor="middle">'+n+'</text></g>';
}
var svg = '<svg viewBox="0 0 400 260" role="img" aria-label="Схема: дымогенератор подаёт дым во впускной коллектор, дым выходит наружу в месте подсоса воздуха">' +
 '<text class="s1" x="14" y="26"></text><text class="s2" x="14" y="48"></text>' +
 /* двигатель */
 '<rect x="120" y="189" width="270" height="58" rx="8" fill="#262626" stroke="#4A4A4A" stroke-width="2"/>' +
 '<rect x="346" y="162" width="44" height="28" rx="6" fill="#2B2B2B" stroke="#4A4A4A" stroke-width="2"/>' +
 '<text class="lbl" x="268" y="232">Двигатель</text>' +
 /* вакуумный усилитель и шланг */
 '<circle cx="372" cy="50" r="20" fill="#2B2B2B" stroke="#4A4A4A" stroke-width="2"/><circle cx="372" cy="50" r="7" fill="#3A3A3A"/>' +
 '<path class="hz e-hose" d="M282 80 V62 C282 52 290 46 300 46 H352"/>' +
 /* клапан вентиляции картера */
 '<path class="hz e-pcvh" d="M338 110 H368 V140"/>' +
 '<rect class="e-pcv" x="358" y="138" width="20" height="24" rx="4"/>' +
 /* прокладка, коллектор, дроссель, патрубок */
 '<rect class="e-gasket" x="134" y="182" width="204" height="7" rx="2"/>' +
 '<rect class="pipe" x="30" y="96" width="64" height="22"/>' +
 '<rect x="22" y="92" width="10" height="30" rx="3" fill="#7D8790"/>' +
 '<rect x="92" y="88" width="42" height="38" rx="5" fill="#3A4651" stroke="#5B6A77" stroke-width="2"/>' +
 '<path class="mfp" d="'+MF+'"/>' +
 '<line x1="113" y1="94" x2="113" y2="120" stroke="#C9CED4" stroke-width="3" stroke-linecap="round"/>' +
 /* дым внутри */
 '<g class="fog"><path d="'+MF+'"/><rect x="30" y="96" width="64" height="22"/><rect x="92" y="88" width="42" height="38" rx="5"/></g>' +
 /* дымогенератор */
 '<path class="hz" d="M53 160 C53 140 62 134 62 118"/>' +
 '<rect x="12" y="160" width="82" height="56" rx="9" fill="#1D1D1D" stroke="#FFA500" stroke-width="2"/>' +
 '<text class="g1" x="22" y="185">Дым</text><text class="g2" x="20" y="205">генератор</text><circle class="led" cx="80" cy="179" r="5"/>' +
 /* бегущий дым */
 '<path class="fl" d="M53 160 C53 140 62 134 62 118 M30 107 H132 M150 106 H330 M163 134 V180 M211 134 V180 M259 134 V180 M307 134 V180 M338 110 H368 V136 M282 80 V62 C282 52 290 46 300 46 H350"/>' +
 /* клубы дыма из места подсоса */
 '<g class="pf" transform="translate(322 44)"><circle cx="0" cy="0" r="4"/><circle cx="3" cy="-8" r="6"/><circle cx="-3" cy="-16" r="7"/><circle cx="4" cy="-24" r="8"/><circle cx="-2" cy="-4" r="5"/><circle cx="1" cy="-12" r="6"/></g>' +
 hs('hose', 1, 322, 66, 'Место 1: вакуумный шланг') +
 hs('gasket', 2, 235, 214, 'Место 2: прокладка коллектора') +
 hs('pcv', 3, 334, 150, 'Место 3: клапан вентиляции картера') +
'</svg>';

var html = '<div class="aox w-smoke"><div>' +
 '<h2>Подсос воздуха? Найдём дымом</h2>' +
 '<p class="sub">Выберите место и нажмите «Пустить дым» — дым сам покажет, где мотор тянет лишний воздух.</p>' +
 svg +
 '<div class="rd" aria-hidden="true">' +
  '<div class="m"><span class="lb">LTFT — долгосрочная коррекция топлива</span><div class="vv"><span class="v lt">+0 %</span><span class="tg ltg"></span></div>' +
   '<div class="tr"><i class="zn"></i><i class="c0"></i><b class="mk"></b></div><div class="sc"><span>−25 %</span><span>0</span><span>+25 %</span></div></div>' +
  '<div class="m"><span class="lb">Обороты холостого хода</span><div class="vv"><span class="v rpm">750</span><span class="u">об/мин</span></div><span class="tg rtg"></span></div>' +
 '</div>' +
 '<div class="tabs" role="group" aria-label="Место подсоса воздуха"></div>' +
 '<div class="row"><button type="button" class="btn o go" aria-pressed="false">Пустить дым</button></div>' +
'</div>' +
'<div class="card"><span class="k"></span><h3></h3><p class="t"></p><ul></ul></div></div>';

AO_SITE.reg('smoke', {css: css, html: html, init: function(R, U){
var D = {
 hose: {n:'1. Шланг вакуума', w:'Выходит у вакуумного шланга', k:'Место 1 · вакуумный шланг', h:'Трещина в вакуумном шланге',
  p:'Резиновые шланги со временем дубеют и трескаются. Через трещину мотор тянет воздух мимо датчика — смесь беднеет, блок добавляет топливо: коррекция уходит в плюс, холостые плавают, может загореться ошибка «бедная смесь» (P0171/P0174).',
  c:['Дымогенератор — дым сам покажет трещину','Коррекции топлива и обороты ХХ на сканере','Замена шланга и повторная проверка дымом'], lt:18, r:[640,900], x:322, y:44},
 gasket: {n:'2. Прокладка коллектора', w:'Выходит у прокладки коллектора', k:'Место 2 · прокладка коллектора', h:'Подсос через прокладку коллектора',
  p:'Прокладка между коллектором и головкой со временем теряет герметичность. Воздух идёт прямо в цилиндры — на холостых троит и плавают обороты, коррекция в плюсе. На высоких оборотах коррекция обычно ближе к норме.',
  c:['Дым по стыку коллектора и головки','Сравнение коррекций на ХХ и на 2500 об/мин','Замена прокладки и повторная проверка'], lt:13, r:[660,860], x:235, y:180},
 pcv: {n:'3. Клапан вентиляции картера', w:'Выходит у клапана вентиляции', k:'Место 3 · вентиляция картера', h:'Клапан вентиляции картера не держит',
  p:'Через клапан вентиляции картера или его шланг в коллектор идёт лишний воздух. Бывает свист под капотом, неровный холостой ход, коррекция в плюсе.',
  c:['Проверка клапана и шлангов вентиляции дымом','Коррекции топлива на сканере до и после','Замена клапана или шланга'], lt:11, r:[690,840], x:368, y:134},
 none: {n:'Подсоса нет', w:'Наружу не выходит — герметично', k:'Результат · герметично', h:'Подсоса нет — система герметична',
  p:'Дым наружу не выходит, коррекции около нуля. Если смесь всё равно бедная, ищем дальше: датчик расхода воздуха, давление топлива, форсунки.',
  c:['Проверка датчика расхода воздуха','Замер давления топлива','Проверка форсунок'], lt:2, r:[745,760]}
};
var K = ['hose','gasket','pcv','none'], EL = {hose:'.e-hose', gasket:'.e-gasket', pcv:'.e-pcv'};
var cur = 'hose', smoke = true, used = false, vis = true;
function $(s){ return R.querySelector(s); }
function $$(s){ return R.querySelectorAll(s); }
var card = $('.card'), btn = $('.go'), pf = $('.pf');
card.insertAdjacentHTML('beforeend', U.ctas('Здравствуйте, Олег! Нужна проверка подсоса воздуха дымом.'));
$('.tabs').innerHTML = K.map(function(k){ return '<button type="button" class="chip" data-k="'+k+'" aria-pressed="false">'+D[k].n+'</button>'; }).join('');

function status(){
  var s2 = $('.s2');
  $('.s1').textContent = smoke ? 'Дым подан во впускной коллектор' : 'Дым не подан';
  s2.textContent = smoke ? D[cur].w : 'Нажмите «Пустить дым»';
  s2.setAttribute('class', 's2' + (smoke ? (cur === 'none' ? ' ok' : ' bd') : ''));
}
function rpm(){
  var d = D[cur], el = $('.rpm');
  if (U.reduce) { el.textContent = cur === 'none' ? '750' : d.r[0] + '–' + d.r[1]; return; }
  el.textContent = Math.round((d.r[0] + Math.random() * (d.r[1] - d.r[0])) / 10) * 10;
}
function show(k){
  cur = k; var d = D[k], leak = k !== 'none';
  R.classList.toggle('lk', leak);
  if (leak) pf.setAttribute('transform', 'translate(' + d.x + ' ' + d.y + ')');
  for (var e in EL) $(EL[e]).classList.toggle('bad', e === k);
  $('.e-pcvh').classList.toggle('bad', k === 'pcv');
  [].forEach.call($$('[data-k]'), function(el){
    var on = el.getAttribute('data-k') === k;
    el.classList.toggle('on', on);
    if (el.tagName === 'BUTTON') el.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  $('.card .k').textContent = d.k; $('.card h3').textContent = d.h; $('.card .t').textContent = d.p;
  $('.card ul').innerHTML = d.c.map(function(x){ return '<li>' + x + '</li>'; }).join('');
  var lt = $('.lt'), bad = d.lt > 10;
  lt.textContent = (d.lt >= 0 ? '+' : '−') + Math.abs(d.lt) + ' %';
  lt.className = 'v lt ' + (bad ? 'bd' : 'ok');
  $('.ltg').textContent = bad ? 'смесь бедная' : 'норма';
  $('.ltg').className = 'tg ltg ' + (bad ? 'bd' : 'ok');
  $('.mk').style.left = ((d.lt + 25) / 50 * 100) + '%';
  $('.rtg').textContent = leak ? 'плавают' : 'ровно';
  $('.rtg').className = 'tg rtg ' + (leak ? 'bd' : 'ok');
  rpm(); status();
}
function setSmoke(on){
  smoke = on; R.classList.toggle('sm', on);
  btn.textContent = on ? 'Остановить дым' : 'Пустить дым';
  btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  status();
}
function touch(){ if (used) return; used = true; card.setAttribute('aria-live', 'polite'); }
R.addEventListener('pointerdown', touch);
R.addEventListener('keydown', function(e){
  touch();
  if ((e.key === 'Enter' || e.key === ' ') && e.target.closest('.hs')) { e.preventDefault(); e.target.closest('.hs').dispatchEvent(new MouseEvent('click', {bubbles: true})); }
});
R.addEventListener('click', function(e){
  if (e.target.closest('.go')) { touch(); setSmoke(!smoke); U.buzz(15); return; }
  var t = e.target.closest('[data-k]'); if (!t) return;
  touch(); show(t.getAttribute('data-k')); if (!smoke) setSmoke(true); U.buzz(12);
});
show('hose'); setSmoke(true);
U.seen(R, function(v){ vis = v; R.classList.toggle('ps', !v); });
if (!U.reduce) {
  setInterval(function(){ if (!vis || document.hidden) return; rpm(); }, 800);
  setInterval(function(){ if (used || !vis || document.hidden) return; show(K[(K.indexOf(cur) + 1) % K.length]); if (!smoke) setSmoke(true); }, 3600);
}
}});
})();
