/** Полное наименование организации */
export const COMPANY_FULL_NAME =
  'Общество с ограниченной ответственностью "Центр оценки квалификаций "Стандарт плюс"';

/** Адрес */
export const COMPANY_ADDRESS =
  "259022, Республика Крым, г. Симферополь, просп. Победы, 165/1, 3 этаж";

/** График работы */
export const WORKING_HOURS = "Будни 8:00–17:00";

export interface ContactDepartment {
  title: string;
  phone: string;
  email: string;
}

export const CONTACT_DEPARTMENTS: ContactDepartment[] = [
  {
    title: "Отдел продаж",
    phone: "+7 (978) 742-90-42",
    email: "info@standart82.ru",
  },
  {
    title: "Методический отдел",
    phone: "+7 (918) 472-01-62",
    email: "m01@standart82.ru",
  },
  {
    title: "Офис-менеджер",
    phone: "+7 (978) 834-39-31",
    email: "office@standart82.ru",
  },
];

/** ID организации в Яндекс.Картах (для карты и виджета отзывов) */
export const YANDEX_ORG_ID = "96094634625";
