import type React from 'react';
import { useRef, useState } from 'react';

type UseSearchBarProps = {
  initialSearch?: string;
  isSearchDisabled?: boolean;
  handleSubmit: (sld: string) => void;
};

export function useSearchBar({
  initialSearch,
  isSearchDisabled = false,
  handleSubmit,
}: UseSearchBarProps) {
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [searchValue, setSearchValue] = useState(initialSearch);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' && searchValue?.length && !isSearchDisabled) {
      event.preventDefault();
      event.stopPropagation();
      handleSearchAction();
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredText = e.target.value;
    setSearchValue(enteredText);
  };

  const handleSearchAction = () => {
    if (searchValue?.startsWith('-') || searchValue?.endsWith('-')) {
      setErrorMessage('Name cannot start or end with "-"');
      return;
    }
    if (searchValue?.length) {
      const trimmedSld = searchValue.replace(/\s+/g, '');
      setErrorMessage(null);
      handleSubmit(trimmedSld);
      setSearchValue(trimmedSld);
    }
  };

  return {
    searchValue,
    searchInputRef,
    errorMessage,
    setErrorMessage,
    handleKeyDown,
    handleSearchInputChange,
    handleSearchAction,
  };
}
