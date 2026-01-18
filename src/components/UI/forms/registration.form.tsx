'use client';

import { Input } from '@heroui/input';
import { formErrors } from '@/config/forms.config';
import { useState } from 'react';
import { validateEmail } from '@/helpers/validateEmail';
import CustomForm from '@/components/common/form';

type RegistrationFormProps = {
  onClose: () => void;
};

interface RegistrationFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

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
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none',
        }}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validate={(value) => {
          if (!value) return formErrors.required;
          if (!validateEmail(value)) return formErrors.incorrectEmail;
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
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none',
        }}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        validate={(value) => {
          if (!value) return formErrors.required;
          if (value.length < 8) return formErrors.shortPassword;
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
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm focus:outline-none',
        }}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        validate={(value) => {
          if (!value) return formErrors.required;
          if (value !== formData.password) return formErrors.passwordsNotMatch;
          return null;
        }}
      />
    </CustomForm>
  );
}
