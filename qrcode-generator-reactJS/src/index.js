import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Card,
  CardHeader,
  CardFooter,
  Heading,
  Button,
  Input,
  Container,
  ChakraProvider,
  Center,
  CloseButton,
} from "@chakra-ui/react";
import QRCode from "qrcode";

function Main() {
  const [title, setTitle] = useState("QR Code Generator");
  const [urlInput, setUrlInput] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [input, setInput] = useState(true);

  function getQrCode() {
    setTitle("Scan Here");
    const canvas = document.createElement("canvas");
    QRCode.toCanvas(
      canvas,
      urlInput,
      { errorCorrectionLevel: "H" },
      function (error) {
        if (error) console.error(error);
        const qrCodeDataUrl = canvas.toDataURL();
        const root = createRoot(document.getElementById("qr-code-container"));
        root.render(
          <img
            src={qrCodeDataUrl}
            alt="QR Code"
            style={{ display: "block", margin: "auto", width: "100%" }}
          />
        );
        setInput(false);
        setIsGenerated(true);
      }
    );
  }
  
  function clearQrCode() {
    const root = createRoot(document.getElementById("qr-code-container"));
    root.unmount();
    setInput(true);
    setUrlInput("");
    setIsGenerated(false);
  }

  return (
    <>
      <div className="container">
        <ChakraProvider>
          <Center h="100vh">
            <Card
              align="center"
              boxShadow="2xl"
              bg="white"
              m={10}
              p={10}
              minWidth={350}
            >
              <CardHeader>
                <Heading color="#2B6CB0" textAlign={"center"} size="lg">
                  {title}
                </Heading>
              </CardHeader>
              <Container>
                {input && (
                  <Input
                    variant="outline"
                    placeholder="https://example.com"
                    mt={10}
                    onChange={(e) => setUrlInput(e.target.value)}
                    value={urlInput}
                  />
                )}
                <div id="qr-code-container"></div>
              </Container>
              <CardFooter>
                {urlInput && !isGenerated && (
                  <Button colorScheme="blue" size="lg" onClick={getQrCode}>
                    Generate
                  </Button>
                )}
                {isGenerated && <CloseButton size="lg" onClick={clearQrCode} />}
              </CardFooter>
            </Card>
          </Center>
        </ChakraProvider>
      </div>
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<Main />);
