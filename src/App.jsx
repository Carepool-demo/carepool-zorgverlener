import { useState } from 'react'
import { PAGES, SUB_PAGES, OVERLAY_PAGES } from './constants/routes'
import '@shared/App.css'
import Home from './pages/Home'
import Carepool from './pages/Carepool'
import Agenda from './pages/Agenda'
import Admin from '@shared/pages/Admin'
import Berichten from '@shared/pages/Berichten'
import ProfielInstellingen from './pages/ProfielInstellingen'
import Profiel from './pages/Profiel'
import Zorgcategorieen from './pages/Zorgcategorieen'
import HelpInfo from '@shared/pages/HelpInfo'
import Sjablonen from '@shared/pages/Sjablonen'
import Notificaties from '@shared/pages/Notificaties'
import NotificatieInstellingen from '@shared/pages/NotificatieInstellingen'
import Beschikbaarheid from './pages/Beschikbaarheid'
import BottomNav from '@shared/components/BottomNav'
import PasswordGate from '@shared/components/PasswordGate'
import { zorgCategorieenInstellingen as defaultCategories } from './data/dummyData'

function App() {
  const [activePage, setActivePage] = useState(PAGES.HOME)
  const [previousPage, setPreviousPage] = useState(PAGES.HOME)
  const [carepoolInitialSubPage, setCarepoolInitialSubPage] = useState(null)
  const [agendaInitialSubPage, setAgendaInitialSubPage] = useState(null)
  const [adminInitialTab, setAdminInitialTab] = useState(null)
  const [adminInitialMonth, setAdminInitialMonth] = useState(null)
  const [carepoolSubPage, setCarepoolSubPage] = useState(null)
  const [homeSubPage, setHomeSubPage] = useState(null)
  const [adminSubPage, setAdminSubPage] = useState(null)
  const [zorgCategorieen, setZorgCategorieen] = useState(defaultCategories)

  const handleTabChange = (page) => {
    setCarepoolInitialSubPage(null)
    setAgendaInitialSubPage(null)
    setAdminInitialTab(null)
    setAdminInitialMonth(null)
    setActivePage(page)
  }

  const handleNavigate = (page, subPage, extra) => {
    if (page === PAGES.CAREPOOL && subPage) setCarepoolInitialSubPage(subPage)
    if (page === PAGES.AGENDA && subPage) setAgendaInitialSubPage(subPage)
    if (page === PAGES.ADMIN && subPage) {
      setAdminInitialTab(subPage)
      if (extra) setAdminInitialMonth(extra)
    }
    if (page === PAGES.PROFIEL_INSTELLINGEN) {
      setPreviousPage(activePage)
    }
    setActivePage(page)
  }

  const hideNavForCarepoolSub = activePage === PAGES.CAREPOOL && carepoolSubPage != null
  const hideNavForHomeSub = activePage === PAGES.HOME && homeSubPage != null
  const hideNavForAdminSub = activePage === PAGES.ADMIN && adminSubPage != null
  const showBottomNav = !OVERLAY_PAGES.includes(activePage) && !hideNavForCarepoolSub && !hideNavForHomeSub && !hideNavForAdminSub

  return (
    <PasswordGate>
      <div className={`app-shell app-shell--${activePage}${!showBottomNav ? ' app-shell--no-nav' : ''}`}>
        <div className="app-content">
          {activePage === PAGES.HOME && <Home onNavigate={handleNavigate} onSubPageChange={setHomeSubPage} />}
          {activePage === PAGES.CAREPOOL && <Carepool initialSubPage={carepoolInitialSubPage} onNavigate={handleNavigate} onSubPageChange={setCarepoolSubPage} />}
          {activePage === PAGES.AGENDA && <Agenda initialSubPage={agendaInitialSubPage} onNavigate={handleNavigate} />}
          {activePage === PAGES.BERICHTEN && <Berichten onNavigate={handleNavigate} />}
          {activePage === PAGES.ADMIN && <Admin onNavigate={handleNavigate} initialTab={adminInitialTab} initialMonth={adminInitialMonth} onSubPageChange={setAdminSubPage} />}
          {activePage === PAGES.PROFIEL_INSTELLINGEN && <ProfielInstellingen onBack={() => setActivePage(previousPage)} onNavigate={handleNavigate} />}
          {activePage === PAGES.PROFIEL && <Profiel onBack={() => setActivePage(PAGES.PROFIEL_INSTELLINGEN)} onNavigate={handleNavigate} />}
          {activePage === PAGES.ZORGCATEGORIEEN && <Zorgcategorieen onBack={() => setActivePage(PAGES.PROFIEL_INSTELLINGEN)} categories={zorgCategorieen} onCategoriesChange={setZorgCategorieen} />}
          {activePage === PAGES.HELP_INFO && <HelpInfo onBack={() => setActivePage(PAGES.PROFIEL_INSTELLINGEN)} />}
          {activePage === PAGES.SJABLONEN && <Sjablonen onBack={() => setActivePage(PAGES.PROFIEL_INSTELLINGEN)} />}
          {activePage === PAGES.NOTIFICATIES && <Notificaties onBack={() => setActivePage(PAGES.PROFIEL_INSTELLINGEN)} />}
          {activePage === PAGES.NOTIFICATIE_INSTELLINGEN && <NotificatieInstellingen onBack={() => setActivePage(PAGES.PROFIEL_INSTELLINGEN)} />}
          {activePage === PAGES.BESCHIKBAARHEID && <Beschikbaarheid onBack={() => setActivePage(PAGES.PROFIEL)} />}
        </div>
        {showBottomNav && <BottomNav activeTab={activePage} onTabChange={handleTabChange} />}
      </div>
    </PasswordGate>
  )
}

export default App
