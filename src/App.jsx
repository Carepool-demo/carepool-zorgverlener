import { useState, useEffect, useRef } from 'react'
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
import ZorgverlenerProfiel from '@shared/pages/ZorgverlenerProfiel'
import BottomNav from '@shared/components/BottomNav'
import PasswordGate from '@shared/components/PasswordGate'
import Toast from '@shared/components/Toast'
import { zorgCategorieenInstellingen as defaultCategories, notificatiesData, berichtenChats, profielData } from './data/dummyData'

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
  const [berichtenSubPage, setBerichtenSubPage] = useState(null)
  const [berichtenInitialSubPage, setBerichtenInitialSubPage] = useState(null)
  const [zorgCategorieen, setZorgCategorieen] = useState(defaultCategories)
  const [isVindbaar, setIsVindbaar] = useState(true)
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0
  }, [activePage])

  const handleTabChange = (page) => {
    setCarepoolInitialSubPage(null)
    setAgendaInitialSubPage(null)
    setBerichtenInitialSubPage(null)
    setAdminInitialTab(null)
    setAdminInitialMonth(null)
    setActivePage(page)
  }

  const handleNavigate = (page, subPage, extra) => {
    if (page === PAGES.CAREPOOL && subPage) setCarepoolInitialSubPage(subPage)
    if (page === PAGES.AGENDA && subPage) setAgendaInitialSubPage(subPage)
    if (page === PAGES.BERICHTEN && subPage) setBerichtenInitialSubPage(subPage)
    if (page === PAGES.ADMIN && subPage) {
      setAdminInitialTab(subPage)
      if (extra) setAdminInitialMonth(extra)
    }
    if (OVERLAY_PAGES.includes(page)) {
      setPreviousPage(activePage)
    }
    setActivePage(page)
  }

  const notificationCount = notificatiesData.meldingen.reduce((sum, group) => sum + group.items.filter(i => i.unread).length, 0)
  const berichtenBadge = berichtenChats.reduce((sum, chat) => sum + chat.unread, 0)

  const hideNavForCarepoolSub = activePage === PAGES.CAREPOOL && carepoolSubPage != null
  const hideNavForHomeSub = activePage === PAGES.HOME && homeSubPage != null
  const hideNavForAdminSub = activePage === PAGES.ADMIN && adminSubPage != null
  const hideNavForBerichtenSub = activePage === PAGES.BERICHTEN && berichtenSubPage != null
  const showBottomNav = !OVERLAY_PAGES.includes(activePage) && !hideNavForCarepoolSub && !hideNavForHomeSub && !hideNavForAdminSub && !hideNavForBerichtenSub

  return (
    <PasswordGate>
      <div className={`app-shell app-shell--${activePage}${!showBottomNav ? ' app-shell--no-nav' : ''}`}>
        <div className="app-content" ref={contentRef}>
          {activePage === PAGES.HOME && <Home onNavigate={handleNavigate} onSubPageChange={setHomeSubPage} notificationCount={notificationCount} />}
          {activePage === PAGES.CAREPOOL && <Carepool initialSubPage={carepoolInitialSubPage} onNavigate={handleNavigate} onSubPageChange={setCarepoolSubPage} notificationCount={notificationCount} isVindbaar={isVindbaar} onToggleVindbaar={() => setIsVindbaar(v => !v)} />}
          {activePage === PAGES.AGENDA && <Agenda initialSubPage={agendaInitialSubPage} onNavigate={handleNavigate} />}
          {activePage === PAGES.BERICHTEN && <Berichten initialSubPage={berichtenInitialSubPage} onNavigate={handleNavigate} onSubPageChange={setBerichtenSubPage} notificationCount={notificationCount} />}
          {activePage === PAGES.ADMIN && <Admin onNavigate={handleNavigate} initialTab={adminInitialTab} initialMonth={adminInitialMonth} onSubPageChange={setAdminSubPage} notificationCount={notificationCount} />}
          {activePage === PAGES.PROFIEL_INSTELLINGEN && <ProfielInstellingen onBack={() => setActivePage(previousPage)} onNavigate={handleNavigate} />}
          {activePage === PAGES.PROFIEL && <Profiel onBack={() => setActivePage(previousPage)} onNavigate={handleNavigate} isVindbaar={isVindbaar} onToggleVindbaar={() => setIsVindbaar(v => !v)} />}
          {activePage === PAGES.ZORGCATEGORIEEN && <Zorgcategorieen onBack={() => setActivePage(previousPage)} categories={zorgCategorieen} onCategoriesChange={setZorgCategorieen} />}
          {activePage === PAGES.HELP_INFO && <HelpInfo onBack={() => setActivePage(previousPage)} />}
          {activePage === PAGES.SJABLONEN && <Sjablonen onBack={() => setActivePage(previousPage)} />}
          {activePage === PAGES.NOTIFICATIES && <Notificaties onBack={() => setActivePage(previousPage)} />}
          {activePage === PAGES.NOTIFICATIE_INSTELLINGEN && <NotificatieInstellingen onBack={() => setActivePage(previousPage)} />}
          {activePage === PAGES.BESCHIKBAARHEID && <Beschikbaarheid onBack={() => setActivePage(previousPage)} />}
          {activePage === PAGES.PROFIEL_PREVIEW && <ZorgverlenerProfiel zorgverlener={profielData} onBack={() => setActivePage(previousPage)} />}
        </div>
        {showBottomNav && <BottomNav activeTab={activePage} onTabChange={handleTabChange} berichtenBadge={berichtenBadge} />}
        <Toast />
      </div>
    </PasswordGate>
  )
}

export default App
