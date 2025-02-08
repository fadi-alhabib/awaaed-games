import { Box, Center, Image, useDisclosure, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";

import bgGreen from "../assets/bgs/bg-green.svg";
import themeIcon from "../assets/basics/theme-button.svg";

import appleLogo from "../assets/spin-prizes/apple.svg";
import aramcoLogo from "../assets/spin-prizes/aramco.svg";
import googleLogo from "../assets/spin-prizes/google.svg";
import lucidLogo from "../assets/spin-prizes/lucid.svg";
import nvidiaLogo from "../assets/spin-prizes/nvidia.svg";
import sabicLogo from "../assets/spin-prizes/sabic.svg";
import snapLogo from "../assets/spin-prizes/snap.svg";
import stcLogo from "../assets/spin-prizes/stc.svg";
import WinModal from "../components/modals/WinModal";
import ThemeModal from "../components/modals/ThemeModal";

import spinnerWhite from "../assets/spinner-variants/spinner-white.png";
import spinnerBlack from "../assets/spinner-variants/spinner-black.png";

const SEGMENTS = [
  { image: appleLogo, weight: 1, currentPrice: "900", stockName: "AAPL" },
  { image: googleLogo, weight: 1, currentPrice: "787.5", stockName: "GOOG" },
  { image: nvidiaLogo, weight: 2, currentPrice: "450", stockName: "NVDA" },
  { image: sabicLogo, weight: 11, currentPrice: "68", stockName: "SABIC" },
  { image: stcLogo, weight: 27, currentPrice: "84", stockName: "STC" },
  { image: snapLogo, weight: 27, currentPrice: "86.25", stockName: "SNAP" },
  { image: aramcoLogo, weight: 25, currentPrice: "87", stockName: "ARAMCO" },
  { image: lucidLogo, weight: 5, currentPrice: "97.875", stockName: "LCID" },
];

const SpinWheel = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winningIdx, setWinningIdx] = useState<number | null>(null);
  const [bg, setBg] = useState<string>(bgGreen);
  const [spinner, setSpinner] = useState<string>(spinnerBlack);
  const [wheel, setWheel] = useState<string>("black");
  const [results, setResults] = useState<number[]>(
    new Array(SEGMENTS.length).fill(0)
  );

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Determine which segment is chosen using weighted selection
    const totalWeight = SEGMENTS.reduce((acc, seg) => acc + seg.weight, 0);
    const random = Math.random() * totalWeight;
    let accumulator = 0;
    let selectedIndex = 0;
    for (let i = 0; i < SEGMENTS.length; i++) {
      accumulator += SEGMENTS[i].weight;
      if (random < accumulator) {
        selectedIndex = i;
        break;
      }
    }
    console.log("Winning segment index:", selectedIndex);

    const segmentAngle = 360 / SEGMENTS.length;

    const segCenter = selectedIndex * segmentAngle + segmentAngle / 2;

    const currentRotationEffective = rotation % 360;

    let additionalRotation = 90 - (currentRotationEffective + segCenter);

    additionalRotation = ((additionalRotation % 360) + 360) % 360;

    const fullRotations = (Math.floor(Math.random() * 3) + 3) * 360;

    // The target rotation is the current rotation plus full spins plus the additional rotation needed.
    const targetRotation = rotation + fullRotations + additionalRotation + 90;

    setRotation(targetRotation);

    // Reset spinning state after the animation (duration: 3 seconds)
    setTimeout(() => {
      setIsSpinning(false);
      setWinningIdx(selectedIndex);
      onOpen();
    }, 3000);
  };

  const runMultipleSpins = (numSpins: number) => {
    const newResults = new Array(SEGMENTS.length).fill(0);
    for (let i = 0; i < numSpins; i++) {
      const totalWeight = SEGMENTS.reduce((acc, seg) => acc + seg.weight, 0);
      const random = Math.random() * totalWeight;
      let accumulator = 0;
      let selectedIndex = 0;
      for (let j = 0; j < SEGMENTS.length; j++) {
        accumulator += SEGMENTS[j].weight;
        if (random < accumulator) {
          selectedIndex = j;
          break;
        }
      }
      newResults[selectedIndex]++;
    }
    setResults(newResults);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenTheme,
    onOpen: onOpenTheme,
    onClose: onCloseTheme,
  } = useDisclosure({ defaultIsOpen: true });
  return (
    <Center
      h="100vh"
      bg="gray.900"
      backgroundImage={`url(${bg})`}
      bgSize={"cover"}
    >
      <Box position="relative" overflow={"hidden"}>
        <motion.div
          style={{
            width: "90vh",
            height: "90vh",
            borderRadius: "50%",
            background: wheel,
            border: `4vh solid ${wheel === "black" ? "#EDFDE1" : "#206967"}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            boxShadow: "inset 0 0 24.5px 11.5px #1ed760",
          }}
          animate={{ rotate: rotation }}
          transition={{ type: "tween", duration: 3, ease: "easeOut" }}
        >
          {Array.from({ length: SEGMENTS.length / 2 }).map((_, i) => (
            <Box
              key={`line-${i}`}
              position="absolute"
              w="100%"
              h="2vh"
              bg={wheel === "black" ? "#EDFDE1" : "#206967"}
              transform={`rotate(${(360 / SEGMENTS.length) * i}deg)`}
            />
          ))}

          {SEGMENTS.map((seg, i) => {
            // Calculate the angle for placing each segment’s content.
            const angle =
              (360 / SEGMENTS.length) * i + 360 / SEGMENTS.length / 2;
            return (
              <Box
                key={`outer-text-${i}`}
                position="absolute"
                w="100%"
                h="2vh"
                transform={`rotate(${angle}deg) `}
                transformOrigin="bottom center"
              >
                <Image
                  src={seg.image}
                  filter={wheel === "black" ? "invert(0)" : "invert(1)"}
                  w="18vh"
                  h="18vh"
                  transform={"rotate(180deg) translate(-6vh, 6vh)"}
                  objectFit="contain"
                  borderRadius="full"
                />
              </Box>
            );
          })}
        </motion.div>

        <Box
          position="absolute"
          top={"38%"}
          right={"38%"}
          onClick={spinWheel}
          bg={
            isSpinning
              ? spinner === spinnerBlack
                ? `url(${spinnerWhite})`
                : `url(${spinnerBlack})`
              : `url(${spinner})`
          }
          _before={{
            content: '""',
            position: "absolute",
            inset: 0,
            border: "1.4vh solid transparent",
            borderRadius: "inherit",
            transition: "border-color 0.5s ease-in-out",
          }}
          _hover={{
            _before: !isSpinning && { borderColor: "#1ED760" },
          }}
          bgSize={"cover"}
          w="20vh"
          h="20vh"
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontWeight="bold"
          fontSize="2xl"
          zIndex={100}
          cursor={isSpinning ? "not-allowed" : "pointer"}
          transition="opacity 0.2s"
        >
          {/* <Image src={logo} w={"10vh"} height={"10vh"} /> */}
        </Box>

        {/* The pointer (arrow) is drawn on the right side (3 o’clock) */}
        <Box
          width={"10vh"}
          height={"10vh"}
          position={"absolute"}
          top={"43%"}
          right={"0%"}
          zIndex={"100"}
          bgColor={"#FFB800"}
          clipPath="polygon(0 50%, 100% 0, 100% 100%)"
        ></Box>
      </Box>
      {winningIdx && (
        <WinModal
          isOpen={isOpen}
          onClose={onClose}
          currentPrice={SEGMENTS[winningIdx!].currentPrice}
          stockName={SEGMENTS[winningIdx!].stockName}
        />
      )}
      <ThemeModal
        isOpen={isOpenTheme}
        onClose={onCloseTheme}
        bg={bg}
        spinner={spinner}
        setBg={setBg}
        setSpinner={setSpinner}
        wheel={wheel}
        setWheel={setWheel}
      />

      {/* Button to run multiple spins */}
      <Box
        position="absolute"
        top="10%"
        left="20"
        backgroundColor={"#1ed760"}
        transform="translateX(-50%)"
        p={3}
        borderRadius={"2xl"}
        color={"white"}
      >
        <button onClick={() => runMultipleSpins(100)}>Run 100 Spins</button>
      </Box>

      {/* Display results */}
      <Box
        position="absolute"
        top="20%"
        left="5%"
        transform="translateX(-50%)"
        color={"#1ed760"}
      >
        {results.map((count, index) => (
          <Text key={index}>
            {SEGMENTS[index].stockName}: {count}
          </Text>
        ))}
      </Box>

      <Image
        position={"absolute"}
        top={"1vh"}
        right={"2vh"}
        cursor={"pointer"}
        onClick={onOpenTheme}
        src={themeIcon}
        width={"20vh"}
        height={"20vh"}
      ></Image>
    </Center>
  );
};

export default SpinWheel;
