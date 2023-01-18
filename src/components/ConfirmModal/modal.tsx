import LoadingButton from '@mui/lab/LoadingButton';
import type {
  Breakpoint,
  DialogActionsProps,
  DialogContentProps,
  DialogContentTextProps,
  DialogProps,
} from '@mui/material';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack,
  Typography,
} from '@mui/material';
import useGlobalState from 'hooks/useGlobalState';
import type { ReactNode } from 'react';

import styles from './styles';

export interface ConfirmModalProps {
  open?: boolean;
  maxWidth?: false | Breakpoint;
  onClose?: () => void;
  onCancel?: () => void;
  onConfirm?: () => void;
  hideCancelButton?: boolean;
  dialogProps?: DialogProps;
  dialogContentProps?: DialogContentProps;
  dialogContentTextProps?: DialogContentTextProps;
  dialogActionsProps?: DialogActionsProps;
  confirmLoading?: boolean;
  content: string | ReactNode;
  contentAlign?: 'right' | 'left' | 'inherit' | 'center' | 'justify';
  icon?: string;
  title?: string | ReactNode;
  confirmText?: string;
  cancelText?: string;
  hideActions?: boolean;
  closeOnNavigate?: boolean;
  buttonLayout?: string;
}
const ConfirmModal = ({
  open = false,
  maxWidth = 'card',
  onClose,
  onCancel,
  onConfirm,
  hideCancelButton = false,
  dialogProps,
  dialogContentProps,
  dialogContentTextProps,
  dialogActionsProps,
  confirmLoading = false,
  content,
  contentAlign = 'center',
  title,
  confirmText = 'OK',
  cancelText = 'Cancel',
  hideActions = false,
  buttonLayout = 'horizontal',
}: ConfirmModalProps) => {
  const { setConfirmModal } = useGlobalState();

  return (
    <Dialog
      {...dialogProps}
      open={open}
      maxWidth={maxWidth}
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
      <DialogContent
        className="confirm-dialog-content-container"
        {...dialogContentProps}
        sx={{ p: 0 }}
      >
        {title && <Typography sx={styles.title}>{title}</Typography>}

        <DialogContentText
          fontSize={{ xs: 12, tablet: 14 }}
          textAlign={contentAlign}
          whiteSpace="pre-line"
          color="text.primary"
          className="confirm-dialog_content"
          {...dialogContentTextProps}
        >
          {content}
        </DialogContentText>
      </DialogContent>
      {!hideActions && (
        <DialogActions
          className={`confirm-dialog_action ${buttonLayout}-button`}
          sx={styles.actionWrapper}
          {...dialogActionsProps}
        >
          {!hideCancelButton && (
            <LoadingButton
              variant="outlined"
              className="tabletStyle"
              onClick={onCancel}
              fullWidth
              sx={{ maxWidth: { tablet: '236px' } }}
            >
              {cancelText}
            </LoadingButton>
          )}
          <LoadingButton
            fullWidth
            variant="contained"
            className="tabletStyle"
            loading={confirmLoading}
            sx={{
              maxWidth: { tablet: hideCancelButton ? '368px' : '236px' },
            }}
            onClick={onConfirm}
            loadingIndicator={
              <Stack direction="row" alignItems="center">
                <CircularProgress size={16} sx={{ mr: 1 }} />
                <Typography>{confirmText}</Typography>
              </Stack>
            }
          >
            {confirmText}
          </LoadingButton>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ConfirmModal;
