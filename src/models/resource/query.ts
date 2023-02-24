const resourceQuery = {
  general: {
    apiUrl: '/salon/common-data/all',
    queryKey: ['public', 'all-resource'],
    staleTime: Infinity,
  },
  signUrl: {
    apiUrl: '/media/common/signedUrlForPuttingObject',
  },
  banks: {
    apiUrl: '/salon/common-data/banks',
    queryKey: ['public', 'banks'],
    staleTime: Infinity,
  },
  bankBranches: (params: Record<string, unknown>) => ({
    apiUrl: `/salon/common-data/banks/${params.bankId}/branches`,
    queryKey: ['public', 'bank', 'branches', params],
    staleTime: Infinity,
  }),
  prefectures: {
    apiUrl: '/salon/common-data/prefectures',
    queryKey: ['public', 'prefectures'],
    staleTime: Infinity,
  },
  prefectureAreas: (params: Record<string, unknown>) => ({
    apiUrl: `/salon/common-data/prefectures/${params.provinceId}/areas`,
    queryKey: ['public', 'prefecture', 'areas', params],
    staleTime: Infinity,
  }),
  features: {
    apiUrl: 'salon/common-data/features',
    queryKey: ['public', 'features'],
    staleTime: Infinity,
  },
};

export default resourceQuery;
