'use client';

import { Button, Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FC } from 'react';

interface MRNotificationProps {
  notification: string;
  setOpenModal: (open: boolean) => void;
  onConfirm?: () => void; // gọi khi nhấn nút Đồng ý
  confirmMode?: boolean; // true nếu là xác nhận thao tác (ví dụ xóa)
}

export const MRNotification: FC<MRNotificationProps> = ({
  notification,
  setOpenModal,
  onConfirm,
  confirmMode = false,
}) => {
  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    setOpenModal(false);
  };

  return (
    <Modal show={true} size="md" onClose={() => setOpenModal(false)} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-gray-800 dark:text-gray-400 md:text-2xl font-bold">{notification}</h3>
          <div className="flex justify-center gap-4">
            <Button
              className={`md:h-12 md:text-xl font-bold ${
                confirmMode ? 'bg-red-700 hover:bg-red-800' : 'bg-blue-700 hover:bg-blue-800'
              }`}
              onClick={handleConfirm}
            >
              Đồng ý
            </Button>

            {confirmMode && (
              <Button color="gray" className="md:h-12 md:text-xl font-bold" onClick={() => setOpenModal(false)}>
                Huỷ
              </Button>
            )}
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};
