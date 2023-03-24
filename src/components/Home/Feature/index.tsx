import IconClinic from '@icons/icon_clinic.svg';
import IconCustomerList from '@icons/icon_customer_list.svg';
import IconReview from '@icons/icon_review.svg';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';

import styles from './styles';

const Feature = () => {
  return (
    <Stack component="section" sx={styles.featureWrapper} alignItems="center">
      <Typography sx={styles.title} fontSize={28} color="#f2385e">
        他にもいろいろ
      </Typography>
      <Typography
        color="black"
        fontSize={{ xs: 24, tablet: 50 }}
        fontWeight="bold"
        pb={{ xs: 30, tablet: 46 }}
      >
        便利な機能
      </Typography>
      <Stack
        sx={styles.featureList}
        direction={{
          xs: 'column',
          tablet: 'row',
        }}
      >
        <Box sx={styles.featureItem}>
          <Stack direction="row" gap={20} mb={16}>
            <IconClinic />
            <Box>
              <Typography color="black" fontWeight="bold" fontSize={18}>
                特徴をアピール
              </Typography>
              <Typography color="black">
                整体院やスタッフの強みを アピールできる！
              </Typography>
            </Box>
          </Stack>
          <Typography color="secondary.main" fontWeight="bold" mb={10} mr={-6}>
            利便性をアイコン表示で分かりやすく！
          </Typography>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: {
                xs: 105,
                tablet: 99,
              },
            }}
          >
            <Image src="/images/function_img.webp" alt="Function img" fill />
          </Box>
          <Typography color="secondary.main" fontWeight="bold" mt={20} mb={10}>
            得意な施術を伝えられる！
          </Typography>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: {
                xs: 194,
                tablet: 183,
              },
            }}
          >
            <Image
              src="/images/function_img_course.webp"
              alt="Function img"
              fill
            />
          </Box>
        </Box>
        <Box sx={styles.featureItem}>
          <Stack direction="row" gap={20} mb={16}>
            <IconCustomerList />
            <Box>
              <Typography color="black" fontWeight="bold" fontSize={18}>
                顧客管理
              </Typography>
              <Typography color="black">
                来院履歴や施術内容を データでスタッフ全員に 共有できる！
              </Typography>
            </Box>
          </Stack>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: {
                xs: 355,
                tablet: 329,
              },
            }}
          >
            <Image
              src="/images/function_img_customer_data.webp"
              alt="Function img"
              fill
            />
          </Box>
        </Box>
        <Box sx={styles.featureItem}>
          <Stack direction="row" gap={20} mb={16}>
            <IconReview />
            <Box>
              <Typography color="black" fontWeight="bold" fontSize={18}>
                レビュー
              </Typography>
              <Typography color="black">
                患者さんの声を聞いて、 向上・改善に繋げられる！
              </Typography>
            </Box>
          </Stack>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: {
                xs: 267,
                tablet: 246,
              },
            }}
          >
            <Image
              src="/images/function_img_review.webp"
              alt="Function img"
              fill
            />
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Feature;
