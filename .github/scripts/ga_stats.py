"""Цифры для страницы рекламодателей www/reklama/stats.json (Олег, 02.11.2026).
Берёт из Google Analytics 4 общие цифры за последние 30 дней (по вчерашний день по Алматы), предыдущие 30 дней,
12 месяцев по месяцам, страны, города (от 3 пользователей), язык телефона. Личных данных нет.
Доступ — служебный аккаунт «только чтение»: секреты GA4_SA_KEY (JSON ключа) и GA4_PROPERTY_ID (номер ресурса GA4).
Секретов нет — выходит без ошибки и ничего не меняет.
Запуск: python3 .github/scripts/ga_stats.py www/reklama/stats.json"""
import datetime, json, os, sys

def build(run, today):
    """run(dims, mets, start, end, limit) -> [(dim_values, metric_values)]; today — дата по Алматы."""
    to = today - datetime.timedelta(days=1)
    fr = to - datetime.timedelta(days=29)
    pto, pfr = fr - datetime.timedelta(days=1), fr - datetime.timedelta(days=30)
    D = lambda d: d.isoformat()
    tot = run([], ['activeUsers', 'sessions', 'screenPageViews'], D(fr), D(to), None)
    users, sessions, views = (int(float(x)) for x in tot[0][1]) if tot else (0, 0, 0)
    prev = run([], ['activeUsers'], D(pfr), D(pto), None)
    prev_users = int(float(prev[0][1][0])) if prev else 0
    m0 = to.replace(day=1)
    for _ in range(11):
        m0 = (m0 - datetime.timedelta(days=1)).replace(day=1)
    months = sorted([(r[0][0], int(float(r[1][0]))) for r in run(['yearMonth'], ['activeUsers'], D(m0), D(to), None)])
    nxt = (to.replace(day=28) + datetime.timedelta(days=4)).replace(day=1)
    partial = (to + datetime.timedelta(days=1)) != nxt          # последний месяц неполный
    countries = [(r[0][0], int(float(r[1][0]))) for r in run(['countryId'], ['activeUsers'], D(fr), D(to), 8) if r[0][0] not in ('', '(not set)')]
    cities = [(r[0][0], r[0][1], int(float(r[1][0]))) for r in run(['city', 'countryId'], ['activeUsers'], D(fr), D(to), 12)
              if r[0][0] not in ('', '(not set)') and int(float(r[1][0])) >= 3][:8]
    lang = {}
    for r in run(['languageCode'], ['activeUsers'], D(fr), D(to), 30):
        c = (r[0][0] or '').split('-')[0].lower()
        if c and c != '(not set)':
            lang[c] = lang.get(c, 0) + int(float(r[1][0]))
    langs = sorted(lang.items(), key=lambda x: -x[1])[:6]
    return {'updated': D(today), 'from': D(fr), 'to': D(to), 'users': users, 'sessions': sessions, 'views': views,
            'prev_users': prev_users, 'months': [list(x) for x in months], 'partial': partial,
            'countries': [list(x) for x in countries], 'cities': [list(x) for x in cities], 'langs': [list(x) for x in langs]}

def ga_runner(key_json, prop):
    from google.analytics.data_v1beta import BetaAnalyticsDataClient
    from google.analytics.data_v1beta.types import DateRange, Dimension, Metric, OrderBy, RunReportRequest
    from google.oauth2 import service_account
    creds = service_account.Credentials.from_service_account_info(json.loads(key_json), scopes=['https://www.googleapis.com/auth/analytics.readonly'])
    client = BetaAnalyticsDataClient(credentials=creds)
    def run(dims, mets, start, end, limit):
        req = RunReportRequest(property='properties/' + prop, dimensions=[Dimension(name=d) for d in dims],
                               metrics=[Metric(name=m) for m in mets], date_ranges=[DateRange(start_date=start, end_date=end)])
        if dims:
            req.order_bys = [OrderBy(metric=OrderBy.MetricOrderBy(metric_name=mets[0]), desc=True)]
        if limit:
            req.limit = limit
        res = client.run_report(req)
        return [([v.value for v in row.dimension_values], [v.value for v in row.metric_values]) for row in res.rows]
    return run

def main():
    out = sys.argv[1] if len(sys.argv) > 1 else 'www/reklama/stats.json'
    key, prop = os.environ.get('GA4_SA_KEY', '').strip(), ''.join(ch for ch in os.environ.get('GA4_PROPERTY_ID', '') if ch.isdigit())
    if not key or not prop:
        print('::notice::Нет секретов GA4_SA_KEY / GA4_PROPERTY_ID — цифры не обновлены')
        return
    if not key.startswith('{'):
        sys.exit('::error::GA4_SA_KEY должен быть содержимым JSON-файла ключа (начинается с «{»)')
    today = (datetime.datetime.utcnow() + datetime.timedelta(hours=5)).date()   # Алматы, UTC+5
    data = build(ga_runner(key, prop), today)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print(f"Готово: {data['users']} активных пользователей за {data['from']} — {data['to']}, стран {len(data['countries'])}, городов {len(data['cities'])}")

if __name__ == '__main__':
    main()
