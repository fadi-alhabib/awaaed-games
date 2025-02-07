import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import closeIcon from "../../assets/basics/close-icon.png";
interface WinModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockName?: string | undefined;
  currentPrice?: string | undefined;
}

function WinModal({ isOpen, onClose, stockName, currentPrice }: WinModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent borderRadius={"25px"} background={"black"}>
        <ModalHeader
          textTransform="lowercase"
          fontSize="2xl"
          fontWeight="medium"
          pb={2}
        >
          <Image src={closeIcon} onClick={onClose} cursor={"pointer"}></Image>
        </ModalHeader>

        <ModalBody pb={6}>
          <VStack spacing={3} align="stretch">
            <Text fontSize="lg">
              Stock name:{" "}
              <Text as="span" fontWeight="semibold">
                {stockName}
              </Text>
            </Text>

            <Text fontSize="lg">
              Current Price:{" "}
              <Text as="span" fontWeight="bold">
                ${currentPrice}
              </Text>
            </Text>
            {/* 
            <Text fontSize="lg" color={greenColor} fontWeight="medium">
              +3.2%
            </Text> */}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default WinModal;
