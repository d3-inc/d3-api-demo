import clsx from 'clsx';
import { ScrollArea } from '../../components/ui/scrollArea.js';
import { cn } from '../../utils/twMerge.js';
import { CheckoutButton } from './checkoutButton.js';
import { useSearch } from './hooks/useSearch.js';
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
  } = useSearch();
  return (
    <div className="flex flex-col gap-y-2 flex-grow">
      <SearchBar
        isSearchDisabled={isLoading}
        handleSearchSubmit={handleSearchSubmit}
        initialSearch={searchQueryParams.sld}
      />
      <div id="search-results" className={cn('flex flex-col flex-grow gap-3 overflow-auto pb-2')}>
        <ScrollArea className={clsx('h-9/12 max-h-[505px] px-2')}>
          <SearchResults
            searchResults={searchResults}
            isLoading={isLoading}
            isError={isError}
            error={error}
            searchTerm={searchQueryParams.sld}
          />
        </ScrollArea>
      </div>
      <CheckoutButton searchResults={searchResults} handleStartCart={handlePaymentMethods} />
    </div>
  );
};
