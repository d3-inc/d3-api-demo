import { useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { CART_LIMIT } from '../config/constants.js';
import { useStore } from '../state/store/index.js';
import type { SearchResult } from '../types/api.js';

export const useCart = () => {
  const cart = useStore(useShallow((state) => state.cart));
  const setCart = useStore(useCallback((state) => state.setCart, []));
  const isCartLimitReached = useMemo(() => {
    if (!cart?.items?.length) return false;
    return cart?.items?.length >= CART_LIMIT;
  }, [cart?.items]);

  const getIsItemInCart = useCallback(
    (domain: SearchResult) => {
      const isAlreadyInCart = cart.items?.find(
        (item) => item.sld === domain.sld && item.tld === domain.tld,
      );
      return isAlreadyInCart;
    },
    [cart?.items],
  );

  const handleAddToCart = useCallback(
    async (domain: SearchResult) => {
      const isAlreadyInCart = getIsItemInCart(domain);
      if (isAlreadyInCart) return;

      setCart({
        items: [...(cart?.items ?? []), domain],
      });
    },
    [setCart, getIsItemInCart, cart?.items],
  );

  const handleRemoveFromCart = useCallback(
    async (domain: SearchResult) => {
      const updatedItems = cart?.items?.filter(
        (item) => item?.sld + item.tld !== domain?.sld + domain?.tld,
      );

      setCart({
        items: updatedItems,
      });
    },
    [setCart, cart?.items],
  );

  return { getIsItemInCart, handleAddToCart, handleRemoveFromCart, isCartLimitReached };
};
