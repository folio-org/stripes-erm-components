const mockErmComponents = {
  useTags: jest.fn().mockReturnValue({ data: { tags: [] } }),
  useBatchedFetch: jest.fn().mockReturnValue({ results: [], total: 0 }),
  useInfiniteFetch: jest.fn().mockReturnValue({
    infiniteQueryObject: {
      error: '',
      fetchNextPage: jest.fn(),
      isLoading: false,
      isError: false
    },
    results: [],
    total: 0
  }),
  useFileHandlers: jest.fn(() => ({
    handleDownloadFile: jest.fn(),
    handleUploadFile: jest.fn()
  })),
  useHandleSubmitSearch: jest.fn(() => ({
    handleSubmitSearch: jest.fn()
  })),
  useAsyncValidation: jest.fn(() => '')
};

export default mockErmComponents;
