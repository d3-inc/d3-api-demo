import clsx from 'clsx';

import {
  currencyConfigForFractionDigits,
  MARKETPLACE_AMOUNT_FLOOR_LIMIT,
  numbersConfigForFractionDigits,
} from '../../config/constants.js';
import type { SearchResult } from '../../types/api.js';
import { currencyFormatter } from '../../utils/currency.js';
import { ThresholdFloorPrice } from './thresholdFloorPrice.js';

export interface DomainPriceProps {
  isDomainLocked: boolean;
  domain: SearchResult;
}

export const DomainPrice = ({ domain, isDomainLocked }: DomainPriceProps) => {
  const { usdPrice, nativeAmount } = domain || {};
  const convertedUsdPrice = Number(usdPrice);
  const convertedNativePrice = Number(nativeAmount);
  // In case of unavailable/locked domain, we don't need to show any pricing info
  // for that domain card
  if (isDomainLocked) {
    return (
      <div className={'flex items-end'}>
        <p className={'mb-0'}>Unavailable</p>
      </div>
    );
  }

  return (
    <div className={clsx('flex items-end flex-col')}>
      {convertedNativePrice ? (
        <>
          <strong>
            {convertedNativePrice < MARKETPLACE_AMOUNT_FLOOR_LIMIT ? (
              <ThresholdFloorPrice usdPrice={false} />
            ) : (
              <>
                <span className="notranslate">
                  {currencyFormatter({
                    amount: convertedNativePrice ?? 0,
                    config: numbersConfigForFractionDigits,
                    localeCode: navigator?.language,
                    showCompactPrice: true,
                  })}
                </span>
                <span>&nbsp;{domain?.nativeCurrency}</span>
              </>
            )}
          </strong>
          <span data-testid="card-buy-now-price" className={clsx('mb-0')}>
            {convertedUsdPrice < MARKETPLACE_AMOUNT_FLOOR_LIMIT ? (
              <ThresholdFloorPrice usdPrice />
            ) : (
              currencyFormatter({
                amount: convertedUsdPrice ?? 0,
                config: currencyConfigForFractionDigits,
                localeCode: navigator?.language,
                showCompactPrice: true,
              })
            )}
            <span>/yr</span>
          </span>
        </>
      ) : (
        <strong data-testid="card-buy-now-price" className={clsx('mb-0')}>
          <span>
            {convertedUsdPrice < MARKETPLACE_AMOUNT_FLOOR_LIMIT ? (
              <ThresholdFloorPrice usdPrice />
            ) : (
              currencyFormatter({
                amount: convertedUsdPrice ?? 0,
                config: currencyConfigForFractionDigits,
                localeCode: navigator?.language,
                showCompactPrice: true,
              })
            )}
            <span>/yr</span>
          </span>
        </strong>
      )}
    </div>
  );
};
