#!/usr/bin/env python3
"""Какая версия АвтоЭлектрик PRO сейчас в Google Play — и playLatest в www/app/config.json (20.11.2026).

Каждую сборку, вышедшую на сайт, tools/publish_apk.py (закрытый репозиторий) сам отправляет в Google Play; Google проверяет её
от часов до суток. Эта задача раз в день открывает страницу приложения в Google Play, берёт номер вышедшей версии и, если он
новее playLatest, ставит его (описание — из notesHistory, его пишет publish_apk.py). Тогда версия из Google Play покажет
«Обновить в Google Play» только когда обновление там действительно есть. Ничего не нашла — ничего не меняет.
"""
import datetime, json, re, sys, urllib.request

URL = 'https://play.google.com/store/apps/details?id=kz.avtoelektrikpro.app&hl=en&gl=US'
CFG = sys.argv[1] if len(sys.argv) > 1 else 'www/app/config.json'
GENERIC = {'ru': 'Новая версия в Google Play.', 'kk': 'Google Play-де жаңа нұсқа.', 'en': 'New version on Google Play.'}


def vt(v):
    return tuple(int(x) for x in v.split('.'))


req = urllib.request.Request(URL, headers={'User-Agent': 'Mozilla/5.0', 'Accept-Language': 'en'})
html = urllib.request.urlopen(req, timeout=30).read().decode('utf-8', 'replace')
m = re.search(r'"141":\[\[\["(\d+\.\d+\.\d+)"\]\]', html)          # блок «About this app» → Version
vers = [m.group(1)] if m else sorted(set(re.findall(r'"(1\.0\.\d+)"', html)), key=vt)[-1:]
if not vers:
    sys.exit('версия на странице Google Play не найдена — ничего не меняю')
live = vers[0]
raw = open(CFG, encoding='utf-8').read()
c = json.loads(raw)
cur = (c.get('playLatest') or {}).get('version') or '0.0.0'
print('Google Play:', live, '| playLatest:', cur)
if vt(live) <= vt(cur):
    print('без изменений')
    sys.exit(0)
notes = (c.get('notesHistory') or {}).get(live) or ((c.get('latest') or {}).get('notes') if (c.get('latest') or {}).get('version') == live else None) or GENERIC
c['playLatest'] = {'version': live, 'date': datetime.date.today().isoformat(), 'notes': notes}
open(CFG, 'w', encoding='utf-8').write(json.dumps(c, ensure_ascii=False, indent=2) + ('\n' if raw.endswith('\n') else ''))
print('playLatest →', live)
