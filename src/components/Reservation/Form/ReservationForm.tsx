import ArrowLeft from '@icons/arrow-left.svg';
import ArrowRight from '@icons/arrow-right.svg';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack } from '@mui/material';
import BackButton from 'components/BackButton';
import type { ISalonInfo } from 'models/reservation/interface';
import { useRouter } from 'next/router';
import type { Control, UseFormSetValue } from 'react-hook-form';

import type { TreatmentFormValues } from '../ReservationTreatment/models/schema';
import styles from './styles';
import SwitchForm from './SwitchForm';

interface IReservationForm {
  isShowTreatment: string | any;
  isPaymentConfirmation: boolean;
  control: Control<TreatmentFormValues>;
  initialTreatmentValues: TreatmentFormValues;
  setValue: UseFormSetValue<TreatmentFormValues>;
  reservationData: ISalonInfo | TreatmentFormValues | any;
  onBackTreatmentForm: (value: TreatmentFormValues | any) => void;
  treatmentData?: TreatmentFormValues | any;
}

const ReservationForm = ({
  isShowTreatment,
  isPaymentConfirmation,
  control,
  initialTreatmentValues,
  reservationData,
  setValue,
  onBackTreatmentForm,
  treatmentData,
}: IReservationForm) => {
  const router = useRouter();
  /**
   * isShowTreatment: Show treatment form
   * isPaymentConfirmation: Show on Payment confirmation form
   */
  return (
    <>
      <Box mt={isShowTreatment ? 0 : 40} width="100%">
        {/* Customer Info */}
        <SwitchForm
          isShowTreatment={isShowTreatment}
          isPaymentConfirmation={isPaymentConfirmation}
          control={control}
          initialTreatmentValues={initialTreatmentValues}
          setValue={setValue}
          reservationData={reservationData}
        />
      </Box>

      <Stack
        spacing={20}
        mt={40}
        width="100%"
        direction="column"
        alignItems="center"
      >
        {isShowTreatment || isPaymentConfirmation ? (
          <LoadingButton
            size="medium"
            color="primary"
            variant="contained"
            type="submit"
            endIcon={<ArrowRight />}
            loadingPosition="end"
            sx={styles.submitBtn}
            onClick={() =>
              isPaymentConfirmation &&
              router.push('/my-page/reservation/complete-payment')
            }
          >
            確認する
          </LoadingButton>
        ) : (
          <Button
            variant="contained"
            endIcon={<ArrowRight />}
            sx={styles.button}
            onClick={() =>
              router.push(
                `/my-page/reservation/${router?.query?.reservationId}?isShowTreatment=true`,
              )
            }
          >
            完了報告する
          </Button>
        )}

        {isPaymentConfirmation && (
          <Button
            variant="outlined"
            startIcon={<ArrowLeft />}
            sx={styles.button}
            onClick={() => onBackTreatmentForm(treatmentData)}
          >
            修正する
          </Button>
        )}
      </Stack>

      {!isShowTreatment && (
        <Box textAlign={'center'} mb={30} mt={40}>
          <BackButton
            isHideArrow
            {...{ fontSize: 16, textDecoration: 'underline' }}
          />
        </Box>
      )}
    </>
  );
};
export default ReservationForm;
