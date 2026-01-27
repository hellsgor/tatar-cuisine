'use client';

import { Input } from '@heroui/input';
import { FORM_ERRORS } from '@/config/forms.config';
import { useState } from 'react';
import { validateEmail } from '@/helpers/validateEmail';
import CustomForm from '@/components/common/form';
import { RegistrationFormData } from '@/types/registration-form-data';
import { registerUser } from '@/actions/register';

type RegistrationFormProps = {
  onClose: () => void;
};

export default function RegistrationForm({ onClose }: RegistrationFormProps) {
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  return (
    <CustomForm<RegistrationFormData>
      onClose={onClose}
      formData={formData}
      actionButtonText="Зарегистрироваться"
      onSubmitCallback={async () => {
        await registerUser(formData);
      }}
    >
      <Input
        aria-label="email"
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Введите email"
        type="email"
        value={formData.email}
        autoComplete="email"
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none',
        }}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validate={(value) => {
          if (!value) return FORM_ERRORS.required;
          if (!validateEmail(value)) return FORM_ERRORS.incorrectEmail;
          return null;
        }}
      />

      <Input
        isRequired
        name="password"
        label="Пароль"
        labelPlacement="outside"
        placeholder="Введите пароль"
        type="password"
        value={formData.password}
        autoComplete="off"
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none',
        }}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value) return FORM_ERRORS.required;
          if (value.length < 8) return FORM_ERRORS.shortPassword;
          return null;
        }}
      />

      <Input
        isRequired
        name="confirmPassword"
        label="Подтвердите пароль"
        labelPlacement="outside"
        placeholder="Подтвердите пароль"
        type="password"
        value={formData.confirmPassword}
        autoComplete="off"
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none',
        }}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        validate={(value) => {
          if (!value) return FORM_ERRORS.required;
          if (value !== formData.password) return FORM_ERRORS.passwordsNotMatch;
          return null;
        }}
      />
    </CustomForm>
  );
}
