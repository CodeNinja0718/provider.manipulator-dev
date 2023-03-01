import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, Typography } from '@mui/material';
import axios from 'axios';
import CommonSection from 'components/CommonSection';
import { CheckBox, TextField, Upload } from 'components/Form';
import { useFetch } from 'hooks';
import isEmpty from 'lodash/isEmpty';
import type { IFeatureItem } from 'models/resource/interface';
import resourceQuery from 'models/resource/query';
import { useMemo, useState } from 'react';
import type {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import helpers from 'utils/helpers';

import AccessField from './AccessField';
import AddressField from './AddressField';
import type { ProfileFormValues } from './schema';
import styles from './styles';

interface BasisInfoSectionProps {
  control: Control<ProfileFormValues>;
  watch: UseFormWatch<ProfileFormValues>;
  setValue: UseFormSetValue<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
}

const BasisInfoSection: React.FC<BasisInfoSectionProps> = ({
  control,
  setValue,
  errors,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: featureList } = useFetch<{ result: IFeatureItem[] }>(
    resourceQuery.features,
  );

  const watchZipCode = useWatch({ name: 'zipcode', control, defaultValue: '' });
  const watchEmail = useWatch({ name: 'email', control });

  const featureOptions = useMemo(
    () =>
      (featureList?.result || []).map((feature) => ({
        id: `${feature._id}`,
        name: feature.name,
      })),
    [featureList],
  );

  const handleSearchAddress = async () => {
    if (watchZipCode.length >= 7) {
      setLoading(true);
      const zipcode = helpers.toASCII(watchZipCode).replace(/[-〒]/g, '');
      await axios
        .get(
          `https://postal-codes-jp.azurewebsites.net/api/PostalCodes/${zipcode}`,
        )
        .then(({ data }) => {
          if (!isEmpty(data)) {
            setValue('address', data[0]?.name);
            setValue('city', data[0]?.city?.name);
          } else {
            helpers.toast("Coundn't found address based on postal code", {
              type: 'error',
              toastId: "Coundn't found address based on postal code",
            });
          }
        })
        .catch(() => {
          helpers.toast("Coundn't found address based on postal code", {
            type: 'error',
            toastId: "Coundn't found address based on postal code",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <CommonSection title="整体院情報">
      <Stack sx={styles.sectionContentWrapper}>
        <TextField
          label="整体院名"
          name="name"
          control={control}
          placeholder="〇〇整体院"
          required
        />
        <TextField
          label="ふりがな"
          name="nameKana"
          control={control}
          placeholder="〇〇せいたいいん"
          required
        />
        <TextField
          label="電話番号"
          name="phone"
          control={control}
          placeholder="09012345678"
          required
        />
        <Stack mb={20}>
          <Typography fontWeight="bold" mb={8}>
            メールアドレス
          </Typography>
          <Typography>{watchEmail}</Typography>
          <TextField
            name="email"
            control={control}
            formControlProps={{
              sx: { display: 'none' },
            }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" gap={20}>
          <TextField
            label="郵便番号"
            name="zipcode"
            control={control}
            placeholder="1000001"
            required
            formControlProps={{
              style: { maxWidth: 179 },
            }}
          />
          <LoadingButton
            variant="contained"
            size="small"
            sx={styles.addressSearchBtn}
            onClick={handleSearchAddress}
            loading={loading}
          >
            住所検索
          </LoadingButton>
        </Stack>
        <AddressField control={control} errors={errors} />
        <AccessField control={control} errors={errors} />
        <CheckBox
          label="特徴"
          name="features"
          control={control}
          data={featureOptions}
          layout="horizontal"
          columns={3}
        />
        <Upload label="写真" name="photos" control={control} />
        <TextField
          label="整体院について・注意事項"
          name="description"
          control={control}
          placeholder="自由にご記入ください"
          multiline
          rows={6}
        />
      </Stack>
    </CommonSection>
  );
};

export default BasisInfoSection;
