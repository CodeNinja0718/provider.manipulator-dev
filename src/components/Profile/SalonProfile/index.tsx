import ArrowLeft from '@icons/arrow-left.svg';
import ArrowRight from '@icons/arrow-right.svg';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Stack, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import get from 'lodash/get';
import Image from 'next/image';
import React from 'react';
import { FEATURES_DATA, WEEKDAYS_WORK_TIME } from 'utils/const';

import type { ProfileFormValues } from '../Form/schema';
import styles from './styles';

const FieldItem: React.FC<{ label: string; children?: React.ReactNode }> = ({
  label,
  children,
}) => {
  return (
    <Stack sx={styles.fieldItemWrapper}>
      <Typography className="label" color="black" fontWeight="bold">
        {label}
      </Typography>
      {children}
    </Stack>
  );
};

const WorkTimeItem: React.FC<any> = ({ content }) => {
  return (
    <Stack
      key={content.weekDay}
      direction="row"
      alignItems="center"
      gap={8}
      sx={styles.workTimeItemWrapper}
    >
      <Typography sx={styles.weekDayName}>
        {WEEKDAYS_WORK_TIME[content.weekDay]?.name}
      </Typography>
      <Typography>
        {content.isHoliday
          ? '休診日'
          : content?.hours
              ?.map((hour: any) => `${hour.startTime}～${hour.endTime}`)
              .join('\n')}
      </Typography>
    </Stack>
  );
};

interface SalonProfileProps {
  data: ProfileFormValues;
  handleConfirm?: () => void;
  handleCancel?: () => void;
  loading?: boolean;
}

const SalonProfile: React.FC<SalonProfileProps> = ({
  data,
  loading,
  handleConfirm,
  handleCancel,
}) => {
  return (
    <Stack alignItems="center" sx={styles.salonProfileWrapper}>
      <CommonSection title="整体院情報">
        <Stack sx={styles.sectionContentWrapper} gap={20} py={20}>
          <FieldItem label="整体院名">
            <Typography>{data?.name}</Typography>
          </FieldItem>
          <FieldItem label="ふりがな">
            <Typography>{data?.nameKana}</Typography>
          </FieldItem>
          <FieldItem label="電話番号">
            <Typography>{data?.phone}</Typography>
          </FieldItem>
          <FieldItem label="メールアドレス">
            <Typography>{data?.email}</Typography>
          </FieldItem>
          <FieldItem label="住所">
            <Typography>
              〒{data?.zipcode?.slice(0, 3)}-{data?.zipcode.slice(3)} <br />
              東京都{data?.city} {data?.address}
            </Typography>
          </FieldItem>
          <FieldItem label="アクセス">
            <Typography>
              {data?.access?.map(({ value }) => value).join('\n')}
            </Typography>
          </FieldItem>
          <FieldItem label="特徴">
            <Stack direction="row" gap={5} flexWrap="wrap">
              {data?.features?.sort().map((value) => (
                <Image
                  key={value}
                  src={get(FEATURES_DATA[value], 'img', '')}
                  alt=""
                  width={80}
                  height={55}
                />
              ))}
            </Stack>
          </FieldItem>
          <FieldItem label="写真">
            <Stack>
              {data?.photos?.map((photo) => (
                <Box key={photo?.key} sx={styles.photoItemWrapper}>
                  <Image src={photo?.originUrl} alt="" fill sizes="50vw" />
                </Box>
              ))}
            </Stack>
          </FieldItem>
          <FieldItem label="整体院について・注意事項">
            <Typography>{data?.description}</Typography>
          </FieldItem>
        </Stack>
      </CommonSection>
      <CommonSection title="口座情報">
        <Stack sx={styles.sectionContentWrapper} py={20}>
          <Typography textAlign="center">
            {data?.bank?.bankName} {data?.branch?.branchName} <br />【
            {data?.bankInfo?.transferType === '0' ? '普通' : '当座'}】
            {data?.bankInfo?.accountNumber} <br />
            【名義人】{data?.bankInfo?.accountName}
          </Typography>
        </Stack>
      </CommonSection>
      <CommonSection title="営業時間">
        <Stack
          sx={styles.sectionContentWrapper}
          data-worktime={true}
          gap={{ tablet: 12 }}
          direction={{ xs: 'column', tablet: 'row' }}
        >
          <Stack
            flex={{
              xs: '1 1 100%',
              tablet: '0 1 calc(50% - 6px)',
            }}
          >
            {data?.businessHours?.slice(0, 4).map((content) => (
              <WorkTimeItem key={content.weekDay} content={content} />
            ))}
          </Stack>
          <Stack
            flex={{
              xs: '1 1 100%',
              tablet: '0 1 calc(50% - 6px)',
            }}
          >
            {data?.businessHours?.slice(4).map((content) => (
              <WorkTimeItem key={content.weekDay} content={content} />
            ))}
          </Stack>
        </Stack>
      </CommonSection>
      <Stack sx={styles.actionBtnGroup} gap={20} mt={40}>
        <LoadingButton
          variant="contained"
          fullWidth
          endIcon={<ArrowRight />}
          onClick={handleConfirm}
          loading={loading}
        >
          登録する
        </LoadingButton>
        <LoadingButton
          variant="outlined"
          fullWidth
          loading={loading}
          startIcon={<ArrowLeft />}
          onClick={handleCancel}
        >
          修正する
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default SalonProfile;
