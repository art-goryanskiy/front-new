## Front (портфолио): образовательный каталог + личный кабинет + админ-панель

Проект `front-new` — фронтенд веб‑приложения образовательного центра: **публичный каталог программ обучения**, **личный кабинет пользователя** и **административная панель** для управления пользователями, категориями и программами.

Фокус проекта как портфолио: **архитектура (FSD)**, **гибридный data fetching (SSR/ISR + CSR)**, **GraphQL/Apollo**, **SEO**, **качество UI** и **перфоманс‑практики** (lazy loading, оптимизация импорта).

### Быстрый обзор

- **Framework**: Next.js App Router, React, TypeScript
- **UI**: Tailwind CSS v4 (CSS‑переменные), Radix UI, Frеймер‑анимации
- **Данные**: GraphQL + Apollo Client, server-side fetch с `revalidate`, GraphQL Codegen
- **Состояние**: Zustand (auth, модалки, сайдбар, тосты, поиск)
- **Качество**: ESLint + Prettier (+ Tailwind plugin)

### Демо / скриншоты

- **Demo URL**: (добавьте ссылку после деплоя)
- **Admin demo**: (опционально, если есть доступ/учётка)
- **Скриншоты/видео**: (добавьте в `public/` и вставьте сюда)

Пример вставки скриншота:

```md
![Главная страница](public/screenshot-home.png)
```

---

## Что реализовано

### Публичная часть (каталог)

- **Главная (`/`)**
  - серверная загрузка данных для первого рендера
  - подборка “топ программ” + список всех программ/категорий
  - JSON‑LD схема организации (structured data)
- **Страницы типов обучения**
  - `/qualification-upgrade` — повышение квалификации
  - `/professional-retraining` — профессиональная переподготовка
  - `/professional-education` — профессиональное обучение
  - вывод подкатегорий по типу обучения (данные приходят сервером)
- **Детальная страница категории (`/categories/[id]`)**
  - SEO‑метаданные на основе данных категории
  - breadcrumb JSON‑LD
  - список программ (с сортировкой по просмотрам)
- **Детальная страница программы (`/programs/[id]`)**
  - SEO‑метаданные на основе данных программы
  - JSON‑LD `Course` + breadcrumb
- **Публичный header**
  - меню (активная вкладка по роуту)
  - панель поиска
  - действия пользователя (вход/выход и т.д.)

### Авторизация и профиль

- **Вход / регистрация**: `/login`, `/register` (единый UI‑контейнер страницы)
- **Подтверждение email**: `/verify-email`
  - извлечение `token` из hash (`#token=...`)
  - вызов мутации подтверждения
  - сброс Apollo cache после успеха и редирект
- **Личный кабинет (`/profile`)**
  - guard для авторизованных пользователей
  - много-секционная форма на `react-hook-form`
  - обновление профиля, тост‑уведомления, превью аватара

### Админ-панель (`/admin`)

- **Guard по роли**: доступ только для `ADMIN`
- **Главная (`/admin`)**
  - hero‑секция
  - карточки статистики (ленивая подгрузка)
  - клиентский блок со списками (Suspense)
- **Пользователи (`/admin/users`)**
  - поиск + фильтрация по роли и статусу
  - создание/редактирование/удаление через модальные окна
  - счётчики отображаемых/всего
- **Категории / программы по типам обучения**
  - `/admin/professional-education`
  - `/admin/professional-retraining`
  - `/admin/qualification-upgrade`
  - табы “Категории/Программы”
  - CRUD через модалки
- **Программы внутри конкретной категории**: `/admin/category/[id]`
  - синхронизация подсветки сайдбара для динамического роута

---

## Архитектура (FSD-слои)

Структура максимально приближена к Feature-Sliced Design:

- `src/app/` — роутинг и layout’ы Next.js (App Router)
- `src/widgets/` — крупные композиционные блоки страниц (таблицы, модалки, header, sidebar, секции)
- `src/features/` — сценарии/фичи (auth, profile, form‑конфиги для program/category/user)
- `src/entities/` — доменные сущности (user/category/program): hooks для API + базовый UI списков
- `src/shared/` — инфраструктура и общий код:
  - `shared/api/` — GraphQL документы + server API
  - `shared/api/generated/` — codegen‑файлы
  - `shared/lib/` — провайдеры, guards, graphql server-client, SEO, helpers
  - `shared/store/` — zustand‑сторы
  - `shared/ui/` — общие UI‑компоненты/состояния (Loading/Error/Empty, toolbars, table actions)
