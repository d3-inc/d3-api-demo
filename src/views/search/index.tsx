import clsx from 'clsx';
import { ScrollArea } from '../../components/ui/scrollArea.js';
import { cn } from '../../utils/twMerge.js';
import { CheckoutButton } from './checkoutButton.js';
import { useSearch } from './hooks/useSearch.js';
import { RecommendationsResults } from './recommendationsResults.js';
import { SearchBar } from './searchBar.js';
import { SearchResults } from './searchResults.js';

export const Search = () => {
  const {
    searchResults,
    searchQueryParams,
    isLoading,
    isError,
    error,
    handleSearchSubmit,
    handlePaymentMethods,
    recommendationsResults,
    isRecommendationError,
    isRecommendationLoading,
    recommendationRequestError,
  } = useSearch();
  return (
    <div className="px-2 flex flex-col gap-y-2 flex-grow">
      <SearchBar
        isSearchDisabled={isLoading}
        handleSearchSubmit={handleSearchSubmit}
        initialSearch={searchQueryParams.sld}
      />
      <div id="search-results" className={cn('flex flex-col flex-grow gap-3 overflow-auto pb-2')}>
        <ScrollArea className={clsx('h-9/12 max-h-[375px]')}>
          <SearchResults
            searchResults={searchResults}
            isLoading={isLoading}
            isError={isError}
            error={error}
            searchTerm={searchQueryParams.sld}
          />
          <RecommendationsResults
            recommendationsResults={recommendationsResults}
            isLoading={isRecommendationLoading}
            isError={isRecommendationError}
            error={recommendationRequestError}
            searchTerm={searchQueryParams.sld}
            searchResults={searchResults?.pageItems}
          />
        </ScrollArea>
      </div>
      <CheckoutButton searchResults={searchResults} handleStartCart={handlePaymentMethods} />
    </div>
  );
};
