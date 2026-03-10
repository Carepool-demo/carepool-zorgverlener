import { useState, useRef } from 'react'
import { PAGES, SUB_PAGES } from '../constants/routes'
import { SmallCareIcon, CareIcon, CalendarSmallIcon, ClockIcon, LocationOutlineIcon } from '@shared/components/Icons'
import { agendaWeeks as WEEKS, agendaVerzoeken, alleVerzoeken } from '../data/dummyData'
import AlleVerzoeken from './AlleVerzoeken'
import './Agenda.css'

/* ---- Page-specific icons ---- */
function MailOpenIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.5435 1.04199C13.292 1.04197 13.9161 1.04183 14.4117 1.1084C14.9348 1.17874 15.4081 1.33333 15.7877 1.71289C16.1671 2.09241 16.3218 2.56483 16.3922 3.08789C16.4588 3.58354 16.4586 4.2083 16.4586 4.95703V5.49707L17.2193 6.00488C17.5636 6.23441 17.857 6.43019 18.0865 6.61621C18.3311 6.81459 18.5386 7.02958 18.69 7.31348C18.8412 7.59712 18.9048 7.88829 18.9332 8.20117C18.9598 8.49443 18.958 8.84617 18.9566 9.25781V9.28516C18.9531 10.3348 18.9437 11.407 18.9166 12.4932L18.9156 12.542C18.8847 13.7814 18.8592 14.7813 18.7174 15.5859C18.5684 16.4304 18.2826 17.1183 17.6959 17.7051C17.1079 18.2931 16.4148 18.5788 15.5631 18.7275C14.7504 18.8695 13.7379 18.8944 12.481 18.9258L12.4322 18.9268C10.8063 18.9674 9.19476 18.9674 7.56891 18.9268L7.52008 18.9258C6.26319 18.8944 5.25076 18.8695 4.43805 18.7275C3.58638 18.5788 2.8932 18.293 2.30524 17.7051C1.71849 17.1183 1.4327 16.4304 1.28376 15.5859C1.1419 14.7813 1.11643 13.7815 1.08551 12.542L1.08454 12.4932C1.05743 11.407 1.04802 10.3348 1.0445 9.28516L1.04352 9.25781C1.04212 8.84616 1.04133 8.49443 1.06794 8.20117C1.09635 7.8883 1.15894 7.59711 1.31012 7.31348C1.46156 7.02945 1.66895 6.81465 1.91364 6.61621C2.14318 6.43006 2.43721 6.2346 2.7818 6.00488C2.78932 5.99987 2.7967 5.9943 2.80426 5.98926L3.54157 5.49805V4.95703C3.54154 4.2083 3.54134 3.58354 3.60797 3.08789C3.67831 2.56473 3.83388 2.09245 4.21344 1.71289C4.59296 1.3335 5.06538 1.17872 5.58844 1.1084C6.084 1.04182 6.70814 1.04197 7.45661 1.04199H12.5435ZM12.8658 12.3447C12.2627 12.7066 11.7699 13.0017 11.3414 13.2031C10.8935 13.4137 10.4699 13.5449 9.99958 13.5449C9.5292 13.5449 9.1057 13.4137 8.65778 13.2031C8.22913 13.0016 7.73582 12.7068 7.13239 12.3447L2.29547 9.44141C2.29943 10.4348 2.30911 11.4433 2.33454 12.4619C2.36698 13.7617 2.39055 14.6678 2.51422 15.3691C2.63276 16.0412 2.83378 16.466 3.18903 16.8213C3.54303 17.1753 3.9708 17.3769 4.6529 17.4961C5.36352 17.6202 6.28315 17.6448 7.60016 17.6777C9.20518 17.7178 10.7959 17.7178 12.4009 17.6777C13.718 17.6448 14.6376 17.6202 15.3482 17.4961C16.0303 17.3769 16.4581 17.1753 16.8121 16.8213C17.1673 16.466 17.3674 16.0412 17.4859 15.3691C17.6096 14.6678 17.6341 13.7618 17.6666 12.4619C17.692 11.4426 17.7007 10.4335 17.7047 9.43945L12.8658 12.3447ZM7.50055 2.29199C6.69721 2.29199 6.15699 2.29256 5.75446 2.34668C5.37023 2.39835 5.20582 2.48819 5.09723 2.59668C4.98863 2.70528 4.89893 2.87033 4.84723 3.25488C4.79316 3.65737 4.79157 4.19691 4.79157 5V9.48145L7.7486 11.2559C8.38582 11.6382 8.82442 11.9008 9.18903 12.0723C9.54089 12.2377 9.7775 12.2949 9.99958 12.2949C10.2216 12.2949 10.4575 12.2376 10.8091 12.0723C11.1738 11.9008 11.6131 11.6383 12.2506 11.2559L15.2086 9.48047V5C15.2086 4.1969 15.207 3.65737 15.1529 3.25488C15.1012 2.87033 15.0115 2.70528 14.9029 2.59668C14.7943 2.4882 14.6299 2.39834 14.2457 2.34668C13.8432 2.29257 13.3036 2.29199 12.5006 2.29199H7.50055ZM11.6666 7.70801C12.0116 7.70801 12.2914 7.98798 12.2916 8.33301C12.2916 8.67819 12.0117 8.95801 11.6666 8.95801H8.33356C7.98838 8.95801 7.70856 8.67819 7.70856 8.33301C7.70874 7.98798 7.98849 7.70801 8.33356 7.70801H11.6666ZM3.49762 7.0293C3.12413 7.2783 2.88045 7.44295 2.70172 7.58789C2.53311 7.72463 2.45948 7.81635 2.41364 7.90234C2.39496 7.93743 2.37859 7.97677 2.36383 8.02539L3.54157 8.73145V7L3.49762 7.0293ZM16.4586 8.73047L17.6363 8.02442C17.6216 7.97635 17.606 7.93713 17.5875 7.90234C17.5416 7.81637 17.4679 7.72456 17.2994 7.58789C17.1206 7.44293 16.8761 7.27836 16.5025 7.0293L16.4586 7V8.73047ZM11.6666 4.375C12.0117 4.375 12.2916 4.65482 12.2916 5C12.2916 5.34518 12.0117 5.625 11.6666 5.625H8.33356C7.98838 5.625 7.70856 5.34518 7.70856 5C7.70856 4.65482 7.98838 4.375 8.33356 4.375H11.6666Z" fill="currentColor"/>
    </svg>
  )
}

function ClockSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function AcceptIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function DeclineIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ArchiveSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6.5C3 5.11929 4.11929 4 5.5 4H18.5C19.8807 4 21 5.11929 21 6.5V7.5C21 8.32843 20.3284 9 19.5 9H4.5C3.67157 9 3 8.32843 3 7.5V6.5Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4.5 9V17.5C4.5 18.8807 5.61929 20 7 20H17C18.3807 20 19.5 18.8807 19.5 17.5V9" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9.5 13H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function TimerIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.66406 0.833285C8.89067 0.837423 9.14688 0.889579 9.38477 0.937777C9.39775 0.940409 9.41096 0.942988 9.42383 0.94559C12.7006 1.60778 15.1668 4.5077 15.167 7.98465C15.167 11.9494 11.9594 15.1663 8 15.1663C4.04058 15.1663 0.833008 11.9494 0.833008 7.98465C0.833141 5.97656 1.65663 4.15935 2.98242 2.85672C3.23909 2.60457 3.65212 2.60886 3.9043 2.86551C4.15616 3.12208 4.15275 3.53427 3.89648 3.78641C2.81011 4.85381 2.13685 6.33981 2.13672 7.98465C2.13672 11.2326 4.76299 13.8636 8 13.8636C11.237 13.8636 13.8633 11.2326 13.8633 7.98465C13.8631 5.1381 11.8447 2.76442 9.16602 2.22293C9.02673 2.19479 8.91944 2.17283 8.82715 2.1575C8.75776 2.14598 8.70796 2.1405 8.67188 2.13797C8.65386 2.25614 8.65137 2.43053 8.65137 2.76102V3.41434C8.65131 3.77411 8.35979 4.06571 8 4.06571C7.64022 4.0657 7.34869 3.77411 7.34863 3.41434V2.72098C7.34855 2.43957 7.34819 2.15533 7.38672 1.91922C7.43259 1.63829 7.5445 1.34206 7.8252 1.11161C8.08988 0.894472 8.37999 0.828111 8.66406 0.833285ZM5.01758 4.2786C5.19925 4.13072 5.45971 4.12854 5.64355 4.27371L9.25586 7.12723C10.0219 7.7321 10.0265 8.88723 9.26465 9.49735C8.50715 10.1038 7.37601 9.86125 6.94043 8.99149L4.88672 4.8909C4.78181 4.68143 4.8359 4.42652 5.01758 4.2786Z" fill="currentColor"/>
    </svg>
  )
}

function NoteSolidIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.333 0.75C11.7012 0.75 12 1.0488 12 1.41699V1.67188C12.5684 1.75662 13.0495 1.93038 13.4346 2.31543C13.8358 2.71671 14.0082 3.22219 14.0889 3.82227C14.1666 4.40023 14.167 5.13519 14.167 6.04688V10.7861C14.167 11.6976 14.1665 12.4328 14.0889 13.0107C14.0082 13.6107 13.8357 14.1163 13.4346 14.5176C13.0333 14.9189 12.5278 15.0912 11.9277 15.1719C11.3498 15.2496 10.6148 15.25 9.70313 15.25H8.01172L6.78027 12.9326L6.75195 12.8867C6.42514 12.3663 6.15159 11.9322 5.88965 11.6201C5.61365 11.2913 5.29704 11.0326 4.8623 10.9541C4.24628 10.8429 3.55575 11.0975 3.01074 11.376C2.6074 11.582 2.22421 11.8336 1.91309 12.0645C1.89052 11.9662 1.87205 11.8663 1.86133 11.7627C1.83376 11.4961 1.833 11.1729 1.83301 10.793V6.04688C1.83299 5.1352 1.83344 4.40023 1.91113 3.82227C1.99181 3.22219 2.16415 2.71671 2.56543 2.31543C2.95048 1.93038 3.43155 1.75662 4 1.67188V1.41699C4 1.0488 4.2988 0.75 4.66699 0.75C5.03503 0.750176 5.33301 1.04891 5.33301 1.41699V1.58789C5.6295 1.58355 5.95043 1.583 6.29688 1.58301H7.33301V1.41699C7.33301 1.0488 7.63181 0.75 8 0.75C8.36819 0.75 8.66699 1.0488 8.66699 1.41699V1.58301H9.70313C10.0496 1.583 10.3705 1.58355 10.667 1.58789V1.41699C10.667 1.04891 10.965 0.750176 11.333 0.75ZM4.68457 11.9375C4.79386 11.9572 4.92093 12.0208 5.12402 12.2627C5.33431 12.5132 5.56825 12.884 5.91406 13.4346L6.84473 15.1865C6.65462 15.1345 6.47342 15.0464 6.25 14.9346L6.21289 14.916L3.56152 13.5898C3.22177 13.42 2.93311 13.2757 2.70703 13.1318C2.60792 13.0688 2.51676 12.9997 2.43066 12.9258C2.71503 12.7087 3.08367 12.4618 3.46582 12.2666C3.98217 12.0028 4.4147 11.8888 4.68457 11.9375ZM5.33301 8.91699C5.05702 8.91717 4.83301 9.14096 4.83301 9.41699C4.83318 9.69288 5.05712 9.91682 5.33301 9.91699H10.667C10.9429 9.91682 11.1668 9.69288 11.167 9.41699C11.167 9.14096 10.943 8.91717 10.667 8.91699H5.33301ZM5.33301 5.58301C5.05712 5.58318 4.83318 5.80712 4.83301 6.08301C4.83301 6.35904 5.05702 6.58283 5.33301 6.58301H8C8.27614 6.58301 8.5 6.35915 8.5 6.08301C8.49982 5.80702 8.27603 5.58301 8 5.58301H5.33301Z" fill="currentColor"/>
    </svg>
  )
}

function DeleteIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.1023 1.04266C10.4873 1.04308 10.834 1.04346 11.1223 1.0693C11.5932 1.11142 12.0365 1.25513 12.4165 1.53858C12.6973 1.74823 12.8923 2.00484 13.059 2.28277C13.214 2.54031 13.3698 2.86141 13.5465 3.22566L13.9015 3.95866L17.4998 3.95924C17.9598 3.95924 18.3332 4.33234 18.3332 4.79258C18.3332 5.25282 17.9598 5.62591 17.4998 5.62591H16.7732L16.3182 13.0473C16.2548 14.0917 16.204 14.9204 16.0998 15.5823C15.9932 16.2612 15.8223 16.8266 15.4815 17.3211C15.169 17.7735 14.7665 18.1553 14.3007 18.4422C13.7907 18.7559 13.2215 18.8931 12.544 18.9587H7.43901C6.76151 18.8928 6.1915 18.7554 5.6815 18.4412C5.21483 18.1537 4.81233 17.7712 4.49983 17.3181C4.159 16.8227 3.98901 16.2566 3.88317 15.5767C3.77984 14.9138 3.72984 14.0839 3.66734 13.0381L3.22483 5.62591H2.49984C2.03984 5.62591 1.6665 5.25282 1.6665 4.79258C1.6665 4.33234 2.03984 3.95924 2.49984 3.95924L6.17484 3.95866L6.47151 3.30879C6.64318 2.93113 6.79484 2.59851 6.94734 2.33161C7.11151 2.04372 7.30567 1.7773 7.59066 1.55904C7.97483 1.26388 8.42651 1.11423 8.90817 1.0704C9.23567 1.04054 9.5665 1.04142 9.89567 1.04228L10.1023 1.04266ZM7.9165 8.71774C7.5715 8.71774 7.2915 8.99758 7.2915 9.34274V14.3427C7.2915 14.688 7.5715 14.9677 7.9165 14.9677C8.2615 14.9677 8.5415 14.688 8.5415 14.3427V9.34274C8.5415 8.99758 8.2615 8.71774 7.9165 8.71774ZM12.0832 8.71774C11.7382 8.71774 11.4582 8.99758 11.4582 9.34274V14.3427C11.4582 14.688 11.7382 14.9677 12.0832 14.9677C12.4282 14.9677 12.7082 14.688 12.7082 14.3427V9.34274C12.7082 8.99758 12.4282 8.71774 12.0832 8.71774ZM10.1892 2.70931L10.029 2.70924C9.56984 2.70924 9.28067 2.71004 9.05901 2.7302C8.74734 2.75858 8.55317 2.88006 8.39484 3.15754C8.29067 3.33929 8.17817 3.58255 8.00651 3.95866H12.049C11.8607 3.5695 11.7398 3.32279 11.6307 3.14049C11.4698 2.87355 11.2782 2.75653 10.974 2.72934C10.7852 2.71243 10.5459 2.70973 10.1892 2.70931Z" fill="currentColor"/>
    </svg>
  )
}

function ChevronDownSmall() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M3 4.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  )
}

/* ---- Template defaults ---- */
const TEMPLATE_DEFAULTS = {
  'Ochtendhulp': { time: '08:00 - 09:00', icon: 'morning', durations: [{ name: 'Persoonlijke verzorging', duration: '45 min' }, { name: 'Huishoudelijke hulp', duration: '15 min' }] },
  'Avondhulp': { time: '21:30 - 23:00', icon: 'evening', durations: [{ name: 'Persoonlijke verzorging', duration: '1 uur' }, { name: 'Huishoudelijke hulp', duration: '30 min' }] },
  'Toilet': { time: '10:00 - 10:30', icon: 'toilet', durations: [{ name: 'Persoonlijke verzorging', duration: '30 min' }] },
  'Huishoudelijke hulp': { time: '12:00 - 13:00', icon: 'household', durations: [{ name: 'Huishoudelijke hulp', duration: '1 uur' }] },
  'Persoonlijke verzorging': { time: '10:00 - 12:00', icon: 'morning', durations: [{ name: 'Persoonlijke verzorging', duration: '2 uur' }] },
}

/* ---- Status badge component ---- */
function StatusBadge({ status }) {
  const labels = {
    bevestigd: null,
    actief: 'Actief',
    verzoek: 'Verzoek',
    geannuleerd: 'Geannuleerd',
    administratie: 'Administratie',
    over30min: 'Over 30 min',
  }
  const label = labels[status]
  if (!label) return null
  return (
    <span className={`agenda__badge agenda__badge--${status}`}>
      {label}
      {status === 'administratie' && <ArchiveSmallIcon />}
      {status === 'verzoek' && <MailOpenIcon size={16} />}
    </span>
  )
}

