import clsx from 'clsx';
import { CircleCheck, CircleXIcon } from 'lucide-react';
import type { SearchResult } from '../../types/api.js';
import { nameTokenFormatter } from '../../utils/nameTokens.js';
import { DomainPrice } from '../domain/domainPrice.js';
import { Card, CardContent } from '../ui/card.js';
import { ActionButtons } from './actionButtons.js';

export type SearchResultCardProps = {
  searchResult: SearchResult;
  handleCartAction: (searchResult: SearchResult) => void;
  isItemInCart: boolean;
  isCartLimitReached?: boolean;
};

export const SearchResultCard = ({
  searchResult,
  handleCartAction,
  isItemInCart,
  isCartLimitReached,
}: SearchResultCardProps) => {
  const isDomainAvailable = searchResult?.status?.toLowerCase() === 'available';

  return (
    <Card
      className={clsx(
        'drop-shadow-md border group w-full relative',
        isDomainAvailable && 'hover:shadow-md',
      )}
    >
      <CardContent className="grid px-3 py-2">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex-1 space-y-1">
            <p className="text-lg font-semibold text-left break-all">
              {nameTokenFormatter({ sld: searchResult.sld, tld: searchResult.tld, eoi: true })}
            </p>
            {isDomainAvailable ? (
              <p className="flex items-start gap-2">
                <span className="text-green-700">
                  <CircleCheck size={18} />
                </span>
                <span className="text-sm text-muted-foreground">Available</span>
              </p>
            ) : (
              <p className="flex items-start gap-2">
                <span className="text-red-500">
                  <CircleXIcon size={18} />
                </span>
                <span className="text-sm text-muted-foreground capitalize">
                  {searchResult?.status}
                </span>
              </p>
            )}
          </div>
          <DomainPrice domain={searchResult} isDomainLocked={!isDomainAvailable} />
          {isDomainAvailable ? (
            <ActionButtons
              isCartLimitReached={isCartLimitReached}
              isItemInCart={isItemInCart}
              searchResult={searchResult}
              handleCartAction={handleCartAction}
            />
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};
