import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight,
  Coffee
} from 'lucide-react';
import { CALENDAR_DATA, DayData, Saint } from './data/calendarData';
import * as cheerio from 'cheerio';

type Language = 'en' | 'sr-Latn' | 'sr-Cyrl';

const TRANSLATIONS = {
  en: {
    title: 'OLD SERBIAN CALENDAR',
    subtitle: 'Anno Domini',
    creation: 'FROM THE CREATION OF THE WORLD',
    selectedDay: 'SELECTED DAY',
    byzantineEra: 'YEAR OF THE LORD',
    aboutCalendar: 'ABOUT THE CALENDAR',
    aboutText: [
      'The Old Serbian Calendar uses the Julian Calendar (Old Style). The Serbian Orthodox Church is one of the few Orthodox Churches that still follow this calendar for all feasts. Currently, Julian dates are 13 days behind the Gregorian calendar.',
      'The New Church Year begins on September 1 (Julian) = September 14 (Gregorian). The year counting from the Creation of the World starts from 5508 BC.',
      '12 Great Feasts of the SPC: Nativity, Theophany, Presentation, Annunciation, Palm Sunday, Transfiguration, Dormition, Nativity of the Theotokos, Exaltation of the Cross, Entry of the Theotokos, Entry into Jerusalem, Pentecost (movable). Plus Holy Pascha, above all feasts.',
      'Source: spc.rs · crkvenikalendar.com'
    ],
    highlightBoxTitle: '✦ 7533 A.M.',
    highlightBoxText: 'The year 7533 from the Creation of the World lasted from September 1, 2024, to August 31, 2025, according to the Gregorian calendar. In that year, the Serbian Orthodox Church marked 800 years since the founding of the Hilandar charter of Saint Simeon the Myrrh-flowing and 800 years of autocephaly of the Serbian Orthodox Church — a year of special spiritual significance for the Serbian people.',
    historicalContextTitle: 'HISTORICAL CONTEXT',
    historicalContextText: [
      'The Byzantine calendar, also known as the "Creation Era of Constantinople" or "Anno Mundi", was the official calendar of the Byzantine Empire and the Serbian medieval state. It calculates the creation of the world as occurring on September 1, 5509 BC.',
      'In Serbian history, this calendar was used extensively in official documents, royal charters, and monumental inscriptions. The famous Dušan\'s Code, the constitution of the Serbian Empire, was promulgated in the year 6857 (1349 AD).',
      'While the Gregorian calendar is used for civil purposes today, the Serbian Orthodox Church continues to observe the liturgical year beginning on September 1st, preserving this ancient chronological tradition.'
    ],
    donationTitle: 'Donor\'s Contribution',
    donationSubtitle: 'Help the development of the Old Serbian Calendar',
    candle: 'Candle',
    lightCandle: 'Light a candle',
    bread: 'Bread',
    offerBread: 'Offer bread',
    contribution: 'Contribution',
    memorial: 'Memorial contribution',
    founder: 'Founder',
    becomeFounder: 'Become a founder',
    orEnterAmount: 'OR ENTER AMOUNT (USD)',
    total: 'TOTAL',
    traditionalMonths: [
      { name: 'Kolozheg', description: 'Month of turning the wheel/sun.' },
      { name: 'Sechko', description: 'Month of cutting frost.' },
      { name: 'Derikozha', description: 'Month that "flays the skin".' },
      { name: 'Lazhitrava', description: 'Month of "lying grass".' },
      { name: 'Cvetanj', description: 'Month of blooming.' },
      { name: 'Treshnjar', description: 'Month of cherries.' },
      { name: 'Zhetvar', description: 'Month of harvest.' },
      { name: 'Gumnik', description: 'Month of the threshing floor.' },
      { name: 'Grozdober', description: 'Month of grape harvesting.' },
      { name: 'Shumopad', description: 'Month of falling leaves.' },
      { name: 'Studen', description: 'Month of cold.' },
      { name: 'Koledar', description: 'Month of koledas.' },
    ],
    weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    fullWeekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  },
  'sr-Latn': {
    title: 'STARI SRPSKI KALENDAR',
    subtitle: 'Leta Gospodnjeg',
    creation: 'OTЪ SOTVORENÏA MÏRA',
    selectedDay: 'IZABRANI DAN',
    byzantineEra: 'LETA GOSPODNJEG',
    aboutCalendar: 'O KALENDARU',
    aboutText: [
      'Stari Srpski Kalendar koristi Julijanski Kalendar (Stari Stil). SPC je jedna od retkih Pravoslavnih Crkava koje i dalje prate ovaj kalendar za sve praznike. Trenutno, Julijanski datumi kasne 13 dana za Grigorijanskim kalendarom.',
      'Nova Crkvena Godina počinje 1. septembra (Julijanski) = 14. septembra (Grigorijanski). Brojanje godina od Stvaranja Sveta počinje od 5508. godine pre Hrista.',
      '12 Velikih Praznika SPC: Božić, Bogojavljenje, Sretenje, Blagovesti, Vrbica, Preobraženje, Uspenje, Mala Gospojina, Krstovdan, Vavedenje, Cveti, Duhovi (pokretni). Plus Sveta Vaskrsija, iznad svih praznika.',
      'Izvor: spc.rs · crkvenikalendar.com'
    ],
    highlightBoxTitle: '✦ 7533 A.M.',
    highlightBoxText: 'Година 7533. од Стварања Света трајала је од 1. септембра 2024. до 31. августа 2025. по Григоријанском календару. Те године Српска Православна Црква обележила је 800 година од оснивања хиландарске повеље Светог Симеона Мироточивог и 800 година аутокефалности Српске Православне Цркве — година посебног духовног значаја за српски народ.',
    historicalContextTitle: 'ISTORIJSKI KONTEKST',
    historicalContextText: [
      'Vizantijski kalendar, poznat i kao "Era od stvaranja sveta", bio je zvanični kalendar Vizantijskog carstva i srpske srednjovekovne države. Po ovom kalendaru, svet je stvoren 1. septembra 5509. godine pre Hrista.',
      'U srpskoj istoriji, ovaj kalendar se intenzivno koristio u zvaničnim dokumentima, poveljama vladara i na spomenicima. Čuveni Dušanov zakonik, ustav Srpskog carstva, proglašen je 6857. godine (1349. godine po rođenju Hrista).',
      'Iako se danas za građanske potrebe koristi Grigorijanski kalendar, Srpska pravoslavna crkva i dalje obeležava početak crkvene godine 1. septembra, čuvajući ovu drevnu hronološku tradiciju.'
    ],
    donationTitle: 'Prilog Ktitora',
    donationSubtitle: 'Pomogni razvoju Starog Srpskog Kalendara',
    candle: 'Sveća',
    lightCandle: 'Upali sveću',
    bread: 'Hleb',
    offerBread: 'Prinesi hleb',
    contribution: 'Prilog',
    memorial: 'Zadušni prilog',
    founder: 'Ktitor',
    becomeFounder: 'Postani ktitor',
    orEnterAmount: 'ILI UNESI IZNOS (USD)',
    total: 'UKUPNO',
    traditionalMonths: [
      { name: 'Koložeg', description: 'KOLOŽEG' },
      { name: 'Sečko', description: 'SEČKO' },
      { name: 'Brъzen', description: 'BREZEN' },
      { name: 'Lažitrava', description: 'LAŽITRAVA' },
      { name: 'Cvetanj', description: 'CVETANJ' },
      { name: 'Trešnjar', description: 'TREŠNJAR' },
      { name: 'Žetvar', description: 'ŽETVAR' },
      { name: 'Gumnik', description: 'GUMNIK' },
      { name: 'Grozdober', description: 'GROZDOBER' },
      { name: 'Šumopad', description: 'ŠUMOPAD' },
      { name: 'Studen', description: 'STUDEN' },
      { name: 'Koledar', description: 'KOLEDAR' },
    ],
    weekdays: ['Nd', 'Pn', 'Ut', 'Sr', 'Čt', 'Pt', 'Sb'],
    fullWeekdays: ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'],
  }
};

