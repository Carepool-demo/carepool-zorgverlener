/* ==========================================
   Carepool Dummy Data
   Centralized data for prototyping
   ========================================== */

/* ---- Zorglogs (Admin) ---- */
export const zorglogs = [
  {
    date: 'Zo 4 feb 2025',
    entries: [
      { id: 1, type: 'Ochtendhulp', icon: 'morning', duration: '00:30', price: '€17,50' },
    ],
  },
  {
    date: 'Ma 5 feb 2025',
    entries: [
      { id: 2, type: 'Ochtendhulp', icon: 'morning', duration: '00:30', price: '€17,50' },
    ],
  },
  {
    date: 'Za 3 feb 2025',
    entries: [
      { id: 3, type: 'Ochtendhulp', icon: 'morning', duration: '00:30', price: '€17,50' },
      { id: 4, type: 'Toilet', icon: 'toilet', duration: '00:30', price: '€17,50' },
    ],
  },
  {
    date: 'Za 10 feb 2025',
    entries: [
      { id: 5, type: 'Ochtendhulp', icon: 'morning', duration: '00:30', price: '€17,50' },
    ],
  },
  {
    date: 'Zo 11 feb 2025',
    entries: [
      { id: 6, type: 'Ochtendhulp', icon: 'morning', duration: '00:30', price: '€17,50' },
    ],
  },
  {
    date: 'Za 17 feb 2025',
    entries: [
      { id: 8, type: 'Ochtendhulp', icon: 'morning', duration: '00:30', price: '€17,50' },
    ],
  },
  {
    date: 'Zo 18 feb 2025',
    entries: [
      { id: 9, type: 'Ochtendhulp', icon: 'morning', duration: '00:30', price: '€17,50' },
    ],
  },
  {
    date: 'Ma 21 feb 2025',
    entries: [
      { id: 10, type: 'Ochtendhulp', icon: 'morning', duration: '00:30', price: '€17,50' },
    ],
  },
  {
    date: 'Di 22 feb 2025',
    entries: [
      { id: 11, type: 'Ochtendhulp', icon: 'morning', duration: '00:30', price: '€17,50' },
    ],
  },
  {
    date: 'Za 3 feb 2025',
    entries: [
      { id: 12, type: 'Ochtendhulp', icon: 'morning', duration: '00:30', price: '€17,50' },
      { id: 13, type: 'Avondhulp', icon: 'evening', duration: '00:30', price: '€17,50' },
    ],
  },
]

/* ---- Overzichten (Admin) ---- */
export const overzichtData = {
  name: 'Nisha Wijngaarde',
  categories: [
    { name: 'Huishoudelijke hulp', duration: '12:20', amount: '€165,00' },
    { name: 'Persoonlijke verzorging', duration: '12:40', amount: '€265,00' },
  ],
  totalDuration: '25:00',
  totalAmount: '€430,00',
}

/* ---- Tarieven per zorgvrager (Admin) ---- */
export const tarievenPerClient = [
  {
    clientName: 'Tess de Vries',
    categories: [
      {
        id: 1,
        category: 'Huishoudelijke hulp',
        rates: [
          { id: 1, label: 'Basistarief', tag: '(standaardtarief)', price: '€22,00' },
        ],
      },
    ],
  },
  {
    clientName: 'Julie de Lange',
    categories: [
      {
        id: 1,
        category: 'Persoonlijke verzorging',
        rates: [
          { id: 1, label: 'Basistarief', tag: '(standaardtarief)', price: '€26,50' },
          { id: 2, label: 'Nachttarief', tag: '', price: '€26,50' },
        ],
      },
      {
        id: 2,
        category: 'Verpleging',
        rates: [
          { id: 3, label: 'Basistarief', tag: '(standaardtarief)', price: '€46' },
        ],
      },
    ],
  },
  {
    clientName: 'Pim van de Berg',
    categories: [
      {
        id: 1,
        category: 'Begeleiding',
        rates: [
          { id: 1, label: 'Basistarief', tag: '(standaardtarief)', price: '€30,00' },
        ],
      },
    ],
  },
  {
    clientName: 'Sophie Bakker',
    categories: [
      {
        id: 1,
        category: 'Persoonlijke verzorging',
        rates: [
          { id: 1, label: 'Basistarief', tag: '(standaardtarief)', price: '€28,00' },
          { id: 2, label: 'Nachttarief', tag: '', price: '€32,00' },
        ],
      },
    ],
  },
  {
    clientName: 'Noor van Leeuwen',
    categories: [
      {
        id: 1,
        category: 'Huishoudelijke hulp',
        rates: [
          { id: 1, label: 'Basistarief', tag: '(standaardtarief)', price: '€22,00' },
        ],
      },
      {
        id: 2,
        category: 'Persoonlijke verzorging',
        rates: [
          { id: 3, label: 'Basistarief', tag: '(standaardtarief)', price: '€26,50' },
        ],
      },
    ],
  },
]

/* ---- SVB Declaratie ---- */
export const DAY_LABELS = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo']

export const DUTCH_MONTHS = [
  'januari', 'februari', 'maart', 'april', 'mei', 'juni',
  'juli', 'augustus', 'september', 'oktober', 'november', 'december',
]

export const CARE_TYPES = [
  {
    id: 1,
    category: 'Wmo',
    description: 'Bereikbaarheidsdienst',
    rate: '€ 7,00',
    rateUnit: 'per uur',
    hours: { 1: '4:00', 2: '3:00', 3: '2:00' },
  },
  {
    id: 2,
    category: 'Wmo',
    description: 'Begeleiding',
    rate: '€ 15,00',
    rateUnit: 'per uur',
    hours: { 1: '2:00', 2: '1:30', 3: '2:00' },
  },
]

/* ---- Home page ---- */
export const homeAppointments = [
  {
    id: 1,
    date: 'Ma 26 mei',
    time: '9:00 - 10:30',
    client: 'Julie de Lange',
    type: 'Ochtendhulp',
    icon: 'morning',
    location: 'Thuis',
    status: 'bevestigd',
  },
  {
    id: 2,
    date: 'Ma 26 mei',
    time: '13:00 - 14:00',
    client: 'Tess de Vries',
    type: 'Huishoudelijke hulp',
    icon: 'household',
    location: 'Dorpsstraat 2',
    status: 'bevestigd',
  },
  {
    id: 3,
    date: 'Di 27 mei',
    time: '9:00 - 10:30',
    client: 'Julie de Lange',
    type: 'Ochtendhulp',
    icon: 'morning',
    location: 'Thuis',
    status: 'bevestigd',
  },
  {
    id: 4,
    date: 'Di 27 mei',
    time: '14:00 - 15:30',
    client: 'Pim van de Berg',
    type: 'Begeleiding',
    icon: 'oncall',
    location: 'Thuis',
    status: 'openstaand',
  },
  {
    id: 5,
    date: 'Wo 28 mei',
    time: '10:00 - 12:00',
    client: 'Sophie Bakker',
    type: 'Persoonlijke verzorging',
    icon: 'morning',
    location: 'Thuis',
    status: 'openstaand',
  },
]

export const careTemplates = [
  { id: 1, label: 'Ochtendhulp', sublabel: 'Dorpsstr 2', icon: 'morning' },
  { id: 2, label: 'Oproepdienst', sublabel: 'Thuis', icon: 'oncall' },
  { id: 3, label: 'Avondhulp', sublabel: '', icon: 'evening' },
  { id: 4, label: 'Huishoudelijk', sublabel: 'Thuis', icon: 'household' },
]

/* ---- Home: openstaande verzoeken (pending care log requests) ---- */
export const openstaandeVerzoeken = [
  {
    id: 1,
    date: 'Ma 12 mei',
    time: '9:00 - 10:10',
    client: 'Julie de Lange',
    type: 'Ochtendhulp',
    icon: 'morning',
  },
  {
    id: 2,
    date: 'Di 13 mei',
    time: '13:00 - 14:00',
    client: 'Tess de Vries',
    type: 'Huishoudelijke hulp',
    icon: 'household',
  },
  {
    id: 3,
    date: 'Wo 14 mei',
    time: '10:00 - 11:30',
    client: 'Pim van de Berg',
    type: 'Begeleiding',
    icon: 'oncall',
  },
]

