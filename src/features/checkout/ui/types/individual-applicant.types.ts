/** Данные заказчика — физического лица: только ФИО и контакты */
export interface IndividualApplicantData {
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  phone: string;
}

export const defaultIndividualApplicantData = (): IndividualApplicantData => ({
  lastName: "",
  firstName: "",
  middleName: "",
  email: "",
  phone: "",
});
