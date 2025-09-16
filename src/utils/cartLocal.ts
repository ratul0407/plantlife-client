// utils/localCart.ts (Updated from previous)
const CART_KEY = "guestCart";

export const getLocalCart = () => {
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Failed to load local cart:", error);
    return [];
  }
};

export const addToLocalCart = async (
  newItem: { plant: string; sku: string; quantity: number },
  variantDetails?: any,
) => {
  // variantDetails: { variantName, price, image, stock } – fetch this in add handler if not passed
  const enrichedItem = {
    ...newItem,
    // Enrich with details for offline display
    ...(variantDetails || {}),
  };
  const cart = getLocalCart();
  const existingItem = cart.find((item: any) => item.sku === enrichedItem.sku);
  let updatedCart;

  if (existingItem) {
    existingItem.quantity += enrichedItem.quantity;
    // Update other details if newer (e.g., price change, but assume static)
    Object.assign(existingItem, enrichedItem); // Merge details
    updatedCart = [...cart];
  } else {
    updatedCart = [...cart, enrichedItem];
  }

  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  return updatedCart;
};

// Other functions remain the same, but updateLocalCartQuantity and removeFromLocalCart work on enriched items
export const updateLocalCartQuantity = (sku: string, newQuantity: number) => {
  const cart = getLocalCart();
  const updatedCart = cart
    .map((item: any) =>
      item.sku === sku ? { ...item, quantity: newQuantity } : item,
    )
    .filter((item: any) => item.quantity > 0);
  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  return updatedCart;
};

export const removeFromLocalCart = (sku: string) => {
  const cart = getLocalCart();
  const updatedCart = cart.filter((item: any) => item.sku !== sku);
  localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
  return updatedCart;
};

export const clearLocalCart = () => {
  localStorage.removeItem(CART_KEY);
};

// syncLocalToBackend remains the same, but passes only {plant, sku, quantity} to backend
export const syncLocalToBackend = async (
  addToCartMutation: any,
  localCart: any[],
) => {
  if (!localCart.length) return { success: true };

  const results = [];
  for (const item of localCart) {
    try {
      const res = await addToCartMutation({
        plant: item.plant,
        sku: item.sku,
        quantity: item.quantity.toString(),
      }).unwrap();
      results.push({ success: !!res.success, sku: item.sku });
    } catch (error) {
      results.push({ success: false, sku: item.sku, error });
    }
  }

  const allSuccess = results.every((r) => r.success);
  if (allSuccess) {
    clearLocalCart();
  }
  return { success: allSuccess, results };
};
