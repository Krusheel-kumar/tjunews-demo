import type {
  Article,
  JobNotification,
  ExamEvent,
  QuizQuestion,
  WeatherData,
  DailyBriefingItem,
  ShortVideo,
  NotificationItem,
  CitizenSubmission
} from './types';

export const INITIAL_WEATHER: WeatherData = {
  city: 'Hyderabad',
  locality: 'Banjara Hills / Madhapur',
  temp: 29,
  feelsLike: 31,
  condition: 'Partly Cloudy',
  rainProb: 20,
  humidity: 62,
  windSpeed: 14,
  airQuality: 'Satisfactory (AQI 72)',
  alerts: ['GHMC Advisory: Evening scattered drizzles expected across Cyberabad corridor'],
  hourly: [
    { time: 'Now', temp: 29, icon: 'cloud-sun' },
    { time: '3 PM', temp: 31, icon: 'sun' },
    { time: '5 PM', temp: 28, icon: 'cloud-rain' },
    { time: '7 PM', temp: 26, icon: 'cloud' },
    { time: '9 PM', temp: 24, icon: 'moon' }
  ],
  forecast: [
    { day: 'Today', high: 31, low: 22, condition: 'Partly Cloudy' },
    { day: 'Fri', high: 30, low: 21, condition: 'Scattered Showers' },
    { day: 'Sat', high: 32, low: 22, condition: 'Sunny & Pleasant' },
    { day: 'Sun', high: 33, low: 23, condition: 'Warm & Clear' },
    { day: 'Mon', high: 31, low: 21, condition: 'Partly Cloudy' }
  ]
};

export const INITIAL_JOB_NOTIFICATIONS: JobNotification[] = [
  {
    id: 'tspsc-grp2-2026',
    title: 'TSPSC Group-2 Services: 783 Vacancies Notification Released',
    titleTe: 'టీఎస్‌పీఎస్సీ గ్రూప్-2 సర్వీసెస్: 783 ఉద్యోగాల భర్తీ నోటిఫికేషన్ విడుదల',
    department: 'Telangana State Public Service Commission (TSPSC)',
    category: 'Group Services',
    stateOrCentral: 'State (Telangana)',
    qualification: 'Any Degree',
    vacancies: 783,
    ageLimit: '18 - 44 Years (Relaxations as per State Rules)',
    applicationStartDate: '01 Nov 2026',
    applicationDeadline: '25 Nov 2026',
    examDate: '15 Jan 2027',
    status: 'Applications Open',
    officialNotificationUrl: 'https://websitenew.tspsc.gov.in',
    officialApplyUrl: 'https://websitenew.tspsc.gov.in/tspsconline',
    description: 'Recruitment for Municipal Commissioner Gr-III, Sub-Registrar Gr-II, ACTO, Extension Officer, Assistant Section Officer, and Mandal Panchayat Officer in Telangana State.',
    syllabusHighlights: [
      'Paper-I: General Studies and General Abilities',
      'Paper-II: History, Polity and Society (Telangana & India)',
      'Paper-III: Economy and Development',
      'Paper-IV: Telangana Movement and State Formation'
    ]
  },
  {
    id: 'telangana-police-constable-si',
    title: 'Telangana Police Recruitment Board: 6,400 SI & Constable Posts',
    titleTe: 'తెలంగాణ పోలీస్ నియామక బోర్డు: 6,400 ఎస్ఐ & కానిస్టేబుల్ పోస్టులు',
    department: 'Telangana State Level Police Recruitment Board (TSLPRB)',
    category: 'Police',
    stateOrCentral: 'State (Telangana)',
    qualification: '10th / Intermediate',
    vacancies: 6400,
    ageLimit: '18 - 30 Years (Special 3-year age relaxation provided)',
    applicationStartDate: '10 Nov 2026',
    applicationDeadline: '30 Nov 2026',
    examDate: '28 Feb 2027',
    status: 'Upcoming',
    officialNotificationUrl: 'https://www.tslprb.in',
    officialApplyUrl: 'https://www.tslprb.in/apply',
    description: 'Police Constables (Civil / AR / TSSP) and Sub-Inspectors across all 33 Telangana districts.',
    syllabusHighlights: [
      'Preliminary Written Test (PWT) - 200 Marks',
      'Physical Efficiency Test (1600m run, Long Jump, Shot Put)',
      'Final Written Examination (Technical & General Awareness)'
    ]
  },
  {
    id: 'tg-dsc-tet-teachers',
    title: 'Telangana Mega DSC Teacher Recruitment: 11,062 School Assistant & SGT Vacancies',
    titleTe: 'తెలంగాణ మెగా డీఎస్సీ ఉపాధ్యాయ నియామకాలు: 11,062 స్కూల్ అసిస్టెంట్ & ఎస్జీటీ ఖాళీలు',
    department: 'School Education Department, Telangana',
    category: 'Teachers / TET',
    stateOrCentral: 'State (Telangana)',
    qualification: 'B.Ed / D.Ed',
    vacancies: 11062,
    ageLimit: '18 - 46 Years',
    applicationStartDate: '15 Oct 2026',
    applicationDeadline: '10 Nov 2026',
    examDate: '20 Dec 2026',
    status: 'Applications Open',
    officialNotificationUrl: 'https://schooledu.telangana.gov.in',
    officialApplyUrl: 'https://tgdsc.aptonline.in',
    description: 'Comprehensive teacher recruitment drive covering Telugu, English, and Urdu medium government and ZP schools.',
    syllabusHighlights: [
      'Part I: General Knowledge and Current Affairs',
      'Part II: Perspectives in Education',
      'Part III: Language & Methodology',
      'Part IV: Content (Classes 1 to 10 standard syllabus)'
    ]
  },
  {
    id: 'ssc-cgl-central-2026',
    title: 'SSC CGL 2026: 14,000 Group B & C Central Government Vacancies',
    titleTe: 'ఎస్‌ఎస్‌సీ సీజీఎల్ 2026: 14,000 కేంద్ర ప్రభుత్వ ఉద్యోగాలు',
    department: 'Staff Selection Commission (Govt of India)',
    category: 'Central / SSC / RRB',
    stateOrCentral: 'Central Government',
    qualification: 'Any Degree',
    vacancies: 14000,
    ageLimit: '18 - 32 Years',
    applicationStartDate: '20 Sep 2026',
    applicationDeadline: '24 Oct 2026',
    examDate: '12 Dec 2026',
    status: 'Hall Tickets Released',
    officialNotificationUrl: 'https://ssc.gov.in',
    officialApplyUrl: 'https://ssc.gov.in/portal',
    description: 'Inspectors of Income Tax, Central Excise, CBI Sub-Inspectors, Postal Assistants, and Divisional Accountants across India.',
    syllabusHighlights: [
      'Tier 1: General Intelligence, General Awareness, Quantitative Aptitude, English',
      'Tier 2: Mathematical Abilities, Reasoning, Computer Knowledge & Data Entry Test'
    ]
  },
  {
    id: 'ibps-po-banking',
    title: 'IBPS Probationary Officers (PO/MT XIV): 4,455 Bank PO Vacancies',
    titleTe: 'ఐబీపీఎస్ ప్రొబేషనరీ ఆఫీసర్స్ (పీవో): 4,455 బ్యాంక్ పోస్టులు',
    department: 'Institute of Banking Personnel Selection',
    category: 'Banking',
    stateOrCentral: 'Central Government',
    qualification: 'Any Degree',
    vacancies: 4455,
    ageLimit: '20 - 30 Years',
    applicationStartDate: '05 Aug 2026',
    applicationDeadline: '28 Aug 2026',
    examDate: '19 Oct 2026',
    status: 'Results Declared',
    officialNotificationUrl: 'https://www.ibps.in',
    officialApplyUrl: 'https://ibpsonline.ibps.in',
    description: 'PO recruitment for 11 public sector participating banks including Canara Bank, Union Bank, PNB and Bank of Baroda.'
  }
];

