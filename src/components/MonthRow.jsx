import { ChevronDownIcon, DownloadIcon } from './Icons'
import './MonthRow.css'

function MonthRow({ month = 'September', year = '2024', className = '', onDownload }) {
  return (
    <div className={`month-row ${className}`}>
      <button className="month-row__label" aria-label={`Maand selecteren: ${month} ${year}`}>
        <span className="month-row__month">{month}</span>
        <span className="month-row__year">{year}</span>
        <ChevronDownIcon />
      </button>
      <button className="month-row__download" aria-label="Download overzicht" onClick={onDownload}>
        <DownloadIcon />
        Download
      </button>
    </div>
  )
}

export default MonthRow
