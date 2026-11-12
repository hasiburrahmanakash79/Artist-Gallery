export const formatPrice = (amount) =>
  `\u09F3${Number(amount).toLocaleString('en-BD')}`;

export const generateOrderId = () => {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `FN-${stamp}${rand}`;
};
