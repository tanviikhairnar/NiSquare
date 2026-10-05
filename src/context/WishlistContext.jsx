import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'studio13-wishlist';

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); } catch { /* Keep the wishlist usable for this session. */ }
  }, [ids]);

  const toggleWishlist = useCallback((id) => {
    setIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }, []);
  const isWishlisted = useCallback((id) => ids.includes(id), [ids]);
  const value = useMemo(() => ({ ids, count: ids.length, toggleWishlist, isWishlisted }), [ids, toggleWishlist, isWishlisted]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const wishlist = useContext(WishlistContext);
  if (!wishlist) throw new Error('useWishlist must be used inside WishlistProvider');
  return wishlist;
}
