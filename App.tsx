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

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Navbar = ({ onOpenWaitlist }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Funktionen', href: '#features' },
    { label: 'Methode', href: '#method' },
    { label: 'Lösungen', href: '#solutions' },
    { label: 'Preise', href: '#pricing' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 h-[80px] flex items-center border-b ${isScrolled ? 'bg-white/80 border-gray-200 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60' : 'bg-white/0 border-transparent'}`}>
      <div className="max-w-[1400px] mx-auto px-6 w-full h-full flex items-center justify-between relative">
        <div className="flex items-center gap-3 z-20 relative">
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src="https://raw.githubusercontent.com/ora-syn/orasynV1.0/main/logo-final.png" 
              alt="ORASYN Logo" 
              className="h-[220px] w-auto object-contain" 
            />
          </a>
        </div>

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

        <div className="hidden md:flex items-center gap-3 z-20 relative">
          <motion.button 
            onClick={onOpenWaitlist}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white text-lg font-semibold px-6 py-2 rounded-xl hover:bg-gray-800 transition-all hover:shadow-lg shadow-purple-500/10"
          >
            Starten
          </motion.button>
        </div>

        <button 
          className="md:hidden text-gray-600 z-20 ml-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

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

const FeatureCard = ({ icon, title, description }) => (
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

const MethodStep = ({ icon, title, description, step }) => (
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

const CalendarMockup = () => {
  const START_HOUR = 7;
  const HOURS_COUNT = 10; 
  const HOUR_HEIGHT = 60;
  const OFFSET_TOP = 40;

  const hours = Array.from({ length: HOURS_COUNT }, (_, i) => START_HOUR + i);

  const getEventStyle = (startHour, duration) => {
    const top = (startHour - START_HOUR) * HOUR_HEIGHT + OFFSET_TOP;
    const height = duration * HOUR_HEIGHT;
    return { top: `${top}px`, height: `${height}px` };
  };

  const totalHeight = (HOURS_COUNT - 1) * HOUR_HEIGHT + OFFSET_TOP;

  return (
    <div className="relative w-full max-w-5xl mx-auto perspective-1000">
      <motion.div 
        initial={{ opacity: 0, rotateX: 10, y: 50 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="relative bg-white rounded-xl border border-gray-200 shadow-float flex flex-col overflow-x-auto pb-4"
      >
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

        <div 
           className="relative flex bg-white border-b border-gray-200 rounded-b-xl min-w-[800px]"
           style={{ height: `${totalHeight}px` }}
        >
           <div className="w-16 flex-shrink-0 border-r border-gray-100 pt-10 text-center relative">
              {hours.map((h, i) => (
                <div key={h} className="absolute w-full" style={{ top: `${i * HOUR_HEIGHT + OFFSET_TOP}px`, transform: 'translateY(-50%)' }}>
                   {h !== 16 && (
                     <span className="text-xs text-gray-400 font-medium bg-white px-1 relative z-10">{h.toString().padStart(2,'0')}:00</span>
                   )}
                </div>
              ))}
           </div>

           <div className="flex-1 relative pt-10">
              {hours.map((h, i) => (
                <div 
                   key={h} 
                   className="absolute left-0 right-0 h-[1px] bg-gray-50"
                   style={{ top: `${i * HOUR_HEIGHT + OFFSET_TOP}px` }}
                ></div>
              ))}

              <div className="absolute inset-0 grid grid-cols-5 pointer-events-none">
                 {[0,1,2,3,4].map(col => (
                   <div key={col} className="border-r border-gray-50 h-full"></div>
                 ))}
              </div>

              <div className="absolute inset-0 grid grid-cols-5 h-full">
                 <div className="relative h-full w-full">
                    <div 
                       className="absolute left-1 right-1 bg-gray-50 border-l-4 border-gray-400 rounded-r-md p-2 flex flex-col justify-start overflow-hidden shadow-sm"
                       style={getEventStyle(12, 1.5)}
                    >
                       <p className="text-xs font-bold text-gray-900 leading-tight whitespace-normal">
                         Seminar: Künstliche Intelligenz & Marketing
                       </p>
                       <p className="text-[10px] text-gray-500 mt-1">12:00 - 13:30</p>
                    </div>
                 </div>

                 <div className="relative h-full w-full">
                    <div 
                       className="absolute left-1 right-1 bg-slate-900 text-white rounded-md p-2 flex flex-col justify-center shadow-lg group"
                       style={getEventStyle(9, 2)}
                    >
                       <div className="absolute top-2 right-2 text-yellow-400">
                          <Zap size={12} fill="currentColor" />
                       </div>
                       <p className="text-xs font-bold">Deep Work</p>
                       <p className="text-[10px] text-gray-400 mt-0.5">Keine Meetings</p>
                    </div>
                 </div>

                 <div className="relative h-full w-full"></div>

                 <div className="relative h-full w-full overflow-visible">
                    <div 
                       className="absolute left-1 right-1 bg-red-50 border-l-4 border-red-200 rounded-r-md p-2 flex flex-col justify-center shadow-sm overflow-visible"
                       style={getEventStyle(10, 1)}
                    >
                       <p className="text-xs font-bold text-gray-800 leading-tight">
                         Meeting Marketingaktivitäten Q1 2026
                       </p>
                       <p className="text-[10px] text-red-400 mt-1">10:00 - 11:00</p>

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

                 <div className="relative h-full w-full"></div>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  );
}

const FormModal = ({ type, onClose }) => {
  const isSales = type === 'sales';
  const title = isSales ? "Direkter Kontakt zum Enterprise-Team" : "Ihr Antrag auf Pilot-Zugang";
  const btnText = isSales ? "Senden & Validieren" : "Zugriff anfordern";

  const handleSubmit = (e) => {
    e.preventDefault();
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

const legalContent = {
  kontakt: {
    title: "Kontakt",
    content: (
      <div className="space-y-6 text-gray-600 leading-relaxed">
        <p className="text-lg">Wir freuen uns, von Ihnen zu hören.</p>
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
          <p className="font-bold text-black mb-2">Support & Vertrieb</p>
          <p>E-Mail: info@orasyn.com</p>
        </div>
      </div>
    )
  },
  datenschutz: {
    title: "Datenschutzerklärung",
    content: (
      <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Datenschutzerklärung</h1>
        <p>Vollständiger Datenschutztext hier einfügen...</p>
      </div>
    )
  },
  agb: {
    title: "Allgemeine Geschäftsbedingungen",
    content: (
      <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">AGB</h1>
        <p>Vollständige AGB hier einfügen...</p>
      </div>
    )
  },
  impressum: {
    title: "Impressum",
    content: (
      <div className="prose prose-sm max-w-none text-gray-600">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Impressum</h1>
        <p>Samuele Francesco Franzé<br />Orasyn<br />Kurt-Schumacher-Straße 76<br />67663 Kaiserslautern</p>
        <p>E-Mail: info@orasyn.de</p>
      </div>
    )
  }
};

const LegalModal = ({ page, onClose }) => {
  const content = legalContent[page];

  if (!content) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl relative flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100 bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">{content.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-black transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8 md:p-10 overflow-y-auto scrollbar-thin">
           <div className="prose prose-gray max-w-none">
             {content.content}
           </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const App = () => {
  const [activeLegalPage, setActiveLegalPage] = useState(null);
  const [activeFormModal, setActiveFormModal] = useState(null);

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

          <CalendarMockup />
        </div>
      </section>

      {/* --- ROI Section --- */}
      <section id="roi" className="py-24 bg-black text-white relative border-t border-gray-900">
        <div className="max-w-[1200px] mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ihr Team wurde eingestellt um zu performen. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Nicht um Kalender zu pflegen.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Wenn Experten administrative Aufgaben erledigen, verbrennt Ihr Unternehmen kein Geld – es verbrennt Potenzial.
          </p>
        </div>

        <div className="max-w-[1000px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 opacity-70 hover:opacity-100 transition-opacity">
            <h3 className="text-2xl font-semibold text-gray-400 border-b border-gray-800 pb-4">
              ⚠️ Die Verwaltungs-Falle
            </h3>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Opportunitätskosten</span>
                <span className="text-red-500 font-mono">Hoch (Teure Zeit verschwendet)</span>
              </div>
              <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 w-[90%] shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
              </div>
              <p className="text-[10px] text-gray-500 mt-1">Manager/Sales verbringen ~20% der Zeit mit Admin.</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Fokus-Verlust (Kontextwechsel)</span>
                <span className="text-red-500 font-mono">Extrem</span>
              </div>
              <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 w-[100%]"></div>
              </div>
            </div>
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

          <div className="bg-gray-900/50 p-8 rounded-3xl border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.15)] relative transform hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl rounded-tr-3xl shadow-lg">
              EFFICIENCY
            </div>
            <h3 className="text-2xl font-bold text-white border-b border-blue-500/30 pb-4 mb-8 flex items-center gap-2">
              ✅ Der Orasyn Standard
            </h3>
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Gewonnene Deep Work Zeit</span>
                <span className="text-blue-400 font-mono font-bold text-lg">+ 15 Std. / Monat</span>
              </div>
              <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[95%] shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-pulse"></div>
              </div>
              <p className="text-xs text-blue-400 mt-2 font-bold">Investieren Sie diese Zeit in Strategie & Umsatz.</p>
            </div>
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Termin-Koordination</span>
                <span className="text-blue-400 font-mono font-bold">Autonom & Sofort</span>
              </div>
              <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[100%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-300">Kosten-Nutzen-Verhältnis</span>
                <span className="text-blue-400 font-mono font-bold">149€ vs. 2000€ Wert</span>
              </div>
              <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[100%] shadow-[0_0_20px_rgba(59,130,246,0.4)]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <button onClick={() => setActiveFormModal('waitlist')} className="group text-white font-semibold transition-colors bg-white/10 hover:bg-white/20 px-8 py-4 rounded-full border border-white/10">
            <span className="mr-2">Fokus zurückgewinnen</span> 
            <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
          </button>
          <p className="text-xs text-gray-500 mt-4">Machen Sie Ihr Team einfach effizienter.</p>
        </div>
      </section>

      {/* --- Features Section --- */}
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

      {/* --- Method Section --- */}
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

      {/* --- Pricing Section --- */}
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

      {/* --- Closer Section --- */}
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

      {/* --- Footer --- */}
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

      <AnimatePresence>
        {activeLegalPage && (
          <LegalModal page={activeLegalPage} onClose={() => setActiveLegalPage(null)} />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {activeFormModal && (
          <FormModal type={activeFormModal} onClose={() => setActiveFormModal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
