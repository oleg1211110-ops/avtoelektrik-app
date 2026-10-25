/* «Как правильно прикурить машину» — страница услуги «Прикурить авто» avtoelektrik-pro.kz
   Вставка: <div class="ao-w" data-ao="jump"></div> + ao-site.js */
AO_SITE.reg('jump', {
css: [
'.w-jump svg text{font-family:inherit}',
'.w-jump .w-ctl{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}',
'.w-jump .w-ctl .btn{min-height:44px;padding:10px 18px}',
'.w-jump .w-ctl .btn[disabled]{opacity:.4;cursor:default}',
'.w-jump .tabs button{min-height:40px}',
'.w-jump .chip.er{border-color:#7A3432}',
'.w-jump .chip.er[aria-pressed="true"]{background:#EF5350;border-color:#EF5350;color:#fff}',
'.w-jump .card .lh{font-size:14px;color:#9AA3AD}',
'.w-jump .card.bad{border-color:#EF5350}',
'.w-jump .card.bad .k{color:#EF5350}',
'.w-jump .bay{fill:#181818;stroke:#2E2E2E;stroke-width:2}',
'.w-jump .lb{fill:#C9CED4;font-size:13px;font-weight:700;letter-spacing:.08em;text-anchor:middle}',
'.w-jump .eng rect{fill:#262626;stroke:#444;stroke-width:2}',
'.w-jump .fan circle{fill:#1E1E1E;stroke:#5B6A77;stroke-width:3}',
'.w-jump .fan path{fill:none;stroke:#5B6A77;stroke-width:3;stroke-linecap:round}',
'.w-jump.r1 .e1 .fan path,.w-jump.r2 .e2 .fan path{stroke:#FFA500}',
'.w-jump.r1 .e1 .fan,.w-jump.r2 .e2 .fan{animation:wjump-rot .5s linear infinite}',
'@keyframes wjump-rot{to{transform:rotate(360deg)}}',
'.w-jump .st{font-size:12px;fill:#9AA3AD;text-anchor:middle}',
'.w-jump .st.ok{fill:#5CC86C;font-weight:700}.w-jump .st.bad{fill:#EF5350;font-weight:700}.w-jump .st.mid{fill:#FFA500;font-weight:700}',
'.w-jump .bat .b{fill:#2B2B2B;stroke:#555;stroke-width:2;transition:stroke .2s}',
'.w-jump .tp{fill:#E53935}.w-jump .tn{fill:#9AA3AD}',
'.w-jump .pl{fill:#EF5350;font-size:18px;font-weight:700;text-anchor:middle}',
'.w-jump .mi{fill:#C9CED4;font-size:18px;font-weight:700;text-anchor:middle}',
'.w-jump .bt{fill:#C9CED4;font-size:12px;text-anchor:middle}',
'.w-jump .lvb{fill:#151515;stroke:#444}',
'.w-jump .lvl{fill:#EF5350;transform-origin:334px 0;transition:transform 1.4s ease,fill .4s}',
'.w-jump .lvl.mid{fill:#FFA500}.w-jump .lvl.ok{fill:#5CC86C}',
'.w-jump .mass{fill:#9AA3AD;stroke:#E0E0E0;stroke-width:2}',
'.w-jump .ml{fill:#FFA500;font-size:12px;text-anchor:middle}',
'.w-jump .ecu rect{fill:#222;stroke:#5B6A77;stroke-width:2;transition:stroke .2s}',
'.w-jump .ecu text{fill:#9AA3AD;font-size:12px;text-anchor:middle;font-weight:700}',
'.w-jump .ecu path{fill:none;stroke:#5B6A77;stroke-width:2}',
'.w-jump .x{fill:none;stroke:#EF5350;stroke-width:3;stroke-linecap:round;opacity:0}',
'.w-jump .cb path,.w-jump .fl{fill:none;stroke-linecap:round}',
'.w-jump .cb path{stroke-dasharray:100 110;stroke-dashoffset:102;transition:stroke-dashoffset .9s ease}',
'.w-jump .cb-r .m{stroke:#E53935;stroke-width:6}',
'.w-jump .cb-k .u{stroke:#5B6A77;stroke-width:9}.w-jump .cb-k .m{stroke:#141414;stroke-width:5}',
'.w-jump .fl{stroke:#FFD54F;stroke-width:2.5;stroke-dasharray:3 7;opacity:0;transition:opacity .3s}',
'.w-jump.fw .fl{opacity:1;animation:wjump-fl .7s linear infinite}',
'@keyframes wjump-fl{to{stroke-dashoffset:10}}',
'.w-jump .cl{opacity:0;transition:opacity .3s}.w-jump .cl.on{opacity:1}',
'.w-jump .cl.r circle{fill:#E53935;stroke:#fff;stroke-width:2}.w-jump .cl.k circle{fill:#141414;stroke:#C9CED4;stroke-width:2}',
'.w-jump .spk{opacity:0;fill:none;stroke:#FFD54F;stroke-width:3;stroke-linecap:round;transform-origin:246px 176px}',
'.w-jump .spk.on{animation:wjump-spk .8s ease-out}',
'@keyframes wjump-spk{0%{opacity:1;transform:scale(.4)}100%{opacity:0;transform:scale(1.5)}}',
'.w-jump .errg{opacity:0;transition:opacity .2s;pointer-events:none}',
'.w-jump .errg rect{fill:#EF5350}.w-jump .errg text{fill:#fff;font-size:15px;font-weight:700;text-anchor:middle}',
'.w-jump .errg .sp{fill:none;stroke:#FFD54F;stroke-width:3;stroke-linecap:round}',
'.w-jump.err .errg,.w-jump.err .x{opacity:1}',
'.w-jump.err .errg .sp{animation:wjump-bl .3s steps(2) infinite}',
'@keyframes wjump-bl{50%{opacity:.15}}',
'.w-jump.err .bat .b,.w-jump.err .ecu rect{stroke:#EF5350}',
'.w-jump.w-off *{animation-play-state:paused!important}',
'@media (prefers-reduced-motion:reduce){.w-jump *{animation:none!important;transition:none!important}}'
].join('\n'),
html: [
'<div class="aox w-jump"><div>',
'<h2>Как правильно прикурить машину</h2>',
'<p class="sub">Нажимайте «Следующий шаг» — провода подключатся по порядку, как делает мастер.</p>',
'<svg viewBox="0 30 420 222" role="img" aria-label="Схема прикуривания: аккумулятор донора, разряженный аккумулятор и два провода — красный и чёрный">',
/* моторные отсеки */
'<rect class="bay" x="6" y="70" width="196" height="156" rx="16"/><rect class="bay" x="218" y="70" width="196" height="156" rx="16"/>',
'<text class="lb" x="104" y="244">ДОНОР</text><text class="lb" x="316" y="244">РАЗРЯЖЕНА</text>',
/* двигатель донора */
'<g class="eng e1"><rect x="20" y="110" width="84" height="76" rx="10"/>',
'<g class="fan" style="transform-origin:62px 146px"><circle cx="62" cy="146" r="20"/><path d="M62 130v32M46 146h32M51 135l22 22M73 135l-22 22"/></g></g>',
'<text class="st s1" x="62" y="206">заглушен</text>',
/* АКБ донора */
'<g class="bat"><rect class="b" x="116" y="118" width="74" height="56" rx="6"/>',
'<rect class="tp" x="128" y="110" width="14" height="8" rx="2"/><rect class="tn" x="164" y="110" width="14" height="8" rx="2"/>',
'<text class="pl" x="135" y="142">+</text><text class="mi" x="171" y="142">−</text><text class="bt" x="153" y="164">12 В</text></g>',
/* блоки разряженной */
'<g class="ecu"><rect x="252" y="78" width="36" height="22" rx="4"/><text x="270" y="94">ЭБУ</text>',
'<path class="x" d="M254 80l32 18M286 80l-32 18"/></g>',
'<g class="ecu"><rect x="292" y="82" width="32" height="14" rx="7"/><path d="M299 89h18"/>',
'<path class="x" d="M294 82l28 14M322 82l-28 14"/></g>',
/* двигатель разряженной */
'<g class="eng e2"><rect x="232" y="110" width="84" height="76" rx="10"/>',
'<g class="fan" style="transform-origin:286px 140px"><circle cx="286" cy="140" r="18"/><path d="M286 126v28M272 140h28M276 130l20 20M296 130l-20 20"/></g></g>',
'<circle class="mass" cx="246" cy="176" r="5"/><text class="ml" x="250" y="203">масса</text>',
'<text class="st s2" x="363" y="198">АКБ сел</text>',
/* АКБ разряженной */
'<g class="bat"><rect class="b" x="326" y="118" width="74" height="56" rx="6"/>',
'<rect class="tp" x="338" y="110" width="14" height="8" rx="2"/><rect class="tn" x="374" y="110" width="14" height="8" rx="2"/>',
'<text class="pl" x="345" y="142">+</text><text class="mi" x="381" y="142">−</text>',
'<rect class="lvb" x="334" y="152" width="58" height="10" rx="3"/><rect class="lvl" x="334" y="152" width="58" height="10" rx="3"/></g>',
/* провода */
'<g class="cb cb-r"><path class="m" pathLength="100" d="M345 110C345 24 135 24 135 110"/></g>',
'<g class="cb cb-k"><path class="u" pathLength="100" d="M171 110C178 50 246 58 246 176"/><path class="m" pathLength="100" d="M171 110C178 50 246 58 246 176"/></g>',
'<path class="fl" pathLength="100" d="M345 110C345 24 135 24 135 110"/><path class="fl" pathLength="100" d="M171 110C178 50 246 58 246 176"/>',
/* зажимы: 1 — плюс разряженной, 2 — плюс донора, 3 — минус донора, 4 — масса */
'<g class="cl r c1"><circle cx="345" cy="111" r="8"/></g><g class="cl r c2"><circle cx="135" cy="111" r="8"/></g>',
'<g class="cl k c3"><circle cx="171" cy="111" r="8"/></g><g class="cl k c4"><circle cx="246" cy="176" r="8"/></g>',
'<path class="spk" d="M246 158v8M246 186v8M228 176h8M256 176h8M233 163l6 6M253 183l6 6M259 163l-6 6M239 183l-6 6"/>',
/* ошибка полярности */
'<g class="errg"><rect x="95" y="36" width="230" height="32" rx="8"/><text x="210" y="57">Перепутана полярность!</text>',
'<path class="sp" d="M135 100v-12M127 102l-7-6M143 102l7-6M171 100v-12M163 102l-7-6M179 102l7-6"/>',
'<path class="sp" d="M345 100v-12M337 102l-6-6M353 102l7-6M381 100v-12M373 102l-7-6M389 102l7-6"/></g>',
'</svg>',
'<div class="w-ctl"><button type="button" class="btn o nx">Следующий шаг</button><button type="button" class="btn w bk">Назад</button></div>',
'<div class="tabs" role="group" aria-label="Ошибки"><button type="button" class="chip er" aria-pressed="false">Ошибка: перепутать полярность</button></div>',
'</div>',
'<div class="card" aria-live="polite"><span class="k"></span><h3></h3><p class="t"></p><p class="lh"></p><ul></ul></div>',
'</div>'
].join(''),
init: function(R, U, ds){
var S = [
 ['Прикуриваем правильно', 'Провода пока не подключены', 'Обе машины заглушены, зажигание и всё лишнее выключено. Провода подключаем строго по порядку — по одному зажиму.'],
 ['Шаг 1 из 10', 'Красный — на «+» разряженного', 'Первый зажим красного провода — на плюс разряженного аккумулятора. Второй конец держим так, чтобы он ничего не касался.'],
 ['Шаг 2 из 10', 'Красный — на «+» донора', 'Второй конец красного провода — на плюс аккумулятора машины-донора.'],
 ['Шаг 3 из 10', 'Чёрный — на «−» донора', 'Чёрный провод — сначала на минус аккумулятора донора.'],
 ['Шаг 4 из 10', 'Чёрный — на массу разряженной', 'Второй конец чёрного — не на минус АКБ, а на чистый металл двигателя, подальше от аккумулятора. Небольшая искра при подключении будет в стороне от АКБ.'],
 ['Шаг 5 из 10', 'Заводим донора', 'Донор работает несколько минут на холостых — его генератор подзаряжает севший аккумулятор.'],
 ['Шаг 6 из 10', 'Заводим разряженную машину', 'Пробуем завести короткими попытками. Если стартер не крутит бодро даже так — дальше мучить его не стоит, нужна проверка.'],
 ['Шаг 7 из 10', 'Отключаем: чёрный с массы', 'Снимаем в обратном порядке. Первым — чёрный зажим с массы двигателя.'],
 ['Шаг 8 из 10', 'Чёрный — с минуса донора', 'Затем второй конец чёрного провода — с минуса донора.'],
 ['Шаг 9 из 10', 'Красный — с плюса донора', 'Теперь красный: сначала с плюса аккумулятора донора.'],
 ['Шаг 10 из 10', 'Красный — с плюса заряжаемой. Готово', 'Провода сняты, машина работает сама. Пусть поработает или проедется — генератор подзарядит АКБ. Если утром опять не заводится, ищем причину.']
];
/* смещение рисунка проводов (102 — нет, 55 — половина, 0 — весь) и какие зажимы стоят */
var TAB = [[102,102,''],[55,102,'1'],[0,102,'12'],[0,55,'123'],[0,0,'1234'],[0,0,'1234'],[0,0,'1234'],[0,55,'123'],[0,102,'12'],[55,102,'1'],[102,102,'']];
var ERR = ['Ошибка', 'Перепутали плюс и минус', 'Так делать нельзя: даже короткое касание — искры и очень большой ток. Горят предохранители и плавкие вставки, диоды генератора, могут сгореть блоки управления. Если так случилось — сразу снимите провода и позвоните мастеру.'];
var LIST = ['Аккумулятор — проверка под нагрузкой', 'Зарядку генератора', 'Утечку тока на стоянке'];
var LIST_E = ['Предохранители и плавкие вставки', 'Генератор и его диодный мост', 'Блоки управления — ремонт ЭБУ на столе'];
var st = 0, err = false, used = false, vis = false;
function q(s){ return R.querySelector(s); }
function qa(s){ return Array.prototype.slice.call(R.querySelectorAll(s)); }
var red = qa('.cb-r path'), blk = qa('.cb-k path'), lvl = q('.lvl'), s1 = q('.s1'), s2 = q('.s2'), spk = q('.spk');
var card = q('.card'), nx = q('.nx'), bk = q('.bk'), er = q('.er');
card.insertAdjacentHTML('beforeend', U.ctas('Здравствуйте, Олег! Машина не заводится, нужна помощь: прикурить или проверить аккумулятор.'));
var wa = q('.card .btn.w');
function txt(el, t, c){ el.textContent = t; el.setAttribute('class', el.getAttribute('class').split(' ').slice(0, 2).join(' ') + (c ? ' ' + c : '')); }
function render(){
 var row = TAB[st];
 red.forEach(function(p){ p.style.strokeDashoffset = err ? 102 : row[0]; });
 blk.forEach(function(p){ p.style.strokeDashoffset = err ? 102 : row[1]; });
 for (var i = 1; i <= 4; i++) q('.cl.c' + i).classList.toggle('on', !err && row[2].indexOf(String(i)) >= 0);
 R.classList.toggle('r1', !err && st >= 5);
 R.classList.toggle('r2', !err && st >= 6);
 R.classList.toggle('fw', !err && (st === 5 || st === 6));
 R.classList.toggle('err', err);
 var lv = err ? 0.1 : st < 5 ? 0.15 : st === 5 ? 0.35 : st === 6 ? 0.5 : 0.62;
 lvl.style.transform = 'scaleX(' + lv + ')';
 lvl.setAttribute('class', 'lvl' + (lv >= 0.5 ? ' ok' : lv >= 0.3 ? ' mid' : ''));
 if (err){ txt(s1, 'искры!', 'bad'); txt(s2, 'сгорели?', 'bad'); }
 else {
  txt(s1, st >= 5 ? 'работает' : 'заглушен', st >= 5 ? 'ok' : '');
  txt(s2, st >= 6 ? 'завелась' : st === 5 ? 'подзаряжается' : 'АКБ сел', st >= 6 ? 'ok' : st === 5 ? 'mid' : 'bad');
 }
 var d = err ? ERR : S[st], L = err ? LIST_E : LIST;
 card.classList.toggle('bad', err);
 q('.card .k').textContent = d[0]; q('.card h3').textContent = d[1]; q('.card .t').textContent = d[2];
 q('.card .lh').textContent = err ? 'Что проверит мастер после такой ошибки:' : 'Если прикуривать приходится часто — проверим:';
 q('.card ul').innerHTML = L.map(function(x){ return '<li>' + x + '</li>'; }).join('');
 wa.href = U.wa(err ? 'Здравствуйте, Олег! При прикуривании перепутали полярность, нужна проверка машины.' : 'Здравствуйте, Олег! Машина не заводится, нужна помощь: прикурить или проверить аккумулятор.');
 nx.textContent = (st === 10 && !err) ? 'Сначала' : 'Следующий шаг';
 bk.disabled = (st === 0 && !err);
 er.setAttribute('aria-pressed', err ? 'true' : 'false');
}
function spark(){ spk.classList.remove('on'); void spk.getBoundingClientRect(); spk.classList.add('on'); }
function next(){
 if (err) err = false;
 else { st = st === 10 ? 0 : st + 1; if (st === 4) spark(); }
 render();
}
function touch(){ used = true; }
R.addEventListener('pointerdown', touch);
R.addEventListener('keydown', touch);
nx.addEventListener('click', function(){ touch(); next(); U.buzz(12); });
bk.addEventListener('click', function(){ touch(); if (err) err = false; else if (st > 0) st--; render(); U.buzz(12); });
er.addEventListener('click', function(){ touch(); err = !err; render(); U.buzz(err ? 60 : 12); });
render();
U.seen(R, function(v){ vis = v; R.classList.toggle('w-off', !v); });
if (!U.reduce) setInterval(function(){
 if (used || !vis || document.hidden) return;
 if (err){ err = false; st = 0; render(); }
 else if (st === 10){ err = true; render(); }
 else next();
}, 3500);
}});
