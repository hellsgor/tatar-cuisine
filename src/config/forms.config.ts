export const PASSWORD_MIN_LENGTH = 8;

export const formErrors = {
  required: 'Заполните обязательное поле',
  incorrectEmail: 'Некорректный email',
  shortPassword: `Пароль должен быть не менее ${PASSWORD_MIN_LENGTH} символов`,
  passwordsNotMatch: 'Пароли не совпадают',
} as const;