const transliterate = (text: string) => {
  const map: Record<string, string> = {
    'A': 'А', 'B': 'Б', 'V': 'В', 'G': 'Г', 'D': 'Д', 'Đ': 'Ђ', 'E': 'Е', 'Ž': 'Ж', 'Z': 'З', 'I': 'И', 'J': 'Ј', 'K': 'К', 'L': 'Л', 'Lj': 'Љ', 'M': 'М', 'N': 'Н', 'Nj': 'Њ', 'O': 'О', 'P': 'П', 'R': 'Р', 'S': 'С', 'T': 'Т', 'Ć': 'Ћ', 'U': 'У', 'F': 'Ф', 'H': 'Х', 'C': 'Ц', 'Č': 'Ч', 'Dž': 'Џ', 'Š': 'Ш',
    'a': 'а', 'b': 'б', 'v': 'в', 'g': 'г', 'd': 'д', 'đ': 'ђ', 'e': 'е', 'ž': 'ж', 'z': 'з', 'i': 'и', 'j': 'ј', 'k': 'к', 'l': 'л', 'lj': 'љ', 'm': 'м', 'n': 'н', 'nj': 'њ', 'o': 'о', 'p': 'п', 'r': 'р', 's': 'с', 't': 'т', 'ć': 'ћ', 'u': 'у', 'f': 'ф', 'h': 'х', 'c': 'ц', 'č': 'ч', 'dž': 'џ', 'š': 'ш'
  };
  
  let result = text;
  const digraphs = ['Lj', 'Nj', 'Dž', 'lj', 'nj', 'dž'];
  digraphs.forEach(d => {
    const regex = new RegExp(d, 'g');
    result = result.replace(regex, map[d]);
  });
  
  return result.split('').map(char => map[char] || char).join('');
};