- `src/components/ui/` — базовые UI компоненты (button/input/dialog/select/tabs/table и т.д.)

Почему так:

- **чёткая изоляция ответственности** (инфра → сущности → фичи → виджеты → страницы)
- **масштабируемость** (добавление новых разделов админки без “монолита”)
- **переиспользуемость** (общие UI и утилиты в `shared`)

---

## Data layer: GraphQL + SSR/ISR + CSR

В проекте используются два подхода загрузки данных (осознанно):

### 1) Client-side GraphQL (Apollo)

Используется там, где важна интерактивность, частые мутации и быстрый UX:

- админка (таблицы, фильтры, модалки CRUD)
- формы (login/register/profile/program/category/user)

Ключевое:

- Apollo client настроен с `credentials: "include"` — авторизация предполагается **через cookies**.
- В `typePolicies` для списков `merge` возвращает `incoming` (без конкатенации), чтобы данные всегда были актуальными и предсказуемыми для таблиц.

### 2) Server-side GraphQL fetch (Next fetch + revalidate)

Используется для публичных страниц, где важен SEO и быстрый первый рендер:

- главная
- категории/программы (detail pages)
- sitemap/robots

Ключевое:

- запросы выполняются через `fetch` на сервере
- используется `next: { revalidate }` (ISR/кэширование)
- при необходимости пробрасываются cookies из `next/headers`, чтобы сервер мог учитывать сессию

---

## Авторизация и роли

- **Глобальная инициализация**: в `Providers` есть `AuthInitializer`, который подтягивает `me`, если пользователь ещё не загружен.
- **Zustand auth-store** хранит:
  - `user`
  - `isAuthenticated`
  - `isAdmin`
  - `isLoading`
- **Admin guard**:
  - если не авторизован → редирект на `/login`
  - если авторизован, но не admin → редирект на главную
- **User guard** для страниц вроде `/profile`.

---

## SEO: метаданные, JSON‑LD, robots, sitemap

- Генерация метаданных: `src/shared/lib/seo/metadata.ts`
  - canonical, OpenGraph, Twitter
  - ключевые слова
  - `noindex` опционально
- Structured data: `src/shared/lib/seo/structured-data.ts`
  - `EducationalOrganization`
  - `Course` для программ
  - `BreadcrumbList`
- `src/app/robots.ts`:
  - запрещает индексацию `/admin`, `/api`, `/login`
- `src/app/sitemap.ts`:
  - динамически генерирует URL категорий/программ + статические страницы

---

## UI/UX и стиль

- Tailwind CSS v4 подключён через `@import` в `src/app/globals.css`
- Цветовая схема реализована через **CSS‑переменные** (`--background`, `--foreground`, и т.д.) с поддержкой `.dark`
- `next-themes` управляет темой на уровне класса `html`
- UI‑примитивы: Radix UI + собственные обёртки в `src/components/ui`

### Дизайн и референсы

