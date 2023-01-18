import type { TabProps } from '@mui/material';
import { Tab } from '@mui/material';
import type { LinkProps } from 'next/link';

const LinkTab: React.ComponentType<TabProps & LinkProps> =
  Tab as React.ComponentType<TabProps & LinkProps>;

export default LinkTab;
