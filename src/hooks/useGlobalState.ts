import type { ConfirmModalProps } from 'components/ConfirmModal/modal';
import { isEmpty } from 'lodash';
import create from 'zustand';

export interface GlobalState {
  openConfirmModal: boolean;
  toggleConfirmModal: (payload: boolean) => void;
  confirmModal: ConfirmModalProps | {};
  setConfirmModal: (payload: ConfirmModalProps | {}) => void;
}
const useGlobalState = create<GlobalState>((set) => ({
  openConfirmModal: false,
  toggleConfirmModal: (payload) => set({ openConfirmModal: payload }),
  confirmModal: {},
  setConfirmModal: (payload) =>
    set({ confirmModal: payload, openConfirmModal: !isEmpty(payload) }),
}));

export default useGlobalState;