/* ---- Openstaande verzoeken sub-page ---- */
function OpenstaandeVerzoeken({ onBack, verzoeken }) {
  return (
    <div className="agenda-verzoeken">
      <header className="agenda-verzoeken__header">
        <button className="agenda-verzoeken__back" onClick={onBack} aria-label="Terug">
          <ChevronLeftIcon />
        </button>
        <h1 className="agenda-verzoeken__title">Openstaande verzoeken</h1>
        <span className="agenda-verzoeken__count">{verzoeken.length}</span>
      </header>

      <div className="agenda-verzoeken__list">
        {verzoeken.map(v => (
          <div key={v.id} className="agenda-verzoeken__item">
            <div className="agenda-verzoeken__item-left">
              <p className="agenda-verzoeken__item-date">{v.date}</p>
              <div className="agenda-verzoeken__item-time">
                <ClockSmallIcon />
                <span>{v.time}</span>
              </div>
            </div>
            <div className="agenda-verzoeken__item-center">
              <p className="agenda-verzoeken__item-client">{v.client}</p>
              <p className="agenda-verzoeken__item-type">{v.type}</p>
            </div>
            <div className="agenda-verzoeken__item-actions">
              <button className="agenda-verzoeken__decline" aria-label="Afwijzen">
                <DeclineIcon />
              </button>
              <button className="agenda-verzoeken__accept" aria-label="Accepteren">
                <AcceptIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---- Main component ---- */
function Agenda({ initialSubPage = null, onNavigate }) {
  const [subPage, setSubPage] = useState(initialSubPage)
  const [weekIndex, setWeekIndex] = useState(1)
  const [selectedDay, setSelectedDay] = useState(0)
  const [hiddenCards, setHiddenCards] = useState({})
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const dayRefs = useRef([])
  const dateInputRef = useRef(null)

  const openAppointmentSheet = (apt, day) => {
    setSelectedAppointment({ ...apt, isoDate: day.isoDate, dayLabel: day.label })
  }

  const week = WEEKS[weekIndex]
  const dateInputValue = week.days[selectedDay]?.isoDate || week.days[0].isoDate

  const handleDateChange = (e) => {
    const picked = e.target.value
    for (let wi = 0; wi < WEEKS.length; wi++) {
      const dayIdx = WEEKS[wi].days.findIndex(d => d.isoDate === picked)
      if (dayIdx !== -1) {
        setWeekIndex(wi)
        setSelectedDay(dayIdx)
        setTimeout(() => {
          dayRefs.current[dayIdx]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 50)
        return
      }
    }
  }

  const prevWeek = () => { setWeekIndex(Math.max(0, weekIndex - 1)); setSelectedDay(0) }
  const nextWeek = () => { setWeekIndex(Math.min(WEEKS.length - 1, weekIndex + 1)); setSelectedDay(0) }
  const goToToday = () => {
    // Find the week and day index with isToday
    for (let wi = 0; wi < WEEKS.length; wi++) {
      const dayIdx = WEEKS[wi].days.findIndex(d => d.isToday)
      if (dayIdx !== -1) {
        setWeekIndex(wi)
        setSelectedDay(dayIdx)
        setTimeout(() => {
          dayRefs.current[dayIdx]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 50)
        return
      }
    }
  }

  const handleAccept = (id) => setHiddenCards(prev => ({ ...prev, [id]: 'accepted' }))
  const handleDecline = (id) => setHiddenCards(prev => ({ ...prev, [id]: 'declined' }))

  const verzoekCount = alleVerzoeken.length

  if (subPage === SUB_PAGES.ALLE_VERZOEKEN) {
    return <AlleVerzoeken onBack={() => setSubPage(null)} />
  }

  return (
    <div className="agenda">
      {/* Sticky header */}
      <div className="agenda__sticky-header">
        {/* Header — matches zorgvrager layout */}
        <div className="agenda__header">
          <div className="agenda__header-top">
            <div className="agenda__month-row" onClick={() => dateInputRef.current?.showPicker()} role="button" tabIndex={0} aria-label="Datum selecteren">
              <h1 className="agenda__month">{week.month}</h1>
              <span className="agenda__month-icon"><CalendarSmallIcon /></span>
              <input
                ref={dateInputRef}
                type="date"
                className="agenda__month-input"
                value={dateInputValue}
                onChange={handleDateChange}
                aria-hidden="true"
                tabIndex={-1}
              />
            </div>
            <div className="agenda__header-actions">
              <button className="agenda__vandaag-btn" onClick={goToToday} aria-label="Ga naar vandaag">
                Vandaag
              </button>
              <button className="agenda__inbox-btn" onClick={() => setSubPage(SUB_PAGES.ALLE_VERZOEKEN)} aria-label="Openstaande verzoeken">
                <MailOpenIcon />
                {verzoekCount > 0 && <span className="agenda__inbox-badge">{verzoekCount}</span>}
              </button>
            </div>
          </div>
          <p className="agenda__week-label">Week {week.weekNr}</p>
        </div>

        {/* Day selector — matches zorgvrager layout */}
        <div className="agenda__day-selector">
          <button className="agenda__nav-arrow" onClick={prevWeek} disabled={weekIndex === 0} aria-label="Vorige week">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 1L1 6l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="agenda__day-btns">
            {week.days.map((day, i) => {
              const btnClasses = [
                'agenda__day-btn',
                i === selectedDay && 'agenda__day-btn--active',
                day.isToday && 'agenda__day-btn--today',
                day.appointments.length === 0 && 'agenda__day-btn--no-appointments',
              ].filter(Boolean).join(' ')
              return (
                <button
                  key={day.isoDate}
                  className={btnClasses}
                  onClick={() => {
                    setSelectedDay(i)
                    dayRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  aria-label={day.label}
                >
                  <span className="agenda__day-btn-abbr">{day.dayAbbr}</span>
                  <span className="agenda__day-btn-date">{day.date}</span>
                </button>
              )
            })}
          </div>
          <button className="agenda__nav-arrow" onClick={nextWeek} disabled={weekIndex === WEEKS.length - 1} aria-label="Volgende week">
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Beschikbaarheid sub-header */}
        <div className="agenda__sub-header">
          <button className="agenda__beschikbaarheid-link" onClick={() => onNavigate(PAGES.BESCHIKBAARHEID)}>
            Beschikbaarheid
          </button>
        </div>
      </div>

      {/* Day list */}
      <div className="agenda__days">
        {week.days.map((day, i) => {
          const visibleAppointments = day.appointments.filter(a => !hiddenCards[a.id])
          const hasAppointments = visibleAppointments.length > 0
          const requestCount = visibleAppointments.filter(a => a.status === 'verzoek').length

          return (
            <div
              key={day.isoDate}
              ref={el => dayRefs.current[i] = el}
              className="agenda__day"
            >
              {/* Day header with left border */}
              <div className={`agenda__datum ${hasAppointments ? 'agenda__datum--has-appointments' : 'agenda__datum--empty'}`}>
                <h3 className="agenda__datum-label">{day.label}</h3>
                <span className="agenda__datum-meta">
                  {hasAppointments ? (
                    <>
                      {day.workingHours || ''}
                      {requestCount > 0 && <span className="agenda__datum-extra"> +{requestCount}</span>}
                    </>
                  ) : (
                    'geen afspraken'
                  )}
                </span>
              </div>

              {/* Appointment cards */}
              {hasAppointments && (
                <div className="agenda__card-list">
                  {visibleAppointments.map(apt => {
                    const isRequest = apt.status === 'verzoek'
                    return (
                      <div key={apt.id} className={`agenda__card-wrapper ${isRequest ? 'agenda__card-wrapper--request' : ''}`}>
                        <div className={`agenda__card ${isRequest ? 'agenda__card--request' : ''}`} onClick={() => openAppointmentSheet(apt, day)} role="button" tabIndex={0} aria-label={`${apt.type} openen`} style={{ cursor: 'pointer' }}>
                          <div className="agenda__card-top">
                            <span className="agenda__card-time">{apt.time}</span>
                            <StatusBadge status={apt.status} />
                          </div>
                          <div className="agenda__card-name">
                            <span className="agenda__card-client">{apt.client}</span>
                          </div>
                          <div className="agenda__card-type">
                            <SmallCareIcon type={apt.icon} />
                            <span>{apt.type}</span>
                          </div>
                        </div>

                        {isRequest && (
                          <div className="agenda__card-actions">
                            <button className="agenda__card-decline" onClick={() => handleDecline(apt.id)}>
                              <DeclineIcon /> Afwijzen
                            </button>
                            <button className="agenda__card-accept" onClick={() => handleAccept(apt.id)}>
                              <AcceptIcon /> Accepteren
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Appointment bottom sheet */}
      {selectedAppointment && (() => {
        const defaults = TEMPLATE_DEFAULTS[selectedAppointment.type] || { durations: [] }
        const [startTime, endTime] = selectedAppointment.time.split(' - ')
        const clientName = selectedAppointment.client
        const clientInitials = clientName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

        // Calculate total duration from start/end
        const [sh, sm] = startTime.split(':').map(Number)
        const [eh, em] = endTime.split(':').map(Number)
        const totalMin = (eh * 60 + em) - (sh * 60 + sm)
        const durationStr = totalMin >= 60
          ? `${Math.floor(totalMin / 60)}u${totalMin % 60 > 0 ? ` ${totalMin % 60} min` : ''}`
          : `${totalMin} min`

        const isVerzoek = selectedAppointment.status === 'verzoek'

        return (
          <div className="agenda__bs-overlay" onClick={() => setSelectedAppointment(null)}>
            <div className="agenda__bs" onClick={e => e.stopPropagation()}>
              {/* Header */}
              <div className="agenda__bs-header">
                <button className="agenda__bs-close" onClick={() => setSelectedAppointment(null)} aria-label="Sluiten">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
                <div className="agenda__bs-header-right">
                  <span className="agenda__bs-verzoek-badge">
                    <MailOpenIcon size={16} /> Verzoek
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="agenda__bs-title">
                <span className="agenda__bs-icon-circle">
                  <CareIcon type={selectedAppointment.icon} />
                </span>
                <h2 className="agenda__bs-title-text">{selectedAppointment.type}</h2>
              </div>

              {/* Date row */}
              <div className="agenda__bs-row">
                <span className="agenda__bs-icon-sm">
                  <CalendarSmallIcon />
                </span>
                <span className="agenda__bs-row-text">{selectedAppointment.dayLabel}</span>
              </div>

              {/* Time row */}
              <div className="agenda__bs-row">
                <span className="agenda__bs-icon-sm">
                  <ClockIcon size={20} />
                </span>
                <span className="agenda__bs-row-text">{selectedAppointment.time}</span>
                <span className="agenda__bs-row-meta">({durationStr})</span>
              </div>

              {/* Location row */}
              <div className="agenda__bs-row agenda__bs-row--bottom-border">
                <span className="agenda__bs-icon-sm">
                  <LocationOutlineIcon size={20} />
                </span>
                <span className="agenda__bs-row-text">Dorpsstraat 30</span>
              </div>

              {/* Note */}
              <div className="agenda__bs-note">
                <div className="agenda__bs-note-header">
                  <NoteSolidIcon size={16} /> <span>Notitie</span>
                </div>
                <p className="agenda__bs-note-body">To do vandaag: bed verschonen, planten water geven, vuilnis buiten zetten</p>
              </div>

              {/* Duration breakdown */}
              <div className="agenda__bs-durations">
                <div className="agenda__bs-row agenda__bs-row--top">
                  <span className="agenda__bs-icon-sm">
                    <TimerIcon size={16} />
                  </span>
                  <div className="agenda__bs-duration-list">
                    {(defaults.durations || []).map((d, i) => (
                      <div key={i} className="agenda__bs-duration-row">
                        <span>{d.name}</span>
                        <span className="agenda__bs-duration-value">{d.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Client */}
              <div className="agenda__bs-caregiver">
                <span className="agenda__bs-initials">{clientInitials}</span>
                <span className="agenda__bs-caregiver-name">{clientName}</span>
                <button className="agenda__bs-tarieven" onClick={() => alert('Tarieven (nog niet geïmplementeerd)')}>
                  Tarieven <ChevronDownSmall />
                </button>
              </div>

              {/* Historie */}
              <button className="agenda__bs-historie" onClick={() => alert('Historie (nog niet geïmplementeerd)')}>
                Historie <ChevronDownSmall />
              </button>

              {/* Actions — no Dupliceer, only Annuleren */}
              <div className="agenda__bs-actions">
                <button className="agenda__bs-delete" onClick={() => alert('Afspraak annuleren (nog niet geïmplementeerd)')}>
                  <DeleteIcon size={20} /> Afspraak annuleren
                </button>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

export default Agenda
