import { BackArrowIcon } from '../components/Icons'
import './BudgetDetail.css'

function formatCurrency(amount) {
  return '€ ' + amount.toLocaleString('nl-NL')
}

/* ---- Verbruik section (progress bar + category breakdown) ---- */
function VerbruikCard({ budget }) {
  const totalUsed = budget.used
  const available = budget.available

  return (
    <div className="bd__card">
      <h3 className="bd__card-title">Verbruik</h3>

      {/* Stacked progress bar */}
      <div className="bd__stacked-bar">
        {budget.categories.map((cat) => {
          const width = (cat.amount / budget.totalBudget) * 100
          return (
            <div
              key={cat.name}
              className="bd__stacked-segment"
              style={{ width: `${width}%`, background: cat.color }}
            />
          )
        })}
      </div>

      {/* Category breakdown */}
      <div className="bd__breakdown">
        {budget.categories.map((cat) => (
          <div key={cat.name} className="bd__breakdown-row">
            <span className="bd__dot" style={{ background: cat.color }} />
            <span className="bd__breakdown-name">{cat.name}</span>
            <span className="bd__breakdown-amount">{formatCurrency(cat.amount)}</span>
          </div>
        ))}
        <div className="bd__breakdown-row">
          <span className="bd__dot" style={{ background: '#DAD4EC' }} />
          <span className="bd__breakdown-name">Beschikbaar budget</span>
          <span className="bd__breakdown-amount bd__breakdown-amount--bold">{formatCurrency(available)}</span>
        </div>
      </div>
    </div>
  )
}

/* ---- Budgetcheck section (bar chart + prediction) ---- */
function BudgetcheckCard({ budget }) {
  const maxAmount = Math.max(...budget.monthlyData.map(m => m.amount), 1)
  const hasMultipleCategories = budget.categories.length > 1

  return (
    <div className="bd__card">
      <h3 className="bd__card-title">Budgetcheck</h3>

      {/* Bar chart */}
      <div className="bd__chart">
        <div className="bd__bars">
          {budget.monthlyData.map((m) => (
            <div key={m.month} className="bd__bar-col">
              <div className="bd__bar-wrapper">
                {m.amount > 0 && !m.isFuture && hasMultipleCategories ? (
                  /* Stacked bars for multi-category budgets */
                  <div className="bd__bar bd__bar--stacked" style={{ height: `${(m.amount / maxAmount) * 100}%` }}>
                    {budget.categories.map((cat) => (
                      <div
                        key={cat.name}
                        className="bd__bar-segment"
                        style={{
                          flex: cat.amount,
                          background: cat.color,
                        }}
                      />
                    ))}
                  </div>
                ) : m.amount > 0 && !m.isFuture ? (
                  <div
                    className="bd__bar"
                    style={{
                      height: `${(m.amount / maxAmount) * 100}%`,
                      background: 'var(--color-cta)',
                    }}
                  />
                ) : (
                  <div
                    className="bd__bar bd__bar--future"
                    style={{ height: '60%' }}
                  />
                )}
              </div>
              <span className={`bd__bar-label ${m.month === budget.currentMonth ? 'bd__bar-label--current' : ''}`}>
                {m.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bd__stats">
        <div className="bd__stat-row">
          <span className="bd__stat-label">Gemiddeld{hasMultipleCategories ? ' besteed' : ''}</span>
          <span className="bd__stat-value">{formatCurrency(budget.averageMonthly)}</span>
        </div>
        <div className="bd__stat-row">
          <span className="bd__stat-label">Looptijd budget:</span>
          <span className="bd__stat-value">{budget.looptijd}</span>
        </div>
      </div>

      {/* Prediction text */}
      <p className="bd__prediction">
        {budget.prediction.type === 'tekort' ? (
          <>In dit tempo kom je <strong className="bd__prediction--tekort">{formatCurrency(budget.prediction.amount)}</strong> tekort aan het eind van de budgetperiode.</>
        ) : (
          <>In dit tempo houd je <strong className="bd__prediction--over">{formatCurrency(budget.prediction.amount)}</strong> over aan het eind van de budgetperiode.</>
        )}
      </p>

      <button className="bd__link" onClick={() => alert('Hoe werkt dit? (nog niet geimplementeerd)')}>
        Hoe werkt dit?
      </button>
    </div>
  )
}

/* ---- Main component ---- */
function BudgetDetail({ budget, onBack }) {
  return (
    <div className="bd">
      <header className="bd__header">
        <button className="bd__back-btn" onClick={onBack} aria-label="Terug naar budgetoverzicht">
          <BackArrowIcon />
        </button>
        <h1 className="bd__title">Budget {budget.year}</h1>
      </header>

      {/* Budget info */}
      <div className="bd__info">
        <div className="bd__info-row">
          <span className="bd__info-name">{budget.name}</span>
          <span className="bd__info-period">{budget.period}</span>
        </div>

        <div className="bd__hero-amount">{formatCurrency(budget.available)}</div>
        <div className="bd__hero-sub">beschikbaar van {formatCurrency(budget.totalBudget)}</div>
      </div>

      {/* Verbruik card */}
      <VerbruikCard budget={budget} />

      {/* Budgetcheck card */}
      <BudgetcheckCard budget={budget} />

      {/* Action buttons */}
      <div className="bd__actions">
        <button className="bd__edit-link" onClick={() => alert('Budget aanpassen (nog niet geimplementeerd)')}>
          <EditPenIcon />
          Budget aanpassen
        </button>
      </div>
    </div>
  )
}

/* Small edit/pen icon for "Budget aanpassen" */
function EditPenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default BudgetDetail
