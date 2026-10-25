import React, { useState, useRef, useEffect } from 'react';
import {
  Headphones,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  Radio,
  Clock,
  Sparkles,
  Flame,
  Check,
  ChevronRight,
  Sliders,
  ListFilter,
  CheckCircle2,
  Mic,
  Maximize2,
  Minimize2,
  X
} from 'lucide-react';
import type { Article } from '../types';

export interface AudioNewsItem {
  id: string;
  title: string;
  titleTe?: string;
  summary: string;
  summaryTe?: string;
  audioDuration: string;
  durationSeconds: number;
  category: string;
  anchor: string;
  publishedAt: string;
  views: number;
  likes: number;
  isLiveBroadcast?: boolean;
  relatedArticleId?: string;
}

export const INITIAL_AUDIO_NEWS: AudioNewsItem[] = [
  {
    id: 'audio-1',
    title: 'Hyderabad Morning Audio Bulletin: Metro Phase-2, Weather & Traffic Decongestion',
    titleTe: 'హైదరాబాద్ మార్నింగ్ ఆడియో బులెటిన్: మెట్రో ఫేజ్-2, వాతావరణం, ట్రాఫిక్ తాజా అప్‌డేట్స్',
    summary:
      'Good morning Hyderabad. Today’s top news: Telangana Cabinet sanctions ₹24,200 Crores for 70-km Metro Phase-2 corridors. Cyberabad police deploy computer-vision traffic signals at 18 junctions in Gachibowli. Temperature expected to hover around 29 degrees Celsius with partly cloudy skies.',
    summaryTe:
      'నమస్కారం హైదరాబాద్. నేటి ఉదయపు వార్తలు: ₹24,200 కోట్లతో మెట్రో రెండో విడతకు కేబినెట్ గ్రీన్ సిగ్నల్. గచ్చిబౌలి, మాదాపూర్‌లో 18 కీలక కూడళ్ల వద్ద నూతన ఏఐ సిగ్నల్ వ్యవస్థ ప్రారంభం. నగరంలో నేటి గరిష్ట ఉష్ణోగ్రత 29 డిగ్రీలు నమోదు.',
    audioDuration: '2:15',
    durationSeconds: 135,
    category: 'Daily Digest',
    anchor: 'Radhika Sastry (Chief Voice Editor)',
    publishedAt: '15 min ago',
    views: 18400,
    likes: 4210,
    isLiveBroadcast: true
  },
  {
    id: 'audio-2',
    title: 'TSPSC Group-2 & 11,062 Mega DSC Aspirants: 60-Day Subject Audio Capsule',
    titleTe: 'టీఎస్‌పీఎస్సీ గ్రూప్-2 & మెగా డీఎస్సీ అభ్యర్థుల కోసం 60 రోజుల ఆడియో గైడ్',
    summary:
      'Special education audio report: Competitive coaching experts break down high-weightage topics in Telangana Movement History, Paper-2 Economy, and School Assistant pedagogy. All 33 district computer-based test centers officially finalized.',
    summaryTe:
      'నిరుద్యోగ అభ్యర్థులకు ప్రత్యేక ఆడియో గైడెన్స్: తెలంగాణ ఉద్యమ చరిత్ర, ఇండియన్ ఎకానమీ అంశాలపై నిపుణుల సలహాలు. 33 జిల్లాల కేంద్రాల్లో మహిళా అభ్యర్థులకు ప్రయాణ ఇబ్బందులు లేకుండా పరీక్షా కేంద్రాల ఎంపిక పూర్తి.',
    audioDuration: '3:10',
    durationSeconds: 190,
    category: 'TSPSC & Jobs',
    anchor: 'V. Raghunath (Education Bureau)',
    publishedAt: '35 min ago',
    views: 24100,
    likes: 6850,
    relatedArticleId: 'art-job-dsc-2026'
  },
  {
    id: 'audio-3',
    title: 'Cyberabad Police Deploy Adaptive AI Traffic Signals at Gachibowli Junctions',
    titleTe: 'గచ్చిబౌలి, మాదాపూర్‌లో 18 జంక్షన్ల వద్ద ఏఐ సిగ్నల్ వ్యవస్థ ఆడియో రిపోర్ట్',
    summary:
      'Civic soundbite: Adaptive machine-learning sensors continuously analyze queue lengths on Financial District roads, slashing peak morning office rush delays by 22%. Emergency green corridors automated for 108 ambulances.',
    summaryTe:
      'ట్రాఫిక్ ప్రత్యేక వార్తలు: ఆటోమేటిక్ సెన్సార్ సిగ్నల్స్‌తో పీక్ అవర్లలో ప్రయాణ సమయం 22 శాతం ఆదా. అంబులెన్సుల అత్యవసర రవాణా కోసం గ్రీన్ వేవ్ వ్యవస్థను అందుబాటులోకి తెచ్చిన సైబరాబాద్ ట్రాఫిక్ విభాగం.',
    audioDuration: '1:20',
    durationSeconds: 80,
    category: 'Hyderabad Local',
    anchor: 'TJU Civic Audio Desk',
    publishedAt: '1 hr ago',
    views: 11200,
    likes: 2980,
    relatedArticleId: 'art-traffic-ai-2026'
  },
  {
    id: 'audio-4',
    title: 'Deccan Culinary Festival Kicks Off Along Hussain Sagar Shoreline',
    titleTe: 'హుస్సేన్ సాగర్ వద్ద ఘనంగా ప్రారంభమైన డెక్కన్ ఫుడ్ కార్నివాల్ ఆడియో సమాచారం',
    summary:
      'Culture podcast: People’s Plaza turns into a culinary wonderland with 40 heritage kitchens cooking Hyderabadi Dum Biryani, Haleem, and Deccan sweets over wood-fire hearths. Live evening qawwali performances open to public.',
    summaryTe:
      'దక్కన్ సంస్కృతి & వంటకాలు: ట్యాంక్ బండ్ పీపుల్స్ ప్లాజా వద్ద 40 సంప్రదాయ కిచెన్లతో ఆహార ఉత్సవం. సాయంత్రం వేళల్లో సుప్రసిద్ధ కళాకారుల సూఫీ, ఖవ్వాలీ సంగీత కచేరీలు.',
    audioDuration: '1:45',
    durationSeconds: 105,
    category: 'Culture & Life',
    anchor: 'Pooja Reddy (TJU Life)',
    publishedAt: '2 hrs ago',
    views: 15300,
    likes: 3620,
    relatedArticleId: 'hyderabad-briyani-gi-tag-festival'
  },
  {
    id: 'audio-5',
    title: 'India Surpasses 300 GW Clean Green Power Generation Record',
    titleTe: 'భారత్ 300 గిగావాట్ల క్లీన్ ఎనర్జీ మైలురాయి ఆడియో బులెటిన్',
    summary:
      'National power bulletin: Mega solar corridors in Rajasthan and wind farms across South India now supply 44% of total afternoon electricity demand. Southern grid stability supported with hydro pumped storage.',
    summaryTe:
      'జాతీయ ఇంధన నివేదిక: భారతదేశంలో 300 గిగావాట్లకు చేరుకున్న సౌర, పవన విద్యుత్ సామర్థ్యం. పరిశ్రమలకు, గృహాలకు కాలుష్య రహిత నిరంతర విద్యుత్ సరఫరాలో సరికొత్త మైలురాయి.',
    audioDuration: '1:10',
    durationSeconds: 70,
    category: 'National',
    anchor: 'K. Srinivasan (National Bureau)',
    publishedAt: '3 hrs ago',
    views: 19800,
    likes: 4120
  },
  {
    id: 'audio-6',
    title: 'Warangal Mega IT Hub Night Visuals: Tier-2 Software Boom Welcomes 5,000 Techies',
    titleTe: 'వరంగల్ కాకతీయ ఐటీ హబ్ విస్తరణ ఆడియో సారాంశం: 5000 మంది ఇంజనీర్లు',
    summary:
      'Tech news capsule: Kakatiya Mega Tech Park expands with multinational offshore software centers, allowing local engineering graduates to secure top product engineering careers right in their home district.',
    summaryTe:
      'సాఫ్ట్‌వేర్ రంగ విశేషాలు: వరంగల్‌లో అగ్రశ్రేణి ఐటీ క్యాంపస్‌లు ప్రారంభం. హైదరాబాద్ వెళ్లే అవసరం లేకుండా సొంత జిల్లాలోనే స్థానిక యువతకు అత్యుత్తమ కొలువులు.',
    audioDuration: '1:50',
    durationSeconds: 110,
    category: 'Telangana State',
    anchor: 'Mohammed Farooq (Tech Desk)',
    publishedAt: '4 hrs ago',
    views: 16700,
    likes: 3890
  },
  {
    id: 'audio-7',
    title: 'Kukatpally Y-Junction Rolls Out 20 Electric Metro Feeder Minibuses',
    titleTe: 'కూకట్‌పల్లి వద్ద 20 ఎలక్ట్రిక్ మెట్రో ఫీడర్ బస్సుల ఆడియో ప్రకటన',
    summary:
      'Commuter audio brief: TSRTC launches green air-conditioned feeder minibuses running every 7 minutes, linking KPHB colonies with JNTU Metro station for a flat affordable fare.',
    summaryTe:
      'ప్రయాణికుల సమాచారం: కేపీహెచ్‌బీ కాలనీల నుండి మెట్రో స్టేషన్లకు ప్రతి 7 నిమిషాలకు ఎలక్ట్రిక్ ఏసీ ఫీడర్ బస్సుల సేవలు ప్రారంభం.',
    audioDuration: '0:50',
    durationSeconds: 50,
    category: 'Civic Alerts',
    anchor: 'TJU Transport Bureau',
    publishedAt: '5 hrs ago',
    views: 9400,
    likes: 2150
  }
];