В проекте ориентируемся на **современный UI** и вдохновляемся [21st.dev](https://21st.dev) — каталогом community-made компонентов (Heroes, Features, Calls to Action, Shaders, кнопки, карточки, инпуты и т.п.).

- **Принципы**: выразительные блоки (hero-секции, feature-блоки, CTAs), лёгкие анимации и визуальные эффекты, переиспользуемые примитивы без перегруза.
- **Где уже отражено**: glow-menu, highlight-card, the-infinite-grid, анимированные инпуты и текст; главная с hero-сеткой и тайлами типов обучения.
- **При добавлении новых страниц/виджетов**: смотреть категории на 21st.dev (Heroes, Features, Buttons, Shaders, Marketing Blocks) для идей по композиции и паттернам, не копируя буквально.

---

## Производительность

- Lazy‑loading тяжёлых частей:
  - command palette, toaster, модалки (через `lazy` + `Suspense`)
- `next.config.ts`:
  - `optimizePackageImports` для `lucide-react` и `framer-motion`
  - оптимизация изображений + allowlist доменов

---

## Конфигурация

### Переменные окружения

Создайте `.env.local` (не коммитится) и укажите:

```bash
# GraphQL API
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4200/graphql

# Upload endpoint (картинки)
NEXT_PUBLIC_UPLOAD_URL=http://localhost:3000/upload/image

# URL сайта для SEO/robots/sitemap
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Примечания:

- По умолчанию, если переменных нет, проект использует `localhost`/`standart82.ru` значения из кода.
- Авторизация предполагает cookies (`credentials: "include"`), поэтому backend должен отдавать корректные `Set-Cookie` и CORS‑настройки.

---

## Быстрый старт (локально)

### Требования

- Node.js (актуальная LTS)
- npm (в репозитории есть `package-lock.json`)

### Установка

```bash
npm install
```

### Разработка

```bash
npm run dev
```

Откройте `http://localhost:3000`.

### Production build

```bash
npm run build
npm run start
```

---

## Команды (scripts)

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — запуск production сервера
- `npm run lint` — ESLint
- `npm run lint:fix` — ESLint autofix
- `npm run format` — Prettier format
- `npm run format:check` — Prettier check
- `npm run codegen` — GraphQL codegen
- `npm run codegen:watch` — codegen в watch режиме

---

## GraphQL Codegen

Конфигурация: `codegen.ts`

- schema берётся из `NEXT_PUBLIC_GRAPHQL_URL`
- documents: `src/**/*.{ts,tsx}`
- генерация в `src/shared/api/generated/` (preset `client`)

Рекомендация по workflow:

```bash
npm run codegen
# или
npm run codegen:watch
```

---

## Структура проекта (быстрый ориентир)

```text
src/
  app/                      # Next.js routes/layouts
    admin/                  # Admin area (guarded)
    categories/[id]/        # Category details (SEO + SSR fetch)
    programs/[id]/          # Program details (SEO + SSR fetch)
    login/ register/        # Auth pages
    profile/                # User profile (guarded)
  widgets/                  # Page-level blocks (tables, modals, header, sidebar)
  features/                 # Business features (auth, profile, forms)
  entities/                 # Domain entities (category/program/user)
  shared/
    api/                    # GraphQL docs + server api + generated types
    lib/                    # providers, guards, seo, graphql utils, helpers
    store/                  # zustand stores
    ui/                     # shared UI (states, toolbars, table helpers)
  components/ui/            # UI primitives (button, input, dialog, etc.)
```

---

## Code style и качество

- ESLint конфиг: `eslint.config.mjs` (Next + TS) + `eslint-plugin-prettier`
- Prettier конфиг: `.prettierrc.json` (включая `prettier-plugin-tailwindcss`)

Рекомендуемый пайплайн перед PR/релизом:

```bash
npm run format:check
npm run lint
npm run build
```

---

## Деплой

### Vercel (рекомендовано для Next.js)

- Добавьте переменные окружения в настройках проекта Vercel:
  - `NEXT_PUBLIC_GRAPHQL_URL`
  - `NEXT_PUBLIC_UPLOAD_URL`
  - `NEXT_PUBLIC_SITE_URL`
- Убедитесь, что backend:
  - доступен по HTTPS
  - корректно выставляет cookies и CORS

### Self-host (Node)

- `npm run build`
- `npm run start`
- за reverse proxy (nginx/caddy) настройте TLS, gzip/brotli, cache headers при необходимости

---

## Что этот проект демонстрирует (как портфолио)

- **Архитектурное мышление**: слоистая структура, разграничение ответственности, читаемость и масштабируемость
- **Работу с данными на продакшен‑уровне**: GraphQL, Apollo, SSR/ISR, кэш, error‑handling
- **Реальные продуктовые фичи**: админка, CRUD, фильтры, модалки, профиль, email verification
- **SEO и индексацию**: metadata, JSON‑LD, robots, sitemap
- **UI engineering**: дизайн‑система на Tailwind + Radix, тема, адаптивность, микровзаимодействия
- **Инженерные практики**: линт/формат, codegen, оптимизации импорта и lazy loading

---

## Идеи для развития (если нужно усилить портфолио)

- **E2E** (Playwright): сценарии “логин → админка → создать категорию → создать программу”
- **Storybook** для `components/ui` и ключевых виджетов
- **Server Actions / RSC улучшения** для части форм, где это уместно
- **Кэш‑стратегия**: более тонкая настройка `revalidate`, tag-based invalidation (если потребуется)
- **Observability**: Sentry, web-vitals, логирование ошибок GraphQL

---

## Контакты / автор

Добавьте свои контакты (GitHub, Telegram, email, CV):

- **GitHub**: (link)
- **Telegram**: (link)
- **Email**: (email)
