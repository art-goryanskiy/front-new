export const AUTH_FORM_CONTAINER_TEXTS = {
  login: {
    title: "Вход",
    welcome: "С возвращением!",
    description: "Уже есть аккаунт?",
    button: "Войти",
  },
  register: {
    title: "Регистрация",
    welcome: "Добро пожаловать на сайт Учебного центра",
    welcomeBrand: "Стандарт +",
    description: "Нет аккаунта?",
    button: "Зарегистрироваться",
  },
} as const;

export const AUTH_FORM_CONTAINER_CLASSES = {
  // Контейнер - на весь экран с улучшенной темной темой и адаптивностью
  container:
    "relative w-full min-h-screen h-screen bg-background overflow-hidden max-md:min-h-screen",
  containerActive: "active",

  // Правая панель - разделена на части: логотип, панель приветствия (на мобильных), форма
  rightPanel:
    "absolute right-0 w-1/2 h-full bg-background flex flex-col z-[1] " +
    "border-l border-border max-md:w-full max-md:h-full " +
    "max-md:border-l-0 max-md:border-t max-[639px]:px-4",

  // Верхняя часть - Логотип (увеличен для планшета и мобильных)
  logoContainer:
    "flex items-center justify-center px-8 py-6 max-xl:py-5 max-lg:py-4 " +
    "max-md:py-6 max-sm:py-5 flex-shrink-0 max-[639px]:px-4",
  logo:
    "h-45 w-auto object-contain max-xl:h-45 max-lg:h-25 max-md:h-20 " +
    "max-sm:h-16 transition-all duration-300",
  logoButton:
    "flex items-center justify-center focus:outline-none focus:ring-0 rounded-lg " +
    "hover:opacity-80 transition-opacity duration-200",

  // Панель приветствия для мобильных и планшетов - между логотипом и формой
  mobileTogglePanel:
    "hidden max-md:flex flex-col items-center justify-center px-4 py-3 flex-shrink-0 " +
    "max-sm:px-3 max-sm:py-2 max-[639px]:px-4",
  mobileTogglePanelContent:
    "w-full max-w-md mx-auto bg-gradient-to-br from-primary-50/80 to-primary-100/80 " +
    "dark:from-primary-900/30 dark:to-primary-800/30 backdrop-blur-md rounded-xl p-5 " +
    "border-2 border-primary-200/60 dark:border-primary-600/40 shadow-lg max-sm:p-4 " +
    "max-sm:rounded-lg",
  mobileTogglePanelTitle:
    "text-2xl font-bold mb-2 text-foreground max-sm:text-lg " +
    "max-sm:mb-1.5 transition-opacity duration-300 leading-tight text-center",
  mobileTogglePanelTitleBrand:
    "block text-3xl font-normal text-primary max-sm:text-2xl " +
    "mt-1 max-sm:mt-0.5",
  mobileTogglePanelDescription:
    "text-sm mb-4 text-muted-foreground max-sm:text-xs max-sm:mb-3 " +
    "transition-opacity duration-300 font-medium text-center",
  mobileToggleButton:
    "w-full max-w-[220px] h-11 bg-primary-600 dark:bg-primary-500 text-white font-semibold " +
    "text-sm rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 active:scale-95 " +
    "transition-all duration-200 shadow-md hover:shadow-lg max-sm:max-w-[200px] " +
    "max-sm:h-10 max-sm:text-xs",

  // Контейнер для форм - исправлено для предотвращения наложения заголовка на логотип
  formsContainer:
    "flex-1 flex items-center justify-center relative overflow-hidden px-16 py-8 " +
    "max-xl:px-14 max-lg:px-12 max-md:px-8 max-md:py-4 max-sm:px-6 max-sm:py-3 " +
    "overflow-y-visible max-md:overflow-y-auto max-md:overflow-x-hidden max-[639px]:px-4 " +
    "max-md:items-center max-md:justify-center",
  formBox:
    "absolute inset-0 flex items-center justify-center transition-all duration-500 " +
    "ease-[cubic-bezier(0.4,0,0.2,1)] delay-300 max-md:inset-auto " +
    "max-md:w-full max-md:min-h-fit max-md:py-0 max-md:mt-0 max-md:justify-center " +
    "max-md:items-center",
  formBoxActive: "",
  // Форма регистрации - плавная анимация через opacity и transform
  formBoxRegister:
    "opacity-0 pointer-events-none translate-x-4 transition-all duration-500 " +
    "ease-[cubic-bezier(0.4,0,0.2,1)] delay-300 max-md:translate-x-0 " +
    "max-md:translate-y-0 max-md:absolute max-md:inset-0 max-md:z-[-1]",
  formBoxRegisterActive:
    "opacity-100 pointer-events-auto translate-x-0 max-md:translate-y-0 " +
    "max-md:static max-md:inset-auto max-md:w-full max-md:min-h-fit max-md:py-0 " +
    "max-md:mt-0 max-md:justify-center max-md:items-center max-md:px-8 max-sm:px-6 max-[639px]:px-4",
  // Форма логина - также с плавной анимацией
  formBoxLogin:
    "opacity-100 pointer-events-auto translate-x-0 max-md:translate-y-0 " +
    "max-md:static max-md:inset-auto max-md:w-full max-md:min-h-fit max-md:py-0 " +
    "max-md:mt-0 max-md:justify-center max-md:items-center max-md:px-8 max-sm:px-6 max-[639px]:px-4",
  formBoxLoginHidden:
    "opacity-0 pointer-events-none translate-x-4 transition-all duration-500 " +
    "ease-[cubic-bezier(0.4,0,0.2,1)] delay-300 max-md:translate-x-0 " +
    "max-md:translate-y-0 max-md:absolute max-md:inset-0 max-md:z-[-1]",
  formBoxContent:
    "w-full max-w-md mx-auto max-sm:max-w-full max-md:pt-0 max-md:flex max-md:flex-col max-md:items-center",
  formTitle:
    "text-5xl font-bold mb-2 text-foreground max-xl:text-4xl " +
    "max-lg:text-4xl max-md:text-3xl max-sm:text-2xl max-sm:mb-1 " +
    "transition-opacity duration-300 max-md:mt-0",

  // Блок переключения - для десктопа (скрыт на md и ниже)
  toggleBox: "absolute w-full h-full max-md:hidden",

  // Баннер - сдвинут на 50% влево, скруглен справа, приближен, с улучшенным оверлеем для темной темы
  // Скрыт на md и ниже (планшеты и мобильные)
  bannerContainer:
    "absolute left-[-50%] w-full h-full z-[3] flex items-center justify-center " +
    "overflow-hidden max-md:hidden",
  bannerImage:
    "w-full h-full object-cover object-[center_bottom] " +
    "transition-opacity duration-500 scale-[1.25] dark:brightness-75",
  // Улучшенный оверлей для читаемости в светлой и темной теме
  bannerOverlay:
    "absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20 " +
    "dark:from-black/70 dark:via-black/50 dark:to-black/30 z-[1]",

  // Панели переключения - для десктопа, скрыта на md и ниже (планшеты и мобильные)
  togglePanel:
    "absolute w-1/2 h-full text-white flex flex-col justify-center items-center z-[4] " +
    "px-12 max-xl:px-10 max-lg:px-8 max-md:hidden",
  togglePanelLeft: "left-0",
  togglePanelContent:
    "transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] relative z-[2] " +
    "bg-black/30 dark:bg-black/40 backdrop-blur-md rounded-2xl p-8 max-xl:p-7 " +
    "max-lg:p-6",
  togglePanelTitle:
    "text-5xl font-bold mb-4 text-white max-xl:text-4xl max-lg:text-4xl " +
    "transition-opacity duration-300 drop-shadow-2xl text-center leading-tight",
  togglePanelTitleBrand:
    "block text-6xl font-normal text-white max-xl:text-5xl max-lg:text-5xl " +
    "drop-shadow-2xl mt-2",
  togglePanelDescription:
    "text-lg mb-8 text-white/95 max-xl:text-base max-lg:text-base " +
    "transition-opacity duration-300 drop-shadow-lg font-medium text-center",
  toggleButton:
    "w-48 h-14 bg-white/15 dark:bg-white/20 backdrop-blur-md border-2 " +
    "border-white/90 dark:border-white/70 rounded-xl text-white font-semibold " +
    "text-base hover:bg-white/25 dark:hover:bg-white/30 hover:border-white " +
    "transition-all duration-200 shadow-2xl hover:shadow-white/30 max-xl:w-44 " +
    "max-xl:h-12 max-lg:w-40 max-lg:h-12",
} as const;
