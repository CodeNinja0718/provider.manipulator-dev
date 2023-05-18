import ArrowRight from '@icons/arrow-right.svg';
import SwitchIcon from '@icons/icon_switch.svg';
import DeleteIcon from '@icons/icon_trashbox.svg';
import { Box, Button, Typography } from '@mui/material';
import type { IManipulator } from 'models/manipulator/interface';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MANIPULATOR_STATUS } from 'utils/const';

import styles from './styles';

interface ManipulatorCardProps {
  data: IManipulator;
}

const ManipulatorCard = ({ data }: ManipulatorCardProps) => {
  const router = useRouter();

  const handleManipulatorDetail = () => {
    const { pathname } = router;
    router.push(`${pathname}/${data?._id}`);
  };

  const avatarContent = data.photos.find((photo) => photo.type === 'avatar');
  let avatarUrl = `/icons/default-avatar.svg`;

  if (avatarContent) {
    avatarUrl = avatarContent.url
  }

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
            {data.nameKana}
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
                src={avatarUrl}
                alt="Manipulator avatar"
                width={50}
                height={50}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            width="100%"
            justifyContent="space-between"
            gap={20}
            alignItems="center"
            flexWrap="wrap"
          >
            <Box display="flex" gap={11}>
              <Box
                sx={styles.statusDoubleBox}
                className={
                  data.status === MANIPULATOR_STATUS.ACTIVE
                    ? 'active'
                    : 'unactive'
                }
              >
                <Box sx={styles.statusBoxItem} className="posting">
                  掲載中
                </Box>
                <Box sx={styles.statusBoxItem} className="stopped">
                  停止中
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={10}>
                <SwitchIcon width={17} />
                <Typography
                  fontSize={14}
                  fontWeight="bold"
                  pr={10}
                  color="primary"
                >
                  掲載再開
                </Typography>
              </Box>
            </Box>
            {/* <Box
              sx={{
                svg: { width: 18, height: 18, top: 2 },
              }}
              display="flex"
              alignItems="center"
            >
              <Typography
                component="label"
                color="spanishOrange"
                fontWeight="600"
                fontSize={16}
              >
                ★ 4.5
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
                fontWeight={900}
                component="label"
                marginLeft={7}
                fontSize={12}
              >
                999件
              </Typography>
            </Box> */}
            <Box fontSize={16} fontWeight="bold" sx={styles.statusBox}>
              審査中
            </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt={10}>
          <Button
            variant="contained"
            sx={styles.updateScheduleBtn}
            endIcon={<ArrowRight />}
            onClick={handleManipulatorDetail}
          >
            編集
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default ManipulatorCard;
