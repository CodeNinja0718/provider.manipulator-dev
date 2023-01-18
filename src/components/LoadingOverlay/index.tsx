import { Box, CircularProgress } from '@mui/material';

const LoadingOverlay = ({ visible }: { visible?: boolean }) => {
  if (visible) {
    return (
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress sx={{ zIndex: 1001 }} />
        <Box
          position="absolute"
          zIndex={1000}
          sx={{
            inset: '0px',
          }}
        >
          <Box
            position="absolute"
            top={0}
            right={0}
            left={0}
            bottom={0}
            zIndex={1000}
            bgcolor="white"
            sx={{ opacity: 0.75 }}
          />
        </Box>
      </Box>
    );
  }
  return null;
};

export default LoadingOverlay;
