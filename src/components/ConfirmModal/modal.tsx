import ArrowRight from '@icons/arrow-right.svg';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import type {
  DialogActionsProps,
  DialogContentProps,
  DialogProps,
} from '@mui/material';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import useGlobalState from 'hooks/useGlobalState';
import type { ReactNode } from 'react';

import styles from './styles';

export interface ConfirmModalProps {
  open?: boolean;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  hideCancelButton?: boolean;
  dialogProps?: DialogProps;
  dialogContentProps?: DialogContentProps;
  dialogActionsProps?: DialogActionsProps;
  confirmLoading?: boolean;
  content: string | ReactNode;
  title?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  hideActions?: boolean;
  closeOnNavigate?: boolean;
}
const ConfirmModal = ({
  open = false,
  onClose,
  onCancel,
  onConfirm,
  hideCancelButton = false,
  dialogProps,
  dialogContentProps,
  dialogActionsProps,
  confirmLoading = false,
  content,
  title,
  confirmText = '確定',
  cancelText = 'キャンセル',
  hideActions = false,
}: ConfirmModalProps) => {
  const { setConfirmModal } = useGlobalState();

  return (
    <Dialog
      {...dialogProps}
      open={open}
      fullWidth
      scroll="paper"
      PaperProps={{
        sx: styles.paper,
      }}
      onClose={(_, reason) => {
        if (reason !== 'backdropClick') {
          if (onClose) {
            setConfirmModal({});
            onClose();
          }
        }
      }}
    >
      <DialogTitle sx={styles.title}>
        {title}
        <IconButton aria-label="close" onClick={onCancel} sx={styles.closeIcon}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={styles.contentWrapper} {...dialogContentProps}>
        {typeof content === 'string' ? (
          <DialogContentText sx={styles.contentTextOnly}>
            {content}
          </DialogContentText>
        ) : (
          content
        )}
      </DialogContent>
      {!hideActions && (
        <DialogActions sx={styles.actionWrapper} {...dialogActionsProps}>
          <LoadingButton
            fullWidth
            variant="contained"
            className="action-btn"
            loading={confirmLoading}
            size="small"
            onClick={onConfirm}
            endIcon={<ArrowRight />}
            loadingIndicator={
              <Stack direction="row" alignItems="center" gap={10}>
                <CircularProgress size={16} />
                <Typography>{confirmText}</Typography>
              </Stack>
            }
          >
            {confirmText}
          </LoadingButton>
          {!hideCancelButton && (
            <LoadingButton
              className="action-btn cancel-btn"
              onClick={onCancel}
              fullWidth
              size="small"
            >
              <CloseIcon />
              {cancelText}
            </LoadingButton>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ConfirmModal;
