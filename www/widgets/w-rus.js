/* «Русификация грузовиков» — страница русификации панели приборов и мультимедиа, avtoelektrik-pro.kz */
(function(){
var P = '.w-rus';
var css = [
P+' [hidden]{display:none!important}',
P+' .chip{min-height:38px}',
P+' .row{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-top:12px}',
P+' .row .btn{min-height:44px;padding:10px 18px}',
P+' .row .btn:disabled{opacity:.65;cursor:default}',
P+' .seg{display:inline-flex;gap:0}',
P+' .seg .chip{border-radius:0;min-width:64px}',
P+' .seg .chip:first-child{border-radius:8px 0 0 8px}'+P+' .seg .chip:last-child{border-radius:0 8px 8px 0;margin-left:-1px}',
P+' svg text{font-family:inherit}',
P+' .tc,'+P+' .tr{transition:opacity .45s ease,transform .45s ease;transition-delay:var(--d,0ms)}',
P+' .tr{opacity:0;transform:translateY(5px)}',
P+'.on-ru .tc{opacity:0;transform:translateY(-5px)}'+P+'.on-ru .tr{opacity:1;transform:none}',
P+' .ttl{font-size:15px;font-weight:700;fill:#fff}',
P+' .it{font-size:14px;fill:#DDE6EE}',
P+' .it.sel{fill:#111;font-weight:700}',
P+' .wn{font-size:14px;font-weight:700;fill:#FFA500}',
P+' .rw{font-size:14px;fill:#C9CED4}',
P+' .u{font-size:14px;fill:#9AA3AD}',
P+' .dv{font-size:18px;font-weight:700;fill:#fff}',
P+' .tl{font-size:14px;fill:#fff}',
P+' .ndl{transform-box:view-box}',
P+' .ndl.rpm{animation:wrN 2.4s ease-in-out infinite alternate}',
'@keyframes wrN{to{transform:rotate(4deg)}}',
P+' .pg{display:flex;align-items:center;gap:10px;margin-top:10px;background:#1D1D1D;border:1px solid #2E2E2E;border-radius:12px;padding:9px 12px}',
P+' .pl{font-size:13.5px;color:#C9CED4;white-space:nowrap;min-width:0;overflow:hidden;text-overflow:ellipsis;flex:0 1 auto}',
P+' .pl b{color:#fff}',
P+' .pb{flex:1 1 60px;height:8px;border-radius:4px;background:#2E2E2E;overflow:hidden;min-width:60px}',
P+' .pb b{display:block;height:100%;width:0;background:#FFA500;border-radius:4px}',
P+'.on-ru .pb b{background:#5CC86C}',
P+' .note{border-left:3px solid #5CC86C;background:rgba(92,200,108,.08);padding:8px 10px;border-radius:6px;color:#D9DDE1;font-size:14.5px;line-height:1.4}',
P+'.ps *{animation-play-state:paused!important}',
'@media (prefers-reduced-motion:reduce){'+P+' *{animation:none!important;transition-duration:.01s!important;transition-delay:0s!important}}'
].join('\n');

var n = 0;
function tx(x, y, cls, cn, ru, anchor){
  var a = anchor ? ' text-anchor="' + anchor + '"' : '';
  return '<g class="tx" style="--d:0ms" data-i="' + (n++) + '"><text class="tc ' + cls + '" x="' + x + '" y="' + y + '"' + a + '>' + cn + '</text><text class="tr ' + cls + '" x="' + x + '" y="' + y + '"' + a + '>' + ru + '</text></g>';
}
function dial(cx, cy, r, deg, val, ucn, uru, red){
  var t = '';
  for (var k = 0; k <= 8; k++) {
    var a = (-225 + k * 33.75) * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    t += '<path d="M' + (cx + c * (r - 10)).toFixed(1) + ' ' + (cy + s * (r - 10)).toFixed(1) + ' L' + (cx + c * (r - 3)).toFixed(1) + ' ' + (cy + s * (r - 3)).toFixed(1) + '" stroke="' + (red && k >= 7 ? '#EF5350' : '#7D8790') + '" stroke-width="2.5"/>';
  }
  return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#0F0F0F" stroke="#4A4A4A" stroke-width="3"/>' + t +
   '<g class="ndl' + (red ? ' rpm' : '') + '" style="transform-origin:' + cx + 'px ' + cy + 'px"><line x1="' + cx + '" y1="' + cy + '" x2="' + cx + '" y2="' + (cy - r + 14) + '" stroke="#FFA500" stroke-width="3" stroke-linecap="round" transform="rotate(' + deg + ' ' + cx + ' ' + cy + ')"/></g>' +
   '<circle cx="' + cx + '" cy="' + cy + '" r="5" fill="#FFA500"/>' +
   '<text class="dv" x="' + cx + '" y="' + (cy + 27) + '" text-anchor="middle">' + val + '</text>' + tx(cx, cy + 45, 'u', ucn, uru, 'middle');
}

var svgPan = '<svg class="s-pan" viewBox="0 0 400 246" role="img" aria-label="Панель приборов грузовика: надписи меняются с китайского на русский">' +
 '<rect x="4" y="6" width="392" height="234" rx="26" fill="#161616" stroke="#3A3A3A" stroke-width="2"/>' +
 dial(68, 96, 56, -40, '62', 'km/h', 'км/ч', false) +
 dial(332, 96, 56, -95, '1.2', 'r/min', 'об/мин', true) + '<text class="u" x="332" y="78" text-anchor="middle">×1000</text>' +
 '<rect x="134" y="24" width="132" height="156" rx="8" fill="#0B1A2A" stroke="#2E4A66" stroke-width="2"/>' +
 tx(144, 46, 'ttl', '主菜单', 'Главное меню') +
 '<path d="M142 54 H258" stroke="#2E4A66" stroke-width="1.5"/>' +
 tx(144, 74, 'it', '行车信息', 'Данные поездки') +
 '<rect x="139" y="81" width="122" height="21" rx="4" fill="#FFA500"/>' +
 tx(144, 96, 'it sel', '故障信息 (2)', 'Ошибки (2)') +
 tx(144, 118, 'it', '保养提醒', 'Обслуживание') +
 tx(144, 140, 'it', '设置', 'Настройки') +
 tx(144, 162, 'it', '语言: 中文', 'Язык: русский') +
 tx(200, 204, 'wn', '机油压力低 请检查', 'Низкое давление масла — проверьте', 'middle') +
 tx(22, 228, 'rw', '水温 85℃', 'ОЖ 85 °C') +
 tx(178, 228, 'rw', '气压 8.5 bar', 'Воздух 8,5 бар', 'middle') +
 tx(378, 228, 'rw', '总里程 128450 km', 'Пробег 128450 км', 'end') +
'</svg>';

var TILES = [['导航','Навигация','<path d="M0 -12 L9 10 L0 5 L-9 10 Z" fill="#FFA500"/>'],
 ['收音机','Радио','<rect x="-12" y="-9" width="24" height="18" rx="3" fill="none" stroke="#FFA500" stroke-width="2.5"/><circle cx="4" cy="0" r="4" fill="#FFA500"/><path d="M-8 -3 h6 M-8 3 h6" stroke="#FFA500" stroke-width="2"/>'],
 ['音乐','Музыка','<circle cx="-4" cy="7" r="5" fill="#FFA500"/><path d="M0 7 V-11 L10 -7" stroke="#FFA500" stroke-width="2.5" fill="none"/>'],
 ['电话','Телефон','<rect x="-7" y="-12" width="14" height="24" rx="3" fill="none" stroke="#FFA500" stroke-width="2.5"/><circle cx="0" cy="7" r="1.8" fill="#FFA500"/>'],
 ['倒车影像','Камера','<rect x="-12" y="-8" width="24" height="17" rx="3" fill="none" stroke="#FFA500" stroke-width="2.5"/><circle cx="0" cy="0.5" r="4.5" fill="#FFA500"/><rect x="-5" y="-12" width="10" height="4" rx="1" fill="#FFA500"/>'],
 ['设置','Настройки','<circle cx="0" cy="0" r="8" fill="none" stroke="#FFA500" stroke-width="5" stroke-dasharray="4 2.3"/><circle cx="0" cy="0" r="3" fill="#FFA500"/>']];
var tiles = '';
TILES.forEach(function(t, i){
  var x = 48 + (i % 3) * 104, y = 60 + Math.floor(i / 3) * 72;
  tiles += '<rect x="' + x + '" y="' + y + '" width="96" height="62" rx="8" fill="#1C2A3A"/><g transform="translate(' + (x + 48) + ' ' + (y + 22) + ')">' + t[2] + '</g>' + tx(x + 48, y + 53, 'tl', t[0], t[1], 'middle');
});
var svgMm = '<svg class="s-mm" viewBox="0 0 400 246" role="img" aria-label="Экран мультимедиа грузовика: пункты меню меняются с китайского на русский" hidden>' +
 '<rect x="20" y="8" width="360" height="230" rx="18" fill="#161616" stroke="#3A3A3A" stroke-width="2"/>' +
 '<rect x="36" y="22" width="328" height="202" rx="8" fill="#0E1622" stroke="#2E4A66" stroke-width="1.5"/>' +
 tx(48, 46, 'ttl', '主菜单', 'Главное меню') + '<text class="ttl" x="352" y="46" text-anchor="end">12:30</text>' +
 tiles +
 tx(200, 216, 'u', '蓝牙已连接', 'Bluetooth подключён', 'middle') +
'</svg>';

var html = '<div class="aox w-rus"><div>' +
 '<h2>Русификация грузовиков</h2>' +
 '<p class="sub">Нажмите «Русифицировать» или переключайте «До / После» — надписи сменятся на русский.</p>' +
 svgPan + svgMm +
 '<div class="pg" aria-hidden="true"><span class="pl"></span><div class="pb"><b></b></div></div>' +
 '<div class="tabs scr" role="group" aria-label="Что русифицируем"><button type="button" class="chip" data-v="pan" aria-pressed="true">Панель приборов</button><button type="button" class="chip" data-v="mm" aria-pressed="false">Мультимедиа</button></div>' +
 '<div class="row"><div class="seg" role="group" aria-label="До или после"><button type="button" class="chip" data-s="0" aria-pressed="true">До</button><button type="button" class="chip" data-s="1" aria-pressed="false">После</button></div>' +
 '<button type="button" class="btn o go">Русифицировать</button></div>' +
'</div>' +
'<div class="card"><span class="k"></span><h3></h3><p class="t"></p><ul></ul>' +
 '<p class="note">Пробег, ограничитель скорости и тахограф не трогаем — меняем только язык интерфейса.</p></div></div>';

AO_SITE.reg('rus', {css: css, html: html, init: function(R, U){
var C = {
 pan0: {k:'Панель приборов · до', h:'Все надписи на китайском', p:'Непонятно, что за ошибка горит, где настройки и как посмотреть сервис. Водитель ездит наугад и может пропустить важное предупреждение — например, о давлении масла.'},
 pan1: {k:'Панель приборов · после', h:'Меню, ошибки и единицы — на русском', p:'Меняем только язык интерфейса: меню, сообщения об ошибках и предупреждения, единицы измерения. Пробег остаётся тем же — его не трогаем.'},
 mm0: {k:'Мультимедиа · до', h:'Магнитола на китайском', p:'Навигация, радио, телефон и камера заднего вида есть, но разобраться в меню на иероглифах сложно.'},
 mm1: {k:'Мультимедиа · после', h:'Мультимедиа по-русски', p:'Пункты меню, настройки и сообщения — на русском: навигация, радио, телефон, камера заднего вида.'}
};
var LIST = ['Проверим, какой блок стоит и можно ли его русифицировать','Меню, ошибки и предупреждения — на русском','Единицы измерения: км/ч, бар, °C, об/мин'];
var view = 'pan', ru = false, used = false, vis = true, token = 0, step = 0, busy = false;
function $(q){ return R.querySelector(q); }
function $$(q){ return R.querySelectorAll(q); }
function hide(q, h){ var e = $(q); if (h) e.setAttribute('hidden', ''); else e.removeAttribute('hidden'); }
var card = $('.card'), btn = $('.go'), bar = $('.pb b');
card.insertAdjacentHTML('beforeend', U.ctas('Здравствуйте, Олег! Нужна русификация грузовика (панель приборов / мультимедиа).'));
$('.card ul').innerHTML = LIST.map(function(x){ return '<li>' + x + '</li>'; }).join('');

function press(sel, attr, val){ [].forEach.call($$(sel), function(b){ b.setAttribute('aria-pressed', b.getAttribute(attr) === String(val) ? 'true' : 'false'); }); }
function fill(){
  var d = C[view + (ru ? 1 : 0)];
  $('.card .k').textContent = d.k; $('.card h3').textContent = d.h; $('.card .t').textContent = d.p;
  press('.seg .chip', 'data-s', ru ? 1 : 0); press('.scr .chip', 'data-v', view);
}
function label(t){ $('.pl').innerHTML = t; }
function setBar(pct, ms){
  bar.style.transition = 'none'; bar.style.width = (ms ? 0 : pct) + '%';
  if (ms && !U.reduce) { void bar.offsetWidth; bar.style.transition = 'width ' + ms + 'ms linear'; bar.style.width = pct + '%'; }
  else bar.style.width = pct + '%';
}
function setRu(on, stagger){
  var svg = $(view === 'pan' ? '.s-pan' : '.s-mm');
  [].forEach.call(svg.querySelectorAll('.tx'), function(g, i){ g.style.setProperty('--d', stagger ? (i * 90) + 'ms' : '0ms'); });
  ru = on; R.classList.toggle('on-ru', on);
  label(on ? 'Язык интерфейса: <b>русский</b>' : 'Язык интерфейса: <b>китайский</b>');
  if (!busy) setBar(on ? 100 : 0, 0);
  fill();
}
function stop(){ token++; busy = false; btn.disabled = false; }
function russify(){
  stop(); var tk = token;
  setRu(false, false); busy = true; btn.disabled = true;
  label('Загружаем русский язык…'); setBar(100, 1200);
  setTimeout(function(){
    if (tk !== token) return;
    busy = false; btn.disabled = false; setRu(true, true);
  }, U.reduce ? 0 : 1250);
}
function setView(v){ stop(); view = v; hide('.s-pan', v !== 'pan'); hide('.s-mm', v !== 'mm'); setRu(false, false); }

function touch(){ if (used) return; used = true; card.setAttribute('aria-live', 'polite'); }
R.addEventListener('pointerdown', touch);
R.addEventListener('keydown', touch);
R.addEventListener('click', function(e){
  var t = e.target.closest('button'); if (!t || !R.contains(t)) return;
  touch();
  if (t.classList.contains('go')) russify();
  else if (t.hasAttribute('data-v')) { if (t.getAttribute('data-v') !== view) setView(t.getAttribute('data-v')); }
  else if (t.hasAttribute('data-s')) { stop(); setRu(t.getAttribute('data-s') === '1', true); }
  else return;
  U.buzz(12);
});
setView('pan');
U.seen(R, function(v){ vis = v; R.classList.toggle('ps', !v); });
if (!U.reduce) setInterval(function(){
  if (used || !vis || document.hidden) return;
  step = (step + 1) % 4;
  if (step === 0) setView('pan'); else if (step === 2) setView('mm'); else russify();
}, 3600);
}});
})();
