import { SearchIcon } from 'lucide-react';

import { Button } from '../../components/ui/button.js';
import { Input } from '../../components/ui/input.js';
import { useSearchBar } from './hooks/useSearchBar.js';

type SearchBarProps = {
  handleSearchSubmit: (sld: string) => void;
  initialSearch?: string;
  isSearchDisabled: boolean;
};

export function SearchBar({
  handleSearchSubmit,
  isSearchDisabled,
  initialSearch = '',
}: SearchBarProps) {
  const {
    searchValue,
    searchInputRef,
    errorMessage,
    handleKeyDown,
    handleSearchInputChange,
    handleSearchAction,
  } = useSearchBar({ initialSearch, handleSubmit: handleSearchSubmit });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchAction();
      }}
    >
      <div className="flex gap-2 my-2 px-2">
        <div className="flex-grow">
          <Input
            value={searchValue}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            ref={searchInputRef}
            aria-label={'Search name'}
            title={'Search name'}
            placeholder={'Search name'}
            translate="no"
            spellCheck="false"
            autoCorrect="false"
            autoComplete="false"
            autoCapitalize="false"
            data-testid="search-field"
            maxLength={63}
            minLength={1}
            aria-invalid={!!errorMessage}
            readOnly={isSearchDisabled}
          />
          {errorMessage ? (
            <p className="text-xs text-red-600 mt-1 text-left">{errorMessage}</p>
          ) : null}
        </div>
        <Button aria-label="search name" disabled={isSearchDisabled} type="submit">
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
}
