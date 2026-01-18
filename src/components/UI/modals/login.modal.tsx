'use client';

import CustomModal, { type CustomModalProps } from '@/components/common/modal';
import LoginForm from '../forms/login.form';

type LoginModalProps = Pick<CustomModalProps, 'onClose' | 'isOpen'>;

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Авторизоваться">
      <LoginForm onClose={onClose} />
    </CustomModal>
  );
}
