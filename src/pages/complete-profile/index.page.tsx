import { Stack, Typography } from '@mui/material';
import Layout from 'components/Layout';
import CompleteProfileForm from 'components/Profile/Form';
import type { ProfileFormValues } from 'components/Profile/Form/schema';
import SalonProfile from 'components/Profile/SalonProfile';
import { useMutate, useUser } from 'hooks';
import get from 'lodash/get';
import range from 'lodash/range';
import salonQuery from 'models/salon/query';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { FEATURES_DATA } from 'utils/const';

const CompleteProfilePage = () => {
  const router = useRouter();
  const { data, refetch } = useUser();
  const { mutateAsync: handleCreateSalon, isLoading } = useMutate(
    salonQuery.createSalon,
  );

  const [previewData, setPreviewData] = useState<ProfileFormValues | null>(
    null,
  );
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    router.events.on('beforeHistoryChange', () => false);
    return () => {
      router.events.off('beforeHistoryChange', () => false);
    };
  }, [router.events]);

  const initBusinessHours = useMemo(
    () =>
      range(7).map((index) => ({
        weekDay: index,
        isHoliday: false,
        hours: [{ startTime: '09:00', endTime: '20:00' }],
      })),
    [],
  );

  const handleSubmit = (values: ProfileFormValues) => {
    setPreview(true);
    setPreviewData(values);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleCreateProfile = () => {
    if (previewData) {
      const {
        bank,
        branch,
        bankInfo,
        photos,
        features,
        access,
        prefecture,
        city,
        address,
        areaId,
        stationIds,
        zipcode,
        businessHours,
        ...rest
      } = previewData;
      handleCreateSalon(
        {
          ...rest,
          zipcode: zipcode.replace(/[〒-－]/g, ''),
          access: access.map(({ value }: { value: string }) => value),
          bankInfo: {
            ...bankInfo,
            bankId: bank._id,
            bankName: bank.bankName,
            branchId: branch._id,
            branchName: branch.branchName,
            transferType: Number(bankInfo.transferType),
          },
          photos: photos?.map((photo) => ({
            type: 'default',
            objectKey: photo.key,
          })),
          features: features?.map((value) => ({
            id: Number(value),
            name: FEATURES_DATA[value]?.label,
          })),
          addresses: [
            {
              areaId: Number(areaId),
              stationIds: stationIds.map((id) => Number(id)),
              prefectureId: Number(prefecture),
              prefectureName: '東京都',
              city,
              address,
            },
          ],
          businessHours: businessHours.map((businessHour) => ({
            ...businessHour,
            hours: businessHour.hours?.filter(
              ({ startTime, endTime }) => startTime && endTime,
            ),
          })),
        },
        {
          onSuccess: async () => {
            router.push('/register/complete');
          },
        },
      );
    }
  };

  const handleOnBack = () => {
    setPreview(false);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Stack alignItems="center" p={{ xs: '45px 0 60px', tablet: '60px 0 78px' }}>
      <Typography variant="title" mb={55}>
        整体院情報登録
      </Typography>
      {preview && previewData ? (
        <SalonProfile
          data={previewData}
          handleConfirm={handleCreateProfile}
          handleCancel={handleOnBack}
          loading={isLoading}
        />
      ) : (
        <CompleteProfileForm
          initialValues={{
            name: get(previewData, 'name', ''),
            nameKana: get(previewData, 'nameKana', ''),
            phone: get(previewData, 'phone', ''),
            email: data?.email || '',
            zipcode: get(previewData, 'zipcode', ''),
            prefecture: get(previewData, 'prefecture', '1'),
            address: get(previewData, 'address', ''),
            city: get(previewData, 'city', ''),
            access: get(previewData, 'access', [{ value: '' }]),
            features: get(previewData, 'features', []),
            description: get(previewData, 'description', ''),
            photos: get(previewData, 'photos', []),
            areaId: get(previewData, 'areaId', ''),
            stationSelected: get(previewData, 'stationSelected', ''),
            stationIds: get(previewData, 'stationIds', []),
            bank: get(previewData, 'bank', null) as any,
            branch: get(previewData, 'branch', null) as any,
            bankInfo: {
              transferType: get(previewData, 'bankInfo.transferType', ''),
              accountNumber: get(previewData, 'bankInfo.accountNumber', ''),
              accountName: get(previewData, 'bankInfo.accountName', ''),
            },
            businessHours: get(previewData, 'businessHours', initBusinessHours),
          }}
          onSubmit={handleSubmit}
        />
      )}
    </Stack>
  );
};

CompleteProfilePage.getLayout = (page: React.ReactNode) => {
  return <Layout isCardLayout>{page}</Layout>;
};

export default CompleteProfilePage;