export const INITIAL_EXAM_CALENDAR: ExamEvent[] = [
  {
    id: 'ex-1',
    title: 'TSPSC Group 2 Prelims',
    category: 'Telangana PSC',
    examDate: '15 Jan 2027',
    hallTicketDate: '05 Jan 2027',
    status: 'Scheduled',
    officialLink: 'https://websitenew.tspsc.gov.in'
  },
  {
    id: 'ex-2',
    title: 'Mega DSC Teacher Recruitment Exam',
    category: 'School Education',
    examDate: '20 Dec 2026',
    hallTicketDate: '10 Dec 2026',
    status: 'Scheduled',
    officialLink: 'https://tgdsc.aptonline.in'
  },
  {
    id: 'ex-3',
    title: 'SSC Combined Graduate Level (Tier 1)',
    category: 'Staff Selection Commission',
    examDate: '12 Dec 2026',
    hallTicketDate: 'Available Now',
    status: 'Hall Ticket Live',
    officialLink: 'https://ssc.gov.in'
  },
  {
    id: 'ex-4',
    title: 'Telangana State Police SI / Constable PET',
    category: 'Police Board',
    examDate: '28 Feb 2027',
    status: 'Scheduled',
    officialLink: 'https://www.tslprb.in'
  }
];

export const INITIAL_QUIZ: QuizQuestion[] = [
  {
    id: 'q-1',
    question: 'Under Hyderabad Metro Phase-2 revised DPR, which heritage precinct will receive direct metro connectivity from MGBS?',
    questionTe: 'హైదరాబాద్ మెట్రో ఫేజ్-2 లో ఎంజీబీఎస్ నుండి ఏ చారిత్రక ప్రాంతానికి మెట్రో అనుసంధానం మంజూరైంది?',
    options: ['Falaknuma (Old City)', 'Golconda Fort', 'Mehdipatnam', 'Qutb Shahi Tombs'],
    optionsTe: ['ఫలక్‌నుమా (పాతబస్తీ)', 'గోల్కొండ కోట', 'మెహదీపట్నం', 'కుతుబ్‌షాహీ సమాధులు'],
    correctIndex: 0,
    explanation: 'The Telangana Cabinet approved the 5.5 km corridor linking Mahatma Gandhi Bus Station (MGBS) directly to Falaknuma in the Old City.',
    category: 'Telangana Current Affairs'
  },
  {
    id: 'q-2',
    question: 'Which Telangana district recently recorded rapid growth in Tier-2 IT campuses and software engineering exports?',
    questionTe: 'ఇటీవల టైర్-2 ఐటీ క్యాంపస్‌లు మరియు సాఫ్ట్‌వేర్ ఎగుమతుల్లో గణనీయమైన వృద్ధిని సాధించిన తెలంగాణ జిల్లా ఏది?',
    options: ['Warangal', 'Nizamabad', 'Nalgonda', 'Adilabad'],
    optionsTe: ['వరంగల్', 'నిజామాబాద్', 'నల్గొండ', 'ఆదిలాబాద్'],
    correctIndex: 0,
    explanation: 'Warangal has emerged as a premier technology cluster with leading tech companies establishing regional global delivery centers.',
    category: 'Telangana Current Affairs'
  },
  {
    id: 'q-3',
    question: 'What is the upper age limit for general category applicants in the latest TSPSC Group-2 recruitment notification?',
    questionTe: 'తాజా టీఎస్‌పీఎస్సీ గ్రూప్-2 నోటిఫికేషన్‌లో జనరల్ కేటగిరీ అభ్యర్థుల గరిష్ట వయోపరిమితి ఎంత?',
    options: ['34 Years', '44 Years', '40 Years', '42 Years'],
    optionsTe: ['34 సంవత్సరాలు', '44 సంవత్సరాలు', '40 సంవత్సరాలు', '42 సంవత్సరాలు'],
    correctIndex: 1,
    explanation: 'The Telangana state government has granted a general age relaxation raising the upper age ceiling to 44 years for civil posts.',
    category: 'General Studies'
  },
  {
    id: 'q-4',
    question: 'Which river in Telangana is the Sripada Yellampalli irrigation project built across?',
    questionTe: 'తెలంగాణలోని శ్రీపాద ఎల్లంపల్లి సాగునీటి ప్రాజెక్టు ఏ నదిపై నిర్మించబడింది?',
    options: ['Godavari', 'Krishna', 'Manjira', 'Tungabhadra'],
    optionsTe: ['గోదావరి', 'కృష్ణా', 'మంజీరా', 'తుంగభద్ర'],
    correctIndex: 0,
    explanation: 'The Sripada Yellampalli barrage is built across the Godavari River in Peddapalli district to supply drinking water to Hyderabad and NTPC.',
    category: 'History & Culture'
  },
  {
    id: 'q-5',
    question: 'In India, which constitutional article guarantees Freedom of Speech and Expression, essential for public journalism?',
    questionTe: 'భారత రాజ్యాంగంలో భావ ప్రకటన మరియు వాక్ స్వాతంత్య్రాన్ని కల్పించే అధికరణ ఏది?',
    options: ['Article 14', 'Article 19(1)(a)', 'Article 21', 'Article 32'],
    optionsTe: ['ఆర్టికల్ 14', 'ఆర్టికల్ 19(1)(ఎ)', 'ఆర్టికల్ 21', 'ఆర్టికల్ 32'],
    correctIndex: 1,
    explanation: 'Article 19(1)(a) of the Constitution of India guarantees all citizens the right to freedom of speech and expression, including freedom of the press.',
    category: 'Indian Polity'
  }
];

