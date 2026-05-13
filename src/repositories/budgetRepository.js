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
