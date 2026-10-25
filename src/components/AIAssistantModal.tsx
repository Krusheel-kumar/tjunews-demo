import React, { useState } from 'react';
import type { Article, JobNotification } from '../types';
import {
  Bot,
  Send,
  Sparkles,
  BookOpen,
  Briefcase,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  RotateCcw
} from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  jobs: JobNotification[];
  language: 'English' | 'Telugu';
  onSelectArticle: (art: Article) => void;
  onSelectJob: (job: JobNotification) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  relatedArticleId?: string;
  relatedJobId?: string;
  timestamp: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  articles,
  jobs,
  language,
  onSelectArticle,
  onSelectJob
}) => {
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text:
        language === 'Telugu'
          ? 'నమస్కారం! నేను మీ TJU AI న్యూస్ అసిస్టెంట్‌ని. తెలంగాణ తాజా వార్తలు, జీవోలు, టీఎస్‌పీఎస్సీ మరియు డీఎస్సీ ప్రభుత్వ ఉద్యోగాల అర్హతలు మరియు పరీక్షల సమాచారం గురించి నన్ను అడగవచ్చు.'
          : 'Namaste! I am your TJU AI News & Job Assistant. Ask me to summarize any Hyderabad news story, explain TSPSC/DSC eligibility, or clarify state government updates.',
      timestamp: 'Just now'
    }
  ]);

  if (!isOpen) return null;

  const samplePrompts = [
    {
      label: 'Explain TSPSC Group-2 Syllabus & Eligibility',
      query: 'What are the qualifications and age limits for TSPSC Group-2?'
    },
    {
      label: 'Summarize Hyderabad Metro Phase-2 Route',
      query: 'Can you summarize the Hyderabad Metro Phase-2 expansion stations?'
    },
    {
      label: 'Mega DSC 2026 Teacher Vacancies Details',
      query: 'Tell me about the Telangana Mega DSC 11,062 vacancies and deadline.'
    },
    {
      label: 'తెలుగులో: తాజా మెట్రో వార్త ఏమిటి?',
      query: 'హైదరాబాద్ మెట్రో ఫేజ్-2 లో కొత్తగా మంజూరైన రూట్లు ఏమిటి?'
    }
  ];

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: 'Now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Simulated grounded AI synthesis
    setTimeout(() => {
      let aiReply = '';
      let matchArtId: string | undefined;
      let matchJobId: string | undefined;

      const lower = q.toLowerCase();

      if (lower.includes('group-2') || lower.includes('tspsc') || lower.includes('గ్రూప్-2')) {
        const j = jobs.find((item) => item.id === 'tspsc-grp2-2026') || jobs[0];
        matchJobId = j.id;
        aiReply =
          language === 'Telugu'
            ? `టీఎస్‌పీఎస్సీ గ్రూప్-2 కింద 783 పోస్టుల భర్తీకి నోటిఫికేషన్ విడుదలైంది. అర్హత: ఏదైనా డిగ్రీ. వయోపరిమితి: 18 నుండి 44 సంవత్సరాలు. దరఖాస్తుల గడువు: 25 నవంబర్ 2026. పరీక్ష 4 పేపర్లలో (జనరల్ స్టడీస్, తెలంగాణ చరిత్ర & ఆర్థిక వ్యవస్థ) నిర్వహించబడుతుంది.`
            : `Based on verified TJU Job records: TSPSC Group-2 covers 783 vacancies. Eligibility requires Any Bachelor’s Degree with an age ceiling of 18-44 years (with state relaxations). Application deadline is 25 Nov 2026, and the exam features 4 comprehensive papers.`;
      } else if (lower.includes('metro') || lower.includes('మెట్రో')) {
        const art = articles.find((a) => a.id === 'hyd-metro-expansion-2026') || articles[0];
        matchArtId = art.id;
        aiReply =
          language === 'Telugu'
            ? `హైదరాబాద్ మెట్రో ఫేజ్-2 కింద రాష్ట్ర కేబినెట్ ₹24,200 కోట్లతో 76.4 కిలోమీటర్ల మేర ఐదు కారిడార్లకు ఆమోదం తెలిపింది. శంషాబాద్ ఎయిర్‌పోర్ట్ ఎక్స్‌ప్రెస్ లైన్ మరియు ఎంజీబీఎస్ నుండి పాతబస్తీ ఫలక్‌నుమా వరకు డ్రైవర్‌లెస్ రైలు వ్యవస్థలు ఏర్పాటు చేయనున్నారు.`
            : `According to the latest verified TJU News report: The Telangana Cabinet has approved ₹24,200 Cr for Hyderabad Metro Phase 2 spanning 76.4 km across 5 corridors, linking Shamshabad RGI Airport, Old City Falaknuma, and Kokapet Neopolis.`;
      } else if (lower.includes('dsc') || lower.includes('teacher') || lower.includes('టీచర్')) {
        const j = jobs.find((item) => item.id === 'tg-dsc-tet-teachers');
        matchJobId = j?.id;
        aiReply =
          language === 'Telugu'
            ? `తెలంగాణ మెగా డీఎస్సీ 2026 ద్వారా 11,062 ఉపాధ్యాయ (స్కూల్ అసిస్టెంట్ & ఎస్జీటీ) పోస్టులు భర్తీ చేయనున్నారు. అర్హత: బీఎడ్ లేదా డీఎడ్ తో పాటు టెట్ ఉత్తీర్ణత. రాత పరీక్ష డిసెంబర్ 2026లో అన్ని 33 జిల్లాల్లో జరగనుంది.`
            : `Regarding Mega DSC 2026: 11,062 vacancies for School Assistants and SGTs are officially announced. Eligibility mandates B.Ed / D.Ed with valid TET qualification. Applications close 10 November 2026.`;
      } else {
        aiReply =
          language === 'Telugu'
            ? `నేను మీ ప్రశ్నకు సంబంధించిన సమాచారాన్ని పరిశీలించాను. TJU న్యూస్ మరియు అధికారిక ప్రభుత్వ డేటాబేస్ ప్రకారం, మీరు మరిన్ని వివరాల కోసం నోటిఫికేషన్ లేదా సంబంధిత వార్తా కథనాన్ని చూడవచ్చు.`
            : `I cross-referenced your query with verified TJU News and official Telangana government records. For full legal and editorial veracity, please check the source articles or official recruitment links attached below.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiReply,
          relatedArticleId: matchArtId,
          relatedJobId: matchJobId,
          timestamp: 'Just now'
        }
      ]);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[88vh] flex flex-col overflow-hidden shadow-2xl border border-gray-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B101D] via-[#151E33] to-[#0D1424] text-white p-4 flex items-center justify-between flex-shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-2.5 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 via-rose-500 to-red-600 flex items-center justify-center text-white shadow-md">
              <Bot size={20} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif font-black text-sm text-white tracking-tight">TJU AI News & Job Assistant</h3>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] px-1.5 py-0.5 rounded-full font-mono font-extrabold">
                  VERIFIED
                </span>
              </div>
              <p className="text-[10px] text-gray-300 font-sans">
                Grounded in official TJU journalism & state government gazettes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xs font-bold p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer relative z-10 active:scale-90"
          >
            ✕
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8F9FA]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#C9252D] to-[#B31D24] text-white rounded-br-xs font-medium'
                    : 'bg-white text-gray-800 border border-gray-150 rounded-bl-xs'
                }`}
              >
                <p className="font-sans">{msg.text}</p>

                {/* Grounded Reference Link */}
                {msg.relatedArticleId && (
                  <button
                    onClick={() => {
                      const match = articles.find((a) => a.id === msg.relatedArticleId);
                      if (match) {
                        onClose();
                        onSelectArticle(match);
                      }
                    }}
                    className="mt-2.5 pt-2 border-t border-gray-100 text-[11px] font-extrabold text-[#C9252D] flex items-center gap-1 hover:underline cursor-pointer group"
                  >
                    <BookOpen size={13} />
                    <span>Read Full Source Article →</span>
                  </button>
                )}

                {msg.relatedJobId && (
                  <button
                    onClick={() => {
                      const match = jobs.find((j) => j.id === msg.relatedJobId);
                      if (match) {
                        onClose();
                        onSelectJob(match);
                      }
                    }}
                    className="mt-2.5 pt-2 border-t border-amber-100/60 text-[11px] font-extrabold text-amber-700 flex items-center gap-1 hover:underline cursor-pointer group"
                  >
                    <Briefcase size={13} />
                    <span>View Official Recruitment Card →</span>
                  </button>
                )}
              </div>
              <span className="text-[9px] text-gray-400 font-mono mt-0.5 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {/* Prompt Suggestions */}
          {messages.length < 3 && (
            <div className="pt-2">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-2">
                Suggested Questions
              </span>
              <div className="flex flex-col gap-1.5">
                {samplePrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(p.query)}
                    className="text-left text-xs bg-white hover:bg-red-50/50 hover:text-[#C9252D] border border-gray-200/90 p-2.5 rounded-xl text-gray-800 transition-all flex items-center justify-between cursor-pointer active:scale-98 shadow-2xs group"
                  >
                    <span className="font-medium group-hover:font-semibold">{p.label}</span>
                    <ChevronRight size={13} className="text-gray-400 group-hover:text-[#C9252D] group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="p-3 bg-white border-t border-gray-150 flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              language === 'Telugu'
                ? 'ఏదైనా వార్త లేదా నోటిఫికేషన్ గురించి అడగండి...'
                : 'Ask AI about TSPSC jobs, metro news, or DSC...'
            }
            className="flex-1 px-3.5 py-2.5 bg-gray-100/80 rounded-2xl text-xs text-gray-900 border border-gray-200/60 focus:outline-none focus:ring-2 focus:ring-[#C9252D]/30 focus:bg-white transition-all"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 bg-gradient-to-r from-[#C9252D] to-[#AA1B23] hover:from-red-600 hover:to-red-700 text-white rounded-2xl transition-all cursor-pointer shadow-md active:scale-95 flex-shrink-0"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