export const INITIAL_BRIEFING: DailyBriefingItem[] = [
  {
    id: 'brief-1',
    rank: 1,
    headline: 'Cabinet okays ₹24,200 Cr for Hyderabad Metro Phase-2 corridors.',
    headlineTe: 'హైదరాబాద్ మెట్రో ఫేజ్-2 కు ₹24,200 కోట్లు కేబినెట్ ఆమోదం.',
    summary: 'Airport expressway, Old City Falaknuma line, and Kokapet Neopolis link cleared.',
    summaryTe: 'శంషాబాద్ ఎయిర్‌పోర్ట్, పాతబస్తీ ఫలక్‌నుమా, కోకాపేట్ మార్గాలకు నిధులు ఖరారు.',
    category: 'Hyderabad',
    relatedArticleId: 'hyd-metro-expansion-2026'
  },
  {
    id: 'brief-2',
    rank: 2,
    headline: 'Telangana IT exports surpass ₹2.8 Lakh Crore mark as Tier-2 hubs boom.',
    headlineTe: 'తెలంగాణ ఐటీ ఎగుమతులు ₹2.8 లక్షల కోట్ల మైలురాయిని అధిగమించాయి.',
    summary: 'Warangal and Karimnagar tech corridors generated over 42,000 new software jobs.',
    summaryTe: 'వరంగల్, కరీంనగర్ ఐటీ కారిడార్లలో 42,000 కు పైగా కొత్త ఉద్యోగాలు లభించాయి.',
    category: 'Telangana',
    relatedArticleId: 'telangana-it-growth-record'
  },
  {
    id: 'brief-3',
    rank: 3,
    headline: 'Mega DSC 2026 notification: 11,062 teacher jobs open for applications.',
    headlineTe: 'మెగా డీఎస్సీ 2026: 11,062 ఉపాధ్యాయ పోస్టుల దరఖాస్తులు ప్రారంభం.',
    summary: 'Hall tickets to release in December; exam scheduled across 33 district centers.',
    summaryTe: 'డిసెంబర్‌లో హాల్‌టిక్కెట్లు విడుదల; 33 జిల్లాల్లో రాత పరీక్షలు నిర్వహణ.',
    category: 'Education & Jobs',
    relatedArticleId: 'art-job-dsc-2026'
  },
  {
    id: 'brief-4',
    rank: 4,
    headline: 'Hussain Sagar Deccan Heritage Food Carnival draws over 40,000 foodies.',
    headlineTe: 'హుస్సేన్ సాగర్ డెక్కన్ ఫుడ్ ఫెస్టివల్‌కు పోటెత్తిన 40,000 మంది నగరవాసులు.',
    summary: 'Authentic dum biryani and Haleem preparations showcased at People’s Plaza.',
    summaryTe: 'పీపుల్స్ ప్లాజా వద్ద ప్రత్యేక దమ్ బిర్యానీ, సంప్రదాయ వంటకాల ప్రదర్శన.',
    category: 'Entertainment',
    relatedArticleId: 'hyderabad-briyani-gi-tag-festival'
  },
  {
    id: 'brief-5',
    rank: 5,
    headline: 'Cyberabad Police introduce 24x7 AI signal synchronization in Hitec City.',
    headlineTe: 'హైటెక్ సిటీలో 24x7 ఏఐ సిగ్నల్ వ్యవస్థను ప్రారంభించిన సైబరాబాద్ పోలీసులు.',
    summary: 'Travel delays along Madhapur and Gachibowli junctions dropped by 22%.',
    summaryTe: 'మాదాపూర్, గచ్చిబౌలి కారిడార్లలో ట్రాఫిక్ నిరీక్షణ సమయం 22% తగ్గింది.',
    category: 'Civic Issues',
    relatedArticleId: 'art-traffic-ai-2026'
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'hyd-metro-expansion-2026',
    title: 'Metro Phase 2: Cabinet sanctions ₹24,200 Cr for 76 km corridor',
    titleTe: 'మెట్రో ఫేజ్ 2: 76 కి.మీ కారిడార్‌కు ₹24,200 కోట్లకు కేబినెట్ ఆమోదం',
    summary: 'The new master plan links Shamshabad RGI Airport, Old City Falaknuma, and Kokapet Neopolis financial hub with driverless train systems.',
    summaryTe: 'శంషాబాద్ ఎయిర్‌పోర్ట్, పాతబస్తీ ఫలక్‌నుమా, కోకాపేట్ నియోపోలిస్ హబ్‌లను కలుపుతూ డ్రైవర్‌లెస్ మెట్రో వ్యవస్థ ఏర్పాటు.',
    content: [
      'HYDERABAD — In a landmark infra boost for Telangana, the state cabinet on Wednesday approved the revised Master DPR for Hyderabad Metro Rail Phase 2 spanning 76.4 kilometres across five major arteries.',
      'The approved corridors include the long-anticipated 5.5 km stretch from MGBS to Falaknuma in Old City, an elevated express link connecting Shamshabad RGI Airport to Raidurg, and high-capacity lines toward Kokapet Golden Triangle and LB Nagar to Hayathnagar.'
    ],
    contentTe: [
      'హైదరాబాద్ — తెలంగాణ మౌలిక సదుపాయాల రంగంలో సరికొత్త అధ్యాయం ప్రారంభమైంది. హైదరాబాద్ మెట్రో రైల్ ఫేజ్-2 కింద 76.4 కిలోమీటర్ల మేర ఐదు ప్రధాన మార్గాలకు రాష్ట్ర మంత్రివర్గం ఆమోదం తెలిపింది.'
    ],
    category: 'Hyderabad',
    author: 'K. Sridhar, TJU Bureau',
    publishedAt: '2 min ago',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    readTime: '3 min read',
    location: 'Hyderabad',
    locality: 'Old City & Hitec City',
    views: 18450
  },
  {
    id: 'imd-rains-telangana',
    title: 'IMD alerts heavy rains across Telangana',
    titleTe: 'తెలంగాణవ్యాప్తంగా భారీ వర్షాలు: ఐఎండీ ఎల్లో అలర్ట్ జారీ',
    summary: 'Meteorological department issues weather warnings for 14 districts with localized waterlogging forecasts.',
    summaryTe: 'హైదరాబాద్ మరియు ఉత్తర తెలంగాణ జిల్లాల్లో విస్తారంగా ఉరుములు, మెరుపులతో కూడిన వర్షాలు.',
    content: [
      'HYDERABAD — India Meteorological Department has issued weather advisories anticipating active monsoon trough movement across central Telangana districts.',
      'Municipal control rooms and disaster response force teams have been placed on standby across low-lying zones.'
    ],
    category: 'Telangana',
    author: 'TJU Weather Bureau',
    publishedAt: '12 min ago',
    imageUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&auto=format&fit=crop&q=80',
    isBreaking: true,
    isFeatured: false,
    readTime: '2 min read',
    location: 'Telangana',
    views: 14200
  },
  {
    id: 'sc-telangana-hearing',
    title: 'Supreme Court hearing on key Telangana case',
    titleTe: 'తెలంగాణ కీలక కేసుపై నేడు సుప్రీంకోర్టులో విచారణ',
    summary: 'Constitutional bench to examine inter-state river water sharing petitions and administrative guidelines.',
    summaryTe: 'కృష్ణా, గోదావరి నదీ జలాల కేటాయింపులపై నేడు అత్యున్నత న్యాయస్థానంలో వాదనలు.',
    content: [
      'NEW DELHI — A three-judge bench of the Supreme Court will take up hearing on inter-state water arbitration petitions concerning Telangana and neighboring riparian states.'
    ],
    category: 'India',
    author: 'Legal Correspondent, New Delhi',
    publishedAt: '28 min ago',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
    isBreaking: true,
    isFeatured: false,
    readTime: '3 min read',
    location: 'New Delhi',
    views: 11800
  },
  {
    id: 'ind-aus-odi-series',
    title: 'India to face Australia in high-voltage ODI series',
    titleTe: 'భారత్ - ఆస్ట్రేలియా హై-ఓల్టేజ్ వన్డే సిరీస్ నేటి నుంచి ప్రారంభం',
    summary: 'Captains unveil trophy at Rajiv Gandhi Stadium ahead of opener in front of 55,000 cricket fans.',
    summaryTe: 'ఉప్పల్ స్టేడియంలో 55,000 మంది అభిమానుల సమక్షంలో భారత్-ఆసీస్ కీలక సమరం.',
    content: [
      'HYDERABAD — The international cricket season kicks off with the first ODI of the bilateral series scheduled under floodlights.'
    ],
    category: 'Sports',
    author: 'Vikram Joshi, TJU Sports',
    publishedAt: '35 min ago',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80',
    isBreaking: true,
    isFeatured: false,
    readTime: '3 min read',
    location: 'Hyderabad',
    views: 19500
  },
  {
    id: 'telangana-it-growth-record',
    title: 'Telangana IT Exports Breach ₹2.8 Lakh Crore Benchmark As Tier-2 Hubs Surge',
    titleTe: 'తెలంగాణ ఐటీ ఎగుమతులు ₹2.8 లక్షల కోట్లకు చేరిక: టైర్-2 నగరాల్లో దూసుకుపోతున్న కంపెనీలు',
    summary: 'Warangal, Karimnagar and Khammam emerging as prominent talent magnets for global enterprise engineering centres.',
    summaryTe: 'వరంగల్, కరీంనగర్, ఖమ్మం నగరాల్లో సరికొత్త టెక్ హబ్‌లు, ఇంజనీరింగ్ కేంద్రాలు విస్తరిస్తున్నాయి.',
    content: [
      'HYDERABAD — Driven by semiconductor design, AI research infrastructure, and enterprise SaaS, Telangana’s annual IT services output achieved record milestones.',
      'Over 42,000 net new engineering jobs were generated over the past four quarters alone, with notable momentum in tier-2 tech parks.',
      'The government’s new Global Capability Centre (GCC) incentive package has accelerated interest from European financial groups and US automotive R&D centres looking for alternate technical hubs.'
    ],
    category: 'Telangana',
    author: 'TJU News Desk',
    publishedAt: '24 Oct 2026, 11:20 AM',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    isBreaking: false,
    isFeatured: false,
    isTrending: true,
    readTime: '4 min read',
    location: 'Warangal & Hyderabad',
    locality: 'Warangal IT SEZ',
    views: 9240
  },
  {
    id: 'art-job-dsc-2026',
    title: 'Telangana Mega DSC 2026: Complete Syllabus Breakdown & District Vacancy Roster',
    titleTe: 'తెలంగాణ మెగా డీఎస్సీ 2026: పూర్తి సిలబస్ విశ్లేషణ, జిల్లాల వారీగా ఖాళీల వివరాలు',
    summary: 'Expert guide for 11,062 School Assistant and SGT aspirants; application window closes 10 November.',
    summaryTe: '11,062 ఉపాధ్యాయ అభ్యర్థులకు మార్గదర్శి; నవంబర్ 10తో ముగియనున్న దరఖాస్తు గడువు.',
    content: [
      'HYDERABAD — With the School Education Department releasing the finalized district roster for 11,062 teacher vacancies, competitive exams coaching experts have outlined priority preparation strategies.',
      'Candidates appearing for School Assistant positions in Mathematics, Physical Science and Social Studies must dedicate 40% study hours to pedagogical methodology and state textbook content from 6th to 10th grades.',
      'Computer-based testing centers are being organized across all 33 district headquarters to eliminate long-distance travel hardship for rural women aspirants.'
    ],
    category: 'Education & Jobs',
    author: 'V. Raghunath, Education Bureau',
    publishedAt: '24 Oct 2026, 10:45 AM',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    readTime: '5 min read',
    location: 'Telangana',
    views: 24100
  },
  {
    id: 'hyderabad-briyani-gi-tag-festival',
    title: 'Telangana Heritage Food Carnival Kicks Off At Hussain Sagar: 40 Authentic Kitchens Under One Roof',
    titleTe: 'హుస్సేన్ సాగర్ వద్ద ఘనంగా ప్రారంభమైన డెక్కన్ ఫుడ్ కార్నివాల్: 40 సంప్రదాయ కిచెన్లు',
    summary: 'Celebration of authentic Hyderabadi culinary heritage, traditional Haleem preparations, and Deccan sweets draws massive crowds.',
    summaryTe: 'హైదరాబాదీ దమ్ బిర్యానీ, హలీమ్, సాంప్రదాయ స్వీట్లతో ఆహార ప్రియులను ఆకట్టుకుంటున్న ఉత్సవం.',
    content: [
      'HYDERABAD — People’s Plaza along the scenic Hussain Sagar shoreline turned into a foodie paradise as the five-day Deccan Culinary & Heritage Expo commenced.',
      'Master chefs from Old City heritage kitchens demonstrated age-old dum techniques using fragrant seeraga samba and aged basmati rice, natural saffron, and copper cauldrons over charcoal hearths.'
    ],
    category: 'Entertainment',
    author: 'Pooja Reddy, TJU Life',
    publishedAt: '24 Oct 2026, 09:30 AM',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80',
    isBreaking: false,
    isFeatured: false,
    isTrending: true,
    readTime: '2 min read',
    location: 'Hyderabad',
    locality: 'Necklace Road / Tank Bund',
    views: 15300
  },
  {
    id: 'art-traffic-ai-2026',
    title: 'Cyberabad Police Deploy Dynamic AI Traffic Signals to Decongest Gachibowli Junction',
    titleTe: 'గచ్చిబౌలి, మాదాపూర్‌లో ట్రాఫిక్ రద్దీ తగ్గింపునకు ఏఐ సిగ్నల్ వ్యవస్థ అమల్లోకి',
    summary: 'Adaptive camera-based traffic timers cut commuter delays by 22% during morning and evening rush hours.',
    summaryTe: 'ఆటోమేటిక్ సెన్సార్ సిగ్నల్స్‌తో ఉదయం, సాయంత్రం పీక్ అవర్లలో ప్రయాణ సమయం ఆదా.',
    content: [
      'GACHIBOWLI — Cyberabad Traffic Police and GHMC have integrated computer-vision signal controllers across 18 high-density junctions in the Financial District and Hitec City.',
      'The machine-learning sensors continuously analyze queue length on each road arm and allocate green light clearance dynamically, reducing vehicle idling emissions and improving public transit bus flow.'
    ],
    category: 'Civic Issues',
    author: 'TJU Civic Desk',
    publishedAt: '24 Oct 2026, 08:30 AM',
    imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&auto=format&fit=crop&q=80',
    isBreaking: false,
    isFeatured: false,
    readTime: '3 min read',
    location: 'Hyderabad',
    locality: 'Gachibowli & Madhapur',
    views: 7800
  },
  {
    id: 'ipl-hyderabad-stadium-upgrade',
    title: 'Uppal Rajiv Gandhi Stadium Upgrades Pavilion & Canopy Ahead Of Winter Championship',
    titleTe: 'ఉప్పల్ స్టేడియంలో కొత్త పవిలియన్ & ఆధునిక సీటింగ్ సదుపాయాలు ప్రారంభం',
    summary: 'Modernized LED floodlighting, upgraded dugout zones, and improved digital ticket turnstiles ready for 55,000 spectators.',
    summaryTe: '55,000 మంది ప్రేక్షకులకు అనుకూలంగా అత్యాధునిక ఎల్ఈడీ లైట్లు, కూలింగ్ మిస్ట్ ఫ్యాన్లు ఏర్పాటు.',
    content: [
      'HYDERABAD — Hyderabad Cricket Association (HCA) officially unveiled the renovated South Pavilion stand with premium seating, improved concourse shade, and solar-powered cooling mist fans for spectators.',
      'The pitch curator also noted that hybrid Bermuda grass turf has been laid to improve outfield speed and drainage during unseasonal showers.'
    ],
    category: 'Sports',
    author: 'Vikram Joshi, TJU Sports',
    publishedAt: '24 Oct 2026, 08:00 AM',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&auto=format&fit=crop&q=80',
    isBreaking: false,
    isFeatured: false,
    readTime: '3 min read',
    location: 'Uppal, Hyderabad',
    locality: 'Uppal',
    views: 8900
  },
  {
    id: 'india-clean-energy-summit',
    title: 'India Unveils 300 GW Solar-Wind Grid Balancing Protocol at National Energy Forum',
    titleTe: 'జాతీయ ఇంధన సదస్సులో 300 గిగావాట్ల గ్రీన్ ఎనర్జీ గ్రిడ్ ప్రోటోకాల్ ఆవిష్కరణ',
    summary: 'New national transmission corridors and battery energy storage mandates to stabilize green power flow during peak evening hours.',
    summaryTe: 'సౌర, పవన విద్యుత్ నిల్వలకు అధునాతన బ్యాటరీ స్టోరేజ్ నిబంధనలు ఖరారు.',
    content: [
      'NEW DELHI — India’s power ministry announced dynamic smart grid operational standards to integrate round-the-clock green generation across central grids.',
      'With over 180 gigawatts of solar and wind capacity now synchronized with the national grid, advanced high-voltage direct current (HVDC) lines are being commissioned to pump excess renewable energy from Rajasthan and Gujarat to eastern industrial belts.'
    ],
    category: 'India',
    author: 'Sunita Mehra, Delhi Bureau',
    publishedAt: '24 Oct 2026, 07:30 AM',
    imageUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
    isBreaking: false,
    isFeatured: false,
    readTime: '4 min read',
    location: 'New Delhi',
    views: 12100
  },
  {
    id: 'citizen-report-madhapur-drainage',
    title: 'Citizen Report: Community Alert On Drainage Repair Work At Madhapur 100ft Road',
    titleTe: 'సిటిజన్ రిపోర్ట్: మాదాపూర్ 100 ఫీట్ రోడ్డు వద్ద డ్రైనేజీ మరమ్మతుల పరిశీలన',
    summary: 'Local residents and civic volunteers successfully coordinate with GHMC engineering teams for speedy road restoration.',
    summaryTe: 'స్థానిక పౌరుల సమన్వయంతో వేగవంతంగా పూర్తయిన పైప్‌లైన్ క్లియరెన్స్ పనులు.',
    content: [
      'MADHAPUR — Submitted by Citizen Reporter Ananya Sharma and verified by TJU News Editorial Desk.',
      'After heavy rainfall caused sewer backflow along the busy Ayyappa Society 100-feet stretch, local citizen reporters submitted geo-tagged video evidence to TJU News Citizen Desk.',
      'Within 18 hours of editorial escalation, municipal suction vehicles and pipe repair teams were deployed to clear blockages, ensuring unhindered traffic ahead of morning peak office hours.'
    ],
    category: 'Citizen Report',
    author: 'Ananya Sharma (Citizen Contributor)',
    publishedAt: '15 min ago',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800&auto=format&fit=crop&q=80',
    isBreaking: false,
    isFeatured: false,
    readTime: '2 min read',
    location: 'Madhapur, Hyderabad',
    locality: 'Madhapur',
    views: 6420
  },
  {
    id: 'art-locality-banjara-hills',
    title: 'Banjara Hills Road No. 12 gets smart green corridor and solar cycle track',
    titleTe: 'బంజారాహిల్స్ రోడ్ నం. 12 లో సోలార్ సైకిల్ ట్రాక్, గ్రీన్ కారిడార్ ప్రారంభం',
    summary: 'GHMC introduces pedestrian walking plazas and native floral avenues connecting KBR park trail.',
    summaryTe: 'కేబీఆర్ పార్క్ పరిసరాల్లో పాదచారులకు నూతన వాకింగ్ ప్లాజా, పచ్చదనంతో కూడిన మార్గాలు.',
    content: [
      'BANJARA HILLS — The urban forestry wing of GHMC has commissioned a 3.2 km green pedestrian spine along Road No. 12.',
      'The corridor includes energy-efficient solar street lamps, drinking water fountains, and continuous surveillance for morning walkers.'
    ],
    category: 'Civic Issues',
    author: 'TJU Civic Beat',
    publishedAt: '22 min ago',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    isBreaking: false,
    isFeatured: false,
    readTime: '2 min read',
    location: 'Banjara Hills, Hyderabad',
    locality: 'Banjara Hills',
    views: 8120
  },
  {
    id: 'art-locality-charminar-night',
    title: 'Charminar pedestrian plaza night bazaar guidelines announced',
    titleTe: 'చార్మినార్ పాదచారుల ప్లాజా నైట్ బజార్ మార్గదర్శకాలు విడుదల',
    summary: 'Special heritage lighting, artisan craft stalls, and food kiosks permitted around historic monument from 7 PM to 1 AM.',
    summaryTe: 'చారిత్రక చార్మినార్ వద్ద రాత్రి 7 నుండి అర్ధరాత్రి 1 గంట వరకు చేతివృత్తుల స్టాళ్లు, ఫుడ్ కోర్టులు అనుమతి.',
    content: [
      'OLD CITY — The municipal administration has issued comprehensive operational rules for the weekend heritage night bazaar surrounding Charminar.',
      'Battery-operated shuttle buggies will ferry senior citizens from Madina building parking lots to the monument plaza.'
    ],
    category: 'Hyderabad',
    author: 'Mohammed Farooq, Old City Desk',
    publishedAt: '35 min ago',
    imageUrl: 'https://images.unsplash.com/photo-1572455044327-7348c1be7267?w=800&auto=format&fit=crop&q=80',
    isBreaking: false,
    isFeatured: false,
    readTime: '3 min read',
    location: 'Charminar / Old City, Hyderabad',
    locality: 'Charminar / Old City',
    views: 13500
  },
  {
    id: 'art-locality-kukatpally-feeder',
    title: 'Kukatpally Y-Junction introduces 20 electric mini feeder buses to metro stations',
    titleTe: 'కూకట్‌పల్లి వై-జంక్షన్ వద్ద 20 ఎలక్ట్రిక్ మెట్రో ఫీడర్ బస్సులు ప్రారంభం',
    summary: 'TSRTC launches green last-mile connectivity covering KPHB colonies, JNTU and Forum Mall every 7 minutes.',
    summaryTe: 'కేపీహెచ్‌బీ, జేఎన్‌టీయూ కాలనీలను కలుపుతూ ప్రతి 7 నిమిషాలకు ఎలక్ట్రిక్ ఫీడర్ బస్సు సర్వీసులు.',
    content: [
      'KUKATPALLY — Commuters along the heavy KPHB corridor received major relief today with the rollout of 20 air-conditioned electric feeder minibuses.',
      'Passengers can use unified Hyderabad Metro smart cards to tap and ride.'
    ],
    category: 'Civic Issues',
    author: 'TJU Transport Bureau',
    publishedAt: '50 min ago',
    imageUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=80',
    isBreaking: false,
    isFeatured: false,
    readTime: '2 min read',
    location: 'Kukatpally, Hyderabad',
    locality: 'Kukatpally',
    views: 9400
  }
];

