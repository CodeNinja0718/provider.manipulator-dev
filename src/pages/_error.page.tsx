import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

function Error(props: any) {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column-reverse', tablet: 'row' }}
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Box mr={{ tablet: '60px' }} mt={{ xs: 2, tablet: 0 }}>
        <Typography
          fontSize={{ xs: 36, tablet: 80 }}
          fontWeight="bold"
          color="primary"
          textAlign={{ xs: 'center', tablet: 'start' }}
        >
          Whoops!
        </Typography>
        <Typography
          mt={{ xs: '12px', tablet: 1 }}
          fontSize={{ tablet: 18 }}
          color="heading"
          fontWeight="bold"
          textAlign={{ xs: 'center', tablet: 'start' }}
        >
          {`お探しのページが見つかりませんでした\nトップから再度お試しください!`}
        </Typography>
        <Typography
          mt={{ xs: 1, tablet: 2 }}
          fontSize={{ tablet: 18 }}
          color="heading"
          textAlign={{ xs: 'center', tablet: 'start' }}
        >
          エラーコード: {props.statusCode || '404'}
        </Typography>
        <Box
          display="flex"
          justifyContent={{ xs: 'center', tablet: 'flex-start' }}
        >
          <Link href={'/'} replace passHref>
            <Button
              size="large"
              variant="contained"
              className="tabletStyle"
              color="primary"
              sx={{
                '&.tabletStyle': {
                  fontSize: { tablet: 14 },
                  fontWeight: { xs: 500, tablet: 700 },
                },
                maxWidth: { xs: 28, tablet: 240 },
                mt: { xs: 3, tablet: 4 },
              }}
              fullWidth
            >
              トップに戻る
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

Error.getInitialProps = ({ err, res }: { err: any; res: any }) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