const transliterateCyrlToLatn = (text: string) => {
  const map: Record<string, string> = {
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Ђ': 'Đ', 'Е': 'E', 'Ж': 'Ž', 'З': 'Z', 'И': 'I', 'Ј': 'J', 'К': 'K', 'Л': 'L', 'Љ': 'Lj', 'М': 'M', 'Н': 'N', 'Њ': 'Nj', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'Ћ': 'Ć', 'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Č', 'Џ': 'Dž', 'Ш': 'Š',
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'ђ': 'đ', 'е': 'e', 'ж': 'ž', 'з': 'z', 'и': 'i', 'ј': 'j', 'к': 'k', 'л': 'l', 'љ': 'lj', 'м': 'm', 'н': 'n', 'њ': 'nj', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'ћ': 'ć', 'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'č', 'џ': 'dž', 'ш': 'š'
  };
  return text.split('').map(char => map[char] || char).join('');
};

const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--color-byz-gold)]">
    <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill="currentColor"/>
  </svg>
);

const CornerTL = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-4 left-4 text-[var(--color-byz-gold-muted)]">
    <path d="M2 38V12C2 6.47715 6.47715 2 12 2H38" stroke="currentColor" strokeWidth="1"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

const CornerTR = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-4 right-4 text-[var(--color-byz-gold-muted)]">
    <path d="M38 38V12C38 6.47715 33.5228 2 28 2H2" stroke="currentColor" strokeWidth="1"/>
    <circle cx="28" cy="12" r="2" fill="currentColor"/>
  </svg>
);

