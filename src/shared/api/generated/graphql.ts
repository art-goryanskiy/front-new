/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AddToCartInput = {
  pricingIndex: Scalars['Int']['input'];
  programId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  subProgramIndex?: InputMaybe<Scalars['Int']['input']>;
};

export type AddressSuggestionEntity = {
  __typename?: 'AddressSuggestionEntity';
  city?: Maybe<Scalars['String']['output']>;
  fiasId?: Maybe<Scalars['String']['output']>;
  flat?: Maybe<Scalars['String']['output']>;
  geoLat?: Maybe<Scalars['String']['output']>;
  geoLon?: Maybe<Scalars['String']['output']>;
  house?: Maybe<Scalars['String']['output']>;
  kladrId?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
  unrestrictedValue?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

export type AdminAssignChatInput = {
  /** ID админа (null — снять назначение) */
  assignToUserId?: InputMaybe<Scalars['String']['input']>;
  /** ID чата */
  chatId: Scalars['String']['input'];
};

export type AdminChatsFilterInput = {
  /** Только чаты, назначенные на этого админа */
  assignedToMe?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<ChatStatus>;
};

export type AdminCreateUserInput = {
  email: Scalars['String']['input'];
  generateTempPassword?: InputMaybe<Scalars['Boolean']['input']>;
  isBlocked?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<UpdateMyProfileInput>;
  role?: InputMaybe<UserRole>;
};

export type AdminGenerateOrderDocumentInput = {
  /** Дата документа (по умолчанию — сегодня) */
  documentDate?: InputMaybe<Scalars['DateTime']['input']>;
  orderId: Scalars['ID']['input'];
};

export type AdminOrdersFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<OrderStatus>;
  /** Фильтр по пользователю */
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type AdminSetChatStatusInput = {
  /** ID чата */
  chatId: Scalars['String']['input'];
  status: ChatStatus;
};

export type AdminSetOrderTrainingDatesInput = {
  /** Срок обучения: окончание */
  trainingEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  /** Срок обучения: начало */
  trainingStartDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AdminUpdateOrderDocumentDateInput = {
  documentDate: Scalars['DateTime']['input'];
  orderDocumentId: Scalars['ID']['input'];
};

export type AdminUpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  isBlocked?: InputMaybe<Scalars['Boolean']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  profile?: InputMaybe<UpdateMyProfileInput>;
};

export type AdminUserFilterInput = {
  isBlocked?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type CartEntity = {
  __typename?: 'CartEntity';
  items: Array<CartItemEntity>;
  totalAmount: Scalars['Float']['output'];
};

export type CartItemEntity = {
  __typename?: 'CartItemEntity';
  displayTitle: Scalars['String']['output'];
  lineAmount: Scalars['Float']['output'];
  pricingIndex: Scalars['Int']['output'];
  program: ProgramEntity;
  programId: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
  subProgramIndex?: Maybe<Scalars['Int']['output']>;
  subProgramTitle?: Maybe<Scalars['String']['output']>;
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  parent?: Maybe<Scalars['ID']['output']>;
  programsCount?: Maybe<Scalars['Float']['output']>;
  slug: Scalars['String']['output'];
  type?: Maybe<CategoryType>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CategoryFilterInput = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  parent?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export enum CategoryType {
  ProfessionalEducation = 'PROFESSIONAL_EDUCATION',
  ProfessionalRetraining = 'PROFESSIONAL_RETRAINING',
  QualificationUpgrade = 'QUALIFICATION_UPGRADE'
}

export type ChangeMyPasswordInput = {
  confirmPassword: Scalars['String']['input'];
  currentPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Chat = {
  __typename?: 'Chat';
  assignedToId?: Maybe<Scalars['ID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lastMessagePreview?: Maybe<Scalars['String']['output']>;
  status: ChatStatus;
  unreadCount?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  body: Scalars['String']['output'];
  chatId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  /** Сообщение от админа (иначе от пользователя чата) */
  isFromAdmin: Scalars['Boolean']['output'];
  readAt?: Maybe<Scalars['DateTime']['output']>;
  senderId: Scalars['ID']['output'];
};

export type ChatMessagesFilterInput = {
  /** Курсор для пагинации (id последнего сообщения) */
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export enum ChatStatus {
  Closed = 'CLOSED',
  Open = 'OPEN'
}

export type CreateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  parent?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<CategoryType>;
};

export type CreateEducationDocumentInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateOrderCardPaymentResult = {
  __typename?: 'CreateOrderCardPaymentResult';
  /** Идентификатор платежа (PaymentId) для открытия формы */
  paymentId: Scalars['String']['output'];
  /** URL платёжной формы (для редиректа или iframe) */
  paymentUrl: Scalars['String']['output'];
  /** Статус (Success и т.д.) */
  status?: Maybe<Scalars['String']['output']>;
};

export type CreateOrderFromCartInput = {
  bankAccount?: InputMaybe<Scalars['String']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  bik?: InputMaybe<Scalars['String']['input']>;
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPersonName?: InputMaybe<Scalars['String']['input']>;
  contactPersonPosition?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  correspondentAccount?: InputMaybe<Scalars['String']['input']>;
  customerType: OrderCustomerType;
  headFullName?: InputMaybe<Scalars['String']['input']>;
  headFullNameGenitive?: InputMaybe<Scalars['String']['input']>;
  headPosition?: InputMaybe<Scalars['String']['input']>;
  headPositionGenitive?: InputMaybe<Scalars['String']['input']>;
  lines: Array<CreateOrderLineInput>;
  organizationId?: InputMaybe<Scalars['ID']['input']>;
  organizationQuery?: InputMaybe<Scalars['String']['input']>;
  trainingEndDate?: InputMaybe<Scalars['DateTime']['input']>;
  trainingForm?: InputMaybe<Scalars['String']['input']>;
  trainingLanguage?: InputMaybe<Scalars['String']['input']>;
  trainingStartDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateOrderInvoiceResult = {
  __typename?: 'CreateOrderInvoiceResult';
  /** Ссылка на счёт в личном кабинете T-Бизнес */
  incomingInvoiceUrl?: Maybe<Scalars['String']['output']>;
  /** Идентификатор счёта в T-Bank */
  invoiceId: Scalars['String']['output'];
  /** Ссылка на PDF счёта */
  pdfUrl: Scalars['String']['output'];
};

export type CreateOrderLineInput = {
  hours: Scalars['Float']['input'];
  learners: Array<OrderLineLearnerInput>;
  lineAmount: Scalars['Float']['input'];
  price: Scalars['Float']['input'];
  pricingIndex?: InputMaybe<Scalars['Int']['input']>;
  programId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  subProgramIndex?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateProgramInput = {
  awardedQualification?: InputMaybe<Scalars['String']['input']>;
  /** Разряд с (или единственный разряд); необязательно */
  awardedRankFrom?: InputMaybe<Scalars['Float']['input']>;
  /** Разряд по (или единственный разряд); необязательно */
  awardedRankTo?: InputMaybe<Scalars['Float']['input']>;
  baseHours?: InputMaybe<Scalars['Float']['input']>;
  category: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  educationDocumentId?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  pricing?: InputMaybe<Array<ProgramPricingInput>>;
  shortTitle?: InputMaybe<Scalars['String']['input']>;
  studentCategory?: InputMaybe<Scalars['String']['input']>;
  subPrograms?: InputMaybe<Array<ProgramSubProgramInput>>;
  title: Scalars['String']['input'];
};

export type EducationDocumentEntity = {
  __typename?: 'EducationDocumentEntity';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EducationInfoEntity = {
  __typename?: 'EducationInfoEntity';
  documentIssuedAt?: Maybe<Scalars['DateTime']['output']>;
  qualification?: Maybe<Scalars['String']['output']>;
};

export type EducationInfoInput = {
  documentIssuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  qualification?: InputMaybe<Scalars['String']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToCart: CartEntity;
  /** Назначить чат на админа или снять назначение. */
  adminAssignChat: Chat;
  adminCreateUser: UserEntity;
  /** Удалить заявку (только для админа) */
  adminDeleteOrder: Scalars['Boolean']['output'];
  adminDeleteUser: Scalars['Boolean']['output'];
  /** Сформировать акт оказанных услуг по заявке (только для админа) */
  adminGenerateOrderAct: OrderDocument;
  /** Сформировать договор по заявке (только для админа) */
  adminGenerateOrderContract: OrderDocument;
  /** Сформировать заявку на обучение по заказу (только для админа) */
  adminGenerateOrderTrainingApplication: OrderDocument;
  /** Закрыть или открыть чат. */
  adminSetChatStatus: Chat;
  /** Установить сроки обучения по заявке (с / по). Только для админа. */
  adminSetOrderTrainingDates: Order;
  adminSetUserBlocked: UserEntity;
  /** Изменить дату документа (только для админа) */
  adminUpdateOrderDocumentDate: OrderDocument;
  /** Изменить статус заявки (только для админа) */
  adminUpdateOrderStatus: Order;
  adminUpdateUser: UserEntity;
  changeMyPassword: Scalars['Boolean']['output'];
  createCategory: CategoryEntity;
  createEducationDocument: EducationDocumentEntity;
  createOrderCardPayment: CreateOrderCardPaymentResult;
  createOrderFromCart: Order;
  createOrderInvoice: CreateOrderInvoiceResult;
  createProgram: ProgramEntity;
  deleteCategory: CategoryEntity;
  deleteEducationDocument: EducationDocumentEntity;
  deleteOrder: Scalars['Boolean']['output'];
  deleteProgram: ProgramEntity;
  login: UserEntity;
  logout: Scalars['Boolean']['output'];
  refreshToken: UserEntity;
  register: Scalars['Boolean']['output'];
  removeFromCart: CartEntity;
  requestEmailVerification: Scalars['Boolean']['output'];
  requestPasswordReset: Scalars['Boolean']['output'];
  resetPassword: Scalars['Boolean']['output'];
  /** Отправить сообщение. chatId не передавать при первом сообщении — чат создастся. */
  sendMessage: ChatMessage;
  setMyWorkPlaceByInn: UserProfileEntity;
  setMyWorkPlaceManual: UserProfileEntity;
  updateCartItem: CartEntity;
  updateCategory: CategoryEntity;
  updateEducationDocument: EducationDocumentEntity;
  updateMyProfile: UserProfileEntity;
  updateOrder: Order;
  updateOrderStatus: Order;
  updateProgram: ProgramEntity;
  verifyEmail: Scalars['Boolean']['output'];
};


export type MutationAddToCartArgs = {
  input: AddToCartInput;
};


export type MutationAdminAssignChatArgs = {
  input: AdminAssignChatInput;
};


export type MutationAdminCreateUserArgs = {
  input: AdminCreateUserInput;
};


export type MutationAdminDeleteOrderArgs = {
  orderId: Scalars['ID']['input'];
};


export type MutationAdminDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationAdminGenerateOrderActArgs = {
  input: AdminGenerateOrderDocumentInput;
};


export type MutationAdminGenerateOrderContractArgs = {
  input: AdminGenerateOrderDocumentInput;
};


export type MutationAdminGenerateOrderTrainingApplicationArgs = {
  orderId: Scalars['ID']['input'];
};


export type MutationAdminSetChatStatusArgs = {
  input: AdminSetChatStatusInput;
};


export type MutationAdminSetOrderTrainingDatesArgs = {
  input: AdminSetOrderTrainingDatesInput;
  orderId: Scalars['ID']['input'];
};


export type MutationAdminSetUserBlockedArgs = {
  blocked: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};


export type MutationAdminUpdateOrderDocumentDateArgs = {
  input: AdminUpdateOrderDocumentDateInput;
};


export type MutationAdminUpdateOrderStatusArgs = {
  orderId: Scalars['ID']['input'];
  status: OrderStatus;
};


export type MutationAdminUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: AdminUpdateUserInput;
};


export type MutationChangeMyPasswordArgs = {
  input: ChangeMyPasswordInput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateEducationDocumentArgs = {
  input: CreateEducationDocumentInput;
};


export type MutationCreateOrderCardPaymentArgs = {
  orderId: Scalars['ID']['input'];
};


export type MutationCreateOrderFromCartArgs = {
  input: CreateOrderFromCartInput;
};


export type MutationCreateOrderInvoiceArgs = {
  orderId: Scalars['ID']['input'];
  payerInn?: InputMaybe<Scalars['String']['input']>;
  payerKpp?: InputMaybe<Scalars['String']['input']>;
  payerName?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateProgramArgs = {
  input: CreateProgramInput;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteEducationDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteOrderArgs = {
  orderId: Scalars['ID']['input'];
};


export type MutationDeleteProgramArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveFromCartArgs = {
  input: RemoveFromCartInput;
};


export type MutationRequestEmailVerificationArgs = {
  input: RequestEmailVerificationInput;
};


export type MutationRequestPasswordResetArgs = {
  input: RequestPasswordResetInput;
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSendMessageArgs = {
  input: SendMessageInput;
};


export type MutationSetMyWorkPlaceByInnArgs = {
  input: SetMyWorkPlaceByInnInput;
};


export type MutationSetMyWorkPlaceManualArgs = {
  input: SetMyWorkPlaceManualInput;
};


export type MutationUpdateCartItemArgs = {
  input: UpdateCartItemInput;
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['ID']['input'];
  input: UpdateCategoryInput;
};


export type MutationUpdateEducationDocumentArgs = {
  id: Scalars['ID']['input'];
  input: UpdateEducationDocumentInput;
};


export type MutationUpdateMyProfileArgs = {
  input: UpdateMyProfileInput;
};


export type MutationUpdateOrderArgs = {
  input: UpdateOrderInput;
  orderId: Scalars['ID']['input'];
};


export type MutationUpdateOrderStatusArgs = {
  orderId: Scalars['ID']['input'];
  status: OrderStatus;
};


export type MutationUpdateProgramArgs = {
  id: Scalars['ID']['input'];
  input: UpdateProgramInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type MyOrdersFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<OrderStatus>;
};

export type NewsAttachmentEntity = {
  __typename?: 'NewsAttachmentEntity';
  title?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  url?: Maybe<Scalars['String']['output']>;
};

export type NewsFilterInput = {
  /** Количество записей (по умолчанию 10, макс. 100) */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /** Смещение для пагинации */
  offset?: InputMaybe<Scalars['Float']['input']>;
};

export type NewsItemEntity = {
  __typename?: 'NewsItemEntity';
  attachments?: Maybe<Array<NewsAttachmentEntity>>;
  /** ISO 8601 date */
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
  /** Ссылка на запись во ВКонтакте */
  vkUrl?: Maybe<Scalars['String']['output']>;
};

export type Order = {
  __typename?: 'Order';
  contactEmail?: Maybe<Scalars['String']['output']>;
  contactPersonName?: Maybe<Scalars['String']['output']>;
  contactPersonPosition?: Maybe<Scalars['String']['output']>;
  contactPhone?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  /** Название организации (при заказе от юрлица) или ФИО (руководитель/контакт) для отображения в карточке заявки */
  customerDisplayName?: Maybe<Scalars['String']['output']>;
  customerType: OrderCustomerType;
  headFullName?: Maybe<Scalars['String']['output']>;
  headFullNameGenitive?: Maybe<Scalars['String']['output']>;
  headPosition?: Maybe<Scalars['String']['output']>;
  headPositionGenitive?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lines: Array<OrderLine>;
  number?: Maybe<Scalars['String']['output']>;
  organizationId?: Maybe<Scalars['ID']['output']>;
  status: OrderStatus;
  statusChangedAt?: Maybe<Scalars['DateTime']['output']>;
  totalAmount: Scalars['Float']['output'];
  trainingEndDate?: Maybe<Scalars['DateTime']['output']>;
  trainingForm?: Maybe<Scalars['String']['output']>;
  trainingLanguage?: Maybe<Scalars['String']['output']>;
  trainingStartDate?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['ID']['output'];
};

export enum OrderCustomerType {
  Individual = 'INDIVIDUAL',
  Organization = 'ORGANIZATION',
  Self = 'SELF'
}

export type OrderDocument = {
  __typename?: 'OrderDocument';
  createdAt: Scalars['DateTime']['output'];
  documentDate: Scalars['DateTime']['output'];
  /** Ссылка на PDF */
  fileUrl: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  kind: OrderDocumentKind;
  orderId: Scalars['ID']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export enum OrderDocumentKind {
  Act = 'ACT',
  Contract = 'CONTRACT',
  TrainingApplication = 'TRAINING_APPLICATION'
}

export type OrderInvoiceInfoResult = {
  __typename?: 'OrderInvoiceInfoResult';
  /** Статус счёта в T-Bank (например SUBMITTED) */
  status: Scalars['String']['output'];
};

export type OrderLine = {
  __typename?: 'OrderLine';
  hours: Scalars['Float']['output'];
  learners: Array<OrderLineLearner>;
  lineAmount: Scalars['Float']['output'];
  price: Scalars['Float']['output'];
  programId: Scalars['ID']['output'];
  programTitle: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  subProgramIndex?: Maybe<Scalars['Int']['output']>;
  subProgramTitle?: Maybe<Scalars['String']['output']>;
};

export type OrderLineLearner = {
  __typename?: 'OrderLineLearner';
  citizenship?: Maybe<Scalars['String']['output']>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  educationDocumentIssuedAt?: Maybe<Scalars['DateTime']['output']>;
  educationQualification?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  middleName?: Maybe<Scalars['String']['output']>;
  passportDepartmentCode?: Maybe<Scalars['String']['output']>;
  passportIssuedAt?: Maybe<Scalars['DateTime']['output']>;
  passportIssuedBy?: Maybe<Scalars['String']['output']>;
  passportNumber?: Maybe<Scalars['String']['output']>;
  passportRegistrationAddress?: Maybe<Scalars['String']['output']>;
  passportSeries?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['String']['output']>;
  residentialAddress?: Maybe<Scalars['String']['output']>;
  snils?: Maybe<Scalars['String']['output']>;
  workPlaceName?: Maybe<Scalars['String']['output']>;
};

export type OrderLineLearnerInput = {
  citizenship?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  educationDocumentIssuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  educationQualification?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  middleName?: InputMaybe<Scalars['String']['input']>;
  passportDepartmentCode?: InputMaybe<Scalars['String']['input']>;
  passportIssuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  passportIssuedBy?: InputMaybe<Scalars['String']['input']>;
  passportNumber?: InputMaybe<Scalars['String']['input']>;
  passportRegistrationAddress?: InputMaybe<Scalars['String']['input']>;
  passportSeries?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  residentialAddress?: InputMaybe<Scalars['String']['input']>;
  snils?: InputMaybe<Scalars['String']['input']>;
  workPlaceName?: InputMaybe<Scalars['String']['input']>;
};

export type OrderPaymentStatusItem = {
  __typename?: 'OrderPaymentStatusItem';
  paymentId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type OrderPaymentSyncResult = {
  __typename?: 'OrderPaymentSyncResult';
  /** Платежи по заказу из T-Bank */
  payments?: Maybe<Array<OrderPaymentStatusItem>>;
  /** Текущий статус заказа */
  status: OrderStatus;
  /** Был ли обновлён статус заказа (например на PAID) */
  updated: Scalars['Boolean']['output'];
};

export enum OrderStatus {
  AwaitingPayment = 'AWAITING_PAYMENT',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  Paid = 'PAID'
}

export type OrganizationEntity = {
  __typename?: 'OrganizationEntity';
  actualAddress?: Maybe<Scalars['String']['output']>;
  /** Расчётный счёт (р/с) */
  bankAccount?: Maybe<Scalars['String']['output']>;
  /** Наименование банка */
  bankName?: Maybe<Scalars['String']['output']>;
  /** БИК банка */
  bik?: Maybe<Scalars['String']['output']>;
  /** Корреспондентский счёт (к/с) */
  correspondentAccount?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  fioFirst?: Maybe<Scalars['String']['output']>;
  fioFull?: Maybe<Scalars['String']['output']>;
  fioLast?: Maybe<Scalars['String']['output']>;
  fioMiddle?: Maybe<Scalars['String']['output']>;
  fullName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  inn: Scalars['String']['output'];
  kpp?: Maybe<Scalars['String']['output']>;
  legalAddress?: Maybe<Scalars['String']['output']>;
  ogrn: Scalars['String']['output'];
  opfFull?: Maybe<Scalars['String']['output']>;
  opfShort?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  shortName?: Maybe<Scalars['String']['output']>;
  type: OrganizationType;
};

export type OrganizationSuggestionEntity = {
  __typename?: 'OrganizationSuggestionEntity';
  displayName: Scalars['String']['output'];
  fullName?: Maybe<Scalars['String']['output']>;
  inn: Scalars['String']['output'];
  kpp?: Maybe<Scalars['String']['output']>;
  legalAddress?: Maybe<Scalars['String']['output']>;
  ogrn: Scalars['String']['output'];
  shortName?: Maybe<Scalars['String']['output']>;
  type: OrganizationType;
};

export enum OrganizationType {
  Individual = 'INDIVIDUAL',
  Legal = 'LEGAL'
}

export type PassportInfoEntity = {
  __typename?: 'PassportInfoEntity';
  departmentCode?: Maybe<Scalars['String']['output']>;
  issuedAt?: Maybe<Scalars['DateTime']['output']>;
  issuedBy?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  series?: Maybe<Scalars['String']['output']>;
};

export type PassportInfoInput = {
  departmentCode?: InputMaybe<Scalars['String']['input']>;
  issuedAt?: InputMaybe<Scalars['DateTime']['input']>;
  issuedBy?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  series?: InputMaybe<Scalars['String']['input']>;
};

export type ProgramEntity = {
  __typename?: 'ProgramEntity';
  awardedQualification?: Maybe<Scalars['String']['output']>;
  /** Разряд с (или единственный разряд) */
  awardedRankFrom?: Maybe<Scalars['Float']['output']>;
  /** Разряд по (или единственный разряд) */
  awardedRankTo?: Maybe<Scalars['Float']['output']>;
  baseHours?: Maybe<Scalars['Float']['output']>;
  category: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  educationDocument?: Maybe<EducationDocumentEntity>;
  educationDocumentId?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  pricing: Array<ProgramPricing>;
  shortTitle?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  studentCategory?: Maybe<Scalars['String']['output']>;
  subPrograms?: Maybe<Array<ProgramSubProgramEntity>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  views: Scalars['Float']['output'];
  /** Рейтинг популярности 0–5 на основе количества просмотров */
  viewsRating: Scalars['Float']['output'];
};

export type ProgramFilterInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  categoryIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};

export type ProgramPricing = {
  __typename?: 'ProgramPricing';
  hours: Scalars['Float']['output'];
  price?: Maybe<Scalars['Float']['output']>;
};

export type ProgramPricingInput = {
  hours: Scalars['Float']['input'];
  price: Scalars['Float']['input'];
};

export type ProgramSubProgramEntity = {
  __typename?: 'ProgramSubProgramEntity';
  description?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type ProgramSubProgramInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type ProgramsPageEntity = {
  __typename?: 'ProgramsPageEntity';
  items: Array<ProgramEntity>;
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  addressSuggestions: Array<AddressSuggestionEntity>;
  /** Сообщения чата (админ, любой чат). */
  adminChatMessages: Array<ChatMessage>;
  /** Список чатов (только для админа). */
  adminChats: Array<Chat>;
  /** Одна заявка по ID (только для админа) */
  adminOrder: Order;
  /** Документы по заявке (только для админа) */
  adminOrderDocuments: Array<OrderDocument>;
  /** Список заявок (только для админа) */
  adminOrders: Array<Order>;
  adminUser?: Maybe<UserEntity>;
  adminUsers: Array<UserEntity>;
  categories: Array<CategoryEntity>;
  category?: Maybe<CategoryEntity>;
  /** Сообщения чата. Доступ: владелец чата или админ. */
  chatMessages: Array<ChatMessage>;
  educationDocument?: Maybe<EducationDocumentEntity>;
  educationDocuments: Array<EducationDocumentEntity>;
  me: UserEntity;
  myCart: CartEntity;
  /** Мой чат (один на пользователя). Создаётся при первом сообщении. */
  myChat?: Maybe<Chat>;
  myOrders: Array<Order>;
  /** Новости со стены сообщества ВКонтакте */
  news: Array<NewsItemEntity>;
  order: Order;
  /** Документы по заявке (заявка на обучение, договор, акт) */
  orderDocuments: Array<OrderDocument>;
  orderInvoiceStatus: OrderInvoiceInfoResult;
  orderPaymentSync: OrderPaymentSyncResult;
  organizationSuggestions: Array<OrganizationSuggestionEntity>;
  program: ProgramEntity;
  programs: Array<ProgramEntity>;
  programsPage: ProgramsPageEntity;
  topPrograms: Array<ProgramEntity>;
};


export type QueryAddressSuggestionsArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


export type QueryAdminChatMessagesArgs = {
  chatId: Scalars['ID']['input'];
  filter?: InputMaybe<ChatMessagesFilterInput>;
};


export type QueryAdminChatsArgs = {
  filter?: InputMaybe<AdminChatsFilterInput>;
};


export type QueryAdminOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdminOrderDocumentsArgs = {
  orderId: Scalars['ID']['input'];
};


export type QueryAdminOrdersArgs = {
  filter?: InputMaybe<AdminOrdersFilterInput>;
};


export type QueryAdminUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAdminUsersArgs = {
  filter?: InputMaybe<AdminUserFilterInput>;
};


export type QueryCategoriesArgs = {
  filter?: InputMaybe<CategoryFilterInput>;
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryChatMessagesArgs = {
  chatId: Scalars['ID']['input'];
  filter?: InputMaybe<ChatMessagesFilterInput>;
};


export type QueryEducationDocumentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMyOrdersArgs = {
  filter?: InputMaybe<MyOrdersFilterInput>;
};


export type QueryNewsArgs = {
  filter?: InputMaybe<NewsFilterInput>;
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrderDocumentsArgs = {
  orderId: Scalars['ID']['input'];
};


export type QueryOrderInvoiceStatusArgs = {
  orderId: Scalars['ID']['input'];
};


export type QueryOrderPaymentSyncArgs = {
  orderId: Scalars['ID']['input'];
};


export type QueryOrganizationSuggestionsArgs = {
  count?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};


export type QueryProgramArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProgramsArgs = {
  filter?: InputMaybe<ProgramFilterInput>;
};


export type QueryProgramsPageArgs = {
  filter?: InputMaybe<ProgramFilterInput>;
};


export type QueryTopProgramsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};

export type RegisterInput = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type RemoveFromCartInput = {
  pricingIndex: Scalars['Int']['input'];
  programId: Scalars['ID']['input'];
  subProgramIndex?: InputMaybe<Scalars['Int']['input']>;
};

export type RequestEmailVerificationInput = {
  email: Scalars['String']['input'];
};

export type RequestPasswordResetInput = {
  email: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  confirmPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type SendMessageInput = {
  /** Текст сообщения */
  body: Scalars['String']['input'];
  /** ID чата (для первого сообщения не передавать — чат создастся) */
  chatId?: InputMaybe<Scalars['ID']['input']>;
};

export type SetMyWorkPlaceByInnInput = {
  inn: Scalars['String']['input'];
  isPrimary?: InputMaybe<Scalars['Boolean']['input']>;
  kpp?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
};

export type SetMyWorkPlaceManualInput = {
  actualAddress?: InputMaybe<Scalars['String']['input']>;
  actualSameAsLegal?: InputMaybe<Scalars['Boolean']['input']>;
  bankAccount?: InputMaybe<Scalars['String']['input']>;
  bankName?: InputMaybe<Scalars['String']['input']>;
  bik?: InputMaybe<Scalars['String']['input']>;
  correspondentAccount?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fioFirst?: InputMaybe<Scalars['String']['input']>;
  fioFull?: InputMaybe<Scalars['String']['input']>;
  fioLast?: InputMaybe<Scalars['String']['input']>;
  fioMiddle?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  inn: Scalars['String']['input'];
  isPrimary?: InputMaybe<Scalars['Boolean']['input']>;
  kpp?: InputMaybe<Scalars['String']['input']>;
  legalAddress?: InputMaybe<Scalars['String']['input']>;
  ogrn: Scalars['String']['input'];
  opfFull?: InputMaybe<Scalars['String']['input']>;
  opfShort?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  shortName?: InputMaybe<Scalars['String']['input']>;
  type: OrganizationType;
};

export type UpdateCartItemInput = {
  pricingIndex: Scalars['Int']['input'];
  programId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
  subProgramIndex?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateCategoryInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parent?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<CategoryType>;
};

export type UpdateEducationDocumentInput = {
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMyProfileInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  citizenship?: InputMaybe<Scalars['String']['input']>;
  dateOfBirth?: InputMaybe<Scalars['DateTime']['input']>;
  education?: InputMaybe<EducationInfoInput>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  passport?: InputMaybe<PassportInfoInput>;
  passportRegistrationAddress?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  residentialAddress?: InputMaybe<Scalars['String']['input']>;
  snils?: InputMaybe<Scalars['String']['input']>;
  workPlaces?: InputMaybe<Array<WorkPlaceEntryInput>>;
};

export type UpdateOrderInput = {
  contactEmail?: InputMaybe<Scalars['String']['input']>;
  contactPhone?: InputMaybe<Scalars['String']['input']>;
  organizationId?: InputMaybe<Scalars['ID']['input']>;
  organizationQuery?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProgramInput = {
  awardedQualification?: InputMaybe<Scalars['String']['input']>;
  /** Разряд с (или единственный разряд); необязательно */
  awardedRankFrom?: InputMaybe<Scalars['Float']['input']>;
  /** Разряд по (или единственный разряд); необязательно */
  awardedRankTo?: InputMaybe<Scalars['Float']['input']>;
  baseHours?: InputMaybe<Scalars['Float']['input']>;
  category?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  educationDocumentId?: InputMaybe<Scalars['ID']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  pricing?: InputMaybe<Array<ProgramPricingInput>>;
  shortTitle?: InputMaybe<Scalars['String']['input']>;
  studentCategory?: InputMaybe<Scalars['String']['input']>;
  subPrograms?: InputMaybe<Array<ProgramSubProgramInput>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UserEntity = {
  __typename?: 'UserEntity';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isBlocked: Scalars['Boolean']['output'];
  isEmailVerified: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  mustChangePassword: Scalars['Boolean']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<UserProfileEntity>;
  role: UserRole;
  updatedAt: Scalars['DateTime']['output'];
};

export type UserProfileEntity = {
  __typename?: 'UserProfileEntity';
  avatar?: Maybe<Scalars['String']['output']>;
  citizenship?: Maybe<Scalars['String']['output']>;
  dateOfBirth?: Maybe<Scalars['DateTime']['output']>;
  education?: Maybe<EducationInfoEntity>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  passport?: Maybe<PassportInfoEntity>;
  passportRegistrationAddress?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  residentialAddress?: Maybe<Scalars['String']['output']>;
  snils?: Maybe<Scalars['String']['output']>;
  workPlaces?: Maybe<Array<UserWorkPlaceEntity>>;
};

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UserWorkPlaceEntity = {
  __typename?: 'UserWorkPlaceEntity';
  isPrimary: Scalars['Boolean']['output'];
  organization: OrganizationEntity;
  position?: Maybe<Scalars['String']['output']>;
};

export type VerifyEmailInput = {
  token: Scalars['String']['input'];
};

export type WorkPlaceEntryInput = {
  isPrimary?: Scalars['Boolean']['input'];
  organizationId: Scalars['ID']['input'];
  position?: InputMaybe<Scalars['String']['input']>;
};

export type MyUserProfileFieldsFragment = { __typename?: 'UserProfileEntity', lastName?: string | null, firstName?: string | null, middleName?: string | null, dateOfBirth?: any | null, citizenship?: string | null, phone?: string | null, passportRegistrationAddress?: string | null, residentialAddress?: string | null, snils?: string | null, avatar?: string | null, passport?: { __typename?: 'PassportInfoEntity', series?: string | null, number?: string | null, issuedBy?: string | null, issuedAt?: any | null, departmentCode?: string | null } | null, education?: { __typename?: 'EducationInfoEntity', qualification?: string | null, documentIssuedAt?: any | null } | null, workPlaces?: Array<{ __typename?: 'UserWorkPlaceEntity', position?: string | null, isPrimary: boolean, organization: { __typename?: 'OrganizationEntity', id: string, type: OrganizationType, displayName: string, inn: string, kpp?: string | null, ogrn: string, legalAddress?: string | null } }> | null } & { ' $fragmentName'?: 'MyUserProfileFieldsFragment' };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserEntity', id: string, email: string, role: UserRole, firstName?: string | null, lastName?: string | null, phone?: string | null, isBlocked: boolean, isEmailVerified: boolean } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'UserEntity', id: string, email: string, role: UserRole, firstName?: string | null, lastName?: string | null, phone?: string | null, isBlocked: boolean, isEmailVerified: boolean } };

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: boolean };

export type VerifyEmailMutationVariables = Exact<{
  input: VerifyEmailInput;
}>;


export type VerifyEmailMutation = { __typename?: 'Mutation', verifyEmail: boolean };

export type RequestEmailVerificationMutationVariables = Exact<{
  input: RequestEmailVerificationInput;
}>;


export type RequestEmailVerificationMutation = { __typename?: 'Mutation', requestEmailVerification: boolean };

export type RequestPasswordResetMutationVariables = Exact<{
  input: RequestPasswordResetInput;
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset: boolean };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type UpdateMyProfileMutationVariables = Exact<{
  input: UpdateMyProfileInput;
}>;


export type UpdateMyProfileMutation = { __typename?: 'Mutation', updateMyProfile: (
    { __typename?: 'UserProfileEntity' }
    & { ' $fragmentRefs'?: { 'MyUserProfileFieldsFragment': MyUserProfileFieldsFragment } }
  ) };

export type AddToCartMutationVariables = Exact<{
  input: AddToCartInput;
}>;


export type AddToCartMutation = { __typename?: 'Mutation', addToCart: { __typename?: 'CartEntity', totalAmount: number, items: Array<{ __typename?: 'CartItemEntity', programId: string, pricingIndex: number, quantity: number, lineAmount: number, subProgramIndex?: number | null, subProgramTitle?: string | null, displayTitle: string, program: { __typename?: 'ProgramEntity', id: string, title: string, shortTitle?: string | null, slug: string, image?: string | null, pricing: Array<{ __typename?: 'ProgramPricing', hours: number, price?: number | null }> } }> } };

export type UpdateCartItemMutationVariables = Exact<{
  input: UpdateCartItemInput;
}>;


export type UpdateCartItemMutation = { __typename?: 'Mutation', updateCartItem: { __typename?: 'CartEntity', totalAmount: number, items: Array<{ __typename?: 'CartItemEntity', programId: string, pricingIndex: number, quantity: number, lineAmount: number, subProgramIndex?: number | null, subProgramTitle?: string | null, displayTitle: string, program: { __typename?: 'ProgramEntity', id: string, title: string, shortTitle?: string | null, slug: string, image?: string | null, pricing: Array<{ __typename?: 'ProgramPricing', hours: number, price?: number | null }> } }> } };

export type RemoveFromCartMutationVariables = Exact<{
  input: RemoveFromCartInput;
}>;


export type RemoveFromCartMutation = { __typename?: 'Mutation', removeFromCart: { __typename?: 'CartEntity', totalAmount: number, items: Array<{ __typename?: 'CartItemEntity', programId: string, pricingIndex: number, quantity: number, lineAmount: number, subProgramIndex?: number | null, subProgramTitle?: string | null, displayTitle: string, program: { __typename?: 'ProgramEntity', id: string, title: string, shortTitle?: string | null, slug: string, image?: string | null, pricing: Array<{ __typename?: 'ProgramPricing', hours: number, price?: number | null }> } }> } };

export type CreateCategoryMutationVariables = Exact<{
  input: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'CategoryEntity', id: string, name: string, slug: string, description?: string | null, image?: string | null, type?: CategoryType | null, parent?: string | null, createdAt: any, updatedAt: any, programsCount?: number | null } };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'CategoryEntity', id: string, name: string, slug: string, description?: string | null, image?: string | null, type?: CategoryType | null, parent?: string | null, createdAt: any, updatedAt: any, programsCount?: number | null } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: { __typename?: 'CategoryEntity', id: string } };

export type SendMessageMutationVariables = Exact<{
  input: SendMessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: (
    { __typename?: 'ChatMessage' }
    & { ' $fragmentRefs'?: { 'ChatMessageFieldsFragment': ChatMessageFieldsFragment } }
  ) };

export type AdminAssignChatMutationVariables = Exact<{
  input: AdminAssignChatInput;
}>;


export type AdminAssignChatMutation = { __typename?: 'Mutation', adminAssignChat: (
    { __typename?: 'Chat' }
    & { ' $fragmentRefs'?: { 'AdminChatFieldsFragment': AdminChatFieldsFragment } }
  ) };

export type AdminSetChatStatusMutationVariables = Exact<{
  input: AdminSetChatStatusInput;
}>;


export type AdminSetChatStatusMutation = { __typename?: 'Mutation', adminSetChatStatus: (
    { __typename?: 'Chat' }
    & { ' $fragmentRefs'?: { 'AdminChatFieldsFragment': AdminChatFieldsFragment } }
  ) };

export type CreateEducationDocumentMutationVariables = Exact<{
  input: CreateEducationDocumentInput;
}>;


export type CreateEducationDocumentMutation = { __typename?: 'Mutation', createEducationDocument: { __typename?: 'EducationDocumentEntity', id: string, name: string, image?: string | null, createdAt: any, updatedAt: any } };

export type UpdateEducationDocumentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateEducationDocumentInput;
}>;


export type UpdateEducationDocumentMutation = { __typename?: 'Mutation', updateEducationDocument: { __typename?: 'EducationDocumentEntity', id: string, name: string, image?: string | null, createdAt: any, updatedAt: any } };

export type DeleteEducationDocumentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteEducationDocumentMutation = { __typename?: 'Mutation', deleteEducationDocument: { __typename?: 'EducationDocumentEntity', id: string, name: string, image?: string | null } };

export type CreateOrderFromCartMutationVariables = Exact<{
  input: CreateOrderFromCartInput;
}>;


export type CreateOrderFromCartMutation = { __typename?: 'Mutation', createOrderFromCart: (
    { __typename?: 'Order' }
    & { ' $fragmentRefs'?: { 'OrderFieldsFragment': OrderFieldsFragment } }
  ) };

export type CreateOrderCardPaymentMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type CreateOrderCardPaymentMutation = { __typename?: 'Mutation', createOrderCardPayment: { __typename?: 'CreateOrderCardPaymentResult', paymentId: string, paymentUrl: string, status?: string | null } };

export type UpdateOrderStatusMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
  status: OrderStatus;
}>;


export type UpdateOrderStatusMutation = { __typename?: 'Mutation', updateOrderStatus: { __typename?: 'Order', id: string, number?: string | null, status: OrderStatus } };

export type DeleteOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type DeleteOrderMutation = { __typename?: 'Mutation', deleteOrder: boolean };

export type UpdateOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
  input: UpdateOrderInput;
}>;


export type UpdateOrderMutation = { __typename?: 'Mutation', updateOrder: (
    { __typename?: 'Order' }
    & { ' $fragmentRefs'?: { 'OrderFieldsFragment': OrderFieldsFragment } }
  ) };

export type CreateOrderInvoiceMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
  payerInn?: InputMaybe<Scalars['String']['input']>;
  payerKpp?: InputMaybe<Scalars['String']['input']>;
  payerName?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateOrderInvoiceMutation = { __typename?: 'Mutation', createOrderInvoice: { __typename?: 'CreateOrderInvoiceResult', pdfUrl: string, invoiceId: string, incomingInvoiceUrl?: string | null } };

export type AdminUpdateOrderStatusMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
  status: OrderStatus;
}>;


export type AdminUpdateOrderStatusMutation = { __typename?: 'Mutation', adminUpdateOrderStatus: (
    { __typename?: 'Order' }
    & { ' $fragmentRefs'?: { 'OrderFieldsFragment': OrderFieldsFragment } }
  ) };

export type AdminDeleteOrderMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type AdminDeleteOrderMutation = { __typename?: 'Mutation', adminDeleteOrder: boolean };

export type AdminUpdateOrderDocumentDateMutationVariables = Exact<{
  input: AdminUpdateOrderDocumentDateInput;
}>;


export type AdminUpdateOrderDocumentDateMutation = { __typename?: 'Mutation', adminUpdateOrderDocumentDate: { __typename?: 'OrderDocument', id: string, orderId: string, kind: OrderDocumentKind, fileUrl: string, documentDate: any, createdAt: any, updatedAt: any } };

export type AdminGenerateOrderContractMutationVariables = Exact<{
  input: AdminGenerateOrderDocumentInput;
}>;


export type AdminGenerateOrderContractMutation = { __typename?: 'Mutation', adminGenerateOrderContract: { __typename?: 'OrderDocument', id: string, orderId: string, kind: OrderDocumentKind, fileUrl: string, documentDate: any, createdAt: any, updatedAt: any } };

export type AdminGenerateOrderActMutationVariables = Exact<{
  input: AdminGenerateOrderDocumentInput;
}>;


export type AdminGenerateOrderActMutation = { __typename?: 'Mutation', adminGenerateOrderAct: { __typename?: 'OrderDocument', id: string, orderId: string, kind: OrderDocumentKind, fileUrl: string, documentDate: any, createdAt: any, updatedAt: any } };

export type AdminGenerateOrderTrainingApplicationMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type AdminGenerateOrderTrainingApplicationMutation = { __typename?: 'Mutation', adminGenerateOrderTrainingApplication: { __typename?: 'OrderDocument', id: string, orderId: string, kind: OrderDocumentKind, fileUrl: string, documentDate: any, createdAt: any, updatedAt: any } };

export type AdminSetOrderTrainingDatesMutationVariables = Exact<{
  orderId: Scalars['ID']['input'];
  input: AdminSetOrderTrainingDatesInput;
}>;


export type AdminSetOrderTrainingDatesMutation = { __typename?: 'Mutation', adminSetOrderTrainingDates: (
    { __typename?: 'Order' }
    & { ' $fragmentRefs'?: { 'OrderFieldsFragment': OrderFieldsFragment } }
  ) };

export type CreateProgramMutationVariables = Exact<{
  input: CreateProgramInput;
}>;


export type CreateProgramMutation = { __typename?: 'Mutation', createProgram: { __typename?: 'ProgramEntity', id: string, title: string, slug: string, educationDocumentId?: string | null, description?: string | null, image?: string | null, category: string, baseHours?: number | null, studentCategory?: string | null, awardedQualification?: string | null, awardedRankFrom?: number | null, awardedRankTo?: number | null, views: number, createdAt: any, updatedAt: any, pricing: Array<{ __typename?: 'ProgramPricing', hours: number, price?: number | null }>, subPrograms?: Array<{ __typename?: 'ProgramSubProgramEntity', title: string, description?: string | null }> | null } };

export type UpdateProgramMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateProgramInput;
}>;


export type UpdateProgramMutation = { __typename?: 'Mutation', updateProgram: { __typename?: 'ProgramEntity', id: string, title: string, slug: string, educationDocumentId?: string | null, description?: string | null, image?: string | null, category: string, baseHours?: number | null, studentCategory?: string | null, awardedQualification?: string | null, awardedRankFrom?: number | null, awardedRankTo?: number | null, views: number, createdAt: any, updatedAt: any, pricing: Array<{ __typename?: 'ProgramPricing', hours: number, price?: number | null }>, subPrograms?: Array<{ __typename?: 'ProgramSubProgramEntity', title: string, description?: string | null }> | null } };

export type DeleteProgramMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteProgramMutation = { __typename?: 'Mutation', deleteProgram: { __typename?: 'ProgramEntity', id: string } };

export type AdminUserProfileFieldsMutationsFragment = { __typename?: 'UserProfileEntity', lastName?: string | null, firstName?: string | null, middleName?: string | null, dateOfBirth?: any | null, citizenship?: string | null, phone?: string | null, passportRegistrationAddress?: string | null, residentialAddress?: string | null, snils?: string | null, avatar?: string | null, passport?: { __typename?: 'PassportInfoEntity', series?: string | null, number?: string | null, issuedBy?: string | null, issuedAt?: any | null, departmentCode?: string | null } | null, education?: { __typename?: 'EducationInfoEntity', qualification?: string | null, documentIssuedAt?: any | null } | null, workPlaces?: Array<{ __typename?: 'UserWorkPlaceEntity', position?: string | null, isPrimary: boolean, organization: { __typename?: 'OrganizationEntity', id: string, type: OrganizationType, displayName: string, inn: string, kpp?: string | null, ogrn: string, legalAddress?: string | null } }> | null } & { ' $fragmentName'?: 'AdminUserProfileFieldsMutationsFragment' };

export type AdminUserFieldsMutationsFragment = { __typename?: 'UserEntity', id: string, email: string, role: UserRole, isBlocked: boolean, isEmailVerified: boolean, firstName?: string | null, lastName?: string | null, phone?: string | null, createdAt: any, updatedAt: any, profile?: (
    { __typename?: 'UserProfileEntity' }
    & { ' $fragmentRefs'?: { 'AdminUserProfileFieldsMutationsFragment': AdminUserProfileFieldsMutationsFragment } }
  ) | null } & { ' $fragmentName'?: 'AdminUserFieldsMutationsFragment' };

export type AdminCreateUserMutationVariables = Exact<{
  input: AdminCreateUserInput;
}>;


export type AdminCreateUserMutation = { __typename?: 'Mutation', adminCreateUser: (
    { __typename?: 'UserEntity' }
    & { ' $fragmentRefs'?: { 'AdminUserFieldsMutationsFragment': AdminUserFieldsMutationsFragment } }
  ) };

export type AdminUpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: AdminUpdateUserInput;
}>;


export type AdminUpdateUserMutation = { __typename?: 'Mutation', adminUpdateUser: (
    { __typename?: 'UserEntity' }
    & { ' $fragmentRefs'?: { 'AdminUserFieldsMutationsFragment': AdminUserFieldsMutationsFragment } }
  ) };

export type AdminDeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AdminDeleteUserMutation = { __typename?: 'Mutation', adminDeleteUser: boolean };

export type AdminSetUserBlockedMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  blocked: Scalars['Boolean']['input'];
}>;


export type AdminSetUserBlockedMutation = { __typename?: 'Mutation', adminSetUserBlocked: (
    { __typename?: 'UserEntity' }
    & { ' $fragmentRefs'?: { 'AdminUserFieldsMutationsFragment': AdminUserFieldsMutationsFragment } }
  ) };

export type WorkPlacesFieldsFragment = { __typename?: 'UserProfileEntity', workPlaces?: Array<{ __typename?: 'UserWorkPlaceEntity', position?: string | null, isPrimary: boolean, organization: { __typename?: 'OrganizationEntity', id: string, type: OrganizationType, displayName: string, inn: string, kpp?: string | null, ogrn: string, legalAddress?: string | null, bankAccount?: string | null, bankName?: string | null, bik?: string | null, correspondentAccount?: string | null } }> | null } & { ' $fragmentName'?: 'WorkPlacesFieldsFragment' };

export type SetMyWorkPlaceByInnMutationVariables = Exact<{
  input: SetMyWorkPlaceByInnInput;
}>;


export type SetMyWorkPlaceByInnMutation = { __typename?: 'Mutation', setMyWorkPlaceByInn: (
    { __typename?: 'UserProfileEntity' }
    & { ' $fragmentRefs'?: { 'WorkPlacesFieldsFragment': WorkPlacesFieldsFragment } }
  ) };

export type SetMyWorkPlaceManualMutationVariables = Exact<{
  input: SetMyWorkPlaceManualInput;
}>;


export type SetMyWorkPlaceManualMutation = { __typename?: 'Mutation', setMyWorkPlaceManual: (
    { __typename?: 'UserProfileEntity' }
    & { ' $fragmentRefs'?: { 'WorkPlacesFieldsFragment': WorkPlacesFieldsFragment } }
  ) };

export type AddressSuggestionsQueryVariables = Exact<{
  query: Scalars['String']['input'];
  count?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AddressSuggestionsQuery = { __typename?: 'Query', addressSuggestions: Array<{ __typename?: 'AddressSuggestionEntity', value: string, unrestrictedValue?: string | null, region?: string | null, city?: string | null, street?: string | null, house?: string | null, flat?: string | null, postalCode?: string | null, fiasId?: string | null, kladrId?: string | null, geoLat?: string | null, geoLon?: string | null }> };

export type MeUserProfileFieldsFragment = { __typename?: 'UserProfileEntity', lastName?: string | null, firstName?: string | null, middleName?: string | null, dateOfBirth?: any | null, citizenship?: string | null, phone?: string | null, passportRegistrationAddress?: string | null, residentialAddress?: string | null, snils?: string | null, avatar?: string | null, passport?: { __typename?: 'PassportInfoEntity', series?: string | null, number?: string | null, issuedBy?: string | null, issuedAt?: any | null, departmentCode?: string | null } | null, education?: { __typename?: 'EducationInfoEntity', qualification?: string | null, documentIssuedAt?: any | null } | null, workPlaces?: Array<{ __typename?: 'UserWorkPlaceEntity', position?: string | null, isPrimary: boolean, organization: { __typename?: 'OrganizationEntity', id: string, type: OrganizationType, displayName: string, inn: string, kpp?: string | null, ogrn: string, legalAddress?: string | null, bankAccount?: string | null, bankName?: string | null, bik?: string | null, correspondentAccount?: string | null } }> | null } & { ' $fragmentName'?: 'MeUserProfileFieldsFragment' };

export type MeUserFieldsFragment = { __typename?: 'UserEntity', id: string, email: string, role: UserRole, isBlocked: boolean, isEmailVerified: boolean, firstName?: string | null, lastName?: string | null, phone?: string | null, createdAt: any, updatedAt: any, profile?: (
    { __typename?: 'UserProfileEntity' }
    & { ' $fragmentRefs'?: { 'MeUserProfileFieldsFragment': MeUserProfileFieldsFragment } }
  ) | null } & { ' $fragmentName'?: 'MeUserFieldsFragment' };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: (
    { __typename?: 'UserEntity' }
    & { ' $fragmentRefs'?: { 'MeUserFieldsFragment': MeUserFieldsFragment } }
  ) };

export type MyCartQueryVariables = Exact<{ [key: string]: never; }>;


export type MyCartQuery = { __typename?: 'Query', myCart: { __typename?: 'CartEntity', totalAmount: number, items: Array<{ __typename?: 'CartItemEntity', programId: string, pricingIndex: number, quantity: number, lineAmount: number, subProgramIndex?: number | null, subProgramTitle?: string | null, displayTitle: string, program: { __typename?: 'ProgramEntity', id: string, title: string, shortTitle?: string | null, slug: string, image?: string | null, pricing: Array<{ __typename?: 'ProgramPricing', hours: number, price?: number | null }> } }> } };

export type GetCategoriesQueryVariables = Exact<{
  filter?: InputMaybe<CategoryFilterInput>;
}>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'CategoryEntity', id: string, name: string, slug: string, description?: string | null, image?: string | null, type?: CategoryType | null, parent?: string | null, createdAt: any, updatedAt: any, programsCount?: number | null }> };

export type GetCategoryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCategoryQuery = { __typename?: 'Query', category?: { __typename?: 'CategoryEntity', id: string, name: string, slug: string, description?: string | null, image?: string | null, type?: CategoryType | null, parent?: string | null, createdAt: any, updatedAt: any, programsCount?: number | null } | null };

export type ChatFieldsFragment = { __typename?: 'Chat', id: string, userId: string, status: ChatStatus, assignedToId?: string | null, createdAt: any, updatedAt: any, unreadCount?: number | null } & { ' $fragmentName'?: 'ChatFieldsFragment' };

export type ChatMessageFieldsFragment = { __typename?: 'ChatMessage', id: string, chatId: string, senderId: string, isFromAdmin: boolean, body: string, createdAt: any, readAt?: any | null } & { ' $fragmentName'?: 'ChatMessageFieldsFragment' };

export type MyChatQueryVariables = Exact<{ [key: string]: never; }>;


export type MyChatQuery = { __typename?: 'Query', myChat?: (
    { __typename?: 'Chat' }
    & { ' $fragmentRefs'?: { 'ChatFieldsFragment': ChatFieldsFragment } }
  ) | null };

export type ChatMessagesQueryVariables = Exact<{
  chatId: Scalars['ID']['input'];
  filter?: InputMaybe<ChatMessagesFilterInput>;
}>;


export type ChatMessagesQuery = { __typename?: 'Query', chatMessages: Array<(
    { __typename?: 'ChatMessage' }
    & { ' $fragmentRefs'?: { 'ChatMessageFieldsFragment': ChatMessageFieldsFragment } }
  )> };

export type AdminChatFieldsFragment = { __typename?: 'Chat', id: string, userId: string, status: ChatStatus, assignedToId?: string | null, createdAt: any, updatedAt: any, lastMessagePreview?: string | null, unreadCount?: number | null } & { ' $fragmentName'?: 'AdminChatFieldsFragment' };

export type AdminChatsQueryVariables = Exact<{
  filter?: InputMaybe<AdminChatsFilterInput>;
}>;


export type AdminChatsQuery = { __typename?: 'Query', adminChats: Array<(
    { __typename?: 'Chat' }
    & { ' $fragmentRefs'?: { 'AdminChatFieldsFragment': AdminChatFieldsFragment } }
  )> };

export type AdminChatMessagesQueryVariables = Exact<{
  chatId: Scalars['ID']['input'];
  filter?: InputMaybe<ChatMessagesFilterInput>;
}>;


export type AdminChatMessagesQuery = { __typename?: 'Query', adminChatMessages: Array<(
    { __typename?: 'ChatMessage' }
    & { ' $fragmentRefs'?: { 'ChatMessageFieldsFragment': ChatMessageFieldsFragment } }
  )> };

export type EducationDocumentsQueryVariables = Exact<{ [key: string]: never; }>;


export type EducationDocumentsQuery = { __typename?: 'Query', educationDocuments: Array<{ __typename?: 'EducationDocumentEntity', id: string, name: string, image?: string | null, createdAt: any, updatedAt: any }> };

export type EducationDocumentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EducationDocumentQuery = { __typename?: 'Query', educationDocument?: { __typename?: 'EducationDocumentEntity', id: string, name: string, image?: string | null, createdAt: any, updatedAt: any } | null };

export type OrderFieldsFragment = { __typename?: 'Order', id: string, number?: string | null, userId: string, customerType: OrderCustomerType, customerDisplayName?: string | null, organizationId?: string | null, contactEmail?: string | null, contactPhone?: string | null, status: OrderStatus, totalAmount: number, createdAt: any, updatedAt: any, statusChangedAt?: any | null, trainingStartDate?: any | null, trainingEndDate?: any | null, trainingForm?: string | null, trainingLanguage?: string | null, headPosition?: string | null, headFullName?: string | null, contactPersonName?: string | null, contactPersonPosition?: string | null, lines: Array<{ __typename?: 'OrderLine', programId: string, programTitle: string, subProgramIndex?: number | null, subProgramTitle?: string | null, hours: number, price: number, quantity: number, lineAmount: number, learners: Array<{ __typename?: 'OrderLineLearner', lastName: string, firstName: string, middleName?: string | null, email?: string | null, phone?: string | null, dateOfBirth?: any | null, citizenship?: string | null, passportSeries?: string | null, passportNumber?: string | null, passportIssuedBy?: string | null, passportIssuedAt?: any | null, passportDepartmentCode?: string | null, snils?: string | null, educationQualification?: string | null, educationDocumentIssuedAt?: any | null, passportRegistrationAddress?: string | null, residentialAddress?: string | null, workPlaceName?: string | null, position?: string | null }> }> } & { ' $fragmentName'?: 'OrderFieldsFragment' };

export type MyOrdersQueryVariables = Exact<{
  filter?: InputMaybe<MyOrdersFilterInput>;
}>;


export type MyOrdersQuery = { __typename?: 'Query', myOrders: Array<(
    { __typename?: 'Order' }
    & { ' $fragmentRefs'?: { 'OrderFieldsFragment': OrderFieldsFragment } }
  )> };

export type OrderQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type OrderQuery = { __typename?: 'Query', order: (
    { __typename?: 'Order' }
    & { ' $fragmentRefs'?: { 'OrderFieldsFragment': OrderFieldsFragment } }
  ) };

export type OrderInvoiceStatusQueryVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type OrderInvoiceStatusQuery = { __typename?: 'Query', orderInvoiceStatus: { __typename?: 'OrderInvoiceInfoResult', status: string } };

export type OrderPaymentSyncQueryVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type OrderPaymentSyncQuery = { __typename?: 'Query', orderPaymentSync: { __typename?: 'OrderPaymentSyncResult', status: OrderStatus, updated: boolean, payments?: Array<{ __typename?: 'OrderPaymentStatusItem', paymentId?: string | null, status?: string | null }> | null } };

export type OrderDocumentsQueryVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type OrderDocumentsQuery = { __typename?: 'Query', orderDocuments: Array<{ __typename?: 'OrderDocument', id: string, orderId: string, kind: OrderDocumentKind, fileUrl: string, documentDate: any, createdAt: any, updatedAt: any }> };

export type AdminOrdersQueryVariables = Exact<{
  filter?: InputMaybe<AdminOrdersFilterInput>;
}>;


export type AdminOrdersQuery = { __typename?: 'Query', adminOrders: Array<(
    { __typename?: 'Order' }
    & { ' $fragmentRefs'?: { 'OrderFieldsFragment': OrderFieldsFragment } }
  )> };

export type AdminOrderQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AdminOrderQuery = { __typename?: 'Query', adminOrder: (
    { __typename?: 'Order' }
    & { ' $fragmentRefs'?: { 'OrderFieldsFragment': OrderFieldsFragment } }
  ) };

export type AdminOrderDocumentsQueryVariables = Exact<{
  orderId: Scalars['ID']['input'];
}>;


export type AdminOrderDocumentsQuery = { __typename?: 'Query', adminOrderDocuments: Array<{ __typename?: 'OrderDocument', id: string, orderId: string, kind: OrderDocumentKind, fileUrl: string, documentDate: any, createdAt: any, updatedAt: any }> };

export type OrganizationSuggestionsQueryVariables = Exact<{
  query: Scalars['String']['input'];
  count?: InputMaybe<Scalars['Int']['input']>;
}>;


export type OrganizationSuggestionsQuery = { __typename?: 'Query', organizationSuggestions: Array<{ __typename?: 'OrganizationSuggestionEntity', type: OrganizationType, inn: string, kpp?: string | null, ogrn: string, displayName: string, legalAddress?: string | null }> };

export type GetProgramsQueryVariables = Exact<{
  filter?: InputMaybe<ProgramFilterInput>;
}>;


export type GetProgramsQuery = { __typename?: 'Query', programs: Array<{ __typename?: 'ProgramEntity', id: string, title: string, shortTitle?: string | null, slug: string, description?: string | null, image?: string | null, category: string, baseHours?: number | null, studentCategory?: string | null, awardedQualification?: string | null, awardedRankFrom?: number | null, awardedRankTo?: number | null, educationDocumentId?: string | null, views: number, viewsRating: number, createdAt: any, updatedAt: any, educationDocument?: { __typename?: 'EducationDocumentEntity', id: string, name: string, image?: string | null } | null, pricing: Array<{ __typename?: 'ProgramPricing', hours: number, price?: number | null }>, subPrograms?: Array<{ __typename?: 'ProgramSubProgramEntity', title: string, description?: string | null }> | null }> };

export type ProgramsPageQueryVariables = Exact<{
  filter?: InputMaybe<ProgramFilterInput>;
}>;


export type ProgramsPageQuery = { __typename?: 'Query', programsPage: { __typename?: 'ProgramsPageEntity', total: number, items: Array<{ __typename?: 'ProgramEntity', id: string, title: string, shortTitle?: string | null, slug: string, description?: string | null, image?: string | null, category: string, baseHours?: number | null, studentCategory?: string | null, awardedQualification?: string | null, awardedRankFrom?: number | null, awardedRankTo?: number | null, educationDocumentId?: string | null, views: number, viewsRating: number, createdAt: any, updatedAt: any, educationDocument?: { __typename?: 'EducationDocumentEntity', id: string, name: string, image?: string | null } | null, pricing: Array<{ __typename?: 'ProgramPricing', hours: number, price?: number | null }>, subPrograms?: Array<{ __typename?: 'ProgramSubProgramEntity', title: string, description?: string | null }> | null }> } };

export type GetTopProgramsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type GetTopProgramsQuery = { __typename?: 'Query', topPrograms: Array<{ __typename?: 'ProgramEntity', id: string, title: string, shortTitle?: string | null, slug: string, description?: string | null, image?: string | null, category: string, baseHours?: number | null, studentCategory?: string | null, awardedQualification?: string | null, awardedRankFrom?: number | null, awardedRankTo?: number | null, educationDocumentId?: string | null, views: number, viewsRating: number, createdAt: any, updatedAt: any, educationDocument?: { __typename?: 'EducationDocumentEntity', id: string, name: string, image?: string | null } | null, pricing: Array<{ __typename?: 'ProgramPricing', hours: number, price?: number | null }>, subPrograms?: Array<{ __typename?: 'ProgramSubProgramEntity', title: string, description?: string | null }> | null }> };

export type GetProgramQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProgramQuery = { __typename?: 'Query', program: { __typename?: 'ProgramEntity', id: string, title: string, shortTitle?: string | null, slug: string, description?: string | null, image?: string | null, category: string, baseHours?: number | null, studentCategory?: string | null, awardedQualification?: string | null, awardedRankFrom?: number | null, awardedRankTo?: number | null, educationDocumentId?: string | null, views: number, viewsRating: number, createdAt: any, updatedAt: any, educationDocument?: { __typename?: 'EducationDocumentEntity', id: string, name: string, image?: string | null } | null, pricing: Array<{ __typename?: 'ProgramPricing', hours: number, price?: number | null }>, subPrograms?: Array<{ __typename?: 'ProgramSubProgramEntity', title: string, description?: string | null }> | null } };

export type AdminUserProfileFieldsQueriesFragment = { __typename?: 'UserProfileEntity', lastName?: string | null, firstName?: string | null, middleName?: string | null, dateOfBirth?: any | null, citizenship?: string | null, phone?: string | null, passportRegistrationAddress?: string | null, residentialAddress?: string | null, snils?: string | null, avatar?: string | null, passport?: { __typename?: 'PassportInfoEntity', series?: string | null, number?: string | null, issuedBy?: string | null, issuedAt?: any | null, departmentCode?: string | null } | null, education?: { __typename?: 'EducationInfoEntity', qualification?: string | null, documentIssuedAt?: any | null } | null, workPlaces?: Array<{ __typename?: 'UserWorkPlaceEntity', position?: string | null, isPrimary: boolean, organization: { __typename?: 'OrganizationEntity', id: string, type: OrganizationType, displayName: string, inn: string, kpp?: string | null, ogrn: string, legalAddress?: string | null } }> | null } & { ' $fragmentName'?: 'AdminUserProfileFieldsQueriesFragment' };

export type AdminUserFieldsQueriesFragment = { __typename?: 'UserEntity', id: string, email: string, role: UserRole, isBlocked: boolean, isEmailVerified: boolean, firstName?: string | null, lastName?: string | null, phone?: string | null, createdAt: any, updatedAt: any, profile?: (
    { __typename?: 'UserProfileEntity' }
    & { ' $fragmentRefs'?: { 'AdminUserProfileFieldsQueriesFragment': AdminUserProfileFieldsQueriesFragment } }
  ) | null } & { ' $fragmentName'?: 'AdminUserFieldsQueriesFragment' };

export type AdminUsersQueryVariables = Exact<{
  filter?: InputMaybe<AdminUserFilterInput>;
}>;


export type AdminUsersQuery = { __typename?: 'Query', adminUsers: Array<(
    { __typename?: 'UserEntity' }
    & { ' $fragmentRefs'?: { 'AdminUserFieldsQueriesFragment': AdminUserFieldsQueriesFragment } }
  )> };

export type AdminUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AdminUserQuery = { __typename?: 'Query', adminUser?: (
    { __typename?: 'UserEntity' }
    & { ' $fragmentRefs'?: { 'AdminUserFieldsQueriesFragment': AdminUserFieldsQueriesFragment } }
  ) | null };

export const MyUserProfileFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyUserProfileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"passport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"issuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualification"}},{"kind":"Field","name":{"kind":"Name","value":"documentIssuedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]} as unknown as DocumentNode<MyUserProfileFieldsFragment, unknown>;
export const AdminUserProfileFieldsMutationsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserProfileFieldsMutations"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"passport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"issuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualification"}},{"kind":"Field","name":{"kind":"Name","value":"documentIssuedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]} as unknown as DocumentNode<AdminUserProfileFieldsMutationsFragment, unknown>;
export const AdminUserFieldsMutationsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserFieldsMutations"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isBlocked"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserProfileFieldsMutations"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserProfileFieldsMutations"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"passport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"issuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualification"}},{"kind":"Field","name":{"kind":"Name","value":"documentIssuedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]} as unknown as DocumentNode<AdminUserFieldsMutationsFragment, unknown>;
export const WorkPlacesFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkPlacesFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}},{"kind":"Field","name":{"kind":"Name","value":"bankAccount"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"bik"}},{"kind":"Field","name":{"kind":"Name","value":"correspondentAccount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}}]}}]} as unknown as DocumentNode<WorkPlacesFieldsFragment, unknown>;
export const MeUserProfileFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeUserProfileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"passport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"issuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualification"}},{"kind":"Field","name":{"kind":"Name","value":"documentIssuedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}},{"kind":"Field","name":{"kind":"Name","value":"bankAccount"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"bik"}},{"kind":"Field","name":{"kind":"Name","value":"correspondentAccount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]} as unknown as DocumentNode<MeUserProfileFieldsFragment, unknown>;
export const MeUserFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeUserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isBlocked"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeUserProfileFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeUserProfileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"passport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"issuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualification"}},{"kind":"Field","name":{"kind":"Name","value":"documentIssuedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}},{"kind":"Field","name":{"kind":"Name","value":"bankAccount"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"bik"}},{"kind":"Field","name":{"kind":"Name","value":"correspondentAccount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]} as unknown as DocumentNode<MeUserFieldsFragment, unknown>;
export const ChatFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"unreadCount"}}]}}]} as unknown as DocumentNode<ChatFieldsFragment, unknown>;
export const ChatMessageFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatMessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"isFromAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}}]}}]} as unknown as DocumentNode<ChatMessageFieldsFragment, unknown>;
export const AdminChatFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessagePreview"}},{"kind":"Field","name":{"kind":"Name","value":"unreadCount"}}]}}]} as unknown as DocumentNode<AdminChatFieldsFragment, unknown>;
export const OrderFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"customerType"}},{"kind":"Field","name":{"kind":"Name","value":"customerDisplayName"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"contactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"statusChangedAt"}},{"kind":"Field","name":{"kind":"Name","value":"trainingStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingEndDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingForm"}},{"kind":"Field","name":{"kind":"Name","value":"trainingLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"headPosition"}},{"kind":"Field","name":{"kind":"Name","value":"headFullName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonPosition"}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"programTitle"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramIndex"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramTitle"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"lineAmount"}},{"kind":"Field","name":{"kind":"Name","value":"learners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"passportSeries"}},{"kind":"Field","name":{"kind":"Name","value":"passportNumber"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportDepartmentCode"}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"educationQualification"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocumentIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"workPlaceName"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<OrderFieldsFragment, unknown>;
export const AdminUserProfileFieldsQueriesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserProfileFieldsQueries"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"passport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"issuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualification"}},{"kind":"Field","name":{"kind":"Name","value":"documentIssuedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]} as unknown as DocumentNode<AdminUserProfileFieldsQueriesFragment, unknown>;
export const AdminUserFieldsQueriesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserFieldsQueries"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isBlocked"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserProfileFieldsQueries"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserProfileFieldsQueries"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"passport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"issuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualification"}},{"kind":"Field","name":{"kind":"Name","value":"documentIssuedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]} as unknown as DocumentNode<AdminUserFieldsQueriesFragment, unknown>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isBlocked"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"isBlocked"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RegisterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Register"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RegisterInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RegisterMutation, RegisterMutationVariables>;
export const VerifyEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyEmailInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const RequestEmailVerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestEmailVerification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestEmailVerificationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestEmailVerification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RequestEmailVerificationMutation, RequestEmailVerificationMutationVariables>;
export const RequestPasswordResetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestPasswordReset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RequestPasswordResetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestPasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UpdateMyProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMyProfile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMyProfileInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMyProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyUserProfileFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyUserProfileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"passport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"issuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualification"}},{"kind":"Field","name":{"kind":"Name","value":"documentIssuedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]} as unknown as DocumentNode<UpdateMyProfileMutation, UpdateMyProfileMutationVariables>;
export const AddToCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddToCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddToCartInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addToCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"pricingIndex"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"lineAmount"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramIndex"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramTitle"}},{"kind":"Field","name":{"kind":"Name","value":"displayTitle"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"shortTitle"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}}]}}]}}]} as unknown as DocumentNode<AddToCartMutation, AddToCartMutationVariables>;
export const UpdateCartItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCartItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCartItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCartItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"pricingIndex"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"lineAmount"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramIndex"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramTitle"}},{"kind":"Field","name":{"kind":"Name","value":"displayTitle"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"shortTitle"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}}]}}]}}]} as unknown as DocumentNode<UpdateCartItemMutation, UpdateCartItemMutationVariables>;
export const RemoveFromCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveFromCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RemoveFromCartInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeFromCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"pricingIndex"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"lineAmount"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramIndex"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramTitle"}},{"kind":"Field","name":{"kind":"Name","value":"displayTitle"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"shortTitle"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}}]}}]}}]} as unknown as DocumentNode<RemoveFromCartMutation, RemoveFromCartMutationVariables>;
export const CreateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"parent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"programsCount"}}]}}]}}]} as unknown as DocumentNode<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCategoryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"parent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"programsCount"}}]}}]}}]} as unknown as DocumentNode<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const SendMessageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMessage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SendMessageInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMessage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatMessageFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatMessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"isFromAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}}]}}]} as unknown as DocumentNode<SendMessageMutation, SendMessageMutationVariables>;
export const AdminAssignChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminAssignChat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminAssignChatInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminAssignChat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminChatFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessagePreview"}},{"kind":"Field","name":{"kind":"Name","value":"unreadCount"}}]}}]} as unknown as DocumentNode<AdminAssignChatMutation, AdminAssignChatMutationVariables>;
export const AdminSetChatStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminSetChatStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminSetChatStatusInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminSetChatStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminChatFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessagePreview"}},{"kind":"Field","name":{"kind":"Name","value":"unreadCount"}}]}}]} as unknown as DocumentNode<AdminSetChatStatusMutation, AdminSetChatStatusMutationVariables>;
export const CreateEducationDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateEducationDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateEducationDocumentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createEducationDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateEducationDocumentMutation, CreateEducationDocumentMutationVariables>;
export const UpdateEducationDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEducationDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateEducationDocumentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEducationDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateEducationDocumentMutation, UpdateEducationDocumentMutationVariables>;
export const DeleteEducationDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEducationDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEducationDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<DeleteEducationDocumentMutation, DeleteEducationDocumentMutationVariables>;
export const CreateOrderFromCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrderFromCart"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOrderFromCartInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrderFromCart"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"customerType"}},{"kind":"Field","name":{"kind":"Name","value":"customerDisplayName"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"contactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"statusChangedAt"}},{"kind":"Field","name":{"kind":"Name","value":"trainingStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingEndDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingForm"}},{"kind":"Field","name":{"kind":"Name","value":"trainingLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"headPosition"}},{"kind":"Field","name":{"kind":"Name","value":"headFullName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonPosition"}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"programTitle"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramIndex"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramTitle"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"lineAmount"}},{"kind":"Field","name":{"kind":"Name","value":"learners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"passportSeries"}},{"kind":"Field","name":{"kind":"Name","value":"passportNumber"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportDepartmentCode"}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"educationQualification"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocumentIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"workPlaceName"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrderFromCartMutation, CreateOrderFromCartMutationVariables>;
export const CreateOrderCardPaymentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrderCardPayment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrderCardPayment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentUrl"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateOrderCardPaymentMutation, CreateOrderCardPaymentMutationVariables>;
export const UpdateOrderStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrderStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderStatus"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrderStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateOrderStatusMutation, UpdateOrderStatusMutationVariables>;
export const DeleteOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}]}]}}]} as unknown as DocumentNode<DeleteOrderMutation, DeleteOrderMutationVariables>;
export const UpdateOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"customerType"}},{"kind":"Field","name":{"kind":"Name","value":"customerDisplayName"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"contactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"statusChangedAt"}},{"kind":"Field","name":{"kind":"Name","value":"trainingStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingEndDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingForm"}},{"kind":"Field","name":{"kind":"Name","value":"trainingLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"headPosition"}},{"kind":"Field","name":{"kind":"Name","value":"headFullName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonPosition"}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"programTitle"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramIndex"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramTitle"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"lineAmount"}},{"kind":"Field","name":{"kind":"Name","value":"learners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"passportSeries"}},{"kind":"Field","name":{"kind":"Name","value":"passportNumber"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportDepartmentCode"}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"educationQualification"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocumentIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"workPlaceName"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateOrderMutation, UpdateOrderMutationVariables>;
export const CreateOrderInvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrderInvoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payerInn"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payerKpp"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payerName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrderInvoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payerInn"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payerInn"}}},{"kind":"Argument","name":{"kind":"Name","value":"payerKpp"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payerKpp"}}},{"kind":"Argument","name":{"kind":"Name","value":"payerName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payerName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pdfUrl"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceId"}},{"kind":"Field","name":{"kind":"Name","value":"incomingInvoiceUrl"}}]}}]}}]} as unknown as DocumentNode<CreateOrderInvoiceMutation, CreateOrderInvoiceMutationVariables>;
export const AdminUpdateOrderStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateOrderStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderStatus"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUpdateOrderStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"customerType"}},{"kind":"Field","name":{"kind":"Name","value":"customerDisplayName"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"contactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"statusChangedAt"}},{"kind":"Field","name":{"kind":"Name","value":"trainingStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingEndDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingForm"}},{"kind":"Field","name":{"kind":"Name","value":"trainingLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"headPosition"}},{"kind":"Field","name":{"kind":"Name","value":"headFullName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonPosition"}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"programTitle"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramIndex"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramTitle"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"lineAmount"}},{"kind":"Field","name":{"kind":"Name","value":"learners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"passportSeries"}},{"kind":"Field","name":{"kind":"Name","value":"passportNumber"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportDepartmentCode"}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"educationQualification"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocumentIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"workPlaceName"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<AdminUpdateOrderStatusMutation, AdminUpdateOrderStatusMutationVariables>;
export const AdminDeleteOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminDeleteOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminDeleteOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}]}]}}]} as unknown as DocumentNode<AdminDeleteOrderMutation, AdminDeleteOrderMutationVariables>;
export const AdminUpdateOrderDocumentDateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateOrderDocumentDate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminUpdateOrderDocumentDateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUpdateOrderDocumentDate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"documentDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminUpdateOrderDocumentDateMutation, AdminUpdateOrderDocumentDateMutationVariables>;
export const AdminGenerateOrderContractDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminGenerateOrderContract"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminGenerateOrderDocumentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminGenerateOrderContract"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"documentDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminGenerateOrderContractMutation, AdminGenerateOrderContractMutationVariables>;
export const AdminGenerateOrderActDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminGenerateOrderAct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminGenerateOrderDocumentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminGenerateOrderAct"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"documentDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminGenerateOrderActMutation, AdminGenerateOrderActMutationVariables>;
export const AdminGenerateOrderTrainingApplicationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminGenerateOrderTrainingApplication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminGenerateOrderTrainingApplication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"documentDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminGenerateOrderTrainingApplicationMutation, AdminGenerateOrderTrainingApplicationMutationVariables>;
export const AdminSetOrderTrainingDatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminSetOrderTrainingDates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminSetOrderTrainingDatesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminSetOrderTrainingDates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"customerType"}},{"kind":"Field","name":{"kind":"Name","value":"customerDisplayName"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"contactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"statusChangedAt"}},{"kind":"Field","name":{"kind":"Name","value":"trainingStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingEndDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingForm"}},{"kind":"Field","name":{"kind":"Name","value":"trainingLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"headPosition"}},{"kind":"Field","name":{"kind":"Name","value":"headFullName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonPosition"}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"programTitle"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramIndex"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramTitle"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"lineAmount"}},{"kind":"Field","name":{"kind":"Name","value":"learners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"passportSeries"}},{"kind":"Field","name":{"kind":"Name","value":"passportNumber"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportDepartmentCode"}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"educationQualification"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocumentIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"workPlaceName"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<AdminSetOrderTrainingDatesMutation, AdminSetOrderTrainingDatesMutationVariables>;
export const CreateProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProgram"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProgramInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocumentId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"baseHours"}},{"kind":"Field","name":{"kind":"Name","value":"studentCategory"}},{"kind":"Field","name":{"kind":"Name","value":"awardedQualification"}},{"kind":"Field","name":{"kind":"Name","value":"awardedRankFrom"}},{"kind":"Field","name":{"kind":"Name","value":"awardedRankTo"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subPrograms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<CreateProgramMutation, CreateProgramMutationVariables>;
export const UpdateProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProgram"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProgramInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocumentId"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"baseHours"}},{"kind":"Field","name":{"kind":"Name","value":"studentCategory"}},{"kind":"Field","name":{"kind":"Name","value":"awardedQualification"}},{"kind":"Field","name":{"kind":"Name","value":"awardedRankFrom"}},{"kind":"Field","name":{"kind":"Name","value":"awardedRankTo"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subPrograms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpdateProgramMutation, UpdateProgramMutationVariables>;
export const DeleteProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProgram"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProgram"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteProgramMutation, DeleteProgramMutationVariables>;
export const AdminCreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminCreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminCreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminCreateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserFieldsMutations"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserProfileFieldsMutations"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"passport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"issuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualification"}},{"kind":"Field","name":{"kind":"Name","value":"documentIssuedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserFieldsMutations"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isBlocked"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserProfileFieldsMutations"}}]}}]}}]} as unknown as DocumentNode<AdminCreateUserMutation, AdminCreateUserMutationVariables>;
export const AdminUpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminUpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUpdateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserFieldsMutations"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserProfileFieldsMutations"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"passport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"issuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualification"}},{"kind":"Field","name":{"kind":"Name","value":"documentIssuedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserFieldsMutations"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isBlocked"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserProfileFieldsMutations"}}]}}]}}]} as unknown as DocumentNode<AdminUpdateUserMutation, AdminUpdateUserMutationVariables>;
export const AdminDeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminDeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminDeleteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<AdminDeleteUserMutation, AdminDeleteUserMutationVariables>;
export const AdminSetUserBlockedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminSetUserBlocked"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"blocked"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminSetUserBlocked"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"blocked"},"value":{"kind":"Variable","name":{"kind":"Name","value":"blocked"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserFieldsMutations"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserProfileFieldsMutations"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"passport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"issuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualification"}},{"kind":"Field","name":{"kind":"Name","value":"documentIssuedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserFieldsMutations"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isBlocked"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserProfileFieldsMutations"}}]}}]}}]} as unknown as DocumentNode<AdminSetUserBlockedMutation, AdminSetUserBlockedMutationVariables>;
export const SetMyWorkPlaceByInnDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetMyWorkPlaceByInn"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetMyWorkPlaceByInnInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setMyWorkPlaceByInn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkPlacesFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkPlacesFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}},{"kind":"Field","name":{"kind":"Name","value":"bankAccount"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"bik"}},{"kind":"Field","name":{"kind":"Name","value":"correspondentAccount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}}]}}]} as unknown as DocumentNode<SetMyWorkPlaceByInnMutation, SetMyWorkPlaceByInnMutationVariables>;
export const SetMyWorkPlaceManualDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetMyWorkPlaceManual"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SetMyWorkPlaceManualInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setMyWorkPlaceManual"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WorkPlacesFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WorkPlacesFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}},{"kind":"Field","name":{"kind":"Name","value":"bankAccount"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"bik"}},{"kind":"Field","name":{"kind":"Name","value":"correspondentAccount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}}]}}]} as unknown as DocumentNode<SetMyWorkPlaceManualMutation, SetMyWorkPlaceManualMutationVariables>;
export const AddressSuggestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AddressSuggestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"count"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressSuggestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"count"},"value":{"kind":"Variable","name":{"kind":"Name","value":"count"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"unrestrictedValue"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"house"}},{"kind":"Field","name":{"kind":"Name","value":"flat"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"fiasId"}},{"kind":"Field","name":{"kind":"Name","value":"kladrId"}},{"kind":"Field","name":{"kind":"Name","value":"geoLat"}},{"kind":"Field","name":{"kind":"Name","value":"geoLon"}}]}}]}}]} as unknown as DocumentNode<AddressSuggestionsQuery, AddressSuggestionsQueryVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeUserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeUserProfileFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"passport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"issuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualification"}},{"kind":"Field","name":{"kind":"Name","value":"documentIssuedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}},{"kind":"Field","name":{"kind":"Name","value":"bankAccount"}},{"kind":"Field","name":{"kind":"Name","value":"bankName"}},{"kind":"Field","name":{"kind":"Name","value":"bik"}},{"kind":"Field","name":{"kind":"Name","value":"correspondentAccount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MeUserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isBlocked"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MeUserProfileFields"}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const MyCartDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyCart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myCart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"pricingIndex"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"lineAmount"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramIndex"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramTitle"}},{"kind":"Field","name":{"kind":"Name","value":"displayTitle"}},{"kind":"Field","name":{"kind":"Name","value":"program"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"shortTitle"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}}]}}]}}]} as unknown as DocumentNode<MyCartQuery, MyCartQueryVariables>;
export const GetCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"categories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"parent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"programsCount"}}]}}]}}]} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"category"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"parent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"programsCount"}}]}}]}}]} as unknown as DocumentNode<GetCategoryQuery, GetCategoryQueryVariables>;
export const MyChatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyChat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myChat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"unreadCount"}}]}}]} as unknown as DocumentNode<MyChatQuery, MyChatQueryVariables>;
export const ChatMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ChatMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMessagesFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chatMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatMessageFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatMessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"isFromAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}}]}}]} as unknown as DocumentNode<ChatMessagesQuery, ChatMessagesQueryVariables>;
export const AdminChatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminChats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminChatsFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminChats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminChatFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminChatFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"lastMessagePreview"}},{"kind":"Field","name":{"kind":"Name","value":"unreadCount"}}]}}]} as unknown as DocumentNode<AdminChatsQuery, AdminChatsQueryVariables>;
export const AdminChatMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminChatMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMessagesFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminChatMessages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chatId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chatId"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChatMessageFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChatMessageFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ChatMessage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chatId"}},{"kind":"Field","name":{"kind":"Name","value":"senderId"}},{"kind":"Field","name":{"kind":"Name","value":"isFromAdmin"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"readAt"}}]}}]} as unknown as DocumentNode<AdminChatMessagesQuery, AdminChatMessagesQueryVariables>;
export const EducationDocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EducationDocuments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"educationDocuments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<EducationDocumentsQuery, EducationDocumentsQueryVariables>;
export const EducationDocumentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EducationDocument"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"educationDocument"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<EducationDocumentQuery, EducationDocumentQueryVariables>;
export const MyOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"MyOrdersFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myOrders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"customerType"}},{"kind":"Field","name":{"kind":"Name","value":"customerDisplayName"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"contactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"statusChangedAt"}},{"kind":"Field","name":{"kind":"Name","value":"trainingStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingEndDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingForm"}},{"kind":"Field","name":{"kind":"Name","value":"trainingLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"headPosition"}},{"kind":"Field","name":{"kind":"Name","value":"headFullName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonPosition"}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"programTitle"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramIndex"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramTitle"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"lineAmount"}},{"kind":"Field","name":{"kind":"Name","value":"learners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"passportSeries"}},{"kind":"Field","name":{"kind":"Name","value":"passportNumber"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportDepartmentCode"}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"educationQualification"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocumentIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"workPlaceName"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<MyOrdersQuery, MyOrdersQueryVariables>;
export const OrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Order"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"order"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"customerType"}},{"kind":"Field","name":{"kind":"Name","value":"customerDisplayName"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"contactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"statusChangedAt"}},{"kind":"Field","name":{"kind":"Name","value":"trainingStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingEndDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingForm"}},{"kind":"Field","name":{"kind":"Name","value":"trainingLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"headPosition"}},{"kind":"Field","name":{"kind":"Name","value":"headFullName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonPosition"}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"programTitle"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramIndex"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramTitle"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"lineAmount"}},{"kind":"Field","name":{"kind":"Name","value":"learners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"passportSeries"}},{"kind":"Field","name":{"kind":"Name","value":"passportNumber"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportDepartmentCode"}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"educationQualification"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocumentIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"workPlaceName"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<OrderQuery, OrderQueryVariables>;
export const OrderInvoiceStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OrderInvoiceStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderInvoiceStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<OrderInvoiceStatusQuery, OrderInvoiceStatusQueryVariables>;
export const OrderPaymentSyncDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OrderPaymentSync"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderPaymentSync"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"payments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paymentId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<OrderPaymentSyncQuery, OrderPaymentSyncQueryVariables>;
export const OrderDocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OrderDocuments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"orderDocuments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"documentDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<OrderDocumentsQuery, OrderDocumentsQueryVariables>;
export const AdminOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminOrdersFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminOrders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"customerType"}},{"kind":"Field","name":{"kind":"Name","value":"customerDisplayName"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"contactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"statusChangedAt"}},{"kind":"Field","name":{"kind":"Name","value":"trainingStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingEndDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingForm"}},{"kind":"Field","name":{"kind":"Name","value":"trainingLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"headPosition"}},{"kind":"Field","name":{"kind":"Name","value":"headFullName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonPosition"}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"programTitle"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramIndex"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramTitle"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"lineAmount"}},{"kind":"Field","name":{"kind":"Name","value":"learners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"passportSeries"}},{"kind":"Field","name":{"kind":"Name","value":"passportNumber"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportDepartmentCode"}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"educationQualification"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocumentIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"workPlaceName"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<AdminOrdersQuery, AdminOrdersQueryVariables>;
export const AdminOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"OrderFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Order"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"customerType"}},{"kind":"Field","name":{"kind":"Name","value":"customerDisplayName"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"contactEmail"}},{"kind":"Field","name":{"kind":"Name","value":"contactPhone"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"totalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"statusChangedAt"}},{"kind":"Field","name":{"kind":"Name","value":"trainingStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingEndDate"}},{"kind":"Field","name":{"kind":"Name","value":"trainingForm"}},{"kind":"Field","name":{"kind":"Name","value":"trainingLanguage"}},{"kind":"Field","name":{"kind":"Name","value":"headPosition"}},{"kind":"Field","name":{"kind":"Name","value":"headFullName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonName"}},{"kind":"Field","name":{"kind":"Name","value":"contactPersonPosition"}},{"kind":"Field","name":{"kind":"Name","value":"lines"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programId"}},{"kind":"Field","name":{"kind":"Name","value":"programTitle"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramIndex"}},{"kind":"Field","name":{"kind":"Name","value":"subProgramTitle"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"lineAmount"}},{"kind":"Field","name":{"kind":"Name","value":"learners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"passportSeries"}},{"kind":"Field","name":{"kind":"Name","value":"passportNumber"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"passportIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportDepartmentCode"}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"educationQualification"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocumentIssuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"workPlaceName"}},{"kind":"Field","name":{"kind":"Name","value":"position"}}]}}]}}]}}]} as unknown as DocumentNode<AdminOrderQuery, AdminOrderQueryVariables>;
export const AdminOrderDocumentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminOrderDocuments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminOrderDocuments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orderId"}},{"kind":"Field","name":{"kind":"Name","value":"kind"}},{"kind":"Field","name":{"kind":"Name","value":"fileUrl"}},{"kind":"Field","name":{"kind":"Name","value":"documentDate"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AdminOrderDocumentsQuery, AdminOrderDocumentsQueryVariables>;
export const OrganizationSuggestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OrganizationSuggestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"count"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationSuggestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"count"},"value":{"kind":"Variable","name":{"kind":"Name","value":"count"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}}]}}]}}]} as unknown as DocumentNode<OrganizationSuggestionsQuery, OrganizationSuggestionsQueryVariables>;
export const GetProgramsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPrograms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"shortTitle"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"baseHours"}},{"kind":"Field","name":{"kind":"Name","value":"studentCategory"}},{"kind":"Field","name":{"kind":"Name","value":"awardedQualification"}},{"kind":"Field","name":{"kind":"Name","value":"awardedRankFrom"}},{"kind":"Field","name":{"kind":"Name","value":"awardedRankTo"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocumentId"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subPrograms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"viewsRating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetProgramsQuery, GetProgramsQueryVariables>;
export const ProgramsPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProgramsPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProgramFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"programsPage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"shortTitle"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"baseHours"}},{"kind":"Field","name":{"kind":"Name","value":"studentCategory"}},{"kind":"Field","name":{"kind":"Name","value":"awardedQualification"}},{"kind":"Field","name":{"kind":"Name","value":"awardedRankFrom"}},{"kind":"Field","name":{"kind":"Name","value":"awardedRankTo"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocumentId"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subPrograms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"viewsRating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<ProgramsPageQuery, ProgramsPageQueryVariables>;
export const GetTopProgramsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTopPrograms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topPrograms"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"shortTitle"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"baseHours"}},{"kind":"Field","name":{"kind":"Name","value":"studentCategory"}},{"kind":"Field","name":{"kind":"Name","value":"awardedQualification"}},{"kind":"Field","name":{"kind":"Name","value":"awardedRankFrom"}},{"kind":"Field","name":{"kind":"Name","value":"awardedRankTo"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocumentId"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subPrograms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"viewsRating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetTopProgramsQuery, GetTopProgramsQueryVariables>;
export const GetProgramDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProgram"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"program"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"shortTitle"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"baseHours"}},{"kind":"Field","name":{"kind":"Name","value":"studentCategory"}},{"kind":"Field","name":{"kind":"Name","value":"awardedQualification"}},{"kind":"Field","name":{"kind":"Name","value":"awardedRankFrom"}},{"kind":"Field","name":{"kind":"Name","value":"awardedRankTo"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocumentId"}},{"kind":"Field","name":{"kind":"Name","value":"educationDocument"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pricing"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subPrograms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"views"}},{"kind":"Field","name":{"kind":"Name","value":"viewsRating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<GetProgramQuery, GetProgramQueryVariables>;
export const AdminUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AdminUserFilterInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserFieldsQueries"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserProfileFieldsQueries"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"passport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"issuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualification"}},{"kind":"Field","name":{"kind":"Name","value":"documentIssuedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserFieldsQueries"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isBlocked"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserProfileFieldsQueries"}}]}}]}}]} as unknown as DocumentNode<AdminUsersQuery, AdminUsersQueryVariables>;
export const AdminUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"adminUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserFieldsQueries"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserProfileFieldsQueries"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserProfileEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"dateOfBirth"}},{"kind":"Field","name":{"kind":"Name","value":"citizenship"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"passport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"issuedBy"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"departmentCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"passportRegistrationAddress"}},{"kind":"Field","name":{"kind":"Name","value":"residentialAddress"}},{"kind":"Field","name":{"kind":"Name","value":"education"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"qualification"}},{"kind":"Field","name":{"kind":"Name","value":"documentIssuedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"workPlaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"inn"}},{"kind":"Field","name":{"kind":"Name","value":"kpp"}},{"kind":"Field","name":{"kind":"Name","value":"ogrn"}},{"kind":"Field","name":{"kind":"Name","value":"legalAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"snils"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminUserFieldsQueries"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserEntity"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"isBlocked"}},{"kind":"Field","name":{"kind":"Name","value":"isEmailVerified"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AdminUserProfileFieldsQueries"}}]}}]}}]} as unknown as DocumentNode<AdminUserQuery, AdminUserQueryVariables>;