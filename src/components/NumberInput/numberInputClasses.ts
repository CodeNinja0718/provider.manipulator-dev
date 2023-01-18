import { generateUtilityClass, generateUtilityClasses } from '@mui/material';

export function getNumberInputUtilityClass(slot: string) {
  return generateUtilityClass('MuiNumberInput', slot);
}

export const numberInputClasses = generateUtilityClasses('MuiNumberInput', [
  'root',
]);
