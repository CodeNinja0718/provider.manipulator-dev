import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

interface ContentLineProps {
  start: string;
  center?: string;
  end?: React.ReactNode;
}

const ContentLine: React.FC<ContentLineProps> = ({ start, center, end }) => {
  return (
    <Grid container alignItems={'center'}>
      <Grid item xs={!center ? 6 : 12} tablet={'auto'}>
        <Box width={{ xs: '100%', tablet: 126 }}>
          <Typography fontSize={16} fontWeight={500}>
            {start}
          </Typography>
        </Box>
      </Grid>
      {!end ? (
        <Grid item xs={center ? 12 : false} tablet={true}>
          <Typography fontSize={16}>{center}</Typography>
        </Grid>
      ) : (
        <Grid item xs={center ? 6 : false} tablet={true}>
          <Typography fontSize={16}>{center}</Typography>
        </Grid>
      )}
      <Grid item xs={6} tablet={'auto'} textAlign="right">
        <Box width={{ xs: '100%', tablet: 110 }}>{end}</Box>
      </Grid>
    </Grid>
  );
};
export default ContentLine;
