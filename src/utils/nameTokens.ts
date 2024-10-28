export const getPartnerTld = (tlds: string | string[]) => {
  const tld = typeof tlds === 'string' || Array.isArray(tlds) ? tlds.toString() : '';
  return tld;
};

export const nameTokenFormatter = (domain: {
  sld?: string | null;
  tld?: string | null;
  eoi: boolean;
}) => {
  if (!domain) {
    throw new Error('Name Token is not provided');
  }
  return `${domain.sld}${domain?.eoi ? '*' : '.'}${domain.tld}`;
};

export function formatWalletAddress(text = '', firstChunk = 4, lastChunk = 4) {
  if (typeof text === 'string' && text?.length > 10) {
    return `${text.slice(0, firstChunk)}...${text.slice(-lastChunk)}`;
  }
  return text;
}
