import type { ManipulatorProfileValues } from 'components/ManipulatorProfile/Form/schema';
import dayjs from 'dayjs';
import type { IManipulatorItem } from 'models/manipulator/interface';
import { QUALIFICATION } from 'utils/const';

export const convertManipulatorProfile = (detailData: IManipulatorItem) => {
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
    verifyEmail,
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
    isRegister: verifyEmail ? ['confirm_register'] : [],
  };

  return newValues;
};

export const convertManipulatorProfileUpdate = (
  profileData: ManipulatorProfileValues,
  manipulatorId: string,
) => {
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

  return {
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
  };
};
