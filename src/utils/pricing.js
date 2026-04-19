export function calculatePricing({
  baseCost,
  hours,
  margin,
  addons,
  travelFee,
  rushFee,
  depositPercentage,
}) {
  const laborCost = Number(baseCost || 0) + Number(hours || 0) * 30;
  const extras = Number(addons || 0) + Number(travelFee || 0) + Number(rushFee || 0);
  const subtotal = laborCost + extras;
  const finalPrice = subtotal * (1 + Number(margin || 0) / 100);
  const depositAmount = finalPrice * (Number(depositPercentage || 0) / 100);

  return {
    finalPrice,
    depositAmount,
    packages: {
      basic: finalPrice * 0.85,
      standard: finalPrice,
      premium: finalPrice * 1.25,
    },
  };
}
