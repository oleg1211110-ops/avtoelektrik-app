/**
 * «Мастера рядом» — сервер карточек мастеров для приложения «АвтоЭлектрик PRO».
 * Cloudflare Worker + база D1 (binding DB). Секрет ADMIN_KEY — пароль страницы модерации.
 *
 * Для приложения (JSON):
 *   GET  /api/cities                       города, где есть мастера, и сколько их
 *   GET  /api/masters?city=&cat=           опубликованные карточки (без отзывов)
 *   GET  /api/master?id=                   карточка с отзывами
 *   POST /api/apply                        заявка мастера → на проверку; в ответ ссылка для правки
 *   GET  /api/mine?id=&key=                своя карточка по ключу правки (любой статус)
 *   POST /api/update                       правка своей карточки (город или направление → снова на проверку)
 *   POST /api/remove                       удалить свою карточку вместе с отзывами
 *   POST /api/review                       отзыв со звёздами: один с устройства на мастера, можно изменить
 *   GET  /api/pending-count                сколько заявок ждёт проверки (для напоминаний)
 * Страницы:
 *   GET  /<id>  (и /m/<id>)                карточка для клиентов: превью для WhatsApp, звонок, отзывы, QR
 *   GET  /qr/<id>.svg                      QR-код со ссылкой на карточку (?download=1 — скачать)
 *   GET  /photo/<id>                       фото мастера
 *   GET  /admin                            модерация (пароль ADMIN_KEY)
 */
import { qrSvg } from './qr.js';

/* ---------- справочники ---------- */
export const CATS = {
  tires: ['Шиномонтаж', 'Шиномонтаж', 'Tire service'],
  chassis: ['Ремонт ходовой', 'Жүріс бөлігін жөндеу', 'Suspension and steering'],
  engine: ['Ремонт двигателя', 'Қозғалтқышты жөндеу', 'Engine repair'],
  gearbox: ['Ремонт КПП', 'Беріліс қорабын жөндеу', 'Transmission repair'],
  body: ['Кузовной ремонт и покраска', 'Шанақты жөндеу және бояу', 'Body repair and paint'],
  service: ['Замена масла и ТО', 'Май ауыстыру және техникалық қызмет', 'Oil change and service'],
  glass: ['Автостёкла', 'Автошынылар', 'Auto glass'],
  ac: ['Автокондиционеры', 'Автокондиционерлер', 'Car A/C'],
  tow: ['Эвакуатор', 'Эвакуатор', 'Tow truck'],
  roadside: ['Выездная помощь на дороге', 'Жолда көшпелі көмек', 'Roadside assistance'],
  truck: ['Ремонт грузовиков', 'Жүк көліктерін жөндеу', 'Truck repair'],
  special: ['Ремонт спецтехники', 'Арнайы техниканы жөндеу', 'Heavy equipment repair'],
  moto: ['Мотосервис', 'Мотосервис', 'Motorcycle service'],
  wash: ['Автомойка и детейлинг', 'Көлік жуу және детейлинг', 'Car wash and detailing'],
  diesel: ['Топливная аппаратура', 'Отын аппаратурасы', 'Fuel injection service'],
  electric: ['Автоэлектрика', 'Автоэлектрика', 'Auto electrics'],
  diag: ['Компьютерная диагностика', 'Компьютерлік диагностика', 'Computer diagnostics'],
  immo: ['Иммобилайзеры и ключи', 'Иммобилайзерлер мен кілттер', 'Immobilizers and keys'],
  ecu: ['Ремонт ЭБУ и чип-тюнинг', 'ЭБУ жөндеу және чип-тюнинг', 'ECU repair and chip tuning'],
  heaters: ['Автономные отопители', 'Автономды жылытқыштар', 'Parking heaters'],
  alarm: ['Сигнализации и доп. оборудование', 'Сигнализациялар және қосымша жабдық', 'Alarms and accessories'],
  other: ['Другое', 'Басқа', 'Other'],
};
/* направления Олега: в Алматы такие карточки не размещаются */
export const RESERVED = ['electric', 'diag', 'immo', 'ecu', 'heaters', 'alarm'];
const RESERVED_CITIES = ['алматы', 'almaty', 'алма-ата', 'alma-ata'];
const LANGS = ['ru', 'kk', 'en'];
const APP_URL = 'https://help.avtoelektrik-pro.kz/';
const OG_DEFAULT = 'https://help.avtoelektrik-pro.kz/og-image.jpg';

