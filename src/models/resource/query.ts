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
    queryKey: ['public', 'banks', 'branches', params],
    staleTime: Infinity,
  }),
  prefectures: {
    apiUrl: '/salon/common-data/prefectures',
    queryKey: ['public', 'prefectures'],
    staleTime: Infinity,
  },
  prefectureAreas: (params: Record<string, unknown>) => ({
    apiUrl: `/salon/common-data/prefectures/${params.provinceId}/areas`,
    queryKey: ['public', 'prefectures', 'areas', params],
    staleTime: Infinity,
  }),
  features: {
    apiUrl: 'salon/common-data/features',
    queryKey: ['public', 'features'],
    staleTime: Infinity,
  },
  symptoms: {
    apiUrl: '/salon/common-data/symptoms',
    queryKey: ['public', 'symptoms'],
    staleTime: Infinity,
  },
  stations: {
    apiUrl: '/salon/common-data/lines',
    queryKey: ['public', 'stations'],
    staleTime: Infinity,
  },
  stationLines: (params: Record<string, unknown>) => ({
    apiUrl: `salon/common-data/lines/${params._id}/stations`,
    queryKey: ['public', 'stations', 'lines', params],
    staleTime: Infinity,
  }),
};

export default resourceQuery;
