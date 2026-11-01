import axios from 'axios';

// Detect whether running in Vite proxy or direct
const FLASK_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://127.0.0.1:5000'
  : '/api-flask';

const SPRING_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://127.0.0.1:8080'
  : '/api-spring';

export const flaskApi = axios.create({
  baseURL: FLASK_BASE,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

export const springApi = axios.create({
  baseURL: SPRING_BASE,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

// Interceptors to automatically inject stored Bearer JWT
const attachAuthInterceptor = (instance) => {
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('eventsphere_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error));
};

attachAuthInterceptor(flaskApi);
attachAuthInterceptor(springApi);

// 11 Distinct Teams Reference
export const TEAMS_DATA = [
  {
    id: "event-management",
    name: "Event Management",
    department: "Core Operations",
    description: "Master event scheduling, stage manager liaison, and campus operations.",
    lead: "Rohan Mehta",
    venue: "Central Control Room (Audi 1)",
    quota: 25,
    assignedCount: 5,
    icon: "Calendar"
  },
  {
    id: "design",
    name: "Design Team",
    department: "UI/UX & Branding",
    description: "Festival visual identity, UI/UX portal designs, posters, passes, and signage.",
    lead: "Pranali Sawdekar",
    venue: "Design & Media Studio (Lab 4)",
    quota: 15,
    assignedCount: 8,
    icon: "Layout"
  },
  {
    id: "creative",
    name: "Creative",
    department: "Campus & Stage Aesthetics",
    description: "Thematic installations, stage decors, ambient lighting, and art setups.",
    lead: "Jinal Dinesh Kumar Jain",
    venue: "Creative Workshop (Room 204)",
    quota: 40,
    assignedCount: 36,
    icon: "Palette"
  },
  {
    id: "anchoring",
    name: "Anchoring",
    department: "Stage Presentation",
    description: "Masters of ceremonies, crowd engagement, live event announcements.",
    lead: "Shivansh Shukla",
    venue: "Green Room Main Stage",
    quota: 12,
    assignedCount: 6,
    icon: "Mic"
  },
  {
    id: "hosting",
    name: "Hosting",
    department: "Hospitality & VIP",
    description: "Guest reception, dignitary welcoming, green room hospitality, and escorts.",
    lead: "Shivank Tiwari",
    venue: "Executive VIP Lounge",
    quota: 30,
    assignedCount: 23,
    icon: "HeartHandshake"
  },
  {
    id: "literature",
    name: "Literature",
    department: "Editorial & Content",
    description: "Festival daily gazette, debate jury support, scripts, and documentation.",
    lead: "Amey Sheteye",
    venue: "Seminar Library Hall",
    quota: 15,
    assignedCount: 3,
    icon: "BookOpen"
  },
  {
    id: "photography",
    name: "Photography",
    department: "Media Coverage",
    description: "Official photography, keynote session coverage, and daily digital press reels.",
    lead: "Aditya Kulkarni",
    venue: "Media Studio 1",
    quota: 20,
    assignedCount: 6,
    icon: "Camera"
  },
  {
    id: "cinematography",
    name: "Cinematography",
    department: "Video Production",
    description: "Multi-angle stage recordings, drone footage, and festival recap aftermovie.",
    lead: "Varun Nair",
    venue: "Media Studio 2",
    quota: 25,
    assignedCount: 20,
    icon: "Video"
  },
  {
    id: "security",
    name: "Security",
    department: "Safety & Discipline",
    description: "Campus access gates, attendee verification, perimeter security, crowd safety.",
    lead: "Sumiran Deepak Pote",
    venue: "Campus Security Command Desk",
    quota: 20,
    assignedCount: 12,
    icon: "Shield"
  },
  {
    id: "technical",
    name: "Technical",
    department: "Sound & Stage Networks",
    description: "Audio mixing consoles, moving DMX lights, power backup, portal servers.",
    lead: "Arav Palsule",
    venue: "Main Stage Audio-Visual Booth",
    quota: 15,
    assignedCount: 7,
    icon: "Terminal"
  },
  {
    id: "pr-sponsorship",
    name: "PR & Sponsorship",
    department: "Corporate Outreach",
    description: "Brand sponsorship booths, industrial partner relations, press briefings.",
    lead: "Anmol Kanojia",
    venue: "Corporate Relations Suite",
    quota: 20,
    assignedCount: 9,
    icon: "TrendingUp"
  }
];

// Initial Festival Schedule
export const INITIAL_SCHEDULE = [
  {
    id: "evt-101",
    name: "Grand Festival Inauguration & Keynote",
    category: "Main Stage",
    date: "2026-10-24",
    time: "10:00 AM - 12:30 PM",
    venue: "Central Auditorium",
    volunteersRequired: 20,
    status: "Confirmed",
    lead: "Sumiran Deepak Pote"
  },
  {
    id: "evt-102",
    name: "Catch Your Dreams: Inter-College Flagship",
    category: "Cultural",
    date: "2026-10-24",
    time: "02:00 PM - 05:30 PM",
    venue: "Main Amphitheatre",
    volunteersRequired: 18,
    status: "Confirmed",
    lead: "Vrunda Dujari"
  },
  {
    id: "evt-103",
    name: "Overarm Cricket Tournament: Quarter Finals",
    category: "Sports",
    date: "2026-10-25",
    time: "09:00 AM - 01:00 PM",
    venue: "Campus Sports Ground",
    volunteersRequired: 15,
    status: "Confirmed",
    lead: "Anmol Kanojia"
  },
  {
    id: "evt-104",
    name: "Dream Oracle & Maze of Riddles",
    category: "Interactive",
    date: "2026-10-25",
    time: "01:30 PM - 05:00 PM",
    venue: "Exhibition Hall 2",
    volunteersRequired: 12,
    status: "In Progress",
    lead: "Pranali Sawdekar"
  },
  {
    id: "evt-105",
    name: "Valorant & Esports Battleground",
    category: "Gaming & Tech",
    date: "2026-10-25",
    time: "02:00 PM - 07:00 PM",
    venue: "Computing Lab Complex",
    volunteersRequired: 10,
    status: "Confirmed",
    lead: "Arav Palsule"
  },
  {
    id: "evt-106",
    name: "Mr & Mrs APSIT Gala & Star Night",
    category: "Stage & Spotlight",
    date: "2026-10-26",
    time: "06:00 PM - 10:00 PM",
    venue: "Open Air Arena",
    volunteersRequired: 30,
    status: "Planning",
    lead: "Shivansh Shukla"
  }
];

// Health Probe for System Status
export const checkServicesHealth = async () => {
  const result = { flask: false, spring: false };
  try {
    const res = await flaskApi.get('/health');
    if (res.data && res.data.status === 'UP') result.flask = true;
  } catch (e) {
    result.flask = false;
  }

  try {
    const res = await springApi.get('/api/health');
    if (res.data && res.data.status === 'UP') result.spring = true;
  } catch (e) {
    result.spring = false;
  }

  return result;
};
