/**
 * Formats a number as a Swedish locale currency string.
 *
 * @param {number} num - The number to format.
 * @returns {string} Formatted number string.
 */
export const formatCurrency = (num) => (num ?? 0).toLocaleString('sv-SE')

/**
 * Formats an ISO date string to a Swedish locale date string.
 *
 * @param {string} dateStr - The ISO date string to format.
 * @returns {string} Formatted date string.
 */
export const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('sv-SE')
