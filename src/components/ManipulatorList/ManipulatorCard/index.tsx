import ArrowRight from '@icons/arrow-right.svg';
import IconReview from '@icons/icon_review.svg';
import SwitchIcon from '@icons/icon_switch.svg';
import DeleteIcon from '@icons/icon_trashbox.svg';
import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { MANIPULATOR_STATUS } from 'utils/const';

import styles from './styles';

const ManiStatus = ({ value }: { value: string }) => {
  return (
    <Box sx={styles.statusDoubleBox}>
      <Box
        sx={styles.statusBoxItem}
        className={value === MANIPULATOR_STATUS.POSTING ? 'posting' : ''}
      >
        {MANIPULATOR_STATUS.POSTING}
      </Box>
      <Box
        sx={styles.statusBoxItem}
        className={value === MANIPULATOR_STATUS.STOPPED ? 'stopped' : ''}
      >
        {MANIPULATOR_STATUS.STOPPED}
      </Box>
    </Box>
  );
};

const ManipulatorCard = () => {
  const renderStatus = (value: string) => {
    if (
      [MANIPULATOR_STATUS.POSTING, MANIPULATOR_STATUS.STOPPED].includes(value)
    ) {
      return <ManiStatus value={value} />;
    }
    if (value === MANIPULATOR_STATUS.UNDER_REVIEW) {
      return (
        <Box fontSize={14} fontWeight="bold" sx={styles.statusBox}>
          {MANIPULATOR_STATUS.UNDER_REVIEW}
        </Box>
      );
    }
    return false;
  };

  return (
    <Box sx={styles.wrapper}>
      <Box
        sx={{
          ...styles.menuCardHeader,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: 'calc(100% - 58px)',
          }}
        >
          <Typography component={'h3'} noWrap={true} title={'DSDS'}>
            整体師太郎
          </Typography>
          <Box display="flex" alignItems="center" sx={styles.deleteBtn}>
            <DeleteIcon width={17} height={17} />
            <Typography ml={11}>削除</Typography>
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" pr={18} pt={26} pb={17}>
        <Box display="flex" mb={20} flexDirection="row">
          <Box width={90}>
            <Box sx={styles.avatarWrapper}>
              <Image
                src="/icons/default-avatar.svg"
                alt="Manipulator avatar"
                width={50}
                height={50}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            width="100%"
            mb={8}
            justifyContent="space-between"
            flexDirection="column"
          >
            <Box display="flex" justifyContent="space-between" width="100%">
              {renderStatus(MANIPULATOR_STATUS.UNDER_REVIEW)}
              <Box display="flex" alignItems="center">
                <Typography fontWeight="bold" pr={10} color="primary">
                  掲載再開
                </Typography>
                <SwitchIcon width={17} />
              </Box>
            </Box>

            <Box
              sx={{
                svg: { width: 18, height: 18, position: 'relative', top: 2 },
                mt: 10,
              }}
              display="flex"
              alignItems="center"
            >
              <Typography
                component="label"
                color="spanishOrange"
                fontWeight="600"
                fontSize="16px"
              >
                ★ 0
              </Typography>

              <Box
                ml={12}
                display="flex"
                alignItems="center"
                color="spanishOrange"
              >
                <IconReview />
                <Typography
                  color="spanishOrange"
                  fontWeight="600"
                  component="label"
                  fontSize="12px"
                  marginLeft={2}
                >
                  レビュー
                </Typography>
              </Box>
              <Typography
                color="grayText"
                fontWeight="600"
                component="label"
                marginLeft={7}
                fontSize="12px"
              >
                99件
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            sx={styles.updateScheduleBtn}
            endIcon={<ArrowRight />}
          >
            編集
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default ManipulatorCard;
