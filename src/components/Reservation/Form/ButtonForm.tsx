import ArrowLeft from '@icons/arrow-left.svg';
import ArrowRight from '@icons/arrow-right.svg';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack } from '@mui/material';
import BackButton from 'components/BackButton';
import { useRouter } from 'next/router';
import { RESERVATION_STATUS } from 'utils/const';

import type { TreatmentFormValues } from '../ReservationTreatment/models/schema';
import styles from './styles';

interface IButtonForm {
  isShowTreatment: string | any;
  isPaymentConfirmation: boolean;
  disabled: boolean;
  treatmentData?: TreatmentFormValues | any;
  onBackTreatmentForm: (value: TreatmentFormValues | any) => void;
  onSubmit: () => void;
  isLoading: boolean;
  status: string;
}

const ButtonForm = ({
  isShowTreatment,
  isPaymentConfirmation,
  disabled,
  treatmentData,
  onBackTreatmentForm,
  onSubmit,
  isLoading,
  status,
}: IButtonForm) => {
  const router = useRouter();

  if (status === RESERVATION_STATUS.DONE) {
    return (
      <>
        <Stack
          spacing={20}
          mt={40}
          width="100%"
          direction="column"
          alignItems="center"
        >
          <Box textAlign={'center'} mb={30} mt={40}>
            <BackButton
              isHideArrow
              {...{ fontSize: 16, textDecoration: 'underline' }}
            />
          </Box>
        </Stack>
      </>
    );
  }

  return (
    <>
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
            disabled={disabled}
            loading={isPaymentConfirmation && isLoading}
            onClick={() => isPaymentConfirmation && onSubmit()}
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
            disabled={disabled}
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
export default ButtonForm;
