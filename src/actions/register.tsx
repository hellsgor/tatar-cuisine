'use server';

import { prisma } from '@/helpers/prisma';
import { RegistrationFormData } from '@/types/registration-form-data';

export async function registerUser(formData: RegistrationFormData) {
  const { email, password } = formData;

  try {
    const user = await prisma.user.create({ data: { email, password } });
    console.log('User:', user);
    return user;
  } catch (e) {
    console.error(e);
  }
}
