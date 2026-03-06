import { useState } from 'react'
import { BackArrowIcon, PlusIcon, CareIcon, EditIcon } from '../components/Icons'
import { careTemplates } from '../data/dummyData'
import './NieuweAfspraak.css'

/* ---- Page-specific icons ---- */
function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.99976 1.0415C14.9472 1.0415 18.9586 5.05211 18.9587 9.99951C18.9587 14.9471 14.9473 18.9585 9.99976 18.9585C5.05236 18.9583 1.04175 14.947 1.04175 9.99951C1.04192 5.05222 5.05246 1.04168 9.99976 1.0415ZM13.9226 6.07764C13.5972 5.7522 13.0693 5.7522 12.7439 6.07764L9.99976 8.8208L8.50562 7.32764C8.18017 7.00222 7.65331 7.00221 7.32788 7.32764C7.00246 7.65308 7.00245 8.17994 7.32788 8.50537L8.82202 9.99951L8.57788 10.2437C8.25244 10.5691 8.25244 11.0969 8.57788 11.4224C8.90328 11.7476 9.43022 11.7476 9.75562 11.4224L9.99976 11.1782L10.2439 11.4224C10.5693 11.7477 11.0972 11.7477 11.4226 11.4224C11.748 11.0969 11.748 10.5691 11.4226 10.2437L11.1785 9.99951L13.9226 7.25537C14.2478 6.92998 14.2478 6.40303 13.9226 6.07764Z" fill="currentColor"/>
    </svg>
  )
}

function LocationPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.0013 1.0415C6.81281 1.0415 3.77087 2.92736 2.49761 5.90374C1.31265 8.67371 1.95414 11.0309 3.28976 13.0494C4.38481 14.7044 5.98196 16.1814 7.42285 17.5138L7.42298 17.5139L7.42353 17.5145C7.69807 17.7683 7.96692 18.017 8.22555 18.2606L8.22693 18.2619C8.70611 18.7105 9.34263 18.9582 10.0013 18.9582C10.6599 18.9582 11.2965 18.7105 11.7757 18.2618C12.0203 18.0328 12.2738 17.7992 12.5325 17.5609L12.5325 17.5608L12.5326 17.5608C13.9891 16.2187 15.6087 14.7265 16.7152 13.0506C18.0492 11.03 18.6884 8.67028 17.505 5.90374C16.2317 2.92736 13.1897 1.0415 10.0013 1.0415ZM10 5.83317C8.15905 5.83317 6.66667 7.32555 6.66667 9.1665C6.66667 11.0075 8.15905 12.4998 10 12.4998C11.8409 12.4998 13.3333 11.0075 13.3333 9.1665C13.3333 7.32555 11.8409 5.83317 10 5.83317Z" fill="currentColor"/>
    </svg>
  )
}

function NoteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.1667 0.9375C14.6269 0.9375 14.9996 1.31042 14.9998 1.77051V2.0918C15.7106 2.19773 16.3123 2.41505 16.7937 2.89648C17.2949 3.39793 17.5102 4.02959 17.6111 4.7793C17.7081 5.50168 17.7088 6.42121 17.7087 7.56055V13.4854C17.7088 14.6245 17.7082 15.5434 17.6111 16.2656C17.5102 17.0154 17.2951 17.648 16.7937 18.1494C16.2922 18.6507 15.6598 18.867 14.9099 18.9678C14.1876 19.0648 13.2688 19.0645 12.1296 19.0645H10.0144L8.47534 16.168L8.44019 16.1113C8.03175 15.461 7.69041 14.9175 7.36304 14.5273C7.01793 14.1162 6.62155 13.7925 6.07788 13.6943C5.30789 13.5554 4.44461 13.8737 3.76343 14.2217C3.259 14.4794 2.77934 14.7944 2.39038 15.083C2.36217 14.9603 2.33935 14.8345 2.32593 14.7051C2.29149 14.372 2.29173 13.9679 2.29175 13.4932V7.56055C2.29173 6.42126 2.29236 5.50166 2.38941 4.7793C2.49023 4.02975 2.70581 3.39787 3.20679 2.89648C3.68789 2.41538 4.28956 2.19782 4.99976 2.0918L5.00073 1.77051C5.00091 1.31042 5.37361 0.9375 5.83374 0.9375C6.2938 0.937588 6.66657 1.31047 6.66675 1.77051V1.9873C7.03716 1.98206 7.43807 1.98144 7.87085 1.98145H9.16675V1.77051C9.16692 1.31058 9.53985 0.937764 9.99976 0.9375C10.4599 0.9375 10.8336 1.31042 10.8337 1.77051V1.98145H12.1296C12.5624 1.98144 12.9634 1.98206 13.3337 1.9873V1.77051C13.3339 1.31047 13.7067 0.937588 14.1667 0.9375ZM5.8562 14.9238C5.99281 14.9485 6.15114 15.0286 6.40503 15.3311C6.66785 15.6442 6.96115 16.1069 7.39331 16.7949L8.5564 18.9844C8.3188 18.9193 8.09247 18.8097 7.81323 18.6699L7.76734 18.6465L4.45288 16.9893C4.02821 16.7769 3.66715 16.5968 3.38452 16.417C3.26045 16.338 3.1456 16.2517 3.03784 16.1592C3.39318 15.8879 3.85415 15.5791 4.33179 15.335C4.97725 15.0052 5.51881 14.863 5.8562 14.9238ZM6.66675 11.1465C6.32183 11.1467 6.04192 11.4266 6.04175 11.7715C6.04193 12.1164 6.32183 12.3963 6.66675 12.3965H13.3337C13.6787 12.3964 13.9586 12.1165 13.9587 11.7715C13.9586 11.4265 13.6787 11.1466 13.3337 11.1465H6.66675ZM6.66675 6.98047C6.32172 6.98065 6.04175 7.2604 6.04175 7.60547C6.0421 7.95024 6.32194 8.23029 6.66675 8.23047H10.0007C10.3455 8.23021 10.6254 7.95019 10.6257 7.60547C10.6257 7.26045 10.3457 6.98073 10.0007 6.98047H6.66675Z" fill="currentColor"/>
    </svg>
  )
}

function UserAddIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.61637 13.1885C6.61853 11.9963 8.95818 11.5611 11.2043 11.8779C12.021 11.9931 12.8165 12.2078 13.5851 12.5215C13.926 12.6606 14.0895 13.0497 13.9504 13.3906C13.8112 13.7314 13.422 13.895 13.0812 13.7559C12.4145 13.4838 11.7254 13.298 11.0177 13.1982C9.06276 12.9226 7.03146 13.3024 5.29899 14.334C5.14974 14.4229 4.98591 14.5161 4.81461 14.6133C4.18124 14.9726 3.4415 15.3918 2.92594 15.8965C2.60595 16.2097 2.46932 16.4683 2.44742 16.668C2.43009 16.8265 2.47069 17.0881 2.87125 17.4697C3.79199 18.3469 4.72751 18.8887 5.85856 18.8887H11.1115C11.4795 18.8889 11.7775 19.1876 11.7775 19.5557C11.7774 19.9237 11.4795 20.2225 11.1115 20.2227H5.85856C4.24236 20.2227 2.99259 19.4275 1.95133 18.4355C1.34779 17.8606 1.04689 17.213 1.12223 16.5234C1.19311 15.8749 1.58295 15.345 1.99332 14.9434C2.64947 14.3012 3.6078 13.7608 4.24137 13.4033C4.38567 13.3219 4.51312 13.2499 4.61637 13.1885ZM16.4445 12.667C16.8125 12.6671 17.1103 12.965 17.1105 13.333V15.7773H19.5558C19.9238 15.7776 20.2218 16.0763 20.2218 16.4443C20.2218 16.8124 19.9238 17.1111 19.5558 17.1113H17.1105V19.5557C17.1105 19.9237 16.8126 20.2225 16.4445 20.2227C16.0763 20.2227 15.7776 19.9238 15.7775 19.5557V17.1113H13.3332C12.965 17.1113 12.6662 16.8125 12.6662 16.4443C12.6662 16.0762 12.965 15.7773 13.3332 15.7773H15.7775V13.333C15.7777 12.965 16.0764 12.667 16.4445 12.667ZM10.6662 1.11133C13.2434 1.11133 15.3329 3.20021 15.3332 5.77734C15.3332 8.35467 13.2435 10.4443 10.6662 10.4443C8.089 10.4442 6.00016 8.35456 6.00016 5.77734C6.00039 3.20033 8.08914 1.11151 10.6662 1.11133ZM10.6662 2.44434C8.82552 2.44452 7.3334 3.93671 7.33317 5.77734C7.33317 7.61818 8.82538 9.11115 10.6662 9.11133C12.5071 9.11133 14.0002 7.61829 14.0002 5.77734C13.9999 3.93659 12.507 2.44434 10.6662 2.44434Z" fill="currentColor"/>
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.2423 1.36048C21.732 0.828621 23.1706 2.26727 22.6388 3.75696L16.3 21.505C15.669 23.2716 13.1222 23.1193 12.7062 21.2902L11.1603 14.4103L15.0763 10.3771C15.4608 9.9808 15.4511 9.34765 15.0548 8.96302C14.6586 8.57845 14.0255 8.58744 13.6408 8.98353L9.84293 12.8956L2.71012 11.2931C0.880821 10.8773 0.727807 8.33044 2.4943 7.69935L20.2423 1.36048Z" fill="currentColor"/>
    </svg>
  )
}

function CalendarFieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0.666992C12.3681 0.666992 12.6668 0.964968 12.667 1.33301V1.63281C12.5191 1.58591 12.3652 1.54734 12.2061 1.51465C12.9112 1.65953 13.5068 1.92963 13.9883 2.4502C14.5404 3.04727 14.7782 3.79546 14.8906 4.69922C15.0001 5.57939 15 6.70306 15 8.11621V8.55078C15 9.96397 15.0001 11.0876 14.8906 11.9678C14.7782 12.8715 14.5404 13.6197 13.9883 14.2168C13.4291 14.8213 12.7164 15.0889 11.8564 15.2139C11.0324 15.3336 9.98439 15.333 8.68555 15.333H7.31445C6.01561 15.333 4.96761 15.3336 4.14355 15.2139C3.28357 15.0889 2.5709 14.8213 2.01172 14.2168C1.45955 13.6197 1.22179 12.8715 1.10938 11.9678C0.999913 11.0876 0.999987 9.96397 1 8.55078V8.11621C0.999987 6.70307 0.999927 5.57939 1.10938 4.69922C1.22177 3.79546 1.45963 3.04727 2.01172 2.4502C2.49192 1.93106 3.08548 1.6608 3.78809 1.51562C3.63106 1.54807 3.47906 1.58648 3.33301 1.63281V1.33301C3.33318 0.964968 3.63192 0.666993 4 0.666992C4.36808 0.666992 4.66682 0.964968 4.66699 1.33301V1.39453C4.6392 1.39686 4.61135 1.39984 4.58398 1.40234C5.33161 1.33392 6.23668 1.33299 7.31445 1.33301H8.68555C9.76285 1.33299 10.6676 1.334 11.415 1.40234C11.388 1.39987 11.3605 1.39683 11.333 1.39453V1.33301C11.3332 0.964968 11.6319 0.666993 12 0.666992ZM2.99902 6C2.69339 6 2.53975 5.9997 2.44238 6.0957C2.34507 6.19176 2.34278 6.34299 2.33887 6.64453C2.33305 7.09329 2.33301 7.59609 2.33301 8.16211V8.50488C2.33301 9.97442 2.33463 11.0146 2.43262 11.8027C2.52888 12.5768 2.70882 13.0062 2.99121 13.3115C3.26671 13.6093 3.6431 13.7939 4.33496 13.8945C5.05193 13.9987 6.00262 14 7.36621 14H8.63379C9.99738 14 10.9481 13.9987 11.665 13.8945C12.3569 13.7939 12.7333 13.6093 13.0088 13.3115C13.2912 13.0062 13.4711 12.5768 13.5674 11.8027C13.6654 11.0146 13.667 9.97442 13.667 8.50488V8.16211C13.667 7.59609 13.667 7.09329 13.6611 6.64453C13.6572 6.34299 13.6549 6.19176 13.5576 6.0957C13.4602 5.99971 13.3066 6 13.001 6H2.99902ZM5.33887 10.5C5.799 10.5 6.17268 10.8729 6.17285 11.333C6.17285 11.7932 5.7991 12.167 5.33887 12.167H5.33301C4.87292 12.1668 4.5 11.7931 4.5 11.333C4.50018 10.873 4.87303 10.5002 5.33301 10.5H5.33887ZM8.00293 10.5C8.46306 10.5 8.83576 10.8729 8.83594 11.333C8.83594 11.7932 8.46317 12.167 8.00293 12.167H7.99707C7.53683 12.167 7.16406 11.7932 7.16406 11.333C7.16424 10.8729 7.53694 10.5 7.99707 10.5H8.00293ZM5.33887 7.83301C5.7991 7.83301 6.17285 8.20675 6.17285 8.66699C6.17268 9.12708 5.799 9.5 5.33887 9.5H5.33301C4.87303 9.49982 4.50018 9.12697 4.5 8.66699C4.5 8.20686 4.87292 7.83318 5.33301 7.83301H5.33887ZM8.00293 7.83301C8.46317 7.83301 8.83594 8.20675 8.83594 8.66699C8.83576 9.12708 8.46306 9.5 8.00293 9.5H7.99707C7.53694 9.5 7.16424 9.12708 7.16406 8.66699C7.16406 8.20675 7.53683 7.83301 7.99707 7.83301H8.00293ZM10.667 7.83301C11.1271 7.83318 11.5 8.20686 11.5 8.66699C11.4998 9.12697 11.127 9.49982 10.667 9.5H10.6611C10.201 9.5 9.82732 9.12708 9.82715 8.66699C9.82715 8.20675 10.2009 7.83301 10.6611 7.83301H10.667Z" fill="currentColor"/>
    </svg>
  )
}

function AddCategoryIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2.29199C10.5752 2.29199 11.0418 2.75786 11.042 3.33301V8.95801H16.667C17.2421 8.95818 17.708 9.42481 17.708 10C17.708 10.5752 17.2421 11.0418 16.667 11.042H11.042V16.667C11.0418 17.2421 10.5752 17.708 10 17.708C9.42481 17.708 8.95818 17.2421 8.95801 16.667V11.042H3.33301C2.75786 11.0418 2.29199 10.5752 2.29199 10C2.29199 9.42481 2.75786 8.95818 3.33301 8.95801H8.95801V3.33301C8.95818 2.75786 9.42481 2.29199 10 2.29199Z" fill="currentColor"/>
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path d="M8 12.5L10.5 15L16 9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/* ---- Main component ---- */
function NieuweAfspraak({ onBack, zorgCategorieen = [] }) {
  const getEnabledCategories = () =>
    zorgCategorieen.flatMap(group =>
      group.items.filter(item => item.enabled).map(item => ({
        id: item.id, name: item.label
      }))
    )

  const [step, setStep] = useState('select')
  const [titel, setTitel] = useState('')
  const [datum, setDatum] = useState('Vandaag')
  const [startTijd, setStartTijd] = useState('12:00')
  const [eindTijd, setEindTijd] = useState('13:00')
  const [adres, setAdres] = useState('')
  const [notitie, setNotitie] = useState('')
  const [categories, setCategories] = useState([])
  const [zorgverlener, setZorgverlener] = useState('')
  const [selectedIds, setSelectedIds] = useState([])
  const [editingDurations, setEditingDurations] = useState([])

  const canVersturen = zorgverlener && datum && startTijd && eindTijd && categories.length > 0

  const handleSelectNieuw = () => {
    setCategories([])
    setTitel('')
    setStep('form')
  }

  const handleSelectTemplate = (template) => {
    setTitel(template.label)
    setCategories([])
    setStep('form')
  }

  const handleBack = () => {
    if (step === 'pickCategory' || step === 'editDurations') {
      setStep('form')
    } else if (step === 'form') {
      setStep('select')
    } else {
      onBack()
    }
  }

  /* Parse duration string to minutes */
  const parseDurationToMinutes = (duration) => {
    if (duration.includes('u')) {
      const parts = duration.split('u')
      let mins = parseInt(parts[0]) * 60
      if (parts[1] && parts[1].trim()) {
        mins += parseInt(parts[1])
      }
      return mins
    }
    return parseInt(duration) || 0
  }

  /* Format minutes to display string */
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0 && mins > 0) return `${hours}u ${mins} min`
    if (hours > 0) return `${hours}u`
    return `${mins} min`
  }

  /* Total minutes from start→eind time range */
  const getTotalMinutesFromTimeRange = () => {
    const [sh, sm] = startTijd.split(':').map(Number)
    const [eh, em] = eindTijd.split(':').map(Number)
    return (eh * 60 + em) - (sh * 60 + sm)
  }

  /* Total minutes from all categories */
  const getCategoryTotalMinutes = () => {
    return categories.reduce((sum, cat) => sum + parseDurationToMinutes(cat.duration), 0)
  }

  /* Difference: time range minus category total */
  const getUnassignedMinutes = () => {
    return getTotalMinutesFromTimeRange() - getCategoryTotalMinutes()
  }

  const handleOpenPicker = () => {
    setSelectedIds(categories.map(c => c.id))
    setStep('pickCategory')
  }

  const handleToggleCategory = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const handleConfirmCategories = () => {
    const enabled = getEnabledCategories()
    const selected = enabled.filter(cat => selectedIds.includes(cat.id))
    const totalMinutes = getTotalMinutesFromTimeRange()
    if (selected.length === 1) {
      setCategories([{ ...selected[0], duration: formatDuration(totalMinutes) }])
    } else if (selected.length > 1) {
      const perCat = Math.floor(totalMinutes / selected.length)
      const remainder = totalMinutes % selected.length
      setCategories(selected.map((cat, i) => ({
        ...cat,
        duration: formatDuration(perCat + (i === 0 ? remainder : 0))
      })))
    } else {
      setCategories([])
    }
    setStep('form')
  }

  const handleOpenEditDurations = () => {
    setEditingDurations(categories.map(c => ({ ...c })))
    setStep('editDurations')
  }

  const handleEditDuration = (id, newDuration) => {
    setEditingDurations(prev => prev.map(c => c.id === id ? { ...c, duration: newDuration } : c))
  }

  const handleConfirmDurations = () => {
    setCategories(editingDurations)
    setStep('form')
  }

  /* ---- Category picker step ---- */
  if (step === 'pickCategory') {
    const enabledCats = getEnabledCategories()
    return (
      <div className="nieuwe-afspraak">
        <header className="nieuwe-afspraak__header">
          <button className="nieuwe-afspraak__back" onClick={handleBack} aria-label="Terug">
            <BackArrowIcon />
          </button>
          <h1 className="nieuwe-afspraak__title">Zorgcategorie kiezen</h1>
        </header>

        <div className="nieuwe-afspraak__body">
          <div className="nieuwe-afspraak__accent-section">
            <p className="nieuwe-afspraak__accent-text">Selecteer de zorgcategorieën voor dit moment</p>
            <div className="nieuwe-afspraak__pick-list">
            {enabledCats.map((cat) => {
              const isSelected = selectedIds.includes(cat.id)
              return (
                <button key={cat.id} className={`nieuwe-afspraak__pick-item ${isSelected ? 'nieuwe-afspraak__pick-item--selected' : ''}`} onClick={() => handleToggleCategory(cat.id)} aria-label={cat.name}>
                  <span className={`nieuwe-afspraak__pick-check ${isSelected ? 'nieuwe-afspraak__pick-check--on' : ''}`}>
                    {isSelected ? <CheckCircleIcon /> : <CircleIcon />}
                  </span>
                  <span className="nieuwe-afspraak__pick-label">{cat.name}</span>
                </button>
              )
            })}
            </div>
          </div>
        </div>

        <div className="nieuwe-afspraak__footer">
          <button className="nieuwe-afspraak__btn nieuwe-afspraak__btn--primary" onClick={handleConfirmCategories} aria-label="Bevestigen">
            Bevestigen
          </button>
        </div>
      </div>
    )
  }

  /* ---- Edit durations step ---- */
  if (step === 'editDurations') {
    const editTotal = editingDurations.reduce((sum, c) => sum + parseDurationToMinutes(c.duration), 0)
    const timeRangeTotal = getTotalMinutesFromTimeRange()
    const diff = timeRangeTotal - editTotal
    return (
      <div className="nieuwe-afspraak">
        <header className="nieuwe-afspraak__header">
          <button className="nieuwe-afspraak__back" onClick={handleBack} aria-label="Terug">
            <BackArrowIcon />
          </button>
          <h1 className="nieuwe-afspraak__title">Tijdsduur aanpassen</h1>
        </header>

        <div className="nieuwe-afspraak__body">
          <div className="nieuwe-afspraak__accent-section">
            <p className="nieuwe-afspraak__accent-text">Pas de duur per categorie aan</p>
            <div className="nieuwe-afspraak__categories-table">
              {editingDurations.map((cat) => (
              <div key={cat.id} className="nieuwe-afspraak__category-row">
                <span className="nieuwe-afspraak__category-name">{cat.name}</span>
                <input
                  type="text"
                  className="nieuwe-afspraak__edit-input"
                  value={cat.duration}
                  onChange={(e) => handleEditDuration(cat.id, e.target.value)}
                />
              </div>
            ))}
            <div className="nieuwe-afspraak__category-row nieuwe-afspraak__category-row--total">
              <span className="nieuwe-afspraak__category-name nieuwe-afspraak__category-name--total">Totaal</span>
              <span className="nieuwe-afspraak__category-duration nieuwe-afspraak__category-duration--total">{formatDuration(editTotal)}</span>
            </div>
            {diff !== 0 && (
              <div className="nieuwe-afspraak__category-warning">
                {diff > 0
                  ? `${formatDuration(diff)} niet toegewezen`
                  : `${formatDuration(Math.abs(diff))} te veel toegewezen`}
              </div>
            )}
            </div>
          </div>
        </div>

        <div className="nieuwe-afspraak__footer">
          <button className="nieuwe-afspraak__btn nieuwe-afspraak__btn--primary" onClick={handleConfirmDurations} aria-label="Bevestigen">
            Bevestigen
          </button>
        </div>
      </div>
    )
  }

  /* ---- Template selection step ---- */
  if (step === 'select') {
    return (
      <div className="nieuwe-afspraak">
        <header className="nieuwe-afspraak__header">
          <button className="nieuwe-afspraak__back" onClick={handleBack} aria-label="Terug">
            <BackArrowIcon />
          </button>
          <h1 className="nieuwe-afspraak__title">Nieuwe afspraak</h1>
        </header>

        <div className="nieuwe-afspraak__body">
          <div className="nieuwe-afspraak__accent-section">
            <p className="nieuwe-afspraak__accent-text">Starten vanaf sjabloon of nieuw zorgmoment?</p>

            <div className="nieuwe-afspraak__templates hide-scrollbar">
            {/* Nieuw option */}
            <button className="nieuwe-afspraak__template-item" onClick={handleSelectNieuw} aria-label="Nieuw zorgmoment">
              <div className="nieuwe-afspraak__template-icon nieuwe-afspraak__template-icon--new">
                <PlusIcon />
              </div>
              <span className="nieuwe-afspraak__template-label">Nieuw</span>
            </button>

            {/* Template options */}
            {careTemplates.map((tpl) => (
              <button key={tpl.id} className="nieuwe-afspraak__template-item" onClick={() => handleSelectTemplate(tpl)} aria-label={`${tpl.label} sjabloon`}>
                <div className="nieuwe-afspraak__template-icon">
                  <CareIcon type={tpl.icon} />
                </div>
                <span className="nieuwe-afspraak__template-label">{tpl.label}</span>
                {tpl.sublabel && <span className="nieuwe-afspraak__template-sublabel">{tpl.sublabel}</span>}
              </button>
            ))}
            </div>
          </div>
        </div>

        <div className="nieuwe-afspraak__footer">
          <button className="nieuwe-afspraak__btn nieuwe-afspraak__btn--outline" disabled aria-label="Opslaan">
            Opslaan
          </button>
          <button className="nieuwe-afspraak__btn nieuwe-afspraak__btn--primary" disabled aria-label="Versturen">
            <SendIcon />
            Versturen
          </button>
        </div>
      </div>
    )
  }

  /* ---- Form step ---- */
  return (
    <div className="nieuwe-afspraak">
      <header className="nieuwe-afspraak__header">
        <button className="nieuwe-afspraak__back" onClick={handleBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="nieuwe-afspraak__title">Nieuwe afspraak</h1>
      </header>

      <div className="nieuwe-afspraak__body nieuwe-afspraak__body--form">
        {/* Titel */}
        <div className="nieuwe-afspraak__field">
          <label className="nieuwe-afspraak__label">Titel</label>
          <div className="nieuwe-afspraak__input-wrapper">
            <input
              type="text"
              className="nieuwe-afspraak__input"
              placeholder="Bijv. 'Huishoudhulp' of 'Avondhulp'"
              value={titel}
              onChange={(e) => setTitel(e.target.value)}
            />
          </div>
        </div>

        {/* Datum */}
        <div className="nieuwe-afspraak__field">
          <label className="nieuwe-afspraak__label">Datum</label>
          <div className="nieuwe-afspraak__input-wrapper nieuwe-afspraak__input-wrapper--with-icon">
            <CalendarFieldIcon />
            <input
              type="text"
              className="nieuwe-afspraak__input"
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
            />
          </div>
        </div>

        {/* Tijdstip: start + eind naast elkaar */}
        <div className="nieuwe-afspraak__field">
          <div className="nieuwe-afspraak__time-row">
            <div className="nieuwe-afspraak__time-field">
              <label className="nieuwe-afspraak__label">Starttijd</label>
              <div className="nieuwe-afspraak__input-wrapper nieuwe-afspraak__input-wrapper--with-icon">
                <ClockIcon />
                <input
                  type="text"
                  className="nieuwe-afspraak__input"
                  value={startTijd}
                  onChange={(e) => setStartTijd(e.target.value)}
                />
              </div>
            </div>
            <div className="nieuwe-afspraak__time-field">
              <label className="nieuwe-afspraak__label">Eindtijd</label>
              <div className="nieuwe-afspraak__input-wrapper nieuwe-afspraak__input-wrapper--with-icon">
                <ClockIcon />
                <input
                  type="text"
                  className="nieuwe-afspraak__input"
                  value={eindTijd}
                  onChange={(e) => setEindTijd(e.target.value)}
                />
              </div>
            </div>
          </div>
          {getTotalMinutesFromTimeRange() > 0 && (
            <span className="nieuwe-afspraak__time-total">
              Totaal: {formatDuration(getTotalMinutesFromTimeRange())}
            </span>
          )}
        </div>

        {/* Zorg en tijdsduur */}
        {categories.length === 0 ? (
          <div className="nieuwe-afspraak__accent-section">
            <p className="nieuwe-afspraak__accent-text">Welke zorg en hoe lang?</p>
            <button className="nieuwe-afspraak__category-selector" onClick={handleOpenPicker} aria-label="Zorgcategorie toevoegen">
              <span className="nieuwe-afspraak__category-selector-text">Zorgcategorie</span>
              <span className="nieuwe-afspraak__category-selector-duration">0 uur 0 min</span>
              <span className="nieuwe-afspraak__category-selector-add">
                <AddCategoryIcon />
              </span>
            </button>
          </div>
        ) : (
          <>
            <p className="nieuwe-afspraak__section-label">Zorg en tijdsduur</p>
            <div className="nieuwe-afspraak__categories-table">
              {categories.map((cat) => (
                <div key={cat.id} className="nieuwe-afspraak__category-row">
                  <span className="nieuwe-afspraak__category-name">{cat.name}</span>
                  <span className="nieuwe-afspraak__category-duration">{cat.duration}</span>
                </div>
              ))}
              <div className="nieuwe-afspraak__category-row nieuwe-afspraak__category-row--total">
                <span className="nieuwe-afspraak__category-name nieuwe-afspraak__category-name--total">Totaal</span>
                <span className="nieuwe-afspraak__category-duration nieuwe-afspraak__category-duration--total">{formatDuration(getCategoryTotalMinutes())}</span>
              </div>
              {getUnassignedMinutes() !== 0 && (
                <div className="nieuwe-afspraak__category-warning">
                  {getUnassignedMinutes() > 0
                    ? `${formatDuration(getUnassignedMinutes())} niet toegewezen`
                    : `${formatDuration(Math.abs(getUnassignedMinutes()))} te veel toegewezen`}
                </div>
              )}
              <button className="nieuwe-afspraak__adjust-btn" onClick={handleOpenEditDurations} aria-label="Zorgcategorieen aanpassen">
                <EditIcon />
                Aanpassen
              </button>
            </div>
          </>
        )}

        {/* Adres */}
        <div className="nieuwe-afspraak__field">
          <label className="nieuwe-afspraak__label">Adres</label>
          <div className="nieuwe-afspraak__input-wrapper nieuwe-afspraak__input-wrapper--with-icon">
            <LocationPinIcon />
            <input
              type="text"
              className="nieuwe-afspraak__input"
              placeholder="Typ een adres"
              value={adres}
              onChange={(e) => setAdres(e.target.value)}
            />
          </div>
        </div>

        {/* Notitie */}
        <div className="nieuwe-afspraak__field">
          <label className="nieuwe-afspraak__label">Notitie</label>
          <div className="nieuwe-afspraak__input-wrapper nieuwe-afspraak__input-wrapper--with-icon">
            <NoteIcon />
            <input
              type="text"
              className="nieuwe-afspraak__input"
              placeholder="Voeg een notitie toe"
              value={notitie}
              onChange={(e) => setNotitie(e.target.value)}
            />
          </div>
        </div>

        {/* Zorgverlener */}
        <div className="nieuwe-afspraak__field">
          <label className="nieuwe-afspraak__label">Zorgverlener</label>
          <button className="nieuwe-afspraak__input-wrapper nieuwe-afspraak__input-wrapper--with-icon nieuwe-afspraak__input-wrapper--clickable" onClick={() => alert('Kies zorgverlener (nog niet geimplementeerd)')} aria-label="Kies zorgverlener">
            <UserAddIcon />
            <span className="nieuwe-afspraak__placeholder">Kies je zorgverlener(s)</span>
            <span className="nieuwe-afspraak__add-icon">
              <PlusIcon />
            </span>
          </button>
        </div>
      </div>

      <div className="nieuwe-afspraak__footer">
        <button className="nieuwe-afspraak__btn nieuwe-afspraak__btn--outline" onClick={() => alert('Opslaan (nog niet geimplementeerd)')} aria-label="Opslaan">
          Opslaan
        </button>
        <button className="nieuwe-afspraak__btn nieuwe-afspraak__btn--primary" disabled={!canVersturen} onClick={() => alert('Versturen (nog niet geimplementeerd)')} aria-label="Versturen">
          <SendIcon />
          Versturen
        </button>
      </div>
    </div>
  )
}

export default NieuweAfspraak
