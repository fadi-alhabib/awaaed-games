import {
  Box,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
} from "@chakra-ui/react";
import bgBlack from "../../assets/bgs/bg-black.svg";
import bgGreen from "../../assets/bgs/bg-green.svg";
import bgGreen2 from "../../assets/bgs/bg-green-2.svg";
import bgGreen3 from "../../assets/bgs/bg-green-3.svg";
import bgBlue from "../../assets/bgs/bg-blue.svg";
import bgBlue2 from "../../assets/bgs/bg-blue-2.svg";
import bgBlue3 from "../../assets/bgs/bg-blue-3.svg";

import wheelBlack from "../../assets/wheels/wheel-black.svg";
import wheelWhite from "../../assets/wheels/wheel-white.svg";

import spinnerWhite from "../../assets/spinner-variants/spinner-white.png";
import spinnerWhiteOutlined from "../../assets/spinner-variants/spinner-white-outlined.png";
import spinnerBlack from "../../assets/spinner-variants/spinner-black.png";
import spinnerBlackOutlined from "../../assets/spinner-variants/spinner-black-outlined.png";
import closeIcon from "../../assets/basics/close-icon.png";
import { Dispatch, SetStateAction } from "react";
interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  bg: string;
  setBg: Dispatch<SetStateAction<string>>;
  spinner: string;
  setSpinner: Dispatch<SetStateAction<string>>;
  wheel: string;
  setWheel: Dispatch<SetStateAction<string>>;
}
const bgs: string[] = [bgBlack, bgGreen, bgGreen2, bgBlue, bgBlue2, bgBlue3];
const wheels: {
  img: string;
  color: string;
}[] = [
  { img: wheelBlack, color: "black" },
  { img: wheelWhite, color: "white" },
];
const spinners: string[] = [spinnerWhite, spinnerBlack];
const ThemeModal = ({
  isOpen,
  onClose,
  setBg,
  bg,
  setSpinner,
  spinner,
  setWheel,
  wheel,
}: ThemeModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"4xl"} isCentered>
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

        <ModalBody pb={6} textColor={"#EDFDE1"}>
          <Heading my={5} fontSize="xl">
            Choose Background:
          </Heading>

          <SimpleGrid columns={[3, 5, 7]} spacing={4}>
            {bgs.map((background) => (
              <Box
                key={background}
                width="15vh"
                height="15vh"
                borderRadius="50%"
                cursor="pointer"
                borderWidth={background === bg ? "4px" : "2px"}
                borderColor={background === bg ? "#1ED760" : "transparent"}
                transition="all 0.2s ease-in-out"
                _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
                onClick={() => setBg(background)}
                backgroundImage={`url(${background})`}
                backgroundSize="cover"
                backgroundPosition="center"
              />
            ))}
          </SimpleGrid>

          <Heading my={"5vh"}>Choose Spinner:</Heading>
          <SimpleGrid columns={7} gap={10}>
            {spinners.map((spinButton) => (
              <Image
                borderRadius={"5vh"}
                mr={5}
                border={
                  spinButton === spinner ? "1vh solid #1ED760" : undefined
                }
                bg={"gray"}
                onClick={() => setSpinner(spinButton)}
                src={spinButton}
              />
            ))}
          </SimpleGrid>
          <Heading my={"3vh"}>Choose Wheel:</Heading>
          <SimpleGrid columns={7} gap={10}>
            {wheels.map((choosenWheel) => (
              <Image
                borderRadius={"5vh"}
                mr={5}
                border={
                  choosenWheel.color === wheel ? "1vh solid #1ED760" : undefined
                }
                bg={"gray"}
                onClick={() => setWheel(choosenWheel.color)}
                src={choosenWheel.img}
              />
            ))}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ThemeModal;
