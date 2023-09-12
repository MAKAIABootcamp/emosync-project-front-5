import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function ModalEvent() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [modalPlacement, setModalPlacement] = React.useState("auto");
  return (
    <>
      <Button className="w-56" onPress={onOpen}>Open Modal</Button>
      <Modal 
        isOpen={isOpen} 
        placement={modalPlacement}
        onOpenChange={onOpenChange} 
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
