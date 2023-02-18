import CheckedIcon from '@icons/checked.svg';
import UnCheckedIcon from '@icons/uncheck.svg';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import CommonSection from 'components/CommonSection';
import { CheckBox, Radio, TextField } from 'components/Form';
import Label from 'components/Form/Label';
import NumberField from 'components/Form/NumberField';
import type { IMenuDetailProps } from 'components/RegisterMenu/models/interface';
import styles from 'components/RegisterMenu/styles';
import { MENU_STATUS_LIST, MENU_TYPE } from 'utils/const';

const MenuDetailSection: React.FC<IMenuDetailProps> = ({
  control,
  initialValues,
  timeDisplay,
  onSetTimeDisplay,
}) => {
  return (
    <CommonSection title="メニュー詳細">
      <Box sx={styles.sectionItem}>
        <TextField
          label="メニュー名"
          name="name"
          control={control}
          placeholder="全身整体コース"
          required
          className="field"
        />
        <NumberField
          name="order"
          control={control}
          label="メニュー名"
          showEndAdornment={true}
          required
          sx={styles.numberField}
        />
        <Box display="flex" alignItems="center" position="relative">
          <NumberField
            name="estimatedTime"
            control={control}
            label="目安時間"
            showEndAdornment={true}
            required
            sx={styles.numberField}
            className="estimatedTimeLabel"
            unitLabel={<Typography sx={styles.unitLabel}>分</Typography>}
          />
          <FormControlLabel
            className="checkboxControlWrapper"
            label="表示しない"
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
            label="メニュー種別"
            required
          />
        </Box>
        <NumberField
          name="price"
          control={control}
          label="単発料金"
          placeholder="6,000"
          showEndAdornment={false}
          required
          className="maxHeight maxWidth"
          sx={styles.numberField}
          unitLabel={
            <Typography sx={{ ...styles.unitLabel, ml: 12 }}>円</Typography>
          }
        />

        <Box display="flex">
          <Box
            display="flex"
            flexDirection="column"
            position="relative"
            mr={40}
          >
            <Box mb={10}>
              <Label label="回数券料金" required />
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
                      枚 ×
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
                      円
                    </Typography>
                  }
                />
              </Box>
            </Box>
          </Box>

          <Box>
            <Box mb={10}>
              <Label label="回数券の有効期限" required />
            </Box>
            <Box>
              <NumberField
                name="couponExpirationDate"
                control={control}
                showEndAdornment={true}
                className="maxHeight"
                sx={styles.numberField}
                unitLabel={
                  <Typography sx={{ ...styles.unitLabel, mx: 9 }}>
                    ヶ月
                  </Typography>
                }
              />
            </Box>
          </Box>
        </Box>

        <Box display="flex" width="100%" sx={styles.checkboxArea}>
          <Radio
            name="status"
            defaultValue={initialValues.status}
            control={control}
            data={MENU_STATUS_LIST}
            label="掲載状況"
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
