import { supabase } from '../lib/supabase'

/**
 * Fetches all products for a user.
 *
 * @param {string} userId - The user ID.
 * @returns {Promise<Array>} List of products.
 */
export const getProducts = async (userId) => {
  const { data, error } = await supabase.from('products').select('*').eq('user_id', userId)
  if (error) throw error
  return data
}

/**
 * Fetches a product from the list.
 *
 * @param {string} productId - The product ID.
 * @returns {Promise<Array>} Array of product details.
 */
export const getProductById = async (productId) => {
  const { data, error } = await supabase.from('products').select('*').eq('id', productId).single()
  if (error) throw error
  return data
}

/**
 * Adds a new product.
 *
 * @param {string} userId - The user ID.
 * @param {object} product - The product to add.
 * @returns {Promise<object>} The saved product.
 */
export const addProduct = async (userId, product) => {
  const { data, error } = await supabase
    .from('products')
    .insert({ ...product, user_id: userId })
    .select()
  if (error) throw error
  return data[0]
}

/**
 * Updates a product.
 *
 * @param {string} productId - The product ID.
 * @param {object} updates - Fields to update.
 * @returns {Promise<object>} The updated product.
 */
export const updateProduct = async (productId, updates) => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', productId)
    .select()
  if (error) throw error
  return data[0]
}

/**
 * Deletes a product.
 *
 * @param {string} productId - The product ID.
 * @returns {Promise<void>}
 */
export const deleteProduct = async (productId) => {
  const { error } = await supabase.from('products').delete().eq('id', productId)
  if (error) throw error
}
