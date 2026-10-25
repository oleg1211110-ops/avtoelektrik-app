-- «Мастера рядом»: база Cloudflare D1. Повторный запуск безопасен (IF NOT EXISTS).
CREATE TABLE IF NOT EXISTS masters (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'pending',      -- pending (на проверке) | approved (опубликована) | rejected (отклонена)
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  city_key TEXT NOT NULL,                      -- город в нижнем регистре, ё → е (для поиска)
  cats TEXT NOT NULL,                          -- JSON-массив направлений: ["tires","body"]
  about TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL,
  wa TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  site TEXT NOT NULL DEFAULT '',
  photo TEXT,                                  -- фото в base64 (до ~400 КБ)
  photo_type TEXT,
  photo_v INTEGER NOT NULL DEFAULT 0,
  device TEXT NOT NULL DEFAULT '',             -- устройство, с которого подана заявка (нельзя оценить себя)
  edit_hash TEXT NOT NULL,                     -- SHA-256 ключа правки карточки
  note TEXT NOT NULL DEFAULT '',               -- причина отказа (видит мастер)
  lang TEXT NOT NULL DEFAULT 'ru',
  created INTEGER NOT NULL,
  updated INTEGER NOT NULL,
  approved INTEGER
);
CREATE INDEX IF NOT EXISTS masters_city ON masters(status, city_key);

CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  master TEXT NOT NULL,
  device TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  stars INTEGER NOT NULL,
  text TEXT NOT NULL DEFAULT '',
  hidden INTEGER NOT NULL DEFAULT 0,           -- 1 — скрыт модератором
  created INTEGER NOT NULL,
  updated INTEGER NOT NULL,
  UNIQUE(master, device)
);
CREATE INDEX IF NOT EXISTS reviews_master ON reviews(master, hidden, created);

-- счётчики против спама: действие + день + хеш IP
CREATE TABLE IF NOT EXISTS hits (
  k TEXT PRIMARY KEY,
  n INTEGER NOT NULL,
  exp INTEGER NOT NULL
);

-- настройки: соль для счётчиков, пароль модерации (хеш), если он не задан секретом ADMIN_KEY
CREATE TABLE IF NOT EXISTS settings (
  k TEXT PRIMARY KEY,
  v TEXT NOT NULL
);

-- жалобы на карточки и отзывы
CREATE TABLE IF NOT EXISTS reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  master TEXT NOT NULL,
  review INTEGER,
  reason TEXT NOT NULL,
  text TEXT NOT NULL DEFAULT '',
  device TEXT NOT NULL DEFAULT '',
  created INTEGER NOT NULL,
  done INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS reports_open ON reports(done, created);

-- коды доступа к платным урокам: выдаёт Олег после перевода на Kaspi; работает на max_devices телефонах
CREATE TABLE IF NOT EXISTS codes (
  code TEXT PRIMARY KEY,
  product TEXT NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  devices TEXT NOT NULL DEFAULT '[]',
  max_devices INTEGER NOT NULL DEFAULT 3,
  revoked INTEGER NOT NULL DEFAULT 0,
  created INTEGER NOT NULL,
  used INTEGER
);

-- сертификаты о прохождении курса (после итогового теста; проверка по номеру на странице /cert/<номер>)
CREATE TABLE IF NOT EXISTS certs (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  lessons INTEGER NOT NULL,
  lang TEXT NOT NULL DEFAULT 'ru',
  created INTEGER NOT NULL,
  course TEXT NOT NULL DEFAULT 'pro'     -- pro (курс автоэлектрика) или ecu (курс «Ремонт ЭБУ»)
);
