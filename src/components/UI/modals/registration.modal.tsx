'use client';

import CustomModal, { type CustomModalProps } from '@/components/common/modal';
import RegistrationForm from '../forms/registration.form';

type RegistrationModalProps = Pick<CustomModalProps, 'isOpen' | 'onClose'>;

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Создать аккаунт">
      <RegistrationForm onClose={onClose} />
    </CustomModal>
  );
}
