import { Stack, Typography } from '@mui/material';
import Layout from 'components/Layout';
import ManipulatorProfileConfirm from 'components/ManipulatorProfile/Confirm';
import ManipulatorProfile from 'components/ManipulatorProfile/Form';
import type { ManipulatorProfileValues } from 'components/ManipulatorProfile/Form/schema';
import dayjs from 'dayjs';
import { useFetch, useMutate } from 'hooks';
// import { useUser } from 'hooks';
import range from 'lodash/range';
import type { IManipulatorItem } from 'models/manipulator/interface';
import manipulatorQuery from 'models/manipulator/query';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { QUALIFICATION } from 'utils/const';

const ManipulatorRegisterPage = () => {
  const router = useRouter();
  const { confirm } = router.query;

  const manipulatorId = router?.query?.manipulatorId || '';

  const { data: detailData } = useFetch<IManipulatorItem>(
    manipulatorQuery.manipulatorDetail(manipulatorId),
  );

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

  useEffect(() => {
    if (detailData) {
      const {
        name,
        nameKana,
        email,
        photos,
        defaultShifts,
        careerStart,
        profile,
        pr,
        supportedSymptoms,
        nationalLicenses,
      } = detailData;

      const avatarContent = photos.find((photo) => photo.type === 'avatar');
      const photoContent = photos.filter((photo) => photo.type === 'pr');
      let avatar = null;
      const photoImages: any[] = [];

      if (avatarContent) {
        avatar = {
          url: avatarContent.url,
          fileUrl: avatarContent.url,
          originUrl: avatarContent.url,
          objectKey: avatarContent.objectKey,
          key: avatarContent.objectKey,
        };
      }

      if (photoContent.length > 0) {
        photoContent.forEach((photo) => {
          photoImages.push({
            url: photo.url,
            fileUrl: photo.url,
            originUrl: photo.url,
            objectKey: photo.objectKey,
            key: photo.objectKey,
          });
        });
      }

      const newValues: ManipulatorProfileValues = {
        name,
        nameKana,
        email,
        pr,
        avatar,
        engagement: Number(careerStart) || 0,
        symptoms: supportedSymptoms.map((item) => item.id),
        description: profile,
        qualification: nationalLicenses.map(
          (item) => QUALIFICATION.find((value) => value.name === item)?.id,
        ),
        businessHours: defaultShifts.map((item) => ({
          ...item,
          hours: item.hours.map((hour) => ({
            startTime: dayjs(hour.startTime).tz().format('HH:mm'),
            endTime: dayjs(hour.endTime).tz().format('HH:mm'),
          })),
        })),
        photos: photoImages,
        isRegister: ['confirm_register'],
      };
      setProfileData(newValues);
    }
  }, [detailData]);

  const showConfirmPage = (_values: ManipulatorProfileValues) => {
    setProfileData(_values);
    router.push(
      {
        pathname: `/my-page/manipulator/${manipulatorId}`,
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
      isRegister,
      ...rest
    } = profileData;

    const photoArray =
      photos?.map((photo) => ({
        type: 'pr',
        objectKey: photo.key,
      })) || [];

    if (avatar) {
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
        verifyEmail: (isRegister?.length || 0) > 0,
        manipulatorId,
      },
      {
        onSuccess: () => {
          router.push('/my-page/manipulator', undefined, {
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
                pathname: `/my-page/manipulator/${manipulatorId}`,
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
          isEditScreen={true}
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
