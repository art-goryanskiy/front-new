# Деплой фронта на VPS

Эта папка содержит конфигурацию для запуска фронта вместе с nginx и certbot на сервере. Репозиторий бэкенда не изменяется.

## Что здесь лежит

- **docker-compose.yml** — сервисы: app (бэкенд как образ), front, nginx, certbot, mongo, redis.
- **nginx/conf.d/** — конфиги nginx (HTTP + шаблон SSL).
- **scripts/init-ssl.sh** — получение SSL-сертификата и генерация `10-ssl.conf`.
- **.env.example** — пример переменных для compose.

## Быстрый старт

1. Скопируйте `deploy/` на сервер (например в `/opt/front-new/deploy` или рядом с клоном репо).
2. В папке `deploy/` создайте `.env` из `.env.example`, заполните `BACKEND_IMAGE`, `FRONT_IMAGE`.
3. Создайте `.env.front` с переменными фронта (см. корневой `.env.example`).
4. Создайте `.env.backend` с переменными бэкенда (MONGODB_URI, REDIS_HOST и т.д.).
5. Запустите: `docker compose up -d`.
6. Получите SSL: `export DOMAIN=standart82.ru && chmod +x scripts/init-ssl.sh && ./scripts/init-ssl.sh`.

Подробные шаги — в корневом [DEPLOY.md](../DEPLOY.md).