/* ---- Alle openstaande verzoeken (full list) ---- */
export const alleVerzoeken = [
  { id: 1, date: 'Ma 26 mei', time: '12:00 - 12:20', client: 'Julie de Lange', type: 'Toilet' },
  { id: 2, date: 'Di 27 sept', time: '08:00 - 09:00', client: 'Zara van der Linden', type: 'Ochtendhulp' },
  { id: 3, date: 'Di 27 sept', time: '14:00 - 14:30', client: 'Jasper van der Meer', type: 'Ochtendhulp' },
  { id: 4, date: 'Do 29 sept', time: '08:00 - 09:00', client: 'Finn de Vries', type: 'Ochtendhulp' },
  { id: 5, date: 'Do 29 sept', time: '08:00 - 09:00', client: 'Sophie Bakker', type: 'Ochtendhulp' },
  { id: 6, date: 'Vr 30 sept', time: '08:00 - 09:00', client: 'Fleur van Leeuwen', type: 'Ochtendhulp' },
  { id: 7, date: 'Vr 30 sept', time: '10:00 - 11:30', client: 'Milan van Dijk', type: 'Ochtendhulp' },
  { id: 8, date: 'Ma 3 okt', time: '08:00 - 09:00', client: 'Lara Jansen', type: 'Ochtendhulp' },
  { id: 9, date: 'Ma 3 okt', time: '08:00 - 09:00', client: 'Timo de Boer', type: 'Ochtendhulp' },
]

export const homeConnections = [
  {
    id: 1,
    name: 'Tess de Vries',
    initials: 'TV',
    tags: ['Huishoudelijke Hulp'],
    messages: 2,
  },
  {
    id: 2,
    name: 'Julie de Lange',
    initials: 'JL',
    tags: ['Persoonlijke Verzorging', 'Ochtendhulp'],
    messages: 0,
  },
]

/* ---- Mijn Connecties page ---- */
export const teams = [
  { id: 1, name: 'Ochtendploeg' },
]

export const mijnConnecties = [
  {
    id: 1,
    name: 'Tess de Vries',
    initials: 'TV',
    tags: ['Huishoudelijke Hulp'],
  },
  {
    id: 2,
    name: 'Julie de Lange',
    initials: 'JL',
    tags: ['Persoonlijke Verzorging', 'Ochtendhulp'],
  },
  {
    id: 3,
    name: 'Pim van de Berg',
    initials: 'PB',
    tags: ['Begeleiding'],
    messages: 1,
  },
  {
    id: 4,
    name: 'Sophie Bakker',
    initials: 'SB',
    tags: ['Persoonlijke Verzorging', 'Verpleging'],
  },
  {
    id: 5,
    name: 'Noor van Leeuwen',
    initials: 'NL',
    tags: ['Huishoudelijke Hulp'],
    messages: 1,
  },
]

/* ---- Beschikbaarheid page ---- */
export const BESCHIKBAARHEID_DAY_LABELS = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo']

export const beschikbaarheidWeeks = [
  {
    weekNr: 22,
    month: 'Mei 2025',
    dates: [26, 27, 28, 29, 30, 31, 1],
    dayLabelsLong: ['Ma 26 mei', 'Di 27 mei', 'Wo 28 mei', 'Do 29 mei', 'Vr 30 mei', 'Za 31 mei', 'Zo 1 jun'],
  },
  {
    weekNr: 23,
    month: 'Juni 2025',
    dates: [2, 3, 4, 5, 6, 7, 8],
    dayLabelsLong: ['Ma 2 jun', 'Di 3 jun', 'Wo 4 jun', 'Do 5 jun', 'Vr 6 jun', 'Za 7 jun', 'Zo 8 jun'],
  },
  {
    weekNr: 24,
    month: 'Juni 2025',
    dates: [9, 10, 11, 12, 13, 14, 15],
    dayLabelsLong: ['Ma 9 jun', 'Di 10 jun', 'Wo 11 jun', 'Do 12 jun', 'Vr 13 jun', 'Za 14 jun', 'Zo 15 jun'],
  },
  {
    weekNr: 25,
    month: 'Juni 2025',
    dates: [16, 17, 18, 19, 20, 21, 22],
    dayLabelsLong: ['Ma 16 jun', 'Di 17 jun', 'Wo 18 jun', 'Do 19 jun', 'Vr 20 jun', 'Za 21 jun', 'Zo 22 jun'],
  },
]

export const caregiversData = [
  {
    id: 1, name: 'Annika Zhang', initials: 'AZ',
    tags: ['Persoonlijke Verzorging', 'Huishoudelijke hulp'],
    lastUpdated: '2 dagen geleden',
    weeks: {
      22: { hours: ['-', '6u', '4u', '-', '8u', '-', '-'], schedule: { 0: [], 1: ['10:00 - 16:00'], 2: ['09:00 - 13:00'], 3: [], 4: ['09:00 - 17:00'], 5: [], 6: [] } },
      23: { hours: ['4u', '8u', '-', '-', '8u', '-', '8u'], schedule: { 0: ['09:00 - 11:00', '12:00 - 18:00'], 1: ['09:00 - 17:00'], 2: ['09:00 - 14:00', '20:00 - 23:00'], 3: [], 4: ['09:00 - 10:00', '11:30 - 14:30', '15:30 - 19:00'], 5: [], 6: ['10:00 - 18:00'] } },
      24: { hours: ['8u', '-', '4u', '8u', '-', '-', '6u'], schedule: { 0: ['08:00 - 16:00'], 1: [], 2: ['10:00 - 14:00'], 3: ['09:00 - 17:00'], 4: [], 5: [], 6: ['11:00 - 17:00'] } },
      25: { hours: ['-', '8u', '-', '4u', '8u', '-', '-'], schedule: { 0: [], 1: ['08:00 - 16:00'], 2: [], 3: ['10:00 - 14:00'], 4: ['09:00 - 17:00'], 5: [], 6: [] } },
    },
  },
  {
    id: 2, name: 'Bram Smits', initials: 'BS',
    tags: ['Persoonlijke Verzorging', 'Huishoudelijke hulp', 'Verpleging'],
    lastUpdated: '1 dag geleden',
    weeks: {
      22: { hours: ['8u', '-', '4u', '-', '8u', '-', '-'], schedule: { 0: ['08:00 - 16:00'], 1: [], 2: ['09:00 - 13:00'], 3: [], 4: ['08:00 - 16:00'], 5: [], 6: [] } },
      23: { hours: ['4u', '8u', '-', '-', '8u', '-', '8u'], schedule: { 0: ['08:00 - 12:00'], 1: ['08:00 - 16:00'], 2: [], 3: [], 4: ['09:00 - 17:00'], 5: [], 6: ['10:00 - 18:00'] } },
      24: { hours: ['-', '8u', '4u', '-', '-', '6u', '-'], schedule: { 0: [], 1: ['09:00 - 17:00'], 2: ['08:00 - 12:00'], 3: [], 4: [], 5: ['10:00 - 16:00'], 6: [] } },
      25: { hours: ['4u', '-', '8u', '-', '4u', '-', '8u'], schedule: { 0: ['09:00 - 13:00'], 1: [], 2: ['08:00 - 16:00'], 3: [], 4: ['10:00 - 14:00'], 5: [], 6: ['09:00 - 17:00'] } },
    },
  },
  {
    id: 3, name: 'Julia Smilde', initials: 'JS',
    tags: ['Persoonlijke Verzorging'],
    lastUpdated: '3 dagen geleden',
    weeks: {
      22: { hours: ['-', '8u', '-', '-', '4u', '-', '8u'], schedule: { 0: [], 1: ['07:00 - 15:00'], 2: [], 3: [], 4: ['09:00 - 13:00'], 5: [], 6: ['10:00 - 18:00'] } },
      23: { hours: ['4u', '-', '-', '18u', '8u', '-', '8u'], schedule: { 0: ['09:00 - 13:00'], 1: [], 2: [], 3: ['06:00 - 24:00'], 4: ['09:00 - 17:00'], 5: [], 6: ['10:00 - 18:00'] } },
      24: { hours: ['8u', '-', '-', '4u', '-', '8u', '-'], schedule: { 0: ['08:00 - 16:00'], 1: [], 2: [], 3: ['10:00 - 14:00'], 4: [], 5: ['09:00 - 17:00'], 6: [] } },
      25: { hours: ['-', '4u', '-', '8u', '-', '-', '8u'], schedule: { 0: [], 1: ['09:00 - 13:00'], 2: [], 3: ['08:00 - 16:00'], 4: [], 5: [], 6: ['10:00 - 18:00'] } },
    },
  },
  {
    id: 4, name: 'Nisha Wijngaarde', initials: 'NW',
    tags: [],
    lastUpdated: '5 dagen geleden',
    weeks: {
      22: { hours: ['4u', '-', '8u', '-', '-', '-', '4u'], schedule: { 0: ['10:00 - 14:00'], 1: [], 2: ['08:00 - 16:00'], 3: [], 4: [], 5: [], 6: ['09:00 - 13:00'] } },
      23: { hours: ['4u', '8u', '-', '-', '-', '-', '8u'], schedule: { 0: ['10:00 - 14:00'], 1: ['08:00 - 16:00'], 2: [], 3: [], 4: [], 5: [], 6: ['09:00 - 17:00'] } },
      24: { hours: ['-', '-', '8u', '4u', '-', '-', '8u'], schedule: { 0: [], 1: [], 2: ['09:00 - 17:00'], 3: ['10:00 - 14:00'], 4: [], 5: [], 6: ['08:00 - 16:00'] } },
      25: { hours: ['8u', '-', '-', '-', '4u', '-', '-'], schedule: { 0: ['09:00 - 17:00'], 1: [], 2: [], 3: [], 4: ['10:00 - 14:00'], 5: [], 6: [] } },
    },
  },
  {
    id: 5, name: 'Noor van Leeuwen', initials: 'NL',
    tags: ['Persoonlijke Verzorging'],
    lastUpdated: '1 dag geleden',
    weeks: {
      22: { hours: ['-', '8u', '-', '4u', '-', '-', '8u'], schedule: { 0: [], 1: ['08:00 - 16:00'], 2: [], 3: ['10:00 - 14:00'], 4: [], 5: [], 6: ['09:00 - 17:00'] } },
      23: { hours: ['4u', '8u', '-', '-', '8u', '-', '8u'], schedule: { 0: ['08:00 - 12:00'], 1: ['07:00 - 15:00'], 2: [], 3: [], 4: ['09:00 - 17:00'], 5: [], 6: ['10:00 - 18:00'] } },
      24: { hours: ['8u', '-', '4u', '-', '8u', '-', '-'], schedule: { 0: ['07:00 - 15:00'], 1: [], 2: ['09:00 - 13:00'], 3: [], 4: ['08:00 - 16:00'], 5: [], 6: [] } },
      25: { hours: ['-', '4u', '8u', '-', '-', '8u', '-'], schedule: { 0: [], 1: ['10:00 - 14:00'], 2: ['09:00 - 17:00'], 3: [], 4: [], 5: ['08:00 - 16:00'], 6: [] } },
    },
  },
]

