import useGlobalState from 'hooks/useGlobalState';
import { isEmpty } from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import type { ConfirmModalProps } from './modal';

const ConfirmModal = dynamic(() => import('./modal'), { ssr: false });

const ConfirmModalContainer = () => {
  const { pathname } = useRouter();
  const { openConfirmModal, confirmModal, toggleConfirmModal } =
    useGlobalState();

  useEffect(() => {
    if (!isEmpty(confirmModal)) {
      const { closeOnNavigate = true } = confirmModal as ConfirmModalProps;
      if (closeOnNavigate) {
        toggleConfirmModal(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, toggleConfirmModal]);

  if (openConfirmModal) {
    const { onCancel, onConfirm } = confirmModal as ConfirmModalProps;
    const handleCancel = () => {
      if (onCancel) {
        onCancel();
      }
      toggleConfirmModal(false);
    };
    const handleConfirm = () => {
      if (onConfirm) {
        onConfirm();
      }
      toggleConfirmModal(false);
    };
    return (
      <ConfirmModal
        {...(confirmModal as ConfirmModalProps)}
        open={openConfirmModal}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    );
  }
  return null;
};

export default ConfirmModalContainer;
