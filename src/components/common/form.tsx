'use client';

import { Form } from '@heroui/form';
import { handleSubmit } from '@/helpers/handleSubmit';
import { ReactNode } from 'react';
import { Button } from '@heroui/react';
import { clsx } from 'clsx';

type CustomFormProps<T> = {
  onClose?: () => void;
  onSubmitCallback?: () => Promise<unknown>;
  onSubmitAction?: (formData: FormData) => Promise<unknown>;
  children: ReactNode;
  formData: T;
  actionButtonText: string;
  className?: string;
  error?: string | null;
  onError?: (error: string) => void;
};

export default function CustomForm<T>({
  children,
  onClose,
  actionButtonText,
  onSubmitCallback,
  className,
  error,
  onError,
}: CustomFormProps<T>) {
  return (
    <Form
      className={clsx('w-full', className)}
      onSubmit={(e) => {
        handleSubmit(e, onClose, onSubmitCallback, onError);
      }}
    >
      {children}
      {error && <div className="text-danger text-sm mt-2">{error}</div>}
      <div className="flex w-full gap-4 items-center pt-8 justify-end">
        {onClose && (
          <Button variant="light" onPress={onClose}>
            Отмена
          </Button>
        )}
        <Button color="primary" type="submit">
          {actionButtonText}
        </Button>
      </div>
    </Form>
  );
}
