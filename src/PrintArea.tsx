import { Box, Divider, Typography } from "@mui/material";
import logo from './logo.svg';

function PrintArea() {
  return (
    <Box mt={1} mx={2} p={2} border="1px solid" borderRadius={5} display='flex' flexDirection='column'>
      <Typography variant='h5'>LOREM IPSUM</Typography>
      <img src={logo} className="App-logo" alt="logo" />
      <Divider />
      <Typography mt={4}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae ipsum id lacus aliquam consectetur a quis mi. In ut orci orci. Praesent porta nunc eu dolor hendrerit, et facilisis dolor mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec luctus, diam et laoreet molestie, libero ante facilisis justo, eget egestas nisl nibh sed libero. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt elementum justo eget fermentum. Morbi sit amet elit dignissim, vulputate tellus luctus, accumsan neque. Cras mollis rhoncus nunc sit amet fringilla. Nulla pellentesque enim ligula, eget auctor risus viverra eu. Nam ac metus id leo facilisis molestie. Maecenas dictum, ex at accumsan placerat, enim orci luctus risus, quis eleifend lectus magna at ante. Pellentesque pharetra metus eu rhoncus placerat.</Typography>
    </Box>
  );
}

export default PrintArea;