/* ---- Berichten page ---- */
export const berichtenChats = [
  {
    id: 1,
    name: 'Julie de Lange',
    initials: 'JL',
    type: 'individual',
    isConnectie: true,
    timestamp: 'Gisteren',
    preview: 'Kun je toevallig morgen een kwartiertje later? Zou goed uitkom...',
    unread: 0,
  },
  {
    id: 2,
    name: 'Ochtendploeg',
    initials: '',
    type: 'group',
    isConnectie: true,
    timestamp: 'Gisteren',
    preview: 'Tess de Vries: Ok is goed. Dan kijken we dat de volgende keer...',
    unread: 1,
  },
  {
    id: 3,
    name: 'Tess de Vries',
    initials: 'TV',
    type: 'individual',
    isConnectie: false,
    source: 'inkomend',
    timestamp: 'maandag',
    preview: 'Haha, ja vind ik ook',
    unread: 0,
  },
  {
    id: 5,
    name: 'Thomas Jansen',
    initials: 'TJ',
    type: 'individual',
    isConnectie: false,
    source: 'inkomend',
    timestamp: 'vorige week',
    preview: 'Ik heb je profiel gezien en zou graag willen praten over begeleiding voor mijn moeder.',
    unread: 0,
  },
  {
    id: 6,
    name: 'Fatima El Amrani',
    initials: 'FA',
    type: 'individual',
    isConnectie: false,
    source: 'uitgaand',
    timestamp: 'vorige week',
    preview: 'Goedemiddag, ik ben op zoek naar iemand die mijn vader kan helpen met dagelijkse verzorging.',
    unread: 0,
  },
  {
    id: 7,
    name: 'Pieter de Groot',
    initials: 'PG',
    type: 'individual',
    isConnectie: false,
    source: 'uitgaand',
    timestamp: '2 weken',
    preview: 'Hallo, we zoeken een zorgverlener voor onze buurvrouw. Kun je eens langskomen?',
    unread: 0,
  },
  {
    id: 4,
    name: 'Heike van Carepool',
    initials: 'HF',
    type: 'carepool',
    isConnectie: true,
    timestamp: '',
    preview: 'Hey! We zijn benieuwd wat je van Carepool vindt. Mis je iets in de ap...',
    unread: 0,
  },
]

export const berichtenVerzoeken = [
  {
    id: 'verzoek-1',
    name: 'Sophie Bakker',
    initials: 'SB',
    type: 'request',
    source: 'inkomend',
    timestamp: 'Gisteren',
    preview: 'Wil je mij toevoegen als zorgverlener?',
    unread: 1,
  },
  {
    id: 'verzoek-2',
    name: 'Maria de Boer',
    initials: 'MB',
    type: 'request',
    source: 'inkomend',
    timestamp: 'maandag',
    preview: 'Hoi! Ik zoek iemand voor huishoudelijke hulp op dinsdag en donderdag. Heb je daar tijd voor?',
    unread: 0,
  },
]

/* ---- Chat gesprek data ---- */
export const chatGesprekken = {
  1: {
    // Julie de Lange
    subtitle: null,
    members: null,
    messages: [
      { id: 1, sender: 'other', name: 'Julie de Lange', initials: 'JL', text: 'Hoi! Ik wilde even vragen of je morgen iets later kunt komen. Rond half 10 in plaats van 9?', time: '09:12' },
      { id: 2, sender: 'self', text: 'Ja hoor, dat is prima! Dan ben ik er om half 10.', time: '09:15' },
      { id: 3, sender: 'other', name: 'Julie de Lange', initials: 'JL', text: 'Top, dankjewel! Dan hoef ik niet zo te haasten met de ochtend.', time: '09:16' },
      { id: 4, sender: 'self', text: 'Snap ik. Geen probleem, tot morgen!', time: '09:18' },
      { id: 5, sender: 'other', name: 'Julie de Lange', initials: 'JL', text: 'Kun je toevallig morgen een kwartiertje later? Zou goed uitkomen.', time: '14:30' },
    ],
  },
  2: {
    // Ochtendploeg
    subtitle: 'Zorgteam van Tess',
    members: 4,
    messages: [
      { id: 1, sender: 'other', name: 'Anna Visser', initials: 'AV', text: 'Goedemorgen! Wie kan er donderdag de ochtenddienst overnemen? Ik heb een afspraak bij de huisarts.', time: '08:30' },
      { id: 2, sender: 'other', name: 'Anna Visser', initials: 'AV', text: 'Het gaat om de dienst van 9 tot 12 bij Tess.', time: '08:31' },
      { id: 3, sender: 'self', text: 'Ik kan donderdag wel! Heb die ochtend nog niks staan.', time: '08:45' },
      { id: 4, sender: 'other', name: 'Anna Visser', initials: 'AV', text: 'Ok is goed. Doen we dat de volgende keer.', time: '09:02' },
    ],
  },
  3: {
    // Tess de Vries
    subtitle: null,
    members: null,
    messages: [
      { id: 1, sender: 'other', name: 'Tess de Vries', initials: 'TV', text: 'Vond je het ook zo gezellig gisteren?', time: '16:20' },
      { id: 2, sender: 'self', text: 'Ja zeker! Was een leuke middag.', time: '16:25' },
      { id: 3, sender: 'other', name: 'Tess de Vries', initials: 'TV', text: 'Haha, ja vond ik ook', time: '16:26' },
    ],
  },
  4: {
    // Heike van Carepool
    subtitle: null,
    members: null,
    messages: [
      { id: 1, sender: 'other', name: 'Heike van Carepool', initials: 'HF', text: 'Hey! We zijn benieuwd wat je van Carepool vindt. Mis je iets in de app of heb je suggesties? Laat het ons weten!', time: '10:00' },
    ],
  },
  'verzoek-1': {
    // Sophie Bakker – berichtverzoek
    isVerzoek: true,
    status: 'pending',
    subtitle: null,
    members: null,
    oproep: {
      label: 'Jouw oproepje',
      text: 'Wie komt mijn team van jonge studenten versterken 3 dagen per week?',
    },
    messages: [
      {
        id: 1,
        sender: 'other',
        name: 'Sophie Bakker',
        initials: 'SB',
        text: 'Hoi Nisha, ik heb een vraag over je oproepje: Ik wil je graag helpen maar ik kan alleen op dinsdagen, is dat ook oké?',
        time: '13:51',
        hasOproep: true,
      },
    ],
  },
  'verzoek-2': {
    // Maria de Boer – berichtverzoek
    isVerzoek: true,
    status: 'pending',
    subtitle: null,
    members: null,
    messages: [
      {
        id: 1,
        sender: 'other',
        name: 'Maria de Boer',
        initials: 'MB',
        text: 'Hoi! Ik zoek iemand voor huishoudelijke hulp op dinsdag en donderdag. Heb je daar tijd voor?',
        time: '10:24',
      },
    ],
  },
  5: {
    // Thomas Jansen – verkennend gesprek
    subtitle: null,
    members: null,
    messages: [
      {
        id: 1,
        sender: 'other',
        name: 'Thomas Jansen',
        initials: 'TJ',
        text: 'Ik heb je profiel gezien en zou graag willen praten over begeleiding voor mijn moeder.',
        time: '14:05',
      },
      {
        id: 2,
        sender: 'self',
        text: 'Hoi Thomas, wat fijn dat je contact opneemt. Vertel eens, wat voor begeleiding zoek je precies?',
        time: '14:20',
      },
      {
        id: 3,
        sender: 'other',
        name: 'Thomas Jansen',
        initials: 'TJ',
        text: 'Mijn moeder heeft hulp nodig bij dagelijkse activiteiten. Ze is 82 en woont nog zelfstandig.',
        time: '14:25',
      },
    ],
  },
  6: {
    // Fatima El Amrani – verkennend gesprek
    subtitle: null,
    members: null,
    messages: [
      {
        id: 1,
        sender: 'other',
        name: 'Fatima El Amrani',
        initials: 'FA',
        text: 'Goedemiddag, ik ben op zoek naar iemand die mijn vader kan helpen met dagelijkse verzorging.',
        time: '15:32',
      },
      {
        id: 2,
        sender: 'self',
        text: 'Goedemiddag Fatima! Ik help graag. Kun je wat meer vertellen over de situatie van je vader?',
        time: '16:00',
      },
    ],
  },
  7: {
    // Pieter de Groot – verkennend gesprek
    subtitle: null,
    members: null,
    messages: [
      {
        id: 1,
        sender: 'other',
        name: 'Pieter de Groot',
        initials: 'PG',
        text: 'Hallo, we zoeken een zorgverlener voor onze buurvrouw. Kun je eens langskomen?',
        time: '11:17',
      },
    ],
  },
}

