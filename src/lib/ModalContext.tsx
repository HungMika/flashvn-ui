'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { MRNotification } from '@/components/ui/Notification';

type ModalContextType = {
  notify: (message: string) => void;
  confirm: (message: string, onConfirm: () => void) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [confirmMode, setConfirmMode] = useState(false);
  const [onConfirm, setOnConfirm] = useState<(() => void) | undefined>(undefined);

  const notify = useCallback((msg: string) => {
    setMessage(msg);
    setConfirmMode(false);
    setOnConfirm(undefined);
    setVisible(true);
  }, []);

  const confirm = useCallback((msg: string, callback: () => void) => {
    setMessage(msg);
    setConfirmMode(true);
    setOnConfirm(() => callback);
    setVisible(true);
  }, []);

  return (
    <ModalContext.Provider value={{ notify, confirm }}>
      {children}
      {visible && (
        <MRNotification
          notification={message}
          confirmMode={confirmMode}
          onConfirm={onConfirm}
          setOpenModal={setVisible}
        />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
