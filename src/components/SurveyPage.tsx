import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ChevronLeft, 
  Home, 
  Hammer, 
  Layout, 
  Gem, 
  MapPin, 
  Clock, 
  PencilRuler,
  CheckCircle2,
  ChevronRight,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    id: 'project-type',
    question: "What type of project are you planning?",
    options: [
      { id: 'new-build', label: 'Luxury New Build', icon: <Home size={24} />, desc: 'Starting from the ground up.' },
      { id: 'renovation', label: 'Architectural Renovation', icon: <Hammer size={24} />, desc: 'Transforming an existing masterpiece.' },
      { id: 'extension', label: 'Extension & Addition', icon: <Layout size={24} />, desc: 'Expanding your living legacy.' },
      { id: 'joinery', label: 'Premium Joinery', icon: <Gem size={24} />, desc: 'Exquisite custom craftsmanship.' }
    ]
  },
  {
    id: 'budget',
    question: "What is your estimated investment range?",
    options: [
      { id: 'stage-1', label: '$500k – $1M+', icon: <CheckCircle2 size={20} />, desc: 'Premium renovations and extensions.' },
      { id: 'stage-2', label: '$1M – $2.5M+', icon: <CheckCircle2 size={20} />, desc: 'Bespoke custom new builds.' },
      { id: 'stage-3', label: '$2.5M – $5M+', icon: <CheckCircle2 size={20} />, desc: 'Significant architectural estates.' },
      { id: 'stage-other', label: 'Planning / TBC', icon: <CheckCircle2 size={20} />, desc: 'Early feasibility stages.' }
    ]
  },
  {
    id: 'architect',
    question: "Do you have an architect already?",
    options: [
      { id: 'arch-yes', label: 'Yes, we have plans', icon: <PencilRuler size={24} />, desc: 'Ready for technical tendering.' },
      { id: 'arch-no', label: 'No, I need a referral', icon: <PencilRuler size={24} />, desc: 'I need a trusted design partner.' },
      { id: 'arch-early', label: 'Just starting out', icon: <PencilRuler size={24} />, desc: 'Exploratory phase.' }
    ]
  },
  {
    id: 'timeline',
    question: "What is your preferred timeline?",
    options: [
      { id: 'time-asap', label: 'As soon as possible', icon: <Clock size={20} />, desc: 'Ready to mobilize teams.' },
      { id: 'time-6-12', label: '6 – 12 Months', icon: <Clock size={20} />, desc: 'Targeting next financial year.' },
      { id: 'time-12-24', label: '1 – 2 Years', icon: <Clock size={20} />, desc: 'Planning ahead for quality.' },
      { id: 'time-not-sure', label: 'Exploratory', icon: <Clock size={20} />, desc: 'Seeing what is possible.' }
    ]
  }
];