/* ---- Nieuw bericht page ---- */
export const nieuwBerichtTeams = [
  { id: 1, name: 'Ochtendploeg', initials: '', type: 'group' },
]

export const nieuwBerichtConnecties = [
  { id: 1, name: 'Anna Visser', initials: 'AV' },
  { id: 2, name: 'Annika Zhang', initials: 'AZ' },
  { id: 3, name: 'Julia Smilde', initials: 'JS' },
  { id: 4, name: 'Nisha Wijngaarde', initials: 'NW' },
  { id: 5, name: 'Noor van Leeuwen', initials: 'NL' },
]

/* ---- Profiel page ---- */
export const profielData = {
  id: 'nisha',
  name: 'Nisha Wijngaarde',
  firstName: 'Nisha',
  initials: 'NW',
  email: 'nisha.wijngaarde@email.nl',
  phone: '06 - 9876 5432',
  address: 'Keizersgracht 42, 1015 CS Amsterdam',
  birthDate: '8 september 1990',
  geslacht: 'Vrouw',
  leeftijd: 35,
  locatie: 'Amsterdam',
  bio: 'Ik ben Nisha, 35 jaar, een betrokken en betrouwbare zorgverleenster met ruime levenservaring. Ik bied persoonlijke verzorging en ondersteuning met aandacht, respect en rust. Het welzijn, de veiligheid en het vertrouwen van de cliënt staan bij mij altijd centraal.',
  subtitle: 'Vrouw, 35, Amsterdam',
  zorgcategorieen: 1,
  locaties: 1,
  talen: 1,
  goedOmTeWeten: 1,
  cv: {
    opleidingen: [
      { titel: 'Helpende Zorg en Welzijn', periode: 'sep 2020 - jun 2023', instituut: 'ROC Amsterdam' },
    ],
    werkervaring: [
      { titel: 'Zorghulp', periode: 'aug 2023 - Huidig', bedrijf: 'Zelfstandig' },
    ],
    certificaten: [
      { titel: 'EHBO', periode: 'mrt 2022 - mrt 2025', instituut: 'Het Oranje Kruis' },
      { titel: 'BHV', periode: 'jan 2023 - jan 2026', instituut: 'ROC Amsterdam' },
    ],
    ervaringMet: ['Dementie', 'Diabetes', 'Mobiliteitsproblemen'],
    leerbereidheid: 'Ik sta open om op eigen kosten trainingen te volgen die nodig zijn voor jouw zorg. Denk aan bijv. tilcursus of medicatiebeheer.',
  },
}

/* ---- Zorgaanbod (zorgverlener's care offering categories) ---- */
export const zorgCategorieenInstellingen = [
  { id: 'zc-1', label: '24-uurs zorg', enabled: false },
  { id: 'zc-2', label: 'Begeleiding groep', enabled: false },
  { id: 'zc-3', label: 'Begeleiding individueel', enabled: false },
  { id: 'zc-4', label: 'Beschermd wonen', enabled: false },
  { id: 'zc-5', label: 'Dagbehandeling', enabled: false },
  { id: 'zc-6', label: 'Dagbesteding', enabled: false },
  { id: 'zc-7', label: 'Generalistische basis-ggz', enabled: false },
  { id: 'zc-8', label: 'Huishoudelijke hulp', enabled: true },
  { id: 'zc-9', label: 'Jeugd-ggz', enabled: false },
  { id: 'zc-10', label: 'Jeugdhulp ambulant', enabled: false },
  { id: 'zc-11', label: 'Jeugdhulp verblijf (excl. behandeling)', enabled: false },
  { id: 'zc-12', label: 'Jeugdhulp verblijf (incl. behandeling)', enabled: false },
  { id: 'zc-13', label: 'Kortdurend verblijf', enabled: false },
  { id: 'zc-14', label: 'Logeeropvang', enabled: false },
  { id: 'zc-15', label: 'Maatwerkarrangementen jeugd', enabled: false },
  { id: 'zc-16', label: 'Overig', enabled: false },
  { id: 'zc-17', label: 'Overige maatwerkarrangementen', enabled: false },
  { id: 'zc-18', label: 'Persoonlijke verzorging', enabled: true },
  { id: 'zc-19', label: 'Specialistische ggz', enabled: false },
  { id: 'zc-20', label: 'UWV Intermediair', enabled: false },
  { id: 'zc-21', label: 'Verpleging', enabled: true },
  { id: 'zc-22', label: 'Vervoer van en naar dagbesteding', enabled: false },
  { id: 'zc-23', label: 'Vervoerdiensten', enabled: false },
]

/* ---- Budget (Admin) ---- */
export const budgetData = [
  {
    id: 1,
    name: 'Huishoudelijke hulp',
    year: 2026,
    period: '1 jan t/m 31 dec',
    totalBudget: 8290,
    used: 2073,
    available: 6218,
    percentage: 75,
    categories: [
      { name: 'Huishoudelijke hulp', color: '#6100FF', amount: 2073 },
    ],
    monthlyData: [
      { month: 'JAN', amount: 780 },
      { month: 'FEB', amount: 650 },
      { month: 'MRT', amount: 643 },
      { month: 'APR', amount: 0 },
      { month: 'MEI', amount: 0, isFuture: true },
      { month: 'JUN', amount: 0, isFuture: true },
      { month: 'JUL', amount: 0, isFuture: true },
      { month: 'AUG', amount: 0, isFuture: true },
      { month: 'SEP', amount: 0, isFuture: true },
      { month: 'OKT', amount: 0, isFuture: true },
      { month: 'NOV', amount: 0, isFuture: true },
      { month: 'DEC', amount: 0, isFuture: true },
    ],
    currentMonth: 'APR',
    averageMonthly: 730,
    looptijd: '12 maanden',
    prediction: { type: 'tekort', amount: 530 },
  },
  {
    id: 2,
    name: 'Wlz algemeen',
    year: 2026,
    period: '13 feb t/m 13 okt',
    totalBudget: 110120,
    used: 55060,
    available: 55060,
    percentage: 50,
    categories: [
      { name: 'Persoonlijke verzorging', color: '#200066', amount: 34120 },
      { name: 'Verpleging', color: '#D3008B', amount: 15120 },
      { name: 'Huishoudelijke hulp', color: '#00FFC2', amount: 15120 },
      { name: 'Begeleiding individueel', color: '#3600AA', amount: 15120 },
      { name: 'Overig', color: '#DAD4EC', amount: 10120 },
    ],
    monthlyData: [
      { month: 'JAN', amount: 0 },
      { month: 'FEB', amount: 12800 },
      { month: 'MRT', amount: 14200 },
      { month: 'APR', amount: 15600 },
      { month: 'MEI', amount: 0, isFuture: true },
      { month: 'JUN', amount: 0, isFuture: true },
      { month: 'JUL', amount: 0, isFuture: true },
      { month: 'AUG', amount: 0, isFuture: true },
      { month: 'SEP', amount: 0, isFuture: true },
      { month: 'OKT', amount: 0, isFuture: true },
    ],
    currentMonth: 'APR',
    averageMonthly: 730,
    looptijd: '8,5 maanden',
    prediction: { type: 'over', amount: 55368 },
  },
]

