export const PASSWORD_MIN_LENGTH = 8;

export const FORM_ERRORS = {
  required: 'Заполните обязательное поле',
  incorrectEmail: 'Некорректный email',
  shortPassword: `Пароль должен быть не менее ${PASSWORD_MIN_LENGTH} символов`,
  passwordsNotMatch: 'Пароли не совпадают',
  existingUser: 'Пользователь с таким email уже существует',
  incorrectValue: 'Некорректное значение поля',
} as const;
