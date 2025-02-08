import {
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import closeIcon from "../../assets/basics/close-icon.png"; // Import the close icon

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  segments: { stockName: string; weight: number }[];
}

const TestsModal = ({ isOpen, onClose, segments }: ResultsModalProps) => {
  const [results, setResults] = useState<number[]>(
    new Array(segments.length).fill(0)
  );
  const [numSpins, setNumSpins] = useState<number>(1000); // Default to 1000 spins

  const runMultipleSpins = (spins: number) => {
    const newResults = new Array(segments.length).fill(0);
    for (let i = 0; i < spins; i++) {
      const totalWeight = segments.reduce((acc, seg) => acc + seg.weight, 0);
      const random = Math.random() * totalWeight;
      let accumulator = 0;
      let selectedIndex = 0;
      for (let j = 0; j < segments.length; j++) {
        accumulator += segments[j].weight;
        if (random < accumulator) {
          selectedIndex = j;
          break;
        }
      }
      newResults[selectedIndex]++;
    }
    setResults(newResults);
  };

  const handleRetry = () => {
    runMultipleSpins(numSpins);
  };

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
              <Text fontSize="2xl" fontWeight="bold">
                Algorithm Test
              </Text>
            </Center>

            <NumberInput
              defaultValue={1000}
              min={1}
              max={100000}
              onChange={(valueString) => setNumSpins(Number(valueString))}
              textColor="white"
            >
              <NumberInputField
                border="1px solid white"
                _active={{
                  borderColor: "#1ED760",
                  border: "1px solid #1ED760",
                }}
                _focus={{ borderColor: "#1ED760" }}
              />
            </NumberInput>

            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th color="white">Stock Name</Th>
                  <Th color="white" isNumeric>
                    Times Selected
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {results.map((count, index) => (
                  <Tr key={index}>
                    <Td>{segments[index].stockName}</Td>
                    <Td isNumeric>{count}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <Center>
              <Button
                mt={4}
                colorScheme="teal"
                onClick={handleRetry}
                fontSize="xl"
                fontWeight="bold"
                borderRadius="2vh"
                border="0.5vh solid #1ED760"
                bg="black"
                color="#1ED760"
                _hover={{ bg: "#1ED760", color: "black" }}
              >
                Retry
              </Button>
            </Center>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TestsModal;