/* ---- Sjablonen page ---- */
export const sjablonenData = [
  { id: 1, label: 'Ochtenddienst', location: 'Thuis', icon: 'sunrise' },
  { id: 2, label: 'Oproepdienst', location: 'Werk', icon: 'office' },
  { id: 3, label: 'Toilethulp', location: 'Werk', icon: 'tissue' },
  { id: 4, label: 'Ochtenddienst lang', location: 'Thuis', icon: 'bathtub' },
  { id: 5, label: 'Begeleiding', location: '', icon: 'library' },
  { id: 6, label: 'Dagje weg', location: '', icon: 'lake' },
  { id: 7, label: 'Oproepdienst', location: 'Thuis', icon: 'home' },
]

export const sjabloonDetailData = {
  id: 1,
  label: 'Ochtendhulp',
  icon: 'sunrise',
  zorgEnDuur: [
    { label: 'Persoonlijke verzorging', duration: '1 uur' },
    { label: 'Huishoudelijke hulp', duration: '30 min' },
  ],
  totaal: '1u 30 min',
  startTijd: '12:00',
  eindTijd: '13:00',
  herhaling: 'Herhaal elke 4 weken',
  herhalingVanaf: 'Deze week (6-12 jan)',
  dagen: ['M', 'D', 'W', 'D', 'V', 'Z', 'Z'],
  activeDagen: [0, 1, 2, 3, 4],
  locatie: 'Thuis (arendsingel 31)',
  notitie: 'Niet aanbellen a.u.b.',
  zorgverlener: { name: 'Tess de Vries', initials: 'TV' },
}

/* ---- Notificaties page ---- */
export const notificatiesData = {
  nogTeDoen: [
    { id: 1, icon: 'pencil', title: 'Over mij', description: 'Vertel iets over jezelf' },
    { id: 2, icon: 'users', title: 'Maak je eerste connectie', description: 'Carepool instellen' },
  ],
  meldingen: [
    {
      date: 'Vandaag',
      items: [
        { id: 3, icon: 'users', iconColor: 'purple', title: 'Jeroen is nu een connectie', description: 'Jouw beurt: stel het tarief in.', actionLink: 'Tarief instellen' },
        { id: 4, icon: 'birthday', iconColor: 'purple', title: 'Nisha is morgen jarig!', description: 'Een berichtje of traktatie voor de jarige?', actionLink: 'Stuur Nisha een bericht' },
        { id: 5, icon: 'download', iconColor: 'purple', title: 'Zorguren augustus beschikbaar', description: 'Bekijk en download het zorguren-overzicht.', actionLink: 'Bekijk zorguren' },
      ]
    },
    {
      date: 'Gisteren',
      items: [
        { id: 6, icon: 'users', iconColor: 'purple', title: 'Pieter is nu een connectie', description: 'Jouw beurt: stel het tarief in.', actionLink: 'Tarief instellen', unread: true },
        { id: 7, icon: 'alert', iconColor: 'pink', title: 'Geannuleerd: woe 10 dec', description: 'Noor heeft Ochtendhulp geannuleerd.', actionLink: 'Bekijk agenda', unread: true },
        { id: 8, icon: 'calendar', iconColor: 'purple', title: 'Noor heeft geaccepteerd', description: 'Noor heeft de afspraak op woe 10 dec geaccepteerd.', actionLink: 'Bekijk agenda', unread: true },
        { id: 9, icon: 'note-edit', iconColor: 'purple', title: 'Locatie gewijzigd', description: 'Noor heeft de locatie van de afspraak op woe 10 dec gewijzigd.', actionLink: 'Bekijk agenda', unread: true },
        { id: 10, icon: 'note-edit', iconColor: 'purple', title: 'Notitie gewijzigd', description: 'Noor heeft de notitie van de afspraak op woe 10 dec gewijzigd.', actionLink: 'Bekijk agenda', unread: true },
        { id: 11, icon: 'note-edit', iconColor: 'purple', title: 'Locatie en notitie gewijzigd', description: 'Noor heeft de locatie en notitie van de afspraak op woe 10 dec gewijzigd.', actionLink: 'Bekijk agenda', unread: true },
        { id: 12, icon: 'user-group', iconColor: 'purple', title: 'Nieuw team', description: 'Tess heeft je toegevoegd aan Team Tess.', actionLink: 'Bekijk team', unread: true },
      ]
    },
    {
      date: '14 Mei',
      items: [
        { id: 13, icon: 'user-remove', iconColor: 'pink', title: 'Teamwijziging', description: 'Tess heeft je verwijderd uit Team Tess.', actionLink: 'Bekijk je teams', unread: true },
        { id: 14, icon: 'pencil', iconColor: 'purple', title: 'Teamwijziging', description: 'Tess heeft Team Tess hernoemd naar Ochtendploeg.', actionLink: 'Bekijk team' },
        { id: 15, icon: 'cancel', iconColor: 'pink', title: 'Team verwijderd', description: 'Tess heeft Ochtendploeg verwijderd.' },
        { id: 16, icon: 'euro', iconColor: 'purple', title: 'Tarief toegevoegd', description: 'Tess heeft een tarief toegevoegd.', actionLink: 'Bekijk tarieven' },
        { id: 17, icon: 'archive', iconColor: 'purple', title: 'Ochtendhulp gelogd', description: 'Je afspraak met Nisha (9:00-10:10) is automatisch gelogd.', actionLink: 'Bekijk zorglog' },
        { id: 18, icon: 'delete', iconColor: 'purple', title: 'Ochtendhulp verwijderd', description: 'Nisha heeft je uitnodiging (9:00-10:10) niet tijdig geaccepteerd. Is de zorg toch geleverd?', actionLink: 'Handmatig loggen' },
        { id: 19, icon: 'delete', iconColor: 'purple', title: 'Ochtendhulp verwijderd', description: 'Je conceptafspraak (9:00-10:10) was nog niet verzonden. Is de zorg toch geleverd?', actionLink: 'Handmatig loggen' },
        { id: 20, icon: 'euro', iconColor: 'purple', title: 'Tarief aangepast', description: 'Tess heeft een tarief aangepast.', actionLink: 'Bekijk zorglogs', unread: true },
      ]
    },
    {
      date: '13 Mei',
      items: [
        { id: 21, icon: 'archive', iconColor: 'purple', title: 'Nieuw zorgmoment gelogd', description: 'Tess heeft een zorgmoment gelogd.', actionLink: 'Bekijk zorglog', unread: true },
        { id: 22, icon: 'note-remove', iconColor: 'pink', title: 'Zorglog verwijderd', description: 'Tess heeft een zorgmoment op woensdag 15 maart verwijderd.', actionLink: 'Bekijk zorglogs' },
        { id: 23, icon: 'message', iconColor: 'purple', title: 'Bericht van Nisha', description: 'Hoi Tess, ik ben misschien vandaag wat later omdat ik eerst mijn zoontje moet ophalen van...', actionLink: 'Lees meer' },
        { id: 24, icon: 'archive', iconColor: 'purple', title: 'Zorglog aangepast', description: 'Tess heeft een gelogd zorgmoment aangepast.', actionLink: 'Bekijk zorglog' },
        { id: 25, icon: 'user-remove', iconColor: 'pink', title: 'Connectie verwijderd', description: 'Nisha heeft je ontkoppeld als zorgvrager.' },
        { id: 26, icon: 'alert', iconColor: 'pink', title: 'Niemand beschikbaar', description: 'De afspraak van woe 12 dec is door iedereen afgewezen.', actionLink: 'Bekijk agenda' },
      ]
    },
  ],
}

/* ---- Agenda page ---- */
/* Status types: bevestigd, actief, verzoek, geannuleerd, administratie, over30min */

