import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Search, 
  Lightbulb, 
  Play, 
  CheckCircle, 
  X, 
  RotateCcw, 
  BrainCircuit, 
  Activity, 
  Flame, 
  Award, 
  BookOpen, 
  ChevronRight, 
  GraduationCap, 
  Workflow, 
  HelpCircle,
  TrendingUp,
  Sliders,
  Check,
  AlertTriangle,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Terminal,
  Code2,
  ExternalLink,
  Milestone,
  ArrowRight,
  Send,
  User,
  FolderDot,
  Cpu,
  Layers,
  Sparkle,
  Briefcase,
  Settings,
  Plus,
  Trash2,
  Edit3,
  Save,
  FileText,
  Phone,
  MapPin
} from 'lucide-react';
import { Project, TimelineItem, ChatMessage, SentMessage, DeveloperProfile } from './types';
import { defaultProfile } from './defaultData';
import ResumeModal from './components/ResumeModal';
import Hero from './components/Hero';
import Footer from './components/Footer';

export default function App() {
  // Primary Profile CMS State (persisted in localStorage)
  const [profile, setProfile] = useState<DeveloperProfile>(() => {
    const saved = localStorage.getItem('varun_profile_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed || !parsed.name || !parsed.projects) {
          return defaultProfile;
        }
        // Migrate old Unsplash placeholder image to our new local /avatar.svg
        if (parsed.profilePictureUrl && parsed.profilePictureUrl.includes('images.unsplash.com')) {
          parsed.profilePictureUrl = '/avatar.svg';
        }
        return parsed;
      } catch (e) {
        console.error("Failed to parse saved profile data", e);
      }
    }
    return defaultProfile;
  });

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [customizerTab, setCustomizerTab] = useState<'general' | 'projects' | 'skills' | 'timeline'>('general');

  // Load initial states from localStorage if they exist
  useEffect(() => {
    const savedEditorMode = localStorage.getItem('varun_portfolio_editor_mode');
    if (savedEditorMode) {
      setIsEditorMode(savedEditorMode === 'true');
    }
  }, []);

  const handleResetProfile = () => {
    if (window.confirm("Are you sure you want to reset all profile details back to default values?")) {
      updateProfile(defaultProfile);
      window.location.reload();
    }
  };

  // Navigation & Categorization
  const [activeCategory, setActiveCategory] = useState<'All' | 'Full-Stack' | 'AI / ML' | 'Creative'>('All');
  
  // Contact Form States
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [sentMessages, setSentMessages] = useState<SentMessage[]>([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Load sent messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sent_portfolio_messages');
    if (saved) {
      setSentMessages(JSON.parse(saved));
    }
  }, []);

  const updateProfile = (updated: DeveloperProfile) => {
    setProfile(updated);
    localStorage.setItem('varun_profile_data', JSON.stringify(updated));
  };




  // Submit contact message on UI with real sandbox persistence
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    const newMsg: SentMessage = {
      name: contactName,
      email: contactEmail,
      message: contactMessage,
      date: new Date().toLocaleDateString() + ' at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newMsg, ...sentMessages];
    setSentMessages(updated);
    localStorage.setItem('sent_portfolio_messages', JSON.stringify(updated));

    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setFormSubmitted(true);
    
    // Auto reset submission indicator after 4 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 4000);
  };

  const filteredProjects = activeCategory === 'All' 
    ? profile.projects 
    : profile.projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-x-hidden pt-[74px]">
      
      {/* Visual background lights */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.12),transparent_60%)] pointer-events-none z-0"></div>
      <div className="absolute top-[800px] right-0 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.06),transparent_50%)] pointer-events-none z-0"></div>
      
      {/* TOP GLASSMORPHIC NAVIGATION HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/60 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 p-2 rounded-xl shadow-inner">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-left">
            <h1 className="text-md font-bold tracking-tight text-white font-display">{profile.name}</h1>
            <p className="text-[10px] text-indigo-400 font-mono tracking-wider uppercase font-semibold">{profile.title}</p>
          </div>
        </div>

        {/* Global links */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold tracking-wide text-slate-400">
          <a href="#about" className="hover:text-white transition-colors">Home</a>
          <a href="#about-me" className="hover:text-white transition-colors">About Me</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#timeline" className="hover:text-white transition-colors">Experiences</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact Log</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 md:space-x-3.5">
          {/* RESUME DOWNLOAD BUTTON */}
          <button 
            onClick={() => setIsResumeOpen(true)}
            className="flex items-center space-x-1.5 px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-300 hover:text-emerald-200 text-xs font-bold rounded-xl transition-all"
            title="View & Download Resume PDF"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Resume / CV</span>
          </button>

          <a 
            href={`mailto:${profile.email}`} 
            className="p-2 bg-slate-800/80 hover:bg-slate-700 hover:text-white border border-slate-700/60 text-slate-300 rounded-xl transition-all"
            title="Mail Directly"
          >
            <Mail className="w-4 h-4" />
          </a>

        </div>
      </header>

      {/* PORTFOLIO CONTENT CUSTOMIZATION SIDE PANEL (DRAWER) */}
      {isCustomizerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop mask */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity"
            onClick={() => setIsCustomizerOpen(false)}
          ></div>
          
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xl bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
              
              {/* Drawer header */}
              <div className="p-6 bg-slate-950 border-b border-slate-800 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-left">
                    <Settings className="w-5 h-5 text-indigo-400" />
                    <div>
                      <h3 className="text-sm font-bold text-white">Live Portfolio Customizer</h3>
                      <p className="text-[10px] text-slate-500 font-mono">Changes update instantly below and sync with the AI agent!</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsCustomizerOpen(false)}
                    className="p-1 px-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white text-xs transition-colors"
                  >
                    Close
                  </button>
                </div>

                <div className="flex items-center justify-between border-t border-slate-850/60 pt-3">
                  <div className="flex items-center space-x-2.5 bg-slate-900 border border-slate-850 px-2.5 py-1.5 rounded-xl">
                    <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">Visual Edit Mode</span>
                    <button
                      onClick={() => {
                        const nextVal = !isEditorMode;
                        setIsEditorMode(nextVal);
                        localStorage.setItem('varun_portfolio_editor_mode', String(nextVal));
                      }}
                      className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isEditorMode ? 'bg-indigo-600' : 'bg-slate-700'}`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${isEditorMode ? 'translate-x-5' : 'translate-x-0'}`}
                      />
                    </button>
                    <span className={`text-[9px] font-bold font-mono ${isEditorMode ? 'text-indigo-400' : 'text-slate-500'}`}>
                      {isEditorMode ? 'ON' : 'OFF'}
                    </span>
                  </div>

                  <button 
                    onClick={handleResetProfile}
                    className="text-[9px] font-mono text-slate-500 hover:text-slate-350 bg-slate-900 border border-slate-850 hover:bg-slate-850 px-3 py-1.5 rounded-lg transition-colors"
                    title="Restore default placeholder info"
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>

              {/* Tab selectors */}
              <div className="flex border-b border-slate-800 bg-slate-950/40 text-xs font-semibold">
                <button 
                  onClick={() => setCustomizerTab('general')}
                  className={`flex-1 py-3 text-center transition-all border-b-2 ${customizerTab === 'general' ? 'border-indigo-500 text-indigo-400 bg-slate-900/40' : 'border-transparent text-slate-400 hover:text-slate-250'}`}
                >
                  General Profile
                </button>
                <button 
                  onClick={() => setCustomizerTab('projects')}
                  className={`flex-1 py-3 text-center transition-all border-b-2 ${customizerTab === 'projects' ? 'border-indigo-500 text-indigo-400 bg-slate-900/40' : 'border-transparent text-slate-400 hover:text-slate-250'}`}
                >
                  Projects ({profile.projects.length})
                </button>
                <button 
                  onClick={() => setCustomizerTab('skills')}
                  className={`flex-1 py-3 text-center transition-all border-b-2 ${customizerTab === 'skills' ? 'border-indigo-500 text-indigo-400 bg-slate-900/40' : 'border-transparent text-slate-400 hover:text-slate-250'}`}
                >
                  Skills Stack
                </button>
                <button 
                  onClick={() => setCustomizerTab('timeline')}
                  className={`flex-1 py-3 text-center transition-all border-b-2 ${customizerTab === 'timeline' ? 'border-indigo-500 text-indigo-400 bg-slate-900/40' : 'border-transparent text-slate-400 hover:text-slate-250'}`}
                >
                  Timeline ({profile.timeline.length})
                </button>
              </div>

              {/* Form Content area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-left">
                
                {/* GENERAL PROFILE SETTINGS */}
                {customizerTab === 'general' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Developer Name</label>
                        <input 
                          type="text" 
                          value={profile.name}
                          onChange={(e) => updateProfile({ ...profile, name: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Job Title / Tagline</label>
                        <input 
                          type="text" 
                          value={profile.title}
                          onChange={(e) => updateProfile({ ...profile, title: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Email Contact</label>
                        <input 
                          type="email" 
                          value={profile.email}
                          onChange={(e) => updateProfile({ ...profile, email: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Location Base</label>
                        <input 
                          type="text" 
                          value={profile.location}
                          onChange={(e) => updateProfile({ ...profile, location: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Custom Biography Bio</label>
                      <textarea 
                        rows={8}
                        value={profile.bio}
                        onChange={(e) => updateProfile({ ...profile, bio: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-indigo-500 resize-y font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase font-mono">Experience Years</label>
                        <input 
                          type="number" 
                          value={profile.yearsExperience}
                          onChange={(e) => updateProfile({ ...profile, yearsExperience: parseInt(e.target.value) || 0 })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase font-mono">Completed Repos</label>
                        <input 
                          type="number" 
                          value={profile.projectsCount}
                          onChange={(e) => updateProfile({ ...profile, projectsCount: parseInt(e.target.value) || 0 })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-slate-400 uppercase font-mono">Avg Commit/wk</label>
                        <input 
                          type="number" 
                          value={profile.weeklyContributions}
                          onChange={(e) => updateProfile({ ...profile, weeklyContributions: parseInt(e.target.value) || 0 })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Phone Number</label>
                        <input 
                          type="text" 
                          value={profile.phone || ''}
                          onChange={(e) => updateProfile({ ...profile, phone: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Profile Picture Image (URL or Uploader)</label>
                        <input 
                          type="text" 
                          value={profile.profilePictureUrl || ''}
                          onChange={(e) => updateProfile({ ...profile, profilePictureUrl: e.target.value })}
                          placeholder="Or paste remote image link here..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-indigo-500 mb-2"
                        />
                        <div className="flex gap-2">
                          <input 
                            type="file" 
                            accept="image/*"
                            id="drawer-photo-file-upload"
                            disabled={isUploadingPhoto}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setIsUploadingPhoto(true);
                                const reader = new FileReader();
                                reader.onloadend = async () => {
                                  if (typeof reader.result === 'string') {
                                    try {
                                      // Save base64 string directly in the client state so it survives container restarts/deploys perfectly
                                      const base64Data = reader.result;
                                      updateProfile({ ...profile, profilePictureUrl: base64Data });
                                      
                                      // Concurrently sync the static file to server codebase in background
                                      fetch('/api/upload-avatar', {
                                        method: 'POST',
                                        headers: {
                                          'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                          image: base64Data,
                                          filename: file.name
                                        })
                                      })
                                      .then(res => res.json())
                                      .then(data => {
                                        console.log("Background codebase write synced successfully:", data);
                                      })
                                      .catch(err => {
                                        console.warn("Background workspace write skipped in standalone or production mode:", err);
                                      });
                                    } catch (err) {
                                      console.error("Local upload handling failed:", err);
                                    } finally {
                                      setIsUploadingPhoto(false);
                                    }
                                  } else {
                                    setIsUploadingPhoto(false);
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="hidden"
                          />
                          <label 
                            htmlFor="drawer-photo-file-upload"
                            className={`flex-1 flex items-center justify-center space-x-1.5 px-3 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${isUploadingPhoto ? 'bg-indigo-600/10 border border-indigo-500/20 text-slate-400 cursor-not-allowed' : 'bg-indigo-600/20 hover:bg-indigo-600/35 border border-indigo-500/30 hover:border-indigo-500/50 text-indigo-300 hover:text-white'}`}
                          >
                            {isUploadingPhoto ? (
                              <>
                                <span className="animate-spin h-3.5 w-3.5 border-2 border-indigo-400 border-t-transparent rounded-full mr-1" />
                                <span>Uploading image...</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Upload local PNG/JPG</span>
                              </>
                            )}
                          </label>
                          <button
                            type="button"
                            onClick={() => updateProfile({ ...profile, profilePictureUrl: "/avatar.svg" })}
                            className="px-3 py-2 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-850 hover:border-slate-800 text-xs font-semibold rounded-lg transition-colors"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">GitHub Profile Link</label>
                        <input 
                          type="text" 
                          value={profile.githubUrl}
                          onChange={(e) => updateProfile({ ...profile, githubUrl: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">LinkedIn Profile Link</label>
                        <input 
                          type="text" 
                          value={profile.linkedinUrl}
                          onChange={(e) => updateProfile({ ...profile, linkedinUrl: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PROJECTS WORK CMS PANEL */}
                {customizerTab === 'projects' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Projects Showcase Collection</span>
                      <button 
                        onClick={() => {
                          const newProj: Project = {
                            title: "New Custom System Repository",
                            category: "Full-Stack",
                            description: "Give a brief summary of what this custom web module or LLM architecture delivers.",
                            details: ["Added clean performance metrics.", "Refactored user-facing layout sheets."],
                            tech: ["TypeScript", "React", "PostgreSQL"],
                            githubUrl: "https://github.com",
                            demoUrl: "https://github.com",
                            stats: "Verified Safe Sandbox"
                          };
                          updateProfile({ ...profile, projects: [newProj, ...profile.projects] });
                        }}
                        className="flex items-center space-x-1.5 text-[10px] text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg font-bold"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Project</span>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {profile.projects.map((p, index) => (
                        <div key={index} className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl space-y-3 relative">
                          <button 
                            onClick={() => {
                              const updatedProjs = profile.projects.filter((_, idx) => idx !== index);
                              updateProfile({ ...profile, projects: updatedProjs });
                            }}
                            className="absolute top-4 right-4 p-1 rounded hover:bg-rose-500/15 text-slate-500 hover:text-rose-400"
                            title="Delete this project item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="grid grid-cols-12 gap-3 pr-8">
                            <div className="col-span-8 space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 font-mono block">Project Title</label>
                              <input 
                                type="text" 
                                value={p.title}
                                onChange={(e) => {
                                  const updated = [...profile.projects];
                                  updated[index].title = e.target.value;
                                  updateProfile({ ...profile, projects: updated });
                                }}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                              />
                            </div>
                            <div className="col-span-4 space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 font-mono block">Category</label>
                              <select 
                                value={p.category}
                                onChange={(e) => {
                                  const updated = [...profile.projects];
                                  updated[index].category = e.target.value as any;
                                  updateProfile({ ...profile, projects: updated });
                                }}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                              >
                                <option value="Full-Stack">Full-Stack</option>
                                <option value="AI / ML">AI / ML</option>
                                <option value="Creative">Creative</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 font-mono block">Short Description</label>
                            <textarea 
                              rows={2}
                              value={p.description}
                              onChange={(e) => {
                                const updated = [...profile.projects];
                                updated[index].description = e.target.value;
                                updateProfile({ ...profile, projects: updated });
                              }}
                              className="w-full bg-slate-900 border border-slate-850 rounded px-2 py-1.5 text-xs text-white"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 font-mono block">Tech stack (comma split)</label>
                              <input 
                                type="text" 
                                value={p.tech.join(', ')}
                                onChange={(e) => {
                                  const updated = [...profile.projects];
                                  updated[index].tech = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
                                  updateProfile({ ...profile, projects: updated });
                                }}
                                className="w-full bg-slate-900 border border-slate-850 rounded px-2 py-1 text-xs text-white font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 font-mono block">Telemetry Stats Display Tag</label>
                              <input 
                                type="text" 
                                value={p.stats}
                                onChange={(e) => {
                                  const updated = [...profile.projects];
                                  updated[index].stats = e.target.value;
                                  updateProfile({ ...profile, projects: updated });
                                }}
                                className="w-full bg-slate-900 border border-slate-850 rounded px-2 py-1 text-xs text-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 font-mono block">Git Code URL</label>
                              <input 
                                type="text" 
                                value={p.githubUrl}
                                onChange={(e) => {
                                  const updated = [...profile.projects];
                                  updated[index].githubUrl = e.target.value;
                                  updateProfile({ ...profile, projects: updated });
                                }}
                                className="w-full bg-slate-900 border border-slate-855 rounded px-2 py-1 text-[11px] text-white font-mono"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 font-mono block">Live Demo Link</label>
                              <input 
                                type="text" 
                                value={p.demoUrl}
                                onChange={(e) => {
                                  const updated = [...profile.projects];
                                  updated[index].demoUrl = e.target.value;
                                  updateProfile({ ...profile, projects: updated });
                                }}
                                className="w-full bg-slate-900 border border-slate-855 rounded px-2 py-1 text-[11px] text-white font-mono"
                              />
                            </div>
                          </div>

                          {/* bullet items */}
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 font-mono block">Technical Highlights (one per line)</label>
                            <textarea 
                              rows={2}
                              value={p.details.join('\n')}
                              onChange={(e) => {
                                const updated = [...profile.projects];
                                updated[index].details = e.target.value.split('\n').filter(Boolean);
                                updateProfile({ ...profile, projects: updated });
                              }}
                              placeholder="Key accomplishments..."
                              className="w-full bg-slate-900 border border-slate-850 rounded px-2 py-1 text-[11px] text-white resize-none"
                            />
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SKILLS WORK CMS PANEL */}
                {customizerTab === 'skills' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Technical Stack Classification</span>
                    </div>

                    <div className="space-y-4">
                      {profile.skills.map((skillsGroup, idx) => (
                        <div key={idx} className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{skillsGroup.category}</span>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[9px] font-bold text-slate-500 font-mono block">Skills (Comma split list)</label>
                            <input 
                              type="text" 
                              value={skillsGroup.skills.join(', ')}
                              onChange={(e) => {
                                const updatedSkills = [...profile.skills];
                                updatedSkills[idx].skills = e.target.value.split(',').map(item => item.trim()).filter(Boolean);
                                updateProfile({ ...profile, skills: updatedSkills });
                              }}
                              className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.8 text-xs text-white font-mono"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TIMELINE EXPERIENCES CMS PANEL */}
                {customizerTab === 'timeline' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Chronological Academic & Job Experiences</span>
                      <button 
                        onClick={() => {
                          const newTime: TimelineItem = {
                            year: "2026 - FUTURE",
                            role: "Principal Tech Innovator",
                            company: "Self-Started Sandbox Labs",
                            description: "Creating highly coherent digital assets parsing neural networks.",
                            highlights: ["Launched modern developer representations."]
                          };
                          updateProfile({ ...profile, timeline: [newTime, ...profile.timeline] });
                        }}
                        className="flex items-center space-x-1.5 text-[10px] text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg font-bold"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Chapter</span>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {profile.timeline.map((item, index) => (
                        <div key={index} className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl space-y-3 relative">
                          <button 
                            onClick={() => {
                              const updatedTimeline = profile.timeline.filter((_, idx) => idx !== index);
                              updateProfile({ ...profile, timeline: updatedTimeline });
                            }}
                            className="absolute top-4 right-4 p-1 rounded hover:bg-rose-500/15 text-slate-500 hover:text-rose-400"
                            title="Delete this timeline item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="grid grid-cols-12 gap-3 pr-8">
                            <div className="col-span-4 space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 font-mono block">Role Duration</label>
                              <input 
                                type="text" 
                                value={item.year}
                                onChange={(e) => {
                                  const updated = [...profile.timeline];
                                  updated[index].year = e.target.value;
                                  updateProfile({ ...profile, timeline: updated });
                                }}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                              />
                            </div>
                            <div className="col-span-4 space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 font-mono block">Company / Institute</label>
                              <input 
                                type="text" 
                                value={item.company}
                                onChange={(e) => {
                                  const updated = [...profile.timeline];
                                  updated[index].company = e.target.value;
                                  updateProfile({ ...profile, timeline: updated });
                                }}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                              />
                            </div>
                            <div className="col-span-4 space-y-1">
                              <label className="text-[9px] font-bold text-slate-500 font-mono block">Job Role Title</label>
                              <input 
                                type="text" 
                                value={item.role}
                                onChange={(e) => {
                                  const updated = [...profile.timeline];
                                  updated[index].role = e.target.value;
                                  updateProfile({ ...profile, timeline: updated });
                                }}
                                className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 font-mono block">Description</label>
                            <textarea 
                              rows={2}
                              value={item.description}
                              onChange={(e) => {
                                const updated = [...profile.timeline];
                                updated[index].description = e.target.value;
                                updateProfile({ ...profile, timeline: updated });
                              }}
                              className="w-full bg-slate-900 border border-slate-850 rounded px-2 py-1.5 text-xs text-white"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-slate-500 font-mono block">Highlights Bulletins (one per line)</label>
                            <textarea 
                              rows={2}
                              value={item.highlights.join('\n')}
                              onChange={(e) => {
                                const updated = [...profile.timeline];
                                updated[index].highlights = e.target.value.split('\n').filter(Boolean);
                                updateProfile({ ...profile, timeline: updated });
                              }}
                              className="w-full bg-slate-900 border border-slate-850 rounded px-2 py-1 text-[11px] text-white resize-none"
                            />
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Saved floating strip */}
              <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-400 bg-emerald-950/20">
                <div className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Changes automatically saved to your browser cache!</span>
                </div>
                <button 
                  onClick={() => setIsCustomizerOpen(false)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-colors"
                >
                  Confirm View
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* PARENT MAIN AREA */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 relative z-10 space-y-24">
        
        {/* HERO SECTION WITH PORTRAIT PHOTO & ABOUT ME */}
        <Hero 
          profile={profile} 
          setIsResumeOpen={setIsResumeOpen}
          isEditorMode={isEditorMode}
          setIsCustomizerOpen={setIsCustomizerOpen}
          setCustomizerTab={setCustomizerTab}
        />

        {/* DEDICATED ABOUT ME SECTION */}
        <section id="about-me" className="space-y-12 scroll-mt-24 pt-4 text-left">
          
          {/* Section Header */}
          <div>
            <div className="inline-flex items-center space-x-2 text-indigo-400 mb-2">
              <User className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest font-mono">Biography Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">About Bhope Varun</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Bridging high-speed physical electronics with cloud-scale software architectures.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Quick Profile Bento Cards (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Credentials / Academic background card */}
              <div className="bg-slate-900/60 border border-slate-850 p-6 rounded-2xl space-y-4 shadow-xl backdrop-blur-md">
                <div className="flex items-center space-x-3 text-indigo-400">
                  <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Academic Track</h4>
                    <p className="text-sm font-extrabold text-white">BG in Engineering</p>
                  </div>
                </div>
                
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Graduated in <strong className="text-indigo-400 font-black">Electronics & Communication Engineering</strong> (ECE), forming a highly analytical hardware-software hybrid focus.
                </p>

                <div className="border-t border-slate-850/80 pt-3 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 bg-slate-950 text-[10px] font-mono font-bold text-slate-500 rounded border border-slate-850">IoT</span>
                  <span className="px-2 py-0.5 bg-slate-950 text-[10px] font-mono font-bold text-slate-500 rounded border border-slate-850">Arduino</span>
                  <span className="px-2 py-0.5 bg-slate-950 text-[10px] font-mono font-bold text-slate-500 rounded border border-slate-850">Embedded</span>
                  <span className="px-2 py-0.5 bg-slate-950 text-[10px] font-mono font-bold text-slate-500 rounded border border-slate-850">Signals</span>
                </div>
              </div>

              {/* Professional Station card */}
              <div className="bg-slate-900/60 border border-slate-850 p-6 rounded-2xl space-y-4 shadow-xl backdrop-blur-md">
                <div className="flex items-center space-x-3 text-sky-400">
                  <div className="p-2 bg-sky-500/10 rounded-xl border border-sky-500/20">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Current Station</h4>
                    <p className="text-sm font-extrabold text-white">Full Stack Intern</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Contributing active production modules, interface prototypes, and team workflows at <strong className="text-sky-400 font-black">Prodesk IT</strong>.
                </p>

                <div className="border-t border-slate-850/80 pt-3 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 bg-slate-950 text-[10px] font-mono font-bold text-slate-500 rounded border border-slate-850">React 18</span>
                  <span className="px-2 py-0.5 bg-slate-950 text-[10px] font-mono font-bold text-slate-500 rounded border border-slate-850">Java MVC</span>
                  <span className="px-2 py-0.5 bg-slate-950 text-[10px] font-mono font-bold text-slate-500 rounded border border-slate-850">Git Workflows</span>
                </div>
              </div>

              {/* Core Interests Summary banner */}
              <div className="bg-gradient-to-br from-indigo-950/45 to-slate-900/60 border border-indigo-900/30 p-6 rounded-2xl relative overflow-hidden flex-1 flex flex-col justify-between">
                <div className="absolute right-0 bottom-0 pointer-events-none transform translate-x-4 translate-y-4 opacity-5">
                  <Cpu className="w-32 h-32 text-indigo-400" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-indigo-400 font-mono">Core Ideals</h4>
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "Applying analytical hardware principles to compile robust web experiences with low UI lag and clean code structures."
                  </p>
                </div>
                <div className="pt-4 flex items-center space-x-2 text-[10px] font-bold text-emerald-400 font-mono uppercase">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                  <span>Seeking full-time roles</span>
                </div>
              </div>

            </div>

            {/* Right Column: Premium Narrative Blocks (8 cols) */}
            <div className="lg:col-span-8 bg-slate-900/30 border border-slate-850 p-8 rounded-3xl flex flex-col justify-between space-y-6 shadow-xl backdrop-blur-md relative h-full">
              
              {/* Decorative design accent */}
              <div className="absolute top-0 right-0 p-5 opacity-20 hidden sm:block">
                <Workflow className="w-12 h-12 text-slate-500" />
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-center space-x-1.5 text-xs text-indigo-300 font-bold bg-indigo-950/40 border border-indigo-900/35 px-3 py-1 rounded-lg">
                  <Activity className="w-3.5 h-3.5" />
                  <span>The Engineering Narrative</span>
                </div>

                {/* Sub-paragraphs formatted beautifully */}
                <div className="space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed tracking-wide font-sans">
                  
                  <p>
                    I&apos;m <strong className="text-white font-black">Bhope Varun</strong>, a Full Stack Developer and Electronics &amp; Communication Engineering graduate with a strong passion for building modern, user-focused web applications. My journey began in electronics and embedded systems, where I worked on projects involving Arduino, IoT, and automation, and later evolved into software development through hands-on experience with Java, React, JavaScript, Python, and SQL.
                  </p>

                  <p>
                    Currently, I am working as a <strong className="text-sky-400 font-black">Full Stack Developer Intern</strong> at Prodesk IT, where I develop responsive web applications, build interactive user interfaces, and collaborate using modern development tools such as Git and GitHub. I enjoy transforming ideas into practical digital solutions and continuously expanding my knowledge of modern web technologies.
                  </p>

                  <p>
                    My technical background combines software development, problem-solving, and engineering principles, enabling me to approach challenges with both creativity and analytical thinking. I am particularly interested in Full Stack Development, AI-powered applications, and scalable web technologies.
                  </p>

                  <p>
                    Beyond coding, I enjoy learning emerging technologies, working on real-world projects, and continuously improving my skills to build impactful products. I am currently seeking opportunities where I can contribute, learn from experienced professionals, and grow as a software engineer.
                  </p>

                </div>
              </div>

              {/* Dynamic Edit button for narrative if the user wants to live customise */}
              {isEditorMode && (
                <div className="pt-4 border-t border-slate-850/80 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">Biography bio text is fully responsive to customization drawer.</span>
                  <button 
                    onClick={() => {
                      setIsCustomizerOpen(true);
                      setCustomizerTab('general');
                    }}
                    className="px-3.5 py-1.5 bg-indigo-950/40 hover:bg-indigo-900 text-indigo-300 hover:text-white rounded-lg text-xs font-semibold border border-indigo-900 transition-all flex items-center space-x-1"
                    title="Edit background details dynamically"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Live Edit Narrative</span>
                  </button>
                </div>
              )}

            </div>

          </div>

        </section>

        {/* ACTIVE PROJECT PORTFOLIO LAB */}
        <section id="projects" className="space-y-8 scroll-mt-20">
          
          {/* Categories Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 text-left">
            <div>
              <div className="inline-flex items-center space-x-2 text-indigo-400 mb-2">
                <FolderDot className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest font-mono">Project Showroom</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Completed Sandboxes & Interactive Labs</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Filter Varun's works across web engineering and machine learning structures.</p>
            </div>

            {/* Actions for projects */}
            <div className="flex items-center space-x-3 self-start md:self-auto uppercase font-mono">
              {isEditorMode && (
                <button 
                  onClick={() => {
                    setIsCustomizerOpen(true);
                    setCustomizerTab('projects');
                  }}
                  className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-[10px] text-indigo-400 font-bold flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add / Edit Projects</span>
                </button>
              )}

              {/* Dynamic filter links */}
              <div className="flex flex-wrap bg-slate-900 border border-slate-800 p-1 rounded-xl w-fit shrink-0">
                {(['All', 'Full-Stack', 'AI / ML', 'Creative'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${activeCategory === cat ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Project Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p, idx) => (
              <div 
                key={idx} 
                className="bg-slate-900/60 border border-slate-850 hover:border-slate-700 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group h-full hover:scale-[1.01]"
              >
                <div>
                  {/* Top visual tags */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                      {p.category}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 tracking-wider">
                      {p.stats}
                    </span>
                  </div>

                  <h3 className="text-md font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors text-left">
                    {p.title}
                  </h3>

                  <p className="text-slate-400 text-xs leading-relaxed mb-4 text-left">
                    {p.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-1.5 border-t border-slate-850/55 pt-3 mb-4 text-left">
                    {p.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start space-x-1.5 text-[11px] text-slate-400">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer specs & custom controls */}
                <div className="space-y-4">
                  {/* Tech pills row */}
                  <div className="flex flex-wrap gap-1.5">
                    {p.tech.map((t, tIdx) => (
                      <span key={tIdx} className="text-[9px] font-mono font-medium text-slate-400 bg-slate-800 border border-slate-700/40 px-1.8 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Operational links */}
                  <div className="flex items-center justify-between border-t border-slate-850/50 pt-3">
                    <a 
                      href={p.githubUrl} 
                      className="text-slate-400 hover:text-white text-xs font-semibold flex items-center space-x-1 transition-colors"
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Repository</span>
                    </a>
                    
                    <a 
                      href={p.demoUrl} 
                      className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center space-x-1 transition-colors"
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <span>Interactive Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* VISUAL TECH STACK WORKSPACE */}
        <section id="skills" className="block pt-8 scroll-mt-20 text-left">
          
          {/* Tech category bento grids */}
          <div className="w-full space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-sky-400">
                <Code2 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest font-mono">Development Arsenal</span>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">Technical Fluency Cockpit</h2>
                {isEditorMode && (
                  <button 
                    onClick={() => {
                      setIsCustomizerOpen(true);
                      setCustomizerTab('skills');
                    }}
                    className="px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded text-[10px] text-indigo-400 font-mono"
                  >
                    Edit Skills
                  </button>
                )}
              </div>
              <p className="text-slate-400 text-xs sm:text-sm">A highly categorized breakdown of languages, interfaces, and platforms utilized regularly.</p>
            </div>

            {/* Bento Cells mapping stack */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {profile.skills.map((techSet, idx) => (
                <div key={idx} className="bg-slate-900/60 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-slate-800 transition-all">
                  <h3 className="text-xs font-black uppercase tracking-widest text-indigo-400 border-b border-indigo-950/60 pb-2.5">
                    {techSet.category}
                  </h3>

                  <div className="flex flex-wrap gap-2 py-2">
                    {techSet.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="text-xs text-white bg-slate-950 border border-slate-800 px-3 py-2 rounded-xl font-medium shadow-2xs">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <span className="text-[10px] text-slate-500 font-mono italic">
                    Fluent Professional Standard
                  </span>
                </div>
              ))}
            </div>
          </div>

        </section>



        {/* WORK EXPERIENCE GRAPH TIMELINE */}
        <section id="timeline" className="space-y-8 scroll-mt-20">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center space-x-2 text-indigo-400 justify-center">
              <Milestone className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest font-mono text-center">Resilient Growth Timeline</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display text-center">Pathways of Academic & Professional Flow</h2>
            {isEditorMode && (
              <div className="flex justify-center pt-1.5">
                <button 
                  onClick={() => {
                    setIsCustomizerOpen(true);
                    setCustomizerTab('timeline');
                  }}
                  className="px-3 py-1 bg-slate-900 border border-slate-805 hover:border-slate-700 rounded-lg text-[10px] text-indigo-400 font-mono"
                >
                  ✏️ Edit Timeline Segments
                </button>
              </div>
            )}
            <p className="text-slate-400 text-xs sm:text-sm text-center">Chronological pipeline highlighting pivotal chapters, internships, and educational mastery.</p>
          </div>

          {/* Actual timeline graphics mapping */}
          <div className="max-w-3xl mx-auto relative pt-8">
            {/* Center spine path line */}
            <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[2px] bg-slate-800/80"></div>
            
            <div className="space-y-12">
              {profile.timeline.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:justify-start' : 'md:justify-end md:flex-row-reverse'}`}>
                    
                    {/* Spine anchor point */}
                    <div className="absolute left-4 md:left-1/2 top-1.5 w-6 h-6 rounded-full bg-slate-900 border-2 border-indigo-500 transform -translate-x-[11px] flex items-center justify-center shadow-lg z-10">
                      <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>
                    </div>

                    {/* Timeline card container */}
                    <div className="w-full md:w-[45%] pl-10 md:pl-0">
                      <div className="bg-slate-900/60 hover:bg-slate-900 border border-slate-850 hover:border-slate-700 p-5 rounded-2xl relative shadow-2xs transition-all text-left">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400">
                          {item.year}
                        </span>
                        
                        <h3 className="text-base font-bold text-white mt-1">
                          {item.role}
                        </h3>
                        
                        <p className="text-xs font-semibold text-indigo-500 mb-3">
                          {item.company}
                        </p>
                        
                        <p className="text-slate-400 text-xs leading-relaxed mb-4">
                          {item.description}
                        </p>

                        <div className="space-y-1.5 border-t border-slate-850 pt-3">
                          {item.highlights.map((h, hIdx) => (
                            <div key={hIdx} className="flex items-start space-x-1.5 text-[11px] text-slate-400">
                              <span className="text-indigo-400 font-bold shrink-0 mt-0.5">•</span>
                              <span className="leading-snug">{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </section>
        {/* DOUBLE COLUMN: SUBMIT MESSAGES FORM + LIVE LOG VIEW */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-8 pb-16 scroll-mt-20">
          
          {/* Submit Message grid */}
          <div className="lg:col-span-6 bg-slate-900 border border-slate-850 p-6 md:p-8 rounded-3xl space-y-6">
            <div className="space-y-1 text-left">
              <div className="inline-flex items-center space-x-2 text-indigo-400">
                <Mail className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest font-mono">Resilient Pipeline Log</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white font-display">Drop {profile.name.split(' ')[0]} a Project Proposal</h2>
              <p className="text-slate-400 text-xs">Instantly send messages to be saved locally in this browser context.</p>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="usr-name" className="text-[10px] font-bold text-slate-400 uppercase font-mono">Your Name</label>
                  <input
                    id="usr-name"
                    required
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Guest Professional"
                    className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600"
                  />
                </div>
                
                <div className="space-y-1.5 text-left">
                  <label htmlFor="usr-email" className="text-[10px] font-bold text-slate-400 uppercase font-mono">Your Email Address</label>
                  <input
                    id="usr-email"
                    required
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="guest-contact@recruiter.com"
                    className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label htmlFor="usr-msg" className="text-[10px] font-bold text-slate-400 uppercase font-mono">Message Summary</label>
                <textarea
                  id="usr-msg"
                  required
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder={`Hey ${profile.name.split(' ')[0]}, let's connect on building high-end interactive apps with TypeScript...`}
                  className="w-full bg-slate-950 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 resize-none font-sans"
                />
              </div>

              {formSubmitted && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs p-3.5 rounded-xl flex items-start space-x-2 text-left">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Message saved locally!</p>
                    <p className="opacity-90 mt-0.5">Your communication has been safely saved inside your browser's local storage.</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider font-mono flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message</span>
              </button>
            </form>
          </div>

          {/* Direct channels container */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* DIRECT CONTACT CHANNELS */}
            <div className="bg-slate-900 border border-slate-850 p-6 md:p-8 rounded-3xl space-y-5 text-left">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 text-indigo-400">
                  <Phone className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest font-mono">Immediate Connection</span>
                </div>
                <h3 className="text-xl font-bold text-white">Direct Reach</h3>
                <p className="text-slate-400 text-xs">Reach out directly via secure phone calls, traditional email systems, or schedule local video calls.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href={`mailto:${profile.email}`} 
                  className="bg-slate-950/60 hover:bg-slate-950 p-4 rounded-2xl border border-slate-850 hover:border-indigo-500/30 transition-all flex items-center space-x-3.5 group cursor-pointer"
                >
                  <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl group-hover:scale-105 transition-transform shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono font-black">Email Address</p>
                    <p className="text-xs font-black text-white truncate mt-0.5">{profile.email}</p>
                  </div>
                </a>

                <a 
                  href={`tel:${profile.phone}`} 
                  className="bg-slate-950/60 hover:bg-slate-950 p-4 rounded-2xl border border-slate-850 hover:border-emerald-500/30 transition-all flex items-center space-x-3.5 group cursor-pointer"
                >
                  <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl group-hover:scale-105 transition-transform shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono font-black">Mobile No</p>
                    <p className="text-xs font-black text-white truncate mt-0.5">{profile.phone || '+91 8639718579'}</p>
                  </div>
                </a>
              </div>

              <div className="p-4 bg-slate-950/40 border border-slate-850/60 rounded-2xl flex items-center space-x-3 text-slate-400 text-xs">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="font-mono">Current Station: {profile.location}</span>
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* FOOTER BAR */}
      <Footer profile={profile} />

      {/* INTERACTIVE RESUME CUSTOM MODAL LAYER */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
        profile={profile} 
      />

    </div>
  );
}
