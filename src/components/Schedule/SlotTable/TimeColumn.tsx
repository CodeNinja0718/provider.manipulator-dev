import { Box, Stack, Typography } from '@mui/material';
import { WORK_TIMES } from 'utils/const';

const TimeColumn = () => {
  return (
    <Stack
      sx={{
        flex: '0 0 42px',
        width: '100%',
        maxWidth: 42,
      }}
    >
      {WORK_TIMES.map((time, index) => {
        return (
          <Box
            key={time}
            sx={{
              height: index === 0 ? 50 : 40,
              display: 'flex',
              alignItems: 'end',
            }}
          >
            <Typography
              fontSize={12}
              lineHeight={1}
              sx={{ transform: 'translate(0, 50%)' }}
              color="graySolid"
              width="100%"
            >
              {time}
            </Typography>
          </Box>
        );
      })}
    </Stack>
  );
};

export default TimeColumn;
