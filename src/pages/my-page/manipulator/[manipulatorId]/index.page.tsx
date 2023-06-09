import { Stack, Typography } from '@mui/material';
import Layout from 'components/Layout';
import ManipulatorProfileConfirm from 'components/ManipulatorProfile/Confirm';
import ManipulatorProfile from 'components/ManipulatorProfile/Form';
import type { ManipulatorProfileValues } from 'components/ManipulatorProfile/Form/schema';
import dayjs from 'dayjs';
import { useFetch, useMutate, useUser } from 'hooks';
import range from 'lodash/range';
import authQuery from 'models/auth/query';
import type { IManipulatorItem } from 'models/manipulator/interface';
import manipulatorQuery from 'models/manipulator/query';
import {
  convertManipulatorProfile,
  convertManipulatorProfileUpdate,
} from 'models/profile';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

interface PageProps {
  editMyProfile?: boolean;
}
const ManipulatorRegisterPage = ({ editMyProfile = false }: PageProps) => {
  const router = useRouter();
  const { confirm } = router.query;
  const { data: myProfile, refetch } = useUser();
  const manipulatorId = (router?.query?.manipulatorId || '') as string;

  const { data: detailData } = useFetch<IManipulatorItem>(
    manipulatorQuery.manipulatorDetail(manipulatorId),
  );

  const isConfirm = typeof confirm === 'string' && confirm === 'true';
  const { mutateAsync: updateManipulator, isLoading } = useMutate(
    manipulatorQuery.updateManipulator,
  );
  const { mutateAsync: updateMyProfile, isLoading: isLoadingUpdateMyProfile } =
    useMutate(authQuery.updateMyProfile);

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
    if (detailData && !editMyProfile) {
      const newValues = convertManipulatorProfile(detailData);
      setProfileData(newValues);
    } else if (editMyProfile && myProfile) {
      const myProfileData: IManipulatorItem = { ...(myProfile as any) };
      const newValues = convertManipulatorProfile(myProfileData);
      setProfileData(newValues);
    }
  }, [detailData, editMyProfile, myProfile]);

  const showConfirmPage = (_values: ManipulatorProfileValues) => {
    setProfileData(_values);
    if (!editMyProfile)
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
    else
      router.push(
        {
          pathname: `/my-page/profile/edit`,
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

  const handleUpdateManipulatorProfile = () => {
    const dataUpdate = convertManipulatorProfileUpdate(
      profileData,
      manipulatorId,
    );

    updateManipulator(dataUpdate, {
      onSuccess: () => {
        router.push('/my-page/manipulator', undefined, {
          shallow: true,
        });
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
    });
  };

  const handleUpdateMyProfile = () => {
    const dataUpdate = convertManipulatorProfileUpdate(
      profileData,
      myProfile?._id ?? '',
    );

    updateMyProfile(dataUpdate, {
      onSuccess: () => {
        refetch();
        router.push('/my-page/profile');
      },
    });
  };

  const handleConfirm = () => {
    if (!editMyProfile) handleUpdateManipulatorProfile();
    else handleUpdateMyProfile();
  };

  const handleBack = () => {
    router.back();
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
            if (!editMyProfile)
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
            else
              router.push(
                {
                  pathname: `/my-page/profile/edit`,
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
          loading={isLoading || isLoadingUpdateMyProfile}
        />
      ) : (
        <ManipulatorProfile
          initialValues={profileData}
          onSubmit={showConfirmPage}
          isEditScreen={true}
          onCancel={editMyProfile ? handleBack : undefined}
        />
      )}
    </Stack>
  );
};

ManipulatorRegisterPage.getLayout = (
  page: React.ReactNode,
  pageProps: PageProps,
) => {
  return (
    <Layout isCardLayout withSideMenu {...pageProps}>
      {page}
    </Layout>
  );
};

export default ManipulatorRegisterPage;
