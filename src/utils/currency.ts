import {
  currencyConfigForFractionDigits,
  numbersConfigForFractionDigits,
} from '../config/constants.js';

export type currencyConfigType = {
  style?: string;
  currency?: string;
  minimumFractionDigits: number;
  maximumFractionDigits: number;
};

// list of currency codes https://www.iban.com/currency-codes
export const currencyFormatter = ({
  amount,
  config,
  localeCode,
  shouldOverrideMinimumFraction = true,
  showCompactPrice = false,
}: {
  amount: number;
  config?: currencyConfigType;
  localeCode?: string;
  shouldOverrideMinimumFraction?: boolean;
  showCompactPrice?: boolean;
}) => {
  const notAvailableResponse = 'N/A';
  try {
    const convertedAmount = Number(amount);
    if (!convertedAmount || Number.isNaN(convertedAmount)) {
      return notAvailableResponse;
    }
    const locale = localeCode ?? navigator?.language;
    const updatedMinimumFractionDigits = Number.isInteger(convertedAmount) ? 0 : 2;
    const currencyConfig = {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
    };
    const defaultConfig = config ?? currencyConfig;
    const configOptions = {
      ...defaultConfig,
      ...(shouldOverrideMinimumFraction && { minimumFractionDigits: updatedMinimumFractionDigits }),
      ...(showCompactPrice && { notation: 'compact' }),
    };

    const formatter = new Intl.NumberFormat(locale, configOptions as Intl.NumberFormatOptions);
    const formattedParts = formatter.formatToParts(convertedAmount);

    if (showCompactPrice) {
      const usFormatter = new Intl.NumberFormat('en-US', configOptions as Intl.NumberFormatOptions);
      const usCompactPart = usFormatter
        .formatToParts(convertedAmount)
        .find((item) => item.type === 'compact');

      if (usCompactPart) {
        const compactIndex = formattedParts.findIndex((item) => item.type === 'compact');
        if (compactIndex !== -1) formattedParts[compactIndex] = usCompactPart;
      }
    }

    return formattedParts.map((part) => part.value).join('');
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return notAvailableResponse;
  }
};

// list of currency codes https://www.iban.com/currency-codes
export const formatBelowThresholdAmount = ({
  amount,
  localeCode,
  showCurrencySymbol = false,
}: {
  amount: number;
  localeCode?: string;
  showCurrencySymbol?: boolean;
}) => {
  try {
    const convertedAmount = Number(amount);
    const locale = localeCode ?? navigator?.language;
    const currencyConfig = showCurrencySymbol
      ? currencyConfigForFractionDigits
      : numbersConfigForFractionDigits;
    const configOptions = {
      ...currencyConfig,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    const formatter = new Intl.NumberFormat(locale, configOptions);
    return formatter.format(convertedAmount);
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);
    return 'N/A';
  }
};
