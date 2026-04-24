/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  ArrowRight, 
  Award, 
  Landmark,
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  ChevronRight, 
  ChevronLeft,
  Menu, 
  X,
  Hammer,
  PencilRuler,
  Gem,
  MessageSquare,
  Compass,
  MessagesSquare,
  Calculator,
  Sparkles,
  Home,
  Layout,
  Layers,
  Palette,
  Clock,
  FileCheck,
  Star,
  Facebook,
  Linkedin,
  Youtube,
  Instagram,
  Moon,
  Maximize
} from 'lucide-react';

// --- Components ---

const Pill = () => {
  const words = [
    { text: "Homes", icon: <Home size={22} strokeWidth={2.5} />, color: "#C1B5A9" }, // Taupe
    { text: "Spaces", icon: <Maximize size={22} strokeWidth={2.5} />, color: "#E0DCD7" }, // Grey Soft
    { text: "Estates", icon: <Landmark size={22} strokeWidth={2.5} />, color: "#B5A99E" }, // Warm Neutral
    { text: "Dreams", icon: <Moon size={22} strokeWidth={2.5} />, color: "#A9B5C1" }, // Muted Blue
    { text: "Legacies", icon: <Gem size={22} strokeWidth={2.5} />, color: "#C1A9B5" }, // Muted Purple
    { text: "Sanctuaries", icon: <Sparkles size={22} strokeWidth={2.5} />, color: "#A9C1B5" }, // Muted Green
  ];
  
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span 
      className="chr-heading-pill__pill-container font-serif shadow-sm" 
      style={{ backgroundColor: words[index].color }}
      key={words[index].text}
    >
      <motion.span 
        className="chr-heading-pill__icon"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ 
          scale: 1, 
          rotate: 0,
          y: [0, -4, 0],
        }}
        transition={{ 
          initial: { type: "spring", stiffness: 260, damping: 20, delay: 0.1 },
          y: { 
            repeat: Infinity, 
            duration: 2, 
            ease: "easeInOut" 
          }
        }}
      >
        {words[index].icon}
      </motion.span>
      <span className="chr-heading-pill__pill-text">
        {words[index].text.split('').map((char, i) => (
          <span 
            key={i} 
            className="chr-heading-pill__pill-char"
            style={{ animationDelay: `${(i + 1) * 40}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    </span>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Founder', href: '#founder' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Work', href: '#portfolio' },
  ];

  return (
    <nav className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
      <div className={`bg-brand-bg/70 backdrop-blur-md rounded-[32px] border border-brand-grey-soft/40 shadow-sm transition-all duration-500 pointer-events-auto flex items-center gap-2 sm:gap-8 px-2 py-2 md:py-3 max-w-full sm:max-w-fit mx-auto ${isScrolled ? 'scale-95' : 'scale-100'}`}>
        <div className="flex items-center gap-2 sm:gap-4 px-1">
          <a href="#" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 cursor-pointer group">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-black/5 shadow-inner flex-shrink-0 aspect-square relative">
              <img 
                src="https://d1yei2z3i6k35z.cloudfront.net/17304791/69e8de9c13ff54.81477736_image-removebg-preview.png" 
                alt="Nathan King" 
                className="absolute inset-0 w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-[600] text-brand-primary whitespace-nowrap text-[12px] sm:text-[14px] tracking-tight group-hover:text-brand-taupe transition-colors">
              Nathan King
            </span>
          </a>

          <div className="flex items-center gap-3 sm:gap-8 pl-3 sm:pl-4 border-l border-brand-grey-soft/40">
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group flex items-center">
                  <a 
                    href={link.href} 
                    className="text-text-primary hover:text-brand-taupe transition-all duration-300 font-[500] text-[14px] whitespace-nowrap flex items-center gap-1.5"
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </div>

            <Link 
              to="/survey" 
              className="text-brand-primary font-[500] text-[12px] sm:text-[14px] px-3 sm:px-4 py-1.5 rounded-full border border-brand-grey-soft/40 bg-brand-bg/80 hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-sm whitespace-nowrap"
            >
              Consult
            </Link>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden text-brand-primary p-1 hover:text-brand-taupe transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute top-full left-0 right-0 mt-4 px-6 md:hidden pointer-events-auto"
          >
            <div className="bg-brand-bg/95 backdrop-blur-md border border-brand-grey-soft/40 rounded-[24px] p-6 shadow-xl max-w-sm mx-auto">
              <div className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-[500] text-brand-primary hover:text-brand-taupe transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <Link 
                  to="/survey" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary justify-center text-sm py-3"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const d = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[d.getMonth()];
    const year = d.getFullYear().toString().slice(-2);
    setCurrentDate(`Available for ${month} '${year}`);
  }, []);

  return (
    <section className="relative min-h-screen flex items-start justify-center overflow-hidden bg-brand-bg">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 z-0 opacity-10"
      >
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6199f7d009?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent" />
      </motion.div>

      <div className="w-full max-w-4xl lg:max-w-6xl relative z-10 pt-32 sm:pt-36 pb-24 sm:pb-32 flex flex-col items-center px-4 sm:px-6">
        {/* Availability Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-brand-bg/80 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 border border-brand-grey-soft shadow-sm"
        >
          <div className="relative w-1.5 h-1.5 sm:w-2 sm:h-2">
            <div className="absolute inset-0 bg-[#22c55e] rounded-full animate-ping opacity-75"></div>
            <div className="relative w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#22c55e] rounded-full shadow-[0_0_8px_2px_rgba(34,197,94,0.6)] animate-pulse"></div>
          </div>
          <span className="text-[12px] sm:text-sm font-medium text-brand-primary font-sans">{currentDate || 'Available Now'}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="hero-headline mb-10 text-center flex flex-col items-center justify-center relative w-full"
        >
          <div className="flex items-center justify-center gap-x-[0.2em] mb-3 sm:mb-2 w-full">
            <span className="inline-block">I Build</span>
            <Pill />
          </div>
          
          <div className="mb-2 sm:mb-1 w-full text-center">
            <span className="px-1 bg-gradient-to-r from-brand-taupe to-brand-primary bg-clip-text text-transparent">
              For People Who Truly
            </span>
          </div>

          <div className="w-full">
            <span className="inline-block px-1">Love Where They Live</span>
          </div>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[clamp(0.875rem,4vw,1.1rem)] sm:text-[18px] leading-[28px] font-medium text-text-secondary mb-10 max-w-2xl lg:max-w-3xl text-center font-sans"
        >
          For over 30 years, master builder Nathan King has helped homeowners and architects turn ambitious designs into exceptional homes through precision craftsmanship and collaborative building.
        </motion.p>

        {/* Profile CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <Link 
            to="/survey" 
            className="group relative inline-flex items-center bg-brand-primary text-white rounded-[32px] transition-all duration-300 overflow-hidden pr-4 sm:pr-6 py-2 sm:py-2.5 pl-2 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-brand-primary/10 hover:scale-105 max-w-[calc(100vw-32px)]"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/10 shrink-0 shadow-sm relative">
              <img 
                src="https://d1yei2z3i6k35z.cloudfront.net/17304791/69e8de9c13ff54.81477736_image-removebg-preview.png" 
                alt="Nathan King" 
                className="absolute inset-0 w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Expanded for mobile, hover-only on md+ */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 opacity-100 md:max-w-0 md:opacity-0 md:group-hover:max-w-[140px] md:group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden ml-2 sm:ml-3">
              <span className="text-white text-lg sm:text-xl font-medium shrink-0">+</span>
              <span className="bg-white text-brand-primary text-[9px] sm:text-[10px] font-extrabold w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 tracking-tighter shadow-inner">YOU</span>
            </div>
            <span className="font-bold text-[11px] sm:text-sm whitespace-nowrap ml-2 sm:ml-3 tracking-tight shrink-0">= Start your Luxury Craftsmanship</span>
          </Link>
        </motion.div>

        {/* Video Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full max-w-[800px] aspect-video rounded-[32px] overflow-hidden border border-brand-grey-soft shadow-2xl relative group bg-black"
        >
          <iframe 
            src="https://www.youtube.com/embed/HCliAdMtL34" 
            title="Luxury Home Construction Testimonial" 
            className="w-full h-full" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
          <div className="absolute inset-0 pointer-events-none border-[1px] border-white/10 rounded-[32px] shadow-inner"></div>
        </motion.div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const logos = [
    "https://htmldemo.net/oxybuild/oxybuild/assets/images/brand/1.png",
    "https://htmldemo.net/oxybuild/oxybuild/assets/images/brand/2.png",
    "https://htmldemo.net/oxybuild/oxybuild/assets/images/brand/5.png",
    "https://htmldemo.net/oxybuild/oxybuild/assets/images/brand/3.png",
    "https://htmldemo.net/oxybuild/oxybuild/assets/images/brand/10.png",
    "https://htmldemo.net/oxybuild/oxybuild/assets/images/brand/4.png",
    "https://htmldemo.net/oxybuild/oxybuild/assets/images/brand/6.png"
  ];

  const clients = [
    "https://framerusercontent.com/images/ARmQOa71EvidN3oYWq9jWzn9OE.jpg",
    "https://framerusercontent.com/images/W7oQ4BScxWhGC5oVOzKGxVGAD4.jpg",
    "https://framerusercontent.com/images/UqrSyX3j0KDY0YY2JZCQuc7Wzzg.jpg",
    "https://framerusercontent.com/images/wFJgmAuVHn37SCJR5MDBtfbFdY.jpg",
    "https://framerusercontent.com/images/K6cUNifhQFa6qEX3kqNwfqMkiY.jpg?scale-down-to=512"
  ];

  return (
    <section className="w-full border-y border-brand-grey-soft/30 py-8 bg-brand-bg overflow-hidden">
      <div className="max-w-[95%] sm:max-w-[80%] mx-auto px-4 sm:px-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
          <div className="flex -space-x-3">
            {clients.map((src, i) => (
              <div key={i} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-[3px] border-white shadow-sm overflow-hidden bg-gray-100">
                <img src={src} alt={`Client ${i}`} className="w-full h-full object-cover" loading="lazy" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center sm:items-start gap-0.5">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" className="w-3.5 h-3.5 fill-black">
                  <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z" />
                </svg>
              ))}
            </div>
            <span className="text-[13px] sm:text-[14px] font-[600] text-[#545454] tracking-tight">200+ happy clients</span>
          </div>
        </div>
        
        <div className="relative flex-1 w-full overflow-hidden h-10 sm:h-12">
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-brand-bg to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-brand-bg to-transparent z-10" />
          
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-16 whitespace-nowrap w-max"
          >
            {[...logos, ...logos].map((src, i) => (
              <img 
                key={i}
                src={src} 
                alt="Client Logo" 
                className="h-10 md:h-12 object-contain opacity-60 grayscale brightness-0 hover:grayscale-0 hover:brightness-100 hover:opacity-100 transition-all duration-300 mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const reviews = [
    { text: "“Nathan King was organised, paid close attention to detail and delivered everything to a very high standard.”", author: "Architectural Client, Toorak" },
    { text: "“His attention to detail and collaborative approach made the process seamless. A true master of his craft.”", author: "Homeowner, Brighton" },
    { text: "“The team was professional, transparent, and built our dream home exactly as the architect envisioned.”", author: "Luxury Property Group" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const next = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <div className="mt-16 md:mt-24">
      <div className="relative bg-white/40 backdrop-blur-sm rounded-[32px] p-8 md:p-16 border border-brand-grey-soft/30 shadow-sm overflow-hidden min-h-[300px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center px-4 md:px-12"
          >
            <p className="text-xl md:text-2xl font-serif leading-relaxed mb-8 text-brand-primary opacity-90 font-[500]">
              {reviews[current].text}
            </p>
            <div className="flex items-center justify-center gap-4 text-brand-taupe tracking-widest text-[11px] uppercase font-[600]">
              <div className="w-8 h-[1px] bg-brand-taupe/40" />
              {reviews[current].author}
              <div className="w-8 h-[1px] bg-brand-taupe/40" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="absolute inset-y-0 left-4 md:left-8 flex items-center">
          <button 
            onClick={prev}
            className="w-10 h-10 rounded-full border border-brand-grey-soft/40 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 bg-white/50"
          >
            <ChevronLeft size={20} />
          </button>
        </div>
        <div className="absolute inset-y-0 right-4 md:right-8 flex items-center">
          <button 
            onClick={next}
            className="w-10 h-10 rounded-full border border-brand-grey-soft/40 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 bg-white/50"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-brand-primary w-4' : 'bg-brand-grey-soft'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const WorkExperience = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-brand-bg border-b border-[#E5E7EB]">
      <div className="w-full max-w-[95%] sm:max-w-[85%] px-4 sm:px-12 mx-auto">
        <div className="mb-10 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(2rem,6vw,4rem)] sm:text-[54px] md:text-[64px] font-medium leading-[1.1] sm:leading-[0.98] tracking-[-0.03em] mb-4 text-black flex flex-wrap gap-x-[0.25em] font-serif"
          >
            {["What", "It’s", "Like", "Working", "With", "Us"].map((word, i) => (
              <span key={i} className="inline-block">{word}</span>
            ))}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-[16px] sm:text-[18px] md:text-[20px] text-[#828282] max-w-2xl font-sans"
          >
            Hear from those who experienced The Real work with us.
          </motion.p>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 h-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-[70%] aspect-video rounded-[24px] overflow-hidden border border-[#DEDEDE] shadow-xl bg-black"
          >
            <iframe 
              src="https://www.youtube.com/embed/l9xjeqsDIQI" 
              title="Work Experience Video 1" 
              className="w-full h-full" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="w-full lg:w-[30%] aspect-[9/16] lg:aspect-auto rounded-[24px] overflow-hidden border border-[#DEDEDE] shadow-xl bg-black"
          >
            <iframe 
              src="https://www.youtube.com/embed/BrrkcXFmdsM" 
              title="Work Experience Short" 
              className="w-full h-full" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
        <TestimonialCarousel />
      </div>
    </section>
  );
};

const FounderStory = () => {
  return (
    <section id="founder" className="bg-brand-bg section-padding border-b border-brand-grey-soft/20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="aspect-[3/4] overflow-hidden rounded-[8px] bg-brand-grey-soft">
            <img 
              src="https://nathanking.com.au/lovable-uploads/746d8dca-86ba-4b2b-89dc-2f7a62258d72.png" 
              alt="Nathan King - Master Builder" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 md:-right-12 w-48 h-48 border border-brand-taupe/20 rounded-[8px] -z-10 hidden md:block" />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
        >
          <span className="text-brand-taupe uppercase tracking-[0.4em] text-[10px] block mb-6 font-[500]">Our Legacy</span>
          <h2 className="mb-8">
            A Builder Who Treats Every <br /> Home Like a <span className="font-[600]">Legacy</span>
          </h2>
          <div className="space-y-6 text-text-secondary font-[300] text-lg leading-relaxed">
            <p className="text-brand-primary text-xl font-serif font-[500]">"Building a home isn’t just another construction project."</p>
            <p>It’s where families grow, where milestones happen, and where decades of life unfold.</p>
            <p>For more than 30 years Nathan King has built exceptional homes by combining traditional craftsmanship with modern architectural collaboration.</p>
            <p className="text-brand-primary font-[400] pt-4">Every detail matters. Because when a home is built properly, it still feels extraordinary decades later.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProblemSection = () => {
  const problems = [
    {
      title: "Architectural Integrity",
      desc: "Preventing builders from compromising complex designs due to a lack of technical understanding. We ensure your vision is realized without shortcuts.",
      icon: <Compass size={24} />
    },
    {
      title: "Seamless Communication",
      desc: "Eliminating the friction of poor communication between architects, homeowners, and site teams through a single, accountable point of contact.",
      icon: <MessagesSquare size={24} />
    },
    {
      title: "Budget Precision",
      desc: "Controlling unexpected delays and financial overruns through meticulous planning, transparent reporting, and decades of project expertise.",
      icon: <Calculator size={24} />
    },
    {
      title: "Exacting Finishes",
      desc: "Ensuring every final detail—from shadow-line joins to custom hardware—perfectly matches the master drawings and your high expectations.",
      icon: <Sparkles size={24} />
    }
  ];

  return (
    <section className="bg-brand-bg text-text-primary section-padding relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
        <span className="text-brand-taupe uppercase tracking-[0.4em] text-[10px] block mb-4 font-[600]">The Challenge</span>
        <h2 className="mb-6 leading-tight">Great Designs Deserve <br /> <span className="text-brand-taupe font-serif">the Right Builder</span></h2>
        <p className="text-lg md:text-xl text-text-secondary/80 font-light max-w-2xl mx-auto leading-relaxed">
          Luxury residential construction requires a builder who treats architectural drawings as sacred, not suggestions.
        </p>
      </div>

      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-grey-soft/20 border border-brand-grey-soft/20 rounded-[1px] overflow-hidden">
          {problems.map((prob, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-brand-bg p-8 md:p-16 flex flex-col group hover:bg-white transition-all duration-700"
            >
              <div className="mb-10 w-14 h-14 rounded-full border border-brand-grey-soft/30 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                {prob.icon}
              </div>
              <div className="max-w-md">
                <h3 className="text-[22px] md:text-[26px] font-serif font-medium text-brand-primary mb-4 tracking-tight">
                  {prob.title}
                </h3>
                <p className="text-text-secondary text-[16px] md:text-[17px] leading-relaxed font-light font-sans">
                  {prob.desc}
                </p>
              </div>
              <div className="mt-12 h-[1px] w-12 bg-brand-taupe/30 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Custom New Homes",
      desc: "Experience the ultimate in bespoke living with a home tailored to your lifestyle.",
      img: "https://nathanking.com.au/assets/hero-house-bjlC-BOa.jpg",
      icon: <Home size={42} />,
      points: [
        "Unique architectural designs",
        "Master-level craftsmanship",
        "Expert technical execution",
        "End-to-end management",
        "Superior quality materials"
      ]
    },
    {
      title: "Architectural Renovations",
      desc: "Transform your existing space with expert renovation and restoration.",
      img: "https://nathanking.com.au/assets/renovation-kitchen-BsVU5uI1.jpg",
      icon: <Hammer size={42} />,
      points: [
        "Heritage restoration",
        "Modern updates and extensions",
        "Structural modifications",
        "Master cabinetry integration",
        "Seamless old-to-new flow"
      ]
    },
    {
      title: "Additions & Extensions",
      desc: "Seamlessly expand your home with architecturally integrated additions.",
      img: "https://nathanking.com.au/assets/extension-project-BOCR_fVk.jpg",
      icon: <Layout size={42} />,
      points: [
        "Second story additions",
        "Rear and side extensions",
        "Outdoor living spaces",
        "Structural engineering",
        "Architectural scaling"
      ]
    },
    {
      title: "Premium Custom Joinery",
      desc: "Exquisite timber work and bespoke cabinetry for luxury interiors.",
      img: "https://nathanking.com.au/assets/modern-joinery-carrara-Ce54VlvD.jpg",
      icon: <Gem size={42} />,
      points: [
        "Architectural cabinetry",
        "High-end timber finishes",
        "Integrated tech storage",
        "Bespoke wardrobes & kitchens",
        "Precision installation"
      ]
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Triple the items for seamless infinite scrolling
  const displayServices = [...services, ...services, ...services];
  const totalItems = services.length;
  // Start at the first item of the middle set
  const [currentIndex, setCurrentIndex] = useState(totalItems);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  const handleDotClick = (idx: number) => {
    setIsTransitioning(true);
    setCurrentIndex(totalItems + idx);
  };

  // Logic to handle the "jump" back to center for infinite loop
  useEffect(() => {
    if (currentIndex >= totalItems * 2) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalItems);
      }, 1000); // Wait for transition duration
    } else if (currentIndex < totalItems) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(totalItems * 2 - 1);
      }, 1000);
    }
    // Update the active dot based on the current index
    setActiveIndex(currentIndex % totalItems);
  }, [currentIndex, totalItems]);

  return (
    <section id="services" className="bg-[#463E38] py-24 md:py-32 overflow-hidden">
      <div className="w-full max-w-[85%] mx-auto px-6 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-brand-taupe uppercase tracking-[0.4em] text-[10px] block mb-4 font-[600]">Our Expertise</span>
            <h2 className="text-white mb-0 leading-tight font-serif">Mastering The Art Of <br /> <span className="font-serif opacity-90">Fine Construction</span></h2>
          </div>
          <div className="max-w-md">
            <p className="text-white/60 font-light leading-relaxed">
              We specialize in projects where uncompromising quality is the baseline requirement. Every build is a partnership between architectural vision and technical precision.
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-full">
        <motion.div 
          animate={{ x: `calc(-${currentIndex * 80}vw + 10vw)` }}
          transition={isTransitioning ? { duration: 1, ease: [0.32, 0.72, 0, 1] } : { duration: 0 }}
          className="flex flex-nowrap"
          style={{ width: "fit-content" }}
        >
          {displayServices.map((service, i) => (
            <div 
              key={i} 
              className="w-[80vw] px-4 md:px-8 transition-opacity duration-700 shrink-0"
              style={{ opacity: i === currentIndex ? 1 : 0.3 }}
            >
              <div className="bg-[#1C1C1C] rounded-[24px] overflow-hidden flex flex-col md:flex-row h-[680px] md:h-[520px] shadow-2xl border border-white/5">
                <div className="w-full md:w-1/2 h-[280px] md:h-auto overflow-hidden bg-white/5">
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center relative bg-[#1C1C1C]">
                  <div className="text-[#FF5722] mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-outfit leading-tight uppercase tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-xs md:text-sm mb-6 font-light leading-relaxed">
                    {service.desc}
                  </p>
                  
                  <ul className="mb-8 space-y-2">
                     {service.points.map((pt, j) => (
                       <li key={j} className="flex items-center gap-3 text-white/70 text-[10px] md:text-xs font-light">
                         <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#FF5722]" />
                         {pt}
                       </li>
                     ))}
                  </ul>

                  <div>
                    <button className="btn-discover shadow-lg shadow-[#FF5722]/20">
                      Discover More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="flex justify-center mt-12 gap-3">
        {services.map((_, i) => (
          <button 
            key={i}
            onClick={() => handleDotClick(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex ? 'w-12 bg-[#FF5722]' : 'w-3 bg-white/20'}`}
          />
        ))}
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const steps = [
    { title: "Consultation", desc: "Discuss project vision and scope.", phase: "Phase 01" },
    { title: "Design Collaboration", desc: "Work with architects to refine plans.", phase: "Phase 02" },
    { title: "Planning & Approvals", desc: "Prepare documentation and permits.", phase: "Phase 03" },
    { title: "Construction", desc: "Deliver the build with precision craftsmanship.", phase: "Phase 04" },
    { title: "Completion", desc: "Final inspections and project handover.", phase: "Phase 05" }
  ];

  return (
    <section id="process" className="bg-brand-bg section-padding border-t border-brand-grey-soft/20">
      <div className="max-w-xl mx-auto px-6">
        <div className="text-center mb-12">
          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 uppercase tracking-wider text-gray-400">
            Building Process
          </h4>
          <h2 className="font-serif leading-tight">A Simple and Transparent <br /> <span className="text-brand-taupe">Workflow</span></h2>
        </div>

        <div className="relative min-h-[140px]">
          <AnimatePresence mode="popLayout">
            {!isExpanded ? (
              <div className="relative h-[120px] sm:h-[140px]">
                {steps.slice(0, 3).map((step, idx) => (
                  <motion.div 
                    key={`stacked-${idx}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: idx * 10,
                      scale: 1 - (idx * 0.05),
                      zIndex: 3 - idx
                    }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    className="absolute top-0 left-0 right-0 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-md transition-shadow"
                    style={{ 
                      filter: idx > 0 ? `blur(${idx * 0.5}px)` : 'none'
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-base sm:text-lg mb-1 text-brand-primary">
                          {step.title}
                        </h5>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed truncate">
                          {step.desc}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500 font-medium whitespace-nowrap flex-shrink-0 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                        {step.phase}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                key="expanded-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {steps.map((step, idx) => (
                  <motion.div 
                    key={`expanded-${idx}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-base sm:text-lg mb-1 text-brand-primary group-hover:text-brand-taupe transition-colors">
                          {step.title}
                        </h5>
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500 font-medium whitespace-nowrap flex-shrink-0 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                        {step.phase}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-16 flex justify-center">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all bg-white rounded-full px-6 py-3 border border-gray-200 shadow-md hover:shadow-lg"
          >
            <span>{isExpanded ? 'Show less' : 'Show all'}</span>
            <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
              <motion.svg 
                animate={{ rotate: isExpanded ? 180 : 0 }}
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" 
              >
                <path d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [filter, setFilter] = useState("All Work");
  const categories = ["Luxury Homes", "Architectural Renovations", "Custom Joinery"];
  
  const projects = [
    { 
      title: "Hunter valley acerage", 
      cat: "Luxury Homes", 
      badge: "New Build",
      desc: "A stunning 4-bedroom contemporary home featuring natural stone, timber, and glass. Collaborative design with award-winning architects.",
      img: "https://nathanking.com.au/lovable-uploads/267e0407-a10e-4176-85a0-827a96b0431d.png",
      features: ["4 bedrooms", "3 bathrooms", "Open plan living", "Premium finishes"]
    },
    { 
      title: "Modern Addition to Heritage Home", 
      cat: "Architectural Renovations", 
      badge: "Renovation",
      desc: "Complete kitchen transformation maintaining heritage character while incorporating modern functionality and premium appliances.",
      img: "https://nathanking.com.au/lovable-uploads/4c94b042-1155-4272-9dd6-99da37dd7d9d.png",
      features: ["Custom cabinetry", "Off form concrete bench", "Heritage restoration", "Modern appliances"]
    },
    { 
      title: "Premium Custom Joinery", 
      cat: "Custom Joinery", 
      badge: "Joinery",
      desc: "Bespoke entertainment unit and storage solutions crafted from premium timber with integrated technology features.",
      img: "https://nathanking.com.au/assets/modern-joinery-carrara-Ce54VlvD.jpg",
      features: ["Custom timber work", "Integrated storage", "Technology integration", "Architectural details"]
    }
  ];

  const filteredProjects = filter === "All Work" ? projects : projects.filter(p => p.cat === filter);

  return (
    <section id="portfolio" className="bg-[#f7f6f4] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-brand-taupe uppercase tracking-[0.4em] text-[10px] block mb-4 font-[600]">Portfolio</span>
            <h2 className="mb-0">Selected Projects</h2>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-4">
            <button 
              onClick={() => setFilter("All Work")}
              className={`px-6 py-2 text-[11px] uppercase tracking-widest font-bold transition-all border-b-2 ${filter === "All Work" ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary opacity-60 hover:opacity-100"}`}
            >
              All Work
            </button>
            {categories.map(c => (
              <button 
                key={c} 
                onClick={() => setFilter(c)}
                className={`px-6 py-2 text-[11px] uppercase tracking-widest font-bold transition-all border-b-2 ${filter === c ? "border-brand-primary text-brand-primary" : "border-transparent text-text-secondary opacity-60 hover:opacity-100"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredProjects.map((p, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-lg border border-[#e5e7eb] bg-white shadow-sm overflow-hidden hover:shadow-[0_20px_60px_rgba(44,38,32,0.16)] transition-shadow duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={p.img} 
                  alt={p.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-start mb-4">
                  <span className="text-sm font-medium bg-[#e5e7eb] text-[#1a1a1a] px-3 py-1 rounded-full uppercase tracking-wider text-[11px]">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 font-serif text-brand-primary">
                  {p.title}
                </h3>
                <p className="text-text-secondary/70 mb-6 leading-relaxed font-light text-[15px]">
                  {p.desc}
                </p>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  {p.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-brand-taupe rounded-full"></div>
                      <span className="text-[13px] text-text-secondary font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GuaranteeSection = () => {
  const guarantees = [
    {
      title: "10-Year Structural Guarantee",
      desc: "Your home is your most significant investment. We provide long-term peace of mind with a comprehensive structural warranty.",
      icon: <ShieldCheck className="text-[#FF5722]" size={32} />
    },
    {
      title: "Fixed-Price Certainty",
      desc: "Transparent contracts with clearly defined scopes. We eliminate financial surprises through meticulous pre-construction planning.",
      icon: <Calculator className="text-[#FF5722]" size={32} />
    },
    {
      title: "Master Builder Standards",
      desc: "As a registered Master Builder, we adhere to the highest industry standards of safety, ethics, and building performance.",
      icon: <Award className="text-[#FF5722]" size={32} />
    },
    {
      title: "Precision Handover",
      desc: "Our project management ensures meticulous scheduling. We commit to a move-in date and maintain strict quality control until the key turns.",
      icon: <Clock className="text-[#FF5722]" size={32} />
    }
  ];

  return (
    <section className="bg-brand-primary py-24 md:py-32 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <ShieldCheck size={800} strokeWidth={0.5} className="text-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span className="text-brand-taupe uppercase tracking-[0.4em] text-[10px] block mb-4 font-[600]">Our Commitment</span>
          <h2 className="text-white mb-6 leading-tight">The Master Builder’s <br /> <span className="font-serif opacity-90">Promise of Quality</span></h2>
          <p className="text-white/40 font-light leading-relaxed">
            Building a luxury home requires more than just skill—it requires accountability. We back every project with industry-leading guarantees and a dedication to absolute excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-[1px] overflow-hidden">
          {guarantees.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-brand-primary border border-white/5 flex flex-col items-center text-center group hover:bg-white/[0.02] transition-all"
            >
              <div className="mb-8 p-4 rounded-full bg-white/[0.03] group-hover:bg-[#FF5722]/10 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-white text-lg font-bold mb-4 uppercase tracking-wider font-sans">
                {item.title}
              </h3>
              <p className="text-white/40 text-[14px] leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
           <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-brand-taupe" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-white">Full Liability Insurance</span>
           </div>
           <div className="flex items-center gap-2">
              <Award size={20} className="text-brand-taupe" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-white">Master Builders Association Member</span>
           </div>
           <div className="flex items-center gap-2">
              <FileCheck size={20} className="text-brand-taupe" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-white">Registered Building Practitioner</span>
           </div>
        </div>
      </div>
    </section>
  );
};

const DetailedTestimonials = () => {
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  
  const testimonials = [
    {
      content: "Nathan is probably one of the best builders I EVER worked with ⚡⚡💯💯 I am not being dramatic, this was an amazing experience from start to finish!!! He is truly an expert when it comes to architectural construction, he helped me out and guided me through every technical detail!!! He walked me through the entire process and boy I am so grateful he was our builder, helping us out and I'm going to 100% work with him again for my next project!!!💯💯",
      author: "James Harrison",
      title: "Verified Homeowner",
      rating: "5.0",
      repeat: "2nd",
      success: "100%"
    },
    {
      content: "The level of precision Nathan and his crew brought to our renovation was truly remarkable ⚡. From the initial structural modifications to the final custom joinery, every detail was handled with master-level craftsmanship. Transparency was key, and we always felt in control of the project. A seamless, high-end experience that we couldn't recommend more highly to anyone seeking zero-compromise quality!!! 💯",
      author: "Sarah Montgomery",
      title: "Architectural Renovation",
      rating: "5.0",
      repeat: "1st",
      success: "100%"
    },
    {
      content: "Building with Nathan King was a breath of fresh air. His technical knowledge saved us thousands on structural decisions we didn't even know were possible. The communication was daily, the site was always clean, and the final result exceeded the architect's boldest expectations. If you want a builder who respects the design as much as you do, Nathan is the one. 🏗️✨",
      author: "Robert Chen",
      title: "Luxury New Build",
      rating: "5.0",
      repeat: "1st",
      success: "100%"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => prev + 0.5);
    }, 50); // 100 / 0.5 * 50ms = 10,000ms = 10s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setProgress(0);
      setActiveIdx(prev => (prev + 1) % testimonials.length);
    }
  }, [progress, testimonials.length]);

  const testimonial = testimonials[activeIdx];

  return (
    <section className="w-full bg-white py-12 sm:py-[100px] px-4 sm:px-6 font-sans overflow-hidden">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-10 sm:gap-[92px]">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-[clamp(1.75rem,7vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.04em] text-black m-0 font-outfit">
            Real results. Real stories.
          </h2>
          <h2 className="text-[clamp(1.75rem,7vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.04em] text-gray-400 m-0 font-outfit">
            See why clients trust <span className="font-serif text-black sm:ml-2">Nathan King.</span>
          </h2>
        </div>

        <div className="w-full max-w-[1080px] mx-auto relative pt-12 sm:pt-[90px]">
          <div className="relative overflow-visible min-h-[500px] sm:min-h-[580px]">
            <div className="relative flex justify-center items-center w-full h-full">
              {/* Stacked Cards Background - Hidden or Adjusted for tiny mobile */}
              <div className="absolute top-[-40px] sm:top-[-90px] w-[90%] h-full max-h-[400px] bg-[#f1f1f1] rounded-[16px] z-[1] shadow-[0_-4px_20px_rgba(0,0,0,0.03)] border border-black/5" />
              <div className="absolute top-[-20px] sm:top-[-68px] w-[95%] h-full max-h-[400px] rounded-[16px] z-[2] shadow-[0_-4px_25px_rgba(0,0,0,0.05)] border border-black/5 bg-[#1a1a1a]" />
              
              {/* Main Content Card */}
              <div className="relative z-[3] flex flex-col gap-3 sm:gap-6 w-full rounded-[24px] h-full p-6 sm:p-12 overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.12)] border border-black/5 bg-[#f1f1f1]">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-6 w-full h-full"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-2">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-primary rounded-full flex items-center justify-center text-white flex-shrink-0">
                            <CheckCircle2 size={24} />
                          </div>
                          <span className="font-bold tracking-tighter text-lg sm:text-xl uppercase whitespace-nowrap">Expert Review</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="text-[12px] font-medium text-black/55 uppercase tracking-widest">Construction</div>
                          <div className="w-1 h-1 rounded-full shrink-0 bg-[#797979] opacity-30" />
                          <div className="text-[12px] font-medium text-black/55 uppercase tracking-widest hidden sm:block">Design</div>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className="text-[#FFC107] fill-[#FFC107]" />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-6 rounded-[20px] h-full overflow-y-auto p-6 sm:p-12 shadow-inner bg-white min-h-[300px]">
                      <div className="text-[20px] sm:text-[clamp(22px,3vw,34px)] leading-[1.5] sm:leading-[1.4] text-black font-medium tracking-tight">
                        "{testimonial.content}"
                      </div>
                      
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mt-auto pt-10 border-t border-black/5">
                        <div className="flex flex-col gap-1">
                          <div className="text-[20px] sm:text-[22px] font-bold text-black uppercase tracking-tight leading-none">{testimonial.author}</div>
                          <div className="inline-block px-3 py-1 bg-green-100 text-green-700 text-[10px] uppercase font-bold rounded-full tracking-widest w-fit mt-2">
                            {testimonial.title}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 sm:gap-12">
                          <div className="flex flex-col gap-1">
                            <div className="font-serif text-[32px] sm:text-[44px] font-bold leading-none text-[#FF5722] tracking-tighter">{testimonial.rating}</div>
                            <div className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-black/40">Rating</div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="font-serif text-[32px] sm:text-[44px] font-bold leading-none text-black tracking-tighter">{testimonial.repeat}</div>
                            <div className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-black/40">Project</div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="font-serif text-[32px] sm:text-[44px] font-bold leading-none text-black tracking-tighter">{testimonial.success}</div>
                            <div className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-black/40">Delivery</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {/* Custom Progress Bar */}
          <div className="w-full h-[3px] bg-black/5 rounded-full overflow-hidden mt-12 mb-6">
            <div 
              className="h-full bg-brand-primary transition-all duration-100 ease-linear" 
              style={{ width: `${progress}%` }} 
            />
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveIdx(i);
                  setProgress(0);
                }}
                className={`h-1.5 transition-all duration-500 rounded-full ${activeIdx === i ? 'w-8 bg-brand-primary' : 'w-3 bg-black/10'}`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactCTA = () => {
  return (
    <section id="consultation" className="bg-brand-primary text-white section-padding text-center relative overflow-hidden">
      {/* Abstract Design Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] border border-white rounded-full -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] border border-white rounded-full translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-white mb-8">Ready to Start <br /> <span className="opacity-80">Your Project?</span></h2>
        <p className="text-xl text-white/70 font-light mb-12">
          If you’re planning a custom home, architectural renovation, or premium extension, the first step is a conversation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/survey" className="btn-primary !bg-white !text-brand-primary hover:!bg-brand-grey-soft w-full sm:w-auto px-12 font-[500]">
             Book Your Consultation
          </Link>
          <Link to="/survey" className="btn-secondary !border-white/40 !text-white hover:!bg-white/10 w-full sm:w-auto px-12 font-[500]">
             Discuss Your Project
          </Link>
        </div>
        <p className="mt-12 text-[11px] uppercase tracking-[0.4em] opacity-40 font-[500]">Available for projects across Victoria & NSW</p>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-primary text-white section-padding border-t border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
        <div className="col-span-1 md:col-span-2">
          <a href="#" className="text-2xl font-serif tracking-widest uppercase block mb-6">LET BUILD TOGETHER</a>
          <p className="text-white/40 font-light max-w-sm leading-relaxed text-[16px] mb-8">
            Master Builder with over 30 years of experience delivering luxury homes, renovations, and architectural projects across NSW.
          </p>
          <div className="space-y-2 text-[11px] uppercase tracking-[0.2em] opacity-40 font-[500]">
            <p>Builder's License: 202386C</p>
            <p>ABN: 79 497 254 482</p>
          </div>
        </div>
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.3em] font-sans mb-8 opacity-50 font-[500] text-white">Services</h4>
          <ul className="space-y-4 text-xs uppercase tracking-widest font-[500]">
            <li><a href="#services" className="hover:text-brand-taupe transition-colors">Custom New Homes</a></li>
            <li><a href="#services" className="hover:text-brand-taupe transition-colors">Architectural Renovations</a></li>
            <li><a href="#services" className="hover:text-brand-taupe transition-colors">Additions & Extensions</a></li>
            <li><a href="#services" className="hover:text-brand-taupe transition-colors">Premium Joinery</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] uppercase tracking-[0.3em] font-sans mb-8 opacity-50 font-[500] text-white">Contact</h4>
          <ul className="space-y-4 text-xs tracking-widest lowercase opacity-60 font-[500]">
            <li>nathan@nathanking.com.au</li>
            <li className="uppercase text-[10px] mt-4 opacity-40 font-[400]">Merewether, NSW</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-[400]">© 2026 Nathan King. All rights reserved.</p>
        <div className="flex gap-6 opacity-30 hover:opacity-100 transition-opacity">
           <a href="#" className="hover:text-brand-taupe transition-colors" aria-label="Facebook"><Facebook size={18} /></a>
           <a href="#" className="hover:text-brand-taupe transition-colors" aria-label="LinkedIn"><Linkedin size={18} /></a>
           <a href="#" className="hover:text-brand-taupe transition-colors" aria-label="YouTube"><Youtube size={18} /></a>
           <a href="#" className="hover:text-brand-taupe transition-colors" aria-label="Instagram"><Instagram size={18} /></a>
        </div>
      </div>
    </footer>
  );
};

import { SurveyPage } from './components/SurveyPage';

// --- Landing Page Layout ---
const LandingPage = () => {
  return (
    <main className="selection:bg-brand-taupe selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <SocialProof />
      <WorkExperience />
      <FounderStory />
      <ProblemSection />
      <Services />
      <ProcessSection />
      <Portfolio />
      <GuaranteeSection />
      <DetailedTestimonials />
      <ContactCTA />
      <Footer />
    </main>
  );
};

// --- Scroll to Top on Route Change ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Main App ---
export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/survey" element={<SurveyPage />} />
      </Routes>
    </Router>
  );
}
