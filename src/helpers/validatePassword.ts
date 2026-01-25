import { formErrors, PASSWORD_MIN_LENGTH } from '@/config/forms.config';
import { RegistrationFormData } from '@/types/registration-form-data';

type validatePasswordFuncProps = Pick<
  RegistrationFormData,
  'password' | 'confirmPassword'
>;

export function validatePassword({
  password,
  confirmPassword,
}: validatePasswordFuncProps) {
  if (password !== confirmPassword) {
    return formErrors.passwordsNotMatch;
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    return formErrors.shortPassword;
  }

  return false;
}
