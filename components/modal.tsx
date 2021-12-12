import { ReactElement, ReactNode } from 'react';

import ClearIcon from './icons/clear';

import styles from './modal.module.scss';


type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};


export default function Modal({ onClose, children }: ModalProps): ReactElement {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.iconRow}>
          <span onClick={onClose}><ClearIcon /></span>
        </div>
        {children}
      </div>
    </div>
  );
}
