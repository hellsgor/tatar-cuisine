'use client';

import { Input } from '@heroui/input';
import { FORM_ERRORS } from '@/config/forms.config';
import { useState } from 'react';
import CustomForm from '@/components/common/form';
import { signInWithCredentials } from '@/actions/sign-in';

type LoginFormProps = {
  onClose: () => void;
};

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm({ onClose }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  return (
    <CustomForm<LoginFormData>
      onClose={() => {
        window.location.reload();
        onClose();
      }}
      formData={formData}
      actionButtonText="Войти"
      onSubmitCallback={() =>
        signInWithCredentials(formData.email, formData.password)
      }
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
        autoComplete="email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        validate={(value) => {
          if (!value) return FORM_ERRORS.required;
          return null;
        }}
      />

      <Input
        isRequired
        name="password"
        label="Введите пароль"
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
          return null;
        }}
      />
    </CustomForm>
  );
}
