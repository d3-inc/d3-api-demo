import type { QueryKey, QueryObserverBaseResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { ApiErrorResponse } from '../types/api.js';
import { apiRequest } from '../utils/network.js';

type CustomQueryResult<ApiResponseType, ApiErrorType> = {
  data: ApiResponseType | undefined;
  error: ApiErrorType | null;
} & QueryObserverBaseResult<ApiResponseType, ApiErrorType>;

export const useFetchRequest = <ApiResponseType = unknown, ApiErrorType = ApiErrorResponse>({
  queryKey,
  endpoint,
  queryParameters = { staleTime: Infinity, retry: false, refetchOnWindowFocus: false },
  method = 'GET',
  requestBody = null,
}: {
  queryKey: QueryKey;
  endpoint: string;
  queryParameters?: object;
  method?: 'GET' | 'POST' | 'PUT' | 'UPDATE';
  requestBody?: unknown;
}): CustomQueryResult<ApiResponseType, ApiErrorType> => {
  const body = requestBody ? JSON.stringify(requestBody) : null;
  const { data, error, ...rest } = useQuery<ApiResponseType, ApiErrorType>({
    queryKey: [...queryKey],
    queryFn: async () => apiRequest({ endpoint, body, method }),
    ...queryParameters,
  });

  return { data, error, ...rest };
};