interface AudioNewsScreenProps {
  articles?: Article[];
  language?: 'English' | 'Telugu';
  onSelectArticle?: (article: Article) => void;
  onShare: (title: string) => void;
}

const CATEGORY_TABS = [
  { id: 'all', label: 'All Bulletins', labelTe: 'అన్ని ఆడియోలు' },
  { id: 'daily', label: '🌅 Daily Digest', labelTe: '🌅 తాజా డైజెస్ట్' },
  { id: 'hyderabad', label: 'Hyderabad', labelTe: 'హైదరాబాద్' },
  { id: 'telangana', label: 'Telangana', labelTe: 'తెలంగాణ' },
  { id: 'jobs', label: 'TSPSC & Jobs', labelTe: 'ఉద్యోగాలు' },
  { id: 'civic', label: 'Civic Alerts', labelTe: 'సివిక్ అలర్ట్స్' }
];

const PLAYBACK_SPEEDS = [1.0, 1.25, 1.5, 2.0];

export const AudioNewsScreen: React.FC<AudioNewsScreenProps> = ({
  articles = [],
  language = 'English',
  onSelectArticle,
  onShare
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeStory, setActiveStory] = useState<AudioNewsItem>(INITIAL_AUDIO_NEWS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [savedAudioIds, setSavedAudioIds] = useState<string[]>([]);

  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceGender, setSelectedVoiceGender] = useState<'male' | 'female'>('male');

  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<number | null>(null);

  // Load browser and OS voices
  useEffect(() => {
    const loadVoices = () => {
      if ('speechSynthesis' in window) {
        const vList = window.speechSynthesis.getVoices();
        setAvailableVoices(vList);
      }
    };
    loadVoices();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Filter audio items
  const filteredAudio = INITIAL_AUDIO_NEWS.filter((item) => {
    if (selectedCategory === 'daily') return item.category.toLowerCase().includes('daily');
    if (selectedCategory === 'hyderabad')
      return item.category.toLowerCase().includes('hyderabad') || item.title.includes('Hyderabad');
    if (selectedCategory === 'telangana')
      return item.category.toLowerCase().includes('telangana') || item.title.includes('Telangana');
    if (selectedCategory === 'jobs') return item.category.toLowerCase().includes('job');
    if (selectedCategory === 'civic') return item.category.toLowerCase().includes('civic');
    return true;
  });

  // Select best voice: Indian Male (en-IN) or Telugu (te-IN)
  const getBestVoice = (lang: 'English' | 'Telugu', gender: 'male' | 'female') => {
    if (!availableVoices.length) return null;

    if (lang === 'Telugu') {
      // 1. Look for native Telugu voice (e.g. Google తెలుగు, Microsoft Mohan Telugu)
      const teluguVoice = availableVoices.find(
        (v) =>
          v.lang.toLowerCase().includes('te-in') ||
          v.lang.toLowerCase().includes('te_in') ||
          v.lang.toLowerCase().startsWith('te') ||
          v.name.toLowerCase().includes('telugu')
      );
      if (teluguVoice) return teluguVoice;

      // 2. Fallback: Indian English voice with regional inflection
      const indianVoice = availableVoices.find(
        (v) =>
          v.lang.toLowerCase().includes('en-in') ||
          v.lang.toLowerCase().includes('en_in') ||
          v.name.toLowerCase().includes('india')
      );
      return indianVoice || null;
    } else {
      // English: Target Indian English Male Voice (e.g. Microsoft Ravi, Google English India, Prabhat)
      if (gender === 'male') {
        const indianMale = availableVoices.find(
          (v) =>
            (v.lang.toLowerCase().includes('en-in') ||
              v.lang.toLowerCase().includes('en_in') ||
              v.name.toLowerCase().includes('india')) &&
            (v.name.toLowerCase().includes('ravi') ||
              v.name.toLowerCase().includes('male') ||
              v.name.toLowerCase().includes('prabhat') ||
              v.name.toLowerCase().includes('mohan') ||
              (!v.name.toLowerCase().includes('heera') && !v.name.toLowerCase().includes('female')))
        );
        if (indianMale) return indianMale;
      }

      // Any Indian English voice
      const anyIndian = availableVoices.find(
        (v) =>
          v.lang.toLowerCase().includes('en-in') ||
          v.lang.toLowerCase().includes('en_in') ||
          v.name.toLowerCase().includes('india')
      );
      if (anyIndian) return anyIndian;

      // Fallback male voice
      if (gender === 'male') {
        const anyMale = availableVoices.find(
          (v) =>
            v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('david') ||
            v.name.toLowerCase().includes('george')
        );
        if (anyMale) return anyMale;
      }

      return availableVoices[0] || null;
    }
  };

  // Start speech synthesis with authentic Indian Male accent / Telugu voiceover
  const startSpeech = (story: AudioNewsItem, speed: number = playbackSpeed) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    if (isMuted) return;

    const textToRead =
      language === 'Telugu' && story.summaryTe
        ? `${story.titleTe || story.title}. ${story.summaryTe}`
        : `${story.title}. ${story.summary}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    const chosenVoice = getBestVoice(language, selectedVoiceGender);

    if (chosenVoice) {
      utterance.voice = chosenVoice;
      utterance.lang = chosenVoice.lang;
    } else {
      utterance.lang = language === 'Telugu' ? 'te-IN' : 'en-IN';
    }

    // Set pitch & rate for authentic Indian newsroom broadcast
    if (selectedVoiceGender === 'male') {
      // Lower pitch (0.90) delivers authoritative, baritone Indian male news anchor timbre
      utterance.pitch = 0.90;
    } else {
      utterance.pitch = 1.05;
    }
    utterance.rate = speed;

    utterance.onend = () => {
      setIsPlaying(false);
      setElapsedSeconds(story.durationSeconds);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    };

    speechUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Stop speech
  const stopSpeech = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Play / Pause toggle
  const togglePlayPause = (story?: AudioNewsItem) => {
    const target = story || activeStory;

    if (activeStory.id === target.id && isPlaying) {
      // Pause
      stopSpeech();
      setIsPlaying(false);
    } else {
      // Play new or resume
      setActiveStory(target);
      setIsPlaying(true);
      startSpeech(target, playbackSpeed);

      if (activeStory.id !== target.id) {
        setElapsedSeconds(0);
      }

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= target.durationSeconds) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return target.durationSeconds;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    }
  };

  // Change playback speed
  const handleSpeedCycle = () => {
    const nextIdx = (PLAYBACK_SPEEDS.indexOf(playbackSpeed) + 1) % PLAYBACK_SPEEDS.length;
    const newSpeed = PLAYBACK_SPEEDS[nextIdx];
    setPlaybackSpeed(newSpeed);

    if (isPlaying) {
      startSpeech(activeStory, newSpeed);
    }
  };

  // Rewind 10 seconds
  const handleRewind10 = () => {
    setElapsedSeconds((prev) => Math.max(0, prev - 10));
    if (isPlaying) {
      startSpeech(activeStory, playbackSpeed);
    }
  };

  // Forward 10 seconds
  const handleForward10 = () => {
    setElapsedSeconds((prev) => Math.min(activeStory.durationSeconds, prev + 10));
  };

  // Toggle bookmark
  const handleToggleBookmark = (id: string) => {
    if (savedAudioIds.includes(id)) {
      setSavedAudioIds(savedAudioIds.filter((item) => item !== id));
    } else {
      setSavedAudioIds([...savedAudioIds, id]);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.min(100, (elapsedSeconds / activeStory.durationSeconds) * 100);

  return (
    <div className="bg-[#090D16] text-white min-h-screen pb-28 flex flex-col select-none animate-fadeIn">
      {/* ================= AUDIO NEWS MASTHEAD ================= */}
      <header className="bg-[#0E1524]/95 backdrop-blur-xl border-b border-white/10 px-4 py-3 sticky top-0 z-40 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#C9252D] to-[#FF4D57] flex items-center justify-center text-white shadow-md shadow-red-900/30">
            <Headphones size={17} className="stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-serif font-black text-base tracking-tight leading-none text-white">
                {language === 'Telugu' ? 'ఆడియో వార్తలు' : 'Audio News'}
              </h1>
              <span className="bg-red-500/20 text-red-400 text-[9px] font-black px-1.5 py-0.2 rounded-full border border-red-500/40 uppercase tracking-wider">
                Voice
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-0.5">
              {language === 'Telugu' ? 'బులెటిన్లు • లైవ్ పాడ్‌కాస్ట్‌లు • 60 సెకన్ల ఆడియో' : 'Bulletins • 24×7 Stream • Podcasts'}
            </p>
          </div>
        </div>

        {/* Live Audio Badge */}
        <div className="flex items-center gap-1.5 bg-red-950/70 text-red-300 border border-red-500/40 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span>AIR 24×7</span>
        </div>
      </header>

      {/* ================= CATEGORY FILTER STRIP ================= */}
      <div className="bg-[#0E1524]/70 border-b border-white/5 px-3 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none z-30">
        {CATEGORY_TABS.map((tab) => {
          const isActive = selectedCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1 ${
                isActive
                  ? 'bg-[#C9252D] text-white shadow-md shadow-red-900/40 border border-red-400/40'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span>{language === 'Telugu' ? tab.labelTe : tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="p-3 space-y-3.5">
        {/* ================= FLAGSHIP LIVE AUDIO BROADCAST CARD ================= */}
        <div className="bg-gradient-to-br from-[#151D30] via-[#1E2842] to-[#0E1524] rounded-3xl p-4 border border-white/15 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute -right-8 -top-8 w-36 h-36 bg-[#C9252D]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Top Status Row */}
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="bg-[#C9252D] text-white text-[9.5px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Radio size={10} className="animate-pulse" />
                <span>{activeStory.category}</span>
              </span>
              <span className="bg-black/40 text-gray-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-white/10">
                {activeStory.audioDuration}
              </span>
            </div>

            {/* Equalizer animation bars */}
            <div className="flex items-end gap-[3px] h-4 px-2 py-0.5 bg-black/40 rounded-full border border-white/10">
              <span
                className={`w-[3px] bg-red-400 rounded-full transition-all ${
                  isPlaying ? 'h-3 animate-eq-1' : 'h-1.5'
                }`}
              />
              <span
                className={`w-[3px] bg-red-500 rounded-full transition-all ${
                  isPlaying ? 'h-4 animate-eq-2' : 'h-2'
                }`}
              />
              <span
                className={`w-[3px] bg-amber-400 rounded-full transition-all ${
                  isPlaying ? 'h-3.5 animate-eq-3' : 'h-1.5'
                }`}
              />
              <span
                className={`w-[3px] bg-red-400 rounded-full transition-all ${
                  isPlaying ? 'h-2 animate-eq-1' : 'h-1'
                }`}
              />
            </div>
          </div>

          {/* Active Story Headline */}
          <h2 className="font-serif font-black text-sm sm:text-base text-white leading-snug tracking-tight mb-2 relative z-10">
            {language === 'Telugu' && activeStory.titleTe ? activeStory.titleTe : activeStory.title}
          </h2>

          {/* Audio Story Summary */}
          <p className="text-[11.5px] text-gray-300 leading-relaxed font-sans mb-3 line-clamp-3 relative z-10">
            {language === 'Telugu' && activeStory.summaryTe ? activeStory.summaryTe : activeStory.summary}
          </p>

          {/* Byline / Newsreader & Voice Engine Selector */}
          <div className="flex items-center justify-between text-[10.5px] text-gray-400 border-t border-white/10 pt-2 mb-3 relative z-10 font-medium flex-wrap gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="flex items-center gap-1 text-gray-300">
                <Mic size={11} className="text-red-400" />
                <span>{activeStory.anchor}</span>
              </span>
              <button
                onClick={() => {
                  const next = selectedVoiceGender === 'male' ? 'female' : 'male';
                  setSelectedVoiceGender(next);
                  if (isPlaying) {
                    startSpeech(activeStory, playbackSpeed);
                  }
                }}
                className="bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-amber-300 hover:text-white px-2 py-0.5 rounded-full text-[9.5px] font-bold flex items-center gap-1 cursor-pointer transition-colors active:scale-95"
                title="Switch voice anchor"
              >
                <span>
                  {language === 'Telugu'
                    ? (selectedVoiceGender === 'male' ? '🇮🇳 తెలుగు వాయిస్ (మోహన్)' : '🇮🇳 తెలుగు వాయిస్ (శృతి)')
                    : (selectedVoiceGender === 'male' ? '🇮🇳 Indian Male (Ravi / AIR)' : '🇮🇳 Indian Female (Neerja)')}
                </span>
                <span className="text-[9px] text-gray-400">⇄</span>
              </button>
            </div>
            <span className="text-[10px] font-mono text-gray-400">{activeStory.publishedAt}</span>
          </div>

          {/* Scrubbing Audio Progress Bar */}
          <div className="space-y-1 relative z-10 mb-3">
            <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden border border-white/10 cursor-pointer">
              <div
                className="h-full bg-gradient-to-r from-[#C9252D] via-red-500 to-amber-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[9.5px] font-mono text-gray-400 font-bold">
              <span>{formatTime(elapsedSeconds)}</span>
              <span>{formatTime(activeStory.durationSeconds)}</span>
            </div>
          </div>

          {/* Big Player Controls */}
          <div className="flex items-center justify-between relative z-10 pt-1">
            {/* Speed Selector */}
            <button
              onClick={handleSpeedCycle}
              className="bg-black/40 hover:bg-black/60 text-gray-200 font-mono font-bold text-[11px] px-2.5 py-1.5 rounded-xl border border-white/15 transition-all cursor-pointer active:scale-95"
              title="Playback Speed"
            >
              {playbackSpeed}x
            </button>

            {/* Playback Transport Buttons */}
            <div className="flex items-center gap-3">
              {/* Rewind 10s */}
              <button
                onClick={handleRewind10}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 flex items-center justify-center transition-all cursor-pointer border border-white/15 active:scale-90"
                title="Rewind 10 seconds"
              >
                <RotateCcw size={15} />
              </button>

              {/* Main Play / Pause Button */}
              <button
                onClick={() => togglePlayPause()}
                className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#99131A] via-[#C9252D] to-[#FF4D57] hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-white shadow-xl shadow-red-900/60 cursor-pointer border-2 border-white/30"
              >
                {isPlaying ? (
                  <Pause size={22} className="fill-white" />
                ) : (
                  <Play size={22} className="fill-white ml-0.5" />
                )}
              </button>

              {/* Forward 10s */}
              <button
                onClick={handleForward10}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 flex items-center justify-center transition-all cursor-pointer border border-white/15 active:scale-90"
                title="Forward 10 seconds"
              >
                <RotateCw size={15} />
              </button>
            </div>

            {/* Share / Bookmark Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onShare(activeStory.title)}
                className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-gray-300 hover:text-white transition-all border border-white/15 cursor-pointer active:scale-90"
                title="Share Audio Clip"
              >
                <Share2 size={14} />
              </button>
              <button
                onClick={() => handleToggleBookmark(activeStory.id)}
                className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-gray-300 hover:text-white transition-all border border-white/15 cursor-pointer active:scale-90"
                title="Save"
              >
                <Bookmark
                  size={14}
                  className={savedAudioIds.includes(activeStory.id) ? 'fill-[#C9252D] text-[#C9252D]' : ''}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ================= ALL AUDIO BULLETINS PLAYLIST ================= */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1 pt-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#C9252D] rounded-full" />
              <h3 className="font-serif font-black text-sm text-white tracking-tight">
                {language === 'Telugu' ? 'తాజా ఆడియో బులెటిన్లు' : 'Latest Voice Bulletins'}
              </h3>
            </div>
            <span className="text-[11px] font-mono text-gray-400 font-bold">
              {filteredAudio.length} Episodes
            </span>
          </div>

          {filteredAudio.map((story) => {
            const isThisStoryActive = activeStory.id === story.id;
            const isThisStoryPlaying = isThisStoryActive && isPlaying;
            const isSaved = savedAudioIds.includes(story.id);

            return (
              <div
                key={story.id}
                onClick={() => togglePlayPause(story)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer group active:scale-[0.99] flex items-center gap-3 ${
                  isThisStoryActive
                    ? 'bg-[#182033] border-red-500/50 shadow-md shadow-red-950/40'
                    : 'bg-[#101726] hover:bg-[#151D2F] border-white/10'
                }`}
              >
                {/* Left Circular Play / Equalizer Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayPause(story);
                  }}
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 shadow-md ${
                    isThisStoryPlaying
                      ? 'bg-[#C9252D] text-white shadow-red-900/60 ring-2 ring-red-400/40'
                      : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                  }`}
                >
                  {isThisStoryPlaying ? (
                    <Pause size={17} className="fill-white" />
                  ) : (
                    <Play size={17} className="fill-white ml-0.5" />
                  )}
                </button>

                {/* Story Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-black text-red-300 uppercase tracking-wider bg-red-950/70 border border-red-500/30 px-1.5 py-0.2 rounded-md">
                      {story.category}
                    </span>
                    <span className="text-[9.5px] font-mono text-gray-400 font-semibold flex items-center gap-0.5">
                      <Clock size={10} />
                      <span>{story.audioDuration}</span>
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white leading-snug line-clamp-2 group-hover:text-red-300 transition-colors">
                    {language === 'Telugu' && story.titleTe ? story.titleTe : story.title}
                  </h4>

                  <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1.5 pt-1.5 border-t border-white/5">
                    <span className="truncate max-w-[150px]">{story.anchor}</span>
                    <span className="font-mono text-[9px]">{story.publishedAt}</span>
                  </div>
                </div>

                {/* Right Action Icons */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleBookmark(story.id);
                    }}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    title="Bookmark"
                  >
                    <Bookmark size={13} className={isSaved ? 'fill-[#C9252D] text-[#C9252D]' : ''} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onShare(story.title);
                    }}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    title="Share"
                  >
                    <Share2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= FLOATING STICKY "NOW PLAYING" MINI DOCK ================= */}
      {activeStory && (
        <div className="sticky bottom-0 inset-x-0 bg-[#0E1524]/95 backdrop-blur-xl border-t border-white/15 px-3.5 py-2.5 z-40 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <button
              onClick={() => togglePlayPause()}
              className="w-9 h-9 rounded-xl bg-[#C9252D] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-red-900/50 cursor-pointer active:scale-95"
            >
              {isPlaying ? <Pause size={15} className="fill-white" /> : <Play size={15} className="fill-white ml-0.5" />}
            </button>

            <div className="min-w-0 flex-1">
              <h5 className="text-[11.5px] font-bold text-white truncate leading-tight">
                {language === 'Telugu' && activeStory.titleTe ? activeStory.titleTe : activeStory.title}
              </h5>
              <div className="flex items-center gap-2 text-[9.5px] font-mono text-gray-400 mt-0.5">
                <span className="text-red-400 font-bold">{formatTime(elapsedSeconds)}</span>
                <span>/</span>
                <span>{activeStory.audioDuration}</span>
                <span>•</span>
                <span className="truncate">{activeStory.anchor}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            <button
              onClick={handleSpeedCycle}
              className="bg-white/10 hover:bg-white/20 text-gray-200 font-mono text-[10px] font-bold px-2 py-1 rounded-lg border border-white/15 transition-all cursor-pointer"
            >
              {playbackSpeed}x
            </button>

            <button
              onClick={() => {
                stopSpeech();
                setIsPlaying(false);
              }}
              className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Close Player"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
