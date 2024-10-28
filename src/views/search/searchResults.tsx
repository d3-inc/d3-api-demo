import { SearchResultCard } from '../../components/search/searchResultCard.js';
import { Skeleton } from '../../components/ui/skeletonComponent.js';
import { useCart } from '../../hooks/useCart.js';
import type { ApiErrorResponse, SearchResultRequestResponse } from '../../types/api.js';
import { cn } from '../../utils/twMerge.js';

type SearchResultsProps = {
  isError: boolean;
  isLoading: boolean;
  error: ApiErrorResponse | null;
  searchResults?: SearchResultRequestResponse;
  searchTerm?: string;
};

export function SearchResults({
  isError,
  isLoading,
  error,
  searchResults,
  searchTerm,
}: SearchResultsProps) {
  const { getIsItemInCart, handleAddToCart, handleRemoveFromCart, isCartLimitReached } = useCart();
  if (!searchTerm && !searchResults) return null;

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[50px] w-50 rounded-xl" />
        <Skeleton className="h-[50px] w-50 rounded-xl" />
      </div>
    );
  }

  if (isError && error) {
    return (
      <div className="flex">
        <p className="text-xs text-red-600 mt-1 text-left">{error?.message}</p>
      </div>
    );
  }

  if (!searchResults?.pageItems?.length) {
    return (
      <div className="flex">
        <p className="text-sm mt-1 text-gray-800 text-left">
          No Search results found. Please try again with a different search
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className={cn('text-lg font-bold text-left mb-3')}>Search Results</h2>
      <div id="search-results-container" className={cn('flex flex-col flex-grow gap-y-4 pb-2')}>
        {searchResults.pageItems.map((searchResult) => {
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