export const INITIAL_SHORTS: ShortVideo[] = [
  {
    id: 'short-1',
    headline: 'Hyderabad Metro Phase 2: Route Breakdown in 60 Seconds!',
    headlineTe: 'హైదరాబాద్ మెట్రో ఫేజ్ 2: 60 సెకన్లలో రూట్ మ్యాప్!',
    caption: 'Here is where the 5 new corridors will run across Hyderabad, Old City & Shamshabad airport! 🚇✨ #TJUNews #Hyderabad #Metro',
    category: 'Hyderabad',
    location: 'Hyderabad',
    likes: 4210,
    comments: 289,
    videoUrl: '/video1.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=80',
    duration: '0:58',
    relatedArticleId: 'hyd-metro-expansion-2026'
  },
  {
    id: 'short-2',
    headline: 'TSPSC Group-2 Syllabus & Exam Pattern Strategy for Beginners',
    headlineTe: 'టీఎస్‌పీఎస్సీ గ్రూప్-2 సిలబస్, పరీక్షా విధానం విశ్లేషణ',
    caption: 'Top 4 papers overview, marks distribution, and time allocation tips for 783 vacancies! 📚📝 #GovtJobs #TSPSC #TJUNews',
    category: 'Education & Jobs',
    location: 'Telangana',
    likes: 12400,
    comments: 870,
    videoUrl: '/video2.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    duration: '0:54',
    relatedArticleId: 'art-job-dsc-2026'
  },
  {
    id: 'short-3',
    headline: 'Behind the Scenes: Hyderabad Heritage Biryani Dum Preparation',
    headlineTe: 'హైదరాబాదీ దమ్ బిర్యానీ సంప్రదాయ వంట ప్రక్రియ',
    caption: '40 master chefs cook over charcoal fires at People’s Plaza Hussain Sagar! 🍲🔥 #HyderabadiFood #Telangana #TJUExplore',
    category: 'Entertainment',
    location: 'Necklace Road',
    likes: 8950,
    comments: 540,
    videoUrl: '/video3.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80',
    duration: '0:45',
    relatedArticleId: 'hyderabad-briyani-gi-tag-festival'
  },
  {
    id: 'short-4',
    headline: 'Warangal IT Hub Night Drone Visuals: Tech Boom in Tier-2 Hub',
    headlineTe: 'వరంగల్ ఐటీ హబ్ నైట్ డ్రోన్ వ్యూ: సరికొత్త సాఫ్ట్‌వేర్ సెంటర్',
    caption: 'State-of-the-art tech campus now home to top AI and engineering teams! 💻🇮🇳 #TelanganaTech #Warangal #TJUNews',
    category: 'Telangana',
    location: 'Warangal',
    likes: 3120,
    comments: 142,
    videoUrl: '/video1.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    duration: '0:38',
    relatedArticleId: 'telangana-it-growth-record'
  },
  {
    id: 'short-5',
    headline: 'India 300 GW Renewable Grid: Clean Energy Revolution in 45 Seconds',
    headlineTe: 'భారత్ 300 గిగావాట్ల గ్రీన్ ఎనర్జీ రికార్డు: 45 సెకన్లలో సమాచారం',
    caption: 'Massive solar & wind corridors across Rajasthan, Gujarat, and South India stabilize national power! ☀️⚡ #IndiaGreenEnergy #NationalNews',
    category: 'India',
    location: 'New Delhi',
    likes: 5410,
    comments: 319,
    videoUrl: '/video2.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80',
    duration: '0:45',
    relatedArticleId: 'india-clean-energy-summit'
  },
  {
    id: 'short-6',
    headline: 'Cyberabad Dynamic AI Traffic Signals: Gachibowli Junction Test Run',
    headlineTe: 'గచ్చిబౌలిలో స్మార్ట్ ఏఐ సిగ్నల్ వ్యవస్థ: ట్రాఫిక్ కదలికలు పరిశీలన',
    caption: 'Computer vision sensors reduce peak-hour congestion by 22% in Cyberabad corridor! 🚦🚗 #Cyberabad #HyderabadCivic #TJUNews',
    category: 'Civic Issues',
    location: 'Gachibowli, Hyderabad',
    likes: 7280,
    comments: 412,
    videoUrl: '/video3.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&auto=format&fit=crop&q=80',
    duration: '0:40',
    relatedArticleId: 'art-traffic-ai-2026'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-job-1',
    title: '🎓 GOVT JOB ALERT: TSPSC Group-2 (783 Posts)',
    body: 'Online registration begins 1 Nov. Minimum qualification: Any Degree. Tap to view syllabus.',
    type: 'job',
    time: '15m ago',
    read: false,
    targetId: 'tspsc-grp2-2026',
    targetType: 'job'
  },
  {
    id: 'notif-1',
    title: '🚨 BREAKING NEWS · 12:45 PM',
    body: 'Cabinet sanctions ₹24,200 Cr for Hyderabad Metro Phase 2 with 76 km lines linking Airport & Old City.',
    type: 'breaking',
    time: '35m ago',
    read: false,
    targetId: 'hyd-metro-expansion-2026',
    targetType: 'article'
  },
  {
    id: 'notif-weather',
    title: '🌧️ Weather Alert: Hyderabad City',
    body: 'Evening scattered showers expected in Cyberabad & Madhapur. Temp: 29°C.',
    type: 'location',
    time: '2h ago',
    read: false
  },
  {
    id: 'notif-quiz',
    title: '🧠 Today’s Telangana Current Affairs Quiz',
    body: '5 new questions uploaded for Group 2 & DSC aspirants. Test your knowledge now!',
    type: 'topic',
    time: '4h ago',
    read: true,
    targetType: 'quiz'
  },
  {
    id: 'notif-4',
    title: '📝 Citizen Desk Status',
    body: 'Your submitted report on "Madhapur 100ft road repairs" was approved and published by Senior Desk!',
    type: 'citizen',
    time: '6h ago',
    read: true,
    targetId: 'citizen-report-madhapur-drainage',
    targetType: 'article'
  }
];

