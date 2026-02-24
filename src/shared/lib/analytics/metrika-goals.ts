type YmFn = (id: number, action: string, ...args: unknown[]) => void;

const METRIKA_ID = 106976069;

function ym(...args: Parameters<YmFn>): void {
  const ymFn = (
    typeof window !== "undefined"
      ? (window as Window & { ym?: YmFn }).ym
      : undefined
  );
  if (typeof ymFn === "function") {
    ymFn(...args);
  }
}

/**
 * Все цели Яндекс.Метрики в одном месте.
 * Названия целей нужно завести вручную в кабинете Метрики:
 * Настройки → Цели → Добавить цель → JavaScript-событие → Идентификатор цели
 */
export const metrikaGoals = {
  /** Пользователь добавил программу в корзину */
  addToCart: (programId: string) =>
    ym(METRIKA_ID, "reachGoal", "add_to_cart", { programId }),

  /** Пользователь успешно оформил заявку */
  orderCreated: (orderId: string, customerType: string) =>
    ym(METRIKA_ID, "reachGoal", "order_created", { orderId, customerType }),

  /** Пользователь открыл чат поддержки */
  chatOpened: () =>
    ym(METRIKA_ID, "reachGoal", "chat_opened"),

  /** Пользователь отправил первое сообщение в чат */
  chatMessageSent: () =>
    ym(METRIKA_ID, "reachGoal", "chat_message_sent"),

  /** Пользователь открыл страницу программы */
  programViewed: (programId: string) =>
    ym(METRIKA_ID, "reachGoal", "program_viewed", { programId }),
};
