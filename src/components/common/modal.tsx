'use client';

import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/modal';
import { ReactNode } from 'react';

export type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export default function CustomModal({
  isOpen,
  onClose,
  title,
  size = 'xs',
  children,
}: CustomModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalContent>
        <ModalHeader className="border-b">
          <h3 className="text-xl text-background font-semibold">{title}</h3>
        </ModalHeader>
        <ModalBody className="space-y-4 py-6">{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
