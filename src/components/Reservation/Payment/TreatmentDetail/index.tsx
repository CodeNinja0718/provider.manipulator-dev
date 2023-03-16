import AttachmentSvg from '@icons/icon_attachment.svg';
import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import type { TreatmentFormValues } from 'components/Reservation/ReservationTreatment/models/schema';
import React from 'react';

import styles from './styles';

interface ITreatmentDetail {
  initialTreatmentValues: TreatmentFormValues;
}

const TreatmentDetail: React.FC<ITreatmentDetail> = ({
  initialTreatmentValues,
}) => {
  const file = initialTreatmentValues?.treatmentFile?.[0];

  return (
    <Stack spacing={18} mt={20}>
      {!!file && !!initialTreatmentValues?.treatmentInfo ? (
        <></>
      ) : (
        <Divider flexItem />
      )}
      {file ? (
        <Box>
          <Typography sx={styles.label}>
            ファイル添付（カルテ・施術メモなど）
          </Typography>
          <Link sx={styles.attachment} href={file?.originUrl} target="_blank">
            <AttachmentSvg /> {file?.originalName}
          </Link>
        </Box>
      ) : (
        <></>
      )}
      {initialTreatmentValues?.treatmentInfo ? (
        <Box>
          <Typography sx={styles.label}>詳細（症状・施術内容など）</Typography>
          <Typography fontSize={16}>
            {initialTreatmentValues?.treatmentInfo}
          </Typography>
        </Box>
      ) : (
        <></>
      )}
    </Stack>
  );
};
export default TreatmentDetail;
