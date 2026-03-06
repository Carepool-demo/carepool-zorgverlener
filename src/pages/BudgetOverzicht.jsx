import { useState } from 'react'
import BudgetDetail from './BudgetDetail'
import { BackArrowIcon, BudgetIcon, ChevronDownIcon, PlusIcon } from '../components/Icons'
import { budgetData } from '../data/dummyData'
import './BudgetOverzicht.css'

function formatCurrency(amount) {
  return '€ ' + amount.toLocaleString('nl-NL')
}

function BudgetCard({ budget, onClick }) {
  const usedPercent = Math.round((budget.used / budget.totalBudget) * 100)

  return (
    <button className="bo__card" onClick={onClick} aria-label={`${budget.name} budget bekijken`}>
      <div className="bo__card-header">
        <BudgetIcon />
        <span className="bo__card-name">{budget.name}</span>
      </div>
      <div className="bo__card-amount">{formatCurrency(budget.available)}</div>
      <div className="bo__card-subtext">Beschikbaar: {budget.percentage}%</div>
      <div className="bo__progress">
        <div className="bo__progress-bar" style={{ width: `${usedPercent}%` }} />
      </div>
      <div className="bo__card-footer">
        <span className="bo__card-used">Verbruikt: {formatCurrency(budget.used)}</span>
        <span className="bo__card-total">Budget: {formatCurrency(budget.totalBudget)}</span>
      </div>
    </button>
  )
}

function BudgetOverzicht({ onBack }) {
  const [selectedBudget, setSelectedBudget] = useState(null)

  if (selectedBudget) {
    return <BudgetDetail budget={selectedBudget} onBack={() => setSelectedBudget(null)} />
  }

  return (
    <div className="bo">
      <header className="bo__header">
        <button className="bo__back-btn" onClick={onBack} aria-label="Terug naar administratie">
          <BackArrowIcon />
        </button>
        <h1 className="bo__title">Budgetoverzicht</h1>
      </header>

      <div className="bo__toolbar">
        <button className="bo__dropdown" onClick={() => alert('Budget selecteren (nog niet geimplementeerd)')}>
          Budget 2026
          <ChevronDownIcon />
        </button>
        <button className="bo__add-btn" onClick={() => alert('Nieuw budget (nog niet geimplementeerd)')}>
          <PlusIcon />
          Nieuw
        </button>
      </div>

      <div className="bo__list">
        {budgetData.map((budget) => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            onClick={() => setSelectedBudget(budget)}
          />
        ))}
      </div>
    </div>
  )
}

export default BudgetOverzicht
