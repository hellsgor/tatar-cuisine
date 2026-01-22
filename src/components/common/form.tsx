'use client';

import { Form } from '@heroui/form';
import { handleSubmit } from '@/helpers/handleSubmit';
import { ReactNode } from 'react';
import { Button } from '@heroui/react';

type CustomFormProps<T> = {
  onClose: () => void;
  onSubmitCallback: () => void;
  children: ReactNode;
  formData: T;
  actionButtonText: string;
};

export default function CustomForm<T>({
  children,
  onClose,
  actionButtonText,
  onSubmitCallback,
}: CustomFormProps<T>) {
  return (
    <Form
      className="w-full"
      onSubmit={(e) => {
        handleSubmit(e, onClose, onSubmitCallback);
      }}
    >
      {children}
      <div className="flex w-full gap-4 items-center pt-8 justify-end">
        <Button variant="light" onPress={onClose}>
          Отмена
        </Button>
        <Button color="primary" type="submit">
          {actionButtonText}
        </Button>
      </div>
    </Form>
  );
}
