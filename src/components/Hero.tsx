import React from 'react';
import { 
  Sparkle, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  FileText, 
  Edit3, 
  Code2, 
  User 
} from 'lucide-react';
import { DeveloperProfile } from '../types';

interface HeroProps {
  profile: DeveloperProfile;
  setIsResumeOpen: (isOpen: boolean) => void;
  isEditorMode?: boolean;
  setIsCustomizerOpen?: (isOpen: boolean) => void;
  setCustomizerTab?: (tab: any) => void;
}

export default function Hero({
  profile,
  setIsResumeOpen,
  isEditorMode = false,
  setIsCustomizerOpen = () => {},
  setCustomizerTab = () => {},
}: HeroProps) {
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    setImageError(false);
  }, [profile.profilePictureUrl]);

  return (
    <section id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center scroll-mt-24 pt-4">
      
      {/* Hero text & Biography */}
      <div className="lg:col-span-7 space-y-8 text-left">
        <div className="space-y-4">
          <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 px-3.5 py-1.5 rounded-full text-xs text-indigo-300 font-mono">
            <Sparkle className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Available for Full-Stack & Developer Positions</span>
          </div>

          {/* Massive Name Display */}
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono">Full-Stack Software Developer</p>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white font-display leading-none">
              BHOPE VARUN
            </h1>
            
            {/* DIRECT HERO CONTACT INFO BLOCK */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 pb-2 text-xs text-slate-400 border-b border-slate-900/40">
              <a href={`mailto:${profile.email}`} className="flex items-center space-x-2 hover:text-indigo-450 transition-colors group cursor-pointer">
                <Mail className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="font-mono tracking-wide">{profile.email}</span>
              </a>
              <a href={`tel:${profile.phone}`} className="flex items-center space-x-2 hover:text-emerald-450 transition-colors group cursor-pointer border-l border-slate-800/80 pl-6 mobile-no-border">
                <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="font-mono tracking-wide">{profile.phone || '+91 8639718579'}</span>
              </a>
              <div className="flex items-center space-x-2 border-l border-slate-800/80 pl-6 mobile-no-border">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="font-mono tracking-wide text-slate-400">{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Dynamic Tagline Title */}
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-300">
            Hi, I am Varun. Let's build efficient applications using <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 font-bold">React, Node, & Intelligent APIs</span>.
          </h2>
        </div>

        {/* Quick CTAs list */}
        <div className="flex flex-wrap gap-4 pt-2">
          <a 
            href="#projects" 
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl transition-all flex items-center space-x-2 shadow-lg shadow-indigo-900/20"
          >
            <span>Browse Project Lab</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a 
            href="#contact" 
            className="px-6 py-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 font-semibold text-sm rounded-xl transition-all"
          >
            Let's Collab
          </a>

          {/* RESUME CONSOLE INITIATOR */}
          <button 
            onClick={() => setIsResumeOpen(true)}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all flex items-center space-x-2 shadow-lg shadow-emerald-950/20"
          >
            <FileText className="w-4 h-4 text-emerald-100" />
            <span>View & Print Resumé</span>
          </button>

          {/* QUICK DIRECT EDIT BUTTON */}
          {isEditorMode && (
            <button 
              onClick={() => {
                setIsCustomizerOpen(true);
                setCustomizerTab('general');
              }}
              className="px-4 py-3 bg-indigo-950/30 hover:bg-indigo-900/35 border border-indigo-850 hover:border-indigo-700 text-indigo-300 font-semibold text-sm rounded-xl transition-all flex items-center space-x-1.5"
            >
              <Edit3 className="w-4 h-4" />
              <span>✏️ Edit Bio Details</span>
            </button>
          )}
        </div>

        {/* Live Counter Indicators Grid */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-900/85 max-w-xl">
          <div className="p-4 bg-slate-900/40 border border-slate-800/50 rounded-2xl">
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400 font-display">{profile.yearsExperience}+</span>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Years Coding</p>
          </div>
          <div className="p-4 bg-slate-900/40 border border-slate-800/50 rounded-2xl">
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 font-display">{profile.projectsCount}+</span>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Built Repos</p>
          </div>
          <div className="p-4 bg-slate-900/40 border border-slate-800/50 rounded-2xl">
            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400 font-display">{profile.weeklyContributions}+</span>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">Avg Commit/wk</p>
          </div>
        </div>
      </div>

      {/* Hero Portrait Photo Box (On Right side of desktop view) */}
      <div className="lg:col-span-5 relative flex justify-center items-center mt-8 lg:mt-0 px-2">
        <div className="relative w-full max-w-[340px] select-none">
          
          {/* Outer decorative soft glow that matches back container theme */}
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/20 via-sky-500/20 to-emerald-500/20 rounded-[32px] blur-xl opacity-75"></div>

          {/* Main White Card as seen in Screenshot */}
          <div 
            className="relative bg-white text-slate-800 rounded-[28px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-100 overflow-visible w-full"
            style={{ 
              backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)', 
              backgroundSize: '16px 16px' 
            }}
          >
            
            {/* Floating Card: Full Stack Intern (Top Right - overlaps slightly) */}
            <div className="absolute -top-6 -right-3 sm:-right-4 bg-white rounded-2xl p-2.5 px-3.5 flex items-center space-x-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-slate-100/80 z-20 transition-transform hover:scale-[1.03]">
              <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="text-left leading-none font-sans">
                <p className="text-[11px] font-extrabold text-slate-800 tracking-tight leading-normal">Full Stack Intern</p>
                <p className="text-[9px] text-slate-400 font-bold tracking-wide mt-0.5">Prodesk IT</p>
              </div>
            </div>

            {/* Portrait Circle Layout */}
            <div className="relative w-44 h-44 rounded-full border-4 border-white shadow-[0_8px_24px_rgba(0,0,0,0.1)] overflow-visible mx-auto mt-4 z-10 group/avatar">
              
              {/* Real headshot image circular shape */}
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 relative">
                <img 
                  src={profile.profilePictureUrl || '/avatar.svg'} 
                  alt={profile.name} 
                  className="w-full h-full object-cover transition-transform duration-305 group-hover/avatar:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    console.warn("Avatar image failed to load, falling back to placeholder svg:");
                    const target = e.target as HTMLImageElement;
                    if (target.src && !target.src.endsWith('/avatar.svg')) {
                      target.src = '/avatar.svg';
                    }
                  }}
                />
              </div>

              {/* Overlap Badge: Active Intern (Bottom Left) */}
              <div className="absolute bottom-1 left-[-4px] bg-white border border-slate-100/90 rounded-full py-1 px-3 flex items-center shadow-[0_4px_12px_rgba(0,0,0,0.08)] z-20">
                <span className="w-1 h-3.5 bg-emerald-500 rounded-full mr-1.5 shrink-0 animate-pulse"></span>
                <div className="text-left leading-none font-sans font-black flex flex-col justify-center">
                  <span className="text-[7.5px] tracking-widest text-slate-400 leading-tight font-mono">ACTIVE</span>
                  <span className="text-[8.5px] tracking-wider text-slate-700 leading-tight uppercase font-mono">INTERN</span>
                </div>
              </div>
            </div>

            {/* Info and Tags Section under Portrait */}
            <div className="mt-5 text-center font-sans">
              
              {/* SOFTWARE ENGINEER (Blue subtitle) */}
              <p className="text-[9px] font-black tracking-widest text-blue-600 font-mono uppercase leading-none">
                SOFTWARE ENGINEER
              </p>

              {/* Varun's Name Header */}
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1.5 mb-2.5">
                {profile.name}
              </h3>

              {/* Skills/Tags List Pill Row */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4 max-w-[260px] mx-auto">
                {['java.io', 'react-hooks', 'embedded-iot'].map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="px-2 py-0.5 bg-slate-55/60 hover:bg-slate-55 border border-slate-200/40 text-[9px] font-bold text-slate-500 rounded-md shrink-0 font-mono transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Invisible horizontal divider */}
              <div className="border-t border-slate-200/40 my-3"></div>

              {/* LOC & Live online indicators */}
              <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-400 px-1">
                <span className="tracking-tighter">LOC: 12.5k</span>
                <span className="flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
                  <span className="text-slate-400 tracking-tighter">status_online</span>
                </span>
              </div>

            </div>

            {/* Small Edit button hidden if not in isEditorMode */}
            {isEditorMode && (
              <button 
                onClick={() => {
                  setIsCustomizerOpen(true);
                  setCustomizerTab('general');
                }}
                className="absolute bottom-2 right-2 p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all scale-75 z-20 shadow"
                title="Change Profile Photo"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
