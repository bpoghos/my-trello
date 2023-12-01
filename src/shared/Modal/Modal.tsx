import { FC, ReactNode, useEffect, useRef } from 'react'

import styles from './Modal.module.css'
import { useAppDispatch } from '../../hooks/useAppDispatch'

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Function;
}

const Modal: FC<ModalProps> = ({ children, isOpen, setIsOpen }) => {

  const dispatch = useAppDispatch()
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);


  return (

    <>
      {isOpen && (
        <div className={styles.backdrop}>
          <div className={styles.modal} ref={modalRef}>{children}</div>
        </div>
      )}
    </>
  )
}

export default Modal