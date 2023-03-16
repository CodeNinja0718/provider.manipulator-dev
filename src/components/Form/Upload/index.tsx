import CloseIcon from '@icons/close.svg';
import AttachmentSvg from '@icons/icon_attachment.svg';
import PlusSvg from '@icons/icon_plus.svg';
import TrashBoxSvg from '@icons/icon_trashbox.svg';
import LoadingButton from '@mui/lab/LoadingButton';
import type { FormControlProps } from '@mui/material';
import { Box, FormControl, IconButton, Stack } from '@mui/material';
import axios from 'axios';
import { useMutate } from 'hooks';
import { set } from 'lodash';
import resourceQuery from 'models/resource/query';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { ACCEPT_FILE_TYPES, FILE_TYPES } from 'utils/const';
import Helper from 'utils/helpers';

import HelperText from '../HelperText';
import Label from '../Label';
import styles from '../styles';

const ImageCrop = dynamic(() => import('./ImageCrop'), { ssr: false });

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

const readFile = (file: File) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });

const Upload = <TFormValues extends FieldValues>({
  name,
  control,
  maxItems = 1,
  label,
  required,
  isAvatar = false,
  showError = true,
  fixedHelperText = true,
  formControlProps,
}: UploadFieldProps<TFormValues>) => {
  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [imageSrc, setImageSrc] = useState<{
    base64: string;
    fileName: string;
    contentType: string;
  } | null>();

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

  const handleRemoveImage = (image: { key: string; originUrl: string }) => {
    if (maxItems === 1) {
      onChange([]);
    } else {
      const newValue = value.filter(
        (item: { key: string; url: string }) => item.key !== image.key,
      );
      onChange(newValue);
    }
  };
  const handleClose = () => {
    setImageSrc(null);
  };

  const handleSave = ({ file }: { file: File }) => {
    try {
      setImageSrc(null);
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
              onChange(value.concat({ ...result[0], originUrl: url } as any));
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
        const isDocument = Helper.detectFileType(file);
        if (isDocument === FILE_TYPES.DOCUMENT) {
          if (Helper.checkValidDocument(file)) {
            handleSave({ file });
          }
        } else if (Helper.checkValidImage(file)) {
          const imageDataUrl = await readFile(file);
          if (isAvatar) {
            setImageSrc({
              base64: imageDataUrl as string,
              fileName: file.name,
              contentType: file.type,
            });
          } else {
            handleSave({ file });
          }
        }
      }
    }
    set(e, 'target.value', null);
  };

  const renderImagePreview = () => {
    const currentValue = Array.isArray(value) ? value : [value];
    return currentValue.map(
      (image: {
        key: string;
        originUrl: string;
        contentType: string;
        originalName: string;
        objectKey: string;
        fileUrl: string;
        name: string;
      }) => {
        const isDocument = Helper.detectFileType({
          type: image?.objectKey?.split('.')?.[1] || image?.contentType || '',
        });

        return isDocument === FILE_TYPES.DOCUMENT ? (
          <Box key={image.key} className="document-preview-item">
            <Box sx={{ display: 'inherit', alignItems: 'inherit' }}>
              <AttachmentSvg />
              <Link
                href={image?.originUrl || image?.fileUrl || '/'}
                target="_blank"
              >
                {image?.originalName || image?.name}
              </Link>
            </Box>
            <IconButton
              style={{
                pointerEvents: 'auto',
                padding: 0,
              }}
              onClick={() => handleRemoveImage(image)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        ) : (
          <Box className="image-preview-wrapper">
            <Box
              position="relative"
              key={image?.objectKey || image.key}
              className="image-preview-item"
            >
              <Image
                sizes="100vw"
                src={image?.fileUrl || image.originUrl}
                alt={image?.objectKey || image.key}
                fill
                objectFit="contain"
              />
              <IconButton
                onClick={() => handleRemoveImage(image)}
                size="small"
                disabled={loading}
                className="delete-btn"
              >
                <TrashBoxSvg />
              </IconButton>
            </Box>
          </Box>
        );
      },
    );
  };

  const renderUploadButton = () => {
    return (
      <LoadingButton
        loading={loading}
        variant="outlined"
        component="label"
        size="small"
        htmlFor={name}
        className="upload-btn"
      >
        <PlusSvg width={15} height={15} />
        追加する
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
      {label && <Label label={label} required={required} />}

      <Stack
        direction="column"
        gap={20}
        alignItems="center"
        sx={styles.upload}
        data-avatar-upload={isAvatar}
      >
        {renderImagePreview()}
        {value.length < maxItems && renderUploadButton()}
      </Stack>
      {!!imageSrc && (
        <ImageCrop
          image={imageSrc}
          handleClose={handleClose}
          width={285}
          height={285}
          onSave={handleSave}
        />
      )}

      {showError && (
        <HelperText error={error?.message} fixed={fixedHelperText} />
      )}
    </FormControl>
  );
};

export default Upload;
