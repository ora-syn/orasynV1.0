import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import logoImg from './logo.png';  <-- WIR NEHMEN JETZT DEN DIREKTEN WEG
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

  const navLinks = [
    { label: 'Funktionen', href: '#features' },
    { label: 'Methode', href: '#method' },
    { label: 'Lösungen', href: '#solutions' },
    { label: 'Preise', href: '#pricing' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 h-[80px] flex items-center border-b ${isScrolled ? 'bg-white/80 border-gray-200 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60' : 'bg-white/0 border-transparent'}`}>
      <div className="max-w-[1400px] mx-auto px-6 w-full h-full flex items-center justify-between relative">
        
        {/* Left: Logo Group - HIER IST DIE ÄNDERUNG */}
        <div className="flex items-center gap-3 z-20 relative">
          <a href="#" className="flex items-center gap-3 group">
            {/* Pfad zeigt jetzt direkt auf public/logo.png */}
            <img src="/logo.png" alt="ORASYN Logo" className="h-8 w-auto object-contain" />
          </a>
        </div>

        {/* Center: Links (Absolutely Centered) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center gap-1">
          {navLinks.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className="text-[14px] font-medium text-gray-500 hover:text-black px-4 py-2 rounded-full hover:bg-black/5 transition-all duration-200"
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
            className="bg-black text-white text-[13px] font-medium px-4 py-2 rounded-full hover:bg-gray-800 transition-all hover:shadow-lg shadow-purple-500/10"
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

const CalendarMockup = () => {
  const START_HOUR = 7;
  const HOURS_COUNT = 10; 
  const HOUR_HEIGHT = 60; 
  const OFFSET_TOP = 40; 

  const hours = Array.from({ length: HOURS_COUNT }, (_, i) => START_HOUR + i);

  const getEventStyle = (startHour: number, duration: number) => {
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

const FormModal = ({ type, onClose }: { type: 'waitlist' | 'sales', onClose: () => void }) => {
  const isSales = type === 'sales';
  const title = isSales ? "Direkter Kontakt zum Enterprise-Team" : "Ihr Antrag auf Pilot-Zugang";
  const btnText = isSales ? "Senden & Validieren" : "Zugriff anfordern";

  const handleSubmit = (e: React.FormEvent) => {
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
        <p><strong>Auftragsverarbeitung:</strong> Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet
