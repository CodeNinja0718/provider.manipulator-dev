import ArrowLeft from '@icons/arrow-left.svg';
import { Box, CircularProgress, IconButton, Stack } from '@mui/material';
import CommonSection from 'components/CommonSection';
import { Select } from 'components/Form';
import CheckboxBase from 'components/Form/CheckBox/CheckboxBase';
import HelperText from 'components/Form/HelperText';
import Label from 'components/Form/Label';
import { useFetch } from 'hooks';
import type { IStationItem, ISymptomItem } from 'models/resource/interface';
import resourceQuery from 'models/resource/query';
import { useMemo, useState } from 'react';
import type {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';

import type { ProfileFormValues } from './schema';
import styles from './styles';

interface AreaStationSectionProps {
  control: Control<ProfileFormValues>;
  watch: UseFormWatch<ProfileFormValues>;
  setValue: UseFormSetValue<ProfileFormValues>;
  errors: FieldErrors<ProfileFormValues>;
  trigger: UseFormTrigger<ProfileFormValues>;
}

const AreaStationSection: React.FC<AreaStationSectionProps> = ({
  control,
  watch,
  setValue,
  errors,
  trigger,
}) => {
  const [selectedStation, setSelectedStation] = useState<number>();

  const watchStationIds = watch('stationIds', []);

  const { data: symptoms } = useFetch<{ result: ISymptomItem[] }>(
    resourceQuery.symptoms,
  );
  const { data: stations } = useFetch<{ result: IStationItem[] }>(
    resourceQuery.stations,
  );
  const { data: stationLines, isFetching: linesLoading } = useFetch<{
    result: IStationItem[];
  }>({
    ...resourceQuery.stationLines({
      _id: selectedStation,
    }),
    enabled: !!selectedStation,
  });

  const areaOptions = useMemo(
    () =>
      (symptoms?.result || []).map((symptom) => ({
        id: `${symptom._id}`,
        name: symptom.symptomName,
      })),
    [symptoms],
  );

  const handleCheckStation = (e: any) => {
    if (e.target.checked) {
      setValue('stationIds', [...watchStationIds, e.target.value]);
    } else {
      setValue(
        'stationIds',
        watchStationIds.filter((id) => id !== e.target.value),
      );
    }
    trigger('stationIds');
  };

  return (
    <CommonSection title="エリア/駅">
      <Stack sx={styles.sectionContentWrapper}>
        <Select
          label="エリア"
          required
          name="areaId"
          placeholder="エリア"
          control={control}
          data={areaOptions}
          formControlProps={{
            style: {
              maxWidth: 230,
            },
          }}
        />
        <Stack>
          <Label label="駅" required />
          <Stack sx={styles.stationCheckboxWrapper} direction="row">
            <Box sx={styles.checkboxSideContent}>
              {!!selectedStation && (
                <IconButton
                  className="back-btn"
                  onClick={() => {
                    setSelectedStation(undefined);
                    setValue('stationIds', []);
                  }}
                >
                  {linesLoading ? (
                    <CircularProgress size={16} />
                  ) : (
                    <ArrowLeft />
                  )}
                </IconButton>
              )}
            </Box>
            <Stack sx={styles.stationList}>
              {selectedStation
                ? (stationLines?.result || []).map((station) => (
                    <Box
                      component="label"
                      key={station._id}
                      sx={styles.stationItem}
                    >
                      <CheckboxBase
                        value={station._id}
                        checked={watchStationIds.includes(`${station._id}`)}
                        onChange={handleCheckStation}
                      />
                      {station.name}
                    </Box>
                  ))
                : (stations?.result || []).map((station) => (
                    <Box
                      component="label"
                      key={station._id}
                      sx={styles.stationItem}
                      onClick={() => {
                        setSelectedStation(station._id);
                      }}
                    >
                      {station.name}
                    </Box>
                  ))}
            </Stack>
          </Stack>
          <HelperText error={errors?.stationIds?.message} />
        </Stack>
      </Stack>
    </CommonSection>
  );
};

export default AreaStationSection;
