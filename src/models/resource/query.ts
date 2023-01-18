const resourceQuery = {
  general: {
    apiUrl: '/resources',
    queryKey: ['public', 'resource'],
    staleTime: Infinity,
    useUrlQuery: false,
  },
  signUrl: {
    apiUrl: '/media/signedUrlForPuttingObject',
  },
};

export default resourceQuery;
