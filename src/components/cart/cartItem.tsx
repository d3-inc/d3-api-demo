import { CircleXIcon } from 'lucide-react';
import type { SearchResult } from '../../types/api.js';
import { nameTokenFormatter } from '../../utils/nameTokens.js';
import { DomainPrice } from '../domain/domainPrice.js';
import { Button } from '../ui/button.js';
import { Card, CardContent } from '../ui/card.js';

export type CartItemProps = {
  cartItem: SearchResult;
  handleCartAction: (searchResult: SearchResult) => void;
  disabled: boolean;
};

export const CartItem = ({ cartItem, handleCartAction, disabled }: CartItemProps) => {
  const isDomainAvailable = cartItem?.status?.toLowerCase() === 'available';
  return (
    <Card className="drop-shadow-md border w-full relative">
      <CardContent className="grid px-3 py-2">
        <div className="flex items-center gap-2 justify-between">
          <div className="flex-1 space-y-1">
            <p className="text-lg font-semibold text-left break-all">
              {nameTokenFormatter({ sld: cartItem.sld, tld: cartItem.tld, eoi: true })}
            </p>
          </div>
          <DomainPrice domain={cartItem} isDomainLocked={!isDomainAvailable} />
          <Button
            size="icon"
            aria-label="remove item from cart"
            title="Remove cart item"
            variant={'link'}
            className="absolute -right-4 -top-2 p-0 h-5 border-none outline-none bg-transparent"
            onClick={() => handleCartAction(cartItem)}
            disabled={disabled}
          >
            <CircleXIcon size={20} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
