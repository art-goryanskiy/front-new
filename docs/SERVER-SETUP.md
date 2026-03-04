# Что сделать на сервере при смене домена на standart82.ru

Инструкция для перехода с **www.new.standart82.ru** на **standart82.ru**. Выполнять на VPS, где развёрнуты фронт и бэкенд.

---

## 1. DNS

Убедиться, что домен указывает на IP сервера:

- **standart82.ru** — A-запись на IP вашего VPS.
- При использовании **www.standart82.ru** — A- или CNAME-запись для `www` на тот же IP (или на standart82.ru).

Проверка с любой машины:

```bash
dig +short standart82.ru
dig +short www.standart82.ru
```

Должен возвращаться IP вашего VPS.

---

## 2. Переменные окружения фронта

В каталоге, откуда запускается фронт (корень репо front-new или папка deploy), обновить **.env.front** (или переменные, которые передаются в контейнер фронта):

```env
NEXT_PUBLIC_GRAPHQL_URL=https://standart82.ru/graphql
NEXT_PUBLIC_UPLOAD_URL=https://standart82.ru/upload/image
NEXT_PUBLIC_SITE_URL=https://standart82.ru
```

Если используете **www.standart82.ru**, подставьте его вместо `standart82.ru` в этих трёх строках.

После изменения пересобрать/перезапустить контейнер фронта, чтобы новые `NEXT_PUBLIC_*` попали в сборку (см. п. 5).

---

## 3. Nginx (виртуальный хост и SSL)

- В конфигурации nginx заменить старый домен (**www.new.standart82.ru**) на **standart82.ru** (и при необходимости добавить **www.standart82.ru**):
  - `server_name`;
  - пути к сертификатам (если привязаны к имени домена).
- Перевыпустить SSL-сертификат для нового домена, если старый был на www.new.standart82.ru:

  ```bash
  # В папке, где настроен certbot/nginx (часто папка деплоя бэкенда)
  export DOMAIN=standart82.ru
  # или для www: export DOMAIN=www.standart82.ru
  ./scripts/init-ssl.sh   # если используется такой скрипт
  # либо через certbot вручную:
  # sudo certbot certonly --nginx -d standart82.ru -d www.standart82.ru
  ```

- Перезагрузить nginx:

  ```bash
  sudo nginx -t && sudo nginx -s reload
  # или через docker:
  docker compose exec nginx nginx -s reload
  ```

---

## 4. Бэкенд (CORS и куки)

Чтобы авторизация и запросы с фронта работали с нового домена:

- **CORS:** в настройках бэкенда в разрешённые origins добавить `https://standart82.ru` (и при использовании www — `https://www.standart82.ru`). Убрать или заменить `https://www.new.standart82.ru`.
- **Куки:** если задаётся `Domain`, использовать `.standart82.ru`, чтобы куки работали для standart82.ru и www.standart82.ru.

После изменений перезапустить бэкенд (перезапуск контейнера/сервиса).

---

## 5. Перезапуск фронта

Переменные `NEXT_PUBLIC_*` подставляются при **сборке** образа. Поэтому после смены домена в .env.front нужно либо:

- пересобрать образ фронта и заново запушить/запустить контейнер,  
**либо**
- если при запуске контейнера передаются env (например через `env_file: .env.front`), то для Next.js они могут подхватываться и при старте — тогда достаточно перезапустить контейнер после правки .env.front:

  ```bash
  docker compose up -d --force-recreate front
  ```

Проверить, что в браузере открывается https://standart82.ru и что запросы к /graphql и загрузке идут на тот же домен.

---

## 6. Краткий чеклист на сервере

| Шаг | Действие |
|-----|----------|
| 1 | DNS: A/CNAME для standart82.ru (и при необходимости www) → IP VPS |
| 2 | Обновить .env.front: `NEXT_PUBLIC_GRAPHQL_URL`, `NEXT_PUBLIC_UPLOAD_URL`, `NEXT_PUBLIC_SITE_URL` на https://standart82.ru (или www) |
| 3 | Nginx: заменить server_name и при необходимости перевыпустить SSL для standart82.ru / www.standart82.ru |
| 4 | Бэкенд: CORS и Domain куки на standart82.ru (и www при необходимости) |
| 5 | Пересобрать/перезапустить контейнер фронта и проверить сайт и авторизацию |

После этого сайт должен работать на **standart82.ru** (и при необходимости на **www.standart82.ru**).
