import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Stack,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';
import { set } from 'lodash';
import resourceQuery from 'models/resource/query';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import type {
  Control,
  FieldValues,
  Path,
  UnPackAsyncDefaultValues,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import api from 'utils/api';
import Helper from 'utils/helpers';

import HelperText from '../HelperText';
import Label from '../Label';
import styles from '../styles';

const ImageCrop = dynamic(() => import('./ImageCrop'), { ssr: false });

interface UploadFieldProps<TFormValues extends FieldValues> {
  label?: string;
  required?: boolean;
  name: Path<UnPackAsyncDefaultValues<TFormValues>>;
  control: Control<TFormValues>;
  maxItems?: number;
  helperText?: string;
  isCycle?: boolean;
}

const readFile = (file: File) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });

const UploadAvatar = <TFormValues extends FieldValues>({
  name,
  control,
  maxItems = 1,
  label,
  required,
  helperText,
  isCycle = true,
}: UploadFieldProps<TFormValues>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const displayValue = useMemo(() => {
    if (maxItems === 1) {
      return value ? [value] : [];
    }
    return value || [];
  }, [maxItems, value]);

  const [imageSrc, setImageSrc] = useState<{
    base64: string;
    fileName: string;
    contentType: string;
  } | null>();
  const [loading, setLoading] = useState(false);

  const { mutateAsync: uploadImage } = useMutation(
    async (params: { file: File; isPublic: boolean }) => {
      const { data } = await api.get(resourceQuery.signUrl.apiUrl, {
        params: {
          isPublic: params.isPublic,
          fileName: params.file.name,
          contentType: params.file.type,
        },
      });
      const urlObj = new URL(data.url);
      const url = `${urlObj.origin}${urlObj.pathname}`;

      await axios.put(data.url, params.file, {
        headers: {
          'Content-Type': params.file.type,
        },
      });
      return { ...data, originUrl: url };
    },
  );
  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        if (!Helper.checkValidImage(file)) {
          return;
        }
        const imageDataUrl = await readFile(file);
        setImageSrc({
          base64: imageDataUrl as string,
          fileName: file.name,
          contentType: file.type,
        });
      }
    }
    set(e, 'target.value', null);
  };

  const handleRemoveImage = (image: { key: string; originUrl: string }) => {
    if (maxItems === 1) {
      onChange(undefined);
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

  const handleSave = ({ file }: { file: File; originUrl: string }) => {
    try {
      setImageSrc(null);
      setLoading(true);
      uploadImage(
        { file, isPublic: true },
        {
          onSuccess: (data) => {
            onChange(maxItems === 1 ? data : displayValue.concat(data));
          },
          onSettled: () => setLoading(false),
        },
      );
    } catch {
      setLoading(false);
    }
  };

  return (
    <div>
      {label && (
        <Label label={label} required={required} className="uploadFieldLabel" />
      )}
      <Stack direction="row" spacing={2}>
        {displayValue.map((image: { key: string; originUrl: string }) => (
          <motion.div
            key={image.key}
            layout
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 25,
            }}
          >
            <Box
              key={image.key}
              sx={isCycle ? styles.imageContainerCycle : styles.imageContainer}
            >
              <Image
                style={{ borderRadius: isCycle ? '50%' : 4 }}
                fill
                sizes="100vw"
                src={image.originUrl}
                alt=""
              />
              <Box
                sx={
                  isCycle
                    ? styles.overlayContainerCycle
                    : styles.overlayContainer
                }
              >
                <Box className="overlay" />
                <IconButton
                  onClick={() => handleRemoveImage(image)}
                  size="small"
                  disabled={loading}
                  className="delete-btn"
                >
                  {loading ? <CircularProgress size="small" /> : null}
                  {/* <TrashIcon /> */}
                </IconButton>
              </Box>
            </Box>
          </motion.div>
        ))}
        {displayValue.length < maxItems && (
          <motion.div
            key="add"
            layout
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 25,
            }}
          >
            <label htmlFor="avatar" style={{ position: 'relative' }}>
              <Avatar
                alt="avatar"
                sx={{
                  width: 136,
                  height: 136,
                  cursor: 'pointer',
                  bgcolor: 'backgroundColor',
                  boxShadow:
                    error?.message && !loading
                      ? '0 0 0 1px #db5a42, inset 0 0 0 1px #db5a42, inset 0 0 0 3px #fff'
                      : 'unset',
                  svg: {
                    color: '#A8B0B4',
                    width: 40,
                    height: 40,
                  },
                  borderRadius: isCycle ? '50%' : '4px',
                }}
              >
                {/* {!loading && <CameraIcon width="40px" />} */}
              </Avatar>
              {loading && (
                <CircularProgress
                  thickness={1}
                  color="primary"
                  size={40}
                  sx={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    margin: 'auto',
                  }}
                />
              )}
            </label>
            <Box sx={{ display: 'none' }}>
              <input
                type="file"
                id="avatar"
                name="avatar"
                disabled={loading}
                onChange={onFileChange}
                accept="image/*"
              />
            </Box>
          </motion.div>
        )}
        {!!imageSrc && (
          <ImageCrop
            image={imageSrc}
            handleClose={handleClose}
            width={300}
            height={300}
            borderRadius={isCycle ? 300 : 4}
            onSave={handleSave}
          />
        )}
      </Stack>
      <Box mt="21px">
        <HelperText helperText={helperText} error={error?.message} />
      </Box>
    </div>
  );
};

export default UploadAvatar;