// Appointment patterns per day-of-week (0=ma, 1=di, ..., 6=zo)
const _appointmentPatterns = {
  past: [
    // ma
    [
      { time: '08:00 - 09:00', type: 'Ochtendhulp', icon: 'morning', client: 'Emma Waters', status: 'administratie' },
      { time: '10:00 - 11:00', type: 'Ochtendhulp', icon: 'morning', client: 'Emma Waters', status: 'administratie' },
    ],
    // di
    [
      { time: '08:00 - 09:00', type: 'Ochtendhulp', icon: 'morning', client: 'Julie de Lange', status: 'administratie' },
    ],
    // wo
    [],
    // do
    [
      { time: '08:00 - 09:00', type: 'Ochtendhulp', icon: 'morning', client: 'Julie de Lange', status: 'administratie' },
      { time: '10:00 - 11:00', type: 'Ochtendhulp', icon: 'morning', client: 'Julie de Lange', status: 'administratie' },
      { time: '14:00 - 15:00', type: 'Ochtendhulp', icon: 'morning', client: 'Julie de Lange', status: 'administratie' },
    ],
    // vr
    [
      { time: '08:00 - 09:00', type: 'Ochtendhulp', icon: 'morning', client: 'Julie de Lange', status: 'administratie' },
    ],
    // za
    [],
    // zo
    [],
  ],
  current: [
    // ma
    [
      { time: '08:00 - 09:00', type: 'Ochtendhulp', icon: 'morning', client: 'Julie de Lange', status: 'actief' },
      { time: '10:00 - 11:00', type: 'Ochtendhulp', icon: 'morning', client: 'Julie de Lange', status: 'over30min' },
    ],
    // di
    [
      { time: '08:00 - 09:00', type: 'Ochtendhulp', icon: 'morning', client: 'Julie de Lange', status: 'bevestigd' },
      { time: '14:00 - 15:00', type: 'Ochtendhulp', icon: 'morning', client: 'Julie de Lange', status: 'bevestigd' },
    ],
    // wo
    [],
    // do
    [
      { time: '08:00 - 09:00', type: 'Ochtendhulp', icon: 'morning', client: 'Julie de Lange', status: 'verzoek' },
      { time: '10:00 - 11:00', type: 'Ochtendhulp', icon: 'morning', client: 'Julie de Lange', status: 'verzoek' },
      { time: '14:00 - 15:00', type: 'Ochtendhulp', icon: 'morning', client: 'Julie de Lange', status: 'bevestigd' },
    ],
    // vr
    [
      { time: '08:00 - 09:00', type: 'Ochtendhulp', icon: 'morning', client: 'Julie de Lange', status: 'bevestigd' },
    ],
    // za
    [],
    // zo
    [],
  ],
  future: [
    // ma
    [
      { time: '09:00 - 10:30', type: 'Ochtendhulp', icon: 'morning', client: 'Julie de Lange', status: 'verzoek' },
      { time: '14:00 - 15:30', type: 'Ochtendhulp', icon: 'morning', client: 'Julie de Lange', status: 'verzoek' },
    ],
    // di
    [],
    // wo
    [
      { time: '10:00 - 12:00', type: 'Persoonlijke verzorging', icon: 'morning', client: 'Sophie Bakker', status: 'verzoek' },
    ],
    // do
    [],
    // vr
    [
      { time: '09:00 - 10:30', type: 'Ochtendhulp', icon: 'morning', client: 'Julie de Lange', status: 'bevestigd' },
    ],
    // za
    [],
    // zo
    [],
  ],
}

function _generateAgendaWeeks() {
  const today = new Date()
  const dayOfWeek = today.getDay() // 0=zo, 1=ma, ..., 6=za
  // Get Monday of the current week
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7))
  monday.setHours(0, 0, 0, 0)

  const DAY_ABBRS = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo']
  const MONTHS_NL = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December']
  const MONTHS_SHORT = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec']

  const pad = n => String(n).padStart(2, '0')
  const toLocalISO = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
  const todayStr = toLocalISO(today)
  let idCounter = 1

  const weekOffsets = [
    { offset: -7, type: 'past' },
    { offset: 0, type: 'current' },
    { offset: 7, type: 'future' },
  ]

  function getWeekNr(d) {
    const tmp = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    tmp.setUTCDate(tmp.getUTCDate() + 4 - (tmp.getUTCDay() || 7))
    const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1))
    return Math.ceil(((tmp - yearStart) / 86400000 + 1) / 7)
  }

  return weekOffsets.map(({ offset, type }) => {
    const weekMonday = new Date(monday)
    weekMonday.setDate(monday.getDate() + offset)

    const days = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekMonday)
      d.setDate(weekMonday.getDate() + i)
      const iso = toLocalISO(d)
      const dayNum = d.getDate()
      const monthShort = MONTHS_SHORT[d.getMonth()]
      const abbr = DAY_ABBRS[i]
      const label = `${abbr.charAt(0).toUpperCase() + abbr.slice(1)} ${dayNum} ${monthShort}`

      const pattern = _appointmentPatterns[type][i] || []
      const appointments = pattern.map(a => ({ ...a, id: idCounter++ }))
      const hasWork = appointments.length > 0

      days.push({
        label,
        dayAbbr: abbr,
        date: dayNum,
        isoDate: iso,
        isToday: iso === todayStr,
        ...(hasWork ? { workingHours: '09:00 - 17:00' } : {}),
        appointments,
      })
    }

    // Use the month of Thursday (ISO week standard) for the header
    const thursday = new Date(weekMonday)
    thursday.setDate(weekMonday.getDate() + 3)
    const month = `${MONTHS_NL[thursday.getMonth()]} ${thursday.getFullYear()}`

    return {
      weekNr: getWeekNr(weekMonday),
      month,
      type,
      ...(type === 'past' ? { overviewBanner: `Bekijk het maandoverzicht ${MONTHS_NL[thursday.getMonth()].toLowerCase()}` } : {}),
      days,
    }
  })
}

export const agendaWeeks = _generateAgendaWeeks()

/* ---- Openstaande verzoeken (Agenda sub-page) ---- */
export const agendaVerzoeken = [
  { id: 1, date: 'Ma 26 mei', time: '12:00 - 12:20', client: 'Julie de Lange', type: 'Toilet', icon: 'toilet' },
  { id: 2, date: 'Di 27 sept', time: '08:00 - 09:00', client: 'Zara van der...', type: 'Ochtendhulp', icon: 'morning' },
  { id: 3, date: 'Di 27 sept', time: '14:00 - 14:30', client: 'Jasper van de...', type: 'Ochtendhulp', icon: 'morning' },
  { id: 4, date: 'Do 29 sept', time: '08:00 - 09:00', client: 'Finn de Vries', type: 'Ochtendhulp', icon: 'morning' },
  { id: 5, date: 'Do 29 sept', time: '08:00 - 09:00', client: 'Sophie Bakker', type: 'Ochtendhulp', icon: 'morning' },
  { id: 6, date: 'Vr 30 sept', time: '08:00 - 09:00', client: 'Fleur van Lee...', type: 'Ochtendhulp', icon: 'morning' },
  { id: 7, date: 'Vr 30 sept', time: '10:00 - 11:30', client: 'Milan van Dijk', type: 'Ochtendhulp', icon: 'morning' },
  { id: 8, date: 'Ma 3 okt', time: '08:00 - 09:00', client: 'Lara Jansen', type: 'Ochtendhulp', icon: 'morning' },
  { id: 9, date: 'Ma 3 okt', time: '08:00 - 09:00', client: 'Timo de Boer', type: 'Ochtendhulp', icon: 'morning' },
]

/* ---- Zoeken (search results) ---- */
export const zoekenConfig = {
  initialShowTopSheet: false,
  filterKey: 'typeZorgvrager',
  filterLabel: 'Type zorgvrager',
  filterOptions: ['Pgb-houder', 'Wlz', 'Wmo'],
  resultCountLabel: (n) => `${n} zorgvragers in jouw buurt`,
}

