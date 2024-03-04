# QR Code Generate App
## This code represents a React component (Main) that serves as a QR Code generator.

<img width="364" alt="Screenshot 2023-12-21 223154" src="https://github.com/ViNu-23/qrcode-generator-reactJS/assets/59360964/b70a4bd1-4099-444f-81d5-5c1e46c017d8">
<img width="299" alt="Screenshot 2023-12-21 223307" src="https://github.com/ViNu-23/qrcode-generator-reactJS/assets/59360964/9c8d1f8c-a7cb-4776-a8df-d2c83c0dba73">

## State Variables:

1. title: Manages the title of the QR Code generator. Initially set to "QR Code Generator" and changes to "Scan Here" when a QR Code is generated.</br>
2. urlInput: Manages the input URL for generating the QR Code.</br>
3. isGenerated: Tracks whether a QR Code has been generated or not.</br>
4. input: Manages the visibility of the input field.</br>
## Functions:

1. getQrCode: Invoked when the "Generate" button is clicked. It uses the QRCode library to generate a QR Code based on the input URL. The generated QR Code is then displayed, and the input field is hidden.</br>
2. clearQrCode: Invoked when the "Clear" button (represented by the Chakra UI CloseButton) is clicked. It removes the previously generated QR Code, resets the input field, and sets the component state to its initial state.
## Chakra UI Components:

1. Card: Represents a container for the QR Code generator with styling provided by Chakra UI.</br>
2. CardHeader: Displays the title of the QR Code generator.</br>
3. Container: Wraps the input field and the container for the generated QR Code.</br>
4. Input: Allows users to input the URL for generating the QR Code.</br>
5. CardFooter: Contains the "Generate" and "Clear" buttons.</br>
6. CloseButton: A Chakra UI component used for clearing the generated QR Code.
## Rendering:

The Main component is rendered using createRoot from react-dom/client. This is a part of the transition to React 18's concurrent rendering model.</br>

In summary, this component provides a simple UI for generating and clearing QR Codes, with dynamic changes to the title based on the state of QR Code generation. The QR Code is displayed using the QRCode library, and the component uses Chakra UI for styling and UI components.

## Demo
https://qr-code-generator-reactjs-chakraui.netlify.app/ 