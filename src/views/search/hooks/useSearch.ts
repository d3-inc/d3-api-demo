import { useCallback, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { apiEndpoints, cacheKeys, PAGE_SIZE } from '../../../config/constants.js';
import { useFetchRequest } from '../../../hooks/useFetchRequest.js';
import { useStore } from '../../../state/store/index.js';
import type { SearchResultRequestResponse } from '../../../types/api.js';
import { getPartnerTld } from '../../../utils/nameTokens.js';

type SearchQueryParams = {
  sld: string;
  tld: string;
  skip: number;
  limit: number;
};
const widgetTlds = import.meta.env.VITE_TLDS;


export const useSearch = () => {
  const cart = useStore(useShallow((state) => state.cart));
  const setWidgetSettings = useStore(useCallback((state) => state.setWidgetSettings, []));
  const [searchQueryParams, setSearchQueryParams] = useState<SearchQueryParams>({
    sld: '',
    tld: '',
    skip: 0,
    limit: PAGE_SIZE,
  });

  const searchUrlWithParams = useMemo(() => {
    const searchParams = new URLSearchParams(
      Object.keys(searchQueryParams).map((item) => [
        item,
        searchQueryParams[item as keyof typeof searchQueryParams] as string,
      ]),
    ).toString();
    return `${apiEndpoints.search}?${searchParams}`;
  }, [searchQueryParams]);

  const {
    data: searchResults,
    isLoading,
    isError,
    error,
  } = useFetchRequest<SearchResultRequestResponse>({
    queryKey: [
      cacheKeys.fetchSearchResults,
      { sld: searchQueryParams.sld, tld: searchQueryParams.tld },
    ],
    endpoint: searchUrlWithParams,
    queryParameters: {
      enabled: Boolean(searchQueryParams?.sld),
      retry: 0,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  });

  const {
    data: recommendationsResults,
    isLoading: isRecommendationLoading,
    isError: isRecommendationError,
    error: recommendationRequestError,
  } = useFetchRequest<SearchResultRequestResponse['pageItems']>({
    queryKey: [
      cacheKeys.fetchRecommendations,
      { sld: searchQueryParams.sld, tld: searchQueryParams.tld },
    ],
    endpoint: apiEndpoints.recommendations,
    method: 'POST',
    requestBody: { slds: [searchQueryParams.sld], tlds: searchQueryParams.tld?.split(',') },
    queryParameters: {
      // We should only fetch recommendations when the flag is used in the widget config
      enabled: Boolean(searchQueryParams?.sld),
      retry: 0,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  });

  const handleSearchSubmit = (sld: string) => {
    const tld = getPartnerTld(widgetTlds);

    setSearchQueryParams((old) => ({
      ...old,
      sld,
      tld,
    }));
  };

  const handlePaymentMethods = useCallback(async () => {
    if (cart?.items?.length) {
      setWidgetSettings({
        isCartViewOpen: true,
      });
    }
  }, [setWidgetSettings, cart?.items]);

  return {
    searchQueryParams,
    searchResults,
    isLoading,
    isError,
    error,
    handleSearchSubmit,
    handlePaymentMethods,
    recommendationsResults,
    isRecommendationError,
    isRecommendationLoading,
    recommendationRequestError,
  };
};
