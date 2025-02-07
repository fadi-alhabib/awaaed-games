import { Box, Center, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import logo from "./assets/awaed.png";
import bgBlue from "./assets/bg-blue.png";
import appleLogo from "./assets/spin-prizes/apple.png";
import aramcoLogo from "./assets/spin-prizes/aramco.png";
import googleLogo from "./assets/spin-prizes/google.png";
import lucidLogo from "./assets/spin-prizes/lucid.png";
import nvidiaLogo from "./assets/spin-prizes/nvidia.png";
import sabicLogo from "./assets/spin-prizes/sabic.png";
import snapLogo from "./assets/spin-prizes/snap.png";
import stcLogo from "./assets/spin-prizes/stc.png";

const SEGMENTS = [
  { image: appleLogo, weight: 2 },
  { image: googleLogo, weight: 2 },
  { image: nvidiaLogo, weight: 2 },
  { image: sabicLogo, weight: 17 },
  { image: stcLogo, weight: 35 },
  { image: snapLogo, weight: 35 },
  { image: aramcoLogo, weight: 30 },
  { image: lucidLogo, weight: 30 },
];

const SpinWheel = () => {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);

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

    const segmentAngle = 360 / SEGMENTS.length;
    const centerAngle = selectedIndex * segmentAngle + segmentAngle / 2;
    const additionalRotation = 360 - centerAngle;
    const fullRotations = Math.floor(Math.random() * 3 + 3) * 360; // 3 to 5 full rotations
    const targetRotation = rotation + fullRotations + additionalRotation;

    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
    }, 3000);
  };

  return (
    <Center
      h="100vh"
      bg="gray.900"
      backgroundImage={`url(${bgBlue})`}
      bgSize={"cover"}
    >
      <Box position="relative" overflow={"hidden"}>
        <motion.div
          style={{
            width: "100vh",
            height: "100vh",
            borderRadius: "50%",
            background: "black",
            border: "4vh solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
          animate={{ rotate: rotation }}
          transition={{ type: "tween", duration: 3, ease: "easeOut" }}
        >
          {Array.from({ length: SEGMENTS.length }).map((_, i) => (
            <Box
              key={`line-${i}`}
              position="absolute"
              w="100%"
              h="2vh"
              bg="white"
              transform={`rotate(${(360 / SEGMENTS.length) * i}deg)`}
            />
          ))}

          {SEGMENTS.map((_, i) => {
            const angle =
              (360 / SEGMENTS.length) * i + 360 / SEGMENTS.length / 2;
            return (
              <Box
                key={`outer-text-${i}`}
                position="absolute"
                top="50%"
                left="50%"
                transform={`rotate(${angle}deg) translate(0, -20vh) rotate(-${angle}deg)`}
                transformOrigin="center"
              >
                {i}
                {/* <Image
                  src={seg.image}
                  w="8vh"
                  h="8vh"
                  objectFit="contain"
                  borderRadius="full"
                /> */}
              </Box>
            );
          })}
        </motion.div>

        <Box
          position="absolute"
          top={"40vh"}
          right={"40vh"}
          onClick={spinWheel}
          w="20vh"
          h="20vh"
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor="#1ED760"
          color="white"
          fontWeight="bold"
          fontSize="2xl"
          zIndex={100}
          cursor={isSpinning ? "not-allowed" : "pointer"}
          opacity={isSpinning ? 0.7 : 1}
          transition="opacity 0.2s"
        >
          <Image src={logo} />
        </Box>

        <Box
          width={"10vh"}
          height={"10vh"}
          position={"absolute"}
          top={"45vh"}
          right={"-2vh"}
          zIndex={"100"}
          bgColor={"#FFB800"}
          clipPath="polygon(100% 0, 0 50%, 100% 100%)"
        ></Box>
      </Box>
    </Center>
  );
};

export default SpinWheel;
