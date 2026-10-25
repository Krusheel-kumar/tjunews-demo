import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { Article } from '../types';
import {
  Zap,
  MapPin,
  Flame,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
  ExternalLink,
  Sparkles,
  Check,
  Smartphone,
  List,
  Search,
  Bell,
  Bot,
  Eye,
  Clock,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { HYD_LOCALITIES } from '../mockData';
import { TJNewsLogo } from './TJLogo';

export interface QuickNewsItem {
  id: string;
  title: string;
  titleTe?: string;
  summary: string;
  summaryTe?: string;
  takeaways: string[];
  takeawaysTe?: string[];
  mediaType: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string;
  duration?: string;
  category: string;
  location: string;
  locality?: string;
  distance?: string;
  isNearYou?: boolean;
  publishedAt: string;
  author: string;
  views: number;
  likes: number;
  articleId?: string;
}

export const INITIAL_QUICK_NEWS: QuickNewsItem[] = [
  {
    id: 'qn-1',
    title: 'Cyberabad Police Deploy Dynamic AI Traffic Signals at 18 High-Density Junctions',
    titleTe: 'గచ్చిబౌలి, మాదాపూర్‌లో 18 జంక్షన్ల వద్ద ఏఐ సిగ్నల్ వ్యవస్థ అమల్లోకి',
    summary:
      'Computer-vision signal controllers across Gachibowli and Madhapur analyze live vehicle queues in real-time, dynamically allocating green lights to reduce rush-hour commute delays by 22%.',
    summaryTe:
      'గచ్చిబౌలి, మాదాపూర్ పరిధిలోని 18 కీలక కూడళ్లలో ట్రాఫిక్ రద్దీని ఆటోమేటిక్ సెన్సార్లతో విశ్లేషించి సిగ్నల్ సమయాన్ని సర్దుబాటు చేసే నూతన ఏఐ వ్యవస్థను సైబరాబాద్ పోలీసులు ప్రారంభించారు.',
    takeaways: [
      'Adaptive camera sensors cut vehicle idling and commute delays by 22%.',
      'High-traffic corridors Madhapur 100ft road & Financial District prioritized.',
      'Emergency green wave automatically cleared for 108 ambulances.'
    ],
    takeawaysTe: [
      'ట్రాఫిక్ రద్దీని 22% తగ్గించేలా లైవ్ కెమెరా సెన్సార్లు సమయాన్ని కేటాయిస్తాయి.',
      'మాదాపూర్, గచ్చిబౌలి, ఫైనాన్షియల్ డిస్ట్రిక్ట్ మార్గాల్లో తొలుత అమలు.',
      'అంబులెన్సుల కోసం ఆటోమేటిక్ గ్రీన్ కారిడార్ అనుసంధానం.'
    ],
    mediaType: 'video',
    mediaUrl: '/video1.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=800&auto=format&fit=crop&q=80',
    duration: '0:45',
    category: 'Civic Issues',
    location: 'Madhapur & Gachibowli',
    locality: 'Madhapur',
    distance: '0.8 km away',
    isNearYou: true,
    publishedAt: '12 min ago',
    author: 'TJU Civic Desk',
    views: 14200,
    likes: 3120,
    articleId: 'art-traffic-ai-2026'
  },
  {
    id: 'qn-2',
    title: 'Cabinet Okays ₹24,200 Cr for Hyderabad Metro Phase-2 Across 5 Corridors',
    titleTe: 'హైదరాబాద్ మెట్రో ఫేజ్-2 కు ₹24,200 కోట్లకు రాష్ట్ర కేబినెట్ ఆమోదం',
    summary:
      'Telangana cabinet gave final sanction for 70 km extension connecting Old City Falaknuma, Shamshabad Airport expressway, and Kokapet Neopolis, aiming for completion by mid-2029.',
    summaryTe:
      'పాతబస్తీ ఫలక్‌నుమా, శంషాబాద్ విమానాశ్రయం ఎక్స్‌ప్రెస్‌వే, కోకాపేట్ నియోపోలిస్ మార్గాలతో 70 కి.మీ మెట్రో రెండో విడత పనులకు తెలంగాణ కేబినెట్ ఆమోదం తెలిపింది.',
    takeaways: [
      '70 km total length across 5 crucial corridors including Old City.',
      'Direct high-speed link from Nagole to Shamshabad Airport.',
      'Joint 50:50 venture between Telangana Government and Central Ministry.'
    ],
    takeawaysTe: [
      'పాతబస్తీ, శంషాబాద్ సహా 5 మార్గాల్లో మొత్తం 70 కి.మీ మెట్రో నిర్మాణం.',
      'నాగోల్ నుండి శంషాబాద్ విమానాశ్రయానికి నేరుగా హైస్పీడ్ కనెక్టివిటీ.',
      'కేంద్ర, రాష్ట్ర ప్రభుత్వాల ఉమ్మడి భాగస్వామ్యంతో నిధుల సమీకరణ.'
    ],
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=80',
    category: 'Hyderabad',
    location: 'Hyderabad, Telangana',
    locality: 'Charminar / Old City',
    distance: '3.5 km away',
    isNearYou: true,
    publishedAt: '25 min ago',
    author: 'K. S. Rao, Urban Affairs',
    views: 28400,
    likes: 5410,
    articleId: 'hyd-metro-expansion-2026'
  },
  {
    id: 'qn-3',
    title: 'TSPSC Group-2 & 11,062 Mega DSC Posts: 60-Day High Scoring Strategy',
    titleTe: 'టీఎస్‌పీఎస్సీ గ్రూప్-2 & 11,062 డీఎస్సీ పోస్టులకు 60 రోజుల ప్రిపరేషన్ ప్లాన్',
    summary:
      'Coaching experts outline subject-wise priority maps for General Studies, Telangana History, and School Assistant pedagogy. All 33 district test centers finalized for computer tests.',
    summaryTe:
      'గ్రూప్-2 (783 పోస్టులు), మెగా డీఎస్సీ (11,062 పోస్టులు) అభ్యర్థుల కోసం నిపుణుల సలహాలు విడుదలయ్యాయి. మహిళా అభ్యర్థులకు ప్రయాణ ఇబ్బందులు లేకుండా 33 జిల్లాల్లో పరీక్షా కేంద్రాలు సిద్ధమయ్యాయి.',
    takeaways: [
      'Dedicate 40% study time to Telangana Movement and State textbook syllabus.',
      'Online CBT mock tests organized across all 33 district headquarters.',
      'Daily 5-MCQ practice tests available directly within TJU App.'
    ],
    takeawaysTe: [
      'తెలంగాణ ఉద్యమ చరిత్ర, స్టేట్ సిలబస్ అంశాలపై 40% సమయం కేటాయించాలి.',
      'అభ్యర్థుల సౌలభ్యం కోసం అన్ని 33 జిల్లా కేంద్రాల్లో కంప్యూటర్ పరీక్షా కేంద్రాలు.',
      'టీజేయూ యాప్‌లో రోజూ 5-MCQ ఉచిత మాక్ టెస్ట్‌లు ప్రాక్టీస్ చేయవచ్చు.'
    ],
    mediaType: 'video',
    mediaUrl: '/video2.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    duration: '0:54',
    category: 'Education & Jobs',
    location: 'Telangana',
    publishedAt: '40 min ago',
    author: 'V. Raghunath, Education Bureau',
    views: 34100,
    likes: 8920,
    articleId: 'art-job-dsc-2026'
  },
  {
    id: 'qn-4',
    title: 'Telangana Heritage Food Carnival Kicks Off At Hussain Sagar: 40 Dum Kitchens',
    titleTe: 'హుస్సేన్ సాగర్ వద్ద ఘనంగా ప్రారంభమైన డెక్కన్ ఫుడ్ కార్నివాల్: 40 సంప్రదాయ కిచెన్లు',
    summary:
      'People’s Plaza along Tank Bund transformed into a foodie paradise featuring authentic wood-fire Hyderabadi dum biryani, Haleem preparations, and Deccan sweets drawing thousands.',
    summaryTe:
      'నెక్లెస్ రోడ్ పీపుల్స్ ప్లాజా వద్ద ఐదు రోజుల దక్కన్ ఫుడ్ కార్నివాల్ ప్రారంభమైంది. చారిత్రక వంటకాలు, సుగంధ ద్రవ్యాల దమ్ బిర్యానీలతో ఆహార ప్రియులను విశేషంగా ఆకట్టుకుంటోంది.',
    takeaways: [
      'Master chefs cook over traditional charcoal hearths using aged basmati.',
      'Cultural qawwali & Deccan folk performances every evening from 6:30 PM.',
      'Entry is free with dedicated family dining pavilion along shoreline.'
    ],
    takeawaysTe: [
      'సంప్రదాయ రాగి పాత్రల్లో కట్టెల పొయ్యిపై తయారయ్యే ఘుమఘుమలాడే దమ్ బిర్యానీ.',
      'ప్రతి సాయంత్రం 6:30 గంటల నుండి ప్రసిద్ధ కళాకారుల ఖవ్వాలీ సంగీత కచేరీలు.',
      'కుటుంబాలతో కలిసి వీక్షించేందుకు ఉచిత ప్రవేశం మరియు విశాలమైన డైనింగ్ జోన్.'
    ],
    mediaType: 'video',
    mediaUrl: '/video3.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80',
    duration: '0:45',
    category: 'Entertainment',
    location: 'Necklace Road / Tank Bund',
    locality: 'Necklace Road / Tank Bund',
    distance: '2.4 km away',
    isNearYou: true,
    publishedAt: '1 hr ago',
    author: 'Pooja Reddy, TJU Life',
    views: 19800,
    likes: 4760,
    articleId: 'hyderabad-briyani-gi-tag-festival'
  },
  {
    id: 'qn-5',
    title: 'Banjara Hills Road No. 12 Gets 3.2 km Smart Green Corridor & Solar Track',
    titleTe: 'బంజారాహిల్స్ రోడ్ నం. 12 లో సోలార్ సైకిల్ ట్రాక్, గ్రీన్ కారిడార్ ప్రారంభం',
    summary:
      'GHMC commissioned a landscaped pedestrian spine with solar-powered illumination, drinking water stations, and continuous surveillance connecting KBR Park trail.',
    summaryTe:
      'కేబీఆర్ పార్క్ పరిసరాల్లో ఉదయపు నడకకారుల కోసం సోలార్ విద్యుత్ దీపాలు, సురక్షిత వాకింగ్ పాత్‌లతో కూడిన 3.2 కి.మీ గ్రీన్ కారిడార్‌ను జీహెచ్‌ఎంసీ ప్రారంభించింది.',
    takeaways: [
      '3.2 km scenic pedestrian path equipped with native air-purifying trees.',
      'Solar canopy generates clean electricity for park lighting.',
      'Direct surveillance coverage connected to Banjara Hills police station.'
    ],
    takeawaysTe: [
      'కాలుష్యాన్ని నివారించే పచ్చదనంతో 3.2 కి.మీ మోడల్ వాకింగ్ ట్రాక్.',
      'సోలార్ రూఫ్‌టాప్ ద్వారా స్వయం సమృద్ధిగా విద్యుత్ సరఫరా.',
      'నడకకారుల భద్రత కోసం 24 గంటల సీసీటీవీ నిఘా వ్యవస్థ.'
    ],
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80',
    category: 'Civic Issues',
    location: 'Banjara Hills, Hyderabad',
    locality: 'Banjara Hills',
    distance: '1.9 km away',
    isNearYou: true,
    publishedAt: '2 hrs ago',
    author: 'TJU Civic Beat',
    views: 11200,
    likes: 2450,
    articleId: 'art-locality-banjara-hills'
  },
  {
    id: 'qn-6',
    title: 'Charminar Pedestrian Plaza Weekend Night Bazaar Guidelines Released',
    titleTe: 'చార్మినార్ పాదచారుల ప్లాజా నైట్ బజార్ మార్గదర్శకాలు విడుదల: రాత్రి 1 వరకు అనుమతి',
    summary:
      'Special heritage LED illumination, artisan bangle craft kiosks, and traditional food courts permitted around the historic monument from 7 PM to 1 AM on weekends.',
    summaryTe:
      'చారిత్రక చార్మినార్ పరిసరాల్లో వారాంతాల్లో రాత్రి 7 నుండి అర్ధరాత్రి 1 గంట వరకు హెరిటేజ్ నైట్ బజార్‌కు అనుమతిస్తూ మున్సిపల్ శాఖ ఆదేశాలు జారీ చేసింది.',
    takeaways: [
      'Artisan craft stalls and authentic street delicacies till 1 AM.',
      'Electric battery shuttle buggies provided for senior citizens.',
      'Special tourist police and GHMC sanitation teams deployed round the clock.'
    ],
    takeawaysTe: [
      'లాడ్ బజార్ చేతివృత్తులు, ప్రత్యేక స్నాక్స్ స్టాళ్లకు అర్ధరాత్రి 1 వరకు సమయం.',
      'వృద్ధుల కోసం మదీనా పార్కింగ్ నుండి ఉచిత బ్యాటరీ బగ్గీ సర్వీసులు.',
      'పర్యటకులకు తోడ్పాటుగా ప్రత్యేక పోలీస్ డెస్క్, శానిటేషన్ సిబ్బంది నియామకం.'
    ],
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1572455044327-7348c1be7267?w=800&auto=format&fit=crop&q=80',
    category: 'Hyderabad',
    location: 'Charminar / Old City',
    locality: 'Charminar / Old City',
    distance: '4.8 km away',
    isNearYou: true,
    publishedAt: '3 hrs ago',
    author: 'Mohammed Farooq, Old City Desk',
    views: 16900,
    likes: 3890,
    articleId: 'art-locality-charminar-night'
  },
  {
    id: 'qn-7',
    title: 'Warangal IT Hub Night Visuals: Tech Boom Welcomes 5,000 Software Engineers',
    titleTe: 'వరంగల్ ఐటీ హబ్ నైట్ డ్రోన్ వ్యూ: సరికొత్త సాఫ్ట్‌వేర్ సెంటర్‌లో 5000 మంది కొలువులు',
    summary:
      'Tier-2 IT revolution speeds ahead in Kakatiya Mega Tech Park as multinational tech campuses and startups scale global product engineering teams in Warangal.',
    summaryTe:
      'హైదరాబాద్‌కు దీటుగా వరంగల్ కాకతీయ ఐటీ పార్క్ విస్తరిస్తోంది. అగ్రశ్రేణి సాఫ్ట్‌వేర్ సంస్థలు విస్తరిస్తూ 5000 మంది స్థానిక ఇంజనీరింగ్ గ్రాడ్యుయేట్లకు ఉపాధి కల్పిస్తున్నాయి.',
    takeaways: [
      'Over 20 tech startups and MNC offshore development centers live.',
      'Reduces urban congestion by retaining local talent in Tier-2 districts.',
      'Dedicated high-speed connectivity to Outer Ring Road and Kazipet junction.'
    ],
    takeawaysTe: [
      '20కి పైగా ప్రముఖ ఐటీ కంపెనీల క్యాంపస్‌లు పూర్తి స్థాయిలో ప్రారంభం.',
      'స్థానిక యువతకు సొంత జిల్లాలోనే అత్యుత్తమ ప్యాకేజీలతో ఉద్యోగావకాశాలు.',
      'వరంగల్-హైదరాబాద్ జాతీయ రహదారికి అనుసంధానంగా విస్తరణ.'
    ],
    mediaType: 'video',
    mediaUrl: '/video1.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    duration: '0:38',
    category: 'Telangana',
    location: 'Warangal, Telangana',
    publishedAt: '4 hrs ago',
    author: 'TJU Technology Desk',
    views: 21500,
    likes: 5620,
    articleId: 'telangana-it-growth-record'
  },
  {
    id: 'qn-8',
    title: 'Kukatpally Y-Junction Rolls Out 20 Electric Metro Feeder Minibuses',
    titleTe: 'కూకట్‌పల్లి వై-జంక్షన్ వద్ద 20 ఎలక్ట్రిక్ మెట్రో ఫీడర్ బస్సులు ప్రారంభం',
    summary:
      'TSRTC launched eco-friendly last-mile AC minibuses running every 7 minutes, directly connecting KPHB colonies, JNTU, and Forum Mall with Kukatpally Metro Station.',
    summaryTe:
      'కేపీహఎచ్‌బీ కాలనీలు, జేఎన్‌టీయూ, ఫోరమ్ మాల్ పరిసర నివాసితుల కోసం మెట్రో స్టేషన్లను కలుపుతూ ప్రతి 7 నిమిషాలకు నడిచే 20 ఎలక్ట్రిక్ ఏసీ ఫీడర్ బస్సులను ఆర్టీసీ ప్రారంభించింది.',
    takeaways: [
      'Seamless flat ₹10/₹15 fare integrated with Metro smart card tap.',
      'Runs every 7 minutes during morning and evening office hours.',
      'Zero noise and tailpipe pollution helping GHMC clean air drive.'
    ],
    takeawaysTe: [
      'మెట్రో స్మార్ట్ కార్డ్‌తో సులభంగా ప్రయాణించేలా తక్కువ చార్జీల విధానం.',
      'పీక్ అవర్లలో ప్రతి 7 నిమిషాలకు ఒక సర్వీస్ అందుబాటులో ఉంటుంది.',
      'శబ్ద, వాయు కాలుష్యం లేని పరిశుభ్రమైన విద్యుత్ రవాణా సేవలు.'
    ],
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=80',
    category: 'Civic Issues',
    location: 'Kukatpally, Hyderabad',
    locality: 'Kukatpally',
    distance: '3.1 km away',
    isNearYou: true,
    publishedAt: '5 hrs ago',
    author: 'TJU Transport Bureau',
    views: 14300,
    likes: 3180,
    articleId: 'art-locality-kukatpally-feeder'
  },
  {
    id: 'qn-9',
    title: 'Cyberabad Police Deploy Thermal Night Patrol Drones Across Hitec City',
    titleTe: 'సైబరాబాద్ ఐటీ కారిడార్‌లో రాత్రిపూట థర్మల్ డ్రోన్ల నిఘా ప్రారంభం',
    summary:
      'Equipped with 4K infrared cameras and emergency sirens, automated police drones survey dark roads and isolated stretches near Gachibowli flyovers to protect night-shift employees.',
    summaryTe:
      'రాత్రి సమయాల్లో పని చేసే ఐటీ ఉద్యోగులు, మహిళల రక్షణ కోసం సైబరాబాద్ పోలీస్ విభాగం అత్యాధునిక థర్మల్ ఇన్‌ఫ్రారెడ్ డ్రోన్లతో ఆకాశ మార్గంలో నిఘా పెంచింది.',
    takeaways: [
      'Direct live feed broadcast to 100 Command & Control Centre.',
      'Automatic alerts triggered if suspicious crowd or vehicle halts in dark spots.',
      'Immediate patrol car dispatch within 3 minutes of drone detection.'
    ],
    takeawaysTe: [
      'కమాండ్ కంట్రోల్ సెంటర్‌కు నేరుగా హై-డెఫినిషన్ లైవ్ వీడియో ఫీడ్ అనుసంధానం.',
      'చీకటి ప్రదేశాల్లో అనుమానాస్పద కదలికలను గుర్తించగానే ఆటోమేటిక్ అలర్ట్.',
      'సమాచారం అందిన 3 నిమిషాల్లోనే సంఘటనా స్థలానికి చేరుకునే పెట్రోలింగ్ వాహనాలు.'
    ],
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800&auto=format&fit=crop&q=80',
    category: 'Civic Issues',
    location: 'Hitec City & Gachibowli',
    locality: 'Hitec City',
    distance: '1.4 km away',
    isNearYou: true,
    publishedAt: '6 hrs ago',
    author: 'TJU Crime Beat',
    views: 18900,
    likes: 4230
  },
  {
    id: 'qn-10',
    title: 'India 300 GW Clean Green Grid Record: Renewable Power Revolution in 45 Seconds',
    titleTe: 'భారత్ 300 గిగావాట్ల గ్రీన్ ఎనర్జీ రికార్డు: 45 సెకన్లలో సరికొత్త విజయం',
    summary:
      'National renewable generation crossed 300 GW landmark as mega solar parks in Rajasthan and wind corridors across South India supply 44% of total afternoon electricity demand.',
    summaryTe:
      'దేశవ్యాప్తంగా సౌర, పవన విద్యుత్ ఉత్పత్తి 300 గిగావాట్ల మైలురాయిని అధిగమించింది. దక్షిణ భారతదేశంలో గ్రీన్ ఎనర్జీ గ్రిడ్ స్థిరత్వంతో పరిశ్రమలకు నిరంతర విద్యుత్ అందుతోంది.',
    takeaways: [
      'Solar & wind power met 44% of national afternoon peak electricity needs.',
      'Telangana and South India hydro pumped storage stabilizes grid balance.',
      'Over ₹1.2 Lakh Crore fresh clean tech projects sanctioned for 2026-27.'
    ],
    takeawaysTe: [
      'పగటిపూట గరిష్ట డిమాండ్‌లో 44% కాలుష్య రహిత విద్యుత్‌తోనే భర్తీ.',
      'దక్షిణ భారతదేశంలో బ్యాటరీ, హైడ్రో స్టోరేజ్‌తో నిరంతర గ్రిడ్ భద్రత.',
      'మరో ₹1.2 లక్షల కోట్ల పెట్టుబడులతో నూతన సౌర ప్రాజెక్టుల విస్తరణ.'
    ],
    mediaType: 'video',
    mediaUrl: '/video2.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop&q=80',
    duration: '0:45',
    category: 'India',
    location: 'National / Telangana',
    publishedAt: '8 hrs ago',
    author: 'National Energy Bureau',
    views: 26500,
    likes: 6780
  }
];

interface QuickNewsScreenProps {
  articles?: Article[];
  language: 'English' | 'Telugu';
  onToggleLanguage?: () => void;
  onSelectArticle: (article: Article) => void;
  onOpenEducationJobs?: () => void;
  onShare: (title: string) => void;
  onOpenSearch?: () => void;
  onOpenNotifications?: () => void;
  onOpenAIAssistant?: () => void;
  unreadCount?: number;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All News', labelTe: 'అన్నీ' },
  { id: 'near_you', label: '📍 Near You', labelTe: '📍 దగ్గరలో' },
  { id: 'hyderabad', label: 'Hyderabad', labelTe: 'హైదరాబాద్' },
  { id: 'telangana', label: 'Telangana', labelTe: 'తెలంగాణ' },
  { id: 'video', label: '⚡ Video News', labelTe: '⚡ వీడియోలు' },
  { id: 'jobs', label: 'Jobs & Edu', labelTe: 'ఉద్యోగాలు' }
];

export const QuickNewsScreen: React.FC<QuickNewsScreenProps> = ({
  articles = [],
  language,
  onToggleLanguage,
  onSelectArticle,
  onOpenEducationJobs,
  onShare,
  onOpenSearch,
  onOpenNotifications,
  onOpenAIAssistant,
  unreadCount = 0
}) => {
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedLocality, setSelectedLocality] = useState('All');
  const [viewMode, setViewMode] = useState<'card' | 'stream'>('card'); // 'card' = Way2News swipe, 'stream' = dense list
  const [currentIndex, setCurrentIndex] = useState(0);

  // Per-card expanded state for 3-bullet AI Takeaways
  const [expandedTakeaways, setExpandedTakeaways] = useState<Record<string, boolean>>({});
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    INITIAL_QUICK_NEWS.forEach((item) => {
      map[item.id] = item.likes;
    });
    return map;
  });

  // Audio Text-to-Speech State
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);

  // Video Playing / Mute State
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // Physics-based Swipe & Drag Tracking
  const [touchDeltaY, setTouchDeltaY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const isMouseDown = useRef(false);
  const wheelLockRef = useRef(false);

  // Filter items
  const filteredItems = INITIAL_QUICK_NEWS.filter((item) => {
    if (selectedTab === 'near_you') {
      const matchLoc =
        selectedLocality === 'All' ||
        (item.locality && item.locality.toLowerCase().includes(selectedLocality.toLowerCase()));
      return item.isNearYou && matchLoc;
    }
    if (selectedTab === 'hyderabad') {
      const matchLoc =
        selectedLocality === 'All' ||
        (item.locality && item.locality.toLowerCase().includes(selectedLocality.toLowerCase()));
      return (item.category === 'Hyderabad' || item.location.includes('Hyderabad')) && matchLoc;
    }
    if (selectedTab === 'telangana') {
      return item.category === 'Telangana' || item.location.includes('Telangana');
    }
    if (selectedTab === 'video') {
      return item.mediaType === 'video';
    }
    if (selectedTab === 'jobs') {
      return item.category === 'Education & Jobs';
    }
    return true;
  });

  // Navigation handlers
  const goToNext = useCallback(() => {
    if (currentIndex < filteredItems.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTouchDeltaY(0);
    }
  }, [currentIndex, filteredItems.length]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setTouchDeltaY(0);
    }
  }, [currentIndex]);

  // Keep index valid when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setTouchDeltaY(0);
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(null);
  }, [selectedTab, selectedLocality]);

  // Handle current video playback in card mode
  useEffect(() => {
    if (viewMode === 'card' && filteredItems[currentIndex]) {
      const currentItem = filteredItems[currentIndex];
      if (currentItem.mediaType === 'video') {
        setPlayingVideoId(currentItem.id);
        const vid = videoRefs.current[currentItem.id];
        if (vid) {
          vid.currentTime = 0;
          vid.muted = isMuted;
          vid.play().catch(() => {});
        }
      } else {
        setPlayingVideoId(null);
      }
    } else {
      Object.values(videoRefs.current).forEach((v) => v?.pause());
    }
  }, [currentIndex, viewMode, filteredItems, isMuted]);

  // Mouse Wheel Navigation
  const handleWheel = (e: React.WheelEvent) => {
    if (viewMode !== 'card') return;
    if (wheelLockRef.current) return;
    if (Math.abs(e.deltaY) < 20) return;

    if (e.deltaY > 0 && currentIndex < filteredItems.length - 1) {
      wheelLockRef.current = true;
      goToNext();
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 420);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      wheelLockRef.current = true;
      goToPrev();
      setTimeout(() => {
        wheelLockRef.current = false;
      }, 420);
    }
  };

  // Touch Swipe Handlers (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (viewMode !== 'card') return;
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
    setTouchDeltaY(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (viewMode !== 'card' || touchStartY.current === null) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;

    // Resistance at ends
    if ((currentIndex === 0 && diff > 0) || (currentIndex === filteredItems.length - 1 && diff < 0)) {
      setTouchDeltaY(diff * 0.25);
    } else {
      setTouchDeltaY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (viewMode !== 'card' || !isDragging) return;
    setIsDragging(false);

    if (touchDeltaY < -40 && currentIndex < filteredItems.length - 1) {
      goToNext();
    } else if (touchDeltaY > 40 && currentIndex > 0) {
      goToPrev();
    }
    setTouchDeltaY(0);
    touchStartY.current = null;
  };

  // Mouse Drag Handlers (Desktop Testing)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewMode !== 'card') return;
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest('button, a, video, input, ul')) return;

    isMouseDown.current = true;
    touchStartY.current = e.clientY;
    setIsDragging(true);
    setTouchDeltaY(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (viewMode !== 'card' || !isMouseDown.current || touchStartY.current === null) return;
    const diff = e.clientY - touchStartY.current;

    if ((currentIndex === 0 && diff > 0) || (currentIndex === filteredItems.length - 1 && diff < 0)) {
      setTouchDeltaY(diff * 0.25);
    } else {
      setTouchDeltaY(diff);
    }
  };

  const handleMouseUp = () => {
    if (viewMode !== 'card' || !isMouseDown.current) return;
    isMouseDown.current = false;
    handleTouchEnd();
  };

  // Keyboard Navigation (Arrow Keys / PageUp / PageDown)
  useEffect(() => {
    if (viewMode !== 'card') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, goToNext, goToPrev]);

  // Text-To-Speech Listen Handler
  const handleToggleSpeak = (item: QuickNewsItem) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking === item.id) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();
    const textToRead =
      language === 'Telugu' && item.summaryTe
        ? `${item.titleTe || item.title}. ${item.summaryTe}`
        : `${item.title}. ${item.summary}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    const voices = window.speechSynthesis.getVoices();

    if (language === 'Telugu') {
      const teluguVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes('te-in') ||
          v.lang.toLowerCase().includes('te_in') ||
          v.lang.toLowerCase().startsWith('te') ||
          v.name.toLowerCase().includes('telugu')
      );
      if (teluguVoice) {
        utterance.voice = teluguVoice;
        utterance.lang = teluguVoice.lang;
      } else {
        utterance.lang = 'te-IN';
      }
      utterance.pitch = 0.95;
    } else {
      // Indian English Male Voice (e.g. Ravi, Prabhat, Google English India)
      const indianMale = voices.find(
        (v) =>
          (v.lang.toLowerCase().includes('en-in') ||
            v.lang.toLowerCase().includes('en_in') ||
            v.name.toLowerCase().includes('india')) &&
          (v.name.toLowerCase().includes('ravi') ||
            v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('prabhat') ||
            (!v.name.toLowerCase().includes('heera') && !v.name.toLowerCase().includes('female')))
      );
      const anyIndian = voices.find(
        (v) =>
          v.lang.toLowerCase().includes('en-in') ||
          v.lang.toLowerCase().includes('en_in') ||
          v.name.toLowerCase().includes('india')
      );

      if (indianMale) {
        utterance.voice = indianMale;
        utterance.lang = indianMale.lang;
      } else if (anyIndian) {
        utterance.voice = anyIndian;
        utterance.lang = anyIndian.lang;
      } else {
        utterance.lang = 'en-IN';
      }
      utterance.pitch = 0.90; // authoritative Indian male broadcaster pitch
    }

    utterance.rate = 1.05;
    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);

    setIsSpeaking(item.id);
    window.speechSynthesis.speak(utterance);
  };

  // Toggle Like
  const handleToggleLike = (id: string) => {
    const isLiked = likedItems[id];
    setLikedItems({ ...likedItems, [id]: !isLiked });
    setLikeCounts({
      ...likeCounts,
      [id]: (likeCounts[id] || 0) + (isLiked ? -1 : 1)
    });
  };

  // Toggle Bookmark
  const handleToggleBookmark = (id: string) => {
    setSavedItems({ ...savedItems, [id]: !savedItems[id] });
  };

  // WhatsApp One-Tap Share
  const handleWhatsAppShare = (item: QuickNewsItem) => {
    const headline = language === 'Telugu' && item.titleTe ? item.titleTe : item.title;
    const body = language === 'Telugu' && item.summaryTe ? item.summaryTe : item.summary;
    const shareText = `*${headline}*\n\n${body}\n\n📍 ${item.location} • Verified on TJU News\nhttps://tjunews.com/quick/${item.id}`;

    onShare(headline);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div
      className="bg-[#0B0F19] text-gray-900 w-full h-full flex-1 flex flex-col overflow-hidden select-none"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* ================= HEADER / MASTHEAD ================= */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-gray-150 px-3.5 py-2 z-40 flex items-center justify-between shadow-2xs flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#C9252D] to-[#FF4D57] flex items-center justify-center text-white shadow-sm shadow-red-500/20">
            <Zap size={18} className="fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-serif font-black text-sm sm:text-base text-gray-900 tracking-tight leading-none">
                {language === 'Telugu' ? 'త్వరిత వార్తలు' : 'Quick News'}
              </h1>
              <span className="bg-red-50 text-[#C9252D] text-[9.5px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider border border-red-200">
                60s
              </span>
            </div>
            <p className="text-[9.5px] text-gray-500 font-medium">
              {language === 'Telugu' ? 'స్మార్ట్ ఫ్లిప్ వార్తలు • క్షణాల్లో సమాచారం' : 'Way2News Style • Flip & Audio'}
            </p>
          </div>
        </div>

        {/* Header Actions: Language Switch & Mode Toggle */}
        <div className="flex items-center gap-1.5">
          {onToggleLanguage && (
            <button
              onClick={onToggleLanguage}
              className="px-2 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[10.5px] border border-gray-200 transition-colors cursor-pointer"
            >
              {language === 'English' ? 'తెలుగు' : 'English'}
            </button>
          )}

          {/* Mode Toggle: Card Swipe vs Quick Stream */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-xl border border-gray-200 text-xs">
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg font-bold text-[10.5px] transition-all cursor-pointer ${
                viewMode === 'card'
                  ? 'bg-white text-[#C9252D] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Card Flip Mode"
            >
              <Smartphone size={12} />
              <span>Flip</span>
            </button>
            <button
              onClick={() => setViewMode('stream')}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg font-bold text-[10.5px] transition-all cursor-pointer ${
                viewMode === 'stream'
                  ? 'bg-white text-[#C9252D] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Stream Mode"
            >
              <List size={12} />
              <span>Stream</span>
            </button>
          </div>
        </div>
      </header>

      {/* ================= CATEGORY FILTER PILLS ================= */}
      <div className="bg-white border-b border-gray-150 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto scrollbar-none z-30 flex-shrink-0">
        {CATEGORY_TABS.map((tab) => {
          const isActive = selectedTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1 ${
                isActive
                  ? 'bg-[#C9252D] text-white shadow-sm shadow-red-900/20'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200/80 border border-gray-200/60'
              }`}
            >
              <span>{language === 'Telugu' ? tab.labelTe : tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= LOCALITY SUB-BAR (Near You & Hyderabad) ================= */}
      {(selectedTab === 'near_you' || selectedTab === 'hyderabad') && (
        <div className="bg-[#FFF5F5] border-b border-red-100 px-3 py-1 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[10.5px] flex-shrink-0">
          <span className="text-[#C9252D] font-bold flex items-center gap-1 flex-shrink-0">
            <MapPin size={10} />
            <span>{language === 'Telugu' ? 'ప్రాంతం:' : 'Area:'}</span>
          </span>
          <button
            onClick={() => setSelectedLocality('All')}
            className={`px-2 py-0.5 rounded-md font-bold whitespace-nowrap cursor-pointer transition-colors ${
              selectedLocality === 'All'
                ? 'bg-[#C9252D] text-white'
                : 'bg-white text-gray-700 hover:bg-red-50 border border-red-100'
            }`}
          >
            All Localities
          </button>
          {HYD_LOCALITIES.slice(0, 7).map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocality(loc)}
              className={`px-2 py-0.5 rounded-md font-bold whitespace-nowrap cursor-pointer transition-colors ${
                selectedLocality === loc
                  ? 'bg-[#C9252D] text-white'
                  : 'bg-white text-gray-700 hover:bg-red-50 border border-red-100'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      )}

      {/* ================= MAIN CONTENT VIEWPORT ================= */}
      {filteredItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400">
          <MapPin size={36} className="text-gray-500 mb-2" />
          <h3 className="font-bold text-white text-base">No Quick News in this area</h3>
          <p className="text-xs text-gray-400 mt-1 max-w-xs">
            Try switching to 'All News' to view recent headlines across Telangana.
          </p>
          <button
            onClick={() => {
              setSelectedTab('all');
              setSelectedLocality('All');
            }}
            className="mt-3 bg-[#C9252D] text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
          >
            View All News
          </button>
        </div>
      ) : viewMode === 'card' ? (
        /* ================= WAY2NEWS STYLE: CARD SWIPE / FLIP MODE ================= */
        <div className="flex-1 relative flex flex-col justify-between overflow-hidden bg-[#0A0D14]">
          {/* Card Counter & Listen Top Bar */}
          <div className="bg-[#141A29] px-3.5 py-1.5 flex items-center justify-between text-[11px] font-bold text-gray-300 border-b border-gray-800/80 z-20 flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C9252D] animate-pulse" />
              <span className="text-white font-mono">
                {currentIndex + 1} / {filteredItems.length}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-red-300 truncate max-w-[170px]">
                {filteredItems[currentIndex]?.category}
              </span>
            </div>

            {/* Read / Listen pill */}
            <button
              onClick={() => handleToggleSpeak(filteredItems[currentIndex])}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wide border cursor-pointer transition-all ${
                isSpeaking === filteredItems[currentIndex]?.id
                  ? 'bg-red-600 text-white border-red-500 animate-pulse'
                  : 'bg-white/10 text-gray-200 border-white/15 hover:bg-white/20'
              }`}
            >
              {isSpeaking === filteredItems[currentIndex]?.id ? (
                <>
                  <VolumeX size={11} />
                  <span>Speaking...</span>
                </>
              ) : (
                <>
                  <Volume2 size={11} />
                  <span>Listen 🔊</span>
                </>
              )}
            </button>
          </div>

          {/* ================= VERTICAL SLIDING CARDS CONTAINER ================= */}
          <div className="flex-1 relative overflow-hidden w-full max-w-[420px] mx-auto">
            <div
              className="w-full h-full"
              style={{
                transform: `translateY(calc(-${currentIndex * 100}% + ${touchDeltaY}px))`,
                transition: isDragging
                  ? 'none'
                  : 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {filteredItems.map((item, idx) => {
                const isLiked = likedItems[item.id];
                const isSaved = savedItems[item.id];
                const isExpanded = expandedTakeaways[item.id];

                return (
                  <div
                    key={item.id}
                    className="w-full h-full flex flex-col justify-between p-2.5 sm:p-3 relative flex-shrink-0"
                  >
                    {/* White Card Frame */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-150 overflow-hidden flex flex-col flex-1 justify-between relative">
                      {/* Media Header (Photo / Video) */}
                      <div className="relative aspect-16/10 sm:h-52 bg-black overflow-hidden flex-shrink-0 group">
                        {item.mediaType === 'video' ? (
                          <div className="relative w-full h-full">
                            <video
                              ref={(el) => {
                                videoRefs.current[item.id] = el;
                              }}
                              src={item.mediaUrl}
                              poster={item.thumbnailUrl}
                              className="w-full h-full object-cover"
                              playsInline
                              loop
                              muted={isMuted}
                            />

                            {/* Center Play/Pause button */}
                            <button
                              onClick={() => {
                                const vid = videoRefs.current[item.id];
                                if (!vid) return;
                                if (vid.paused) {
                                  vid.play();
                                  setPlayingVideoId(item.id);
                                } else {
                                  vid.pause();
                                  setPlayingVideoId(null);
                                }
                              }}
                              className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/40 transition-colors cursor-pointer"
                            >
                              <div className="w-11 h-11 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg">
                                {playingVideoId === item.id ? (
                                  <Pause size={18} className="fill-white" />
                                ) : (
                                  <Play size={18} className="fill-white ml-0.5" />
                                )}
                              </div>
                            </button>

                            {/* Mute/Unmute */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsMuted(!isMuted);
                              }}
                              className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center z-20 hover:bg-black/80 cursor-pointer"
                            >
                              {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                            </button>
                          </div>
                        ) : (
                          <img
                            src={item.mediaUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            loading={idx === 0 ? 'eager' : 'lazy'}
                          />
                        )}

                        {/* Top Gradient & Badges */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none">
                          <div className="flex items-center gap-1">
                            <span className="bg-[#C9252D] text-white font-black text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-0.5">
                              <Flame size={9} className="fill-white" />
                              <span>{item.category}</span>
                            </span>
                            {item.distance && (
                              <span className="bg-black/60 backdrop-blur-md text-white font-bold text-[8.5px] px-2 py-0.5 rounded-full border border-white/20">
                                {item.distance}
                              </span>
                            )}
                          </div>

                          <span className="bg-emerald-600/90 backdrop-blur-md text-white font-bold text-[8.5px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                            <Check size={10} className="stroke-[3]" />
                            <span>Verified</span>
                          </span>
                        </div>

                        {/* Bottom Media Bar */}
                        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10 pointer-events-none text-[9.5px] text-gray-200">
                          <div className="flex items-center gap-1 text-red-200 font-semibold drop-shadow-xs">
                            <MapPin size={10} className="text-red-400" />
                            <span>{item.location}</span>
                          </div>
                          <span className="font-mono text-[9px] bg-black/50 px-1.5 py-0.5 rounded-md backdrop-blur-xs">
                            {item.publishedAt}
                          </span>
                        </div>
                      </div>

                      {/* Card Content Body */}
                      <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between overflow-y-auto scrollbar-none">
                        <div>
                          {/* Headline */}
                          <h2 className="font-serif font-black text-xs sm:text-sm text-gray-900 leading-snug tracking-tight mb-1.5">
                            {language === 'Telugu' && item.titleTe ? item.titleTe : item.title}
                          </h2>

                          {/* 60-word Summary */}
                          <p className="text-[11px] sm:text-xs text-gray-700 leading-relaxed font-sans mb-2 font-normal line-clamp-4">
                            {language === 'Telugu' && item.summaryTe ? item.summaryTe : item.summary}
                          </p>

                          {/* ⚡ 3-Bullet AI Takeaways Dropdown */}
                          <div className="bg-[#F8FAFC] border border-blue-100 rounded-xl p-2">
                            <button
                              onClick={() =>
                                setExpandedTakeaways({
                                  ...expandedTakeaways,
                                  [item.id]: !isExpanded
                                })
                              }
                              className="w-full flex items-center justify-between text-left cursor-pointer group"
                            >
                              <div className="flex items-center gap-1 text-[10.5px] font-black text-blue-900">
                                <Sparkles size={11} className="text-amber-500 fill-amber-400" />
                                <span>
                                  {language === 'Telugu' ? '⚡ 3-సెకన్ల ముఖ్యాంశాలు' : '⚡ 3-Second Key Points'}
                                </span>
                              </div>
                              <span className="text-[9.5px] text-blue-600 font-bold group-hover:underline">
                                {isExpanded ? 'Hide ▲' : 'Show ▼'}
                              </span>
                            </button>

                            {isExpanded && (
                              <ul className="mt-1.5 space-y-1 text-[10px] text-gray-800 border-t border-blue-100 pt-1.5 animate-fadeIn">
                                {(language === 'Telugu' && item.takeawaysTe
                                  ? item.takeawaysTe
                                  : item.takeaways
                                ).map((pt, pIdx) => (
                                  <li key={pIdx} className="flex items-start gap-1 leading-tight">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] mt-1 flex-shrink-0" />
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>

                        {/* Byline */}
                        <div className="pt-2 mt-1 border-t border-gray-150 flex items-center justify-between text-[9.5px] text-gray-500">
                          <span className="truncate max-w-[160px] font-semibold text-gray-700">
                            By {item.author}
                          </span>
                          <div className="flex items-center gap-1 text-gray-400 font-mono">
                            <Eye size={10} />
                            <span>{item.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Bar */}
                      <div className="bg-[#F8F9FA] px-3 py-2 border-t border-gray-150 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {/* Like */}
                          <button
                            onClick={() => handleToggleLike(item.id)}
                            className={`flex items-center gap-1 px-2 py-1 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                              isLiked
                                ? 'bg-red-50 text-[#C9252D] border-red-200'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                            }`}
                          >
                            <Flame size={12} className={isLiked ? 'fill-[#C9252D] text-[#C9252D]' : 'text-gray-500'} />
                            <span className="text-[11px]">{likeCounts[item.id] || item.likes}</span>
                          </button>

                          {/* Save */}
                          <button
                            onClick={() => handleToggleBookmark(item.id)}
                            className={`p-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                              isSaved
                                ? 'bg-red-50 text-[#C9252D] border-red-200'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
                            }`}
                            title="Bookmark"
                          >
                            <Bookmark size={13} className={isSaved ? 'fill-[#C9252D]' : ''} />
                          </button>

                          {/* WhatsApp One-Tap Share */}
                          <button
                            onClick={() => handleWhatsAppShare(item)}
                            className="flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-xl text-[11px] font-black transition-colors cursor-pointer shadow-2xs active:scale-95"
                          >
                            <Share2 size={12} className="text-emerald-700" />
                            <span>Share</span>
                          </button>
                        </div>

                        {item.articleId ? (
                          <button
                            onClick={() => {
                              const matched = articles.find((a) => a.id === item.articleId);
                              if (matched) onSelectArticle(matched);
                            }}
                            className="flex items-center gap-0.5 text-[#C9252D] hover:text-red-700 font-black text-[11px] cursor-pointer group active:scale-95"
                          >
                            <span>Full Story</span>
                            <ExternalLink size={11} className="group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        ) : (
                          <span className="text-[9.5px] text-gray-400 font-mono">60s Brief</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Swipe Guidance & Arrow Helpers */}
          <div className="bg-[#0E131F] border-t border-gray-800/80 px-3 py-1.5 flex items-center justify-between text-xs z-20 flex-shrink-0">
            <button
              onClick={goToPrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                currentIndex === 0
                  ? 'opacity-30 text-gray-600 border-gray-800 cursor-not-allowed'
                  : 'text-gray-200 bg-white/10 hover:bg-white/20 border-white/20 active:scale-95'
              }`}
            >
              <ChevronUp size={13} />
              <span>Previous</span>
            </button>

            <span className="text-[10px] font-semibold text-gray-400">
              Swipe or Wheel to Flip ↕
            </span>

            <button
              onClick={goToNext}
              disabled={currentIndex === filteredItems.length - 1}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
                currentIndex === filteredItems.length - 1
                  ? 'opacity-30 text-gray-600 border-gray-800 cursor-not-allowed'
                  : 'text-white bg-[#C9252D] hover:bg-red-700 border-red-500 shadow-md active:scale-95'
              }`}
            >
              <span>Next</span>
              <ChevronDown size={13} />
            </button>
          </div>
        </div>
      ) : (
        /* ================= QUICK STREAM: CONTINUOUS SCROLLING FEED MODE ================= */
        <div className="flex-1 overflow-y-auto p-3 space-y-3 max-w-[440px] mx-auto w-full scrollbar-none">
          {filteredItems.map((item) => {
            const isLiked = likedItems[item.id];
            const isSaved = savedItems[item.id];
            const isExpanded = expandedTakeaways[item.id];

            return (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between"
              >
                {/* Media */}
                <div className="relative aspect-16/10 bg-black overflow-hidden">
                  {item.mediaType === 'video' ? (
                    <div className="relative w-full h-full">
                      <video
                        ref={(el) => {
                          videoRefs.current[item.id] = el;
                        }}
                        src={item.mediaUrl}
                        poster={item.thumbnailUrl}
                        className="w-full h-full object-cover"
                        playsInline
                        loop
                        muted={isMuted}
                      />
                      <button
                        onClick={() => {
                          const vid = videoRefs.current[item.id];
                          if (!vid) return;
                          if (vid.paused) {
                            vid.play();
                            setPlayingVideoId(item.id);
                          } else {
                            vid.pause();
                            setPlayingVideoId(null);
                          }
                        }}
                        className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/40 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white">
                          {playingVideoId === item.id ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                        </div>
                      </button>
                    </div>
                  ) : (
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />

                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                    <span className="bg-[#C9252D] text-white font-black text-[9px] px-2 py-0.5 rounded-full uppercase">
                      {item.category}
                    </span>
                    <span className="bg-emerald-600/90 text-white font-bold text-[8.5px] px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check size={10} className="stroke-[3]" />
                      <span>Verified</span>
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] text-gray-200">
                    <span className="flex items-center gap-1 font-semibold text-red-200">
                      <MapPin size={10} className="text-red-400" />
                      <span>{item.location}</span>
                    </span>
                    <span className="font-mono text-[9px]">{item.publishedAt}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="font-serif font-black text-xs sm:text-sm text-gray-900 leading-snug mb-1.5">
                    {language === 'Telugu' && item.titleTe ? item.titleTe : item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-700 leading-normal font-sans mb-2">
                    {language === 'Telugu' && item.summaryTe ? item.summaryTe : item.summary}
                  </p>

                  <div className="bg-[#F8FAFC] border border-blue-100 rounded-xl p-2">
                    <button
                      onClick={() =>
                        setExpandedTakeaways({
                          ...expandedTakeaways,
                          [item.id]: !isExpanded
                        })
                      }
                      className="w-full flex items-center justify-between text-left cursor-pointer"
                    >
                      <span className="text-[10.5px] font-black text-blue-900 flex items-center gap-1">
                        <Sparkles size={11} className="text-amber-500 fill-amber-400" />
                        <span>{language === 'Telugu' ? '⚡ ముఖ్యాంశాలు' : '⚡ 3-Bullet Takeaways'}</span>
                      </span>
                      <span className="text-[9.5px] text-blue-600 font-bold">
                        {isExpanded ? 'Hide ▲' : 'Show ▼'}
                      </span>
                    </button>

                    {isExpanded && (
                      <ul className="mt-1.5 space-y-1 text-[10px] text-gray-800 border-t border-blue-100 pt-1.5">
                        {(language === 'Telugu' && item.takeawaysTe
                          ? item.takeawaysTe
                          : item.takeaways
                        ).map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1 flex-shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-gray-50 px-3 py-1.5 border-t border-gray-150 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleSpeak(item)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[10.5px] font-bold cursor-pointer ${
                        isSpeaking === item.id ? 'bg-red-600 text-white border-red-500' : 'bg-white text-gray-700 border-gray-200'
                      }`}
                    >
                      <Volume2 size={11} />
                      <span>{isSpeaking === item.id ? 'Stop' : 'Listen'}</span>
                    </button>

                    <button
                      onClick={() => handleToggleLike(item.id)}
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border text-[10.5px] font-bold cursor-pointer ${
                        isLiked ? 'bg-red-50 text-[#C9252D] border-red-200' : 'bg-white text-gray-700 border-gray-200'
                      }`}
                    >
                      <Flame size={11} className={isLiked ? 'fill-[#C9252D]' : ''} />
                      <span>{likeCounts[item.id] || item.likes}</span>
                    </button>

                    <button
                      onClick={() => handleWhatsAppShare(item)}
                      className="flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-lg text-[10.5px] font-black cursor-pointer"
                    >
                      <Share2 size={11} />
                      <span>WhatsApp</span>
                    </button>
                  </div>

                  {item.articleId && (
                    <button
                      onClick={() => {
                        const m = articles.find((a) => a.id === item.articleId);
                        if (m) onSelectArticle(m);
                      }}
                      className="text-[#C9252D] font-bold text-[10.5px] flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>Full Story</span>
                      <ExternalLink size={10} />
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