export const INITIAL_CITIZEN_SUBMISSIONS: CitizenSubmission[] = [
  {
    id: 'SUB-2026-891',
    headline: 'Citizen Report: Community Alert On Drainage Repair Work At Madhapur 100ft Road',
    description: 'After torrential showers, rainwater stagnation occurred near Ayyappa Society. Civic maintenance vehicles arrived to unclog lines.',
    category: 'Civic & Infrastructure',
    location: {
      city: 'Hyderabad',
      district: 'Rangareddy',
      locality: 'Madhapur / Ayyappa Society'
    },
    incidentDateTime: '2026-10-24T06:30',
    mediaUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800&auto=format&fit=crop&q=80',
    sourceInfo: 'Eye-witness footage captured by local resident association members.',
    authorName: 'Ananya Sharma',
    authorPhone: '+91 98480 12345',
    submittedAt: '24 Oct 2026, 07:15 AM',
    status: 'approved',
    editorFeedback: 'Verified with GHMC zonal engineer. Story cleared for publication on TJU News Mobile and Web.'
  },
  {
    id: 'SUB-2026-892',
    headline: 'Kukatpally Y-Junction Traffic Signal Synchronization Needed During Peak Hours',
    description: 'Signal timing imbalance causing up to 25 minute vehicle queues from JNTU flyover toward Balanagar.',
    category: 'Traffic & Roads',
    location: {
      city: 'Hyderabad',
      district: 'Medchal-Malkajgiri',
      locality: 'Kukatpally Y-Junction'
    },
    incidentDateTime: '2026-10-24T09:15',
    mediaUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&auto=format&fit=crop&q=80',
    sourceInfo: 'Commuter dashcam recording and survey from 50 daily tech workers.',
    authorName: 'K. Rajesh Kumar',
    authorPhone: '+91 98491 54321',
    submittedAt: '24 Oct 2026, 10:45 AM',
    status: 'under_review',
    editorFeedback: 'Assigned to Cyberabad Traffic Beat reporter for official ACP comment.'
  },
  {
    id: 'SUB-2026-893',
    headline: 'Historic Stepwell Restoration Completed At Bansilalpet By Local Volunteers',
    description: 'Youth collective organized cleanup and heritage lighting exhibition celebrating historic water conservation architecture.',
    category: 'Culture & Heritage',
    location: {
      city: 'Secunderabad',
      district: 'Hyderabad',
      locality: 'Bansilalpet'
    },
    incidentDateTime: '2026-10-23T18:00',
    mediaUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&auto=format&fit=crop&q=80',
    sourceInfo: 'Restoration trust press briefing and photographic records.',
    authorName: 'Ananya Sharma',
    authorPhone: '+91 98480 12345',
    submittedAt: '23 Oct 2026, 08:30 PM',
    status: 'pending_review'
  }
];

export const TOPICS_LIST = [
  'Hyderabad Metro',
  'TSPSC Recruitment',
  'Mega DSC 2026',
  'Telangana IT',
  'GHMC Civic',
  'Charminar Old City',
  'Deccan Cuisine',
  'Renewable Energy',
  'Police SI Recruitment',
  'Hitec City Traffic'
];

export const LOCATIONS_LIST = [
  'Hyderabad',
  'Secunderabad',
  'Warangal',
  'Karimnagar',
  'Khammam',
  'Nizamabad',
  'Rangareddy',
  'Medchal',
  'Mahabubnagar',
  'Nalgonda'
];

export const HYD_LOCALITIES = [
  'All Localities',
  'Madhapur',
  'Banjara Hills',
  'Jubilee Hills',
  'Gachibowli',
  'Charminar / Old City',
  'Kukatpally',
  'Secunderabad',
  'Ameerpet',
  'Dilsukhnagar',
  'Kondapur',
  'Uppal'
];
