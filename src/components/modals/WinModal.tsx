import {
  Center,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import closeIcon from "../../assets/basics/close-icon.png";
import winAnimation from "../../assets/basics/win-animation.gif";
interface WinModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockName?: string | undefined;
  currentPrice?: string | undefined;
}

function WinModal({ isOpen, onClose, stockName, currentPrice }: WinModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay />
      <ModalContent
        borderRadius={"12vh"}
        border={"2vh solid #1ED760"}
        background={"rgba(0,0,0,0.85)"}
      >
        <ModalHeader
          textTransform="lowercase"
          fontSize="2xl"
          fontWeight="medium"
          pb={2}
        >
          <Image
            src={closeIcon}
            onClick={onClose}
            cursor={"pointer"}
            width={"4vh"}
            height={"4vh"}
          />
        </ModalHeader>

        <ModalBody pb={6} textColor={"white"}>
          <VStack spacing={3} align="stretch">
            <Center>
              <Image src={winAnimation} width={"20vh"} />
            </Center>
            <VStack>
              <Heading>congratulations!</Heading>

              <Text fontSize={"xl"} fontWeight="semibold">
                You won
                <Text display={"inline"} fontWeight={"bold"} color={"#1ED760"}>
                  {" "}
                  {stockName}{" "}
                </Text>
                Stock!
              </Text>

              <Text fontSize="lg">
                Current Price:
                <Text as="span" fontWeight="bold">
                  ${currentPrice}
                </Text>
              </Text>
            </VStack>

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
