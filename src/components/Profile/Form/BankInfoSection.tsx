import { Stack } from '@mui/material';
import CommonSection from 'components/CommonSection';
import { AutocompleteField, Select, TextField } from 'components/Form';
import { useFetch } from 'hooks';
import { isEmpty } from 'lodash';
import type { IBankBranchItem, IBankItem } from 'models/resource/interface';
import resourceQuery from 'models/resource/query';
import React, { useEffect } from 'react';
import type {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';

import type { ProfileFormValues } from './schema';
import styles from './styles';

interface BankInfoSectionProps {
  control: Control<ProfileFormValues>;
  watch: UseFormWatch<ProfileFormValues>;
  setValue: UseFormSetValue<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
}

const BankInfoSection: React.FC<BankInfoSectionProps> = ({
  control,
  setValue,
  watch,
}) => {
  const watchBank = watch('bank', undefined);

  const { data: bankList } = useFetch<{ result: IBankItem[] }>(
    resourceQuery.banks,
  );
  const { data: branchList, isFetching: branchLoading } = useFetch<{
    result: IBankBranchItem[];
  }>({
    ...resourceQuery.bankBranches({
      bankId: watchBank?._id,
    }),
    enabled: !isEmpty(watchBank),
  });

  useEffect(() => {
    setValue('branch', {});
  }, [setValue, watchBank]);

  return (
    <CommonSection title="口座情報">
      <Stack sx={styles.sectionContentWrapper}>
        <Stack direction="row" gap={12}>
          <AutocompleteField
            label="銀行"
            placerholder="〇〇銀行"
            required
            name="bank"
            control={control}
            options={bankList?.result || []}
            getOptionLabel={(option) => option.bankName ?? option}
            isOptionEqualToValue={(option, selected) =>
              selected._id === option._id || selected === option
            }
          />
          <AutocompleteField
            label="銀行"
            placerholder="〇〇銀行"
            required
            name="branch"
            control={control}
            options={branchList?.result || []}
            disabled={isEmpty(branchList)}
            getOptionLabel={(option) => option.branchName ?? option}
            isOptionEqualToValue={(option, selected) =>
              selected._id === option._id || selected === option
            }
            loading={branchLoading}
          />
        </Stack>
        <Stack direction="row" gap={12}>
          <Select
            label="預金種目"
            required
            name="bankInfo.transferType"
            control={control}
            placeholder="〇〇預金種目"
            data={[
              {
                name: '普通',
                id: '0',
              },
              {
                name: '当座',
                id: '1',
              },
            ]}
          />
          <TextField
            label="口座番号"
            name="bankInfo.accountName"
            control={control}
            placeholder="01234567"
            required
          />
        </Stack>
        <TextField
          label="名義"
          name="bankInfo.accountNumber"
          control={control}
          placeholder="〇〇整体院"
          required
        />
      </Stack>
    </CommonSection>
  );
};

export default BankInfoSection;