export const SurveyPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', location: '' });

  const totalSteps = steps.length + 1; // +1 for contact info
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleOptionSelect = (optionId: string) => {
    setFormData(prev => ({ ...prev, [steps[currentStep].id]: optionId }));
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => prev + 1);
      } else {
        setCurrentStep(steps.length);
      }
    }, 400);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log('Survey Submitted:', { ...formData, ...contactInfo });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-6 font-sans">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[32px] p-12 text-center shadow-2xl border border-brand-grey-soft/30"
        >
          <div className="w-20 h-20 bg-brand-primary text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-serif mb-4 text-brand-primary">Thank You, {contactInfo.name.split(' ')[0]}</h2>
          <p className="text-text-secondary mb-10 leading-relaxed font-light">
            Nathan King will personally review your project details. We'll be in touch within 24–48 hours to discuss the next steps of your luxury build.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-xs hover:text-brand-taupe transition-colors"
          >
            Back to Home <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col font-sans">
      {/* Header */}
      <header className="p-4 sm:p-8 flex justify-between items-center border-b border-brand-grey-soft/20 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-black/5 shadow-inner">
            <img 
              src="https://d1yei2z3i6k35z.cloudfront.net/17304791/69e8de9c13ff54.81477736_image-removebg-preview.png" 
              alt="Nathan King" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-serif font-bold text-brand-primary tracking-tight group-hover:text-brand-taupe transition-colors text-sm sm:text-base whitespace-nowrap">LET BUILD TOGETHER</span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-text-secondary opacity-50">
            {currentStep + 1} / {totalSteps}
          </div>
          <Link to="/" className="text-text-secondary hover:text-brand-primary transition-colors">
            <X size={20} className="sm:w-6 sm:h-6" />
          </Link>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-brand-grey-soft/20">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-brand-primary transition-all duration-500"
        />
      </div>

      <main className="flex-1 flex flex-col items-center justify-start sm:justify-center p-4 sm:p-6 max-w-4xl mx-auto w-full py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {currentStep < steps.length ? (
            <motion.div
              key={steps[currentStep].id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full"
            >
              <h1 className="text-[clamp(1.5rem,7vw,2.75rem)] font-serif mb-8 sm:mb-12 text-center text-brand-primary leading-tight px-2">
                {steps[currentStep].question}
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl mx-auto">
                {steps[currentStep].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`group relative p-5 sm:p-8 rounded-[20px] sm:rounded-[24px] border-2 text-left transition-all duration-300 flex items-start gap-4 sm:gap-5 hover:scale-[1.01] active:scale-95 ${
                      formData[steps[currentStep].id] === option.id 
                        ? 'border-brand-primary bg-white shadow-xl' 
                        : 'border-brand-grey-soft/30 hover:border-brand-taupe bg-white/30 backdrop-blur-sm'
                    }`}
                  >
                    <div className={`mt-0.5 sm:mt-1 p-2 sm:p-3 rounded-xl transition-colors duration-300 ${
                      formData[steps[currentStep].id] === option.id 
                        ? 'bg-brand-primary text-white' 
                        : 'bg-white text-brand-taupe group-hover:text-brand-primary'
                    }`}>
                      {React.cloneElement(option.icon as React.ReactElement, { size: 20 })}
                    </div>
                    <div>
                      <h3 className="font-bold text-base sm:text-lg text-brand-primary mb-1">{option.label}</h3>
                      <p className="text-text-secondary text-[13px] sm:text-sm font-light leading-relaxed">{option.desc}</p>
                    </div>
                    {formData[steps[currentStep].id] === option.id && (
                      <div className="absolute top-4 right-4 text-brand-primary animate-in zoom-in duration-300">
                        <CheckCircle2 size={20} className="sm:w-6 sm:h-6" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="final-info"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-2xl"
            >
              <h1 className="text-[clamp(1.5rem,7vw,2.75rem)] font-serif mb-6 sm:mb-8 text-center text-brand-primary leading-tight">
                Almost finished. <br /> <span>How can we reach you?</span>
              </h1>

              <form onSubmit={handleFinalSubmit} className="space-y-4 sm:space-y-6 bg-white p-6 sm:p-10 rounded-[24px] sm:rounded-[32px] shadow-2xl border border-brand-grey-soft/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary ml-1">Full Name</label>
                    <input 
                      required
                      type="text"
                      placeholder="Jane Doe"
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-brand-grey-soft/30 focus:border-brand-primary focus:outline-none transition-all font-medium text-brand-primary text-sm sm:text-base"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary ml-1">Project Location</label>
                    <div className="relative">
                      <input 
                        required
                        type="text"
                        placeholder="Merewether, NSW"
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 pl-10 sm:pl-12 rounded-xl border border-brand-grey-soft/30 focus:border-brand-primary focus:outline-none transition-all font-medium text-brand-primary text-sm sm:text-base"
                        value={contactInfo.location}
                        onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
                      />
                      <MapPin className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 text-brand-taupe opacity-50" size={18} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary ml-1">Email Address</label>
                    <input 
                      required
                      type="email"
                      placeholder="jane@example.com"
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-brand-grey-soft/30 focus:border-brand-primary focus:outline-none transition-all font-medium text-brand-primary text-sm sm:text-base"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-text-secondary ml-1">Phone Number</label>
                    <input 
                      required
                      type="tel"
                      placeholder="+61 400 000 000"
                      className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl border border-brand-grey-soft/30 focus:border-brand-primary focus:outline-none transition-all font-medium text-brand-primary text-sm sm:text-base"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-primary text-white py-4 sm:py-5 rounded-xl font-bold uppercase tracking-widest text-[11px] sm:text-xs hover:bg-brand-secondary transition-all flex items-center justify-center gap-2 sm:gap-3 mt-2 sm:mt-4 group"
                >
                  Request My Private Consultation <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Navigation */}
      <footer className="p-8 border-t border-brand-grey-soft/20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center w-full">
          <button 
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] transition-all ${
              currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-text-secondary hover:text-brand-primary'
            }`}
          >
            <ChevronLeft size={16} /> Previous
          </button>
          <div className="flex gap-2">
            {[...Array(totalSteps)].map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentStep ? 'bg-brand-primary scale-125' : i < currentStep ? 'bg-brand-primary opacity-30' : 'bg-brand-grey-soft/50'
                }`} 
              />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};