export default function App() {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('language') as Language) || 'sr-Cyrl');
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAbout, setShowAbout] = useState(false);
  const [showHistoricalContext, setShowHistoricalContext] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number>(3);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [fetchedData, setFetchedData] = useState<Record<string, DayData>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    const fetchMonthData = async () => {
      setIsLoading(true);
      try {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth() + 1;
        
        const isEnglish = language === 'en';
        const baseUrl = isEnglish ? 'https://www.crkvenikalendar.com/index_en.php' : 'https://www.crkvenikalendar.com/index.php';
        
        // We use a CORS proxy to fetch the data since we are in the browser
        const proxyUrl = 'https://corsproxy.io/?';
        const targetUrl = encodeURIComponent(`${baseUrl}?godina=${year}&mesec=${month}`);
        
        const response = await fetch(proxyUrl + targetUrl);
        const html = await response.text();
        const $ = cheerio.load(html);
        
        const newData: Record<string, DayData> = {};
        
        // The calendar table has rows with class 'dan'
        $('tr').each((i, el) => {
          const dayCell = $(el).find('td').first();
          const dayText = dayCell.text().trim();
          
          // Try to extract the day number
          const dayMatch = dayText.match(/^(\d+)/);
          if (dayMatch) {
            const day = parseInt(dayMatch[1]);
            
            // The saints are usually in the second column
            const saintsCell = $(el).find('td').eq(1);
            
            // Check if there's a major feast (usually in red or bold)
            const feastElement = saintsCell.find('b, font[color="red"], span[style*="color:red"]');
            let feast = feastElement.length > 0 ? feastElement.first().text().trim() : undefined;
            
            // Extract saints
            const saintsText = saintsCell.text().trim();
            const saintsList = saintsText.split(';').map(s => s.trim()).filter(s => s.length > 0);
            
            let saints: Saint[] = saintsList.map(s => ({
              name: s,
              bio: '' // We don't have bios from the main calendar view
            }));
            
            // Fasting info is usually in the last column
            const fastingCell = $(el).find('td').last();
            let fastingText = fastingCell.text().trim().toLowerCase();
            
            if (language === 'sr-Latn') {
              if (feast) feast = transliterateCyrlToLatn(feast);
              saints = saints.map(s => ({ name: transliterateCyrlToLatn(s.name), bio: s.bio }));
              fastingText = transliterateCyrlToLatn(fastingText);
            }
            
            let fasting: DayData['fasting'] = 'none';
            if (fastingText.includes('fast') || fastingText.includes('post') || fastingText.includes('пост')) {
              if (fastingText.includes('water') || fastingText.includes('voda') || fastingText.includes('вода')) fasting = 'strict';
              else if (fastingText.includes('oil') || fastingText.includes('ulje') || fastingText.includes('уље')) fasting = 'oil';
              else if (fastingText.includes('fish') || fastingText.includes('riba') || fastingText.includes('риба')) fasting = 'fish';
              else fasting = 'regular';
            }
            
            // Calculate Julian date key
            const gregorianDate = new Date(year, month - 1, day);
            const julianDate = new Date(gregorianDate);
            julianDate.setDate(gregorianDate.getDate() - 13);
            
            const key = `${String(julianDate.getMonth() + 1).padStart(2, '0')}-${String(julianDate.getDate()).padStart(2, '0')}`;
            
            newData[key] = {
              saints: saints.length > 0 ? saints : [{ name: language === 'en' ? "Saint of the day" : (language === 'sr-Latn' ? "Svetitelj dana" : "Светитељ дана"), bio: "" }],
              feast,
              fasting,
              fastingDescription: fastingText || undefined
            };
          }
        });
        
        setFetchedData(prev => ({ ...prev, ...newData }));
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMonthData();
  }, [viewDate.getFullYear(), viewDate.getMonth(), language]);

  const t = useMemo(() => {
    const base = language === 'sr-Cyrl' ? TRANSLATIONS['sr-Latn'] : TRANSLATIONS[language];
    if (language === 'sr-Cyrl') {
      return {
        ...base,
        title: transliterate(base.title),
        subtitle: transliterate(base.subtitle),
        creation: transliterate(base.creation),
        selectedDay: transliterate(base.selectedDay),
        byzantineEra: transliterate(base.byzantineEra),
        aboutCalendar: transliterate(base.aboutCalendar),
        aboutText: base.aboutText.map(transliterate),
        highlightBoxTitle: transliterate(base.highlightBoxTitle),
        highlightBoxText: transliterate(base.highlightBoxText),
        historicalContextTitle: transliterate(base.historicalContextTitle),
        historicalContextText: base.historicalContextText.map(transliterate),
        donationTitle: transliterate(base.donationTitle),
        donationSubtitle: transliterate(base.donationSubtitle),
        candle: transliterate(base.candle),
        lightCandle: transliterate(base.lightCandle),
        bread: transliterate(base.bread),
        offerBread: transliterate(base.offerBread),
        contribution: transliterate(base.contribution),
        memorial: transliterate(base.memorial),
        founder: transliterate(base.founder),
        becomeFounder: transliterate(base.becomeFounder),
        orEnterAmount: transliterate(base.orEnterAmount),
        total: transliterate(base.total),
        traditionalMonths: base.traditionalMonths.map(m => ({
          name: transliterate(m.name),
          description: transliterate(m.description)
        })),
        weekdays: base.weekdays.map(transliterate),
        fullWeekdays: base.fullWeekdays.map(transliterate),
      };
    }
    return base;
  }, [language]);

  const getSerbianYear = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth(); 
    const day = date.getDate();
    if (month > 8 || (month === 8 && day >= 1)) return year + 5509;
    return year + 5508;
  };

  const getJulianDate = (date: Date) => {
    const julian = new Date(date);
    julian.setDate(date.getDate() - 13);
    return julian;
  };

  const getDayData = (date: Date): DayData => {
    const julian = getJulianDate(date);
    const key = `${String(julian.getMonth() + 1).padStart(2, '0')}-${String(julian.getDate()).padStart(2, '0')}`;
    
    // Merge fetched data with static data (static data takes precedence for bio/historical context)
    const staticData = CALENDAR_DATA[key];
    const dynamicData = fetchedData[key];
    
    const data = { ...dynamicData, ...staticData };
    
    const dayOfWeek = date.getDay();
    let fasting: DayData['fasting'] = data?.fasting || 'none';
    if (fasting === 'none' && (dayOfWeek === 3 || dayOfWeek === 5)) {
      fasting = 'regular';
    }

    return {
      saints: data?.saints || [{ name: language === 'en' ? "Saint of the day" : "Svetitelj dana", bio: language === 'en' ? "Biography in preparation..." : "Biografija u pripremi..." }],
      feast: data?.feast,
      fasting,
      fastingDescription: data?.fastingDescription || (fasting !== 'none' ? (language === 'en' ? "Fasting day" : "Posni dan") : undefined)
    };
  };

  const currentSerbianYear = getSerbianYear(viewDate);
  const selectedDayData = getDayData(selectedDate);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

  const monthDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    const totalDays = daysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(new Date(year, month, i));
    return days;
  }, [viewDate]);

  const handleDonationSelect = (amount: number) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    const num = parseFloat(val);
    if (!isNaN(num) && num > 0) {
      setDonationAmount(num);
    } else {
      setDonationAmount(0);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-byz-bg)] text-[var(--color-byz-gold)] font-serif flex justify-center py-8 px-4">
      <div className="w-full max-w-md relative">
        
        {/* Language Selector */}
        <div className="flex justify-center gap-2 mb-8 relative z-10">
          {(['en', 'sr-Latn', 'sr-Cyrl'] as Language[]).map((lang) => {
            const label = lang === 'en' ? 'EN' : lang === 'sr-Latn' ? 'LAT' : 'ЋИР';
            const isActive = language === lang;
            return (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-1 text-xs tracking-widest border transition-all ${
                  isActive 
                    ? 'border-[var(--color-byz-gold)] bg-[var(--color-byz-gold-dim)] text-[var(--color-byz-gold)]' 
                    : 'border-[var(--color-byz-gold-dim)] text-[var(--color-byz-gold-muted)] hover:border-[var(--color-byz-gold-muted)]'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Header Section */}
        <div className="text-center mb-8 relative">
          <CornerTL />
          <CornerTR />
          
          <div className="flex justify-center mb-4">
            <StarIcon />
          </div>
          
          <h2 className="text-xs tracking-[0.3em] mb-2 text-[var(--color-byz-gold-muted)]">
            {t.title}
          </h2>
          <h3 className="text-lg italic mb-2 text-[var(--color-byz-gold)]">
            {t.subtitle}
          </h3>
          <h1 className="text-7xl font-bold mb-4 text-[var(--color-byz-gold)] tracking-tight">
            {currentSerbianYear}
          </h1>
          <p className="text-[10px] tracking-[0.2em] text-[var(--color-byz-gold-muted)] uppercase">
            {t.creation}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] w-16 bg-[var(--color-byz-gold-dim)]"></div>
          <StarIcon />
          <div className="h-[1px] w-16 bg-[var(--color-byz-gold-dim)]"></div>
        </div>

        {/* Month Selector */}
        <div className="flex items-center justify-between mb-8 px-4">
          <button 
            onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
            className="p-3 border border-[var(--color-byz-gold-dim)] rounded hover:bg-[var(--color-byz-gold-dim)] transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-[var(--color-byz-gold-muted)]" />
          </button>
          
          <div className="text-center">
            <h2 className="text-4xl font-medium mb-1">
              {t.traditionalMonths[viewDate.getMonth()].name}
            </h2>
            <p className="text-[10px] tracking-[0.2em] text-[var(--color-byz-gold-muted)] uppercase mb-1">
              {t.traditionalMonths[viewDate.getMonth()].description}
            </p>
            <p className="text-xs text-[var(--color-byz-gold-muted)]">
              {viewDate.getFullYear()}
            </p>
          </div>

          <button 
            onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
            className="p-3 border border-[var(--color-byz-gold-dim)] rounded hover:bg-[var(--color-byz-gold-dim)] transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-[var(--color-byz-gold-muted)]" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-7 gap-1 mb-2 border-b border-[var(--color-byz-gold-dim)] pb-2">
            {t.weekdays.map((d, i) => (
              <div key={i} className={`text-center text-xs font-bold ${i === 0 ? 'text-[var(--color-byz-red)]' : 'text-[var(--color-byz-gold-muted)]'}`}>
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {monthDays.map((date, i) => {
              if (!date) return <div key={i} className="aspect-square" />;
              
              const isSelected = selectedDate.toDateString() === date.toDateString();
              const isToday = new Date().toDateString() === date.toDateString();
              const isSunday = date.getDay() === 0;
              
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={`
                    aspect-square flex flex-col items-center justify-center relative transition-all
                    ${isSelected ? 'bg-[var(--color-byz-gold-dim)] border border-[var(--color-byz-gold)]' : 'hover:bg-[var(--color-byz-surface)] border border-transparent'}
                    ${isSunday && !isSelected ? 'text-[var(--color-byz-red)]' : ''}
                  `}
                >
                  <span className="text-lg">{date.getDate()}</span>
                  {isToday && (
                    <div className="absolute bottom-2 w-1 h-1 rounded-full bg-[var(--color-byz-gold)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Day Info */}
        <div className="border border-[var(--color-byz-gold-dim)] p-6 mb-6 relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] tracking-[0.2em] text-[var(--color-byz-gold-muted)] uppercase mb-2">
                {t.selectedDay}
              </p>
              <h3 className="text-2xl font-medium mb-1">
                {selectedDate.getDate()}. {t.traditionalMonths[selectedDate.getMonth()].name}
              </h3>
              <p className="text-sm text-[var(--color-byz-gold-muted)]">
                {t.fullWeekdays[selectedDate.getDay()]}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-[0.2em] text-[var(--color-byz-gold-muted)] uppercase mb-2">
                {t.byzantineEra}
              </p>
              <h3 className="text-2xl font-medium">
                {selectedDate.getFullYear()}
              </h3>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--color-byz-gold-dim)]">
            {selectedDayData.feast && (
              <p className="text-lg font-medium text-[var(--color-byz-red)] mb-2">
                {language === 'sr-Cyrl' ? transliterate(selectedDayData.feast) : selectedDayData.feast}
              </p>
            )}
            {selectedDayData.fastingDescription && (
              <p className="text-sm text-[var(--color-byz-gold-muted)] mb-4 italic">
                {language === 'sr-Cyrl' ? transliterate(selectedDayData.fastingDescription) : selectedDayData.fastingDescription}
              </p>
            )}
            <h4 className="text-[10px] tracking-[0.2em] text-[var(--color-byz-gold-muted)] uppercase mb-3">
              {language === 'en' ? 'Saints of the Day' : (language === 'sr-Cyrl' ? transliterate('Svetitelji Dana') : 'Svetitelji Dana')}
            </h4>
            <div className="space-y-3">
              {selectedDayData.saints.map((saint, idx) => (
                <div key={idx}>
                  <p className="font-medium text-[var(--color-byz-gold)]">
                    {language === 'sr-Cyrl' ? transliterate(saint.name) : saint.name}
                    {saint.title && (
                      <span className="text-[var(--color-byz-gold-muted)] text-sm ml-1">
                        ({language === 'sr-Cyrl' ? transliterate(saint.title) : saint.title})
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Accordion */}
        <div className="border border-[var(--color-byz-gold-dim)] mb-4">
          <button 
            onClick={() => setShowAbout(!showAbout)}
            className="w-full p-4 flex items-center justify-center gap-2 text-xs tracking-[0.2em] text-[var(--color-byz-gold-muted)] uppercase hover:bg-[var(--color-byz-surface)] transition-colors"
          >
            <span className="text-[8px]">{showAbout ? '▼' : '▲'}</span> {t.aboutCalendar}
          </button>
          <AnimatePresence>
            {showAbout && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 space-y-4 text-sm leading-relaxed text-[var(--color-byz-gold-muted)]">
                  {t.aboutText.map((text, i) => (
                    <p key={i} className={i === t.aboutText.length - 1 ? 'italic text-xs mt-6' : ''}>{text}</p>
                  ))}
                  
                  <div className="mt-6 p-4 border border-[var(--color-byz-gold-dim)] bg-[var(--color-byz-surface)] rounded-sm">
                    <h4 className="text-[var(--color-byz-gold)] font-medium mb-2">{t.highlightBoxTitle}</h4>
                    <p className="text-sm leading-relaxed text-[var(--color-byz-gold)]">{t.highlightBoxText}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Historical Context Accordion */}
        <div className="border border-[var(--color-byz-gold-dim)] mb-12">
          <button 
            onClick={() => setShowHistoricalContext(!showHistoricalContext)}
            className="w-full p-4 flex items-center justify-center gap-2 text-xs tracking-[0.2em] text-[var(--color-byz-gold-muted)] uppercase hover:bg-[var(--color-byz-surface)] transition-colors"
          >
            <span className="text-[8px]">{showHistoricalContext ? '▼' : '▲'}</span> {t.historicalContextTitle}
          </button>
          <AnimatePresence>
            {showHistoricalContext && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 space-y-4 text-sm leading-relaxed text-[var(--color-byz-gold-muted)]">
                  {t.historicalContextText.map((text, i) => (
                    <p key={i}>{text}</p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-[1px] w-16 bg-[var(--color-byz-gold-dim)]"></div>
          <StarIcon />
          <div className="h-[1px] w-16 bg-[var(--color-byz-gold-dim)]"></div>
        </div>

        {/* Donation Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-medium italic mb-2">{t.donationTitle}</h2>
            <p className="text-sm text-[var(--color-byz-gold-muted)]">{t.donationSubtitle}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {[
              { amount: 1, icon: '🕯️', title: t.candle, desc: t.lightCandle },
              { amount: 3, icon: '🍞', title: t.bread, desc: t.offerBread },
              { amount: 5, icon: '✝️', title: t.contribution, desc: t.memorial },
              { amount: 10, icon: '⛪', title: t.founder, desc: t.becomeFounder },
            ].map((item) => (
              <button
                key={item.amount}
                onClick={() => handleDonationSelect(item.amount)}
                className={`p-6 border flex flex-col items-center justify-center text-center transition-all ${
                  donationAmount === item.amount && !customAmount
                    ? 'border-[var(--color-byz-gold)] bg-[var(--color-byz-gold-dim)]'
                    : 'border-[var(--color-byz-gold-dim)] bg-[var(--color-byz-surface)] hover:border-[var(--color-byz-gold-muted)]'
                }`}
              >
                <span className="text-2xl mb-2">{item.icon}</span>
                <span className="text-xl font-bold mb-1">${item.amount}</span>
                <span className="text-sm italic mb-1">{item.title}</span>
                <span className="text-[10px] text-[var(--color-byz-gold-muted)]">{item.desc}</span>
              </button>
            ))}
          </div>

          <div className="mb-6">
            <label className="block text-[10px] tracking-[0.2em] text-[var(--color-byz-gold-muted)] uppercase mb-2">
              {t.orEnterAmount}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-byz-gold)]">$</span>
              <input
                type="number"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="0.00"
                className="w-full bg-[var(--color-byz-surface)] border border-[var(--color-byz-gold-dim)] rounded-none p-4 pl-8 text-[var(--color-byz-gold)] focus:outline-none focus:border-[var(--color-byz-gold)] transition-colors"
              />
            </div>
          </div>

          <div className="flex justify-between items-center p-4 border border-[var(--color-byz-gold-dim)] bg-[var(--color-byz-surface)] mb-6">
            <span className="text-xs tracking-[0.2em] text-[var(--color-byz-gold-muted)] uppercase">{t.total}</span>
            <span className="text-2xl font-bold">${donationAmount || 0}</span>
          </div>

          <div className="space-y-3">
            <a 
              href="https://ko-fi.com/dulemilo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[var(--color-byz-kofi)] text-white font-sans font-bold tracking-widest py-4 rounded flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <Coffee className="w-4 h-4" /> KO-FI
            </a>
            <a 
              href={`https://www.paypal.com/paypalme/dusanmilosavljevic36/${donationAmount || 0}USD`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[var(--color-byz-paypal)] text-white font-sans font-bold tracking-widest py-4 rounded flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <span className="font-serif italic font-bold text-lg leading-none mr-1">P</span> PAYPAL
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
