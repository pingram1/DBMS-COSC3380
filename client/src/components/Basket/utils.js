export const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.Unit_Price * item.quantity), 0);
  };