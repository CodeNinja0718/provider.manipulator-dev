import AttachmentSvg from '@icons/icon_attachment.svg';
import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import React from 'react';

import styles from './styles';

interface ITreatmentDetail {}

const TreatmentDetail: React.FC<ITreatmentDetail> = () => {
  return (
    <Stack spacing={18} mt={20}>
      <Divider flexItem />
      <Box>
        <Typography sx={styles.label}>
          ファイル添付（カルテ・施術メモなど）
        </Typography>
        <Link sx={styles.attachment}>
          <AttachmentSvg /> 山田様カルテ221107.pdf
        </Link>
      </Box>
      <Box>
        <Typography sx={styles.label}>詳細（症状・施術内容など）</Typography>
        <Typography fontSize={16}>
          テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト
        </Typography>
      </Box>
    </Stack>
  );
};
export default TreatmentDetail;
