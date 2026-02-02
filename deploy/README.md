# Деплой фронта на VPS

Фронт запускается **отдельно** от бэкенда. Nginx и SSL — на стороне бэкенда (back-new). Этот compose только поднимает контейнер фронта и подключает его к сети бэкенда (`education-network`).

## Что здесь лежит

- **docker-compose.yml** — один сервис `front`, сеть `education-network` (external).
- **.env.example** — пример переменных для образа фронта (FRONT_IMAGE, FRONT_IMAGE_TAG).
- **.env.front** — создаёте вручную: переменные для контейнера фронта (NEXT_PUBLIC_*).

## Быстрый старт на сервере

1. Склонируйте репо front-new на сервер (например в `/opt/front-new`) или скопируйте папку `deploy/` в нужное место.
2. В папке `deploy/` создайте `.env`: `cp .env.example .env`, укажите `FRONT_IMAGE` и `FRONT_IMAGE_TAG=latest`.
3. Создайте `.env.front` с содержимым:
   ```
   NEXT_PUBLIC_GRAPHQL_URL=https://www.new.standart82.ru/graphql
   NEXT_PUBLIC_UPLOAD_URL=https://www.new.standart82.ru/upload/image
   NEXT_PUBLIC_SITE_URL=https://www.new.standart82.ru
   ```
4. Убедитесь, что на сервере уже создана сеть бэкенда: `docker network ls | grep education-network`. (Она создаётся при первом запуске compose бэкенда.)
5. Запустите фронт: `docker compose up -d`.
6. На сервере в конфиге nginx бэкенда замените upstream frontend на `server education-center-front:3000;` и выполните `docker compose exec nginx nginx -s reload` (в папке деплоя бэкенда).

Подробные шаги — в корневом [docs/DEPLOY.md](../docs/DEPLOY.md).