export const zoekenResultaten = [
  {
    id: 1,
    name: 'Anna Visser',
    initials: 'AV',
    age: 25,
    bio: 'Rechtenstudent en enthousiaste Pgb-zorghulp met een passie voor voetbal.',
    distance: '2 km',
    careTypes: [],
  },
  {
    id: 2,
    name: 'Deepika Yoshida',
    initials: 'DY',
    age: 23,
    bio: 'Student psychologie. Nieuwsgierig naar mensen. Beetje chaotisch soms maar altijd betrouwbaar.',
    distance: '2 km',
    careTypes: [],
  },
  {
    id: 3,
    name: 'Julia Smilde',
    initials: 'JS',
    age: 34,
    bio: 'Mensen helpen zit in mijn hart. Ik bied ondersteuning bij boodschappen, maaltijden en gezelschap.',
    distance: '2 km',
    careTypes: ['group'],
  },
  {
    id: 4,
    name: 'Monique Bakker',
    initials: 'MB',
    age: 55,
    bio: 'Als moeder van drie kinderen weet ik wat zorg betekent. Ik help graag met huishoudelijke taken.',
    distance: '2 km',
    careTypes: ['individual'],
  },
  {
    id: 5,
    name: 'Priya Tanaka',
    initials: 'PT',
    age: 28,
    bio: 'Verzorgende IG. Ik werk met hart en ziel. Naast mijn werk hou ik van yoga en koffie drinken.',
    distance: '2 km',
    careTypes: ['individual'],
  },
  {
    id: 6,
    name: 'Paul van Leeuwen',
    initials: 'PL',
    age: 58,
    bio: 'Begeleider gehandicaptenzorg. Handen uit de mouwen, hart op de juiste plek. Voorheen werkzaam in de bouw.',
    distance: '2 km',
    careTypes: ['individual'],
  },
  {
    id: 7,
    name: 'Sophie Peters',
    initials: 'SP',
    age: 29,
    bio: 'Zorg verlenen is voor mij vanzelfsprekend. Ik help graag met huishouden, koken en gezelschap.',
    distance: '2 km',
    careTypes: ['individual', 'group'],
  },
]

/* ---- Zorgverlener profielen (detailed profile data) ---- */

const defaultProfiel = {
  geslacht: 'Vrouw',
  locatie: 'Amsterdam',
  types: ['Formeel'],
  bio: 'Ik ben een toegewijde zorgverlener met passie voor het helpen van anderen.',
  zorgvragers: 3,
  lidSinds: '1-6-2025',
  audioIntro: false,
  zorgTypes: ['Huishoudelijke hulp'],
  zorgTypesExtra: 0,
  beschikbaarheid: [
    { dag: 'Maandag', tijd: '09:00 - 17:00' },
    { dag: 'Woensdag', tijd: '09:00 - 17:00' },
    { dag: 'Vrijdag', tijd: '09:00 - 17:00' },
  ],
  tarief: '€25 per uur (formeel)',
  tariefBespreekbaar: false,
  tariefVoorwaarden: [],
  talen: ['Nederlands'],
  praktischeInfo: ['Heeft een rijbewijs'],
  praktischeInfoExtra: 0,
  reviews: ['Vriendelijk', 'Betrouwbaar'],
  reviewsExtra: 0,
  cv: {
    opleidingen: [
      { titel: 'Helpende Zorg en Welzijn', periode: 'sep 2020 - jun 2023', instituut: 'ROC Amsterdam' },
    ],
    werkervaring: [
      { titel: 'Zorghulp', periode: 'aug 2023 - Huidig', bedrijf: 'Zelfstandig' },
    ],
    certificaten: [
      { titel: 'EHBO', periode: 'mrt 2022 - mrt 2025', instituut: 'Het Oranje Kruis' },
      { titel: 'BHV', periode: 'jan 2023 - jan 2026', instituut: 'ROC Amsterdam' },
    ],
    ervaringMet: ['Dementie', 'Diabetes', 'Mobiliteitsproblemen'],
    leerbereidheid: 'Ik sta open om op eigen kosten trainingen te volgen die nodig zijn voor jouw zorg. Denk aan bijv. tilcursus of medicatiebeheer.',
  },
  registraties: {
    typeZorgverlener: ['formeel'],
    professioneel: [
      { label: 'AGB', waarde: '12345678', link: true },
      { label: 'KvK', waarde: '87654321', link: true },
      { label: 'VOG', waarde: 'VOG NP', link: true },
      { label: 'BIG', waarde: null, tooltip: 'BIG-registratie is verplicht voor bepaalde beroepen in de zorg.' },
    ],
    beschiktOver: ['Privacybeleid (conform AVG)', 'Veiligheidsprotocol'],
    aangeslotenBij: ['Klachtenregeling'],
    verzekeringen: ['Beroepsaansprakelijkheid'],
  },
}

export const zorgverlenerProfielen = {
  nisha: {
    geslacht: 'Vrouw',
    leeftijd: 35,
    locatie: 'Amsterdam',
    types: ['Formeel', 'Informeel'],
    bio: 'Ik ben Nisha, 35 jaar, een betrokken en betrouwbare zorgverleenster met ruime levenservaring. Ik bied persoonlijke verzorging en ondersteuning met aandacht, respect en rust. Het welzijn, de veiligheid en het vertrouwen van de cliënt staan bij mij altijd centraal.',
    zorgvragers: 5,
    lidSinds: '1-3-2025',
    audioIntro: false,
    zorgTypes: ['Persoonlijke verzorging', 'Begeleiding individueel', 'Huishoudelijke hulp'],
    zorgTypesExtra: 0,
    beschikbaarheid: [
      { dag: 'Maandag', tijd: '08:00 - 16:00' },
      { dag: 'Dinsdag', tijd: '08:00 - 16:00' },
      { dag: 'Donderdag', tijd: '08:00 - 16:00' },
      { dag: 'Vrijdag', tijd: '08:00 - 16:00' },
    ],
    tarief: '€35 per uur (formeel)',
    tariefBespreekbaar: true,
    tariefVoorwaarden: ["Pgb's met lagere maximale tarieven", 'Zorgtrajecten van minimaal 3 maanden'],
    talen: ['Nederlands', 'Engels'],
    praktischeInfo: ['Heeft een rijbewijs', 'Rookt niet'],
    praktischeInfoExtra: 0,
    reviews: ['Betrokken en warm', 'Rustig en geduldig', 'Betrouwbaar'],
    reviewsExtra: 0,
    cv: {
      opleidingen: [
        { titel: 'Helpende Zorg en Welzijn', periode: 'sep 2018 - jun 2020', instituut: 'ROC van Amsterdam' },
        { titel: 'Verzorgende IG', periode: 'sep 2020 - jun 2022', instituut: 'ROC van Amsterdam' },
      ],
      werkervaring: [
        { titel: 'Persoonlijk begeleider', periode: 'jan 2024 - Huidig', bedrijf: 'Zelfstandig' },
        { titel: 'Verzorgende', periode: 'jul 2022 - dec 2024', bedrijf: 'Amsterdam Thuiszorg' },
      ],
      certificaten: [
        { titel: 'EHBO', periode: 'mrt 2023 - mrt 2026', instituut: 'Het Oranje Kruis' },
        { titel: 'BHV', periode: 'nov 2022 - nov 2025', instituut: 'ROC van Amsterdam' },
      ],
      ervaringMet: ['Dementie', 'Parkinson', 'Mobiliteitsproblemen', 'Diabetes'],
      leerbereidheid: 'Ik sta open om op eigen kosten trainingen te volgen die nodig zijn voor jouw zorg. Denk aan bijv. tilcursus of medicatiebeheer.',
    },
    registraties: {
      professioneel: [
        { label: 'AGB', waarde: '34237362', link: true },
        { label: 'KvK', waarde: '34237362', link: true },
        { label: 'VOG', waarde: 'VOG NP', link: true },
        { label: 'SKJ', waarde: '34237362', link: true },
        { label: 'BIG', waarde: null, tooltip: 'BIG-registratie is verplicht voor bepaalde beroepen in de zorg.' },
      ],
      beschiktOver: ['Privacybeleid (conform AVG)', 'Veiligheidsprotocol', 'Calamiteitenprotocol'],
      aangeslotenBij: ['Klachtenregeling', 'V&VN', 'ZZP\'er in de Zorg'],
      verzekeringen: ['Beroepsaansprakelijkheid'],
    },
  },
  4: {
    geslacht: 'Vrouw',
    locatie: 'Amsterdam, Utrecht',
    bio: 'Ik ben Monique, 58 jaar, een betrokken en betrouwbare zorgverleenster met ruime ervaring in de thuiszorg. Als moeder van drie kinderen weet ik wat zorg en aandacht betekent.',
    zorgvragers: 8,
    lidSinds: '4-2-2025',
    audioIntro: true,
    zorgTypes: ['Persoonlijke verzorging', 'Verpleging', 'Huishoudelijke hulp'],
    zorgTypesExtra: 10,
    beschikbaarheid: [
      { dag: 'Maandag', tijd: '09:00 - 17:00' },
      { dag: 'Dinsdag', tijd: '09:00 - 17:00' },
      { dag: 'Woensdag', tijd: '09:00 - 17:00' },
      { dag: 'Donderdag', tijd: '09:00 - 17:00' },
      { dag: 'Vrijdag', tijd: '09:00 - 17:00' },
    ],
    tarief: '€40 per uur (formeel)',
    tariefBespreekbaar: true,
    tariefVoorwaarden: ["Pgb's met lagere maximale tarieven", 'Meerdere uren per week (10+ uur)', 'Lichte ondersteuning (geen zware fysieke zorg)'],
    talen: ['Nederlands', 'Engels (basis)', 'Arabisch'],
    praktischeInfo: ['Heeft een rijbewijs', 'Kan met huisdieren', 'Rookt niet'],
    praktischeInfoExtra: 10,
    reviews: ['Betrouwbaar en punctueel', 'Rustig en geduldig', 'Voelt goed aan wat nodig is'],
    reviewsExtra: 2,
    cv: {
      opleidingen: [
        { titel: 'Persoonlijke verzorging', periode: 'sep 2020 - jun 2023', instituut: 'ROC van Amsterdam' },
        { titel: 'Helpende Plus Zorg en Welzijn', periode: 'sep 2020 - jun 2023', instituut: 'ROC van Amsterdam' },
      ],
      werkervaring: [
        { titel: 'Begeleider', periode: 'feb 2024 - Huidig', bedrijf: 'Cordaan' },
        { titel: 'Ondersteunend begeleider', periode: 'apr 2020 - jan 2023', bedrijf: 'Cordaan' },
        { titel: 'Helpende', periode: 'mei 2018 - mrt 2020', bedrijf: 'Cordaan' },
      ],
      certificaten: [
        { titel: 'Gebarentaal', periode: 'jun 2021 - jun 2024', instituut: 'ROC van Amsterdam' },
        { titel: 'BHV', periode: 'okt 2020 - okt 2023', instituut: 'ROC van Amsterdam' },
        { titel: 'Sondevoeding', periode: 'jan 2022 - jan 2025', instituut: 'ROC van Amsterdam' },
        { titel: 'Beademing', periode: 'mrt 2022 - mrt 2025', instituut: 'ROC van Amsterdam' },
      ],
      ervaringMet: ['Epilepsie', 'Autisme', 'Gedragsstoornis', 'Beademing'],
      leerbereidheid: 'Ik sta open om op eigen kosten trainingen te volgen die nodig zijn voor jouw zorg. Zoals bijv. tracheacanulezorg.',
    },
    registraties: {
      professioneel: [
        { label: 'AGB', waarde: '34237362', link: true },
        { label: 'KvK', waarde: '34237362', link: true },
        { label: 'VOG', waarde: 'VOG NP', link: true },
        { label: 'SKJ', waarde: '34237362', link: true },
        { label: 'BIG', waarde: null, tooltip: 'BIG-registratie is verplicht voor bepaalde beroepen in de zorg.' },
      ],
      beschiktOver: ['Privacybeleid (conform AVG)', 'Veiligheidsprotocol', 'Calamiteitenprotocol'],
      aangeslotenBij: ['Klachtenregeling', 'V&VN', 'ZZP\'er in de Zorg'],
      verzekeringen: ['Beroepsaansprakelijkheid'],
    },
  },
}

