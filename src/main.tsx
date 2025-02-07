import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Defaults to 400 weight
// Bold

import App from "./App.tsx";

import SpinWheel from "./spinTheWheel/SpinWheel.tsx";
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <ChakraProvider>
    <StrictMode>
      <SpinWheel></SpinWheel>
    </StrictMode>
  </ChakraProvider>
);
