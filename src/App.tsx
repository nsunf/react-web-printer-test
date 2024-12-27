import { Alert, Box, Button, Container } from '@mui/material';
import './App.css';
import PrintArea from './PrintArea';
import { useCallback, useEffect, useState } from 'react';


function App() {
  const [printers, setPrinters] = useState([
    { name: 'BIXOLON SRP-350III', VID: 0x1504, PID: 0x002B },
    { name: 'SEWOO SLK-TS200', VID: 0x1FC9, PID: 0x2016 },
  ]);

  const [device, setDevice] = useState<USBDevice>();

  const requestWebUsb = useCallback(async (name: 'BIXOLON SRP-350III'|'SEWOO SLK-TS200') => {
    if (!('usb' in navigator)) {
      return;
    }

    let d = { vendorId: 0, productId: 0 };

    if (name === 'BIXOLON SRP-350III') {
      d = { vendorId: printers[0].VID, productId: printers[0].PID };
    } else {
      d = { vendorId: printers[1].VID, productId: printers[1].PID };
    }

    try {
      setDevice(await navigator.usb.requestDevice({ filters: [ d ] }));
    } catch (e) {
      console.log(e);
    }

  }, [printers]);

  const requestWebSerial = useCallback(async () => {
    try {
      const port = await navigator.serial.requestPort();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const onClickPrinterHandler = useCallback(async () => {
    if (!('usb' in navigator)) {
      return;
    }
    if (device === undefined) {
      return;
    }

    console.log(device);

    try {
      await device.open();
      if (device.configuration === null) {
        await device.selectConfiguration(1);
      }
      await device.claimInterface(0);

      const encoder = new TextEncoder();

      const txt = encoder.encode("Hello World");
      const arr = Array.from(txt);
      const escposCommands = new Uint8Array([
        0x1B, 0x40,
        ...arr,
        0x0A
      ]);

      await device.transferOut(1, escposCommands);

      await device.close();
    } catch (e) {
      console.log(e);
    }
  }, [device]);



  return (
    <Container maxWidth='sm'>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PrintArea />
        <br/>
        {device ?
          <Alert>{device.manufacturerName} {device.productName}</Alert> :
          <Alert severity='error'>No Printer Device</Alert>
        }
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button sx={{ mt: 4 }} variant='outlined' onClick={() => requestWebUsb("BIXOLON SRP-350III")}>WebUSB BIXOLON</Button>
          <Button sx={{ mt: 4 }} variant='outlined' onClick={() => requestWebUsb("SEWOO SLK-TS200")}>WebUSB SEWOO</Button>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button sx={{ mt: 2 }} variant='outlined' onClick={() => requestWebSerial()}>WebSerial</Button>
        </Box>
        <Button sx={{ mt: 2 }} variant='contained' onClick={onClickPrinterHandler}>print</Button>
      </Box>
    </Container>
  );
}

export default App;
