import IconEarning from '@icons/icon_earning.svg';
import IconSchedule from '@icons/icon_schedule.svg';
import IconTicket from '@icons/icon_ticket.svg';
import CustomerIllust from '@icons/illust_customer.svg';
import ManipulatorIllust from '@icons/illust_manipulator.svg';
import CheckIcon from '@mui/icons-material/Check';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import styles from './styles';

const BenefitUsed = () => {
  return (
    <Box component="section" sx={styles.benefitUsedWrapper}>
      <Stack sx={styles.titleWrapper} alignItems="center">
        <Typography sx={styles.title} fontSize={28} color="#f2385e">
          気軽に使って
        </Typography>
        <Typography
          color="black"
          fontSize={{ xs: 24, tablet: 50 }}
          fontWeight="bold"
          pb={{ xs: 12, tablet: 41 }}
        >
          集客をもっと簡単に！
        </Typography>
        <ManipulatorIllust />
      </Stack>
      <Box sx={styles.benfefitContentWrapper}>
        <Stack
          sx={styles.benefitContentList}
          gap={20}
          direction={{ xs: 'column', tablet: 'row' }}
          flexWrap="wrap"
        >
          <Box sx={styles.benefitContentItem}>
            <IconSchedule className="item-logo" />
            <Stack gap={8}>
              <Typography
                className="title"
                fontSize={20}
                fontWeight="bold"
                color="black"
              >
                <span>空いている時間</span>に集客ができる！
              </Typography>
              <Typography color="black" sx={styles.checkNote}>
                <CheckIcon />
                新しい層の患者さんを獲得できる
              </Typography>
              <Typography color="black" sx={styles.checkNote}>
                <CheckIcon />
                スケジュール管理で、空き時間が分かりやすい
              </Typography>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: {
                    xs: 298,
                    tablet: 333,
                  },
                  height: {
                    xs: 202,
                    tablet: 180,
                  },
                  margin: 'auto',
                }}
              >
                <Image
                  src="/images/feature_schedule.webp"
                  alt="Feature schedule"
                  fill
                />
              </Box>
            </Stack>
          </Box>
          <Stack sx={styles.benefitContentCol} gap={20}>
            <Box sx={styles.benefitContentItem}>
              <IconEarning className="item-logo" />
              <Stack gap={8}>
                <Typography
                  className="title"
                  fontSize={20}
                  fontWeight="bold"
                  color="black"
                >
                  <span>完全成果報酬型</span>で安心！
                </Typography>
                <Typography color="black" sx={styles.checkNote}>
                  <CheckIcon />
                  月ごとの売上を自動でリスト化
                </Typography>
                <Typography color="black" sx={styles.checkNote}>
                  <CheckIcon />
                  直前のキャンセルでも保証で安心
                </Typography>
              </Stack>
            </Box>
            <Box sx={styles.benefitContentItem}>
              <IconTicket className="item-logo" />
              <Stack gap={8}>
                <Typography
                  className="title"
                  fontSize={20}
                  fontWeight="bold"
                  color="black"
                >
                  <span style={{ display: 'block' }}>デジタル回数券で</span>
                  リピーター化を後押し！
                </Typography>
                <Typography color="black" sx={styles.checkNote}>
                  <CheckIcon />
                  自動で患者さんにアプローチして リピーター化を促進
                </Typography>
              </Stack>
              <CustomerIllust className="customer-icon" />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default BenefitUsed;
