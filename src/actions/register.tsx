'use server';

import { formErrors } from '@/config/forms.config';
import { saltAndHashPassword } from '@/helpers/password';
import { prisma } from '@/helpers/prisma';
import { validatePassword } from '@/helpers/validatePassword';
import { RegistrationFormData } from '@/types/registration-form-data';

export async function registerUser(formData: RegistrationFormData) {
  const { email, password, confirmPassword } = formData;

  const passwordError = validatePassword({ password, confirmPassword });
  if (passwordError) {
    return {
      error: passwordError,
    };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) return { error: formErrors.existingUser };

    const pwHash = await saltAndHashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: pwHash },
    });

    return user;
  } catch (e) {
    console.error(e);
  }
}
