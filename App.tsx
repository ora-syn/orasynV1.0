import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Cpu, 
  LineChart, 
  Zap, 
  Menu, 
  X,
  Layers,
  Lock,
  TrendingUp,
  Link as LinkIcon,
  Settings2,
  PlayCircle,
  Check,
  Clock,
  Users
} from 'lucide-react';

// --- Components ---

/**
 * Logo Component for Footer/Icons where the image isn't used
 */
const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * Navigation Bar
 * Sticky, exactly 80px height, premium backdrop blur.
 * Layout: Logo Left, Links Center, Actions Right
 */
const Navbar = ({ onOpenWaitlist }: { onOpenWaitlist: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Updated link logic to map German text to English IDs
  const navLinks = [
    { label: 'Funktionen', href: '#features' },
    { label: 'Methode', href: '#method' },
    { label: 'Lösungen', href: '#solutions' },
    { label: 'Preise', href: '#pricing' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 h-[80px] flex items-center border-b ${isScrolled ? 'bg-white/80 border-gray-200 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60' : 'bg-white/0 border-transparent'}`}>
      <div className="max-w-[1400px] mx-auto px-6 w-full h-full flex items-center justify-between relative">
        
        {/* Left: Logo Group */}
        <div className="flex items-center gap-3 z-20 relative">
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src="https://github.com/ora-syn/orasynV1.0/blob/main/logo-neu-cut.png.png?raw=true" 
              alt="ORASYN Logo" 
              className="h-[60px] w-auto object-contain" 
            />
          </a>
        </div>

        {/* Center: Links (Absolutely Centered) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center gap-1">
          {navLinks.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-lg font-semibold text-gray-500 transition-colors hover:text-black px-4 py-2 rounded-full duration-200"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-3 z-20 relative">
          <motion.button 
            onClick={onOpenWaitlist}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white text-lg font-semibold px-6 py-2 rounded-xl hover:bg-gray-800 transition-all hover:shadow-lg shadow-purple-500/10"
          >
            Starten
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-600 z-20 ml-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-[80px] left-0 w-full bg-white border-b border-gray-100 shadow-xl md:hidden overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {navLinks.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  className="text-lg font-medium text-gray-700 py-2 border-b border-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenWaitlist();
                  }}
                  className="w-full bg-black text-white py-3 rounded-md font-medium text-center"
                >
                  Starten
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/**
 * Feature Card
 */
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md transition-all duration-300"
  >
    <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-900 mb-6 shadow-sm">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-2">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
  </motion.div>
);

/**
 * Method Step Card
 */
const MethodStep = ({ icon, title, description, step }: { icon: React.ReactNode, title: string, description: string, step: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: step * 0.2 }}
    whileHover={{ y: -5 }}
    className="flex flex-col gap-4 relative"
  >
    <div className="flex items-center gap-4 mb-2">
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-900 border border-gray-200 shadow-sm z-10">
        {icon}
      </div>
      <div className="h-[1px] bg-gray-200 flex-1 hidden md:block"></div>
    </div>
    <div className="pr-8">
      <h4 className="text-xl font-bold text-gray-900 tracking-tight mb-2">{title}</h4>
      <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
    </div>
  </motion.div>
);

/**
 * Calendar / Scheduling Agent Mockup
 */
const CalendarMockup = () => {
  // Config: 07:00 to 16:00
  const START_HOUR = 7;
  const HOURS_COUNT = 10; 
  const HOUR_HEIGHT = 60; // px
  const OFFSET_TOP = 40; // Equivalent to pt-10

  // 1. Array of hours for rendering the sidebar and lines
  const hours = Array.from({ length: HOURS_COUNT }, (_, i) => START_HOUR + i);

  // Helper for absolute positioning with offset
  const getEventStyle = (startHour: number, duration: number) => {
    const top = (startHour - START_HOUR) * HOUR_HEIGHT + OFFSET_TOP;
    const height = duration * HOUR_HEIGHT;
    return { top: `${top}px`, height: `${height}px` };
  };

  // Total container height to ensure clean bottom border at 16:00
  // (9 slots * 60) + 40px padding = 580px
  const totalHeight = (HOURS_COUNT - 1) * HOUR_HEIGHT + OFFSET_TOP;

  return (
    <div className="relative w-full max-w-5xl mx-auto perspective-1000">
      <motion.div 
        initial={{ opacity: 0, rotateX: 10, y: 50 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="relative bg-white rounded-xl border border-gray-200 shadow-float flex flex-col overflow-x-auto pb-4"
      >
        {/* --- HEADER --- */}
        <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white rounded-t-xl z-20 relative min-w-[800px]">
          <div className="flex items-center gap-4">
             <span className="font-bold text-lg text-gray-900">Dezember 2025</span>
             <div className="flex bg-gray-50 p-1 rounded-md gap-1">
                <button className="p-1 hover:bg-gray-200 rounded text-gray-500"><ArrowRight size={14} className="rotate-180"/></button>
                <button className="p-1 hover:bg-gray-200 rounded text-gray-500"><ArrowRight size={14} /></button>
             </div>
             <span className="text-sm font-medium text-gray-400">Heute</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex -space-x-2">
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                    {String.fromCharCode(64+i)}
                 </div>
               ))}
             </div>
             <div className="h-5 w-[1px] bg-gray-200"></div>
             <div className="flex gap-3 text-sm font-medium text-gray-500">
               <span className="text-gray-900 cursor-pointer">Woche</span>
               <span className="cursor-pointer hover:text-gray-900">Monat</span>
             </div>
          </div>
        </div>

        {/* --- DAY HEADERS --- */}
        <div className="h-10 border-b border-gray-100 bg-gray-50/50 flex min-w-[800px]">
           <div className="w-16 border-r border-gray-100 flex-shrink-0"></div>
           <div className="flex-1 grid grid-cols-5">
              {['Mo 08', 'Di 09', 'Mi 10', 'Do 11', 'Fr 12'].map(d => (
                <div key={d} className="flex items-center justify-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {d}
                </div>
              ))}
           </div>
        </div>

        {/* --- MAIN GRID --- */}
        <div 
           className="relative flex bg-white border-b border-gray-200 rounded-b-xl min-w-[800px]"
           style={{ height: `${totalHeight}px` }}
        >
           {/* Sidebar Times */}
           <div className="w-16 flex-shrink-0 border-r border-gray-100 pt-10 text-center relative">
              {hours.map((h, i) => (
                <div key={h} className="absolute w-full" style={{ top: `${i * HOUR_HEIGHT + OFFSET_TOP}px`, transform: 'translateY(-50%)' }}>
                   {h !== 16 && (
                     <span className="text-xs text-gray-400 font-medium bg-white px-1 relative z-10">{h.toString().padStart(2,'0')}:00</span>
                   )}
                </div>
              ))}
           </div>

           {/* Grid Body */}
           <div className="flex-1 relative pt-10">
              
              {/* Horizontal Lines */}
              {hours.map((h, i) => (
                <div 
                   key={h} 
                   className="absolute left-0 right-0 h-[1px] bg-gray-50"
                   style={{ top: `${i * HOUR_HEIGHT + OFFSET_TOP}px` }}
                ></div>
              ))}

              {/* Vertical Lines */}
              <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
                 {[0,1,2,3,4].map(col => (
                   <div key={col} className="border-r border-gray-50 h-full"></div>
                 ))}
              </div>

              {/* EVENTS LAYER */}
              <div className="absolute inset-0 grid grid-cols-5 h-full">
                 
                 {/* 1. MONDAY EVENT */}
                 <div className="relative h-full w-full">
                    <div 
                       className="absolute left-1 right-1 bg-gray-50 border-l-4 border-gray-400 rounded-r-md p-2 flex flex-col justify-start overflow-hidden shadow-sm"
                       style={getEventStyle(12, 1.5)} // 12:00 - 13:30
                    >
                       <p className="text-xs font-bold text-gray-900 leading-tight whitespace-normal">
                         Seminar: Künstliche Intelligenz & Marketing
                       </p>
                       <p className="text-[10px] text-gray-500 mt-1">12:00 - 13:30</p>
                    </div>
                 </div>

                 {/* 2. TUESDAY EVENT */}
                 <div className="relative h-full w-full">
                    <div 
                       className="absolute left-1 right-1 bg-slate-900 text-white rounded-md p-2 flex flex-col justify-center shadow-lg group"
                       style={getEventStyle(9, 2)} // 09:00 - 11:00
                    >
                       <div className="absolute top-2 right-2 text-yellow-400">
                          <Zap size={12} fill="currentColor" />
                       </div>
                       <p className="text-xs font-bold">Deep Work</p>
                       <p className="text-[10px] text-gray-400 mt-0.5">Keine Meetings</p>
                    </div>
                 </div>

                 {/* 3. WEDNESDAY (Empty) */}
                 <div className="relative h-full w-full"></div>

                 {/* 4. THURSDAY EVENT + POPUP */}
                 <div className="relative h-full w-full overflow-visible">
                    <div 
                       className="absolute left-1 right-1 bg-red-50 border-l-4 border-red-200 rounded-r-md p-2 flex flex-col justify-center shadow-sm overflow-visible"
                       style={getEventStyle(10, 1)} // 10:00 - 11:00
                    >
                       <p className="text-xs font-bold text-gray-800 leading-tight">
                         Meeting Marketingaktivitäten Q1 2026
                       </p>
                       <p className="text-[10px] text-red-400 mt-1">10:00 - 11:00</p>

                       {/* CRITICAL POPUP */}
                       <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ 
                             opacity: 1, 
                             scale: 1, 
                             y: [0, -4, 0] 
                          }}
                          transition={{ 
                             opacity: { duration: 0.4, delay: 0.5 },
                             scale: { duration: 0.4, delay: 0.5 },
                             y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
                          }}
                          className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-100 p-4 z-50"
                       >
                          <div className="flex items-center gap-2 mb-2">
                             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                             <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
                                ORASYN | AKTIVE INTERVENTION
                             </span>
                          </div>
                          <p className="text-xs text-gray-800 leading-relaxed">
                             <span className="font-bold">Konflikt erkannt:</span> Der Termin <span className="italic">Meeting Marketingaktivitäten Q1 2026</span> wird bei Bestätigung auf 14:00 Uhr verschoben, um Ihre Fokuszeit 9-11 Uhr zu schützen.
                          </p>
                       </motion.div>
                    </div>
                 </div>

                 {/* 5. FRIDAY (Empty) */}
                 <div className="relative h-full w-full"></div>

              </div>
           </div>
        </div>

      </motion.div>
    </div>
  );
}

// --- Form Modals ---

const FormModal = ({ type, onClose }: { type: 'waitlist' | 'sales', onClose: () => void }) => {
  const isSales = type === 'sales';
  const title = isSales ? "Direkter Kontakt zum Enterprise-Team" : "Ihr Antrag auf Pilot-Zugang";
  const btnText = isSales ? "Senden & Validieren" : "Zugriff anfordern";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending with a slight delay for better UX
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-8 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100/50"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6 pr-8 tracking-tight">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Name</label>
            <input 
              type="text" 
              required
              placeholder={isSales ? "Max Mustermann" : "Ihr vollständiger Name"}
              className="w-full bg-gray-50/50 border border-gray-100 focus:border-gray-300 rounded-lg px-4 py-3 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:shadow-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">E-Mail</label>
            <input 
              type="email" 
              required
              placeholder="max@firma.de"
              className="w-full bg-gray-50/50 border border-gray-100 focus:border-gray-300 rounded-lg px-4 py-3 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:shadow-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">Firma</label>
            <input 
              type="text" 
              required
              placeholder="Unternehmen GmbH"
              className="w-full bg-gray-50/50 border border-gray-100 focus:border-gray-300 rounded-lg px-4 py-3 text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:shadow-sm"
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-black text-white font-bold py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
            >
              {btnText}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// --- Legal Content Data ---

const legalContent: Record<string, { title: string; content: React.ReactNode }> = {
  kontakt: {
    title: "Kontakt",
    content: (
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p className="text-lg">Wir freuen uns, von Ihnen zu hören.</p>
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
          <p className="font-bold text-black mb-2">Support & Vertrieb</p>
          <p>E-Mail: info@orasyn.com</p>
        </div>
        <p>
          Für Presseanfragen oder Partnerschaften wenden Sie sich bitte ebenfalls an die oben genannte Adresse.
          Wir versuchen, alle Anfragen innerhalb von 24 Stunden zu beantworten.
        </p>
      </div>
    )
  },
  datenschutz: {
    title: "Datenschutzerklärung",
    content: (
      <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Datenschutzerklärung</h1>

        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">1. Datenschutz auf einen Blick</h2>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Allgemeine Hinweise</h3>
        <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Datenerfassung auf dieser Website</h3>

        <h4 className="font-bold text-gray-800 mt-4">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
        <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.</p>

        <h4 className="font-bold text-gray-800 mt-4">Wie erfassen wir Ihre Daten?</h4>
        <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
        <p>Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.</p>

        <h4 className="font-bold text-gray-800 mt-4">Wofür nutzen wir Ihre Daten?</h4>
        <p>Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden. Sofern über die Website Verträge geschlossen oder angebahnt werden können, werden die übermittelten Daten auch für Vertragsangebote, Bestellungen oder sonstige Auftragsanfragen verarbeitet.</p>

        <h4 className="font-bold text-gray-800 mt-4">Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
        <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.</p>
        <p>Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Analyse-Tools und Tools von Drittanbietern</h3>
        <p>Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen.</p>
        <p>Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.</p>

        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">2. Hosting und Content Delivery Networks (CDN)</h2>
        <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Amazon Web Services (AWS)</h3>
        <p>Anbieter ist die Amazon Web Services EMEA SARL, 38 Avenue John F. Kennedy, 1855 Luxemburg (nachfolgend AWS).</p>
        <p>Wenn Sie unsere Website besuchen, werden Ihre personenbezogenen Daten auf den Servern von AWS verarbeitet. Hierbei können auch personenbezogene Daten an das Mutterunternehmen von AWS in die USA übermittelt werden. Die Datenübertragung in die USA wird auf die EU-Standardvertragsklauseln gestützt. Details finden Sie hier: <a href="https://aws.amazon.com/de/blogs/security/aws-gdpr-data-processing-addendum/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">AWS GDPR Data Processing Addendum</a>.</p>
        <p>Weitere Informationen entnehmen Sie der Datenschutzerklärung von AWS: <a href="https://aws.amazon.com/de/privacy/?nc1=f_pr" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">AWS Privacy</a>.</p>
        <p>Die Verwendung von AWS erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.</p>
        <p>Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework“ (DPF). Der DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, der die Einhaltung europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll. Jedes nach dem DPF zertifizierte Unternehmen verpflichtet sich, diese Datenschutzstandards einzuhalten. Weitere Informationen hierzu erhalten Sie vom Anbieter unter folgendem Link: <a href="https://www.dataprivacyframework.gov/participant/5776" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">DPF Participant</a>.</p>

        <h4 className="font-bold text-gray-800 mt-4">Auftragsverarbeitung</h4>
        <p>Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Google Cloud CDN</h3>
        <p>Wir nutzen das Content Delivery Network Google Cloud CDN. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.</p>
        <p>Google bietet ein weltweit verteiltes Content Delivery Network an. Dabei wird technisch der Informationstransfer zwischen Ihrem Browser und unserer Website über das Netzwerk von Google geleitet. Hierdurch können wir die weltweite Erreichbarkeit und die Leistungsfähigkeit unserer Website erhöhen.</p>
        <p>Der Einsatz von Google Cloud CDN beruht auf unserem berechtigten Interesse an einer möglichst fehlerfreien und sicheren Bereitstellung unseres Webangebotes (Art. 6 Abs. 1 lit. f DSGVO).</p>
        <p>Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: <a href="https://cloud.google.com/terms/eu-model-contract-clause" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Google Cloud Terms</a>.</p>
        <p>Weitere Informationen zu Google Cloud CDN finden Sie hier: <a href="https://cloud.google.com/cdn/docs/overview?hl=de" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Google Cloud CDN Overview</a>.</p>
        <p>Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework“ (DPF). Der DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, der die Einhaltung europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll. Jedes nach dem DPF zertifizierte Unternehmen verpflichtet sich, diese Datenschutzstandards einzuhalten. Weitere Informationen hierzu erhalten Sie vom Anbieter unter folgendem Link: <a href="https://www.dataprivacyframework.gov/participant/5780" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">DPF Participant</a>.</p>

        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Datenschutz</h3>
        <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
        <p>Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.</p>
        <p>Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Hinweis zur verantwortlichen Stelle</h3>
        <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
        <div className="p-4 my-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="font-bold">Samuele Francesco Franzé (Orasyn)</p>
            <p>c/o flexdienst - #12205</p>
            <p>Kurt-Schumacher-Straße 76</p>
            <p>67663 Kaiserslautern</p>
            <p>Deutschland</p>
            <br />
            <p>Telefon: +49 (0) 176 42720313</p>
            <p>E-Mail: info@orasyn.de</p>
        </div>
        <p>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Speicherdauer</h3>
        <p>Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
        <p>Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Empfänger von personenbezogenen Daten</h3>
        <p>Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung geschlossen.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
        <p>Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
        <p>WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).</p>
        <p>WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
        <p>Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Recht auf Datenübertragbarkeit</h3>
        <p>Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Auskunft, Berichtigung und Löschung</h3>
        <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Recht auf Einschränkung der Verarbeitung</h3>
        <p>Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:</p>
        <ul className="list-disc pl-5 space-y-1">
            <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
            <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.</li>
            <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
            <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
        </ul>
        <p>Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">SSL- bzw. TLS-Verschlüsselung</h3>
        <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
        <p>Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Verschlüsselter Zahlungsverkehr auf dieser Website</h3>
        <p>Besteht nach dem Abschluss eines kostenpflichtigen Vertrags eine Verpflichtung, uns Ihre Zahlungsdaten (z. B. Kontonummer bei Einzugsermächtigung) zu übermitteln, werden diese Daten zur Zahlungsabwicklung benötigt.</p>
        <p>Der Zahlungsverkehr über die gängigen Zahlungsmittel (Visa/MasterCard, Lastschriftverfahren) erfolgt ausschließlich über eine verschlüsselte SSL- bzw. TLS-Verbindung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
        <p>Bei verschlüsselter Kommunikation können Ihre Zahlungsdaten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Widerspruch gegen Werbe-E-Mails</h3>
        <p>Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.</p>

        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">4. Datenerfassung auf dieser Website</h2>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Cookies</h3>
        <p>Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Datenpakete und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.</p>
        <p>Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog. Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung von Zahlungsdienstleistungen).</p>
        <p>Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte Webseitenfunktionen ohne diese nicht funktionieren würden (z. B. die Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies können zur Auswertung des Nutzerverhaltens oder zu Werbezwecken verwendet werden.</p>
        <p>Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs, zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z. B. für die Warenkorbfunktion) oder zur Optimierung der Website (z. B. Cookies zur Messung des Webpublikums) erforderlich sind (notwendige Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von notwendigen Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies und vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG); die Einwilligung ist jederzeit widerrufbar.</p>
        <p>Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.</p>
        <p>Welche Cookies und Dienste auf dieser Website eingesetzt werden, können Sie dieser Datenschutzerklärung entnehmen.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Server-Log-Dateien</h3>
        <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
        <ul className="list-disc pl-5 space-y-1">
            <li>Browsertyp und Browserversion</li>
            <li>verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
        </ul>
        <p>Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
        <p>Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Kontaktformular</h3>
        <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
        <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.</p>
        <p>Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Einsatz von KI auf der Website</h3>
        <p>Wir nutzen KI-gestützte Dienste und / oder Anwendungen auf unserer Website.</p>
        <p>Wir setzen Künstliche Intelligenz (KI) auf unserer Website wie folgt ein:</p>
        <p>Der Einsatz erfolgt zur Optimierung der Produktivität und des Zeitmanagements unserer B2B-Kunden. Die Künstliche Intelligenz (KI) wird zur Analyse der Kalenderdaten der Nutzer verwendet, um Terminkonflikte, Prioritäten und Meetings proaktiv zu erkennen und automatisch zu verwalten bzw. in optimalere Zeitfenster zu verschieben.</p>
        <p>Wenn Sie auf unserer Website mit Elementen interagieren oder in Berührung kommen, in denen künstliche Intelligenz zu Einsatz kommt (z. B. Chatbot), werden Ihre Eingaben inklusive Metadaten verarbeitet, um eine passende Antwort oder Reaktion zu generieren.</p>
        <p>Die Nutzung dieser KI-gestützten Funktionen erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse daran, moderne Technologien auf unserer Website einzusetzen, um unsere Leistungen und Services zu verbessern und um neue Potenziale aus der Interaktion mit unseren Kunden zu erkennen. Falls eine Einwilligung erforderlich ist, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Ihre Einwilligung können Sie jederzeit widerrufen.</p>
        <p>Weitere Informationen zur Datenverarbeitung dieses Tools oder Dienstes erhalten Sie an der entsprechenden Stelle in dieser Datenschutzerklärung.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Einsatz von Künstlicher Intelligenz (KI) zur Beantwortung von Kundenanfragen</h3>
        <p>Wir setzen KI-gestützte Software zur Bearbeitung und Beantwortung von Kundenanfragen ein. Dabei analysiert die von uns eingesetzte KI den Inhalt Ihrer Nachricht, um autonom oder teilweise autonom eine passende Antwort bzw. einen Antwortvorschlag zu generieren. In diesem Zusammenhang verarbeitet unsere KI sämtliche Inhalte Ihrer Nachricht, inklusive Namen, E-Mail-Adressen, Kommunikationsinhalte oder technische Informationen (z. B. IP-Adressen, Geräteinformationen).</p>
        <p>Die Verwendung der eingesetzten KI-Software erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst effizienten Kundenkommunikation unter Einsatz moderner technischer Lösungen.</p>
        <p>Wir setzen folgende KI-Anwendungen ein:</p>

        <h4 className="font-bold text-gray-800 mt-4">Google Gemini (oder Google Cloud AI)</h4>
        <p>Wir nutzen Google Gemini (oder Google Cloud AI) für unsere Kundenkommunikation. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Wenn Sie also Kontakt zu uns aufnehmen, können Ihre Anfragen inklusive Metadaten an die Server dieses Anbieters übertragen und dort verarbeitet werden, um eine passende Antwort zu generieren.</p>
        <p><strong>Auftragsverarbeitung:</strong> Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Anfrage per E-Mail, Telefon oder Telefax</h3>
        <p>Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
        <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.</p>
        <p>Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Google Calendar</h3>
        <p>Auf unserer Website haben Sie die Möglichkeit, Termine mit uns zu vereinbaren. Für die Planung nutzen wir Google Calendar. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland (nachfolgend „Google“).</p>
        <p>Zum Zweck der Terminbuchung geben Sie die abgefragten Daten und den Wunschtermin in die dafür vorgesehene Maske ein. Die eingegebenen Daten werden für die Planung, Durchführung und ggf. für die Nachbereitung des Termins verwendet. Die Termindaten werden für uns auf den Servern von Google Calendar gespeichert, dessen Datenschutzerklärung Sie hier einsehen können: <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Google Privacy</a>.</p>
        <p>Die von Ihnen eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.</p>
        <p>Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an einer möglichst unkomplizierten Terminvereinbarung mit Interessenten und Kunden. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. für Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.</p>
        <p>Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: <a href="https://workspace.google.com/terms/dpa_terms.html" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Google Workspace DPA</a> und hier <a href="https://cloud.google.com/terms/sccs" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Google Cloud SCCs</a>.</p>
        <p>Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework“ (DPF). Der DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, der die Einhaltung europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll. Jedes nach dem DPF zertifizierte Unternehmen verpflichtet sich, diese Datenschutzstandards einzuhalten. Weitere Informationen hierzu erhalten Sie vom Anbieter unter folgendem Link: <a href="https://www.dataprivacyframework.gov/participant/5780" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">DPF Participant</a>.</p>
        <p><strong>Auftragsverarbeitung:</strong> Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Microsoft Bookings</h3>
        <p>Auf unserer Website haben Sie die Möglichkeit, Termine mit uns zu vereinbaren. Für die Terminbuchung nutzen wir Microsoft Bookings. Anbieter ist die Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Irland, <a href="https://learn.microsoft.com/de-de/microsoft-365/bookings/?view=o365-worldwide" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Microsoft Bookings</a>.</p>
        <p>Zum Zweck der Terminbuchung geben Sie die abgefragten Daten und den Wunschtermin in die dafür vorgesehene Maske ein. Die eingegebenen Daten werden für die Planung, Durchführung und ggf. für die Nachbereitung des Termins verwendet. Die Termindaten werden für uns auf den Servern von Microsoft Bookings gespeichert, dessen Datenschutzerklärung Sie hier einsehen können: <a href="https://privacy.microsoft.com/de-de/privacystatement" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Microsoft Privacy Statement</a>.</p>
        <p>Die von Ihnen eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.</p>
        <p>Rechtsgrundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an einer möglichst unkomplizierten Terminvereinbarung mit Interessenten und Kunden. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. für Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.</p>
        <p>Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: <a href="https://learn.microsoft.com/de-de/compliance/regulatory/offering-eu-model-clauses" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Microsoft EU Model Clauses</a>.</p>
        <p>Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework“ (DPF). Der DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, der die Einhaltung europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll. Jedes nach dem DPF zertifizierte Unternehmen verpflichtet sich, diese Datenschutzstandards einzuhalten. Weitere Informationen hierzu erhalten Sie vom Anbieter unter folgendem Link: <a href="https://www.dataprivacyframework.gov/participant/6474" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">DPF Participant</a>.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Registrierung auf dieser Website</h3>
        <p>Sie können sich auf dieser Website registrieren, um zusätzliche Funktionen auf der Seite zu nutzen. Die dazu eingegebenen Daten verwenden wir nur zum Zwecke der Nutzung des jeweiligen Angebotes oder Dienstes, für den Sie sich registriert haben. Die bei der Registrierung abgefragten Pflichtangaben müssen vollständig angegeben werden. Anderenfalls werden wir die Registrierung ablehnen.</p>
        <p>Für wichtige Änderungen etwa beim Angebotsumfang oder bei technisch notwendigen Änderungen nutzen wir die bei der Registrierung angegebene E-Mail-Adresse, um Sie auf diesem Wege zu informieren.</p>
        <p>Die Verarbeitung der bei der Registrierung eingegebenen Daten erfolgt zum Zwecke der Durchführung des durch die Registrierung begründeten Nutzungsverhältnisses und ggf. zur Anbahnung weiterer Verträge (Art. 6 Abs. 1 lit. b DSGVO).</p>
        <p>Die bei der Registrierung erfassten Daten werden von uns gespeichert, solange Sie auf dieser Website registriert sind und werden anschließend gelöscht. Gesetzliche Aufbewahrungsfristen bleiben unberührt.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Registrierung mit Google</h3>
        <p>Statt einer direkten Registrierung auf dieser Website können Sie sich mit Google registrieren. Anbieter dieses Dienstes ist die Google Ireland Limited („Google”), Gordon House, Barrow Street, Dublin 4, Irland.</p>
        <p>Um sich mit Google zu registrieren, müssen Sie ausschließlich Ihre Google-Namen und Ihr Passwort eingeben. Google wird Sie identifizieren und unserer Website Ihre Identität bestätigen.</p>
        <p>Wenn Sie sich mit Google anmelden, ist es uns ggf. möglich bestimmte Informationen auf Ihrem Konto zu nutzen, um Ihr Profil bei uns zu vervollständigen. Ob und welche Informationen das sind, entscheiden Sie im Rahmen Ihrer Google-Sicherheitseinstellungen, die Sie hier finden: <a href="https://myaccount.google.com/security" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Google Security</a> und <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Google Permissions</a>.</p>
        <p>Die Datenverarbeitung, die mit der Google-Registrierung einhergeht beruht auf unserem berechtigten Interesse, unseren Nutzern einen möglichst einfachen Registrierungsprozess zu ermöglichen (Art. 6 Abs. 1 lit. f DSGVO). Da die Nutzung der Registrierungsfunktion freiwillig ist und die Nutzer selbst über die jeweiligen Zugriffsmöglichkeiten entscheiden können, sind keine entgegenstehenden überwiegenden Rechte der Betroffenen ersichtlich.</p>
        <p>Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework“ (DPF). Der DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, der die Einhaltung europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll. Jedes nach dem DPF zertifizierte Unternehmen verpflichtet sich, diese Datenschutzstandards einzuhalten. Weitere Informationen hierzu erhalten Sie vom Anbieter unter folgendem Link: <a href="https://www.dataprivacyframework.gov/participant/5780" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">DPF Participant</a>.</p>

        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">5. Newsletter</h2>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Newsletterdaten</h3>
        <p>Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind. Weitere Daten werden nicht bzw. nur auf freiwilliger Basis erhoben. Diese Daten verwenden wir ausschließlich für den Versand der angeforderten Informationen und geben diese nicht an Dritte weiter.</p>
        <p>Die Verarbeitung der in das Newsletteranmeldeformular eingegebenen Daten erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Die erteilte Einwilligung zur Speicherung der Daten, der E-Mail-Adresse sowie deren Nutzung zum Versand des Newsletters können Sie jederzeit widerrufen, etwa über den „Austragen“-Link im Newsletter. Die Rechtmäßigkeit der bereits erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.</p>
        <p>Die von Ihnen zum Zwecke des Newsletter-Bezugs bei uns hinterlegten Daten werden von uns bis zu Ihrer Austragung aus dem Newsletter bei uns bzw. dem Newsletterdiensteanbieter gespeichert und nach der Abbestellung des Newsletters oder nach Zweckfortfall aus der Newsletterverteilerliste gelöscht. Wir behalten uns vor, E-Mail-Adressen aus unserem Newsletterverteiler nach eigenem Ermessen im Rahmen unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO zu löschen oder zu sperren.</p>
        <p>Daten, die zu anderen Zwecken bei uns gespeichert wurden, bleiben hiervon unberührt.</p>
        <p>Nach Ihrer Austragung aus der Newsletterverteilerliste wird Ihre E-Mail-Adresse bei uns bzw. dem Newsletterdiensteanbieter ggf. in einer Blacklist gespeichert, sofern dies zur Verhinderung künftiger Mailings erforderlich ist. Die Daten aus der Blacklist werden nur für diesen Zweck verwendet und nicht mit anderen Daten zusammengeführt. Dies dient sowohl Ihrem Interesse als auch unserem Interesse an der Einhaltung der gesetzlichen Vorgaben beim Versand von Newslettern (berechtigtes Interesse im Sinne des Art. 6 Abs. 1 lit. f DSGVO). Die Speicherung in der Blacklist ist zeitlich nicht befristet. <strong>Sie können der Speicherung widersprechen, sofern Ihre Interessen unser berechtigtes Interesse überwiegen.</strong></p>

        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">6. Plugins und Tools</h2>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Google Fonts</h3>
        <p>Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Fonts in ihren Browsercache, um Texte und Schriftarten korrekt anzuzeigen.</p>
        <p>Zu diesem Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern von Google aufnehmen. Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse diese Website aufgerufen wurde. Die Nutzung von Google Fonts erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der einheitlichen Darstellung des Schriftbildes auf seiner Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.</p>
        <p>Wenn Ihr Browser Google Fonts nicht unterstützt, wird eine Standardschrift von Ihrem Computer genutzt.</p>
        <p>Weitere Informationen zu Google Fonts finden Sie unter <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Google Fonts FAQ</a> und in der Datenschutzerklärung von Google: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Google Privacy Policy</a>.</p>
        <p>Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework“ (DPF). Der DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, der die Einhaltung europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll. Jedes nach dem DPF zertifizierte Unternehmen verpflichtet sich, diese Datenschutzstandards einzuhalten. Weitere Informationen hierzu erhalten Sie vom Anbieter unter folgendem Link: <a href="https://www.dataprivacyframework.gov/participant/5780" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">DPF Participant</a>.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Zapier</h3>
        <p>Wir verwenden Zapier. Anbieter ist die Zapier Inc., Market St. #62411, San Francisco, CA 94104-5401, USA (nachfolgend Zapier).</p>
        <p>Zapier ermöglicht es uns, verschiedene Funktionalitäten, Datenbanken und Tools zu verknüpfen und untereinander zu synchronisieren. Auf diese Weise ist es beispielsweise möglich, Inhalte, die wir auf unserer Website veröffentlichen, automatisch auch auf unseren Social-Media-Kanälen auszuspielen oder Inhalte aus Marketing- und Analysetools zu exportieren. Je nach Funktionalität kann hierbei auch Zapier verschiedene personenbezogene Daten erfassen.</p>
        <p>Die Verwendung von Zapier erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst effektiven Integration der genutzten Tools. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.</p>
        <p>Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: <a href="https://zapier.com/tos" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Zapier TOS</a>.</p>
        <p>Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework“ (DPF). Der DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, der die Einhaltung europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll. Jedes nach dem DPF zertifizierte Unternehmen verpflichtet sich, diese Datenschutzstandards einzuhalten. Weitere Informationen hierzu erhalten Sie vom Anbieter unter folgendem Link: <a href="https://www.dataprivacyframework.gov/participant/4425" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">DPF Participant</a>.</p>
        <p><strong>Auftragsverarbeitung:</strong> Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Make.com</h3>
        <p>Diese Website nutzt Make.com, eine cloudbasierte Automatisierungsplattform der Celonis SE, Theresienstraße 6, 80333 München (im Folgenden „Make.com“).</p>
        <p>Make.com dient dazu, automatisierte Workflows („Szenarien“) zwischen verschiedenen Online-Diensten zu erstellen und auszuführen. Im Rahmen der Nutzung von Make.com können personenbezogene Daten verarbeitet werden. Dazu zählen beispielsweise Namen, E-Mail-Adressen, IP-Adressen, Telefonnummern, Adressdaten, Inhalte aus E-Mails oder Formularen, API-Aufrufe sowie Zugriffs- und Authentifizierungsdaten, die im Rahmen der Workflows verarbeitet werden.</p>
        <p>Die Nutzung von Make.com erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse in der effizienten Automatisierung von Geschäftsprozessen. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.</p>
        <p>Weitere Details entnehmen Sie der Datenschutzerklärung von Make.com: <a href="https://www.make.com/en/privacy-notice" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Make.com Privacy Notice</a> sowie <a href="https://www.make.com/en/privacy-and-gdpr" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Make.com GDPR</a>.</p>
        <p><strong>Auftragsverarbeitung:</strong> Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.</p>

        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">7. eCommerce und Zahlungsanbieter</h2>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Verarbeiten von Kunden- und Vertragsdaten</h3>
        <p>Wir erheben, verarbeiten und nutzen personenbezogene Kunden- und Vertragsdaten zur Begründung, inhaltlichen Ausgestaltung und Änderung unserer Vertragsbeziehungen. Personenbezogene Daten über die Inanspruchnahme dieser Website (Nutzungsdaten) erheben, verarbeiten und nutzen wir nur, soweit dies erforderlich ist, um dem Nutzer die Inanspruchnahme des Dienstes zu ermöglichen oder abzurechnen. Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. b DSGVO.</p>
        <p>Die erhobenen Kundendaten werden nach Abschluss des Auftrags oder Beendigung der Geschäftsbeziehung und Ablauf der ggf. bestehenden gesetzlichen Aufbewahrungsfristen gelöscht. Gesetzliche Aufbewahrungsfristen bleiben unberührt.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Datenübermittlung bei Vertragsschluss für Dienstleistungen und digitale Inhalte</h3>
        <p>Wir übermitteln personenbezogene Daten an Dritte nur dann, wenn dies im Rahmen der Vertragsabwicklung notwendig ist, etwa an das mit der Zahlungsabwicklung beauftragte Kreditinstitut.</p>
        <p>Eine weitergehende Übermittlung der Daten erfolgt nicht bzw. nur dann, wenn Sie der Übermittlung ausdrücklich zugestimmt haben. Eine Weitergabe Ihrer Daten an Dritte ohne ausdrückliche Einwilligung, etwa zu Zwecken der Werbung, erfolgt nicht.</p>
        <p>Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Zahlungsdienste</h3>
        <p>Wir binden Zahlungsdienste von Drittunternehmen auf unserer Website ein. Wenn Sie einen Kauf bei uns tätigen, werden Ihre Zahlungsdaten (z. B. Name, Zahlungssumme, Kontoverbindung, Kreditkartennummer) vom Zahlungsdienstleister zum Zwecke der Zahlungsabwicklung verarbeitet. Für diese Transaktionen gelten die jeweiligen Vertrags- und Datenschutzbestimmungen der jeweiligen Anbieter. Der Einsatz der Zahlungsdienstleister erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragsabwicklung) sowie im Interesse eines möglichst reibungslosen, komfortablen und sicheren Zahlungsvorgangs (Art. 6 Abs. 1 lit. f DSGVO). Soweit für bestimmte Handlungen Ihre Einwilligung abgefragt wird, ist Art. 6 Abs. 1 lit. a DSGVO Rechtsgrundlage der Datenverarbeitung; Einwilligungen sind jederzeit für die Zukunft widerrufbar.</p>
        <p>Folgende Zahlungsdienste / Zahlungsdienstleister setzen wir im Rahmen dieser Website ein:</p>

        <h4 className="font-bold text-gray-800 mt-4">PayPal</h4>
        <p>Anbieter dieses Zahlungsdienstes ist PayPal (Europe) S.à.r.l. et Cie, S.C.A., 22-24 Boulevard Royal, L-2449 Luxembourg (im Folgenden „PayPal“).</p>
        <p>Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: <a href="https://www.paypal.com/de/webapps/mpp/ua/pocpsa-full" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">PayPal Legal Agreements</a>.</p>
        <p>Details entnehmen Sie der Datenschutzerklärung von PayPal: <a href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">PayPal Privacy</a>.</p>

        <h4 className="font-bold text-gray-800 mt-4">Stripe</h4>
        <p>Anbieter für Kunden innerhalb der EU ist die Stripe Payments Europe, Ltd.,1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland (im Folgenden „Stripe“).</p>
        <p>Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: <a href="https://stripe.com/de/privacy" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Stripe Privacy</a> und <a href="https://stripe.com/de/guides/general-data-protection-regulation" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Stripe GDPR Guide</a>.</p>
        <p>Details hierzu können Sie in der Datenschutzerklärung von Stripe unter folgendem Link nachlesen: <a href="https://stripe.com/de/privacy" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Stripe Privacy Policy</a>.</p>

        <h4 className="font-bold text-gray-800 mt-4">American Express</h4>
        <p>Anbieter dieses Zahlungsdienstes ist die American Express Europe S.A., Theodor-Heuss-Allee 112, 60486 Frankfurt am Main, Deutschland (im Folgenden „American Express“).<br />
        American Express kann Daten an seine Muttergesellschaft in die USA übermitteln. Die Datenübertragung in die USA wird auf die Binding Corporate Rules gestützt. Details finden Sie hier: <a href="https://www.americanexpress.com/en-cz/company/legal/privacy-centre/binding-corporate-rules/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Amex BCR</a>.</p>
        <p>Weitere Informationen entnehmen Sie der Datenschutzerklärung von American Express: <a href="https://www.americanexpress.com/de-de/firma/legal/datenschutz-center/online-datenschutzerklarung/" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Amex Online Privacy Statement</a>.</p>

        <h4 className="font-bold text-gray-800 mt-4">Mastercard</h4>
        <p>Anbieter dieses Zahlungsdienstes ist die Mastercard Europe SA, Chaussée de Tervuren 198A, B-1410 Waterloo, Belgien (im Folgenden „Mastercard“).<br />
        Mastercard kann Daten an seine Muttergesellschaft in die USA übermitteln. Die Datenübertragung in die USA wird auf die Binding Corporate Rules von Mastercard gestützt. Details finden Sie hier: <a href="https://www.mastercard.de/de-de/datenschutz.html" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Mastercard Privacy</a> und <a href="https://www.mastercard.us/content/dam/mccom/global/documents/mastercard-bcrs.pdf" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Mastercard BCRs</a>.</p>

        <h4 className="font-bold text-gray-800 mt-4">VISA</h4>
        <p>Anbieter dieses Zahlungsdienstes ist die Visa Europe Services Inc., Zweigniederlassung London, 1 Sheldon Square, London W2 6TT, Großbritannien (im Folgenden „VISA“).<br />
        Großbritannien gilt als datenschutzrechtlich sicherer Drittstaat. Das bedeutet, dass Großbritannien ein Datenschutzniveau aufweist, das dem Datenschutzniveau in der Europäischen Union entspricht.<br />
        VISA kann Daten an seine Muttergesellschaft in die USA übertragen. Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: <a href="https://www.visa.de/nutzungsbedingungen/visa-globale-datenschutzmitteilung/mitteilung-zu-zustandigkeitsfragen-fur-den-ewr.html" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">VISA Data Transfer</a>.</p>
        <p>Weitere Informationen entnehmen Sie der Datenschutzerklärung von VISA: <a href="https://www.visa.de/nutzungsbedingungen/visa-privacy-center.html" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">VISA Privacy Center</a>.</p>

        <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">8. Audio- und Videokonferenzen</h2>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Datenverarbeitung</h3>
        <p>Für die Kommunikation mit unseren Kunden setzen wir unter anderen Online-Konferenz-Tools ein. Die im Einzelnen von uns genutzten Tools sind unten aufgelistet. Wenn Sie mit uns per Video- oder Audiokonferenz via Internet kommunizieren, werden Ihre personenbezogenen Daten von uns und dem Anbieter des jeweiligen Konferenz-Tools erfasst und verarbeitet.</p>
        <p>Die Konferenz-Tools erfassen dabei alle Daten, die Sie zur Nutzung der Tools bereitstellen/einsetzen (E-Mail-Adresse und/oder Ihre Telefonnummer). Ferner verarbeiten die Konferenz-Tools die Dauer der Konferenz, Beginn und Ende (Zeit) der Teilnahme an der Konferenz, Anzahl der Teilnehmer und sonstige „Kontextinformationen“ im Zusammenhang mit dem Kommunikationsvorgang (Metadaten).</p>
        <p>Des Weiteren verarbeitet der Anbieter des Tools alle technischen Daten, die zur Abwicklung der Online-Kommunikation erforderlich sind. Dies umfasst insbesondere IP-Adressen, MAC-Adressen, Geräte-IDs, Gerätetyp, Betriebssystemtyp und -version, Client-Version, Kameratyp, Mikrofon oder Lautsprecher sowie die Art der Verbindung.</p>
        <p>Sofern innerhalb des Tools Inhalte ausgetauscht, hochgeladen oder in sonstiger Weise bereitgestellt werden, werden diese ebenfalls auf den Servern der Tool-Anbieter gespeichert. Zu solchen Inhalten zählen insbesondere Cloud-Aufzeichnungen, Chat-/ Sofortnachrichten, Voicemails hochgeladene Fotos und Videos, Dateien, Whiteboards und andere Informationen, die während der Nutzung des Dienstes geteilt werden.</p>
        <p>Bitte beachten Sie, dass wir nicht vollumfänglich Einfluss auf die Datenverarbeitungsvorgänge der verwendeten Tools haben. Unsere Möglichkeiten richten sich maßgeblich nach der Unternehmenspolitik des jeweiligen Anbieters. Weitere Hinweise zur Datenverarbeitung durch die Konferenztools entnehmen Sie den Datenschutzerklärungen der jeweils eingesetzten Tools, die wir unter diesem Text aufgeführt haben.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Zweck und Rechtsgrundlagen</h3>
        <p>Die Konferenz-Tools werden genutzt, um mit angehenden oder bestehenden Vertragspartnern zu kommunizieren oder bestimmte Leistungen gegenüber unseren Kunden anzubieten (Art. 6 Abs. 1 lit. b DSGVO). Des Weiteren dient der Einsatz der Tools der allgemeinen Vereinfachung und Beschleunigung der Kommunikation mit uns bzw. unserem Unternehmen (berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO). Soweit eine Einwilligung abgefragt wurde, erfolgt der Einsatz der betreffenden Tools auf Grundlage dieser Einwilligung; die Einwilligung ist jederzeit mit Wirkung für die Zukunft widerrufbar.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Speicherdauer</h3>
        <p>Die unmittelbar von uns über die Video- und Konferenz-Tools erfassten Daten werden von unseren Systemen gelöscht, sobald Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt. Gespeicherte Cookies verbleiben auf Ihrem Endgerät, bis Sie sie löschen. Zwingende gesetzliche Aufbewahrungsfristen bleiben unberührt.</p>
        <p>Auf die Speicherdauer Ihrer Daten, die von den Betreibern der Konferenz-Tools zu eigenen Zwecken gespeichert werden, haben wir keinen Einfluss. Für Einzelheiten dazu informieren Sie sich bitte direkt bei den Betreibern der Konferenz-Tools.</p>

        <h3 className="font-bold text-lg text-gray-900 mt-6">Eingesetzte Konferenz-Tools</h3>
        <p>Wir setzen folgende Konferenz-Tools ein:</p>

        <h4 className="font-bold text-gray-800 mt-4">Microsoft Teams</h4>
        <p>Wir nutzen Microsoft Teams. Anbieter ist die Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Irland. Details zur Datenverarbeitung entnehmen Sie der Datenschutzerklärung von Microsoft Teams: <a href="https://privacy.microsoft.com/de-de/privacystatement" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Microsoft Privacy Statement</a>.</p>
        <p>Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework“ (DPF). Der DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, der die Einhaltung europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll. Jedes nach dem DPF zertifizierte Unternehmen verpflichtet sich, diese Datenschutzstandards einzuhalten. Weitere Informationen hierzu erhalten Sie vom Anbieter unter folgendem Link: <a href="https://www.dataprivacyframework.gov/participant/6474" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">DPF Participant</a>.</p>
        <p><strong>Auftragsverarbeitung:</strong> Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.</p>

        <h4 className="font-bold text-gray-800 mt-4">Google Meet</h4>
        <p>Wir nutzen Google Meet. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Details zur Datenverarbeitung entnehmen Sie der Datenschutzerklärung von Google: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Google Privacy</a>.</p>
        <p>Das Unternehmen verfügt über eine Zertifizierung nach dem „EU-US Data Privacy Framework“ (DPF). Der DPF ist ein Übereinkommen zwischen der Europäischen Union und den USA, der die Einhaltung europäischer Datenschutzstandards bei Datenverarbeitungen in den USA gewährleisten soll. Jedes nach dem DPF zertifizierte Unternehmen verpflichtet sich, diese Datenschutzstandards einzuhalten. Weitere Informationen hierzu erhalten Sie vom Anbieter unter folgendem Link: <a href="https://www.dataprivacyframework.gov/participant/5780" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">DPF Participant</a>.</p>
        <p><strong>Auftragsverarbeitung:</strong> Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.</p>
      </div>
    )
  },
  impressum: {
    title: "Impressum",
    content: (
      <div className="prose prose-sm max-w-none text-gray-600">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Impressum</h1>

    <p className="mb-4">
        Samuele Francesco Franzé<br />
        Orasyn<br />
        Kurt-Schumacher-Stra&szlig;e 76<br />
        c/o flexdienst - #12205<br />
        67663 Kaiserslautern
    </p>

    <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">Kontakt</h2>
    <p className="mb-4">
        Telefon: +49 (0) 176 42720313<br />
        E-Mail: info@orasyn.de
    </p>

    <h2 className="text-lg font-bold text-gray-900 mt-6 mb-2">Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2>
    <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
</div>
    )
  }
};

/**
 * Legal Overlay Modal
 */
const LegalModal = ({ page, onClose }: { page: string, onClose: () => void }) => {
  const content = legalContent[page];

  if (!content) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose} // Close on backdrop click
    >
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl relative flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent close on content click
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">{content.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 overflow-y-auto scrollbar-thin">
           <div className="prose prose-gray max-w-none">
             {content.content}
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Main App Component ---

const App = () => {
  const [activeLegalPage, setActiveLegalPage] = useState<string | null>(null);
  const [activeFormModal, setActiveFormModal] = useState<'waitlist' | 'sales' | null>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (activeLegalPage || activeFormModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [activeLegalPage, activeFormModal]);

  return (
    <div 
      className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"
    >
      <Navbar onOpenWaitlist={() => setActiveFormModal('waitlist')} />

      {/* --- Hero Section --- */}
      <section className="relative pt-[160px] pb-24 px-6 overflow-hidden">
        {/* Background Gradients (Subtle) */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white rounded-full blur-3xl opacity-80"></div>
          <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-gray-50 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">ORASYN 1.0 IST LIVE</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black text-black tracking-tighter leading-[0.95] mb-8 max-w-5xl"
          >
            Automate Work.<br />
            <span className="text-gray-400">Elevate Growth.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-500 max-w-[700px] leading-relaxed mb-10 tracking-tight"
          >
            Entkoppeln Sie Wachstum von Arbeitszeit. <br className="hidden md:block" />
            Orasyn verwandelt operative Engpässe in autonome Prozesse – für Ergebnisse, die unendlich skalieren.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4 mb-16"
          >
            <motion.button 
              onClick={() => setActiveFormModal('waitlist')}
              whileTap={{ scale: 0.95 }}
              className="bg-violet-600 text-white text-[15px] font-semibold px-8 py-4 rounded-full transition-all hover:bg-violet-500 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:translate-y-[-1px] flex items-center gap-2"
            >
              Jetzt Demo anfordern
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>

          {/* Integrations Text Only Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-12 flex flex-col items-center"
          >
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">
              NAHTLOSE INTEGRATION IN IHRE INFRASTRUKTUR
            </h3>
            <p className="text-lg md:text-xl font-medium text-gray-400 tracking-tight">
              Google Workspace <span className="mx-2 text-gray-300">•</span> Microsoft 365 <span className="mx-2 text-gray-300">•</span> Microsoft Teams <span className="mx-2 text-gray-300">•</span> Slack
            </p>
          </motion.div>

          {/* Visual */}
          <CalendarMockup />
        </div>
      </section>

      {/* --- ROI / EFFICIENCY & FOCUS SECTION --- */}
      <section id="roi" className="py-24 bg-black text-white relative border-t border-gray-900">
        
        {/* Headline: The Real Problem (Opportunity Cost) */}
        <div className="max-w-[1200px] mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ihr Team wurde eingestellt um zu performen. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Nicht um Kalender zu pflegen.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Jede Minute im administrativen Chaos ist eine Minute, die Ihrem Team für Innovation und Wachstum fehlt.
          </p>
        </div>

        <div className="max-w-[1000px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: The Problem (Hidden Costs) */}
          <div className="space-y-8 opacity-70 hover:opacity-100 transition-opacity">
            <h3 className="text-2xl font-semibold text-gray-400 border-b border-gray-800 pb-4">
              ⚠️ Die Verwaltungs-Falle
            </h3>
            
            {/* Graph 1: Misused Talent */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Opportunitätskosten</span>
                <span className="text-red-500 font-mono">Massiv (Umsatz fehlt)</span>
              </div>
              <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 w-[90%] shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
              </div>
              <p className="text-xs text-gray-400 mt-2 font-bold">Sales & Management verlieren ~20% Kapazität.</p>
            </div>

            {/* Graph 2: Context Switching */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Fokus-Killer (Kontextwechsel)</span>
                <span className="text-red-500 font-mono">Extrem</span>
              </div>
              <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 w-[100%]"></div>
              </div>
            </div>

             {/* Graph 3: Speed */}
             <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Reaktionszeit auf Anfragen</span>
                <span className="text-red-500 font-mono">Stunden bis Tage</span>
              </div>
              <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 w-[60%]"></div>
              </div>
            </div>
          </div>

          {/* RIGHT: The Solution (Focus) */}
          <div className="bg-gray-900/50 p-8 rounded-3xl border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.15)] relative transform hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl rounded-tr-3xl shadow-lg">
              EFFIZIENZ
            </div>

            <h3 className="text-2xl font-bold text-white border-b border-blue-500/30 pb-4 mb-8 flex items-center gap-2">
              ✅ Der Orasyn Standard
            </h3>

            {/* Graph 1: Value */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Gewonnene Deep Work Zeit</span>
                <span className="text-blue-400 font-mono font-bold text-lg">Ø 15 Std. / Monat</span>
              </div>
              <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[95%] shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-pulse"></div>
              </div>
              <p className="text-xs text-blue-400 mt-2 font-bold">Investieren Sie diese Zeit in Strategie & Umsatz.</p>
            </div>

            {/* Graph 2: Precision */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Termin-Koordination</span>
                <span className="text-blue-400 font-mono font-bold">Autonom & Sofort</span>
              </div>
              <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[100%]"></div>
              </div>
            </div>

            {/* Graph 3: Cost Ratio */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Return on Invest (ROI)</span>
                <span className="text-blue-400 font-mono font-bold">149€ vs. 2000€ Wert</span>
              </div>
              <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[100%] shadow-[0_0_20px_rgba(59,130,246,0.4)]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA: Positive Empowerment */}
        <div className="text-center mt-16">
          <button onClick={() => setActiveFormModal('waitlist')} className="group text-white font-semibold transition-colors bg-white/10 hover:bg-white/20 px-8 py-4 rounded-full border border-white/10">
            <span className="mr-2">Fokus zurückgewinnen</span> 
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
          <p className="text-xs text-gray-500 mt-4">Machen Sie Ihr Team einfach effizienter.</p>
        </div>
      </section>

      {/* --- Features Section (Updated ID to #features) --- */}
      <section id="features" className="py-32 relative">
         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter mb-6">Engineered for Scale.</h2>
            <p className="text-xl text-gray-500 max-w-2xl">
              Entkoppeln Sie Wachstum von Administration. Orasyn integriert sich nahtlos und eliminiert Engpässe, bevor sie entstehen.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <FeatureCard 
              icon={<Clock size={20} />}
              title="Autonome Zeit-Souveränität"
              description="Der Agent überwacht Ihren Kalender 24/7. Er schützt Fokus-Zeiten und verhandelt Termine autonom neu."
            />
            <FeatureCard 
              icon={<Layers size={20} />}
              title="Native Infrastruktur"
              description="Kein neues Tool. Orasyn lebt unsichtbar in Ihrer bestehenden Microsoft 365 und Google Workspace Umgebung."
            />
            <FeatureCard 
              icon={<TrendingUp size={20} />}
              title="Rationale Effizienz"
              description="Verwandelt fragmentierte Tage in Produktivität. Gewinnen Sie durchschnittlich 8 Stunden Kapazität pro Woche."
            />
            <FeatureCard 
              icon={<Lock size={20} />}
              title="Enterprise Compliance"
              description="Ihre Daten verlassen niemals den sicheren Kontext. DSGVO-konform, verschlüsselt und in Deutschland gehostet."
            />
            <FeatureCard 
              icon={<Zap size={20} />}
              title="Zero-Friction Onboarding"
              description="Startbereit in 5 Minuten per OAuth-Login. Keine Installation, keine IT-Tickets nötig."
            />
            <FeatureCard 
              icon={<Cpu size={20} />}
              title="Adaptive Intelligenz"
              description="Der Agent lernt Ihre Präferenzen. Je länger er läuft, desto präziser antizipiert er Ihre Bedürfnisse."
            />
          </motion.div>
        </div>
      </section>

      {/* --- Method Section (Updated ID to #method) --- */}
      <section id="method" className="py-32 bg-[#F9FAFB]/50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="mb-20 max-w-2xl"
          >
             <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter mb-6">Der Weg zur Autonomie.</h2>
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                <span className="text-xs font-bold text-gray-700 tracking-wide uppercase">Precision over prediction.</span>
             </div>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <MethodStep 
               step={1}
               icon={<LinkIcon size={20}/>}
               title="1. Infrastruktur verbinden"
               description="Verbinden Sie Ihre Kalender und Kommunikationstools mit einem Klick. Sicher und verschlüsselt."
            />
            <MethodStep 
               step={2}
               icon={<Settings2 size={20}/>}
               title="2. Regeln definieren"
               description="Legen Sie fest, wie aggressiv Orasyn Ihre Fokuszeiten verteidigen soll."
            />
            <MethodStep 
               step={3}
               icon={<PlayCircle size={20}/>}
               title="3. Autonomie aktivieren"
               description="Lehnen Sie sich zurück. Orasyn übernimmt ab sofort das Zeitmanagement für Sie."
            />
          </div>
        </div>
      </section>

      {/* --- Pricing Section (Updated ID to #pricing) --- */}
      <section id="pricing" className="py-32 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="mb-20 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter mb-6">Investition in Souveränität.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {/* Professional Card */}
             <motion.div 
               whileHover={{ y: -5 }}
               className="p-10 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col"
             >
                <div className="mb-8">
                   <h3 className="text-xl font-bold text-gray-900 mb-2">Professional</h3>
                   <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-black">149€</span>
                      <span className="text-gray-500">/ Monat</span>
                   </div>
                   <p className="text-xs text-gray-400 mt-2 uppercase tracking-wide">pro Nutzer</p>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                   {['Google Workspace & M365', 'Slack & Teams Integration', 'Concierge Onboarding'].map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm text-gray-600">
                         <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-600">
                           <Check size={12} strokeWidth={3} />
                         </div>
                         {item}
                      </li>
                   ))}
                </ul>
                <button 
                  onClick={() => setActiveFormModal('waitlist')}
                  className="block w-full text-center py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-[0.98]"
                >
                   Warteliste beitreten
                </button>
             </motion.div>

             {/* Enterprise Card */}
             <motion.div 
               whileHover={{ y: -5 }}
               className="p-10 rounded-3xl bg-gray-900 text-white border border-gray-800 shadow-xl flex flex-col"
             >
                <div className="mb-8">
                   <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                   <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black text-white">Custom</span>
                   </div>
                   <p className="text-xs text-gray-500 mt-2 uppercase tracking-wide">ab 10 Nutzer</p>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                   {['Alles aus Professional', 'Dedizierter Success Manager', 'Custom SLA', 'On-Premise Option'].map(item => (
                      <li key={item} className="flex items-center gap-3 text-sm text-gray-300">
                         <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white">
                           <Check size={12} strokeWidth={3} />
                         </div>
                         {item}
                      </li>
                   ))}
                </ul>
                <button 
                  onClick={() => setActiveFormModal('sales')}
                  className="block w-full text-center py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-all active:scale-[0.98]"
                >
                   Sales kontaktieren
                </button>
             </motion.div>
          </div>
        </div>
      </section>

      {/* --- Closer Section (Inserted) --- */}
      <section id="closer" className="py-32 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter mb-6">
              Bereit, Administrationslast in Autonomie zu verwandeln?
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
              Der schnellste Weg zum freien Kalender beginnt jetzt. Wählen Sie Ihren Pfad zur Souveränität.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
               <button 
                 onClick={() => setActiveFormModal('waitlist')}
                 className="w-full md:w-auto px-10 py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
               >
                 Starten
               </button>
               <button 
                 onClick={() => setActiveFormModal('sales')}
                 className="w-full md:w-auto px-10 py-4 bg-transparent border border-gray-200 text-gray-900 rounded-full font-bold hover:bg-gray-50 transition-all active:scale-[0.98]"
               >
                 Sales kontaktieren
               </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Footer (Updated) --- */}
      <footer className="py-12 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
              <span className="font-bold text-gray-900">© 2025 Orasyn</span>
              <span className="hidden md:inline text-gray-300">|</span>
              <span className="text-sm text-gray-500">Premium KI-Automatisierung für visionäre Unternehmen. Designed in Germany.</span>
           </div>
           <div className="flex gap-8">
              {['Datenschutz', 'AGB', 'Impressum'].map(item => (
                <button 
                  key={item}
                  onClick={() => setActiveLegalPage(item.toLowerCase())}
                  className="text-sm text-gray-500 hover:text-black transition-colors"
                >
                  {item}
                </button>
              ))}
           </div>
        </div>
      </footer>

      {/* Legal Modal */}
      <AnimatePresence>
        {activeLegalPage && (
          <LegalModal page={activeLegalPage} onClose={() => setActiveLegalPage(null)} />
        )}
      </AnimatePresence>
      
      {/* Form Modal */}
      <AnimatePresence>
        {activeFormModal && (
          <FormModal type={activeFormModal} onClose={() => setActiveFormModal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
