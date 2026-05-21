import { supabase } from '../lib/supabase'

/**
 * Fetches all budget items for a user.
 *
 * @param {string} userId - The user ID.
 * @returns {Promise<Array>} List of budget items.
 */
export const getBudgetItems = async (userId) => {
  const { data, error } = await supabase
    .from('budget_items')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data
}

/**
 * Adds a new budget item.
 *
 * @param {string} userId - The user ID.
 * @param {object} item - The budget item to add.
 * @returns {Promise<object>} The saved item.
 */
export const addBudgetItem = async (userId, item) => {
  const { data, error } = await supabase
    .from('budget_items')
    .insert({ ...item, user_id: userId })
    .select()
  if (error) throw error
  return data[0]
}

/**
 * Updates a budget item.
 *
 * @param {string} id - The item ID.
 * @param {object} updates - Fields to update.
 * @returns {Promise<object>} The updated item.
 */
export const updateBudgetItem = async (id, updates) => {
  const { data, error } = await supabase.from('budget_items').update(updates).eq('id', id).select()
  if (error) throw error
  return data[0]
}

/**
 * Deletes a budget item.
 *
 * @param {string} id - The item ID.
 * @returns {Promise<void>}
 */
export const deleteBudgetItem = async (id) => {
  const { error } = await supabase.from('budget_items').delete().eq('id', id)
  if (error) throw error
}

// Default budget items to seed for new users
const DEFAULT_BUDGET_ITEMS = [
  { label: 'Lön', type: 'income', amount: 0, category: null },
  { label: 'Boende', type: 'expense', amount: 0, category: 'boende' },
  { label: 'Mat', type: 'expense', amount: 0, category: 'mat' },
  { label: 'Transport', type: 'expense', amount: 0, category: 'transport' },
  { label: 'Sparande', type: 'expense', amount: 0, category: 'sparande' },
]

/**
 * Seeds the database with default budget items for a user.
 *
 * @param {string} userId - The user ID.
 */
export const seedDefaultBudgetItems = async (userId) => {
  const existing = await getBudgetItems(userId)
  if (existing.length > 0) return // redan seedat
  for (const item of DEFAULT_BUDGET_ITEMS) {
    await addBudgetItem(userId, item)
  }
}
