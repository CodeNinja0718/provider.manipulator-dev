import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box className="page-footer" py={3} bgcolor="white">
      <Container maxWidth="xl">
        <Box
          display="flex"
          justifyContent="center"
          mt={3}
          sx={{ svg: { width: 134, height: 50 } }}
        ></Box>
        <Typography textAlign="center" fontSize={12} mt={3}></Typography>
      </Container>
    </Box>
  );
};

export default Footer;
