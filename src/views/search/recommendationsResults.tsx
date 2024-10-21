import { useMemo } from 'react';
import { SearchResultCard } from '../../components/search/searchResultCard.js';
import { Skeleton } from '../../components/ui/skeletonComponent.js';
import { useCart } from '../../hooks/useCart.js';
import type { ApiErrorResponse, SearchResultRequestResponse } from '../../types/api.js';
import { getFilteredRecommendations } from '../../utils/nameTokens';
import { cn } from '../../utils/twMerge.js';

type RecommendationsResultsProps = {
  isError: boolean;
  isLoading: boolean;
  error: ApiErrorResponse | null;
  recommendationsResults?: SearchResultRequestResponse['pageItems'];
  searchResults?: SearchResultRequestResponse['pageItems'];
  searchTerm?: string;
};

export function RecommendationsResults({
  isError,
  isLoading,
  error,
  recommendationsResults,
  searchTerm,
  searchResults,
}: RecommendationsResultsProps) {
  const { getIsItemInCart, handleAddToCart, handleRemoveFromCart, isCartLimitReached } = useCart();
  const filteredRecommendations = useMemo(() => {
    if (recommendationsResults && searchResults) {
      return getFilteredRecommendations(recommendationsResults, searchResults);
    }
    return null;
  }, [recommendationsResults, searchResults]);

  if (!searchTerm && !filteredRecommendations) return null;

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3 mt-2">
        <Skeleton className="h-[50px] w-50 rounded-xl" />
        <Skeleton className="h-[50px] w-50 rounded-xl" />
      </div>
    );
  }

  if (isError && error) {
    return (
      <div className="flex mt-2">
        <p className="text-xs text-red-600 mt-1 text-left">{error?.message}</p>
      </div>
    );
  }

  if (!filteredRecommendations?.length) {
    return (
      <div className="flex mt-2">
        <p className="text-sm mt-1 text-gray-800 text-left">
          No Recommendations found. Please try again with a different search
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className={cn('text-lg font-bold text-left')}>AI Recommended Results</h2>
      <div
        id="recommendations-results-container"
        className={cn('flex flex-col flex-grow gap-y-3 pb-2')}
      >
        {filteredRecommendations.slice(0, 20).map((searchResult) => {
          const isItemInCart = getIsItemInCart(searchResult);
          return (
            <SearchResultCard
              key={searchResult.tld + searchResult.sld}
              searchResult={searchResult}
              isItemInCart={!!isItemInCart}
              isCartLimitReached={isCartLimitReached}
              handleCartAction={() => {
                if (isItemInCart) {
                  handleRemoveFromCart(searchResult);
                  return;
                }
                handleAddToCart(searchResult);
              }}
            />
          );
        })}
      </div>
    </>
  );
}
