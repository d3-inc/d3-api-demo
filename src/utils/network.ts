import { defaultBaseApiPath } from '../config/apiConfig.js';

export const apiRequest = async ({
  endpoint,
  body,
  method = 'GET',
  headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}: {
  endpoint: string;
  body: BodyInit | null;
  method?: string;
  headers?: HeadersInit | null;
}) => {
  const apiKey = import.meta.env.VITE_D3_API_KEY;
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
  const basePath = apiEndpoint || defaultBaseApiPath;
  const absolutePath = basePath + endpoint;
  const requestHeaders = { ...headers, 'Api-Key': apiKey };

  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
    ...(method === 'POST' && body && { body }),
  };

  const response = await fetch(absolutePath, requestOptions);

  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage?.message || errorMessage?.error);
  }
  return await response.json();
};
