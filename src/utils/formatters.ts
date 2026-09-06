/**
 * Shared formatting utilities for 1Fi Marketplace
 */

/**
 * Formats a numeric amount as Indian Rupee currency (e.g. ₹1,27,400, ₹7,500).
 */
export function formatPrice(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}