/* Helper: get profiel for a zorgverlener, with fallback to defaults */
export function getZorgverlenerProfiel(id) {
  return zorgverlenerProfielen[id] || defaultProfiel
}

/* ---- Talen instellingen ---- */
export const talenInstellingen = [
  // Populaire talen (tonen op hoofdscherm)
  { id: 'nl', label: 'Nederlands', enabled: true, popular: true, level: 'vloeiend' },
  { id: 'en', label: 'Engels', enabled: false, popular: true, level: null },
  { id: 'de', label: 'Duits', enabled: false, popular: true, level: null },
  { id: 'fr', label: 'Frans', enabled: false, popular: true, level: null },
  { id: 'ar', label: 'Arabisch', enabled: false, popular: true, level: null },
  { id: 'tr', label: 'Turks', enabled: false, popular: true, level: null },
  { id: 'es', label: 'Spaans', enabled: false, popular: true, level: null },
  { id: 'pap', label: 'Papiaments', enabled: false, popular: true, level: null },
  { id: 'fy', label: 'Fries', enabled: false, popular: true, level: null },
  { id: 'pl', label: 'Pools', enabled: false, popular: true, level: null },
  // Overige talen (alleen via zoekscherm)
  { id: 'ber', label: 'Berbers', enabled: false, popular: false, level: null },
  { id: 'bg', label: 'Bulgaars', enabled: false, popular: false, level: null },
  { id: 'zh', label: 'Chinees (Mandarijn)', enabled: false, popular: false, level: null },
  { id: 'da', label: 'Deens', enabled: false, popular: false, level: null },
  { id: 'fi', label: 'Fins', enabled: false, popular: false, level: null },
  { id: 'el', label: 'Grieks', enabled: false, popular: false, level: null },
  { id: 'he', label: 'Hebreeuws', enabled: false, popular: false, level: null },
  { id: 'hi', label: 'Hindi', enabled: false, popular: false, level: null },
  { id: 'hu', label: 'Hongaars', enabled: false, popular: false, level: null },
  { id: 'id', label: 'Indonesisch', enabled: false, popular: false, level: null },
  { id: 'it', label: 'Italiaans', enabled: false, popular: false, level: null },
  { id: 'ja', label: 'Japans', enabled: false, popular: false, level: null },
  { id: 'ko', label: 'Koreaans', enabled: false, popular: false, level: null },
  { id: 'ku', label: 'Koerdisch', enabled: false, popular: false, level: null },
  { id: 'no', label: 'Noors', enabled: false, popular: false, level: null },
  { id: 'uk', label: 'Oekraïens', enabled: false, popular: false, level: null },
  { id: 'fa', label: 'Perzisch (Farsi)', enabled: false, popular: false, level: null },
  { id: 'pt', label: 'Portugees', enabled: false, popular: false, level: null },
  { id: 'ro', label: 'Roemeens', enabled: false, popular: false, level: null },
  { id: 'ru', label: 'Russisch', enabled: false, popular: false, level: null },
  { id: 'sr', label: 'Servisch', enabled: false, popular: false, level: null },
  { id: 'so', label: 'Somalisch', enabled: false, popular: false, level: null },
  { id: 'tl', label: 'Tagalog', enabled: false, popular: false, level: null },
  { id: 'ta', label: 'Tamil', enabled: false, popular: false, level: null },
  { id: 'th', label: 'Thai', enabled: false, popular: false, level: null },
  { id: 'ti', label: 'Tigrinya', enabled: false, popular: false, level: null },
  { id: 'ur', label: 'Urdu', enabled: false, popular: false, level: null },
  { id: 'vi', label: 'Vietnamees', enabled: false, popular: false, level: null },
  { id: 'sv', label: 'Zweeds', enabled: false, popular: false, level: null },
]

/* ---- Goed om te weten (Profiel) ---- */
export const goedOmTeWetenInstellingen = [
  {
    id: 'praktisch',
    title: 'Praktisch',
    items: [
      { id: 'pr-1', label: 'Rijbewijs', enabled: true },
      { id: 'pr-2', label: 'Auto beschikbaar', enabled: false },
      { id: 'pr-3', label: 'BHV/EHBO-diploma', enabled: true },
      { id: 'pr-4', label: 'Kan tillen', enabled: false },
    ],
  },
  {
    id: 'persoonlijk',
    title: 'Persoonlijk',
    items: [
      { id: 'pe-1', label: 'Rookt niet', enabled: true },
      { id: 'pe-2', label: 'Huisdieren thuis', enabled: false },
      { id: 'pe-3', label: 'Vegetarisch/veganistisch koken', enabled: false },
    ],
  },
  {
    id: 'overig',
    title: 'Overig',
    items: [
      { id: 'ov-1', label: 'Flexibel inzetbaar', enabled: false },
      { id: 'ov-2', label: 'Overnachting mogelijk', enabled: false },
    ],
  },
]

export const locatiesInstellingen = [
  { id: 1, postcode: '1015 BA', straal: 15 },
]

export const tariefVoorwaardenInstellingen = [
  { id: 'tv-1', label: "Pgb's met lagere maximale tarieven", enabled: true },
  { id: 'tv-2', label: 'Zorgtrajecten van minimaal 3 maanden', enabled: true },
  { id: 'tv-3', label: 'Meerdere uren per week (10+ uur)', enabled: false },
  { id: 'tv-4', label: 'Lichte ondersteuning (geen zware fysieke zorg)', enabled: false },
]
