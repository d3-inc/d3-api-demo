import { formatBelowThresholdAmount } from '../../utils/currency.js';

export const ThresholdFloorPrice = ({ usdPrice }: { usdPrice: boolean }) => {
  if (usdPrice) {
    return (
      <span>
        {'< '}
        {formatBelowThresholdAmount({
          amount: 0.01,
          localeCode: navigator?.language,
          showCurrencySymbol: true,
        })}
      </span>
    );
  }

  return (
    <>
      {'<'}
      <span className="notranslate">
        {formatBelowThresholdAmount({
          amount: 0.01,
          localeCode: navigator?.language,
          showCurrencySymbol: usdPrice,
        })}
      </span>
    </>
  );
};
