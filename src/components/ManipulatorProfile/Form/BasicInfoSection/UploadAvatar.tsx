import ArrowRight from '@icons/arrow-right.svg';
import LoadingButton from '@mui/lab/LoadingButton';
import type { FormControlProps } from '@mui/material';
import { Box, FormControl, Stack } from '@mui/material';
import axios from 'axios';
import { useMutate } from 'hooks';
import { set } from 'lodash';
import resourceQuery from 'models/resource/query';
import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { ACCEPT_FILE_TYPES } from 'utils/const';
import Helper from 'utils/helpers';

import styles from '../styles';

interface UploadFieldProps<TFormValues extends FieldValues> {
  label?: string;
  required?: boolean;
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  maxItems?: number;
  helperText?: string;
  isAvatar?: boolean;
  showError?: boolean;
  formControlProps?: FormControlProps;
  fixedHelperText?: boolean;
}

const UploadAvatar = <TFormValues extends FieldValues>({
  name,
  control,
  isAvatar = false,
  formControlProps,
}: UploadFieldProps<TFormValues>) => {
  const {
    field: { value = null, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const { mutateAsync: uploadImage } = useMutate<
    {
      signedUrls: {
        fileName: string;
        contentType: string;
        isPublic: boolean;
      }[];
    },
    {
      result: {
        key: string;
        url: string;
      }[];
    }
  >(resourceQuery.signUrl);
  const [loading, setLoading] = useState(false);

  const handleSave = ({ file }: { file: File }) => {
    try {
      setLoading(true);
      uploadImage(
        {
          signedUrls: [
            {
              contentType: file.type,
              fileName: file.name,
              isPublic: true,
            },
          ],
        },
        {
          onSuccess: async ({ result }) => {
            if (result[0]?.url) {
              const urlObj = new URL(result[0]?.url);
              const url = `${urlObj.origin}${urlObj.pathname}`;

              await axios.put(result[0]?.url, file, {
                headers: {
                  'Content-Type': file.type,
                },
              });
              onChange({ ...result[0], originUrl: url } as any);
            }
          },
          onSettled: () => setLoading(false),
        },
      );
    } catch {
      setLoading(false);
    }
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        if (Helper.checkValidImage(file)) {
          handleSave({ file });
        }
      }
    }
    set(e, 'target.value', null);
  };

  const renderImagePreview = () => {
    const image: {
      key: string;
      originUrl: string;
      contentType: string;
      originalName: string;
      objectKey: string;
      fileUrl: string;
      name: string;
    } = { ...(value as any) };
    return (
      <Box
        width={90}
        height={90}
        sx={styles.avatarWrapper}
        overflow={'hidden'}
        borderRadius={'90px'}
        border={'1px solid gray'}
      >
        {value ? (
          <Image
            width={90}
            height={90}
            src={image?.fileUrl || image.originUrl}
            alt={image?.objectKey || image.key}
          />
        ) : (
          <Image
            src="/icons/default-avatar.svg"
            alt="Manipulator avatar"
            width={90}
            height={90}
          />
        )}
      </Box>
    );
  };

  return (
    <FormControl
      fullWidth
      variant="standard"
      sx={styles.formControlWrapper}
      error={!!error}
      {...formControlProps}
    >
      <Stack
        pt={20}
        pb={15}
        direction="column"
        gap={30}
        alignItems="center"
        sx={styles.upload}
        data-avatar-upload={isAvatar}
      >
        {renderImagePreview()}
        <LoadingButton
          loading={loading}
          component="label"
          variant="contained"
          size="small"
          htmlFor={name}
          color="primary"
          endIcon={<ArrowRight />}
          sx={styles.button}
        >
          画像を設定する
          <input
            type="file"
            id={name}
            name={name}
            disabled={loading}
            onChange={onFileChange}
            accept={ACCEPT_FILE_TYPES}
            hidden
          />
        </LoadingButton>
      </Stack>
    </FormControl>
  );
};

export default UploadAvatar;
