#!/usr/bin/env python3
"""Звук баллад — в хранилище Cloudflare R2 (Олег, 06.11.2026: «можно ли как-то расширить хранилище? — да, делай»).

GitHub Pages держит сайт не больше 1 ГБ, а песни уже ~1,8 ГБ. Поэтому все файлы песен (mp3 160, mp3 320, FLAC) лежат в R2 —
бакет skazaniya-audio, отдаёт их сервер мастеров: https://mastera.avtoelektrikpro-apps.workers.dev/audio/<файл>
(server/masters/worker.js, привязка AUDIO). Источник файлов — как и раньше, www/skazaniya/audio/ открытого репозитория сайта
(tools/skazaniya_audio.py кладёт их туда).

Запускается в GitHub Actions «Сказания — звук в R2» (.github/workflows/skazaniya-audio.yml): там есть ключ Cloudflare;
Claude ключей не видит и запускает задачу командой
  gh api --method POST repos/oleg1211110-ops/avtoelektrik-app/actions/workflows/skazaniya-audio.yml/dispatches -f ref=main

  python3 tools/skazaniya_r2.py <папка audio>            # залить то, чего в R2 нет или что другого размера
  python3 tools/skazaniya_r2.py <папка audio> --check    # только сверить: чего не хватает в R2
  python3 tools/skazaniya_r2.py <папка audio> --only kamri   # только файлы, в имени которых есть «kamri»

Сверка — запросом HEAD к серверу: файла нет или размер другой → wrangler r2 object put (нужны CLOUDFLARE_API_TOKEN
и CLOUDFLARE_ACCOUNT_ID в окружении). Код выхода 1 — что-то не залилось или (с --check) чего-то не хватает.
"""
import argparse, concurrent.futures as cf, os, re, subprocess, sys, urllib.error, urllib.request

SERVER = os.environ.get('MASTERS_URL', 'https://mastera.avtoelektrikpro-apps.workers.dev').rstrip('/')
BUCKET = 'skazaniya-audio'
NAME_RE = re.compile(r'^[a-z0-9][a-z0-9-]{0,120}(?:-320\.mp3|\.mp3|\.flac)$')   # как AUDIO_RE в worker.js


def remote_size(name):
    """Размер файла в R2 (через сервер) или None, если файла нет. Хранилище не подключено к серверу — исключение."""
    req = urllib.request.Request(f'{SERVER}/audio/{name}', method='HEAD', headers={'user-agent': 'avtoelektrik-skazaniya-r2'})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return int(r.headers.get('content-length') or -1)
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        if e.code == 503:
            raise SystemExit('Сервер мастеров отвечает 503: хранилище R2 к нему не подключено. Включите R2 в кабинете Cloudflare, '
                             'дайте токену право «Workers R2 Storage: Edit» и перезапустите «Мастера — сервер».')
        raise


def put(path, name):
    ct = 'audio/flac' if name.endswith('.flac') else 'audio/mpeg'
    r = subprocess.run(['wrangler', 'r2', 'object', 'put', f'{BUCKET}/{name}', '--file', path, '--content-type', ct, '--remote'],
                       capture_output=True, text=True)
    return r.returncode, (r.stdout + r.stderr)[-600:]


def main():
    ap = argparse.ArgumentParser(description='Звук баллад — в Cloudflare R2')
    ap.add_argument('dir', help='папка с файлами песен (www/skazaniya/audio сайта)')
    ap.add_argument('--check', action='store_true', help='только сверить, ничего не заливать')
    ap.add_argument('--only', default='', help='только файлы, в имени которых есть эта строка')
    a = ap.parse_args()
    files = sorted(f for f in os.listdir(a.dir) if NAME_RE.match(f) and a.only in f)
    if not files:
        sys.exit(f'В {a.dir} нет файлов песен' + (f' с «{a.only}»' if a.only else ''))
    with cf.ThreadPoolExecutor(8) as ex:
        sizes = dict(zip(files, ex.map(remote_size, files)))
    need = [f for f in files if sizes[f] != os.path.getsize(os.path.join(a.dir, f))]
    total = sum(os.path.getsize(os.path.join(a.dir, f)) for f in need) / 1e6
    print(f'Файлов песен: {len(files)}; уже в R2: {len(files) - len(need)}; залить: {len(need)} ({total:.0f} МБ)')
    if a.check:
        for f in need:
            print('  нет в R2' if sizes[f] is None else f'  другой размер ({sizes[f]})', f)
        report(len(files), len(files) - len(need), need, [], check=True)
        sys.exit(1 if need else 0)
    bad = []
    with cf.ThreadPoolExecutor(4) as ex:
        for f, (rc, out) in zip(need, ex.map(lambda f: put(os.path.join(a.dir, f), f), need)):
            print(('  залит ' if rc == 0 else '  ОШИБКА ') + f)
            if rc:
                print(out)
                bad.append(f)
    # проверка: сервер отдаёт залитое с тем же размером
    after = [f for f in need if f not in bad and remote_size(f) != os.path.getsize(os.path.join(a.dir, f))]
    bad += after
    report(len(files), len(files) - len(need), [f for f in need if f not in bad], bad)
    print(f'Готово: залито {len(need) - len(bad)}, ошибок {len(bad)}')
    sys.exit(1 if bad else 0)


def report(n, had, done, bad, check=False):
    s = os.environ.get('GITHUB_STEP_SUMMARY')
    if not s:
        return
    with open(s, 'a', encoding='utf-8') as fh:
        fh.write(f'### Звук баллад в R2\n\nФайлов: {n}; уже были: {had}; ' +
                 (f'не хватает: {len(done)}\n' if check else f'залито: {len(done)}; ошибок: {len(bad)}\n'))
        for f in bad:
            fh.write(f'- ошибка: {f}\n')


if __name__ == '__main__':
    main()
