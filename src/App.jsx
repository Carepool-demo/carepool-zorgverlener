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
import MijnTalen from './pages/MijnTalen'
import GoedOmTeWeten from './pages/GoedOmTeWeten'
import CvBewerken from './pages/CvBewerken'
import RegistratiesBewerken from './pages/RegistratiesBewerken'
import MijnLocaties from './pages/MijnLocaties'
import Zoekprofiel from './pages/Zoekprofiel'
import MijnTarieven from './pages/MijnTarieven'
import ZorgverlenerProfiel from '@shared/pages/ZorgverlenerProfiel'
import MeldingMaken from '@shared/pages/MeldingMaken'
import BottomNav from '@shared/components/BottomNav'
import PasswordGate from '@shared/components/PasswordGate'
import Toast from '@shared/components/Toast'
import { zorgCategorieenInstellingen as defaultCategories, talenInstellingen as defaultTalen, goedOmTeWetenInstellingen as defaultGoedOmTeWeten, locatiesInstellingen as defaultLocaties, tariefVoorwaardenInstellingen as defaultVoorwaarden, notificatiesData, berichtenChats, profielData } from './data/dummyData'

function App() {
  const [activePage, setActivePage] = useState(PAGES.HOME)
  const pageStack = useRef([PAGES.HOME])
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
  const [talen, setTalen] = useState(defaultTalen)
  const [goedOmTeWeten, setGoedOmTeWeten] = useState(defaultGoedOmTeWeten)
  const [isVindbaar, setIsVindbaar] = useState(true)
  const [cvData, setCvData] = useState(profielData.cv)
  const [registratiesData, setRegistratiesData] = useState(profielData.registraties)
  const [locatiesData, setLocatiesData] = useState(defaultLocaties)
  const [isTariefBespreekbaar, setIsTariefBespreekbaar] = useState(true)
  const [tariefVoorwaarden, setTariefVoorwaarden] = useState(defaultVoorwaarden)
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
    pageStack.current = [page]
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
      pageStack.current.push(activePage)
    }
    setActivePage(page)
  }

  const handleBack = () => {
    const prev = pageStack.current.pop() || PAGES.HOME
    setActivePage(prev)
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
          {activePage === PAGES.PROFIEL_INSTELLINGEN && <ProfielInstellingen onBack={handleBack} onNavigate={handleNavigate} />}
          {activePage === PAGES.PROFIEL && <Profiel onBack={handleBack} onNavigate={handleNavigate} isVindbaar={isVindbaar} onToggleVindbaar={() => setIsVindbaar(v => !v)} talenCount={talen.filter(t => t.enabled).length} />}
          {activePage === PAGES.ZORGCATEGORIEEN && <Zorgcategorieen onBack={handleBack} categories={zorgCategorieen} onCategoriesChange={setZorgCategorieen} />}
          {activePage === PAGES.HELP_INFO && <HelpInfo onBack={handleBack} />}
          {activePage === PAGES.SJABLONEN && <Sjablonen onBack={handleBack} />}
          {activePage === PAGES.NOTIFICATIES && <Notificaties onBack={handleBack} />}
          {activePage === PAGES.NOTIFICATIE_INSTELLINGEN && <NotificatieInstellingen onBack={handleBack} />}
          {activePage === PAGES.MIJN_TALEN && <MijnTalen onBack={handleBack} talen={talen} onTalenChange={setTalen} />}
          {activePage === PAGES.GOED_OM_TE_WETEN && <GoedOmTeWeten onBack={handleBack} items={goedOmTeWeten} onItemsChange={setGoedOmTeWeten} />}
          {activePage === PAGES.BESCHIKBAARHEID && <Beschikbaarheid onBack={handleBack} />}
          {activePage === PAGES.CV_BEWERKEN && <CvBewerken onBack={handleBack} cv={cvData} onCvChange={setCvData} />}
          {activePage === PAGES.REGISTRATIES_BEWERKEN && <RegistratiesBewerken onBack={handleBack} registraties={registratiesData} onRegistratiesChange={setRegistratiesData} />}
          {activePage === PAGES.MIJN_LOCATIES && <MijnLocaties onBack={handleBack} locaties={locatiesData} onLocatiesChange={setLocatiesData} />}
          {activePage === PAGES.ZOEKPROFIEL && <Zoekprofiel onBack={handleBack} onNavigate={handleNavigate} />}
          {activePage === PAGES.MIJN_TARIEVEN && <MijnTarieven onBack={handleBack} isBespreekbaar={isTariefBespreekbaar} onBespreekbaarChange={setIsTariefBespreekbaar} voorwaarden={tariefVoorwaarden} onVoorwaardenChange={setTariefVoorwaarden} registraties={registratiesData} onRegistratiesChange={setRegistratiesData} />}
          {activePage === PAGES.PROFIEL_PREVIEW && <ZorgverlenerProfiel zorgverlener={profielData} onBack={handleBack} onNavigate={handleNavigate} isPreview isVindbaar={isVindbaar} />}
          {activePage === PAGES.MELDING_MAKEN && <MeldingMaken onBack={handleBack} />}
        </div>
        {showBottomNav && <BottomNav activeTab={activePage} onTabChange={handleTabChange} berichtenBadge={berichtenBadge} />}
        <Toast />
      </div>
    </PasswordGate>
  )
}

export default App
