import { FC, ReactNode } from 'react'

import styles from './Modal.module.css'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  setIsOpen: Function
}

const Modal: FC<ModalProps> = ({ children, isOpen }) => {


  return (
    <>
      {
        isOpen && <div className={styles.modal}>{children}</div>
      }
    </>
  )
}

export default Modal