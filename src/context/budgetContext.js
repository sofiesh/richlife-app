import React, { createContext, useContext, useState, useEffect } from 'react'
import { getBudgetItems } from '../repositories/budgetRepository'
import PropTypes from 'prop-types'

const BudgetContext = createContext()

/**
 * Provides budget data to child components.
 *
 * @param {object} props - Component props.
 * @param {{ uid: string }} props.user - The authenticated user.
 * @param {React.ReactNode} props.children - Child components.
 * @returns {React.ReactElement} Context provider.
 */
export const BudgetProvider = ({ user, children }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    if (!user?.uid) return
    getBudgetItems(user.uid).then(setItems).catch(console.error)
  }, [user?.uid])

  const income = items.filter((i) => i.type === 'income')
  const expenses = items.filter((i) => i.type === 'expense')
  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0)
  const totalExpenses = expenses.reduce((sum, i) => sum + i.amount, 0)
  const safeToSpend = totalIncome - totalExpenses

  return (
    <BudgetContext.Provider
      value={{
        items,
        setItems,
        income,
        expenses,
        totalIncome,
        totalExpenses,
        safeToSpend,
        userId: user?.uid,
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}

BudgetProvider.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
}

/**
 * Exports the budget context.
 *
 * @returns {Element} budget context.
 */
export const useBudget = () => useContext(BudgetContext)
