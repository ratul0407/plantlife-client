export const getLocalWishlist = (): string[] => {
  const data = localStorage.getItem("wishlist");
  return data ? JSON.parse(data) : [];
};

export const addLocalWishlist = (plantId: string) => {
  const wishlist = getLocalWishlist();
  if (!wishlist.includes(plantId)) {
    wishlist.push(plantId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }
};

export const removeLocalWishlist = (plantId: string) => {
  const wishlist = getLocalWishlist().filter((id) => id !== plantId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
};
