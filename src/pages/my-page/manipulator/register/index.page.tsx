import { Stack, Typography } from '@mui/material';
import Layout from 'components/Layout';
import ManipulatorProfileConfirm from 'components/ManipulatorProfile/Confirm';
import ManipulatorProfile from 'components/ManipulatorProfile/Form';
import type { ManipulatorProfileValues } from 'components/ManipulatorProfile/Form/schema';
import dayjs from 'dayjs';
import { useMutate, useUser } from 'hooks';
// import { useUser } from 'hooks';
import range from 'lodash/range';
import manipulatorQuery from 'models/manipulator/query';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { QUALIFICATION } from 'utils/const';

const ManipulatorRegisterPage = () => {
  const { data } = useUser();
  const router = useRouter();
  const salonId = data?.salon[0]?.salonId || '';
  const { confirm } = router.query;
  const isConfirm = typeof confirm === 'string' && confirm === 'true';
  const { mutateAsync: handleUpdateManipulator, isLoading } = useMutate(
    manipulatorQuery.updateManipulator,
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

  const initialValues = {
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

  const [profileData, setProfileData] =
    useState<ManipulatorProfileValues>(initialValues);

  const showConfirmPage = (_values: ManipulatorProfileValues) => {
    console.log('_values', _values);
    setProfileData(_values);
    router.push(
      {
        pathname: '/my-page/manipulator/register',
        query: {
          confirm: 'true',
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
  };

  const handleConfirm = () => {
    const {
      avatar,
      symptoms,
      description,
      qualification,
      photos,
      businessHours,
      engagement,
      ...rest
    } = profileData;

    const photoArray =
      photos?.map((photo) => ({
        type: 'pr',
        objectKey: photo.key,
      })) || [];

    if(avatar) {
      photoArray.push({
        type: 'avatar',
        objectKey: avatar.key,
      });      
    }

    handleUpdateManipulator(
      {
        ...rest,
        careerStart: `${engagement}`,
        profile: description,
        supportedSymptoms: symptoms,
        nationalLicenses: qualification?.map(
          (item) => QUALIFICATION.find((value) => value.id === item)?.name,
        ),
        photos: photoArray,
        defaultShifts:
          businessHours?.map((businessHour) => ({
            ...businessHour,
            hours: businessHour.hours?.filter(
              ({ startTime, endTime }) => startTime && endTime,
            ),
          })) || [],
        verifyEmail: true,
        salonId,
      },
      {
        onSuccess: () => {
          router.push('/my-page/manipulator/complete', undefined, {
            shallow: true,
          });
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
        {isConfirm ? '整体師登録内容の確認' : '整体師登録'}
      </Typography>
      {isConfirm ? (
        <ManipulatorProfileConfirm
          handleConfirm={handleConfirm}
          handleCancel={() => {
            router.push(
              {
                pathname: '/my-page/manipulator/register',
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
          data={profileData}
          loading={isLoading}
        />
      ) : (
        <ManipulatorProfile
          initialValues={profileData}
          onSubmit={showConfirmPage}
        />
      )}
    </Stack>
  );
};

ManipulatorRegisterPage.getLayout = (page: React.ReactNode) => {
  return (
    <Layout isCardLayout withSideMenu>
      {page}
    </Layout>
  );
};

export default ManipulatorRegisterPage;
