import { Stack, Typography } from '@mui/material';
import Layout from 'components/Layout';
import ManipulatorProfileConfirm from 'components/ManipulatorProfile/Confirm';
import type { ManipulatorProfileValues } from 'components/ManipulatorProfile/Form/schema';
import CompleteProfileForm from 'components/Profile/Form';
import type { ProfileFormValues } from 'components/Profile/Form/schema';
import SalonProfile from 'components/Profile/SalonProfile';
import dayjs from 'dayjs';
import { useFetch, useMutate, useUser } from 'hooks';
import range from 'lodash/range';
import toString from 'lodash/toString';
import type { IManipulatorItem } from 'models/manipulator/interface';
import { convertManipulatorProfile } from 'models/profile';
import type { ISalonDetail } from 'models/salon/interface';
import salonQuery from 'models/salon/query';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { FEATURES_DATA } from 'utils/const';
import type { PageProps } from 'utils/type';

const ProfilePage = ({ isOwnerSsr }: PageProps) => {
  const { data } = useUser();
  const router = useRouter();
  const { editing } = router.query;
  const isEditting = typeof editing === 'string' && editing === 'true';
  const salonId = data?.salon[0]?.salonId || '';
  const { data: salonDetail, refetch } = useFetch<ISalonDetail>(
    salonQuery.getSalonDetail({ salonId, disabledToFetch: !isOwnerSsr }),
  );

  const { mutateAsync: handleUpdateSalon, isLoading } = useMutate(
    salonQuery.updateSalon,
  );

  const initBusinessHours = useMemo(
    () =>
      range(7).map((index) => ({
        weekDay: index,
        isHoliday: false,
        hours: [{ startTime: '09:00', endTime: '20:00' }],
      })),
    [],
  );

  const initialValuesManipulator = {
    avatar: null,
    name: '',
    nameKana: '',
    email: '',
    isRegister: [],
    businessHours: initBusinessHours,
    engagement: dayjs().year(),
    qualification: [],
    description: '',
    pr: '',
    photos: [],
    symptoms: [],
  };
  const [profileData, setProfileData] = useState<ManipulatorProfileValues>(
    initialValuesManipulator,
  );

  useEffect(() => {
    if (data && !isOwnerSsr) {
      const detailData: IManipulatorItem = { ...(data as any) };
      const newValues = convertManipulatorProfile(detailData);
      setProfileData(newValues);
    }
  }, [isOwnerSsr, data]);

  const initialValues: ProfileFormValues = useMemo(() => {
    const addresses = salonDetail?.addresses[0];
    return {
      name: salonDetail?.name || '',
      nameKana: salonDetail?.nameKana || '',
      phone: salonDetail?.phone || '',
      email: salonDetail?.email || '',
      zipcode: salonDetail?.zipcode || '',
      prefecture: toString(addresses?.prefectureId) || '',
      city: addresses?.city || '',
      address: addresses?.address || '',
      access: salonDetail?.access.map((text) => ({
        value: text,
      })) || [{ value: '' }],
      features: salonDetail?.features?.map((feature) => `${feature.id}`) || [],
      photos: salonDetail?.photos?.map((photo) => ({
        ...photo,
        originUrl: photo.url,
        key: photo.objectKey,
      })),
      description: salonDetail?.description || '',
      areaId: toString(addresses?.areaId) || '',
      stationSelected: toString(addresses?.lineId) || '',
      stationIds: addresses?.stationIds.map((id) => `${id}`) || [],
      bank: salonDetail
        ? {
            _id: salonDetail?.bankInfo.bankId,
            bankName: salonDetail?.bankInfo.bankName,
          }
        : null,
      branch: salonDetail
        ? {
            _id: salonDetail?.bankInfo.branchId,
            branchName: salonDetail?.bankInfo.branchName,
          }
        : null,
      bankInfo: {
        transferType: toString(salonDetail?.bankInfo.transferType) || '',
        accountNumber: salonDetail?.bankInfo.accountNumber || '',
        accountName: salonDetail?.bankInfo.accountName || '',
      },
      businessHours: salonDetail?.businessHours || initBusinessHours,
    };
  }, [salonDetail, initBusinessHours]);

  const handleSubmit = (values: ProfileFormValues) => {
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
    } = values;
    handleUpdateSalon(
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
        salonId: salonDetail?._id,
      },
      {
        onSuccess: () => {
          refetch();
          router.push('/my-page/profile', undefined, { shallow: true });
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        },
      },
    );
  };

  return (
    <Stack alignItems="center" p={{ xs: '45px 0 60px', tablet: '60px 0 78px' }}>
      <Typography variant="title" mb={55}>
        整体院情報
      </Typography>
      {isEditting ? (
        <CompleteProfileForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          handleCancel={() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            });
            router.push('/my-page/profile', undefined, { shallow: true });
          }}
          loading={isLoading}
        />
      ) : (
        <>
          {isOwnerSsr ? (
            <SalonProfile
              data={initialValues}
              handleConfirm={() => {
                router.push(
                  {
                    pathname: '/my-page/profile',
                    query: {
                      editing: 'true',
                    },
                  },
                  undefined,
                  {
                    shallow: true,
                  },
                );
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
            />
          ) : (
            data && (
              <ManipulatorProfileConfirm
                data={profileData}
                handleConfirm={() => router.push(`/my-page/profile/edit`)}
                confirmText="修正する"
              />
            )
          )}
        </>
      )}
    </Stack>
  );
};

ProfilePage.getLayout = (page: React.ReactNode, pageProps: PageProps) => {
  return (
    <Layout isCardLayout withSideMenu {...pageProps}>
      {page}
    </Layout>
  );
};

export default ProfilePage;
