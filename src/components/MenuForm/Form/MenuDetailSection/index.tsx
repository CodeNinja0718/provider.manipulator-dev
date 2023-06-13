import CheckedIcon from '@icons/checked.svg';
import UnCheckedIcon from '@icons/uncheck.svg';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import { CheckBox, Radio, Select, TextField } from 'components/Form';
import Label from 'components/Form/Label';
import NumberField from 'components/Form/NumberField';
import type { IMenuFormProps } from 'components/MenuForm/models/interface';
import styles from 'components/MenuForm/styles';
import { useWatch } from 'react-hook-form';
import {
  COUPON_EXPIRATION,
  MENU_INFO,
  MENU_STATUS_LIST,
  MENU_TYPE,
  UNIT,
} from 'utils/const';

const MenuDetailSection: React.FC<IMenuFormProps> = ({
  control,
  initialValues,
  timeDisplay,
  onSetTimeDisplay,
}) => {
  const isOneShotEnabled = (
    useWatch({ control, name: 'menuTypes' }) || []
  ).includes(MENU_TYPE[0]?.id);

  const isCouponEnabled = (
    useWatch({ control, name: 'menuTypes' }) || []
  ).includes(MENU_TYPE[1]?.id);

  return (
    <CommonSection title="メニュー詳細">
      <Box sx={styles.sectionItem}>
        <TextField
          label={MENU_INFO.NAME}
          name="name"
          control={control}
          placeholder="全身整体コース"
          required
          className="field"
        />
        <NumberField
          name="order"
          control={control}
          label={MENU_INFO.ORDER}
          showEndAdornment={true}
          required
          sx={styles.numberField}
        />
        <Box display="flex" alignItems="center" position="relative">
          <NumberField
            name="estimatedTime"
            control={control}
            label={MENU_INFO.ESTIMATED_TIME}
            showEndAdornment={true}
            required
            sx={styles.numberField}
            className="estimatedTimeLabel"
            unitLabel={
              <Typography sx={styles.unitLabel}>{UNIT.MINUTE}</Typography>
            }
          />
          <FormControlLabel
            className="checkboxControlWrapper"
            label={MENU_INFO.DISPLAY_TIME}
            control={
              <Checkbox
                icon={<UnCheckedIcon />}
                checkedIcon={<CheckedIcon />}
                checked={timeDisplay}
                onChange={(e) => onSetTimeDisplay(e.target.checked)}
              />
            }
          />
        </Box>
        <Box display="flex" width="100%" sx={styles.checkboxArea}>
          <CheckBox
            name="menuTypes"
            control={control}
            data={MENU_TYPE}
            layout="horizontal"
            spacing={10}
            label={MENU_INFO.MENU_TYPE}
            required
          />
        </Box>
        {isOneShotEnabled && (
          <NumberField
            name="price"
            control={control}
            label={MENU_INFO.PRICE}
            placeholder="6,000"
            showEndAdornment={false}
            required
            className="maxHeight maxWidth"
            sx={styles.numberField}
            unitLabel={
              <Typography sx={{ ...styles.unitLabel, ml: 12 }}>
                {UNIT.YEN}
              </Typography>
            }
          />
        )}
        {/* Field for Ticket/ Coupon */}
        {isCouponEnabled && (
          <Box display="flex" flexWrap="wrap">
            <Box
              display="flex"
              flexDirection="column"
              position="relative"
              mr={{
                xs: 0,
                mobile: 40,
              }}
            >
              <Box mb={10}>
                <Label label={MENU_INFO.COUPON_TIKET} required />
              </Box>
              <Box display="flex">
                <Box>
                  <NumberField
                    name="ticketMount"
                    control={control}
                    showEndAdornment={true}
                    className="maxHeight"
                    sx={styles.numberField}
                    unitLabel={
                      <Typography sx={{ ...styles.unitLabel, mx: 9 }}>
                        {UNIT.SHEET} ×
                      </Typography>
                    }
                  />
                </Box>

                <Box>
                  <NumberField
                    name="ticketPrice"
                    control={control}
                    placeholder="1枚あたりの料金"
                    required
                    className="maxHeight maxWidth"
                    sx={styles.numberField}
                    showEndAdornment={false}
                    unitLabel={
                      <Typography sx={{ ...styles.unitLabel, mx: 9 }}>
                        {UNIT.YEN}
                      </Typography>
                    }
                  />
                </Box>
              </Box>
            </Box>

            <Box>
              <Box mb={10}>
                <Label label={MENU_INFO.EXPIRATION_COUPON_DATE} required />
              </Box>
              <Box sx={styles.selectWrapper}>
                <Select
                  name="couponExpirationDate"
                  control={control}
                  data={COUPON_EXPIRATION}
                  clearable={false}
                  hideEmptyOption={true}
                  showError={false}
                  value={1}
                  formControlProps={{
                    style: {
                      maxWidth: 70,
                    },
                  }}
                  sx={{ maxHeight: 50 }}
                />
                <Typography sx={{ ...styles.unitLabel, mx: 9 }}>
                  {UNIT.MONTH}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        <Box display="flex" width="100%" sx={styles.checkboxArea}>
          <Radio
            name="status"
            defaultValue={initialValues.status}
            control={control}
            data={MENU_STATUS_LIST}
            label={MENU_INFO.PUBLISH_STATUS}
            className="customRadio"
            required
          />
        </Box>

        <Typography fontSize={14} pb={20}>
          ※「掲載する」を選んで登録すると、即座に掲載されお客様に見えるようになります。
          <br /> ※準備中の場合は「掲載しない」を選択してください。
        </Typography>
      </Box>
    </CommonSection>
  );
};

export default MenuDetailSection;
