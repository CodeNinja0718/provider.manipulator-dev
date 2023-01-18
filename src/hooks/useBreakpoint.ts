import type { Breakpoint } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const useBreakpoint = (options: { breakpoint?: number | Breakpoint }) => {
  const { breakpoint = 'tablet' } = options;
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down(breakpoint));
};

export default useBreakpoint;
