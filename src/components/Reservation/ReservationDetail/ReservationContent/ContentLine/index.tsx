import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

interface ContentLineProps {
  start: string;
  center?: string | React.ReactNode;
  end?: React.ReactNode;
  isAlignRightCenter?: boolean;
}

const ContentLine: React.FC<ContentLineProps> = ({
  start,
  center,
  end,
  isAlignRightCenter,
}) => {
  return (
    <Grid container alignItems={'center'}>
      <Grid item xs={!center ? 8 : 12} tablet={'auto'}>
        <Box width={{ xs: '100%', tablet: 126 }}>
          <Typography fontSize={16} fontWeight={'bold'}>
            {start}
          </Typography>
        </Box>
      </Grid>
      {!end ? (
        <Grid item xs={center ? 12 : false} tablet={true}>
          <Typography fontSize={{ xs: 14, tablet: 16 }}>{center}</Typography>
        </Grid>
      ) : (
        <Grid
          item
          xs={center ? 8 : false}
          tablet={true}
          textAlign={{
            xs: 'left',
            tablet: isAlignRightCenter ? 'right' : 'left',
          }}
        >
          <Typography fontSize={{ xs: 14, tablet: 16 }}>{center}</Typography>
        </Grid>
      )}
      <Grid item xs={4} tablet={'auto'} textAlign="right">
        <Box width={{ xs: '100%', tablet: 110 }}>{end}</Box>
      </Grid>
    </Grid>
  );
};
export default ContentLine;
