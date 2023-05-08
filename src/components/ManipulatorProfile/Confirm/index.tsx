import ArrowLeft from "@icons/arrow-left.svg";
import ArrowRight from "@icons/arrow-right.svg";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
  TypographyProps,
} from "@mui/material";
import CommonSection from "components/CommonSection";
import { useFetch } from "hooks";
import type {
  ICommonDataSalon,
} from "models/resource/interface";
import resourceQuery from "models/resource/query";
import Image from "next/image";
import { FILTER_ITEMS, WEEKDAYS_WORK_TIME } from "utils/const";

import type { ManipulatorProfileValues } from "../Form/schema";
import styles from "./styles";
import { QUALIFICATION } from "utils/const";
import CollapseSection from "components/CollapseSection";

const FieldItem: React.FC<
  { label: string; children?: React.ReactNode } & TypographyProps
> = ({ label, children, ...props }) => {
  return (
    <Stack sx={styles.fieldItemWrapper}>
      <Typography className="label" color="black" fontWeight="bold" {...props}>
        {label}
      </Typography>
      {children}
    </Stack>
  );
};

interface ManipulatorProfileConfirmProps {
  data: ManipulatorProfileValues;
  handleConfirm?: () => void;
  confirmText?: string;
  handleCancel?: () => void;
  loading?: boolean;
}

const ManipulatorProfileConfirm: React.FC<ManipulatorProfileConfirmProps> = ({
  data,
  loading,
  handleConfirm,
  confirmText = "修正する",
  handleCancel,
}) => {
  const { data: response } = useFetch<ICommonDataSalon>(resourceQuery.general);

  const qualificationList =
    QUALIFICATION.filter((item) => data.qualification?.includes(item.id)) || [];

  console.log(data);
  const ItemSympthomComponent = ({
    item,
  }: {
    item: { label: string; _id: number };
  }) => {
    const sympthomData: any[] =
      response?.symptoms
        .filter(
          (ele) => ele.typeId === item._id && data?.symptoms?.includes(ele._id)
        )
        .map((ele) => {
          return {
            id: ele?._id,
            name: ele?.symptomName,
          };
        }) || [];

    if (sympthomData.length === 0) return null;

    return (
      <Box sx={styles.checkboxGroup} className="noSpacing borderBottom">
        <CollapseSection title={item.label}>
          <Grid container spacing={12}>
            {sympthomData.map((_item) => (
              <Grid item xs={6}>
                <Box display="flex" width="100%" sx={styles.checkboxArea}>
                  <FormControlLabel
                    sx={styles.checkboxContainer}
                    control={<Checkbox checked />}
                    label={
                      <Typography fontSize={16} m={0}>
                        {_item.name}
                      </Typography>
                    }
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </CollapseSection>
      </Box>
    );
  };

  return (
    <Stack alignItems="center" sx={styles.ManipulatorProfileConfirmWrapper}>
      <Stack sx={styles.sectionContentWrapper} gap={20}>
        <CommonSection title="整体院情報">
          <Stack display="flex" gap={20} py={20} width="100%">
            <Stack display="flex" justifyContent="center" alignItems={"center"}>
              <Box
                width={90}
                height={90}
                sx={styles.avatarWrapper}
                overflow={"hidden"}
                borderRadius={"90px"}
                border={"1px solid gray"}
              >
                <Image
                  width={90}
                  height={90}
                  src={
                    data?.avatar?.fileUrl ||
                    data?.avatar?.originUrl ||
                    "/icons/default-avatar.svg"
                  }
                  alt={
                    data?.avatar?.objectKey ||
                    data?.avatar?.key ||
                    "profile-avatar"
                  }
                />
              </Box>
            </Stack>
            <FieldItem label="氏名">
              <Typography>{data?.name}</Typography>
            </FieldItem>
            <FieldItem label="ふりがな">
              <Typography>{data?.nameKana}</Typography>
            </FieldItem>
            <FieldItem label="メールアドレス（ログインID）">
              <Typography>{data?.email}</Typography>
            </FieldItem>
            <Box display="flex" width="100%" sx={styles.checkboxArea}>
              <FormControlLabel
                sx={styles.checkboxContainer}
                control={
                  <Checkbox
                    checked={Boolean((data?.isRegister?.length || 0) > 0)}
                  />
                }
                label={
                  <Typography fontSize={16} m={0}>
                    アカウントを新規発行する
                  </Typography>
                }
              />
            </Box>
          </Stack>
        </CommonSection>

        <CommonSection title="営業時間">
          <Stack display="flex" gap={20} py={20} width="100%">
            <FieldItem label="従事開始">
              <Typography>{data?.engagement}年</Typography>
            </FieldItem>
            <FieldItem label="国家資格">
              <Grid container spacing={12}>
                {qualificationList.map((item) => (
                  <Grid item xs={3}>
                    <Box display="flex" width="100%" sx={styles.checkboxArea}>
                      <FormControlLabel
                        sx={styles.checkboxContainer}
                        control={<Checkbox checked />}
                        label={
                          <Typography fontSize={16} m={0}>
                            {item.name}
                          </Typography>
                        }
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </FieldItem>
            <FieldItem label="プロフィール">
              <Typography>{data?.description}</Typography>
            </FieldItem>
            <FieldItem label="PR">
              <Typography>{data?.pr}</Typography>
            </FieldItem>
            <FieldItem label="写真">
              <Stack className="photos">
                {data.photos?.map((photo) => (
                  <Box className="image-preview-wrapper">
                    <Box
                      position="relative"
                      key={photo?.objectKey || photo?.key}
                      className="image-preview-item"
                    >
                      <Image
                        sizes="100vw"
                        src={photo?.fileUrl || photo?.originUrl}
                        alt={photo?.objectKey || photo?.key}
                        fill
                        objectFit="contain"
                      />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </FieldItem>
          </Stack>
        </CommonSection>
        <CommonSection title="施術可能な症状">
          <Stack display="flex" gap={20} py={20} width="100%">
            <Box pb={15} width="100%">
              {FILTER_ITEMS.map((item) => (
                <ItemSympthomComponent key={item._id} item={item} />
              ))}
            </Box>
          </Stack>
        </CommonSection>
        <CommonSection title="勤務時間">
          <Stack display="flex" gap={20} py={20} width="100%">
            {data?.businessHours?.map((content, index) => {
              return (
                <Stack
                  key={`workday-${index}`}
                  direction="row"
                  gap={10}
                  sx={styles.workTimeItemWrapper}
                >
                  <Typography sx={styles.weekDayName}>
                    {WEEKDAYS_WORK_TIME[content.weekDay]?.name}
                  </Typography>
                  <Typography fontWeight={"bold"}>
                    {content.isHoliday
                      ? "休診日"
                      : content?.hours
                          ?.map(
                            (hour: any) => `${hour.startTime}～${hour.endTime}`
                          )
                          .join("\n")}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </CommonSection>
      </Stack>
      <Stack sx={styles.actionBtnGroup} gap={20} mt={40}>
        {handleConfirm && (
          <LoadingButton
            variant="contained"
            fullWidth
            endIcon={<ArrowRight />}
            onClick={handleConfirm}
            loading={loading}
          >
            {confirmText}
          </LoadingButton>
        )}
        {handleCancel && (
          <LoadingButton
            variant="outlined"
            fullWidth
            loading={loading}
            startIcon={<ArrowLeft />}
            onClick={handleCancel}
          >
            修正する
          </LoadingButton>
        )}
      </Stack>
    </Stack>
  );
};

export default ManipulatorProfileConfirm;
