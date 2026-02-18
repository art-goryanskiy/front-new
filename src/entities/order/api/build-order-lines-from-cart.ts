import type {
  CartItemEntity,
  CreateOrderLineInput,
  OrderLineLearnerInput,
} from "@/shared/api/generated/graphql";

/**
 * Собирает массив CreateOrderLineInput из элементов корзины.
 * getLearnersForLine(item, lineIndex) — learners для каждой позиции (lineIndex = индекс линии 0, 1, 2…).
 */
export function buildOrderLinesFromCart(
  cartItems: CartItemEntity[],
  getLearnersForLine: (
    item: CartItemEntity,
    lineIndex: number
  ) => OrderLineLearnerInput[] = () => []
): CreateOrderLineInput[] {
  return cartItems.map((item, lineIndex) => {
    const pricing = item.program.pricing?.[item.pricingIndex];
    const hours = pricing?.hours ?? 0;
    const price = pricing?.price ?? 0;
    const quantity = item.quantity;
    const lineAmount = item.lineAmount;

    return {
      programId: item.programId,
      pricingIndex: item.pricingIndex,
      ...(item.subProgramIndex != null && {
        subProgramIndex: item.subProgramIndex,
      }),
      hours,
      price,
      quantity,
      lineAmount,
      learners: getLearnersForLine(item, lineIndex),
    };
  });
}
