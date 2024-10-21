import type { SearchResult } from '../../types/api.js';
import { Button } from '../ui/button.js';
import { Tooltip, TooltipContent, TooltipPortal, TooltipTrigger } from '../ui/tooltipComponent.js';

export type ActionButtonsProps = {
  searchResult: SearchResult;
  handleCartAction: (searchResult: SearchResult) => void;
  isItemInCart: boolean;
  isCartLimitReached?: boolean;
};

export const ActionButtons = ({
  isItemInCart,
  handleCartAction,
  isCartLimitReached,
  searchResult,
}: ActionButtonsProps) => {
  if (isItemInCart) {
    return (
      <Button
        className="opacity-0 group-hover:opacity-100 absolute right-2 transition-opacity ease-in-out delay-0 duration-150"
        onClick={() => handleCartAction(searchResult)}
      >
        Remove
      </Button>
    );
  }

  if (isCartLimitReached) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="opacity-0 group-hover:opacity-100 absolute right-2 transition-opacity ease-in-out delay-0 duration-150">
            <Button disabled>Add to Cart</Button>
          </span>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent className="tooltip-content">Cart Limit Reached</TooltipContent>
        </TooltipPortal>
      </Tooltip>
    );
  }

  return (
    <Button
      className="opacity-0 group-hover:opacity-100 absolute right-2 transition-opacity ease-in-out delay-0 duration-150"
      onClick={() => handleCartAction(searchResult)}
    >
      Add to Cart
    </Button>
  );
};
