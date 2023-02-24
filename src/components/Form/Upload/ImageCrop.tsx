import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Modal from 'components/ConfirmModal/modal';
import { useEffect, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

interface ImageCropProps {
  image: { base64: string; fileName: string; contentType: string };
  width?: number;
  height?: number;
  onSave: ({ file, originUrl }: { file: File; originUrl: string }) => void;
  borderRadius?: number;
  handleClose: () => void;
}

const ImageCrop = ({
  image,
  width,
  height,
  onSave,
  borderRadius,
  handleClose,
}: ImageCropProps) => {
  const [imageDimentions, setImageDimentions] = useState<{
    h: number;
    w: number;
  } | null>(null);
  const [scale, setScale] = useState<number>(1);
  const editor = useRef<AvatarEditor>(null);

  // used to generate original image dimentions for being able
  // to convert the percentage crop into correct x1, y1 and x2, y2 coords
  useEffect(() => {
    const img = new Image();
    // eslint-disable-next-line func-names
    img.onload = function () {
      setImageDimentions({ h: img.naturalWidth, w: img.naturalWidth });
    };
    img.src = image.base64;
  }, [image]);

  const handleSave = async () => {
    const coords: { x1?: number; y1?: number; x2?: number; y2?: number } = {};
    if (editor.current && imageDimentions) {
      const { h, w } = imageDimentions;
      const {
        x: Cx,
        y: Cy,
        height: Ch,
        width: Cw,
      } = editor.current.getCroppingRect();

      coords.x1 = w * Cx;
      coords.y1 = h * Cy;
      coords.x2 = coords.x1 + w * Cw;
      coords.y2 = coords.y1 + h * Ch;
    }

    const img = editor.current?.getImageScaledToCanvas().toDataURL();
    const responseBase64 = await fetch(img as RequestInfo);
    const blob = await responseBase64.blob();
    const file = new File([blob], image.fileName, { type: image.contentType });
    const url = window.URL.createObjectURL(file);
    onSave({ file, originUrl: url });
  };

  return (
    <Modal
      title="プロフィール画像を調整"
      open={!!image}
      onCancel={handleClose}
      onConfirm={handleSave}
      content={
        <Box>
          <Box display="flex" justifyContent="center">
            <AvatarEditor
              ref={editor}
              image={image.base64}
              border={0}
              width={width}
              height={height}
              scale={scale}
              borderRadius={borderRadius}
              crossOrigin="anonymous"
            />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop="16px"
            paddingRight={8}
          >
            <Typography>ズーム</Typography>
            <Slider
              color="secondary"
              name="scale"
              sx={{ flex: 1, ml: 20 }}
              onChange={(_, value) => {
                if (typeof value === 'number') {
                  setScale(value);
                }
              }}
              min={1}
              max={2}
              step={0.01}
              defaultValue={1}
            />
          </Box>
        </Box>
      }
    />
  );
};

export default ImageCrop;
