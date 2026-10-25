export interface Article {
  id: string;
  title: string;
  titleTe?: string; // Telugu translation
  summary: string;
  summaryTe?: string; // Telugu translation
  content: string[];
  contentTe?: string[]; // Telugu translation
  category: 'Hyderabad' | 'Telangana' | 'India' | 'Politics' | 'Business' | 'Sports' | 'Entertainment' | 'Education & Jobs' | 'Civic Issues' | 'Citizen Report';
  author: string;
  source?: string;
  publishedAt: string;
  updatedAt?: string;
  imageUrl: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  views?: number;
  readTime: string;
  location?: string;
  locality?: string;
  updates?: { time: string; text: string }[];
  corrections?: string[];
  audioUrl?: string;
  videoUrl?: string;
}

export interface JobNotification {
  id: string;
  title: string;
  titleTe?: string;
  department: string;
  category: 'TSPSC' | 'Police' | 'Teachers / TET' | 'Central / SSC / RRB' | 'Banking' | 'Group Services';
  stateOrCentral: 'State (Telangana)' | 'Central Government';
  qualification: '10th / Intermediate' | 'Any Degree' | 'B.Tech / Engineering' | 'Post Graduate' | 'B.Ed / D.Ed';
  vacancies: number;
  ageLimit: string;
  applicationStartDate: string;
  applicationDeadline: string;
  examDate?: string;
  status: 'Applications Open' | 'Upcoming' | 'Hall Tickets Released' | 'Results Declared' | 'Closed';
  officialNotificationUrl: string;
  officialApplyUrl: string;
  description: string;
  syllabusHighlights?: string[];
}

export interface ExamEvent {
  id: string;
  title: string;
  category: string;
  examDate: string;
  hallTicketDate?: string;
  resultDate?: string;
  status: 'Scheduled' | 'Hall Ticket Live' | 'Postponed' | 'Completed';
  officialLink: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  questionTe?: string;
  options: string[];
  optionsTe?: string[];
  correctIndex: number;
  explanation: string;
  category: 'Telangana Current Affairs' | 'General Studies' | 'Indian Polity' | 'History & Culture';
}

export interface WeatherData {
  city: string;
  locality: string;
  temp: number;
  feelsLike: number;
  condition: string;
  rainProb: number;
  humidity: number;
  windSpeed: number;
  airQuality: string;
  hourly: { time: string; temp: number; icon: string }[];
  forecast: { day: string; high: number; low: number; condition: string }[];
  alerts?: string[];
}

export interface DailyBriefingItem {
  id: string;
  rank: number;
  headline: string;
  headlineTe: string;
  summary: string;
  summaryTe: string;
  category: string;
  relatedArticleId?: string;
}

export interface ShortVideo {
  id: string;
  headline: string;
  headlineTe?: string;
  caption: string;
  category: string;
  location: string;
  likes: number;
  comments: number;
  videoUrl?: string;
  thumbnailUrl: string;
  duration: string;
  relatedArticleId?: string;
  youtubeId?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: 'breaking' | 'topic' | 'location' | 'live' | 'citizen' | 'job';
  time: string;
  read: boolean;
  targetId?: string;
  targetType?: 'article' | 'job' | 'quiz' | 'live';
}

export interface CitizenSubmission {
  id: string;
  headline: string;
  description: string;
  category: string;
  location: {
    city: string;
    district: string;
    locality: string;
  };
  incidentDateTime: string;
  mediaUrl?: string;
  sourceInfo?: string;
  authorName: string;
  authorPhone: string;
  submittedAt: string;
  status: 'draft' | 'pending_review' | 'under_review' | 'changes_requested' | 'approved' | 'rejected';
  editorFeedback?: string;
}

export interface UserPreferences {
  language: 'English' | 'Telugu';
  textSize: 'normal' | 'large' | 'xlarge';
  darkMode: boolean;
  followedTopics: string[];
  followedLocations: string[];
  followedExams: string[];
  savedArticleIds: string[];
  readLaterIds: string[];
  readingHistoryIds: string[];
  selectedLocality: string;
}
