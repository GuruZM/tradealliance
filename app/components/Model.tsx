import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Divider } from '@nextui-org/react'

// create types for isOpen and onOpenChange
type ModalProps = {
    isOpen: boolean;
    onOpenChange: () => void;
    isSubmitting?: boolean;
    children: React.ReactNode;
    buttonSection?: React.ReactNode;
    title: string;
}


function Model({ isOpen, onOpenChange, children,isSubmitting,buttonSection,title} : ModalProps) {
  return (
    <>
    <Modal 
    isOpen={isOpen} 
    onOpenChange={onOpenChange}
    placement="center"
  >
   <ModalContent>
    {(onClose) => (
      <>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <Divider />
        <ModalBody >
            {children}
        </ModalBody>
               
              {/* <ModalFooter>

              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
      </>
  )
}

export default Model