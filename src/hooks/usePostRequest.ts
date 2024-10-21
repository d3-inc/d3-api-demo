import type { MutationKey, UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { ApiErrorResponse } from '../types/api.js';
import { apiRequest } from '../utils/network.js';

export const usePostRequest = <
  TData = unknown,
  TError = ApiErrorResponse,
  TVariables = void,
  TContext = unknown,
>({
  mutationKey,
  endpoint,
  queryParameters = { retry: 0 },
}: {
  mutationKey?: MutationKey;
  endpoint: string;
  queryParameters?: UseMutationOptions<TData, TError, TVariables, TContext>;
  binaryData?: boolean;
}) => {
  const mutationRes = useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (payload) =>
      apiRequest({ endpoint, body: JSON.stringify(payload), method: 'POST' }),
    mutationKey,
    ...queryParameters,
  });
  return { mutationRes };
};
