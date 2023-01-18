import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Box,
  Breadcrumbs as MiuBreadcrumb,
  Container,
  Skeleton,
  Typography,
} from '@mui/material';
import { isUndefined } from 'lodash';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import { tabletDown } from 'styles/theme';

import styles from './styles';

const defaultBreadcrumbName: Record<string, string | ReactNode> = {};

const defaultBreadcrumbPath: Record<string, string> = {
  '/customer/my-page': '/customer/my-page/profile',
};

const convertBreadcrumb = (
  title: string | ReactNode,
  transformLabel?: Record<string, string | ReactNode>,
  breadcrumb?: Breadcrumb,
): React.ReactNode => {
  if (breadcrumb && defaultBreadcrumbName[breadcrumb.pathname]) {
    return defaultBreadcrumbName[breadcrumb.pathname];
  }
  if (breadcrumb && transformLabel && transformLabel[breadcrumb.pathname]) {
    return transformLabel[breadcrumb.pathname];
  }
  return title;
};

export interface Breadcrumb {
  breadcrumb: string;
  breadcrumbId: string;
  href: string;
  pathname: string;
}

export interface BreadcrumbsProps {
  omitRootLabel?: boolean;
  transformLabel?: Record<string, string | ReactNode>;
  omitIndexList?: Array<number> | undefined;
  containerStyle?: any | null;
  transformBreadcrumbPath?: Record<string, string>;
}

const Breadcrumbs = ({
  omitRootLabel,
  transformBreadcrumbPath,
  transformLabel,
  omitIndexList,
  containerStyle,
}: BreadcrumbsProps) => {
  const { isReady, query, asPath, pathname } = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Array<Breadcrumb> | null>(
    null,
  );

  useEffect(() => {
    if (isReady) {
      const queryObject = Object.keys(query).reduce(
        (obj: Record<string, string>, current) => {
          const object = { ...obj };
          object[current] = query[current] as string;
          return object;
        },
        {},
      );
      const linkPath = asPath.split('/');
      const linkPathname = pathname.split('/');
      linkPath.shift();
      linkPathname.shift();

      const breadcrumbArray = linkPathname.map((path, i) => {
        return {
          breadcrumbId: path,
          breadcrumb: queryObject[path] || path,
          pathname: `/${linkPathname.slice(0, i + 1).join('/')}`,
          href: `/${linkPath.slice(0, i + 1).join('/')}`,
        };
      });
      setBreadcrumbs(breadcrumbArray);
    }
  }, [asPath, isReady, pathname, query]);

  return (
    <Container
      maxWidth="lg"
      disableGutters
      sx={{
        p: 4,
        [tabletDown]: {
          p: 2,
        },
      }}
    >
      <Box>
        <MiuBreadcrumb
          sx={{ ...styles.breadcrumb, ...containerStyle }}
          aria-label="breadcrumbs"
          separator={<NavigateNextIcon />}
        >
          {!omitRootLabel && (
            <Link href="/">
              <Typography sx={styles.home}>TOP</Typography>
            </Link>
          )}
          {!breadcrumbs && (
            <Skeleton
              variant="text"
              sx={{ fontSize: { xs: 10, tablet: 18 } }}
              width={100}
            />
          )}
          {breadcrumbs &&
            breadcrumbs.length >= 1 &&
            breadcrumbs.map((breadcrumb, i) => {
              if (
                !breadcrumb ||
                breadcrumb.breadcrumb.length === 0 ||
                (omitIndexList &&
                  !isUndefined(omitIndexList.find((value) => value === i)))
              ) {
                return null;
              }
              if (breadcrumb.pathname === router.pathname) {
                return (
                  <Typography
                    sx={styles.inActiveItem}
                    key={breadcrumb.breadcrumbId}
                    className="line-clamp"
                  >
                    {convertBreadcrumb(
                      breadcrumb.breadcrumb,
                      transformLabel,
                      breadcrumb,
                    )}
                  </Typography>
                );
              }
              return (
                <Link
                  key={breadcrumb.breadcrumbId}
                  href={{
                    pathname:
                      (transformBreadcrumbPath &&
                        transformBreadcrumbPath[breadcrumb.href]) ||
                      defaultBreadcrumbPath[breadcrumb.href] ||
                      breadcrumb.href,
                  }}
                >
                  <Typography sx={styles.activeItem} className="line-clamp">
                    {convertBreadcrumb(
                      breadcrumb.breadcrumb,
                      transformLabel,
                      breadcrumb,
                    )}
                  </Typography>
                </Link>
              );
            })}
        </MiuBreadcrumb>
      </Box>
    </Container>
  );
};

export default Breadcrumbs;
