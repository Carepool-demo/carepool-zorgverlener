import { useState } from 'react'
import { PAGES } from '../constants/routes'
import TopBar from '../components/TopBar'
import SvbDeclaratie from './SvbDeclaratie'
import BudgetOverzicht from './BudgetOverzicht'
import DownloadZorglogs from './DownloadZorglogs'
import ZorglogsTab from './ZorglogsTab'
import OverzichtenTab from './OverzichtenTab'
import TarievenTab from '@app/pages/TarievenTab'
import './Admin.css'

/* ---- Admin page ---- */
function Admin({ onNavigate, initialTab = null, initialMonth = null, onSubPageChange, notificationCount }) {
  const [activeTab, setActiveTab] = useState(initialTab || 'zorglogs')
  const [showSvbPage, setShowSvbPage] = useState(false)
  const [showBudgetPage, setShowBudgetPage] = useState(false)
  const [showDownloadPage, setShowDownloadPage] = useState(false)

  const openSubPage = (setter) => { setter(true); onSubPageChange?.('sub') }
  const closeSubPage = (setter) => { setter(false); onSubPageChange?.(null) }

  if (showDownloadPage) {
    return <DownloadZorglogs onBack={() => closeSubPage(setShowDownloadPage)} />
  }

  if (showBudgetPage) {
    return <BudgetOverzicht onBack={() => closeSubPage(setShowBudgetPage)} />
  }

  if (showSvbPage) {
    return <SvbDeclaratie onBack={() => closeSubPage(setShowSvbPage)} />
  }

  const tabs = [
    { id: 'zorglogs', label: 'Zorglogs' },
    { id: 'overzichten', label: 'Overzichten' },
    { id: 'tarieven', label: 'Tarieven' },
  ]

  return (
    <div className="admin">
      <TopBar title="Administratie" onAvatarClick={() => onNavigate(PAGES.PROFIEL_INSTELLINGEN)} onNotificatieClick={() => onNavigate(PAGES.NOTIFICATIES)} notificationCount={notificationCount} />

      {/* Tab navigation */}
      <div className="admin__tabs" role="tablist" aria-label="Administratie tabbladen">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            className={`admin__tab ${activeTab === tab.id ? 'admin__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            role="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div role="tabpanel" id={`panel-${activeTab}`} aria-labelledby={`tab-${activeTab}`}>
        {activeTab === 'zorglogs' && <ZorglogsTab onDownload={() => openSubPage(setShowDownloadPage)} />}
        {activeTab === 'overzichten' && <OverzichtenTab onOpenSvb={() => openSubPage(setShowSvbPage)} onOpenBudget={() => openSubPage(setShowBudgetPage)} onDownload={() => openSubPage(setShowDownloadPage)} initialMonth={initialMonth} />}
        {activeTab === 'tarieven' && <TarievenTab />}
      </div>
    </div>
  )
}

export default Admin
