import React from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Linkedin, Github, Award, GraduationCap, Briefcase, Sparkles } from 'lucide-react';
import { DeveloperProfile } from '../types';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: DeveloperProfile;
}

export default function ResumeModal({ isOpen, onClose, profile }: ResumeModalProps) {
  if (!isOpen) return null;

  const downloadPlainTextResume = () => {
    const text = `
BHOPE VARUN
${profile.email} | ${profile.phone || '+91 8639718579'} | ${profile.location}
LinkedIn: ${profile.linkedinUrl}
GitHub: ${profile.githubUrl}

OBJECTIVE
To secure an entry-level software developer position where I can apply my knowledge of programming, problem-solving, and software development to build efficient applications while continuously learning and growing.

EDUCATION
B.Tech, Electronics and Communication Engineering
JB Institute of Engineering and Technology | CGPA: 8.14 | 2022–2026

TECHNICAL SKILLS
- Languages: C++, Python, Java, JavaScript
- Frontend: React.js, HTML, CSS
- Database: SQL
- Tools: Git, GitHub, VS Code, Vercel, IntelliJ IDEA, Anaconda
- Concepts: Responsive Design, Component-Based Architecture, State Management, REST APIs

EXPERIENCE
Full Stack Developer Intern – Prodesk IT (May 2026 – Present)
- Developed responsive web applications using React.js, JavaScript, HTML, and CSS.
- Implemented client-side routing and state management for single-page applications.

PROJECTS
${profile.projects.map((p, index) => `${index + 1}. ${p.title} (${p.tech.join(', ')})
   - ${p.description}
   ${p.details.map(d => `- ${d}`).join('\n   ')}`).join('\n\n')}

CERTIFICATIONS
- Python – Stastigma Analytics pvt ltd
- Java – NPTEL
- VLSI – Internshala
- IoT – Jadavpur University

PERSONAL SKILLS
- Leadership (Active member of college team/club activities)
- Team Collaboration (Worked in group-based academic and project teams)
`;
    const blob = new Blob([text.trim()], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${profile.name.replace(/\s+/g, '_')}_Resume.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  return (
    <div id="print-modal-parent" className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop (Changed to absolute to ensure proper stacking inside parent container) */}
      <div 
        id="print-modal-backdrop"
        className="absolute inset-0 bg-slate-950/92 backdrop-blur-md transition-opacity duration-200 z-0 cursor-pointer"
        onClick={onClose}
      ></div>

      {/* Modal Box - added stopPropagation and clear pointer control */}
      <div 
        className="relative bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl z-10 pointer-events-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* IFrame Sandbox Print Warning Banner */}
        {isInIframe && (
          <div id="print-modal-iframe-warning" className="bg-gradient-to-r from-amber-500/10 via-yellow-500/15 to-amber-500/10 border-b border-amber-500/20 text-amber-300 px-4 py-2 text-center text-[11px] font-sans flex items-center justify-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
            <span>
              <strong>Preview Info:</strong> Browser sandboxes often block print triggers inside frames. For flawless print or PDF saving, click the <strong>Open in New Tab</strong> icon (top right of your workspace screen).
            </span>
          </div>
        )}
        
        {/* Header bar controls */}
        <div id="print-control-header" className="flex items-center justify-between p-4 md:p-6 bg-slate-950 border-b border-slate-850">
          <div className="flex items-center space-x-2 text-left">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Interactive Printable Resume</h3>
              <p className="text-[10px] text-slate-500 font-mono">Generates a clean black & white format optimized directly for print or PDF</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button 
              onClick={downloadPlainTextResume}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/65 text-xs font-semibold rounded-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download .Txt</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable preview body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-950/40">
          
          {/* Printable container (Print styles applied in layout) */}
          <div 
            id="printable-resume-area" 
            className="mx-auto max-w-[210mm] min-h-[297mm] bg-white text-slate-900 p-8 md:p-12 shadow-md rounded-lg flex flex-col font-serif select-text text-left"
            style={{ color: '#000000', backgroundColor: '#ffffff' }}
          >
            {/* Name & Contact */}
            <div className="text-center pb-5 border-b border-slate-300">
              <h1 className="text-3xl font-bold tracking-tight uppercase" style={{ color: '#000000' }}>{profile.name}</h1>
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs text-slate-700 font-sans mt-2">
                <span className="flex items-center space-x-1">
                  <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{profile.email}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{profile.phone || '+91 8639718579'}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{profile.location}</span>
                </span>
              </div>
              <div className="flex justify-center items-center gap-4 text-xs font-sans text-indigo-700 font-semibold mt-1.5 underline">
                <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn Page</a>
                <a href={profile.githubUrl} target="_blank" rel="noreferrer">GitHub Repositories</a>
              </div>
            </div>

            {/* Objective */}
            <div className="py-4">
              <h2 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2 font-sans" style={{ color: '#000000' }}>Objective</h2>
              <p className="text-xs leading-relaxed text-slate-800">
                To secure an entry-level software developer position where I can apply my knowledge of programming, problem-solving, and software development to build efficient applications while continuously learning and growing.
              </p>
            </div>

            {/* Education */}
            <div className="py-3">
              <h2 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2 font-sans" style={{ color: '#000000' }}>Education</h2>
              <div className="flex justify-between items-start text-xs font-sans font-bold">
                <span>B.Tech, Electronics and Communication Engineering</span>
                <span className="text-slate-600 font-normal">2022 – 2026</span>
              </div>
              <div className="text-xs text-slate-700 italic font-sans flex justify-between">
                <span>JB Institute of Engineering and Technology</span>
                <span>CGPA: 8.14</span>
              </div>
            </div>

            {/* Technical Skills */}
            <div className="py-3">
              <h2 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2 font-sans" style={{ color: '#000000' }}>Technical Skills</h2>
              <ul className="space-y-1 text-xs">
                {profile.skills.map((s, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <strong className="font-sans text-[11px] uppercase tracking-wide inline-block w-40 text-slate-700">{s.category}: </strong>
                    <span className="text-slate-800">{s.skills.join(', ')}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experience */}
            <div className="py-3">
              <h2 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2 font-sans" style={{ color: '#000000' }}>Experience</h2>
              {profile.timeline.filter(t => t.role.toLowerCase().includes('intern') || t.company.toLowerCase().includes('it')).map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between items-start text-xs font-sans font-bold">
                    <span>{item.role} – {item.company}</span>
                    <span className="text-slate-600 font-normal">{item.year}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs text-slate-800 space-y-0.5 pl-2 leading-relaxed">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="indent-[-12px] pl-[12px]">{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div className="py-3 flex-1">
              <h2 className="text-sm font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-2 font-sans" style={{ color: '#000000' }}>Projects</h2>
              <div className="space-y-3">
                {profile.projects.map((p, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-start text-xs font-sans font-bold">
                      <span className="underline">{p.title}</span>
                      <span className="font-mono text-[10px] text-slate-600 font-normal">{p.stats}</span>
                    </div>
                    <div className="text-[10px] text-slate-700 font-sans font-semibold">
                      Tech Stack: {p.tech.join(', ')}
                    </div>
                    <p className="text-xs text-slate-800 italic leading-relaxed">
                      {p.description}
                    </p>
                    <ul className="list-disc list-inside text-[11px] text-slate-800 space-y-0.5 pl-2 leading-snug">
                      {p.details.map((detail, dIdx) => (
                        <li key={dIdx} className="indent-[-12px] pl-[12px]">{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Personal */}
            <div className="py-3 border-t border-slate-200 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-sans mb-1.5">Certifications</h3>
                  <ul className="list-disc list-inside text-[11px] text-slate-850 space-y-0.5">
                    <li>Python – Stastigma Analytics pvt ltd</li>
                    <li>Java – NPTEL</li>
                    <li>VLSI – Internshala</li>
                    <li>IoT – Jadavpur University</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-sans mb-1.5">Personal Skills</h3>
                  <ul className="list-disc list-inside text-[11px] text-slate-850 space-y-0.5">
                    <li>Leadership (Active college team/club member)</li>
                    <li>Team Collaboration (Academic & Project teams)</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer warning */}
        <div id="print-modal-footer-warning" className="p-4 bg-slate-950 border-t border-slate-850 text-center text-[10px] text-slate-500">
          * Printing formats perfectly to an A4 layout. Set margins to "None" or "Default" in destination options for pristine alignment.
        </div>

      </div>
    </div>
  );
}
