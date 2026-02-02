#!/bin/sh
# Получение SSL (Let's Encrypt) и генерация nginx/conf.d/10-ssl.conf.
# Запускать из каталога deploy/ (родитель от scripts/).
# Использование: export DOMAIN=www.new.standart82.ru && ./scripts/init-ssl.sh

set -e

cd "$(dirname "$0")/.."

if [ -z "$DOMAIN" ]; then
  echo "Укажите DOMAIN (например: export DOMAIN=www.new.standart82.ru)"
  exit 1
fi

docker compose ps nginx 2>/dev/null | grep -q Up || {
  echo "Сначала запустите: docker compose up -d nginx certbot"
  exit 1
}

docker compose exec certbot certbot certonly \
  --webroot \
  -w /var/www/certbot \
  --email "${CERTBOT_EMAIL:-admin@standart82.ru}" \
  -d "$DOMAIN" \
  -d "new.standart82.ru" \
  --agree-tos \
  --non-interactive \
  --force-renewal

mkdir -p nginx/conf.d
sed "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" nginx/conf.d/10-ssl.conf.template > nginx/conf.d/10-ssl.conf
echo "Создан nginx/conf.d/10-ssl.conf для домена: $DOMAIN"

docker compose exec nginx nginx -s reload 2>/dev/null || docker compose restart nginx
echo "Nginx перезагружен. SSL включён для $DOMAIN"