/* ---------- мелочи ---------- */
const now = () => Date.now();
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const clean = (s, max) => String(s == null ? '' : s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim().slice(0, max);
const oneLine = (s, max) => clean(s, max * 2).replace(/\s+/g, ' ').slice(0, max);
export const cityKey = c => oneLine(c, 60).toLowerCase().replace(/ё/g, 'е');
const cityNice = c => { const t = oneLine(c, 60); return t ? t.charAt(0).toUpperCase() + t.slice(1) : t; };
const isReservedCity = k => RESERVED_CITIES.includes(k);
const b64url = u8 => btoa(String.fromCharCode(...u8)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const rnd = n => crypto.getRandomValues(new Uint8Array(n));
async function sha256hex(s){ const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return Array.from(new Uint8Array(h), x => x.toString(16).padStart(2, '0')).join(''); }
function newId(){ const a = 'abcdefghjkmnpqrstuvwxyz23456789', r = rnd(8); return Array.from(r, x => a[x % a.length]).join(''); }
export function normPhone(p){
  let d = String(p || '').replace(/\D/g, '');
  if (d.length === 11 && d[0] === '8') d = '7' + d.slice(1);
  if (d.length === 10 && d[0] === '7') d = '7' + d;           // 7011211110 → 77011211110
  return d.length >= 10 && d.length <= 15 ? '+' + d : '';
}
function normSite(u){
  u = oneLine(u, 200);
  if (!u) return '';
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
  try { const x = new URL(u); if (!/^https?:$/.test(x.protocol) || !x.hostname.includes('.')) return null; return x.href; } catch (e) { return null; }
}
function parsePhoto(dataUrl){
  if (!dataUrl) return null;
  const m = /^data:(image\/(jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(String(dataUrl));
  if (!m) return {error: 'photo'};
  const b64 = m[3];
  if (b64.length > 560000) return {error: 'photo_big'};          // ~400 КБ
  const head = atob(b64.slice(0, 24));
  const ok = m[2] === 'jpeg' ? head.charCodeAt(0) === 0xFF && head.charCodeAt(1) === 0xD8
    : m[2] === 'png' ? head.slice(1, 4) === 'PNG' : head.slice(0, 4) === 'RIFF' && head.slice(8, 12) === 'WEBP';
  if (!ok) return {error: 'photo'};
  return {type: m[1], b64};
}
const okCats = a => Array.isArray(a) ? [...new Set(a.filter(c => Object.prototype.hasOwnProperty.call(CATS, c)))].slice(0, 6) : [];
export const conflict = (cityK, cats) => isReservedCity(cityK) && cats.some(c => RESERVED.includes(c));

/* ---------- ответы ---------- */
function corsHeaders(req, env){
  const o = req.headers.get('origin') || '';
  const allowed = String(env.ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
  const h = {'vary': 'origin'};
  if (o && (allowed.includes(o) || allowed.includes('*'))){
    h['access-control-allow-origin'] = o;
    h['access-control-allow-methods'] = 'GET,POST,OPTIONS';
    h['access-control-allow-headers'] = 'content-type,x-admin-key';
    h['access-control-max-age'] = '86400';
  }
  return h;
}
const SEC = {'x-content-type-options': 'nosniff', 'referrer-policy': 'strict-origin-when-cross-origin'};
function json(req, env, data, status = 200, extra = {}){
  return new Response(JSON.stringify(data), {status, headers: {'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...SEC, ...corsHeaders(req, env), ...extra}});
}
const fail = (req, env, code, status = 400) => json(req, env, {ok: false, error: code}, status);
function html(body, status = 200, extra = {}){
  return new Response(body, {status, headers: {'content-type': 'text/html; charset=utf-8', ...SEC, 'x-frame-options': 'DENY', ...extra}});
}

/* ---------- база: таблицы создаются сами при первом запросе ---------- */
const SCHEMA = [
  "CREATE TABLE IF NOT EXISTS masters ( id TEXT PRIMARY KEY, status TEXT NOT NULL DEFAULT 'pending', name TEXT NOT NULL, city TEXT NOT NULL, city_key TEXT NOT NULL, cats TEXT NOT NULL, about TEXT NOT NULL DEFAULT '', phone TEXT NOT NULL, wa TEXT NOT NULL DEFAULT '', address TEXT NOT NULL DEFAULT '', site TEXT NOT NULL DEFAULT '', photo TEXT, photo_type TEXT, photo_v INTEGER NOT NULL DEFAULT 0, device TEXT NOT NULL DEFAULT '', edit_hash TEXT NOT NULL, note TEXT NOT NULL DEFAULT '', lang TEXT NOT NULL DEFAULT 'ru', created INTEGER NOT NULL, updated INTEGER NOT NULL, approved INTEGER )",
  'CREATE INDEX IF NOT EXISTS masters_city ON masters(status, city_key)',
  "CREATE TABLE IF NOT EXISTS reviews ( id INTEGER PRIMARY KEY AUTOINCREMENT, master TEXT NOT NULL, device TEXT NOT NULL, name TEXT NOT NULL DEFAULT '', stars INTEGER NOT NULL, text TEXT NOT NULL DEFAULT '', hidden INTEGER NOT NULL DEFAULT 0, created INTEGER NOT NULL, updated INTEGER NOT NULL, UNIQUE(master, device) )",
  'CREATE INDEX IF NOT EXISTS reviews_master ON reviews(master, hidden, created)',
  'CREATE TABLE IF NOT EXISTS hits ( k TEXT PRIMARY KEY, n INTEGER NOT NULL, exp INTEGER NOT NULL )',
  'CREATE TABLE IF NOT EXISTS settings (k TEXT PRIMARY KEY, v TEXT NOT NULL)',
  'CREATE TABLE IF NOT EXISTS reports (id INTEGER PRIMARY KEY AUTOINCREMENT, master TEXT NOT NULL, review INTEGER, reason TEXT NOT NULL, text TEXT NOT NULL DEFAULT \'\', device TEXT NOT NULL DEFAULT \'\', created INTEGER NOT NULL, done INTEGER NOT NULL DEFAULT 0)',
  'CREATE INDEX IF NOT EXISTS reports_open ON reports(done, created)',
  'CREATE TABLE IF NOT EXISTS codes (code TEXT PRIMARY KEY, product TEXT NOT NULL, note TEXT NOT NULL DEFAULT \'\', devices TEXT NOT NULL DEFAULT \'[]\', max_devices INTEGER NOT NULL DEFAULT 3, revoked INTEGER NOT NULL DEFAULT 0, created INTEGER NOT NULL, used INTEGER)',
  'CREATE TABLE IF NOT EXISTS certs (id TEXT PRIMARY KEY, code TEXT NOT NULL, name TEXT NOT NULL, score INTEGER NOT NULL, total INTEGER NOT NULL, lessons INTEGER NOT NULL, lang TEXT NOT NULL DEFAULT \'ru\', created INTEGER NOT NULL)'
];
let ready = null;
function ensureDb(env){
  if (!ready) ready = env.DB.batch(SCHEMA.map(q => env.DB.prepare(q))).catch(e => { ready = null; throw e; });
  return ready;
}
async function setting(env, k){ const r = await env.DB.prepare('SELECT v FROM settings WHERE k = ?').bind(k).first(); return r ? r.v : null; }
async function salt(env){
  let v = await setting(env, 'salt');
  if (!v){ v = b64url(rnd(18)); await env.DB.prepare('INSERT OR IGNORE INTO settings (k, v) VALUES (?, ?)').bind('salt', v).run(); v = await setting(env, 'salt'); }
  return v;
}

/* ---------- защита от спама ---------- */
async function limited(req, env, action, max){
  const ip = req.headers.get('cf-connecting-ip') || req.headers.get('x-real-ip') || '0';
  const day = new Date(now() + 5 * 3600e3).toISOString().slice(0, 10);
  const k = action + ':' + day + ':' + (await sha256hex(ip + '|' + (env.SALT || await salt(env)))).slice(0, 20);
  const exp = now() + 2 * 86400e3;
  await env.DB.prepare('INSERT INTO hits (k, n, exp) VALUES (?, 1, ?) ON CONFLICT(k) DO UPDATE SET n = n + 1').bind(k, exp).run();
  const r = await env.DB.prepare('SELECT n FROM hits WHERE k = ?').bind(k).first();
  if (Math.random() < 0.02) await env.DB.prepare('DELETE FROM hits WHERE exp < ?').bind(now()).run();
  return r && r.n > max;
}

/* ---------- данные ---------- */
const PUB = 'id, status, name, city, cats, about, phone, wa, address, site, photo_type, photo_v, created, updated, approved';
async function ratingsFor(env, ids){
  const out = {};
  if (!ids.length) return out;
  const q = 'SELECT master, COUNT(*) AS n, AVG(stars) AS avg FROM reviews WHERE hidden = 0 AND master IN (' + ids.map(() => '?').join(',') + ') GROUP BY master';
  const r = await env.DB.prepare(q).bind(...ids).all();
  (r.results || []).forEach(x => { out[x.master] = {n: x.n, avg: Math.round(x.avg * 10) / 10}; });
  return out;
}
function pub(m, rt, base){
  const r = rt || {n: 0, avg: 0};
  return {
    id: m.id, name: m.name, city: m.city, cats: JSON.parse(m.cats || '[]'), about: m.about, phone: m.phone, wa: m.wa || m.phone,
    address: m.address, site: m.site, photo: m.photo_type ? base + '/photo/' + m.id + '?v=' + m.photo_v : null,
    rating: r.avg, votes: r.n, url: base + '/' + m.id, qr: base + '/qr/' + m.id + '.svg', since: m.approved || m.created,
  };
}
const rankScore = x => (x.rating * x.votes + 4 * 3) / (x.votes + 3);   // мало отзывов — ближе к средней 4

/* ---------- API ---------- */
async function apiCities(req, env){
  const r = await env.DB.prepare("SELECT city, city_key, COUNT(*) AS n FROM masters WHERE status = 'approved' GROUP BY city_key ORDER BY n DESC").all();
  return json(req, env, {ok: true, cities: (r.results || []).map(x => ({city: x.city, n: x.n}))}, 200, {'cache-control': 'public, max-age=60'});
}
async function apiMasters(req, env, url, base){
  const ck = cityKey(url.searchParams.get('city') || ''), cat = url.searchParams.get('cat') || '';
  let q = 'SELECT ' + PUB + " FROM masters WHERE status = 'approved'", args = [];
  if (ck){ q += ' AND city_key = ?'; args.push(ck); }
  q += ' ORDER BY approved DESC LIMIT 500';
  const r = await env.DB.prepare(q).bind(...args).all();
  let list = (r.results || []);
  if (cat && CATS[cat]) list = list.filter(m => JSON.parse(m.cats || '[]').includes(cat));
  const rt = await ratingsFor(env, list.map(m => m.id));
  const out = list.map(m => pub(m, rt[m.id], base)).sort((a, b) => rankScore(b) - rankScore(a) || b.votes - a.votes);
  return json(req, env, {ok: true, masters: out}, 200, {'cache-control': 'public, max-age=30'});
}
async function loadReviews(env, id, all){
  const r = await env.DB.prepare('SELECT id, device, name, stars, text, created, updated, hidden FROM reviews WHERE master = ?' + (all ? '' : ' AND hidden = 0') + ' ORDER BY updated DESC LIMIT 200').bind(id).all();
  const sl = await salt(env);
  return Promise.all((r.results || []).map(async x => ({id: x.id, a: (await sha256hex(x.device + '|' + sl)).slice(0, 12), name: x.name, stars: x.stars, text: x.text, date: x.updated, hidden: !!x.hidden})));
}
/* ---------- коды доступа к платным урокам (оплата Kaspi напрямую Олегу, код выдаёт Олег на странице модерации) ---------- */
const PRODUCTS = ['course-pro', 'course-ecu'];   // курс для будущих автоэлектриков и курс «Ремонт ЭБУ» — отдельные коды
const CODE_ABC = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const normCode = c => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
function newCode(){ const r = rnd(10); return Array.from(r, x => CODE_ABC[x % CODE_ABC.length]).join(''); }
const fmtCode = c => c.slice(0, 5) + '-' + c.slice(5);
/* сколько кодов курса выдано (не отозванных) — для стартовой цены «первым 20 покупателям» */
async function apiCourseInfo(req, env){
  const rs = await env.DB.prepare('SELECT product, COUNT(*) AS n FROM codes WHERE revoked = 0 GROUP BY product').all();
  const by = {}; (rs.results || []).forEach(x => { by[x.product] = x.n; });
  return json(req, env, {ok: true, sold: by['course-pro'] || 0, sold_ecu: by['course-ecu'] || 0});
}
async function apiUnlock(req, env){
  const b = await req.json().catch(() => null);
  if (!b) return fail(req, env, 'bad_request');
  const dev = String(b.device || '');
  if (!/^w?[0-9a-f]{32}$/.test(dev)) return fail(req, env, 'device');
  if (await limited(req, env, 'unlock', 15)) return fail(req, env, 'limit', 429);
  const c = await env.DB.prepare('SELECT * FROM codes WHERE code = ?').bind(normCode(b.code)).first();
  if (!c || c.revoked) return fail(req, env, 'bad_code');
  let devs = []; try { devs = JSON.parse(c.devices || '[]'); } catch (e) {}
  if (!devs.includes(dev)){
    if (devs.length >= c.max_devices) return fail(req, env, 'code_devices');
    devs.push(dev);
    await env.DB.prepare('UPDATE codes SET devices = ?, used = COALESCE(used, ?) WHERE code = ?').bind(JSON.stringify(devs), now(), c.code).run();
  }
  return json(req, env, {ok: true, product: c.product});
}
/* ---------- сертификат о прохождении курса (после итогового теста) ---------- */
const CERT_ABC = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function certId(){ const r = crypto.getRandomValues(new Uint8Array(6)); return 'AE' + String(new Date().getUTCFullYear()).slice(2) + '-' + Array.from(r, x => CERT_ABC[x % CERT_ABC.length]).join(''); }
async function apiCert(req, env, base){
  const b = await req.json().catch(() => null);
  if (!b) return fail(req, env, 'bad_request');
  const dev = String(b.device || '');
  if (!/^w?[0-9a-f]{32}$/.test(dev)) return fail(req, env, 'device');
  if (await limited(req, env, 'cert', 10)) return fail(req, env, 'limit', 429);
  const c = await env.DB.prepare('SELECT * FROM codes WHERE code = ?').bind(normCode(b.code)).first();
  if (!c || c.revoked || c.product !== 'course-pro') return fail(req, env, 'bad_code');
  let devs = []; try { devs = JSON.parse(c.devices || '[]'); } catch (e) {}
  if (!devs.includes(dev)) return fail(req, env, 'bad_code');
  const name = oneLine(b.name, 60);
  if (name.length < 3 || !/\p{L}/u.test(name)) return fail(req, env, 'name');
  const total = Math.round(Number(b.total)), score = Math.round(Number(b.score)), lessons = Math.round(Number(b.lessons));
  if (!(total >= 10 && total <= 40 && score >= Math.ceil(total * 0.8) && score <= total && lessons >= 1 && lessons <= 100)) return fail(req, env, 'score');
  const lang = ['ru', 'kk', 'en'].includes(b.lang) ? b.lang : 'ru';
  const old = await env.DB.prepare('SELECT id FROM certs WHERE code = ? AND name = ?').bind(c.code, name).first();
  if (old) return json(req, env, {ok: true, id: old.id, url: base + '/cert/' + old.id});
  let id = certId();
  for (let i = 0; i < 5 && await env.DB.prepare('SELECT 1 FROM certs WHERE id = ?').bind(id).first(); i++) id = certId();
  await env.DB.prepare('INSERT INTO certs (id, code, name, score, total, lessons, lang, created) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').bind(id, c.code, name, score, total, lessons, lang, now()).run();
  return json(req, env, {ok: true, id, url: base + '/cert/' + id});
}
const CERT_T = {
  ru: {doc: 'Сертификат', sub: 'о прохождении курса', course: '«Курсы автоэлектрика» — уровень «Для будущих автоэлектриков»',
       body: (n, l, s, t) => 'Настоящий сертификат подтверждает, что ' + n + ' завершил(а) курс из ' + l + ' уроков и сдал(а) итоговый тест: ' + s + ' из ' + t + ' правильных ответов.',
       date: 'Дата выдачи', num: 'Номер', who: 'Олег Дмитриев — автоэлектрик, стаж 26 лет', ok: 'Сертификат действителен: проверено по номеру в базе АвтоЭлектрик PRO.',
       note: 'Сертификат подтверждает прохождение курса и не является документом об образовании государственного образца.', print: 'Сохранить PDF / печать', share: 'Отправить в WhatsApp', none: 'Сертификат с таким номером не найден.'},
  kk: {doc: 'Сертификат', sub: 'курсты өткені туралы', course: '«Автоэлектрик курстары» — «Болашақ автоэлектриктерге арналған» деңгейі',
       body: (n, l, s, t) => 'Осы сертификат ' + n + ' ' + l + ' сабақтан тұратын курсты аяқтап, қорытынды тестті тапсырғанын растайды: ' + t + ' сұрақтың ' + s + '-іне дұрыс жауап берді.',
       date: 'Берілген күні', num: 'Нөмірі', who: 'Олег Дмитриев — автоэлектрик, 26 жылдық тәжірибе', ok: 'Сертификат жарамды: АвтоЭлектрик PRO базасында нөмірі бойынша тексерілді.',
       note: 'Сертификат курстың өтілгенін растайды және мемлекеттік үлгідегі білім туралы құжат болып табылмайды.', print: 'PDF сақтау / басып шығару', share: 'WhatsApp-қа жіберу', none: 'Мұндай нөмірлі сертификат табылмады.'},
  en: {doc: 'Certificate', sub: 'of course completion', course: '“Auto electrician courses” — level “For future auto electricians”',
       body: (n, l, s, t) => 'This certifies that ' + n + ' has completed the course of ' + l + ' lessons and passed the final test with ' + s + ' of ' + t + ' correct answers.',
       date: 'Date of issue', num: 'Number', who: 'Oleg Dmitriev — auto electrician, 26 years of experience', ok: 'This certificate is valid: checked by its number in the AvtoElektrik PRO database.',
       note: 'This certificate confirms completion of the course and is not a state-recognised educational document.', print: 'Save as PDF / print', share: 'Send via WhatsApp', none: 'No certificate with this number was found.'}
};
async function certPage(req, env, url, base, id){
  const c = await env.DB.prepare('SELECT * FROM certs WHERE id = ?').bind(id).first();
  const qlang = url.searchParams.get('lang');
  const L = ['ru', 'kk', 'en'].includes(qlang) ? qlang : (c ? c.lang : pickLang(req, url));
  const T = CERT_T[L] || CERT_T.ru;
  if (!c) return html('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + esc(T.doc) + '</title><body style="font-family:system-ui;padding:40px;text-align:center"><h1>' + esc(T.none) + '</h1></body>', 404);
  const d = new Date(c.created + 5 * 3600e3), date = String(d.getUTCDate()).padStart(2, '0') + '.' + String(d.getUTCMonth() + 1).padStart(2, '0') + '.' + d.getUTCFullYear();
  const link = base + '/cert/' + c.id, nameB = '<b class="n">' + esc(c.name) + '</b>';
  const wa = 'https://wa.me/?text=' + encodeURIComponent(T.doc + ' ' + T.sub + ' — ' + c.name + '\n' + link);
  return html(`<!doctype html><html lang="${L}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(T.doc)} ${esc(c.id)} — ${esc(c.name)}</title>
<meta property="og:title" content="${esc(T.doc + ' ' + T.sub + ' — ' + c.name)}"><meta property="og:description" content="${esc(T.course)}"><meta property="og:url" content="${esc(link)}">
<style>
@page{size:A4 landscape;margin:0}
*{box-sizing:border-box}body{margin:0;background:#E7EBEF;font:16px/1.5 'Golos Text',system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif;color:#14202B}
.wrap{max-width:1000px;margin:0 auto;padding:20px 16px 40px}
.cert{background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 20px 50px -25px rgba(20,32,43,.5);aspect-ratio:297/210;display:flex;flex-direction:column}
.st{display:flex;height:10px}.st i{flex:1}
.in{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:4% 7%;border:3px solid #F2A900;margin:3%;border-radius:12px;gap:1.2vmin}
.logo{width:64px;height:64px;border-radius:50%;background:#F2A900;display:grid;place-items:center}
h1{margin:0;font-size:clamp(28px,5vw,52px);letter-spacing:.06em;text-transform:uppercase}
.sub{margin:0;color:#55636F;font-size:clamp(14px,2vw,20px)}
.course{margin:0;font-weight:700;font-size:clamp(14px,2.2vw,22px)}
.body{margin:0;max-width:720px;font-size:clamp(13px,1.9vw,19px)}
.n{display:block;font-size:clamp(22px,4vw,40px);margin:.3em 0;color:#14202B}
.meta{display:flex;gap:28px;justify-content:center;flex-wrap:wrap;color:#55636F;font-size:clamp(12px,1.6vw,15px)}
.meta b{color:#14202B}
.who{margin:0;font-weight:600}
.note{margin:0;color:#7A8792;font-size:clamp(10px,1.3vw,12px)}
.ok{display:flex;gap:10px;align-items:center;background:#DDF0DE;color:#1F5E23;border-radius:12px;padding:10px 14px;margin:16px 0 0;font-weight:600}
.btns{display:flex;gap:10px;flex-wrap:wrap;margin-top:14px}
.btns a,.btns button{display:inline-flex;align-items:center;min-height:46px;padding:10px 18px;border-radius:12px;border:0;font:inherit;font-weight:700;text-decoration:none;cursor:pointer}
.p{background:#F2A900;color:#1C1400}.w{background:#1FA855;color:#fff}
@media (max-width:700px){.cert{aspect-ratio:auto}.in{margin:12px;padding:22px 14px;gap:10px}}
@media print{body{background:#fff}.wrap{max-width:none;padding:0}.cert{box-shadow:none;border-radius:0;width:297mm;height:210mm;aspect-ratio:auto}.ok,.btns{display:none}}
</style></head><body><div class="wrap">
<div class="cert"><div class="st"><i style="background:#8B5A2B"></i><i style="background:#D32F2F"></i><i style="background:#1E5BD8"></i><i style="background:#F2C200"></i><i style="background:#E4E8EC"></i><i style="background:#2E9E4F"></i><i style="background:#F07F12"></i></div>
<div class="in">
<div class="logo"><svg width="38" height="38" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.2" stroke="#1C1400" stroke-width="2.6"/><path d="M13.2 5.6 8.6 13h3.1l-1 5.4 4.7-7.6h-3.1z" fill="#1C1400"/></svg></div>
<h1>${esc(T.doc)}</h1><p class="sub">${esc(T.sub)}</p>
<p class="course">${esc(T.course)}</p>
<p class="body">${T.body(nameB, c.lessons, c.score, c.total)}</p>
<div class="meta"><span>${esc(T.date)}: <b>${date}</b></span><span>${esc(T.num)}: <b>${esc(c.id)}</b></span></div>
<p class="who">${esc(T.who)} · AVTOELEKTRIK-PRO.KZ</p>
<p class="note">${esc(T.note)}</p>
</div></div>
<p class="ok">✓ ${esc(T.ok)}</p>
<div class="btns"><button class="p" onclick="window.print()">${esc(T.print)}</button><a class="w" href="${esc(wa)}" target="_blank" rel="noopener">${esc(T.share)}</a></div>
</div></body></html>`, 200, {'cache-control': 'public, max-age=300'});
}
const REASONS = ['spam', 'offensive', 'fake', 'wrong', 'illegal', 'other'];
async function apiReport(req, env){
  const b = await req.json().catch(() => null);
  if (!b) return fail(req, env, 'bad_request');
  if (b.website) return json(req, env, {ok: true});
  const id = String(b.id || ''), reason = REASONS.includes(b.reason) ? b.reason : 'other', rv = b.review ? Number(b.review) || null : null;
  const m = await env.DB.prepare('SELECT id FROM masters WHERE id = ?').bind(id).first();
  if (!m) return fail(req, env, 'not_found', 404);
  if (rv && !(await env.DB.prepare('SELECT id FROM reviews WHERE id = ? AND master = ?').bind(rv, id).first())) return fail(req, env, 'not_found', 404);
  if (await limited(req, env, 'report', 20)) return fail(req, env, 'limit', 429);
  const dev = /^w?[0-9a-f]{32}$/.test(String(b.device || '')) ? String(b.device) : '';
  await env.DB.prepare('INSERT INTO reports (master, review, reason, text, device, created) VALUES (?, ?, ?, ?, ?, ?)').bind(id, rv, reason, clean(b.text, 300), dev, now()).run();
  return json(req, env, {ok: true});
}
async function apiMaster(req, env, url, base){
  const id = String(url.searchParams.get('id') || '');
  const m = await env.DB.prepare('SELECT ' + PUB + " FROM masters WHERE id = ? AND status = 'approved'").bind(id).first();
  if (!m) return fail(req, env, 'not_found', 404);
  const rt = await ratingsFor(env, [id]);
  const reviews = (await loadReviews(env, id, false)).map(({hidden, ...x}) => x);
  const dev = String(url.searchParams.get('device') || '');
  let mine = null;
  if (/^w?[0-9a-f]{32}$/.test(dev)){
    const r = await env.DB.prepare('SELECT stars, name, text FROM reviews WHERE master = ? AND device = ?').bind(id, dev).first();
    if (r) mine = r;
  }
  return json(req, env, {ok: true, master: pub(m, rt[id], base), reviews, mine});
}
function readCard(b){
  const name = oneLine(b.name, 60), cityK = cityKey(b.city), city = cityNice(b.city), cats = okCats(b.cats);
  const phone = normPhone(b.phone), wa = b.wa ? normPhone(b.wa) : phone, site = normSite(b.site);
  const err = !name || name.length < 2 ? 'name' : !city ? 'city' : !cats.length ? 'cats' : !phone ? 'phone' : (b.wa && !wa) ? 'wa' : site === null ? 'site' : '';
  return {err, card: {name, city, city_key: cityK, cats, about: clean(b.about, 600), phone, wa, address: oneLine(b.address, 160), site: site || ''}};
}
async function apiApply(req, env, base){
  const b = await req.json().catch(() => null);
  if (!b || typeof b !== 'object') return fail(req, env, 'bad_request');
  if (b.website) return json(req, env, {ok: true, id: 'x', key: 'x', status: 'pending'});   // ловушка для ботов
  if (!b.consent) return fail(req, env, 'consent');
  const {err, card} = readCard(b);
  if (err) return fail(req, env, err);
  if (conflict(card.city_key, card.cats)) return fail(req, env, 'competitor');
  const ph = parsePhoto(b.photo);
  if (ph && ph.error) return fail(req, env, ph.error);
  if (await limited(req, env, 'apply', 5)) return fail(req, env, 'limit', 429);
  const dev = /^w?[0-9a-f]{32}$/.test(String(b.device || '')) ? String(b.device) : '';
  let id = newId();
  for (let i = 0; i < 5 && await env.DB.prepare('SELECT 1 FROM masters WHERE id = ?').bind(id).first(); i++) id = newId();
  const key = b64url(rnd(24)), t = now();
  await env.DB.prepare('INSERT INTO masters (id, status, name, city, city_key, cats, about, phone, wa, address, site, photo, photo_type, photo_v, device, edit_hash, lang, created, updated) VALUES (?, \'pending\', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
    .bind(id, card.name, card.city, card.city_key, JSON.stringify(card.cats), card.about, card.phone, card.wa, card.address, card.site,
      ph ? ph.b64 : null, ph ? ph.type : null, ph ? 1 : 0, dev, await sha256hex(key), LANGS.includes(b.lang) ? b.lang : 'ru', t, t).run();
  return json(req, env, {ok: true, id, key, status: 'pending', url: base + '/' + id, edit: APP_URL + '#mastera-edit=' + id + '.' + key});
}
async function ownCard(env, id, key){
  if (!/^[a-z0-9]{8}$/.test(String(id || '')) || !key) return null;
  const m = await env.DB.prepare('SELECT ' + PUB + ', edit_hash, note FROM masters WHERE id = ?').bind(id).first();
  if (!m || m.edit_hash !== await sha256hex(String(key))) return null;
  return m;
}
async function apiMine(req, env, url, base){
  const m = await ownCard(env, url.searchParams.get('id'), url.searchParams.get('key'));
  if (!m) return fail(req, env, 'not_found', 404);
  const rt = await ratingsFor(env, [m.id]);
  return json(req, env, {ok: true, master: {...pub(m, rt[m.id], base), status: m.status, note: m.note}});
}
async function apiUpdate(req, env, base){
  const b = await req.json().catch(() => null);
  if (!b) return fail(req, env, 'bad_request');
  const m = await ownCard(env, b.id, b.key);
  if (!m) return fail(req, env, 'not_found', 404);
  const {err, card} = readCard(b);
  if (err) return fail(req, env, err);
  if (conflict(card.city_key, card.cats)) return fail(req, env, 'competitor');
  const ph = b.photo === null ? {remove: true} : parsePhoto(b.photo);
  if (ph && ph.error) return fail(req, env, ph.error);
  if (await limited(req, env, 'update', 30)) return fail(req, env, 'limit', 429);
  const oldCats = JSON.parse(m.cats || '[]').slice().sort().join(','), newCats = card.cats.slice().sort().join(',');
  const recheck = m.status !== 'approved' || cityKey(m.city) !== card.city_key || oldCats !== newCats || m.name !== card.name;
  const status = m.status === 'rejected' ? 'pending' : recheck ? 'pending' : 'approved';
  let sql = 'UPDATE masters SET status = ?, name = ?, city = ?, city_key = ?, cats = ?, about = ?, phone = ?, wa = ?, address = ?, site = ?, updated = ?';
  const args = [status, card.name, card.city, card.city_key, JSON.stringify(card.cats), card.about, card.phone, card.wa, card.address, card.site, now()];
  if (ph && ph.remove){ sql += ', photo = NULL, photo_type = NULL, photo_v = photo_v + 1'; }
  else if (ph){ sql += ', photo = ?, photo_type = ?, photo_v = photo_v + 1'; args.push(ph.b64, ph.type); }
  if (status === 'pending') sql += ", note = ''";
  sql += ' WHERE id = ?'; args.push(m.id);
  await env.DB.prepare(sql).bind(...args).run();
  return json(req, env, {ok: true, status, url: base + '/' + m.id});
}
async function apiRemove(req, env){
  const b = await req.json().catch(() => null);
  const m = b && await ownCard(env, b.id, b.key);
  if (!m) return fail(req, env, 'not_found', 404);
  await env.DB.batch([env.DB.prepare('DELETE FROM reviews WHERE master = ?').bind(m.id), env.DB.prepare('DELETE FROM masters WHERE id = ?').bind(m.id)]);
  return json(req, env, {ok: true});
}
async function apiReview(req, env){
  const b = await req.json().catch(() => null);
  if (!b) return fail(req, env, 'bad_request');
  if (b.website) return json(req, env, {ok: true});
  const id = String(b.id || ''), dev = String(b.device || ''), stars = Math.round(Number(b.stars));
  if (!/^w?[0-9a-f]{32}$/.test(dev)) return fail(req, env, 'device');
  if (!(stars >= 1 && stars <= 5)) return fail(req, env, 'stars');
  const m = await env.DB.prepare("SELECT id, device FROM masters WHERE id = ? AND status = 'approved'").bind(id).first();
  if (!m) return fail(req, env, 'not_found', 404);
  if (m.device && m.device === dev) return fail(req, env, 'own');
  if (await limited(req, env, 'review', 20)) return fail(req, env, 'limit', 429);
  const t = now(), name = oneLine(b.name, 40), text = clean(b.text, 800);
  await env.DB.prepare('INSERT INTO reviews (master, device, name, stars, text, created, updated) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(master, device) DO UPDATE SET name = excluded.name, stars = excluded.stars, text = excluded.text, updated = excluded.updated')
    .bind(id, dev, name, stars, text, t, t).run();
  const rt = await ratingsFor(env, [id]);
  return json(req, env, {ok: true, rating: (rt[id] || {}).avg || 0, votes: (rt[id] || {}).n || 0});
}
async function apiPendingCount(req, env){
  const r = await env.DB.prepare("SELECT COUNT(*) AS n FROM masters WHERE status = 'pending'").first();
  const q = await env.DB.prepare('SELECT COUNT(*) AS n FROM reports WHERE done = 0').first();
  return json(req, env, {ok: true, pending: r ? r.n : 0, reports: q ? q.n : 0});
}

/* ---------- модерация ---------- */
async function adminHash(env){ return env.ADMIN_KEY ? sha256hex(env.ADMIN_KEY) : setting(env, 'admin_hash'); }
async function isAdmin(req, env){
  const k = req.headers.get('x-admin-key') || '';
  const want = await adminHash(env);
  if (!want || !k) return false;
  const a = await sha256hex(k);
  let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ want.charCodeAt(i);
  return d === 0;
}
async function apiAdminState(req, env){ return json(req, env, {ok: true, configured: !!(await adminHash(env))}); }
async function apiAdminSetup(req, env){
  if (await adminHash(env)) return fail(req, env, 'configured', 409);
  const b = await req.json().catch(() => ({}));
  const k = String(b.key || '');
  if (k.length < 10) return fail(req, env, 'short');
  await env.DB.prepare('INSERT OR IGNORE INTO settings (k, v) VALUES (?, ?)').bind('admin_hash', await sha256hex(k)).run();
  return json(req, env, {ok: true});
}
async function apiAdmin(req, env, url, base, path){
  if (!await isAdmin(req, env)) return fail(req, env, 'forbidden', 403);
  if (path === '/api/admin/list'){
    const st = url.searchParams.get('status') || 'pending';
    const r = await env.DB.prepare('SELECT ' + PUB + ", note, device FROM masters WHERE status = ? ORDER BY updated DESC LIMIT 300").bind(st).all();
    const list = r.results || [];
    const rt = await ratingsFor(env, list.map(m => m.id));
    const counts = await env.DB.prepare('SELECT status, COUNT(*) AS n FROM masters GROUP BY status').all();
    return json(req, env, {ok: true, masters: list.map(m => ({...pub(m, rt[m.id], base), status: m.status, note: m.note, updated: m.updated})),
      counts: Object.fromEntries((counts.results || []).map(x => [x.status, x.n]))});
  }
  if (path === '/api/admin/codes'){
    const r = await env.DB.prepare('SELECT code, product, note, devices, max_devices, revoked, created, used FROM codes ORDER BY created DESC LIMIT 500').all();
    return json(req, env, {ok: true, codes: (r.results || []).map(x => ({...x, code: fmtCode(x.code), devices: JSON.parse(x.devices || '[]').length}))});
  }
  if (path === '/api/admin/reports'){
    const r = await env.DB.prepare('SELECT p.id, p.master, p.review, p.reason, p.text, p.created, p.done, m.name AS mname, m.city AS mcity, m.status AS mstatus, v.name AS rname, v.stars AS rstars, v.text AS rtext, v.hidden AS rhidden FROM reports p LEFT JOIN masters m ON m.id = p.master LEFT JOIN reviews v ON v.id = p.review ORDER BY p.done ASC, p.created DESC LIMIT 300').all();
    return json(req, env, {ok: true, reports: r.results || []});
  }
  if (path === '/api/admin/reviews'){
    const r = await env.DB.prepare('SELECT r.id, r.master, r.name, r.stars, r.text, r.hidden, r.updated, m.name AS mname, m.city AS mcity FROM reviews r LEFT JOIN masters m ON m.id = r.master ORDER BY r.updated DESC LIMIT 300').all();
    return json(req, env, {ok: true, reviews: r.results || []});
  }
  if (req.method !== 'POST') return fail(req, env, 'method', 405);
  const b = await req.json().catch(() => ({}));
  if (path === '/api/admin/set'){
    if (!['approved', 'rejected', 'pending'].includes(b.status)) return fail(req, env, 'status');
    await env.DB.prepare('UPDATE masters SET status = ?, note = ?, approved = CASE WHEN ? = \'approved\' THEN COALESCE(approved, ?) ELSE approved END WHERE id = ?')
      .bind(b.status, oneLine(b.note, 300), b.status, now(), String(b.id || '')).run();
    return json(req, env, {ok: true});
  }
  if (path === '/api/admin/code-new'){
    const product = PRODUCTS.includes(b.product) ? b.product : 'course-pro';
    let code = newCode();
    for (let i = 0; i < 5 && await env.DB.prepare('SELECT 1 FROM codes WHERE code = ?').bind(code).first(); i++) code = newCode();
    await env.DB.prepare('INSERT INTO codes (code, product, note, created) VALUES (?, ?, ?, ?)').bind(code, product, oneLine(b.note, 120), now()).run();
    return json(req, env, {ok: true, code: fmtCode(code)});
  }
  if (path === '/api/admin/code-revoke'){
    await env.DB.prepare('UPDATE codes SET revoked = ? WHERE code = ?').bind(b.revoked === false ? 0 : 1, normCode(b.code)).run();
    return json(req, env, {ok: true});
  }
  if (path === '/api/admin/report-done'){
    await env.DB.prepare('UPDATE reports SET done = 1 WHERE id = ?').bind(Number(b.id) || 0).run();
    return json(req, env, {ok: true});
  }
  if (path === '/api/admin/review'){
    await env.DB.prepare('UPDATE reviews SET hidden = ? WHERE id = ?').bind(b.hidden ? 1 : 0, Number(b.id) || 0).run();
    return json(req, env, {ok: true});
  }
  if (path === '/api/admin/delete'){
    const id = String(b.id || '');
    await env.DB.batch([env.DB.prepare('DELETE FROM reviews WHERE master = ?').bind(id), env.DB.prepare('DELETE FROM masters WHERE id = ?').bind(id)]);
    return json(req, env, {ok: true});
  }
  return fail(req, env, 'not_found', 404);
}

/* ---------- страницы ---------- */
const T = {
  ru: {brand: 'Мастера рядом', report: 'Пожаловаться', reportCard: 'Пожаловаться на карточку', rpTitle: 'Жалоба', rpReason: 'Причина', rpText: 'Подробнее (необязательно)', rpSend: 'Отправить жалобу', rpSent: 'Жалоба отправлена — Олег проверит.', rpCancel: 'Отмена', reasons: {spam: 'Спам или реклама', offensive: 'Оскорбления или угрозы', fake: 'Фальшивый отзыв', wrong: 'Неверные данные мастера', illegal: 'Незаконные услуги', other: 'Другое'}, agree: 'Я согласен с ', agreeLink: 'правилами раздела', needAgree: 'Отметьте согласие с правилами раздела.', call: 'Позвонить', wa: 'WhatsApp', site: 'Сайт', map: 'На карте', reviews: 'Отзывы', none: 'Отзывов пока нет — будьте первым.',
    leave: 'Оставить отзыв', yourName: 'Ваше имя (необязательно)', yourText: 'Ваш отзыв: что делали, как результат', send: 'Отправить', change: 'Изменить отзыв',
    thanks: 'Спасибо! Отзыв опубликован.', needStars: 'Поставьте оценку звёздами.', own: 'Нельзя оценить свою карточку.', limit: 'Слишком много отзывов сегодня. Попробуйте завтра.',
    err: 'Не получилось отправить. Проверьте интернет и попробуйте ещё раз.', qrTitle: 'QR-код карточки', qrNote: 'Покажите клиенту или распечатайте: по коду откроется эта карточка, здесь можно позвонить и оставить отзыв.',
    dl: 'Скачать QR', copy: 'Скопировать ссылку', copied: 'Ссылка скопирована', notFound: 'Карточка не найдена или ещё на проверке.',
    more: 'Мастера в других городах и помощь при поломке — в приложении «АвтоЭлектрик PRO».', open: 'Открыть приложение', place: 'Разместить свою карточку бесплатно',
    rv: ['отзыв', 'отзыва', 'отзывов'], noRating: 'пока без оценок', stars: ['Ужасно', 'Плохо', 'Нормально', 'Хорошо', 'Отлично']},
  kk: {brand: 'Жақын шеберлер', report: 'Шағымдану', reportCard: 'Карточкаға шағымдану', rpTitle: 'Шағым', rpReason: 'Себебі', rpText: 'Толығырақ (міндетті емес)', rpSend: 'Шағым жіберу', rpSent: 'Шағым жіберілді — Олег тексереді.', rpCancel: 'Болдырмау', reasons: {spam: 'Спам немесе жарнама', offensive: 'Қорлау немесе қорқыту', fake: 'Жалған пікір', wrong: 'Шебер туралы қате деректер', illegal: 'Заңсыз қызметтер', other: 'Басқа'}, agree: 'Мен келісемін: ', agreeLink: 'бөлім ережелері', needAgree: 'Бөлім ережелерімен келісетініңізді белгілеңіз.', call: 'Қоңырау шалу', wa: 'WhatsApp', site: 'Сайт', map: 'Картада', reviews: 'Пікірлер', none: 'Әзірге пікір жоқ — бірінші болыңыз.',
    leave: 'Пікір қалдыру', yourName: 'Атыңыз (міндетті емес)', yourText: 'Пікіріңіз: не істелді, нәтижесі қандай', send: 'Жіберу', change: 'Пікірді өзгерту',
    thanks: 'Рақмет! Пікір жарияланды.', needStars: 'Жұлдызшамен баға қойыңыз.', own: 'Өз карточкаңызды бағалауға болмайды.', limit: 'Бүгін пікір тым көп. Ертең қайталаңыз.',
    err: 'Жіберу мүмкін болмады. Интернетті тексеріп, қайталап көріңіз.', qrTitle: 'Карточканың QR-коды', qrNote: 'Клиентке көрсетіңіз немесе басып шығарыңыз: код арқылы осы карточка ашылады, мұнда қоңырау шалып, пікір қалдыруға болады.',
    dl: 'QR жүктеу', copy: 'Сілтемені көшіру', copied: 'Сілтеме көшірілді', notFound: 'Карточка табылмады немесе әлі тексерілуде.',
    more: 'Басқа қалалардағы шеберлер және бұзылғанда көмек — «АвтоЭлектрик PRO» қосымшасында.', open: 'Қосымшаны ашу', place: 'Өз карточкаңызды тегін орналастыру',
    rv: ['пікір', 'пікір', 'пікір'], noRating: 'әзірге баға жоқ', stars: ['Өте нашар', 'Нашар', 'Орташа', 'Жақсы', 'Тамаша']},
  en: {brand: 'Mechanics nearby', report: 'Report', reportCard: 'Report this listing', rpTitle: 'Report', rpReason: 'Reason', rpText: 'Details (optional)', rpSend: 'Send report', rpSent: 'Report sent — Oleg will review it.', rpCancel: 'Cancel', reasons: {spam: 'Spam or advertising', offensive: 'Insults or threats', fake: 'Fake review', wrong: 'Wrong listing details', illegal: 'Illegal services', other: 'Other'}, agree: 'I agree to the ', agreeLink: 'section rules', needAgree: 'Please agree to the section rules.', call: 'Call', wa: 'WhatsApp', site: 'Website', map: 'Map', reviews: 'Reviews', none: 'No reviews yet — be the first.',
    leave: 'Leave a review', yourName: 'Your name (optional)', yourText: 'Your review: what was done and how it went', send: 'Send', change: 'Edit your review',
    thanks: 'Thank you! Your review is published.', needStars: 'Please choose a star rating.', own: 'You can’t rate your own listing.', limit: 'Too many reviews today. Please try tomorrow.',
    err: 'Couldn’t send. Check your connection and try again.', qrTitle: 'Listing QR code', qrNote: 'Show it to a customer or print it: the code opens this listing, where they can call and leave a review.',
    dl: 'Download QR', copy: 'Copy link', copied: 'Link copied', notFound: 'Listing not found or still under review.',
    more: 'Mechanics in other cities and help when your car breaks down — in the AvtoElektrik PRO app.', open: 'Open the app', place: 'List your business for free',
    rv: ['review', 'reviews', 'reviews'], noRating: 'no ratings yet', stars: ['Terrible', 'Poor', 'OK', 'Good', 'Excellent']},
};
function pickLang(req, url){
  const q = url.searchParams.get('lang');
  if (LANGS.includes(q)) return q;
  const al = (req.headers.get('accept-language') || '').toLowerCase();
  return al.startsWith('kk') ? 'kk' : al.startsWith('en') ? 'en' : 'ru';
}
const catName = (c, L) => (CATS[c] || CATS.other)[LANGS.indexOf(L)];
const plural = (n, f) => { const a = n % 10, b = n % 100; return a === 1 && b !== 11 ? f[0] : a >= 2 && a <= 4 && (b < 12 || b > 14) ? f[1] : f[2]; };
const starStr = v => { let s = ''; for (let i = 1; i <= 5; i++) s += '<span class="s' + (v >= i - 0.25 ? ' on' : v >= i - 0.75 ? ' half' : '') + '">★</span>'; return s; };
const fmtDate = (t, L) => new Date(t).toLocaleDateString(L === 'en' ? 'en-GB' : L === 'kk' ? 'kk-KZ' : 'ru-RU', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Almaty'});

const PAGE_CSS = `:root{--bg:#E7EBEF;--surface:#F8FAFB;--ink:#14202B;--muted:#55636F;--line:#C8D1D9;--accent:#F2A900;--on-accent:#1C1400;--accent-ink:#8A5900;--accent-soft:#FAEBC4;--head:#14202B;--ok:#1F7A3A;--bad:#B3261E;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#0E1419;--surface:#172029;--ink:#E5EBF0;--muted:#94A3AF;--line:#2A3846;--accent:#F5B526;--accent-ink:#F5C452;--accent-soft:#33290F;--head:#0A0F13;--ok:#6CCB86;--bad:#F2918A;color-scheme:dark}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 'Golos Text',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}
a{color:inherit}.top{background:var(--head);color:#fff;padding:12px max(16px,env(safe-area-inset-left)) 12px max(16px,env(safe-area-inset-right));display:flex;align-items:center;gap:10px}
.top b{font-weight:700}.top span{color:#C9D3DC;font-size:14px}.logo{width:30px;height:30px;border-radius:50%;background:var(--accent);color:var(--on-accent);display:grid;place-items:center;font-weight:800}
main{max-width:640px;margin:0 auto;padding:16px max(16px,env(safe-area-inset-left)) 40px max(16px,env(safe-area-inset-right));display:flex;flex-direction:column;gap:14px}
.card{background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:16px;display:flex;flex-direction:column;gap:12px}
.hero{display:flex;gap:14px;align-items:center}.ph{flex:none;width:84px;height:84px;border-radius:18px;object-fit:cover;background:var(--accent-soft)}
.ini{flex:none;width:84px;height:84px;border-radius:18px;background:var(--accent);color:var(--on-accent);display:grid;place-items:center;font-size:32px;font-weight:800}
h1{font-size:22px;line-height:1.2;margin:0;text-wrap:balance}.city{color:var(--muted);font-size:14px;margin-top:2px}
.chips{display:flex;flex-wrap:wrap;gap:6px}.chip{background:var(--accent-soft);color:var(--accent-ink);border-radius:999px;padding:4px 10px;font-size:13px;font-weight:600}
.rate{display:flex;align-items:center;gap:8px;font-size:14px;color:var(--muted)}.rate b{color:var(--ink);font-size:18px}
.s{color:var(--line);font-size:18px;letter-spacing:1px}.s.on{color:var(--accent)}.s.half{background:linear-gradient(90deg,var(--accent) 50%,var(--line) 50%);-webkit-background-clip:text;background-clip:text;color:transparent}
.about{white-space:pre-line;margin:0}.btns{display:flex;flex-wrap:wrap;gap:8px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:46px;padding:10px 16px;border-radius:14px;border:1.5px solid var(--line);background:var(--surface);color:var(--ink);font:inherit;font-weight:600;text-decoration:none;cursor:pointer}
.btn.pri{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}.btn.wa{background:#1FA855;border-color:#1FA855;color:#fff}.btn.grow{flex:1 1 140px}
.addr{font-size:15px}.addr a{color:var(--accent-ink);font-weight:600}
h2{font-size:18px;margin:0}.rv{border-top:1px solid var(--line);padding-top:10px;display:flex;flex-direction:column;gap:4px}.rv:first-of-type{border-top:0;padding-top:0}
.rv-h{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font-size:14px;color:var(--muted)}.rv-h b{color:var(--ink)}.rv p{margin:0;white-space:pre-line}
.pick{display:flex;gap:4px}.pick button{background:none;border:0;font-size:34px;line-height:1;color:var(--line);cursor:pointer;padding:2px}.pick button.on{color:var(--accent)}
.pick-l{font-size:14px;color:var(--muted);min-height:20px}input,textarea{width:100%;font:inherit;color:var(--ink);background:var(--bg);border:1.5px solid var(--line);border-radius:12px;padding:10px 12px}
textarea{min-height:96px;resize:vertical}.msg{font-size:15px;font-weight:600}.msg.ok{color:var(--ok)}.msg.bad{color:var(--bad)}
.qr{display:flex;gap:14px;align-items:center;flex-wrap:wrap}.qr svg{width:150px;height:150px;flex:none;border-radius:10px;border:1px solid var(--line)}.qr-t{flex:1 1 200px;min-width:0;display:flex;flex-direction:column;gap:8px}
.qr-t p{margin:0;font-size:14px;color:var(--muted)}.link{font-size:14px;word-break:break-all;color:var(--muted)}.foot{text-align:center;color:var(--muted);font-size:14px;display:flex;flex-direction:column;gap:10px;align-items:center}
.hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}
.lnk{align-self:flex-start;background:none;border:0;padding:4px 0;font:inherit;font-size:13px;color:var(--muted);text-decoration:underline;cursor:pointer}
.agree{display:flex;gap:8px;align-items:flex-start;font-size:14px}.agree input{width:18px;height:18px;margin-top:2px;flex:none}.agree a{color:var(--accent-ink);font-weight:600}
select{width:100%;font:inherit;color:var(--ink);background:var(--bg);border:1.5px solid var(--line);border-radius:12px;padding:10px 12px}.lbl{font-size:13px;font-weight:600;color:var(--muted)}.rp-q{margin:0;color:var(--muted);font-size:14px;font-style:italic}`;

function topBar(L){ return '<header class="top"><span class="logo" aria-hidden="true">⚡</span><b>АвтоЭлектрик PRO</b><span>· ' + esc(T[L].brand) + '</span></header>'; }
function notFoundPage(L){
  const t = T[L];
  return html('<!doctype html><html lang="' + L + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex"><title>' + esc(t.brand) + '</title><style>' + PAGE_CSS + '</style></head><body>' + topBar(L) +
    '<main><div class="card"><p>' + esc(t.notFound) + '</p><a class="btn pri" href="' + APP_URL + '#mastera">' + esc(t.open) + '</a></div></main></body></html>', 404);
}
async function cardPage(req, env, url, base, id){
  const L = pickLang(req, url), t = T[L];
  const m = await env.DB.prepare('SELECT ' + PUB + " FROM masters WHERE id = ? AND status = 'approved'").bind(id).first();
  if (!m) return notFoundPage(L);
  const rt = (await ratingsFor(env, [id]))[id] || {n: 0, avg: 0};
  const x = pub(m, rt, base), reviews = (await loadReviews(env, id, false));
  const cats = x.cats.map(c => catName(c, L));
  const title = x.name + ' — ' + cats.slice(0, 2).join(', ') + ', ' + x.city;
  const desc = (rt.n ? '★ ' + rt.avg.toFixed(1) + ' (' + rt.n + ' ' + plural(rt.n, t.rv) + ') · ' : '') + (x.about || cats.join(', ')).replace(/\s+/g, ' ').slice(0, 150);
  const digits = x.wa.replace(/\D/g, ''), q = encodeURIComponent(x.city + ', ' + x.address);
  const ini = x.name.trim().charAt(0).toUpperCase();
  const share = base + '/' + id;
  const body = topBar(L) + '<main>' +
    '<section class="card"><div class="hero">' + (x.photo ? '<img class="ph" src="' + esc(x.photo) + '" alt="" width="84" height="84">' : '<div class="ini" aria-hidden="true">' + esc(ini) + '</div>') +
    '<div><h1>' + esc(x.name) + '</h1><div class="city">' + esc(x.city) + '</div></div></div>' +
    '<div class="chips">' + cats.map(c => '<span class="chip">' + esc(c) + '</span>').join('') + '</div>' +
    '<div class="rate">' + (rt.n ? '<b>' + rt.avg.toFixed(1) + '</b><span aria-hidden="true">' + starStr(rt.avg) + '</span><span>' + rt.n + ' ' + esc(plural(rt.n, t.rv)) + '</span>' : '<span aria-hidden="true">' + starStr(0) + '</span><span>' + esc(t.noRating) + '</span>') + '</div>' +
    (x.about ? '<p class="about">' + esc(x.about) + '</p>' : '') +
    (x.address ? '<div class="addr">' + esc(x.address) + ' · <a href="https://2gis.kz/search/' + q + '" target="_blank" rel="noopener">2ГИС</a> · <a href="https://www.google.com/maps/search/?api=1&query=' + q + '" target="_blank" rel="noopener">Google</a></div>' : '') +
    '<div class="btns"><a class="btn pri grow" href="tel:' + esc(x.phone) + '">' + esc(t.call) + ' ' + esc(x.phone) + '</a><a class="btn wa grow" href="https://wa.me/' + digits + '" target="_blank" rel="noopener">' + esc(t.wa) + '</a>' +
    (x.site ? '<a class="btn grow" href="' + esc(x.site) + '" target="_blank" rel="noopener nofollow ugc">' + esc(t.site) + '</a>' : '') + '</div></section>' +
    '<section class="card" id="reviews"><h2>' + esc(t.reviews) + '</h2>' + (reviews.length ? reviews.map(r => '<div class="rv"><div class="rv-h"><b>' + esc(r.name || '—') + '</b><span>' + fmtDate(r.date, L) + '</span></div><span aria-label="' + r.stars + '/5">' + starStr(r.stars) + '</span>' + (r.text ? '<p>' + esc(r.text) + '</p>' : '') + '<button type="button" class="lnk" data-rp="' + r.id + '">' + esc(t.report) + '</button></div>').join('') : '<p>' + esc(t.none) + '</p>') + '</section>' +
    '<section class="card"><h2 id="lv">' + esc(t.leave) + '</h2><form id="f" novalidate><div class="pick" role="radiogroup" aria-labelledby="lv">' +
    [1, 2, 3, 4, 5].map(i => '<button type="button" role="radio" aria-checked="false" aria-label="' + i + ' — ' + esc(t.stars[i - 1]) + '" data-v="' + i + '">★</button>').join('') + '</div><div class="pick-l" id="pl"></div>' +
    '<input id="nm" maxlength="40" autocomplete="name" placeholder="' + esc(t.yourName) + '"><textarea id="tx" maxlength="800" placeholder="' + esc(t.yourText) + '"></textarea><input class="hp" id="hp" tabindex="-1" autocomplete="off" aria-hidden="true">' +
    '<label class="agree"><input type="checkbox" id="ag"> <span>' + esc(t.agree) + '<a href="https://help.avtoelektrik-pro.kz/pravila.html" target="_blank" rel="noopener">' + esc(t.agreeLink) + '</a></span></label>' +
    '<button class="btn pri" type="submit" id="sb">' + esc(t.send) + '</button><div class="msg" id="mg" role="status"></div></form></section>' +
    '<section class="card" id="rps" hidden><h2>' + esc(t.rpTitle) + '</h2><p class="rp-q" id="rpq"></p><label class="lbl" for="rpr">' + esc(t.rpReason) + '</label><select id="rpr">' + REASONS.map(k => '<option value="' + k + '">' + esc(t.reasons[k]) + '</option>').join('') + '</select><textarea id="rpt" maxlength="300" placeholder="' + esc(t.rpText) + '"></textarea><div class="btns"><button class="btn pri" type="button" id="rpgo">' + esc(t.rpSend) + '</button><button class="btn" type="button" id="rpx">' + esc(t.rpCancel) + '</button></div><div class="msg" id="rpm" role="status"></div></section>' +
    '<section class="card"><h2>' + esc(t.qrTitle) + '</h2><div class="qr">' + qrSvg(share) + '<div class="qr-t"><p>' + esc(t.qrNote) + '</p><div class="link">' + esc(share) + '</div><div class="btns"><a class="btn" href="/qr/' + id + '.svg?download=1">' + esc(t.dl) + '</a><button class="btn" type="button" id="cp">' + esc(t.copy) + '</button></div></div></div></section>' +
    '<div class="foot"><button type="button" class="lnk" data-rp="card">' + esc(t.reportCard) + '</button><span>' + esc(t.more) + '</span><a class="btn pri" href="' + APP_URL + '#mastera">' + esc(t.open) + '</a><a href="' + APP_URL + '#mastera-add">' + esc(t.place) + '</a></div></main>' +
    '<script>(function(){var T=' + JSON.stringify({needStars: t.needStars, thanks: t.thanks, own: t.own, limit: t.limit, err: t.err, copied: t.copied, change: t.change, stars: t.stars, needAgree: t.needAgree, rpSent: t.rpSent, report: t.report, reportCard: t.reportCard}).replace(/</g, '\\u003c') + ',ID=' + JSON.stringify(id) + ',v=0;' +
    'function dev(){var d;try{d=localStorage.getItem("ae.dev")}catch(e){}if(!d){var a=new Uint8Array(16);crypto.getRandomValues(a);d="w"+Array.prototype.map.call(a,function(x){return("0"+x.toString(16)).slice(-2)}).join("");try{localStorage.setItem("ae.dev",d)}catch(e){}}return d}' +
    'var bs=document.querySelectorAll(".pick button"),pl=document.getElementById("pl"),mg=document.getElementById("mg");function set(n){v=n;bs.forEach(function(b){var on=+b.dataset.v<=n;b.classList.toggle("on",on);b.setAttribute("aria-checked",String(+b.dataset.v===n))});pl.textContent=n?T.stars[n-1]:""}' +
    'bs.forEach(function(b){b.addEventListener("click",function(){set(+b.dataset.v)})});' +
    'fetch("/api/master?id="+ID+"&device="+dev()).then(function(r){return r.json()}).then(function(j){if(j.mine){set(j.mine.stars);document.getElementById("nm").value=j.mine.name||"";document.getElementById("tx").value=j.mine.text||"";document.getElementById("sb").textContent=T.change}}).catch(function(){});' +
    'var ag=document.getElementById("ag");try{if(localStorage.getItem("ae.rules")==="1")ag.checked=true}catch(e){}' +
    'document.getElementById("f").addEventListener("submit",function(e){e.preventDefault();if(!v){mg.className="msg bad";mg.textContent=T.needStars;return}if(!ag.checked){mg.className="msg bad";mg.textContent=T.needAgree;return}try{localStorage.setItem("ae.rules","1")}catch(e){}mg.className="msg";mg.textContent="…";' +
    'fetch("/api/review",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({id:ID,device:dev(),stars:v,name:document.getElementById("nm").value,text:document.getElementById("tx").value,website:document.getElementById("hp").value})})' +
    '.then(function(r){return r.json()}).then(function(j){if(j.ok){mg.className="msg ok";mg.textContent=T.thanks;setTimeout(function(){location.reload()},1200)}else{mg.className="msg bad";mg.textContent=j.error==="own"?T.own:j.error==="limit"?T.limit:T.err}}).catch(function(){mg.className="msg bad";mg.textContent=T.err})});' +
    'var rps=document.getElementById("rps"),rpm=document.getElementById("rpm"),RV=null;document.addEventListener("click",function(e){var b=e.target.closest("[data-rp]");if(!b)return;RV=b.dataset.rp==="card"?null:+b.dataset.rp;document.getElementById("rpq").textContent=RV?b.parentNode.querySelector("p")?b.parentNode.querySelector("p").textContent.slice(0,120):"":"";rpm.textContent="";rps.hidden=false;rps.scrollIntoView({behavior:"smooth",block:"center"})});' +
    'document.getElementById("rpx").onclick=function(){rps.hidden=true};document.getElementById("rpgo").onclick=function(){rpm.className="msg";rpm.textContent="…";fetch("/api/report",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({id:ID,review:RV,reason:document.getElementById("rpr").value,text:document.getElementById("rpt").value,device:dev()})}).then(function(r){return r.json()}).then(function(j){if(j.ok){rpm.className="msg ok";rpm.textContent=T.rpSent;setTimeout(function(){rps.hidden=true},1600)}else{rpm.className="msg bad";rpm.textContent=j.error==="limit"?T.limit:T.err}}).catch(function(){rpm.className="msg bad";rpm.textContent=T.err})};' +
    'document.getElementById("cp").addEventListener("click",function(){var u=' + JSON.stringify(share) + ',b=this;(navigator.clipboard?navigator.clipboard.writeText(u):Promise.reject()).then(function(){b.textContent=T.copied}).catch(function(){prompt("",u)})})})();</script>';
  const head = '<!doctype html><html lang="' + L + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">' +
    '<title>' + esc(title) + '</title><meta name="description" content="' + esc(desc) + '">' +
    '<meta property="og:type" content="profile"><meta property="og:title" content="' + esc(title) + '"><meta property="og:description" content="' + esc(desc) + '">' +
    '<meta property="og:image" content="' + esc(x.photo || OG_DEFAULT) + '"><meta property="og:url" content="' + esc(share) + '"><meta property="og:site_name" content="АвтоЭлектрик PRO">' +
    '<meta name="twitter:card" content="summary"><link rel="canonical" href="' + esc(share) + '"><meta name="theme-color" content="#14202B"><style>' + PAGE_CSS + '</style></head><body>';
  return html(head + body + '</body></html>', 200, {'cache-control': 'public, max-age=60'});
}

async function photo(req, env, id){
  const m = await env.DB.prepare("SELECT photo, photo_type FROM masters WHERE id = ? AND photo IS NOT NULL").bind(id).first();
  if (!m) return new Response('not found', {status: 404});
  const bin = atob(m.photo), u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return new Response(u8, {headers: {'content-type': m.photo_type, 'cache-control': 'public, max-age=604800', ...SEC, 'access-control-allow-origin': '*'}});
}
async function qr(req, env, url, base, id){
  const m = await env.DB.prepare('SELECT id, name FROM masters WHERE id = ?').bind(id).first();
  if (!m) return new Response('not found', {status: 404});
  const h = {'content-type': 'image/svg+xml; charset=utf-8', 'cache-control': 'public, max-age=86400', ...SEC, 'access-control-allow-origin': '*'};
  if (url.searchParams.get('download')) h['content-disposition'] = 'attachment; filename="qr-' + id + '.svg"';
  return new Response(qrSvg(base + '/' + id, {size: 600}), {headers: h});
}

const ADMIN_HTML = `<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Модерация — Мастера рядом</title><style>${PAGE_CSS}
.tabs{display:flex;gap:6px;flex-wrap:wrap}.tabs button{border:1.5px solid var(--line);background:var(--surface);color:var(--ink);border-radius:999px;padding:8px 14px;font:inherit;font-weight:600;cursor:pointer}.tabs button[aria-pressed=true]{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
.m{display:flex;flex-direction:column;gap:8px}.kv{font-size:14px;color:var(--muted)}.kv b{color:var(--ink);font-weight:600}.warn{background:#fbebeb;color:#7a1d16;border-radius:10px;padding:8px 10px;font-size:14px;font-weight:600}
.rvx{border-top:1px solid var(--line);padding-top:8px}.hid{opacity:.5}</style></head><body><header class="top"><span class="logo">⚡</span><b>Мастера рядом</b><span>· модерация</span></header><main>
<div class="card" id="setup" hidden><h2>Придумайте пароль модерации</h2><p>Первый вход: задайте пароль от 10 символов и запишите его. Дальше страница будет открываться только с ним.</p><input id="nk1" type="password" autocomplete="new-password" placeholder="Пароль"><input id="nk2" type="password" autocomplete="new-password" placeholder="Повторите пароль"><button class="btn pri" id="sv">Сохранить пароль</button><div class="msg bad" id="sm"></div></div><div class="card" id="login" hidden><h2>Пароль модерации</h2><input id="key" type="password" autocomplete="current-password"><button class="btn pri" id="go">Войти</button><div class="msg bad" id="lm"></div></div>
<div id="app" hidden><div class="tabs" id="tabs"><button data-t="pending" aria-pressed="true">На проверке</button><button data-t="approved" aria-pressed="false">Опубликованы</button><button data-t="rejected" aria-pressed="false">Отклонены</button><button data-t="reviews" aria-pressed="false">Отзывы</button><button data-t="reports" aria-pressed="false">Жалобы</button><button data-t="codes" aria-pressed="false">Коды курса</button></div><div id="list" class="m"></div></div></main>
<script>(function(){var K="",tab="pending",RES=${JSON.stringify(RESERVED)},CAT=${JSON.stringify(Object.fromEntries(Object.entries(CATS).map(([k, v]) => [k, v[0]])))};
function e(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function api(p,b){return fetch(p,{method:b?"POST":"GET",headers:{"content-type":"application/json","x-admin-key":K},body:b?JSON.stringify(b):undefined}).then(function(r){return r.json()})}
var RSN={spam:"Спам или реклама",offensive:"Оскорбления или угрозы",fake:"Фальшивый отзыв",wrong:"Неверные данные мастера",illegal:"Незаконные услуги",other:"Другое"};function load(){var L=document.getElementById("list");L.innerHTML="Загрузка…";if(tab==="codes"){api("/api/admin/codes").then(function(j){if(!j.ok)return out();L.innerHTML='<div class="card"><h2>Новый код доступа</h2><p class="kv">Создайте код после того, как деньги пришли на Kaspi, и отправьте его клиенту в WhatsApp. Один код работает на 3 телефонах. У каждого курса свой код.</p><select id="cprod"><option value="course-pro">Курс для будущих автоэлектриков (уроки 9–25)</option><option value="course-ecu">Курс «Ремонт ЭБУ» (уроки 4–10)</option></select><input id="cnote" placeholder="Кому: имя или телефон клиента, сумма"><button class="btn pri" id="cnew">Создать код</button><div class="msg ok" id="cres"></div></div>'+(j.codes.length?j.codes.map(function(c){return'<div class="card'+(c.revoked?' hid':'')+'"><div class="kv"><b style="font-size:18px;letter-spacing:.06em">'+e(c.code)+'</b> · '+new Date(c.created).toLocaleString("ru-RU")+'</div><div class="kv">'+(c.product==="course-ecu"?"<b>Ремонт ЭБУ</b> · ":"<b>Автоэлектрик</b> · ")+e(c.note||"—")+' · телефонов: '+c.devices+' из '+c.max_devices+(c.revoked?" · отозван":"")+'</div><div class="btns">'+(c.revoked?'<button class="btn" data-unrev="'+e(c.code)+'">Вернуть</button>':'<button class="btn" data-rev="'+e(c.code)+'">Отозвать</button>')+'</div></div>'}).join(""):"<p>Кодов пока нет.</p>")});return}if(tab==="reports"){api("/api/admin/reports").then(function(j){if(!j.ok)return out();var open=j.reports.filter(function(r){return!r.done}).length;document.querySelector("[data-t=reports]").textContent="Жалобы ("+open+")";L.innerHTML=j.reports.length?j.reports.map(function(r){return'<div class="card'+(r.done?' hid':'')+'"><div class="kv"><b>'+e(RSN[r.reason]||r.reason)+'</b> · '+new Date(r.created).toLocaleString("ru-RU")+(r.done?" · закрыта":"")+'</div><div class="kv">Мастер: <a href="/'+e(r.master)+'" target="_blank">'+e(r.mname||r.master)+'</a>, '+e(r.mcity||"")+(r.mstatus&&r.mstatus!=="approved"?" ("+e(r.mstatus)+")":"")+'</div>'+(r.review?'<div class="kv">Отзыв '+"★".repeat(r.rstars||0)+" от "+e(r.rname||"—")+(r.rhidden?" · скрыт":"")+':</div><p>'+e(r.rtext||"")+'</p>':'<div class="kv">Жалоба на карточку</div>')+(r.text?'<p><i>'+e(r.text)+'</i></p>':"")+'<div class="btns">'+(r.review?'<button class="btn" data-rv="'+r.review+'" data-h="'+(r.rhidden?0:1)+'">'+(r.rhidden?"Показать отзыв":"Скрыть отзыв")+'</button>':"")+(r.done?"":'<button class="btn pri" data-done="'+r.id+'">Закрыть жалобу</button>')+'</div></div>'}).join(""):"Жалоб нет."});return}if(tab==="reviews"){api("/api/admin/reviews").then(function(j){if(!j.ok)return out();L.innerHTML=j.reviews.length?j.reviews.map(function(r){return'<div class="card rvx'+(r.hidden?' hid':'')+'"><div class="kv"><b>'+"★".repeat(r.stars)+'</b> · '+e(r.name||"—")+' · мастер: <a href="/'+e(r.master)+'" target="_blank">'+e(r.mname||r.master)+'</a>, '+e(r.mcity||"")+' · '+new Date(r.updated).toLocaleString("ru-RU")+'</div><p>'+e(r.text)+'</p><button class="btn" data-rv="'+r.id+'" data-h="'+(r.hidden?0:1)+'">'+(r.hidden?"Показать":"Скрыть")+'</button></div>'}).join(""):"Отзывов пока нет."})}
else api("/api/admin/list?status="+tab).then(function(j){if(!j.ok)return out();var c=j.counts||{};document.querySelector('[data-t=pending]').textContent="На проверке ("+(c.pending||0)+")";
L.innerHTML=j.masters.length?j.masters.map(function(m){var res=m.cats.filter(function(x){return RES.indexOf(x)>-1});return'<div class="card"><div class="hero">'+(m.photo?'<img class="ph" src="'+e(m.photo)+'">':'')+'<div><h2>'+e(m.name)+'</h2><div class="kv">'+e(m.city)+' · '+new Date(m.updated).toLocaleString("ru-RU")+'</div></div></div>'+
(res.length?'<div class="warn">Направления Олега: '+res.map(function(x){return e(CAT[x])}).join(", ")+' — проверьте город: в Алматы и пригороде такие карточки не размещаем.</div>':'')+
'<div class="chips">'+m.cats.map(function(x){return'<span class="chip">'+e(CAT[x]||x)+'</span>'}).join("")+'</div><p class="about">'+e(m.about)+'</p><div class="kv">Телефон: <b>'+e(m.phone)+'</b> · WhatsApp: <b>'+e(m.wa)+'</b></div><div class="kv">Адрес: <b>'+e(m.address)+'</b></div><div class="kv">Сайт: '+(m.site?'<a href="'+e(m.site)+'" target="_blank" rel="noopener">'+e(m.site)+'</a>':"—")+'</div>'+(m.votes?'<div class="kv">Рейтинг '+m.rating+' · отзывов '+m.votes+'</div>':'')+(m.note?'<div class="kv">Причина отказа: '+e(m.note)+'</div>':'')+
'<div class="btns">'+(m.status!=="approved"?'<button class="btn pri" data-id="'+m.id+'" data-s="approved">Одобрить</button>':'<a class="btn" href="/'+m.id+'" target="_blank">Открыть карточку</a>')+(m.status!=="rejected"?'<button class="btn" data-id="'+m.id+'" data-s="rejected">Отклонить</button>':'')+'<button class="btn" data-del="'+m.id+'">Удалить</button></div></div>'}).join(""):"Пусто."})}
function out(){K="";try{localStorage.removeItem("ae.admin")}catch(e){}document.getElementById("app").hidden=true;document.getElementById("login").hidden=false;document.getElementById("lm").textContent="Неверный пароль"}
function enter(){api("/api/admin/list?status=pending").then(function(j){if(j.ok){try{localStorage.setItem("ae.admin",K)}catch(e){}document.getElementById("login").hidden=true;document.getElementById("app").hidden=false;load()}else out()})}
document.getElementById("go").onclick=function(){K=document.getElementById("key").value.trim();enter()};
document.getElementById("tabs").onclick=function(ev){var b=ev.target.closest("button");if(!b)return;tab=b.dataset.t;document.querySelectorAll("#tabs button").forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});load()};
document.getElementById("list").onclick=function(ev){var b=ev.target.closest("button");if(!b)return;if(b.dataset.s){var note="";if(b.dataset.s==="rejected"){note=prompt("Причина отказа (увидит мастер):","")||""}api("/api/admin/set",{id:b.dataset.id,status:b.dataset.s,note:note}).then(load)}
else if(b.dataset.del){if(confirm("Удалить карточку и все её отзывы?"))api("/api/admin/delete",{id:b.dataset.del}).then(load)}else if(b.dataset.rv){api("/api/admin/review",{id:+b.dataset.rv,hidden:+b.dataset.h}).then(load)}else if(b.dataset.done){api("/api/admin/report-done",{id:+b.dataset.done}).then(load)}else if(b.id==="cnew"){var pr=document.getElementById("cprod").value;api("/api/admin/code-new",{product:pr,note:document.getElementById("cnote").value}).then(function(j){if(j.ok){var t=pr==="course-ecu"?"Код доступа к курсу «Ремонт ЭБУ»: "+j.code+"\\nОткройте приложение АвтоЭлектрик PRO → меню → Курсы автоэлектрика → «Ремонт ЭБУ» → урок 4 и введите код в поле «Код доступа».":"Код доступа к курсу для будущих автоэлектриков: "+j.code+"\\nОткройте приложение АвтоЭлектрик PRO → меню → Курсы автоэлектрика → «Для будущих автоэлектриков» → урок 9 и введите код в поле «Код доступа».";var r=document.getElementById("cres");r.innerHTML="<b style=\\"font-size:20px;letter-spacing:.06em\\">"+e(j.code)+"</b><br><a class=\\"btn\\" target=\\"_blank\\" href=\\"https://wa.me/?text="+encodeURIComponent(t)+"\\">Отправить клиенту в WhatsApp</a>";setTimeout(load,60000)}})}else if(b.dataset.rev){if(confirm("Отозвать код? Уроки закроются на новых телефонах."))api("/api/admin/code-revoke",{code:b.dataset.rev}).then(load)}else if(b.dataset.unrev){api("/api/admin/code-revoke",{code:b.dataset.unrev,revoked:false}).then(load)}};
document.getElementById("sv").onclick=function(){var a=document.getElementById("nk1").value,b=document.getElementById("nk2").value,m=document.getElementById("sm");if(a.length<10){m.textContent="Нужно не меньше 10 символов";return}if(a!==b){m.textContent="Пароли не совпадают";return}fetch("/api/admin/setup",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({key:a})}).then(function(r){return r.json()}).then(function(j){if(j.ok){K=a;document.getElementById("setup").hidden=true;enter()}else m.textContent=j.error==="configured"?"Пароль уже задан — войдите":"Не получилось, попробуйте ещё раз"})};fetch("/api/admin/state").then(function(r){return r.json()}).then(function(j){if(!j.configured){document.getElementById("setup").hidden=false;return}document.getElementById("login").hidden=false;try{K=localStorage.getItem("ae.admin")||""}catch(e){}if(K)enter()})})();</script></body></html>`;

/* ---------- маршруты ---------- */
export default {
  async fetch(req, env){
    const url = new URL(req.url), path = url.pathname.replace(/\/+$/, '') || '/';
    const base = env.PUBLIC_BASE || url.origin;
    try {
      if (req.method === 'OPTIONS') return new Response(null, {status: 204, headers: corsHeaders(req, env)});
      await ensureDb(env);
      if (path === '/api/cities') return await apiCities(req, env);
      if (path === '/api/masters') return await apiMasters(req, env, url, base);
      if (path === '/api/master') return await apiMaster(req, env, url, base);
      if (path === '/api/mine') return await apiMine(req, env, url, base);
      if (path === '/api/pending-count') return await apiPendingCount(req, env);
      if (path === '/api/course-info') return await apiCourseInfo(req, env);
      if (path === '/api/admin/state') return await apiAdminState(req, env);
      if (path === '/api/admin/setup' && req.method === 'POST') return await apiAdminSetup(req, env);
      if (path.startsWith('/api/admin/')) return await apiAdmin(req, env, url, base, path);
      if (req.method === 'POST'){
        if (path === '/api/apply') return await apiApply(req, env, base);
        if (path === '/api/update') return await apiUpdate(req, env, base);
        if (path === '/api/remove') return await apiRemove(req, env);
        if (path === '/api/review') return await apiReview(req, env);
        if (path === '/api/report') return await apiReport(req, env);
        if (path === '/api/unlock') return await apiUnlock(req, env);
        if (path === '/api/cert') return await apiCert(req, env, base);
      }
      if (path.startsWith('/api/')) return fail(req, env, 'not_found', 404);
      if (path === '/admin') return html(ADMIN_HTML, 200, {'cache-control': 'no-store'});
      let m;
      if ((m = /^\/photo\/([a-z0-9]{8})$/.exec(path))) return await photo(req, env, m[1]);
      if ((m = /^\/cert\/(AE\d{2}-[A-Z0-9]{6})$/.exec(path))) return await certPage(req, env, url, base, m[1]);
      if ((m = /^\/qr\/([a-z0-9]{8})\.svg$/.exec(path))) return await qr(req, env, url, base, m[1]);
      if ((m = /^\/(?:m\/)?([a-z0-9]{8})$/.exec(path))) return await cardPage(req, env, url, base, m[1]);
      if (path === '/') return Response.redirect(APP_URL + '#mastera', 302);
      return notFoundPage(pickLang(req, url));
    } catch (e) {
      console.log('error', path, e && e.stack || e);
      return path.startsWith('/api/') ? fail(req, env, 'server', 500) : html('Ошибка сервера', 500);
    }
  },
};
