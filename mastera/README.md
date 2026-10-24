# Мастера рядом — сервер

Сервер раздела «Мастера рядом» приложения [АвтоЭлектрик PRO](https://help.avtoelektrik-pro.kz/):
карточки мастеров по городам, отзывы со звёздами, страница карточки с QR-кодом, модерация.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/oleg1211110-ops/avtoelektrik-app/tree/main/mastera)

- База Cloudflare D1 создаётся при выкладке, таблицы — сами при первом запросе.
- Пароль модерации задаётся при первом входе на `<адрес>/admin`.
- Копия исходников: закрытый репозиторий avtoelektrik-src, папка `server/masters`.

© 2026 Дмитриев Олег Сергеевич (AVTOELEKTRIK-PRO.KZ). Все права защищены.
