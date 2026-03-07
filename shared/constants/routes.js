/* ---- Page route identifiers (shared base) ---- */

export const PAGES = {
  // Main tabs (BottomNav)
  HOME: 'home',
  CAREPOOL: 'carepool',
  AGENDA: 'agenda',
  BERICHTEN: 'berichten',
  ADMIN: 'admin',

  // Overlay pages
  PROFIEL_INSTELLINGEN: 'profielInstellingen',
  PROFIEL: 'profiel',
  ZORGCATEGORIEEN: 'zorgcategorieen',
  HELP_INFO: 'helpInfo',
  SJABLONEN: 'sjablonen',
  NOTIFICATIES: 'notificaties',
  NOTIFICATIE_INSTELLINGEN: 'notificatieInstellingen',
}

export const SUB_PAGES = {
  // Carepool sub-pages
  MIJN_CONNECTIES: 'mijnConnecties',
  BESCHIKBAARHEID: 'beschikbaarheid',
  ZOEKEN: 'zoeken',
  ZORGVERLENER_PROFIEL: 'zorgverlenerProfiel',
  NODIG_UIT: 'nodigUit',

  // Agenda sub-pages
  NIEUWE_AFSPRAAK: 'nieuweAfspraak',

  // Admin tabs
  OVERZICHTEN: 'overzichten',
}

export const OVERLAY_PAGES = [
  PAGES.PROFIEL_INSTELLINGEN,
  PAGES.PROFIEL,
  PAGES.ZORGCATEGORIEEN,
  PAGES.HELP_INFO,
  PAGES.SJABLONEN,
  PAGES.NOTIFICATIES,
  PAGES.NOTIFICATIE_INSTELLINGEN,
]
