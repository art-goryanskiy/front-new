# Аудит цельности и единства стиля

Краткий отчёт по согласованности дизайна и UI в проекте. **Исправления по аудиту внесены** (шкала primary, glow-menu, highlight-card, animated-characters, импорт Surface).

---

## Что сделано хорошо

### 1. Единая тема (CSS-переменные)

- **globals.css**: полный набор переменных для light/dark (`--background`, `--foreground`, `--primary`, `--card`, `--border`, `--muted`, sidebar-*, и т.д.).
- **Примитивы** (Button, Card, Input, Select, Dialog, Tabs и др.) последовательно используют токены: `bg-primary`, `border-input`, `ring-ring`, `text-muted-foreground` — без хардкода hex в базовых компонентах.
- **next-themes**: единое переключение темы по классу `.dark`.

### 2. Единые состояния загрузки/ошибок/пустоты

- **LoadingState**, **EmptyState**, **ErrorState** из `shared/ui` используются и в публичной части, и в админке (топ-программы, таблицы пользователей/категорий/программ, списки сущностей).
- Одинаковый паттерн: Card + контент, Spinner/иконка, тексты через `text-muted-foreground` / `text-destructive`.

### 3. Контейнеры и отступы

- Общий паттерн ширины и паддингов: `max-w-7xl`, `px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12` — в PublicHeader, Admin Header, PublicFooter, контенте страниц.
- Единый ритм отступов (gap-4, gap-6, p-6 в карточках).

### 4. Хедеры

- Оба хедера: `sticky`, `border-b border-border/60`, `bg-background/70`, `backdrop-blur-xl`.
- Константы вынесены в `*constants.ts`, анимации — в `*ANIMATIONS`, структура похожа.

### 5. Компоненты и код

- Везде `cn()` из `@/lib/utils` (кроме одного места — см. ниже).
- Button: CVA, варианты default/destructive/outline/secondary/ghost/link, размеры — единообразно.
- Card: `rounded-xl`, тени и границы через токены.

### 6. Скругления (логичная шкала)

- Контролы (input, button, select): `rounded-md`.
- Карточки: `rounded-xl` (Card), `rounded-2xl` (Surface, HighlightCard) — осознанная иерархия.

---

## Несоответствия и риски

### 1. Цвета вне палитры темы

| Место | Проблема |
|-------|----------|
| **glow-menu-header-items.tsx** | Градиенты blue/purple (`rgba(59,130,246)`, `rgba(168,85,247)`), `text-blue-500`, `text-purple-500` — не связаны с `--primary` (#e50914). |
| **glow-menu.tsx** | NAV_GLOW: blue, purple, red в градиенте — красный близок к primary, синий/фиолетовый выпадают из палитры. |
| **highlight-card.tsx** | Тёмная тема: хардкод `#010101`, `#090909`; много `neutral-*` / `gray-*` вместо `background`, `muted`, `foreground`. |
| **animated-characters-login-page.tsx** | Декоративные hex: `#6C3FF5`, `#2D2D2D`, `#FF9B6B`, `#E8D754` — не из темы. |

**Исправлено:** glow-menu и glow-menu-header-items переведены на палитру primary (#e50914). highlight-card: hex и neutral-*/gray-* заменены на токены темы (background, muted, border, foreground, muted-foreground).

### 2. Шкала primary-* не задана в теме

В **globals.css** определены только `--primary` и `--primary-foreground`. В коде используются классы Tailwind:

- `primary-50`, `primary-100`, `primary-200`, `primary-500`, `primary-600`, `primary-700`, `primary-800`, `primary-900`

в файлах:

- `auth-form-container-constants.ts` (панель приветствия, кнопка)
- `public-header-constants.ts` (navLinkActive)
- `education-document-form-constants.ts`, `category-form-constants.ts`
- `command-palette-constants.tsx`

В Tailwind v4 при текущей настройке темы этих оттенков может не быть — результат может быть непредсказуемым или «серым» по умолчанию.

**Исправлено:** в `globals.css` добавлена шкала `--primary-50` … `--primary-900` для light и dark; в `@theme inline` добавлены `--color-primary-50` … `--color-primary-900`. Классы `primary-50`, `primary-100`, … теперь работают.

### 3. Импорт utils в Surface

- **shared/ui/surface/surface.tsx** импортирует `cn` как `../../../lib/utils` вместо `@/lib/utils`.
- Остальные файлы в `shared/` и `components/ui` используют `@/lib/utils`.

**Исправлено:** импорт заменён на `@/lib/utils`.

### 4. Мелкие визуальные расхождения

- **Высота хедера:** публичный `h-16`, админский `h-14 sm:h-16` — на мобиле разница. Можно оставить (разные зоны) или унифицировать.
- **Command palette / модалки:** свои empty/loading состояния — допустимо из-за другого контекста (popover vs страница).

---

## Итог

- **Цельность:** тема, примитивы, контейнеры, состояния загрузки/ошибок и общая структура стилей выдержаны и единообразны.
- **Единство стиля** страдает из-за: (1) цветов вне палитры в glow-menu и части декора (highlight-card, animated-characters), (2) использования несуществующей в теме шкалы `primary-*`, (3) одного нестандартного импорта в Surface.

Все перечисленные исправления внесены. Оранжевый и жёлтый персонажи на странице логина (#FF9B6B, #E8D754) оставлены для визуального разнообразия иллюстрации; при желании их можно заменить на оттенки primary или добавить переменные `--character-accent-*`.
