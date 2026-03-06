import ZorgverlenerSelector from '../components/ZorgverlenerSelector'
import MonthRow from '../components/MonthRow'
import { BudgetIcon, SvbIcon, ArrowRightIcon, ChevronRightSmallIcon } from '../components/Icons'
import { overzichtData } from '../data/dummyData'

function OverzichtenTab({ onOpenSvb, onOpenBudget, onDownload, initialMonth }) {
  // initialMonth is e.g. "Februari 2026" — split into month and year
  const monthName = initialMonth ? initialMonth.split(' ')[0] : undefined
  const monthYear = initialMonth ? initialMonth.split(' ')[1] : undefined

  return (
    <div className="admin__tab-content">
      <ZorgverlenerSelector className="admin__selector-spacing" />
      <MonthRow className="admin__month-spacing" {...(monthName && { month: monthName })} {...(monthYear && { year: monthYear })} onDownload={onDownload} />

      <div className="overzicht">
        <div className="overzicht__card">
          <h3 className="overzicht__card-title">Maandoverzicht {overzichtData.name}</h3>
          <div className="overzicht__table">
            <div className="overzicht__row overzicht__row--header">
              <span className="overzicht__col overzicht__col--category">Categorie</span>
              <span className="overzicht__col overzicht__col--duration">Duur</span>
              <span className="overzicht__col overzicht__col--amount">Bedrag</span>
            </div>
            {overzichtData.categories.map((cat) => (
              <div key={cat.name} className="overzicht__row">
                <span className="overzicht__col overzicht__col--category">{cat.name}</span>
                <span className="overzicht__col overzicht__col--duration">{cat.duration}</span>
                <span className="overzicht__col overzicht__col--amount">{cat.amount}</span>
              </div>
            ))}
            <div className="overzicht__row overzicht__row--total">
              <span className="overzicht__col overzicht__col--category">Totaal</span>
              <span className="overzicht__col overzicht__col--duration">{overzichtData.totalDuration}</span>
              <span className="overzicht__col overzicht__col--amount">{overzichtData.totalAmount}</span>
            </div>
          </div>
        </div>

        <button className="overzicht__link" aria-label="Bekijk zorglogs">
          Bekijk zorglogs
          <ChevronRightSmallIcon />
        </button>

        <div className="overzicht__actions">
          <button className="overzicht__budget-card" onClick={onOpenBudget} aria-label="Mijn budget bekijken">
            <div className="overzicht__budget-left">
              <BudgetIcon />
              <span className="overzicht__budget-label">Mijn budget</span>
            </div>
            <ArrowRightIcon />
          </button>

          <button className="overzicht__budget-card" onClick={onOpenSvb} aria-label="SVB-declaratieoverzicht openen">
            <div className="overzicht__budget-left">
              <SvbIcon />
              <span className="overzicht__budget-label">SVB-declaratieoverzicht</span>
            </div>
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  )
}

export default OverzichtenTab
